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
function foto(f) { return `img/${AF[f] || AF.kiyam}.jpg`; }
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
  if (!liste.length) { c.innerHTML = `<div class="kk-bitti">🎉 Hepsini öğrendin! <button class="an-basla" onclick="hvKkSifirla()">Baştan başla</button></div>`; return; }
  if (_kk.i >= liste.length) _kk.i = 0;
  const idx = liste[_kk.i]; const k = KELIMELER[idx];
  c.innerHTML = `
    <div class="kk-ust"><span>${bil.length} / ${KELIMELER.length} öğrenildi</span><div class="kk-mod"><button class="${_kk.mod === 'hepsi' ? 'on' : ''}" onclick="hvKkMod('hepsi')">Hepsi</button><button class="${_kk.mod === 'kalan' ? 'on' : ''}" onclick="hvKkMod('kalan')">Öğrenmediklerim</button></div></div>
    <div class="an-ilerle"><i style="width:${Math.round(bil.length / KELIMELER.length * 100)}%"></i></div>
    <button class="kk-kart ${_kk.ac ? 'ac' : ''}" onclick="hvKkCevir()">
      <span class="kk-no">${_kk.i + 1} / ${liste.length}</span>
      <span class="kk-ar" dir="rtl" lang="ar">${k[0]}</span>
      ${_kk.ac ? `<span class="kk-ok">${esc(k[1])}</span><span class="kk-an">${esc(k[2])}</span>` : '<span class="kk-ipucu">Anlamını görmek için dokun</span>'}
      ${bil.indexOf(idx) >= 0 ? '<span class="kk-rozet">✓ biliyorum</span>' : ''}
    </button>
    <div class="an-alt"><button class="an-btn" onclick="hvKkGit(0)">Tekrar et</button><button class="an-btn an-ileri" onclick="hvKkGit(1)">Biliyorum ✓</button></div>
    <div class="info-note">Kur'an'da en sık geçen kelimeleri öğrenince okuduğun âyetlerin önemli bir kısmını anlamaya başlarsın. Kart önce Arapça yüzüyle gelir; dokununca okunuşu ve anlamı açılır.</div>`;
}
window.hvKkCevir = () => { _kk.ac = !_kk.ac; titre(6); renderKelime(); };
window.hvKkGit = (bildi) => {
  const bil = yukle('kelime_bilinen', []); const liste = _kk.mod === 'kalan' ? KELIMELER.map((k, i) => i).filter(i => bil.indexOf(i) < 0) : KELIMELER.map((k, i) => i);
  const idx = liste[_kk.i];
  if (bildi && bil.indexOf(idx) < 0) { bil.push(idx); kaydet('kelime_bilinen', bil); if (_kk.mod === 'kalan') { _kk.ac = false; return renderKelime(); } }
  _kk.i = (_kk.i + 1) % Math.max(1, liste.length); _kk.ac = false; renderKelime();
};
window.hvKkMod = (m) => { _kk.mod = m; _kk.i = 0; _kk.ac = false; renderKelime(); };
window.hvKkSifirla = () => { kaydet('kelime_bilinen', []); _kk = { i: 0, ac: false, mod: 'hepsi' }; renderKelime(); };
rota('kelime', renderKelime);

