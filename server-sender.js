// Public part of VAPID key, generation of that covered in README @TODO
// All subscription tokens associated with that key, so if you change it - you may lost old subscribers
// You MUST need generate your own VAPID keys!
// Newer share your PRIVATE_VAPID_KEY. It should be stored in a safe storage
const VAPID_PUBLIC_KEY = "BAwUJxIa7mJZMqu78Tfy2Sb1BWnYiAatFCe1cxpnM-hxNtXjAwaNKz1QKLU8IYYhjUASOFzSvSnMgC00vfsU0IM"
const VAPID_PRIVATE_KEY = "wH3Mire4Nrw7UWiYuD4e76qSezQ-5Nf_9n_HK3vHBSU";


let pushData = `
{
  "title": "Push title",
  "body": "Additional text with some description",
  "icon": "https://andreinwald.github.io/webpush-ios-example/images/favicon.png",
  "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
  "data": {
    "url": "https://andreinwald.github.io/webpush-ios-example/success.html",
    "message_id": "your_internal_unique_message_id_for_tracking"
  }
}
`;
