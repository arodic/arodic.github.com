// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i)
  return outputArray
}

const deleteSubscription = async subscription => {
  console.log('deleteing', subscription);
  const response = await fetch('http://localhost:4000/delete-subscription', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(subscription),
  })
  return response.json()
}
const saveSubscription = async subscription => {
  console.log('saving', subscription);
  const response = await fetch('http://localhost:4000/save-subscription', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(subscription),
  })
  return response.json()
}

let subscription;

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', async (event) => {
  event.waitUntil(self.clients.claim());
  try {
    const applicationServerKey = urlB64ToUint8Array('BPZ6Tyf3h6EvdLkX07j4PyimVrsjIY7-pLHWsp_ls1FRe1-pD3ZJPXl4iSt7B3OarLtQrof3OioPM3yDxqhn-P4')
    subscription = await self.registration.pushManager.subscribe({ applicationServerKey, userVisibleOnly: true })
    await saveSubscription(subscription)
  } catch (err) {
    console.log('Error', err)
  }
});

self.addEventListener('push', function(event) {
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
})

self.addEventListener('message', async (event) => {
  if (subscription) await saveSubscription(subscription);
  if (event.data.oldSubscription) await deleteSubscription(JSON.parse(event.data.oldSubscription));
  clients.matchAll({type: "window"}).then((clientList) => {
    for (var i = 0; i < clientList.length; i++) {
      clientList[i].postMessage(JSON.stringify({subscription: subscription}));
    }
  });
});

self.addEventListener('notificationclick', function(event) {
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