/* ═════════════════════════ DUVAR KÂĞITLARI ═════════════════════════ */
const DUVARLAR = [['Mescid-i Haram', 'Mekke'], ['Mescid-i Nebevî', 'Medine'], ['Ayasofya', 'İstanbul'], ['Sultanahmet', 'İstanbul'], ['Şeyh Zayed', 'Abu Dabi'],
  ['Hasan II', 'Kazablanka'], ['Kul Şerif', 'Kazan'], ['Registan', 'Semerkant'], ['Şeyh Zayed · Havuz', 'Abu Dabi'], ['Putra', 'Putrajaya']];
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
  let y = y0;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f6dca6'; ctx.font = `600 ${26 * f}px Lora, Georgia, serif`; if (ciz) ctx.fillText(s.ad, W / 2, y); y += 44 * f;
  ctx.fillStyle = '#fff'; ctx.font = `${27 * f}px Amiri, 'Amiri Quran', serif`; ctx.direction = 'rtl';
  y += sarMetin(ctx, s.ar.replace(/۝/g, '۞'), W / 2, y, W * 0.84, 46 * f, ciz) + 10 * f; ctx.direction = 'ltr';
  if (s.ok) { ctx.fillStyle = '#f3e4c8'; ctx.font = `italic ${15 * f}px Lora, Georgia, serif`; y += sarMetin(ctx, s.ok, W / 2, y, W * 0.84, 22 * f, ciz) + 12 * f; }
  if (s.tr) { ctx.fillStyle = 'rgba(255,255,255,.86)'; ctx.font = `${14 * f}px Lora, Georgia, serif`; y += sarMetin(ctx, s.tr, W / 2, y, W * 0.84, 20 * f, ciz); }
  return y - y0;
}
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
        const gr = ctx.createLinearGradient(0, H * 0.3, 0, H); gr.addColorStop(0, 'rgba(10,6,3,0)'); gr.addColorStop(.3, 'rgba(10,6,3,.55)'); gr.addColorStop(1, 'rgba(10,6,3,.88)');
        ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
        const ust = H * 0.36, alt = H * 0.92, f0 = W / 540;
        const sigdir = (m) => { let f = f0, y = dvYaz(ctx, m, W, H, f, 0, false); while (y > alt - ust && f > f0 * 0.5) { f -= f0 * 0.03; y = dvYaz(ctx, m, W, H, f, 0, false); } return [f, y]; };
        let [f, yuk] = sigdir(s);
        if ((f < f0 * 0.92 || (s.ar.length + s.ok.length + s.tr.length) > 650) && s.ok) { const s2 = Object.assign({}, s, { ok: '' }); const r2 = sigdir(s2); s = s2; f = r2[0]; yuk = r2[1]; }
        const basY = Math.max(H * 0.16, ust + (alt - ust - yuk) / 2 + 20 * f);
        if (yuk > alt - ust) { const g2 = ctx.createLinearGradient(0, 0, 0, H * 0.5); g2.addColorStop(0, 'rgba(10,6,3,.2)'); g2.addColorStop(1, 'rgba(10,6,3,.5)'); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H * 0.5); }
        dvYaz(ctx, s, W, H, f, basY, true);
        ctx.fillStyle = 'rgba(246,220,166,.8)'; ctx.font = `${12 * f0}px Lora, Georgia, serif`; ctx.textAlign = 'center'; ctx.fillText('Namaz Dostu · Oku • Anla • Hatırla', W / 2, H - 30 * f0);
      }
      res(cv);
    };
    im.onerror = () => res(cv);
    im.src = `img/duvar_${String(_dv.i + 1).padStart(2, '0')}.jpg`;
  });
}
window.hvDvSec = (i) => { _dv.i = i; renderDuvar(); };
window.hvDvSure = (s) => { _dv.s = s; renderDuvar(); };
window.hvDvAra = (q) => { _dv.q = q; const r = $('dv-sonuc'); if (r) r.innerHTML = dvSonuc(); };
window.hvDvKaydet = async () => {
  const cv = document.createElement('canvas'); cv.width = 1080; cv.height = 1920;
  await duvarCiz(cv, 1080, 1920);
  if (typeof hvOpenShareCard === 'function') hvOpenShareCard({ canvas: cv, fallbackText: 'Namaz Dostu duvar kâğıdı' });
};
rota('duvar', renderDuvar);

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
    <div class="ez-alt-not">✓ ezberlediklerin · dokun, tamamı tek sayfada açılsın</div>`;
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
   • Paylaşım kartları: 10 cami arka planı
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
const KR_CUZ = [[1, 1], [2, 142], [2, 253], [3, 93], [4, 24], [4, 148], [5, 82], [6, 111], [7, 88], [8, 41], [9, 93], [11, 6], [12, 53], [15, 1], [17, 1], [18, 75], [21, 1], [23, 1], [25, 21], [27, 56], [29, 46], [33, 31], [36, 28], [39, 32], [41, 47], [46, 1], [51, 31], [58, 1], [67, 1], [78, 1]];
const KR_ONE = [1, 36, 67, 18, 55, 56, 48, 2];
const I = (d, f) => `<svg viewBox="0 0 24 24" fill="${f ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IK = {
  kitap: I('<path d="M12 6.5C10 5 7 4.6 3.5 5v13c3.5-.4 6.5 0 8.5 1.5 2-1.5 5-1.9 8.5-1.5V5C17 4.6 14 5 12 6.5z"/><path d="M12 6.5V19"/>'),
  katman: I('<path d="M12 3.5l8.5 4.6L12 12.7 3.5 8.1z"/><path d="M3.5 12.2l8.5 4.6 8.5-4.6"/><path d="M3.5 16.1l8.5 4.6 8.5-4.6"/>'),
  mushaf: I('<path d="M5 4.5h10.5a3 3 0 013 3V20H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h10.5"/><path d="M9 8.5h6"/>'),
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
    <div id="kr-mini" class="kr-dinle-yer"></div>
    <div class="kr-baslik"><h3>Öne Çıkan Sûreler</h3><button onclick="hvKrOnemli()">Tümü · fazîletleriyle ${IK.ok}</button></div>
    <div class="kr-liste">${KR_ONE.map(no => { const s = sureBul(no) || {}; return `
      <div class="kr-sat" onclick="openSurahById(${no})" style="--img:url(${krSerit(no)})">
        <span class="kr-no">${no}</span>
        <span class="kr-m"><b>${esc(s.name || '')} Sûresi</b><small>${s.verse_count || ''} Âyet • ${esc(s.revelation_place || '')}</small></span>
        <button class="kr-oyna" onclick="event.stopPropagation();hvKrDinle(${no})" aria-label="Dinle">${IK.play}</button>
      </div>`; }).join('')}</div>
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

