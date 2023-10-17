if (navigator.serviceWorker) {
    initServiceWorker();
}

async function initServiceWorker() {
    let swRegistration = await navigator.serviceWorker.register('https://andreinwald.github.io/webpush-ios-example/serviceworker.js', {scope: '/webpush-ios-example/'})
    let pushManager = swRegistration.pushManager;

    if (!isPushManagerActive(pushManager)) {
        return;
    }

    let permissionState = await pushManager.permissionState({userVisibleOnly: true});
    switch (permissionState) {
        case 'prompt':
            break;
        case 'granted':
            displaySubscriptionInfo(await pushManager.getSubscription())
            document.getElementById('unsubscribe').style.display = 'none';
            break;
        case 'denied':
            document.getElementById('subscribe_btn').style.display = 'none';
            document.getElementById('active_sub').style.display = 'block';
            document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function isPushManagerActive(pushManager) {
    if (!pushManager) {
        if (!window.navigator.standalone) {
            document.getElementById('add-to-home-screen').style.display = 'block';
        } else {
            throw new Error('PushManager is not active');
        }
        document.getElementById('subscribe_btn').style.display = 'none';
        return false;
    } else {
        return true;
    }
}

async function subscribeToPush() {
    // Public part of VAPID key, generation of that covered in README
    // All subscription tokens associated with that key, so if you change it - you may lose old subscribers
    const VAPID_PUBLIC_KEY = 'BAwUJxIa7mJZMqu78Tfy2Sb1BWnYiAatFCe1cxpnM-hxNtXjAwaNKz1QKLU8IYYhjUASOFzSvSnMgC00vfsU0IM';

    let swRegistration = await navigator.serviceWorker.getRegistration();
    let pushManager = swRegistration.pushManager;
    if (!isPushManagerActive(pushManager)) {
        return;
    }
    let subscriptionOptions = {
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY
    };
    try {
        let subscription = await pushManager.subscribe(subscriptionOptions);
        displaySubscriptionInfo(subscription);

        // saving sub info to server
    } catch (error) {
        document.getElementById('active_sub').style.display = 'block';
        document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

async function unsubscribeFromPush() {
    let swRegistration = await navigator.serviceWorker.getRegistration();
    let pushManager = swRegistration.pushManager;
    if (!isPushManagerActive(pushManager)) {
        return;
    }

}

function displaySubscriptionInfo(subscription) {
    document.getElementById('subscribe_btn').style.display = 'none';
    document.getElementById('active_sub').style.display = 'block';
    document.getElementById('active_sub').innerHTML = '<b>Active subscription:</b><br>'
        + JSON.stringify(subscription.toJSON());
}

function sendTestNotification() {
    const title = "New Product Available";
    const options = {
        body: "Take a look at this brand new t-shirt!",
        icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        vibrate: [200, 100, 200],
        tag: "new-product",
        image: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
        badge: "https://spyna.it/icons/android-icon-192x192.png",
        actions: [{action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000"}]
    };
    navigator.serviceWorker.ready.then(function (serviceWorker) {
        serviceWorker.showNotification(title, options);
    });
}
