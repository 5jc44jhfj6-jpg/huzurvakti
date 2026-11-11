/* ══════════════════════════════════════════════════════════════
   NAMAZ DOSTU — v67.5 YENİ BÖLÜMLER
   • Anlayarak Namaz (fotoğraflı adım adım)
   • Takibim panosu (bu hafta, aylık durum, seri, mazeretli gün) + Rozetler
   • Zikirmatik yeni görünüm
   • Gece Rutini · Dua Defterim · Kelime Kartları · Duvar Kâğıtları · Çocuk Modu
   features.js ve app.js'teki yardımcıları kullanır (hvLoad, hvSave, hvEsc, hvToast…).
   ══════════════════════════════════════════════════════════════ */
(function () {
'use strict';

const $ = (id) => document.getElementById(id);
const esc = (s) => (typeof hvEsc === 'function' ? hvEsc(s) : String(s == null ? '' : s));
const yukle = (k, d) => (typeof hvLoad === 'function' ? hvLoad(k, d) : d);
const kaydet = (k, v) => { if (typeof hvSave === 'function') hvSave(k, v); };
const bugunKey = (d) => (typeof hvTodayKey === 'function' ? hvTodayKey(d) : new Date().toISOString().slice(0, 10));
const toast = (a, b) => { if (typeof hvToast === 'function') hvToast(a, b); };
const titre = (p) => { if (typeof hvVibrate === 'function') hvVibrate(p); };
function rota(id, fn) { try { window.FEATURE_ROUTES = window.FEATURE_ROUTES || {}; window.FEATURE_ROUTES[id] = fn; } catch (e) {} }

/* ═════════════════════════ ANLAYARAK NAMAZ ═════════════════════════ */
const AF = {
  niyet: 'namaz_01_niyet', tekbir: 'namaz_02_tekbir', tekbirY: 'namaz_03_tekbir_yakin', kiyam: 'namaz_04_kiyam',
  ruku: 'namaz_05_ruku', kavme: 'namaz_06_dogrulma', secde: 'namaz_07_secde', celse: 'namaz_08_celse',
  oturus: 'namaz_09_tahiyyat', sag: 'namaz_10_selam_sag', sol: 'namaz_11_selam_sol', dua: 'namaz_12_dua'
};
const SABIT = {
  tekbir: { ar: 'اللَّهُ أَكْبَرُ', ok: 'Allâhu Ekber', tr: 'Allah en büyüktür.' },
  euzu: { ar: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', ok: 'Eûzü billâhi mineş-şeytânir-racîm. Bismillâhirrahmânirrahîm.', tr: "Kovulmuş şeytanın şerrinden Allah'a sığınırım. Rahmân ve Rahîm olan Allah'ın adıyla." },
  ruku: { ar: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ', ok: 'Sübhâne rabbiyel azîm (3 kez)', tr: 'Yüce Rabbimi her türlü eksiklikten tenzih ederim.' },
  kavme: { ar: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ ۝ رَبَّنَا لَكَ الْحَمْدُ', ok: 'Semiallâhu limen hamideh. Rabbenâ lekel hamd.', tr: 'Allah kendisine hamd edeni işitir. Rabbimiz, hamd yalnız sanadır.' },
  secde: { ar: 'سُبْحَانَ رَبِّيَ الْأَعْلَى', ok: "Sübhâne rabbiyel a'lâ (3 kez)", tr: 'En yüce olan Rabbimi her türlü eksiklikten tenzih ederim.' },
  selam: { ar: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ', ok: 'Esselâmu aleyküm ve rahmetullâh', tr: "Allah'ın selamı ve rahmeti üzerinize olsun." }
};
function dua(k) {
  const d = (typeof PRAYER_DUAS !== 'undefined') ? PRAYER_DUAS[k] : null;
  return d ? { ar: d.arabic, ok: d.okunusu, tr: d.turkish, ad: d.title } : null;
}
function kisaSure(ad) {
  if (typeof KISA_SURELER === 'undefined') return null;
  const s = KISA_SURELER.find(x => x.title.indexOf(ad) === 0);
  return s ? { ar: s.arabic, ok: s.okunusu, tr: s.turkish, ad: s.title } : null;
}
function rekatSay(p) { const m = /(\d+)\s*Rek/i.exec(p.description || ''); return m ? parseInt(m[1], 10) : (p.type === 'vitir' ? 3 : 2); }
function tipAd(t) { return t === 'farz' ? 'farzını' : t === 'vitir' ? 'vitir vacibini' : 'sünnetini'; }

function anAdimlar(nKey, pIdx) {
  const g = PRAYER_GUIDE_DATA[nKey]; const p = g.parts[pIdx]; const R = rekatSay(p); const tip = p.type;
  const ad = g.name.toLocaleLowerCase('tr');
  const L = [];
  const ekle = (f, b, a, d, r) => L.push({ f, b, a, d: d || null, r: r || 0 });
  ekle('niyet', 'Niyet', `Kıbleye dön ve kalbinden niyet et. Dilinle de şöyle söyleyebilirsin: “Niyet ettim Allah rızası için bugünkü ${ad}nın ${R} rekât ${tipAd(tip)} kılmaya.”`, null, 0);
  const gayriMuekked = tip !== 'farz' && tip !== 'vitir' && R === 4 && (nKey === 'ikindi' || (nKey === 'yatsi' && pIdx === 0));
  for (let r = 1; r <= R; r++) {
    if (r === 1) {
      ekle('tekbir', 'İftitah Tekbiri', 'Erkekler ellerini kulak hizasına kaldırır, başparmaklar kulak memesine değer; kadınlar ellerini omuz hizasına kaldırır. “Allâhu Ekber” denir ve eller bağlanır (erkekler göbek altında, kadınlar göğüs üzerinde).', SABIT.tekbir, r);
      ekle('kiyam', 'Sübhâneke', 'Ayakta, gözler secde yerine bakarken Sübhâneke duası içinden okunur.', dua('subhaneke'), r);
      ekle('kiyam', 'Eûzü – Besmele', 'Ardından Eûzü ve Besmele çekilir.', SABIT.euzu, r);
    } else if (r === 3 && gayriMuekked) {
      ekle('kiyam', '3. Rekâta Kalkış', '“Allâhu Ekber” diyerek kalkılır. Bu sünnette 3. rekâtın başında yine Sübhâneke okunur, sonra Eûzü-Besmele çekilir.', dua('subhaneke'), r);
    }
    ekle('kiyam', 'Fâtiha', r === 1 ? 'Fâtiha Sûresi okunur. Sonunda içinden “Âmin” denir.' : '“Allâhu Ekber” diyerek ayağa kalkılır, eller bağlanır. Besmele çekilip Fâtiha okunur.', dua('fatiha'), r);
    const zamm = tip !== 'farz' || r <= 2;
    if (zamm) {
      const s = (r % 2 === 1) ? kisaSure('Kevser') : kisaSure('İhlâs');
      ekle('kiyam', 'Zamm-ı Sûre', `Fâtiha'dan sonra Kur'an'dan bir sûre ya da en az üç kısa âyet okunur. Örnek: ${s ? s.ad : 'Kevser Sûresi'}.`, s, r);
    }
    if (tip === 'vitir' && r === 3) {
      ekle('tekbir', 'Kunut Tekbiri', 'Zamm-ı sûreden sonra “Allâhu Ekber” denilerek eller kulak hizasına kaldırılır ve tekrar bağlanır.', SABIT.tekbir, r);
      ekle('kiyam', 'Kunut Duaları', 'Ayakta Kunut duaları okunur, sonra rükûya gidilir.', dua('kunut'), r);
    }
    ekle('ruku', 'Rükû', '“Allâhu Ekber” diyerek eğilinir. Eller dizlere konur, sırt ve baş düz tutulur.', SABIT.ruku, r);
    ekle('kavme', 'Rükûdan Doğrulma', 'Doğrulurken “Semiallâhu limen hamideh”, tam dik durunca “Rabbenâ lekel hamd” denir.', SABIT.kavme, r);
    ekle('secde', '1. Secde', '“Allâhu Ekber” diyerek secdeye gidilir: önce dizler, sonra eller, sonra burun ve alın yere konur.', SABIT.secde, r);
    ekle('celse', 'İki Secde Arası', '“Allâhu Ekber” diyerek doğrulup kısa bir süre oturulur (bir “Sübhânallah” diyecek kadar).', null, r);
    ekle('secde', '2. Secde', '“Allâhu Ekber” diyerek ikinci kez secdeye varılır ve aynı tesbih okunur.', SABIT.secde, r);
    if (r === 2 && R > 2) {
      ekle('oturus', 'İlk Oturuş', gayriMuekked
        ? 'İkinci secdeden sonra oturulur. Bu sünnette ilk oturuşta Ettehiyyâtü ile birlikte Salli ve Bârik de okunur, sonra “Allâhu Ekber” diyerek kalkılır.'
        : 'İkinci secdeden sonra oturulur, yalnız Ettehiyyâtü okunur. Sonra “Allâhu Ekber” diyerek 3. rekâta kalkılır.', dua('ettehiyyatu'), r);
    }
    if (r === R) {
      ekle('oturus', 'Son Oturuş · Ettehiyyâtü', 'Son rekâtın secdelerinden sonra oturulur ve Ettehiyyâtü okunur.', dua('ettehiyyatu'), r);
      ekle('oturus', 'Allâhümme Salli', 'Peygamberimize salavat getirilir.', dua('allahummeSalli'), r);
      ekle('oturus', 'Allâhümme Bârik', 'Bereket duası okunur.', dua('allahummeBarik'), r);
      ekle('oturus', 'Rabbenâ Duaları', 'Rabbenâ âtinâ ve Rabbenâğfirlî duaları okunur.', dua('rabbenaDuasi'), r);
    }
  }
  ekle('sag', 'Selam · Sağa', 'Baş sağa çevrilir, göz omuza bakar ve selam verilir.', SABIT.selam, 0);
  ekle('sol', 'Selam · Sola', 'Sonra baş sola çevrilir ve yine selam verilir. Namaz tamamlandı.', SABIT.selam, 0);
  ekle('dua', 'Namazdan Sonra', '“Allâhümme entesselâm ve minkesselâm tebârekte yâ zel-celâli vel-ikrâm” denir. 33 Sübhânallah, 33 Elhamdülillah, 33 Allâhu Ekber çekilir, eller açılıp dua edilir.', null, 0);
  return L;
}

let AN = Object.assign({ n: 'ogle', p: 1, i: 0, mod: 'secim' }, yukle('anlayarak', {}));
function anKaydet() { kaydet('anlayarak', { n: AN.n, p: AN.p, i: AN.i }); }
function anGuide() { return (typeof PRAYER_GUIDE_DATA !== 'undefined') ? PRAYER_GUIDE_DATA[AN.n] : null; }
/* v68.1: Erkek / Kadın anlatım (fotoğraflar namaz_k_* ile) */
const anKadin = () => yukle('an_cins', 'e') === 'k';
function foto(f) { const n = AF[f] || AF.kiyam; return anKadin() ? `img/${n.replace('namaz_', 'namaz_k_')}.jpg?v=3` : `img/${n}.jpg`; }   // v=2: HD kadın seti
window.hvAnCins = (c) => { kaydet('an_cins', c); renderAnlayarak(); };
function duaKart(d) {
  if (!d) return '';
  return `<div class="an-dua">
    <div class="an-ar" dir="rtl" lang="ar">${esc(d.ar)}</div>
    ${d.ok ? `<div class="an-ok">${esc(d.ok)}</div>` : ''}
    ${d.tr ? `<div class="an-tr"><b>Anlamı:</b> ${esc(d.tr)}</div>` : ''}
  </div>`;
}

function renderAnlayarak() {
  const k = $('anlayarak-root'); if (!k) return;
  const g = anGuide(); if (!g) { k.innerHTML = '<div class="info-note">Rehber verisi yüklenemedi.</div>'; return; }
  if (AN.p >= g.parts.length) AN.p = 0;
  if (AN.mod === 'adim') return anAdimCiz();
  if (AN.mod === 'toplu') return anTopluCiz();
  if (AN.mod === 'bitti') return anBittiCiz();
  // Seçim ekranı
  const keys = Object.keys(PRAYER_GUIDE_DATA);
  const kayit = yukle('anlayarak', null);
  const kisa = (n) => PRAYER_GUIDE_DATA[n].parts.map(rekatSay).join('+');
  k.innerHTML = `
    <button class="hub-back-btn yh-geri" onclick="hvGeri('namaz-ogren')">‹ Geri</button>
    <div class="an-kapak" style="background-image:url(img/kart_anlayarak.jpg)"><div><small>ANLAYARAK NAMAZ</small><b>Hareketi gör, anlamını öğren</b><span>Her adımda fotoğraf · Arapça · okunuş · anlam</span></div></div>
    <div class="an-cins"><button class="${anKadin() ? '' : 'on'}" onclick="hvAnCins('e')">👨 Erkek</button><button class="${anKadin() ? 'on' : ''}" onclick="hvAnCins('k')">🧕 Kadın</button></div>
    <div class="yh-grup">Hangi namazı öğrenmek istersin?</div>
    <div class="an-namaz">${keys.map(n => `<button class="${n === AN.n ? 'on' : ''}" onclick="hvAnNamaz('${n}')"><b>${esc(PRAYER_GUIDE_DATA[n].name.replace(' Namazı', ''))}</b><small>${kisa(n)}</small></button>`).join('')}</div>
    <div class="yh-grup">${esc(g.name)} · ${g.totalRakat} rekât <small class="an-ipucu">Bir bölüme dokun, fotoğraflı anlatım başlasın</small></div>
    <div class="yh-liste">${g.parts.map((p, i) => `<button class="yh-sat an-kisim ${i === AN.p ? 'on' : ''}" onclick="hvAnKisim(${i});hvAnBasla(0)"><span class="yh-ik an-rek an-rek-f" style="background-image:url(${foto(['kiyam', 'ruku', 'secde', 'oturus'][i % 4])})"><i>${rekatSay(p)}</i></span><span class="yh-m"><b>${esc(p.description)}</b><small>${p.type === 'farz' ? 'Farz' : p.type === 'vitir' ? 'Vitir (vacip)' : 'Sünnet'} · ${anAdimlar(AN.n, i).length} adım</small></span><span class="an-git">Başla ›</span></button>`).join('')}</div>
    <div class="an-not"><b>Mezhep notu:</b> Anlatım Hanefî mezhebine göredir. Kadınlar için farklı olan yerler (el kaldırma, el bağlama, rükû ve secdede toplu durma) ilgili adımda yazılıdır.</div>
    <button class="an-basla" onclick="hvAnBasla(0)">Öğrenmeye başla ›</button>
    ${kayit && kayit.i > 0 && PRAYER_GUIDE_DATA[kayit.n] ? `<button class="an-devam" onclick="hvAnDevam()">Kaldığın yerden devam et · ${esc(PRAYER_GUIDE_DATA[kayit.n].name)} · ${kayit.i + 1}. adım</button>` : ''}
`;
}
function anUst(baslik) {
  const g = anGuide(); const p = g.parts[AN.p];
  return `<div class="an-ust"><button class="hub-back-btn" onclick="hvAnSecim()">‹ Seçim</button><span>${esc(g.name.replace(' Namazı', ''))} · ${esc(p.description)}</span>${baslik || ''}</div>`;
}
function anAdimCiz() {
  const k = $('anlayarak-root'); const L = anAdimlar(AN.n, AN.p);
  if (AN.i >= L.length) AN.i = L.length - 1; if (AN.i < 0) AN.i = 0;
  const a = L[AN.i]; const yuzde = Math.round((AN.i + 1) / L.length * 100);
  k.innerHTML = `
    ${anUst(`<button class="an-toplu-btn" onclick="hvAnMod('toplu')">☰ Tümü</button>`)}
    <div class="an-ilerle"><i style="width:${yuzde}%"></i></div>
    <div class="an-foto" id="an-foto" style="background-image:url(${foto(a.f)})">
      <span class="an-sayi">${AN.i + 1} / ${L.length}</span>${a.r ? `<span class="an-rekat">${a.r}. rekât</span>` : ''}
    </div>
    <h3 class="an-baslik">${esc(a.b)}</h3>
    <p class="an-acik">${esc(a.a)}</p>
    ${duaKart(a.d)}
    <div class="an-alt">
      <button class="an-btn" ${AN.i === 0 ? 'disabled' : ''} onclick="hvAnGit(-1)">‹ Önceki</button>
      <button class="an-btn an-ileri" onclick="hvAnGit(1)">${AN.i === L.length - 1 ? 'Bitir ✓' : 'Sonraki ›'}</button>
    </div>`;
  anKaydet();
  const f = $('an-foto');
  if (f) {
    let x0 = null;
    f.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    f.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) hvAnGit(dx < 0 ? 1 : -1); x0 = null; });
  }
  const kutu = k.closest('.hero-frame-box'); if (kutu) kutu.scrollTop = 0;
  // sonraki fotoğrafı önceden yükle
  if (L[AN.i + 1]) { const im = new Image(); im.src = foto(L[AN.i + 1].f); }
}
function anTopluCiz() {
  const k = $('anlayarak-root'); const L = anAdimlar(AN.n, AN.p);
  let son = -1; let html = '';
  L.forEach((a, i) => {
    if (a.r !== son) { son = a.r; html += `<div class="an-grup">${a.r ? a.r + '. Rekât' : (i === 0 ? 'Başlangıç' : 'Bitiş')}</div>`; }
    html += `<button class="an-satir ${i === AN.i ? 'on' : ''}" onclick="hvAnBasla(${i})"><span class="an-kf" style="background-image:url(${foto(a.f)})"></span><span class="an-no">${i + 1}</span><span class="an-sm"><b>${esc(a.b)}</b>${a.d && a.d.ok ? `<small>${esc(a.d.ok.slice(0, 60))}${a.d.ok.length > 60 ? '…' : ''}</small>` : ''}</span></button>`;
  });
  k.innerHTML = `${anUst(`<button class="an-toplu-btn" onclick="hvAnMod('adim')">▶ Adımlar</button>`)}
    <div class="an-toplu-bas">${esc(anGuide().parts[AN.p].description)} · toplu görünüm · ${L.length} adım</div>${html}`;
}
function anBittiCiz() {
  const k = $('anlayarak-root'); const g = anGuide();
  const biten = yukle('anlayarak_biten', {}); biten[AN.n + ':' + AN.p] = bugunKey(); kaydet('anlayarak_biten', biten);
  k.innerHTML = `${anUst('')}
    <div class="an-foto an-bitti" style="background-image:url(${foto('dua')})"></div>
    <h3 class="an-baslik" style="text-align:center">Ders tamamlandı 🎉</h3>
    <p class="an-acik" style="text-align:center">${esc(g.name)} · ${esc(g.parts[AN.p].description)} bölümünü baştan sona öğrendin. Allah kabul etsin.</p>
    <div class="an-alt"><button class="an-btn" onclick="hvAnBasla(0)">Baştan</button><button class="an-btn an-ileri" onclick="hvAnSecim()">Başka namaz seç</button></div>`;
  kaydet('anlayarak', { n: AN.n, p: AN.p, i: 0 });
}
window.hvAnNamaz = (n) => { AN.n = n; AN.p = 0; AN.i = 0; const g = PRAYER_GUIDE_DATA[n]; const fi = g.parts.findIndex(p => p.type === 'farz'); if (fi >= 0) AN.p = fi; renderAnlayarak(); };
window.hvAnKisim = (i) => { AN.p = i; AN.i = 0; renderAnlayarak(); };
window.hvAnBasla = (i) => { AN.i = i || 0; AN.mod = 'adim'; renderAnlayarak(); };
window.hvAnDevam = () => { const k = yukle('anlayarak', null); if (k) { AN.n = k.n; AN.p = k.p; AN.i = k.i; } AN.mod = 'adim'; renderAnlayarak(); };
window.hvAnSecim = () => { AN.mod = 'secim'; renderAnlayarak(); };
window.hvAnMod = (m) => { AN.mod = m; renderAnlayarak(); };
window.hvAnGit = (d) => {
  const L = anAdimlar(AN.n, AN.p);
  if (d > 0 && AN.i >= L.length - 1) { AN.mod = 'bitti'; titre([20, 40, 20]); return renderAnlayarak(); }
  AN.i = Math.max(0, Math.min(L.length - 1, AN.i + d)); titre(8); anAdimCiz();
};
rota('anlayarak', () => { if (AN.mod === 'bitti') AN.mod = 'secim'; renderAnlayarak(); });

/* ═════════════════════════ TAKİBİM PANOSU + ROZETLER ═════════════════════════ */
function vakitler() { return (typeof NAMAZ_VAKITLERI !== 'undefined') ? NAMAZ_VAKITLERI : [{ key: 'sabah' }, { key: 'ogle' }, { key: 'ikindi' }, { key: 'aksam' }, { key: 'yatsi' }]; }
function mazeretler() { return yukle('mazeret', {}); }
function gunSay(rec) { return vakitler().filter(v => rec && rec[v.key]).length; }
// Seri: mazeretli günler seriyi bozmaz (sayılmaz da)
window.calcNamazStreak = function (data) {
  const mz = mazeretler(); let seri = 0; const d = new Date();
  const tam = (k) => gunSay(data[k] || {}) === 5;
  if (!tam(bugunKey(d)) ) d.setDate(d.getDate() - 1);
  for (let i = 0; i < 500; i++) {
    const k = bugunKey(d);
    if (tam(k)) seri++;
    else if (!mz[k]) break;
    d.setDate(d.getDate() - 1);
  }
  return seri;
};
function toplamNamaz(data) { let t = 0; Object.keys(data || {}).forEach(k => { t += gunSay(data[k]); }); return t; }
function enUzunSeri(data) {
  const mz = mazeretler(); const keys = Object.keys(data || {}).sort(); if (!keys.length) return 0;
  let enU = 0, s = 0; const d = new Date(keys[0] + 'T12:00:00'); const son = new Date();
  for (let i = 0; i < 1500 && d <= son; i++) {
    const k = bugunKey(d);
    if (gunSay(data[k] || {}) === 5) { s++; enU = Math.max(enU, s); } else if (!mz[k]) s = 0;
    d.setDate(d.getDate() + 1);
  }
  return enU;
}
const ROZETLER = [
  { id: 'ilk', ik: '🌱', ad: 'İlk adım', s: (v) => v.toplam >= 1 },
  { id: 's7', ik: '🔥', ad: '7 gün', s: (v) => v.enSeri >= 7 },
  { id: 'n40', ik: '🕌', ad: '40 namaz', s: (v) => v.toplam >= 40 },
  { id: 's40', ik: '⭐', ad: '40 gün', s: (v) => v.enSeri >= 40 },
  { id: 'n100', ik: '🌙', ad: '100 namaz', s: (v) => v.toplam >= 100 },
  { id: 'z1000', ik: '📿', ad: '1000 zikir', s: (v) => v.zikir >= 1000 },
  { id: 'an', ik: '🤲', ad: 'Anlayarak', s: (v) => v.anlayarak >= 1 },
  { id: 'kelime', ik: '🔤', ad: '50 kelime', s: (v) => v.kelime >= 50 },
  { id: 'n500', ik: '🏅', ad: '500 namaz', s: (v) => v.toplam >= 500 }
];
function rozetVerisi() {
  const data = yukle('namaz_takip', {});
  let zikir = 0; try { zikir = parseInt(yukle('zikir_total', 0), 10) || 0; } catch (e) {}
  return { toplam: toplamNamaz(data), enSeri: enUzunSeri(data), zikir, anlayarak: Object.keys(yukle('anlayarak_biten', {})).length, kelime: (yukle('kelime_bilinen', []) || []).length };
}
function rozetHtml() {
  if (yukle('rozet_gizle', false)) return '';
  const v = rozetVerisi(); const kaz = ROZETLER.filter(r => r.s(v)).length;
  return `<div class="tk-rz-bas"><b>Rozetlerim</b><button onclick="hvRozetGizle(true)">${kaz} / ${ROZETLER.length} · gizle ›</button></div>
    <div class="tk-rz">${ROZETLER.map(r => `<div class="${r.s(v) ? 'var' : ''}"><span>${r.ik}</span><small>${esc(r.ad)}</small></div>`).join('')}</div>`;
}
window.hvRozetGizle = (g) => { kaydet('rozet_gizle', !!g); renderTakipPano(); const cb = $('rozet-toggle'); if (cb) cb.checked = !g; if (g) toast('Rozetler gizlendi', 'Ayarlar’dan tekrar açabilirsin.'); };
function renderTakipPano() {
  const c = $('tk-pano'); if (!c) return;
  const data = yukle('namaz_takip', {}); const mz = mazeretler();
  const bugun = new Date(); const gun = (bugun.getDay() + 6) % 7; // Pazartesi=0
  const pzt = new Date(bugun); pzt.setDate(bugun.getDate() - gun);
  const AD = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts', 'Paz'];
  let hafta = '';
  for (let i = 0; i < 7; i++) {
    const d = new Date(pzt); d.setDate(pzt.getDate() + i); const k = bugunKey(d); const n = gunSay(data[k] || {});
    const gelecek = d > bugun && i > gun;
    const cls = mz[k] ? 'mz' : n === 5 ? 'tam' : n > 0 ? 'yari' : '';
    hafta += `<div class="tk-g ${i === gun ? 'bu' : ''} ${gelecek ? 'gel' : ''}"><small>${AD[i]}</small><span class="${cls}" style="--o:${n / 5}">${mz[k] ? 'M' : n === 5 ? '✓' : n > 0 ? n : ''}</span></div>`;
  }
  // Ay durumu
  const ay = bugun.getMonth(); const yil = bugun.getFullYear(); let kil = 0, hedef = 0;
  for (let g2 = 1; g2 <= bugun.getDate(); g2++) { const k = bugunKey(new Date(yil, ay, g2)); if (mz[k]) continue; hedef += 5; kil += gunSay(data[k] || {}); }
  const yuz = hedef ? Math.round(kil / hedef * 100) : 0;
  const seri = window.calcNamazStreak(data);
  const AYLAR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  c.innerHTML = `
    <div class="tk-kart" onclick="navigateTo('namaz-takibi')"><div class="tk-kb"><b>Bu hafta</b><small>Dokun → bugünü işaretle</small></div><div class="tk-hafta">${hafta}</div>
      <div class="tk-mz-not"><span class="mz">M</span> Mazeretli gün — seri bozulmaz</div></div>
    <div class="tk-kart tk-ay" onclick="navigateTo('namaz-takibi')">
      <div class="tk-halka" style="--y:${yuz}"><b>%${yuz}</b></div>
      <div class="tk-ay-m"><small>${AYLAR[ay]} durumu</small><b>${kil} / ${hedef} namaz</b><span>🔥 ${seri} günlük seri</span></div><span class="yh-ok">›</span></div>
    ${rozetHtml()}`;
}
rota('ibadet', renderTakipPano);

// Namaz Takibi sayfasına "mazeretli gün" anahtarı
const _eskiNT = window.renderNamazTakibi;
if (typeof _eskiNT === 'function') {
  window.renderNamazTakibi = function () {
    _eskiNT.apply(this, arguments);
    const c = $('namaz-takibi-content'); if (!c || c.querySelector('.tk-mz-satir')) return;
    const k = bugunKey(); const mz = mazeretler();
    const d = document.createElement('div'); d.className = 'tk-mz-satir';
    d.innerHTML = `<label><input type="checkbox" ${mz[k] ? 'checked' : ''} onchange="hvMazeret(this.checked)"> <span><b>Bugün mazeretliyim</b><small>Seri bozulmaz, aylık hesaba katılmaz</small></span></label>`;
    const ref = c.querySelector('.streak-box'); if (ref) ref.after(d); else c.appendChild(d);
  };
  rota('namaz-takibi', window.renderNamazTakibi);
}
window.hvMazeret = (on) => { const mz = mazeretler(); const k = bugunKey(); if (on) mz[k] = 1; else delete mz[k]; kaydet('mazeret', mz); if (typeof window.renderNamazTakibi === 'function') { const c = $('namaz-takibi-content'); if (c) c.innerHTML = ''; window.renderNamazTakibi(); } };

/* ═════════════════════════ ZİKİRMATİK YENİ GÖRÜNÜM ═════════════════════════ */
const _eskiZk = window.renderZikirmatik;
if (typeof _eskiZk === 'function') {
  window.renderZikirmatik = function () {
    _eskiZk.apply(this, arguments);
    const s = $('page-zikirmatik'); if (s) s.classList.add('zk-yeni');
    const disp = document.querySelector('#zikirmatik-content .zikir-display');
    if (disp && !disp.dataset.yeni) {
      disp.dataset.yeni = '1';
      disp.setAttribute('role', 'button');
      disp.addEventListener('click', () => { if (typeof zikirTap === 'function') zikirTap(); });
      const ipucu = document.createElement('div'); ipucu.className = 'zk-ipucu'; ipucu.textContent = 'Saymak için daireye dokun';
      disp.after(ipucu);
      const pw = $('zikir-presets');
      if (pw && !document.querySelector('.zk-liste-bas')) { const b = document.createElement('div'); b.className = 'zk-liste-bas'; b.textContent = 'Zikir listem'; pw.before(b); }
      const say = $('zikir-count');
      const guncelle = () => {
        const n = parseInt((say && say.textContent) || '0', 10) || 0;
        const t = /(\d+)/.exec(($('zikir-target') || {}).textContent || '');
        const h = t ? parseInt(t[1], 10) : 0;
        disp.style.setProperty('--zk', h ? Math.min(1, (n % h || (n ? h : 0)) / h) : 0);
      };
      if (say) new MutationObserver(guncelle).observe(say, { childList: true, characterData: true, subtree: true });
      guncelle();
    }
  };
  rota('zikirmatik', window.renderZikirmatik);
}

/* ═════════════════════════ GECE RUTİNİ ═════════════════════════ */
function geceListe() {
  const ks = (ad) => kisaSure(ad) || {};
  const kursi = (typeof EZKAR_AKSAM !== 'undefined') ? (EZKAR_AKSAM.find(x => /Kürs/.test(x.title)) || {}) : {};
  const yat = (typeof GUNLUK_DUALAR !== 'undefined') ? (GUNLUK_DUALAR.find(x => /Uyumadan|Yatağa/.test(x.title)) || {}) : {};
  return [
    { id: 'mulk', ad: 'Mülk Sûresi', alt: "Kabir azabından koruyan sûre — Kur'an'da aç", sure: 67 },
    { id: 'kursi', ad: 'Âyete’l-Kürsî', d: { ar: kursi.arabic, ok: kursi.okunusu, tr: kursi.turkish } },
    { id: 'ihlas', ad: 'İhlâs · Felak · Nâs', alt: 'Üçer kez, avuçlara üfleyip vücuda sürülür', d3: ['İhlâs', 'Felâk', 'Nâs'].map(x => ks(x)) },
    { id: 'yatma', ad: 'Yatma Duası', d: { ar: yat.arabic, ok: yat.okunusu, tr: yat.turkish } }
  ];
}
function renderGeceRutini() {
  const c = $('gece-rutini-content'); if (!c) return;
  const k = bugunKey(); const t = yukle('gece_rutin', {}); const bu = t[k] || {};
  const L = geceListe(); const n = L.filter(x => bu[x.id]).length;
  c.innerHTML = `<div class="gr-ust" style="background-image:url(img/kart_gece.jpg)"><div><small>HER GECE</small><b>Gece Rutini</b><span>Bu gece ${n} / ${L.length} okundu</span></div></div>
  ${L.map(x => `<details class="gr-kart ${bu[x.id] ? 'ok' : ''}">
    <summary><button class="gr-tik" onclick="event.preventDefault();hvGeceTik('${x.id}')">${bu[x.id] ? '✓' : ''}</button><span><b>${esc(x.ad)}</b>${x.alt ? `<small>${esc(x.alt)}</small>` : ''}</span></summary>
    <div class="gr-ic">${x.sure ? `<button class="an-basla" onclick="openSurahById(${x.sure})">Mülk Sûresi'ni oku ›</button>` : ''}
      ${x.d ? duaKart(x.d) : ''}${x.d3 ? x.d3.map(d => d.ar ? `<div class="gr-alt-bas">${esc(d.title || '')}</div>${duaKart({ ar: d.arabic, ok: d.okunusu, tr: d.turkish })}` : '').join('') : ''}</div></details>`).join('')}
  <div class="info-note">Peygamberimiz (s.a.v.) her gece yatmadan önce Mülk Sûresi'ni okur, İhlâs, Felak ve Nâs'ı okuyup avuçlarına üfler ve vücudunu meshederdi (Buhârî, Tirmizî).</div>`;
}
window.hvGeceTik = (id) => { const k = bugunKey(); const t = yukle('gece_rutin', {}); t[k] = t[k] || {}; t[k][id] = !t[k][id]; kaydet('gece_rutin', t); titre(10); renderGeceRutini(); };
rota('gece-rutini', renderGeceRutini);

/* ═════════════════════════ DUA DEFTERİM ═════════════════════════ */
function renderDuaDefteri() {
  const c = $('dua-defteri-content'); if (!c) return;
  const D = yukle('dua_defter', { dualar: [], kisiler: [] });
  c.innerHTML = `
    <div class="yh-grup" style="margin-top:4px">Kendi dualarım</div>
    <div class="dd-yaz"><input id="dd-baslik" placeholder="Başlık (ör. Annem için)" maxlength="60"><textarea id="dd-metin" rows="3" placeholder="Duanı buraya yaz…" maxlength="1500"></textarea><button class="an-basla" onclick="hvDdEkle()">Kaydet</button></div>
    ${D.dualar.length ? D.dualar.map((d, i) => `<div class="dd-kart"><b>${esc(d.b || 'Duam')}</b><p>${esc(d.m)}</p><div><button onclick="hvDdPaylas(${i})">Paylaş</button><button onclick="hvDdSil('dualar',${i})">Sil</button></div></div>`).join('') : '<div class="info-note">Henüz dua yazmadın. Yazdıkların yalnızca bu telefonda saklanır.</div>'}
    <div class="yh-grup">Dua edeceğim kişiler</div>
    <div class="dd-kisi-ekle"><input id="dd-kisi" placeholder="İsim (ör. Ahmet amca — şifa)" maxlength="60"><button onclick="hvDdKisi()">Ekle</button></div>
    <div class="yh-cip">${D.kisiler.map((k, i) => `<button onclick="hvDdSil('kisiler',${i})" title="Silmek için dokun">🤲 ${esc(k)} ✕</button>`).join('') || '<span class="dd-bos">Listeye eklediklerin namazdan sonra hatırlaman için burada durur.</span>'}</div>`;
}
window.hvDdEkle = () => { const m = ($('dd-metin') || {}).value || ''; if (!m.trim()) return toast('Boş', 'Önce duanı yaz.'); const D = yukle('dua_defter', { dualar: [], kisiler: [] }); D.dualar.unshift({ b: (($('dd-baslik') || {}).value || '').trim(), m: m.trim(), t: Date.now() }); kaydet('dua_defter', D); renderDuaDefteri(); toast('✅ Kaydedildi', 'Duan deftere eklendi.'); };
window.hvDdKisi = () => { const v = (($('dd-kisi') || {}).value || '').trim(); if (!v) return; const D = yukle('dua_defter', { dualar: [], kisiler: [] }); D.kisiler.push(v); kaydet('dua_defter', D); renderDuaDefteri(); };
window.hvDdSil = (tur, i) => { const D = yukle('dua_defter', { dualar: [], kisiler: [] }); D[tur].splice(i, 1); kaydet('dua_defter', D); renderDuaDefteri(); toast('Silindi', ''); };
window.hvDdPaylas = (i) => { const D = yukle('dua_defter', { dualar: [] }); const d = D.dualar[i]; if (!d) return; if (typeof hvOpenShareCard === 'function') hvOpenShareCard({ badge: '🤲 Duam', text: d.m, source: d.b || 'Namaz Dostu', fallbackText: (d.b ? d.b + '\n\n' : '') + d.m }); };
rota('dua-defteri', renderDuaDefteri);

/* ═════════════════════════ KUR'AN KELİME KARTLARI ═════════════════════════ */
const KELIMELER = [
  ['اللَّه', 'Allah', 'Allah'], ['رَبّ', 'Rab', 'Rab, terbiye eden, sahip'], ['قَالَ', 'kâle', 'dedi'], ['قُلْ', 'kul', 'de ki, söyle'],
  ['إِلَٰه', 'ilâh', 'ilah, ibadet edilen'], ['يَوْم', 'yevm', 'gün'], ['أَرْض', 'ard', 'yer, yeryüzü'], ['سَمَاء', 'semâ', 'gök'],
  ['نَاس', 'nâs', 'insanlar'], ['قَوْم', 'kavm', 'kavim, topluluk'], ['كِتَاب', 'kitâb', 'kitap'], ['آيَة', 'âyet', 'âyet, işaret, delil'],
  ['رَسُول', 'resûl', 'elçi, peygamber'], ['نَبِيّ', 'nebî', 'peygamber'], ['حَقّ', 'hak', 'gerçek, doğru'], ['عِلْم', 'ilm', 'bilgi'],
  ['عَلِيم', 'alîm', 'her şeyi bilen'], ['رَحْمَة', 'rahmet', 'merhamet, rahmet'], ['رَحِيم', 'rahîm', 'çok merhametli'], ['غَفُور', 'gafûr', 'çok bağışlayan'],
  ['قَلْب', 'kalb', 'kalp, gönül'], ['نَفْس', 'nefs', 'can, kişi, nefis'], ['خَيْر', 'hayr', 'iyilik, hayır'], ['شَرّ', 'şerr', 'kötülük'],
  ['جَنَّة', 'cennet', 'cennet, bahçe'], ['نَار', 'nâr', 'ateş, cehennem'], ['آخِرَة', 'âhiret', 'ahiret'], ['دُنْيَا', 'dünyâ', 'dünya, yakın hayat'],
  ['صَلَاة', 'salât', 'namaz, dua'], ['زَكَاة', 'zekât', 'zekât, arınma'], ['إِيمَان', 'îmân', 'iman, inanç'], ['آمَنُوا', 'âmenû', 'iman ettiler'],
  ['كَفَرُوا', 'keferû', 'inkâr ettiler'], ['عَمِلُوا', 'amilû', 'yaptılar, işlediler'], ['صَالِحَات', 'sâlihât', 'iyi işler'], ['تَقْوَى', 'takvâ', 'Allah’a saygı, sakınma'],
  ['هُدًى', 'hüdâ', 'hidayet, doğru yol'], ['سَبِيل', 'sebîl', 'yol'], ['صِرَاط', 'sırât', 'yol'], ['مُسْتَقِيم', 'müstakîm', 'dosdoğru'],
  ['ظُلْم', 'zulm', 'zulüm, haksızlık'], ['عَذَاب', 'azâb', 'azap'], ['أَجْر', 'ecr', 'karşılık, ödül'], ['شَيْء', 'şey’', 'şey'],
  ['كُلّ', 'küll', 'her, bütün'], ['بَيْن', 'beyn', 'ara, arasında'], ['عِنْد', 'ind', 'yanında, katında'], ['مِنْ', 'min', '-den, -dan'],
  ['إِلَىٰ', 'ilâ', '-e, -a doğru'], ['عَلَىٰ', 'alâ', 'üzerine'], ['فِي', 'fî', 'içinde, -de'], ['لَا', 'lâ', 'hayır, yok, değil'],
  ['مَا', 'mâ', 'ne, şey; değil'], ['مَنْ', 'men', 'kim, kimse'], ['الَّذِي', 'ellezî', 'o ki, … olan'], ['إِنَّ', 'inne', 'şüphesiz'],
  ['يَا أَيُّهَا', 'yâ eyyühâ', 'ey!'], ['عَبْد', 'abd', 'kul'], ['عِبَادَة', 'ibâdet', 'kulluk, ibadet'], ['ذِكْر', 'zikr', 'anma, hatırlama'],
  ['شُكْر', 'şükr', 'şükür'], ['صَبْر', 'sabr', 'sabır'], ['تَوْبَة', 'tevbe', 'tövbe, dönüş'], ['دُعَاء', 'duâ', 'dua, yakarış'],
  ['حَمْد', 'hamd', 'övgü, hamd'], ['سُبْحَان', 'sübhân', 'tenzih ederim, yücedir'], ['أَكْبَر', 'ekber', 'en büyük'], ['عَظِيم', 'azîm', 'çok büyük'],
  ['كَرِيم', 'kerîm', 'cömert, değerli'], ['حَكِيم', 'hakîm', 'hikmet sahibi'], ['قَدِير', 'kadîr', 'gücü yeten'], ['بَصِير', 'basîr', 'gören'],
  ['سَمِيع', 'semî’', 'işiten'], ['مَلَك', 'melek', 'melek'], ['شَيْطَان', 'şeytân', 'şeytan'], ['إِنْسَان', 'insân', 'insan'],
  ['أُمّ', 'ümm', 'anne'], ['أَب', 'eb', 'baba'], ['وَلَد', 'veled', 'çocuk'], ['أَهْل', 'ehl', 'aile, halk'],
  ['مَاء', 'mâ’', 'su'], ['شَمْس', 'şems', 'güneş'], ['قَمَر', 'kamer', 'ay'], ['لَيْل', 'leyl', 'gece'],
  ['نَهَار', 'nehâr', 'gündüz'], ['نُور', 'nûr', 'nur, ışık'], ['ظُلُمَات', 'zulumât', 'karanlıklar'], ['بَحْر', 'bahr', 'deniz'],
  ['جَبَل', 'cebel', 'dağ'], ['رِزْق', 'rızk', 'rızık'], ['مَال', 'mâl', 'mal, servet'], ['سَلَام', 'selâm', 'esenlik, barış'],
  ['قُرْآن', 'kur’ân', 'Kur’an, okunan'], ['آخِر', 'âhir', 'son'], ['أَوَّل', 'evvel', 'ilk'], ['وَاحِد', 'vâhid', 'bir, tek'],
  ['أَحَد', 'ehad', 'bir, tek, kimse'], ['حَيّ', 'hayy', 'diri'], ['مَوْت', 'mevt', 'ölüm'], ['حَيَاة', 'hayât', 'hayat']
];
let _kk = { i: 0, ac: false, mod: 'hepsi' };
function renderKelime() {
  const c = $('kelime-content'); if (!c) return;
  const bil = yukle('kelime_bilinen', []); const liste = _kk.mod === 'kalan' ? KELIMELER.map((k, i) => i).filter(i => bil.indexOf(i) < 0) : KELIMELER.map((k, i) => i);
  if (!liste.length) { c.innerHTML = `<div class="kk-bitti">🎉 Hepsini öğrendin! <button class="an-basla" onclick="hvKkSifirla()">Baştan başla</button></div>${hvOgCubuk('kk')}`; return; }
  if (_kk.i >= liste.length) _kk.i = 0;
  const idx = liste[_kk.i]; const k = KELIMELER[idx];
  c.innerHTML = `
    <div class="kk-ust"><span>${bil.length} / ${KELIMELER.length} öğrenildi</span><div class="kk-mod"><button class="${_kk.mod === 'hepsi' ? 'on' : ''}" onclick="hvKkMod('hepsi')">Hepsi</button><button class="${_kk.mod === 'kalan' ? 'on' : ''}" onclick="hvKkMod('kalan')">Öğrenmediklerim</button></div></div>
    <div class="an-ilerle"><i style="width:${Math.round(bil.length / KELIMELER.length * 100)}%"></i></div>
    <button class="kk-kart ${_kk.ac ? 'ac' : ''}" onclick="hvKkCevir()">
      <span class="kk-no">${_kk.i + 1} / ${liste.length}</span>
      <span class="kk-ar" dir="rtl" lang="ar">${k[0]}</span>
      ${_kk.ac ? `<span class="kk-ok">${esc(k[1])}</span><span class="kk-an">${esc(k[2])}</span>` : '<span class="kk-ipucu">Anlamını görmek için dokun</span>'}
      ${bil.indexOf(idx) >= 0 ? `<span class="kk-rozet" onclick="event.stopPropagation();hvKkUnut(${idx})">✓ biliyorum · <u>geri al</u></span>` : ''}
    </button>
    <div class="an-alt"><button class="an-btn" onclick="hvKkGit(0)">Tekrar et</button><button class="an-btn an-ileri" onclick="hvKkGit(1)">Biliyorum ✓</button></div>
    ${hvOgCubuk('kk')}
    <div class="info-note">Kur'an'da en sık geçen kelimeleri öğrenince okuduğun âyetlerin önemli bir kısmını anlamaya başlarsın. Kart önce Arapça yüzüyle gelir; dokununca okunuşu ve anlamı açılır.</div>`;
}
window.hvKkCevir = () => { _kk.ac = !_kk.ac; titre(6); renderKelime(); };
/* v68.9.2: yanlışlıkla "Biliyorum / Öğrendim" denirse geri alınabilsin (çocuklar için) */
window.hvGeriAlPil = (metin, geriAl) => {
  let p = $('geri-al-pil'); if (p) p.remove();
  p = document.createElement('div'); p.id = 'geri-al-pil'; p.className = 'yi-pil geri-al-pil';
  p.innerHTML = `<span>${esc(metin)}</span><button>↩ Geri al</button>`;
  p.querySelector('button').onclick = () => { p.remove(); try { geriAl(); } catch (e) {} };
  document.body.appendChild(p); requestAnimationFrame(() => p.classList.add('gor'));
  clearTimeout(window._gaT); window._gaT = setTimeout(() => { p.classList.remove('gor'); setTimeout(() => p.remove(), 300); }, 5000);
};
window.hvKkUnut = (idx) => { hvOgAnlik('kk'); const bil = yukle('kelime_bilinen', []).filter(x => x !== idx); kaydet('kelime_bilinen', bil); renderKelime(); };
/* v68.9.3: öğrenme alanlarında KALICI "Geri al" + "Sıfırla" çubuğu (kaybolan bildirime ek olarak) */
const OG_ALAN = {
  sd: { ls: 'hv_sd_ogrenildi', bir: 'sayfa', yenile: () => { if (typeof hvSdListeAcik !== 'undefined' && hvSdListeAcik) hvSdListeGoster(); else { if (typeof hvSdOgrendimDugme === 'function') hvSdOgrendimDugme(); hvOgCubukGuncelle('sd'); } } },
  ez: { ls: 'hv_ezber_ogrenildi', bir: 'metin', yenile: () => { if ($('ez-ogrendim')) { hvEzOgrendimGuncelle(); hvOgCubukGuncelle('ez'); } else if (typeof renderEzber === 'function') renderEzber(); } },
  kk: { ls: 'hv_kelime_bilinen', bir: 'kelime', yenile: () => renderKelime() }
};
const ogListe = (a) => { try { const v = JSON.parse(localStorage.getItem(OG_ALAN[a].ls) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
const ogGecmis = (a) => { try { const v = JSON.parse(localStorage.getItem('hv_og_geri_' + a) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } };
window.hvOgAnlik = (a) => {
  if (!OG_ALAN[a]) return;
  const g = ogGecmis(a); g.push(localStorage.getItem(OG_ALAN[a].ls) || '[]');
  try { localStorage.setItem('hv_og_geri_' + a, JSON.stringify(g.slice(-30))); } catch (e) {}
};
window.hvOgGeriAl = (a) => {
  const g = ogGecmis(a); if (!g.length) return;
  const onceki = g.pop();
  try { localStorage.setItem(OG_ALAN[a].ls, onceki); localStorage.setItem('hv_og_geri_' + a, JSON.stringify(g)); } catch (e) {}
  const p = $('geri-al-pil'); if (p) p.remove();
  titre(8); OG_ALAN[a].yenile();
  if (typeof hvToast === 'function') hvToast('↩ Geri alındı', 'Son işaretleme geri alındı.');
};
window.hvOgSifirla = (a, btn) => {
  if (!ogListe(a).length) return;
  if (!btn.classList.contains('emin')) {   // yanlışlıkla basılmasın: iki dokunuş
    btn.classList.add('emin'); btn.textContent = 'Emin misin? Evet, sıfırla';
    clearTimeout(btn._t); btn._t = setTimeout(() => { btn.classList.remove('emin'); btn.textContent = '🔄 Sıfırla'; }, 4000);
    return;
  }
  hvOgAnlik(a);
  try { localStorage.setItem(OG_ALAN[a].ls, '[]'); } catch (e) {}
  if (a === 'kk') _kk = { i: 0, ac: false, mod: 'hepsi' };
  titre(12); OG_ALAN[a].yenile();
  hvGeriAlPil('🔄 İşaretler sıfırlandı', () => hvOgGeriAl(a));
};
window.hvOgCubuk = (a) => {
  const n = ogListe(a).length, g = ogGecmis(a).length;
  return `<div class="og-cubuk" data-og="${a}">
    <span class="og-sayi">✓ ${n} ${OG_ALAN[a].bir} öğrenildi</span>
    <button class="og-geri" onclick="hvOgGeriAl('${a}')" ${g ? '' : 'disabled'}>↩ Geri al</button>
    <button class="og-sifir" onclick="hvOgSifirla('${a}', this)" ${n ? '' : 'disabled'}>🔄 Sıfırla</button>
  </div>`;
};
window.hvOgCubukGuncelle = (a) => {
  document.querySelectorAll('.og-cubuk[data-og="' + a + '"]').forEach(el => { el.outerHTML = hvOgCubuk(a); });
};
window.hvKkGit = (bildi) => {
  const bil = yukle('kelime_bilinen', []); const liste = _kk.mod === 'kalan' ? KELIMELER.map((k, i) => i).filter(i => bil.indexOf(i) < 0) : KELIMELER.map((k, i) => i);
  const idx = liste[_kk.i];
  if (bildi && bil.indexOf(idx) < 0) {
    hvOgAnlik('kk'); bil.push(idx); kaydet('kelime_bilinen', bil);
    const onceki = _kk.i;
    hvGeriAlPil('“' + KELIMELER[idx][1] + '” öğrenildi', () => { _kk.i = Math.max(0, onceki); _kk.ac = false; hvOgGeriAl('kk'); });
    if (_kk.mod === 'kalan') { _kk.ac = false; return renderKelime(); }
  }
  _kk.i = (_kk.i + 1) % Math.max(1, liste.length); _kk.ac = false; renderKelime();
};
window.hvKkMod = (m) => { _kk.mod = m; _kk.i = 0; _kk.ac = false; renderKelime(); };
window.hvKkSifirla = () => { hvOgAnlik('kk'); kaydet('kelime_bilinen', []); _kk = { i: 0, ac: false, mod: 'hepsi' }; renderKelime(); };
rota('kelime', renderKelime);

/* ═════════════════════════ DUVAR KÂĞITLARI ═════════════════════════ */
const DUVARLAR = [['Mescid-i Haram', 'Mekke'], ['Mescid-i Nebevî', 'Medine'], ['Ayasofya', 'İstanbul'], ['Sultanahmet', 'İstanbul'], ['Şeyh Zayed', 'Abu Dabi'],
  ['Hasan II', 'Kazablanka'], ['Kul Şerif', 'Kazan'], ['Registan', 'Semerkant'], ['Şeyh Zayed · Havuz', 'Abu Dabi'], ['Putra', 'Putrajaya'],
  // v70.2: kullanıcının ilk setinden yalnız keskin 2 tanesi kaldı + yeni yüksek kaliteli 14 arka plan
  ['Revaklı Avlu', 'Fas'], ['Işık Huzmeleri', 'Cami içi'],
  ['Minang Ulu Camii', 'Padang'], ['Çini Eyvan', 'İsfahan'], ['Avize ve Mihrap', 'Maskat'], ['Nasırülmülk', 'Şiraz'], ['Vezir Han', 'Lahor'],
  ['Cuma Mescidi', 'İsfahan'], ['Kırmızı Cami', 'Kolombo'], ['Modern Cami', 'Akşam'], ['Altın Kubbe', 'İsfahan'], ['Ahşap Sütunlar', 'Buhara'],
  ['Taş Cami', 'Sade'], ['Baiturrahman', 'Açe'], ['Şeyh Zayed · İç', 'Abu Dabi'], ['Osmanlı Mihrabı', 'Türkiye']];
/* Yazının yeri: [üst, alt] ekran oranı — gökyüzü / boş duvar olan bantta, cami açıkta kalsın. Listede olmayanlar eskisi gibi altta. */
const DUVAR_UST = { 11: [0.25, 0.54], 12: [0.24, 0.46], 13: [0.25, 0.52], 14: [0.25, 0.56], 15: [0.25, 0.42], 17: [0.25, 0.46], 18: [0.25, 0.50], 19: [0.25, 0.42], 20: [0.25, 0.54], 21: [0.25, 0.38], 23: [0.25, 0.54], 24: [0.25, 0.52], 25: [0.25, 0.44], 26: [0.25, 0.44] };   // üst sınır ≥ %24: kilit ekranı saati
const DUVAR_SURE = [['', 'Sade (yazısız)'], ['s:Fâtiha', 'Fâtiha Sûresi'], ['d:Âyetel Kürsî', 'Âyetel Kürsî'], ['s:İhlâs', 'İhlâs Sûresi']];
let _dvHavuz = null;
function dvHavuz() {
  if (_dvHavuz) return _dvHavuz;
  const L = [], gor = {};
  const ekle = (on, dizi, tur) => { (typeof dizi !== 'undefined' && Array.isArray(dizi) ? dizi : []).forEach(x => { if (!x || !x.arabic || !x.title) return; const k = on + x.title; const t = x.title.replace(/\s*\(.*?\)\s*/g, ' ').trim(); if (gor[t]) return; gor[t] = 1; L.push({ k, ad: x.title, tur, ar: x.arabic, ok: x.okunusu || '', tr: x.turkish || '' }); }); };
  ekle('s:', window.KISA_SURELER || (typeof KISA_SURELER !== 'undefined' ? KISA_SURELER : []), 'Sûre');
  ekle('d:', typeof DUA_LEARN !== 'undefined' ? DUA_LEARN : [], 'Namaz duası');
  ekle('g:', typeof GUNLUK_DUALAR !== 'undefined' ? GUNLUK_DUALAR : [], 'Günlük dua');
  ekle('e:', typeof EZKAR_SABAH !== 'undefined' ? EZKAR_SABAH : [], 'Ezkâr');
  ekle('e:', typeof EZKAR_AKSAM !== 'undefined' ? EZKAR_AKSAM : [], 'Ezkâr');
  _dvHavuz = L; return L;
}
function dvMetin(k) {
  if (!k) return null;
  const h = dvHavuz();
  return h.find(x => x.k === k) || h.find(x => x.ad.indexOf(k.slice(2)) === 0) || null;
}
const dvSade = (s) => String(s || '').toLocaleLowerCase('tr').replace(/[âàá]/g, 'a').replace(/[îí]/g, 'i').replace(/[ûú]/g, 'u').replace(/[^a-zçğıöşü0-9 ]/g, '');
let _dv = { i: 0, s: '', q: '' };
function dvSonuc() {
  const q = dvSade(_dv.q).trim(); if (!q) return '';
  const r = dvHavuz().filter(x => dvSade(x.ad).includes(q)).slice(0, 14);
  return r.length ? r.map(x => `<button class="${x.k === _dv.s ? 'on' : ''}" onclick="hvDvSure('${x.k.replace(/'/g, "\\'")}')"><b>${esc(x.ad)}</b><small>${x.tur}</small></button>`).join('') : '<div class="dv-yok">Bulunamadı. Başka bir kelime dene (ör. “yemek”, “Kevser”, “sabah”).</div>';
}
function renderDuvar() {
  const c = $('duvar-content'); if (!c) return;
  const ozel = _dv.s && !DUVAR_SURE.some(x => x[0] === _dv.s) ? dvMetin(_dv.s) : null;
  c.innerHTML = `
    <div class="dv-izgara">${DUVARLAR.map((d, i) => `<button class="${i === _dv.i ? 'on' : ''}" onclick="hvDvSec(${i})" style="background-image:url(img/dv_k_${String(i + 1).padStart(2, '0')}.jpg)"><span>${esc(d[0])}<small>${esc(d[1])}</small></span></button>`).join('')}</div>
    <div class="yh-grup">Üzerine sûre ya da dua yazılsın mı?</div>
    <div class="yh-cip">${DUVAR_SURE.map(s => `<button class="${s[0] === _dv.s ? 'on' : ''}" onclick="hvDvSure('${s[0]}')">${esc(s[1])}</button>`).join('')}${ozel ? `<button class="on">${esc(ozel.ad)}</button>` : ''}</div>
    <div class="dv-ara"><span>🔍</span><input id="dv-ara" type="search" placeholder="Başka sûre ya da dua ara (${dvHavuz().length} seçenek)" value="${esc(_dv.q)}" oninput="hvDvAra(this.value)" autocomplete="off"></div>
    <div class="dv-sonuc" id="dv-sonuc">${dvSonuc()}</div>
    ${_dv.s ? `<div class="dv-punto"><span>Yazı boyutu</span><button onclick="hvDvPunto(-1)" aria-label="Küçült">A−</button><b>%${Math.round(dvPunto() * 100)}</b><button onclick="hvDvPunto(1)" aria-label="Büyüt">A+</button></div>` : ''}
    <div class="dv-onizle"><canvas id="dv-canvas" width="540" height="960"></canvas></div>
    <button class="an-basla" onclick="hvDvKaydet()">Telefonuma kaydet / paylaş</button>
    <div class="info-note">Kaydettikten sonra telefonunun Ayarlar → Duvar Kâğıdı bölümünden ana ekrana ya da kilit ekranına koyabilirsin.</div>`;
  duvarCiz($('dv-canvas'), 540, 960);
}
function sarMetin(ctx, metin, x, y, gen, sat, ciz) {
  const kel = String(metin || '').split(/\s+/); let s = ''; const satirlar = [];
  kel.forEach(k => { const t = s ? s + ' ' + k : k; if (ctx.measureText(t).width > gen && s) { satirlar.push(s); s = k; } else s = t; });
  if (s) satirlar.push(s);
  if (ciz !== false) satirlar.forEach((l, i) => ctx.fillText(l, x, y + i * sat));
  return satirlar.length * sat;
}
function dvYaz(ctx, s, W, H, f, y0, ciz) {
  /* v67.7: Arapça küçük · okunuş büyük · Türkçe anlam küçük ve en altta */
  let y = y0;
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = ciz ? 12 * f : 0; ctx.shadowOffsetY = ciz ? 1.5 * f : 0;
  ctx.fillStyle = '#f6dca6'; ctx.font = `600 ${16 * f}px Lora, Georgia, serif`; if (ciz) ctx.fillText(s.ad, W / 2, y); y += 36 * f;
  if (s.ar && false) {   // v68.4: kullanıcı isteği — duvar kâğıdında Arapça yok
    ctx.fillStyle = 'rgba(255,255,255,.93)'; ctx.font = `${20 * f}px Amiri, 'Amiri Quran', serif`; ctx.direction = 'rtl';
    y += sarMetin(ctx, s.ar.replace(/۝/g, '۞'), W / 2, y, W * 0.86, 35 * f, ciz) + 12 * f; ctx.direction = 'ltr';
  }
  if (s.ok) { ctx.fillStyle = '#fffaf0'; ctx.font = `600 ${24 * f}px Lora, Georgia, serif`; y += sarMetin(ctx, s.ok, W / 2, y + 6 * f, W * 0.78, 33 * f, ciz) + 14 * f; }
  if (s.tr) { ctx.fillStyle = 'rgba(255,244,222,.9)'; ctx.font = `${13.5 * f}px Lora, Georgia, serif`; y += sarMetin(ctx, s.tr, W / 2, y + 4 * f, W * 0.76, 19 * f, ciz); }
  ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
  return y - y0;
}
const dvPunto = () => { const v = Number(yukle('dv_punto', 1)); return isFinite(v) && v >= 0.7 && v <= 1.5 ? v : 1; };
/* v68.6: duvar kâğıdı telefonun ekranıyla birebir boyutta çizilir (kenarlardan taşma / kırpma olmasın) */
function dvEkran() {
  try {
    const dpr = Math.min(3, Math.max(2, window.devicePixelRatio || 3));
    let w = Math.min(screen.width, screen.height), h = Math.max(screen.width, screen.height);
    if (!w || !h || h / w < 1.6) { w = 393; h = 852; }
    return { W: Math.round(w * dpr), H: Math.round(h * dpr) };
  } catch (e) { return { W: 1179, H: 2556 }; }
}
window.hvDvEkran = dvEkran;
function duvarCiz(cv, W, H) {
  return new Promise((res) => {
    if (!cv) return res(null);
    const ctx = cv.getContext('2d'); const im = new Image();
    im.onload = () => {
      const o = Math.max(W / im.width, H / im.height); const w = im.width * o, h = im.height * o;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
      let s = dvMetin(_dv.s);
      if (s) {
        const f0 = W / 540, fK = f0 * dvPunto();
        const bant = DUVAR_UST[_dv.i + 1];
        let ustMod = !!bant;
        let ust = ustMod ? H * bant[0] : H * 0.40, alt = ustMod ? H * bant[1] : H * 0.855;   // alt: kilit ekranı fener/kamera düğmeleri
        const sigdir = (m) => { let f = fK, y = dvYaz(ctx, m, W, H, f, 0, false); while (y > alt - ust && f > fK * 0.55) { f -= f0 * 0.03; y = dvYaz(ctx, m, W, H, f, 0, false); } return [f, y]; };
        let [f, yuk] = sigdir(s);
        // Sığmıyorsa önce Arapça çıkar (okunuş ve anlam kalır), yine sığmazsa anlam da çıkar
        if (yuk > alt - ust || f < fK * 0.8) { const s2 = Object.assign({}, s, { ar: '' }); const r2 = sigdir(s2); if (r2[1] <= alt - ust) { s = s2; f = r2[0]; yuk = r2[1]; } }
        if (ustMod && (yuk > alt - ust || f < fK * 0.8)) {   // uzun metin üst banda sığmıyor → eski alt yerleşime geç
          ustMod = false; ust = H * 0.40; alt = H * 0.855; s = dvMetin(_dv.s); [f, yuk] = sigdir(s);
          if (yuk > alt - ust || f < fK * 0.8) { const s2 = Object.assign({}, s, { ar: '' }); const r2 = sigdir(s2); if (r2[1] <= alt - ust) { s = s2; f = r2[0]; yuk = r2[1]; } }
        }
        if (yuk > alt - ust && s.tr) { const s3 = Object.assign({}, s, { tr: '' }); const r3 = sigdir(s3); s = s3; f = r3[0]; yuk = r3[1]; }
        let basY;
        if (ustMod) {   // yazı gökyüzünün ortasında; arkasında yalnız yumuşak bir koyuluk bandı, cami açıkta kalır
          basY = ust + Math.max(0, ((alt - ust) - yuk) / 2) + 16 * f;
          const b0 = Math.max(0, basY - 110 * f0), b1 = Math.min(H, basY + yuk + 90 * f0);
          const gb = ctx.createLinearGradient(0, b0, 0, b1); gb.addColorStop(0, 'rgba(10,6,3,0)'); gb.addColorStop(.25, 'rgba(10,6,3,.40)'); gb.addColorStop(.75, 'rgba(10,6,3,.40)'); gb.addColorStop(1, 'rgba(10,6,3,0)');
          ctx.fillStyle = gb; ctx.fillRect(0, b0, W, b1 - b0);
        } else {
          basY = Math.max(ust + 16 * f, alt - yuk + 16 * f);
          // Manzarayı az kapatsın: koyuluk yalnızca yazının arkasında, alttan yukarı
          const gTop = Math.max(0, basY - 90 * f0);
          const gr = ctx.createLinearGradient(0, gTop, 0, H); gr.addColorStop(0, 'rgba(10,6,3,0)'); gr.addColorStop(.35, 'rgba(10,6,3,.42)'); gr.addColorStop(1, 'rgba(10,6,3,.72)');
          ctx.fillStyle = gr; ctx.fillRect(0, gTop, W, H - gTop);
        }
        dvYaz(ctx, s, W, H, f, basY, true);
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 6 * f0; ctx.fillStyle = 'rgba(246,220,166,.85)'; ctx.font = `${12 * f0}px Lora, Georgia, serif`; ctx.textAlign = 'center'; ctx.fillText('Namaz Dostu · Oku • Anla • Hatırla', W / 2, H - 30 * f0); ctx.restore();
      }
      res(cv);
    };
    im.onerror = () => res(cv);
    im.src = `img/duvar_${W >= 900 ? 'hd_' : ''}${String(_dv.i + 1).padStart(2, '0')}.jpg`;   // v68.6: kaydederken yüksek çözünürlük
  });
}
window.hvDvSec = (i) => { _dv.i = i; renderDuvar(); };
window.hvDvSure = (s) => { _dv.s = s; renderDuvar(); };
window.hvDvPunto = (y) => { const v = Math.max(0.7, Math.min(1.5, Math.round((dvPunto() + y * 0.1) * 10) / 10)); kaydet('dv_punto', v); renderDuvar(); };
window.hvDvAra = (q) => { _dv.q = q; const r = $('dv-sonuc'); if (r) r.innerHTML = dvSonuc(); };
window.hvDvKaydet = async () => {
  const cv = document.createElement('canvas'); const E = dvEkran(); cv.width = E.W; cv.height = E.H;
  await duvarCiz(cv, E.W, E.H);
  if (typeof hvOpenShareCard === 'function') hvOpenShareCard({ canvas: cv, duvar: true, fallbackText: 'Namaz Dostu duvar kâğıdı' });
};
rota('duvar', renderDuvar);
window.hvDuvarCiz = duvarCiz;

/* ═════════════════════════ ÇOCUK MODU ═════════════════════════ */
function renderCocuk() {
  const c = $('cocuk-content'); if (!c) return;
  const ad = yukle('cocuk_ad', '');
  const T = [['anlayarak', '🧎', 'Namaz Öğren', '#fde3c8'], ['elifba', '🔤', 'Elifbâ', '#dcefff'], ['ezber', '📖', 'Kısa Sûreler', '#e5f6dd'],
    ['gunluk-dua', '🤲', 'Dualar', '#fbe2ec'], ['taharet', '💧', 'Abdest', '#dff4f6'], ['quiz', '🏆', 'Yarışma', '#fff1c4'], ['kelime', '🔠', 'Kelime Kartları', '#ece4fb'], ['zikirmatik', '📿', 'Zikir Say', '#f6e6d3']];
  c.innerHTML = `<div class="ck-ban" style="background-image:url(img/kart_cocuk.jpg)"></div>
    <div class="ck-merhaba">${ad ? `Merhaba <b>${esc(ad)}</b>! 👋` : `<input id="ck-ad" placeholder="Adın ne?" maxlength="20"> <button onclick="hvCkAd()">Tamam</button>`}</div>
    <div class="ck-izgara">${T.map(t => `<button onclick="navigateTo('${t[0]}')" style="background:${t[3]}"><span>${t[1]}</span><b>${t[2]}</b></button>`).join('')}</div>
    ${ad ? '<button class="yh-diger" onclick="hvCkAd(true)">Adı değiştir</button>' : ''}`;
}
window.hvCkAd = (sil) => { if (sil) kaydet('cocuk_ad', ''); else kaydet('cocuk_ad', (($('ck-ad') || {}).value || '').trim()); renderCocuk(); };
rota('cocuk', renderCocuk);


/* ═════════════════════════ v67.2 · DUA & SÛRE ÖĞREN (yeni liste) ═════════════════════════ */
let _ezSekme = 'namaz';
/* v67.5: tek sayfa — Namazda (sırayla, zaman çizgisi) · Kur'an'dan · Temel kelimeler · Kısa sûreler. Fotoğraf yok. */
const EZ_NAMAZ = [
  ['dua', 'Sübhaneke Duası', 'Tekbirden sonra · 1. rekât'],
  ['sure', 'Fâtiha Sûresi', 'Her rekâtta'],
  ['dua', 'Ettehiyyâtü Duası', 'Her oturuşta'],
  ['dua', 'Salli - Bârik Duaları', 'Son oturuşta'],
  ['dua', 'Rabbenâ Duaları', 'Son oturuşta, selamdan önce'],
  ['dua', 'Kunut Duaları', 'Vitir · 3. rekât'],
  ['dua', 'Kunut Duası (2. Kısım)', 'Vitir · 3. rekât (devamı)'],
  ['dua', 'Namaz Tesbihâtı (Selamdan Sonra)', 'Selamdan sonra'],
  ['dua', 'Namaz Tesbihâtı', 'Selamdan sonra']
];
const EZ_TEMEL = [['dua', 'Kelime-i Tevhîd', 'İmanın özü'], ['dua', 'Kelime-i Şehâdet', 'Şehâdet getirmek']];
function ezArapca(tur, ad) {
  try {
    const kay = tur === 'sure' ? (typeof KISA_SURELER !== 'undefined' ? KISA_SURELER : []) : (typeof DUA_LEARN !== 'undefined' ? DUA_LEARN : []);
    const x = kay.find(k => k.title === ad); if (!x || !x.arabic) return '';
    return x.arabic.replace(/۝/g, ' ').split(/\s+/).filter(Boolean).slice(0, 4).join(' ');
  } catch (e) { return ''; }
}
function ezYeniCiz() {
  const kok = $('ezber-root'); if (!kok || typeof HV_SURE_NO === 'undefined') return;
  try { if (typeof hvEzSesDurdur === 'function') hvEzSesDurdur(); } catch (e) {}
  try { hvEzKayit = null; } catch (e) {}
  const ogr = (tur, ad) => (typeof hvEzOgrenildiMi === 'function') && hvEzOgrenildiMi((tur + '_' + ad).replace(/\s+/g, '_'));
  const dl = (typeof DUA_LEARN !== 'undefined' ? DUA_LEARN : []).map(d => d.title);
  const var_ = (x) => x[0] === 'sure' ? !!HV_SURE_NO[x[1]] : dl.includes(x[1]);
  const namaz = EZ_NAMAZ.filter(var_), temel = EZ_TEMEL.filter(var_);
  const kuran = Object.keys(typeof HV_DUA_AYET !== 'undefined' ? HV_DUA_AYET : {}).map(t => ['kurandua', t, t === 'Âyetel Kürsî' ? 'Bakara 255' : 'Bakara 285-286']);
  const sureler = Object.keys(HV_SURE_NO).filter(t => t !== 'Fâtiha Sûresi').map(t => ['sure', t]);
  const hepsi = namaz.concat(temel, kuran, sureler);
  const toplam = hepsi.length, bilinen = hepsi.filter(x => ogr(x[0], x[1])).length;
  const pct = toplam ? Math.round(bilinen / toplam * 100) : 0;
  const ac = (x) => `hvEzAc('${x[0]}','${x[1].replace(/'/g, "\\'")}')`;
  const kisalt = (ad) => ad.replace(/ Sûresi$/, '').replace(/ Duası \(2\. Kısım\)$/, ' (2. kısım)').replace(/ Duası$/, '').replace(/ Duaları$/, '').replace(/ \((Selamdan Sonra|Bakara 285-286)\)$/, '');
  const satir = (x, i) => { const ok = ogr(x[0], x[1]); return `<button class="ez2-s ${ok ? 'ok' : ''}" data-ara="${esc(sadeles(x[1]))}" onclick="${ac(x)}">
      ${i != null ? `<span class="ez2-no">${ok ? '✓' : i + 1}</span>` : `<span class="ez2-no ez2-yld">${ok ? '✓' : '✦'}</span>`}
      <span class="ez2-m"><b>${esc(kisalt(x[1]))}</b><small>${esc(x[2] || '')}</small></span>
      <span class="ez2-ar">${esc(ezArapca(x[0], x[1]))}</span></button>`; };
  const son = yukle('ez_son', null);
  const sonOk = son && hepsi.some(x => x[0] === son[0] && x[1] === son[1]);
  kok.innerHTML = `
    <div class="ez2-bas">
      <div><h2>Dua &amp; Sûre Öğren</h2><p>Namazda okunanlar, Kur'an'dan dualar ve kısa sûreler</p></div>
      <div class="ez2-halka" style="--p:${pct}"><b>${bilinen}</b><small>/ ${toplam}</small></div>
    </div>
    <div class="ez-hoca-ust">${typeof hvOgrenQariSecim === 'function' ? hvOgrenQariSecim('hvEzHocaDegistir') : ''}</div>
    ${sonOk ? `<button class="ez2-devam" onclick="hvEzAc('${son[0]}','${String(son[1]).replace(/'/g, "\\'")}')"><span><small>Kaldığın yer</small><b>${esc(kisalt(son[1]))}</b></span><i>Devam et ›</i></button>` : ''}
    <label class="ez2-ara"><span>🔍</span><input type="search" placeholder="Dua ya da sûre ara" oninput="hvEz2Ara(this.value)" autocomplete="off"></label>
    <div class="ez2-bolum" data-b="1"><div class="ez2-bb"><h3>Namazda okunanlar</h3><small>Namazdaki sırasıyla</small></div>
      <div class="ez2-yol">${namaz.map((x, i) => satir(x, i)).join('')}</div></div>
    <div class="ez2-bolum" data-b="1"><div class="ez2-bb"><h3>Diğer temel dualar</h3><small>Âyetler ve iman kelimeleri</small></div>
      <div class="ez2-liste">${kuran.map(x => satir(x)).join('')}${temel.map(x => satir(x)).join('')}</div></div>
    <div class="ez2-bolum" data-b="1"><div class="ez2-bb"><h3>Kısa sûreler</h3><small>${sureler.length} sûre · namazda zamm-ı sûre olarak okunur</small></div>
      <div class="ez2-izgara">${sureler.map(x => { const ok = ogr(x[0], x[1]); const s = sureBul(HV_SURE_NO[x[1]]) || {}; return `<button class="ez2-k ${ok ? 'ok' : ''}" data-ara="${esc(sadeles(x[1]))}" onclick="${ac(x)}"><span class="ez2-kar">${esc(s.name_original || '')}</span><b>${esc(kisalt(x[1]).replace(/\s*\(.*\)/, ''))}</b><small>${s.verse_count ? s.verse_count + ' âyet' : ''}${ok ? ' · ✓' : ''}</small></button>`; }).join('')}</div></div>
    <div class="ez-alt-not">✓ ezberlediklerin · dokun, tamamı tek sayfada açılsın</div>
    ${hvOgCubuk('ez')}`;
  try { if (typeof hvEzBasaSar === 'function') hvEzBasaSar(); } catch (e) {}
}
window.hvEz2Ara = (q) => {
  const z = sadeles(q);
  document.querySelectorAll('#ezber-root [data-ara]').forEach(e => { e.style.display = !z || e.dataset.ara.includes(z) ? '' : 'none'; });
  document.querySelectorAll('#ezber-root .ez2-bolum').forEach(b => { b.style.display = [...b.querySelectorAll('[data-ara]')].some(e => e.style.display !== 'none') ? '' : 'none'; });
};
(function () {
  const eski = window.hvEzAc;
  if (typeof eski === 'function') window.hvEzAc = function (tur, ad) { try { kaydet('ez_son', [tur, ad]); } catch (e) {} return eski.apply(this, arguments); };
})();
window.hvEzSekme = (t) => { _ezSekme = t; ezYeniCiz(); };
window.renderEzber = ezYeniCiz;
rota('ezber', ezYeniCiz);

/* ═════════════════════════ v67.2 · KUR'AN OKU sayfasına kısayollar + Önemli Sûreler ═════════════════════════ */
function kuranEkle() {
  return;   // v67.5: kaldığın yer / önemli sûreler Kur'an sekmesine taşındı, liste sade
  const v = $('surah-list-view'); if (!v || v.querySelector('.kq-ek')) return;
  const ara = v.querySelector('.quran-search-bar'); if (!ara) return;
  const d = document.createElement('div'); d.className = 'kq-ek';
  const ON = [[36, 'Yâsîn', 83, 4], [67, 'Mülk', 30, 7], [18, 'Kehf', 110, 3], [55, 'Rahmân', 78, 6], [48, 'Fetih', 29, 9], [56, 'Vâkıa', 96, 1]];
  d.innerHTML = `<div class="yh-izgara n4 kq-t">
      <button class="yh-tile" onclick="hvKuranModu('sayfa')"><span class="yh-ti">📜</span><b>Mushaf</b></button>
      <button class="yh-tile" onclick="navigateTo('dinle')"><span class="yh-ti">🎧</span><b>Dinle</b></button>
      <button class="yh-tile" onclick="navigateTo('ayet-arama')"><span class="yh-ti">🔎</span><b>Meal Arama</b></button>
      <button class="yh-tile" onclick="navigateTo('hatim')"><span class="yh-ti">📗</span><b>Hatim</b></button></div>
    <div class="yh-grup">Önemli Sûreler</div>
    <div class="kq-on">${ON.map(o => `<button onclick="openSurahById(${o[0]})"><span style="background-image:url(img/kucuk_${String(o[3]).padStart(2, '0')}.jpg)"></span><b>${o[1]}</b><small>${o[2]} âyet</small></button>`).join('')}</div>
    <div class="yh-grup">Bütün Sûreler</div>`;
  ara.before(d);
}

/* ═════════════════════════ v67.2 · Sayfa başlıkları: emojisiz, sola yaslı ═════════════════════════ */
const EMOJI_BAS = /^[\s‍️\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]+/u;
function basliklariDuzelt(kok) {
  (kok || document).querySelectorAll('.page-header-title h2').forEach(h => {
    if (h.dataset.yn) return; h.dataset.yn = '1';
    const t = h.textContent.replace(EMOJI_BAS, '').trim(); if (t) h.textContent = t;
  });
}
const _eskiNav = window.navigateTo;
if (typeof _eskiNav === 'function') {
  window.navigateTo = function (id) {
    if (id === 'guide') { id = 'anlayarak'; arguments[0] = id; }   // v67.4: yazılı rehber kaldırıldı
    const r = _eskiNav.apply(this, arguments);
    try {
      const sec = $('page-' + id);
      if (id === 'quran') kuranEkle();
      try { krTemaUygula(); } catch (e) {}
      setTimeout(() => basliklariDuzelt(sec), 0);
      setTimeout(() => basliklariDuzelt(sec), 400);
    } catch (e) {}
    return r;
  };
}
document.addEventListener('DOMContentLoaded', () => { basliklariDuzelt(document); try { kuranEkle(); } catch (e) {} });

/* ═════════════════════════ AYARLAR: Rozetler göster/gizle ═════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const cb = $('rozet-toggle');
  if (cb) { cb.checked = !yukle('rozet_gizle', false); cb.addEventListener('change', () => { kaydet('rozet_gizle', !cb.checked); renderTakipPano(); }); }
});


/* ══════════════════════════════════════════════════════════════
   v67.4 — PREMİUM İÇ SAYFALAR
   • Sûre okuma ekranı (tek renk, kesintisiz akış, âyete dokun → işlemler)
   • Kur'an Dinle: hâfız seçici + sık dinlenenler
   • Hatim Takibi: halka, 30 cüz ızgarası
   • Paylaşım kartları: 22 cami arka planı
   ══════════════════════════════════════════════════════════════ */
const arNum = (n) => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const sureBul = (id) => ((typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : []).find(x => Number(x.id) === Number(id)) || null;
const sadeles = (s) => String(s || '').toLocaleLowerCase('tr').replace(/[âàá]/g, 'a').replace(/[îíì]/g, 'i').replace(/[ûúù]/g, 'u').replace(/['’`\-\s().]/g, '');

/* ─────────────── ELMALILI MEÂLİ ─────────────── */
const YZ = {};
async function elmalili(id) {
  if (YZ[id]) return YZ[id];
  let a = null;
  try { a = await hvIdbGet('yazir_' + id); } catch (e) {}
  if (!a || !a.length) {
    try {
      const r = await fetch(`https://api.alquran.cloud/v1/surah/${id}/tr.yazir`);
      const j = await r.json();
      if (j && j.data && Array.isArray(j.data.ayahs)) {
        a = j.data.ayahs.map(x => x.text);
        try { hvIdbSet('yazir_' + id, a); } catch (e) {}
      }
    } catch (e) { a = null; }
  }
  if (a && a.length) YZ[id] = a;
  return YZ[id] || null;
}
window.hvElmalili = elmalili;

/* ─────────────── v67.5 KUR'AN: OKU + DİNLE TEK EKRAN ───────────────
   Kur'an sekmesi (hub) + sûre ekranı. Ses motoru Kur'an Dinle'ninki:
   'ar' tam sûre (hâfızın kendi kaydı) · 'aa' âyet âyet Arapça · 'tr' Türkçe · 'both' Arapça + Türkçe.
   Tema: krem-espresso ya da koyu yeşil-altın (kr_tema).                */
const OK = { id: 0, v: [], odak: 1, listeden: false, altAcik: false };
const okMod = () => { const m = yukle('okuma_modu', 'birlikte'); return ['birlikte', 'meal', 'arapca', 'bilgi'].includes(m) ? m : 'birlikte'; };
const okKaynak = () => 'diyanet';   // v67.5: yalnız Diyanet meâli (Elmalılı kaldırıldı; Diyanet tefsiri API ile gelecek)
const okOkunus = () => yukle('okunus_goster', true);
/* v68.7: alquran.cloud okunuşundaki akademik işaretleri (ḳ ḥ ẕ ṣ ` …) sadeleştir, cümle başlarını büyüt */
const OKN_HARF = { 'ḳ': 'k', 'Ḳ': 'K', 'ḥ': 'h', 'Ḥ': 'H', 'ẕ': 'z', 'Ẕ': 'Z', 'ṣ': 's', 'Ṣ': 'S', 'ḍ': 'd', 'Ḍ': 'D', 'ṭ': 't', 'Ṭ': 'T', 'ẓ': 'z', 'Ẓ': 'Z', 'ḫ': 'h', 'ġ': 'ğ', 'ṯ': 's', 'ḏ': 'z', '`': '‘' };
const sadeOkunus = (t) => String(t || '').replace(/[ḳḲḥḤẕẔṣṢḍḌṭṬẓẒḫġṯḏ`]/g, (c) => OKN_HARF[c] || c).replace(/(^|[.!?]\s+)([a-zâîûçğıöşü])/g, (m, a, b) => a + (b === 'i' ? 'İ' : b.toLocaleUpperCase('tr')));
window.hvSadeOkunus = sadeOkunus;
function okMeal(n) {
  const v = OK.v[n - 1]; if (!v) return '';
  if (okKaynak() === 'elmalili') { const y = YZ[OK.id]; return y ? (y[n - 1] || '') : ''; }
  return v.translation || '';
}
/* Kur'an bölümünün rengi, uygulamanın "Yeşil tema" ayarına bağlı: kapalı → A krem-espresso, açık → B koyu yeşil-altın */
const krTema = () => ((typeof APP_STATE !== 'undefined' && APP_STATE.greenTheme) ? 'yesil' : 'krem');
function krTemaUygula() {
  const t = krTema();
  ['page-kurandua', 'page-quran', 'page-mushaf', 'page-dinle', 'page-hatim'].forEach(id => { const s = $(id); if (s) { s.classList.add('kr'); s.classList.toggle('kr-yesil', t === 'yesil'); s.classList.toggle('kr-krem', t !== 'yesil'); } });
}
const krFoto = () => `img/vakit_${(document.body && document.body.dataset.foto) || 'ikindi'}.jpg`;
const KR_SERIT = ['05', '01', '02', '06', '07', '03', '08', '10', '04', '09'];
const krSerit = (id) => `img/duvar_${KR_SERIT[Number(id) % 10]}.jpg`;
/* v67.7: her caminin kendi gövdesi görünsün diye dikey konum (resme göre) */
const KR_KONUM = { '01': 47, '02': 47, '03': 44, '04': 47, '05': 39, '06': 44, '07': 41, '08': 47, '09': 53, '10': 36 };
const krKonum = (id) => (KR_KONUM[KR_SERIT[Number(id) % 10]] || 45) + '%';
const KR_CUZ = [[1, 1], [2, 142], [2, 253], [3, 93], [4, 24], [4, 148], [5, 82], [6, 111], [7, 88], [8, 41], [9, 93], [11, 6], [12, 53], [15, 1], [17, 1], [18, 75], [21, 1], [23, 1], [25, 21], [27, 56], [29, 46], [33, 31], [36, 28], [39, 32], [41, 47], [46, 1], [51, 31], [58, 1], [67, 1], [78, 1]];
const KR_ONE = [1, 36, 67, 18, 55, 56, 48, 2];
const I = (d, f) => `<svg viewBox="0 0 24 24" fill="${f ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IK = {
  kitap: I('<path d="M12 6.5C10 5 7 4.6 3.5 5v13c3.5-.4 6.5 0 8.5 1.5 2-1.5 5-1.9 8.5-1.5V5C17 4.6 14 5 12 6.5z"/><path d="M12 6.5V19"/>'),
  katman: I('<path d="M12 3.5l8.5 4.6L12 12.7 3.5 8.1z"/><path d="M3.5 12.2l8.5 4.6 8.5-4.6"/><path d="M3.5 16.1l8.5 4.6 8.5-4.6"/>'),
  mushaf: I('<path d="M5 4.5h10.5a3 3 0 013 3V20H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h10.5"/><path d="M9 8.5h6"/>'),
  sayfa: I('<path d="M3 5.5c2.6-.5 5.3-.2 8 1.2v13c-2.7-1.4-5.4-1.7-8-1.2z"/><path d="M21 5.5c-2.6-.5-5.3-.2-8 1.2v13c2.7-1.4 5.4-1.7 8-1.2z"/><path d="M5.5 9.2c1.3-.1 2.5.1 3.6.6M5.5 12.2c1.3-.1 2.5.1 3.6.6M18.5 9.2c-1.3-.1-2.5.1-3.6.6M18.5 12.2c-1.3-.1-2.5.1-3.6.6"/>'),
  takvim: I('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><path d="M8.6 14.6l2.3 2.3 4.6-4.6"/>'),
  ara: I('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>'),
  geri: I('<path d="M15 5l-7 7 7 7"/>'),
  imi: I('<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>'),
  daha: I('<circle cx="5.5" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18.5" cy="12" r="1.4"/>', true),
  kulak: I('<path d="M4 15v-3a8 8 0 0116 0v3"/><rect x="3" y="14" width="4.2" height="6.5" rx="1.6"/><rect x="16.8" y="14" width="4.2" height="6.5" rx="1.6"/>'),
  play: I('<path d="M8 5.2v13.6L19 12z"/>', true),
  pause: I('<rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/>', true),
  once: I('<path d="M6 5v14"/><path d="M19 5.5v13L9 12z" fill="currentColor"/>'),
  sonra: I('<path d="M18 5v14"/><path d="M5 5.5v13L15 12z" fill="currentColor"/>'),
  tekrar: I('<path d="M4 11V9.5A3.5 3.5 0 017.5 6H19l-3-3"/><path d="M20 13v1.5a3.5 3.5 0 01-3.5 3.5H5l3 3"/>'),
  liste: I('<path d="M4 6h12M4 11h12M4 16h8"/><path d="M17 14v6l4.5-3z" fill="currentColor"/>'),
  bilgi: I('<circle cx="12" cy="12" r="8.6"/><path d="M12 11v6"/><circle cx="12" cy="7.7" r=".6" fill="currentColor"/>'),
  ceviri: I('<path d="M3.5 5.5h9M8 3.5v2M5.5 5.5c.6 3 2.6 5.4 5.2 6.5M10.6 5.5c-.6 3.2-3 6-6.6 7.5"/><path d="M13 20.5l3.6-8.5 3.6 8.5M14.3 17.6h4.6"/>'),
  dalga: I('<path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4"/>'),
  harf: '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="12" y="18.5" text-anchor="middle" font-size="19" font-family="Amiri, serif" fill="currentColor">ع</text></svg>',
  asagi: I('<path d="M6 9l6 6 6-6"/>'),
  yukari: I('<path d="M6 15l6-6 6 6"/>'),
  ok: I('<path d="M9 5l7 7-7 7"/>')
};
const KR_MOD_AD = { ar: 'Arapça Dinle', tr: 'Türkçe Dinle', both: 'Arapça + Türkçe' };

/* ── Ortak alt sayfa ── */
function sheetAc(html) {
  let bg = $('ok-sheet');
  if (!bg) {
    bg = document.createElement('div'); bg.id = 'ok-sheet'; bg.className = 'ok-sheet-bg';
    bg.innerHTML = '<div class="ok-sheet" id="ok-sheet-ic"></div>';
    bg.addEventListener('click', (e) => { if (e.target === bg) window.hvOkKapat(); });
    document.body.appendChild(bg);
  }
  bg.classList.toggle('kr-yesil-sh', krTema() === 'yesil');
  if (html != null) $('ok-sheet-ic').innerHTML = html;
  requestAnimationFrame(() => bg.classList.add('acik'));
}
const shBas = (t) => `<div class="ok-sh-tut"></div><div class="ok-sh-bas"><b>${t}</b><button onclick="hvOkKapat()" aria-label="Kapat">✕</button></div>`;

/* ═════════ KUR'AN SEKMESİ (hub) ═════════ */
function krCaliyorMu() {
  try { return (hvDnMod() === 'ar') ? (!!hvDnCaliyor && hvDnSure) : (!!hvAaCaliyor && hvAaSure); } catch (e) { return 0; }
}
function renderKrHub() {
  const kok = document.querySelector('#page-kurandua .yh-hub'); if (!kok) return;
  krTemaUygula();
  const son = (typeof hvGetLastRead === 'function') ? hvGetLastRead() : null;
  const sonS = son ? sureBul(son.surah) : sureBul(1);
  const sonNo = son ? son.surah : 1;
  kok.classList.add('kr-hub');
  kok.innerHTML = `
    <div class="kr-hero" style="background-image:url(${krFoto()})">
      <div class="kr-hero-ic">
        <div class="kr-logo">${IK.kitap}</div>
        <h2>Kur'an-ı Kerim</h2>
        <p>Oku • Dinle • Anla • Meâl</p>
      </div>
      <label class="kr-ara">${IK.ara}<input id="kr-ara" type="search" placeholder="Sûre, âyet veya konu ara…" autocomplete="off" oninput="hvKrAra(this.value)" onkeydown="if(event.key==='Enter')hvKrAra(this.value,true)"></label>
    </div>
    <div id="kr-ara-sonuc" class="kr-ara-sonuc"></div>
    <div class="kr-dort">
      <button class="on" onclick="hvKrSureler()">${IK.kitap}<b>Sûreler</b><small>114 Sûre</small></button>
      <button onclick="hvKrCuzler()">${IK.katman}<b>Cüzler</b><small>30 Cüz</small></button>
      <button onclick="navigateTo('mushaf')">${IK.mushaf}<b>Mushaf</b><small>Sayfa Sayfa</small></button>
      <button onclick="navigateTo('hatim')">${IK.takvim}<b>Hatim</b><small>Takibi</small></button>
    </div>
    <div class="kr-son" style="background-image:url(${krSerit(sonNo)})">
      <div><small>${son ? 'Son Okunan' : 'Okumaya başla'}</small><b>${esc(sonS ? sonS.name : '')} Sûresi</b><span>${sonNo}. Sûre • ${son && son.ayah > 1 ? son.ayah + '. âyette kaldın' : (sonS ? sonS.verse_count + ' Âyet' : '')}</span>
      <button onclick="${son ? `openSurahAt(${son.surah},${son.ayah || 1})` : 'openSurahById(1)'}">${son ? 'Devam Et' : 'Başla'} ${IK.ok}</button></div>
    </div>
    ${(() => { let k = 0; try { k = Object.keys(hvGetBookmarks()).length; } catch (e) {} return `<button class="kr-imler-git" onclick="hvYerImleri()"><span>⭐</span><b>Yer İmlerim</b><small>${k ? k + ' âyet kayıtlı' : 'Henüz yok'}</small>${IK.ok}</button>`; })()}
    <div id="kr-mini" class="kr-dinle-yer"></div>
    <div class="kr-baslik"><h3>Öne Çıkan Sûreler</h3><button onclick="hvKrOnemli()">Tümü · fazîletleriyle ${IK.ok}</button></div>
    <div class="kr-liste">${KR_ONE.map(no => { const s = sureBul(no) || {}; return `
      <div class="kr-sat" onclick="openSurahById(${no})" style="--img:url(${krSerit(no)})">
        <span class="kr-no">${no}</span>
        <span class="kr-m"><b>${esc(s.name || '')} Sûresi</b><small>${s.verse_count || ''} Âyet • ${esc(s.revelation_place || '')}</small></span>
        <button class="kr-oyna" onclick="event.stopPropagation();hvKrDinle(${no})" aria-label="Dinle">${IK.play}</button>
      </div>`; }).join('')}</div>
    <button class="kr-duvar" onclick="navigateTo('duvar')">
      <span class="kr-duvar-ser">${['16', '13', '19', '22', '18'].map(n => `<i style="background-image:url(img/dv_k_${n}.jpg)"></i>`).join('')}</span>
      <span class="kr-duvar-y"><small>YENİ</small><b>Duvar Kâğıtları</b><em>${DUVARLAR.length} cami · üzerine sûre ya da dua yaz</em></span>${IK.ok}
    </button>
    <div class="kr-baslik"><h3>Daha fazlası</h3></div>
    <div class="kr-diger">
      <button onclick="navigateTo('dinle')"><span>${IK.kulak}</span><b>Kesintisiz Dinle</b><small>10 hâfız · sırayla</small></button>
      <button onclick="navigateTo('ayet-arama')"><span>${IK.ara}</span><b>Meâlde Ara</b><small>Kelimeyle âyet bul</small></button>
      <button onclick="hvKrIndir()"><span>${IK.katman}</span><b>Çevrimdışı Kur'an</b><small>İnternetsiz okumak için indir</small></button>
      <button onclick="navigateTo('kuran-nedir')"><span>${IK.bilgi}</span><b>Kur'an Nedir?</b><small>Neden okumalı</small></button>
    </div>`;
  krMini();
}
rota('kurandua', renderKrHub);
function krDinleNo() { const n = parseInt(hvGet('hv_dinle_sure', '0'), 10); if (n) return n; const s = hvGetLastRead(); return (s && s.surah) || 1; }
function krMini() {
  const cal = krCaliyorMu();
  const hp = $('ya-kuran-p'); if (hp) { const ik = cal ? '⏸︎' : '▶︎'; if (hp.textContent !== ik) hp.textContent = ik; hp.classList.toggle('on', !!cal); }
  const m = $('kr-mini'); if (!m) return;
  const no = cal || krDinleNo();
  const ad = hvDnSureAdi(no) + ' Sûresi', q = hvDnQari().ad;
  const html = `<div class="kr-mini ${cal ? 'calar' : ''}" onclick="${cal ? `openSurahById(${no})` : "navigateTo('dinle')"}">${cal ? '<span class="kr-mini-dalga"><i></i><i></i><i></i></span>' : `<span class="kr-mini-ik">${IK.kulak}</span>`}<span><small>${cal ? 'Şimdi çalıyor' : 'Kesintisiz dinle'}</small><b>${esc(ad)}</b><em>${esc(q)}${cal ? '' : ' · kaldığın yerden'}</em></span><button onclick="event.stopPropagation();hvKrDinleDevam()" aria-label="${cal ? 'Durdur' : 'Dinle'}">${cal ? IK.pause : IK.play}</button></div>`;
  if (m.dataset.h !== html) { m.dataset.h = html; m.innerHTML = html; }
}
window.hvKrDinleDevam = (anaSayfa) => {
  try {
    if (hvDnCaliyor && hvDnMod() === 'ar') { hvDnBasDurdur(); setTimeout(krMini, 60); return; }
    if (hvAaCaliyor) { hvAaDurdur(); setTimeout(krMini, 60); return; }
    hvSet('hv_dinle_mod', 'ar');
    let no, sn = 0;
    if (anaSayfa) { const s = hvGetLastRead(); no = (s && s.surah) || krDinleNo(); }
    else no = krDinleNo();
    if (no === parseInt(hvGet('hv_dinle_sure', '0'), 10)) sn = parseInt(hvGet('hv_dinle_pos', '0'), 10) || 0;
    if (hvDnSure === no && hvDnSes && hvDnSes.src) hvDnBasDurdur(); else hvDnCal(no, sn);
    toast('▶︎ ' + hvDnSureAdi(no) + ' Sûresi', hvDnQari().ad + ' okuyor · uygulamada gezerken de çalar');
  } catch (e) {}
  setTimeout(krMini, 80);
};
window.hvKrSureler = () => { if (typeof hvKuranModu === 'function') hvKuranModu('sure'); else navigateTo('quran'); krTemaUygula(); };
window.hvKrCuzler = () => {
  sheetAc(shBas('Cüzler') + `<div class="kr-cuzler">${KR_CUZ.map((c, i) => { const s = sureBul(c[0]) || {}; return `<button onclick="hvOkKapat();openSurahAt(${c[0]},${c[1]})"><b>${i + 1}</b><span>${esc(s.name || '')}${c[1] > 1 ? ' ' + c[1] : ''}</span></button>`; }).join('')}</div>`);
};
window.hvKrAra = (q, enter) => {
  const r = $('kr-ara-sonuc'); if (!r) return;
  const t = String(q || '').trim();
  if (!t) { r.innerHTML = ''; return; }
  const m = t.match(/^(\d{1,3})\s*[:.\s/]\s*(\d{1,3})$/);
  if (m && enter) { openSurahAt(+m[1], +m[2]); return; }
  const z = sadeles(t);
  const L = ((typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : []).filter(s => sadeles(s.name).includes(z) || String(s.id) === t).slice(0, 6);
  r.innerHTML = (m ? `<button class="kr-as" onclick="openSurahAt(${+m[1]},${+m[2]})"><b>${esc(hvDnSureAdi(+m[1]))} ${+m[2]}. âyet</b><small>Âyete git</small></button>` : '') +
    L.map(s => `<button class="kr-as" onclick="openSurahById(${s.id})"><b>${s.id}. ${esc(s.name)} Sûresi</b><small>${s.verse_count} âyet · ${esc(s.revelation_place)}</small></button>`).join('') +
    (t.length >= 2 ? `<button class="kr-as kr-as-meal" onclick="hvKrMealAra()"><b>“${esc(t)}” meâlde ara</b><small>Bu kelimenin geçtiği âyetler</small></button>` : '');
  if (enter && L.length === 1 && !m) openSurahById(L[0].id);
};
window.hvKrMealAra = () => {
  const q = ($('kr-ara') || {}).value || '';
  navigateTo('ayet-arama');
  setTimeout(() => { const i = $('ayet-search-input'); if (i) { i.value = q; } if (typeof doAyetArama === 'function') doAyetArama(q); }, 80);
};
window.hvKrDinle = (no) => {
  openSurahById(no);
  try { hvAaDurdur(); hvDnDurdurTam(); } catch (e) {}
  setTimeout(() => { try { hvDnCal(no); } catch (e) {} }, 60);
};

/* v67.7: Okurken çıkmadan sayfa sayfa (mushaf) görünüme geç — sûrenin başladığı sayfa açılır */
window.hvKrSayfa = (no) => {
  const id = Number(no || window._krSure || 1);
  try { hvKrOyna(true); } catch (e) {}
  try { hvSet('hv_mushaf_page', typeof hvSureSayfasi === 'function' ? hvSureSayfasi(id) : 1); } catch (e) {}
  navigateTo('mushaf');
};
/* ═════════ SÛRE EKRANI ═════════ */
function krOynaticiHtml() {
  const m0 = hvDnMod(), m = m0 === 'aa' ? 'ar' : m0;
  const q = hvDnQari();
  const hiz = yukle('kr_hiz', 1), tek = yukle('kr_tekrar', false);
  const sid = window._krSure || 0;
  const not = (m === 'both' || m0 === 'aa') && typeof hvAyetKendiSesi === 'function' && !hvAyetKendiSesi(sid, q) ? `<div class="kr-not">ℹ️ ${esc(q.ad)}'in bu sûrede âyet âyet bölünmüş kaydı yok (Fâtiha ve kısa sûrelerde var). Türkçe araya girdiği için bu sûrenin Arapçasını Husarî okur. Kendi sesinden tam sûre için “Arapça Dinle”.</div>` : '';
  return `<div class="kr-oynatici" id="kr-oynatici">
    <div class="kr-om"><span class="kr-kul">${IK.kulak}</span><div class="kr-seg">
      <button class="${m === 'ar' ? 'on' : ''}" onclick="hvKrDinMod('ar')">${IK.kulak}<span>Arapça Dinle</span></button>
      <button class="${m === 'tr' ? 'on' : ''}" onclick="hvKrDinMod('tr')">${IK.ceviri}<span>Türkçe Dinle</span></button>
      <button class="${m === 'both' ? 'on' : ''}" onclick="hvKrDinMod('both')">${IK.dalga}<span>Arapça + Türkçe</span></button></div></div>
    <div class="kr-hoca"><span class="kr-av">${esc(basHarf(q.ad))}</span><button class="kr-hoca-ad" onclick="hvKrHoca()">${esc(q.ad)} ${IK.asagi}</button><button class="kr-hiz" onclick="hvKrHiz()">${Number(hiz) === 1 ? '1.0' : String(Number(hiz))}x</button></div>
    ${not}
    <div class="kr-cubuk" id="kr-cubuk" onclick="hvKrSar(event)"><i id="kr-dolu"></i><b id="kr-nokta"></b></div>
    <div class="kr-zaman"><span id="kr-gecen">00:00</span><span id="kr-toplam">--:--</span></div>
    <div class="kr-kontrol">
      <button class="kr-k ${tek ? 'on' : ''}" onclick="hvKrTekrar(this)" aria-label="Tekrarla">${IK.tekrar}</button>
      <button class="kr-k" onclick="hvKrAtla(-1)" aria-label="Önceki">${IK.once}</button>
      <button class="kr-play" id="kr-play" onclick="hvKrOyna()" aria-label="Oynat">${IK.play}</button>
      <button class="kr-k" onclick="hvKrAtla(1)" aria-label="Sonraki">${IK.sonra}</button>
      <button class="kr-k" onclick="hvKrSureler()" aria-label="Sûre listesi">${IK.liste}</button>
    </div>
  </div>`;
}
function okBaslik(id) {
  const h = $('surah-header-card'); if (!h) return;
  const s = sureBul(id) || {};
  window._krSure = Number(id) || 0;
  const m = okMod();
  h.className = 'surah-detail-header-card ok-kap';
  h.innerHTML = `
    <div class="kr-rhero kr-rhero-s" style="background-image:url(${krSerit(id)});--krk:${krKonum(id)}">
      <button class="kr-yuv kr-sol" onclick="hvKrGeri()" aria-label="Geri">${IK.geri}</button>
      <div class="kr-rbas"><h2>${esc(s.name || '')} Sûresi</h2><p>${id}. Sûre • <button class="kr-ayetgit" onclick="hvAyetSecici(${id})">${s.verse_count || ''} Âyet ▾</button> • ${esc(s.revelation_place || '')}</p></div>
      <button class="kr-yuv kr-sag2" onclick="hvKrImler()" aria-label="Yer imleri">${IK.imi}</button>
      <button class="kr-yuv kr-sag" onclick="hvKrMenu()" aria-label="Seçenekler">${IK.daha}</button>
    </div>
    <div class="kr-sekme">
      <button class="${m === 'birlikte' ? 'on' : ''}" onclick="hvOkMod('birlikte')">${IK.kitap}<span>Âyet</span></button>
      <button class="${m === 'meal' ? 'on' : ''}" onclick="hvOkMod('meal')">${IK.mushaf}<span>Meâl</span></button>
      <button class="${m === 'arapca' ? 'on' : ''}" onclick="hvOkMod('arapca')">${IK.harf}<span>Arapça</span></button>
      <button onclick="hvKrSayfa()">${IK.sayfa}<span>Sayfa</span></button>
      <button class="${m === 'bilgi' ? 'on' : ''}" onclick="hvOkMod('bilgi')">${IK.bilgi}<span>Bilgi</span></button>
    </div>
    ${krOynaticiHtml()}`;
  krSenk(true);
  krGozle();
}
function krGozle() {
  const h = $('surah-header-card'); if (!h || !window.IntersectionObserver) return;
  if (OK.io) return;
  const kap = h.closest('.hero-frame-box');
  OK.io = new IntersectionObserver((es) => { const e = es[es.length - 1]; OK.mpGor = !e.isIntersecting && e.boundingClientRect.top < 0; const mp = $('kr-mp'); if (mp) mp.classList.toggle('gor', OK.mpGor); }, { root: kap, threshold: 0 });
  OK.io.observe(h);
}
function krAltHtml() {
  return '';   // v67.5: Elmalılı kalktı; Diyanet tefsiri gelince bu panel "Meâl | Tefsir" olacak
  const k = okKaynak(), n = OK.odak || 1, v = OK.v[n - 1];
  const metin = v ? (k === 'elmalili' ? (YZ[OK.id] ? YZ[OK.id][n - 1] || '' : '…') : v.translation || '') : '';
  return `<div class="kr-alt ${OK.altAcik ? 'acik' : ''}" id="kr-alt">
    <div class="kr-alt-ust">
      <button class="${k === 'diyanet' ? 'on' : ''}" onclick="hvOkKaynak('diyanet')">${IK.kitap}<span>Diyanet Meâli</span></button>
      <button class="${k === 'elmalili' ? 'on' : ''}" onclick="hvOkKaynak('elmalili')">${IK.kitap}<span>Elmalılı Meâli</span></button>
      <button class="kr-alt-ok" onclick="hvKrAlt()" aria-label="Aç/kapat">${OK.altAcik ? IK.asagi : IK.yukari}</button>
    </div>
    ${OK.altAcik && v ? `<div class="kr-alt-ic">
      <div class="kr-kitap"><span>${k === 'elmalili' ? 'ELMALILI<br>HAMDİ YAZIR' : 'DİYANET<br>MEÂLİ'}</span></div>
      <div class="kr-alt-m"><b>${k === 'elmalili' ? 'Elmalılı Hamdi Yazır Meâli' : 'Diyanet İşleri Meâli'} · ${n}. âyet</b><p>${esc(metin)}</p><button onclick="hvOkAyet(${n})">Devamını Oku ${IK.ok}</button></div>
    </div>` : ''}
  </div>`;
}
function ortakGrup() {
  const g = []; if (okKaynak() !== 'diyanet') return g;
  const N = OK.v.length; let i = 0;
  while (i < N) { const t = String(OK.v[i].translation || '').trim(); let s = i; while (s + 1 < N && t && String(OK.v[s + 1].translation || '').trim() === t) s++; for (let k = i; k <= s; k++) g[k + 1] = { bas: i + 1, son: s + 1 }; i = s + 1; }
  return g;
}
function okCiz() {
  const w = $('ayah-list-wrap'); if (!w || !OK.v.length) return;
  const id = OK.id, m = okMod();
  krTemaUygula();
  document.querySelectorAll('#surah-header-card .kr-sekme button').forEach((b, i) => b.classList.toggle('on', ['birlikte', 'meal', 'arapca', 'bilgi'][i] === m));
  const marks = (typeof hvGetBookmarks === 'function') ? hvGetBookmarks() : {};
  const son = (typeof hvGetLastRead === 'function') ? hvGetLastRead() : null;
  const durum = (n) => (marks[id + ':' + n] ? ' ayah-marked' : '') + (son && son.surah === id && son.ayah === n && n > 1 ? ' ok-son' : '');
  const bekle = okKaynak() === 'elmalili' && !YZ[id];
  const G = ortakGrup();
  const grupMu = (n) => G[n] && G[n].son > G[n].bas;
  const no = (n) => `<span class="kr-mad">${n}</span>`;
  const ayrac = '<div class="kr-ayrac"><i></i><b></b><i></i></div>';
  let govde = '';
  if (m === 'bilgi') {
    const s = sureBul(id) || {};
    const ac = (typeof SURE_ACIKLAMA !== 'undefined' && SURE_ACIKLAMA[id]) ? SURE_ACIKLAMA[id] : '';
    const fz = (typeof hvSureFazileti === 'function') ? hvSureFazileti(id) : '';
    const cuz = KR_CUZ.reduce((a, c, i) => ((c[0] < id || (c[0] === id && c[1] === 1)) ? i + 1 : a), 1);
    govde = `<div class="kr-bilgi">
      <div class="kr-bilgi-ar">${esc(s.name_original || '')}</div>
      <div class="kr-bilgi-iz"><div><small>Sûre</small><b>${id}.</b></div><div><small>Âyet</small><b>${s.verse_count || OK.v.length}</b></div><div><small>İndiği yer</small><b>${esc(s.revelation_place || '')}</b></div><div><small>Cüz</small><b>${cuz}.</b></div>${window.hvNuzulSira && hvNuzulSira(id) ? `<div><small>İniş sırası</small><b>${hvNuzulSira(id)}.</b></div>` : ''}</div>
      ${ac ? `<h4>Sûre hakkında</h4><p>${ac}</p>` : ''}
      ${fz ? `<h4>Fazîleti</h4><div class="kr-fz">${fz}</div>` : ''}
    </div>`;
  } else if (m === 'arapca') {
    govde = `<div class="ok-mushaf">${OK.v.map(v => `<span class="ok-a${durum(v.verse_number)}" id="ayah-${v.verse_number}" onclick="hvOkAyet(${v.verse_number})">${v.verse} <span class="ok-no">${arNum(v.verse_number)}</span></span>`).join(' ')}</div>`;
  } else if (m === 'meal') {
    govde = `<div class="ok-mealakis">${OK.v.filter(v => !grupMu(v.verse_number) || G[v.verse_number].bas === v.verse_number).map(v => { const n = v.verse_number, gr = grupMu(n); return `<p class="ok-mp${durum(n)}" id="ayah-${n}" onclick="hvOkAyet(${n})"><b>${gr ? n + '–' + G[n].son : n}</b>${bekle ? '…' : esc(okMeal(n))}${gr ? `<span class="kr-ortak">${n}–${G[n].son}. âyetler Diyanet meâlinde birlikte çevrilmiştir</span>` : ''}</p>`; }).join('')}</div>`;
  } else {
    const okn = okOkunus();
    govde = OK.v.map((v, i) => (i ? ayrac : '') + `<div class="ok-ayet kr-ayet${durum(v.verse_number)}" id="ayah-${v.verse_number}" onclick="hvOkAyet(${v.verse_number})">
        <div class="kr-ust">${no(v.verse_number)}<div class="ok-ar">${v.verse}</div></div>
        ${okn && v.okunusu ? `<div class="ok-okunus">${esc(sadeOkunus(v.okunusu))}</div>` : ''}
        ${(() => { const n = v.verse_number; if (bekle) return '<div class="ok-meal"><span class="ok-yuk">Elmalılı meâli yükleniyor…</span></div>';
          if (!grupMu(n)) return `<div class="ok-meal">${esc(okMeal(n))}</div>`;
          const g = G[n]; if (n < g.son) return `<div class="ok-meal kr-ortak-bos">Meâli ${g.son}. âyetin altında · ${g.bas}–${g.son}. âyetler birlikte çevrilmiş</div>`;
          return `<div class="ok-meal"><span class="kr-ortak">${g.bas}–${g.son}. âyetlerin ortak meâli</span>${esc(okMeal(n))}</div>`; })()}
      </div>`).join('');
  }
  // v70: sûre listesi "İniş sırası"ndaysa önceki/sonraki sûre de iniş sırasına göre
  const oncekiId = (typeof window.hvSureKomsu === 'function') ? window.hvSureKomsu(id, -1) : (id > 1 ? id - 1 : 0);
  const sonrakiId = (typeof window.hvSureKomsu === 'function') ? window.hvSureKomsu(id, 1) : (id < 114 ? id + 1 : 0);
  const onceki = oncekiId ? sureBul(oncekiId) : null, sonraki = sonrakiId ? sureBul(sonrakiId) : null;
  const sAd = (sureBul(id) || {}).name || '';
  w.innerHTML = `<div class="kr-mp ${OK.mpGor ? 'gor' : ''}" id="kr-mp"><button class="kr-mp-p" id="kr-mp-play" onclick="hvKrOyna()" aria-label="Oynat">${IK.play}</button><div class="kr-mp-m"><b>${esc(sAd)} Sûresi</b><small id="kr-mp-alt">${esc(hvDnQari().ad)}</small><span class="kr-mp-c"><i id="kr-mp-dolu"></i></span></div><button class="kr-mp-y" onclick="hvOkYukari()" aria-label="Yukarı">${IK.yukari}</button></div>` +
    (m !== 'bilgi' && id !== 1 && id !== 9 ? `<div class="ok-besmele">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>` : '') +
    `<div class="ok-sayfa kr-kagit ok-m-${m}"><i class="kr-kose k1"></i><i class="kr-kose k2"></i>${govde}</div>
    ${m !== 'bilgi' ? '<div class="ok-ipucu">Bir âyete dokun: yer imi, kaldığın yer, paylaş, buradan dinle</div>' : ''}
    <div class="ok-son-nav">
      ${onceki ? `<button onclick="retryLoadSurah(${oncekiId});hvOkYukari()"><span>‹ ${esc(onceki.name)}</span><small>${onceki.verse_count || ''} âyet</small></button>` : '<span></span>'}
      ${sonraki ? `<button class="ileri" onclick="retryLoadSurah(${sonrakiId});hvOkYukari()"><span>Sıradaki: ${esc(sonraki.name)} ›</span><small>${sonraki.verse_count || ''} âyet</small></button>` : '<span></span>'}
    </div>
    <div class="ok-git-sat">
      <button onclick="hvAyetSecici(${id})">${IK.sayfa}<span>Bu sûrede âyete git</span></button>
      ${sonraki ? `<button onclick="hvAyetSecici(${sonrakiId})">${IK.sayfa}<span>${esc(sonraki.name)}: âyet seç</span></button>` : ''}
    </div>` + (m !== 'bilgi' ? krAltHtml() : '');
  krSenk(true);
}
const _eskiLSD = window.loadSurahDetail;
if (typeof _eskiLSD === 'function') {
  window.loadSurahDetail = function (id, s) {
    try { const lv = $('surah-list-view'); OK.listeden = !!(lv && lv.style.display !== 'none' && APP_STATE.currentPage === 'quran'); } catch (e) {}
    const r = _eskiLSD.apply(this, arguments);
    try {
      OK.id = Number(id); OK.v = []; OK.odak = 1; OK.altAcik = false;
      krTemaUygula(); okBaslik(OK.id);
      const w = $('ayah-list-wrap'); if (w) w.innerHTML = '<div class="ok-sayfa kr-kagit kr-yuk">Âyetler yükleniyor…</div>';
      const a = $('surah-audio-player'); if (a) { a.pause(); a.removeAttribute('src'); }
    } catch (e) {}
    return r;
  };
}
const _eskiRSV = window.renderSurahVerses;
if (typeof _eskiRSV === 'function') {
  window.renderSurahVerses = function (id, verses, wrap) {
    if (!wrap || !verses || !verses.length) return _eskiRSV.apply(this, arguments);
    OK.id = Number(id); OK.v = verses;
    if (!$('kr-oynatici')) okBaslik(OK.id);
    okCiz();
    if (okKaynak() === 'elmalili' && !YZ[OK.id]) elmalili(OK.id).then((a) => { if (OK.id === Number(id)) { if (!a) { toast('Elmalılı meâli alınamadı', 'İnternete bağlanınca tekrar dene. Şimdilik Diyanet meâli gösteriliyor.'); kaydet('meal_kaynak', 'diyanet'); } okCiz(); } });
  };
}
window.hvOkMod = (m) => { kaydet('okuma_modu', m); okCiz(); };
window.hvOkOkunus = () => { kaydet('okunus_goster', !okOkunus()); okCiz(); };
window.hvOkKaynak = (k) => { kaydet('meal_kaynak', k); okCiz(); if (k === 'elmalili' && !YZ[OK.id]) elmalili(OK.id).then((a) => { if (!a) { kaydet('meal_kaynak', 'diyanet'); toast('Elmalılı meâli alınamadı', 'İnternete bağlanınca tekrar dene.'); } okCiz(); }); };
/* v68.6.3: Âyet seçici — sûrenin âyet numaraları ızgarası; dokununca o âyete gider */
window.hvAyetSecici = (sid) => {   // v68.9.2: adı değişti; eskisi features.js'teki günün âyeti seçicisini (hvAyetSec) eziyordu
  sid = Number(sid); const s = sureBul(sid) || {}; const N = Number(s.verse_count) || (sid === OK.id ? OK.v.length : 0);
  if (!N) return;
  const son = (typeof hvGetLastRead === 'function') ? hvGetLastRead() : null;
  const kal = son && Number(son.surah) === sid ? Number(son.ayah) : 0;
  let h = '';
  for (let i = 1; i <= N; i++) h += `<button class="${i === kal ? 'kal' : ''}" onclick="hvAyetSecGit(${sid},${i})">${i}</button>`;
  sheetAc(shBas(esc(s.name || '') + ' Sûresi · ' + N + ' âyet') + `<div class="kr-ayetsec-ust">Gitmek istediğin âyete dokun${kal ? ' · <i></i> kaldığın yer' : ''}</div><div class="kr-ayetsec">${h}</div>`);
};
window.hvAyetSecGit = (sid, n) => {
  window.hvOkKapat();
  if (Number(sid) === OK.id && $('ayah-' + n)) { OK.odak = n; const el = $('ayah-' + n); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); el.classList.add('ayah-flash'); setTimeout(() => el.classList.remove('ayah-flash'), 2200); }
  else openSurahAt(sid, n);
};
window.hvOkYukari = () => { try { const v = $('surah-detail-view'); (v && v.scrollIntoView) ? v.scrollIntoView({ block: 'start' }) : window.scrollTo(0, 0); } catch (e) {} };
window.hvKrAlt = () => { OK.altAcik = !OK.altAcik; const a = $('kr-alt'); if (a) a.outerHTML = krAltHtml(); };
window.hvKrGeri = () => {
  // v70: yer imlerinden açıldıysa geri → Yer İmlerim
  if (window._hvImden && window._hvImden === OK.id) { window._hvImden = 0; OK.listeden = false; navigateTo('yerimleri'); return; }
  window._hvImden = 0;
  if (OK.listeden) { const b = $('back-to-surahs'); if (b) { b.click(); krTemaUygula(); return; } }
  navigateTo('kurandua');
};

/* ── Ses ── */
window.hvKrDinMod = (m) => {
  try { hvAaDurdur(); hvDnDurdurTam(); } catch (e) {}
  hvSet('hv_dinle_mod', m);
  if (m !== 'ar' && typeof hvTtsTurkceVarMi === 'function' && !hvTtsTurkceVarMi()) toast('Türkçe ses bulunamadı', 'Telefonunda Türkçe konuşma sesi yok; meâl ekranda gösterilir.');
  const o = $('kr-oynatici'); if (o) o.outerHTML = krOynaticiHtml();
  krSenk(true);
};
window.hvKrOyna = (sadeceDurdur) => {
  const m = hvDnMod();
  try {
    if (m === 'ar') {
      if (hvDnCaliyor) { hvDnBasDurdur(); return; }
      if (sadeceDurdur) return;
      if (hvDnSure === OK.id && hvDnSes && hvDnSes.src) hvDnBasDurdur();
      else { hvAaDurdur(); hvDnCal(OK.id); }
    } else {
      if (hvAaCaliyor) { hvAaDurdur(); return; }
      if (sadeceDurdur) return;
      hvDnDurdurTam();
      if (hvAaSure === OK.id && hvAaListe.length) hvAaBasDurdur(); else hvAaCal(OK.id, Math.max(0, (OK.odak || 1) - 1));
    }
  } catch (e) {}
  setTimeout(() => krSenk(true), 80);
};
window.hvKrAtla = (y) => {
  const m = hvDnMod();
  if (m !== 'ar' && hvAaSure === OK.id && hvAaListe.length) { hvAaAtlaAyet(y); return; }
  const h = (typeof window.hvSureKomsu === 'function') ? window.hvSureKomsu(OK.id, y) : OK.id + y; if (h < 1 || h > 114) return;
  const cal = !!krCaliyorMu();
  retryLoadSurah(h); window.hvOkYukari();
  if (cal) setTimeout(() => { try { if (m === 'ar') hvDnCal(h); else hvAaCal(h, 0); } catch (e) {} }, 60);
};
window.hvKrSar = (e) => {
  const c = $('kr-cubuk'); if (!c) return;
  const oran = Math.min(1, Math.max(0, (e.clientX - c.getBoundingClientRect().left) / c.offsetWidth));
  if (hvDnMod() === 'ar') { if (hvDnSure === OK.id && hvDnSes && hvDnSes.duration) hvDnSes.currentTime = hvDnSes.duration * oran; }
  else if (OK.v.length) { const i = Math.min(OK.v.length - 1, Math.floor(oran * OK.v.length)); hvDnDurdurTam(); hvAaCal(OK.id, i); }
};
window.hvKrHiz = () => {
  const L = [1, 1.25, 1.5, 0.75], h = yukle('kr_hiz', 1);
  kaydet('kr_hiz', L[(L.indexOf(h) + 1) % L.length] || 1);
  const o = $('kr-oynatici'); if (o) o.outerHTML = krOynaticiHtml(); krSenk(true);
};
window.hvKrTekrar = (b) => { const t = !yukle('kr_tekrar', false); kaydet('kr_tekrar', t); if (b) b.classList.toggle('on', t); toast(t ? 'Tekrar açık' : 'Tekrar kapalı', t ? 'Sûre bitince baştan okunur.' : 'Sûre bitince sıradakine geçer.'); };
window.hvKrHoca = () => {
  const a = hvDnQari().id;
  sheetAc(shBas('Hâfız seç') + `<div class="kr-hocalar">${HV_DINLE_QARILER.map((q, i) => `<button class="${q.id === a ? 'on' : ''}" onclick="hvKrHocaSec('${q.id}')"><span class="kr-av">${esc(basHarf(q.ad))}</span><span><b>${esc(q.ad)}</b><small>${i === 0 ? 'Önerilen · ' : ''}${hvDnAyetKaydiVar(q.id) ? 'Tam sûre + âyet âyet' : 'Tam sûre'}</small></span>${q.id === a ? '<i>✓</i>' : ''}</button>`).join('')}</div>`);
};
window.hvKrHocaSec = (id) => {
  if (typeof hvDnQariDegistir === 'function') hvDnQariDegistir(id);
  try { const s = $('qari-select'); if (s) s.value = id; } catch (e) {}
  window.hvOkKapat();
  const o = $('kr-oynatici'); if (o) o.outerHTML = krOynaticiHtml(); krSenk(true);
};
window.hvKrImler = () => {
  const M = Object.values((typeof hvGetBookmarks === 'function') ? hvGetBookmarks() : {}).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  sheetAc(shBas('Yer imlerim') + (M.length ? `<div class="kr-imler">${M.map(x => `<button onclick="hvOkKapat();openSurahAt(${x.surah},${x.ayah})"><span class="kr-mad">${x.ayah}</span><span><b>${esc(x.name || hvSurahName(x.surah))} Sûresi</b><small>${x.ayah}. âyet</small></span>${IK.ok}</button>`).join('')}</div>`
    : '<div class="kr-bos">Henüz yer imin yok. Bir âyete dokunup <b>☆ Yer imi</b> seçebilirsin.</div>'));
};
window.hvKrMenu = () => {
  const t = krTema(), fs = (typeof APP_STATE !== 'undefined' && APP_STATE.fontSize) || 20;
  sheetAc(shBas('Okuma ayarları') + `
    <div class="kr-ayar"><span>Yazı boyutu</span><div class="kr-fs"><button onclick="adjustQuranFontSize(-2);hvKrMenu()">A−</button><b>${fs}</b><button onclick="adjustQuranFontSize(2);hvKrMenu()">A+</button></div></div>
    <div class="kr-ayar"><span>Okunuşu göster</span><button class="kr-anah ${okOkunus() ? 'on' : ''}" onclick="hvOkOkunus();hvKrMenu()"><i></i></button></div>
    <div class="kr-ayar"><span>Sayfa / cüz ayraçları <small class="kr-ayar-not">Mushaf'ta yeni sayfa nerede başlıyor</small></span><button class="kr-anah ${yukle('ok_ayrac', true) ? 'on' : ''}" onclick="hvOkAyar('ayrac')"><i></i></button></div>
    <div class="kr-ayar"><span>İlerleme ve kalan süre <small class="kr-ayar-not">Üst çubukta: %40 · ~12 dk</small></span><button class="kr-anah ${yukle('ok_ilerle', true) ? 'on' : ''}" onclick="hvOkAyar('ilerle')"><i></i></button></div>
    <div class="kr-ayar"><span>Durmadan oku <small class="kr-ayar-not">Âyet âyet dinlerken arada boşluk olmasın</small></span><button class="kr-anah ${hvGet('hv_durmadan', '1') === '1' ? 'on' : ''}" onclick="hvDurmadanAyarla(hvGet('hv_durmadan', '1') !== '1');hvKrMenu()"><i></i></button></div>
    <div class="kr-ayar"><span>Okurken ekran kararmasın</span><button class="kr-anah ${yukle('ok_uyanik', true) ? 'on' : ''}" onclick="hvOkAyar('uyanik')"><i></i></button></div>
    <div class="kr-ayar"><span>Okudukça hatim ilerlesin <small class="kr-ayar-not">Hatim Takibi'nde “Meâlden Hatim”</small></span><button class="kr-anah ${yukle('ok_mhatim', true) ? 'on' : ''}" onclick="hvOkAyar('mhatim')"><i></i></button></div>
    <div class="kr-ayar kr-ayar-d"><span>Görünüm <small class="kr-ayar-not">Ayarlar'daki “Yeşil tema” ile aynı</small></span><div class="kr-temalar">
      <button class="${t === 'krem' ? 'on' : ''}" onclick="hvKrTema('krem')"><i class="kr-tm-krem"></i>Krem · Espresso</button>
      <button class="${t === 'yesil' ? 'on' : ''}" onclick="hvKrTema('yesil')"><i class="kr-tm-yesil"></i>Koyu Yeşil · Altın</button></div></div>
    <button class="kr-ayar-git" onclick="hvOkKapat();navigateTo('mushaf')">${IK.mushaf}<span>Sayfa sayfa (mushaf) aç</span>${IK.ok}</button>`);
};
window.hvKrTema = (t) => {
  try { APP_STATE.greenTheme = t === 'yesil'; applyStateSettings(); saveSettings(); } catch (e) {}
  krTemaUygula(); const bg = $('ok-sheet'); if (bg && bg.classList.contains('acik')) window.hvKrMenu(); try { hvTemaRengi(); } catch (e) {} };

/* ── Ekranı sesle eşitle ── */
let _krSonOkunan = 0;
const krSaat = (t) => { t = Math.max(0, Math.floor(t || 0)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
function krSenk(zorla) {
  try {
    krMini();
    const p = $('kr-play'); if (!p) return;
    if (!zorla && (typeof APP_STATE === 'undefined' || APP_STATE.currentPage !== 'quran')) return;
    const m = hvDnMod(), ar = m === 'ar';
    const cal = ar ? (hvDnCaliyor && hvDnSure === OK.id) : (hvAaCaliyor && hvAaSure === OK.id);
    const ik = cal ? 'pause' : 'play';
    if (p.dataset.ik !== ik) { p.dataset.ik = ik; p.innerHTML = IK[ik]; p.classList.toggle('on', cal); }
    const hiz = Number(yukle('kr_hiz', 1)) || 1, tek = !!yukle('kr_tekrar', false);
    try { if (hvDnSes) { if (hvDnSes.playbackRate !== hiz) hvDnSes.playbackRate = hiz; hvDnSes.loop = tek; } if (hvAaSes && hvAaSes.playbackRate !== hiz) hvAaSes.playbackRate = hiz; } catch (e) {}
    let oran = 0, g = '00:00', tp = '--:--', aktif = 0;
    if (ar) {
      if (hvDnSure === OK.id && hvDnSes) { oran = hvDnSes.duration ? hvDnSes.currentTime / hvDnSes.duration : 0; g = krSaat(hvDnSes.currentTime); tp = hvDnSes.duration ? krSaat(hvDnSes.duration) : '--:--'; }
    } else {
      const n = OK.v.length || 1;
      if (hvAaSure === OK.id && hvAaListe.length) { aktif = hvAaIdx + 1; oran = (hvAaIdx + (cal ? 0.5 : 0)) / n; g = aktif + '. âyet'; }
      else g = '1. âyet';
      tp = n + ' âyet';
    }
    const mpp = $('kr-mp-play'); if (mpp && mpp.dataset.ik !== ik) { mpp.dataset.ik = ik; mpp.innerHTML = IK[ik]; }
    const oi = (!cal && window._okIlerle && window._okIlerle.id === OK.id) ? window._okIlerle : null;   // v68.7: dinlemiyorken okuma ilerlemesi
    const mpd = $('kr-mp-dolu'); if (mpd) { mpd.style.width = ((oi ? oi.oran : oran) * 100).toFixed(2) + '%'; mpd.classList.toggle('okuma', !!oi); }
    const mpa = $('kr-mp-alt'); if (mpa) { const t = oi ? oi.yazi : hvDnQari().ad + (cal ? ' · ' + g : ''); if (mpa.textContent !== t) mpa.textContent = t; }
    const d = $('kr-dolu'), nk = $('kr-nokta');
    if (d) d.style.width = (oran * 100).toFixed(2) + '%';
    if (nk) nk.style.left = (oran * 100).toFixed(2) + '%';
    const a = $('kr-gecen'), b = $('kr-toplam'); if (a) a.textContent = g; if (b) b.textContent = tp;
    if (aktif !== _krSonOkunan) {
      document.querySelectorAll('#ayah-list-wrap .kr-okunan').forEach(e => e.classList.remove('kr-okunan'));
      const e = aktif ? $('ayah-' + aktif) : null;
      if (e) { e.classList.add('kr-okunan'); if (cal) try { e.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (x) {} }
      if (aktif) OK.odak = aktif;
      _krSonOkunan = aktif;
    }
  } catch (e) {}
}
setInterval(krSenk, 500);
const _eskiTR = window.hvTemaRengi;
window.hvTemaRengi = function () {
  try {
    const sayfa = APP_STATE.currentPage;
    const hero = sayfa === 'kurandua' || (sayfa === 'quran' && $('surah-detail-view') && $('surah-detail-view').style.display !== 'none');
    if (hero) { const m = document.querySelector('meta[name="theme-color"]'); const r = (typeof HV_UST_RENK !== 'undefined' && HV_UST_RENK[document.body.dataset.foto]) || '#3a2a1a'; if (m) { m.content = r; return; } }
    if (sayfa === 'quran' && krTema() === 'yesil') { const m = document.querySelector('meta[name="theme-color"]'); if (m) { m.content = '#0f2620'; return; } }
  } catch (e) {}
  return _eskiTR ? _eskiTR.apply(this, arguments) : undefined;
};
document.addEventListener('DOMContentLoaded', () => {
  try { krTemaUygula(); renderKrHub(); } catch (e) {}
  const tt = $('theme-toggle'); if (tt) tt.addEventListener('change', () => setTimeout(() => { krTemaUygula(); renderKrHub(); }, 0));
});

/* Âyet işlemleri (alt sayfa) */
let _okSh = { n: 0, k: '' };
function okShCiz() {
  const n = _okSh.n, id = OK.id, v = OK.v[n - 1]; if (!v) return;
  const box = $('ok-sheet-ic'); if (!box) return;
  const marks = hvGetBookmarks(), on = !!marks[id + ':' + n];
  const son = hvGetLastRead(), sonMu = son && son.surah === id && son.ayah === n;
  const k = _okSh.k || okKaynak();
  const yz = YZ[id];
  const s = sureBul(id) || {};
  box.innerHTML = `
    <div class="ok-sh-tut"></div>
    <div class="ok-sh-bas"><b>${esc(s.name || '')} Sûresi · ${n}. âyet</b><button onclick="hvOkKapat()" aria-label="Kapat">✕</button></div>
    <div class="ok-sh-ar">${v.verse}</div>
    ${v.okunusu ? `<div class="ok-sh-ok">${esc(sadeOkunus(v.okunusu))}</div>` : ''}
    <div class="ok-sh-et">Diyanet İşleri Başkanlığı Meâli</div>
    <div class="ok-sh-meal">${esc(v.translation || '')}</div>
    <div class="ok-sh-btn kr5">
      <button onclick="hvOkIs('dinle')"><span>▶︎</span>Buradan dinle</button>
      <button class="${on ? 'on' : ''}" onclick="hvOkIs('imi')"><span>${on ? '★' : '☆'}</span>${on ? 'Kaydedildi' : 'Yer imi'}</button>
      <button class="${sonMu ? 'on' : ''}" onclick="hvOkIs('son')"><span>📍</span>${sonMu ? 'Kaldığın yer' : 'Buraya kadar'}</button>
      <button onclick="hvOkIs('pay')"><span>↗</span>Paylaş</button>
      <button onclick="hvOkIs('kop')"><span>⧉</span>Kopyala</button>
    </div>`;
  if (k === 'elmalili' && !yz) elmalili(id).then((a) => { if (_okSh.n === n) { if (!a) { _okSh.k = 'diyanet'; toast('Elmalılı meâli alınamadı', 'İnternete bağlanınca tekrar dene.'); } okShCiz(); } });
}
window.hvOkAyet = (n) => {
  _okSh = { n, k: '' }; OK.odak = n;
  sheetAc(null);
  okShCiz();
  const a = $('kr-alt'); if (a && OK.altAcik) a.outerHTML = krAltHtml();
  titre(8);
};
window.hvOkKapat = () => { const bg = $('ok-sheet'); if (bg) { bg.classList.remove('acik'); setTimeout(() => { if (!bg.classList.contains('acik')) bg.remove(); }, 260); } };
window.hvOkShK = (k) => { _okSh.k = k; okShCiz(); };
window.hvOkIs = (is) => {
  const id = OK.id, n = _okSh.n, v = OK.v[n - 1]; if (!v) return;
  if (is === 'dinle') {
    window.hvOkKapat();
    try { if (hvDnMod() === 'ar') hvSet('hv_dinle_mod', 'aa'); hvDnDurdurTam(); hvAaCal(id, n - 1); } catch (e) {}
    const o = $('kr-oynatici'); if (o) o.outerHTML = krOynaticiHtml(); setTimeout(() => krSenk(true), 100);
  }
  else if (is === 'imi') { hvToggleBookmark(id, n, null); okShCiz(); okCiz(); }
  else if (is === 'son') { hvMarkLastRead(id, n, null); okShCiz(); okCiz(); }
  else if (is === 'pay') { window.hvOkKapat(); window.hvShareAyah(id, n); }
  else if (is === 'kop') {
    const k = _okSh.k || okKaynak();
    const meal = k === 'elmalili' && YZ[id] ? YZ[id][n - 1] : v.translation;
    const metin = `${v.verse}\n\n${meal}\n— ${hvSurahName(id)} Sûresi, ${n}. âyet${k === 'elmalili' ? ' (Elmalılı)' : ''}`;
    const bitti = () => toast('⧉ Kopyalandı', `${hvSurahName(id)} ${n}. âyet`);
    try { navigator.clipboard.writeText(metin).then(bitti, bitti); } catch (e) { bitti(); }
  }
};
const _eskiShareAyah = window.hvShareAyah;
window.hvShareAyah = function (surah, ayah) {
  if (Number(surah) === OK.id && OK.v[ayah - 1]) {
    const v = OK.v[ayah - 1];
    const k = okKaynak();
    const tr = (k === 'elmalili' && YZ[OK.id]) ? YZ[OK.id][ayah - 1] : v.translation;
    return hvOpenShareCard({ badge: '📖 Ayet-i Kerime', arabic: v.verse, text: tr, source: `${hvSurahName(surah)} Sûresi, ${ayah}. âyet`, fallbackText: `${hvSurahName(surah)} Sûresi, ${ayah}. âyet\n\n"${tr}"` });
  }
  return _eskiShareAyah ? _eskiShareAyah.apply(this, arguments) : null;
};

/* ─────────────── KUR'AN DİNLE ─────────────── */
const DN_SIK = [[36, 'Yâsîn'], [67, 'Mülk'], [18, 'Kehf'], [55, 'Rahmân'], [56, 'Vâkıa'], [48, 'Fetih'], [1, 'Fâtiha'], [2, 'Bakara']];
const basHarf = (ad) => ad.replace(/^(Muhammed|Mahmud Halil|Abdullah|Abdurrahman|Saad|Mishary Rashid|Yâsir|Mâhir|Muhammed Sıddık)\s+/, '').replace(/^(el-|es-|ed-)/, '').slice(0, 1).toLocaleUpperCase('tr');
function dinleSus() {
  const kok = $('dinle-root'); if (!kok || typeof HV_DINLE_QARILER === 'undefined') return;
  const aktif = hvDnQari().id;
  const pl = kok.querySelector('.dn-player');
  if (pl && !kok.querySelector('.dn-hafiz')) {
    const h = document.createElement('div');
    h.innerHTML = `<div class="yh-grup dn-baslik">Hâfız seç</div><div class="dn-hafiz">${HV_DINLE_QARILER.map((q, i) => {
      const p = q.ad.split(' '); const son = p.pop(); const ilk = p.join(' ');
      return `<button data-q="${q.id}" class="${q.id === aktif ? 'on' : ''}" onclick="hvDnHafiz('${q.id}')"><span class="dn-av">${esc(basHarf(q.ad))}</span><b>${esc(son)}</b><small>${esc(ilk)}</small>${i === 0 ? '<em>Önerilen</em>' : ''}</button>`;
    }).join('')}</div>`;
    pl.after(...h.children);
  }
  const ara = kok.querySelector('.quran-search-bar');
  if (ara && !kok.querySelector('.dn-sik')) {
    const s = document.createElement('div');
    s.innerHTML = `<div class="yh-grup dn-baslik">Sık dinlenenler</div><div class="dn-sik">${DN_SIK.map((x, i) => `<button onclick="hvDnSik(${x[0]})" style="--dv:url(img/dv_k_${['07', '02', '03', '05', '09', '06', '01', '10'][i] || '04'}.jpg)"><b>${x[1]}</b><small>${(sureBul(x[0]) || {}).verse_count || ''} âyet</small></button>`).join('')}</div><div class="yh-grup dn-baslik">Tüm sûreler</div>`;
    ara.before(...s.children);
  }
  kok.querySelectorAll('.dn-sure').forEach(b => {
    if (b.dataset.ok) return; b.dataset.ok = '1';
    const s = sureBul(b.dataset.no); if (!s) return;
    const a = b.querySelector('.dn-ayet'); if (a) a.textContent = `${s.revelation_place} · ${s.verse_count} âyet`;
    const ar = document.createElement('span'); ar.className = 'dn-ar'; ar.textContent = s.name_original || ''; b.appendChild(ar);
  });
}
const _eskiDinle = window.renderDinle;
if (typeof _eskiDinle === 'function') {
  window.renderDinle = function () { const r = _eskiDinle.apply(this, arguments); try { dinleSus(); } catch (e) {} return r; };
  rota('dinle', () => { try { hvSet('hv_dinle_mod', 'ar'); } catch (e) {} window.renderDinle(); });
}
window.hvDnHafiz = (id) => {
  if (typeof hvDnQariDegistir === 'function') hvDnQariDegistir(id);
  document.querySelectorAll('.dn-hafiz button').forEach(b => b.classList.toggle('on', b.dataset.q === id));
  const sel = document.querySelector('#dinle-root .mv-qari'); if (sel) sel.value = id;
  titre(8);
};
window.hvDnSik = (no) => { const b = document.querySelector(`#dinle-root .dn-sure[data-no="${no}"]`); if (b) { b.click(); try { $('dinle-root').scrollIntoView({ block: 'start', behavior: 'smooth' }); } catch (e) {} } };

/* ─────────────── HATİM TAKİBİ ─────────────── */
const CUZ_BAS = [1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
const cuzSon = (i) => (i < 29 ? CUZ_BAS[i + 1] - 1 : 604);
function cuzNo(page) { let c = 0; for (let i = 0; i < 30; i++) if (page >= CUZ_BAS[i]) c = i + 1; return c; }
function renderHatimYeni() {
  const c = $('hatim-content'); if (!c) return;
  const T = 604, page = yukle('hatim_page', 0), pct = Math.round(page / T * 100);
  const cz = cuzNo(Math.max(1, page)), tamamCuz = CUZ_BAS.filter((b, i) => page >= cuzSon(i)).length;
  const kalan = T - page, adet = yukle('hatim_adet', 0);
  const R = 54, C = 2 * Math.PI * R;
  c.innerHTML = `
    <div class="ht-kart">
      <div class="ht-halka">
        <svg viewBox="0 0 128 128"><defs><linearGradient id="ht-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3cf86"/><stop offset="1" stop-color="#b97a35"/></linearGradient></defs>
          <circle cx="64" cy="64" r="${R}" class="ht-iz"/>
          <circle cx="64" cy="64" r="${R}" class="ht-dolu" stroke="url(#ht-g)" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - page / T)}"/></svg>
        <div class="ht-orta"><b>%${pct}</b><small>${page} / ${T} sayfa</small></div>
      </div>
      <div class="ht-bilgi">
        <div><small>ŞU AN</small><b>${page ? cz + '. cüz' : 'Başlamadın'}</b></div>
        <div><small>BİTEN CÜZ</small><b>${tamamCuz} / 30</b></div>
        <div><small>KALAN</small><b>${kalan} sayfa</b></div>
        ${adet ? `<div><small>TAMAMLANAN HATİM</small><b>${adet}</b></div>` : ''}
      </div>
    </div>
    ${page >= T ? `<div class="ht-tamam">🎉 Hatmini tamamladın! Allah kabul etsin.<button onclick="hvHtYeni()">Yeni hatme başla</button></div>` : ''}
    <div class="ht-btn">
      <button class="ht-k" onclick="hatimAdjust(-1)" aria-label="Bir sayfa geri">−</button>
      <button class="ht-ana" onclick="hatimAdjust(1)"><b>+1 sayfa okudum</b><small>${page < T ? 'Sonraki: ' + (page + 1) + '. sayfa' : 'Tamamlandı'}</small></button>
      <button class="ht-k ht-cz" onclick="hatimAdjust(20)">+1<br><small>cüz</small></button>
    </div>
    <button class="ht-mushaf" onclick="hvHtMushaf()"><span>📜</span><span><b>Kaldığım sayfayı aç</b><small>Sayfa sayfa mushafta ${Math.min(T, page + 1)}. sayfa</small></span><i>›</i></button>
    <div class="yh-grup">30 cüz <small class="an-ipucu">Okuduğun cüze dokun, oraya kadar işaretlensin</small></div>
    <div class="ht-cuzler">${CUZ_BAS.map((b, i) => { const bitti = page >= cuzSon(i), simdi = !bitti && page >= b - 1 && page > 0; return `<button class="${bitti ? 'bitti' : ''}${simdi ? ' simdi' : ''}" onclick="hvHtCuz(${i})"><b>${i + 1}</b>${bitti ? '<i>✓</i>' : ''}</button>`; }).join('')}</div>
    ${typeof hvHatimPlanHtml === 'function' ? hvHatimPlanHtml(page) : ''}
    <button class="ht-sifir" id="ht-sifir" onclick="hvHtSifir(this)">Hatmi sıfırla</button>`;
}
window.renderHatim = renderHatimYeni;
rota('hatim', renderHatimYeni);
window.hvHtCuz = (i) => {
  const page = yukle('hatim_page', 0);
  const hedef = page === cuzSon(i) ? CUZ_BAS[i] - 1 : cuzSon(i);
  kaydet('hatim_page', hedef); renderHatimYeni(); titre(12);
  if (hedef >= 604) toast('🎉 Tebrikler', 'Hatmini tamamladın!');
};
window.hvHtMushaf = () => { const page = yukle('hatim_page', 0); try { hvSet('hv_mushaf_page', String(Math.max(1, Math.min(604, page + 1)))); } catch (e) {} navigateTo('mushaf'); };
window.hvHtYeni = () => { kaydet('hatim_adet', yukle('hatim_adet', 0) + 1); kaydet('hatim_page', 0); renderHatimYeni(); };
window.hvHtSifir = (b) => {
  if (!b.dataset.emin) { b.dataset.emin = '1'; b.textContent = 'Emin misin? Tekrar dokun'; b.classList.add('emin'); setTimeout(() => { if (b.isConnected) { delete b.dataset.emin; b.textContent = 'Hatmi sıfırla'; b.classList.remove('emin'); } }, 3500); return; }
  kaydet('hatim_page', 0); renderHatimYeni();
};

/* ─────────────── PAYLAŞIM: 10 CAMİ ARKA PLANI ─────────────── */
const PB_ADLAR = DUVARLAR.map(d => d[0]);
const pbSecili = () => yukle('paylas_bg', '07');   // v67.9: varsayılan Kul Şerif (keskin 1080 px)
const pbKaynak = (sec) => sec ? `img/duvar_${sec}.jpg` : 'img/paylas_' + ((document.body && document.body.dataset.foto) || 'ikindi') + '.jpg';
const _pbCache = {};
window.hvCardLoadBg = function () {
  const src = pbKaynak(pbSecili());
  return new Promise((res) => {
    if (_pbCache[src]) return res(_pbCache[src]);
    const im = new Image();
    im.onload = () => { im._yaziAlt = src.indexOf('duvar_') >= 0; _pbCache[src] = im; res(im); };   // v67.8: cami fotoğrafında yazı alta
    im.onerror = () => res(null);
    im.src = src;
  });
};
function pbSerit(fn) {
  const sec = pbSecili();
  return `<div class="pb-serit">
    <button class="${sec === '' ? 'on' : ''}" onclick="${fn}('')" style="background-image:url(${pbKaynak('')})"><span>Vakte göre</span></button>
    ${PB_ADLAR.map((a, i) => { const k = String(i + 1).padStart(2, '0'); return `<button class="${sec === k ? 'on' : ''}" onclick="${fn}('${k}')" style="background-image:url(img/dv_k_${k}.jpg)"><span>${esc(a)}</span></button>`; }).join('')}
  </div>`;
}
let _pbSira = 0;
async function pbOnizle() {
  const prev = $('share-card-preview');
  if (!prev || typeof _paylasimData === 'undefined' || !_paylasimData) return;
  const sira = ++_pbSira;
  const etiket = _paylasimTip === 'ayet' ? '📖 Ayet-i Kerime' : (_paylasimTip === 'cuma' ? '🕌 Cuma Mesajı' : '📿 Hadis-i Şerif');
  try {
    const cv = await hvBuildShareCard({ badge: etiket, arabic: _paylasimData.ar || '', text: String(_paylasimData.tr || '').trim().replace(/^["“”«»']+|["“”«»']+$/g, '').trim(), source: _paylasimData.src });
    if (sira !== _pbSira) return;
    prev.classList.add('pb-gorsel');
    prev.innerHTML = `<img src="${cv.toDataURL('image/jpeg', 0.86)}" alt="Paylaşım kartı önizleme">`;
  } catch (e) {}
}
const _eskiPY = window.paylasimYenile;
if (typeof _eskiPY === 'function') {
  window.paylasimYenile = function () { const r = _eskiPY.apply(this, arguments); pbOnizle(); return r; };
}
const _eskiRP = window.renderPaylasim;
if (typeof _eskiRP === 'function') {
  const yeniRP = function () {
    const c = $('paylasim-content');
    _eskiRP.apply(this, arguments);
    if (c && !c.querySelector('.pb-kutu')) {
      const k = document.createElement('div'); k.className = 'pb-kutu';
      k.innerHTML = `<div class="yh-grup">Arka plan</div>${pbSerit('hvPbSec')}`;
      const prev = $('share-card-preview'); if (prev) prev.before(k);
    }
  };
  window.renderPaylasim = yeniRP; rota('paylasim', yeniRP);
}
window.hvPbSec = (k) => {
  kaydet('paylas_bg', k);
  document.querySelectorAll('.pb-kutu').forEach(x => { x.innerHTML = `<div class="yh-grup">Arka plan</div>${pbSerit('hvPbSec')}`; });
  pbOnizle(); titre(8);
};
const _eskiOSC = window.hvOpenShareCard;
let _pbSonVeri = null;
if (typeof _eskiOSC === 'function') {
  window.hvOpenShareCard = async function (d) {
    if (d && typeof d.text === 'string') d.text = d.text.trim().replace(/^["“”«»']+|["“”«»']+$/g, '').trim();
    const r = await _eskiOSC.apply(this, arguments);
    if (d && !d.canvas) {
      _pbSonVeri = d;
      const box = document.querySelector('#hv-share-modal .hv-sc-box'), act = box && box.querySelector('.hv-sc-actions');
      if (act) { const s = document.createElement('div'); s.className = 'pb-modal'; s.innerHTML = pbSerit('hvPbModal'); act.before(s); const on = s.querySelector('.on'); if (on) s.firstElementChild.scrollLeft = Math.max(0, on.offsetLeft - 80); }
    }
    return r;
  };
}
window.hvPbModal = (k) => { kaydet('paylas_bg', k); if (_pbSonVeri) window.hvOpenShareCard(_pbSonVeri); if ($('share-card-preview')) window.hvPbSec(k); };

/* ═════ v70 · Paylaşım kartı: punto (A− / A+) + yazıyı sürükleyerek yukarı/aşağı taşıma + arka planların hepsi ═════ */
(function () {
  const _osc2 = window.hvOpenShareCard;
  if (typeof _osc2 !== 'function') return;
  let _son = null;
  const yenidenAc = () => { if (_son) window.hvOpenShareCard(_son); };
  window.hvPbPunto = (d) => { if (!_son) return; _son.punto = Math.max(0.6, Math.min(1.8, (Number(_son.punto) || 1) + d)); yenidenAc(); };
  window.hvPbSifirla = () => { if (!_son) return; _son.punto = 1; _son.ofset = 0; yenidenAc(); };
  window.hvOpenShareCard = async function (d) {
    const r = await _osc2.apply(this, arguments);
    if (!d || d.canvas) return r;
    _son = d;
    const box = document.querySelector('#hv-share-modal .hv-sc-box'); if (!box) return r;
    const img = box.querySelector('.hv-sc-img'), act = box.querySelector('.hv-sc-actions');
    // Kontrol çubuğu
    const k = document.createElement('div'); k.className = 'pb-ayar';
    k.innerHTML = `<button onclick="hvPbPunto(-0.12)" aria-label="Küçült">A−</button><span>Yazı boyutu · <b>yazıyı sürükleyerek taşı</b></span><button onclick="hvPbPunto(0.12)" aria-label="Büyüt">A+</button><button class="pb-sfr" onclick="hvPbSifirla()" aria-label="Sıfırla">↺</button>`;
    if (act) act.before(k);
    // Sürükleme: önizleme üstünde yukarı/aşağı
    if (img) {
      let y0 = null, taban = 0;
      const olcek = () => (typeof HV_CARD_H !== 'undefined' ? HV_CARD_H : 1920) / Math.max(1, img.clientHeight);
      const bas = (e) => { y0 = (e.touches ? e.touches[0].clientY : e.clientY); taban = Number(_son.ofset) || 0; img.classList.add('surukle'); };
      const git = (e) => { if (y0 === null) return; const y = (e.touches ? e.touches[0].clientY : e.clientY); img.style.transform = `translateY(${Math.round((y - y0) * 0.35)}px)`; e.preventDefault(); };
      const bit = (e) => { if (y0 === null) return; const y = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY); const dy = (y - y0) * olcek(); y0 = null; img.classList.remove('surukle'); img.style.transform = ''; if (Math.abs(dy) > 12) { _son.ofset = taban + dy; yenidenAc(); } };
      img.addEventListener('touchstart', bas, { passive: true }); img.addEventListener('touchmove', git, { passive: false }); img.addEventListener('touchend', bit);
      img.addEventListener('mousedown', bas); window.addEventListener('mousemove', git); window.addEventListener('mouseup', bit);
    }
    return r;
  };
})();

/* ═════ v70 · Paylaşım sayfası: Hadis listesi (1000+) ve Yer imlerim seçimi ═════ */
window.hvPaylasimHadisListe = function (kap) {
  if (!kap || typeof hvAllHadis !== 'function') return;
  const HADITHS = hvAllHadis();
  const ciz = (q) => {
    q = (q || '').trim().toLocaleLowerCase('tr');
    const L = HADITHS.map((h, i) => ({ h, i })).filter(x => !q || (x.h.text + ' ' + (x.h.source || '')).toLocaleLowerCase('tr').includes(q));
    const goster = L.slice(0, 80);
    $('ph-liste').innerHTML = goster.map(x => `<button class="ph-kart" onclick="hvPaylasimHadisSec(${x.i})"><span>${esc(x.h.text.length > 150 ? x.h.text.slice(0, 148).replace(/\s+\S*$/, '') + '…' : x.h.text)}</span><small>${esc(x.h.source || '')}</small></button>`).join('')
      + (L.length > 80 ? `<div class="info-note">${L.length} hadisten ilk 80'i gösteriliyor — aramayı daraltın.</div>` : (L.length ? '' : '<div class="info-note">Eşleşen hadis yok.</div>'));
  };
  kap.innerHTML = `<div class="section-mini-title" style="margin-top:14px;">📿 Tüm Hadisler <span style="font-size:.75rem;color:var(--text-muted);font-weight:600;">${HADITHS.length}</span></div>
    <input type="search" class="search-input ph-ara" placeholder="Hadis ara — ör. sabır, namaz, anne" oninput="hvPaylasimHadisAra(this.value)">
    <div id="ph-liste"></div>`;
  window.hvPaylasimHadisAra = ciz;
  ciz('');
};
window.hvPaylasimHadisSec = function (i) {
  const h = (typeof hvAllHadis === 'function' ? hvAllHadis() : HADITHS)[i]; if (!h) return;
  window._paylasimData = { ar: h.ar || '', tr: h.text, src: h.source };
  try { _paylasimData = window._paylasimData; } catch (e) {}
  if (typeof pbOnizle === 'function') pbOnizle();
  const p = $('share-card-preview'); if (p) p.scrollIntoView({ behavior: 'smooth', block: 'center' });
  titre(8);
};
window.hvPaylasimYerimiListe = function (kap) {
  if (!kap) return;
  const M = Object.values((typeof hvGetBookmarks === 'function') ? hvGetBookmarks() : {}).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  if (!M.length) { kap.innerHTML = `<div class="yi-bos"><div class="yi-bos-ik">☆</div><b>Henüz yer imin yok</b><p>Kur'an okurken bir âyete dokunup <b>☆ Yer imi</b> de; burada seçip kart yapabilirsin.</p></div>`; return; }
  const meal = (s, a) => { try { return (window.DIYANET_MEAL && typeof hvMeal === 'function') ? hvMeal(s, a) : ''; } catch (e) { return ''; } };
  kap.innerHTML = `<div class="section-mini-title" style="margin-top:14px;">⭐ Yer İmlerim <span style="font-size:.75rem;color:var(--text-muted);font-weight:600;">${M.length}</span></div>
    <div class="info-note">Bir âyete dokun, kartın üstte hazırlansın.</div>` +
    M.map(x => { const m = meal(x.surah, x.ayah); return `<button class="ph-kart" onclick="hvPaylasimYerimiSec(${x.surah},${x.ayah})"><b>${esc(x.name || hvSurahName(x.surah))} Sûresi · ${x.ayah}. âyet</b><span>${esc(m.length > 150 ? m.slice(0, 148).replace(/\s+\S*$/, '') + '…' : m)}</span></button>`; }).join('');
  if (!window.DIYANET_MEAL && typeof hvMealHazir === 'function') hvMealHazir().then((ok) => { if (ok && APP_STATE.currentPage === 'paylasim') window.hvPaylasimYerimiListe(kap); }).catch(() => {});
};
window.hvPaylasimYerimiIlk = function () {
  const M = Object.values((typeof hvGetBookmarks === 'function') ? hvGetBookmarks() : {}).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  if (M.length) window.hvPaylasimYerimiSec(M[0].surah, M[0].ayah);
  else { const p = $('share-card-preview'); if (p) { p.classList.remove('pb-gorsel'); p.innerHTML = '<div class="info-note">Önce Kur\'an\'da bir âyeti yer imine ekle.</div>'; } }
};
window.hvPaylasimYerimiSec = async function (s, a) {
  try { if (!window.DIYANET_MEAL && typeof hvMealHazir === 'function') await hvMealHazir(); } catch (e) {}
  let tr = ''; try { tr = hvMeal(s, a); } catch (e) {}
  if (!tr) { toast('Meâl yüklenemedi', 'İnternet bağlantını kontrol edip tekrar dene.'); return; }
  window._paylasimData = { ar: '', tr, src: `${hvSurahName(s)} Sûresi, ${a}. Âyet` };
  try { _paylasimData = window._paylasimData; } catch (e) {}
  window._paylasimTip = 'ayet'; try { _paylasimTip = 'ayet'; } catch (e) {}
  if (typeof pbOnizle === 'function') pbOnizle();
  const p = $('share-card-preview'); if (p) p.scrollIntoView({ behavior: 'smooth', block: 'center' });
  titre(8);
};


/* ═════════ v67.5 · Ana sayfa: tek "Kur'an Oku" kartı + kaldığın yer ═════════ */
function yaKuranYaz() {
  const son = (typeof hvGetLastRead === 'function') ? hvGetLastRead() : null;
  const alt = $('ya-kuran-alt'); if (!alt) return;
  if (son && son.surah) {
    const ad = son.name || ((sureBul(son.surah) || {}).name) || '';
    alt.textContent = `${ad}${son.ayah > 1 ? ' · ' + son.ayah + '. âyet' : ''}`;
  } else alt.textContent = 'Mushafla devam';
}
window.hvYaKuran = () => {
  const son = (typeof hvGetLastRead === 'function') ? hvGetLastRead() : null;
  if (son && son.surah) openSurahAt(son.surah, son.ayah || 1); else navigateTo('kurandua');
};
document.addEventListener('DOMContentLoaded', yaKuranYaz);
const _eskiNav2 = window.navigateTo;
window.navigateTo = function (id) { const r = _eskiNav2.apply(this, arguments); if (id === 'home') try { yaKuranYaz(); } catch (e) {} return r; };

/* ═════════ v67.5 · Sadeleştirme ═════════
   1) Sûreler listesi: kaldığın yer / yer imleri / indirme kutusu kalktı → indirme Kur'an sekmesinde (Çevrimdışı Kur'an)
   2) Önemli Sûreler sayfası → Kur'an sekmesinde "Öne Çıkan Sûreler · Tümü" (29 sûre, fazîletleriyle)
   3) 0'dan Dua Öğren + Dua & Sûre Öğren → tek bölüm, üstte "Hece hece oku | Ezberle"            */
async function krIndirCiz() {
  const box = $('kr-indir'); if (!box) return;
  let n = 0; try { n = await hvOfflineSurahCount(); } catch (e) {}
  const tam = n === 114;
  const p = Math.round(n / 114 * 100);
  box.innerHTML = `<p class="kr-ind-not">İnternet varken tüm Kur'an'ı (Arapça, okunuş ve Diyanet meâli) telefonuna indir; sonra internetsiz oku.</p>
    <div class="qdl-track"><div id="qdl-bar" class="qdl-bar" style="width:${p}%"></div></div>
    <div id="qdl-text" class="qdl-text">${tam ? '✅ Tüm sûreler cihazında — internetsiz okuyabilirsin.' : (n ? `${n}/114 sûre indirildi.` : 'Henüz indirilmedi.')}</div>
    <div class="kr-ind-btn"><button id="qdl-btn" class="gold-primary-btn" onclick="hvDownloadWholeQuran()" ${tam ? 'disabled' : ''}>${tam ? '✅ İndirildi' : (n ? 'Kalanını indir' : "Tüm Kur'an'ı indir")}</button>
    ${n ? '<button class="gold-outline-btn" onclick="hvClearQuranCache()">Önbelleği sil</button>' : ''}</div>`;
}
window.hvKrIndir = () => { sheetAc(shBas("Çevrimdışı Kur'an") + '<div id="kr-indir"></div>'); krIndirCiz(); };
window.renderQuranTools = function () { const b = $('quran-tools'); if (b) b.innerHTML = ''; krIndirCiz(); };
window.hvKrOnemli = () => {
  const L = (typeof ONEMLI_SURELER !== 'undefined') ? ONEMLI_SURELER : [];
  sheetAc(shBas('Önemli Sûreler · fazîletleriyle') + `<div class="kr-onemli">${L.map(s => { const x = sureBul(s.id) || {}; return `<button onclick="hvOkKapat();openSurahById(${s.id})"><span class="kr-mad">${s.id}</span><span><b>${esc(x.name || s.name)} Sûresi</b><small>${esc(s.fazilet || '')}</small></span></button>`; }).join('')}</div>`);
};
(function () {
  const once = window.navigateTo;
  window.navigateTo = function (id) {
    if (id === 'onemli-sureler') { const r = once.call(this, 'kurandua'); setTimeout(() => window.hvKrOnemli(), 250); return r; }
    if (id === 'sifirdan' || id === 'ezber') { const r = once.apply(this, arguments); setTimeout(ogrenModDuzelt, 0); setTimeout(ogrenModDuzelt, 300); return r; }
    return once.apply(this, arguments);
  };
})();
function ogrenModDuzelt() {
  document.querySelectorAll('.ogren-mod').forEach(m => {
    m.classList.add('og-tek');
    const b = m.querySelectorAll('.seg-btn');
    if (b[0] && !b[0].dataset.ok) { b[0].dataset.ok = '1'; b[0].textContent = 'Hece hece oku'; }
    if (b[1] && !b[1].dataset.ok) { b[1].dataset.ok = '1'; b[1].textContent = 'Ezberle'; }
  });
}
document.addEventListener('DOMContentLoaded', ogrenModDuzelt);

/* ═════════ v67.5 · Ayarlar: katlanır başlıklar ═════════ */
function ayarKatla() {
  document.querySelectorAll('#page-settings .settings-group').forEach((g, i) => {
    if (g.dataset.kat) return; g.dataset.kat = '1';
    const t = g.querySelector('.group-title'); if (!t) return;
    g.classList.add('ay-kat'); if (i === 0) g.classList.add('acik');
    t.setAttribute('role', 'button'); t.tabIndex = 0;
    t.addEventListener('click', () => g.classList.toggle('acik'));
  });
}
document.addEventListener('DOMContentLoaded', ayarKatla);

/* ═════════ v67.7 · Günün Âyeti: sabit punto, sıkışma/kayma yok ═════════
   Kısa âyette Arapçası da görünür. Kutuya okunur puntoda (≥14px) sığmayan uzun âyet
   ana sayfada gösterilmez, sıradaki âyete geçilir (paylaşım vb. etkilenmez). */
(function () {
  let deneme = 0;
  window.hvYaAyetSigdir = function () {
    const kart = $('daily-ayet-card'), ar = $('daily-verse-arabic'), tr = $('daily-verse-turkish');
    if (!kart || !ar || !tr || !kart.classList.contains('ya-ayet')) return;
    requestAnimationFrame(() => {
      const v = window._currentAyet;
      const metin = v && v.arabic ? String(v.arabic).trim() : '';
      tr.style.fontSize = ''; tr.style.minHeight = ''; kart.style.removeProperty('flex-shrink');
      ar.classList.add('ya-ar');
      ar.textContent = ''; ar.style.display = 'none'; ar.style.fontSize = '';
      // v68.9.2: kartın tamamı sığmalı (alt satır: sûre · âyet + Paylaş) — küçük / çentikli telefonlarda kesiliyordu
      const tasti = () => tr.scrollHeight > tr.clientHeight + 1 || kart.scrollHeight > kart.clientHeight + 1;
      let fs = parseFloat(getComputedStyle(tr).fontSize) || 15, n = 0;
      if (tasti()) tr.style.minHeight = '0';   // dar ekranda metin kutusunun sabit yüksekliği bırakılır
      while (tasti() && fs > 13 && n < 8) { fs -= 0.5; tr.style.fontSize = fs + 'px'; n++; }
      if (tasti()) {
        if (deneme < 40 && typeof hvAyetSec === 'function' && typeof hvAyetCiz === 'function') {
          deneme++; const yeni = hvAyetSec(); if (yeni) { hvAyetCiz(yeni, false); return; }
        }
        kart.style.setProperty('flex-shrink', '0', 'important');   // son çare: kart küçülmesin, sayfa biraz kaysın ama yazı kesilmesin
      }
      deneme = 0; kart.classList.remove('ar-var');
      if (metin && metin.length <= 170) {
        ar.textContent = metin; ar.style.display = ''; kart.classList.add('ar-var');
        const tasti2 = () => tr.scrollHeight > tr.clientHeight + 1 || kart.scrollHeight > kart.clientHeight + 1;
        if (tasti2()) ar.style.fontSize = '1.2rem';
        if (tasti2()) { ar.textContent = ''; ar.style.display = 'none'; ar.style.fontSize = ''; kart.classList.remove('ar-var'); }
      }
    });
  };
  document.addEventListener('DOMContentLoaded', () => setTimeout(() => { try { window.hvYaAyetSigdir(); } catch (e) {} }, 300));
})();

/* ═════════════════════════ v68.7 · Sûre listesi: Mushaf sırası / İniş (nüzûl) sırası ═════════════════════════
   İniş sırası: Diyanet'in de esas aldığı yaygın (Mısır/Ezher) tertip. */
(function () {
  const NUZUL = [96, 68, 73, 74, 1, 111, 81, 87, 92, 89, 93, 94, 103, 100, 108, 102, 107, 109, 105, 113, 114, 112, 53, 80, 97, 91, 85, 95, 106, 101, 75, 104, 77, 50, 90, 86, 54, 38, 7, 72, 36, 25, 35, 19, 20, 56, 26, 27, 28, 17, 10, 11, 12, 15, 6, 37, 31, 34, 39, 40, 41, 42, 43, 44, 45, 46, 51, 88, 18, 16, 71, 14, 21, 23, 32, 52, 67, 69, 70, 78, 79, 82, 84, 30, 29, 83, 2, 8, 3, 33, 60, 4, 99, 57, 47, 13, 55, 76, 65, 98, 59, 24, 22, 63, 58, 49, 66, 64, 61, 62, 48, 5, 9, 110];
  const SIRA = {}; NUZUL.forEach((no, i) => { SIRA[no] = i + 1; });
  window.hvNuzulSira = (no) => SIRA[Number(no)] || 0;
  // v70: okuyucuda önceki/sonraki sûre — seçili sıraya göre (yon: -1 / +1); yoksa 0
  window.hvSureKomsu = (no, yon) => {
    no = Number(no);
    if (mod() !== 'nuzul') { const h = no + yon; return h >= 1 && h <= 114 ? h : 0; }
    const i = NUZUL.indexOf(no); if (i < 0) return 0;
    return NUZUL[i + yon] || 0;
  };
  const mod = () => { try { return localStorage.getItem('hv_sure_sira') === 'nuzul' ? 'nuzul' : 'mushaf'; } catch (e) { return 'mushaf'; } };
  function cubuk() {
    const w = document.getElementById('surah-list-wrap'); if (!w) return;
    let c = document.getElementById('sure-sira-sec');
    if (!c) { c = document.createElement('div'); c.id = 'sure-sira-sec'; c.className = 'sure-sira-sec'; w.before(c); }
    const m = mod();
    c.innerHTML = `<button class="${m === 'mushaf' ? 'on' : ''}" onclick="hvSureSira('mushaf')">Mushaf sırası</button><button class="${m === 'nuzul' ? 'on' : ''}" onclick="hvSureSira('nuzul')">İniş sırası</button>`;
  }
  const eski = window.renderSurahListItems;
  if (typeof eski !== 'function') return;
  window.renderSurahListItems = function (list) {
    let L = Array.isArray(list) ? list.slice() : [];
    const nz = mod() === 'nuzul';
    if (nz) L.sort((a, b) => (SIRA[a.id || a.number] || 999) - (SIRA[b.id || b.number] || 999));
    const r = eski.call(this, L);
    try {
      cubuk();
      const w = document.getElementById('surah-list-wrap');
      if (w) w.querySelectorAll('.surah-card').forEach((k, i) => {
        const s = L[i]; if (!s) return; const no = s.id || s.number;
        const alt = k.querySelector('.surah-sub-info'); if (!alt) return;
        if (nz) { alt.innerHTML = `İniş sırası: <b>${SIRA[no] || '-'}</b> • ${alt.textContent}`; k.classList.add('nz'); }
      });
    } catch (e) {}
    return r;
  };
  window.hvSureSira = (m) => {
    try { localStorage.setItem('hv_sure_sira', m); } catch (e) {}
    const q = (document.getElementById('surah-search-input') || {}).value || '';
    if (q.trim() && typeof filterSurahList === 'function') filterSurahList(q);
    else window.renderSurahListItems((typeof APP_STATE !== 'undefined' && APP_STATE.surahList) || []);
  };
  try { if (typeof APP_STATE !== 'undefined' && APP_STATE.surahList && APP_STATE.surahList.length) window.renderSurahListItems(APP_STATE.surahList); } catch (e) {}
})();

/* ═════════════════════════ v68.7 · YER İMLERİM tam sayfa + sade ekleme ═════════════════════════ */
(function () {
  let _imDon = 'kurandua';
  const imler = () => Object.values((typeof hvGetBookmarks === 'function') ? hvGetBookmarks() : {}).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const tarih = (ts) => { try { if (!ts) return ''; const d = new Date(ts), b = new Date(); const g = Math.floor((new Date(b.toDateString()) - new Date(d.toDateString())) / 864e5); return g === 0 ? 'Bugün' : g === 1 ? 'Dün' : g < 7 ? g + ' gün önce' : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: d.getFullYear() === b.getFullYear() ? undefined : 'numeric' }); } catch (e) { return ''; } };
  const ilkSatir = (s, a) => { try { const m = (window.DIYANET_MEAL && typeof hvMeal === 'function') ? hvMeal(s, a) : ''; return m.length > 110 ? m.slice(0, 108).replace(/\s+\S*$/, '') + '…' : m; } catch (e) { return ''; } };
  function ciz() {
    const kok = $('yerimleri-root'); if (!kok) return;
    const M = imler(), son = (typeof hvGetLastRead === 'function') ? hvGetLastRead() : null;
    kok.innerHTML = (son && son.surah ? `<button class="yi-son" onclick="openSurahAt(${son.surah},${son.ayah || 1})"><span class="yi-son-ik">📍</span><span><small>Kaldığın yer</small><b>${esc(son.name || hvSurahName(son.surah))} Sûresi · ${son.ayah || 1}. âyet</b></span><i>Devam ›</i></button>` : '') +
      (M.length ? `<div class="yi-say">${M.length} yer imi</div><div class="yi-liste">${M.map(x => { const m = ilkSatir(x.surah, x.ayah); return `
        <div class="yi-kart" id="yi-${x.surah}-${x.ayah}">
          <button class="yi-git" onclick="hvImAc(${x.surah},${x.ayah})">
            <span class="yi-no">${x.ayah}</span>
            <span class="yi-m"><b>${esc(x.name || hvSurahName(x.surah))} Sûresi <em>${x.ayah}. âyet</em></b>${m ? `<span class="yi-meal">${esc(m)}</span>` : ''}<small>${tarih(x.ts)}</small></span>
          </button>
          <button class="yi-sil" onclick="hvImSil(${x.surah},${x.ayah})" aria-label="Sil">✕</button>
        </div>`; }).join('')}</div>`
        : `<div class="yi-bos"><div class="yi-bos-ik">☆</div><b>Henüz yer imin yok</b><p>Okurken bir âyete dokun, <b>☆ Yer imi</b> de. Kaydettiğin âyetler burada alt alta durur.</p><button onclick="navigateTo('kurandua')">Kur'an'a git ›</button></div>`);
    if (!window.DIYANET_MEAL && M.length && typeof hvMealHazir === 'function') hvMealHazir().then((ok) => { if (ok && APP_STATE.currentPage === 'yerimleri') ciz(); }).catch(() => {});
  }
  window.hvImSil = (s, a) => {
    const el = $('yi-' + s + '-' + a);
    const sil = () => { try { const m = hvGetBookmarks(); delete m[s + ':' + a]; localStorage.setItem('hv_bookmarks', JSON.stringify(m)); } catch (e) {} ciz(); };
    if (el) { el.classList.add('gidiyor'); setTimeout(sil, 220); } else sil();
  };
  window.hvYerImleri = () => { try { _imDon = APP_STATE.currentPage || 'kurandua'; } catch (e) {} if (typeof hvOkKapat === 'function') hvOkKapat(); navigateTo('yerimleri'); };
  window.hvImAc = (s, a) => { if (_imDon === 'quran') _imDon = 'kurandua'; openSurahAt(s, a); window._hvImden = Number(s); };
  window.hvImGeri = () => navigateTo(_imDon && _imDon !== 'yerimleri' ? _imDon : 'kurandua');
  window.hvKrImler = window.hvYerImleri;   // başlıktaki yer imi düğmesi artık tam sayfayı açar
  rota('yerimleri', ciz);

  /* Sade ekleme: üstteki büyük bildirim yerine altta küçük, dokununca listeye götüren işaret */
  function pil(on, s, a) {
    let p = $('yi-pil'); if (p) p.remove();
    p = document.createElement('button'); p.id = 'yi-pil'; p.className = 'yi-pil' + (on ? ' on' : '');
    p.innerHTML = on ? `<span>⭐</span>${esc(hvSurahName(s))} ${a}. âyet kaydedildi<i>Yer imlerim ›</i>` : `<span>☆</span>Yer imi kaldırıldı`;
    p.onclick = () => { p.remove(); if (on) window.hvYerImleri(); };
    document.body.appendChild(p);
    requestAnimationFrame(() => p.classList.add('gor'));
    setTimeout(() => { p.classList.remove('gor'); setTimeout(() => p.remove(), 300); }, 2600);
  }
  const eskiT = window.hvToggleBookmark;
  if (typeof eskiT === 'function') window.hvToggleBookmark = function (s, a, btn) {
    const eskiBild = window.showToastNotification; window.showToastNotification = function () {};
    try { eskiT.apply(this, arguments); } finally { window.showToastNotification = eskiBild; }
    try { pil(!!hvGetBookmarks()[s + ':' + a], s, a); } catch (e) {}
  };
})();


/* ═════════════════════════ v68.7 · MEÂLDEN HATİM (otomatik) + OKUMA KOLAYLIKLARI ═════════════════════════
   • Âyet → Mushaf sayfası (604 sayfalık standart Medine mushafı; alquran.cloud meta)
   • Okurken: sayfa/cüz ayraçları · üst çubukta ilerleme + kalan süre · ekran kararmasın
   • Okunan âyetler hangi sayfanın SON âyetiyse o sayfa "okundu" sayılır → Hatim Takibi'nde ayrı "Meâlden Hatim"
   Hepsi Okuma ayarlarından kapatılabilir (kapalıyken eski hâl). Elle hatim aynen duruyor. */
(function () {
  const SB = '1:1,2:1,2:6,2:17,2:25,2:30,2:38,2:49,2:58,2:62,2:70,2:77,2:84,2:89,2:94,2:102,2:106,2:113,2:120,2:127,2:135,2:142,2:146,2:154,2:164,2:170,2:177,2:182,2:187,2:191,2:197,2:203,2:211,2:216,2:220,2:225,2:231,2:234,2:238,2:246,2:249,2:253,2:257,2:260,2:265,2:270,2:275,2:282,2:283,3:1,3:10,3:16,3:23,3:30,3:38,3:46,3:53,3:62,3:71,3:78,3:84,3:92,3:101,3:109,3:116,3:122,3:133,3:141,3:149,3:154,3:158,3:166,3:174,3:181,3:187,3:195,4:1,4:7,4:12,4:15,4:20,4:24,4:27,4:34,4:38,4:45,4:52,4:60,4:66,4:75,4:80,4:87,4:92,4:95,4:102,4:106,4:114,4:122,4:128,4:135,4:141,4:148,4:155,4:163,4:171,4:176,5:3,5:6,5:10,5:14,5:18,5:24,5:32,5:37,5:42,5:46,5:51,5:58,5:65,5:71,5:77,5:83,5:90,5:96,5:104,5:109,5:114,6:1,6:9,6:19,6:28,6:36,6:45,6:53,6:60,6:69,6:74,6:82,6:91,6:95,6:102,6:111,6:119,6:125,6:132,6:138,6:143,6:147,6:152,6:158,7:1,7:12,7:23,7:31,7:38,7:44,7:52,7:58,7:68,7:74,7:82,7:88,7:96,7:105,7:121,7:131,7:138,7:144,7:150,7:156,7:160,7:164,7:171,7:179,7:188,7:196,8:1,8:9,8:17,8:26,8:34,8:41,8:46,8:53,8:62,8:70,9:1,9:7,9:14,9:21,9:27,9:32,9:37,9:41,9:48,9:55,9:62,9:69,9:73,9:80,9:87,9:94,9:100,9:107,9:112,9:118,9:123,10:1,10:7,10:15,10:21,10:26,10:34,10:43,10:54,10:62,10:71,10:79,10:89,10:98,10:107,11:6,11:13,11:20,11:29,11:38,11:46,11:54,11:63,11:72,11:82,11:89,11:98,11:109,11:118,12:5,12:15,12:23,12:31,12:38,12:44,12:53,12:64,12:70,12:79,12:87,12:96,12:104,13:1,13:6,13:14,13:19,13:29,13:35,13:43,14:6,14:11,14:19,14:25,14:34,14:43,15:1,15:16,15:32,15:52,15:71,15:91,16:7,16:15,16:27,16:35,16:43,16:55,16:65,16:73,16:80,16:88,16:94,16:103,16:111,16:119,17:1,17:8,17:18,17:28,17:39,17:50,17:59,17:67,17:76,17:87,17:97,17:105,18:5,18:16,18:21,18:28,18:35,18:46,18:54,18:62,18:75,18:84,18:98,19:1,19:12,19:26,19:39,19:52,19:65,19:77,19:96,20:13,20:38,20:52,20:65,20:77,20:88,20:99,20:114,20:126,21:1,21:11,21:25,21:36,21:45,21:58,21:73,21:82,21:91,21:102,22:1,22:6,22:16,22:24,22:31,22:39,22:47,22:56,22:65,22:73,23:1,23:18,23:28,23:43,23:60,23:75,23:90,23:105,24:1,24:11,24:21,24:28,24:32,24:37,24:44,24:54,24:59,24:62,25:3,25:12,25:21,25:33,25:44,25:56,25:68,26:1,26:20,26:40,26:61,26:84,26:112,26:137,26:160,26:184,26:207,27:1,27:14,27:23,27:36,27:45,27:56,27:64,27:77,27:89,28:6,28:14,28:22,28:29,28:36,28:44,28:51,28:60,28:71,28:78,28:85,29:7,29:15,29:24,29:31,29:39,29:46,29:53,29:64,30:6,30:16,30:25,30:33,30:42,30:51,31:1,31:12,31:20,31:29,32:1,32:12,32:21,33:1,33:7,33:16,33:23,33:31,33:36,33:44,33:51,33:55,33:63,34:1,34:8,34:15,34:23,34:32,34:40,34:49,35:4,35:12,35:19,35:31,35:39,35:45,36:13,36:28,36:41,36:55,36:71,37:1,37:25,37:52,37:77,37:103,37:127,37:154,38:1,38:17,38:27,38:43,38:62,38:84,39:6,39:11,39:22,39:32,39:41,39:48,39:57,39:68,39:75,40:8,40:17,40:26,40:34,40:41,40:50,40:59,40:67,40:78,41:1,41:12,41:21,41:30,41:39,41:47,42:1,42:11,42:16,42:23,42:32,42:45,42:52,43:11,43:23,43:34,43:48,43:61,43:74,44:1,44:19,44:40,45:1,45:14,45:23,45:33,46:6,46:15,46:21,46:29,47:1,47:12,47:20,47:30,48:1,48:10,48:16,48:24,48:29,49:5,49:12,50:1,50:16,50:36,51:7,51:31,51:52,52:15,52:32,53:1,53:27,53:45,54:7,54:28,54:50,55:17,55:41,55:68,56:17,56:51,56:77,57:4,57:12,57:19,57:25,58:1,58:7,58:12,58:22,59:4,59:10,59:17,60:1,60:6,60:12,61:6,62:1,62:9,63:5,64:1,64:10,65:1,65:6,66:1,66:8,67:1,67:13,67:27,68:16,68:43,69:9,69:35,70:11,70:40,71:11,72:1,72:14,73:1,73:20,74:18,74:48,75:20,76:6,76:26,77:20,78:1,78:31,79:16,80:1,81:1,82:1,83:7,83:35,85:1,86:1,87:16,89:1,89:24,91:1,92:15,95:1,97:1,98:8,100:10,103:1,106:1,109:1,112:1'.split(',').map((x) => { const p = x.split(':'); return Number(p[0]) * 1000 + Number(p[1]); });
  const SB_SET = new Set(SB);
  function ayetSayfa(s, a) { const k = Number(s) * 1000 + Number(a); let lo = 0, hi = SB.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (SB[m] <= k) lo = m; else hi = m - 1; } return lo + 1; }
  const vc = (s) => { const x = sureBul(s); return x ? Number(x.verse_count) || 0 : 0; };
  function sayfaSon(p) { if (p >= 604) return 114 * 1000 + 6; const k = SB[p], s = Math.floor(k / 1000), a = k % 1000; return a > 1 ? s * 1000 + a - 1 : (s - 1) * 1000 + vc(s - 1); }
  window.hvAyetSayfa = ayetSayfa;
  const ayar = (k) => !!yukle('ok_' + k, true);
  window.hvOkAyar = (k) => { kaydet('ok_' + k, !ayar(k)); window.hvKrMenu(); try { okCiz(); } catch (e) {} if (k === 'uyanik') uyanik(); };

  /* ── Meâlden hatim kaydı ── */
  const MH = 'hv_meal_hatim';
  function mh() { try { const o = JSON.parse(localStorage.getItem(MH) || 'null'); if (o && typeof o.b === 'string' && o.b.length === 604) return o; } catch (e) {} return { b: '0'.repeat(604), s: 0, a: 0, ts: 0, adet: 0 }; }
  const mhYaz = (o) => { try { localStorage.setItem(MH, JSON.stringify(o)); } catch (e) {} };
  const say = (o) => { let n = 0; for (let i = 0; i < 604; i++) if (o.b.charCodeAt(i) === 49) n++; return n; };
  window.hvMealHatim = () => { const o = mh(); return { okunan: say(o), sure: o.s, ayet: o.a, ts: o.ts, adet: o.adet || 0 }; };
  function isaretle(s, bas, son) {
    if (!ayar('mhatim')) return;
    const o = mh(); let b = o.b.split(''), deg = false;
    for (let a = bas; a <= son; a++) {
      const p = ayetSayfa(s, a);
      if (sayfaSon(p) === s * 1000 + a && b[p - 1] !== '1') { b[p - 1] = '1'; deg = true; }
    }
    if (deg || (o.s === s && son > o.a) || !o.s) { o.s = s; o.a = son; }   // kısa göz atmalar 'en son' yeri değiştirmesin
    o.ts = Date.now(); o.b = b.join('');
    mhYaz(o);
    if (deg && say(o) === 604) toast('🎉 Meâlden hatmini tamamladın', 'Allah kabul etsin. Hatim Takibi\'nden yeni hatme başlayabilirsin.');
  }

  /* ── Okuma ekranı: izleme, ayraç, ilerleme ── */
  let io = null, sayac = {}, kap = null, ilerleTik = 0;
  function oge() { const w = $('ayah-list-wrap'); return w ? [...w.querySelectorAll('[id^="ayah-"]')] : []; }
  function ayraclar(els) {
    if (!ayar('ayrac')) return;
    const N = OK.v.length || vc(OK.id);
    els.forEach((e, i) => {
      const n = Number(e.id.slice(5)), bit = i + 1 < els.length ? Number(els[i + 1].id.slice(5)) - 1 : N;
      let k = 0; for (let a = n; a <= bit; a++) if (SB_SET.has(OK.id * 1000 + a)) { k = a; break; }
      if (!k && i === 0) k = n;   // sûre sayfa ortasında başlıyorsa da üstte hangi sayfada olduğunu göster
      if (!k) return;
      const p = ayetSayfa(OK.id, k), cz = cuzNo(p), czBas = CUZ_BAS.indexOf(p) >= 0 && SB_SET.has(OK.id * 1000 + k);
      const d = document.createElement('div'); d.className = 'ok-sy' + (czBas ? ' cuz' : '');
      d.innerHTML = `<i></i><span>${czBas ? '<b>' + cz + '. Cüz</b> · ' : ''}Sayfa ${p}${czBas ? '' : ' · ' + cz + '. cüz'}</span><i></i>`;
      const once = e.previousElementSibling; if (once && once.classList.contains('kr-ayrac')) once.style.display = 'none';
      e.before(d);
    });
  }
  /* v68.8: Kaydırmaya göre izleme (IntersectionObserver bazı telefonlarda güvenilmez).
     Bir âyet ekranda en az ~0.3 sn göründükten sonra okuma çizgisinin üstüne geçtiyse ya da
     ekranda 1 sn durduysa "okundu" sayılır. Çok hızlı savurmalar sayılmaz. */
  let izD = null;
  function izle(els) {
    if (io) { io.disconnect(); io = null; } Object.values(sayac).forEach(clearTimeout); sayac = {};
    izD = null;
    if (!ayar('mhatim') || !els.length) return;
    const N = OK.v.length || vc(OK.id), ara = {};
    els.forEach((e, i) => { const n = Number(e.id.slice(5)); ara[n] = [n, i + 1 < els.length ? Number(els[i + 1].id.slice(5)) - 1 : N]; });
    izD = { sid: OK.id, els, ara, ilk: {}, tamam: {} };
    setTimeout(izKontrol, 300);
  }
  function izKontrol() {
    const D = izD; if (!D || !kap || D.sid !== OK.id || APP_STATE.currentPage !== 'quran') return;
    const kr = kap.getBoundingClientRect(), cizgi = kr.top + kap.clientHeight * 0.35, simdi = Date.now();
    let bas = 0, son = 0;
    for (const e of D.els) {
      const n = Number(e.id.slice(5)); if (D.tamam[n]) continue;
      const r = e.getBoundingClientRect();
      const gorunur = r.bottom > kr.top + 10 && r.top < kr.bottom - 10;
      if (gorunur && !D.ilk[n]) D.ilk[n] = simdi;
      const sure = D.ilk[n] ? simdi - D.ilk[n] : 0;
      if ((r.bottom < cizgi && sure >= 300) || (gorunur && sure >= 1000)) {
        D.tamam[n] = 1; const a = D.ara[n]; if (!bas || a[0] < bas) bas = a[0]; if (a[1] > son) son = a[1];
      } else if (!gorunur && r.top >= kr.bottom) break;   // aşağıdakiler henüz gelmedi
    }
    if (bas) isaretle(D.sid, bas, son);
  }
  setInterval(() => { try { if (izD) izKontrol(); } catch (e) {} }, 700);
  function ilerle() {
    ilerleTik = 0;
    if (!ayar('ilerle') || !kap || APP_STATE.currentPage !== 'quran') { if (window._okIlerle) { window._okIlerle = null; try { krSenk(true); } catch (e) {} } return; }
    const els = oge(); if (!els.length) return;
    const ust = kap.getBoundingClientRect().top + kap.clientHeight * 0.35;
    let i = 0; while (i < els.length - 1 && els[i].getBoundingClientRect().bottom < ust) i++;
    const n = Number(els[i].id.slice(5)), N = OK.v.length || 1;
    const sonda = kap.scrollTop + kap.clientHeight >= kap.scrollHeight - 40;
    const oran = sonda ? 1 : Math.max(0, Math.min(1, (n - 1) / N));
    const m = okMod(), hiz = m === 'meal' ? 150 : m === 'arapca' ? 60 : 90;   // dakikada kelime (kabaca)
    let kel = 0; for (let k = n - 1; k < OK.v.length; k++) { const v = OK.v[k]; const t = m === 'arapca' ? v.verse : (v.translation || ''); kel += String(t || '').split(/\s+/).length; }
    const dk = Math.max(1, Math.round(kel / hiz));
    const yazi = sonda ? 'Sûre bitti ✓ · Sayfa ' + ayetSayfa(OK.id, N) : `Sayfa ${ayetSayfa(OK.id, n)} · %${Math.round(oran * 100)} · ~${dk} dk kaldı`;
    window._okIlerle = { id: OK.id, oran, yazi };
    try { krSenk(true); } catch (e) {}
  }
  function kapBagla() {
    const w = $('ayah-list-wrap'); const k = w ? w.closest('.hero-frame-box') : null;
    if (k === kap) return; if (kap) kap.removeEventListener('scroll', kaydir); kap = k; if (kap) kap.addEventListener('scroll', kaydir, { passive: true });
  }
  function kaydir() { if (!ilerleTik) ilerleTik = requestAnimationFrame(() => { ilerle(); try { izKontrol(); } catch (e) {} }); }

  /* ── Ekran kararmasın (Screen Wake Lock) ── */
  let kilit = null;
  function okumada() { const d = $('surah-detail-view'); return APP_STATE.currentPage === 'quran' && d && d.style.display !== 'none' && document.visibilityState === 'visible'; }
  async function uyanik() {
    try {
      if (ayar('uyanik') && okumada()) { if (!kilit && navigator.wakeLock) { kilit = await navigator.wakeLock.request('screen'); kilit.addEventListener('release', () => { kilit = null; }); } }
      else if (kilit) { const k = kilit; kilit = null; await k.release(); }
    } catch (e) { kilit = null; }
  }
  document.addEventListener('visibilitychange', uyanik);
  const nav0 = window.navigateTo;
  if (typeof nav0 === 'function') window.navigateTo = function () { const r = nav0.apply(this, arguments); setTimeout(() => { uyanik(); ilerle(); }, 50); return r; };

  /* okCiz her çizimden sonra */
  const okCiz0 = okCiz;
  okCiz = function () {
    const r = okCiz0.apply(this, arguments);
    try {
      kapBagla();
      const els = okMod() === 'bilgi' ? [] : oge().filter((e) => !e.classList.contains('ok-a'));   // Arapça (mushaf) modunda âyetler satır içi: ayraç yok
      ayraclar(els); izle(okMod() === 'bilgi' ? [] : oge()); setTimeout(ilerle, 60); uyanik();
    } catch (e) {}
    return r;
  };

  /* ── Hatim Takibi: Meâlden Hatim kartı ── */
  const rh0 = renderHatimYeni;
  function mhKart() {
    const o = mh(), n = say(o), pct = Math.round(n / 604 * 100);
    const czDolu = CUZ_BAS.map((b, i) => { const son = cuzSon(i); let k = 0; for (let p = b; p <= son; p++) if (o.b[p - 1] === '1') k++; return k / (son - b + 1); });
    const yer = o.s ? `${esc(hvSurahName(o.s))} ${o.a}. âyet` : '';
    return `<div class="mh-kart">
      <div class="mh-ust"><div><small>OKUDUKÇA İLERLER</small><b>Meâlden Hatim</b></div><div class="mh-yuzde">%${pct}<small>${n} / 604 sayfa</small></div></div>
      <div class="mh-cubuk"><i style="width:${(n / 604 * 100).toFixed(1)}%"></i></div>
      <div class="mh-cuzler" title="30 cüz">${czDolu.map((d, i) => `<span class="${d >= 1 ? 'tam' : ''}" style="--d:${Math.round(d * 100)}%"><em>${i + 1}</em></span>`).join('')}</div>
      ${o.s ? `<button class="mh-devam" onclick="openSurahAt(${o.s},${o.a})"><span><small>En son okuduğun</small><b>${yer} · Sayfa ${ayetSayfa(o.s, o.a)} · ${cuzNo(ayetSayfa(o.s, o.a))}. cüz</b></span><i>Devam ›</i></button>`
        : `<div class="mh-bos">Kur'an'dan bir sûre aç ve okumaya başla; okuduğun sayfalar burada kendiliğinden işaretlenir. Elle bir şey girmene gerek yok.</div>`}
      ${!ayar('mhatim') ? '<div class="mh-not">Okuma ayarlarında “Okudukça hatim ilerlesin” kapalı.</div>' : ''}
      ${n ? `<button class="mh-sifir" id="mh-sifir" onclick="hvMhSifir(this)">${n >= 604 ? 'Yeni meâl hatmine başla' : 'Meâlden hatmi sıfırla'}</button>` : ''}
    </div>
    <div class="yh-grup">Elle hatim takibi</div>`;
  }
  renderHatimYeni = function () {
    const r = rh0.apply(this, arguments);
    try { const c = $('hatim-content'); if (c) c.insertAdjacentHTML('afterbegin', mhKart()); } catch (e) {}
    return r;
  };
  window.renderHatim = renderHatimYeni; rota('hatim', renderHatimYeni);
  window.hvMhSifir = (b) => {
    if (b && !b.dataset.emin) { b.dataset.emin = '1'; b.textContent = 'Emin misin? Tekrar dokun'; setTimeout(() => { if (b.isConnected) { delete b.dataset.emin; renderHatimYeni(); } }, 3500); return; }
    const o = mh(), tam = say(o) >= 604; mhYaz({ b: '0'.repeat(604), s: 0, a: 0, ts: 0, adet: (o.adet || 0) + (tam ? 1 : 0) }); renderHatimYeni();
  };
})();

})();

/* ═════════ v68.3 · EZBER DUVAR KÂĞIDI (tek sûre / dua) ═════════
   Krem zemin, üst kısım kilit ekranı saatine boş; altta kart: başlık, OKUNUŞU (numaralı),
   DİYANET MEALİ. Dua & Sûre Öğren'de açılan her sûre/duada "Duvar kâğıdı yap" düğmesi. */
(function () {
  const esc2 = (s) => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function sar(ctx, metin, gen) {
    const kel = String(metin || '').split(/\s+/); const L = []; let s = '';
    kel.forEach(k => { const t = s ? s + ' ' + k : k; if (ctx.measureText(t).width > gen && s) { L.push(s); s = k; } else s = t; });
    if (s) L.push(s); return L;
  }
  async function veri(tur, ad) {
    let p = null;
    try { if (typeof hvEzYerelGetir === 'function') p = await hvEzYerelGetir(tur, ad); } catch (e) {}
    if (p && p.length) return { baslik: ad, besmele: tur === 'sure' && !/Fâtiha/.test(ad), satir: p.map(x => x.ok).filter(Boolean), meal: p.map(x => x.tr).filter(Boolean).join(' ') };
    const K = (typeof hvEzKayit !== 'undefined') ? hvEzKayit : null;
    if (K && K.baslik === ad && K.parcalar) {
      const ps = K.parcalar.filter(x => !x.besmele);
      const tek = ps.length && ps.every(x => x.tr === ps[0].tr);
      return { baslik: ad, besmele: false, satir: ps.map(x => x.ok).filter(Boolean), meal: tek ? ps[0].tr : ps.map(x => x.tr).join(' ') };
    }
    return null;
  }
  function ciz(v, W, H) {
    const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const c = cv.getContext('2d');
    const f = W / 1080;
    c.fillStyle = '#f6eedc'; c.fillRect(0, 0, W, H);
    const g = c.createRadialGradient(W / 2, H * 0.62, 50 * f, W / 2, H * 0.62, H * 0.6); g.addColorStop(0, 'rgba(255,252,244,.9)'); g.addColorStop(1, 'rgba(246,238,220,0)');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const X = 86 * f, Y = H * 0.35, CW = W - 2 * X, CH = H * 0.52, P = 44 * f, IW = CW - 2 * P;   // v68.6: kenar ve alt güvenli alan
    const baslik = v.baslik.replace(/\s*Sûresi$/, '').replace(/\s*\(.*?\)/, '').toLocaleUpperCase('tr');
    const yerles = (k) => {
      const L = []; let y = 0;
      c.font = `700 ${56 * k}px Lora, Georgia, serif`; y += 60 * k; L.push(['t', baslik, y]);
      y += 46 * k; L.push(['l', 'OKUNUŞU', y]);
      c.font = `${36 * k}px Outfit, system-ui, sans-serif`;
      if (v.besmele) { y += 50 * k; L.push(['b', 'Bismillâhirrahmânirrahîm.', y]); }
      v.satir.forEach((s, i) => { sar(c, (i + 1) + '. ' + s, IW).forEach((ln, j) => { y += 50 * k; L.push(['o', j ? '    ' + ln : ln, y]); }); });
      y += 38 * k; L.push(['h', '', y]);
      y += 48 * k; L.push(['l', 'DİYANET MEALİ', y]);
      c.font = `${34 * k}px Outfit, system-ui, sans-serif`;
      sar(c, v.meal, IW).forEach(ln => { y += 48 * k; L.push(['m', ln, y]); });
      return [L, y + 40 * k];
    };
    let k = 1.4, R = yerles(k);
    while (R[1] > CH - 2 * 20 * f && k > 0.45) { k -= 0.03; R = yerles(k); }
    const ch = Math.min(CH, R[1] + 40 * f), cy = Y + Math.max(0, (CH - ch) * 0.25);
    c.shadowColor = 'rgba(90,60,20,.12)'; c.shadowBlur = 30 * f; c.shadowOffsetY = 8 * f;
    c.fillStyle = 'rgba(255,251,242,.96)'; c.beginPath(); c.roundRect(X, cy, CW, ch, 34 * f); c.fill();
    c.shadowColor = 'transparent'; c.lineWidth = 2.4 * f; c.strokeStyle = '#d9c08a'; c.stroke();
    c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    R[0].forEach(([t, s, y]) => {
      const yy = cy + 20 * f + y;
      if (t === 't') { c.fillStyle = '#4a3220'; c.font = `700 ${56 * k}px Lora, Georgia, serif`; c.fillText(s, X + P, yy); }
      else if (t === 'l') { c.fillStyle = '#a07a3c'; c.font = `700 ${26 * k}px Outfit, system-ui, sans-serif`; c.letterSpacing = (1.5 * k) + 'px'; c.fillText(s, X + P, yy); c.letterSpacing = '0px'; }
      else if (t === 'b') { c.fillStyle = '#6a5a4a'; c.font = `${36 * k}px Outfit, system-ui, sans-serif`; c.fillText(s, X + P, yy); }
      else if (t === 'o') { c.fillStyle = '#2f2219'; c.font = `${36 * k}px Outfit, system-ui, sans-serif`; c.fillText(s, X + P, yy); }
      else if (t === 'h') { c.strokeStyle = '#d9c08a'; c.lineWidth = 2 * f; c.beginPath(); c.moveTo(X + P, yy); c.lineTo(X + CW - P, yy); c.stroke(); }
      else if (t === 'm') { c.fillStyle = '#4a3e34'; c.font = `${34 * k}px Outfit, system-ui, sans-serif`; c.fillText(s, X + P, yy); }
    });
    c.textAlign = 'center'; c.fillStyle = '#8a7a66'; c.font = `${24 * f}px Outfit, system-ui, sans-serif`;
    c.fillText('Meal: Diyanet İşleri Başkanlığı · Namaz Dostu', W / 2, cy + ch + 46 * f);
    return cv;
  }
  window.hvEzDuvar = async (tur, ad) => {
    if (typeof hvMealHazir === 'function') { try { await hvMealHazir(); } catch (e) {} }
    const v = await veri(tur, ad);
    if (!v || !v.satir.length) { if (typeof hvToast === 'function') hvToast('Hazırlanamadı', 'Bu dua için duvar kâğıdı şu an hazırlanamıyor.'); return; }
    try { await document.fonts.ready; } catch (e) {}
    const E = window.hvDvEkran ? window.hvDvEkran() : { W: 1179, H: 2556 }; const cv = ciz(v, E.W, E.H);
    if (typeof hvOpenShareCard === 'function') hvOpenShareCard({ canvas: cv, duvar: true, fallbackText: v.baslik });
  };
  window.hvEzDuvarCiz = ciz;
  const eski = window.hvEzAc;
  if (typeof eski === 'function') window.hvEzAc = async function (tur, ad) {
    const r = await eski.apply(this, arguments);
    try {
      const ust = document.querySelector('#ezber-root .ez-ust-satir');
      if (ust && !ust.querySelector('.ez-duvar-btn')) {
        const b = document.createElement('button'); b.className = 'ez-duvar-btn'; b.innerHTML = '📱 Duvar kâğıdı';
        b.onclick = () => window.hvEzDuvar(tur, ad); ust.appendChild(b);
      }
    } catch (e) {}
    return r;
  };
})();

/* ══════════ v69.0: ANA EKRAN WIDGET KÖPRÜSÜ (iOS WidgetKit + Android AppWidget) ══════════
   Uygulama açıkken widget'ların ihtiyaç duyduğu veriyi telefona yazar:
   30 günlük vakitler, 14 günlük günün âyeti, son okunan + meâlden hatim, bugünkü namaz takibi.
   Widget'tan işaretlenen namazlar uygulama açılınca hvWidgetTakipAl ile buraya geri gelir. */
(function () {
  const ios = () => !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['widget-data']);
  const android = () => !!(window.NamazDostuBridge && typeof window.NamazDostuBridge.widgetData === 'function');
  const iki = (n) => String(n).padStart(2, '0');
  const gunAnahtar = (d) => d.getFullYear() + '-' + iki(d.getMonth() + 1) + '-' + iki(d.getDate());
  const VK = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  function veri() {
    const o = { v: 1, ts: Date.now(), sehir: '', gunler: [], ayetler: [], son: null, takip: null };
    try { o.sehir = APP_STATE.currentDistrict || APP_STATE.currentCity || ''; } catch (e) {}
    // Vakitler (30 gün; yalnız elde olanlar)
    try {
      const u = APP_STATE.userLocation, g = new Date(); g.setHours(0, 0, 0, 0);
      for (let i = 0; i < 30; i++) {
        const e = getCachedDay(u.lat, u.lng, g);
        if (e && e.t) {
          const t = applyOffsets(e.t, e.s);
          if (VK.every(k => t[k])) o.gunler.push({ d: gunAnahtar(g), h: e.h || '', t: VK.map(k => String(t[k]).slice(0, 5)) });
        }
        g.setDate(g.getDate() + 1);
      }
      if (!o.gunler.length && APP_STATE.prayerTimes) {
        const t = APP_STATE.prayerTimes, b = new Date();
        o.gunler.push({ d: gunAnahtar(b), h: APP_STATE.hijriDateText || '', t: VK.map(k => String(t[k] || '').slice(0, 5)) });
      }
    } catch (e) {}
    // Günün âyeti (14 gün, tarihe göre sabit — uygulamadaki kart ve sabah bildirimiyle aynı)
    try {
      const g = new Date();
      for (let i = 0; i < 14; i++) {
        const v = typeof hvGununAyeti === 'function' ? hvGununAyeti(new Date(g)) : null;
        if (v) o.ayetler.push({ d: gunAnahtar(g), m: String(v.turkish || '').trim(), k: v.surah + ' Sûresi · ' + v.ayah + '. Âyet', kk: v.surah + ' ' + v.ayah });
        g.setDate(g.getDate() + 1);
      }
    } catch (e) {}
    // v69.2: 15 dakikada bir dönen âyet havuzu (widget kendi seçer; kısa olanlar kilit ekranına)
    try {
      if (typeof hvAyetHavuzu === 'function') {
        const gor = {};
        o.havuz = hvAyetHavuzu().filter(v => { const k = v.surahNumber + ':' + v.ayah; if (gor[k]) return false; gor[k] = 1; return true; })
          .map(v => ({ m: String(v.turkish || '').trim(), k: v.surah + ' Sûresi · ' + v.ayah + '. Âyet', kk: v.surah + ' ' + v.ayah }))
          .filter(x => x.m);
      }
    } catch (e) {}
    // Son okunan + meâlden hatim
    try {
      const lr = JSON.parse(localStorage.getItem('hv_last_read') || 'null');
      const mh = typeof window.hvMealHatim === 'function' ? window.hvMealHatim() : null;
      if (lr && lr.surah) {
        let ad = lr.name || (typeof hvSurahName === 'function' ? hvSurahName(lr.surah) : '');
        ad = String(ad || '').replace(/\s*Sûresi$/, '').replace(/\s*Suresi$/, '');
        o.son = { ad: ad + ' Sûresi', no: Number(lr.surah), ayet: Number(lr.ayah) || 1,
          sayfa: typeof window.hvAyetSayfa === 'function' ? window.hvAyetSayfa(lr.surah, lr.ayah || 1) : 0,
          hatim: mh ? Math.round(mh.okunan / 604 * 100) : 0 };
      } else if (mh) o.son = { ad: '', no: 0, ayet: 0, sayfa: 0, hatim: Math.round(mh.okunan / 604 * 100) };
    } catch (e) {}
    // Bugünkü namaz takibi
    try {
      const bug = typeof hvTodayKey === 'function' ? hvTodayKey() : gunAnahtar(new Date());
      const d = (hvLoad('namaz_takip', {}) || {})[bug] || {};
      o.takip = { d: bug, sabah: !!d.sabah, ogle: !!d.ogle, ikindi: !!d.ikindi, aksam: !!d.aksam, yatsi: !!d.yatsi };
    } catch (e) {}
    return o;
  }
  let _son = '', _t = null;
  window.hvWidgetGonder = function (hemen) {
    clearTimeout(_t);
    const f = () => {
      if (!ios() && !android()) return;   // tarayıcıda (kabuk yok) hiçbir şey yapma
      let j = '';
      try { j = JSON.stringify(veri()); } catch (e) { return; }
      const kiyas = j.replace(/"ts":\d+,/, '');
      if (kiyas === _son) return;   // değişiklik yoksa widget'ı boşuna yenileme
      _son = kiyas;
      try { if (ios()) window.webkit.messageHandlers['widget-data'].postMessage(j); else if (android()) window.NamazDostuBridge.widgetData(j); else _son = ''; } catch (e) {}
    };
    if (hemen) f(); else _t = setTimeout(f, 800);
  };
  // Widget'ta işaretlenen namazlar → uygulamaya
  window.hvWidgetTakipAl = function (o) {
    try {
      if (typeof o === 'string') o = JSON.parse(o);
      if (!o || !o.d) return;
      const data = hvLoad('namaz_takip', {}) || {};
      const g = data[o.d] || {};
      ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi'].forEach(k => { if (typeof o[k] === 'boolean') g[k] = o[k]; });
      data[o.d] = g; hvSave('namaz_takip', data);
      try { if (typeof renderNamazTakibi === 'function') renderNamazTakibi(); } catch (e) {}
      _son = '';
    } catch (e) {}
  };
  // Takip değişince hemen gönder
  const eski = window.toggleNamaz;
  if (typeof eski === 'function') window.toggleNamaz = function () { const r = eski.apply(this, arguments); window.hvWidgetGonder(); return r; };
  // Açılışta (vakitler gelince), arka plana geçerken ve dakikada bir
  setTimeout(() => window.hvWidgetGonder(true), 4000);
  setTimeout(() => window.hvWidgetGonder(true), 15000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') window.hvWidgetGonder(true); });
  window.addEventListener('pagehide', () => window.hvWidgetGonder(true));
  setInterval(() => { if (document.visibilityState === 'visible') window.hvWidgetGonder(); }, 60000);
})();
/* Widget'a dokununca açılacak yer (native: namazdostu://ac/<hedef>) */
window.hvWidgetAc = function (h) {
  try {
    const sayfa = { kible: 'qibla', zikir: 'zikirmatik', dua: 'ezber', takip: 'namaz-takibi', vakit: 'home', ayet: 'home' }[h];
    if (h === 'kuran' && typeof hvYaKuran === 'function') return hvYaKuran();
    if (sayfa && typeof navigateTo === 'function') navigateTo(sayfa);
  } catch (e) {}
};