/* ═════════ SÛRE EKRANI ═════════ */
function krOynaticiHtml() {
  const m0 = hvDnMod(), m = m0 === 'aa' ? 'ar' : m0;
  const q = hvDnQari();
  const hiz = yukle('kr_hiz', 1), tek = yukle('kr_tekrar', false);
  const not = (m !== 'ar' || m0 === 'aa') && !hvDnAyetKaydiVar(q.id) ? `<div class="kr-not">${esc(q.ad)}'in âyet âyet kaydı yok; bu modda Husarî okur.</div>` : '';
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
  const m = okMod();
  h.className = 'surah-detail-header-card ok-kap';
  h.innerHTML = `
    <div class="kr-rhero kr-rhero-s" style="background-image:url(${krSerit(id)})">
      <button class="kr-yuv kr-sol" onclick="hvKrGeri()" aria-label="Geri">${IK.geri}</button>
      <div class="kr-rbas"><h2>${esc(s.name || '')} Sûresi</h2><p>${id}. Sûre • ${s.verse_count || ''} Âyet • ${esc(s.revelation_place || '')}</p></div>
      <button class="kr-yuv kr-sag2" onclick="hvKrImler()" aria-label="Yer imleri">${IK.imi}</button>
      <button class="kr-yuv kr-sag" onclick="hvKrMenu()" aria-label="Seçenekler">${IK.daha}</button>
    </div>
    <div class="kr-sekme">
      <button class="${m === 'birlikte' ? 'on' : ''}" onclick="hvOkMod('birlikte')">${IK.kitap}<span>Âyet</span></button>
      <button class="${m === 'meal' ? 'on' : ''}" onclick="hvOkMod('meal')">${IK.mushaf}<span>Meâl</span></button>
      <button class="${m === 'arapca' ? 'on' : ''}" onclick="hvOkMod('arapca')">${IK.harf}<span>Arapça</span></button>
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
      <div class="kr-bilgi-iz"><div><small>Sûre</small><b>${id}.</b></div><div><small>Âyet</small><b>${s.verse_count || OK.v.length}</b></div><div><small>İndiği yer</small><b>${esc(s.revelation_place || '')}</b></div><div><small>Cüz</small><b>${cuz}.</b></div></div>
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
        ${okn && v.okunusu ? `<div class="ok-okunus">${esc(v.okunusu)}</div>` : ''}
        ${(() => { const n = v.verse_number; if (bekle) return '<div class="ok-meal"><span class="ok-yuk">Elmalılı meâli yükleniyor…</span></div>';
          if (!grupMu(n)) return `<div class="ok-meal">${esc(okMeal(n))}</div>`;
          const g = G[n]; if (n < g.son) return `<div class="ok-meal kr-ortak-bos">Meâli ${g.son}. âyetin altında · ${g.bas}–${g.son}. âyetler birlikte çevrilmiş</div>`;
          return `<div class="ok-meal"><span class="kr-ortak">${g.bas}–${g.son}. âyetlerin ortak meâli</span>${esc(okMeal(n))}</div>`; })()}
      </div>`).join('');
  }
  const onceki = id > 1 ? sureBul(id - 1) : null, sonraki = id < 114 ? sureBul(id + 1) : null;
  const sAd = (sureBul(id) || {}).name || '';
  w.innerHTML = `<div class="kr-mp ${OK.mpGor ? 'gor' : ''}" id="kr-mp"><button class="kr-mp-p" id="kr-mp-play" onclick="hvKrOyna()" aria-label="Oynat">${IK.play}</button><div class="kr-mp-m"><b>${esc(sAd)} Sûresi</b><small id="kr-mp-alt">${esc(hvDnQari().ad)}</small><span class="kr-mp-c"><i id="kr-mp-dolu"></i></span></div><button class="kr-mp-y" onclick="hvOkYukari()" aria-label="Yukarı">${IK.yukari}</button></div>` +
    (m !== 'bilgi' && id !== 1 && id !== 9 ? `<div class="ok-besmele">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>` : '') +
    `<div class="ok-sayfa kr-kagit ok-m-${m}"><i class="kr-kose k1"></i><i class="kr-kose k2"></i>${govde}</div>
    ${m !== 'bilgi' ? '<div class="ok-ipucu">Bir âyete dokun: yer imi, kaldığın yer, paylaş, buradan dinle</div>' : ''}
    <div class="ok-son-nav">
      ${onceki ? `<button onclick="retryLoadSurah(${id - 1});hvOkYukari()">‹ ${esc(onceki.name)}</button>` : '<span></span>'}
      ${sonraki ? `<button class="ileri" onclick="retryLoadSurah(${id + 1});hvOkYukari()">${esc(sonraki.name)} ›</button>` : '<span></span>'}
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
window.hvOkYukari = () => { try { const v = $('surah-detail-view'); (v && v.scrollIntoView) ? v.scrollIntoView({ block: 'start' }) : window.scrollTo(0, 0); } catch (e) {} };
window.hvKrAlt = () => { OK.altAcik = !OK.altAcik; const a = $('kr-alt'); if (a) a.outerHTML = krAltHtml(); };
window.hvKrGeri = () => {
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
  const h = OK.id + y; if (h < 1 || h > 114) return;
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
    const mpd = $('kr-mp-dolu'); if (mpd) mpd.style.width = (oran * 100).toFixed(2) + '%';
    const mpa = $('kr-mp-alt'); if (mpa) { const t = hvDnQari().ad + (cal ? ' · ' + g : ''); if (mpa.textContent !== t) mpa.textContent = t; }
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
    ${v.okunusu ? `<div class="ok-sh-ok">${esc(v.okunusu)}</div>` : ''}
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
    s.innerHTML = `<div class="yh-grup dn-baslik">Sık dinlenenler</div><div class="dn-sik">${DN_SIK.map((x, i) => `<button onclick="hvDnSik(${x[0]})" style="--fp:${(i * 13) % 100}%"><b>${x[1]}</b><small>${(sureBul(x[0]) || {}).verse_count || ''} âyet</small></button>`).join('')}</div><div class="yh-grup dn-baslik">Tüm sûreler</div>`;
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
const pbSecili = () => yukle('paylas_bg', '');
const pbKaynak = (sec) => sec ? `img/duvar_${sec}.jpg` : 'img/paylas_' + ((document.body && document.body.dataset.foto) || 'ikindi') + '.jpg';
const _pbCache = {};
window.hvCardLoadBg = function () {
  const src = pbKaynak(pbSecili());
  return new Promise((res) => {
    if (_pbCache[src]) return res(_pbCache[src]);
    const im = new Image();
    im.onload = () => { _pbCache[src] = im; res(im); };
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

/* ═════════ v67.5 · Günün Âyeti: kısa âyetlerde Arapçası da görünür (kart boş kalmasın) ═════════
   Sığarsa: Arapça + ayraç + meâl. Sığmazsa Arapça gizlenir, meâl eskisi gibi. */
(function () {
  const eskiSigdir = window.hvYaAyetSigdir;
  window.hvYaAyetSigdir = function () {
    const kart = $('daily-ayet-card'), ar = $('daily-verse-arabic'), tr = $('daily-verse-turkish');
    if (!kart || !ar || !tr || !kart.classList.contains('ya-ayet')) return eskiSigdir && eskiSigdir();
    requestAnimationFrame(() => {
      const v = window._currentAyet;
      const metin = v && v.arabic ? String(v.arabic).trim() : '';
      tr.style.fontSize = '';
      ar.classList.add('ya-ar');
      if (metin && metin.length <= 170) {
        ar.textContent = metin; ar.style.display = ''; ar.style.fontSize = '';
        const tasti = () => tr.scrollHeight > tr.clientHeight + 1 || kart.scrollHeight > kart.clientHeight + 1;
        if (tasti()) ar.style.fontSize = '1.2rem';
        if (tasti()) { ar.textContent = ''; ar.style.display = 'none'; ar.style.fontSize = ''; }
      } else { ar.textContent = ''; ar.style.display = 'none'; }
      if (eskiSigdir) eskiSigdir();
    });
  };
  document.addEventListener('DOMContentLoaded', () => setTimeout(() => { try { window.hvYaAyetSigdir(); } catch (e) {} }, 300));
})();
})();
