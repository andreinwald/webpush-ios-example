# webpush-ios
WebPush for IOS sample code


## Generating VAPID key
VAPID stands for Voluntary Application Server Identification
```shell
npx web-push generate-vapid-keys --json

# will return something like
# {"publicKey":"BAwUJxIa7mJZMqu78T...","privateKey":"wH3Mire4Nr..."}
```

## Result of subscription
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



Resources:
- [Meet Web Push for Safari on developer.apple.com](https://developer.apple.com/videos/play/wwdc2022/10098/)
- [Sending web push notifications in web apps and browsers on developer.apple.com](https://developer.apple.com/documentation/usernotifications/sending_web_push_notifications_in_web_apps_and_browsers)
- [Vapid token standart](https://blog.mozilla.org/services/2016/08/23/sending-vapid-identified-webpush-notifications-via-mozillas-push-service/)
- [VAPID RFC standard](https://datatracker.ietf.org/doc/html/rfc8292)
- [Webpush options like image and actions](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)
- [Web App Manifest for standalone mode](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [The ServiceWorker lifecycle](https://web.dev/articles/service-worker-lifecycle)

Keywords:
- ServiceWorkerRegistration.pushManager is undefined
- undefined is not an object pushManager.subscribe
- User denied push permission
