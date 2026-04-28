# Quick Start Guide

Get the Response Team Dashboard running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies (1 minute)

```bash
cd "Response Team Dashboard"
pnpm install
```

### 2. Configure Firebase (2 minutes)

**Option A: Use Firebase (Recommended)**
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database (test mode)
3. Copy your Firebase config
4. Update `src/firebase/config.ts` with your config

**Option B: Mock Mode (Quick Demo)**
- Skip Firebase setup for now
- The app will show errors but UI will still work
- Sensor simulation won't persist data

### 3. Run the Dashboard (30 seconds)

```bash
pnpm dev
```

Open [http://localhost:3001](http://localhost:3001)

## 🎮 First Steps

### 1. Start Sensor Simulation
- Click the **"START"** button in the header
- Watch hazards appear on the map every 10 seconds

### 2. Explore the Map
- **Drag** to pan around the floor plan
- **Scroll** to zoom in/out
- Click **floor numbers** (bottom left) to switch floors

### 3. Monitor Sensors
- Check the **Sensor Panel** (left side) for readings
- Critical readings show in red
- Warnings show in amber

### 4. View Guest Messages
- Check the **Chat Panel** (right side)
- Toggle **Auto-Translate** to see translations
- Click a message to select it
- Type a response and press Enter

### 5. Change Floors
- Use the **Floor Selector** (bottom left)
- Click any floor number (1-8)
- Each floor has different guests and hazards

## 🎨 UI Overview

```
┌─────────────────────────────────────────────────────────────┐
│  RESPONSE TEAM DASHBOARD    [Controls]    [Time] [Theme]   │ ← Header
├──────────┬──────────────────────────────────┬───────────────┤
│          │                                  │               │
│ Sensor   │         Floor Plan Map          │  Guest Chat   │
│ Panel    │      (Pan, Zoom, Click)         │    Panel      │
│          │                                  │               │
│ • Heat   │  [Hazard Zones]                 │ • Messages    │
│ • Smoke  │  [Guest Locations]              │ • Translate   │
│ • Water  │  [Responder Teams]              │ • Reply       │
│          │  [Exits]                        │               │
│          │                                  │               │
│ Floor    │                                  │               │
│ Select   │                                  │               │
│ [1-8]    │                                  │               │
└──────────┴──────────────────────────────────┴───────────────┘
```

## 🔥 Demo Scenario

### Simulate a Fire Emergency

1. **Start Simulation**: Click START
2. **Wait 10-20 seconds**: Hazards will appear
3. **Check Sensors**: Look for Heat/Smoke readings > 65
4. **View Map**: Red zones indicate fire hazards
5. **Monitor Guests**: Red dots = guests in danger
6. **Read Messages**: Guests will send help requests
7. **Respond**: Click a message and type a response

### Test Different Floors

1. Click **Floor 3** (default)
2. Click **Floor 5** (wedding party)
3. Click **Floor 8** (penthouse suites)
4. Each floor has unique guest configurations

## 🎯 Key Features to Try

### Sensor Simulation
- ✅ Automatic hazard generation every 10 seconds
- ✅ Multiple sensor types (Heat, Smoke, Water, Motion, CO2)
- ✅ Critical/Warning/Normal status levels
- ✅ Real-time Firebase sync

### Guest Communication
- ✅ Multi-language messages (EN, ES, FR, ZH, DE)
- ✅ Auto-translate toggle
- ✅ Priority levels (Critical, High, Medium, Low)
- ✅ Floor filtering
- ✅ Two-way messaging

### Map Visualization
- ✅ 8-floor hotel layout
- ✅ Room grid with numbers
- ✅ Exit locations
- ✅ Responder team positions
- ✅ Guest locations
- ✅ Hazard zones with icons

## 🛠️ Controls Reference

### Header Controls
- **START/PAUSE**: Toggle sensor simulation
- **CLEAR**: Remove all hazards from Firebase
- **Theme Toggle**: Switch dark/light mode

### Map Controls
- **Left Click + Drag**: Pan the map
- **Scroll Wheel**: Zoom in/out
- **Click Guest**: Select guest (in AI Command Center version)

### Sensor Panel
- **Expand/Collapse**: Click "SENSORS" button
- **View Details**: See all sensor readings for current floor
- **Status Colors**: Red (Critical), Amber (Warning), Green (Normal)

### Chat Panel
- **Floor Filter**: Dropdown to filter by floor
- **Auto-Translate**: Toggle to show/hide translations
- **Select Message**: Click to select for reply
- **Send Reply**: Type and press Enter

## 📊 Understanding Sensor Readings

### Heat Sensor
- **Normal**: < 65°C
- **Warning**: 65-85°C
- **Critical**: > 85°C
- **Indicates**: Fire hazard

### Smoke Sensor
- **Normal**: < 70%
- **Warning**: 70-85%
- **Critical**: > 85%
- **Indicates**: Fire hazard

### Water Sensor
- **Normal**: < 60%
- **Warning**: 60-80%
- **Critical**: > 80%
- **Indicates**: Flooding

### Motion Sensor
- **Normal**: < 80 people
- **Warning**: 80-90 people
- **Critical**: > 90 people
- **Indicates**: Crowding

### CO2 Sensor
- **Normal**: < 1200 ppm
- **Warning**: 1200-1500 ppm
- **Critical**: > 1500 ppm
- **Indicates**: Poor ventilation/crowding

## 🐛 Troubleshooting

### "Firebase not configured" error
- Update `src/firebase/config.ts` with your Firebase config
- Or continue in demo mode (UI works, no data persistence)

### Hazards not appearing
- Click START button
- Wait 10-20 seconds
- Check browser console for errors
- Verify Firebase connection

### Messages not showing
- Ensure Firebase is configured
- Check Firestore rules allow read/write
- Verify `guestMessages` collection exists

### Map not rendering
- Check browser console for Canvas errors
- Try refreshing the page
- Ensure browser supports Canvas API

## 🎓 Next Steps

1. **Customize Floor Plans**: Edit `src/app/data/floorData.ts`
2. **Add More Sensors**: Extend `sensorSimulation.ts`
3. **Integrate Real APIs**: Replace mock translation with Google Translate API
4. **Add Authentication**: Implement Firebase Auth
5. **Deploy**: Use Firebase Hosting or Vercel

## 📚 Learn More

- [Full README](./README.md) - Complete documentation
- [Firebase Setup](./FIREBASE_SETUP.md) - Detailed Firebase guide
- [AI Command Center](../AI%20Command%20Center/) - Original design reference

## 💡 Pro Tips

1. **Performance**: Clear hazards periodically to avoid too many Firebase reads
2. **Testing**: Use Firebase Emulator for local development
3. **Customization**: All colors and styles are in CSS variables
4. **Data**: Guest locations and floor layouts are in `floorData.ts`
5. **Simulation**: Adjust timing in `sensorSimulation.ts` (line 42)

---

**Ready to respond! 🚨**
