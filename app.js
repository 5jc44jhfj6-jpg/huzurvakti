/* ========================================================
   Namaz Vakti - Application Core Engine v2.5
   ======================================================== */

const APP_STATE = {
  currentPage: 'home',
  userLocation: { lat: 40.5233, lng: 28.8350 }, // Armutlu, Yalova
  currentCity: 'Yalova',
  currentDistrict: 'Armutlu',
  prayerTimes: null,
  isDarkTheme: true,
  greenTheme: false,
  fontSize: 20,
  qiblaAngle: 0,
  surahList: [],
  activePrayerId: null,
  notifyEnabled: false,
  notifyOffset: 0,
  notifySound: 'ezan',
  qari: 'afs'
};

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
  loadSavedSettings();
  applyStateSettings();
  populateLocationsDropdown();
  setupNavTabs();
  setupSettingsListeners();
  startClockTimer();
  loadDailyVerse();
  initPrayerGuideSection();

  // Initial prayer times fetch
  fetchPrayerTimes(APP_STATE.userLocation.lat, APP_STATE.userLocation.lng);

  // Initialize Quran Surah list immediately with all 114 Surahs
  initQuranSection();

  // Dismiss Loading screen with smooth fade out
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }

    // First time Notification Prompt
    if (!localStorage.getItem('namaz_vakti_v25_prompted')) {
      localStorage.setItem('namaz_vakti_v25_prompted', 'true');
      setTimeout(() => {
        const notifyModal = document.getElementById('notify-permission-modal');
        if (notifyModal) notifyModal.style.display = 'flex';
      }, 600); // Wait a bit after loader is hidden
    }
  }, 800);
}

// Navigation Tab Handler
function setupNavTabs() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPage = tab.getAttribute('data-page');
      navigateTo(targetPage);
    });
  });
}

// Maps every sub-page to its parent bottom-nav tab so the correct tab stays highlighted
const PAGE_PARENT = {
  home: 'home',
  kurandua: 'kurandua', quran: 'kurandua', 'dua-ogrenme': 'kurandua', esma: 'kurandua', ezkar: 'kurandua', 'gunluk-dua': 'kurandua', 'onemli-sureler': 'kurandua', 'ayet-arama': 'kurandua', 'kirk-hadis': 'kurandua', qibla: 'kurandua', guide: 'kurandua',
  ibadet: 'ibadet', zikirmatik: 'ibadet', 'namaz-takibi': 'ibadet', kaza: 'ibadet', hatim: 'ibadet', oruc: 'ibadet', taharet: 'ibadet', 'ozel-namaz': 'ibadet', iman: 'ibadet', peygamberler: 'ibadet', siyer: 'ibadet',
  araclar: 'araclar', zekat: 'araclar', fitre: 'araclar', quiz: 'araclar', ruya: 'araclar', bebek: 'araclar', takvim: 'araclar', paylasim: 'araclar', cuma: 'araclar', sozluk: 'araclar', imsakiye: 'araclar',
  settings: 'settings', kaynaklar: 'settings'
};

function navigateTo(pageId) {
  // Pause audio when leaving page
  const audioPlayer = document.getElementById('surah-audio-player');
  if (audioPlayer) {
    audioPlayer.pause();
  }

  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSec = document.getElementById('page-' + pageId);
  if (activeSec) {
    activeSec.classList.add('active');
    const box = activeSec.querySelector('.hero-frame-box');
    if (box) box.scrollTop = 0;
  }

  // Highlight the parent tab (feature sub-pages keep their hub tab lit)
  const parent = PAGE_PARENT[pageId] || pageId;
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-page') === parent);
  });

  APP_STATE.currentPage = pageId;

  if (pageId === 'qibla') {
    initQiblaCompass();
  }

  // Lazy-initialise feature pages (defined in features.js)
  if (window.FEATURE_ROUTES && typeof window.FEATURE_ROUTES[pageId] === 'function') {
    try { window.FEATURE_ROUTES[pageId](); } catch (e) { console.warn('Feature route error:', pageId, e); }
  }
}
window.navigateTo = navigateTo;

// Local Storage & Settings
function loadSavedSettings() {
  try {
    const data = localStorage.getItem('namaz_vakti_v25');
    if (data) {
      const parsed = JSON.parse(data);
      Object.assign(APP_STATE, parsed);
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }
}

function saveSettings() {
  localStorage.setItem('namaz_vakti_v25', JSON.stringify({
    currentCity: APP_STATE.currentCity,
    currentDistrict: APP_STATE.currentDistrict,
    userLocation: APP_STATE.userLocation,
    qiblaAngle: APP_STATE.qiblaAngle,
    isDarkTheme: APP_STATE.isDarkTheme,
    greenTheme: APP_STATE.greenTheme,
    notifyEnabled: APP_STATE.notifyEnabled,
    notifyOffset: APP_STATE.notifyOffset,
    notifySound: APP_STATE.notifySound,
    qari: APP_STATE.qari,
    timeOffsets: APP_STATE.timeOffsets || {},
    fontSize: APP_STATE.fontSize
  }));
}

function applyStateSettings() {
  // Tema: her zaman koyu zemin; "Lüks Gece" anahtarı bakır ↔ yeşil arasında geçiş yapar
  document.body.classList.add('dark-theme');
  document.body.classList.remove('light-theme');
  document.body.classList.toggle('green-theme', !!APP_STATE.greenTheme);

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.checked = !!APP_STATE.greenTheme;

  const fontSlider = document.getElementById('font-size-slider');
  if (fontSlider) fontSlider.value = APP_STATE.fontSize;

  document.documentElement.style.setProperty('--quran-font-size', APP_STATE.fontSize + 'px');
  const sizeVal = document.getElementById('font-size-val');
  if (sizeVal) sizeVal.textContent = APP_STATE.fontSize + 'px';

  const notifyToggle = document.getElementById('notify-toggle');
  if (notifyToggle) notifyToggle.checked = APP_STATE.notifyEnabled;

  const notifyTime = document.getElementById('notify-time');
  if (notifyTime) notifyTime.value = APP_STATE.notifyOffset;

  const notifySound = document.getElementById('notify-sound');
  if (notifySound) notifySound.value = APP_STATE.notifySound;

  const settingsQariSelect = document.getElementById('settings-qari-select');
  if (settingsQariSelect) settingsQariSelect.value = APP_STATE.qari;

  const surahQariSelect = document.getElementById('qari-select');
  if (surahQariSelect) surahQariSelect.value = APP_STATE.qari;

  // Vakit ince ayarı girişleri
  const offs = getTimeOffsets();
  document.querySelectorAll('.offset-input').forEach(inp => {
    const k = inp.dataset.k;
    if (k in offs) inp.value = offs[k];
  });

  updateLocationHeaderLabel();
}

function updateLocationHeaderLabel() {
  const label = APP_STATE.currentDistrict
    ? `${APP_STATE.currentCity}, ${APP_STATE.currentDistrict}`
    : APP_STATE.currentCity;
  const headerLoc = document.getElementById('header-location');
  if (headerLoc) headerLoc.textContent = label;
}

// Locations (Cities & Districts) Setup
function populateLocationsDropdown() {
  const citySelect = document.getElementById('city-select');
  if (!citySelect || typeof TURKEY_LOCATIONS === 'undefined') return;

  citySelect.innerHTML = '';
  const sorted = [...TURKEY_LOCATIONS].sort((a, b) => a.il.localeCompare(b.il, 'tr'));
  sorted.forEach(loc => {
    const opt = document.createElement('option');
    opt.value = loc.il;
    opt.textContent = loc.il;
    if (loc.il === APP_STATE.currentCity) opt.selected = true;
    citySelect.appendChild(opt);
  });

  populateDistrictOptions(APP_STATE.currentCity);
}

function populateDistrictOptions(cityName) {
  const districtSelect = document.getElementById('district-select');
  if (!districtSelect || typeof TURKEY_LOCATIONS === 'undefined') return;

  districtSelect.innerHTML = '';
  const prov = TURKEY_LOCATIONS.find(p => p.il === cityName);

  if (prov && prov.ilceler && prov.ilceler.length > 0) {
    prov.ilceler.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.name;
      opt.textContent = d.name;
      if (d.name === APP_STATE.currentDistrict) opt.selected = true;
      districtSelect.appendChild(opt);
    });
  } else {
    const opt = document.createElement('option');
    opt.value = 'Merkez';
    opt.textContent = 'Merkez';
    districtSelect.appendChild(opt);
  }
}

function getSelectedCoordinates(cityName, districtName) {
  if (typeof TURKEY_LOCATIONS === 'undefined') return null;
  const prov = TURKEY_LOCATIONS.find(p => p.il === cityName);
  if (!prov) return null;

  if (districtName && prov.ilceler) {
    const dist = prov.ilceler.find(d => d.name === districtName);
    if (dist) return { lat: dist.lat, lng: dist.lng };
  }
  return { lat: prov.lat, lng: prov.lng };
}

// Live Clock & Hijri Date
function startClockTimer() {
  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
}

function updateClockDisplay() {
  const now = new Date();
  const clockText = document.getElementById('clock-display');
  if (clockText) {
    clockText.textContent = now.toLocaleTimeString('tr-TR', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }

  const dateText = document.getElementById('date-display');
  if (dateText) {
    const gregDate = now.toLocaleDateString('tr-TR', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    });
    dateText.textContent = gregDate;
  }

  if (APP_STATE.prayerTimes) {
    updatePrayerCountdown();
  }
}

