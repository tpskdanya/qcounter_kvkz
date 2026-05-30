const CACHE_NAME = 'q-counter-v3.0.1';
const urlsToCache = [
  '/Q_Counter/',
  '/Q_Counter/index.html',
  '/Q_Counter/style.css',
  '/Q_Counter/script.js',
  '/Q_Counter/data.js',
  '/Q_Counter/MyFont.ttf',
  '/Q_Counter/icon-192.png',
  '/Q_Counter/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(err => console.error('Cache failed:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request).catch(() => {
          return caches.match('/Q_Counter/index.html');
        });
      })
  );
});
