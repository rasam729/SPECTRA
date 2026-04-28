/**
 * Sentinel-Pulse Local Relay Server
 * Real-time sync between Guest App and Response Team Dashboard
 */

const http = require('http');
const { WebSocketServer } = require('ws');

const PORT = 8765;

const store = {
  guests: {},
  messages: [],
  sosAlerts: [],
  hazards: [],
};

let msgIdCounter = 0;

// ── Sample guests with multilingual messages ──────────────────────────────────
const SAMPLE_GUESTS = [
  { id: 'sample_1', name: 'Carlos Mendez',  room: '301', floor: 3, location: { x: 150, y: 200 }, status: 'unsafe', sosActive: false, language: 'es' },
  { id: 'sample_2', name: 'Marie Dupont',   room: '302', floor: 3, location: { x: 280, y: 150 }, status: 'unsafe', sosActive: false, language: 'fr' },
  { id: 'sample_3', name: 'Wei Zhang',      room: '303', floor: 3, location: { x: 400, y: 300 }, status: 'unsafe', sosActive: false, language: 'zh' },
  { id: 'sample_4', name: 'Hans Mueller',   room: '201', floor: 2, location: { x: 200, y: 250 }, status: 'safe',   sosActive: false, language: 'de' },
  { id: 'sample_5', name: 'Yuki Tanaka',    room: '401', floor: 4, location: { x: 350, y: 200 }, status: 'unsafe', sosActive: false, language: 'ja' },
  { id: 'sample_6', name: 'Priya Sharma',   room: '501', floor: 5, location: { x: 250, y: 300 }, status: 'unsafe', sosActive: false, language: 'hi' },
  { id: 'sample_7', name: 'Ahmed Al-Rashid',room: '102', floor: 1, location: { x: 180, y: 180 }, status: 'safe',   sosActive: false, language: 'ar' },
  { id: 'sample_8', name: 'Sofia Rossi',    room: '602', floor: 6, location: { x: 300, y: 250 }, status: 'unsafe', sosActive: false, language: 'it' },
];

const SAMPLE_MESSAGES = [
  { guestId: 'sample_1', guestName: 'Carlos Mendez',  room: '301', floor: 3, message: '¡Ayuda! Hay humo en mi habitación', originalLanguage: 'es', translatedMessage: 'Help! There is smoke in my room', priority: 'critical', status: 'unsafe' },
  { guestId: 'sample_2', guestName: 'Marie Dupont',   room: '302', floor: 3, message: 'Je suis coincée, où est la sortie?', originalLanguage: 'fr', translatedMessage: 'I am stuck, where is the exit?', priority: 'high', status: 'unsafe' },
  { guestId: 'sample_3', guestName: 'Wei Zhang',      room: '303', floor: 3, message: '救命！电梯坏了，我被困住了', originalLanguage: 'zh', translatedMessage: 'Help! The elevator is broken, I am trapped', priority: 'critical', status: 'unsafe' },
  { guestId: 'sample_4', guestName: 'Hans Mueller',   room: '201', floor: 2, message: 'Ich brauche Hilfe, die Treppe ist blockiert', originalLanguage: 'de', translatedMessage: 'I need help, the stairs are blocked', priority: 'high', status: 'unsafe' },
  { guestId: 'sample_5', guestName: 'Yuki Tanaka',    room: '401', floor: 4, message: '助けてください！出口はどこですか？', originalLanguage: 'ja', translatedMessage: 'Please help! Where is the exit?', priority: 'high', status: 'unsafe' },
  { guestId: 'sample_6', guestName: 'Priya Sharma',   room: '501', floor: 5, message: 'मुझे मदद चाहिए, मैं फंस गई हूं', originalLanguage: 'hi', translatedMessage: 'I need help, I am stuck', priority: 'medium', status: 'unsafe' },
  { guestId: 'sample_7', guestName: 'Ahmed Al-Rashid',room: '102', floor: 1, message: 'أنا بأمان، أين نقطة التجمع؟', originalLanguage: 'ar', translatedMessage: 'I am safe, where is the assembly point?', priority: 'low', status: 'safe' },
  { guestId: 'sample_8', guestName: 'Sofia Rossi',    room: '602', floor: 6, message: 'Aiuto! C\'è fumo nel corridoio', originalLanguage: 'it', translatedMessage: 'Help! There is smoke in the corridor', priority: 'critical', status: 'unsafe' },
];

// Seed store with sample data
SAMPLE_GUESTS.forEach(g => { store.guests[g.id] = { ...g, updatedAt: Date.now() }; });
SAMPLE_MESSAGES.forEach((m, i) => {
  store.messages.push({ ...m, id: `sample_msg_${i}`, fromResponder: false, createdAt: Date.now() - (8 - i) * 30000 });
});