const HIJRI_MONTHS_TR = {
  "Muharram": "Muharrem",
  "Safar": "Safer",
  "Rabi' al-awwal": "Rebiülevvel",
  "Rabīʿ al-awwal": "Rebiülevvel",
  "Rabi' al-thani": "Rebiülahir",
  "Rabīʿ al-thānī": "Rebiülahir",
  "Jumada al-awwal": "Cemaziyelevvel",
  "Jumādā al-ūlā": "Cemaziyelevvel",
  "Jumada al-thani": "Cemaziyelahir",
  "Jumādā al-ākhirah": "Cemaziyelahir",
  "Rajab": "Recep",
  "Sha'ban": "Şaban",
  "Shaʿbān": "Şaban",
  "Ramadan": "Ramazan",
  "Ramadān": "Ramazan",
  "Shawwal": "Şevval",
  "Shawwāl": "Şevval",
  "Dhu al-Qadah": "Zilkade",
  "Dhū al-Qaʿdah": "Zilkade",
  "Dhu al-Hijjah": "Zilhicce",
  "Dhū al-Ḥijjah": "Zilhicce"
};

// Diyanet resmi sitesiyle birebir eşleştirme (API 1 dk geride kalıyor)
function addMinutes(timeStr, minsToAdd) {
  if (!timeStr) return timeStr;
  const parts = timeStr.split(':');
  let h = parseInt(parts[0], 10);
  let m = parseInt(parts[1], 10) + minsToAdd;
  if (m >= 60) { h = (h + Math.floor(m / 60)) % 24; m = m % 60; }
  else if (m < 0) { h = (h - 1 + 24) % 24; m = (m + 60) % 60; }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

// Prayer Times API & Calculation
/* ────────────────────────────────────────────────────────────
   ÇEVRİMDIŞI-ÖNCELİKLİ VAKİT SİSTEMİ
   1) Aylık takvim localStorage'da önbellekte tutulur → uygulama
      internetsiz de anında açılır.
   2) Ağ varsa arka planda yenilenir; ay sonuna yakınsa sonraki ay
      da önceden indirilir.
   3) Kullanıcının "Vakit İnce Ayarı" (dk) her vakte uygulanır
      (Diyanet takvimiyle birebir eşleştirme için).
   ──────────────────────────────────────────────────────────── */
const DEFAULT_TIME_OFFSETS = { Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 1, Isha: 1 };

function calCacheKey(lat, lng, year, month) {
  return `hv_cal_${Number(lat).toFixed(3)}_${Number(lng).toFixed(3)}_${year}-${String(month).padStart(2, '0')}`;
}
function stripTiming(t) { return (t || '').split(' ')[0]; }
function hijriTextFromApi(h) {
  if (!h) return '';
  const monthEn = h.month && h.month.en ? h.month.en : '';
  const monthTr = HIJRI_MONTHS_TR[monthEn] || (h.month && h.month.ar ? h.month.ar : monthEn);
  return `${h.day} ${monthTr} ${h.year}`;
}
// Aladhan /calendar cevabını kompakt biçime indirip kaydeder
function saveMonthCache(lat, lng, year, month, days) {
  try {
    const compact = days.map(d => ({
      date: `${d.date.gregorian.year}-${String(d.date.gregorian.month.number).padStart(2, '0')}-${String(d.date.gregorian.day).padStart(2, '0')}`,
      t: {
        Fajr: stripTiming(d.timings.Fajr), Sunrise: stripTiming(d.timings.Sunrise), Dhuhr: stripTiming(d.timings.Dhuhr),
        Asr: stripTiming(d.timings.Asr), Maghrib: stripTiming(d.timings.Maghrib), Isha: stripTiming(d.timings.Isha),
        Imsak: stripTiming(d.timings.Imsak)
      },
      h: hijriTextFromApi(d.date.hijri)
    }));
    localStorage.setItem(calCacheKey(lat, lng, year, month), JSON.stringify(compact));
    // Eski ayların önbelleğini temizle (yalnızca son 3 anahtar kalsın)
    const keys = Object.keys(localStorage).filter(k => k.startsWith('hv_cal_')).sort();
    while (keys.length > 3) localStorage.removeItem(keys.shift());
  } catch (e) { console.warn('Takvim önbelleği yazılamadı:', e); }
}
function getCachedDay(lat, lng, dateObj) {
  try {
    const raw = localStorage.getItem(calCacheKey(lat, lng, dateObj.getFullYear(), dateObj.getMonth() + 1));
    if (!raw) return null;
    const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    return JSON.parse(raw).find(d => d.date === key) || null;
  } catch (e) { return null; }
}
function getTimeOffsets() {
  return Object.assign({}, DEFAULT_TIME_OFFSETS, APP_STATE.timeOffsets || {});
}
function applyOffsets(raw) {
  const off = getTimeOffsets();
  const out = {};
  Object.keys(raw).forEach(k => { out[k] = raw[k]; });
  ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].forEach(k => {
    if (raw[k]) out[k] = addMinutes(raw[k], parseInt(off[k], 10) || 0);
  });
  return out;
}
// Bir günün ham vakitlerini (offset uygulayarak) ekrana basar
function applyDayTimings(entry) {
  if (!entry || !entry.t) return;
  APP_STATE.rawTimes = entry.t;
  const t = applyOffsets(entry.t);
  APP_STATE.prayerTimes = t;
  if (entry.h) { APP_STATE.hijriDateText = entry.h; updateHijriDateDisplay(entry.h); }
  renderPrayerCards(t);
  updatePrayerCountdown();
}
// Ayarlardan offset değişince mevcut ham vakitlere yeniden uygula
function reapplyTimeOffsets() {
  if (!APP_STATE.rawTimes) return;
  const t = applyOffsets(APP_STATE.rawTimes);
  APP_STATE.prayerTimes = t;
  renderPrayerCards(t);
  updatePrayerCountdown();
}
window.reapplyTimeOffsets = reapplyTimeOffsets;

// Ramazan ayı mı? (Hicri metin API'den ya da yerel Intl'den gelir)
function isRamazan() {
  const h = (APP_STATE.hijriDateText || '').toLowerCase();
  return h.includes('ramazan') || h.includes('ramadan');
}
window.isRamazan = isRamazan;

// Çevrimdışı/çevrimiçi rozeti
function setOfflineBadge(offline) {
  const el = document.getElementById('offline-badge');
  if (el) el.style.display = offline ? 'inline-flex' : 'none';
}
window.addEventListener('online', () => { setOfflineBadge(false); fetchPrayerTimes(APP_STATE.userLocation.lat, APP_STATE.userLocation.lng); });
window.addEventListener('offline', () => setOfflineBadge(true));

async function fetchMonthCalendar(lat, lng, year, month) {
  const res = await fetch(`https://api.aladhan.com/v1/calendar?latitude=${lat}&longitude=${lng}&method=13&month=${month}&year=${year}`);
  const json = await res.json();
  if (json && Array.isArray(json.data) && json.data.length) {
    saveMonthCache(lat, lng, year, month, json.data);
    return true;
  }
  return false;
}

async function fetchPrayerTimes(lat, lng) {
  const today = new Date();
  // 1) Önbellekten ANINDA göster (internet olmasa da çalışır)
  const cached = getCachedDay(lat, lng, today);
  if (cached) applyDayTimings(cached);
  setOfflineBadge(typeof navigator !== 'undefined' && navigator.onLine === false);

  // 2) Ağdan aylık takvimi al, önbelleği tazele
  try {
    const ok = await fetchMonthCalendar(lat, lng, today.getFullYear(), today.getMonth() + 1);
    if (ok) {
      setOfflineBadge(false);
      const fresh = getCachedDay(lat, lng, today);
      if (fresh) applyDayTimings(fresh);
      // Ay sonuna yaklaştıysa sonraki ayı da önceden indir
      if (today.getDate() >= 24) {
        const nx = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        fetchMonthCalendar(lat, lng, nx.getFullYear(), nx.getMonth() + 1).catch(() => {});
      }
    } else if (!cached) {
      throw new Error('Takvim boş');
    }
  } catch (err) {
    if (!cached) {
      console.warn('Vakit API başarısız, önbellek yok → yedek vakitler:', err);
      renderFallbackPrayerTimes();
    } else {
      console.info('Çevrimdışı: önbellekteki vakitler kullanılıyor.');
      setOfflineBadge(true);
    }
  }
}

function updateHijriBadgeUI(day, month, year) {
  const dayEl = document.getElementById('hijri-day-num');
  const monthEl = document.getElementById('hijri-month-name');
  const yearEl = document.getElementById('hijri-year-num');

  if (dayEl) dayEl.textContent = day || "25";
  if (monthEl) monthEl.textContent = month || "Safer";
  if (yearEl) yearEl.textContent = year || "1448";
}

// Home ekranındaki Hicri tarih satırını doldurur (index.html'e eklenen #date-display-hijri)
function updateHijriDateDisplay(text) {
  const el = document.getElementById('date-display-hijri');
  if (el && text) el.textContent = text;
}

// İnternet yoksa cihazdan (Intl - Ümmü'l-Kura takvimi) Hicri tarihi hesaplar
const HIJRI_MONTHS_NUM_TR = ["Muharrem","Safer","Rebiülevvel","Rebiülahir","Cemaziyelevvel","Cemaziyelahir","Recep","Şaban","Ramazan","Şevval","Zilkade","Zilhicce"];
function computeLocalHijriText(dateObj) {
  const d = dateObj || new Date();
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
      day: 'numeric', month: 'numeric', year: 'numeric'
    }).formatToParts(d);
    let day = '', monthNum = 1, year = '';
    parts.forEach(p => {
      if (p.type === 'day') day = p.value;
      if (p.type === 'month') monthNum = parseInt(p.value, 10);
      if (p.type === 'year') year = p.value.replace(/[^0-9]/g, '');
    });
    const monthTr = HIJRI_MONTHS_NUM_TR[(monthNum - 1 + 12) % 12] || '';
    return `${day} ${monthTr} ${year}`;
  } catch (e) {
    return '';
  }
}
window.computeLocalHijriText = computeLocalHijriText;

