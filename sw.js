{
  "name": "ربات CST",
  "short_name": "CST",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#6a11cb",
  "theme_color": "#2575fc",
  "orientation": "portrait",
  "icons": [
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]

  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/cst/sw.js')
    .then(function(reg) { console.log('Registered', reg); })
    .catch(function(err) { console.error('SW registration failed', err); });
}

}
