import {IoCore} from "../io/build/io.js";

if (!("serviceWorker" in navigator)) { throw new Error("No Service Worker support!"); }
if (!("PushManager" in window)) { throw new Error("No Push API Support!"); }

export class IoNotificationPermission extends IoCore {
  static get properties() {
    return {
      path: './service.js',
      serviceWorker: null,
      granted: window.Notification.permission === 'granted',
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
    // this.dispatchEvent('object-mutated', {object: this}, null, window);
  }
  serviceWorkerChanged() {
    // TODO: temp hack to re-send permission after clearing server db
    navigator.serviceWorker.controller.postMessage({});
  }
  onServiceWorkerMessage(event) {
    const data = JSON.parse(event.data);
    if (data.subscription) {
      const oldSub = localStorage.getItem('subscription');
      const sub = JSON.stringify(data.subscription);
      localStorage.setItem('subscription', sub);
      if (oldSub && sub !== oldSub) {
        navigator.serviceWorker.controller.postMessage({oldSubscription: oldSub});
      }
    }
  }
}
