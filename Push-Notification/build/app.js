'use strict';

//make sure that Service Workers are supported.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' }).then(function (registration) {
        console.log("Service Worker Registered!");
    }).catch(function (err) {
        console.log("Service Worker not registered!", err);
    });
}

// Function to perform HTTP request
var get = function get(url) {
    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var result = xhr.responseText;
                    result = JSON.parse(result);
                    resolve(result);
                } else {
                    reject(xhr);
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();
    });
};

get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY').then(function (response) {
    console.log(response);
    // There is an issue with the image being pulled from the API, so using a different one instead
    document.getElementsByClassName('targetImage')[0].src = response.url;
}).catch(function (err) {
    console.log("Error", err);
});