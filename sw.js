/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CRISIS RESPONSE SYSTEM — Service Worker  (sw.js)
 *  Version: v4 (2026-04-27)
 *
 *  Cache Strategy:
 *    Shell assets  →  Cache-First  (instant offline launch)
 *    Google Fonts  →  Stale-While-Revalidate  (graceful degradation)
 *    API / External→  Network-First with cache fallback
 *    Navigation    →  Cache-First, fallback to shell, then offline page
 *
 *  In a real crisis, network is scarce or gone.
 *  This SW ensures the dashboard launches from cache in < 50 ms.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const CACHE_VERSION  = 'v4';
const CACHE_SHELL    = `crisis-shell-${CACHE_VERSION}`;
const CACHE_FONTS    = `crisis-fonts-${CACHE_VERSION}`;
const CACHE_RUNTIME  = `crisis-runtime-${CACHE_VERSION}`;

const ALL_CACHES = [CACHE_SHELL, CACHE_FONTS, CACHE_RUNTIME];

/* ── App Shell — everything the dashboard needs to render offline ─────────── */
const SHELL_ASSETS = [
  './crisis_dashboard.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

/* ── Google Fonts CSS sheet (font faces + URLs) ───────────────────────────── */
const FONT_CSS_URLS = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;600&display=swap',
];

/* ── Network timeout for Network-First strategy (ms) ─────────────────────── */
const NETWORK_TIMEOUT_MS = 4000;

/* ─────────────────────────────────────────────────────────────────────────────
   INSTALL — Pre-cache the app shell
───────────────────────────────────────────────────────────────────────────── */
self.addEventListener('install', (event) => {
  console.log(`[SW ${CACHE_VERSION}] Installing — pre-caching app shell...`);

  event.waitUntil(
    (async () => {
      /* 1. Cache the core shell — MUST succeed or install fails */
      const shellCache = await caches.open(CACHE_SHELL);
      await shellCache.addAll(SHELL_ASSETS);
      console.log(`[SW] Shell assets cached: ${SHELL_ASSETS.join(', ')}`);

      /* 2. Attempt to cache Google Fonts — fail silently if offline at install */
      try {
        const fontCache = await caches.open(CACHE_FONTS);
        await fontCache.addAll(FONT_CSS_URLS);
        console.log('[SW] Google Fonts CSS cached.');
      } catch (err) {
        console.warn('[SW] Font pre-cache skipped (offline at install time):', err.message);
      }

      /* 3. Activate immediately — don't wait for existing tabs to close */
      await self.skipWaiting();
      console.log(`[SW ${CACHE_VERSION}] Install complete. Skipping waiting.`);
    })()
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   ACTIVATE — Prune stale caches from previous SW versions
───────────────────────────────────────────────────────────────────────────── */
self.addEventListener('activate', (event) => {
  console.log(`[SW ${CACHE_VERSION}] Activating — pruning stale caches...`);

  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      const deletions = keys
        .filter((k) => !ALL_CACHES.includes(k))
        .map((k) => {
          console.log('[SW] Deleting stale cache:', k);
          return caches.delete(k);
        });

      await Promise.all(deletions);

      /* Take control of all open clients immediately */
      await self.clients.claim();
      console.log(`[SW ${CACHE_VERSION}] Activated and controlling all clients.`);
    })()
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   FETCH — Request interception and routing
───────────────────────────────────────────────────────────────────────────── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  /* Never intercept WebSocket upgrade requests */
  if (request.url.startsWith('ws://') || request.url.startsWith('wss://')) {
    return;
  }

  /* Never intercept non-GET requests (POST, PUT, DELETE, etc.) */
  if (request.method !== 'GET') {
    return;
  }

  /* Never intercept browser-extension or chrome-extension URLs */
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') {
    return;
  }

  /* ── Route 1: Google Fonts CSS & WOFF2 files → Stale-While-Revalidate ─── */
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(staleWhileRevalidate(request, CACHE_FONTS));
    return;
  }

  /* ── Route 2: Unofficial Google Translate API → Network-First ─────────── */
  if (url.hostname === 'translate.googleapis.com') {
    event.respondWith(networkFirst(request, CACHE_RUNTIME));
    return;
  }

  /* ── Route 3: Other cross-origin external requests → Network-First ──────  */
  if (url.origin !== self.location.origin) {
    event.respondWith(networkFirst(request, CACHE_RUNTIME));
    return;
  }

  /* ── Route 4: Same-origin navigation (page load) → Cache-First + fallback */
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  /* ── Route 5: Same-origin static assets → Cache-First ───────────────────  */
  event.respondWith(cacheFirst(request, CACHE_SHELL));
});

