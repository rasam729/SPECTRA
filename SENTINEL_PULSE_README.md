# Sentinel-Pulse Emergency Response System

## 🚨 Real-Time Emergency Coordination Platform

Sentinel-Pulse is an AI-native emergency response system that provides real-time coordination between guests, response teams, and command centers during crisis situations.

---

## 📱 Download Mobile App

### For Guests:
**Web Link:** `http://localhost:5174` (Development)
**Production:** `https://your-domain.com/guest`

#### Installation Instructions:

**Android:**
1. Open the link in Chrome
2. Tap the menu (⋮) in the top right
3. Select "Install app" or "Add to Home screen"
4. Tap "Install" in the popup
5. The app will be added to your home screen

**iOS (iPhone/iPad):**
1. Open the link in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. The app will appear on your home screen

**Desktop (Chrome/Edge):**
1. Open the link in Chrome or Edge
2. Click the install icon (⊕) in the address bar
3. Click "Install" in the popup
4. The app will open in its own window

---

## 🎨 Design Features

### Purple Heatmap Visualization
- **Thermal signatures** displayed with purple gradient overlays
- **Heat intensity** shown through opacity and radius
- **Person detection** with confidence levels
- **Realistic appearance** suitable for professional deployment

### Reduced Hazard Frequency
- Only **critical hazards** displayed on map
- **Less visual clutter** for better decision-making
- **Focus on actionable threats** only
- **Cleaner, more professional** interface

### Analytics Dashboard
- **Real-time metrics** for guest safety
- **Safety percentage** with progress bars
- **SOS alert tracking** with visual indicators
- **Floor distribution charts** showing guest locations
- **Hazard criticality percentage** monitoring
- **System status** indicators

### Floating Chat Interface
- **Minimalist design** with floating button
- **Unread message badges** for notifications
- **Slide-in drawer** for full chat interface
- **Backdrop blur** for focus
- **Smooth animations** for professional feel

---

## 🚀 Quick Start

### 1. Start All Applications

```bash
# Run the batch script (Windows)
./run_all_apps.bat

# Or manually start each app
cd "AI Command Center" && npm run dev
cd "Guest Mobile App" && npm run dev
cd "Response Team Dashboard" && npm run dev
```

### 2. Access Applications

- **AI Command Center:** http://localhost:5173
- **Guest Mobile App:** http://localhost:5174
- **Response Team Dashboard:** http://localhost:5175

### 3. Test the System

1. **Open Guest Mobile App** on your phone or browser
2. **Enter guest details** and select language
3. **Install the app** using the install prompt
4. **Open Response Team Dashboard** on desktop
5. **See real-time updates** as guest moves
6. **Test SOS button** and see alerts
7. **Send chat messages** with auto-translation
8. **Navigate to exit** and see status change

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FIREBASE FIRESTORE                    │
│  (Real-Time Database & Synchronization)                  │
└─────────────────────────────────────────────────────────┘
         ↑                    ↑                    ↑
         │                    │                    │
    [WRITE]              [READ/WRITE]          [READ]
         │                    │                    │
    ┌────┴────┐          ┌────┴────┐         ┌────┴────┐
    │         │          │         │         │         │
┌───┴──┐  ┌──┴───┐  ┌───┴──┐  ┌──┴───┐  ┌──┴───┐
│Guest │  │Resp. │  │Guest │  │Resp. │  │  AI  │
│Mobile│  │Team  │  │Mobile│  │Team  │  │Command│
│ App  │  │Dash. │  │ App  │  │Dash. │  │Center│
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘
   ↓         ↓         ↓         ↓         ↓