function renderPrayerCards(timings) {
  const container = document.getElementById('prayer-times-container');
  if (!container) return;

  container.innerHTML = '';
  const order = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

  order.forEach(id => {
    const info = PRAYER_NAMES[id];
    const timeVal = timings[id];
    if (!info || !timeVal) return;

    const card = document.createElement('div');
    card.className = 'prayer-card';
    card.id = `prayer-card-${id}`;
    card.onclick = () => showPrayerTimeDetailsModal(id, info.name, timeVal);
    card.innerHTML = `
      <div class="prayer-card-icon-wrap">
        ${info.icon}
      </div>
      <div class="prayer-card-info-wrap">
        <span class="prayer-name">${info.name}</span>
        <span class="prayer-time">${timeVal}</span>
      </div>
    `;
    container.appendChild(card);
  });

  // Ana sayfa üst bilgi çubuğu: Doğuş (Güneş) ve Batış (Akşam)
  const sr = document.getElementById('ip-sunrise');
  if (sr && timings.Sunrise) sr.textContent = timings.Sunrise;
  const ss = document.getElementById('ip-sunset');
  if (ss && timings.Maghrib) ss.textContent = timings.Maghrib;
}

// Show remaining/elapsed time modal when clicking a prayer card
function showPrayerTimeDetailsModal(prayerId, prayerName, timeStr) {
  const now = new Date();
  const [hrs, mins] = timeStr.split(':').map(Number);
  
  const pDate = new Date();
  pDate.setHours(hrs, mins, 0, 0);

  const diffMs = pDate - now;
  const absDiff = Math.abs(diffMs);
  const h = Math.floor(absDiff / (1000 * 60 * 60));
  const m = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));

  let msg = '';
  if (diffMs > 0) {
    msg = `${prayerName} vaktine ${h > 0 ? h + ' saat ' : ''}${m} dakika var.`;
  } else {
    msg = `${prayerName} vaktinin girmesinden ${h > 0 ? h + ' saat ' : ''}${m} dakika geçti.`;
  }

  // Alttan açılan detay paneli (ezan sesi + hatırlatıcı)
  const sheet = document.getElementById('prayer-sheet');
  if (!sheet) { showToastNotification(`🕌 ${prayerName} (${timeStr})`, msg); return; }
  _sheetPrayerId = prayerId;
  const nm = document.getElementById('sheet-name'), tm = document.getElementById('sheet-time');
  const st = document.getElementById('sheet-status'), cb = document.getElementById('sheet-adhan');
  if (nm) nm.textContent = prayerName;
  if (tm) tm.textContent = timeStr;
  if (st) st.textContent = msg;
  if (cb) cb.checked = getPrayerAdhan(prayerId);
  sheet.style.display = 'flex';
  requestAnimationFrame(() => sheet.classList.add('open'));
}

// ── Vakit bazlı ezan sesi tercihi (varsayılan: açık) ──
let _sheetPrayerId = null;
function getPrayerAdhan(id) {
  try { const v = localStorage.getItem('hv_adhan_' + id); return v === null ? true : v === '1'; } catch (e) { return true; }
}
function closePrayerSheet() {
  const s = document.getElementById('prayer-sheet');
  if (!s) return;
  s.classList.remove('open');
  setTimeout(() => { s.style.display = 'none'; }, 220);
}
function togglePrayerAdhan(on) {
  if (!_sheetPrayerId) return;
  try { localStorage.setItem('hv_adhan_' + _sheetPrayerId, on ? '1' : '0'); } catch (e) {}
  const nm = (PRAYER_NAMES[_sheetPrayerId] && PRAYER_NAMES[_sheetPrayerId].name) || 'Vakit';
  showToastNotification(on ? '🔊 Ezan sesi açık' : '🔇 Ezan sesi kapalı', `${nm} vakti için ezan ${on ? 'çalacak' : 'çalmayacak'}.`);
}
function setPrayerReminder() {
  APP_STATE.notifyEnabled = true;
  if (APP_STATE.notifySound === 'silent') APP_STATE.notifySound = 'ezan';
  saveSettings();
  applyStateSettings();
  if (_sheetPrayerId) {
    try { localStorage.setItem('hv_adhan_' + _sheetPrayerId, '1'); } catch (e) {}
    const cb = document.getElementById('sheet-adhan'); if (cb) cb.checked = true;
  }
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['push-permission-request']) {
    window.webkit.messageHandlers['push-permission-request'].postMessage('');
  } else if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  const nm = (PRAYER_NAMES[_sheetPrayerId] && PRAYER_NAMES[_sheetPrayerId].name) || 'Vakit';
  showToastNotification('⏰ Hatırlatıcı kuruldu', `${nm} vakti için ezan bildirimi açıldı.`);
  closePrayerSheet();
}
window.closePrayerSheet = closePrayerSheet;
window.togglePrayerAdhan = togglePrayerAdhan;
window.setPrayerReminder = setPrayerReminder;

function showToastNotification(title, message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'app-toast-box';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="toast-title">${title}</div>
    <div class="toast-desc">${message}</div>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

function renderFallbackPrayerTimes() {
  const mockTimings = { Fajr: "04:35", Sunrise: "06:12", Dhuhr: "13:18", Asr: "17:02", Maghrib: "20:15", Isha: "21:45" };
  APP_STATE.prayerTimes = mockTimings;

  // API başarısızsa Hicri tarihi cihazdan (Intl) hesapla
  const localHijri = computeLocalHijriText();
  APP_STATE.hijriDateText = localHijri;
  updateHijriDateDisplay(localHijri);
  renderPrayerCards(mockTimings);
  updatePrayerCountdown();
}

function updatePrayerCountdown() {
  if (!APP_STATE.prayerTimes) return;

  const now = new Date();
  const order = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  let nextPrayer = null;
  let nextTimeDate = null;

  for (const id of order) {
    const timeStr = APP_STATE.prayerTimes[id];
    if (!timeStr) continue;

    const [hrs, mins] = timeStr.split(':').map(Number);
    const pDate = new Date();
    pDate.setHours(hrs, mins, 0, 0);

    if (pDate > now) {
      nextPrayer = { id, name: PRAYER_NAMES[id].name };
      nextTimeDate = pDate;
      break;
    }
  }

  if (!nextPrayer) {
    nextPrayer = { id: 'Fajr', name: PRAYER_NAMES['Fajr'].name };
    const [hrs, mins] = APP_STATE.prayerTimes['Fajr'].split(':').map(Number);
    nextTimeDate = new Date();
    nextTimeDate.setDate(nextTimeDate.getDate() + 1);
    nextTimeDate.setHours(hrs, mins, 0, 0);
  }

  // Ramazan modu: Akşam → İftar, İmsak/Sabah → Sahur etiketleri
  const ramazan = isRamazan();
  let labelText = `${nextPrayer.name} Vaktine`;
  let pillPrefix = 'Ezan ';
  if (ramazan && nextPrayer.id === 'Maghrib') { labelText = 'İftara'; pillPrefix = 'İftar '; }
  else if (ramazan && nextPrayer.id === 'Fajr') { labelText = 'Sahura (İmsak)'; pillPrefix = 'İmsak '; }

  const targetLabel = document.getElementById('countdown-target');
  if (targetLabel) targetLabel.textContent = labelText;

  const nextEl = document.getElementById('countdown-next');
  if (nextEl) nextEl.textContent = pillPrefix + nextTimeDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  const ramazanBadge = document.getElementById('ramazan-badge');
  if (ramazanBadge) ramazanBadge.style.display = ramazan ? 'inline-flex' : 'none';

  const diffMs = nextTimeDate - now;
  const timerText = document.getElementById('countdown-timer');

  if (diffMs <= 0) {
    if (timerText) timerText.textContent = "00:00:00";
    return;
  }

  const h = Math.floor(diffMs / (1000 * 60 * 60));
  const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diffMs % (1000 * 60)) / 1000);

  if (timerText) {
    timerText.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  const remainEl = document.getElementById('ip-remain');
  if (remainEl) remainEl.textContent = (h > 0 ? h + ' sa ' : '') + m + ' dk';

  // Handle Notifications
  checkPrayerNotification(nextPrayer, nextTimeDate, diffMs);

  const activeIdx = order.indexOf(nextPrayer.id) - 1;
  const currentActiveId = activeIdx >= 0 ? order[activeIdx] : order[order.length - 1];

  // Günün saatine göre zemin tonu (sabah aydınlık kehribar → gece koyu)
  if (document.body.dataset.tod !== currentActiveId) document.body.dataset.tod = currentActiveId;

  const circle = document.getElementById('countdown-progress');
  if (circle) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    
    let prevTimeDate = new Date();
    const prevTimeStr = APP_STATE.prayerTimes[currentActiveId];
    if (prevTimeStr) {
      const [pHrs, pMins] = prevTimeStr.split(':').map(Number);
      prevTimeDate.setHours(pHrs, pMins, 0, 0);
      if (currentActiveId === 'Isha' && nextPrayer.id === 'Fajr') {
        prevTimeDate.setDate(prevTimeDate.getDate() - 1);
      }
    } else {
      prevTimeDate.setTime(nextTimeDate.getTime() - 4 * 3600 * 1000);
    }
    
    const totalWindowMs = nextTimeDate - prevTimeDate;
    const progressRatio = Math.max(0, Math.min(1, diffMs / totalWindowMs));
    circle.style.strokeDashoffset = circumference * progressRatio;
  }

  document.querySelectorAll('.prayer-card').forEach(c => {
    c.classList.remove('active');
    const badge = c.querySelector('.active-check-icon');
    if (badge) badge.remove();
  });

  // Aktif vurgu: sıradaki (geri sayılan) vakit — mockup ile uyumlu
  const activeCard = document.getElementById(`prayer-card-${nextPrayer.id}`);
  if (activeCard) {
    activeCard.classList.add('active');
  }
}

