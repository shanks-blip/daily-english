// 오프라인 지원 서비스워커 (네트워크 우선, 실패 시 캐시)
const CACHE = "daily-english-v6";
const FILES = ["./", "index.html", "icons.js", "data.js", "data2.js", "data-lv4.js", "data-daily.js", "tips.js", "dialogs.js", "dialogs-extra.js", "dialogs-daily.js", "sentences.js", "app.js", "activities.js", "sync.js", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    fetch(e.request).then(function (r) {
      const copy = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return r;
    }).catch(function () { return caches.match(e.request); })
  );
});
