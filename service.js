const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

const version = "0.0.3";
const cacheName = `arodic-${version}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
      ])
      .then(() => {
        self.skipWaiting();
        console.log('sw installed');
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(cacheName)
    .then(cache => {
      return cache.match(event.request, {ignoreSearch: true});
    })
    .then(response => {
      if (!response && event.request.url.search(event.request.referrer) !== -1) {
        caches.open(cacheName)
        .then(cache => {
          cache.addAll([event.request.url]);
        });
      }
      return response || fetch(event.request);
    }).catch(console.error)
  );
});

self.addEventListener('activate', async (event) => {
  event.waitUntil(self.clients.claim());
  console.log('sw activated');
  try {
    const applicationServerKey = urlB64ToUint8Array('BPZ6Tyf3h6EvdLkX07j4PyimVrsjIY7-pLHWsp_ls1FRe1-pD3ZJPXl4iSt7B3OarLtQrof3OioPM3yDxqhn-P4');
    const subscription = await self.registration.pushManager.subscribe({ applicationServerKey, userVisibleOnly: true });
    console.log('sw subscribed');
    clients.matchAll({type: "window"}).then((clientList) => {
      for (var i = 0; i < clientList.length; i++) {
        clientList[i].postMessage(JSON.stringify({subscription: subscription}));
      }
    });
  } catch (err) {
    console.log('Error', err);
  }
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon : './images/logo/io-512.png',
    image : './images/logo/io-512.png',
    badge : './images/logo/io-512.png',
    requireInteraction: true,
  }
  const notification = self.registration.showNotification('Hello', options);
  notification.onclick = function () {
    parent.focus();
    window.focus();
    this.close();
  };
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = 'https://akirodic.com/#page=1';
  event.waitUntil(
    clients.matchAll({type: "window"}).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
