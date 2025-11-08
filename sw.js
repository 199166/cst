const CACHE_NAME = 'cst-robot-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// نصب Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker نصب شد');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('کش کردن فایل‌ها');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// فعال‌سازی Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker فعال شد');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('حذف کش قدیمی:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// مدیریت درخواست‌ها
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET را کش می‌کنیم
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // اگر فایل در کش وجود دارد، از کش برگردان
        if (response) {
          return response;
        }

        // در غیر این صورت از شبکه دریافت کن
        return fetch(event.request)
          .then((response) => {
            // بررسی که پاسخ معتبر است
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // کلون پاسخ برای ذخیره در کش
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // اگر آفلاین هستیم و فایل در کش نیست
            // می‌توانید یک صفحه آفلاین برگردانید
            return new Response('آفلاین هستید. لطفا اتصال اینترنت را بررسی کنید.', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
              })
            });
          });
      })
  );
});
