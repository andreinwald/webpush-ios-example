self.addEventListener("install", (event) => {
    console.log('ServiceWorker is installed');
});

self.addEventListener("activate", (event) => {
    console.log('ServiceWorker is activated');
});
