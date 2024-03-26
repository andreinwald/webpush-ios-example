async function initServiceWorker() {
    let swRegistration = await navigator.serviceWorker.register('https://andreinwald.github.io/webpush-ios-example/serviceworker.js', {scope: '/webpush-ios-example/'})
    let pushManager = swRegistration.pushManager;

    if (!isPushManagerActive(pushManager)) {
        return;
    }

    let permissionState = await pushManager.permissionState({userVisibleOnly: true});
    switch (permissionState) {
        case 'prompt':
            document.getElementById('subscribe_btn').style.display = 'block';
            break;
        case 'granted':
            displaySubscriptionInfo(await pushManager.getSubscription())
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
        // Here you can send fetch request with subscription data to your backend API for next push sends from there
    } catch (error) {
        document.getElementById('active_sub').style.display = 'block';
        document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function displaySubscriptionInfo(subscription) {
    document.getElementById('subscribe_btn').style.display = 'none';
    document.getElementById('active_sub').style.display = 'block';
    document.getElementById('active_sub').innerHTML = '<b>Active subscription:</b><br><br>'
        + JSON.stringify(subscription.toJSON());
    document.getElementById('test_send_btn').style.display = 'block';
}

function testSend() {
    const title = "Push title";
    const options = {
        body: "Additional text with some description",
        icon: "https://andreinwald.github.io/webpush-ios-example/images/push_icon.jpg",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
        data: {
            "url": "https://andreinwald.github.io/webpush-ios-example/?page=success",
            "message_id": "your_internal_unique_message_id_for_tracking"
        },
    };
    navigator.serviceWorker.ready.then(async function (serviceWorker) {
        await serviceWorker.showNotification(title, options);
    });
}

if ((new URLSearchParams(window.location.search)).get('page') === 'success') {
    document.getElementById('content').innerHTML = 'You successfully opened page from WebPush! (this url was that was set in json data param)';
}

if (navigator.serviceWorker) {
    initServiceWorker();
}
