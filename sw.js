// sw.js - Service Worker for FlexiCards
const CACHE_NAME = 'flexicards-v1';
const APP_URL = '/flexicards/flexicard2.html';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll([APP_URL, '/flexicards/']))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) return caches.delete(name);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cached) => {
                if (cached) return cached;
                return fetch(event.request)
                    .then((response) => {
                        const responseClone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseClone);
                        });
                        return response;
                    })
                    .catch(() => {
                        return new Response('Offline - please connect to internet to load the app.', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});
