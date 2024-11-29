const CACHE_NAME = 'media_cache_v4.23.4290' // Обновлять каждую версию
const CACHE_LIFETIME = 30 * 24 * 60 * 60 * 1000 // 30 дней в миллисекундах

// Событие установки + добавляем изначальный кэш
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME) // Открываем кэш
      const fallbackCache = [
        '/favicon.ico',
        '/assets/icons/en.svg',
        '/assets/icons/ru.svg',
        '/assets/icons/ch.svg',
        '/assets/icons/ua.svg',
        '/assets/icons/fav-icon.svg',
        '/assets/img/defaultImage.png',
        '/assets/icons/favicon-20.09.ico',
        '/assets/sounds/notice3.mp3',
      ] // Изначальный кэш

      await cache.addAll(fallbackCache) // Добавляем изначальный кэш

      // Сохраняем время установки кэша
      const cacheMetadata = {
        installedAt: Date.now(),
      }
      await cache.put('/cache-metadata', new Response(JSON.stringify(cacheMetadata))) // Добавляем мета-данные в кэш

      self.skipWaiting() // активирует Service Worker минуя фазу ожидания активации
    })(),
  )
})

// Событие активации + очистка старых кэшей по времени и версиям
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      self.clients.claim() // Подтверждаем, что Service Worker активирован

      const cacheNames = await caches.keys() // Получаем список всех кэшей

      await Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName) // Удаляем старые кэши
          }
        }),
      )
    })(),
  )
})

// Обработка запросов (кэширование изображений, аудио и видео)
self.addEventListener('fetch', event => {
  const request = event.request // Получаем запрос

  // Проверяем, относится ли запрос к изображениям, аудио или видео
  if (['image', 'audio', 'video'].includes(request.destination)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME) // Открываем кэш
        const cachedResponse = await cache.match(request) // Проверяем, есть ли ресурс в кэше

        if (cachedResponse) {
          // Если ресурс есть в кэше, возвращаем его
          return cachedResponse
        }

        try {
          // Если ресурса нет в кэше, загружаем его из сети
          const networkResponse = await fetch(request)
          // Сохраняем в кэш
          cache.put(request, networkResponse.clone())
          return networkResponse
        } catch (error) {
          console.error(error)

          // Если ни сеть, ни кэш недоступны, возвращаем fallback (опционально)
          if (['image', 'video'].includes(request.destination)) {
            return caches.match('/assets/img/defaultImage.png')
          } else if (request.destination === 'audio') {
            return caches.match('/assets/sounds/notice3.mp3')
          }
        }
      })(),
    )
  }
})