Location  Analytics  Messages  Chat     Control
Updates   Display    Display   Panel    Center
```

---

## ✨ Key Features

### 1. Real-Time Guest Tracking
- Live position updates on all dashboards
- Purple heatmap visualization for thermal signatures
- SOS indicators with pulsing animations
- Status badges (safe/unsafe)

### 2. Multi-Language Communication
- Auto-detect 10 languages
- Real-time translation to English
- Language preference storage
- Text-to-speech in guest's language

### 3. Hazard-Aware Navigation
- A* pathfinding algorithm
- Dynamic hazard avoidance
- Floor-specific wall layouts
- Multiple path options (exits & responders)

### 4. Analytics Dashboard
- Total guest count with safe/unsafe breakdown
- Safety percentage with progress bar
- Active SOS alert counter
- Critical hazard percentage
- Floor distribution chart
- System status indicators

### 5. Emergency SOS System
- One-tap SOS activation
- Instant notifications to all dashboards
- Visual and audio alerts
- Location tracking during SOS

### 6. Floating Chat Interface
- Minimalist floating button
- Unread message badges
- Slide-in drawer interface
- Auto-translation support
- Quick reply buttons

---

## 🎯 Use Cases

### Hotels & Resorts
- Guest evacuation during fires
- Flood response coordination
- Earthquake emergency management
- Medical emergency assistance

### Office Buildings
- Employee safety tracking
- Emergency evacuation routes
- Responder team coordination
- Real-time hazard monitoring

### Shopping Malls
- Crowd management during emergencies
- Multi-floor evacuation
- Security team coordination
- Public safety announcements

### Hospitals
- Patient evacuation
- Staff coordination
- Medical equipment tracking
- Emergency response management

---

## 🔧 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Firebase Firestore** for real-time database
- **Firebase Hosting** for deployment
- **Service Workers** for offline support
- **Web Speech API** for text-to-speech

### PWA Features
- **Offline functionality** with service workers
- **Install prompts** for all platforms
- **Push notifications** for alerts
- **Home screen icons** for quick access

---

## 📱 PWA Installation Benefits

### For Guests:
- ✅ **Instant access** from home screen
- ✅ **Works offline** during network issues
- ✅ **Push notifications** for emergency alerts
- ✅ **Full-screen experience** without browser UI
- ✅ **Faster loading** with cached resources
- ✅ **Battery efficient** compared to web browsing

### For Organizations:
- ✅ **No app store approval** required
- ✅ **Instant updates** without user action
- ✅ **Cross-platform** (iOS, Android, Desktop)
- ✅ **Lower development cost** than native apps
- ✅ **Easy distribution** via web link
- ✅ **Analytics tracking** built-in

---

## 🔐 Security Features

### Data Protection
- Firebase security rules for access control
- HTTPS encryption for all communications
- Secure WebSocket connections
- No sensitive data stored locally

### Privacy
- Guest data deleted after evacuation
- No tracking outside emergency situations
- Language preferences stored locally
- Optional anonymous mode

---

## 📈 Analytics & Monitoring

### Real-Time Metrics
- Total guests in building
- Safe vs unsafe guest count
- Active SOS alerts
- Critical hazard percentage
- Floor distribution
- System health status

### Historical Data
- Response time tracking
- Evacuation efficiency
- Hazard patterns
- Communication logs

---

## 🌐 Deployment Options

### Option 1: Firebase Hosting (Recommended)
```bash
firebase init hosting
firebase deploy
```

### Option 2: Vercel
```bash
vercel --prod
```

### Option 3: Netlify
```bash
netlify deploy --prod
```

### Option 4: Docker
```bash
docker build -t sentinel-pulse .
docker run -p 3000:3000 sentinel-pulse
```

---

## 🆘 Support & Documentation

### Getting Help
- **Documentation:** See `DEPLOYMENT_INSTRUCTIONS.md`
- **Testing Guide:** See `TEST_SCRIPT.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`

### Common Issues
1. **Firebase connection failed:** Check config in `src/firebase/config.ts`
2. **PWA not installing:** Ensure HTTPS and valid manifest
3. **Real-time updates not working:** Verify Firestore rules
4. **Translation not working:** Check browser console for errors

---

## 🎨 Branding

### Colors
- **Primary:** Purple (#8b5cf6)
- **Secondary:** Cyan (#06b6d4)
- **Accent:** Blue (#0ea5e9)
- **Success:** Green (#10b981)
- **Danger:** Red (#ef4444)
- **Warning:** Amber (#f59e0b)

### Typography
- **Headings:** Inter, sans-serif
- **Body:** Inter, sans-serif
- **Monospace:** JetBrains Mono

---

## 📄 License

This project is proprietary software developed for emergency response coordination.

---

## 🙏 Acknowledgments

Built with modern web technologies for real-world emergency response scenarios.

**Sentinel-Pulse** - Protecting lives through intelligent coordination.

---

## 📞 Contact

For deployment assistance or customization:
- Email: support@sentinel-pulse.com
- Website: https://sentinel-pulse.com
- Emergency Hotline: Available 24/7

---

**Version:** 2.0.0  
**Last Updated:** April 2026  
**Status:** Production Ready ✅
