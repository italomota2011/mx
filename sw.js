// sw.js
const CACHE_NAME = 'mx-timer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://raw.githubusercontent.com/italomota2011/mx/refs/heads/main/logo.png',
  'https://github.com/italomota2011/mx/blob/main/icon.jpg?raw=true'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.claim();
});

self.addEventListener('fetch', (event) => {
  // NÃO cacheia chamadas do Firebase (Firestore/Auth)
  if (event.request.url.includes('googleapis.com') || event.request.url.includes('firebasejs')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
