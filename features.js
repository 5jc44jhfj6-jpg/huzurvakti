/* ========================================================
   Namaz Dostu - Yeni Özellik Mantığı (features.js)
   Mevcut app.js'i değiştirmez; navigateTo() içindeki
   window.FEATURE_ROUTES kancasını kullanır.
   ======================================================== */

/* ══════════ YARDIMCILAR ══════════ */
function hvEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function hvToast(title, msg) {
  if (typeof showToastNotification === 'function') showToastNotification(title, msg);
}
// Aranan kelimeyi metin içinde <mark> ile vurgular (XSS güvenli: her parça escape edilir)
function hvHighlight(text, q) {
  const raw = String(text == null ? '' : text);
  if (!q) return hvEsc(raw);
  const ql = q.toLocaleLowerCase('tr');
  const lower = raw.toLocaleLowerCase('tr');
  let out = '', i = 0;
  if (lower.length !== raw.length) return hvEsc(raw); // güvenlik: uzunluk kayması varsa vurgulama
  while (true) {
    const idx = lower.indexOf(ql, i);
    if (idx === -1) { out += hvEsc(raw.slice(i)); break; }
    out += hvEsc(raw.slice(i, idx)) + '<mark class="hl">' + hvEsc(raw.slice(idx, idx + ql.length)) + '</mark>';
    i = idx + ql.length;
  }
  return out;
}
function hvVibrate(pattern) {
  if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} }
}
function hvLoad(key, def) {
  try { const v = localStorage.getItem('hv_' + key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
}
function hvSave(key, val) {
  try { localStorage.setItem('hv_' + key, JSON.stringify(val)); } catch (e) {}
}
function hvTodayKey(d) {
  const t = d || new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
}
function hvDayIndex(len) {
  // Yıl içindeki güne göre sabit indeks (aynı gün aynı içerik)
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const day = Math.floor(diff / 86400000);
  return len ? (day % len) : 0;
}

// Paylaşılan her metnin altına düşen imza (uygulamanın kendini yayması için)
const HV_SHARE_SIG = "\n\n\ud83c\udf19 Namaz Dostu \u2014 namaz vakitleri, ezan, Kur'an, k\u0131ble\nhttps://huzurvaktinamazuygulamasi.vercel.app";

// Paylaşım: Web Share API varsa onu, yoksa WhatsApp'ı kullanır
function hvShareText(text) {
  // Eski satır sonu imzalarını temizle, tek tip imzayı ekle
  const body = String(text || '')
    .replace(/\s*Namaz Dostu\s*\ud83c\udf19\s*$/u, '')
    .replace(/\s*[\u2014-]\s*Namaz Dostu\s*$/u, '')
    .replace(/\s+$/, '');
  const full = body + HV_SHARE_SIG;
  if (navigator.share) {
    navigator.share({ title: 'Namaz Dostu', text: full }).catch(() => {});
  } else {
    const url = 'https://wa.me/?text=' + encodeURIComponent(full);
    window.open(url, '_blank');
  }
}

/* ══════════ HADİS HAVUZU (1000+) ══════════
   HADITHS (41) + KIRK_HADIS (100) + HADIS_HAVUZU (900+) → tek liste,
   tekrarlar metne göre ayıklanır. Ortak biçim: { text, source, ar } */
let _hvAllHadis = null;
function hvAllHadis() {
  if (_hvAllHadis) return _hvAllHadis;
  const seen = new Set();
  const out = [];
  const norm = (s) => String(s || '').toLocaleLowerCase('tr').replace(/[^a-zçğıöşü0-9]+/gi, '').slice(0, 80);
  const push = (text, source, ar) => {
    if (!text) return;
    const k = norm(text);
    if (seen.has(k)) return;
    seen.add(k);
    out.push({ text: String(text), source: source || 'Hadis-i Şerif', ar: ar || '' });
  };
  if (typeof HADITHS !== 'undefined') HADITHS.forEach(h => push(h.text, h.source, h.ar));
  if (typeof KIRK_HADIS !== 'undefined') KIRK_HADIS.forEach(h => push(h.text, h.source, h.ar));
  if (typeof HADIS_HAVUZU !== 'undefined') HADIS_HAVUZU.forEach(h => push(h.t, h.s, h.a));
  _hvAllHadis = out;
  return out;
}
window.hvAllHadis = hvAllHadis;

/* ══════════ GÜNÜN HADİSİ ══════════
   Her açılışta rastgele bir hadis (bir öncekiyle aynı olmaz);
   karta dokununca da yenisi gelir. */
function hvPickHadis() {
  const all = hvAllHadis();
  if (!all.length) return null;
  let last = -1;
  try { last = parseInt(localStorage.getItem('hv_last_hadis_idx') || '-1', 10); } catch (e) {}
  let idx = Math.floor(Math.random() * all.length);
  if (all.length > 1 && idx === last) idx = (idx + 1 + Math.floor(Math.random() * (all.length - 1))) % all.length;
  try { localStorage.setItem('hv_last_hadis_idx', String(idx)); } catch (e) {}
  return all[idx];
}
function hvRenderHadis(h, animate) {
  if (!h) return;
  const card = document.getElementById('daily-hadis-card');
  const arEl = document.getElementById('daily-hadis-arabic');
  const txtEl = document.getElementById('daily-hadis-text');
  const srcEl = document.getElementById('daily-hadis-source');
  const apply = () => {
    if (arEl) { arEl.textContent = h.ar || ''; arEl.style.display = h.ar ? '' : 'none'; }
    if (txtEl) txtEl.textContent = '"' + h.text + '"';
    if (srcEl) srcEl.textContent = '— ' + h.source;
  };
  if (animate && card) {
    card.classList.add('hadis-swap');
    setTimeout(() => { apply(); card.classList.remove('hadis-swap'); }, 180);
  } else apply();
  window._currentHadis = h;
}
function loadDailyHadis() {
  hvRenderHadis(hvPickHadis(), false);
}
function nextDailyHadis() {
  hvRenderHadis(hvPickHadis(), true);
  if (typeof hvVibrate === 'function') hvVibrate(12);
}
window.nextDailyHadis = nextDailyHadis;
function shareDailyHadis(ev) {
  if (ev && ev.stopPropagation) ev.stopPropagation();
  const h = window._currentHadis || hvPickHadis();
  if (!h) return;
  hvOpenShareCard({
    badge: '📿 Günün Hadisi',
    arabic: h.ar || '',
    text: h.text,
    source: h.source,
    fallbackText: `📿 Günün Hadisi\n\n"${h.text}"\n— ${h.source}`
  });
}
window.shareDailyHadis = shareDailyHadis;

/* ══════════ GÜNÜN ÂYETİ (v61.8) ══════════
   Ana ekrandaki kart. Yol gösterici 60 âyetlik havuzdan seçer;
   üst üste aynısı gelmez, karta dokununca yenisi gelir.
   (Hadis kartının kodu duruyor; hadisler 1000 Hadis bölümünde.) */
/* Ana ekran kartına çıkacak âyetler — elle seçildi.
   Ölçüt: tek başına anlaşılır (öncesi/sonrası gerekmez), yol gösterici,
   paylaşmaya uygun ve karta sığacak uzunlukta.
   Havuzun tamamı (60 âyet) DAILY_VERSES içinde durmaya devam eder. */
const HV_KART_AYET = [
  '16:90', '2:152', '3:139', '94:5', '13:28', '14:7', '39:53', '67:1',
  '23:1', '10:62', '20:14', '31:17', '73:8', '25:74', '59:22', '42:19',
  '2:153', '6:160', '7:31', '7:199', '8:46', '11:114', '16:97', '16:128',
  '17:37', '17:53', '20:114', '22:77', '23:96', '31:18', '41:34', '42:40',
  '53:39', '55:60', '64:16', '93:9', '2:110', '2:156', '2:172', '2:195',
  '2:263', '2:271', '2:277', '2:280', '3:31', '3:92', '3:104', '3:134',
  '4:86', '4:110', '4:149', '5:35', '7:55', '7:56', '7:180', '7:204',
  '8:2', '8:29', '9:119', '10:57', '11:112', '14:34', '14:40', '16:18',
  '16:53', '16:125', '17:26', '17:36', '17:70', '17:80', '18:46', '19:96',
  '20:132', '21:107', '22:32', '23:118', '25:63', '25:72', '26:80', '28:83',
  '29:2', '29:6', '29:69', '30:60', '31:19', '33:41', '34:39', '35:5',
  '35:15', '36:82', '40:60', '41:33', '42:43', '45:15', '46:13', '47:7',
  '49:6', '49:10', '50:16', '51:56', '55:9', '57:23', '59:18', '60:8',
  '61:3', '62:10', '63:9', '64:11', '74:38', '76:8', '79:40', '87:14',
  '90:17', '92:5', '93:11', '96:1', '98:5', '102:1', '109:6'
];
function hvAyetSec() {
  const hepsi = (typeof DAILY_VERSES !== 'undefined') ? DAILY_VERSES : [];
  let all = hepsi.filter(v => HV_KART_AYET.indexOf(v.surahNumber + ':' + v.ayah) >= 0);
  if (all.length < 10) all = hepsi;
  if (!all.length) return null;
  let son = -1;
  try { son = parseInt(localStorage.getItem('hv_son_ayet_idx') || '-1', 10); } catch (e) {}
  let i = Math.floor(Math.random() * all.length);
  if (all.length > 1 && i === son) i = (i + 1 + Math.floor(Math.random() * (all.length - 1))) % all.length;
  try { localStorage.setItem('hv_son_ayet_idx', String(i)); } catch (e) {}
  return all[i];
}
function hvAyetCiz(v, animasyon) {
  if (!v) return;
  const kart = document.getElementById('daily-ayet-card');
  const ar   = document.getElementById('daily-verse-arabic');
  const tr   = document.getElementById('daily-verse-turkish');
  const src  = document.getElementById('daily-verse-source');
  const uygula = () => {
    // Uzun âyetlerde Arapça kutuyu şişirip düzeni bozuyor; kartta yalnızca
    // kısa olanlarda gösterilir. Paylaşım kartında Arapça her zaman vardır.
    const kisaAr = (v.arabic || '').length <= 70;
    if (ar) { ar.textContent = kisaAr ? v.arabic : ''; ar.style.display = kisaAr ? '' : 'none'; }
    // Diyanet metni zaten tırnakla başlıyorsa ikinci tırnağı ekleme
    const met = (v.turkish || '').trim();
    const tirnakli = /[“”"«»]/.test(met);   // metinde zaten tırnak varsa ekleme
    if (tr)  tr.textContent  = tirnakli ? met : ('"' + met + '"');
    if (src) src.textContent = '— ' + v.surah + ' Sûresi, ' + v.ayah + '. Âyet';
  };
  if (animasyon && kart) {
    kart.classList.add('hadis-swap');
    setTimeout(() => { uygula(); kart.classList.remove('hadis-swap'); }, 180);
  } else uygula();
  window._currentAyet = v;
}
function loadDailyAyet() { hvAyetCiz(hvAyetSec(), false); }
window.loadDailyAyet = loadDailyAyet;
function nextDailyAyet() {
  hvAyetCiz(hvAyetSec(), true);
  if (typeof hvVibrate === 'function') hvVibrate(12);
}
window.nextDailyAyet = nextDailyAyet;

function shareDailyVerse(ev) {
  if (ev && ev.stopPropagation) ev.stopPropagation();
  const v = window._currentAyet;
  const tr = document.getElementById('daily-verse-turkish');
  const src = document.getElementById('daily-verse-source');
  const metin  = v ? v.turkish : (tr ? (tr.textContent || '').replace(/^"|"$/g, '').trim() : '');
  const kaynak = v ? (v.surah + ' Sûresi, ' + v.ayah + '. Âyet')
                   : (src ? (src.textContent || '').replace(/^[\s—-]+/, '').trim() : '');
  hvOpenShareCard({
    badge: '📖 Günün Âyeti',
    arabic: v ? v.arabic : '',   // paylaşımda Arapça her zaman tam
    text: metin,
    source: kaynak,
    fallbackText: `📖 Günün Âyeti\n\n"${metin}"\n— ${kaynak}`
  });
}
window.shareDailyVerse = shareDailyVerse;

/* ══════════ ÖNEMLİ SURELER ══════════ */
function renderOnemliSureler() {
  const c = document.getElementById('onemli-sureler-content');
  if (!c || typeof ONEMLI_SURELER === 'undefined') return;
  c.innerHTML = ONEMLI_SURELER.map(s => `
    <div class="feature-card onemli-card" onclick="openSurahById(${s.id})">
      <div class="onemli-head">
        <span class="onemli-badge">${s.id}</span>
        <span class="fc-title">${hvEsc(s.name)} Suresi</span>
        <span class="onemli-go">›</span>
      </div>
      <div class="fc-tr">${hvEsc(s.fazilet)}</div>
    </div>
  `).join('');
}
function openSurahById(id) {
  navigateTo('quran');
  const s = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS.find(x => (x.id || x.number) === id) : null;
  setTimeout(() => { if (typeof loadSurahDetail === 'function') loadSurahDetail(id, s); }, 40);
}
window.openSurahById = openSurahById;

/* ══════════ DUA ÖĞRENME (Namaz Duaları + Namazda Okunan Sureler + Arama) ══════════ */
function renderDuaOgrenme(filter) {
  const c = document.getElementById('dua-ogrenme-content');
  if (!c || typeof DUA_LEARN === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const match = d => !q || d.title.toLocaleLowerCase('tr').includes(q) || (d.turkish || '').toLocaleLowerCase('tr').includes(q) || (d.okunusu || '').toLocaleLowerCase('tr').includes(q);
  const cardHtml = (d, icon) => `
    <div class="feature-card">
      <div class="fc-title">${icon} ${hvEsc(d.title)}</div>
      <div class="fc-ar">${d.arabic}</div>
      <div class="fc-ok">🗣️ <b>Okunuşu:</b> ${hvEsc(d.okunusu)}</div>
      <div class="fc-tr">📖 <b>Anlamı:</b> ${hvEsc(d.turkish)}</div>
      ${d.note ? `<div class="fc-note">💡 ${hvEsc(d.note)}</div>` : ''}
    </div>`;
  const duas = DUA_LEARN.filter(match);
  const sureler = (typeof KISA_SURELER !== 'undefined' ? KISA_SURELER : []).filter(match);
  let html = '';
  if (duas.length) html += `<div class="section-mini-title">📿 Namaz Duaları</div>` + duas.map(d => cardHtml(d, '🤲')).join('');
  if (sureler.length) html += `<div class="section-mini-title">📖 Namazda Okunan Sureler (Zamm-ı Sure)</div>` + sureler.map(d => cardHtml(d, '📖')).join('');
  if (!html) html = '<div class="empty-note">Sonuç bulunamadı.</div>';
  c.innerHTML = html;
}

/* ══════════ ESMAÜL HÜSNA ══════════ */
function renderEsma(filter) {
  const c = document.getElementById('esma-content');
  if (!c || typeof ESMA_UL_HUSNA === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const list = q ? ESMA_UL_HUSNA.filter(e => e.tr.toLocaleLowerCase('tr').includes(q) || e.meaning.toLocaleLowerCase('tr').includes(q)) : ESMA_UL_HUSNA;
  if (!list.length) { c.innerHTML = '<div class="empty-note">Sonuç bulunamadı.</div>'; return; }
  c.innerHTML = `<div class="esma-grid">${list.map(e => `
    <div class="esma-item">
      <div class="esma-top"><span class="esma-no">${e.no}</span><span class="esma-ar">${e.ar}</span></div>
      <div class="esma-tr">${hvEsc(e.tr)}</div>
      <div class="esma-mean">${hvEsc(e.meaning)}</div>
    </div>`).join('')}</div>`;
}

/* ══════════ SABAH / AKŞAM EZKÂRI ══════════ */
let _ezkarMode = 'sabah';
function switchEzkar(mode) {
  _ezkarMode = mode;
  document.querySelectorAll('#ezkar-switch .seg-btn').forEach(b => b.classList.remove('active'));
  const btns = document.querySelectorAll('#ezkar-switch .seg-btn');
  if (mode === 'sabah' && btns[0]) btns[0].classList.add('active');
  if (mode === 'aksam' && btns[1]) btns[1].classList.add('active');
  renderEzkar();
}
window.switchEzkar = switchEzkar;
function renderEzkar() {
  const c = document.getElementById('ezkar-content');
  if (!c) return;
  const list = _ezkarMode === 'aksam' ? EZKAR_AKSAM : EZKAR_SABAH;
  if (!list) return;
  c.innerHTML = list.map(z => `
    <div class="feature-card">
      <div class="fc-title">${hvEsc(z.title)} <span class="count-badge">${z.count}×</span></div>
      <div class="fc-ar">${z.arabic}</div>
      <div class="fc-ok">🗣️ ${hvEsc(z.okunusu)}</div>
      <div class="fc-tr">${hvEsc(z.turkish)}</div>
    </div>
  `).join('');
}

/* ══════════ GÜNLÜK DUALAR ══════════ */
function renderGunlukDua(filter) {
  const c = document.getElementById('gunluk-dua-content');
  if (!c || typeof GUNLUK_DUALAR === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const list = q ? GUNLUK_DUALAR.filter(d => d.title.toLocaleLowerCase('tr').includes(q) || (d.tag || '').toLocaleLowerCase('tr').includes(q)) : GUNLUK_DUALAR;
  if (!list.length) { c.innerHTML = '<div class="empty-note">Sonuç bulunamadı.</div>'; return; }
  c.innerHTML = list.map(d => `
    <div class="feature-card">
      <div class="fc-title">📔 ${hvEsc(d.title)}</div>
      <div class="fc-ar">${d.arabic}</div>
      <div class="fc-ok">🗣️ ${hvEsc(d.okunusu)}</div>
      <div class="fc-tr">${hvEsc(d.turkish)}</div>
    </div>
  `).join('');
}

/* ══════════ ZİKİRMATİK ══════════ */
const ZIKIR_PRESETS = [
  { key: 'subhanallah', label: 'Sübhanallah', ar: 'سُبْحَانَ اللّٰه', target: 33 },
  { key: 'elhamdulillah', label: 'Elhamdülillah', ar: 'اَلْحَمْدُ لِلّٰه', target: 33 },
  { key: 'allahuekber', label: 'Allahu Ekber', ar: 'اَللّٰهُ اَكْبَر', target: 33 },
  { key: 'serbest', label: 'Serbest Sayaç', ar: 'لَا إِلٰهَ إِلَّا اللّٰه', target: 0 }
];
let _zikirActive = 0;
let _zikirCount = 0;
function renderZikirmatik() {
  const c = document.getElementById('zikirmatik-content');
  if (!c) return;
  if (!c.dataset.built) {
    c.dataset.built = '1';
    c.innerHTML = `
      <div class="zikir-presets" id="zikir-presets"></div>
      <div class="zikir-display">
        <div class="zikir-ar" id="zikir-ar"></div>
        <div class="zikir-label" id="zikir-label"></div>
        <div class="zikir-count" id="zikir-count">0</div>
        <div class="zikir-target" id="zikir-target"></div>
      </div>
      <button class="zikir-btn-main" id="zikir-btn-main" onclick="zikirTap()">
        <span class="zikir-tap-icon">📿</span><span>ÇEK</span>
      </button>
      <div class="zikir-actions">
        <button class="zikir-mini-btn" onclick="zikirReset()">🔄 Sıfırla</button>
        <button class="zikir-mini-btn" onclick="zikirToggleVibrate()" id="zikir-vib-btn"></button>
      </div>
      <div class="info-note" id="zikir-total-note"></div>`;
    const pw = document.getElementById('zikir-presets');
    pw.innerHTML = ZIKIR_PRESETS.map((p, i) => `<button class="zikir-preset" data-i="${i}" onclick="zikirSelect(${i})">${p.label}</button>`).join('');
  }
  zikirSelect(_zikirActive, true);
  updateZikirVibBtn();
  updateZikirTotalNote();
}
function zikirSelect(i, keep) {
  _zikirActive = i;
  if (!keep) _zikirCount = 0;
  else _zikirCount = hvLoad('zikir_c_' + ZIKIR_PRESETS[i].key, 0);
  document.querySelectorAll('.zikir-preset').forEach(b => b.classList.toggle('active', parseInt(b.dataset.i) === i));
  const p = ZIKIR_PRESETS[i];
  const arEl = document.getElementById('zikir-ar');
  const lbl = document.getElementById('zikir-label');
  const tgt = document.getElementById('zikir-target');
  if (arEl) arEl.textContent = p.ar;
  if (lbl) lbl.textContent = p.label;
  if (tgt) tgt.textContent = p.target ? `Hedef: ${p.target}` : 'Serbest';
  updateZikirCountUI();
}
window.zikirSelect = zikirSelect;
function zikirTap() {
  _zikirCount++;
  const p = ZIKIR_PRESETS[_zikirActive];
  hvSave('zikir_c_' + p.key, _zikirCount);
  let total = hvLoad('zikir_total', 0) + 1;
  hvSave('zikir_total', total);
  if (hvLoad('zikir_vibrate', true)) hvVibrate(20);
  if (p.target && _zikirCount % p.target === 0) {
    hvVibrate([120, 60, 120]);
    hvToast('📿 Tamamlandı', `${p.label} ${_zikirCount} defa çekildi.`);
  }
  updateZikirCountUI();
  updateZikirTotalNote();
}
window.zikirTap = zikirTap;
function updateZikirCountUI() {
  const el = document.getElementById('zikir-count');
  if (el) el.textContent = _zikirCount;
  const p = ZIKIR_PRESETS[_zikirActive];
  const tgt = document.getElementById('zikir-target');
  if (tgt && p.target) {
    const set = Math.floor(_zikirCount / p.target);
    tgt.textContent = `Hedef: ${p.target}  •  Tur: ${set}`;
  }
}
function zikirReset() {
  _zikirCount = 0;
  hvSave('zikir_c_' + ZIKIR_PRESETS[_zikirActive].key, 0);
  updateZikirCountUI();
  hvToast('🔄 Sıfırlandı', 'Sayaç sıfırlandı.');
}
window.zikirReset = zikirReset;
function zikirToggleVibrate() {
  const v = !hvLoad('zikir_vibrate', true);
  hvSave('zikir_vibrate', v);
  updateZikirVibBtn();
}
window.zikirToggleVibrate = zikirToggleVibrate;
function updateZikirVibBtn() {
  const b = document.getElementById('zikir-vib-btn');
  if (b) b.textContent = hvLoad('zikir_vibrate', true) ? '📳 Titreşim: Açık' : '📴 Titreşim: Kapalı';
}
function updateZikirTotalNote() {
  const n = document.getElementById('zikir-total-note');
  if (n) n.textContent = `Toplam çekilen zikir: ${hvLoad('zikir_total', 0)}`;
}

/* ══════════ NAMAZ TAKİBİ ══════════ */
const NAMAZ_VAKITLERI = [
  { key: 'sabah', label: 'Sabah' },
  { key: 'ogle', label: 'Öğle' },
  { key: 'ikindi', label: 'İkindi' },
  { key: 'aksam', label: 'Akşam' },
  { key: 'yatsi', label: 'Yatsı' }
];
function renderNamazTakibi() {
  const c = document.getElementById('namaz-takibi-content');
  if (!c) return;
  const data = hvLoad('namaz_takip', {});
  const today = hvTodayKey();
  const t = data[today] || {};
  const doneToday = NAMAZ_VAKITLERI.filter(v => t[v.key]).length;

  // Bugünkü işaretleme
  let rows = NAMAZ_VAKITLERI.map(v => `
    <button class="prayer-check-row ${t[v.key] ? 'checked' : ''}" onclick="toggleNamaz('${v.key}')">
      <span class="pc-label">${v.label}</span>
      <span class="pc-box">${t[v.key] ? '✓' : ''}</span>
    </button>`).join('');

  // Haftalık grid (son 7 gün)
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = hvTodayKey(d);
    const rec = data[key] || {};
    const cnt = NAMAZ_VAKITLERI.filter(v => rec[v.key]).length;
    days.push({ label: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][d.getDay()], cnt, full: cnt === 5, isToday: i === 0 });
  }
  const streak = calcNamazStreak(data);

  c.innerHTML = `
    <div class="takip-summary">
      <div class="ts-big">${doneToday}/5</div>
      <div class="ts-label">Bugün kılınan vakit</div>
    </div>
    <div class="prayer-check-list">${rows}</div>
    <div class="streak-box">🔥 <b>${streak}</b> günlük seri (kesintisiz 5 vakit)</div>
    <div class="section-mini-title">📅 Son 7 Gün</div>
    <div class="week-grid">
      ${days.map(d => `<div class="week-day ${d.full ? 'full' : ''} ${d.isToday ? 'today' : ''}">
        <div class="wd-label">${d.label}</div>
        <div class="wd-dot">${d.cnt}</div>
      </div>`).join('')}
    </div>`;
}
function toggleNamaz(key) {
  const data = hvLoad('namaz_takip', {});
  const today = hvTodayKey();
  if (!data[today]) data[today] = {};
  data[today][key] = !data[today][key];
  hvSave('namaz_takip', data);
  renderNamazTakibi();
  hvVibrate(15);
}
window.toggleNamaz = toggleNamaz;
function calcNamazStreak(data) {
  let streak = 0;
  const d = new Date();
  // Bugün tamamlanmadıysa dünden başla
  const todayRec = data[hvTodayKey(d)] || {};
  const todayFull = NAMAZ_VAKITLERI.every(v => todayRec[v.key]);
  if (!todayFull) d.setDate(d.getDate() - 1);
  for (let i = 0; i < 400; i++) {
    const rec = data[hvTodayKey(d)] || {};
    if (NAMAZ_VAKITLERI.every(v => rec[v.key])) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

/* ══════════ KAZA NAMAZI TAKİBİ ══════════ */
function renderKaza() {
  const c = document.getElementById('kaza-content');
  if (!c) return;
  const data = hvLoad('kaza_takip', { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 });
  const items = [
    { key: 'sabah', label: 'Sabah' }, { key: 'ogle', label: 'Öğle' }, { key: 'ikindi', label: 'İkindi' },
    { key: 'aksam', label: 'Akşam' }, { key: 'yatsi', label: 'Yatsı' }, { key: 'vitir', label: 'Vitir' }
  ];
  const total = items.reduce((s, it) => s + (data[it.key] || 0), 0);
  c.innerHTML = `
    <div class="info-note">Kılamadığınız (kaza) namaz borcunuzu buradan takip edin. Kaza kıldıkça sayıyı azaltın.</div>
    ${items.map(it => `
      <div class="kaza-row">
        <span class="kaza-label">${it.label}</span>
        <div class="counter-group">
          <button class="counter-btn minus" onclick="kazaAdjust('${it.key}',-1)">−</button>
          <span class="counter-val" id="kaza-${it.key}">${data[it.key] || 0}</span>
          <button class="counter-btn plus" onclick="kazaAdjust('${it.key}',1)">+</button>
        </div>
      </div>`).join('')}
    <div class="kaza-total">Toplam Kaza Borcu: <b>${total}</b> vakit</div>`;
}
function kazaAdjust(key, delta) {
  const data = hvLoad('kaza_takip', { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 });
  data[key] = Math.max(0, (data[key] || 0) + delta);
  hvSave('kaza_takip', data);
  renderKaza();
  hvVibrate(15);
}
window.kazaAdjust = kazaAdjust;

/* ══════════ HATİM TAKİBİ ══════════ */
const HATIM_TOTAL_PAGES = 604;
function renderHatim() {
  const c = document.getElementById('hatim-content');
  if (!c) return;
  const page = hvLoad('hatim_page', 0);
  const pct = Math.round((page / HATIM_TOTAL_PAGES) * 100);
  const cuz = Math.min(30, Math.max(0, Math.ceil(page / 20.14)));
  c.innerHTML = `
    <div class="info-note">Kaldığınız sayfayı işaretleyerek hatim ilerlemenizi takip edin (Mushaf: 604 sayfa, 30 cüz).</div>
    <div class="hatim-stat">
      <div class="hs-item"><div class="hs-num">${page}</div><div class="hs-lbl">/ 604 Sayfa</div></div>
      <div class="hs-item"><div class="hs-num">${cuz}</div><div class="hs-lbl">/ 30 Cüz</div></div>
      <div class="hs-item"><div class="hs-num">%${pct}</div><div class="hs-lbl">Tamamlandı</div></div>
    </div>
    <div class="hatim-bar-wrap"><div class="hatim-bar" style="width:${pct}%"></div></div>
    <div class="hatim-controls">
      <button class="counter-btn minus" onclick="hatimAdjust(-1)">− Sayfa</button>
      <button class="hatim-add-btn" onclick="hatimAdjust(1)">+ 1 Sayfa Okudum</button>
      <button class="counter-btn plus" onclick="hatimAdjust(20)">+ Cüz</button>
    </div>
    <button class="zikir-mini-btn" style="margin-top:10px;width:100%;" onclick="hatimReset()">🔄 Hatmi Sıfırla</button>
    ${page >= HATIM_TOTAL_PAGES ? '<div class="hatim-done">🎉 Hatminizi tamamladınız! Allah kabul etsin.</div>' : ''}`;
}
function hatimAdjust(delta) {
  let page = hvLoad('hatim_page', 0);
  page = Math.max(0, Math.min(HATIM_TOTAL_PAGES, page + delta));
  hvSave('hatim_page', page);
  renderHatim();
  hvVibrate(15);
  if (page >= HATIM_TOTAL_PAGES) hvToast('🎉 Tebrikler', 'Hatminizi tamamladınız!');
}
window.hatimAdjust = hatimAdjust;
function hatimReset() {
  hvSave('hatim_page', 0);
  renderHatim();
}
window.hatimReset = hatimReset;

/* ══════════ ZEKÂT HESAPLAYICI ══════════ */
const NISAB_GRAM_GOLD = 80.18; // 80.18 gr altın
function renderZekat() {
  const c = document.getElementById('zekat-content');
  if (!c) return;
  if (c.dataset.built) return;
  c.dataset.built = '1';
  c.innerHTML = `
    <div class="info-note">Zekât, temel ihtiyaçtan fazla olan ve bir yıl elde kalan mala verilir. Nisab miktarı 80.18 gr altın değeridir. Oran %2,5'tir.</div>
    <div class="calc-form">
      <div class="calc-row"><label>Gram Altın Fiyatı (₺)</label><input type="number" id="z-gold-price" class="calc-input" placeholder="Örn: 3000" oninput="calcZekat()"></div>
      <div class="calc-row"><label>Elinizdeki Altın (gram)</label><input type="number" id="z-gold-gram" class="calc-input" placeholder="Örn: 100" oninput="calcZekat()"></div>
      <div class="calc-row"><label>Nakit / Mevduat (₺)</label><input type="number" id="z-cash" class="calc-input" placeholder="Örn: 50000" oninput="calcZekat()"></div>
      <div class="calc-row"><label>Ticaret Malı / Alacak (₺)</label><input type="number" id="z-trade" class="calc-input" placeholder="Örn: 0" oninput="calcZekat()"></div>
      <div class="calc-row"><label>Borçlarınız (₺)</label><input type="number" id="z-debt" class="calc-input" placeholder="Örn: 0" oninput="calcZekat()"></div>
    </div>
    <div class="calc-result" id="zekat-result">Değerleri girin...</div>`;
}
function calcZekat() {
  const gp = parseFloat(document.getElementById('z-gold-price').value) || 0;
  const gg = parseFloat(document.getElementById('z-gold-gram').value) || 0;
  const cash = parseFloat(document.getElementById('z-cash').value) || 0;
  const trade = parseFloat(document.getElementById('z-trade').value) || 0;
  const debt = parseFloat(document.getElementById('z-debt').value) || 0;
  const res = document.getElementById('zekat-result');
  const totalWealth = (gg * gp) + cash + trade - debt;
  const nisabValue = NISAB_GRAM_GOLD * gp;
  if (gp <= 0) { res.innerHTML = 'Lütfen gram altın fiyatını girin.'; res.className = 'calc-result'; return; }
  if (totalWealth < nisabValue) {
    res.innerHTML = `Toplam servet: <b>${fmtTL(totalWealth)}</b><br>Nisab (80.18 gr altın): <b>${fmtTL(nisabValue)}</b><br><span class="calc-neg">Malınız nisabın altında olduğu için zekât gerekmez.</span>`;
    res.className = 'calc-result';
  } else {
    const zekat = totalWealth * 0.025;
    res.innerHTML = `Zekâta tabi servet: <b>${fmtTL(totalWealth)}</b><br>Nisab: <b>${fmtTL(nisabValue)}</b><hr><div class="calc-big">Vermeniz gereken zekât:<br><span class="calc-amount">${fmtTL(zekat)}</span></div>`;
    res.className = 'calc-result active';
  }
}
window.calcZekat = calcZekat;
function fmtTL(n) {
  return (Math.round(n * 100) / 100).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
}

/* ══════════ FİTRE / FİDYE HESAPLAYICI ══════════ */
function renderFitre() {
  const c = document.getElementById('fitre-content');
  if (!c) return;
  if (c.dataset.built) return;
  c.dataset.built = '1';
  c.innerHTML = `
    <div class="info-note">Fitre (Fıtır Sadakası) Ramazan'da her Müslümana vaciptir. Fidye ise tutulamayan oruç/kılınamayan namaz için verilir. Güncel birim tutarı Diyanet açıklar; aşağıya girin.</div>
    <div class="calc-form">
      <div class="calc-row"><label>Kişi Başı Fitre Tutarı (₺)</label><input type="number" id="f-fitre-birim" class="calc-input" placeholder="Örn: 150" oninput="calcFitre()"></div>
      <div class="calc-row"><label>Evdeki Kişi Sayısı</label><input type="number" id="f-kisi" class="calc-input" placeholder="Örn: 4" oninput="calcFitre()"></div>
    </div>
    <div class="calc-result" id="fitre-result">Değerleri girin...</div>
    <div class="section-mini-title" style="margin-top:16px;">🌾 Fidye Hesabı</div>
    <div class="calc-form">
      <div class="calc-row"><label>Bir Günlük Fidye Tutarı (₺)</label><input type="number" id="f-fidye-birim" class="calc-input" placeholder="Örn: 150" oninput="calcFidye()"></div>
      <div class="calc-row"><label>Tutulamayan Oruç (gün)</label><input type="number" id="f-oruc" class="calc-input" placeholder="Örn: 10" oninput="calcFidye()"></div>
    </div>
    <div class="calc-result" id="fidye-result">Değerleri girin...</div>`;
}
function calcFitre() {
  const birim = parseFloat(document.getElementById('f-fitre-birim').value) || 0;
  const kisi = parseInt(document.getElementById('f-kisi').value) || 0;
  const res = document.getElementById('fitre-result');
  if (birim <= 0 || kisi <= 0) { res.innerHTML = 'Fitre tutarı ve kişi sayısını girin.'; res.className = 'calc-result'; return; }
  res.innerHTML = `<div class="calc-big">Toplam Fitre:<br><span class="calc-amount">${fmtTL(birim * kisi)}</span></div><div style="font-size:.8rem;opacity:.85;">${kisi} kişi × ${fmtTL(birim)}</div>`;
  res.className = 'calc-result active';
}
window.calcFitre = calcFitre;
function calcFidye() {
  const birim = parseFloat(document.getElementById('f-fidye-birim').value) || 0;
  const gun = parseInt(document.getElementById('f-oruc').value) || 0;
  const res = document.getElementById('fidye-result');
  if (birim <= 0 || gun <= 0) { res.innerHTML = 'Fidye tutarı ve gün sayısını girin.'; res.className = 'calc-result'; return; }
  res.innerHTML = `<div class="calc-big">Toplam Fidye:<br><span class="calc-amount">${fmtTL(birim * gun)}</span></div><div style="font-size:.8rem;opacity:.85;">${gun} gün × ${fmtTL(birim)}</div>`;
  res.className = 'calc-result active';
}
window.calcFidye = calcFidye;

/* ══════════ İSLAMİ BİLGİ QUİZİ ══════════ */
const QUIZ_ROUND = 10;
let _quiz = null;
function renderQuizIntro() {
  const c = document.getElementById('quiz-content');
  if (!c || typeof QUIZ_QUESTIONS === 'undefined') return;
  const best = hvLoad('quiz_best', 0);
  c.innerHTML = `
    <div class="quiz-intro">
      <div class="quiz-intro-icon">🧠</div>
      <p>Toplam <b>${QUIZ_QUESTIONS.length}</b> soruluk havuzdan rastgele <b>${QUIZ_ROUND}</b> soru sorulacak.</p>
      <div class="info-note">En yüksek skorunuz: <b>${best}/${QUIZ_ROUND}</b></div>
      <button class="gold-primary-btn" style="margin-top:14px;" onclick="quizStart()">🚀 Teste Başla</button>
    </div>`;
}
function quizStart() {
  const pool = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, QUIZ_ROUND);
  _quiz = { pool, idx: 0, score: 0, answered: false };
  quizRenderQuestion();
}
window.quizStart = quizStart;
function quizRenderQuestion() {
  const c = document.getElementById('quiz-content');
  if (!c || !_quiz) return;
  if (_quiz.idx >= _quiz.pool.length) { quizFinish(); return; }
  const q = _quiz.pool[_quiz.idx];
  c.innerHTML = `
    <div class="quiz-progress"><span>Soru ${_quiz.idx + 1}/${_quiz.pool.length}</span><span>Puan: ${_quiz.score}</span></div>
    <div class="quiz-bar-wrap"><div class="quiz-bar" style="width:${(_quiz.idx / _quiz.pool.length) * 100}%"></div></div>
    <div class="quiz-q">${hvEsc(q.q)}</div>
    <div class="quiz-opts">
      ${q.options.map((o, i) => `<button class="quiz-opt" data-i="${i}" onclick="quizAnswer(${i})">${hvEsc(o)}</button>`).join('')}
    </div>`;
  _quiz.answered = false;
}
function quizAnswer(i) {
  if (!_quiz || _quiz.answered) return;
  _quiz.answered = true;
  const q = _quiz.pool[_quiz.idx];
  const btns = document.querySelectorAll('.quiz-opt');
  btns.forEach(b => {
    const bi = parseInt(b.dataset.i);
    b.disabled = true;
    if (bi === q.answer) b.classList.add('correct');
    if (bi === i && i !== q.answer) b.classList.add('wrong');
  });
  if (i === q.answer) { _quiz.score++; hvVibrate(20); }
  else hvVibrate([60, 40, 60]);
  const c = document.getElementById('quiz-content');
  const nx = document.createElement('button');
  nx.className = 'gold-primary-btn';
  nx.style.marginTop = '14px';
  nx.style.width = '100%';
  nx.textContent = _quiz.idx + 1 >= _quiz.pool.length ? '🏁 Sonucu Gör' : 'Sonraki Soru →';
  nx.onclick = () => { _quiz.idx++; quizRenderQuestion(); };
  c.appendChild(nx);
}
window.quizAnswer = quizAnswer;
function quizFinish() {
  const c = document.getElementById('quiz-content');
  const best = Math.max(hvLoad('quiz_best', 0), _quiz.score);
  hvSave('quiz_best', best);
  let msg = _quiz.score === _quiz.pool.length ? 'Mükemmel! 🎉' : _quiz.score >= _quiz.pool.length * 0.6 ? 'Çok iyi! 👏' : 'Biraz daha çalışmalısın 💪';
  c.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">${_quiz.score >= _quiz.pool.length * 0.6 ? '🏆' : '📚'}</div>
      <div class="quiz-result-score">${_quiz.score} / ${_quiz.pool.length}</div>
      <div class="quiz-result-msg">${msg}</div>
      <div class="info-note">En yüksek skorunuz: <b>${best}/${_quiz.pool.length}</b></div>
      <button class="gold-primary-btn" style="margin-top:14px;" onclick="quizStart()">🔄 Tekrar Oyna</button>
    </div>`;
}

/* ══════════ RÜYA TABİRLERİ ══════════ */
function renderRuya(filter) {
  const c = document.getElementById('ruya-content');
  if (!c || typeof RUYA_TABIRLERI === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const list = q ? RUYA_TABIRLERI.filter(r => r.kw.toLocaleLowerCase('tr').includes(q) || r.meaning.toLocaleLowerCase('tr').includes(q)) : RUYA_TABIRLERI;
  const note = '<div class="info-note ruya-note">⚠️ Rüya tabirleri İbn Sîrîn ve Nablusî geleneğine dayanan kültürel bir derlemedir; dinî hüküm veya kesin bilgi değildir. Hayırlı rüyaları Allah\'a hamd ile, hoşa gitmeyenleri kimseye anlatmadan Allah\'a sığınarak karşılamak sünnettir.</div>';
  if (!list.length) { c.innerHTML = note + '<div class="empty-note">Bu konuda tabir bulunamadı.</div>'; return; }
  c.innerHTML = (q ? '' : note) + list.map(r => `
    <div class="ruya-item">
      <div class="ruya-kw">🌙 ${hvEsc(r.kw)}</div>
      <div class="ruya-mean">${hvEsc(r.meaning)}</div>
    </div>`).join('');
}

/* ══════════ BEBEK İSİMLERİ ══════════ */
let _bebekGender = 'all';
function switchBebek(g) {
  _bebekGender = g;
  const btns = document.querySelectorAll('#bebek-switch .seg-btn');
  btns.forEach(b => b.classList.remove('active'));
  const map = { all: 0, erkek: 1, kiz: 2 };
  if (btns[map[g]]) btns[map[g]].classList.add('active');
  const inp = document.getElementById('bebek-search-input');
  renderBebek(inp ? inp.value : '');
}
window.switchBebek = switchBebek;
function renderBebek(filter) {
  const c = document.getElementById('bebek-content');
  if (!c || typeof BEBEK_ISIMLERI === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  let list = BEBEK_ISIMLERI.filter(b => _bebekGender === 'all' || b.gender === _bebekGender);
  if (q) list = list.filter(b => b.name.toLocaleLowerCase('tr').includes(q) || b.meaning.toLocaleLowerCase('tr').includes(q));
  if (!list.length) { c.innerHTML = '<div class="empty-note">İsim bulunamadı.</div>'; return; }
  c.innerHTML = `<div class="bebek-count-note">${list.length} isim</div>` + list.map(b => `
    <div class="bebek-item">
      <div class="bebek-head">
        <span class="bebek-name">${hvEsc(b.name)}</span>
        <span class="bebek-gender-badge ${b.gender}">${b.gender === 'erkek' ? '♂ Erkek' : '♀ Kız'}</span>
      </div>
      <div class="bebek-mean">${hvEsc(b.meaning)}</div>
    </div>`).join('');
}

/* ══════════ HİCRİ TAKVİM + KANDİLLER ══════════ */
function renderTakvim() {
  const c = document.getElementById('takvim-content');
  if (!c) return;
  const hijriText = (typeof computeLocalHijriText === 'function') ? computeLocalHijriText() : (APP_STATE && APP_STATE.hijriDateText) || '';
  const gregText = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });
  const now = new Date(); now.setHours(0, 0, 0, 0);

  let upcoming = [];
  if (typeof KANDIL_GUNLERI !== 'undefined') {
    upcoming = KANDIL_GUNLERI.map(k => {
      const d = new Date(k.date + 'T00:00:00');
      const diff = Math.round((d - now) / 86400000);
      return Object.assign({}, k, { diff, dObj: d });
    }).sort((a, b) => a.dObj - b.dObj);
  }
  const future = upcoming.filter(k => k.diff >= 0);
  const past = upcoming.filter(k => k.diff < 0);

  const typeIcon = { kandil: '🕯️', bayram: '🎉', onemli: '⭐' };
  const renderItem = k => {
    let countTxt = k.diff === 0 ? 'BUGÜN' : k.diff > 0 ? `${k.diff} gün kaldı` : `${Math.abs(k.diff)} gün önce`;
    return `<div class="kandil-item ${k.diff === 0 ? 'is-today' : ''} ${k.diff < 0 ? 'is-past' : ''}">
      <div class="kandil-icon">${typeIcon[k.type] || '📌'}</div>
      <div class="kandil-body">
        <div class="kandil-name">${hvEsc(k.name)}</div>
        <div class="kandil-date">${k.dObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        <div class="kandil-desc">${hvEsc(k.desc)}</div>
      </div>
      <div class="kandil-count ${k.diff === 0 ? 'today' : ''}">${countTxt}</div>
    </div>`;
  };

  c.innerHTML = `
    <div class="hijri-today-card">
      <div class="ht-hijri">☪ ${hvEsc(hijriText || 'Hicri tarih')}</div>
      <div class="ht-greg">${gregText}</div>
    </div>
    <div class="section-mini-title">🔜 Yaklaşan Kandil ve Bayramlar</div>
    ${future.length ? future.map(renderItem).join('') : '<div class="info-note">Bu yıl için yaklaşan gün kalmadı.</div>'}
    ${past.length ? `<div class="section-mini-title" style="margin-top:14px;">📜 Geçen Günler</div>${past.map(renderItem).join('')}` : ''}
    <div class="info-note" style="margin-top:10px;">* Kandil ve bayram tarihleri yaklaşık olup Diyanet takvimine göre değişebilir.</div>`;
}

/* ══════════ PAYLAŞIM KARTLARI ══════════ */
let _paylasimData = null;
function renderPaylasim() {
  const c = document.getElementById('paylasim-content');
  if (!c) return;
  if (!c.dataset.built) {
    c.dataset.built = '1';
    c.innerHTML = `
      <div class="info-note">Rastgele bir ayet, hadis ya da cuma mesajı kartı oluşturun; WhatsApp ve sosyal medyada paylaşın.</div>
      <div class="share-type-switch">
        <button class="seg-btn active" id="pt-ayet" onclick="paylasimPick('ayet')">📖 Ayet</button>
        <button class="seg-btn" id="pt-hadis" onclick="paylasimPick('hadis')">📿 Hadis</button>
        <button class="seg-btn" id="pt-cuma" onclick="paylasimPick('cuma')">🕌 Cuma</button>
      </div>
      <div id="share-card-preview" class="share-card-preview"></div>
      <div class="share-actions">
        <button class="zikir-mini-btn" onclick="paylasimYenile()">🔄 Yenile</button>
        <button class="gold-primary-btn" onclick="paylasimPaylas()">📤 Paylaş</button>
      </div>`;
  }
  paylasimPick('ayet');
}
let _paylasimTip = 'ayet';
function paylasimPick(tip) {
  _paylasimTip = tip;
  document.getElementById('pt-ayet').classList.toggle('active', tip === 'ayet');
  document.getElementById('pt-hadis').classList.toggle('active', tip === 'hadis');
  const cb = document.getElementById('pt-cuma');
  if (cb) cb.classList.toggle('active', tip === 'cuma');
  paylasimYenile();
}
window.paylasimPick = paylasimPick;
function paylasimYenile() {
  const prev = document.getElementById('share-card-preview');
  if (_paylasimTip === 'cuma' && typeof CUMA_MESAJLARI !== 'undefined') {
    const m = CUMA_MESAJLARI[Math.floor(Math.random() * CUMA_MESAJLARI.length)];
    _paylasimData = { ar: '', tr: m, src: 'Hayırlı Cumalar' };
  } else if (_paylasimTip === 'ayet' && typeof DAILY_VERSES !== 'undefined') {
    const v = DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
    _paylasimData = { ar: v.arabic, tr: v.turkish, src: `${v.surah} Suresi, ${v.ayah}. Ayet` };
  } else if (typeof HADITHS !== 'undefined') {
    const h = HADITHS[Math.floor(Math.random() * HADITHS.length)];
    _paylasimData = { ar: h.ar || '', tr: h.text, src: h.source };
  }
  if (prev && _paylasimData) {
    prev.innerHTML = `
      <div class="scp-inner">
        <div class="scp-badge">${_paylasimTip === 'ayet' ? '📖 Ayet-i Kerime' : (_paylasimTip === 'cuma' ? '🕌 Cuma Mesajı' : '📿 Hadis-i Şerif')}</div>
        ${_paylasimData.ar ? `<div class="scp-ar">${_paylasimData.ar}</div>` : ''}
        <div class="scp-tr">"${hvEsc(_paylasimData.tr)}"</div>
        <div class="scp-src">— ${hvEsc(_paylasimData.src)}</div>
        <div class="scp-brand">🌙 Namaz Dostu</div>
      </div>`;
  }
}
window.paylasimYenile = paylasimYenile;
function paylasimPaylas() {
  if (!_paylasimData) return;
  const emoji = _paylasimTip === 'ayet' ? '📖 Ayet-i Kerime' : (_paylasimTip === 'cuma' ? '🕌 Cuma Mesajı' : '📿 Hadis-i Şerif');
  hvOpenShareCard({
    badge: emoji,
    arabic: _paylasimData.ar || '',
    text: _paylasimData.tr,
    source: _paylasimData.src,
    fallbackText: `${emoji}\n\n"${_paylasimData.tr}"\n— ${_paylasimData.src}`
  });
}
window.paylasimPaylas = paylasimPaylas;

/* ══════════ CUMA MESAJLARI ══════════ */
function renderCuma() {
  const c = document.getElementById('cuma-content');
  if (!c || typeof CUMA_MESAJLARI === 'undefined') return;
  c.innerHTML = `<div class="info-note">Bir mesaja dokunarak WhatsApp'ta paylaşabilir veya kopyalayabilirsiniz.</div>` +
    CUMA_MESAJLARI.map((m, i) => `
      <div class="cuma-msg-card">
        <div class="cuma-msg-text">${hvEsc(m)}</div>
        <div class="cuma-actions">
          <button class="cuma-act-btn" onclick="cumaKopyala(${i})">📋 Kopyala</button>
          <button class="cuma-act-btn share" onclick="cumaPaylas(${i})">📤 Paylaş</button>
        </div>
      </div>`).join('');
}
function cumaPaylas(i) {
  hvOpenShareCard({ badge: '🕌 Hayırlı Cumalar', text: CUMA_MESAJLARI[i], source: '', fallbackText: CUMA_MESAJLARI[i] });
}
window.cumaPaylas = cumaPaylas;
function cumaKopyala(i) {
  const txt = CUMA_MESAJLARI[i];
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt).then(() => hvToast('📋 Kopyalandı', 'Mesaj panoya kopyalandı.')).catch(() => {});
  } else {
    const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); hvToast('📋 Kopyalandı', 'Mesaj panoya kopyalandı.'); } catch (e) {}
    document.body.removeChild(ta);
  }
}
window.cumaKopyala = cumaKopyala;

/* ══════════ ABDEST / GUSÜL / TEYEMMÜM REHBERİ ══════════ */
let _taharetActive = 'abdest';
function switchTaharet(key) {
  _taharetActive = key;
  document.querySelectorAll('#taharet-switch .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.k === key));
  renderTaharet();
}
window.switchTaharet = switchTaharet;
function renderTaharet() {
  const c = document.getElementById('taharet-content');
  if (!c || typeof TAHARET_REHBERI === 'undefined') return;
  const g = TAHARET_REHBERI.find(t => t.key === _taharetActive) || TAHARET_REHBERI[0];
  c.innerHTML = `
    <div class="info-note">${hvEsc(g.intro)}</div>
    ${g.steps.map(s => `
      <div class="step-card">
        <div class="step-circle-num">${s.n}</div>
        <div class="step-body">
          <h4>${hvEsc(s.title)}</h4>
          <p>${hvEsc(s.desc)}</p>
        </div>
      </div>`).join('')}`;
}

/* ══════════ ÖZEL NAMAZLAR ══════════ */
function renderOzelNamazlar() {
  const c = document.getElementById('ozel-namaz-content');
  if (!c || typeof OZEL_NAMAZLAR === 'undefined') return;
  c.innerHTML = OZEL_NAMAZLAR.map(n => `
    <div class="feature-card">
      <div class="fc-title">🕌 ${hvEsc(n.title)}</div>
      <div class="ozel-ozet">${hvEsc(n.ozet)}</div>
      <div class="fc-tr">${hvEsc(n.detay)}</div>
    </div>`).join('');
}

/* ══════════ İMAN ESASLARI (ÂMENTÜ) ══════════ */
function renderImanEsaslari() {
  const c = document.getElementById('iman-content');
  if (!c || typeof IMAN_ESASLARI === 'undefined') return;
  const a = typeof AMENTU !== 'undefined' ? AMENTU : null;
  c.innerHTML = `
    ${a ? `<div class="feature-card">
      <div class="fc-title">📜 Âmentü</div>
      <div class="fc-ar">${a.arabic}</div>
      <div class="fc-ok">🗣️ <b>Okunuşu:</b> ${hvEsc(a.okunusu)}</div>
      <div class="fc-tr">📖 <b>Anlamı:</b> ${hvEsc(a.turkish)}</div>
    </div>` : ''}
    <div class="section-mini-title">İmanın 6 Şartı</div>
    ${IMAN_ESASLARI.map(i => `
      <div class="feature-card">
        <div class="fc-title">✦ ${hvEsc(i.title)}</div>
        <div class="fc-tr">${hvEsc(i.desc)}</div>
      </div>`).join('')}`;
}

/* ══════════ AYET & MEAL ARAMA (Al Quran Cloud API) ══════════ */
let _ayetAramaTimer = null;
function renderAyetArama() {
  const c = document.getElementById('ayet-arama-content');
  if (!c) return;
  if (!c.dataset.built) {
    c.dataset.built = '1';
    c.innerHTML = '<div class="info-note">Yukarıdaki kutuya bir kelime yazın (ör. sabır, namaz, rahmet). Kur\'an mealinde geçtiği ayetler listelenir.</div>';
  }
}
function doAyetArama(query) {
  const c = document.getElementById('ayet-arama-content');
  if (!c) return;
  const q = (query || '').trim();
  if (q.length < 2) { c.innerHTML = '<div class="info-note">En az 2 harf yazın.</div>'; return; }
  c.innerHTML = '<div class="info-note">🔎 Aranıyor...</div>';
  clearTimeout(_ayetAramaTimer);
  _ayetAramaTimer = setTimeout(async () => {
    const hazir = await hvMealHazir();
    if (!hazir) {
      c.innerHTML = '<div class="empty-note">Meal dosyası yüklenemedi. İnternete bağlanıp bir kez açtıktan sonra çevrimdışı da çalışır.</div>';
      return;
    }
    // Arama artık uygulamanın içindeki Diyanet meâlinde — internet gerekmez
    const ql = hvTrNorm(q);
    const bulunan = [];
    const idx = hvMealIndeks();
    for (let i = 0; i < idx.length && bulunan.length < 400; i++) {
      if (idx[i].n.indexOf(ql) >= 0) bulunan.push(idx[i]);
    }
    const total = bulunan.length;
    const goster = bulunan.slice(0, 60);
    if (total > 0) {
      c.innerHTML = `<div class="bebek-count-note">"${hvEsc(q)}" için ${total}${total >= 400 ? '+' : ''} ayet bulundu${total > 60 ? ' (ilk 60 gösteriliyor)' : ''}</div>` +
        goster.map(m => `<div class="ayet-result" onclick="openSurahById(${m.s})">
              <div class="ayet-ref">${hvEsc(m.ad)} Suresi • ${hvMealEtiket(m.s, m.v)}. Ayet <span class="ayet-go">›</span></div>
              <div class="ayet-meal">${hvHighlight(m.t, q)}</div>
            </div>`).join('');
    } else {
      c.innerHTML = '<div class="empty-note">"' + hvEsc(q) + '" kelimesini içeren ayet bulunamadı. Farklı bir kelime deneyin.</div>';
    }
  }, 300);
}

/* ══════════ 40 HADİS (İmam Nevevî) ══════════ */
/* 1000 Hadis sayfası — birleşik havuz, arama, sayfalama (performans için 100'er) */
let _hadisPage = 0;
const HADIS_PAGE_SIZE = 100;
function renderKirkHadis(filter, page) {
  const c = document.getElementById('kirk-hadis-content');
  if (!c) return;
  const all = hvAllHadis().map((h, i) => ({ no: i + 1, text: h.text, source: h.source, ar: h.ar }));
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const list = q ? all.filter(h => h.text.toLocaleLowerCase('tr').includes(q) || h.source.toLocaleLowerCase('tr').includes(q) || String(h.no) === q) : all;
  const countEl = document.getElementById('kirk-hadis-count');
  if (countEl) countEl.textContent = q ? `${list.length} sonuç (toplam ${all.length} hadis)` : `Toplam ${all.length} hadis-i şerif`;
  if (!list.length) { c.innerHTML = '<div class="empty-note">Sonuç bulunamadı.</div>'; return; }
  if (typeof page === 'number') _hadisPage = page; else if (q) _hadisPage = 0;
  const pages = Math.ceil(list.length / HADIS_PAGE_SIZE);
  if (_hadisPage >= pages) _hadisPage = pages - 1;
  if (_hadisPage < 0) _hadisPage = 0;
  const slice = list.slice(_hadisPage * HADIS_PAGE_SIZE, (_hadisPage + 1) * HADIS_PAGE_SIZE);
  const nav = pages > 1 ? `
    <div class="hadis-pager">
      <button class="gold-outline-btn" ${_hadisPage === 0 ? 'disabled' : ''} onclick="renderKirkHadis(document.getElementById('hadis-search-input') ? document.getElementById('hadis-search-input').value : '', ${_hadisPage - 1}); document.querySelector('#page-kirk-hadis .hero-frame-box').scrollTop = 0;">‹ Önceki</button>
      <span class="hadis-pager-info">${_hadisPage + 1} / ${pages}</span>
      <button class="gold-outline-btn" ${_hadisPage >= pages - 1 ? 'disabled' : ''} onclick="renderKirkHadis(document.getElementById('hadis-search-input') ? document.getElementById('hadis-search-input').value : '', ${_hadisPage + 1}); document.querySelector('#page-kirk-hadis .hero-frame-box').scrollTop = 0;">Sonraki ›</button>
    </div>` : '';
  c.innerHTML = nav + slice.map(h => `
    <div class="hadis40-card">
      <div class="hadis40-no">${h.no}</div>
      <div class="hadis40-body">
        ${h.ar ? `<div class="hadis40-ar">${hvEsc(h.ar)}</div>` : ''}
        <div class="hadis40-text">${q ? hvHighlight(h.text, q) : hvEsc(h.text)}</div>
        <div class="hadis40-src">— ${hvEsc(h.source)}</div>
      </div>
    </div>`).join('') + nav;
}
window.renderKirkHadis = renderKirkHadis;

/* ══════════ SİYER ══════════ */
function renderSiyer() {
  const c = document.getElementById('siyer-content');
  if (!c || typeof SIYER_OLAYLARI === 'undefined') return;
  c.innerHTML = `<div class="info-note">Peygamber Efendimizin (s.a.v.) hayatından önemli olaylar (Miladî).</div>
    <div class="timeline">${SIYER_OLAYLARI.map(o => `
      <div class="tl-item">
        <div class="tl-year">${hvEsc(o.yil)}</div>
        <div class="tl-body">
          <div class="tl-title">${hvEsc(o.baslik)}</div>
          <div class="tl-desc">${hvEsc(o.desc)}</div>
        </div>
      </div>`).join('')}</div>`;
}

/* ══════════ PEYGAMBERLER ══════════ */
function renderPeygamberler() {
  const c = document.getElementById('peygamberler-content');
  if (!c || typeof PEYGAMBERLER === 'undefined') return;
  c.innerHTML = `<div class="info-note">Kur'an-ı Kerim'de adı geçen 25 peygamber ve kıssaları.</div>` +
    PEYGAMBERLER.map((p, i) => `
      <div class="peygamber-card">
        <div class="peygamber-no">${i + 1}</div>
        <div class="peygamber-body">
          <div class="peygamber-head">
            <span class="peygamber-name">${hvEsc(p.name)}</span>
            ${p.lakab ? `<span class="peygamber-lakab">${hvEsc(p.lakab)}</span>` : ''}
          </div>
          <div class="peygamber-info">${hvEsc(p.info)}</div>
        </div>
      </div>`).join('');
}

/* ══════════ DİNİ SÖZLÜK ══════════ */
function renderSozluk(filter) {
  const c = document.getElementById('sozluk-content');
  if (!c || typeof DINI_SOZLUK === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const list = q ? DINI_SOZLUK.filter(t => t.term.toLocaleLowerCase('tr').includes(q) || t.meaning.toLocaleLowerCase('tr').includes(q)) : DINI_SOZLUK;
  if (!list.length) { c.innerHTML = '<div class="empty-note">Kelime bulunamadı.</div>'; return; }
  c.innerHTML = list.map(t => `
    <div class="sozluk-item">
      <div class="sozluk-term">${hvEsc(t.term)}</div>
      <div class="sozluk-mean">${hvEsc(t.meaning)}</div>
    </div>`).join('');
}

/* ══════════ RAMAZAN İMSAKİYESİ (Aladhan Calendar API) ══════════ */
let _imsakiyeDate = new Date();
function imsakiyeNav(delta) {
  _imsakiyeDate = new Date(_imsakiyeDate.getFullYear(), _imsakiyeDate.getMonth() + delta, 1);
  renderImsakiye();
}
window.imsakiyeNav = imsakiyeNav;
function trWeekdayShort(en) {
  return ({ Monday: 'Pzt', Tuesday: 'Sal', Wednesday: 'Çar', Thursday: 'Per', Friday: 'Cum', Saturday: 'Cmt', Sunday: 'Paz' })[en] || '';
}
async function renderImsakiye() {
  const c = document.getElementById('imsakiye-content');
  if (!c) return;
  const month = _imsakiyeDate.getMonth() + 1, year = _imsakiyeDate.getFullYear();
  const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const loc = (typeof APP_STATE !== 'undefined' && APP_STATE.userLocation) ? APP_STATE.userLocation : { lat: 41.01, lng: 28.97 };
  const cityLbl = (typeof APP_STATE !== 'undefined') ? `${APP_STATE.currentCity || ''}${APP_STATE.currentDistrict ? ', ' + APP_STATE.currentDistrict : ''}` : '';
  c.innerHTML = `
    <div class="imsakiye-nav">
      <button class="counter-btn minus" onclick="imsakiyeNav(-1)">‹</button>
      <div class="imsakiye-month">${monthNames[month - 1]} ${year}<div class="imsakiye-loc">📍 ${hvEsc(cityLbl)}</div></div>
      <button class="counter-btn plus" onclick="imsakiyeNav(1)">›</button>
    </div>
    <div class="info-note" id="imsakiye-loading">🔎 İmsakiye yükleniyor...</div>`;
  try {
    const res = await fetch(`https://api.aladhan.com/v1/calendar?latitude=${loc.lat}&longitude=${loc.lng}&method=13&month=${month}&year=${year}`);
    const json = await res.json();
    if (json && json.data && json.data.length) {
      const todayKey = hvTodayKey();
      const strip = t => (t || '').split(' ')[0];
      const rows = json.data.map(d => {
        const g = d.date.gregorian, t = d.timings;
        const dateKey = `${g.year}-${String(g.month.number).padStart(2, '0')}-${String(g.day).padStart(2, '0')}`;
        const isToday = dateKey === todayKey;
        return `<tr class="${isToday ? 'imsak-today' : ''}">
          <td class="im-day">${g.day}<span class="im-wd">${trWeekdayShort(g.weekday.en)}</span></td>
          <td>${strip(t.Imsak)}</td><td>${strip(t.Sunrise)}</td><td>${strip(t.Dhuhr)}</td>
          <td>${strip(t.Asr)}</td><td class="im-iftar">${strip(t.Maghrib)}</td><td>${strip(t.Isha)}</td>
        </tr>`;
      }).join('');
      const load = document.getElementById('imsakiye-loading');
      if (load) load.remove();
      const wrap = document.createElement('div');
      wrap.innerHTML = `
        <div class="imsakiye-table-wrap">
          <table class="imsakiye-table">
            <thead><tr><th>Gün</th><th>İmsak</th><th>Güneş</th><th>Öğle</th><th>İkindi</th><th>Akşam</th><th>Yatsı</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="info-note" style="margin-top:8px;">Ramazan'da <b>İmsak</b> = sahurun sonu (orucun başı), <b>Akşam</b> = iftar vaktidir.</div>`;
      c.appendChild(wrap);
    } else { throw new Error('empty'); }
  } catch (e) {
    const load = document.getElementById('imsakiye-loading');
    if (load) load.textContent = '';
    c.insertAdjacentHTML('beforeend', '<div class="empty-note">İmsakiye için internet bağlantısı gerekiyor. Lütfen tekrar deneyin.</div>');
  }
}

/* ══════════ ORUÇ TAKİBİ ══════════ */
function renderOruc() {
  const c = document.getElementById('oruc-content');
  if (!c) return;
  const data = hvLoad('oruc', {});
  const kaza = hvLoad('oruc_kaza', 0);
  const today = hvTodayKey();
  const todayDone = !!data[today];
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthCount = Object.keys(data).filter(k => data[k] && k.startsWith(ym)).length;
  const total = Object.keys(data).filter(k => data[k]).length;
  // seri: bugün (veya dün) ile biten kesintisiz gün sayısı
  let streak = 0; const d = new Date();
  if (!data[hvTodayKey(d)]) d.setDate(d.getDate() - 1);
  for (let i = 0; i < 400; i++) { if (data[hvTodayKey(d)]) { streak++; d.setDate(d.getDate() - 1); } else break; }
  // son 30 gün
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const dd = new Date(); dd.setDate(dd.getDate() - i);
    const key = hvTodayKey(dd);
    days.push({ n: dd.getDate(), on: !!data[key], isToday: i === 0 });
  }
  c.innerHTML = `
    <div class="takip-summary">
      <div class="ts-big">${streak}</div>
      <div class="ts-label">günlük oruç serisi</div>
    </div>
    <button class="prayer-check-row ${todayDone ? 'checked' : ''}" onclick="toggleOrucToday()">
      <span class="pc-label">${todayDone ? '🌙 Bugün oruç tuttum' : 'Bugün oruç tuttum'}</span>
      <span class="pc-box">${todayDone ? '✓' : ''}</span>
    </button>
    <div class="hatim-stat" style="margin-top:12px;">
      <div class="hs-item"><div class="hs-num">${monthCount}</div><div class="hs-lbl">Bu ay</div></div>
      <div class="hs-item"><div class="hs-num">${total}</div><div class="hs-lbl">Toplam</div></div>
      <div class="hs-item"><div class="hs-num">${kaza}</div><div class="hs-lbl">Kaza borcu</div></div>
    </div>
    <div class="section-mini-title">📅 Son 30 Gün</div>
    <div class="oruc-grid">${days.map(x => `<div class="oruc-day ${x.on ? 'on' : ''} ${x.isToday ? 'today' : ''}">${x.n}</div>`).join('')}</div>
    <div class="section-mini-title">🔄 Kaza Orucu</div>
    <div class="kaza-row">
      <span class="kaza-label">Tutulacak kaza orucu</span>
      <div class="counter-group">
        <button class="counter-btn minus" onclick="orucKazaAdjust(-1)">−</button>
        <span class="counter-val">${kaza}</span>
        <button class="counter-btn plus" onclick="orucKazaAdjust(1)">+</button>
      </div>
    </div>
    <div class="info-note">Ramazan, Şevval (6 gün), Aşure, Pazartesi-Perşembe gibi tüm oruçlarınızı işaretleyebilirsiniz. Kaza tuttukça sayacı azaltın.</div>`;
}
function toggleOrucToday() {
  const data = hvLoad('oruc', {});
  const t = hvTodayKey();
  data[t] = !data[t];
  hvSave('oruc', data);
  hvVibrate(15);
  renderOruc();
}
window.toggleOrucToday = toggleOrucToday;
function orucKazaAdjust(delta) {
  const k = Math.max(0, hvLoad('oruc_kaza', 0) + delta);
  hvSave('oruc_kaza', k);
  renderOruc();
}
window.orucKazaAdjust = orucKazaAdjust;

/* ══════════ FEATURE ROUTE KAYIT & BAŞLATMA ══════════ */
window.FEATURE_ROUTES = {
  'onemli-sureler': renderOnemliSureler,
  'dua-ogrenme': () => renderDuaOgrenme(document.getElementById('dua-search-input') ? document.getElementById('dua-search-input').value : ''),
  'esma': () => renderEsma(document.getElementById('esma-search-input') ? document.getElementById('esma-search-input').value : ''),
  'ezkar': () => switchEzkar(_ezkarMode),
  'gunluk-dua': () => renderGunlukDua(document.getElementById('gunluk-search-input') ? document.getElementById('gunluk-search-input').value : ''),
  'zikirmatik': renderZikirmatik,
  'namaz-takibi': renderNamazTakibi,
  'kaza': renderKaza,
  'hatim': renderHatim,
  'zekat': renderZekat,
  'fitre': renderFitre,
  'quiz': () => { if (!_quiz) renderQuizIntro(); },
  'ruya': () => renderRuya(document.getElementById('ruya-search-input') ? document.getElementById('ruya-search-input').value : ''),
  'bebek': () => renderBebek(document.getElementById('bebek-search-input') ? document.getElementById('bebek-search-input').value : ''),
  'takvim': renderTakvim,
  'paylasim': renderPaylasim,
  'cuma': renderCuma,
  'taharet': () => switchTaharet(_taharetActive),
  'ozel-namaz': renderOzelNamazlar,
  'iman': renderImanEsaslari,
  'ayet-arama': renderAyetArama,
  'kirk-hadis': () => renderKirkHadis(document.getElementById('hadis-search-input') ? document.getElementById('hadis-search-input').value : ''),
  'siyer': renderSiyer,
  'peygamberler': renderPeygamberler,
  'sozluk': () => renderSozluk(document.getElementById('sozluk-search-input') ? document.getElementById('sozluk-search-input').value : ''),
  'imsakiye': renderImsakiye,
  'oruc': renderOruc,
  'quran': () => { if (typeof renderQuranTools === 'function') renderQuranTools(); },
  'kaynaklar': () => {}
};

/* ══════════ YEDEKLEME (DIŞA / İÇE AKTAR) ══════════ */
const HV_BACKUP_PREFIXES = ['hv_', 'namaz_vakti', 'qibla_'];
function hvBackupCollect() {
  const data = {};
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith('hv_cal_')) return; // takvim önbelleği yeniden indirilir, yedeğe gerek yok
    if (HV_BACKUP_PREFIXES.some(p => k.startsWith(p))) data[k] = localStorage.getItem(k);
  });
  return { app: 'NamazDostu', version: 59, exportedAt: new Date().toISOString(), data };
}
function hvBackupExport() {
  const status = document.getElementById('backup-status');
  try {
    const payload = hvBackupCollect();
    const json = JSON.stringify(payload, null, 2);
    const count = Object.keys(payload.data).length;
    const d = new Date();
    const fname = `namazdostu-yedek-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}.json`;
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = fname;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    if (status) status.textContent = `✅ ${count} kayıt "${fname}" olarak indirildi.`;
    hvToast('💾 Yedek hazır', `${count} kayıt dışa aktarıldı.`);
  } catch (e) {
    if (status) status.textContent = '❌ Yedek oluşturulamadı: ' + e.message;
  }
}
function hvBackupImport(input) {
  const status = document.getElementById('backup-status');
  const file = input && input.files && input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!parsed || (parsed.app !== 'NamazDostu' && parsed.app !== 'HuzurVakti') || typeof parsed.data !== 'object') throw new Error('Bu dosya bir Namaz Dostu yedeği değil.');
      let n = 0;
      Object.keys(parsed.data).forEach(k => {
        if (HV_BACKUP_PREFIXES.some(p => k.startsWith(p)) && typeof parsed.data[k] === 'string') {
          localStorage.setItem(k, parsed.data[k]); n++;
        }
      });
      if (status) status.textContent = `✅ ${n} kayıt geri yüklendi. Uygulama yenileniyor…`;
      hvToast('📥 Yedek yüklendi', `${n} kayıt geri getirildi.`);
      setTimeout(() => location.reload(), 1200);
    } catch (e) {
      if (status) status.textContent = '❌ ' + e.message;
      hvToast('❌ Geri yükleme başarısız', e.message);
    }
    input.value = '';
  };
  reader.onerror = () => { if (status) status.textContent = '❌ Dosya okunamadı.'; };
  reader.readAsText(file);
}
function hvShareApp() {
  hvShareText('🌙 Namaz Dostu — namaz vakitleri, Kur\'an, dualar, zikirmatik ve daha fazlası tek uygulamada. Ücretsiz, reklamsız, çevrimdışı çalışır:\nhttps://huzurvaktinamazuygulamasi.vercel.app');
}
window.hvBackupExport = hvBackupExport;
window.hvBackupImport = hvBackupImport;
window.hvShareApp = hvShareApp;

