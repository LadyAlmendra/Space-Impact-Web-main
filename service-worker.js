const CACHE_NAME = "space-impact-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./game.js",
  "./manifest.json",
  "./icon512_maskable.png",
  "./icon512_rounded.png",
  "./img/logo.png",
  "./img/arrowKeys.png",
  "./img/spacebar.png",
  "./img/special.png",
  "./img/buttonLeft.png",
  "./img/buttonUp.png",
  "./img/buttonRight.png",
  "./img/buttonDown.png",
  "./img/buttonFire.png",
  "./img/buttonX.png",
  "https://fonts.googleapis.com/css2?family=Silkscreen&family=VT323&display=swap"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
