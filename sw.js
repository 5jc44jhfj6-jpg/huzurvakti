/* ══════════════════════════════════════════════════════════════
   HUZUR VAKTİ — Service Worker (v58.1)
   iOS/Safari uyumlu çevrimdışı çekirdek:
   • Çekirdek dosyalar kurulumda önbelleğe alınır (tek tek; biri
     başarısız olsa bile diğerleri kaydolur).
   • Eşleştirme "ignoreSearch" ile yapılır → app.js?v=58.1.0 gibi
     sürüm etiketli istekler önbellekteki app.js ile eşleşir.
   • Sayfa açılışı (navigation) internetsizken her zaman
     önbellekteki index.html'e düşer → uygulama açılış ekranında
     takılıp kalmaz.
   • Dış kaynaklar (font, API) çevrimdışıyken sessizce boş geçilir.
   ══════════════════════════════════════════════════════════════ */
const CACHE_NAME = 'huzur-vakti-v58.1';

// Sürüm etiketli çekirdek dosyalar (sayfanın gerçekte istediği URL'ler)
const V = '58.1.0';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css?v=' + V,
  './cities.js?v=' + V,
  './data.js?v=' + V,
  './content.js?v=' + V,
  './app.js?v=' + V,
  './features.js?v=' + V,
  './manifest.json',
  './icon-512.jpg'
];

// ─── Kurulum: çekirdek dosyaları tek tek önbelleğe al ───
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.allSettled(
        CORE_ASSETS.map((url) =>
          cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
        )
      )
    )
  );
});

// ─── Aktivasyon: eski önbellekleri temizle ───
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

// ─── İstek yakalama ───
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }

  const sameOrigin = url.origin === self.location.origin;

  // 1) Sayfa açılışı (navigation): önce ağ, olmazsa önbellekteki index.html
  const isNavigation = req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  if (isNavigation) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(req, { ignoreSearch: true })
            .then((hit) => hit ||
              caches.match('./index.html', { ignoreSearch: true }) ||
              caches.match('./', { ignoreSearch: true }))
        )
    );
    return;
  }

  // 2) Kendi dosyalarımız (JS/CSS/görsel): ağ öncelikli, offline'da ignoreSearch ile önbellek
  if (sameOrigin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }))
    );
    return;
  }

  // 3) Dış kaynaklar (font, namaz/Kuran API): ağ dene, olmazsa önbellek, o da yoksa sessizce geç
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || Response.error()))
  );
});
