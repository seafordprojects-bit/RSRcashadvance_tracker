// RSR Billing Tracker service worker.
// Network-first so you always get the newest deploy, with cache as offline
// fallback. This file is what makes Android offer a real "Install app".

const CACHE = 'rsr-tracker-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone()
        caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => {})
        return res
      })
      .catch(() => caches.match(event.request)),
  )
})
