# speech-to-text-wavenet → VRCT Integration Guide

This repo is cloned at `c:/Users/Admin/spectra/speech-to-text-wavenet` and is
integrated into the **VRCT Crisis Dashboard** (`VRCT/crisis_dashboard.html`).

---

## How it works

The victim chat in `crisis_dashboard.html` has a two-tier STT system:

| Tier | Engine | Availability |
|------|--------|--------------|
| **Primary** | Browser Web Speech API (multilingual, zero-setup) | Chrome / Edge |
| **Backend** | speech-to-text-wavenet (WaveNet / TensorFlow) | Local Python server |

The browser silently probes `ws://127.0.0.1:5001` on load. If a WaveNet
server is running there, it receives `{ transcript: "..." }` JSON messages
and injects them into the chat textarea. Otherwise Web Speech API is used.

---

## Running the WaveNet backend locally

### Option A — Docker (easiest)
```bash
docker pull buriburisuri/speech-to-text-wavenet
docker run -it -p 5001:5001 buriburisuri/speech-to-text-wavenet
```

### Option B — Python directly
```bash
cd c:/Users/Admin/spectra/speech-to-text-wavenet
pip install -r requirements.txt

# Test with a sample file:
python recognize.py --file asset/data/LibriSpeech/test-clean/1089/134686/1089-134686-0000.flac

# To expose as WebSocket server on port 5001 (you need to add a WS wrapper):
# See recognize.py and wrap with websockets / asyncio
```

### Option C — Web Speech API only (no setup needed)
Just open `crisis_dashboard.html` in Chrome or Edge. The 🎤 button uses
the browser's built-in multilingual speech recognition automatically.

---

## Protocol (WaveNet WS server → browser)

Send JSON over WebSocket:
```json
{ "transcript": "I am trapped on floor 3, there is smoke" }
```

The dashboard injects the transcript into the chat textarea and auto-sends it
through the full pipeline: language detection → Google Translate → AI crisis
response → responder feed.

---

## Files changed in VRCT

| File | Change |
|------|--------|
| `VRCT/crisis_dashboard.html` | Added `#chat-mic-btn`, `#stt-status-bar`, `SpeechVoiceEngine` JS, WaveNet WS client |

---

## Browser Support

| Browser | Web Speech API | Notes |
|---------|---------------|-------|
| Chrome  | ✅ Full | Best multilingual support |
| Edge    | ✅ Full | Uses same Chromium engine |
| Firefox | ❌ Not supported | Use WaveNet backend instead |
| Safari  | ⚠️ Partial | iOS 14.5+ only |
