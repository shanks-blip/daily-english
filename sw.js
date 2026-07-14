// 오프라인 지원 서비스워커 (네트워크 우선, 실패 시 캐시)
const CACHE = "daily-english-v8";
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

// 같은 출처 GET만 처리한다.
// 핵심: fetch(req)는 브라우저 HTTP 캐시를 타서 옛 파일이 그대로 나온다.
// cache:"no-store"로 항상 네트워크 최신본을 받아오고, 실패(오프라인)일 때만 캐시를 쓴다.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" }).then(function (r) {
      const copy = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return r;
    }).catch(function () {
      return caches.match(e.request).then(function (m) {
        return m || caches.match("index.html");
      });
    })
  );
});
