const CACHE_NAME = 'mx-timer-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://github.com/italomota2011/mx/blob/main/icon.jpg?raw=true'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
