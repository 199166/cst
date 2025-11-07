// نصب
self.addEventListener('install', event => {
  console.log('Service Worker نصب شد ✅');
  event.waitUntil(
    caches.open('pwa-global-v1').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './icons/icon-192x192.png',
        './icons/icon-512x512.png'
      ]);
    })
  );
  self.skipWaiting();
});

// فعال شدن
self.addEventListener('activate', event => {
  console.log('Service Worker فعال شد 🔥');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== 'pwa-global-v1') return caches.delete(key);
      }));
    })
  );
});

// واکنش به درخواست‌ها
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
