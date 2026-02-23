const CACHE_NAME = 'mx4-v1';
const assets = [
  '/',
  '/index.html',
  '/gravar.html',
  '/historico.html',
  '/mapear.html',
  '/telemetria.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
