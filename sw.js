// sw.js - Safe Service Worker for FlexiCards
const CACHE_NAME = 'flexicards-v3'; // New version forces update

// Install: Only cache the main HTML file
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.add('/flexicards/flexicard2.html'))
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean up old caches immediately
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim()) // Take control immediately
    );
});

// Fetch: Network first, fallback to cache
self.addEventListener('fetch', event => {
    // Ignore non-GET requests and requests to other domains
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Cache a copy for offline use
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => {
                // If offline, try to serve the cached HTML
                return caches.match(event.request).then(cached => {
                    if (cached) return cached;
                    // Fallback
                    return new Response('Offline: Please connect to the internet.', { status: 503 });
                });
            })
    );
});
