// Code based on https://developer.apple.com/videos/play/wwdc2022/10098/
self.addEventListener('push', (event) => {
    let pushData = event.data.json();
    if (!pushData.title) {
        console.error('Received WebPush with an empty title. Received body: ' + JSON.stringify(pushData));
    }

    event.waitUntil(self.registration.showNotification(pushData.title, {
        body: pushData.body,
        tag: pushData.tag,
        // actions: [{
        //     action: pushData.actionURL,
        //     title: pushData.actionTitle,
        // }]
    }));
});


self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    if (!event.notification || !event.notification.data.url) {
        console.error('Received WebPush without url. Received body: ' + JSON.stringify(event.notification))
        return;
    }

    event.waitUntil(
        clients.matchAll({type: 'window'}).then(function () {
            return clients.openWindow(event.notification.data.url)
        })
    );
    // Track click
});
