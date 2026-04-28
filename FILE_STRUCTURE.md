# Response Team Dashboard - File Structure

## 📁 Complete Project Structure

```
Response Team Dashboard/
│
├── 📄 Configuration Files (Root Level)
│   ├── package.json                    # Dependencies & scripts
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── tsconfig.node.json              # Node TypeScript config
│   ├── vite.config.ts                  # Vite build configuration
│   ├── index.html                      # HTML entry point
│   └── .gitignore                      # Git exclusions
│
├── 📚 Documentation Files (Root Level)
│   ├── README.md                       # Complete documentation (200+ lines)
│   ├── QUICKSTART.md                   # 5-minute setup guide
│   ├── FIREBASE_SETUP.md               # Detailed Firebase guide
│   ├── PROJECT_SUMMARY.md              # Architecture overview
│   ├── DEPLOYMENT.md                   # Production deployment guide
│   ├── INSTALLATION_COMPLETE.md        # Setup completion checklist
│   └── FILE_STRUCTURE.md               # This file
│
└── 📂 src/ (Source Code)
    │
    ├── 📂 app/
    │   │
    │   ├── 📂 components/              # React Components (8 files)
    │   │   ├── CommandHeader.tsx       # ⭐ Top navigation bar
    │   │   │   └── Features: Time, status, simulation controls, theme toggle
    │   │   │
    │   │   ├── ResponseMap.tsx         # ⭐ Main floor plan visualization
    │   │   │   └── Features: Canvas rendering, hazards, guests, pan/zoom
    │   │   │
    │   │   ├── SensorPanel.tsx         # ⭐ Sensor readings display
    │   │   │   └── Features: Real-time data, status indicators, progress bars
    │   │   │
    │   │   ├── GuestChatPanel.tsx      # ⭐ Guest communication hub
    │   │   │   └── Features: Messages, auto-translate, floor filter, replies
    │   │   │
    │   │   ├── FloorSelector.tsx       # Floor navigation (1-8)
    │   │   │   └── Features: Grid layout, active floor highlight
    │   │   │
    │   │   ├── NotificationToast.tsx   # Alert/notification system
    │   │   │   └── Features: Auto-dismiss, color-coded, animations
    │   │   │
    │   │   └── ThemeToggle.tsx         # Dark/Light mode switcher
    │   │       └── Features: Sun/Moon icon, smooth transition
    │   │
    │   ├── 📂 data/
    │   │   └── floorData.ts            # ⭐ Guest data for all 8 floors
    │   │       └── Contains: Guest locations, names, rooms, status
    │   │
    │   └── App.tsx                     # ⭐ Main application component
    │       └── Orchestrates: All components, state management, Firebase
    │
    ├── 📂 firebase/
    │   ├── config.ts                   # ⭐ Firebase initialization
    │   │   └── Setup: Firebase app, Firestore database
    │   │
    │   ├── sensorSimulation.ts         # ⭐ IoT sensor simulation engine
    │   │   └── Features: Auto-generation, threshold detection, Firebase sync
    │   │
    │   └── demoDataSeeder.ts           # Test data generator
    │       └── Features: Seed hazards, messages, specific floors
    │
    ├── 📂 styles/
    │   ├── index.css                   # Base styles & Tailwind imports
    │   ├── theme.css                   # Design tokens & CSS variables
    │   └── command-center.css          # Tactical/cyberpunk custom styles
    │
    └── main.tsx                        # ⭐ Application entry point
        └── Renders: React app to DOM
```

## 🎯 Key Files Explained

### ⭐ Critical Files (Must Configure)

#### 1. `src/firebase/config.ts`
**Purpose**: Firebase initialization
**Action Required**: Add your Firebase credentials
```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // ← Replace this
  authDomain: "YOUR_AUTH_DOMAIN",   // ← Replace this
  projectId: "YOUR_PROJECT_ID",     // ← Replace this
  // ... etc
};
```

#### 2. `src/app/App.tsx`
**Purpose**: Main application logic
**Contains**:
- State management
- Firebase listeners
- Component orchestration
- Simulation controls

#### 3. `src/firebase/sensorSimulation.ts`
**Purpose**: Sensor simulation engine
**Contains**:
- Automatic sensor reading generation
- Threshold detection logic
- Firebase write operations
- Guest message simulation

### 📊 Component Hierarchy

```
App.tsx (Root)
│
├── CommandHeader
│   ├── System name & status
│   ├── Simulation controls (START/PAUSE/CLEAR)
│   ├── Time display
│   └── ThemeToggle
│
├── ResponseMap (Center)
│   ├── Canvas rendering
│   ├── Hotel floor plan
│   ├── Hazard overlays
│   ├── Guest markers
│   ├── Exit locations
│   └── Responder teams
│
├── SensorPanel (Left)
│   ├── Summary statistics
│   ├── Sensor reading cards
│   ├── Status indicators
│   └── Progress bars
│
├── GuestChatPanel (Right)
│   ├── Message list
│   ├── Auto-translate toggle
│   ├── Floor filter
│   └── Reply interface
│
├── FloorSelector (Bottom Left)
│   └── Floor buttons (1-8)
│
└── NotificationToast (Top Right)
    └── Alert messages
```

## 📦 File Categories

### Configuration (6 files)
```
✅ package.json           - Dependencies
✅ tsconfig.json          - TypeScript config
✅ tsconfig.node.json     - Node TS config
✅ vite.config.ts         - Build config
✅ index.html             - HTML entry
✅ .gitignore             - Git exclusions
```

