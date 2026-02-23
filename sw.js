// sw.js - Otimizado para MX Lap Timer
const CACHE_NAME = 'mx-timer-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Adicione aqui outros arquivos locais como .css ou .js se tiver
  'https://raw.githubusercontent.com/italomota2011/mx/refs/heads/main/background.png'
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MX Timer: Armazenando arquivos para uso na pista...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativação: Remove caches antigos (importante para atualizações)
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

// Fetch: Intercepta as chamadas e prioriza o Cache, depois a Rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Se estiver no cache, retorna. Se não, busca na rede.
      return response || fetch(event.request).catch(() => {
        console.log('MX Timer: Offline e sem cache para esta requisição.');
      });
    })
  );
});