function featuresInit() {
  loadDailyAyet();

  const esmaSearch = document.getElementById('esma-search-input');
  if (esmaSearch) esmaSearch.addEventListener('input', e => renderEsma(e.target.value));

  const gunlukSearch = document.getElementById('gunluk-search-input');
  if (gunlukSearch) gunlukSearch.addEventListener('input', e => renderGunlukDua(e.target.value));

  const ruyaSearch = document.getElementById('ruya-search-input');
  if (ruyaSearch) ruyaSearch.addEventListener('input', e => renderRuya(e.target.value));

  const duaSearch = document.getElementById('dua-search-input');
  if (duaSearch) duaSearch.addEventListener('input', e => renderDuaOgrenme(e.target.value));

  const hadisSearch = document.getElementById('hadis-search-input');
  if (hadisSearch) hadisSearch.addEventListener('input', e => renderKirkHadis(e.target.value));

  const sozlukSearch = document.getElementById('sozluk-search-input');
  if (sozlukSearch) sozlukSearch.addEventListener('input', e => renderSozluk(e.target.value));

  const ayetSearch = document.getElementById('ayet-search-input');
  if (ayetSearch) ayetSearch.addEventListener('input', e => doAyetArama(e.target.value));

  const bebekSearch = document.getElementById('bebek-search-input');
  if (bebekSearch) bebekSearch.addEventListener('input', e => renderBebek(e.target.value));

  try { hvKonumBaslat(); } catch (e) {}
}


