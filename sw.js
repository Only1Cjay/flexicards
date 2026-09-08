// sw.js - Service Worker for FlexiCards
const CACHE_NAME = 'flexicards-v1';
const APP_URL = '/flexicards/flexicard2.html';

// Install event - cache the app
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Caching app files...');
                return cache.addAll([
                    APP_URL,
                    '/flexicards/'
                ]);
            })
            .then(() => {
                console.log('✅ Installation complete!');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        console.log('🗑️ Deleting old cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => {
            console.log('✅ Activation complete!');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cached) => {
                if (cached) {
                    console.log('📂 Serving from cache:', event.request.url);
                    return cached;
                }
                return fetch(event.request)
                    .then((response) => {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                        return response;
                    })
                    .catch(() => {
                        console.log('❌ Offline and not cached');
                        return new Response('Offline - please connect to internet to load the app.', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});
