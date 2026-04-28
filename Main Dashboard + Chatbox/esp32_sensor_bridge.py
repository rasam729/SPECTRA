"""
Crisis Response System — ESP32 Sensor Bridge
============================================
Reads JSON sensor packets from an ESP32 over USB Serial (or a simulated
demo mode), applies a threshold-based state machine, and broadcasts
real-time sensor data and emergency alerts to the PWA dashboard via
Flask-SocketIO on port 5050.

Usage:
  # Real ESP32 (adjust COM port):
  python esp32_sensor_bridge.py --port COM3

  # Demo / simulation mode (no hardware needed):
  python esp32_sensor_bridge.py --demo

Dashboard WebSocket URL: ws://localhost:5050/socket.io/?EIO=4&transport=websocket
"""

import argparse
import json
import math
import random
import sys
import threading
import time
from datetime import datetime, timezone

# ── Dependency guard ─────────────────────────────────────────────────────────
try:
    from flask import Flask
    from flask_socketio import SocketIO
except ImportError:
    print("[Bridge] ERROR: flask and flask-socketio not installed.")
    print("  Run: pip install flask flask-socketio")
    sys.exit(1)

try:
    import serial
    SERIAL_AVAILABLE = True
except ImportError:
    SERIAL_AVAILABLE = False

# ─────────────────────────────────────────────────────────────────────────────
#  Threshold Configuration
# ─────────────────────────────────────────────────────────────────────────────
THRESHOLDS = {
    "co2_ppm": {
        "warn":     1000,
        "critical": 2000,
        "states":   ["SUFFOCATION", "FIRE"],
    },
    "audio_db": {
        "warn":     85,
        "critical": 110,
        "states":   ["EXPLOSION", "CROWD_PANIC"],
    },
    "temp_c": {
        "warn":     60,
        "critical": 200,
        "states":   ["FIRE_HAZARD"],
    },
    "smoke_ppm": {
        "warn":     200,
        "critical": 500,
        "states":   ["FIRE_HAZARD"],
    },
    # Heart-rate is checked separately (bidirectional)
    "heartrate_bpm": {
        "low_warn":     40,
        "low_critical": 30,
        "high_warn":    130,
        "high_critical":160,
        "states":       ["MEDICAL"],
    },
}

# Vibration patterns (ms: vib, pause, vib, …)
VIB_PATTERNS = {
    "NORMAL":   [],
    "WARN":     [200, 100, 200],
    "FIRE":     [400, 100, 400, 100, 800],
    "FLOOD":    [600, 200, 600],
    "SOS":      [1000, 500, 1000, 500],
    "MEDICAL":  [200, 100, 200, 100, 200],
    "STEALTH":  [80],              # single gentle tap only
    "EXPLOSION":[300, 50, 300, 50, 600],
}

