const cacheName = "cacheFiles-Version-Name"

self.addEventListener('install', (event) => {
    // skip waiting helps to reload new service worker itself without manually clicking
   
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/javascript.js',
                    '/manifest.json',
                    '/CSS/main.css',
                    'images/music.jpg',
                    '/icons/manifest-icon-192.maskable.png'
                ]);
            })
            //Displays error message if errors in then function 
            .catch((error) => {
                console.log('Catch load failed: ', error);
            })
    )

});

// Activate service worker code block
self.addEventListener('activate', (event) => {

    console.log("Activation of Service Worker", event);
    event.waitUntil(clients.claim());

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                cacheNames.forEach((item) => {
                    if (item != cacheName) {
                        caches.delete(item);
                    }
                });
            })
    );

});

// fetching the event and responds the cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(cacheName)
            .then(async (cache) => {
                // console.log("Running here");
                const response = await cache.match(event.request);
                // console.log('Running there');
                return response || fetch(event.request);
            })
            .catch((error)=>{
                console.log("Fetch Error:",error);
            })
    );
});