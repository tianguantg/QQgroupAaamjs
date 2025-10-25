const CACHE_NAME = 'quiz-assets-v2';
const PRECACHE_URLS = [
  'assets/fonts/Blippo.ttf',
  'assets/fonts/JingNanBoBoHei-Bold-2.ttf',
  'images/decisions/A.png',
  'images/decisions/X.png',
  'images/decisions/D.png',
  'images/decisions/HP.png',
  'images/decisions/ready.png',
  'images/decisions/dodg.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(
      PRECACHE_URLS.map(url => cache.add(url).catch(() => {}))
    );
    self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => {
      if (key !== CACHE_NAME) return caches.delete(key);
    }));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const isImage = request.destination === 'image';
  const isFont = request.destination === 'font';
  if (isImage || isFont) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        if (isImage) {
          // Return a 1x1 transparent PNG to avoid broken UI when image fails
          const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAF+wHnWqM0xQAAAABJRU5ErkJggg==';
          const bytes = Uint8Array.from(atob(pngBase64), c => c.charCodeAt(0));
          return new Response(bytes, { headers: { 'Content-Type': 'image/png' } });
        }
        return Response.error();
      }
    })());
  }
});