// ─────────────────────────────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method === 'GET' && req.url === '/state') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(store));
    return;
  }
  res.writeHead(404); res.end();
});

const wss = new WebSocketServer({ server });
const clients = new Set();

function broadcast(data, exclude = null) {
  const msg = JSON.stringify(data);
  clients.forEach(c => { if (c !== exclude && c.readyState === 1) c.send(msg); });
}
function broadcastAll(data) {
  const msg = JSON.stringify(data);
  clients.forEach(c => { if (c.readyState === 1) c.send(msg); });
}

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`[+] Client connected. Total: ${clients.size}`);

  // Send full state to new client
  ws.send(JSON.stringify({ type: 'INIT', payload: store }));

  ws.on('message', (raw) => {
    let data;
    try { data = JSON.parse(raw); } catch { return; }
    const { type, payload } = data;

    switch (type) {
      case 'GUEST_REGISTER':
      case 'GUEST_UPDATE': {
        store.guests[payload.id] = { ...store.guests[payload.id], ...payload, updatedAt: Date.now() };
        broadcastAll({ type: 'GUEST_UPDATE', payload: store.guests[payload.id] });
        break;
      }
      case 'SOS_ALERT': {
        const alert = { ...payload, id: `sos_${Date.now()}`, createdAt: Date.now() };
        store.sosAlerts.push(alert);
        // Mark guest sosActive in store
        if (store.guests[payload.guestId]) {
          store.guests[payload.guestId].sosActive = true;
          store.guests[payload.guestId].status = 'unsafe';
        }
        broadcastAll({ type: 'SOS_ALERT', payload: alert });
        // Re-broadcast updated guest so map updates
        broadcastAll({ type: 'GUEST_UPDATE', payload: store.guests[payload.guestId] });
        break;
      }
      case 'SEND_MESSAGE': {
        const message = { ...payload, id: `msg_${++msgIdCounter}_${Date.now()}`, createdAt: Date.now() };
        store.messages.push(message);
        broadcastAll({ type: 'NEW_MESSAGE', payload: message });
        break;
      }
      case 'HAZARD_UPDATE': {
        store.hazards = payload;
        broadcast({ type: 'HAZARD_UPDATE', payload }, ws);
        break;
      }
      case 'PING':
        ws.send(JSON.stringify({ type: 'PONG' }));
        break;
    }
  });

  ws.on('close', () => { clients.delete(ws); console.log(`[-] Disconnected. Total: ${clients.size}`); });
  ws.on('error', () => clients.delete(ws));
});

// ── Hazard simulation (pushes to all clients every 12s) ──────────────────────
const HAZARD_TYPES = [
  { sensorType: 'Heat',       hazardType: 'fire',         threshold: 65, max: 100 },
  { sensorType: 'Smoke',      hazardType: 'fire',         threshold: 70, max: 100 },
  { sensorType: 'Water',      hazardType: 'flooded',      threshold: 60, max: 100 },
  { sensorType: 'Motion',     hazardType: 'crowded',      threshold: 80, max: 100 },
  { sensorType: 'CO2',        hazardType: 'crowded',      threshold: 1200, max: 2000 },
  { sensorType: 'GlassBreak', hazardType: 'blocked-exit', threshold: 50, max: 100 },
];

function simulateHazards() {
  const hazards = [];
  const floors = [1, 2, 3, 4, 5, 6, 7, 8];

  floors.forEach(floor => {
    if (Math.random() < 0.35) {
      const h = HAZARD_TYPES[Math.floor(Math.random() * HAZARD_TYPES.length)];
      const value = Math.floor(Math.random() * h.max);
      if (value > h.threshold) {
        const status = value > h.threshold * 1.3 ? 'Critical' : 'Warning';
        hazards.push({
          floor,
          sensorType: h.sensorType,
          hazardType: h.hazardType,
          value,
          status,
          location: {
            x: Math.floor(Math.random() * 500) + 50,
            y: Math.floor(Math.random() * 500) + 50,
          },
          id: `hz_${floor}_${h.sensorType}_${Date.now()}`,
        });
      }
    }
  });

  store.hazards = hazards;
  broadcastAll({ type: 'HAZARD_UPDATE', payload: hazards });
  if (hazards.length > 0) {
    console.log(`[Hazards] Simulated ${hazards.length} hazards across floors`);
  }
}

// Run hazard simulation every 12 seconds
setInterval(simulateHazards, 12000);
simulateHazards(); // initial run

server.listen(PORT, () => {
  console.log(`\n🚀 Sentinel-Pulse Relay  →  ws://localhost:${PORT}`);
  console.log(`👥 ${SAMPLE_GUESTS.length} sample guests seeded across floors 1-6`);
  console.log(`💬 ${SAMPLE_MESSAGES.length} multilingual messages seeded\n`);
});