// Daily Verse
function loadDailyVerse() {
  if (typeof DAILY_VERSES !== 'undefined' && DAILY_VERSES.length) {
    const randomIndex = Math.floor(Math.random() * DAILY_VERSES.length);
    const v = DAILY_VERSES[randomIndex];

    const ar = document.getElementById('daily-verse-arabic');
    const tr = document.getElementById('daily-verse-turkish');
    const src = document.getElementById('daily-verse-source');

    if (ar) ar.textContent = v.arabic;
    if (tr) tr.textContent = `"${v.turkish}"`;
    if (src) src.textContent = `— ${v.surah} Suresi, ${v.ayah}. Ayet`;
  }
}


// Qibla Compass
function calculateQiblaBearing(lat, lng) {
  const kaabaLat = 21.4225 * Math.PI / 180;
  const kaabaLng = 39.8262 * Math.PI / 180;
  const userLat = lat * Math.PI / 180;
  const userLng = lng * Math.PI / 180;
  const dLng = kaabaLng - userLng;

  const y = Math.sin(dLng);
  const x = Math.cos(userLat) * Math.tan(kaabaLat) - Math.sin(userLat) * Math.cos(dLng);
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  if (bearing < 0) bearing += 360;
  return bearing;
}

function calculateGreatCircleDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

let smoothHeading = null;
let lastVibrateTime = 0;
let isDraggingCompass = false;
let startTouchAngle = 0;
let startHeadingAngle = 0;

function initQiblaCompass() {
  const { lat, lng } = APP_STATE.userLocation;
  APP_STATE.qiblaAngle = calculateQiblaBearing(lat, lng);
  const dist = calculateGreatCircleDistance(lat, lng, 21.4225, 39.8262);

  const degVal = document.getElementById('qibla-degree-val');
  const distVal = document.getElementById('kaaba-dist-val');
  const locVal = document.getElementById('qibla-user-loc');

  if (degVal) degVal.textContent = `${Math.round(APP_STATE.qiblaAngle)}° Güneydoğu`;
  if (distVal) distVal.textContent = `${dist.toLocaleString('tr-TR')} km`;
  if (locVal) locVal.textContent = `${APP_STATE.currentCity}, ${APP_STATE.currentDistrict} ➔ Mekke-i Mükerreme`;

  setupCompassTouchEvents();

  // If permission not granted yet, show prompt automatically
  const modal = document.getElementById('qibla-permission-modal');
  if (!localStorage.getItem('qibla_permission_granted')) {
    if (modal) modal.style.display = 'flex';
  } else {
    if (modal) modal.style.display = 'none';
    // Already granted in a previous session, try to start sensors
    startCompassSensors(true);
  }

  updateQiblaUI(0);
}

function requestQiblaPermissionFlow(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('qibla-permission-modal');
  if (modal) modal.style.display = 'flex';
}

function acceptQiblaPermissionFlow() {
  localStorage.setItem('qibla_permission_granted', 'true');
  closeQiblaPermissionModal();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        APP_STATE.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const degVal = document.getElementById('qibla-degree-val');
        const distVal = document.getElementById('kaaba-dist-val');
        APP_STATE.qiblaAngle = calculateQiblaBearing(pos.coords.latitude, pos.coords.longitude);
        const dist = calculateGreatCircleDistance(pos.coords.latitude, pos.coords.longitude, 21.4225, 39.8262);
        if (degVal) degVal.textContent = `${Math.round(APP_STATE.qiblaAngle)}° Güneydoğu`;
        if (distVal) distVal.textContent = `${dist.toLocaleString('tr-TR')} km`;
        updateQiblaUI(0);
      },
      (err) => { console.warn('Geolocation error:', err); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  startQiblaSensor();
}

function closeQiblaPermissionModal() {
  const modal = document.getElementById('qibla-permission-modal');
  if (modal) modal.style.display = 'none';
}

function setupCompassTouchEvents() {
  const box = document.getElementById('compass-interactive-box');
  if (!box || box.dataset.touchBound) return;
  box.dataset.touchBound = "true";

  const getAngleFromCenter = (e) => {
    const rect = box.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const rad = Math.atan2(clientY - centerY, clientX - centerX);
    return rad * (180 / Math.PI);
  };

  const handleStart = (e) => {
    // Only treat as drag if moving
    startTouchAngle = getAngleFromCenter(e);
    startHeadingAngle = smoothHeading || 0;
  };

  const handleMove = (e) => {
    isDraggingCompass = true;
    const currentAngle = getAngleFromCenter(e);
    const delta = currentAngle - startTouchAngle;
    const newHeading = (startHeadingAngle - delta + 360) % 360;
    smoothHeading = newHeading;
    const slider = document.getElementById('manual-compass-slider');
    if (slider) slider.value = Math.round(newHeading);
    updateQiblaUI(newHeading);
  };

  const handleEnd = () => {
    setTimeout(() => { isDraggingCompass = false; }, 300);
  };

  box.addEventListener('touchstart', handleStart, { passive: true });
  box.addEventListener('touchmove', handleMove, { passive: true });
  box.addEventListener('touchend', handleEnd);
  box.addEventListener('mousedown', handleStart);
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('mouseup', handleEnd);
}

function requestQiblaPermissionFlow(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('qibla-permission-modal');
  if (modal) modal.style.display = 'flex';
}

function acceptQiblaPermissionFlow() {
  localStorage.setItem('qibla_permission_granted', 'true');
  closeQiblaPermissionModal();
  startCompassSensors(false);
}

function closeQiblaPermissionModal() {
  const modal = document.getElementById('qibla-permission-modal');
  if (modal) modal.style.display = 'none';
}

function startCompassSensors(isAutoStart = false) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        APP_STATE.userLocation = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const degVal = document.getElementById('qibla-degree-val');
        const distVal = document.getElementById('kaaba-dist-val');
        APP_STATE.qiblaAngle = calculateQiblaBearing(pos.coords.latitude, pos.coords.longitude);
        const dist = calculateGreatCircleDistance(pos.coords.latitude, pos.coords.longitude, 21.4225, 39.8262);
        if (degVal) degVal.textContent = `${Math.round(APP_STATE.qiblaAngle)}° Güneydoğu`;
        if (distVal) distVal.textContent = `${dist.toLocaleString('tr-TR')} km`;
        updateQiblaUI(0);
      },
      (err) => console.warn('Compass geo error:', err),
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }

  const btn = document.getElementById('enable-compass-btn');
  const status = document.getElementById('compass-status-msg');

  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    if (isAutoStart) {
      window.addEventListener('deviceorientation', handleOrientationEvent, true);
      if (btn) btn.innerHTML = "✅ SENSÖR AKTİF (TELEFONU ÇEVİRİN)";
      if (status) status.innerHTML = "✅ <b>Pusula sensörü aktif!</b> Telefonunuzu düz tutarak çevirin.";
    } else {
      DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          window.addEventListener('deviceorientation', handleOrientationEvent, true);
          if (btn) btn.innerHTML = "✅ SENSÖR AKTİF (TELEFONU ÇEVİRİN)";
          if (status) status.innerHTML = "✅ <b>Pusula sensörü aktif!</b> Telefonunuzu düz tutarak çevirin.";
        } else {
          if (btn) btn.innerHTML = "⚡ SENSÖR İZNİ VER & BAŞLAT";
          if (status) status.innerHTML = "⚠️ Sensör izni reddedildi. İzin vermelisiniz.";
          localStorage.removeItem('qibla_permission_granted'); // Reset if denied
        }
      })
      .catch(err => {
        console.warn('Compass permission error:', err);
        // iOS requires user interaction, if it fails, reset
        localStorage.removeItem('qibla_permission_granted');
        if (btn) btn.innerHTML = "⚡ SENSÖR İZNİ VER & BAŞLAT";
      });
    }
  } else {
    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientationEvent, true);
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientationEvent, true);
    }
    if (btn) btn.innerHTML = "✅ CANLI SENSÖR AKTİF";
    if (status) status.innerHTML = "✅ <b>Pusula sensörü aktif!</b> Telefonunuzu çevirin veya parmağınızla yönü ayarlayın.";
  }
}

function handleManualCompass(val) {
  const heading = parseFloat(val);
  smoothHeading = heading;
  updateQiblaUI(heading);
}

function handleOrientationEvent(e) {
  if (isDraggingCompass) return; // Don't override while active touch swipe

  let compassHeading = null;

  // iOS Safari
  if (e.webkitCompassHeading != null) {
    compassHeading = e.webkitCompassHeading;
  }
  // Android absolute orientation
  else if (e.alpha != null) {
    if (e.absolute === true || e.type === 'deviceorientationabsolute') {
      compassHeading = (360 - e.alpha) % 360;
    } else {
      compassHeading = (360 - e.alpha) % 360;
    }
  }

  if (compassHeading == null || isNaN(compassHeading)) return;

  if (smoothHeading === null) {
    smoothHeading = compassHeading;
  } else {
    let normalizedSmooth = ((smoothHeading % 360) + 360) % 360;
    let diff = compassHeading - normalizedSmooth;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    // Accumulate the continuous heading to prevent CSS rotate from spinning backwards
    smoothHeading += diff * 0.7;
  }

  const slider = document.getElementById('manual-compass-slider');
  if (slider) slider.value = Math.round(smoothHeading);

  updateQiblaUI(smoothHeading);
}

