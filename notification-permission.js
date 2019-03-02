import {IoCore, IoStorage} from "../io/build/io.js";

if (!("serviceWorker" in navigator)) { throw new Error("No Service Worker support!"); }
if (!("PushManager" in window)) { throw new Error("No Push API Support!"); }

const db = firebase.firestore();

export class IoNotificationPermission extends IoCore {
  static get properties() {
    return {
      path: './service.js',
      serviceWorker: null,
      granted: window.Notification.permission === 'granted',
      subscription: IoStorage('io-notification-subscription'),
    };
  }
  constructor(props) {
    super(props);
    this.requestService();
    console.log(this.subscription)
  }
  async requestService() {
    if (this.granted) {
      const serviceWorker = await navigator.serviceWorker.register(this.path);
      if (!serviceWorker.active) {
        serviceWorker.addEventListener('activate', () => { this.serviceWorker = serviceWorker; });
      } else {
        this.serviceWorker = serviceWorker;
      }
      navigator.serviceWorker.addEventListener('message', this.onServiceWorkerMessage);
    }
  }
  async requestNotification() {
    this.granted = await window.Notification.requestPermission() === 'granted';
    this.requestService();
  }
  subscriptionChanged(event) {
    console.log(event.detail.oldValue)
    if (this.subscription) db.collection("subscriptions").add({value: this.subscription});
    if (event.detail.oldValue) db.collection("oldsubscriptions").add({value: event.detail.oldValue});
  }
  onServiceWorkerMessage(event) {
    const data = JSON.parse(event.data);
    if (data.subscription) this.subscription = JSON.stringify(data.subscription);
  }
}
