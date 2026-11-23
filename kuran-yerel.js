/* ═══════════════════════════════════════════════════════════════
   v72.7 — İNTERNETSİZ KUR'AN
   Kur'an'ın Arapçası (Osmanî/Hafs) ve Latin okunuşu uygulamanın
   kendi sunucusundaki kuran.json dosyasından gelir (~0,7 MB sıkıştırılmış).
   Dosya açılıştan bir süre sonra arka planda bir kez iner ve telefonda
   saklanır; sonra 114 sûre, Mushaf sayfaları ve tek âyetler internetsiz açılır.

   Nasıl: uygulamanın alquran.cloud'a yaptığı istekler burada yakalanır.
   İstenen baskı Arapça (quran-uthmani) ve/veya okunuş (tr.transliteration)
   ise cevap yerel dosyadan aynı biçimde üretilir. Başka bir baskı istenirse
   (ör. tr.yazir) ya da yerel dosya yoksa istek eskisi gibi internete gider.
   Kaynak: alquran.cloud (Tanzil Osmanî metni) — aynı veri, sadece yerelde.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  if (window.__hvKuranYerel) return;
  window.__hvKuranYerel = true;

  const DOSYA = 'kuran.json?v=1';
  const ONBELLEK = 'hv-kuran-1';
  const BASKI = { 'quran-uthmani': 'a', 'tr.transliteration': 'o' };
  const asilFetch = window.fetch.bind(window);
  let veriSozu = null;

  function gecerli(v) {
    return v && Array.isArray(v.s) && v.s.length === 114 && Array.isArray(v.a) && v.a.length === 6236 &&
      Array.isArray(v.o) && v.o.length === 6236 && Array.isArray(v.j) && Array.isArray(v.p);
  }

  async function yukle() {
    if (veriSozu) return veriSozu;
    veriSozu = (async () => {
      // 1) telefonda saklı kopya
      try {
        if (window.caches) {
          const c = await caches.open(ONBELLEK);
          const r = await c.match(DOSYA);
          if (r) { const v = await r.json(); if (gecerli(v)) return v; }
        }
      } catch (e) {}
      // 2) sunucudan indir ve sakla
      const r = await asilFetch(DOSYA);
      if (!r.ok) throw new Error('kuran.json yok');
      const kopya = r.clone();
      const v = await r.json();
      if (!gecerli(v)) throw new Error('kuran.json bozuk');
      try { if (window.caches) { const c = await caches.open(ONBELLEK); await c.put(DOSYA, kopya); } } catch (e) {}
      return v;
    })();
    veriSozu.catch(() => { veriSozu = null; });   // başarısızsa sonra yeniden denensin
    return veriSozu;
  }
  window.hvKuranYerelYukle = yukle;

  function baslar(v) {
    if (!v._bas) {
      const b = [0];
      for (let i = 0; i < 114; i++) b.push(b[i] + v.s[i][4]);
      v._bas = b;
    }
    return v._bas;
  }
  function sureNo(v, g) { const b = baslar(v); let s = 1; while (b[s] <= g) s++; return s; }
  function sureBilgi(v, n) {
    const m = v.s[n - 1];
    return { number: n, name: m[0], englishName: m[1], englishNameTranslation: m[2], revelationType: m[3], numberOfAyahs: m[4] };
  }
  function baskiBilgi(ed) {
    const ar = ed === 'quran-uthmani';
    return { identifier: ed, language: ar ? 'ar' : 'tr', name: ed, englishName: ed, format: 'text',
      type: ar ? 'quran' : 'transliteration', direction: ar ? 'rtl' : 'ltr' };
  }
  function ayet(v, g, ed, s) {
    return { number: g + 1, text: v[BASKI[ed]][g], numberInSurah: g - baslar(v)[s - 1] + 1,
      juz: v.j[g], manzil: 0, page: v.p[g], ruku: 0, hizbQuarter: 0, sajda: false };
  }
  function cevap(data) {
    return new Response(JSON.stringify({ code: 200, status: 'OK', data: data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } });
  }

  async function yerelCevap(u) {
    let m, eds, n, tek = false, tur, s0, a0;
    if ((m = u.match(/\/v1\/surah\/(\d+)\/editions\/([\w.,-]+)/))) { n = +m[1]; eds = m[2].split(','); tur = 'sure'; }
    else if ((m = u.match(/\/v1\/surah\/(\d+)\/([\w.-]+)$/))) { n = +m[1]; eds = [m[2]]; tek = true; tur = 'sure'; }
    else if ((m = u.match(/\/v1\/page\/(\d+)\/([\w.-]+)$/))) { n = +m[1]; eds = [m[2]]; tur = 'sayfa'; }
    else if ((m = u.match(/\/v1\/ayah\/(\d+):(\d+)\/([\w.-]+)$/))) { s0 = +m[1]; a0 = +m[2]; eds = [m[3]]; tur = 'ayet'; }
    else return null;
    if (!eds.length || !eds.every(e => BASKI[e])) return null;   // yerelde olmayan baskı → internet
    const v = await yukle();
    const b = baslar(v);
    if (tur === 'sure') {
      if (!(n >= 1 && n <= 114)) return null;
      const liste = eds.map(ed => {
        const ay = [];
        for (let g = b[n - 1]; g < b[n]; g++) ay.push(ayet(v, g, ed, n));
        return Object.assign(sureBilgi(v, n), { ayahs: ay, edition: baskiBilgi(eds[0] === ed ? ed : ed) });
      });
      return cevap(tek ? liste[0] : liste);
    }
    if (tur === 'sayfa') {
      const ay = [], sureler = {};
      for (let g = 0; g < v.p.length; g++) {
        if (v.p[g] !== n) continue;
        const s = sureNo(v, g);
        const o = ayet(v, g, eds[0], s);
        o.surah = sureBilgi(v, s);
        sureler[s] = o.surah;
        ay.push(o);
      }
      if (!ay.length) return null;
      return cevap({ number: n, ayahs: ay, surahs: sureler, edition: baskiBilgi(eds[0]) });
    }
    if (tur === 'ayet') {
      if (!(s0 >= 1 && s0 <= 114) || !(a0 >= 1 && a0 <= v.s[s0 - 1][4])) return null;
      const g = b[s0 - 1] + a0 - 1;
      const o = ayet(v, g, eds[0], s0);
      o.surah = sureBilgi(v, s0);
      o.edition = baskiBilgi(eds[0]);
      return cevap(o);
    }
    return null;
  }

  window.fetch = function (girdi, ayar) {
    try {
      const u = typeof girdi === 'string' ? girdi : ((girdi && girdi.url) || '');
      if (u.indexOf('api.alquran.cloud/v1/') >= 0) {
        return yerelCevap(u).then(r => r || asilFetch(girdi, ayar)).catch(() => asilFetch(girdi, ayar));
      }
    } catch (e) {}
    return asilFetch(girdi, ayar);
  };

  // Açılışı yavaşlatmasın: 20 sn sonra arka planda bir kez indir (zaten telefondaysa hiçbir şey olmaz)
  window.addEventListener('load', () => { setTimeout(() => { yukle().catch(() => {}); }, 20000); });
})();