function updateQiblaUI(heading) {
  const dial = document.getElementById('compass-dial');
  const needle = document.getElementById('compass-needle');
  const headVal = document.getElementById('compass-heading-val');

  if (headVal) headVal.textContent = `${Math.round(heading)}°`;

  // Rotate dial by -heading so North (K) points to magnetic North
  if (dial) {
    dial.style.transform = `rotate(${-heading}deg)`;
  }

  // Rotate gold needle to point relative to fixed 12 o'clock Kâbe target
  // Needle points straight UP (0°) into 🕋 Kâbe target when heading == qiblaAngle
  const relativeNeedleAngle = APP_STATE.qiblaAngle - heading;

  if (needle) {
    needle.style.transform = `translate(-50%, -50%) rotate(${relativeNeedleAngle}deg)`;
  }

  updateQiblaDirectionPill(APP_STATE.qiblaAngle, heading);
}

function updateQiblaDirectionPill(qiblaAngle, heading) {
  const guidePill = document.getElementById('qibla-direction-pill');
  const statusMsg = document.getElementById('compass-status-msg');

  let diff = (qiblaAngle - heading + 360) % 360;
  if (diff > 180) diff -= 360;

  const absDiff = Math.abs(Math.round(diff));

  if (absDiff <= 5) {
    if (guidePill) {
      guidePill.className = 'qibla-pill aligned';
      guidePill.innerHTML = `✨ 🕋 TAM KIBLE YÖNÜNDESİNİZ! ✨`;
    }
    if (statusMsg && !isDraggingCompass) {
      statusMsg.innerHTML = `🎯 <b>HARİKA!</b> Altın ibre şu an tam <b>HEDEF KÂBE</b> simgesiyle çakıştı.`;
      statusMsg.style.color = "#5ce3c7";
    }

    const now = Date.now();
    if (now - lastVibrateTime > 1500 && navigator.vibrate) {
      navigator.vibrate([150, 80, 150]);
      lastVibrateTime = now;
    }
  } else if (diff > 0) {
    if (guidePill) {
      guidePill.className = 'qibla-pill turn-right';
      guidePill.innerHTML = `➡️ Sağa Dön (${absDiff}°)`;
    }
  } else {
    if (guidePill) {
      guidePill.className = 'qibla-pill turn-left';
      guidePill.innerHTML = `⬅️ Sola Dön (${absDiff}°)`;
    }
  }
}


// Quran Section Engine - Full 114 Surahs
function initQuranSection() {
  const searchInput = document.getElementById('surah-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterSurahList(e.target.value);
    });
  }

  // Load all 114 Surahs list
  APP_STATE.surahList = typeof ALL_114_SURAHS !== 'undefined' ? ALL_114_SURAHS : [];
  renderSurahListItems(APP_STATE.surahList);

  document.getElementById('font-decrease')?.addEventListener('click', () => adjustQuranFontSize(-2));
  document.getElementById('font-increase')?.addEventListener('click', () => adjustQuranFontSize(2));

  document.getElementById('back-to-surahs')?.addEventListener('click', () => {
    document.getElementById('surah-list-view').style.display = 'block';
    document.getElementById('surah-detail-view').style.display = 'none';
    renderQuranTools();

    // Pause audio when returning to list
    const audioPlayer = document.getElementById('surah-audio-player');
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  });
}

function renderSurahListItems(list) {
  const container = document.getElementById('surah-list-wrap');
  if (!container) return;

  container.innerHTML = '';
  list.forEach(s => {
    const id = s.id || s.number;
    const nameTr = s.name || '';
    const nameAr = s.name_original || s.name_arabic || '';
    const verseCnt = s.verse_count || s.verses_count || '';
    const place = s.revelation_place || 'Mekke';

    const card = document.createElement('div');
    card.className = 'surah-card';
    card.onclick = () => loadSurahDetail(id, s);
    card.innerHTML = `
      <div class="surah-badge-num">${id}</div>
      <div class="surah-info-col">
        <div class="surah-title-tr">${nameTr} Suresi</div>
        <div class="surah-sub-info">${verseCnt} Ayet • ${place}</div>
      </div>
      <div class="surah-title-ar">${nameAr}</div>
    `;
    container.appendChild(card);
  });
}

function filterSurahList(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderSurahListItems(APP_STATE.surahList);
    return;
  }
  const filtered = APP_STATE.surahList.filter(s => {
    const name = (s.name || '').toLowerCase();
    const idStr = String(s.id || s.number);
    return name.includes(q) || idStr === q;
  });
  renderSurahListItems(filtered);
}

// Load Full Verses of Any Surah (Al Quran Cloud API + Açık Kuran API + Fallbacks)
async function loadSurahDetail(id, localSurahObj) {
  document.getElementById('surah-list-view').style.display = 'none';
  document.getElementById('surah-detail-view').style.display = 'block';

  // Setup Audio Player
  const audioPlayer = document.getElementById('surah-audio-player');
  const qariSelect = document.getElementById('qari-select');
  if (audioPlayer && qariSelect) {
    const paddedId = String(id).padStart(3, '0');
    
    const setAudioSource = () => {
      const option = qariSelect.options[qariSelect.selectedIndex];
      const server = option.getAttribute('data-server');
      const qari = option.value;
      audioPlayer.src = `https://${server}.mp3quran.net/${qari}/${paddedId}.mp3`;
      audioPlayer.load();
    };

    setAudioSource();

    qariSelect.onchange = () => {
      const wasPlaying = !audioPlayer.paused;
      const currentTime = audioPlayer.currentTime;
      setAudioSource();
      
      if (wasPlaying) {
        audioPlayer.oncanplay = () => {
          audioPlayer.currentTime = currentTime;
          audioPlayer.play();
          audioPlayer.oncanplay = null;
        };
      }
    };
  }

  const headerCard = document.getElementById('surah-header-card');
  const ayahWrap = document.getElementById('ayah-list-wrap');

  if (headerCard && localSurahObj) {
    const aciklama = (typeof SURE_ACIKLAMA !== 'undefined' && SURE_ACIKLAMA[id]) ? SURE_ACIKLAMA[id] : '';
    headerCard.innerHTML = `
      <div class="detail-ar-name">${localSurahObj.name_original || ''}</div>
      <div class="detail-tr-name">${localSurahObj.name} Suresi</div>
      <div class="detail-meta">${localSurahObj.verse_count} Ayet • ${localSurahObj.revelation_place}</div>
      ${aciklama ? `<div class="sure-hakkinda"><span class="sh-label">📘 Sure Hakkında</span>${aciklama}</div>` : ''}
    `;
  }

  if (ayahWrap) ayahWrap.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--text-sub);">Ayetler yükleniyor...</div>';

  // Son okunan sure kaydı
  const prevLast = hvGetLastRead();
  if (!prevLast || prevLast.surah !== id) hvSetLastRead(id, localSurahObj ? localSurahObj.name : ('Sure ' + id), 1);

  // 1) Çevrimdışı önbellek (IndexedDB) — varsa ağa hiç çıkmadan göster
  let verses = null;
  let fromCache = false;
  try {
    const cached = await hvIdbGet('surah_' + id);
    if (cached && Array.isArray(cached) && cached.length) { verses = cached; fromCache = true; }
  } catch (e) { /* IDB yoksa sessizce geç */ }

  // 2) Ağdan indir (önbellek yoksa)
  if (!verses) verses = await fetchSurahVerses(id);
  if (verses && !fromCache) hvIdbSet('surah_' + id, verses).catch(() => {});

  renderSurahVerses(id, verses, ayahWrap);
}

// Ağdan sure ayetlerini çeker (önce Al Quran Cloud, sonra Açık Kuran)
async function fetchSurahVerses(id) {
  let verses = null;

  // Primary API: Al Quran Cloud (Fastest global CDN with Turkish Transliteration + Diyanet translation)
  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,tr.transliteration,tr.diyanet`);
    const json = await res.json();

    if (json && json.data && json.data.length >= 3) {
      const arAyahs = json.data[0].ayahs;
      const okAyahs = json.data[1].ayahs;
      const trAyahs = json.data[2].ayahs;

      verses = arAyahs.map((a, idx) => ({
        verse_number: a.numberInSurah,
        verse: a.text,
        okunusu: okAyahs[idx] ? okAyahs[idx].text : '',
        translation: trAyahs[idx] ? trAyahs[idx].text : ''
      }));
    } else if (json && json.data && json.data.length >= 2) {
      const arAyahs = json.data[0].ayahs;
      const trAyahs = json.data[1].ayahs;

      verses = arAyahs.map((a, idx) => ({
        verse_number: a.numberInSurah,
        verse: a.text,
        okunusu: '',
        translation: trAyahs[idx] ? trAyahs[idx].text : ''
      }));
    }
  } catch (e) {
    console.warn('Al Quran Cloud API failed, trying Açık Kuran API:', e);
  }

  // Backup API: Açık Kuran API
  if (!verses) {
    try {
      const res = await fetch(`https://api.acikkuran.com/surah/${id}`);
      const json = await res.json();
      if (json.data && json.data.verses) {
        verses = json.data.verses.map(v => ({
          verse_number: v.verse_number,
          verse: v.verse,
          okunusu: v.transliteration?.text || '',
          translation: v.translation?.text || ''
        }));
      }
    } catch (e) {
      console.warn('Açık Kuran API failed:', e);
    }
  }
  return verses;
}

