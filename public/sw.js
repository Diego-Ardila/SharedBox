function receivePushNotification(event) {
  console.log("[Service Worker] Push Received.");
const { image, tag, url, title, text } = event.data.json();

const options = {
    data: url,
    body: text,
    icon: image,
    vibrate: [200, 100, 200],
    tag: tag,
    image: image,
    badge: "/favicon.ico",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  event.waitUntil(this.registration.showNotification(title, options));
}
function openPushNotification(event) {
  clients.openWindow(event.notification.data)
   event.notification.close();
}
this.addEventListener("notificationclick", openPushNotification);
this.addEventListener("push", receivePushNotification);