// Code mostly from https://developer.apple.com/videos/play/wwdc2022/10098/
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

self.addEventListener('notificationclick', async function (event) {
    if (!event.action)
        return;

    // This always opens a new browser tab,
    // even if the URL happens to already be open in a tab.
    clients.openWindow(event.action);
});