/* ═══════════════════════════════════════════════════════════════════════
   v61.7 — İLK AÇILIŞ KONUM SİHİRBAZI
   Uygulamayı ilk kez açan kullanıcı Yalova/Armutlu ile karşılaşmasın:
   ya GPS ile konumunu bulur ya da listeden şehrini seçer.
   Daha önce şehir seçmiş kullanıcılara hiç gösterilmez.
   ═══════════════════════════════════════════════════════════════════════ */

let hvNotifySonra = false;

function hvKonumGerekli() {
  try {
    if (localStorage.getItem('hv_konum_kuruldu') === '1') return false;
    // Eski kullanıcı: kayıtlı şehri varsa sihirbaza gerek yok
    const d = localStorage.getItem('namaz_vakti_v25');
    if (d) {
      const parsed = JSON.parse(d);
      if (parsed && parsed.currentCity) { localStorage.setItem('hv_konum_kuruldu', '1'); return false; }
    }
    // Üst üste 3 kez "sonra" derse artık rahatsız etme
    if (parseInt(localStorage.getItem('hv_konum_atla') || '0', 10) >= 3) return false;
    return true;
  } catch (e) { return false; }
}

function hvKonumHavuz() {
  const out = [];
  try {
    (typeof TURKEY_LOCATIONS !== 'undefined' ? TURKEY_LOCATIONS : []).forEach(p => {
      if (p.ilceler && p.ilceler.length) p.ilceler.forEach(d => out.push({ il: p.il, ilce: d.name }));
      else out.push({ il: p.il, ilce: 'Merkez' });
    });
  } catch (e) {}
  return out;
}

const HV_POPULER_IL = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Konya',
                       'Adana', 'Gaziantep', 'Şanlıurfa', 'Kocaeli', 'Mersin', 'Kayseri'];

function hvKonumVarsayilanListe() {
  const havuz = hvKonumHavuz();
  const out = [];
  HV_POPULER_IL.forEach(il => {
    const ilk = havuz.find(x => x.il === il);
    if (ilk) out.push(ilk);
  });
  return out;
}

function hvKonumListeCiz(q) {
  const g = document.getElementById('hv-konum-liste');
  if (!g) return;
  const ara = (typeof hvTrNorm === 'function') ? hvTrNorm(q) : String(q || '').toLowerCase();
  let liste;
  let baslik = '';

  if (!ara) {
    liste = hvKonumVarsayilanListe();
    baslik = '<div class="kn-baslik">En çok kullanılan şehirler</div>';
  } else {
    const puan = x => {
      const i = hvTrNorm(x.il), c = hvTrNorm(x.ilce);
      if (i === ara || c === ara) return 0;      // tam isabet
      if (i.indexOf(ara) === 0) return 1;        // il adı ile başlıyor
      if (c.indexOf(ara) === 0) return 2;        // ilçe adı ile başlıyor
      if (i.indexOf(ara) >= 0 || c.indexOf(ara) >= 0) return 3;
      return 9;
    };
    liste = hvKonumHavuz()
      .map(x => ({ x: x, p: puan(x) }))
      .filter(o => o.p < 9)
      .sort((a, b) => a.p - b.p)
      .slice(0, 60)
      .map(o => o.x);
  }

  if (!liste.length) {
    g.innerHTML = '<div class="kn-yok">Bulunamadı. İl ya da ilçe adını yazmayı dene.</div>';
    return;
  }

  g.innerHTML = baslik + liste.map(x =>
    `<button class="kn-sat" onclick="hvKonumSec('${String(x.il).replace(/'/g, "\\'")}','${String(x.ilce).replace(/'/g, "\\'")}')">
       <span class="kn-ilce">${x.ilce}</span>
       <span class="kn-il">${x.il}</span>
     </button>`).join('');
}
window.hvKonumListeCiz = hvKonumListeCiz;

function hvKonumKapat(kuruldu) {
  const k = document.getElementById('hv-konum-modal');
  if (k) k.remove();
  try {
    if (kuruldu) localStorage.setItem('hv_konum_kuruldu', '1');
    else {
      const n = parseInt(localStorage.getItem('hv_konum_atla') || '0', 10) + 1;
      localStorage.setItem('hv_konum_atla', String(n));
    }
  } catch (e) {}
  if (hvNotifySonra) {
    hvNotifySonra = false;
    setTimeout(() => {
      const m = document.getElementById('notify-permission-modal');
      if (m) m.style.display = 'flex';
    }, 450);
  }
}
window.hvKonumKapat = hvKonumKapat;

function hvKonumUygula(il, ilce, lat, lng) {
  try {
    APP_STATE.currentCity = il;
    APP_STATE.currentDistrict = ilce;
    APP_STATE.userLocation = { lat: lat, lng: lng };
  } catch (e) {}
  try { populateLocationsDropdown(); } catch (e) {}
  try { updateLocationHeaderLabel(); } catch (e) {}
  try { saveSettings(); } catch (e) {}
  try { fetchPrayerTimes(lat, lng); } catch (e) {}
  try { if (APP_STATE.currentPage === 'qibla') initQiblaCompass(); } catch (e) {}
}

function hvKonumSec(il, ilce) {
  let c = null;
  try { c = getSelectedCoordinates(il, ilce); } catch (e) {}
  if (!c) return;
  hvKonumUygula(il, ilce, c.lat, c.lng);
  hvKonumKapat(true);
  try { if (typeof showToast === 'function') showToast('📍 Konum: ' + ilce + ', ' + il); } catch (e) {}
}
window.hvKonumSec = hvKonumSec;

function hvKonumGps() {
  const d = document.getElementById('hv-konum-durum');
  const b = document.getElementById('hv-konum-gps');
  if (!navigator.geolocation) {
    if (d) d.textContent = 'Cihazın konum desteği yok. Aşağıdan şehrini seçebilirsin.';
    return;
  }
  if (d) { d.textContent = '📡 Konumun aranıyor…'; d.className = 'kn-durum bekle'; }
  if (b) b.disabled = true;

  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      // Önce gerçek ilçelere bak; ayarlardaki listede karşılığı olsun
      let en = Infinity, il = '', ilce = '';
      try {
        (TURKEY_LOCATIONS || []).forEach(p => {
          if (p.ilceler && p.ilceler.length) {
            p.ilceler.forEach(x => {
              const dd = calculateGreatCircleDistance(lat, lng, x.lat, x.lng);
              if (dd < en) { en = dd; il = p.il; ilce = x.name; }
            });
          }
        });
        if (!il) {
          (TURKEY_LOCATIONS || []).forEach(p => {
            const dc = calculateGreatCircleDistance(lat, lng, p.lat, p.lng);
            if (dc < en) { en = dc; il = p.il; ilce = 'Merkez'; }
          });
        }
      } catch (e) {}
      if (!il) { if (b) b.disabled = false; if (d) d.textContent = '⚠️ Konum eşleştirilemedi, listeden seç.'; return; }
      hvKonumUygula(il, ilce, lat, lng);   // vakitler gerçek koordinattan hesaplanır
      hvKonumKapat(true);
      try { if (typeof showToast === 'function') showToast('📍 Konum bulundu: ' + ilce + ', ' + il); } catch (e) {}
    },
    () => {
      if (b) b.disabled = false;
      if (d) { d.textContent = '⚠️ Konum izni verilmedi. Aşağıdan şehrini seçebilirsin.'; d.className = 'kn-durum uyari'; }
    },
    { enableHighAccuracy: true, timeout: 12000 }
  );
}
window.hvKonumGps = hvKonumGps;

