const CACHE_NAME = 'justdoit-cache-v1'

// Add install event handler
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/manifest.json',
        '/justdoit.svg'
        // Add other important assets to cache
      ])
    })
  )
  self.skipWaiting()
})

// Add activate event handler
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
  event.waitUntil(clients.claim())
})

// Add fetch event handler
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
