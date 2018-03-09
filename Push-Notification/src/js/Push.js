(function() {
    'use strict'; // use strict inside this library

    // start writing the functions from here
    var Push = function() {

        // general info about the file
        const about = {
            author: 'Rama',
            version: '1.0',
            date: {
                created: 'March 5th 2018',
                updated: 'March 5th 2018'
            },
            description: 'This library is for push notification. It is a message that pops up on a mobile device and desktops. App publishers can send them at any time; users don\'t have to be in the app or using their devices to receive them.'
        }

        let browserInfo = function() {
            var ua = navigator.userAgent,
                tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
                d = 'desktop',
                OSName = 'unknown-os';
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
                d = 'mobile';
            }
            if (navigator.appVersion.indexOf("Win") != -1)
                OSName = "windows";
            if (navigator.appVersion.indexOf("Mac") != -1)
                OSName = "mac";
            if (navigator.appVersion.indexOf("X11") != -1)
                OSName = "unix";
            if (navigator.appVersion.indexOf("Linux") != -1)
                OSName = "linux";
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return { name: 'ie', version: (tem[1] || ''), device: d, os: OSName };
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\bOPR\/(\d+)/)
                if (tem != null) {
                    return { name: 'opera', version: tem[1], device: d, os: OSName };
                }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            return { name: M[0].toLowerCase(), version: M[1], device: d, os: OSName };
        }

        let __browser = browserInfo();

        // making a regular ajax call with promise
        var httpRequest = function(opts) {
            return new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(opts.method, opts.url);
                xhr.onload = function() {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function() {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                if (opts.headers) {
                    Object.keys(opts.headers).forEach(function(key) {
                        xhr.setRequestHeader(key, opts.headers[key]);
                    });
                }
                var params = opts.params;
                // We'll need to stringify if we've been given an object
                // If we have a string, this is skipped.
                if (params && typeof params === 'object') {
                    params = Object.keys(params).map(function(key) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                    }).join('&');
                }
                xhr.send(params);
            });
        }

        // adding constants
        const permission = {
            DEFAULT: 'default',
            GRANTED: 'granted',
            DENIED: 'denied'
        }

        // console log styles for better display
        var styles = [, 'padding: 5px', 'color: white', 'font-size: 15px', 'line-height: 50px'].join(';');

        let successStyle = styles + '; background: green';
        let failureStyle = styles + '; background: red';
        let warningStyle = styles + '; background: yellow';
        let infoStyle = styles + '; background: blue; border: 0.5px dashed white';

        // create utility methods
        let utilities = {};
        utilities = {
            version: about.version,
            isNotificationSupported: function() { // check whether the browser supports Notification
                return ('Notification' in window);
            },
            hasPermission: function() { // check whether the user has granted permission for Notifications
                return Notification.permission;
            },
            requestPermission: function() { // ask user for permission to allow notifiactions on their screen to annoy them
                return Notification.requestPermission();
            },
            sendNotification: function(data = 'Hi, There!') { // send notification
                // permission can be changed at any moment of the time, so check every time before trying to sending
                if (this.hasPermission() === permission.GRANTED) {
                    if (typeof data === 'string' || (typeof data === 'object' && data !== null)) {
                        new Notification(data);
                    }
                    return true;
                } else {
                    console.error("Invalid Data");
                }
            },
            // TODO: Needs work
            register: function() { // send subscriber data to the server to send seever push notification
                if (this.requestPermission() === permission.DENIED) {
                    // Do nothing, as user can not given the permission for notification
                    console.warn('Notifiaction disabled by the user');
                } else {
                    // TODO
                    httpRequest()
                }

            },
            // TODO: Needs work
            unregister: function() {

            },
            // TODO: Needs work
            subscribeForTopic: function(id, topic, attribute) { // user subscribes for specific topic(products interested, newsletter)
                // Service Worker file needed for this
                // 1. check if user already subscribed, if not subscribe then subscribe for topic
                // 2. if subscribed then subscribe with subs ID(if user takes too long to subscribe)
            },
            // TODO: Needs work
            unsubscribeForTopic: function(id, topic, attribute) { // user subscribes for specific topic(products interested, newsletter)

            },
            testNotification: function() { // developer can test whether all the 3 checks works on their browser or any other browser
                if (this.isNotificationSupported()) {
                    console.debug('%c Check 1/3: %c Notification is supported on this%s.', infoStyle, successStyle, __browser.name);
                    // check if the user has granted the permission
                    if (this.hasPermission() === permission.GRANTED) {
                        console.debug('%c Check 2/3: %c User has%spermission for the sending notification.', infoStyle, successStyle, this.hasPermission());
                        this.sendNotification();
                        console.debug('%c Check 3/3: %c Now, look for any notification on your screen.', infoStyle, successStyle);
                    } else {
                        console.debug('%c Check 2/3: %c Has%spermission for the sending notification, User yet to grant or denied.', infoStyle, failureStyle, this.hasPermission());
                    }
                } else {
                    console.debug('%c Check 1/3: %c Notification is not supported on this%s, try differen browser.', infoStyle, failureStyle, __browser.name);
                }
            }
        }

        return utilities;
    }

    // check for the Push in the global scope
    if (typeof window.Push === 'undefined') {
        console.log('window', window);
        window.Push = Push();
    }

})();