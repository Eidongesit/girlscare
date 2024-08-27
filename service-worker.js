// Define the cache version
const CACHE_NAME = 'my-cache-v1'; // Update this version when changes are made

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',                      // Cache the root page
        '/index.html',            // Cache index.html
        '/calculator.html',       // Cache calculator.html
        '/symptom.html',          // Cache symptom.html
        '/favicon-16x16.png',     // Cache favicon 16x16
        '/favicon-32x32.png',     // Cache favicon 32x32
        '/android-chrome-192x192.png', // Cache Android Chrome icon 192x192
        '/android-chrome-512x512.png', // Cache Android Chrome icon 512x512
        '/bootstrap.css',         // Cache Bootstrap CSS
        '/styles.css',            // Cache styles.css
        '/main.js',               // Cache main.js
        '/index.umd.js',          // Cache index.umd.js
        '/main.json',             // Cache main.json
        '/manifest.json',         // Cache manifest.json
        '/site.webmanifest',      // Cache site.webmanifest
        '/service-worker.js',     // Cache the service worker itself
        '/images/4.jpg',          // Cache image 4.jpg
        '/images/1.png',          // Cache image 1.png
        '/images/5.jpg',          // Cache image 5.jpg
        '/images/6.jpg',          // Cache image 6.jpg
        '/images/natalogo.jpg'    // Cache image natalogo.jpg
        // Add other assets as needed
      ]);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Delete outdated caches
            return caches.delete(cacheName);
          }
        })
      );
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
