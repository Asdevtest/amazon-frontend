const CACHE_NAME = 'cache-and-update-v1'
const filesToCache = ['/']

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.addAll(filesToCache)
    })(),
  )
})

self.addEventListener('activate', event => {
  self.clients.claim()

  event.waitUntil(
    (async () => {
      // Remove old caches.
      const promises = (await caches.keys()).map(cacheName => {
        if (CACHE_NAME !== cacheName) {
          return caches.delete(cacheName)
        }
      })

      await Promise.all(promises)
    })(),
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request, {
        ignoreSearch: true,
      })
      return cachedResponse || fetch(event.request)
    })(),
  )
})