function hvKonumSihirbaziAc() {
  if (document.getElementById('hv-konum-modal')) return;
  const k = document.createElement('div');
  k.id = 'hv-konum-modal';
  k.className = 'kn-kok';
  k.innerHTML = `
    <div class="kn-kart">
      <div class="kn-rozet">📍</div>
      <h3>Nerede yaşıyorsun?</h3>
      <p class="kn-alt">Namaz vakitlerinin doğru olması için bulunduğun yeri seç.</p>

      <button id="hv-konum-gps" class="kn-gps" onclick="hvKonumGps()">📡 Konumumu Otomatik Bul</button>
      <div id="hv-konum-durum" class="kn-durum"></div>

      <div class="kn-ayrac"><span>veya şehrini seç</span></div>

      <div class="kn-ara">
        <span>🔍</span>
        <input id="hv-konum-ara" type="search" autocomplete="off"
               placeholder="İl ya da ilçe yaz — ör. Konya, Kadıköy"
               oninput="hvKonumListeCiz(this.value)">
      </div>
      <div id="hv-konum-liste" class="kn-liste"></div>

      <button class="kn-sonra" onclick="hvKonumKapat(false)">Sonra seçerim</button>
    </div>
  `;
  document.body.appendChild(k);
  hvKonumListeCiz('');
}
window.hvKonumSihirbaziAc = hvKonumSihirbaziAc;

function hvKonumBaslat() {
  if (!hvKonumGerekli()) return;
  setTimeout(() => {
    hvKonumSihirbaziAc();
    // app.js bildirim penceresini ~1.4sn'de açıyor. Sihirbaz açıkken onu sıraya al.
    let sayac = 0;
    const bekci = setInterval(() => {
      if (!document.getElementById('hv-konum-modal') || ++sayac > 40) { clearInterval(bekci); return; }
      const m = document.getElementById('notify-permission-modal');
      if (m && m.style.display === 'flex') { m.style.display = 'none'; hvNotifySonra = true; }
    }, 150);
  }, 900);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', featuresInit);
} else {
  featuresInit();
}

/* ══════════ 30 GUNDE NAMAZA BASLANGIC (v60.9) ══════════ */
const NAMAZ_30GUN = [
  { g: 1, icon: '🌱', title: 'Niyet ve Karar', text: 'Namaz, kulun Rabbiyle günde beş kez buluşmasıdır. Bu yolculuğun ilk adımı büyük bilgi değil, sağlam bir karardır. Bugün kimseye söz vermene gerek yok; sadece kendine ve Rabbine \'başlıyorum\' de. Unutma, Allah az ama devamlı ameli sever.', task: 'Sessiz bir yerde iki dakika otur ve içinden \'Bugünden itibaren namaza başlıyorum, Allah\'ım bana kolaylık ver\' de.' },
  { g: 2, icon: '💧', title: 'Abdestin Farzları', text: 'Namazın anahtarı abdesttir. Abdestin dört farzı vardır: yüzü yıkamak, kolları dirseklerle beraber yıkamak, başın dörtte birini mesh etmek, ayakları topuklarla beraber yıkamak. Bunlar eksik olursa abdest olmaz.', task: 'Uygulamadaki \'Abdest & Taharet\' bölümünü aç, abdestin farzlarını oku ve bir kez abdest al.' },
  { g: 3, icon: '🚿', title: 'Abdesti Uygulamalı Öğren', text: 'Sünnetiyle birlikte abdest şöyledir: besmele, eller, ağız, burun, yüz, kollar, baş mesh, kulak-boyun, ayaklar. Sıra ve peş peşe yapmak sünnettir. Abdest bozan haller: tuvalet, yellenme, kan akması, derin uyku, bayılma.', task: 'Bugün en az iki kez abdest al ve sıralamayı ezberlemeye çalış.' },
  { g: 4, icon: '🧭', title: 'Kıble ve Namaz Vakitleri', text: 'Namaz Kâbe\'ye yönelerek kılınır. Uygulamadaki pusula sana yönü gösterir. Beş vakit: Sabah, Öğle, İkindi, Akşam, Yatsı. Her vaktin başlangıç ve bitişi vardır; vakit girmeden namaz kılınmaz.', task: 'Uygulamadan kıbleni bul, evinde namaz kılacağın yeri belirle. Beş vaktin isimlerini ve bugünkü saatlerini bir kez oku.' },
  { g: 5, icon: '📖', title: 'Sübhaneke', text: 'Namaza başlarken okunan ilk duadır. \'Sübhânekellâhümme ve bi-hamdik, ve tebârekesmük, ve teâlâ ceddük, ve lâ ilâhe ğayruk.\' Anlamı: Allah\'ım, Seni tesbih ve hamd ile anarım. Senin adın mübarektir, şanın yücedir, Senden başka ilah yoktur.', task: 'Sübhaneke\'yi 10 kez sesli tekrar et. Akşam ezberden okumaya çalış.' },
  { g: 6, icon: '🕮', title: 'Fâtiha Sûresi (1. Bölüm)', text: 'Fâtiha her rekâtta okunur, namazın olmazsa olmazıdır. İlk yarısı: \'Bismillâhirrahmânirrahîm. Elhamdü lillâhi rabbil âlemîn. Errahmânirrahîm. Mâliki yevmiddîn.\'', task: 'İlk dört ayeti 15 kez tekrar et. Uygulamadaki Kur\'an bölümünden Fâtiha\'yı dinle.' },
  { g: 7, icon: '🕮', title: 'Fâtiha Sûresi (2. Bölüm)', text: 'Devamı: \'İyyâke na\'büdü ve iyyâke nesteîn. İhdinâs sırâtal müstakîm. Sırâtallezîne en\'amte aleyhim, ğayril mağdûbi aleyhim ve leddâllîn.\' Anlamı: Yalnız sana kulluk eder, yalnız senden yardım isteriz. Bizi doğru yola ilet.', task: 'Fâtiha\'yı baştan sona 10 kez oku. Bugün ezberlemeyi hedefle.' },
  { g: 8, icon: '✨', title: 'İhlâs Sûresi', text: 'Kur\'an\'ın üçte birine denk sayılan kısa ve güçlü sûre: \'Kul hüvellâhü ehad. Allâhüs samed. Lem yelid ve lem yûled. Ve lem yekün lehû küfüven ehad.\' Anlamı: De ki: O Allah birdir, hiçbir şeye muhtaç değildir, doğurmamış ve doğmamıştır, hiçbir şey O\'na denk değildir.', task: 'İhlâs sûresini ezberle. Fâtiha + İhlâs\'ı arka arkaya okumayı dene.' },
  { g: 9, icon: '🤲', title: 'Rükû ve Secde Tesbihleri', text: 'Rükûda üç kez \'Sübhâne rabbiyel azîm\', secdede üç kez \'Sübhâne rabbiyel a\'lâ\' denir. Rükûdan doğrulurken \'Semiallâhü limen hamideh\', sonra \'Rabbenâ lekel hamd\' denir.', task: 'Bu üç cümleyi ezberle. Namazın hareketlerini (kıyam, rükû, secde, oturuş) aynada bir kez prova et.' },
  { g: 10, icon: '🪑', title: 'Ettehiyyâtü (Tahiyyat)', text: 'Oturuşta okunur: \'Ettehiyyâtü lillâhi vessalevâtü vettayyibât. Esselâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berekâtüh. Esselâmü aleynâ ve alâ ibâdillâhis sâlihîn. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh.\'', task: 'Tahiyyat\'ı parça parça (üç bölüme ayırarak) çalış. Bugün ilk bölümü ezberle.' },
  { g: 11, icon: '🌸', title: 'Salli ve Bârik', text: 'Tahiyyat\'tan sonra son oturuşta okunur. \'Allâhümme salli alâ Muhammedin ve alâ âli Muhammed, kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm, inneke hamîdün mecîd.\' Bârik duası da aynı kalıptadır, \'salli\' yerine \'bârik\' denir.', task: 'Salli ve Bârik\'i okumaya çalış. Tahiyyat\'ın kalan bölümünü tamamla.' },
  { g: 12, icon: '🙏', title: 'Rabbenâ Duaları', text: 'Namazın sonunda okunur: \'Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhireti haseneten ve kınâ azâben nâr.\' ve \'Rabbenâğfirlî ve li-vâlideyye ve lil-mü\'minîne yevme yekûmül hisâb.\'', task: 'Bu iki duayı ezberle. Artık namazın bütün duaları elinde — tebrikler!' },
  { g: 13, icon: '🌅', title: 'İlk Namaz: Sabahın Sünneti', text: 'Sabah namazının sünneti iki rekâttır ve en kolay başlangıçtır. Niyet et, tekbir al (Allahü ekber), Sübhaneke-Fâtiha-zamm-ı sûre oku, rükû, iki secde; ikinci rekâtta Fâtiha-sûre, rükû, secde, otur, Tahiyyat-Salli-Bârik-Rabbenâ, selam ver.', task: 'Bugün hayatındaki ilk 2 rekâtı kıl. Yanlış yapsan da kıl — Allah niyetine bakar.' },
  { g: 14, icon: '🌄', title: 'Sabah Namazının Farzı', text: 'Farz da iki rekâttır ve sünnetle aynı şekilde kılınır; sadece niyet farkı vardır. Sabah namazı en bereketli namazdır; Peygamberimiz onu asla terk etmezdi.', task: 'Bugün sabah namazını (2 sünnet + 2 farz) tam kıl. Uygulamadan bildirimi açmayı unutma.' },
  { g: 15, icon: '🔁', title: 'Devamlılık Günü', text: 'İlk hafta bitti, en zor kısmı geçtin. Şimdi hedef bir vakti hiç aksatmamak. Alışkanlık tekrarla oturur; bir gün kaçırırsan üzülüp bırakma, ertesi gün devam et.', task: 'Sabah namazını üç gün üst üste kılmayı hedefle. Uygulamadaki \'Namaz Takibi\' bölümünden işaretle.' },
  { g: 16, icon: '🌊', title: 'Kevser Sûresi', text: 'Zamm-ı sûre çeşitliliği için: \'İnnâ a\'taynâkel kevser. Fesalli li-rabbike venhar. İnne şânieke hüvel ebter.\' Anlamı: Şüphesiz biz sana Kevser\'i verdik. Öyleyse Rabbin için namaz kıl ve kurban kes. Asıl soyu kesik olan sana buğzedendir.', task: 'Kevser\'i ezberle. Sabah namazının ikinci rekâtında oku.' },
  { g: 17, icon: '🌇', title: 'Akşam Namazı (3 Rekât)', text: 'Akşam farzı üç rekâttır. İlk iki rekât normal, ikinci rekât sonunda oturulup sadece Tahiyyat okunur, kalkılır, üçüncü rekâtta sadece Fâtiha okunur, sonra son oturuş yapılır. Akşam vakti kısadır, geciktirme.', task: 'Bugün akşam namazının farzını kıl. Artık iki vakit kılıyorsun.' },
  { g: 18, icon: '🛡️', title: 'Nâs ve Felak Sûreleri', text: 'Koruyucu iki sûre. Felak: \'Kul eûzü bi-rabbil felak...\' Nâs: \'Kul eûzü bi-rabbin-nâs...\' Her ikisi de kötülüklerden Allah\'a sığınmayı öğretir. Yatmadan önce de okunur.', task: 'İkisini de ezberlemeye başla. Yatmadan önce oku.' },
  { g: 19, icon: '🌃', title: 'Yatsı Namazı (4 Rekât)', text: 'Yatsının farzı dört rekâttır. İlk iki rekâtta Fâtiha + sûre, son iki rekâtta sadece Fâtiha okunur. İkinci rekâtta oturulup Tahiyyat okunur.', task: 'Bugün yatsı namazının farzını kıl. Sabah, akşam, yatsı — üç vakit oldu.' },
  { g: 20, icon: '🌙', title: 'Vitir Namazı', text: 'Yatsıdan sonra kılınan üç rekâtlık vacip namazdır. Üçüncü rekâtta Fâtiha ve sûreden sonra tekbir alınır, eller kaldırılıp bağlanır ve Kunut duaları okunur.', task: 'Vitri öğren ve yatsıdan sonra kıl. Kunut duaları için uygulamadaki dua bölümüne bak.' },
  { g: 21, icon: '☀️', title: 'Öğle Namazı', text: 'Öğlenin farzı dört rekâttır, yatsının farzı gibi kılınır. İş veya okul arasında kılmak zor gelebilir; 10 dakikan yeter. Bir köşe ve temiz bir yer kâfidir.', task: 'Bugün öğle namazını kıl. Nerede kılabileceğini önceden planla.' },
  { g: 22, icon: '🌤️', title: 'İkindi Namazı', text: 'İkindinin farzı dört rekâttır. Kur\'an\'da \'orta namaz\'a özellikle dikkat çekilir; müfessirlerin çoğu bunun ikindi olduğunu söyler. Vakti dar olduğu için en çok kaçırılan namazdır.', task: 'Bugün ikindi namazını kıl. Bildirimi açık tut.' },
  { g: 23, icon: '🕔', title: 'Beş Vakit Tam', text: 'Bugün ilk kez beş vakti eksiksiz kılmayı deneyeceksin: Sabah 2+2, Öğle 4 farz, İkindi 4 farz, Akşam 3 farz, Yatsı 4 farz + 3 vitir. Sünnetleri sonra ekleyebilirsin.', task: 'Bugün beş vakti tam kıl. Uygulamada hepsini işaretle ve seriyi başlat.' },
  { g: 24, icon: '📿', title: 'Namaz Sonrası Tesbihat', text: 'Selamdan sonra: \'Allâhümme entes-selâm ve minkes-selâm\', Ayetel Kürsi, 33 Sübhanallah, 33 Elhamdülillah, 33 Allahü ekber, sonra dua. Bu, namazın tamamlayıcısıdır.', task: 'Bir vakit namazdan sonra tam tesbihat yap. Uygulamadaki Zikirmatik\'i kullan.' },
  { g: 25, icon: '👑', title: 'Ayetel Kürsi', text: 'Kur\'an\'ın en büyük ayeti sayılır. Her farz namazın ardından okuyanın cennete girmesine bir engel kalmadığı rivayet edilir. Uzun bir ayettir, parça parça ezberlemek en kolayıdır.', task: 'Ayetel Kürsi\'yi üç parçaya böl, ilk parçayı bugün ezberle.' },
  { g: 26, icon: '🔄', title: 'Kaza Namazları', text: 'Geçmişte kılamadığın namazlar borç olarak kalır. Panik yapma: her gün beş vakitle birlikte bir vakit kaza kılarsan borç zamanla erir. Önemli olan başlamaktır.', task: 'Uygulamadaki \'Kaza Namazı\' bölümünü aç, tahmini borcunu gir ve bugün bir kaza namazı kıl.' },
  { g: 27, icon: '🕌', title: 'Cemaat ve Cuma', text: 'Cemaatle namaz, tek başına kılmaktan 27 kat daha faziletlidir. Cuma namazı ise erkeklere farzdır. Camiye ilk gidişte utanma; herkes bir gün ilk kez gitmiştir.', task: 'Bir vakti camide cemaatle kıl. Mümkün değilse en yakın camiyi ve Cuma saatini öğren.' },
  { g: 28, icon: '💗', title: 'Huşû: Kalpten Kılmak', text: 'Namaz sadece hareket değil, huzurdur. Ne okuduğunu anlamaya çalış, acele etme, her secdede biraz dur. Telefonu uzak tut. Namaz kılarken Allah\'ın seni gördüğünü düşün.', task: 'Bugün bir vakti çok yavaş, anlamını düşünerek kıl. Farkı hisset.' },
  { g: 29, icon: '🛠️', title: 'Zorlukları Aşmak', text: 'Uyuyakalmak, iş yoğunluğu, yorgunluk, utanma... Hepsinin çaresi var: alarm + bildirim, çantada seccade, iş yerinde sessiz bir köşe, 10 dakikalık plan. Şeytanın en sevdiği cümle \'sonra kılarım\'dır.', task: 'Kendi en büyük engelini bir kâğıda yaz ve yanına çözümünü yaz. Sonra uygula.' },
  { g: 30, icon: '🏆', title: 'Ömür Boyu Devam', text: '30 gün bitti. Artık namazı biliyorsun ve kılıyorsun. Bundan sonrası devamlılık: bir gün aksarsa bırakma, ertesi gün kaldığın yerden devam et. Namaz bir yük değil, günün beş molasıdır.', task: 'Kendine söz ver: \'Ne olursa olsun namazı bırakmayacağım.\' Uygulamadaki takip serini büyütmeye devam et.' },
];

function hv30State() {
  const s = hvLoad('namaz30', { done: [], acik: 1 });
  if (!Array.isArray(s.done)) s.done = [];
  return s;
}
function hv30Toggle(g) {
  const s = hv30State();
  const i = s.done.indexOf(g);
  if (i >= 0) s.done.splice(i, 1); else s.done.push(g);
  hvSave('namaz30', s);
  renderNamazProgrami();
  if (i < 0) {
    const kalan = 30 - s.done.length;
    if (typeof hvToast === 'function') {
      if (kalan === 0) hvToast('🏆 Tebrikler!', '30 günlük programı tamamladın. Allah kabul etsin.');
      else hvToast('✅ ' + g + '. gün tamam', kalan + ' gün kaldı. Devam!');
    }
  }
}
function hv30Ac(g) {
  const s = hv30State();
  s.acik = (s.acik === g) ? 0 : g;
  hvSave('namaz30', s);
  renderNamazProgrami();
  setTimeout(function () {
    const el = document.getElementById('hv30-gun-' + g);
    if (el && s.acik === g) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 60);
}
function hv30Sifirla() {
  hvSave('namaz30', { done: [], acik: 1 });
  renderNamazProgrami();
  if (typeof hvToast === 'function') hvToast('🔄 Sıfırlandı', 'Program baştan başlıyor.');
}
function renderNamazProgrami() {
  const c = document.getElementById('namaz-programi-content');
  if (!c) return;
  const s = hv30State();
  const done = s.done.length;
  const pct = Math.round((done / 30) * 100);
  const sonraki = NAMAZ_30GUN.find(function (d) { return s.done.indexOf(d.g) < 0; });

  let html = '';
  html += '<div class="hv30-top">';
  html += '<div class="hv30-ring" style="--p:' + pct + '"><span class="hv30-pct">%' + pct + '</span></div>';
  html += '<div class="hv30-topinfo">';
  html += '<div class="hv30-topbig">' + done + ' / 30 gün</div>';
  html += '<div class="hv30-topsub">' + (sonraki ? 'Sıradaki: ' + sonraki.g + '. gün — ' + sonraki.title : 'Programı tamamladın, Allah kabul etsin 🤲') + '</div>';
  html += '</div></div>';
  html += '<div class="hv30-bar"><div class="hv30-bar-fill" style="width:' + pct + '%"></div></div>';
  html += '<p class="hv30-intro">Namaza sıfırdan başlayanlar için 30 günlük yol haritası. Her gün küçük bir bilgi ve küçük bir görev. Aceleye gerek yok — kaçırdığın gün olursa kaldığın yerden devam et.</p>';

  html += '<div class="hv30-list">';
  NAMAZ_30GUN.forEach(function (d) {
    const ok = s.done.indexOf(d.g) >= 0;
    const acik = s.acik === d.g;
    html += '<div class="hv30-item' + (ok ? ' done' : '') + (acik ? ' open' : '') + '" id="hv30-gun-' + d.g + '">';
    html += '<div class="hv30-head" onclick="hv30Ac(' + d.g + ')">';
    html += '<span class="hv30-num">' + d.g + '</span>';
    html += '<span class="hv30-icon">' + d.icon + '</span>';
    html += '<span class="hv30-title">' + d.title + '</span>';
    html += '<span class="hv30-chev">' + (ok ? '✅' : (acik ? '▲' : '▼')) + '</span>';
    html += '</div>';
    if (acik) {
      html += '<div class="hv30-body">';
      html += '<p class="hv30-text">' + d.text + '</p>';
      html += '<div class="hv30-task"><strong>🎯 Bugünkü görev</strong><span>' + d.task + '</span></div>';
      html += '<button class="hv30-btn' + (ok ? ' undo' : '') + '" onclick="hv30Toggle(' + d.g + ')">' + (ok ? '↩️ İşareti kaldır' : '✅ Bu günü tamamladım') + '</button>';
      html += '</div>';
    }
    html += '</div>';
  });
  html += '</div>';
  html += '<button class="hv30-reset" onclick="hv30Sifirla()">🔄 Programı sıfırla</button>';
  c.innerHTML = html;
}
try { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['namaz-programi'] = renderNamazProgrami; } catch (e) {}

/* ══════════ v61.0 — GÖRSEL PAYLAŞIM KARTI ══════════
   Düz metin yerine 1080x1920 marka görseli üretir ve onu paylaşır.
   WhatsApp durumu / Instagram hikayesi için doğru ölçü.        */

const HV_CARD_W = 1080, HV_CARD_H = 1920;
let _hvCardBg = null, _hvCardBgTried = false;

function hvCardLoadBg() {
  return new Promise((resolve) => {
    if (_hvCardBg || _hvCardBgTried) return resolve(_hvCardBg);
    _hvCardBgTried = true;
    const img = new Image();
    img.onload = () => { _hvCardBg = img; resolve(img); };
    img.onerror = () => resolve(null);
    img.src = 'bg-mosque.jpg';
  });
}

// Metni kutuya sığdır: font boyutunu küçülterek satırlara böl
function hvCardFit(ctx, text, maxW, maxH, opts) {
  const o = opts || {};
  let size = o.max || 62;
  const min = o.min || 26;
  const weight = o.weight || '600';
  const family = o.family || "'Outfit', system-ui, -apple-system, sans-serif";
  const lh = o.lineHeight || 1.42;
  while (size >= min) {
    ctx.font = `${weight} ${size}px ${family}`;
    const words = String(text).split(/\s+/);
    const lines = [];
    let line = '';
    for (const w of words) {
      const t = line ? line + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; }
      else line = t;
    }
    if (line) lines.push(line);
    if (lines.length * size * lh <= maxH) return { size, lines, lh, family, weight };
    size -= 2;
  }
  ctx.font = `${weight} ${min}px ${family}`;
  return { size: min, lines: [String(text)], lh, family, weight };
}


function hvCardRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function hvCardMoon(ctx, cx, cy, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = (alpha == null ? 1 : alpha);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2, false);
  ctx.arc(cx + r * 0.44, cy - r * 0.2, r * 0.9, 0, Math.PI * 2, true);
  ctx.fill('evenodd');
  ctx.restore();
}

async function hvBuildShareCard(data) {
  const d = data || {};
  const cv = document.createElement('canvas');
  cv.width = HV_CARD_W; cv.height = HV_CARD_H;
  const ctx = cv.getContext('2d');

  // ── Zemin: koyu bakır ──
  ctx.fillStyle = '#160B04';
  ctx.fillRect(0, 0, HV_CARD_W, HV_CARD_H);

  // ── Desenli arka plan (varsa) + bakır tonlama ──
  const bg = await hvCardLoadBg();
  if (bg) {
    const s = Math.max(HV_CARD_W / bg.width, HV_CARD_H / bg.height);
    const w = bg.width * s, h = bg.height * s;
    ctx.drawImage(bg, (HV_CARD_W - w) / 2, (HV_CARD_H - h) / 2, w, h);
    // yeşil tonu bakıra çevir
    ctx.globalCompositeOperation = 'color';
    ctx.fillStyle = '#9A6634';
    ctx.fillRect(0, 0, HV_CARD_W, HV_CARD_H);
    ctx.globalCompositeOperation = 'source-over';
  } else {
    const rg = ctx.createRadialGradient(HV_CARD_W/2, HV_CARD_H*0.34, 60, HV_CARD_W/2, HV_CARD_H*0.34, HV_CARD_H*0.72);
    rg.addColorStop(0, '#5C3B25'); rg.addColorStop(0.55, '#2A170C'); rg.addColorStop(1, '#160B04');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, HV_CARD_W, HV_CARD_H);
  }

  // ── Okunurluk perdesi (A2: açık zemin, desen görünsün) ──
  const vg = ctx.createLinearGradient(0, 0, 0, HV_CARD_H);
  vg.addColorStop(0, 'rgba(26,13,5,0.50)');
  vg.addColorStop(0.45, 'rgba(26,13,5,0.30)');
  vg.addColorStop(1, 'rgba(14,7,2,0.76)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, HV_CARD_W, HV_CARD_H);

  const GOLD = '#E3AD82', CREAM = '#F7DDC4', WHITE = '#FDF6EE';
  const M = 82;
  const cx = HV_CARD_W / 2;

  // ── İnce altın çerçeve ──
  ctx.strokeStyle = 'rgba(227,173,130,0.45)';
  ctx.lineWidth = 3;
  hvCardRoundRect(ctx, 48, 48, HV_CARD_W - 96, HV_CARD_H - 96, 44);
  ctx.stroke();

  ctx.textAlign = 'center';

  // ── Gövde: etiket → arapça → ayraç → meal → kaynak (dikeyde ortalı) ──
  const label = String(d.badge || '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F\u200D]/gu, '')
    .trim().toLocaleUpperCase('tr');

  const boxW = HV_CARD_W - M * 2;
  const TOP = 250, BOTTOM = HV_CARD_H - 470;   // Instagram hikayesi güvenli alanı
  const avail = BOTTOM - TOP;

  const LBL = 52;
  const lblH = label ? LBL + 58 : 0;

  let arFit = null, arH = 0;
  if (d.arabic) {
    arFit = hvCardFit(ctx, d.arabic, boxW, avail * 0.28, {
      max: 76, min: 36, weight: '400',
      family: "'Amiri', 'Traditional Arabic', serif", lineHeight: 1.85
    });
    arH = arFit.lines.length * arFit.size * arFit.lh + 112;
  }

  const bodyFit = hvCardFit(ctx, '\u201C' + (d.text || '') + '\u201D', boxW,
    avail - lblH - arH - 130, { max: 80, min: 34, weight: '500', lineHeight: 1.36 });
  const bodyH = bodyFit.lines.length * bodyFit.size * bodyFit.lh;
  const srcH = d.source ? 118 : 0;

  let y = TOP + Math.max(0, (avail - (lblH + arH + bodyH + srcH)) / 2);

  if (label) {
    y += LBL;
    ctx.fillStyle = GOLD;
    ctx.font = `600 ${LBL}px 'Outfit', system-ui, sans-serif`;
    ctx.letterSpacing = '6px';
    ctx.fillText(label, cx, y);
    ctx.letterSpacing = '0px';
    y += 58;
  }

  if (arFit) {
    ctx.fillStyle = CREAM;
    ctx.font = `${arFit.weight} ${arFit.size}px ${arFit.family}`;
    ctx.direction = 'rtl';
    for (const ln of arFit.lines) { y += arFit.size * arFit.lh; ctx.fillText(ln, cx, y); }
    ctx.direction = 'ltr';
    y += 50;
    ctx.strokeStyle = 'rgba(227,173,130,0.40)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - 82, y); ctx.lineTo(cx + 82, y); ctx.stroke();
    y += 62;
  }

  ctx.fillStyle = WHITE;
  ctx.font = `${bodyFit.weight} ${bodyFit.size}px ${bodyFit.family}`;
  for (const ln of bodyFit.lines) { y += bodyFit.size * bodyFit.lh; ctx.fillText(ln, cx, y); }

  if (d.source) {
    y += 82;
    ctx.fillStyle = GOLD;
    ctx.font = "600 42px 'Outfit', system-ui, sans-serif";
    ctx.fillText('\u2014 ' + d.source, cx, y);
  }

  // ── Alt imza: hilal + isim (üst üste binmez) ──
  ctx.strokeStyle = 'rgba(227,173,130,0.30)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(cx - 140, HV_CARD_H - 344); ctx.lineTo(cx + 140, HV_CARD_H - 344); ctx.stroke();

  const SS = 52, GAP = 24, name = 'Namaz Dostu';
  ctx.font = `600 ${SS}px 'Outfit', system-ui, sans-serif`;
  const tw = ctx.measureText(name).width;
  const r = SS * 0.46;
  const x0 = cx - (r * 2 + GAP + tw) / 2;
  hvCardMoon(ctx, x0 + r, HV_CARD_H - 264 - SS * 0.34, r, GOLD, 0.95);
  ctx.textAlign = 'left';
  ctx.fillStyle = CREAM;
  ctx.fillText(name, x0 + r * 2 + GAP, HV_CARD_H - 264);
  ctx.textAlign = 'center';

  return cv;
}

// Görsel önizleme + paylaş penceresi
async function hvOpenShareCard(data) {
  const d = data || {};
  let cv;
  try { cv = await hvBuildShareCard(d); }
  catch (e) { console.warn('Kart üretilemedi:', e); return hvShareText(d.fallbackText || d.text || ''); }

  const dataUrl = cv.toDataURL('image/png');
  const old = document.getElementById('hv-share-modal');
  if (old) old.remove();

  const wrap = document.createElement('div');
  wrap.id = 'hv-share-modal';
  wrap.className = 'hv-sc-backdrop';
  wrap.innerHTML = `
    <div class="hv-sc-box">
      <img class="hv-sc-img" src="${dataUrl}" alt="Paylaşım görseli">
      <div class="hv-sc-actions">
        <button class="hv-sc-btn hv-sc-primary" id="hv-sc-share">📤 Paylaş</button>
        <button class="hv-sc-btn" id="hv-sc-save">⬇️ Kaydet</button>
        <button class="hv-sc-btn hv-sc-ghost" id="hv-sc-text">Yazı olarak paylaş</button>
      </div>
      <button class="hv-sc-close" id="hv-sc-close">Kapat</button>
    </div>`;
  document.body.appendChild(wrap);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) wrap.remove(); });
  document.getElementById('hv-sc-close').onclick = () => wrap.remove();

  const toBlob = () => new Promise((res) => cv.toBlob(res, 'image/png', 0.95));

  document.getElementById('hv-sc-share').onclick = async () => {
    // Android uygulaması: yerel köprü ile paylaş (WebView'de dosya paylaşımı yok)
    try {
      const bridge = window.webkit && window.webkit.messageHandlers
        && window.webkit.messageHandlers['share-image'];
      if (window.hvIsAndroid && bridge) {
        bridge.postMessage({ data: dataUrl });
        wrap.remove();
        return;
      }
    } catch (e) { console.warn('Köprü ile paylaşılamadı:', e); }

    try {
      const blob = await toBlob();
      const file = new File([blob], 'namaz-dostu.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
        wrap.remove();
        return;
      }
    } catch (e) { if (e && e.name === 'AbortError') return; }
    // görsel paylaşılamıyorsa yazıya düş
    hvShareText(d.fallbackText || d.text || '');
    wrap.remove();
  };

  document.getElementById('hv-sc-save').onclick = () => {
    const a = document.createElement('a');
    a.href = dataUrl; a.download = 'namaz-dostu.png';
    document.body.appendChild(a); a.click(); a.remove();
    if (typeof hvToast === 'function') hvToast('⬇️ Kaydedildi', 'Görsel galerine indi, oradan paylaşabilirsin.');
  };

  document.getElementById('hv-sc-text').onclick = () => {
    hvShareText(d.fallbackText || d.text || '');
    wrap.remove();
  };
}
window.hvOpenShareCard = hvOpenShareCard;
window.hvBuildShareCard = hvBuildShareCard;