# ─────────────────────────────────────────────────────────────────────────────
#  Emergency State Machine
# ─────────────────────────────────────────────────────────────────────────────
class AlertStateMachine:
    """
    Tracks the current emergency state and escalation history.

    Transition rules:
      NORMAL → WARN     : any sensor crosses warn threshold
      WARN   → CRITICAL : any sensor crosses critical threshold
      ANY    → SOS      : sustained CRITICAL > 5 s OR sos_flag in packet
      ANY    → STEALTH  : stealth_flag in packet or [VIB_STAY_QUIET] token
      STEALTH→ NORMAL   : clear_flag in packet
    """

    STATE_PRIORITY = {
        "NORMAL": 0, "WARN": 1,
        "FIRE": 2, "FLOOD": 2, "MEDICAL": 2,
        "EXPLOSION": 2, "SUFFOCATION": 2,
        "SOS": 3, "STEALTH": 4,
    }

    def __init__(self, socketio: SocketIO):
        self.socketio = socketio
        self.current_state = "NORMAL"
        self.stealth_active = False
        self._critical_start: float | None = None
        self._lock = threading.Lock()

    def evaluate(self, packet: dict) -> dict | None:
        """
        Evaluate a sensor packet, update state, emit SocketIO events.
        Returns the emergency_alert dict if an alert was fired, else None.
        """
        with self._lock:
            # Check for explicit flags from firmware
            if packet.get("sos_flag"):
                return self._fire_alert("SOS", "CRITICAL", packet, ["sos_flag"])
            if packet.get("stealth_flag"):
                self.stealth_active = True
                self.current_state = "STEALTH"
                return self._fire_alert("STEALTH", "WARN", packet, ["stealth_flag"])
            if packet.get("clear_flag") and self.stealth_active:
                self.stealth_active = False
                self.current_state = "NORMAL"
                return None

            # Derive state from sensor readings
            triggered_states = []
            triggered_fields = []
            severity = "NORMAL"

            # --- CO₂ ---
            co2 = packet.get("co2", 0)
            if co2 >= THRESHOLDS["co2_ppm"]["critical"]:
                triggered_states.append("SUFFOCATION")
                triggered_fields.append("co2_ppm")
                severity = "CRITICAL"
            elif co2 >= THRESHOLDS["co2_ppm"]["warn"]:
                triggered_states.append("SUFFOCATION")
                triggered_fields.append("co2_ppm")
                severity = max(severity, "WARN", key=lambda s: {"NORMAL":0,"WARN":1,"CRITICAL":2}[s])

            # --- Temperature ---
            temp = packet.get("temp_c", 0)
            if temp >= THRESHOLDS["temp_c"]["critical"]:
                triggered_states.append("FIRE")
                triggered_fields.append("temp_c")
                severity = "CRITICAL"
            elif temp >= THRESHOLDS["temp_c"]["warn"]:
                triggered_states.append("FIRE")
                triggered_fields.append("temp_c")

            # --- Smoke ---
            smoke = packet.get("smoke_ppm", 0)
            if smoke >= THRESHOLDS["smoke_ppm"]["critical"]:
                triggered_states.append("FIRE")
                triggered_fields.append("smoke_ppm")
                severity = "CRITICAL"
            elif smoke >= THRESHOLDS["smoke_ppm"]["warn"]:
                triggered_states.append("FIRE")
                triggered_fields.append("smoke_ppm")

            # --- Audio ---
            audio = packet.get("audio_db", 0)
            if audio >= THRESHOLDS["audio_db"]["critical"]:
                triggered_states.append("EXPLOSION")
                triggered_fields.append("audio_db")
                severity = "CRITICAL"
            elif audio >= THRESHOLDS["audio_db"]["warn"]:
                triggered_states.append("EXPLOSION")
                triggered_fields.append("audio_db")

            # --- Heart Rate ---
            hr = packet.get("heartrate_bpm", 75)
            t_hr = THRESHOLDS["heartrate_bpm"]
            if hr <= t_hr["low_critical"] or hr >= t_hr["high_critical"]:
                triggered_states.append("MEDICAL")
                triggered_fields.append("heartrate_bpm")
                severity = "CRITICAL"
            elif hr <= t_hr["low_warn"] or hr >= t_hr["high_warn"]:
                triggered_states.append("MEDICAL")
                triggered_fields.append("heartrate_bpm")

            # Choose dominant state
            if triggered_states:
                dominant = max(
                    triggered_states,
                    key=lambda s: self.STATE_PRIORITY.get(s, 0)
                )
            else:
                dominant = "NORMAL"
                self._critical_start = None

            # Sustained CRITICAL → SOS after 5 s
            if severity == "CRITICAL":
                if self._critical_start is None:
                    self._critical_start = time.time()
                elif time.time() - self._critical_start > 5:
                    dominant = "SOS"
            else:
                self._critical_start = None

            self.current_state = dominant

            if dominant == "NORMAL":
                return None

            return self._fire_alert(dominant, severity, packet, triggered_fields)

    def _fire_alert(
        self, state: str, severity: str, packet: dict, triggers: list
    ) -> dict:
        zone = packet.get("zone", "?")
        message = self._build_message(state, severity, zone, packet)
        vib = VIB_PATTERNS.get(state, VIB_PATTERNS["WARN"])

        alert = {
            "event":       "emergency_alert",
            "state":       state,
            "severity":    severity,
            "zone":        zone,
            "triggers":    triggers,
            "message":     message,
            "vib_pattern": vib,
            "timestamp":   _utcnow(),
        }
        self.socketio.emit("emergency_alert", alert)
        _log(f"[ALERT] {state} ({severity}) | Zone {zone} | triggers={triggers}")
        return alert

    def _build_message(
        self, state: str, severity: str, zone: str, packet: dict
    ) -> str:
        temp  = packet.get("temp_c", "--")
        smoke = packet.get("smoke_ppm", "--")
        co2   = packet.get("co2", "--")
        hr    = packet.get("heartrate_bpm", "--")
        db    = packet.get("audio_db", "--")

        msgs = {
            "FIRE":       f"[FIRE_HAZARD] Zone {zone} — FIRE CRITICAL. Temp {temp}°C, Smoke {smoke}ppm. Evacuate immediately via nearest exit.",
            "SUFFOCATION":f"[FIRE_HAZARD] Zone {zone} — CO₂ at {co2}ppm. Air quality CRITICAL. Evacuate and ventilate.",
            "EXPLOSION":  f"Zone {zone} — Blast/impact detected. Audio {db}dB. Structural check required.",
            "MEDICAL":    f"[MEDICAL_ASSISTANCE] Zone {zone} — Cardiac anomaly. HR {hr}bpm. Send medical team immediately.",
            "FLOOD":      f"Zone {zone} — Flood sensors triggered. Move to highest elevation.",
            "SOS":        f"[SOS_ALERT] ⚠ SOS ACTIVATED — Zone {zone}. SUSTAINED CRITICAL. All responders: PRIORITY ONE. Temp {temp}°C, Smoke {smoke}ppm, CO₂ {co2}ppm.\n\n[MEDICAL_ASSISTANCE][FIRE_HAZARD]\n[INTENT_TAG: SOS_ACTIVATED]\n[ENGLISH_SUMMARY: SOS Alert triggered. Critical conditions sustained in Zone {zone}. Response team dispatched.]",
            "STEALTH":    "[VIB_STAY_QUIET] [VIB_LEFT_PULSE]",
        }
        return msgs.get(state, f"Zone {zone} — Emergency state: {state} ({severity})")


