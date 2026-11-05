/* ══════════════════════════════════════════════════════════════
   NAMAZ DOSTU — v67.2 YENİ BÖLÜMLER
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
    <button class="yh-diger" style="margin-right:auto;margin-left:0" onclick="navigateTo('guide')">Yazılı rehber (eski görünüm) ›</button>`;
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
const DUVARLAR = [['Şafak', 'Boğaz'], ['Beyaz Avlu', 'Mermer revaklar'], ['Taşın İzinde', 'Selçuklu kapısı'], ['Yeşil Huzur', 'Göl kıyısı'], ['Altın Saat', 'Kubbeler'],
  ['Gün Batımı', 'Boğaz'], ['Mavi Saat', 'Akşam'], ['Yatsı', 'Gece'], ['Yağmur Sonrası', 'Avlu'], ['Kemerli Avlu', 'Revak']];
const DUVAR_SURE = [['', 'Sade (yazısız)'], ['Fâtiha', 'Fâtiha Sûresi'], ['İhlâs', 'İhlâs Sûresi'], ['Kevser', 'Kevser Sûresi'], ['Felâk', 'Felâk Sûresi'], ['Nâs', 'Nâs Sûresi'], ['Asr', 'Asr Sûresi']];
let _dv = { i: 0, s: '' };
function renderDuvar() {
  const c = $('duvar-content'); if (!c) return;
  c.innerHTML = `
    <div class="dv-izgara">${DUVARLAR.map((d, i) => `<button class="${i === _dv.i ? 'on' : ''}" onclick="hvDvSec(${i})" style="background-image:url(img/duvar_${String(i + 1).padStart(2, '0')}.jpg)"><span>${esc(d[0])}</span></button>`).join('')}</div>
    <div class="yh-grup">Üzerine sûre yazılsın mı?</div>
    <div class="yh-cip">${DUVAR_SURE.map(s => `<button class="${s[0] === _dv.s ? 'on' : ''}" onclick="hvDvSure('${s[0]}')">${esc(s[1])}</button>`).join('')}</div>
    <div class="dv-onizle"><canvas id="dv-canvas" width="540" height="960"></canvas></div>
    <button class="an-basla" onclick="hvDvKaydet()">Telefonuma kaydet / paylaş</button>
    <div class="info-note">Kaydettikten sonra telefonunun Ayarlar → Duvar Kâğıdı bölümünden ana ekrana ya da kilit ekranına koyabilirsin.</div>`;
  duvarCiz($('dv-canvas'), 540, 960);
}
function sarMetin(ctx, metin, x, y, gen, sat, rtl) {
  const kel = String(metin || '').split(/\s+/); let s = ''; const satirlar = [];
  kel.forEach(k => { const t = s ? s + ' ' + k : k; if (ctx.measureText(t).width > gen && s) { satirlar.push(s); s = k; } else s = t; });
  if (s) satirlar.push(s);
  satirlar.forEach((l, i) => ctx.fillText(l, x, y + i * sat));
  return satirlar.length * sat;
}
function duvarCiz(cv, W, H) {
  return new Promise((res) => {
    if (!cv) return res(null);
    const ctx = cv.getContext('2d'); const im = new Image();
    im.onload = () => {
      const o = Math.max(W / im.width, H / im.height); const w = im.width * o, h = im.height * o;
      ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
      const s = _dv.s ? kisaSure(_dv.s) : null;
      if (s) {
        const gr = ctx.createLinearGradient(0, H * 0.35, 0, H); gr.addColorStop(0, 'rgba(10,6,3,0)'); gr.addColorStop(.35, 'rgba(10,6,3,.55)'); gr.addColorStop(1, 'rgba(10,6,3,.85)');
        ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
        const f = W / 540; let y = H * 0.50;
        ctx.textAlign = 'center'; ctx.fillStyle = '#f6dca6'; ctx.font = `600 ${26 * f}px Lora, Georgia, serif`; ctx.fillText(s.ad, W / 2, y); y += 40 * f;
        ctx.fillStyle = '#fff'; ctx.font = `${24 * f}px Amiri, 'Amiri Quran', serif`; ctx.direction = 'rtl';
        y += sarMetin(ctx, s.ar.replace(/۝/g, '۞'), W / 2, y, W * 0.84, 40 * f) + 14 * f; ctx.direction = 'ltr';
        ctx.fillStyle = '#f3e4c8'; ctx.font = `italic ${15 * f}px Lora, Georgia, serif`;
        y += sarMetin(ctx, s.ok, W / 2, y, W * 0.84, 22 * f) + 12 * f;
        ctx.fillStyle = 'rgba(255,255,255,.82)'; ctx.font = `${13 * f}px Lora, Georgia, serif`;
        sarMetin(ctx, s.tr, W / 2, y, W * 0.84, 19 * f);
        ctx.fillStyle = 'rgba(246,220,166,.8)'; ctx.font = `${12 * f}px Lora, Georgia, serif`; ctx.fillText('Namaz Dostu · Oku • Anla • Hatırla', W / 2, H - 34 * f);
      }
      res(cv);
    };
    im.onerror = () => res(cv);
    im.src = `img/duvar_${String(_dv.i + 1).padStart(2, '0')}.jpg`;
  });
}
window.hvDvSec = (i) => { _dv.i = i; renderDuvar(); };
window.hvDvSure = (s) => { _dv.s = s; renderDuvar(); };
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
function ezYeniCiz() {
  const kok = $('ezber-root'); if (!kok || typeof HV_SURE_NO === 'undefined') return;
  try { if (typeof hvEzSesDurdur === 'function') hvEzSesDurdur(); } catch (e) {}
  try { hvEzKayit = null; } catch (e) {}
  const ogr = (tur, ad) => (typeof hvEzOgrenildiMi === 'function') && hvEzOgrenildiMi((tur + '_' + ad).replace(/\s+/g, '_'));
  const sureler = Object.keys(HV_SURE_NO);
  const kuranDua = Object.keys(typeof HV_DUA_AYET !== 'undefined' ? HV_DUA_AYET : {});
  const namazDua = (typeof DUA_LEARN !== 'undefined' ? DUA_LEARN : []).map(d => d.title).filter(t => !(typeof HV_DUA_AYET !== 'undefined' && HV_DUA_AYET[t]));
  const namazda = [['sure', 'Fâtiha Sûresi']].concat(namazDua.map(t => ['dua', t]), [['sure', 'İhlâs Sûresi'], ['sure', 'Kevser Sûresi'], ['sure', 'Fîl Sûresi'], ['sure', 'Felâk Sûresi'], ['sure', 'Nâs Sûresi']]).filter(x => x[0] !== 'sure' || HV_SURE_NO[x[1]]);
  const L = { namaz: namazda, sure: sureler.map(t => ['sure', t]), kuran: kuranDua.map(t => ['kurandua', t]) }[_ezSekme] || namazda;
  const hepsi = namazda.concat(sureler.map(t => ['sure', t]), kuranDua.map(t => ['kurandua', t]));
  const tekil = {}; hepsi.forEach(x => { tekil[x[0] + x[1]] = x; });
  const toplam = Object.keys(tekil).length; const bilinen = Object.values(tekil).filter(x => ogr(x[0], x[1])).length;
  const kisalt = (ad) => ad.replace(/ Sûresi$/, '').replace(/ Duası$/, '').replace(/ Duaları$/, '').replace(/ \(Selamdan Sonra\)/, '');
  const alt = (tur, ad) => tur === 'sure' ? 'Sûresi' : /Duaları/.test(ad) ? 'Duaları' : /Duası/.test(ad) ? 'Duası' : tur === 'kurandua' ? "Kur'an'dan" : /Tesbih/.test(ad) ? 'Selamdan sonra' : 'Dua';
  kok.innerHTML = `
    <div class="yh-bas"><h2>Dua &amp; Sûre Öğren</h2><p>Dokun, tamamı tek sayfada açılsın</p></div>
    <div class="ez-hoca-ust">${typeof hvOgrenQariSecim === 'function' ? hvOgrenQariSecim('hvEzHocaDegistir') : ''}</div>
    <div class="yn-seg">${[['namaz', 'Namazda'], ['sure', 'Sûreler'], ['kuran', "Kur'an Duaları"]].map(t => `<button class="${t[0] === _ezSekme ? 'on' : ''}" onclick="hvEzSekme('${t[0]}')">${t[1]}</button>`).join('')}</div>
    <div class="ez-ilerle"><div><small>İlerlemen</small><b>${bilinen} / ${toplam} ezberlendi</b></div><span><i style="width:${toplam ? Math.round(bilinen / toplam * 100) : 0}%"></i></span></div>
    <div class="ez-yeni">${L.map((x, i) => `<button class="ez-k ${ogr(x[0], x[1]) ? 'ok' : ''}" onclick="hvEzAc('${x[0]}','${x[1].replace(/'/g, "\\'")}')"><span class="ez-kf" style="background-image:url(img/kucuk_${String((i % 10) + 1).padStart(2, '0')}.jpg)"></span><span class="ez-km"><b>${esc(kisalt(x[1]))}</b><small>${alt(x[0], x[1])}</small></span><span class="ez-ki">${ogr(x[0], x[1]) ? '✓' : '›'}</span></button>`).join('')}</div>
    <div class="ez-alt-not">✓ ezberlediklerin · dokun, tek sayfada açılsın</div>`;
  try { if (typeof hvEzBasaSar === 'function') hvEzBasaSar(); } catch (e) {}
}
window.hvEzSekme = (t) => { _ezSekme = t; ezYeniCiz(); };
window.renderEzber = ezYeniCiz;
rota('ezber', ezYeniCiz);

/* ═════════════════════════ v67.2 · KUR'AN OKU sayfasına kısayollar + Önemli Sûreler ═════════════════════════ */
function kuranEkle() {
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
    const r = _eskiNav.apply(this, arguments);
    try {
      const sec = $('page-' + id);
      if (id === 'quran') kuranEkle();
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

})();
