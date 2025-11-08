self.addEventListener('install', e => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('fetch', e => {
  // فقط برای فعال بودن تست
});