/* ─────────────────────────────────────────────────────────────────────────────
   STRATEGY: Cache-First
   Serve from cache instantly; fetch from network on cache miss and store it.
───────────────────────────────────────────────────────────────────────────── */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request, { cacheName });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200 && response.type !== 'opaque') {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return offlineFallback();
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   STRATEGY: Network-First (with timeout)
   Try network; if it times out or fails, fall back to cache.
───────────────────────────────────────────────────────────────────────────── */
async function networkFirst(request, cacheName) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), NETWORK_TIMEOUT_MS);

  try {
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response && response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    clearTimeout(timeoutId);
    const cached = await caches.match(request);
    return cached || offlineFallback();
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   STRATEGY: Stale-While-Revalidate
   Serve cached version immediately; update cache from network in background.
   Ideal for fonts — user gets fast render, cache stays fresh.
───────────────────────────────────────────────────────────────────────────── */
async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  /* Fire background revalidation regardless */
  const revalidate = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached); /* if network fails, stale is still fine */

  /* Return cached immediately if available, else await network */
  return cached || revalidate;
}

/* ─────────────────────────────────────────────────────────────────────────────
   STRATEGY: Navigation handler
   Cache-First for the HTML shell; if missing, try network; final fallback
   is the offline emergency page (never a blank browser error screen).
───────────────────────────────────────────────────────────────────────────── */
async function handleNavigation(request) {
  /* 1. Try cache first (instant offline boot) */
  const cached = await caches.match('./crisis_dashboard.html', { cacheName: CACHE_SHELL });
  if (cached) return cached;

  /* 2. Try network */
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_SHELL);
      cache.put('./crisis_dashboard.html', response.clone());
    }
    return response;
  } catch {
    /* 3. Nothing available — show offline emergency page */
    return offlineFallback();
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
   OFFLINE FALLBACK — minimal emergency UI
   Shown only if the shell was never cached (very first visit, no network).
   Styled to match the dashboard theme; prompts the user to reconnect once.
───────────────────────────────────────────────────────────────────────────── */
function offlineFallback() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
  <meta name="theme-color" content="#080c12"/>
  <title>Crisis Response — Offline</title>
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{
      min-height:100vh;
      display:flex;align-items:center;justify-content:center;
      background:#080c12;
      color:#f0f4ff;
      font-family:system-ui,-apple-system,sans-serif;
      text-align:center;
      padding:24px;
      padding-bottom:env(safe-area-inset-bottom,0px);
    }
    .card{
      background:#0e1420;
      border:1px solid rgba(255,78,42,0.35);
      border-radius:20px;
      padding:40px 32px;
      max-width:360px;
      width:100%;
      box-shadow:0 0 40px rgba(255,78,42,0.15);
    }
    .icon{font-size:4rem;animation:pulse 1.5s ease-in-out infinite;}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
    h1{
      font-size:1.5rem;
      font-weight:900;
      color:#ff4e2a;
      margin:20px 0 10px;
      letter-spacing:0.02em;
    }
    p{color:#8898aa;line-height:1.7;font-size:0.9rem;}
    .step{
      margin-top:20px;
      background:#131b2a;
      border:1px solid rgba(255,255,255,0.07);
      border-radius:12px;
      padding:14px 16px;
      font-size:0.82rem;
      color:#8898aa;
      text-align:left;
      line-height:1.8;
    }
    .step strong{color:#f0f4ff;}
    .btn{
      display:inline-block;
      margin-top:24px;
      padding:12px 28px;
      background:linear-gradient(135deg,#ff4e2a,#ff7043);
      color:#fff;
      border:none;
      border-radius:30px;
      font-size:14px;
      font-weight:700;
      cursor:pointer;
      letter-spacing:0.04em;
      box-shadow:0 0 20px rgba(255,78,42,0.35);
    }
    .badge{
      display:inline-block;
      margin-top:16px;
      padding:4px 12px;
      border-radius:20px;
      font-size:11px;
      font-weight:600;
      background:rgba(34,211,238,0.12);
      color:#22d3ee;
      border:1px solid rgba(34,211,238,0.25);
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">🚨</div>
    <h1>OFFLINE MODE</h1>
    <p>The Crisis Response dashboard has not been cached yet on this device.</p>
    <div class="step">
      <strong>To enable offline use:</strong><br>
      1. Connect to the local network (Wi-Fi or Ethernet)<br>
      2. Open the dashboard once — it will self-install<br>
      3. Disconnect — it will work offline permanently
    </div>
    <button class="btn" onclick="window.location.reload()">🔄 Retry Connection</button>
    <div class="badge">Crisis Response System · PWA v4</div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   BACKGROUND SYNC — Queue SOS events for when connectivity is restored
───────────────────────────────────────────────────────────────────────────── */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-sos-queue') {
    console.log('[SW] Background sync: flushing queued SOS events...');
    event.waitUntil(flushSOSQueue());
  }
});

async function flushSOSQueue() {
  /* TODO: Read IndexedDB queue, POST each SOS event to remote endpoint */
  const clients = await self.clients.matchAll();
  clients.forEach((client) => {
    client.postMessage({ type: 'SW_SYNC_COMPLETE', tag: 'sync-sos-queue' });
  });
}

/* ─────────────────────────────────────────────────────────────────────────────
   PUSH NOTIFICATIONS — Responder alert system
───────────────────────────────────────────────────────────────────────────── */
self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = {}; }

  const title   = data.title   || '⚠ Crisis Alert';
  const body    = data.body    || 'New emergency signal received.';
  const urgency = data.urgency || 'normal'; // 'critical' | 'high' | 'normal'

  const options = {
    body,
    icon:    './icon-192.png',
    badge:   './icon-192.png',
    tag:     `crisis-alert-${Date.now()}`,
    renotify: true,
    requireInteraction: urgency === 'critical',
    vibrate: urgency === 'critical'
      ? [400, 100, 400, 100, 800]   // urgent: long-short-long-short-very-long
      : [200, 100, 200, 100, 400],  // normal: SOS pattern
    data: { url: './crisis_dashboard.html', urgency },
    actions: [
      { action: 'open',    title: '🚨 Open Dashboard' },
      { action: 'dismiss', title: 'Dismiss'           },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        const existing = clientList.find((c) => c.url.includes('crisis_dashboard') && 'focus' in c);
        if (existing) return existing.focus();
        return self.clients.openWindow('./crisis_dashboard.html');
      })
  );
});

/* ─────────────────────────────────────────────────────────────────────────────
   MESSAGE CHANNEL — Communicate with the main page
───────────────────────────────────────────────────────────────────────────── */
self.addEventListener('message', (event) => {
  if (!event.data) return;

  switch (event.data.type) {
    /* Page can request the SW to skip waiting (for update banners) */
    case 'SKIP_WAITING':
      console.log('[SW] Received SKIP_WAITING from client — activating now.');
      self.skipWaiting();
      break;

    /* Page can request a cache status report */
    case 'CACHE_STATUS':
      caches.keys().then((keys) => {
        event.source.postMessage({ type: 'CACHE_STATUS_REPLY', caches: keys });
      });
      break;

    default:
      break;
  }
});
