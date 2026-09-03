// Service Worker mínimo para JB's Coach.
// Su única misión es cumplir el requisito técnico de "instalable":
// Chrome exige que exista un service worker que responda a "fetch".
// Además, de regalo, deja la app disponible sin internet una vez visitada.

const CACHE = 'jbcoach-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add('./'))
  );
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
