/* ========================================================
   Huzur Vakti - Yeni Özellik Mantığı (features.js)
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

// Paylaşım: Web Share API varsa onu, yoksa WhatsApp'ı kullanır
function hvShareText(text) {
  if (navigator.share) {
    navigator.share({ title: 'Huzur Vakti', text: text }).catch(() => {});
  } else {
    const url = 'https://wa.me/?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  }
}

/* ══════════ GÜNÜN HADİSİ ══════════ */
function loadDailyHadis() {
  if (typeof HADITHS === 'undefined' || !HADITHS.length) return;
  const h = HADITHS[hvDayIndex(HADITHS.length)];
  const arEl = document.getElementById('daily-hadis-arabic');
  const txtEl = document.getElementById('daily-hadis-text');
  const srcEl = document.getElementById('daily-hadis-source');
  if (arEl) arEl.textContent = h.ar || '';
  if (txtEl) txtEl.textContent = '"' + h.text + '"';
  if (srcEl) srcEl.textContent = '— ' + h.source;
  window._currentHadis = h;
}
function shareDailyHadis() {
  const h = window._currentHadis || (typeof HADITHS !== 'undefined' ? HADITHS[hvDayIndex(HADITHS.length)] : null);
  if (!h) return;
  hvShareText(`📿 Günün Hadisi\n\n"${h.text}"\n— ${h.source}\n\nHuzur Vakti 🌙`);
}
window.shareDailyHadis = shareDailyHadis;

