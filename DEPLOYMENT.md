# Deployment Guide

Deploy your Response Team Dashboard to production in minutes!

## 🚀 Deployment Options

### Option 1: Firebase Hosting (Recommended)

**Pros**: Free tier, automatic SSL, CDN, easy setup
**Best for**: Quick deployment, Firebase integration

#### Steps:

1. **Install Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase**
```bash
firebase login
```

3. **Initialize Firebase Hosting**
```bash
cd "Response Team Dashboard"
firebase init hosting
```

Select:
- Use existing project (your Firebase project)
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub deploys: `No` (or Yes if you want CI/CD)

4. **Build the project**
```bash
pnpm build
```

5. **Deploy**
```bash
firebase deploy --only hosting
```

6. **Access your app**
```
https://your-project-id.web.app
```

### Option 2: Vercel

**Pros**: Zero config, automatic deployments, preview URLs
**Best for**: GitHub integration, team collaboration

#### Steps:

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd "Response Team Dashboard"
vercel
```

3. **Follow prompts**
- Link to existing project or create new
- Set build command: `pnpm build`
- Set output directory: `dist`

4. **Production deployment**
```bash
vercel --prod
```

### Option 3: Netlify

**Pros**: Drag-and-drop, form handling, serverless functions
**Best for**: Simple deployments, static sites

#### Steps:

1. **Build the project**
```bash
pnpm build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or drag-and-drop `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Option 4: GitHub Pages

**Pros**: Free, integrated with GitHub
**Best for**: Open source projects

#### Steps:

1. **Install gh-pages**
```bash
pnpm add -D gh-pages
```

2. **Update package.json**
```json
{
  "scripts": {
    "predeploy": "pnpm build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/response-team-dashboard"
}
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/response-team-dashboard/',
  // ... rest of config
});
```

4. **Deploy**
```bash
pnpm deploy
```

## 🔧 Pre-Deployment Checklist

### 1. Environment Configuration

Create `.env.production`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Update `src/firebase/config.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

### 2. Firebase Security Rules

Update Firestore rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Hazards - read for all, write for authenticated
    match /hazards/{hazardId} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }
    
    // Guest messages - read for all, write for authenticated
    match /guestMessages/{messageId} {
      allow read: if true;
      allow write: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

### 3. Build Optimization

Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore'],
          'vendor': ['react', 'react-dom'],
          'motion': ['motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
```

### 4. Performance Optimization

Add to `index.html`:
```html
<head>
  <!-- Preconnect to Firebase -->
  <link rel="preconnect" href="https://firestore.googleapis.com">
  <link rel="dns-prefetch" href="https://firestore.googleapis.com">
  
  <!-- Meta tags -->
  <meta name="description" content="Real-time emergency response dashboard">
  <meta name="theme-color" content="#0a0e1a">
</head>
```

## 🔒 Security Hardening

### 1. Firebase App Check

Enable App Check in Firebase Console:
1. Go to App Check in Firebase Console
2. Register your app
3. Add reCAPTCHA v3 site key

Update `src/firebase/config.ts`:
```typescript
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const app = initializeApp(firebaseConfig);

// Enable App Check
if (import.meta.env.PROD) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('your-recaptcha-site-key'),
    isTokenAutoRefreshEnabled: true,
  });
}
```

### 2. Content Security Policy

Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://www.gstatic.com; 
               style-src 'self' 'unsafe-inline'; 
               connect-src 'self' https://*.googleapis.com https://*.firebaseio.com; 
               img-src 'self' data: https:;">
```

### 3. Rate Limiting

Implement client-side rate limiting:
```typescript
// src/utils/rateLimiter.ts
export class RateLimiter {
  private timestamps: number[] = [];
  
  canProceed(maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < windowMs);
    
    if (this.timestamps.length < maxRequests) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}
```

## 📊 Monitoring & Analytics

### 1. Firebase Performance Monitoring

```typescript
import { getPerformance } from 'firebase/performance';

const perf = getPerformance(app);
```

### 2. Google Analytics

```typescript
import { getAnalytics } from 'firebase/analytics';

const analytics = getAnalytics(app);
```

### 3. Error Tracking (Sentry)

```bash
pnpm add @sentry/react
```

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

## 🧪 Testing Before Deployment

### 1. Build Test
```bash
pnpm build
pnpm preview
```

### 2. Lighthouse Audit
- Open Chrome DevTools
- Run Lighthouse audit
- Target scores: Performance >90, Accessibility >95

### 3. Cross-Browser Testing
- Chrome/Edge (Chromium)
- Firefox
- Safari

### 4. Mobile Testing
- Responsive design check
- Touch interactions
- Performance on mobile networks

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        env:
          VITE_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          VITE_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
          
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

## 📱 PWA Configuration (Optional)

### 1. Add manifest.json
```json
{
  "name": "Response Team Dashboard",
  "short_name": "Response",
  "description": "Real-time emergency response dashboard",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0e1a",
  "theme_color": "#00ffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Add Service Worker
```bash
pnpm add -D vite-plugin-pwa
```

Update `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Response Team Dashboard',
        short_name: 'Response',
        theme_color: '#00ffff',
      },
    }),
  ],
});
```

## 🌍 Custom Domain

### Firebase Hosting
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Wait for SSL certificate (automatic)

### Vercel
1. Go to project settings
2. Add custom domain
3. Configure DNS (A/CNAME records)
4. SSL automatic

## 📈 Post-Deployment

### 1. Monitor Performance
- Firebase Console → Performance
- Check load times, API latency
- Monitor error rates

### 2. Set Up Alerts
- Firebase Console → Alerts
- Configure budget alerts
- Set up error notifications

### 3. Backup Strategy
- Export Firestore data regularly
- Version control for code
- Document configuration

## 🆘 Rollback Plan

### Firebase Hosting
```bash
firebase hosting:rollback
```

### Vercel
- Go to Deployments
- Click "..." on previous deployment
- Select "Promote to Production"

## ✅ Deployment Checklist

- [ ] Firebase project created
- [ ] Firestore security rules updated
- [ ] Environment variables configured
- [ ] Build successful locally
- [ ] Preview deployment tested
- [ ] Cross-browser testing complete
- [ ] Mobile testing complete
- [ ] Performance audit passed
- [ ] Security headers configured
- [ ] Monitoring enabled
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Backup strategy in place
- [ ] Team notified

## 🎉 Success!

Your Response Team Dashboard is now live and ready to handle emergency responses!

**Next Steps**:
1. Share the URL with your team
2. Monitor initial usage
3. Gather feedback
4. Iterate and improve

---

**Need help?** Check the troubleshooting section in README.md
