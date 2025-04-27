const CACHE_NAME = 'liom-cache-v2';
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline.html' // اضافه کردن صفحه آفلاین به لیست کش
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // اگر فایل از کش پیدا نشد، درخواست رو از شبکه بگیر
      return response || fetch(event.request).catch(() => {
        // اگر کاربر آفلاین بود، صفحه آفلاین رو نمایش بده
        return caches.match('/offline.html');
      });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
