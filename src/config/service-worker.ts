if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js', { scope: '/' })
    .then(() => {
      console.log('Service Worker зарегистрирован')
    })
    .catch(() => {
      console.log('Service Worker регистрация не удалась')
    })
}