# ─────────────────────────────────────────────────────────────────────────────
#  Demo Sensor Simulator
# ─────────────────────────────────────────────────────────────────────────────
class DemoSimulator:
    """
    Generates realistic sensor readings that occasionally escalate to
    FIRE / MEDICAL / SOS states so you can test without hardware.
    Runs the scenario loop:  NORMAL → WARN → FIRE → SOS → CLEAR
    """

    ZONES = ["A", "B", "C"]
    CYCLE_SECS = 40   # full scenario cycle length

    def __init__(self, on_packet):
        self._on_packet = on_packet
        self._running   = False

    def start(self):
        self._running = True
        t = threading.Thread(target=self._loop, daemon=True)
        t.start()

    def stop(self):
        self._running = False

    def _loop(self):
        t0 = time.time()
        while self._running:
            elapsed = (time.time() - t0) % self.CYCLE_SECS
            phase = elapsed / self.CYCLE_SECS   # 0.0 → 1.0

            zone = random.choice(self.ZONES)
            packet = self._make_packet(phase, zone)
            self._on_packet(packet)
            time.sleep(1.0)

    def _make_packet(self, phase: float, zone: str) -> dict:
        """Build a sensor packet whose values escalate with phase."""
        # Baseline noise
        base_temp  = 28  + random.gauss(0, 1)
        base_smoke = 40  + random.gauss(0, 5)
        base_co2   = 420 + random.gauss(0, 15)
        base_db    = 65  + random.gauss(0, 3)
        base_hr    = 72  + random.gauss(0, 4)

        sos_flag    = False
        stealth_flag= False

        if phase < 0.35:
            # NORMAL
            pass
        elif phase < 0.55:
            # WARN — rising values
            k = (phase - 0.35) / 0.2
            base_temp  += k * 80
            base_smoke += k * 300
            base_co2   += k * 800
            base_hr    += k * 60
        elif phase < 0.75:
            # CRITICAL
            k = (phase - 0.55) / 0.2
            base_temp  = 250 + k * 200
            base_smoke = 550 + k * 300
            base_co2   = 2100 + k * 500
            base_hr    = 155 + k * 20
            base_db    = 100 + k * 15
        elif phase < 0.85:
            # SOS
            base_temp  = 480
            base_smoke = 900
            base_co2   = 2500
            base_hr    = 165
            sos_flag   = True
        elif phase < 0.92:
            # STEALTH mode
            base_temp  = 30
            base_smoke = 50
            base_co2   = 430
            stealth_flag = True
        else:
            # CLEAR / returning to normal
            pass

        return {
            "zone":           zone,
            "temp_c":         round(max(0, base_temp),  1),
            "smoke_ppm":      round(max(0, base_smoke), 1),
            "co2":            round(max(350, base_co2), 1),
            "audio_db":       round(max(30, base_db),   1),
            "heartrate_bpm":  round(max(20, base_hr),   1),
            "sos_flag":       sos_flag,
            "stealth_flag":   stealth_flag,
            "clear_flag":     phase > 0.92,
            "timestamp":      _utcnow(),
        }


