self.addEventListener('push', (event) => {
    let pushData = event.data.json();
    // pushData sample: {"title": "Push title","body":"body", "url":"https://andreinwald.github.io/webpush-ios-example/success.html"}
    // read more about fields https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    if (!pushData || !pushData.title) {
        console.error('Received WebPush with an empty title. Received body: ', pushData);
    }
    event.waitUntil(self.registration.showNotification(pushData.title, pushData));

    // Track show
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (!event.notification.data || !event.notification.data.url) {
        console.error('Click on WebPush without url. Received body: ', event.notification)
        return;
    }

    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function () {
            return clients.openWindow(event.notification.data.url)
        })
    );

    // Track click
});