function shareDailyVerse() {
  const ar = document.getElementById('daily-verse-arabic');
  const tr = document.getElementById('daily-verse-turkish');
  const src = document.getElementById('daily-verse-source');
  const text = `📖 Günün Ayeti\n\n${tr ? tr.textContent : ''}\n${src ? src.textContent : ''}\n\nHuzur Vakti 🌙`;
  hvShareText(text);
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
      <div class="info-note">Rastgele bir ayet veya hadis kartı oluşturun, WhatsApp ve sosyal medyada paylaşın.</div>
      <div class="share-type-switch">
        <button class="seg-btn active" id="pt-ayet" onclick="paylasimPick('ayet')">📖 Ayet</button>
        <button class="seg-btn" id="pt-hadis" onclick="paylasimPick('hadis')">📿 Hadis</button>
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
  paylasimYenile();
}
window.paylasimPick = paylasimPick;
function paylasimYenile() {
  const prev = document.getElementById('share-card-preview');
  if (_paylasimTip === 'ayet' && typeof DAILY_VERSES !== 'undefined') {
    const v = DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
    _paylasimData = { ar: v.arabic, tr: v.turkish, src: `${v.surah} Suresi, ${v.ayah}. Ayet` };
  } else if (typeof HADITHS !== 'undefined') {
    const h = HADITHS[Math.floor(Math.random() * HADITHS.length)];
    _paylasimData = { ar: h.ar || '', tr: h.text, src: h.source };
  }
  if (prev && _paylasimData) {
    prev.innerHTML = `
      <div class="scp-inner">
        <div class="scp-badge">${_paylasimTip === 'ayet' ? '📖 Ayet-i Kerime' : '📿 Hadis-i Şerif'}</div>
        ${_paylasimData.ar ? `<div class="scp-ar">${_paylasimData.ar}</div>` : ''}
        <div class="scp-tr">"${hvEsc(_paylasimData.tr)}"</div>
        <div class="scp-src">— ${hvEsc(_paylasimData.src)}</div>
        <div class="scp-brand">🌙 Huzur Vakti</div>
      </div>`;
  }
}
window.paylasimYenile = paylasimYenile;
function paylasimPaylas() {
  if (!_paylasimData) return;
  const emoji = _paylasimTip === 'ayet' ? '📖 Ayet-i Kerime' : '📿 Hadis-i Şerif';
  hvShareText(`${emoji}\n\n"${_paylasimData.tr}"\n— ${_paylasimData.src}\n\n🌙 Huzur Vakti`);
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
function cumaPaylas(i) { hvShareText(CUMA_MESAJLARI[i]); }
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
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/search/${encodeURIComponent(q)}/all/tr.diyanet`);
      const json = await res.json();
      const ql = q.toLocaleLowerCase('tr');
      // Sadece aranan kelimeyi GERÇEKTEN içeren ayetleri göster (API bazen alakasız sonuç döndürüyor)
      let matches = (json && json.data && json.data.matches) ? json.data.matches.filter(m => (m.text || '').toLocaleLowerCase('tr').includes(ql)) : [];
      const total = matches.length;
      matches = matches.slice(0, 60);
      if (total > 0) {
        c.innerHTML = `<div class="bebek-count-note">"${hvEsc(q)}" için ${total} ayet bulundu${total > 60 ? ' (ilk 60 gösteriliyor)' : ''}</div>` +
          matches.map(m => {
            const sid = m.surah.number, aname = m.surah.name || m.surah.englishName;
            return `<div class="ayet-result" onclick="openSurahById(${sid})">
              <div class="ayet-ref">${hvEsc(aname)} Suresi • ${m.numberInSurah}. Ayet <span class="ayet-go">›</span></div>
              <div class="ayet-meal">${hvHighlight(m.text, q)}</div>
            </div>`;
          }).join('');
      } else {
        c.innerHTML = '<div class="empty-note">"' + hvEsc(q) + '" kelimesini içeren ayet bulunamadı. Farklı bir kelime deneyin.</div>';
      }
    } catch (e) {
      c.innerHTML = '<div class="empty-note">Arama için internet bağlantısı gerekiyor. Lütfen tekrar deneyin.</div>';
    }
  }, 400);
}

/* ══════════ 40 HADİS (İmam Nevevî) ══════════ */
function renderKirkHadis(filter) {
  const c = document.getElementById('kirk-hadis-content');
  if (!c || typeof KIRK_HADIS === 'undefined') return;
  const q = (filter || '').toLocaleLowerCase('tr').trim();
  const list = q ? KIRK_HADIS.filter(h => h.text.toLocaleLowerCase('tr').includes(q) || String(h.no) === q) : KIRK_HADIS;
  if (!list.length) { c.innerHTML = '<div class="empty-note">Sonuç bulunamadı.</div>'; return; }
  c.innerHTML = list.map(h => `
    <div class="hadis40-card">
      <div class="hadis40-no">${h.no}</div>
      <div class="hadis40-body">
        <div class="hadis40-text">${hvEsc(h.text)}</div>
        <div class="hadis40-src">— ${hvEsc(h.source)}</div>
      </div>
    </div>`).join('');
}

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
  return { app: 'HuzurVakti', version: 58, exportedAt: new Date().toISOString(), data };
}
function hvBackupExport() {
  const status = document.getElementById('backup-status');
  try {
    const payload = hvBackupCollect();
    const json = JSON.stringify(payload, null, 2);
    const count = Object.keys(payload.data).length;
    const d = new Date();
    const fname = `huzurvakti-yedek-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}.json`;
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
      if (!parsed || parsed.app !== 'HuzurVakti' || typeof parsed.data !== 'object') throw new Error('Bu dosya bir Huzur Vakti yedeği değil.');
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
  hvShareText('🌙 Huzur Vakti — namaz vakitleri, Kur\'an, dualar, zikirmatik ve daha fazlası tek uygulamada. Ücretsiz, reklamsız, çevrimdışı çalışır:\nhttps://huzurvaktinamazuygulamasi.vercel.app');
}
window.hvBackupExport = hvBackupExport;
window.hvBackupImport = hvBackupImport;
window.hvShareApp = hvShareApp;

function featuresInit() {
  loadDailyHadis();

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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', featuresInit);
} else {
  featuresInit();
}