/* ═══════════════════════════════════════════════════════════════════════
   v61.4 — MUSHAF (SAYFA SAYFA KUR'AN-I KERİM)
   Kaynak: alquran.cloud  •  Sayfa numaraları standart 604 sayfalık
   mushaf düzenidir (Diyanet basımıyla aynı).
   Ses: her ayet ayrı dosya → okunan ayet vurgulanabiliyor.
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   v61.8 — DİYANET MEÂLİ (uygulamanın içinde)
   6236 âyetin tamamı meal.js dosyasında. Dosya, meal ilk kez
   gösterileceği zaman yüklenir; sonrası internetsiz de çalışır.
   ═══════════════════════════════════════════════════════════════════════ */
let hvMealSozu = null;
function hvMealHazir() {
  if (window.DIYANET_MEAL) return Promise.resolve(true);
  if (hvMealSozu) return hvMealSozu;
  hvMealSozu = new Promise(cozum => {
    const e = document.createElement('script');
    e.src = 'meal.js?v=' + (window.HV_SURUM || '61.8.0');
    e.onload  = () => cozum(!!window.DIYANET_MEAL);
    e.onerror = () => { hvMealSozu = null; cozum(false); };
    document.head.appendChild(e);
  });
  return hvMealSozu;
}
window.hvMealHazir = hvMealHazir;

function hvMeal(sure, ayet) {
  try {
    const a = window.DIYANET_MEAL[String(sure)];
    return (a && a[ayet - 1]) ? a[ayet - 1] : '';
  } catch (e) { return ''; }
}
window.hvMeal = hvMeal;

/* Diyanet bazı âyetleri birleştirerek çevirmiştir (ör. "2, 3, 4.").
   Bu âyet öyle bir grubun içindeyse {bas, son} döner. */
function hvMealGrup(sure, ayet) {
  try {
    const g = window.DIYANET_MEAL_GRUP[String(sure)];
    if (!g) return null;
    for (let i = 0; i < g.length; i++) {
      if (ayet >= g[i][0] && ayet <= g[i][1]) return { bas: g[i][0], son: g[i][1] };
    }
  } catch (e) {}
  return null;
}
window.hvMealGrup = hvMealGrup;

/* Ekranda gösterilecek âyet numarası etiketi: tek âyet "5", grup "2-4" */
function hvMealEtiket(sure, ayet) {
  const g = hvMealGrup(sure, ayet);
  return g ? (g.bas + '-' + g.son) : String(ayet);
}
window.hvMealEtiket = hvMealEtiket;

/* Grubun ilk âyeti mi? (listede metni bir kez yazmak için) */
/* Arama için normalize edilmiş dizin — bir kez kurulur */
let hvMealIdx = null;
function hvMealIndeks() {
  if (hvMealIdx) return hvMealIdx;
  hvMealIdx = [];
  try {
    const adlar = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : [];
    for (let sn = 1; sn <= 114; sn++) {
      const dizi = window.DIYANET_MEAL[String(sn)] || [];
      const sr = adlar.find(x => Number(x.id) === sn);
      let onceki = null;
      for (let i = 0; i < dizi.length; i++) {
        const metin = dizi[i];
        if (!metin || metin === onceki) { onceki = metin; continue; }
        onceki = metin;
        hvMealIdx.push({ s: sn, ad: sr ? sr.name : (sn + '. Sûre'), v: i + 1, t: metin, n: hvTrNorm(metin) });
      }
    }
  } catch (e) {}
  return hvMealIdx;
}
window.hvMealIndeks = hvMealIndeks;

function hvMealGrupIlk(sure, ayet) {
  const g = hvMealGrup(sure, ayet);
  return !g || g.bas === ayet;
}
window.hvMealGrupIlk = hvMealGrupIlk;

const HV_MUSHAF_SON = 604;

const HV_QARILER = [
  { id: 'ar.husary',             ad: 'Mahmud Halil el-Husarî' },
  { id: 'ar.alafasy',            ad: 'Mishary Rashid Alafasy' },
  { id: 'ar.abdulsamad',         ad: 'Abdulbasit Abdussamed' },
  { id: 'ar.mahermuaiqly',       ad: 'Maher Al Muaiqly' },
  { id: 'ar.abdurrahmaansudais', ad: 'Abdurrahman es-Sudeys' },
  { id: 'ar.saoodshuraym',       ad: 'Suud eş-Şureym' }
];

function hvGet(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
function hvSet(k, v) { try { localStorage.setItem(k, String(v)); } catch (e) {} }

// Arap rakamları (١٢٣)
function hvArNum(n) { return String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]); }

// Ayet 1'in başındaki besmeleyi ayırır (alquran.cloud besmeleyi 1. ayete ekliyor)
function hvBesmeleAyir(text) {
  const hedef = 'بسماللهالرحمنالرحيم';
  let sade = '', harita = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (/[ؐ-ًؚ-ٰٟۖ-ۭـ\s]/.test(ch)) continue;
    sade += (ch === 'ٱ' ? 'ا' : ch);
    harita.push(i);
  }
  if (sade.indexOf(hedef) === 0 && harita.length > hedef.length) {
    const kes = harita[hedef.length - 1] + 1;
    return { besmele: text.slice(0, kes).trim(), kalan: text.slice(kes).trim() };
  }
  return { besmele: '', kalan: text };
}

/* ── Sayfa önbelleği (internetsiz okuma) ───────────────────────────── */
const HV_MP_IDX = 'hv_mushaf_idx2';

function hvMushafOnbellekAl(p) {
  try { const r = localStorage.getItem('hv_mp2_' + p); return r ? JSON.parse(r) : null; } catch (e) { return null; }
}
function hvMushafOnbellekYaz(p, veri) {
  try {
    localStorage.setItem('hv_mp2_' + p, JSON.stringify(veri));
    let idx = [];
    try { idx = JSON.parse(localStorage.getItem(HV_MP_IDX) || '[]'); } catch (e) {}
    idx = idx.filter(x => x !== p); idx.push(p);
    while (idx.length > 120) { const eski = idx.shift(); try { localStorage.removeItem('hv_mp2_' + eski); } catch (e) {} }
    localStorage.setItem(HV_MP_IDX, JSON.stringify(idx));
  } catch (e) {
    // Depolama doldu → mushaf önbelleğini boşalt, uygulamanın gerisi etkilenmesin
    try {
      const idx = JSON.parse(localStorage.getItem(HV_MP_IDX) || '[]');
      idx.forEach(x => { try { localStorage.removeItem('hv_mp2_' + x); } catch (e2) {} });
      localStorage.setItem(HV_MP_IDX, '[]');
    } catch (e2) {}
  }
}

async function hvMushafSayfaGetir(p) {
  const c = hvMushafOnbellekAl(p);
  if (c && c.length) return c;

  const arRes = await fetch('https://api.alquran.cloud/v1/page/' + p + '/quran-uthmani');
  const arJson = await arRes.json();
  if (!arJson || !arJson.data || !Array.isArray(arJson.data.ayahs)) throw new Error('Sayfa alınamadı');

  // Meal artık uygulamanın içinde (Diyanet meal.js) — internet gerekmez
  await hvMealHazir();

  const veri = arJson.data.ayahs.map(a => ({
    n: a.number,
    s: a.surah.number,
    sadi: a.surah.englishName,
    sar: a.surah.name,
    v: a.numberInSurah,
    ar: a.text,
    tr: hvMeal(a.surah.number, a.numberInSurah)
  }));
  hvMushafOnbellekYaz(p, veri);
  return veri;
}

/* ── Ses ───────────────────────────────────────────────────────────── */
let hvMvSes = null, hvMvSira = [], hvMvKonum = -1, hvMvCalisiyor = false;

function hvMvSesNesnesi() {
  if (!hvMvSes) {
    hvMvSes = new Audio();
    hvMvSes.preload = 'auto';
    hvMvSes.addEventListener('ended', () => { hvMvAyetBitti(); });
    hvMvSes.addEventListener('timeupdate', hvMvIlerleme);
    hvMvSes.addEventListener('loadedmetadata', hvMvIlerleme);
    // Ses gelmezse ayetleri hızla atlamak yerine dur ve haber ver
    hvMvSes.addEventListener('error', () => {
      hvMvDurdur();
      try { showToastNotification('🔇 Ses yüklenemedi', 'İnternet bağlantını kontrol et ya da başka bir okuyucu seç.'); } catch (e) {}
    });
  }
  return hvMvSes;
}

/* mm:ss */
function hvSure2(sn) {
  sn = Math.max(0, Math.floor(sn || 0));
  return Math.floor(sn / 60) + ':' + String(sn % 60).padStart(2, '0');
}

/* Okurken âyetin üstünde yavaşça ilerleyen vurgu + süre göstergesi */
function hvMvIlerleme() {
  const s = hvMvSes;
  if (!s) return;
  const oran = (s.duration && isFinite(s.duration)) ? Math.min(1, s.currentTime / s.duration) : 0;
  document.querySelectorAll('.mv-ayah.okunuyor').forEach(el => {
    el.style.setProperty('--hv-oran', (oran * 100).toFixed(1) + '%');
  });
  const g = document.getElementById('mv-gecen'), t = document.getElementById('mv-toplam');
  const c = document.getElementById('mv-cizgi');
  if (g) g.textContent = hvSure2(s.currentTime);
  if (t) t.textContent = (s.duration && isFinite(s.duration)) ? hvSure2(s.duration) : '--:--';
  if (c && !c.dataset.tutuluyor) c.value = String(Math.round(oran * 100));
  const g2 = document.getElementById('te-gecen'), t2 = document.getElementById('te-toplam');
  if (g2) g2.textContent = hvSure2(s.currentTime);
  if (t2) t2.textContent = (s.duration && isFinite(s.duration)) ? hvSure2(s.duration) : '--:--';
}
window.hvMvIlerleme = hvMvIlerleme;

/* Sesi konumlandır */
function hvMvSar(deger) {
  const s = hvMvSes;
  if (s && s.duration && isFinite(s.duration)) { try { s.currentTime = (deger / 100) * s.duration; } catch (e) {} }
}
window.hvMvSar = hvMvSar;

/* Arapça bitti → moda göre meâli oku ya da sıradaki âyete geç */
function hvMvAyetBitti() {
  if (!hvMvCalisiyor) return;
  if (hvGet('hv_mushaf_mode', 'ar') === 'both') { hvMvMealOku(); return; }
  hvMvSonraki();
}

/* Sayfadaki âyetin Türkçe meâlini oku (Meal ve Arapça+Meal modlarında) */
function hvMvMealOku() {
  const r = hvMvRef[hvMvSira[hvMvKonum]];
  const metin = r ? hvMeal(r[0], r[1]) : '';
  const oncekiR = hvMvKonum > 0 ? hvMvRef[hvMvSira[hvMvKonum - 1]] : null;
  const onceki = oncekiR ? hvMeal(oncekiR[0], oncekiR[1]) : '';
  // Diyanet'in birleştirdiği meâl iki kez okunmasın
  if (!metin || metin === onceki || !hvTtsTurkceVarMi()) { hvMvSonraki(); return; }
  hvTtsOku(metin, () => { if (hvMvCalisiyor) hvMvSonraki(); });
}

/* Okunan âyeti bul, vurgula ve kapsayıcıyı yavaşça ortala */
function hvMvKaydirilabilir(el) {
  let p = el && el.parentElement;
  while (p && p !== document.documentElement) {
    const oy = getComputedStyle(p).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight - p.clientHeight > 8) return p;
    p = p.parentElement;
  }
  return null;
}

function hvMvVurgula(n) {
  document.querySelectorAll('.mv-ayah.okunuyor, .mv-meal.okunuyor, .te-m-ayet.okunuyor')
    .forEach(el => el.classList.remove('okunuyor'));
  if (!n) return;

  // Tam ekran açıksa oradaki kopyayı hedefle (aynı id iki yerde bulunuyor)
  const tam = document.getElementById('mv-full');
  const tamAcik = tam && getComputedStyle(tam).display !== 'none';
  const kok = tamAcik ? tam : document;

  const a = kok.querySelector('#mv-a-' + n) || document.getElementById('mv-a-' + n);
  const m = kok.querySelector('#mv-m-' + n) || kok.querySelector('#te-m-' + n)
            || document.getElementById('mv-m-' + n) || document.getElementById('te-m-' + n);
  if (m) m.classList.add('okunuyor');
  if (!a) return;
  a.classList.add('okunuyor');

  const kap = hvMvKaydirilabilir(a);
  if (!kap) { try { a.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} return; }
  const k = kap.getBoundingClientRect(), r = a.getBoundingClientRect();
  const hedef = kap.scrollTop + (r.top - k.top) - (k.height / 2) + (r.height / 2);
  const son = Math.max(0, Math.min(kap.scrollHeight - kap.clientHeight, hedef));
  try { kap.scrollTo({ top: son, behavior: 'smooth' }); } catch (e) { kap.scrollTop = son; }
}

/* Sayfadaki âyetlerin sûre/âyet karşılığı — ses adresi için gerekir */
let hvMvRef = {};

function hvMvCal(i) {
  if (i < 0 || i >= hvMvSira.length) { hvMvDurdur(); return; }
  hvMvKonum = i;
  hvMvCalisiyor = true;
  hvMvVurgula(hvMvSira[i]);
  hvMvDugmeTazele();

  // "Meal" modunda Arapça çalınmaz, doğrudan Türkçe okunur
  if (hvGet('hv_mushaf_mode', 'ar') === 'tr') {
    try { if (hvMvSes) hvMvSes.pause(); } catch (e) {}
    hvMvMealOku();
    return;
  }

  const ses = hvMvSesNesnesi();
  const r = hvMvRef[hvMvSira[i]];
  ses.src = r ? hvAaUrl(r[0], r[1])
              : 'https://cdn.islamic.network/quran/audio/128/ar.husary/' + hvMvSira[i];
  ses.play().catch(() => {});
  hvMvCalisiyor = true;
  hvMvVurgula(hvMvSira[i]);
  hvMvDugmeTazele();
}

function hvMvSonraki() {
  if (!hvMvCalisiyor) return;
  if (hvMvKonum + 1 < hvMvSira.length) { hvMvCal(hvMvKonum + 1); return; }
  // Sayfa bitti → sonraki sayfaya geç ve okumaya devam et
  const sayfa = parseInt(hvGet('hv_mushaf_page', '1'), 10);
  if (sayfa < HV_MUSHAF_SON) {
    const tam = document.getElementById('mv-full');
    const tamAcik = tam && getComputedStyle(tam).display !== 'none';
    hvSet('hv_mushaf_page', sayfa + 1);
    if (tamAcik) hvTamEkranCiz(true); else renderMushaf(true);
    return;
  }
  hvMvDurdur();
}

function hvMvDurdur() {
  hvMvCalisiyor = false;
  try { if (hvMvSes) hvMvSes.pause(); } catch (e) {}
  try { hvTtsDurdur(); } catch (e) {}
  hvMvVurgula(null);
  hvMvDugmeTazele();
}
window.hvMvDurdur = hvMvDurdur;

function hvMvDugmeTazele() {
  const b = document.getElementById('mv-play');
  if (b) b.innerHTML = hvMvCalisiyor ? '⏸ Duraklat' : '▶️ Dinle';
  const t = document.getElementById('te-play');
  if (t) t.innerHTML = hvMvCalisiyor ? '⏸' : '▶️';
}

function hvMvBasDurdur() {
  if (hvMvCalisiyor) { hvMvDurdur(); return; }
  try { hvTtsIsit(); } catch (e) {}   // iOS: konuşma iznini kullanıcı dokunuşuyla aç
  if (hvGet('hv_mushaf_mode', 'ar') !== 'tr' && hvMvKonum >= 0 && hvMvSes && hvMvSes.src && hvMvSes.currentTime > 0) {
    hvMvCalisiyor = true; hvMvSes.play().catch(() => {});
    hvMvVurgula(hvMvSira[hvMvKonum]); hvMvDugmeTazele();
  } else {
    hvMvCal(Math.max(0, hvMvKonum));
  }
}
window.hvMvBasDurdur = hvMvBasDurdur;

/* Okurken âyet atla */
function hvMvAtla(yon) {
  if (!hvMvSira.length) return;
  try { hvTtsDurdur(); } catch (e) {}
  const y = hvMvKonum + yon;
  if (y < 0) { hvMvCal(0); return; }
  if (y >= hvMvSira.length) { hvMvSonraki(); return; }
  hvMvCalisiyor = true;
  hvMvCal(y);
}
window.hvMvAtla = hvMvAtla;

function hvMvAyettenBasla(n) {
  const i = hvMvSira.indexOf(n);
  if (i >= 0) hvMvCal(i);
}
window.hvMvAyettenBasla = hvMvAyettenBasla;

/* ── Yer imi (sayfa) ───────────────────────────────────────────────── */
function hvMushafImler() { try { return JSON.parse(localStorage.getItem('hv_mushaf_marks') || '[]'); } catch (e) { return []; } }
function hvMushafImDegistir() {
  const p = parseInt(hvGet('hv_mushaf_page', '1'), 10);
  let m = hvMushafImler();
  m = m.indexOf(p) >= 0 ? m.filter(x => x !== p) : m.concat([p]).sort((a, b) => a - b);
  try { localStorage.setItem('hv_mushaf_marks', JSON.stringify(m)); } catch (e) {}
  hvMushafArayuzTazele();
}
window.hvMushafImDegistir = hvMushafImDegistir;

/* ── Ayarlar ───────────────────────────────────────────────────────── */
function hvMushafPunto(delta) {
  let f = parseInt(hvGet('hv_mushaf_font', '30'), 10) + delta;
  f = Math.max(20, Math.min(60, f));
  hvSet('hv_mushaf_font', f);
  const el = document.getElementById('mv-arabic');
  if (el) el.style.fontSize = f + 'px';
  const lbl = document.getElementById('mv-font-val');
  if (lbl) lbl.textContent = f + 'px';
}
window.hvMushafPunto = hvMushafPunto;

function hvMushafModDegistir(m) { hvSet('hv_mushaf_mode', m); hvMushafGit(parseInt(hvGet('hv_mushaf_page', '1'), 10)); }
window.hvMushafModDegistir = hvMushafModDegistir;

function hvMushafQariDegistir(q) {
  hvSet('hv_mushaf_qari', q);
  if (hvMvCalisiyor && hvMvKonum >= 0) hvMvCal(hvMvKonum);
}
window.hvMushafQariDegistir = hvMushafQariDegistir;

/* ── Gezinme ───────────────────────────────────────────────────────── */
function hvMushafGit(p, calmayaDevam) {
  p = Math.max(1, Math.min(HV_MUSHAF_SON, parseInt(p, 10) || 1));
  hvSet('hv_mushaf_page', p);
  renderMushaf(calmayaDevam === true);
}
window.hvMushafGit = hvMushafGit;

function hvMushafAtla() {
  const el = document.getElementById('mv-page-input');
  if (el) hvMushafGit(el.value);
}
window.hvMushafAtla = hvMushafAtla;

function hvMushafArayuzTazele() {
  const p = parseInt(hvGet('hv_mushaf_page', '1'), 10);
  const b = document.getElementById('mv-mark');
  if (b) {
    const imli = hvMushafImler().indexOf(p) >= 0;
    b.classList.toggle('on', imli);
    b.innerHTML = imli ? '⭐' : '☆';
  }
}

/* ── Ekran ─────────────────────────────────────────────────────────── */
/* Parmakla sayfa çevirme — mushaf sağdan sola okunduğu için
   parmağı sağa kaydırmak SONRAKİ, sola kaydırmak ÖNCEKİ sayfaya götürür. */
/* Parmakla sayfa çevirme — ortak yardımcı.
   SOLA kaydır  = sonraki sayfa
   SAĞA kaydır  = önceki sayfa
   (iOS'ta ekran kenarından sağa kaydırma "geri" hareketi olduğu için
    ileri gitmek sola kaydırmaya bağlandı.) */