// Ayet kartlarını basar (yer imi + son okunan butonlarıyla)
function renderSurahVerses(id, verses, ayahWrap) {
  if (!ayahWrap) return;
  if (verses && verses.length > 0) {
    ayahWrap.innerHTML = '';

    // Bismillah header for all surahs except Fatiha (1) and Tevbe (9)
    if (id !== 1 && id !== 9) {
      const bism = document.createElement('div');
      bism.className = 'bismillah-header';
      bism.textContent = "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ";
      ayahWrap.appendChild(bism);
    }

    const marks = hvGetBookmarks();
    const lastRead = hvGetLastRead();
    verses.forEach(v => {
      const key = id + ':' + v.verse_number;
      const isMarked = !!marks[key];
      const isLast = lastRead && lastRead.surah === id && lastRead.ayah === v.verse_number;
      const card = document.createElement('div');
      card.className = 'ayah-card' + (isMarked ? ' ayah-marked' : '');
      card.id = 'ayah-' + v.verse_number;
      card.innerHTML = `
        <div class="ayah-ar-text">${v.verse}</div>
        ${v.okunusu ? `<div class="ayah-okunusu-text">🗣️ <b>Okunuşu:</b> ${v.okunusu}</div>` : ''}
        <div class="ayah-tr-text"><span class="verse-num-badge">${v.verse_number}</span>📖 <b>Anlamı:</b> ${v.translation}</div>
        <div class="ayah-actions">
          <button class="ayah-act-btn ${isMarked ? 'on' : ''}" data-act="mark" onclick="hvToggleBookmark(${id}, ${v.verse_number}, this)">${isMarked ? '⭐ Kaydedildi' : '☆ Yer İmi'}</button>
          <button class="ayah-act-btn ${isLast ? 'on' : ''}" data-act="last" onclick="hvMarkLastRead(${id}, ${v.verse_number}, this)">${isLast ? '📍 Kaldığım Yer' : '📍 Buraya Kadar'}</button>
          <button class="ayah-act-btn" onclick="hvShareAyah(${id}, ${v.verse_number})">📤</button>
        </div>
      `;
      ayahWrap.appendChild(card);
    });
  } else {
    ayahWrap.innerHTML = `
      <div style="text-align:center; padding: 40px; color: var(--text-sub);">
        <p>Ayetler yüklenirken internet bağlantısı kurulamadı.</p>
        <p style="font-size:.8rem;margin-top:6px;">Bu sure daha önce indirilmediği için çevrimdışı gösterilemiyor. İnternet varken <b>Kuran-ı Kerim → Çevrimdışı İndir</b> ile tüm Kur'an'ı cihazınıza kaydedebilirsiniz.</p>
        <button class="gold-primary-btn" style="margin-top: 12px;" onclick="retryLoadSurah(${id})">Tekrar Deneyin</button>
      </div>
    `;
  }
}

/* ────────────────────────────────────────────────────────────
   ÇEVRİMDIŞI KUR'AN — IndexedDB önbelleği, yer imleri, son okunan
   ──────────────────────────────────────────────────────────── */
const HV_IDB_NAME = 'huzurvakti';
const HV_IDB_STORE = 'kv';
function hvIdbOpen() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB yok'));
    const req = indexedDB.open(HV_IDB_NAME, 1);
    req.onupgradeneeded = () => { req.result.createObjectStore(HV_IDB_STORE); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function hvIdbGet(key) {
  const db = await hvIdbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(HV_IDB_STORE, 'readonly');
    const rq = tx.objectStore(HV_IDB_STORE).get(key);
    rq.onsuccess = () => resolve(rq.result);
    rq.onerror = () => reject(rq.error);
  });
}
async function hvIdbSet(key, value) {
  const db = await hvIdbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(HV_IDB_STORE, 'readwrite');
    tx.objectStore(HV_IDB_STORE).put(value, key);
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
async function hvIdbKeys() {
  const db = await hvIdbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(HV_IDB_STORE, 'readonly');
    const rq = tx.objectStore(HV_IDB_STORE).getAllKeys();
    rq.onsuccess = () => resolve(rq.result || []);
    rq.onerror = () => reject(rq.error);
  });
}
async function hvIdbClear() {
  const db = await hvIdbOpen();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(HV_IDB_STORE, 'readwrite');
    tx.objectStore(HV_IDB_STORE).clear();
    tx.oncomplete = () => resolve(true);
    tx.onerror = () => reject(tx.error);
  });
}
window.hvIdbGet = hvIdbGet; window.hvIdbSet = hvIdbSet; window.hvIdbKeys = hvIdbKeys; window.hvIdbClear = hvIdbClear;

// İndirilmiş sure sayısı
async function hvOfflineSurahCount() {
  try { return (await hvIdbKeys()).filter(k => String(k).startsWith('surah_')).length; } catch (e) { return 0; }
}

// Tüm Kur'an'ı indir (114 sure) — ilerleme göstergeli
let _hvDownloading = false;
async function hvDownloadWholeQuran() {
  if (_hvDownloading) return;
  _hvDownloading = true;
  const bar = document.getElementById('qdl-bar');
  const txt = document.getElementById('qdl-text');
  const btn = document.getElementById('qdl-btn');
  if (btn) btn.disabled = true;
  let done = 0, failed = 0;
  let existing = [];
  try { existing = (await hvIdbKeys()).map(String); } catch (e) {}
  for (let i = 1; i <= 114; i++) {
    if (existing.includes('surah_' + i)) { done++; }
    else {
      const v = await fetchSurahVerses(i);
      if (v && v.length) { try { await hvIdbSet('surah_' + i, v); done++; } catch (e) { failed++; } }
      else failed++;
    }
    const pct = Math.round((i / 114) * 100);
    if (bar) bar.style.width = pct + '%';
    if (txt) txt.textContent = `İndiriliyor… ${i}/114 sure (${pct}%)`;
  }
  _hvDownloading = false;
  if (btn) btn.disabled = false;
  if (txt) txt.textContent = failed ? `${done}/114 sure indirildi, ${failed} sure alınamadı. Tekrar deneyin.` : '✅ Kur\'an-ı Kerim tamamen çevrimdışı kullanılabilir (114/114).';
  showToastNotification('📖 Çevrimdışı Kur\'an', failed ? `${done} sure indirildi, ${failed} eksik.` : 'Tüm sureler cihazınıza kaydedildi.');
  renderQuranTools();
}
window.hvDownloadWholeQuran = hvDownloadWholeQuran;

// Yer imleri: { "2:255": {surah:2, ayah:255, name:"Bakara", ts:...} }
function hvGetBookmarks() {
  try { return JSON.parse(localStorage.getItem('hv_bookmarks') || '{}'); } catch (e) { return {}; }
}
function hvSurahName(id) {
  const list = (typeof ALL_114_SURAHS !== 'undefined') ? ALL_114_SURAHS : (APP_STATE.surahList || []);
  const s = list.find(x => (x.id || x.number) === id);
  return s ? s.name : ('Sure ' + id);
}
function hvToggleBookmark(surah, ayah, btn) {
  const marks = hvGetBookmarks();
  const key = surah + ':' + ayah;
  if (marks[key]) { delete marks[key]; }
  else { marks[key] = { surah, ayah, name: hvSurahName(surah), ts: Date.now() }; }
  localStorage.setItem('hv_bookmarks', JSON.stringify(marks));
  const on = !!marks[key];
  if (btn) { btn.classList.toggle('on', on); btn.textContent = on ? '⭐ Kaydedildi' : '☆ Yer İmi'; }
  const card = document.getElementById('ayah-' + ayah);
  if (card) card.classList.toggle('ayah-marked', on);
  showToastNotification(on ? '⭐ Yer imi eklendi' : 'Yer imi kaldırıldı', `${hvSurahName(surah)} ${ayah}. ayet`);
}
window.hvToggleBookmark = hvToggleBookmark;

function hvGetLastRead() {
  try { return JSON.parse(localStorage.getItem('hv_last_read') || 'null'); } catch (e) { return null; }
}
function hvSetLastRead(surah, name, ayah) {
  localStorage.setItem('hv_last_read', JSON.stringify({ surah, name: name || hvSurahName(surah), ayah: ayah || 1, ts: Date.now() }));
}
function hvMarkLastRead(surah, ayah, btn) {
  hvSetLastRead(surah, hvSurahName(surah), ayah);
  document.querySelectorAll('.ayah-act-btn[data-act="last"]').forEach(b => { b.classList.remove('on'); b.textContent = '📍 Buraya Kadar'; });
  if (btn) { btn.classList.add('on'); btn.textContent = '📍 Kaldığım Yer'; }
  showToastNotification('📍 Kaldığın yer kaydedildi', `${hvSurahName(surah)} ${ayah}. ayet`);
}
window.hvMarkLastRead = hvMarkLastRead;

function hvShareAyah(surah, ayah) {
  const card = document.getElementById('ayah-' + ayah);
  const tr = card ? (card.querySelector('.ayah-tr-text')?.textContent || '').replace(/^\s*\d+\s*📖\s*Anlamı:\s*/, '').trim() : '';
  const text = `${hvSurahName(surah)} Suresi, ${ayah}. Ayet\n\n"${tr}"\n\n— Huzur Vakti`;
  if (typeof hvShareText === 'function') hvShareText(text);
  else if (navigator.share) navigator.share({ text }).catch(() => {});
}
window.hvShareAyah = hvShareAyah;

// Belirli sure + ayete git
function openSurahAt(surahId, ayah) {
  navigateTo('quran');
  retryLoadSurah(surahId);
  const listView = document.getElementById('surah-list-view');
  const detailView = document.getElementById('surah-detail-view');
  if (listView) listView.style.display = 'none';
  if (detailView) detailView.style.display = 'block';
  let tries = 0;
  const tick = setInterval(() => {
    const el = document.getElementById('ayah-' + ayah);
    tries++;
    if (el) {
      clearInterval(tick);
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ayah-flash');
      setTimeout(() => el.classList.remove('ayah-flash'), 2200);
    } else if (tries > 60) clearInterval(tick);
  }, 150);
}
window.openSurahAt = openSurahAt;