# ─────────────────────────────────────────────────────────────────────────────
#  Serial Reader
# ─────────────────────────────────────────────────────────────────────────────
class SerialReader:
    """Reads JSON lines from ESP32 over USB Serial at 115200 baud."""

    def __init__(self, port: str, on_packet, baud: int = 115200):
        self._port      = port
        self._baud      = baud
        self._on_packet = on_packet
        self._running   = False

    def start(self):
        if not SERIAL_AVAILABLE:
            _log("[Serial] ERROR: pyserial not installed. Run: pip install pyserial")
            return
        self._running = True
        t = threading.Thread(target=self._loop, daemon=True)
        t.start()

    def stop(self):
        self._running = False

    def _loop(self):
        _log(f"[Serial] Opening {self._port} @ {self._baud} baud…")
        try:
            ser = serial.Serial(self._port, self._baud, timeout=1)
        except Exception as e:
            _log(f"[Serial] ERROR: {e}")
            return

        _log(f"[Serial] Connected to {self._port}")
        while self._running:
            try:
                line = ser.readline().decode("utf-8", errors="replace").strip()
                if not line:
                    continue
                try:
                    packet = json.loads(line)
                    self._on_packet(packet)
                except json.JSONDecodeError:
                    _log(f"[Serial] Non-JSON: {line[:80]}")
            except Exception as e:
                _log(f"[Serial] Read error: {e}")
                time.sleep(0.5)

        ser.close()


# ─────────────────────────────────────────────────────────────────────────────
#  Flask-SocketIO Server
# ─────────────────────────────────────────────────────────────────────────────
app    = Flask(__name__)
sio    = SocketIO(
    app,
    cors_allowed_origins="*",
    async_mode="threading",
    logger=False,
    engineio_logger=False,
)

alert_engine: AlertStateMachine | None = None

def on_packet(packet: dict):
    """Called whenever a sensor packet arrives (serial or demo)."""
    # 1. Broadcast raw sensor data to dashboard
    sio.emit("sensor_update", packet)
    _log(f"[Sensor] Zone={packet.get('zone','?')} "
         f"Temp={packet.get('temp_c','--')}°C "
         f"Smoke={packet.get('smoke_ppm','--')}ppm "
         f"CO2={packet.get('co2','--')}ppm "
         f"HR={packet.get('heartrate_bpm','--')}bpm "
         f"dB={packet.get('audio_db','--')}")

    # 2. Run alert state machine
    if alert_engine:
        alert_engine.evaluate(packet)


@sio.on("connect")
def on_connect():
    _log("[SocketIO] Dashboard client connected.")
    sio.emit("bridge_status", {
        "status":  "connected",
        "version": "v1",
        "message": "ESP32 Sensor Bridge active.",
        "timestamp": _utcnow(),
    })


@sio.on("disconnect")
def on_disconnect():
    _log("[SocketIO] Dashboard client disconnected.")


@sio.on("manual_sos")
def on_manual_sos(data):
    _log("[SocketIO] Manual SOS received from dashboard.")
    on_packet({"zone": data.get("zone", "MANUAL"), "sos_flag": True, "timestamp": _utcnow()})


# ─────────────────────────────────────────────────────────────────────────────
#  Helpers
# ─────────────────────────────────────────────────────────────────────────────
def _utcnow() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def _log(msg: str):
    print(f"[{_utcnow()}] {msg}", flush=True)


# ─────────────────────────────────────────────────────────────────────────────
#  Main Entry Point
# ─────────────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="Crisis Response — ESP32 Sensor Bridge"
    )
    parser.add_argument("--port",  default="COM3",  help="Serial port (e.g. COM3 or /dev/ttyUSB0)")
    parser.add_argument("--baud",  default=115200, type=int, help="Serial baud rate")
    parser.add_argument("--demo",  action="store_true",       help="Run in simulation mode (no hardware)")
    parser.add_argument("--host",  default="0.0.0.0",         help="SocketIO bind host")
    parser.add_argument("--sio-port", default=5050, type=int, help="SocketIO port")
    args = parser.parse_args()

    global alert_engine
    alert_engine = AlertStateMachine(sio)

    if args.demo:
        _log("[Bridge] Starting in DEMO / simulation mode.")
        sim = DemoSimulator(on_packet)
        sim.start()
    else:
        _log(f"[Bridge] Starting serial reader on {args.port}.")
        reader = SerialReader(args.port, on_packet, args.baud)
        reader.start()

    _log(f"[Bridge] Flask-SocketIO listening on http://{args.host}:{args.sio_port}")
    _log(f"[Bridge] Dashboard WebSocket URL: ws://localhost:{args.sio_port}/socket.io/?EIO=4&transport=websocket")
    _log("[Bridge] Press Ctrl+C to stop.\n")

    try:
        sio.run(app, host=args.host, port=args.sio_port, debug=False)
    except KeyboardInterrupt:
        _log("[Bridge] Stopped.")


if __name__ == "__main__":
    main()
