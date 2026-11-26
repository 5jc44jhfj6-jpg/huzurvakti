/* ═══════════════════════════════════════════════════════════════
   v72.9 — OKUMA GÖRÜNÜMÜ: zemin rengi + yazı rengi + yazı boyutu
   • Okuma ayarları (⋯) › "🎨 Renk ve yazı boyutu" ile açılır.
   • Hazır temalardan biri seçilebilir ya da zemin ve yazı rengi ayrı ayrı karıştırılabilir.
   • Üstte canlı önizleme; okunması zor ikililerde uyarı.
   • Yalnızca Kur'an okuma ekranının kâğıdına uygulanır (uygulamanın geri kalanı değişmez).
   Kayıt: localStorage 'hv_okuma_renk' = { z: zemin, y: yazı }  (yoksa varsayılan krem)
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const ANAH = 'hv_okuma_renk';
  /* v72.9: zeminler düz renk değil, TON: [ana renk, ad, açık ton, koyu ton, vurgu (âyet no / çerçeve)]
     Kâğıdın ortası açık, kenarları koyu; üstte hafif ışık. Uzun sûrede de aynı görünür (yüksekliğe bağlı değil). */
  const ZEMIN = [
    ['#fbf3e3', 'Krem', '#fffaf0', '#ecd9b4', '#a0662a'],
    ['#f7f0e1', 'Kitap kâğıdı', '#fdf9f0', '#e6d6b3', '#9a6a33'],
    ['#f1e4c9', 'Sepya', '#f9efdb', '#dcc395', '#94582a'],
    ['#fbfbfa', 'İnci', '#ffffff', '#e4e6ea', '#8a6a3a'],
    ['#efeeea', 'Taş', '#f8f7f4', '#d6d2c9', '#7a6a52'],
    ['#e6f2df', 'Açık yeşil', '#f3faee', '#c6e0b8', '#3f7a4a'],
    ['#e6f6ee', 'Nane', '#f4fcf8', '#c2e8d5', '#14846a'],
    ['#f0f2de', 'Zeytin', '#f8f9ec', '#d7dcb0', '#6f7d1f'],
    ['#e6f5f5', 'Turkuaz', '#f4fbfb', '#bfe4e3', '#0b8591'],
    ['#e9f0fc', 'Gök', '#f6f9ff', '#c8d8f5', '#2f62b8'],
    ['#ffeedf', 'Şeftali', '#fff7ef', '#f8cfaa', '#c0532a'],
    ['#fdecee', 'Gül', '#fff6f7', '#f1c8d0', '#b0456a'],
    ['#efe9fd', 'Lavanta', '#f8f5ff', '#d6c9f8', '#6d45c9'],
    ['#0f3d2e', 'Zümrüt', '#1a5643', '#082319', '#f0c75a'],
    ['#1f4b2b', 'Orman', '#2c6339', '#0f2815', '#d8e88a'],
    ['#2f4a3a', 'Adaçayı', '#41634f', '#1b2d22', '#e6c77a'],
    ['#10224a', 'Lacivert', '#1c3570', '#060f29', '#ffc35e'],
    ['#12203a', 'Gece mavisi', '#1e3252', '#070d19', '#8fbcff'],
    ['#521424', 'Bordo', '#6e1e33', '#2a060f', '#ffb15e'],
    ['#3a1f4f', 'Mor', '#53306e', '#1d0d2b', '#f2c46a'],
    ['#2e1f13', 'Kahve', '#45301e', '#170f08', '#e9b264'],
    ['#22170d', 'Mum ışığı', '#3d2812', '#0e0905', '#ffb24d'],
    ['#161616', 'Gece', '#262626', '#080808', '#d6b46a'],
    ['#050505', 'Siyah', '#151515', '#000000', '#f6c95e']
  ];
  const YAZI = [
    ['#111111', 'Siyah'], ['#2b1d14', 'Koyu kahve'], ['#5a3d22', 'Kahve'], ['#1f4a2c', 'Koyu yeşil'], ['#0d4a3b', 'Zümrüt'],
    ['#0c4250', 'Petrol'], ['#1d3a6b', 'Lacivert'], ['#3a2470', 'Mor'], ['#6a2c14', 'Kiremit'], ['#6b1630', 'Bordo'], ['#45501a', 'Zeytin'],
    ['#ffffff', 'Beyaz'], ['#f3ead2', 'Krem'], ['#f6d98e', 'Altın'], ['#f2d29b', 'Kehribar'], ['#e6f2cf', 'Fıstık'],
    ['#d3e4fa', 'Açık mavi'], ['#f6dfe6', 'Gül'], ['#e4d9ff', 'Lila']
  ];
  const HAZIR = [
    ['Krem', null, null], ['Sepya', '#f1e4c9', '#5a3d22'], ['İnci', '#fbfbfa', '#111111'], ['Açık yeşil', '#e6f2df', '#1f4a2c'],
    ['Nane', '#e6f6ee', '#0d4a3b'], ['Gök', '#e9f0fc', '#1d3a6b'], ['Şeftali', '#ffeedf', '#6a2c14'], ['Lavanta', '#efe9fd', '#3a2470'],
    ['Zümrüt', '#0f3d2e', '#f3ead2'], ['Orman', '#1f4b2b', '#e6f2cf'], ['Lacivert', '#10224a', '#f6d98e'], ['Bordo', '#521424', '#f3ead2'],
    ['Mor', '#3a1f4f', '#e4d9ff'], ['Mum ışığı', '#22170d', '#f2d29b'], ['Gece', '#161616', '#f3ead2'], ['Siyah · Altın', '#050505', '#f6d98e']
  ];
  const zBul = (h) => ZEMIN.find(x => x[0] === h);
  // kâğıt dokusu (çok hafif); düz renk gibi değil, kâğıt gibi dursun
  const DOKU = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  // ton: üstte ışık + ortası açık, kenarları koyu
  const ton = (h) => { const z = zBul(h); if (!z) return h; const [B, , L, D] = z;
    return `radial-gradient(ellipse 95% 520px at 50% 0, ${L} 0%, ${rgba2(L, 0)} 100%), linear-gradient(90deg, ${D} 0%, ${B} 13%, ${L} 50%, ${B} 87%, ${D} 100%)`; };
  const rgba2 = (h, a) => { h = h.replace('#', ''); const c = [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
  const VARS = { z: '#fbf3e3', y: '#2b1d14' };
  const oku = () => { try { const o = JSON.parse(localStorage.getItem(ANAH) || 'null'); return o && o.z && o.y ? o : null; } catch (e) { return null; } };
  const yaz = (o) => { try { if (o) localStorage.setItem(ANAH, JSON.stringify(o)); else localStorage.removeItem(ANAH); } catch (e) {} };

  /* renk hesapları */
  const rgb = (h) => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const lum = (h) => { const c = rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const kontrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const koyu = (h) => lum(h) < 0.2;
  const rgba = (h, a) => { const c = rgb(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
  // âyet numarası / çerçeve rengi: zemine göre altın ya da bakır
  const vurgu = (z) => { const x = zBul(z); return x ? x[4] : (koyu(z) ? '#f0c75a' : '#a0662a'); };

  /* uygula */
  /* v72.9 · OTOMATİK GECE TEMASI: akşam ezanından güneş doğana kadar seçilen gece teması kullanılır */
  const GANAH = 'hv_okuma_gece';
  const gOku = () => { try { return JSON.parse(localStorage.getItem(GANAH) || 'null') || { acik: false, z: '#10224a', y: '#f6d98e' }; } catch (e) { return { acik: false, z: '#10224a', y: '#f6d98e' }; } };
  const gYaz = (o) => { try { localStorage.setItem(GANAH, JSON.stringify(o)); } catch (e) {} };
  function geceMi() {
    const now = new Date(), dk = now.getHours() * 60 + now.getMinutes();
    const m = (x) => { const q = String(x || '').split(':'); return (parseInt(q[0], 10) || 0) * 60 + (parseInt(q[1], 10) || 0); };
    let t = null; try { t = APP_STATE.prayerTimes; } catch (e) {}
    const aksam = t && t.Maghrib ? m(t.Maghrib) : 19 * 60, sabah = t && t.Sunrise ? m(t.Sunrise) : 6 * 60 + 30;
    return dk >= aksam || dk < sabah;
  }
  const geceEtkin = () => { const g = gOku(); return !!(g.acik && geceMi()); };
  const etkin = () => { if (geceEtkin()) { const g = gOku(); return { z: g.z, y: g.y }; } return oku(); };
  let _sonGece = null;
  setInterval(() => { const x = geceEtkin(); if (x !== _sonGece) { _sonGece = x; uygula(); } }, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) uygula(); });
  window.hvOkumaGeceAc = () => { const g = gOku(); g.acik = !g.acik; gYaz(g); uygula(); ciz(); };
  window.hvOkumaGeceSec = (z, y) => { const g = gOku(); g.z = z; g.y = y; g.acik = true; gYaz(g); uygula(); ciz(); };

  function uygula() {
    const o = etkin(), s = document.getElementById('page-quran'); _sonGece = geceEtkin();
    let st = document.getElementById('okr-stil');
    if (!o) { if (st) st.remove(); if (s) { s.style.removeProperty('--kr-kagit'); s.style.removeProperty('--kr-kagit-yazi'); s.classList.remove('okr-ozel'); } return; }
    if (s) { s.style.setProperty('--kr-kagit', o.z, 'important'); s.style.setProperty('--kr-kagit-yazi', o.y, 'important'); s.classList.add('okr-ozel'); }
    if (!st) { st = document.createElement('style'); st.id = 'okr-stil'; document.head.appendChild(st); }
    const v = vurgu(o.z), ciz = rgba(o.y, 0.18);
    st.textContent = `
      #page-quran.okr-ozel .kr-kagit { background: ${DOKU}, ${ton(o.z)} !important; border-color: ${v} !important; box-shadow: 0 10px 26px rgba(20,10,4,.18), inset 0 0 0 4px ${o.z}, inset 0 0 0 5px ${rgba(v, .45)} !important; }
      #page-quran.okr-ozel .ok-mp, #page-quran.okr-ozel .kr-ayet { border-color: ${ciz} !important; }
      #page-quran.okr-ozel .ok-mp b, #page-quran.okr-ozel .ok-no, #page-quran.okr-ozel .kr-ayet .ok-no { color: ${v} !important; }
      #page-quran.okr-ozel .kr-ayrac, #page-quran.okr-ozel .ok-ipucu { color: ${rgba(o.y, .7)} !important; }
      #page-quran.okr-ozel .ok-okunus, #page-quran.okr-ozel .kr-ortak { color: ${rgba(o.y, .72)} !important; }
      /* notlar, kıssa notu, iniş dönemi kutuları da temaya uysun (koyu zeminde okunmuyordu) */
      #page-quran.okr-ozel .an-not, #page-quran.okr-ozel .ks-not, #page-quran.okr-ozel .ks-donem { background: ${rgba(o.y, .07)} !important; border-color: ${rgba(v, .55)} !important; color: ${o.y} !important; }
      #page-quran.okr-ozel .an-not b, #page-quran.okr-ozel .ks-donem-ust, #page-quran.okr-ozel .ks-not .ks-bas, #page-quran.okr-ozel .ks-not b { color: ${v} !important; }
      #page-quran.okr-ozel .ks-donem-alt, #page-quran.okr-ozel .ks-not, #page-quran.okr-ozel .ks-not small { color: ${rgba(o.y, .85)} !important; }
      /* üst sûre çubuğu da temanın renginde: koyu zeminde zeminin koyu tonu, açık zeminde yazı renginin koyusu */
      #page-quran.okr-ozel .kr-mp { background: ${cubukZemin(o)} !important; color: ${cubukYazi(o)} !important; box-shadow: 0 6px 16px ${rgba(koyu(o.z) ? '#000000' : o.y, .28)} !important; }
      #page-quran.okr-ozel .kr-mp-c { background: ${rgba(cubukYazi(o), .22)} !important; }
      #page-quran.okr-ozel .kr-mp-c i { background: ${v} !important; }
      #page-quran.okr-ozel .kr-mp-p { background: radial-gradient(circle at 35% 30%, #ffffff, ${v} 75%) !important; color: ${koyu(o.z) ? zKoyu(o.z) : o.y} !important; }
      #page-quran.okr-ozel .kr-mp-y { color: ${cubukYazi(o)} !important; border-color: ${rgba(cubukYazi(o), .35)} !important; }
      #page-quran.okr-ozel .ks-cip { color: ${o.y} !important; border-color: ${rgba(v, .5)} !important; background: ${rgba(o.y, .06)} !important; }`;
  }
  const zKoyu = (h) => { const z = zBul(h); return z ? z[3] : h; };
  const cubukZemin = (o) => { const z = zBul(o.z);
    if (koyu(o.z)) return z ? `linear-gradient(160deg, ${z[2]}, ${z[3]})` : o.z;
    return `linear-gradient(160deg, ${rgba(o.y, .96)}, ${rgba(o.y, .99)})`; };
  const cubukYazi = (o) => koyu(o.z) ? o.y : (zBul(o.z) ? zBul(o.z)[2] : '#ffffff');
  window.hvOkumaRenkUygula = uygula;
  (window.hvOkCizSonra = window.hvOkCizSonra || []).push(() => uygula());
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', uygula); else uygula();

  /* v72.9 · YAZI TİPLERİ (meâl + Arapça). Türkçe harflerin hepsini destekleyen, uzun okuma için bilinen yazı tipleri.
     Seçilen yazı tipi Google Fonts'tan bir kez indirilir; internet yoksa varsayılan yazı tipiyle görünür. */
  const FANAH = 'hv_okuma_font';
  const MFONT = [
    ['', 'Varsayılan', "'Outfit', sans-serif", null],
    ['lora', 'Lora', "'Lora', serif", 'Lora:ital,wght@0,400;0,700;1,400;1,700'],
    ['literata', 'Literata', "'Literata', serif", 'Literata:ital,wght@0,400;0,700;1,400;1,700'],
    ['merriweather', 'Merriweather', "'Merriweather', serif", 'Merriweather:ital,wght@0,400;0,700;1,400;1,700'],
    ['notoserif', 'Noto Serif', "'Noto Serif', serif", 'Noto+Serif:ital,wght@0,400;0,700;1,400;1,700'],
    ['nunito', 'Nunito', "'Nunito', sans-serif", 'Nunito:ital,wght@0,400;0,700;1,400;1,700'],
    ['sourcesans', 'Source Sans', "'Source Sans 3', sans-serif", 'Source+Sans+3:ital,wght@0,400;0,700;1,400;1,700']
  ];
  const AFONT = [
    ['', 'Amiri Kur\'an', "'Amiri Quran', 'Amiri', serif", null],
    ['scheherazade', 'Scheherazade', "'Scheherazade New', serif", 'Scheherazade+New:wght@400;700'],
    ['naskh', 'Noto Nesih', "'Noto Naskh Arabic', serif", 'Noto+Naskh+Arabic:wght@400;600']
  ];
  const fOku = () => { try { return JSON.parse(localStorage.getItem(FANAH) || '{}') || {}; } catch (x) { return {}; } };
  const fYaz = (o) => { try { if (o.m || o.a || o.k || o.i) localStorage.setItem(FANAH, JSON.stringify(o)); else localStorage.removeItem(FANAH); } catch (x) {} };
  const fBul = (L, id) => L.find(x => x[0] === (id || '')) || L[0];
  const yuklendi = {};
  function fYukle(aile) {
    if (!aile || yuklendi[aile]) return; yuklendi[aile] = 1;
    const l = document.createElement('link'); l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=' + aile + '&display=swap';
    document.head.appendChild(l);
  }
  function fUygula() {
    const o = fOku(); let st = document.getElementById('okf-stil');
    if (!o.m && !o.a && !o.k && !o.i) { if (st) st.remove(); return; }
    const m = fBul(MFONT, o.m), a = fBul(AFONT, o.a); fYukle(m[3]); fYukle(a[3]);
    if (!st) { st = document.createElement('style'); st.id = 'okf-stil'; document.head.appendChild(st); }
    const MS = '#page-quran .ok-mp, #page-quran .ok-meal, #page-quran .kr-ayet .ok-meal';
    st.textContent = (o.m ? `${MS}, #page-quran .ok-okunus { font-family: ${m[2]} !important; }` : '') +
      (o.k ? `${MS} { font-weight: 700 !important; }` : '') + (o.i ? `${MS} { font-style: italic !important; }` : '') +
      (o.a ? `#page-quran .ok-ar, #page-quran .ok-mushaf, #page-quran .ok-besmele { font-family: ${a[2]} !important; }` : '');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fUygula); else fUygula();
  window.hvOkumaFont = (tur, id) => { const o = fOku(); o[tur] = id || ''; fYaz(o); fUygula(); ciz(); };
  window.hvOkumaFontSifir = () => { fUygula(); ciz(); };
  /* 🎲 Karıştır: rastgele ama HER ZAMAN okunur bir ikili (kontrast ≥ 7) + rastgele yazı tipleri ve stil */
  const sec = (L) => L[Math.floor(Math.random() * L.length)];
  window.hvOkumaKaristir = () => {
    const once = secim || VARS;
    let z, y, dene = 0;
    do {
      z = sec(ZEMIN)[0];
      const uygun = YAZI.map(x => x[0]).filter(h => kontrast(z, h) >= 7);
      y = uygun.length ? sec(uygun) : (koyu(z) ? '#ffffff' : '#111111');
    } while (++dene < 20 && z === once.z && y === once.y);
    secim = { z, y }; yaz(secim); uygula();
    const f = fOku();
    f.m = sec(MFONT)[0]; f.a = sec(AFONT)[0];
    f.k = Math.random() < 0.35; f.i = Math.random() < 0.25;   // çoğu zaman sade kalsın
    fYaz(f); fUygula(); ciz();
    try { if (navigator.vibrate) navigator.vibrate(20); } catch (x) {}
    const on = document.querySelector('#okr .okr-onizle'); if (on) { on.classList.remove('zar'); void on.offsetWidth; on.classList.add('zar'); }
  };
  window.hvOkumaStil = (n) => { const o = fOku(); o[n] = !o[n]; fYaz(o); fUygula(); ciz(); };   // n: 'k' kalın, 'i' italik

  /* v72.9 · PAYLAŞIM KARTI okuma temasıyla: paylaşımda "Okuma temam" arka planı */
  window.hvOkumaTemaVar = () => !!(oku() || geceEtkin());
  window.hvOkumaTemaTon = () => { const o = etkin() || VARS; return ton(o.z); };
  window.hvOkumaTemaKart = () => {
    const o = etkin() || VARS, z = zBul(o.z) || [o.z, '', o.z, o.z, vurgu(o.z)], fo = fOku(), mf = fBul(MFONT, fo.m);
    return { _tema: { z: o.z, y: o.y, v: vurgu(o.z), L: z[2], D: z[3], koyu: koyu(o.z), font: mf[2], k: !!fo.k, i: !!fo.i } };
  };

  /* v72.9 · İKİ PARMAKLA YAZI BÜYÜT / KÜÇÜLT (okurken). Okunan âyet ekranda yerinde kalır. */
  (function () {
    let d0 = 0, adim = 0, cap = null;
    const kutu = () => { const w = document.getElementById('ayah-list-wrap'); return w ? w.closest('.hero-frame-box') : null; };
    const uzak = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    document.addEventListener('touchstart', (e) => {
      const k = kutu(); if (e.touches.length !== 2 || !k || !k.contains(e.target)) { if (e.touches.length < 2) d0 = 0; return; }
      d0 = uzak(e.touches); adim = 0;
      // ekranın ortasındaki âyeti tut
      const kr = k.getBoundingClientRect(); const orta = kr.top + kr.height * 0.35;
      cap = [...document.querySelectorAll('#ayah-list-wrap [id^="ayah-"]')].find(x => { const r = x.getBoundingClientRect(); return r.bottom > orta; }) || null;
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      if (!d0 || e.touches.length !== 2) return;
      e.preventDefault();
      const oran = uzak(e.touches) / d0, hedef = Math.round(Math.log(oran) / Math.log(1.15));   // her %15 açılış = 1 kademe
      if (hedef !== adim && typeof adjustQuranFontSize === 'function') {
        const k = kutu(), once = cap ? cap.getBoundingClientRect().top : 0;
        let fark = (hedef - adim) * 2; const fs = boyut();
        fark = Math.max(14, Math.min(36, fs + fark)) - fs;
        if (fark) { adjustQuranFontSize(fark); try { if (navigator.vibrate) navigator.vibrate(8); } catch (x) {} }
        adim = hedef;
        if (k && cap) k.scrollTop += cap.getBoundingClientRect().top - once;
      }
    }, { passive: false });
    document.addEventListener('touchend', (e) => { if (e.touches.length < 2) { d0 = 0; cap = null; } }, { passive: true });
  })();

  /* panel */
  let secim = null;   // panelde seçili (henüz kaydedilmemiş değil — her dokunuş anında kaydedilir)
  const e = (x) => String(x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const boyut = () => { try { return APP_STATE.fontSize || 20; } catch (x) { return 20; } };
  function ciz() {
    const p = document.getElementById('okr'); if (!p) return;
    const o = secim || VARS, v = vurgu(o.z), k = kontrast(o.z, o.y), fs = boyut();
    const ornekBoy = (fs * 0.55 + 5).toFixed(1);
    const fo = fOku(), mf = fBul(MFONT, fo.m), af = fBul(AFONT, fo.a);
    const ic = p.querySelector('.okr-ic'), kay = ic.scrollTop;
    ic.innerHTML = `
      <div class="okr-bas"><b>🎨 Renk, yazı tipi ve boyut</b><button class="okr-x" onclick="hvOkumaRenkKapat()" aria-label="Kapat">✕</button></div>
      <div class="okr-onizle" style="background:${ton(o.z)};color:${o.y};border-color:${v}">
        <div class="okr-ar" style="font-family:${af[2]};font-size:${(fs + 6).toFixed(0)}px">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <p style="font-size:${ornekBoy}px;font-family:${mf[2]};${fo.k ? 'font-weight:700;' : ''}${fo.i ? 'font-style:italic;' : ''}border-color:${rgba(o.y, .18)}"><b style="color:${v}">1</b> Rahmân ve Rahîm olan Allah'ın adıyla.</p>
        <p style="font-size:${ornekBoy}px;font-family:${mf[2]};${fo.k ? 'font-weight:700;' : ''}${fo.i ? 'font-style:italic;' : ''}border-color:transparent"><b style="color:${v}">2</b> Hamd, âlemlerin Rabbi Allah'a mahsustur.</p>
      </div>
      ${k < 4.5 ? `<div class="okr-uyari">⚠️ Bu iki renk birbirine yakın, okunması zor olabilir.</div>` : ''}
      <button class="okr-zar" onclick="hvOkumaKaristir()"><span>🎲</span>Karıştır<small>Zemin, yazı rengi, yazı tipi, kalın/italik rastgele gelsin</small></button>
      <div class="okr-et">Hazır temalar</div>
      <div class="okr-hazir">${HAZIR.map(([ad, z, y]) => { const zz = z || VARS.z, yy = y || VARS.y; const on = secim ? (secim.z === z && secim.y === y) : !z; return `<button class="${on ? 'on' : ''}" onclick="hvOkumaRenkHazir('${z || ''}','${y || ''}')"><span style="background:${ton(zz)};color:${yy};border-color:${vurgu(zz)}">Aa</span><small>${e(ad)}</small></button>`; }).join('')}</div>
      <div class="okr-et">Zemin rengi</div>
      <div class="okr-renkler">${ZEMIN.map(([h, ad]) => `<button class="${o.z === h ? 'on' : ''}" style="background:${ton(h)}" title="${e(ad)}" aria-label="${e(ad)}" onclick="hvOkumaRenkSec('z','${h}')"></button>`).join('')}</div>
      <div class="okr-et">Yazı rengi</div>
      <div class="okr-renkler">${YAZI.map(([h, ad]) => `<button class="${o.y === h ? 'on' : ''}" style="background:${h}" title="${e(ad)}" aria-label="${e(ad)}" onclick="hvOkumaRenkSec('y','${h}')"></button>`).join('')}</div>
      <div class="okr-et">Meâl yazı tipi</div>
      <div class="okr-fontlar">${MFONT.map(f => `<button class="${(fo.m || '') === f[0] ? 'on' : ''}" onclick="hvOkumaFont('m','${f[0]}')"><span style="font-family:${f[2]}">Aa Rahmân</span><small>${e(f[1])}</small></button>`).join('')}</div>
      <div class="okr-stil"><button class="${fo.k ? 'on' : ''}" onclick="hvOkumaStil('k')"><b>K</b> Kalın</button><button class="${fo.i ? 'on' : ''}" onclick="hvOkumaStil('i')"><i>İ</i> İtalik</button></div>
      <div class="okr-et">Arapça yazı tipi</div>
      <div class="okr-fontlar okr-fontlar-ar">${AFONT.map(f => `<button class="${(fo.a || '') === f[0] ? 'on' : ''}" onclick="hvOkumaFont('a','${f[0]}')"><span style="font-family:${f[2]}">الرَّحْمَٰن</span><small>${e(f[1])}</small></button>`).join('')}</div>
      <div class="okr-et">🌙 Gece teması</div>
      <div class="okr-gece"><button class="kr-anah ${gOku().acik ? 'on' : ''}" onclick="hvOkumaGeceAc()" aria-label="Gece teması"><i></i></button><span>Akşam ezanından güneş doğana kadar okuma ekranı kendiliğinden gece temasına geçsin${geceEtkin() ? ' <b>· şu an gece teması açık</b>' : ''}</span></div>
      ${gOku().acik ? `<div class="okr-hazir okr-gece-sec">${HAZIR.filter(h => h[1] && koyu(h[1])).map(([ad, z, y]) => { const g = gOku(); return `<button class="${g.z === z && g.y === y ? 'on' : ''}" onclick="hvOkumaGeceSec('${z}','${y}')"><span style="background:${ton(z)};color:${y};border-color:${vurgu(z)}">Aa</span><small>${e(ad)}</small></button>`; }).join('')}</div>` : ''}
      <div class="okr-et">Yazı boyutu</div>
      <div class="okr-boy"><button onclick="hvOkumaBoyut(-1)">A−</button><input type="range" min="14" max="36" step="1" value="${fs}" oninput="hvOkumaBoyut(0,this.value)"><button onclick="hvOkumaBoyut(1)">A+</button><b>${fs}</b></div>
      <div class="okr-alt"><button class="okr-sifir" onclick="hvOkumaRenkHazir('','');hvOkumaFont('m','');hvOkumaFont('a','');try{localStorage.removeItem('hv_okuma_font')}catch(e){};hvOkumaRenkUygula();hvOkumaFontSifir()">Varsayılana dön</button><button class="okr-tamam" onclick="hvOkumaRenkKapat()">Tamam</button></div>`;
    ic.scrollTop = kay;
  }
  function kaydet() { yaz(secim); uygula(); ciz(); }
  window.hvOkumaRenkSec = (n, h) => { secim = Object.assign({}, secim || VARS, { [n]: h }); kaydet(); };
  window.hvOkumaRenkHazir = (z, y) => { secim = z ? { z, y } : null; kaydet(); };
  window.hvOkumaBoyut = (d, deger) => {
    try {
      const hedef = deger != null ? Number(deger) : boyut() + d * 2;
      const fark = Math.max(14, Math.min(36, hedef)) - boyut();
      if (fark && typeof adjustQuranFontSize === 'function') adjustQuranFontSize(fark);
    } catch (x) {}
    // kaydırıcı sürüklenirken paneli baştan çizme (parmak kayar); sadece sayıyı ve önizlemeyi güncelle
    const p = document.getElementById('okr'); if (!p) return;
    if (deger != null) {
      const fs = boyut(), b = p.querySelector('.okr-boy b'); if (b) b.textContent = fs;
      p.querySelectorAll('.okr-onizle p').forEach(x => { x.style.fontSize = (fs * 0.55 + 5).toFixed(1) + 'px'; }); const ar = p.querySelector('.okr-ar'); if (ar) ar.style.fontSize = (fs + 6) + 'px';
    } else ciz();
  };
  window.hvOkumaRenk = () => {
    try { if (typeof hvOkKapat === 'function') hvOkKapat(); } catch (x) {}
    secim = oku();
    MFONT.concat(AFONT).forEach(f => fYukle(f[3]));   // panelde örnekler kendi yazı tipiyle görünsün
    let p = document.getElementById('okr');
    if (!p) { p = document.createElement('div'); p.id = 'okr'; p.innerHTML = '<div class="okr-ic"></div>'; p.addEventListener('click', (ev) => { if (ev.target === p) window.hvOkumaRenkKapat(); }); document.body.appendChild(p); }
    ciz(); requestAnimationFrame(() => p.classList.add('ac'));
  };
  window.hvOkumaRenkKapat = () => { const p = document.getElementById('okr'); if (p) { p.classList.remove('ac'); setTimeout(() => p.remove(), 250); } };
})();
