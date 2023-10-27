# WebPush for iOS sample code and demo site
_WebPush - is browser technology that allows site developer send notifications from backend to subscribers. Now at iPhone and iPad!<br><br>_
**TL;DR iOS WebPush specifics**
- user required to add your site to **Home Screen** of his iPhone/iPad
- manifest.json is required to set **display: standalone**
- you **don't need** to register at apple.com to receive something like **GCM_SENDER_ID**
- instead, you need to generate **VAPID** (pair of public and private keys)
<br>

<b>Demo https://andreinwald.github.io/webpush-ios-example </b>

<img src="images/webpush-iphone-prompt.png" alt="Iphone prompt example" style="height:400px">

---
# More info
- [Installing PWA](#Installing-PWA)
- [Generating VAPID key](#Generating-VAPID-key)
- [Saving subscription token](#Saving-subscription-token)
- [Sending push message](#Sending-push-message)

## Installing PWA
WebPush is Progressive Web App(PWA) feature so you need to ask user to enable PWA mode first.<br>
On iOs devices it can be made with button **"Add to Home Screen"** in browser.<br><br>
<img src="images/webpush-add-to-home-screen.jpg" alt="Require adding to Home Screen" style="height:400px">

**Also dont forget to set display mode in manifest.json!**
```html
<html>
<head>
    <link rel="manifest" href="manifest.json"/>
</head>
# ...
```
manifest.json:
```json
{
  "name": "WebPush iOS example",
  "display": "standalone"
}
```
**Next you can check that PWA is installed by this code:**
```javascript
if (window.navigator.standalone) {
    // now we can ask for subscription by pushManager.subscribe()
} else {
    // we should ask user to add our site home screen
}
```

## Generating VAPID key
You **don't need** to register at apple.com to receive something like **GCM_SENDER_ID**, just generate VAPID key
- All subscription tokens associated with that key, so if you change it - you may lose old subscribers
- You MUST need generate your own VAPID keys!
- Newer share your PRIVATE_VAPID_KEY. It should be stored in a safe storage

```shell
openssl ecparam -genkey -name prime256v1 -out vapid_private.pem
openssl ec -in vapid_private.pem -pubout -outform DER|tail -c 65|base64|tr -d '=' |tr '/+' '_-' >> vapid_public.txt
echo 'VAPID public:' ; cat vapid_public.txt
# Example: BCa4t85iJ0AYDG__5r48lo-HNdpi_29458t8R6zRTsF1OUi1QyvCRd_tOyXVkqH3nzsZdMzSRLlKJTXQyN7QI4s

openssl ec -in vapid_private.pem -outform DER|tail -c +8|head -c 32|base64|tr -d '=' |tr '/+' '_-' >> vapid_private.txt
echo 'VAPID private:' ; cat vapid_private.txt
# Example: Mz8GQ4Fx16dI-iEUZTp6KTLVsUrcIOfJmWWXlKb0Qgo
```

Then use it:
```javascript
const VAPID_PUBLIC_KEY = 'BAwUJxIa7mJZMqu78Tfy2...';
let subscriptionOptions = {
    userVisibleOnly: true,
    applicationServerKey: VAPID_PUBLIC_KEY
};
let subscription = await pushManager.subscribe(subscriptionOptions);
```

## Saving subscription token
For most cases after receiving subscription you going to send it to backend via fetch or something.<br>
**Examples how subscription data looks:**<br><br>

For desktop and mobile Safari:
```json
{
  "endpoint": "https://web.push.apple.com/QGuQyavXutnMH...",
  "keys": {
    "p256dh": "BF6-hyiRMKKKiiH...",
    "auth": "lM6vKjBJ1UX..."
  }
}
```
And this will be for Google Chrome (FCM):
```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/eEsw5ryoAzo:APA91bHC...",
  "expirationTime": null,
  "keys": {
    "p256dh": "BKDBx7wkagZSlDsaT...",
    "auth": "zKa3taDY2VWoM4..."
  }
}
```

## Sending push message
You can send WebPush from **frontend**:
```javascript
const title = "Push title";
const options = {
    body: "Additional text with some description",
    icon: "https://andreinwald.github.io/webpush-ios-example/images/favicon.png",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
    data: {
        "url": "https://andreinwald.github.io/webpush-ios-example/success.html",
        "message_id": "your_internal_unique_message_id_for_tracking"
    },
};
navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
});
```

Or from **backend**, for example Node.js:


## Resources:
- [Meet Web Push for Safari on developer.apple.com](https://developer.apple.com/videos/play/wwdc2022/10098/)
- [Sending web push notifications in web apps and browsers on developer.apple.com](https://developer.apple.com/documentation/usernotifications/sending_web_push_notifications_in_web_apps_and_browsers)
- [Vapid token standard](https://blog.mozilla.org/services/2016/08/23/sending-vapid-identified-webpush-notifications-via-mozillas-push-service/)
- [VAPID RFC standard](https://datatracker.ietf.org/doc/html/rfc8292)
- [Webpush options like image and actions](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
- [Web App Manifest for standalone mode](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [The ServiceWorker lifecycle](https://web.dev/articles/service-worker-lifecycle)

## Keywords:
- ServiceWorkerRegistration.pushManager is undefined
- undefined is not an object pushManager.subscribe
- User denied push permission