// Kuran listesi üstündeki araç kartı (kaldığın yer, yer imleri, çevrimdışı indirme)
async function renderQuranTools() {
  const box = document.getElementById('quran-tools');
  if (!box) return;
  const last = hvGetLastRead();
  const marks = Object.values(hvGetBookmarks()).sort((a, b) => b.ts - a.ts);
  const count = await hvOfflineSurahCount();
  const pct = Math.round((count / 114) * 100);
  const marksHtml = marks.length
    ? `<div class="qt-marks">${marks.slice(0, 12).map(m => `<button class="qt-chip" onclick="openSurahAt(${m.surah}, ${m.ayah})">⭐ ${m.name} ${m.ayah}</button>`).join('')}${marks.length > 12 ? `<span class="qt-more">+${marks.length - 12}</span>` : ''}</div>`
    : `<div class="qt-empty">Henüz yer imi yok. Ayet kartındaki ☆ ile ekleyin.</div>`;
  box.innerHTML = `
    <div class="qt-card">
      <div class="qt-row">
        <div class="qt-title">📍 Kaldığın Yer</div>
        ${last ? `<button class="qt-go" onclick="openSurahAt(${last.surah}, ${last.ayah})">${last.name} ${last.ayah}. ayet →</button>` : `<span class="qt-empty">Henüz okuma yok</span>`}
      </div>
      <div class="qt-row qt-col">
        <div class="qt-title">⭐ Yer İmleri <span class="qt-count">${marks.length}</span></div>
        ${marksHtml}
      </div>
      <div class="qt-row qt-col">
        <div class="qt-title">📥 Çevrimdışı Kur'an <span class="qt-count">${count}/114</span></div>
        <div class="qdl-track"><div id="qdl-bar" class="qdl-bar" style="width:${pct}%"></div></div>
        <div id="qdl-text" class="qdl-text">${count === 114 ? '✅ Tüm sureler cihazınızda — internetsiz okuyabilirsiniz.' : (count ? `${count} sure indirildi. Kalanını indirmek için dokunun.` : 'İnternet varken tüm Kur\'an\'ı indirin, sonra internetsiz okuyun.')}</div>
        <div class="backup-row">
          <button id="qdl-btn" class="gold-primary-btn" onclick="hvDownloadWholeQuran()" ${count === 114 ? 'disabled' : ''}>${count === 114 ? '✅ İndirildi' : '📥 Tüm Kur\'an\'ı İndir'}</button>
          ${count ? `<button class="gold-outline-btn" onclick="hvClearQuranCache()">🗑️ Önbelleği Sil</button>` : ''}
        </div>
      </div>
    </div>`;
}
window.renderQuranTools = renderQuranTools;
async function hvClearQuranCache() {
  try { await hvIdbClear(); showToastNotification('🗑️ Önbellek silindi', 'Çevrimdışı Kur\'an verisi kaldırıldı.'); } catch (e) {}
  renderQuranTools();
}
window.hvClearQuranCache = hvClearQuranCache;

// Retry butonu düzeltmesi: sure nesnesini HTML'e gömmek yerine id ile listeden bulur
function retryLoadSurah(id) {
  let s = null;
  if (typeof ALL_114_SURAHS !== 'undefined') {
    s = ALL_114_SURAHS.find(x => (x.id || x.number) === id) || null;
  }
  if (!s && APP_STATE.surahList) {
    s = APP_STATE.surahList.find(x => (x.id || x.number) === id) || null;
  }
  loadSurahDetail(id, s);
}
window.retryLoadSurah = retryLoadSurah;
window.loadSurahDetail = loadSurahDetail;

function adjustQuranFontSize(delta) {
  APP_STATE.fontSize = Math.max(14, Math.min(36, APP_STATE.fontSize + delta));
  document.documentElement.style.setProperty('--quran-font-size', APP_STATE.fontSize + 'px');

  const valText = document.getElementById('font-size-val');
  if (valText) valText.textContent = APP_STATE.fontSize + 'px';

  const slider = document.getElementById('font-size-slider');
  if (slider) slider.value = APP_STATE.fontSize;

  saveSettings();
}

