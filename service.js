const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}

const version = "0.0.2";
const cacheName = `arodic-${version}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        '/',
        '/io/build/io.js',
        '/io/lib/md-view.js',
        '/three-ui/build/three-ui.js',
        '/notification-permission.js',
        '/io/lib/marked.min.js',
        '/io/build/io-core.js',
        '/three.js/build/three.module.js',
        '/three-ui/lib/BufferGeometryUtils.js',
        '/three-ui/lib/GLTFLoader.js',
        '/three-ui/lib/DRACOLoader.js',
        '/docs/about.md',
        '/three-ui/demo/scene/cubes.gltf',
        '/docs/archive/webgl-jellyfish.md',
        '/docs/archive/cardboard-launch.md',
        '/docs/archive/rome.md',
        '/docs/archive/daily-routines.md',
        '/docs/archive/flux-factory.md',
        '/docs/archive/google-zeitgeist-2013.md',
        '/docs/archive/just-a-reflector.md',
        '/docs/archive/star-wars-1313.md',
        '/docs/archive/unnumbered-sparks.md',
        '/docs/contact.md',
        '/docs/updates/new-website.md',
        '/three-ui/demo/scene/wall.png',
        '/three-ui/demo/scene/cube.jpg',
        '/images/project/webgl-jellyfish.jpg',
        '/images/project/cardboard-launch.jpg',
        '/images/project/rome.jpg',
        '/images/project/daily-routines.jpg',
        '/images/project/flux-factory.jpg',
        '/images/project/google-zeitgeist-2013.jpg',
        '/images/project/just-a-reflector.jpg',
        '/images/project/star-wars-1313.jpg',
        '/images/project/unnumbered-sparks.jpg',
        '/images/logo/io-32.png',
        '/three-ui/demo/scene/cubes.bin',
      ])
      .then(() => {
        self.skipWaiting();
        console.log('sw installed');
      });
    })
  );
});

// const urls = []

self.addEventListener('fetch', (event) => {
  // if (urls.indexOf(event.request.url) === -1) {
  //   urls.push(event.request.url);
  //   console.log(urls);
  // }
  // console.log(event.request.url);
  event.respondWith(
    caches.open(cacheName)
    .then(cache => {
      cache.match(event.request, {ignoreSearch: true});
      // cache.addAll([event.request.url]);
    })
    .then(response => {
      // if (!response) {
      //   // console.log(event.request);
      // } else {
      //   console.log("ASD", response);
      // }
      return response || fetch(event.request);
    })
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
