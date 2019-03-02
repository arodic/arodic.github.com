import {IoCore, IoStorage} from "../io/build/io.js";

if (!("serviceWorker" in navigator)) { throw new Error("No Service Worker support!"); }
if (!("PushManager" in window)) { throw new Error("No Push API Support!"); }

var db = firebase.firestore();

export class IoNotificationPermission extends IoCore {
  static get properties() {
    return {
      path: './service.js',
      serviceWorker: null,
      granted: window.Notification.permission === 'granted',
      subscription: IoStorage('subscription'),
    };
  }
  constructor(props) {
    super(props);
    this.requestService();
  }
  async requestService() {
    const serviceWorker = await navigator.serviceWorker.register(this.path);
    if (!serviceWorker.active) {
      serviceWorker.addEventListener('activate', () => { this.serviceWorker = serviceWorker; });
    } else {
      this.serviceWorker = serviceWorker;
    }
    navigator.serviceWorker.addEventListener('message', this.onServiceWorkerMessage);
  }
  async requestNotification() {
    this.granted = await window.Notification.requestPermission() === 'granted';
  }
  subscriptionChanged(event) {
    db.collection("subscriptions").add({value: this.subscription});
    if (event.detail.oldValue) db.collection("oldsubscriptions").add({value: event.detail.oldValue});
  }
  onServiceWorkerMessage(event) {
    const data = JSON.parse(event.data);
    if (data.subscription) this.subscription = JSON.stringify(data.subscription);
  }
}