// Prayer Guide Section
function initPrayerGuideSection() {
  const pillBar = document.getElementById('prayer-pill-bar');
  if (!pillBar || typeof PRAYER_GUIDE_DATA === 'undefined') return;

  pillBar.innerHTML = '';
  const keys = Object.keys(PRAYER_GUIDE_DATA);

  keys.forEach((key, idx) => {
    const item = PRAYER_GUIDE_DATA[key];
    const btn = document.createElement('button');
    btn.className = `prayer-pill-btn ${idx === 0 ? 'active' : ''}`;
    btn.textContent = item.name;
    btn.onclick = () => {
      document.querySelectorAll('.prayer-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPrayerGuideDetails(key);
    };
    pillBar.appendChild(btn);
  });

  renderPrayerGuideDetails(keys[0]);
}

let currentGuideKey = 'sabah';
let currentGuidePartIdx = 0;
let currentGuideViewMode = 'steps';

function switchGuideViewMode(mode) {
  currentGuideViewMode = mode;

  document.querySelectorAll('.guide-switch-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`guide-tab-${mode}`);
  if (activeBtn) activeBtn.classList.add('active');

  const stepsWrap = document.getElementById('prayer-steps-wrap');
  const duasWrap = document.getElementById('duas-wrap');

  if (mode === 'steps') {
    if (stepsWrap) stepsWrap.style.display = 'block';
    if (duasWrap) duasWrap.style.display = 'none';
  } else if (mode === 'duas') {
    if (stepsWrap) stepsWrap.style.display = 'none';
    if (duasWrap) duasWrap.style.display = 'block';
  } else {
    if (stepsWrap) stepsWrap.style.display = 'block';
    if (duasWrap) duasWrap.style.display = 'block';
  }
}

function switchPrayerPart(key, partIdx) {
  renderPrayerGuideDetails(key, partIdx);
}

function renderPrayerGuideDetails(key, partIdx = 0) {
  const guide = PRAYER_GUIDE_DATA[key];
  if (!guide) return;

  currentGuideKey = key;
  currentGuidePartIdx = partIdx;

  const summaryBox = document.getElementById('rakat-summary-box');
  if (summaryBox) {
    let tagsHtml = guide.parts.map((p, i) => {
      const typeCls = p.type === 'farz' ? 'farz' : p.type === 'vitir' ? 'vitir' : 'sunnet';
      const isSelected = i === partIdx ? 'active-part-btn' : '';
      return `<button class="tag-badge-btn ${typeCls} ${isSelected}" onclick="switchPrayerPart('${key}', ${i})">👉 ${p.description}</button>`;
    }).join('');

    summaryBox.innerHTML = `
      <div class="summary-heading">🕌 ${guide.name} — Toplam ${guide.totalRakat} Rekât</div>
      <div class="rakat-sub-hint">👇 Detaylı kılınışını görmek istediğiniz bölüme tıklayın:</div>
      <div class="rakat-tags-row">${tagsHtml}</div>
    `;
  }

  const activePart = guide.parts[partIdx] || guide.parts[0];
  const stepsWrap = document.getElementById('prayer-steps-wrap');
  if (stepsWrap) {
    const stepsToRender = (activePart && activePart.steps) ? activePart.steps : (guide.steps || []);
    const partTitle = activePart ? activePart.description : guide.name;

    stepsWrap.innerHTML = `
      <div class="active-part-header-banner">
        <span class="banner-badge">📍 Nasıl Kılınır?</span>
        <h3>${partTitle} Kılınış Adımları</h3>
      </div>
      ${stepsToRender.map(s => `
        <div class="step-card">
          <div class="step-circle-num">${s.step}</div>
          <div class="step-body">
            <h4>${s.title}</h4>
            <p>${s.description}</p>
            ${s.arabicText ? `
              <div class="step-dua-block">
                <div class="step-dua-ar">${s.arabicText}</div>
                ${s.okunusuText ? `<div class="step-dua-okunusu">🗣️ <b>Okunuşu:</b> ${s.okunusuText}</div>` : ''}
                ${s.turkishMeaning ? `<div class="step-dua-tr">📖 <b>Anlamı:</b> ${s.turkishMeaning}</div>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    `;
  }

  const duasWrap = document.getElementById('duas-wrap');
  if (duasWrap && typeof PRAYER_DUAS !== 'undefined') {
    let listKeys = ['subhaneke', 'fatiha', 'ettehiyyatu', 'allahummeSalli', 'allahummeBarik', 'rabbenaDuasi'];
    if (key === 'yatsi' || (activePart && activePart.type === 'vitir')) listKeys.push('kunut');

    let duasHtml = listKeys.map(k => {
      const d = PRAYER_DUAS[k];
      if (!d) return '';
      return `
        <div class="dua-full-card">
          <div class="dua-card-title">${d.title}</div>
          <div class="dua-ar-text">${d.arabic}</div>
          ${d.okunusu ? `<div class="dua-okunusu-text">🗣️ <b>Okunuşu:</b> ${d.okunusu}</div>` : ''}
          <div class="dua-tr-text">📖 <b>Anlamı:</b> ${d.turkish}</div>
        </div>
      `;
    }).join('');

    duasWrap.innerHTML = `
      <div class="section-divider-block">
        <div class="divider-line"></div>
        <div class="section-sub-title">📿 Namazda Okunan Temel Dualar ve Sureler</div>
        <div class="divider-line"></div>
      </div>
      ${duasHtml}
    `;
  }

  switchGuideViewMode(currentGuideViewMode);
}

// Settings Controls
function setupSettingsListeners() {
  document.getElementById('city-select')?.addEventListener('change', (e) => {
    const cityName = e.target.value;
    APP_STATE.currentCity = cityName;

    populateDistrictOptions(cityName);

    const firstDistrict = document.getElementById('district-select')?.value || 'Merkez';
    APP_STATE.currentDistrict = firstDistrict;

    const coords = getSelectedCoordinates(cityName, firstDistrict);
    if (coords) {
      APP_STATE.userLocation = coords;
      fetchPrayerTimes(coords.lat, coords.lng);
      if (APP_STATE.currentPage === 'qibla') initQiblaCompass();
    }

    updateLocationHeaderLabel();
    saveSettings();
  });

  document.getElementById('district-select')?.addEventListener('change', (e) => {
    const distName = e.target.value;
    APP_STATE.currentDistrict = distName;

    const coords = getSelectedCoordinates(APP_STATE.currentCity, distName);
    if (coords) {
      APP_STATE.userLocation = coords;
      fetchPrayerTimes(coords.lat, coords.lng);
      if (APP_STATE.currentPage === 'qibla') initQiblaCompass();
    }

    updateLocationHeaderLabel();
    saveSettings();
  });

  // Vakit ince ayarı (dk) — her vakte ayrı düzeltme
  document.querySelectorAll('.offset-input').forEach(inp => {
    inp.addEventListener('change', (e) => {
      let v = parseInt(e.target.value, 10);
      if (isNaN(v)) v = 0;
      v = Math.max(-15, Math.min(15, v));
      e.target.value = v;
      APP_STATE.timeOffsets = APP_STATE.timeOffsets || {};
      APP_STATE.timeOffsets[e.target.dataset.k] = v;
      saveSettings();
      reapplyTimeOffsets();
    });
  });
  document.getElementById('offset-reset-btn')?.addEventListener('click', () => {
    APP_STATE.timeOffsets = {};
    saveSettings();
    applyStateSettings();
    reapplyTimeOffsets();
    showToastNotification('🕰️ Vakit Ayarı', 'Varsayılan (Diyanet) değerlere dönüldü.');
  });

  document.getElementById('theme-toggle')?.addEventListener('change', (e) => {
    APP_STATE.greenTheme = e.target.checked;
    applyStateSettings();
    saveSettings();
    showToastNotification(APP_STATE.greenTheme ? '🌿 Yeşil Tema (Lüks Gece)' : '🟤 Bakır Tema', 'Tema değiştirildi.');
  });

  document.getElementById('font-size-slider')?.addEventListener('input', (e) => {
    const size = parseInt(e.target.value);
    APP_STATE.fontSize = size;
    applyStateSettings();
    saveSettings();
  });

  document.getElementById('notify-toggle')?.addEventListener('change', (e) => {
    APP_STATE.notifyEnabled = e.target.checked;
    saveSettings();
    if (APP_STATE.notifyEnabled) {
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['push-permission-request']) {
        window.webkit.messageHandlers['push-permission-request'].postMessage('');
      } else if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
  });

  document.getElementById('notify-time')?.addEventListener('change', (e) => {
    APP_STATE.notifyOffset = parseInt(e.target.value);
    saveSettings();
  });

  document.getElementById('notify-sound')?.addEventListener('change', (e) => {
    APP_STATE.notifySound = e.target.value;
    saveSettings();
  });

  const syncQari = (e) => {
    APP_STATE.qari = e.target.value;
    applyStateSettings();
    saveSettings();
    const surahQariSelect = document.getElementById('qari-select');
    if (surahQariSelect && typeof surahQariSelect.onchange === 'function') {
      surahQariSelect.onchange({ target: surahQariSelect });
    }
  };

  document.getElementById('settings-qari-select')?.addEventListener('change', syncQari);
  document.getElementById('qari-select')?.addEventListener('change', syncQari);

  document.getElementById('auto-gps-btn')?.addEventListener('click', requestGPSLocation);
}

function requestGPSLocation() {
  const statusMsg = document.getElementById('location-status-msg');
  if (statusMsg) {
    statusMsg.textContent = "📡 GPS Konumunuz taranıyor...";
    statusMsg.style.color = "var(--gold-light)";
  }

  if (!navigator.geolocation) {
    if (statusMsg) statusMsg.textContent = "❌ Tarayıcınız GPS desteği vermiyor.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      APP_STATE.userLocation = { lat, lng };

      if (typeof TURKEY_LOCATIONS !== 'undefined') {
        let minDist = Infinity;
        let matchCity = "Yalova";
        let matchDistrict = "Çınarcık";

        TURKEY_LOCATIONS.forEach(p => {
          const dC = calculateGreatCircleDistance(lat, lng, p.lat, p.lng);
          if (dC < minDist) {
            minDist = dC; matchCity = p.il; matchDistrict = "Merkez";
          }
          if (p.ilceler) {
            p.ilceler.forEach(d => {
              const dD = calculateGreatCircleDistance(lat, lng, d.lat, d.lng);
              if (dD < minDist) {
                minDist = dD; matchCity = p.il; matchDistrict = d.name;
              }
            });
          }
        });

        APP_STATE.currentCity = matchCity;
        APP_STATE.currentDistrict = matchDistrict;

        const cSelect = document.getElementById('city-select');
        if (cSelect) cSelect.value = matchCity;
        populateDistrictOptions(matchCity);

        const dSelect = document.getElementById('district-select');
        if (dSelect) dSelect.value = matchDistrict;
      }

      updateLocationHeaderLabel();
      fetchPrayerTimes(lat, lng);
      if (APP_STATE.currentPage === 'qibla') initQiblaCompass();

      if (statusMsg) {
        statusMsg.textContent = `✅ GPS Konumu Alındı: ${APP_STATE.currentCity}, ${APP_STATE.currentDistrict}`;
        statusMsg.style.color = "#4cd964";
      }
      saveSettings();
    },
    (err) => {
      console.warn('GPS location permission denied:', err);
      if (statusMsg) {
        statusMsg.textContent = "⚠️ GPS izni alınamadı. Şehir listenizden manuel seçebilirsiniz.";
      }
    },
    { enableHighAccuracy: true, timeout: 12000 }
  );
}

// --- NOTIFICATION LOGIC ---
let notifiedPrayers = JSON.parse(localStorage.getItem('namaz_vakti_notified') || '{}');
let activeAudioObj = null;

function checkPrayerNotification(nextPrayer, nextTimeDate, diffMs) {
  if (!APP_STATE.notifyEnabled) return;

  const targetMs = APP_STATE.notifyOffset * 60 * 1000;
  const dateStr = nextTimeDate.toISOString().split('T')[0];
  const prayerKey = `${dateStr}_${nextPrayer.id}_${APP_STATE.notifyOffset}`;

  // 1.5 seconds window to trigger (to catch it reliably during the 1-second interval)
  if (diffMs <= targetMs && diffMs > targetMs - 1500 && !notifiedPrayers[prayerKey]) {
    notifiedPrayers[prayerKey] = true;
    localStorage.setItem('namaz_vakti_notified', JSON.stringify(notifiedPrayers));
    triggerNotification(nextPrayer, APP_STATE.notifyOffset);
  }
}

function triggerNotification(prayer, offset) {
  const title = "Huzur Vakti Namaz Hatırlatıcısı";
  const msg = offset === 0 
    ? `${prayer.name} vakti girdi!`
    : `${prayer.name} vaktine ${offset} dakika kaldı.`;

  // 1. Browser API Notification
  if (Notification.permission === 'granted') {
    try {
      new Notification(title, { body: msg, icon: 'icon.png' });
    } catch (e) { console.warn("Notification error:", e); }
  }

  // 2. Play Sound
  if (APP_STATE.notifySound === 'beep') {
    playNotifyAudio(['https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3']);
  } else if (APP_STATE.notifySound === 'ezan') {
    // Vakit bazlı "Ezan sesi açık" tercihine saygı duy
    if (getPrayerAdhan(prayer.id)) playAdhan();
  }
}

// Gerçek ezan sesi (birkaç kaynak; biri çalmazsa diğerine geçer)
const ADHAN_URLS = [
  'https://www.islamcan.com/audio/adhan/azan1.mp3',
  'https://www.islamcan.com/audio/adhan/azan2.mp3',
  'https://download.tvquran.com/download/mp3quran/adhan/mishary_rashid.mp3',
  'https://server8.mp3quran.net/afs/001.mp3'
];
function playNotifyAudio(urls, i) {
  i = i || 0;
  if (i >= urls.length) return;
  if (activeAudioObj) { try { activeAudioObj.pause(); activeAudioObj.currentTime = 0; } catch (e) {} }
  activeAudioObj = new Audio(urls[i]);
  activeAudioObj.onerror = () => playNotifyAudio(urls, i + 1);
  activeAudioObj.play().catch(err => {
    console.warn('Audio play blocked/failed, trying next:', err);
    playNotifyAudio(urls, i + 1);
  });
}
function playAdhan() { playNotifyAudio(ADHAN_URLS, 0); }
window.playAdhan = playAdhan;

// Ayarlardaki "Ezanı Test Et" butonu
function testAdhanSound() {
  const btn = document.getElementById('test-adhan-btn');
  if (btn) { btn.textContent = '🔊 Ezan çalıyor... (durdurmak için tekrar dokun)'; }
  if (activeAudioObj && !activeAudioObj.paused) {
    try { activeAudioObj.pause(); activeAudioObj.currentTime = 0; } catch (e) {}
    if (btn) btn.textContent = '🔊 Ezanı Test Et';
    return;
  }
  playAdhan();
  if (activeAudioObj) {
    activeAudioObj.onended = () => { if (btn) btn.textContent = '🔊 Ezanı Test Et'; };
  }
}
window.testAdhanSound = testAdhanSound;

// Notification Flow
window.acceptNotificationPermissionFlow = function() {
  const notifyModal = document.getElementById('notify-permission-modal');
  if (notifyModal) notifyModal.style.display = 'none';
  
  APP_STATE.notifyEnabled = true;
  saveSettings();
  applyStateSettings();
  
  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['push-permission-request']) {
    window.webkit.messageHandlers['push-permission-request'].postMessage('');
  } else if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
};

