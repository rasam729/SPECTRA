# How to Run Sentinel-Pulse

## Prerequisites

- **Node.js 18+** — https://nodejs.org
- **npm 9+** (comes with Node.js)
- A modern browser (Chrome recommended for best PWA support)

---

## Step 1 — Install Dependencies (first time only)

Open three separate terminals and run:

```bash
# Terminal 1 — Relay server
cd local-relay
npm install

# Terminal 2 — Guest Mobile App
cd "Guest Mobile App"
npm install

# Terminal 3 — Response Team Dashboard
cd "Response Team Dashboard"
npm install
```

---

## Step 2 — Start the Relay Server

The relay server must be started **first** — it is the communication hub.

```bash
cd local-relay
node server.js
```

You should see:
```
🚀 Sentinel-Pulse Relay  →  ws://localhost:8765
👥 8 sample guests seeded across floors 1-6
💬 8 multilingual messages seeded
```

Keep this terminal open. The relay server must stay running.

---

## Step 3 — Start the Applications

**Terminal 2 — Guest Mobile App:**
```bash
cd "Guest Mobile App"
npm run dev
```
Opens on: http://localhost:3002

**Terminal 3 — Response Team Dashboard:**
```bash
cd "Response Team Dashboard"
npm run dev
```
Opens on: http://localhost:3001

---

## Step 4 — Open in Browser

| Application | URL |
|-------------|-----|
| Guest Mobile App | http://localhost:3002 |
| Response Team Dashboard | http://localhost:3001 |

Open both in separate browser windows or tabs.

---

## Testing the System

### 1. Register as a Guest
- Open http://localhost:3002
- Enter your name, room number, floor (try floor 3), and language
- Click **Start Navigation**

### 2. See Yourself on the Dashboard
- Open http://localhost:3001
- Switch to Floor 3 using the floor selector
- Your guest dot should appear on the map

### 3. Test Movement
- Use the arrow buttons on the guest app
- Watch your dot move in real-time on the dashboard

### 4. Test SOS
- Click the red **SOS** button on the guest app
- On the dashboard, your dot will pulse with red rings
- A notification toast will appear

### 5. Test Chat
- On the guest app, click the **chat bubble** button (bottom right)
- Type a message in any language (try Spanish: `¡Ayuda!`)
- On the dashboard, click the **chat button** (bottom right floating button)
- See the message with auto-translation to English
- Select the guest from the dropdown and reply
- The reply appears on the guest's chat screen

### 6. See Sample Guests
- The dashboard already shows 8 pre-seeded guests across floors 1–6
- Open the chat panel to see their multilingual messages

### 7. See Hazards
- Hazards are simulated automatically every 12 seconds
- They appear as dotted circles on both maps
- Switch floors to see hazards on different floors

---

## Running on Two Separate Devices (Same WiFi Network)

This allows you to test the guest app on a phone and the dashboard on a computer.

### Step 1 — Find Your Computer's IP Address

**Windows:**
```
ipconfig
```
Look for **IPv4 Address** under your WiFi adapter, e.g. `192.168.1.6`

**Mac/Linux:**
```
ifconfig | grep inet
```

### Step 2 — Update Relay Client URL on Guest App

The guest app's relay client connects to `ws://localhost:8765` by default. For cross-device use, update the URL in both relay files:

**`Guest Mobile App/src/services/relay.ts`** — change line:
```typescript
this.ws = new WebSocket('ws://localhost:8765');
```
to:
```typescript
this.ws = new WebSocket('ws://192.168.1.6:8765');  // your computer's IP
```

**`Response Team Dashboard/src/services/relay.ts`** — same change.

### Step 3 — Access from Phone

The apps already run with `host: true` so they're accessible on your network.

| Device | URL |
|--------|-----|
| Guest App (phone) | `http://192.168.1.6:3002` |
| Dashboard (computer) | `http://localhost:3001` or `http://192.168.1.6:3001` |

Replace `192.168.1.6` with your actual IP address.

### Step 4 — Install as PWA on Phone (Optional)

**Android (Chrome):**
1. Open `http://192.168.1.6:3002` in Chrome
2. Tap the menu (⋮) → **Add to Home screen** or **Install app**
3. Tap **Install**

**iOS (Safari):**
1. Open `http://192.168.1.6:3002` in Safari
2. Tap the **Share** button (square with arrow)
3. Scroll down → **Add to Home Screen**
4. Tap **Add**

---

## Stopping the Applications

Press `Ctrl+C` in each terminal to stop the servers.

---

## Troubleshooting

### "Cannot connect to relay server"
- Make sure `node server.js` is running in the `local-relay` folder
- Check that port 8765 is not blocked by a firewall
- On Windows, allow Node.js through Windows Firewall if prompted

### Guest not appearing on dashboard
- Ensure both apps are connected to the relay (check browser console for `[Relay] Connected`)
- Make sure you completed the welcome screen on the guest app
- Check that the dashboard is on the same floor as the guest

### Chat messages not appearing
- Open browser DevTools (F12) → Console tab
- Look for `[Relay] Connected` message
- If you see connection errors, restart the relay server

### Translation not working
- Google Translate requires an internet connection
- If offline, the app falls back to a built-in dictionary
- Check browser console for translation errors

### Port already in use
```bash
# Windows — kill process on port 3002
netstat -ano | findstr :3002
taskkill /F /PID <PID>

# Or kill all node processes
taskkill /F /IM node.exe
```

### Vite not finding modules
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## All URLs at a Glance

### Same Machine:
| App | URL |
|-----|-----|
| Guest Mobile App | http://localhost:3002 |
| Response Team Dashboard | http://localhost:3001 |
| AI Command Center | http://localhost:5173 |
| Relay Server (WebSocket) | ws://localhost:8765 |

### Cross-Device (replace IP with yours):
| App | URL |
|-----|-----|
| Guest Mobile App | http://192.168.1.6:3002 |
| Response Team Dashboard | http://192.168.1.6:3001 |
| AI Command Center | http://192.168.1.6:5173 |
| Relay Server | ws://192.168.1.6:8765 |
