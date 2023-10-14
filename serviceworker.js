self.addEventListener('push', (event) => {
    // PushData sample - https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    // {
    //   "title": "Push title",
    //   "body": "Additional text with some description",
    //   "data": {
    //     "url": "https://andreinwald.github.io/webpush-ios-example/success.html"
    //   }
    // }
    let pushData = event.data.json();
    if (!pushData || !pushData.title) {
        console.error('Received WebPush with an empty title. Received body: ', pushData);
    }
    event.waitUntil(self.registration.showNotification(pushData.title, pushData));

    // Track show
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (!event.notification.data) {
        console.error('Click on WebPush with empty data, where url should be. Notification: ', event.notification)
        return;
    }
    if (!event.notification.data.url) {
        console.error('Click on WebPush without url. Notification: ', event.notification)
        return;
    }

    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function () {
            return clients.openWindow(event.notification.data.url)
        })
    );

    // Track click
});
