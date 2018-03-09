var cacheName = 'v4';

var cacheFiles = [
    './',
    './index.html',
    './css/reset.css',
    './css/style.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700,400italic,700italic',
    './js/app.js'
];

self.addEventListener('install', function(e) {
    console.log("[ServiceWorker] Installed")

    e.waitUntil(

        // return Promise to install ServiceWorker
        caches.open(cacheName).then(function(cache) {
            console.log("[ServiceWorker] Caching cacheFiles");
            //Add all the cache files to be cached by ServiceWorker
            return cache.addAll(cacheFiles);
        })
    )
});

self.addEventListener('activate', function(e) {
    console.log("[ServiceWorker] Activated")

    e.waitUntil(
        // Caches is the collection of caches 
        caches.keys().then(function(cacheNames) {

            return Promise.all(cacheNames.map(function(thisCacheName) {
                // checking current cache name corresponds to existing one
                if (thisCacheName !== cacheName) {
                    console.log("[ServiceWorker] Removing cached File from ", thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
});

// We have the cache, inorder to use them
self.addEventListener('fetch', function(e) {
    console.log("[ServiceWorker] Fetching", e.request.url);

    e.respondWith(
        //check if there is any match for that request
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log("[ServiceWorker] Found in cache", e.request.url);
                return response;
            }

            // the user is not online display our custom 404 page
            if (!navigator.onLine) {
                return caches.match(new Request('./other/offline.html'));
            }

            // clone the current request
            var requestClone = e.request.clone();

            // Use the new fetch api to send the request
            fetch(requestClone).then(function(response) {
                    if (!response) {
                        console.log("[ServiceWorker] No response from fetch");
                        return response;
                    }

                    // Now clone the response to store in the existing caches identified by cache name
                    var responseClone = response.clone();

                    caches.open(cacheName).then(function(cache) {
                        cache.put(e.request, responseClone);
                        return response;
                    });

                })
                .catch(function(err) {
                    console.log("[ServiceWorker] Error Fetching & Caching New")
                })
        })
    )
});