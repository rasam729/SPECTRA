# Sentinel-Pulse — Emergency Response System

A real-time emergency coordination platform with three interconnected applications: a **Guest Mobile App**, a **Response Team Dashboard**, and an **AI Command Center**. All three communicate through a local WebSocket relay server.

---

## Applications

| App | Port | Description |
|-----|------|-------------|
| Guest Mobile App | `3002` | Mobile-first navigation for hotel guests during emergencies |
| Response Team Dashboard | `3001` | Real-time command interface for responders |
| AI Command Center | `5173` | Sensor monitoring and heat signature tracking |
| Relay Server | `8765` | WebSocket hub connecting all apps |

---

## Features

### Guest Mobile App
- Floor plan map with blue glowing walls (4 unique layouts per floor)
- Rooms, stairways, and lifts drawn on each floor
- A* pathfinding that avoids walls and hazards
- Arrow key movement with real-time position sync to dashboard
- **SOS button** — one tap sends alert to dashboard with pulsing indicator
- **Chat** — type in any language, auto-translated to English via Google Translate
- Compass arrow pointing toward nearest safe exit
- Text-to-speech navigation directions (female voice)
- Hazard zones shown as dotted circles (synced from dashboard)
- PWA installable on Android/iOS

### Response Team Dashboard
- Live floor plan map with same wall layout as guest app
- All guests shown as dots — SOS guests pulse with red rings
- 8 sample guests pre-seeded across floors 1–6 with multilingual messages
- Hazards simulated every 12 seconds by relay server (fire, flood, CO2, etc.)
- **Floating chat button** — opens slide-in panel to reply to any guest
- Auto-translation: guest messages shown in original language + English
- Analytics sidebar with pie chart, bar charts, and line graph
- Floor selector (floors 1–8)
- Notification toasts for SOS and hazard events

### Relay Server
- WebSocket server on `ws://localhost:8765`
- Stores guests, messages, hazards, SOS alerts in memory
- Seeds 8 sample guests with multilingual emergency messages on startup
- Simulates realistic hazards every 12 seconds across all floors
- Broadcasts all events to all connected clients instantly

---

## Tech Stack

- **React 18** + TypeScript + Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Canvas API** for floor plan rendering
- **WebSocket** (ws library) for real-time relay
- **Google Translate API** (free unofficial endpoint) for auto-translation
- **Web Speech API** for text-to-speech directions
- **PWA** with service worker for offline support

---

## Quick Start

See `HOW_TO_RUN.md` for full instructions.

```bash
# 1. Start relay server
cd local-relay && node server.js

# 2. Start Guest Mobile App
cd "Guest Mobile App" && npm run dev

# 3. Start Response Team Dashboard
cd "Response Team Dashboard" && npm run dev
```

Then open:
- Guest App: http://localhost:3002
- Dashboard: http://localhost:3001

---

## Sample Guests (Pre-seeded)

| Name | Floor | Room | Language | Message |
|------|-------|------|----------|---------|
| Carlos Mendez | 3 | 301 | Spanish | ¡Ayuda! Hay humo en mi habitación |
| Marie Dupont | 3 | 302 | French | Je suis coincée, où est la sortie? |
| Wei Zhang | 3 | 303 | Chinese | 救命！电梯坏了，我被困住了 |
| Hans Mueller | 2 | 201 | German | Ich brauche Hilfe, die Treppe ist blockiert |
| Yuki Tanaka | 4 | 401 | Japanese | 助けてください！出口はどこですか？ |
| Priya Sharma | 5 | 501 | Hindi | मुझे मदद चाहिए, मैं फंस गई हूं |
| Ahmed Al-Rashid | 1 | 102 | Arabic | أنا بأمان، أين نقطة التجمع؟ |
| Sofia Rossi | 6 | 602 | Italian | Aiuto! C'è fumo nel corridoio |

All messages are auto-translated to English in the dashboard chat panel.

---

## Auto-Translation

Uses the same Google Translate free endpoint as the Main Dashboard + Chatbox reference implementation:

```
https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=<text>
```

Supports 20+ languages including Spanish, French, Chinese, German, Japanese, Arabic, Hindi, Italian, Portuguese, Russian, Korean, and more. Falls back to an offline dictionary if the network request fails.

---

## Hazard Simulation

The relay server simulates sensor readings every 12 seconds:
- **Fire** — Heat and Smoke sensors
- **Flood** — Water sensors  
- **Crowding** — Motion and CO2 sensors
- **Blocked exits** — GlassBreak sensors

Hazards appear on both the dashboard map and the guest map (filtered by floor). Only `Critical` status hazards are shown on the map to reduce clutter.

---

## SOS Flow

1. Guest taps SOS button on mobile app
2. Relay server receives `SOS_ALERT` event
3. Guest's `sosActive` flag is set to `true` in relay store
4. Dashboard receives both `SOS_ALERT` (notification toast) and `GUEST_UPDATE` (map update)
5. Guest appears on dashboard map with pulsing red rings
6. Analytics sidebar shows active SOS count

---

## Chat Flow

1. Guest types message in any language
2. Google Translate detects language and translates to English
3. Both original and translated text sent via relay
4. Dashboard chat panel shows: original language label + English translation
5. Responder selects guest from dropdown and types reply
6. Reply sent via relay to guest's chat screen
7. Guest's phone speaks the reply via text-to-speech

---

## Project Structure

```
Crisis Response/
├── local-relay/          # WebSocket relay server
│   ├── server.js
│   └── package.json
├── Guest Mobile App/     # React PWA for guests
│   └── src/
│       ├── app/
│       │   ├── App.tsx
│       │   └── components/
│       │       ├── GuestMap.tsx      # Canvas floor plan
│       │       ├── GuestChat.tsx     # Chat with translation
│       │       ├── SOSButton.tsx     # SOS trigger
│       │       └── ...
│       ├── services/
│       │   ├── relay.ts              # WebSocket client
│       │   └── translation.ts        # Google Translate
│       └── utils/
│           └── pathfinding.ts        # A* algorithm
├── Response Team Dashboard/  # React dashboard
│   └── src/
│       ├── app/
│       │   ├── App.tsx
│       │   └── components/
│       │       ├── ResponseMapV2.tsx     # Canvas map
│       │       ├── GuestChatPanel.tsx    # Chat panel
│       │       ├── FloatingChatButton.tsx
│       │       └── AnalyticsDashboard.tsx
│       └── services/
│           └── relay.ts
├── AI Command Center/    # Sensor monitoring
├── Hotel Floor Plan Design/  # Reference floor plan
├── Dynamic Guest Map View/   # Reference map design
└── Main Dashboard + Chatbox/ # Reference dashboard
```
