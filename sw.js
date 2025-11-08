if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/cst/sw.js')
    .then(function(reg) { console.log('Registered', reg); })
    .catch(function(err) { console.error('SW registration failed', err); });
}
