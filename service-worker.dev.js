"use strict";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'); // This is the "Offline page" service worker

var CACHE = "pwabuilder-page"; // TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";

var offlineFallbackPage = "offline.html";
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
self.addEventListener('install', function _callee(event) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.waitUntil(caches.open(CACHE).then(function (cache) {
            return cache.add(offlineFallbackPage);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', function (event) {
  if (event.request.mode === 'navigate') {
    event.respondWith(function _callee2() {
      var preloadResp, networkResp, cache, cachedResp;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(event.preloadResponse);

            case 3:
              preloadResp = _context2.sent;

              if (!preloadResp) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", preloadResp);

            case 6:
              _context2.next = 8;
              return regeneratorRuntime.awrap(fetch(event.request));

            case 8:
              networkResp = _context2.sent;
              return _context2.abrupt("return", networkResp);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              _context2.next = 16;
              return regeneratorRuntime.awrap(caches.open(CACHE));

            case 16:
              cache = _context2.sent;
              _context2.next = 19;
              return regeneratorRuntime.awrap(cache.match(offlineFallbackPage));

            case 19:
              cachedResp = _context2.sent;
              return _context2.abrupt("return", cachedResp);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 12]]);
    }());
  }
});