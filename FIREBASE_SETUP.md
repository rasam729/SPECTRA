# Firebase Setup Guide

## Step-by-Step Firebase Configuration

### 1. Create Firebase Project

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `response-team-dashboard` (or your preferred name)
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

### 2. Set Up Firestore Database

1. In the Firebase Console, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.time < timestamp.date(2025, 6, 1);
       }
     }
   }
   ```
4. Choose a Firestore location (select closest to your users)
5. Click **"Enable"**

### 3. Register Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click the **Web icon** (`</>`)
4. Register app:
   - App nickname: `Response Team Dashboard`
   - (Optional) Set up Firebase Hosting
5. Click **"Register app"**

### 4. Copy Firebase Configuration

You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

### 5. Update Your Project

1. Open `src/firebase/config.ts` in your project
2. Replace the placeholder config with your actual Firebase config:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
  projectId: "YOUR_ACTUAL_PROJECT_ID",
  storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
  messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
  appId: "YOUR_ACTUAL_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
```

### 6. Firestore Collections Structure

The app will automatically create these collections:

#### `hazards` Collection
```
hazards/
  └── {auto-generated-id}
      ├── floor: number
      ├── sensorType: string
      ├── value: number
      ├── isDanger: boolean
      ├── location: { x: number, y: number }
      ├── timestamp: Timestamp
      ├── status: string
      └── hazardType: string
```

#### `guestMessages` Collection
```
guestMessages/
  └── {auto-generated-id}
      ├── id: string
      ├── guestId: string
      ├── guestName: string
      ├── room: string
      ├── floor: number
      ├── message: string
      ├── originalLanguage: string
      ├── translatedMessage: string
      ├── timestamp: Timestamp
      ├── status: string
      └── priority: string
```

### 7. Security Rules for Production

When ready for production, update Firestore rules:

1. Go to **Firestore Database** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Hazards collection - read/write for authenticated users
    match /hazards/{hazardId} {
      allow read: if true; // Public read for dashboard
      allow write: if request.auth != null; // Only authenticated writes
    }
    
    // Guest messages - read/write for authenticated users
    match /guestMessages/{messageId} {
      allow read: if true; // Public read for dashboard
      allow write: if request.auth != null; // Only authenticated writes
    }
  }
}
```

3. Click **"Publish"**

### 8. Testing Firebase Connection

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Open browser console (F12)
3. Look for Firebase connection messages
4. Click "START" button to begin sensor simulation
5. Check Firestore Console to see data being written

### 9. Monitoring Data in Firebase Console

1. Go to **Firestore Database** in Firebase Console
2. You should see collections appearing:
   - `hazards` - Real-time sensor readings
   - `guestMessages` - Guest communications

3. Click on any document to view its data
4. Data updates in real-time as the simulation runs

### 10. Troubleshooting

#### Connection Issues
- Verify Firebase config is correct
- Check browser console for errors
- Ensure Firestore is enabled in Firebase Console

#### Permission Denied Errors
- Check Firestore security rules
- Ensure test mode is enabled for development
- Verify project ID matches

#### Data Not Appearing
- Check if simulation is running (green indicator)
- Verify Firebase config in `src/firebase/config.ts`
- Check browser network tab for Firebase requests

### 11. Optional: Firebase Emulator (Local Development)

For local development without using production Firebase:

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```

4. Start emulator:
   ```bash
   firebase emulators:start
   ```

5. Update `src/firebase/config.ts` to use emulator:
   ```typescript
   import { connectFirestoreEmulator } from 'firebase/firestore';
   
   // After initializing Firestore
   if (location.hostname === 'localhost') {
     connectFirestoreEmulator(db, 'localhost', 8080);
   }
   ```

## 🎉 You're All Set!

Your Response Team Dashboard is now connected to Firebase and ready to simulate real-time sensor data and guest communications.

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing)

## 💡 Tips

- **Free Tier**: Firebase offers generous free tier (50K reads/day, 20K writes/day)
- **Indexes**: Firestore may prompt you to create indexes for complex queries
- **Backup**: Consider setting up automated backups for production
- **Monitoring**: Use Firebase Console to monitor usage and performance
