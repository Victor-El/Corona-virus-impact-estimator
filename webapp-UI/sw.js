importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
console.log("I've been registered");

if (workbox) {
    console.log("We have workbox");
    workbox.routing.registerRoute(new RegExp('\\.html$'), new workbox.strategies.NetworkFirst());
    workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|svg|gif)$/, new workbox.strategies.NetworkFirst());
    workbox.routing.registerRoute(new RegExp('\\.css$'), new workbox.strategies.NetworkFirst());
    workbox.routing.registerRoute(new RegExp('\\.js$'), new workbox.strategies.NetworkFirst());
    workbox.routing.registerRoute(new RegExp('/$'), new workbox.strategies.NetworkFirst());
}