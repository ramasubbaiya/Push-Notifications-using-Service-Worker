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

        var browser = function() {
            // Return cached result if avalible, else get result then cache it.
            if (browser.prototype._cachedResult)
                return browser.prototype._cachedResult;

            // Chrome 1+
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Safari 3.0+ "[object HTMLElementConstructor]" 
            var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/ false || !!document.documentMode;

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;

            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            // Blink engine detection
            var isBlink = (isChrome || isOpera) && !!window.CSS;

            return browser.prototype._cachedResult =
                isOpera ? 'Opera' :
                isFirefox ? 'Firefox' :
                isSafari ? 'Safari' :
                isChrome ? 'Chrome' :
                isIE ? 'IE' :
                isEdge ? 'Edge' :
                isBlink ? 'Blink' :
                "Unknown";
        };

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
        let infoStyle = styles + '; background: blue; border: 1px dashed white';

        // create utility methods
        let utilities = {};
        utilities = {
            version: about.version,
            isNotificationSupported: function() {
                return ('Notification' in window);
            },
            hasPermission: function() {
                return Notification.permission;
            },
            requestPermission: function() {
                return Notification.requestPermission();
            },
            // TODO: Needs work
            sendNotification: function(data = 'Hi') {
                if (this.hasPermission() === permission.GRANTED) {
                    if (typeof data === 'string') {
                        console.log(data);
                    } else if (typeof data === 'object') {
                        console.log(data);
                    }
                    return true;
                } else {
                    console.error('Invalid message');
                    return false;
                }
            },
            // TODO: Needs work
            subscribeUser: function() {

            },
            // TODO: Needs work
            subscribeForTopic: function(id, topic, attribute) {
                // Service Worker file needed for this

            },
            testNotification: function() {
                if (this.isNotificationSupported()) {
                    console.debug('%c Check 1: %c Notification is not supported on this browser', infoStyle, successStyle);
                } else {
                    console.debug('%c Check 1: %c Notification is not supported on this browser', infoStyle, failureStyle);
                }
                if (this.hasPermission() === permission.GRANTED) {
                    console.debug('%c Check 2: %c Yet, User has %s permission for the sending notification', infoStyle, successStyle, this.hasPermission());
                } else {
                    console.debug('%c Check 2: %c Yet, User has %s permission for the sending notification', infoStyle, failureStyle, this.hasPermission());
                }
                //sendNotification('Test');
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