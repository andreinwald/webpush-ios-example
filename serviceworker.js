// Code based on https://developer.apple.com/videos/play/wwdc2022/10098/
self.addEventListener('push', (event) => {
    let pushData = event.data.json();
    // Push data sample: {"title": "Push title","body":"body", "url":"https://andreinwald.github.io/webpush-ios-example/success.html"}
    if (!pushData.title) {
        console.error('Received WebPush with an empty title. Received body: ', pushData);
    }
    event.waitUntil(self.registration.showNotification(pushData.title, pushData));
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    console.log(event);

    if (!event.notification.url) {
        console.error('Received WebPush without url. Received body: ', event.notification)
        return;
    }

    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function () {
            return clients.openWindow(event.notification.url)
        })
    );
    // Track click
});
