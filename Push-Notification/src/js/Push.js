//'use strict';

(function(window) {

    function Push() {

        const pemission = {
            DEFAULT: 'default',
            GRANTED: 'granted',
            DENIED: 'denied'
        }

        var protoypes = {
            // Just create a property to our library object.
            myCustomLog: function(thingToLog) {
                console.log("My-Custom-Log > Type of variable : " + typeof(thingToLog));
                console.log("My-Custom-Log > Is number : " + !isNaN(thingToLog));
                console.log("My-Custom-Log > Length : " + (thingToLog).length);

                return console.log(thingToLog);
            },
            isNotificationSupported: function() {
                return ('Notification' in window);
            },
            hasPermission: function() {
                return Notification.permission;
            },
            requestPermission: function() {
                return Notification.requestPermission();
            },
            sendNotification: function(data = 'Hi') {
                if (this.hasPermission() === permission.GRANTED)
                    if (typeof data === 'string') {
                        console.log(data);
                    } else if (typeof data === 'object') {
                    console.log(data);
                } else {
                    console.error('Invalid message')
                }
            },
            subscribe: function(a, b, c) {
                // Service Worker file needed for this
            }
        };

        return protoypes;
    }

    if (typeof window.Push === 'undefined') {
        window.Push = Push();
    }
})(window);

// Then we can call our custom function using
Push.myCustomLog(["My library", "Rules"]);

// var Push = function() {
//     // about
//     const Version = '1.0';
//     const Pemission = {
//         DEFAULT: 'default',
//         GRANTED: 'granted',
//         DENIED: 'denied'
//     }

//     let about = {
//         author: 'Rama',
//         date: {
//             created: 'March 5th 2018',
//             updated: 'March 5th 2018'
//         },
//         description: 'This library is for push notification. It is a message that pops up on a mobile device and desktops. App publishers can send them at any time; users don\'t have to be in the app or using their devices to receive them.'
//     }

//     // this.Protoype = {

//     //     test: function() {
//     //         return this;
//     //     }
//     // }

// }