function hvSayfaKaydirmaBagla(el, git) {
  if (!el || el.dataset.kaydirmaBagli === '1') return;
  el.dataset.kaydirmaBagli = '1';
  let x0 = 0, y0 = 0, xs = 0, ys = 0, izle = false;

  const basla = (x, y) => { x0 = xs = x; y0 = ys = y; izle = true; };
  const surdur = (x, y) => { xs = x; ys = y; };
  const bitir = () => {
    if (!izle) return;
    izle = false;
    const dx = xs - x0, dy = ys - y0;
    if (Math.abs(dx) < 55) return;                    // çok kısa dokunuş
    if (Math.abs(dx) < Math.abs(dy) * 1.4) return;    // dikey kaydırma sayfayı çevirmesin
    const s = parseInt(hvGet('hv_mushaf_page', '1'), 10);
    if (dx < 0 && s < HV_MUSHAF_SON) git(s + 1);      // sola  → ileri
    else if (dx > 0 && s > 1) git(s - 1);             // sağa  → geri
  };

  el.addEventListener('touchstart', e => {
    if (e.touches.length !== 1) { izle = false; return; }
    basla(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  el.addEventListener('touchmove', e => {
    if (!izle || e.touches.length !== 1) return;
    surdur(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  el.addEventListener('touchend', e => {
    const t = e.changedTouches && e.changedTouches[0];
    if (t) surdur(t.clientX, t.clientY);
    bitir();
  }, { passive: true });
  el.addEventListener('touchcancel', () => { izle = false; }, { passive: true });

  // Fare / kalem (masaüstü ve bazı WebView'ler)
  el.addEventListener('pointerdown', e => {
    if (e.pointerType === 'touch') return;
    basla(e.clientX, e.clientY);
  });
  el.addEventListener('pointerup', e => {
    if (e.pointerType === 'touch') return;
    surdur(e.clientX, e.clientY); bitir();
  });
}
window.hvSayfaKaydirmaBagla = hvSayfaKaydirmaBagla;

/* Mushaf sesi: hafız seçimi Kuran Dinle ile ortak */
function hvMushafSesQari(id) {
  hvSet('hv_dinle_qari', id);
  if (hvMvCalisiyor && hvMvKonum >= 0) hvMvCal(hvMvKonum);
}
window.hvMushafSesQari = hvMushafSesQari;

/* Bu sayfayı hatim ilerlemesi olarak işaretle */
function hvMushafHatimIsaretle(sayfa) {
  try {
    hvSave('hatim_page', Math.max(0, Math.min(604, parseInt(sayfa, 10) || 0)));
    if (typeof renderHatim === 'function') renderHatim();
    if (typeof hvToast === 'function') hvToast('✓ Hatim güncellendi', sayfa + '. sayfaya kadar okundu olarak işaretlendi.');
  } catch (e) {}
}
window.hvMushafHatimIsaretle = hvMushafHatimIsaretle;

function hvMushafKaydirmaBagla() {
  hvSayfaKaydirmaBagla(document.getElementById('mv-body'), hvMushafGit);
}
window.hvMushafKaydirmaBagla = hvMushafKaydirmaBagla;

/* ═══════════════════════════════════════════════════════════════════════
   v61.6 — SÛRE ARAMA (sayfa sayfa mushafta doğrudan sûreye atlama)
   Sûre → başlangıç sayfası tablosu. 114'ünün tamamı
   api.alquran.cloud/v1/surah/{n}/quran-uthmani ile tek tek doğrulandı.
   ═══════════════════════════════════════════════════════════════════════ */
const HV_SURE_SAYFA = [1,2,50,77,106,128,151,177,187,208,221,235,249,255,262,267,282,293,305,312,322,332,342,350,359,367,377,385,396,404,411,415,418,428,434,440,446,453,458,467,477,483,489,496,499,502,507,511,515,518,520,523,526,528,531,534,537,542,545,549,551,553,554,556,558,560,562,564,566,568,570,572,574,575,577,578,580,582,583,585,586,587,587,589,590,591,591,592,593,594,595,595,596,596,597,597,598,598,599,599,600,600,601,601,601,602,602,602,603,603,603,604,604,604];

function hvSureSayfasi(no) {
  const p = HV_SURE_SAYFA[Number(no) - 1];
  return p ? p : 1;
}
window.hvSureSayfasi = hvSureSayfasi;

/* Türkçe arama: şapka, ı/i, ş/s… hepsini sadeleştir */
function hvTrNorm(x) {
  return String(x || '')
    .toLocaleLowerCase('tr')
    .replace(/[âäàá]/g, 'a').replace(/[îïìí]/g, 'i').replace(/[ûüùú]/g, 'u')
    .replace(/[ôöòó]/g, 'o').replace(/[êëèé]/g, 'e')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '');
}
window.hvTrNorm = hvTrNorm;

function hvSureListesi() {
  try { return (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : []; } catch (e) { return []; }
}

function hvMushafAraGit(sayfa) {
  hvMushafAraKapat();
  hvMushafGit(sayfa);
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {}
}
window.hvMushafAraGit = hvMushafAraGit;

function hvMushafAraKapat() {
  const g = document.getElementById('mv-ara-sonuc');
  const i = document.getElementById('mv-ara-input');
  if (g) { g.innerHTML = ''; g.classList.remove('acik'); }
  if (i) i.value = '';
  const t = document.getElementById('mv-ara-temizle');
  if (t) t.style.display = 'none';
}
window.hvMushafAraKapat = hvMushafAraKapat;

function hvMushafAraCiz(q) {
  const g = document.getElementById('mv-ara-sonuc');
  if (!g) return;
  const t = document.getElementById('mv-ara-temizle');
  if (t) t.style.display = q ? 'block' : 'none';

  const ara = hvTrNorm(q);
  const liste = hvSureListesi();
  let html = '';

  // Sayfa numarası yazıldıysa önce onu öner
  const say = parseInt(q, 10);
  if (q && /^\d+$/.test(q.trim()) && say >= 1 && say <= HV_MUSHAF_SON) {
    html += `<button class="mv-ara-sat sayfa" onclick="hvMushafAraGit(${say})">
               <span class="mv-ara-no">📄</span>
               <span class="mv-ara-ad">${say}. sayfayı aç</span>
             </button>`;
  }

  const bulunan = liste.filter(s => {
    if (!ara) return true;
    if (String(s.id) === q.trim()) return true;
    return hvTrNorm(s.name).indexOf(ara) >= 0;
  });

  if (!bulunan.length && !html) {
    g.innerHTML = '<div class="mv-ara-yok">Sûre bulunamadı. Örnek: Cuma, Yâsîn, Kehf, 36</div>';
    g.classList.add('acik');
    return;
  }

  html += bulunan.map(s => {
    const p = hvSureSayfasi(s.id);
    return `<button class="mv-ara-sat" onclick="hvMushafAraGit(${p})">
              <span class="mv-ara-no">${s.id}</span>
              <span class="mv-ara-ad">${s.name} Sûresi</span>
              <span class="mv-ara-sy">sayfa ${p}</span>
            </button>`;
  }).join('');

  g.innerHTML = html;
  g.classList.add('acik');
}

function hvMushafAraYaz(q) { hvMushafAraCiz(q); }
window.hvMushafAraYaz = hvMushafAraYaz;

function hvMushafAraAc() {
  const i = document.getElementById('mv-ara-input');
  hvMushafAraCiz(i ? i.value : '');
}
window.hvMushafAraAc = hvMushafAraAc;

async function renderMushaf(calmayaDevam) {
  const kok = document.getElementById('mushaf-root');
  if (!kok) return;

  const sayfa = parseInt(hvGet('hv_mushaf_page', '1'), 10);
  const mod   = hvGet('hv_mushaf_mode', 'ar');
  const font  = parseInt(hvGet('hv_mushaf_font', '30'), 10);
  const qari  = hvGet('hv_mushaf_qari', 'ar.husary');
  const imler = hvMushafImler();

  kok.innerHTML = `
    <div class="page-header-title">
      <h2>📖 Kuran-ı Kerim</h2>
      <p>Sayfa sayfa • gerçek mushaf düzeni • 604 sayfa</p>
    </div>
    <div class="qmode">
      <button class="on">📜 Sayfa Sayfa</button>
      <button onclick="hvKuranModu('sure')">📖 Sure Sure</button>
    </div>

    <div class="mv-ara">
      <span class="mv-ara-ikon">🔍</span>
      <input id="mv-ara-input" type="search" autocomplete="off"
             placeholder="Sûre ara — ör. Cuma, Yâsîn, Kehf ya da 36"
             oninput="hvMushafAraYaz(this.value)" onfocus="hvMushafAraAc()">
      <button id="mv-ara-temizle" class="mv-ara-x" style="display:none"
              onclick="hvMushafAraKapat()">✕</button>
    </div>
    <div id="mv-ara-sonuc" class="mv-ara-sonuc"></div>

    <div class="mv-bar">
      <button class="mv-nav" onclick="hvMushafGit(${sayfa - 1})" ${sayfa <= 1 ? 'disabled' : ''}>‹</button>
      <div class="mv-page-box">
        <input id="mv-page-input" type="number" min="1" max="604" value="${sayfa}"
               onchange="hvMushafAtla()" inputmode="numeric">
        <span>/ 604</span>
      </div>
      <button class="mv-nav" onclick="hvMushafGit(${sayfa + 1})" ${sayfa >= HV_MUSHAF_SON ? 'disabled' : ''}>›</button>
      <button id="mv-mark" class="mv-mark ${imler.indexOf(sayfa) >= 0 ? 'on' : ''}" onclick="hvMushafImDegistir()">${imler.indexOf(sayfa) >= 0 ? '⭐' : '☆'}</button>
      <button class="mv-mark" onclick="hvTamEkranAc()" title="Tam ekran">⛶</button>
    </div>

    <div class="mv-bar mv-bar2">
      <div class="mv-mode">
        <button class="${mod === 'ar' ? 'on' : ''}" onclick="hvMushafModDegistir('ar')">Arapça</button>
        <button class="${mod === 'both' ? 'on' : ''}" onclick="hvMushafModDegistir('both')">Arapça + Meal</button>
        <button class="${mod === 'tr' ? 'on' : ''}" onclick="hvMushafModDegistir('tr')">Meal</button>
      </div>
      <div class="mv-font">
        <button onclick="hvMushafPunto(-2)">A−</button>
        <span id="mv-font-val">${font}px</span>
        <button onclick="hvMushafPunto(2)">A+</button>
      </div>
    </div>

    <div class="mv-ses">
      <button class="mv-ses-yan" onclick="hvMvAtla(-1)" title="Önceki âyet">⏮</button>
      <button id="mv-play" class="mv-play" onclick="hvMvBasDurdur()">${hvMvCalisiyor ? '⏸ Duraklat' : '▶️ Dinle'}</button>
      <button class="mv-ses-yan" onclick="hvMvAtla(1)" title="Sonraki âyet">⏭</button>
    </div>
    <div class="mv-ses2">
      <span id="mv-gecen">0:00</span>
      <input id="mv-cizgi" class="mv-cizgi" type="range" min="0" max="100" value="0"
             oninput="this.dataset.tutuluyor='1'" onchange="hvMvSar(this.value); this.dataset.tutuluyor='';">
      <span id="mv-toplam">--:--</span>
      <select class="mv-qari" onchange="hvMushafSesQari(this.value)">
        ${HV_DINLE_QARILER.map(q => `<option value="${q.id}" ${q.id === hvDnQari().id ? 'selected' : ''}>${q.ad}</option>`).join('')}
      </select>
    </div>

    <div class="mv-ilerleme">
      <div class="mv-il-ust">
        <span>📖 Sayfa <b>${sayfa}</b> / 604</span>
        <span>${Math.min(30, Math.max(1, Math.ceil(sayfa / 20.14)))}. cüz</span>
        <span><b>%${Math.round((sayfa / 604) * 100)}</b></span>
      </div>
      <div class="mv-il-cubuk"><div class="mv-il-dolu" style="width:${Math.round((sayfa / 604) * 100)}%"></div></div>
      <button class="mv-il-btn" onclick="hvMushafHatimIsaretle(${sayfa})">✓ Hatimde buraya kadar okudum</button>
    </div>

    <div class="mv-where">
      ${imler.length
        ? `<div class="mv-marks">${imler.slice(0, 14).map(x =>
            `<button class="mv-chip ${x === sayfa ? 'on' : ''}" onclick="hvMushafGit(${x})">⭐ ${x}</button>`).join('')}
           ${imler.length > 14 ? `<span class="mv-chip-more">+${imler.length - 14}</span>` : ''}</div>`
        : `<div class="mv-marks-empty">Sayfayı kaydetmek için yukarıdaki ☆ düğmesine dokun.</div>`}
    </div>

    <div id="mv-body" class="mv-body"><div class="mv-loading">Sayfa yükleniyor…</div></div>
  `;

  let rows;
  try {
    rows = await hvMushafSayfaGetir(sayfa);
  } catch (e) {
    document.getElementById('mv-body').innerHTML =
      `<div class="mv-error">Sayfa yüklenemedi. İnternet bağlantını kontrol edip tekrar dene.
       <button class="gold-outline-btn" onclick="hvMushafGit(${sayfa})">↻ Tekrar Dene</button></div>`;
    return;
  }

  hvMvSira = rows.map(r => r.n);
  hvMvKonum = -1;

  // Sayfadaki sûre adlarını sayfanın KENDİ verisinden yaz (elle tablo yok)
  const sureNolari = rows.map(r => r.s).filter((x, i, a) => a.indexOf(x) === i);
  const nerede = document.getElementById('mv-where-now');
  if (nerede) nerede.textContent = '📍 Sayfa ' + sayfa + ' • ' + sureNolari.map(hvSureAdi).join(' / ');

  // ── Arapça blok ──
  let arHtml = '';
  let sonSure = null;
  rows.forEach(r => {
    if (r.s !== sonSure) {
      sonSure = r.s;
      if (r.v === 1) {
        arHtml += `<div class="mv-sure-basi">${r.sar}</div>`;
      }
    }
    let metin = r.ar;
    if (r.v === 1 && r.s !== 1 && r.s !== 9) {
      const b = hvBesmeleAyir(metin);
      if (b.besmele) { arHtml += `<div class="mv-besmele">${b.besmele}</div>`; metin = b.kalan; }
    }
    arHtml += `<span class="mv-ayah" id="mv-a-${r.n}">${metin}<span class="mv-num">${hvArNum(r.v)}</span></span> `;
  });

  // ── Meal blok ──
  let trHtml = '';
  let sonSure2 = null;
  rows.forEach((r, i) => {
    if (r.s !== sonSure2) { sonSure2 = r.s; trHtml += `<div class="mv-meal-sure">${r.sadi} Sûresi</div>`; }
    // Diyanet birleşik meallerinde aynı metni tekrar yazma
    if (i > 0 && r.tr && rows[i - 1].tr === r.tr && !hvMealGrupIlk(r.s, r.v)) return;
    trHtml += `<div class="mv-meal" id="mv-m-${r.n}">
                 <span class="mv-meal-no">${hvMealEtiket(r.s, r.v)}</span>${r.tr || '—'}</div>`;
  });

  hvMvSira = rows.map(r => r.n);
  hvMvRef = {}; rows.forEach(r => { hvMvRef[r.n] = [r.s, r.v]; });

  const govde = document.getElementById('mv-body');
  govde.innerHTML =
    (mod !== 'tr' ? `<div id="mv-arabic" class="mv-arabic" style="font-size:${font}px">${arHtml}</div>` : '') +
    (mod !== 'ar' ? `<div class="mv-meal-wrap">${trHtml}</div>` : '') +
    `<div class="mv-swipe-hint">← Sola kaydır: sonraki sayfa · Sağa kaydır: önceki →</div>
     <div class="mv-foot">— ${sayfa} —</div>`;

  hvMushafArayuzTazele();
  hvMushafKaydirmaBagla();
  if (calmayaDevam) { hvMvCalisiyor = true; hvMvCal(0); }
}
window.renderMushaf = renderMushaf;
try { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['mushaf'] = renderMushaf; } catch (e) {}



/* ═══════════════════════════════════════════════════════════════════════
   v61.4 — DUA & SURE EZBERLEME (satır satır dinle ve tekrarla)
   Sureler ve Kur'an'dan olan dualar ayet ayet, sesiyle birlikte.
   Kur'an dışı dualarda (Sübhaneke, Ettehiyyâtü…) hazır ses kaydı
   olmadığı için okunuşundan tekrar edilir.
   ═══════════════════════════════════════════════════════════════════════ */

const HV_SURE_NO = {
  'Fâtiha Sûresi': 1, 'Fîl Sûresi': 105, 'Kureyş Sûresi': 106, 'Mâûn Sûresi': 107,
  'Kevser Sûresi': 108, 'Kâfirûn Sûresi': 109, 'Nasr Sûresi': 110, 'Tebbet (Mesed) Sûresi': 111,
  'İhlâs Sûresi': 112, 'Felâk Sûresi': 113, 'Nâs Sûresi': 114, 'Asr Sûresi': 103,
  'Kadir Sûresi': 97, 'İnşirâh (Şerh) Sûresi': 94, 'Tîn Sûresi': 95, 'Zilzâl Sûresi': 99
};

// Kur'an'dan olan dualar → ayet aralığı (sesli çalışır)
const HV_DUA_AYET = {
  'Âyetel Kürsî': { s: 2, bas: 255, son: 255 },
  'Âmenerrasûlü (Bakara 285-286)': { s: 2, bas: 285, son: 286 }
};

let hvEzKayit = null;   // { baslik, parcalar:[{ar,ok,tr,ses}], sesVar }
let hvEzIdx = 0;
let hvEzSes = null;
let hvEzTekrar = 1, hvEzKalan = 0;

function hvEzSesNesnesi() {
  if (!hvEzSes) {
    hvEzSes = new Audio();
    hvEzSes.addEventListener('ended', () => {
      if (hvEzKalan > 1) { hvEzKalan--; try { hvEzSes.currentTime = 0; hvEzSes.play(); } catch (e) {} }
      else { hvEzDugmeTazele(false); }
    });
    hvEzSes.addEventListener('error', () => hvEzDugmeTazele(false));
  }
  return hvEzSes;
}
function hvEzSesDurdur() { try { if (hvEzSes) hvEzSes.pause(); } catch (e) {} hvEzKalan = 0; hvEzDugmeTazele(false); }
window.hvEzSesDurdur = hvEzSesDurdur;

function hvEzDugmeTazele(caliyor) {
  const b = document.getElementById('ez-play');
  if (b) b.innerHTML = caliyor ? '⏸ Durdur' : '🔊 Dinle';
}

function hvEzCal() {
  const p = hvEzKayit && hvEzKayit.parcalar[hvEzIdx];
  if (!p || !p.ses) return;
  if (hvEzSes && !hvEzSes.paused) { hvEzSesDurdur(); return; }
  const s = hvEzSesNesnesi();
  hvEzKalan = hvEzTekrar;
  s.src = p.ses;
  s.play().catch(() => {});
  hvEzDugmeTazele(true);
}
window.hvEzCal = hvEzCal;

function hvEzTekrarAyarla(n) {
  hvEzTekrar = parseInt(n, 10) || 1;
  hvSet('hv_ezber_tekrar', hvEzTekrar);
  document.querySelectorAll('.ez-rep button').forEach(b => b.classList.toggle('on', b.dataset.n === String(hvEzTekrar)));
}
window.hvEzTekrarAyarla = hvEzTekrarAyarla;

/* Öğrendim işaretleri */
function hvEzOgrenilenler() {
  try { return JSON.parse(localStorage.getItem('hv_ezber_ogrenildi') || '[]'); } catch (e) { return []; }
}
function hvEzOgrenildiMi(anahtar) { return hvEzOgrenilenler().indexOf(anahtar) >= 0; }

function hvEzOgrendimDegistir() {
  if (!hvEzKayit) return;
  let l = hvEzOgrenilenler();
  const a = hvEzKayit.anahtar;
  l = l.indexOf(a) >= 0 ? l.filter(x => x !== a) : l.concat([a]);
  try { localStorage.setItem('hv_ezber_ogrenildi', JSON.stringify(l)); } catch (e) {}
  const b = document.getElementById('ez-ogrendim');
  if (b) {
    const on = l.indexOf(a) >= 0;
    b.classList.toggle('on', on);
    b.innerHTML = on ? '✓ Öğrendim' : '○ Öğrendim';
  }
}
window.hvEzOgrendimDegistir = hvEzOgrendimDegistir;

function hvEzGit(i) {
  if (!hvEzKayit) return;
  hvEzSesDurdur();
  hvEzIdx = Math.max(0, Math.min(hvEzKayit.parcalar.length - 1, i));
  try { localStorage.setItem('hv_ezber_' + hvEzKayit.anahtar, String(hvEzIdx)); } catch (e) {}
  hvEzParcaCiz();
}
window.hvEzGit = hvEzGit;

function hvEzParcaCiz() {
  const kutu = document.getElementById('ez-step');
  if (!kutu || !hvEzKayit) return;
  const top = hvEzKayit.parcalar.length;
  const p = hvEzKayit.parcalar[hvEzIdx];
  const sonuncu = hvEzIdx === top - 1;

  kutu.innerHTML = `
    <div class="ez-count">${hvEzIdx + 1} / ${top}</div>
    <div class="ez-dots">${hvEzKayit.parcalar.map((_, i) =>
      `<span class="ez-dot ${i === hvEzIdx ? 'on' : (i < hvEzIdx ? 'done' : '')}" onclick="hvEzGit(${i})"></span>`).join('')}</div>

    <div class="ez-ar">${p.ar}</div>
    ${p.ok ? `<div class="ez-ok">${p.ok}</div>` : ''}
    ${p.tr ? `<div class="ez-tr">${p.tr}</div>` : ''}

    <div class="ez-controls">
      ${p.ses
        ? `<button id="ez-play" class="ez-play" onclick="hvEzCal()">🔊 Dinle</button>
           <div class="ez-rep">
             <span>Tekrar:</span>
             ${[1, 3, 5].map(n => `<button data-n="${n}" class="${hvEzTekrar === n ? 'on' : ''}" onclick="hvEzTekrarAyarla(${n})">${n}×</button>`).join('')}
           </div>`
        : `<div class="ez-nosound">Bu dua Kur'an'dan olmadığı için hazır ses kaydı yok — okunuşundan tekrar edin.</div>`}
    </div>

    <div class="ez-nav">
      <button class="gold-outline-btn" onclick="hvEzGit(${hvEzIdx - 1})" ${hvEzIdx === 0 ? 'disabled' : ''}>← Önceki</button>
      ${sonuncu
        ? `<button class="gold-primary-btn" onclick="hvEzTumu()">✅ Tamamını Gör</button>`
        : `<button class="gold-primary-btn" onclick="hvEzGit(${hvEzIdx + 1})">Sonraki →</button>`}
    </div>
    ${sonuncu ? '' : `<button class="ez-full-link" onclick="hvEzTumu()">📖 Tamamını oku</button>`}
  `;
}

// Aynı metin her parçada tekrarlanıyorsa (dualarda Arapça ve anlam) bir kez yaz
function hvEzTekilBirlestir(dizi) {
  const temiz = dizi.filter(Boolean);
  const tekil = temiz.filter((x, i) => temiz.indexOf(x) === i);
  return tekil.join(' ');
}

function hvEzTumu() {
  hvEzSesDurdur();
  const kutu = document.getElementById('ez-step');
  if (!kutu || !hvEzKayit) return;
  kutu.innerHTML = `
    <div class="ez-done-title">🎉 ${hvEzKayit.baslik} — tamamı</div>
    <div class="ez-ar ez-ar-full">${hvEzTekilBirlestir(hvEzKayit.parcalar.map(p => p.ar))}</div>
    <div class="ez-ok">${hvEzKayit.parcalar.map(p => p.ok).filter(Boolean).join(' ')}</div>
    <div class="ez-tr">${hvEzTekilBirlestir(hvEzKayit.parcalar.map(p => p.tr))}</div>
    <div class="ez-nav">
      <button class="gold-outline-btn" onclick="hvEzGit(0)">↺ Baştan Başla</button>
      <button class="gold-primary-btn" onclick="renderEzber()">← Listeye Dön</button>
    </div>
  `;
}
window.hvEzTumu = hvEzTumu;

/* ── Kayıt yükleme ─────────────────────────────────────────────────── */
async function hvEzAyetleriGetir(sureNo, bas, son) {
  const qari = hvGet('hv_mushaf_qari', 'ar.husary');
  await hvMealHazir();   // Türkçe meal uygulamanın içinden (Diyanet)
  const res = await fetch('https://api.alquran.cloud/v1/surah/' + sureNo +
    '/editions/quran-uthmani,tr.transliteration,' + qari);
  const j = await res.json();
  if (!j || !j.data || j.data.length < 3) throw new Error('Ayetler alınamadı');
  const ar = j.data[0].ayahs, ok = j.data[1].ayahs, se = j.data[2].ayahs;
  const out = [];
  ar.forEach((a, i) => {
    if (bas && (a.numberInSurah < bas || a.numberInSurah > son)) return;
    let metin = a.text;
    if (a.numberInSurah === 1 && sureNo !== 1 && sureNo !== 9) {
      const b = hvBesmeleAyir(metin);
      if (b.besmele) metin = b.kalan;
    }
    out.push({
      ar: metin,
      ok: ok[i] ? ok[i].text : '',
      tr: hvMeal(sureNo, a.numberInSurah),
      ses: se[i] ? se[i].audio : ''
    });
  });
  return out;
}

// Okunuşu ezberlenebilir parçalara ayırır.
// Önce cümle sonlarından, olmazsa "ve" bağlaçlarından böler.
function hvEzCumleBol(metin) {
  if (!metin) return [];
  let p = metin.split(/(?<=[.!?])\s+/).map(x => x.trim()).filter(Boolean);
  if (p.length < 2) {
    p = metin.split(/\s+(?=ve\s)/i).map(x => x.trim()).filter(Boolean);
  }
  // Çok uzun parçaları ikiye böl, çok kısa olanları öncekine ekle
  const son = [];
  p.forEach(x => {
    if (son.length && x.length < 12) { son[son.length - 1] += ' ' + x; return; }
    son.push(x);
  });
  return son.length ? son : [metin];
}

async function hvEzAc(tur, ad) {
  const kok = document.getElementById('ezber-root');
  if (!kok) return;
  hvEzSesDurdur();
  hvEzTekrar = parseInt(hvGet('hv_ezber_tekrar', '1'), 10) || 1;

  kok.innerHTML = `
    <div class="page-header-title"><h2>🧠 ${ad}</h2><p>Parça parça dinle ve tekrarla</p></div>
    <div class="ez-ust-satir">
      <button class="gold-outline-btn" onclick="renderEzber()">← Listeye Dön</button>
      <button id="ez-ogrendim" class="ez-ogrendim" onclick="hvEzOgrendimDegistir()">○ Öğrendim</button>
    </div>
    <div id="ez-step" class="ez-step"><div class="mv-loading">Yükleniyor…</div></div>
  `;

  try {
    let parcalar = [];
    if (tur === 'sure') {
      parcalar = await hvEzAyetleriGetir(HV_SURE_NO[ad], 0, 0);
    } else if (tur === 'kurandua') {
      const a = HV_DUA_AYET[ad];
      parcalar = await hvEzAyetleriGetir(a.s, a.bas, a.son);
    } else {
      const d = (typeof DUA_LEARN !== 'undefined' ? DUA_LEARN : []).find(x => x.title === ad);
      if (!d) throw new Error('Dua bulunamadı');
      // Arapça metni parçalamıyoruz — bütünlüğü bozulmasın diye her adımda
      // tamamı üstte durur; altında o adımın okunuşu ve duanın anlamı gösterilir.
      const okP = hvEzCumleBol(d.okunusu);
      parcalar = okP.map(o => ({ ar: d.arabic, ok: o, tr: d.turkish, ses: '' }));
      if (!parcalar.length) parcalar = [{ ar: d.arabic, ok: d.okunusu, tr: d.turkish, ses: '' }];
    }

    hvEzKayit = { baslik: ad, parcalar: parcalar, anahtar: (tur + '_' + ad).replace(/\s+/g, '_') };
    let kaldigi = 0;
    try { kaldigi = parseInt(localStorage.getItem('hv_ezber_' + hvEzKayit.anahtar) || '0', 10) || 0; } catch (e) {}
    hvEzIdx = Math.max(0, Math.min(parcalar.length - 1, kaldigi));
    const ob = document.getElementById('ez-ogrendim');
    if (ob) {
      const on = hvEzOgrenildiMi(hvEzKayit.anahtar);
      ob.classList.toggle('on', on);
      ob.innerHTML = on ? '✓ Öğrendim' : '○ Öğrendim';
    }
    hvEzParcaCiz();
  } catch (e) {
    const s = document.getElementById('ez-step');
    if (s) s.innerHTML = `<div class="mv-error">Yüklenemedi. İnternet bağlantını kontrol et.
      <button class="gold-outline-btn" onclick="hvEzAc('${tur}','${ad.replace(/'/g, "\\'")}')">↻ Tekrar Dene</button></div>`;
  }
}
window.hvEzAc = hvEzAc;

function renderEzber() {
  const kok = document.getElementById('ezber-root');
  if (!kok) return;
  hvEzSesDurdur();

  const sureler = Object.keys(HV_SURE_NO);
  const kuranDua = Object.keys(HV_DUA_AYET);
  const digerDua = (typeof DUA_LEARN !== 'undefined' ? DUA_LEARN : [])
    .map(d => d.title).filter(t => !HV_DUA_AYET[t]);

  const kart = (tur, ad, alt, sesli) => {
    const anahtar = (tur + '_' + ad).replace(/\s+/g, '_');
    const ogr = hvEzOgrenildiMi(anahtar);
    return `
    <button class="ez-card ${ogr ? 'ogrenildi' : ''}" onclick="hvEzAc('${tur}','${ad.replace(/'/g, "\\'")}')">
      <span class="ez-card-t">${ogr ? '✓ ' : ''}${ad}</span>
      <span class="ez-card-s">${alt}</span>
      ${sesli ? '<span class="ez-badge">🔊 Sesli</span>' : '<span class="ez-badge muted">Okunuşlu</span>'}
    </button>`;
  };

  kok.innerHTML = `
    <div class="page-header-title">
      <h2>🧠 Dua & Sure Ezberle</h2>
      <p>Parça parça dinle, tekrarla, ezberle</p>
    </div>
    ${hvEzOgrenilenler().length ? `<div class="ez-sayac">✓ ${hvEzOgrenilenler().length} metin öğrenildi olarak işaretli</div>` : ''}
    <div class="ez-info">Her metin küçük parçalara ayrılır. Bir parçayı dinle, kendin tekrar et, hazır olunca sonrakine geç. Kaldığın yer hatırlanır.</div>

    <div class="ez-group-title">📖 Kısa Sureler</div>
    <div class="ez-grid">${sureler.map(s => kart('sure', s, 'Ayet ayet', true)).join('')}</div>

    <div class="ez-group-title">🤲 Kur'an'dan Dualar</div>
    <div class="ez-grid">${kuranDua.map(s => kart('kurandua', s, 'Ayet ayet', true)).join('')}</div>

    <div class="ez-group-title">🕌 Namaz Duaları</div>
    <div class="ez-grid">${digerDua.map(s => kart('dua', s, 'Satır satır', false)).join('')}</div>
  `;
}
window.renderEzber = renderEzber;
try { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['ezber'] = renderEzber; } catch (e) {}

/* ── Sure adı / kaldığın yer ────────────────────────────────────── */
function hvSureAdi(no) {
  try {
    const l = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : [];
    const s = l.find(x => Number(x.id) === Number(no));
    if (s && s.name) return s.name + ' Sûresi';
  } catch (e) {}
  return no + '. Sûre';
}


// Sure sure ↔ sayfa sayfa geçişi
function hvKuranModu(mod) {
  if (mod === 'sayfa') { navigateTo('mushaf'); return; }
  const liste = document.getElementById('surah-list-view');
  const detay = document.getElementById('surah-detail-view');
  if (liste) liste.style.display = 'block';
  if (detay) detay.style.display = 'none';
  navigateTo('quran');
}
window.hvKuranModu = hvKuranModu;

/* ═══════════════════════════════════════════════════════════════════════
   v61.4 — KURAN DİNLE
   Sure sure kesintisiz dinleme. Uygulamanın başka bölümlerine geçsen de
   çalmaya devam eder; kilit ekranından da yönetilebilir.
   Kaynak: mp3quran.net (uygulamada zaten kullanılan sunucu)
   ═══════════════════════════════════════════════════════════════════════ */

const HV_DINLE_QARILER = [
  { id: 'husr',   sunucu: 'server13', ad: 'Mahmud Halil el-Husarî' },
  { id: 'afs',    sunucu: 'server8',  ad: 'Mishary Rashid Alafasy' },
  { id: 'minsh',  sunucu: 'server10', ad: 'Muhammed Sıddık el-Minşâvî' },
  { id: 'yasser', sunucu: 'server11', ad: 'Yâsir ed-Devserî' }
];

let hvDnSes = null;
let hvDnSure = 0;          // 0 = seçilmemiş
let hvDnCaliyor = false;

function hvDnSureAdi(no) {
  try {
    const l = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : [];
    const s = l.find(x => Number(x.id) === Number(no));
    if (s && s.name) return s.name;
  } catch (e) {}
  return no + '. Sûre';
}
function hvDnQari() {
  const id = hvGet('hv_dinle_qari', 'husr');
  return HV_DINLE_QARILER.find(q => q.id === id) || HV_DINLE_QARILER[0];
}
function hvDnUrl(no) {
  const q = hvDnQari();
  return 'https://' + q.sunucu + '.mp3quran.net/' + q.id + '/' + String(no).padStart(3, '0') + '.mp3';
}
function hvDnSure2(sn) { const m = Math.floor(sn / 60), s = Math.floor(sn % 60); return m + ':' + (s < 10 ? '0' : '') + s; }

function hvDnNesne() {
  if (hvDnSes) return hvDnSes;
  hvDnSes = new Audio();
  hvDnSes.preload = 'metadata';

  hvDnSes.addEventListener('timeupdate', () => {
    const c = document.getElementById('dn-cizgi');
    const g = document.getElementById('dn-gecen');
    const t = document.getElementById('dn-toplam');
    if (c && hvDnSes.duration) c.value = (hvDnSes.currentTime / hvDnSes.duration) * 100;
    if (g) g.textContent = hvDnSure2(hvDnSes.currentTime || 0);
    if (t) t.textContent = hvDnSes.duration ? hvDnSure2(hvDnSes.duration) : '--:--';
    if (hvDnSure) { try { localStorage.setItem('hv_dinle_pos', String(Math.floor(hvDnSes.currentTime))); } catch (e) {} }
  });

  hvDnSes.addEventListener('ended', () => {
    const surekli = hvGet('hv_dinle_surekli', '1') === '1';
    if (surekli && hvDnSure < 114) { hvDnCal(hvDnSure + 1); }
    else { hvDnCaliyor = false; hvDnTazele(); }
  });

  hvDnSes.addEventListener('error', () => {
    hvDnCaliyor = false; hvDnTazele();
    try { showToastNotification('🔇 Ses yüklenemedi', 'İnternet bağlantını kontrol et ya da başka bir okuyucu seç.'); } catch (e) {}
  });

  hvDnSes.addEventListener('play',  () => { hvDnCaliyor = true;  hvDnTazele(); });
  hvDnSes.addEventListener('pause', () => { hvDnCaliyor = false; hvDnTazele(); });
  return hvDnSes;
}

// Kilit ekranı / kulaklık düğmeleri
function hvDnMedyaBilgisi() {
  try {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: hvDnSureAdi(hvDnSure) + ' Sûresi',
      artist: hvDnQari().ad,
      album: 'Kur\'an-ı Kerim — Namaz Dostu'
    });
    navigator.mediaSession.setActionHandler('play',  () => hvDnBasDurdur());
    navigator.mediaSession.setActionHandler('pause', () => hvDnBasDurdur());
    navigator.mediaSession.setActionHandler('previoustrack', () => hvDnAtla(-1));
    navigator.mediaSession.setActionHandler('nexttrack',     () => hvDnAtla(1));
  } catch (e) {}
}

function hvDnCal(no, baslangicSn) {
  if (hvDnMod() !== 'ar') { hvAaCal(no, 0); return; }
  no = Math.max(1, Math.min(114, parseInt(no, 10) || 1));
  hvDnSure = no;
  hvSet('hv_dinle_sure', no);
  const s = hvDnNesne();
  s.src = hvDnUrl(no);
  s.load();
  if (baslangicSn) {
    const atla = () => { try { s.currentTime = baslangicSn; } catch (e) {} s.removeEventListener('loadedmetadata', atla); };
    s.addEventListener('loadedmetadata', atla);
  } else {
    try { localStorage.setItem('hv_dinle_pos', '0'); } catch (e) {}
  }
  s.play().catch(() => {});
  hvDnMedyaBilgisi();
  hvDnTazele();
}
window.hvDnCal = hvDnCal;

function hvDnBasDurdur() {
  if (hvDnMod() !== 'ar') { hvAaBasDurdur(); return; }
  const s = hvDnNesne();
  if (!hvDnSure) { hvDnCal(parseInt(hvGet('hv_dinle_sure', '1'), 10)); return; }
  if (s.paused) { if (!s.src) { hvDnCal(hvDnSure); return; } s.play().catch(() => {}); }
  else s.pause();
}
window.hvDnBasDurdur = hvDnBasDurdur;

function hvDnAtla(yon) {
  if (hvDnMod() !== 'ar') { hvAaAtlaAyet(yon); return; }   // âyet âyet modda âyet atlar
  const y = hvDnSure + yon;
  if (y < 1 || y > 114) return;
  hvDnCal(y);
}
window.hvDnAtla = hvDnAtla;

function hvDnSar(deger) {
  const s = hvDnNesne();
  if (s.duration) { try { s.currentTime = (deger / 100) * s.duration; } catch (e) {} }
}
window.hvDnSar = hvDnSar;

function hvDnQariDegistir(id) {
  hvSet('hv_dinle_qari', id);
  if (hvDnMod() !== 'ar') {
    const devam = hvAaCaliyor;
    hvAaDurdur();
    if (devam && hvAaSure) hvAaCal(hvAaSure, hvAaIdx);
    hvDnTazele();
    return;
  }
  if (hvDnSure) {
    const kaldi = hvDnSes ? hvDnSes.currentTime : 0;
    const caliyordu = hvDnCaliyor;
    hvDnCal(hvDnSure, kaldi);
    if (!caliyordu && hvDnSes) hvDnSes.pause();
  }
  hvDnTazele();
}
window.hvDnQariDegistir = hvDnQariDegistir;

function hvDnSurekliDegistir(el) { hvSet('hv_dinle_surekli', el.checked ? '1' : '0'); }
window.hvDnSurekliDegistir = hvDnSurekliDegistir;

function hvDnTazele() {
  const ayetMod = hvDnMod() !== 'ar';
  const b = document.getElementById('dn-play');
  if (b) b.innerHTML = (ayetMod ? hvAaCaliyor : hvDnCaliyor) ? '⏸' : '▶️';
  const ad = document.getElementById('dn-simdi');
  const aktif = ayetMod ? hvAaSure : hvDnSure;
  if (ad) ad.textContent = aktif ? (hvDnSureAdi(aktif) + ' Sûresi') : 'Bir sûre seçin';
  const q = document.getElementById('dn-qari-ad');
  if (q) q.textContent = hvDnQari().ad;
  document.querySelectorAll('.dn-sure').forEach(el => {
    el.classList.toggle('caliyor', Number(el.dataset.no) === aktif);
  });
}

function hvDnAra(q) {
  const t = (q || '').toLocaleLowerCase('tr').trim();
  document.querySelectorAll('.dn-sure').forEach(el => {
    const ad = (el.dataset.ad || '').toLocaleLowerCase('tr');
    el.style.display = (!t || ad.includes(t) || el.dataset.no === t) ? '' : 'none';
  });
}
window.hvDnAra = hvDnAra;

/* ═══════════════════════════════════════════════════════════════════════
   v62.1 — KURAN DİNLE: ÂYET ÂYET ARAPÇA + TÜRKÇE MEÂL
   Üç mod: Arapça (tam sûre kaydı) · Arapça + Meal · Sadece Meal
   Meâli telefonun kendi Türkçe sesi okur (Web Speech). Cihazda en iyi
   Türkçe ses otomatik seçilir; hız ve ton meal okumaya göre ayarlanır.
   ═══════════════════════════════════════════════════════════════════════ */

/* everyayah.com âyet âyet kayıtları — dördü de doğrulandı */
const HV_AA_KLASOR = {
  husr:   'Husary_128kbps',
  afs:    'Alafasy_128kbps',
  minsh:  'Minshawy_Murattal_128kbps',
  yasser: 'Yasser_Ad-Dussary_128kbps'
};
function hvAaUrl(sure, ayet) {
  const q = hvDnQari();
  const k = HV_AA_KLASOR[q.id] || HV_AA_KLASOR.husr;
  const p3 = n => String(n).padStart(3, '0');
  return 'https://everyayah.com/data/' + k + '/' + p3(sure) + p3(ayet) + '.mp3';
}

function hvDnMod() { return hvGet('hv_dinle_mod', 'ar'); }
function hvDnModDegistir(m) {
  hvAaDurdur(); hvDnDurdurTam();
  hvSet('hv_dinle_mod', m);
  renderDinle();
}
window.hvDnModDegistir = hvDnModDegistir;

/* ── Türkçe ses (Web Speech) ───────────────────────────────────────── */
let hvTtsSecili = null;
function hvTtsSesler() {
  try { return window.speechSynthesis ? speechSynthesis.getVoices() : []; } catch (e) { return []; }
}
function hvTtsVar() { return !!window.speechSynthesis; }
function hvTtsTurkceSesler() {
  return hvTtsSesler().filter(v => /^tr(-|_|$)/i.test(v.lang || ''));
}
window.hvTtsTurkceSesler = hvTtsTurkceSesler;

function hvTtsSesSec(ad) {
  hvSet('hv_tts_ses', ad || '');
  hvTtsSecili = null;
  hvTtsTurkceSes();
}
window.hvTtsSesSec = hvTtsSesSec;

function hvTtsTurkceSes() {
  if (hvTtsSecili) return hvTtsSecili;
  const hepsi = hvTtsTurkceSesler();
  if (!hepsi.length) return null;
  // Kullanıcı elle bir ses seçtiyse onu kullan
  const secilenAd = hvGet('hv_tts_ses', '');
  if (secilenAd) {
    const bul = hepsi.find(v => v.name === secilenAd);
    if (bul) { hvTtsSecili = bul; return bul; }
  }
  // Önce "geliştirilmiş/premium" sesler, sonra cihazın kendi sesi
  const puan = v => {
    const ad = (v.name || '').toLowerCase();
    let p = 0;
    if (/premium|enhanced|geliştir|neural|natural/.test(ad)) p += 10;
    if (/yelda|filiz|tolga|emel/.test(ad)) p += 4;
    if (v.localService) p += 2;
    return p;
  };
  hepsi.sort((a, b) => puan(b) - puan(a));
  hvTtsSecili = hepsi[0];
  return hvTtsSecili;
}
try {
  if (window.speechSynthesis && typeof speechSynthesis.addEventListener === 'function') {
    speechSynthesis.addEventListener('voiceschanged', () => { hvTtsSecili = null; hvTtsTurkceSes(); });
  }
} catch (e) {}

function hvTtsHiz() { return parseFloat(hvGet('hv_tts_hiz', '0.9')) || 0.9; }
function hvTtsHizDegistir(v) { hvSet('hv_tts_hiz', v); document.querySelectorAll('.dn-hiz button').forEach(b => b.classList.toggle('on', b.dataset.h === String(v))); }
window.hvTtsHizDegistir = hvTtsHizDegistir;

/* Uzun meâli cümlelere böl — robot tınısını azaltır, iOS'ta kesilmeyi önler */
function hvTtsParcala(metin) {
  const t = String(metin || '').replace(/\s+/g, ' ').trim();
  if (!t) return [];
  const p = t.match(/[^.!?;:]+[.!?;:]*\s*/g) || [t];
  const out = []; let biriktir = '';
  p.forEach(x => {
    if ((biriktir + x).length < 90) { biriktir += x; }
    else { if (biriktir.trim()) out.push(biriktir.trim()); biriktir = x; }
  });
  if (biriktir.trim()) out.push(biriktir.trim());
  return out;
}

function hvTtsDurdur() { try { speechSynthesis.cancel(); } catch (e) {} }

/* iOS/Safari konuşmayı yalnızca kullanıcı dokunuşundan sonra başlatır.
   ▶️ tuşuna basıldığında sessiz bir cümle söyleyip izni açarız. */
let hvTtsIsitildi = false;
function hvTtsIsit() {
  if (hvTtsIsitildi || !hvTtsVar()) return;
  try {
    hvTtsTurkceSes();                       // ses listesini tetikle
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0; u.rate = 1; u.lang = 'tr-TR';
    speechSynthesis.speak(u);
    hvTtsIsitildi = true;
  } catch (e) {}
}
window.hvTtsIsit = hvTtsIsit;

function hvTtsOku(metin, bitince) {
  if (!hvTtsVar()) { if (bitince) bitince(false); return; }
  const parcalar = hvTtsParcala(metin);
  if (!parcalar.length) { if (bitince) bitince(true); return; }
  const ses = hvTtsTurkceSes();
  try { speechSynthesis.cancel(); } catch (e) {}
  let i = 0, nobet = null;
  const temizle = () => { if (nobet) { clearTimeout(nobet); nobet = null; } };
  const sonraki = () => {
    temizle();
    // Hem Kuran Dinle hem Kuran Oku bu okuyucuyu kullanır
    if (!hvAaCaliyor && !hvMvCalisiyor) return;
    if (i >= parcalar.length) { if (bitince) bitince(true); return; }
    const metinParca = parcalar[i++];
    const u = new SpeechSynthesisUtterance(metinParca);
    u.lang = 'tr-TR';
    if (ses) u.voice = ses;
    u.rate = hvTtsHiz();
    u.pitch = 1.0;
    u.volume = 1.0;
    let bitti = false;
    const bir = ok => { if (bitti) return; bitti = true; temizle(); ok ? sonraki() : (bitince && bitince(false)); };
    u.onend = () => bir(true);
    u.onerror = () => bir(false);
    // Emniyet: bazı cihazlarda onend hiç gelmez → tahmini süre + 3sn sonra devam
    const tahmin = Math.max(2500, (metinParca.length * 95) / Math.max(0.5, hvTtsHiz()) + 3000);
    nobet = setTimeout(() => bir(true), tahmin);
    try { speechSynthesis.speak(u); } catch (e) { bir(false); }
  };
  sonraki();
}

/* Cihazda Türkçe ses var mı? (yoksa kullanıcıya söylenir) */
function hvTtsTurkceVarMi() { return !!(hvTtsVar() && hvTtsTurkceSes()); }
window.hvTtsTurkceVarMi = hvTtsTurkceVarMi;

/* ── Âyet âyet çalar ───────────────────────────────────────────────── */
let hvAaSure = 0, hvAaIdx = 0, hvAaCaliyor = false, hvAaSes = null, hvAaListe = [];

function hvAaSesNesnesi() {
  if (!hvAaSes) {
    hvAaSes = new Audio();
    hvAaSes.preload = 'auto';
    hvAaSes.addEventListener('ended', () => {
      if (!hvAaCaliyor) return;
      if (hvDnMod() === 'both') hvAaMealOku();
      else hvAaSonraki();
    });
    hvAaSes.addEventListener('error', () => {
      if (!hvAaCaliyor) return;
      if (hvDnMod() === 'both') hvAaMealOku(); else hvAaSonraki();
    });
  }
  return hvAaSes;
}

function hvAaListeKur(sure) {
  const liste = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : [];
  const s = liste.find(x => Number(x.id) === Number(sure));
  const adet = s ? Number(s.verse_count) : 0;
  const out = [];
  let oncekiMeal = null;
  for (let v = 1; v <= adet; v++) {
    const tr = (typeof hvMeal === 'function') ? hvMeal(sure, v) : '';
    // Diyanet birleşik meâllerinde metin bir kez okunur
    const tekrar = (tr && tr === oncekiMeal);
    oncekiMeal = tr;
    out.push({ v: v, tr: tr, okuma: !tekrar });
  }
  return out;
}

async function hvAaCal(sure, baslaIdx) {
  try { hvTtsIsit(); } catch (e) {}
  await hvMealHazir();
  hvAaSure = Math.max(1, Math.min(114, parseInt(sure, 10) || 1));
  hvAaListe = hvAaListeKur(hvAaSure);
  hvAaIdx = Math.max(0, Math.min(hvAaListe.length - 1, parseInt(baslaIdx, 10) || 0));
  hvAaCaliyor = true;
  hvSet('hv_dinle_sure', hvAaSure);
  hvAaOynat();
}
window.hvAaCal = hvAaCal;

function hvAaOynat() {
  if (!hvAaCaliyor) return;
  if (hvAaIdx >= hvAaListe.length) {   // sûre bitti
    if (hvGet('hv_dinle_surekli', '1') === '1' && hvAaSure < 114) { hvAaCal(hvAaSure + 1, 0); return; }
    hvAaIdx = Math.max(0, hvAaListe.length - 1);   // son âyet ekranda kalsın
    hvAaDurdur(); return;
  }
  hvAaEkran();
  const mod = hvDnMod();
  if (mod === 'tr') { hvAaMealOku(); return; }
  const s = hvAaSesNesnesi();
  s.src = hvAaUrl(hvAaSure, hvAaListe[hvAaIdx].v);
  s.play().catch(() => { if (hvAaCaliyor) { if (mod === 'both') hvAaMealOku(); else hvAaSonraki(); } });
}

function hvAaMealOku() {
  const p = hvAaListe[hvAaIdx];
  if (!p || !p.okuma || !p.tr) { hvAaSonraki(); return; }
  if (!hvTtsTurkceVarMi()) {
    // Türkçe ses yoksa meâli sadece ekranda göster, 6 sn bekleyip geç
    setTimeout(() => { if (hvAaCaliyor) hvAaSonraki(); }, 6000);
    return;
  }
  hvTtsOku(p.tr, () => { if (hvAaCaliyor) hvAaSonraki(); });
}

function hvAaSonraki() {
  hvAaIdx++;
  hvAaOynat();
}

function hvAaAtlaAyet(yon) {
  if (!hvAaListe.length) return;
  hvTtsDurdur();
  try { if (hvAaSes) hvAaSes.pause(); } catch (e) {}
  hvAaIdx = Math.max(0, Math.min(hvAaListe.length - 1, hvAaIdx + yon));
  if (hvAaCaliyor) hvAaOynat(); else hvAaEkran();
}
window.hvAaAtlaAyet = hvAaAtlaAyet;

function hvAaDurdur() {
  hvAaCaliyor = false;
  hvTtsDurdur();
  try { if (hvAaSes) hvAaSes.pause(); } catch (e) {}
  hvAaEkran();
  hvDnTazele();
}
window.hvAaDurdur = hvAaDurdur;

function hvAaBasDurdur() {
  if (hvAaCaliyor) { hvAaDurdur(); return; }
  try { hvTtsIsit(); } catch (e) {}
  const sure = hvAaSure || parseInt(hvGet('hv_dinle_sure', '1'), 10) || 1;
  hvAaCal(sure, hvAaIdx);
}
window.hvAaBasDurdur = hvAaBasDurdur;

function hvAaEkran() {
  const k = document.getElementById('dn-ayet-kutu');
  if (!k) return;
  const p = hvAaListe[hvAaIdx];
  if (!p) { k.innerHTML = '<div class="dn-ayet-bos">Bir sûre seçip ▶️ tuşuna bas.</div>'; return; }
  k.innerHTML = `
    <div class="dn-ayet-ust">${hvDnSureAdi(hvAaSure)} Sûresi • ${p.v}. âyet <span class="dn-ayet-sayac">${hvAaIdx + 1}/${hvAaListe.length}</span></div>
    <div class="dn-ayet-meal">${hvEsc(p.tr || '—')}</div>`;
  const b = document.getElementById('dn-play');
  if (b) b.innerHTML = hvAaCaliyor ? '⏸' : '▶️';
  const ad = document.getElementById('dn-simdi');
  if (ad) ad.textContent = hvDnSureAdi(hvAaSure) + ' Sûresi';
}

function hvDnDurdurTam() { try { if (hvDnSes) hvDnSes.pause(); } catch (e) {} }

function renderDinle() {
  const kok = document.getElementById('dinle-root');
  if (!kok) return;
  const qari = hvDnQari().id;   // kayıtlı seçim listede yoksa ilk hafıza döner
  const mod = hvDnMod();
  const ayetMod = mod !== 'ar';
  const hiz = hvGet('hv_tts_hiz', '0.9');
  const surekli = hvGet('hv_dinle_surekli', '1') === '1';
  const kayitli = parseInt(hvGet('hv_dinle_sure', '0'), 10) || 0;
  const kayitliSn = parseInt(hvGet('hv_dinle_pos', '0'), 10) || 0;
  const liste = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : [];

  kok.innerHTML = `
    <div class="page-header-title">
      <h2>🎧 Kuran Dinle</h2>
      <p>Kesintisiz dinle • uygulamada gezerken de çalar</p>
    </div>

    <div class="dn-mod">
      <button class="${mod === 'ar' ? 'on' : ''}" onclick="hvDnModDegistir('ar')">Arapça</button>
      <button class="${mod === 'both' ? 'on' : ''}" onclick="hvDnModDegistir('both')">Arapça + Meal</button>
      <button class="${mod === 'tr' ? 'on' : ''}" onclick="hvDnModDegistir('tr')">Sadece Meal</button>
    </div>

    <div class="dn-player">
      <div id="dn-simdi" class="dn-simdi">${hvDnSure ? hvDnSureAdi(hvDnSure) + ' Sûresi' : (kayitli ? hvDnSureAdi(kayitli) + ' Sûresi' : 'Bir sûre seçin')}</div>
      <div id="dn-qari-ad" class="dn-qari-ad">${hvDnQari().ad}</div>

      ${ayetMod ? `<div id="dn-ayet-kutu" class="dn-ayet-kutu"><div class="dn-ayet-bos">Aşağıdan bir sûre seç.</div></div>`
                : `<input id="dn-cizgi" class="dn-cizgi" type="range" min="0" max="100" value="0"
             oninput="hvDnSar(this.value)">
      <div class="dn-zaman"><span id="dn-gecen">0:00</span><span id="dn-toplam">--:--</span></div>`}

      <div class="dn-btns">
        <button class="dn-yan" onclick="hvDnAtla(-1)" title="${ayetMod ? 'Önceki âyet' : 'Önceki sûre'}">⏮</button>
        <button id="dn-play" class="dn-play" onclick="hvDnBasDurdur()">${(ayetMod ? hvAaCaliyor : hvDnCaliyor) ? '⏸' : '▶️'}</button>
        <button class="dn-yan" onclick="hvDnAtla(1)" title="${ayetMod ? 'Sonraki âyet' : 'Sonraki sûre'}">⏭</button>
      </div>

      ${kayitli && !hvDnSure ? `<button class="dn-devam" onclick="hvDnCal(${kayitli}, ${kayitliSn})">📍 Kaldığın yerden devam et — ${hvDnSureAdi(kayitli)} ${kayitliSn ? '(' + hvDnSure2(kayitliSn) + ')' : ''}</button>` : ''}
    </div>

    <div class="dn-ayar">
      <select class="mv-qari" onchange="hvDnQariDegistir(this.value)">
        ${HV_DINLE_QARILER.map(q => `<option value="${q.id}" ${q.id === qari ? 'selected' : ''}>${q.ad}</option>`).join('')}
      </select>
      <label class="dn-switch">
        <input type="checkbox" ${surekli ? 'checked' : ''} onchange="hvDnSurekliDegistir(this)">
        <span>Bitince sıradaki sûre</span>
      </label>
    </div>

    ${ayetMod ? `
    ${hvTtsTurkceSesler().length > 1 ? `
    <div class="dn-hiz-satir">
      <span>Türkçe ses</span>
      <select class="mv-qari dn-ses-sec" onchange="hvTtsSesSec(this.value)">
        ${hvTtsTurkceSesler().map(v => `<option value="${v.name}" ${v.name === (hvTtsTurkceSes()||{}).name ? 'selected' : ''}>${v.name}</option>`).join('')}
      </select>
    </div>` : ''}

    <div class="dn-hiz-satir">
      <span>Meal okuma hızı</span>
      <div class="dn-hiz">
        <button class="${hiz === '0.75' ? 'on' : ''}" data-h="0.75" onclick="hvTtsHizDegistir('0.75')">Yavaş</button>
        <button class="${hiz === '0.9' ? 'on' : ''}"  data-h="0.9"  onclick="hvTtsHizDegistir('0.9')">Normal</button>
        <button class="${hiz === '1.05' ? 'on' : ''}" data-h="1.05" onclick="hvTtsHizDegistir('1.05')">Hızlı</button>
      </div>
    </div>
    ${hvTtsTurkceVarMi() ? '' : `<div class="dn-not uyari">⚠️ Bu cihazda Türkçe konuşma sesi bulunamadı. Meâl sesli okunamaz; ekranda gösterilip sıradaki âyete geçilir. Telefon ayarlarından Türkçe konuşma sesini yükleyebilirsin.</div>`}
    <div class="dn-not">🔊 Meâli telefonunun kendi Türkçe sesi okur. iPhone'da <b>Ayarlar → Erişilebilirlik → Konuşulan İçerik → Sesler → Türkçe</b> bölümünden "Geliştirilmiş" sesi indirirsen çok daha doğal olur.</div>
    ` : ''}

    <div class="quran-search-bar">
      <span class="search-icon-fixed">🔍</span>
      <input type="text" class="search-input-field" placeholder="Sûre ara (ör. Yasin)..." oninput="hvDnAra(this.value)">
    </div>

    <div class="dn-liste">
      ${liste.map(s => `
        <button class="dn-sure ${Number(s.id) === hvDnSure ? 'caliyor' : ''}" data-no="${s.id}" data-ad="${s.name}"
                onclick="${ayetMod ? `hvAaCal(${s.id},0)` : `hvDnCal(${s.id})`}">
          <span class="dn-no">${s.id}</span>
          <span class="dn-ad">${s.name} Sûresi</span>
          <span class="dn-ayet">${s.verse_count} ayet</span>
        </button>`).join('')}
    </div>
  `;
  hvDnTazele();
  if (ayetMod) { hvMealHazir().then(() => { if (!hvAaListe.length && hvAaSure) hvAaListe = hvAaListeKur(hvAaSure); hvAaEkran(); }); }
}
window.renderDinle = renderDinle;
try { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['dinle'] = renderDinle; } catch (e) {}

/* ═══════════════════════════════════════════════════════════════════════
   v61.4 — ELİFBÂ (Kur'an okumayı öğrenme)
   28 harf • yazılış biçimleri • harekeler • tanıma alıştırması
   Harflerin başta/ortada/sonda biçimleri ZWJ (birleştirici) ile
   otomatik oluşturulur; elle glif yazılmaz, yanlış harf riski yoktur.
   ═══════════════════════════════════════════════════════════════════════ */

const HV_ELIFBA = [
  { h: 'ا', ad: 'Elif',  ok: 'Kendi sesi yoktur; uzatma harfidir.', nokta: 0, birlesir: false, ses: '', kalin: false },
  { h: 'ب', ad: 'Be',    ok: 'B sesi verir.', nokta: 1, birlesir: true, ses: 'b', kalin: false },
  { h: 'ت', ad: 'Te',    ok: 'İnce T sesi verir.', nokta: 2, birlesir: true, ses: 't', kalin: false },
  { h: 'ث', ad: 'Se',    ok: 'Peltek S — dil ucu ön dişlere değer.', nokta: 3, birlesir: true, ses: 's', kalin: false },
  { h: 'ج', ad: 'Cim',   ok: 'C sesi verir.', nokta: 1, birlesir: true, ses: 'c', kalin: false },
  { h: 'ح', ad: 'Ha',    ok: 'Boğazdan gelen ince H sesi.', nokta: 0, birlesir: true, ses: 'h', kalin: false },
  { h: 'خ', ad: 'Hı',    ok: 'Hırıltılı, kalın H sesi.', nokta: 1, birlesir: true, ses: 'h', kalin: true },
  { h: 'د', ad: 'Dal',   ok: 'D sesi verir.', nokta: 0, birlesir: false, ses: 'd', kalin: false },
  { h: 'ذ', ad: 'Zel',   ok: 'Peltek Z — dil ucu ön dişlere değer.', nokta: 1, birlesir: false, ses: 'z', kalin: false },
  { h: 'ر', ad: 'Ra',    ok: 'R sesi verir.', nokta: 0, birlesir: false, ses: 'r', kalin: false },
  { h: 'ز', ad: 'Ze',    ok: 'Z sesi verir.', nokta: 1, birlesir: false, ses: 'z', kalin: false },
  { h: 'س', ad: 'Sin',   ok: 'S sesi verir.', nokta: 0, birlesir: true, ses: 's', kalin: false },
  { h: 'ش', ad: 'Şın',   ok: 'Ş sesi verir.', nokta: 3, birlesir: true, ses: 'ş', kalin: false },
  { h: 'ص', ad: 'Sad',   ok: 'Kalın S sesi.', nokta: 0, birlesir: true, ses: 's', kalin: true },
  { h: 'ض', ad: 'Dad',   ok: 'Kalın D sesi.', nokta: 1, birlesir: true, ses: 'd', kalin: true },
  { h: 'ط', ad: 'Tı',    ok: 'Kalın T sesi.', nokta: 0, birlesir: true, ses: 't', kalin: true },
  { h: 'ظ', ad: 'Zı',    ok: 'Kalın, peltek Z sesi.', nokta: 1, birlesir: true, ses: 'z', kalin: true },
  { h: 'ع', ad: 'Ayn',   ok: 'Boğazın ortasından çıkan A sesi.', nokta: 0, birlesir: true, ses: '', kalin: false, harekeli: ['a', 'i', 'u'] },
  { h: 'غ', ad: 'Ğayn',  ok: 'Gırtlaktan gelen Ğ sesi.', nokta: 1, birlesir: true, ses: 'ğ', kalin: true },
  { h: 'ف', ad: 'Fe',    ok: 'F sesi verir.', nokta: 1, birlesir: true, ses: 'f', kalin: false },
  { h: 'ق', ad: 'Kaf',   ok: 'Dil kökünden çıkan kalın K sesi.', nokta: 2, birlesir: true, ses: 'k', kalin: true },
  { h: 'ك', ad: 'Kef',   ok: 'İnce K sesi.', nokta: 0, birlesir: true, ses: 'k', kalin: false },
  { h: 'ل', ad: 'Lam',   ok: 'L sesi verir.', nokta: 0, birlesir: true, ses: 'l', kalin: false },
  { h: 'م', ad: 'Mim',   ok: 'M sesi verir.', nokta: 0, birlesir: true, ses: 'm', kalin: false },
  { h: 'ن', ad: 'Nun',   ok: 'N sesi verir.', nokta: 1, birlesir: true, ses: 'n', kalin: false },
  { h: 'و', ad: 'Vav',   ok: 'V sesi verir; uzatma harfi de olur.', nokta: 0, birlesir: false, ses: 'v', kalin: false },
  { h: 'ه', ad: 'He',    ok: 'Yumuşak H sesi.', nokta: 0, birlesir: true, ses: 'h', kalin: false },
  { h: 'ي', ad: 'Ye',    ok: 'Y sesi verir; uzatma harfi de olur.', nokta: 2, birlesir: true, ses: 'y', kalin: false },
];

const HV_HAREKELER = [
  { ad: 'Üstün (Fetha)', im: 'َ', anlat: 'Harfin üstüne çizilir, harfe "e / a" sesi verir.', ornek: 'be' },
  { ad: 'Esre (Kesra)',  im: 'ِ', anlat: 'Harfin altına çizilir, harfe "i" sesi verir.', ornek: 'bi' },
  { ad: 'Ötre (Damme)',  im: 'ُ', anlat: 'Harfin üstüne konur, harfe "u / ü" sesi verir.', ornek: 'bü' },
  { ad: 'Cezim (Sükûn)', im: 'ْ', anlat: 'Harf harekesizdir; kendinden önceki sese bağlanır.', ornek: 'b' },
  { ad: 'Şedde',         im: 'ّ', anlat: 'Harfin iki kez okunduğunu gösterir.', ornek: 'bb' }
];

const HV_ZWJ = '‍';

// Harfin başta / ortada / sonda biçimini üretir
function hvElifbaBicim(harf, yer, birlesir) {
  if (yer === 'tek') return harf;
  if (!birlesir) {
    // Bu harfler kendinden sonrakine bağlanmaz
    if (yer === 'bas') return harf;
    return HV_ZWJ + harf;
  }
  if (yer === 'bas')  return harf + HV_ZWJ;
  if (yer === 'orta') return HV_ZWJ + harf + HV_ZWJ;
  return HV_ZWJ + harf;
}

let hvElIdx = -1;

function hvElifbaAc(i) {
  hvElIdx = i;
  const d = HV_ELIFBA[i];
  const kutu = document.getElementById('el-detay');
  if (!kutu || !d) return;
  const noktaYazi = d.nokta === 0 ? 'Noktasız' : (d.nokta + ' nokta');
  kutu.innerHTML = `
    <div class="el-detay-kart">
      <div class="el-buyuk">${d.h}</div>
      <div class="el-ad">${d.ad}</div>
      <div class="el-ok">${d.ok}</div>
      <div class="el-etiket">${noktaYazi}${d.birlesir ? '' : ' • sonraki harfe bağlanmaz'}</div>

      <div class="el-bolum">Yazılış biçimleri</div>
      <div class="el-bicimler">
        <div><span>${hvElifbaBicim(d.h, 'tek', d.birlesir)}</span><em>Tek başına</em></div>
        <div><span>${hvElifbaBicim(d.h, 'bas', d.birlesir)}</span><em>Başta</em></div>
        <div><span>${hvElifbaBicim(d.h, 'orta', d.birlesir)}</span><em>Ortada</em></div>
        <div><span>${hvElifbaBicim(d.h, 'son', d.birlesir)}</span><em>Sonda</em></div>
      </div>

      ${d.ad === 'Elif' ? '' : `
      <div class="el-bolum">Harekeli okunuşu</div>
      <div class="el-harekeli">
        <div><span>${d.h}َ</span><em>${d.harekeli ? d.harekeli[0] : d.ses + (d.kalin ? 'a' : 'e')}</em></div>
        <div><span>${d.h}ِ</span><em>${d.harekeli ? d.harekeli[1] : d.ses + (d.kalin ? 'ı' : 'i')}</em></div>
        <div><span>${d.h}ُ</span><em>${d.harekeli ? d.harekeli[2] : d.ses + (d.kalin ? 'u' : 'ü')}</em></div>
      </div>
      <div class="el-hareke-not">${d.harekeli ? 'Boğaz harfidir; sesi gırtlaktan çıkar.' : (d.kalin ? 'Kalın harftir; harekeler kalın okunur.' : 'İnce harftir; harekeler ince okunur.')}</div>`}

      <div class="el-nav">
        <button class="gold-outline-btn" onclick="hvElifbaAc(${i - 1})" ${i === 0 ? 'disabled' : ''}>← Önceki</button>
        <button class="gold-primary-btn" onclick="hvElifbaAc(${i + 1})" ${i === HV_ELIFBA.length - 1 ? 'disabled' : ''}>Sonraki →</button>
      </div>
    </div>`;
  kutu.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  document.querySelectorAll('.el-harf').forEach((el, k) => el.classList.toggle('secili', k === i));
}
window.hvElifbaAc = hvElifbaAc;

/* ── Tanıma alıştırması ── */
let hvElSoru = null, hvElDogru = 0, hvElToplam = 0;

function hvElifbaSoruUret() {
  const dogru = Math.floor(Math.random() * HV_ELIFBA.length);
  const secenekler = [dogru];
  while (secenekler.length < 4) {
    const r = Math.floor(Math.random() * HV_ELIFBA.length);
    if (secenekler.indexOf(r) === -1) secenekler.push(r);
  }
  secenekler.sort(() => Math.random() - 0.5);
  hvElSoru = { dogru: dogru, secenekler: secenekler };
  const k = document.getElementById('el-test');
  if (!k) return;
  k.innerHTML = `
    <div class="el-test-skor">Doğru: ${hvElDogru} / ${hvElToplam}</div>
    <div class="el-test-harf">${HV_ELIFBA[dogru].h}</div>
    <div class="el-test-soru">Bu harfin adı nedir?</div>
    <div class="el-test-secenekler">
      ${secenekler.map(s => `<button class="el-secenek" data-i="${s}" onclick="hvElifbaCevap(${s}, this)">${HV_ELIFBA[s].ad}</button>`).join('')}
    </div>`;
}
window.hvElifbaSoruUret = hvElifbaSoruUret;

function hvElifbaCevap(secilen, btn) {
  if (!hvElSoru || btn.disabled) return;
  hvElToplam++;
  const dogru = hvElSoru.dogru;
  document.querySelectorAll('.el-secenek').forEach(b => {
    b.disabled = true;
    if (Number(b.dataset.i) === dogru) b.classList.add('dogru');
  });
  if (secilen === dogru) { hvElDogru++; }
  else { btn.classList.add('yanlis'); }
  const skor = document.querySelector('.el-test-skor');
  if (skor) skor.textContent = 'Doğru: ' + hvElDogru + ' / ' + hvElToplam;
  const k = document.getElementById('el-test');
  const bar = document.createElement('button');
  bar.className = 'gold-primary-btn el-sonraki';
  bar.textContent = 'Sonraki soru →';
  bar.onclick = hvElifbaSoruUret;
  k.appendChild(bar);
}
window.hvElifbaCevap = hvElifbaCevap;

/* ── Ekran ── */
let hvElSekme = 'harfler';
function hvElifbaSekme(s) { hvElSekme = s; renderElifba(); }
window.hvElifbaSekme = hvElifbaSekme;

function renderElifba() {
  const kok = document.getElementById('elifba-root');
  if (!kok) return;

  const sekmeler = `
    <div class="qmode el-sekme">
      <button class="${hvElSekme === 'harfler' ? 'on' : ''}" onclick="hvElifbaSekme('harfler')">🔤 Harfler</button>
      <button class="${hvElSekme === 'hareke' ? 'on' : ''}" onclick="hvElifbaSekme('hareke')">◌َ Harekeler</button>
      <button class="${hvElSekme === 'test' ? 'on' : ''}" onclick="hvElifbaSekme('test')">✍️ Alıştırma</button>
    </div>`;

  let govde = '';
  if (hvElSekme === 'harfler') {
    govde = `
      <div class="el-info">28 harfe dokunarak adını, okunuşunu ve kelime içinde nasıl yazıldığını gör.</div>
      <div class="el-uyari">ℹ️ Bu bölüm genel elifbâ bilgisidir, Diyanet İşleri Başkanlığı kaynaklı değildir. Kur'an okumayı bir hocadan ya da Kur'an kursundan öğrenmen, telaffuzun doğru oturması için gereklidir.</div>
      <div class="el-grid">
        ${HV_ELIFBA.map((d, i) => `
          <button class="el-harf" onclick="hvElifbaAc(${i})">
            <span class="el-h">${d.h}</span><span class="el-n">${d.ad}</span>
          </button>`).join('')}
      </div>
      <div id="el-detay"></div>`;
  } else if (hvElSekme === 'hareke') {
    govde = `
      <div class="el-info">Harfler tek başına sessizdir. Hareke, harfe hangi sesle okunacağını söyler.</div>
      ${HV_HAREKELER.map(x => `
        <div class="el-hareke-kart">
          <div class="el-hareke-ust">
            <span class="el-hareke-im">ب${x.im}</span>
            <div>
              <div class="el-hareke-ad">${x.ad}</div>
              <div class="el-hareke-ornek">be harfi → <b>${x.ornek}</b></div>
            </div>
          </div>
          <div class="el-hareke-anlat">${x.anlat}</div>
        </div>`).join('')}`;
  } else {
    govde = `<div class="el-info">Ekranda çıkan harfin adını seç. Yanlış yaparsan doğrusu yeşil görünür.</div>
             <div id="el-test" class="el-test"></div>`;
  }

  kok.innerHTML = `
    <div class="page-header-title">
      <h2>🔤 Elifbâ</h2>
      <p>Kur'an okumayı sıfırdan öğren</p>
    </div>
    ${sekmeler}
    ${govde}`;

  if (hvElSekme === 'test') hvElifbaSoruUret();
}
window.renderElifba = renderElifba;
try { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['elifba'] = renderElifba; } catch (e) {}

/* ═══════════════════════════════════════════════════════════════════════
   v61.4 — "NİÇİN MEAL?" AYET KARTI
   Kur'an'ın anlaşılmak için indirildiğini bildiren ayetler.
   Arapça: alquran.cloud (Osmanî/Hafs) • Meal: Diyanet İşleri Başkanlığı Kur'an-ı Kerim Meâli
   Her ayetin sûre ve numara eşleşmesi tek tek doğrulandı.
   ═══════════════════════════════════════════════════════════════════════ */

const HV_ANLAM_AYETLERI = [
  {
    ar: 'إِنَّآ أَنزَلْنَٰهُ قُرْءَٰنًا عَرَبِيًّۭا لَّعَلَّكُمْ تَعْقِلُونَ',
    tr: 'Biz onu, akıl erdiresiniz diye Arapça bir Kur\'an olarak indirdik.',
    kaynak: 'Yûsuf sûresi, 2. âyet'
  },
  {
    ar: 'كِتَٰبٌ أَنزَلْنَٰهُ إِلَيْكَ مُبَٰرَكٌۭ لِّيَدَّبَّرُوٓا۟ ءَايَٰتِهِۦ وَلِيَتَذَكَّرَ أُو۟لُوا۟ ٱلْأَلْبَٰبِ',
    tr: 'Bu Kur\'an, âyetlerini düşünsünler ve akıl sahipleri öğüt alsınlar diye sana indirdiğimiz mübarek bir kitaptır.',
    kaynak: 'Sâd sûresi, 29. âyet'
  },
  {
    ar: 'أَفَلَا يَتَدَبَّرُونَ ٱلْقُرْءَانَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَآ',
    tr: 'Onlar Kur\'an\'ı düşünmüyorlar mı? Yoksa kalplerin üzerinde kilitleri mi var?',
    kaynak: 'Muhammed sûresi, 24. âyet'
  },
  {
    ar: 'وَلَقَدْ يَسَّرْنَا ٱلْقُرْءَانَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍۢ',
    tr: 'Andolsun biz, Kur\'an\'ı düşünüp öğüt almak için kolaylaştırdık. Var mı düşünüp öğüt alan?',
    kaynak: 'Kamer sûresi, 17. âyet'
  }
];

let hvAnlamIdx = Math.floor(Math.random() * HV_ANLAM_AYETLERI.length);

function hvAnlamKart() {
  const a = HV_ANLAM_AYETLERI[hvAnlamIdx];
  return `
    <div class="anlam-kart" onclick="hvAnlamSonraki()">
      <div class="anlam-ust">📖 Kur'an niçin indirildi?</div>
      <div class="anlam-ar">${a.ar}</div>
      <div class="anlam-tr">${a.tr}</div>
      <div class="anlam-kaynak">— ${a.kaynak} <span class="anlam-ipucu">• dokun, sonraki âyet</span></div>
    </div>`;
}
window.hvAnlamKart = hvAnlamKart;

function hvAnlamSonraki() {
  hvAnlamIdx = (hvAnlamIdx + 1) % HV_ANLAM_AYETLERI.length;
  document.querySelectorAll('.anlam-kart').forEach(el => {
    const yeni = document.createElement('div');
    yeni.innerHTML = hvAnlamKart();
    el.replaceWith(yeni.firstElementChild);
  });
}
window.hvAnlamSonraki = hvAnlamSonraki;

/* ═══════════════════════════════════════════════════════════════════════
   v61.4 — TAM EKRAN OKUMA MODU
   Sadece mushaf sayfası. Üstte sayfa no ve yer imi, altta ses çubuğu.
   Ortaya dokununca çubuklar gizlenir; parmakla sayfa çevrilir.
   ═══════════════════════════════════════════════════════════════════════ */

let hvTeAcik = false, hvTeKilit = null, hvTeCubuk = true;

async function hvTamEkranAc() {
  if (hvTeAcik) return;
  hvTeAcik = true;
  let k = document.getElementById('mv-full');
  if (!k) {
    k = document.createElement('div');
    k.id = 'mv-full';
    k.className = 'te-kok';
    document.body.appendChild(k);
  }
  k.style.display = 'flex';
  document.body.classList.add('te-modda');
  hvTeCubuk = true;
  await hvTamEkranCiz();
  hvTeKaydirmaBagla();
  hvTeEkraniAcikTut();
}
window.hvTamEkranAc = hvTamEkranAc;

function hvTamEkranKapat() {
  hvTeAcik = false;
  const k = document.getElementById('mv-full');
  if (k) k.style.display = 'none';
  document.body.classList.remove('te-modda');
  try { if (hvTeKilit) { hvTeKilit.release(); hvTeKilit = null; } } catch (e) {}
  renderMushaf();
}
window.hvTamEkranKapat = hvTamEkranKapat;

// Okurken ekran sönmesin
async function hvTeEkraniAcikTut() {
  try {
    if ('wakeLock' in navigator && !hvTeKilit) hvTeKilit = await navigator.wakeLock.request('screen');
  } catch (e) {}
}

function hvTeCubukDegistir() {
  hvTeCubuk = !hvTeCubuk;
  const k = document.getElementById('mv-full');
  if (k) k.classList.toggle('cubuksuz', !hvTeCubuk);
}
window.hvTeCubukDegistir = hvTeCubukDegistir;

function hvTeKagit() {
  const y = hvGet('hv_te_kagit', '1') === '1' ? '0' : '1';
  hvSet('hv_te_kagit', y);
  hvTamEkranCiz();
}
window.hvTeKagit = hvTeKagit;

function hvTeGit(p) {
  p = Math.max(1, Math.min(HV_MUSHAF_SON, parseInt(p, 10) || 1));
  hvSet('hv_mushaf_page', p);
  hvTamEkranCiz();
}
window.hvTeGit = hvTeGit;

function hvTeKaydirmaBagla() {
  hvSayfaKaydirmaBagla(document.getElementById('mv-full'), hvTeGit);
}

function hvTeMod(m) { hvSet('hv_mushaf_mode', m); hvTamEkranCiz(); }
window.hvTeMod = hvTeMod;

async function hvTamEkranCiz(calmayaDevam) {
  const k = document.getElementById('mv-full');
  if (!k) return;
  const sayfa  = parseInt(hvGet('hv_mushaf_page', '1'), 10);
  const font   = parseInt(hvGet('hv_mushaf_font', '30'), 10);
  const kagit  = hvGet('hv_te_kagit', '1') === '1';
  const mod    = hvGet('hv_mushaf_mode', 'ar');
  const imli   = hvMushafImler().indexOf(sayfa) >= 0;
  const trFont = Math.max(15, Math.min(26, Math.round(font * 0.6)));

  k.classList.toggle('kagit', kagit);
  k.classList.toggle('cubuksuz', !hvTeCubuk);
  k.innerHTML = `
    <div class="te-ust">
      <button class="te-yuvarlak" onclick="hvTamEkranKapat()">✕</button>
      <div class="te-sayfa-no">${sayfa}</div>
      <button class="te-yuvarlak" onclick="hvMushafImDegistir(); hvTamEkranCiz();">${imli ? '⭐' : '☆'}</button>
    </div>

    <div class="te-mod">
      <button class="${mod === 'ar' ? 'on' : ''}" onclick="hvTeMod('ar')">Arapça</button>
      <button class="${mod === 'both' ? 'on' : ''}" onclick="hvTeMod('both')">Arapça + Meal</button>
      <button class="${mod === 'tr' ? 'on' : ''}" onclick="hvTeMod('tr')">Meal</button>
    </div>

    <div class="te-orta" onclick="hvTeCubukDegistir()">
      <div class="te-cerceve">
        <div class="te-baslik" id="te-baslik">Sayfa ${sayfa}</div>
        <div id="te-metin" class="te-metin" style="font-size:${font}px${mod === 'tr' ? ';display:none' : ''}">
          <div class="mv-loading">Sayfa yükleniyor…</div>
        </div>
        <div id="te-meal" class="te-meal${mod === 'both' ? ' ayrac' : ''}"
             style="font-size:${trFont}px${mod === 'ar' ? ';display:none' : ''}">
          ${mod === 'ar' ? '' : '<div class="mv-loading">Meal yükleniyor…</div>'}
        </div>
        <div class="te-alt-no">${hvArNum(sayfa)}</div>
      </div>
    </div>

    <div class="te-sure">
      <button class="te-mini" onclick="hvMvAtla(-1)">⏮</button>
      <span id="te-gecen">0:00</span><span class="te-sure-ayrac">/</span><span id="te-toplam">--:--</span>
      <button class="te-mini" onclick="hvMvAtla(1)">⏭</button>
    </div>

    <div class="te-alt">
      <button class="te-yan" onclick="hvTeGit(${sayfa - 1})" ${sayfa <= 1 ? 'disabled' : ''}>‹</button>
      <button class="te-kucuk" onclick="hvMushafPunto(-2); hvTamEkranCiz();">A−</button>
      <button id="te-play" class="te-play" onclick="hvMvBasDurdur()">${hvMvCalisiyor ? '⏸' : '▶️'}</button>
      <button class="te-kucuk" onclick="hvMushafPunto(2); hvTamEkranCiz();">A+</button>
      <button class="te-kucuk" onclick="hvTeKagit()">${kagit ? '🌙' : '📄'}</button>
      <button class="te-yan" onclick="hvTeGit(${sayfa + 1})" ${sayfa >= HV_MUSHAF_SON ? 'disabled' : ''}>›</button>
    </div>
  `;

  let rows;
  try {
    rows = await hvMushafSayfaGetir(sayfa);
  } catch (e) {
    const m = document.getElementById('te-metin');
    const t = document.getElementById('te-meal');
    const hata = `<div class="mv-error">Sayfa yüklenemedi.<button class="gold-outline-btn" onclick="hvTamEkranCiz()">↻ Tekrar Dene</button></div>`;
    if (m) m.innerHTML = hata;
    if (t) t.innerHTML = '';
    return;
  }

  hvMvSira = rows.map(r => r.n);
  hvMvRef = {}; rows.forEach(r => { hvMvRef[r.n] = [r.s, r.v]; });
  hvMvKonum = -1;

  const sureler = rows.map(r => r.s).filter((x, i, a) => a.indexOf(x) === i);
  const bas = document.getElementById('te-baslik');
  if (bas) bas.textContent = sureler.map(hvSureAdi).join(' / ');

  // ── Arapça ──
  let html = '';
  let sonSure = null;
  rows.forEach(r => {
    if (r.s !== sonSure) { sonSure = r.s; if (r.v === 1) html += `<div class="mv-sure-basi">${r.sar}</div>`; }
    let metin = r.ar;
    if (r.v === 1 && r.s !== 1 && r.s !== 9) {
      const b = hvBesmeleAyir(metin);
      if (b.besmele) { html += `<div class="mv-besmele">${b.besmele}</div>`; metin = b.kalan; }
    }
    html += `<span class="mv-ayah" id="mv-a-${r.n}">${metin}<span class="mv-num">${hvArNum(r.v)}</span></span> `;
  });
  const m = document.getElementById('te-metin');
  if (m) m.innerHTML = html;
  if (calmayaDevam) { hvMvCalisiyor = true; hvMvCal(0); }

  // ── Meal ──
  if (mod !== 'ar') {
    let trHtml = '';
    let sonSure2 = null;
    rows.forEach((r, i) => {
      if (r.s !== sonSure2) { sonSure2 = r.s; trHtml += `<div class="te-m-sure">${r.sadi} Sûresi</div>`; }
      if (i > 0 && r.tr && rows[i - 1].tr === r.tr && !hvMealGrupIlk(r.s, r.v)) return;
      trHtml += `<div class="te-m-ayet" id="te-m-${r.n}"><span class="te-m-no">${hvMealEtiket(r.s, r.v)}</span>${r.tr || '—'}</div>`;
    });
    const t = document.getElementById('te-meal');
    if (t) t.innerHTML = trHtml;
  }
}
window.hvTamEkranCiz = hvTamEkranCiz;
