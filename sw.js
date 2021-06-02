const cacheName ="v1";
const cacheAssets =[
  "index.html",
  "index.js",
  "style.css"
];

self.addEventListener("install", async (ev) => {
  ev.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    cache.addAll(cacheAssets);
    return self.skipWaiting();
  })());
});
self.addEventListener("activate", async (ev) => {
 ev.waitUntil((async () => {
    const keys = await caches.keys();
    const targets = keys.filter(key => key !== cacheName);
    return Promise.all(targets.map(target => caches.delete(target)));
    })());
});

self.addEventListener('fetch', async (ev) => {
  ev.respondWith((async () =>{
    const hit = await caches.match(ev.request);
    if(hit){
      return hit;
    }
    try{
      const res = await fetch(ev.request);
      const resClone = res.clone();
      const cache = await caches.open(cacheName);
      cache.put(ev.request,resClone);
      return res;
    }catch(error){
      return new Response(error);
    }
  })());
});