### Documentation (7 files)
```
✅ README.md                      - Complete docs
✅ QUICKSTART.md                  - Quick setup
✅ FIREBASE_SETUP.md              - Firebase guide
✅ PROJECT_SUMMARY.md             - Architecture
✅ DEPLOYMENT.md                  - Deployment
✅ INSTALLATION_COMPLETE.md       - Checklist
✅ FILE_STRUCTURE.md              - This file
```

### Source Code (15 files)
```
Components (8):
✅ CommandHeader.tsx
✅ ResponseMap.tsx
✅ SensorPanel.tsx
✅ GuestChatPanel.tsx
✅ FloorSelector.tsx
✅ NotificationToast.tsx
✅ ThemeToggle.tsx
✅ App.tsx

Firebase (3):
✅ config.ts
✅ sensorSimulation.ts
✅ demoDataSeeder.ts

Data (1):
✅ floorData.ts

Styles (3):
✅ index.css
✅ theme.css
✅ command-center.css

Entry (1):
✅ main.tsx
```

**Total: 28 files**

## 🔍 File Sizes (Approximate)

```
Large Files (>200 lines):
├── ResponseMap.tsx              ~350 lines
├── GuestChatPanel.tsx           ~280 lines
├── sensorSimulation.ts          ~250 lines
├── README.md                    ~400 lines
└── DEPLOYMENT.md                ~350 lines

Medium Files (100-200 lines):
├── App.tsx                      ~150 lines
├── SensorPanel.tsx              ~180 lines
├── CommandHeader.tsx            ~120 lines
├── floorData.ts                 ~180 lines
└── PROJECT_SUMMARY.md           ~300 lines

Small Files (<100 lines):
├── FloorSelector.tsx            ~60 lines
├── ThemeToggle.tsx              ~30 lines
├── NotificationToast.tsx        ~90 lines
├── config.ts                    ~20 lines
└── main.tsx                     ~15 lines
```

## 🎨 Style Files Breakdown

### `index.css`
- Tailwind imports
- Base resets
- Font definitions

### `theme.css`
- CSS custom properties
- Dark/Light mode variables
- Design tokens
- Color palette

### `command-center.css`
- Tactical scrollbar styles
- Custom animations
- Cyberpunk effects

## 🔥 Firebase Files Breakdown

### `config.ts`
- Firebase app initialization
- Firestore database setup
- Export db instance

### `sensorSimulation.ts`
- SensorSimulationEngine class
- Automatic sensor generation
- Threshold detection
- Firebase write operations
- Guest message simulation

### `demoDataSeeder.ts`
- DemoDataSeeder class
- Seed hazards
- Seed guest messages
- Seed specific floors

## 📊 Data Files Breakdown

### `floorData.ts`
```typescript
Floor 1: 3 guests
Floor 2: 4 guests
Floor 3: 4 guests
Floor 4: 3 guests
Floor 5: 4 guests
Floor 6: 3 guests
Floor 7: 4 guests
Floor 8: 3 guests

Total: 28 guests across 8 floors
```

Each guest has:
- ID, name, room number
- Status (safe/unsafe)
- Type (individual/group)
- Location (x, y coordinates)
- Group size (if applicable)
- Led by (if group)

## 🚀 Quick File Navigation

### Need to...

**Configure Firebase?**
→ `src/firebase/config.ts`

**Adjust sensor thresholds?**
→ `src/firebase/sensorSimulation.ts` (line 42)

**Add more guests?**
→ `src/app/data/floorData.ts`

**Change colors?**
→ `src/styles/theme.css`

**Modify map layout?**
→ `src/app/components/ResponseMap.tsx`

**Update translations?**
→ `src/app/components/GuestChatPanel.tsx` (line 28)

**Add new sensor types?**
→ `src/firebase/sensorSimulation.ts` (line 60)

**Change simulation timing?**
→ `src/firebase/sensorSimulation.ts` (line 42)

## 📚 Documentation Navigation

### Need help with...

**First-time setup?**
→ `QUICKSTART.md`

**Firebase configuration?**
→ `FIREBASE_SETUP.md`

**Understanding architecture?**
→ `PROJECT_SUMMARY.md`

**Deploying to production?**
→ `DEPLOYMENT.md`

**Complete feature reference?**
→ `README.md`

**Setup checklist?**
→ `INSTALLATION_COMPLETE.md`

## 🎯 Development Workflow

### 1. Initial Setup
```
1. Read: QUICKSTART.md
2. Edit: src/firebase/config.ts
3. Run: pnpm install
4. Run: pnpm dev
```

### 2. Customization
```
1. Edit: src/app/data/floorData.ts (guest data)
2. Edit: src/styles/theme.css (colors)
3. Edit: src/firebase/sensorSimulation.ts (sensors)
```

### 3. Testing
```
1. Start simulation (click START)
2. Check sensor panel
3. View hazards on map
4. Read guest messages
5. Switch floors
```

### 4. Deployment
```
1. Read: DEPLOYMENT.md
2. Run: pnpm build
3. Deploy: firebase deploy
```

## 🔧 Maintenance

### Regular Updates
- Clear old hazards periodically
- Monitor Firebase usage
- Update dependencies
- Review security rules

### Adding Features
- New components → `src/app/components/`
- New data → `src/app/data/`
- New styles → `src/styles/`
- New Firebase logic → `src/firebase/`

## ✅ File Checklist

Before deployment, ensure:
- [ ] Firebase config updated
- [ ] All dependencies installed
- [ ] Build successful
- [ ] All features tested
- [ ] Documentation reviewed
- [ ] Security rules configured

---

**Total Files**: 28
**Total Lines**: ~3,500+
**Languages**: TypeScript, CSS, Markdown
**Framework**: React + Vite
**Database**: Firebase Firestore

---

**Need help?** Check the documentation files or refer to this structure guide!
