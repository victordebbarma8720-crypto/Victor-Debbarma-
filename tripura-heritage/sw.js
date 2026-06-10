/* ============================================================
   Tripura Heritage — Service Worker
   Cache strategy: network-first for navigation, cache-first for assets
   ============================================================ */

'use strict';

const CACHE_NAME = 'tripura-heritage-v1';
const STATIC_ASSETS = [
  '/tripura-heritage/',
  '/tripura-heritage/index.html',
  '/tripura-heritage/catalog.html',
  '/tripura-heritage/product.html',
  '/tripura-heritage/cart.html',
  '/tripura-heritage/admin.html',
  '/tripura-heritage/styles.css',
  '/tripura-heritage/app.js',
  '/tripura-heritage/manifest.json',
  '/tripura-heritage/icons/icon-192.png',
  '/tripura-heritage/icons/icon-512.png'
];

const OFFLINE_FALLBACK = '/tripura-heritage/index.html';

/* ---------- INSTALL ---------- */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Tripura Heritage v1...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Pre-cache complete');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.warn('[SW] Pre-cache failed (some files may not exist yet):', err);
        return self.skipWaiting();
      })
  );
});

/* ---------- ACTIVATE ---------- */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activated and controlling all clients');
        return self.clients.claim();
      })
  );
});

/* ---------- FETCH ---------- */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin or our CDN assets
  if (!url.protocol.startsWith('http')) return;

  // Strategy selection
  if (request.mode === 'navigate') {
    // Navigation requests: network-first, fallback to cache, then offline page
    event.respondWith(networkFirstWithFallback(request));
  } else if (isStaticAsset(url)) {
    // Static assets (CSS, JS, icons): cache-first
    event.respondWith(cacheFirst(request));
  } else if (url.hostname === 'picsum.photos') {
    // Image CDN: cache-first with long TTL
    event.respondWith(cacheFirstImages(request));
  } else {
    // Everything else: network-first
    event.respondWith(networkFirst(request));
  }
});

/* ---------- STRATEGIES ---------- */

async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    // Last resort: serve offline page
    const offlineResponse = await caches.match(OFFLINE_FALLBACK);
    return offlineResponse || new Response(
      '<h1>You are offline</h1><p>Please check your internet connection.</p>',
      { headers: { 'Content-Type': 'text/html' } }
    );
  }
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('Asset not available offline', { status: 503 });
  }
}

async function cacheFirstImages(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    // Return a transparent 1x1 PNG as placeholder when offline
    const placeholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    return fetch(placeholder);
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Network error', { status: 503 });
  }
}

/* ---------- HELPERS ---------- */

function isStaticAsset(url) {
  return (
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('manifest.json')
  );
}

/* ---------- BACKGROUND SYNC (optional enhancement) ---------- */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});
