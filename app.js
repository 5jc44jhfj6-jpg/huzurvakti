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
  notifyBoth: false,
  notifyCuma: true,
  qari: 'afs'
};

document.addEventListener('DOMContentLoaded', initApp);

// Ana sayfa dışındaki her sayfaya belli belirsiz canlı gökyüzü katmanı ekler
function injectPageSky() {
  try {
    const html = '<div class="page-sky-inner">' +
      '<span class="rays"></span><span class="aurora a1"></span><span class="aurora a2"></span>' +
      '<span class="cloud c1"></span><span class="cloud c2"></span><span class="cloud c3"></span>' +
      '<span class="gust g1"></span><span class="gust g2"></span><span class="gust g3"></span>' +
      '<span class="mote m1"></span><span class="mote m2"></span><span class="mote m3"></span>' +
      '<span class="mote m4"></span><span class="mote m5"></span><span class="mote m6"></span>' +
      '<span class="mote m7"></span><span class="mote m8"></span><span class="mote m9"></span>' +
      '<span class="mote m10"></span>' +
      '</div>';
    document.querySelectorAll('.page-section:not(#page-home) > .hero-frame-box').forEach(box => {
      if (box.querySelector(':scope > .page-sky')) return;
      const sky = document.createElement('div');
      sky.className = 'page-sky';
      sky.setAttribute('aria-hidden', 'true');
      sky.innerHTML = html;
      box.insertBefore(sky, box.firstChild);
    });
  } catch (e) { console.warn('page-sky eklenemedi:', e); }
}

function initApp() {
  loadSavedSettings();
  applyStateSettings();
  injectPageSky();
  populateLocationsDropdown();
  setupNavTabs();
  setupSettingsListeners();
  startClockTimer();
  // Günün Âyeti features.js içinden yüklenir (loadDailyAyet)
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

    // Puan isteme kartı (yalnızca mağazadan kurulu uygulamada)
    try { hvMaybeAskRating(); } catch (e) {}

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
  kurandua: 'kurandua', quran: 'kurandua', 'dua-ogrenme': 'kurandua', esma: 'kurandua', ezkar: 'kurandua', 'gunluk-dua': 'kurandua', 'onemli-sureler': 'kurandua', 'ayet-arama': 'kurandua', 'kirk-hadis': 'kurandua', qibla: 'kurandua', guide: 'kurandua', mushaf: 'kurandua', ezber: 'kurandua', dinle: 'kurandua', elifba: 'kurandua',
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
  // Mushaf ve ezber seslerini de durdur (features.js)
  try { if (typeof hvMvDurdur === 'function') hvMvDurdur(); } catch (e) {}
  try { if (typeof hvEzSesDurdur === 'function') hvEzSesDurdur(); } catch (e) {}
  // Kıble sayfasından çıkılıyorsa pusula sensörünü bırak
  try {
    if (APP_STATE.currentPage === 'qibla' && pageId !== 'qibla' && typeof hvPusulaDurdur === 'function') hvPusulaDurdur();
  } catch (e) {}

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
    notifyBoth: APP_STATE.notifyBoth,
    notifyCuma: APP_STATE.notifyCuma,
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

  const notifyBoth = document.getElementById('notify-both');
  if (notifyBoth) notifyBoth.checked = !!APP_STATE.notifyBoth;

  const notifyCuma = document.getElementById('notify-cuma');
  if (notifyCuma) notifyCuma.checked = APP_STATE.notifyCuma !== false;

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

  // Arka plan bildirimi durum satırı
  try { updateNotifyStatusUI(); } catch (e) {}

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
/* Kaynak farkındalıklı düzeltme:
   Diyanet'in kendi tablosundan gelen vakitler (s === 'd') zaten kesindir;
   onlara varsayılan +1 dk düzeltmesi UYGULANMAZ, yalnızca kullanıcının
   Ayarlar > Vakit İnce Ayarı değerleri uygulanır. */
const HV_SIFIR_OFSET = { Fajr: 0, Sunrise: 0, Dhuhr: 0, Asr: 0, Maghrib: 0, Isha: 0 };
function hvKaynakOfset(kaynak) {
  if (kaynak === 'd') return Object.assign({}, HV_SIFIR_OFSET, APP_STATE.timeOffsets || {});
  return getTimeOffsets();
}
function applyOffsets(raw, kaynak) {
  const off = hvKaynakOfset(kaynak);
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
  APP_STATE.rawKaynak = entry.s || '';
  const t = applyOffsets(entry.t, entry.s);
  APP_STATE.prayerTimes = t;
  if (entry.h) { APP_STATE.hijriDateText = entry.h; updateHijriDateDisplay(entry.h); }
  renderPrayerCards(t);
  updatePrayerCountdown();
}
// Ayarlardan offset değişince mevcut ham vakitlere yeniden uygula
function reapplyTimeOffsets() {
  if (!APP_STATE.rawTimes) return;
  const t = applyOffsets(APP_STATE.rawTimes, APP_STATE.rawKaynak);
  APP_STATE.prayerTimes = t;
  renderPrayerCards(t);
  updatePrayerCountdown();
  // vakit ince ayarı değişti → bildirimleri de yeniden kur
  try { scheduleNativePrayerNotifications(); } catch (e) {}
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

/* ────────────────────────────────────────────────────────────
   NATIVE YEREL BİLDİRİM (iOS kabuğu köprüsü)
   Uygulama KAPALIYKEN bile bildirim gelmesi için, önümüzdeki
   günlerin vakitleri telefonun kendi bildirim sistemine önceden
   yazılır. Native taraf (ViewController.swift) şu köprüleri sunar:
     schedule-local-notification  { id, title, body, timestamp(sn) }
     clear-local-notifications
   Tarayıcıda bu köprü yoktur; o durumda sessizce devre dışı kalır.
   ──────────────────────────────────────────────────────────── */
const HV_NOTIFY_DAYS = 12;   // kaç gün ileriye kurulacak
const HV_NOTIFY_MAX = 60;    // iOS sınırı 64; güvenli marj
const HV_NOTIFY_PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function hvNativeHandler(name) {
  try {
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[name]) {
      return window.webkit.messageHandlers[name];
    }
  } catch (e) {}
  return null;
}
function hvHasNativeNotifications() { return !!hvNativeHandler('schedule-local-notification'); }
window.hvHasNativeNotifications = hvHasNativeNotifications;

function hvClearNativeNotifications() {
  const h = hvNativeHandler('clear-local-notifications');
  if (h) { try { h.postMessage(''); return true; } catch (e) {} }
  return false;
}

function hvPad2(n) { return String(n).padStart(2, '0'); }

// Önümüzdeki günlerin vakitlerini telefona bildirim olarak kurar
function scheduleNativePrayerNotifications() {
  if (!hvHasNativeNotifications()) { updateNotifyStatusUI(0); return 0; }

  hvClearNativeNotifications();

  if (!APP_STATE.notifyEnabled) { updateNotifyStatusUI(0); return 0; }

  const sched = hvNativeHandler('schedule-local-notification');
  if (!sched) { updateNotifyStatusUI(0); return 0; }

  const early = parseInt(APP_STATE.notifyOffset, 10) || 0;   // kaç dk kala
  const both = !!APP_STATE.notifyBoth;                        // hem önceden hem vaktinde
  const daysCovered = new Set();
  const lat = APP_STATE.userLocation.lat;
  const lng = APP_STATE.userLocation.lng;
  const now = Date.now();
  let count = 0;

  for (let d = 0; d < HV_NOTIFY_DAYS && count < HV_NOTIFY_MAX; d++) {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() + d);

    const entry = getCachedDay(lat, lng, day);
    if (!entry || !entry.t) continue;
    const timeOffs = hvKaynakOfset(entry.s);
    const ramazan = /ramazan|ramadan/i.test(entry.h || '');

    for (const id of HV_NOTIFY_PRAYERS) {
      if (count >= HV_NOTIFY_MAX) break;
      const rawTime = entry.t[id];
      if (!rawTime) continue;

      // kullanıcının vakit ince ayarını uygula → vaktin kendisi
      const adjusted = addMinutes(rawTime, parseInt(timeOffs[id], 10) || 0);
      const parts = adjusted.split(':');
      const exactAt = new Date(day);
      exactAt.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);

      let label = (typeof PRAYER_NAMES !== 'undefined' && PRAYER_NAMES[id]) ? PRAYER_NAMES[id].name : id;
      if (ramazan && id === 'Maghrib') label = 'İftar';
      if (ramazan && id === 'Fajr') label = 'İmsak';

      // Bildirim sesi: Ayarlar → Bildirim Sesi + vakit bazlı ezan tercihi
      // "ezan" → uygulamadaki ezan sesi, "default" → telefon sesi, "none" → sessiz
      let sound = 'default';
      if (APP_STATE.notifySound === 'silent') sound = 'none';
      else if (APP_STATE.notifySound === 'ezan' && getPrayerAdhan(id)) sound = 'ezan';

      const dayKey = `${day.getFullYear()}${hvPad2(day.getMonth() + 1)}${hvPad2(day.getDate())}`;

      // Kurulacak bildirimler:
      //  • "Hem önceden hem vaktinde" açıksa → önce hatırlatma (sessiz-ötesi kısa), sonra ezan
      //  • kapalıysa → tek bildirim (seçilen zamanda)
      const jobs = [];
      if (both && early > 0) {
        jobs.push({
          sfx: '_pre',
          at: new Date(exactAt.getTime() - early * 60000),
          body: `${label} vaktine ${early} dakika kaldı.`,
          sound: sound === 'none' ? 'none' : 'default'
        });
        jobs.push({ sfx: '', at: exactAt, body: `${label} vakti girdi.`, sound: sound });
      } else {
        jobs.push({
          sfx: '',
          at: new Date(exactAt.getTime() - early * 60000),
          body: early === 0 ? `${label} vakti girdi.` : `${label} vaktine ${early} dakika kaldı.`,
          sound: sound
        });
      }

      for (const job of jobs) {
        if (count >= HV_NOTIFY_MAX) break;
        if (job.at.getTime() <= now + 20000) continue; // geçmiş ya da çok yakın
        try {
          sched.postMessage({
            id: `hv_${dayKey}_${id}${job.sfx}`,
            title: 'Namaz Dostu',
            body: job.body,
            timestamp: Math.floor(job.at.getTime() / 1000),
            sound: job.sound
          });
          count++;
          daysCovered.add(dayKey);
        } catch (e) { console.warn('Bildirim kurulamadı:', e); }
      }
    }
  }

  // ── Cuma hatırlatması (sabah 09:00) ──
  if (APP_STATE.notifyCuma !== false) {
    for (let d = 0; d < HV_NOTIFY_DAYS && count < HV_NOTIFY_MAX + 12; d++) {
      const day = new Date();
      day.setHours(0, 0, 0, 0);
      day.setDate(day.getDate() + d);
      if (day.getDay() !== 5) continue; // 5 = Cuma
      const at = new Date(day);
      at.setHours(9, 0, 0, 0);
      if (at.getTime() <= now + 20000) continue;
      const dayKey = `${day.getFullYear()}${hvPad2(day.getMonth() + 1)}${hvPad2(day.getDate())}`;
      try {
        sched.postMessage({
          id: `hv_cuma_${dayKey}`,
          title: 'Hayırlı Cumalar 🕌',
          body: 'Bugün Cuma. Kehf suresini okumayı ve Peygamber Efendimize salavat getirmeyi unutma.',
          timestamp: Math.floor(at.getTime() / 1000),
          sound: 'default'
        });
        count++;
      } catch (e) {}
    }
  }

  try { localStorage.setItem('hv_notif_count', String(count)); } catch (e) {}
  updateNotifyStatusUI(count, daysCovered.size);
  return count;
}
window.scheduleNativePrayerNotifications = scheduleNativePrayerNotifications;

// Ayarlar ekranındaki durum satırı
function updateNotifyStatusUI(count, daysCovered) {
  const el = document.getElementById('notify-native-status');
  if (!el) return;
  if (!hvHasNativeNotifications()) {
    el.className = 'notify-status warn';
    el.textContent = '⚠️ Bu ortamda (tarayıcı) uygulama kapalıyken bildirim gelmez. App Store\'dan kurulu uygulamada arka plan bildirimi çalışır.';
    return;
  }
  if (!APP_STATE.notifyEnabled) {
    el.className = 'notify-status';
    el.textContent = 'Bildirimler kapalı. Açarsan vakitler telefonuna önceden kurulur ve uygulama kapalıyken de bildirim gelir.';
    return;
  }
  const n = (typeof count === 'number') ? count : parseInt(localStorage.getItem('hv_notif_count') || '0', 10);
  const gun = (typeof daysCovered === 'number' && daysCovered > 0) ? daysCovered : HV_NOTIFY_DAYS;
  el.className = 'notify-status ok';
  el.textContent = n > 0
    ? `✅ Arka plan bildirimi aktif — ${n} hatırlatma kuruldu (yaklaşık ${gun} gün). Uygulama kapalıyken de gelir.`
    : 'Vakitler yüklenince bildirimler otomatik kurulacak.';
}
window.updateNotifyStatusUI = updateNotifyStatusUI;

// Ayarlar → Geri Bildirim Gönder (doğrudan e-posta açar)
function hvSendFeedback() {
  const ver = 'v63.7';
  let ortam = 'Tarayıcı';
  try {
    if (window.hvIsAndroid) ortam = 'Android uygulaması';
    else if (hvHasNativeNotifications()) ortam = 'iPhone uygulaması';
  } catch (e) {}
  const konu = encodeURIComponent('Namaz Dostu — Geri Bildirim');
  const govde = encodeURIComponent(
    'Merhaba,\n\nGörüşüm / önerim / karşılaştığım sorun:\n\n\n\n' +
    '-----------------------------\n' +
    'Sürüm: ' + ver + '\n' +
    'Ortam: ' + ortam + '\n'
  );
  try {
    window.location.href = 'mailto:yaldizzfahrettin@gmail.com?subject=' + konu + '&body=' + govde;
  } catch (e) {
    if (typeof hvShareText === 'function') hvShareText('Namaz Dostu geri bildirim: ');
  }
}
window.hvSendFeedback = hvSendFeedback;

/* ────────────────────────────────────────────────────────────
   PUAN / YORUM İSTEME KARTI
   Yalnızca App Store veya Play'den kurulmuş uygulamada görünür.
   Tarayıcı / ana ekran kısayolu kullanıcılarına hiç çıkmaz.
   5., 20. ve 60. açılışta bir kez sorar; "Puan ver" ya da
   "Bir daha sorma" denince bir daha çıkmaz.
   ──────────────────────────────────────────────────────────── */
const HV_RATE_AT = [4, 12, 30, 70];

// Uygulama mağazadan kurulmuş mu? 'ios' | 'android' | null
function hvNativePlatform() {
  try { if (window.hvIsAndroid) return 'android'; } catch (e) {}
  try { if (hvHasNativeNotifications()) return 'ios'; } catch (e) {}
  return null;
}

function hvStoreUrl(platform) {
  if (platform === 'ios') return 'itms-apps://itunes.apple.com/app/id6800597930?action=write-review';
  if (platform === 'android') return 'market://details?id=com.namazdostu.app';
  return 'https://huzurvaktinamazuygulamasi.vercel.app';
}

function hvMaybeAskRating() {
  const platform = hvNativePlatform();
  if (!platform) return;
  let count = 0;
  try {
    if (localStorage.getItem('hv_rated') === '1') return;
    count = (parseInt(localStorage.getItem('hv_open_count') || '0', 10) || 0) + 1;
    localStorage.setItem('hv_open_count', String(count));
  } catch (e) { return; }
  if (HV_RATE_AT.indexOf(count) === -1) return;
  setTimeout(() => { try { hvShowRatingCard(); } catch (e) {} }, 5000);
}

function hvShowRatingCard() {
  if (document.getElementById('hv-rate-modal')) return;
  const wrap = document.createElement('div');
  wrap.id = 'hv-rate-modal';
  wrap.className = 'hv-rate-backdrop';
  wrap.innerHTML =
    '<div class="hv-rate-card">' +
      '<div class="hv-rate-stars">⭐️⭐️⭐️⭐️⭐️</div>' +
      '<div class="hv-rate-title">Namaz Dostu\'nu beğendiniz mi?</div>' +
      '<div class="hv-rate-text">Vereceğiniz puan, uygulamanın daha çok kişiye ulaşmasına yardımcı olur. Sadece 10 saniyenizi alır.</div>' +
      '<button class="hv-rate-btn hv-rate-primary" onclick="hvGoRate()">Puan ver</button>' +
      '<button class="hv-rate-btn hv-rate-ghost" onclick="hvCloseRate(false)">Şimdi değil</button>' +
      '<button class="hv-rate-link" onclick="hvCloseRate(true)">Bir daha sorma</button>' +
    '</div>';
  document.body.appendChild(wrap);
  requestAnimationFrame(() => wrap.classList.add('open'));
}

function hvGoRate() {
  const platform = hvNativePlatform();
  try { localStorage.setItem('hv_rated', '1'); } catch (e) {}
  hvCloseRate(false);
  setTimeout(() => {
    try { window.location.href = hvStoreUrl(platform); } catch (e) {}
  }, 250);
}

function hvCloseRate(never) {
  if (never) { try { localStorage.setItem('hv_rated', '1'); } catch (e) {} }
  const m = document.getElementById('hv-rate-modal');
  if (!m) return;
  m.classList.remove('open');
  setTimeout(() => { if (m && m.parentNode) m.parentNode.removeChild(m); }, 260);
}

// Ayarlar → "Uygulamayı Puanla" (her zaman çalışır, mağaza yorum sayfasını açar)
function hvRateNow() {
  const platform = hvNativePlatform();
  try { localStorage.setItem('hv_rated', '1'); } catch (e) {}
  let url;
  if (platform === 'android') {
    url = 'market://details?id=com.namazdostu.app';
  } else if (platform === 'ios') {
    url = 'itms-apps://itunes.apple.com/app/id6800597930?action=write-review';
  } else {
    url = 'https://apps.apple.com/tr/app/id6800597930?action=write-review';
  }
  try { window.location.href = url; } catch (e) {}
}
window.hvRateNow = hvRateNow;

window.hvShowRatingCard = hvShowRatingCard;
window.hvGoRate = hvGoRate;
window.hvCloseRate = hvCloseRate;

/* ────────────────────────────────────────────────────────────
   DİYANET VAKİTLERİ (birebir resmî tablo)
   Diyanet'in yayımladığı gerçek namaz vakti tabloları çekilir ve
   mevcut aylık önbelleğe (hv_cal_*) 's:"d"' işaretiyle yazılır.
   Böylece vakitler hesaplanmaz, doğrudan Diyanet'ten gelir.
   Servis ~32 günlük veri döndürür; elde 10 günden az kalınca
   arka planda sessizce tazelenir. Erişilemezse Aladhan'a düşülür.
   ──────────────────────────────────────────────────────────── */
const HV_DIYANET_KOK = 'https://ezanvakti.emushaf.net';
const HV_DIYANET_ESIK = 10;   // elde bu kadar günden az kalınca tazele

// Seçili il/ilçenin Diyanet ilçe kimliği (yoksa null)
function hvDiyanetId() {
  try {
    if (typeof TURKEY_LOCATIONS === 'undefined') return null;
    const prov = TURKEY_LOCATIONS.find(p => p.il === APP_STATE.currentCity);
    if (!prov || !prov.ilceler) return null;
    const dist = prov.ilceler.find(d => d.name === APP_STATE.currentDistrict) || prov.ilceler[0];
    if (!dist || !dist.d) return null;
    // Konum gerçekten bu ilçeye yakın mı? (yurt dışı/GPS kayması koruması)
    const u = APP_STATE.userLocation;
    if (u && typeof calculateGreatCircleDistance === 'function') {
      const uzak = calculateGreatCircleDistance(u.lat, u.lng, dist.lat, dist.lng);
      if (isFinite(uzak) && uzak > 60) return null;
    }
    return dist.d;
  } catch (e) { return null; }
}

// "04.09.2026" → "2026-09-04"
function hvDiyanetTarih(t) {
  const p = String(t || '').split('.');
  if (p.length !== 3) return '';
  return p[2] + '-' + p[1] + '-' + p[0];
}

// Elde bugünden itibaren kaç günlük Diyanet verisi var?
function hvDiyanetKapsam(lat, lng) {
  let n = 0;
  const g = new Date(); g.setHours(0, 0, 0, 0);
  for (let i = 0; i < 40; i++) {
    const e = getCachedDay(lat, lng, g);
    if (!e || !e.t || e.s !== 'd') break;
    n++;
    g.setDate(g.getDate() + 1);
  }
  return n;
}

// Diyanet satırlarını mevcut aylık önbellek biçimine yazar
function hvDiyanetSakla(lat, lng, satirlar) {
  const aylar = {};
  satirlar.forEach(r => {
    const tarih = hvDiyanetTarih(r.MiladiTarihKisa);
    if (!tarih || !r.Imsak) return;
    const ay = tarih.slice(0, 7);
    (aylar[ay] = aylar[ay] || []).push({
      date: tarih,
      t: {
        Fajr: r.Imsak, Sunrise: r.Gunes, Dhuhr: r.Ogle,
        Asr: r.Ikindi, Maghrib: r.Aksam, Isha: r.Yatsi, Imsak: r.Imsak
      },
      h: r.HicriTarihUzun || '',
      s: 'd'
    });
  });
  let yazilan = 0;
  Object.keys(aylar).forEach(ay => {
    const yil = parseInt(ay.slice(0, 4), 10);
    const no = parseInt(ay.slice(5, 7), 10);
    const anahtar = calCacheKey(lat, lng, yil, no);
    let mevcut = [];
    try { mevcut = JSON.parse(localStorage.getItem(anahtar) || '[]') || []; } catch (e) { mevcut = []; }
    const harita = {};
    mevcut.forEach(x => { if (x && x.date) harita[x.date] = x; });
    aylar[ay].forEach(x => { harita[x.date] = x; });   // Diyanet verisi üste yazar
    const birlesik = Object.keys(harita).sort().map(k => harita[k]);
    try { localStorage.setItem(anahtar, JSON.stringify(birlesik)); yazilan += aylar[ay].length; } catch (e) {}
  });
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('hv_cal_')).sort();
    while (keys.length > 3) localStorage.removeItem(keys.shift());
  } catch (e) {}
  return yazilan;
}

// Diyanet servisinden vakitleri çeker (başarılıysa true)
async function hvDiyanetCek(ilceId, lat, lng) {
  const ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  const zaman = ctrl ? setTimeout(() => ctrl.abort(), 12000) : null;
  try {
    const res = await fetch(HV_DIYANET_KOK + '/vakitler/' + ilceId, ctrl ? { signal: ctrl.signal } : undefined);
    if (!res.ok) return false;
    const veri = await res.json();
    if (!Array.isArray(veri) || !veri.length) return false;
    return hvDiyanetSakla(lat, lng, veri) > 0;
  } catch (e) {
    return false;
  } finally {
    if (zaman) clearTimeout(zaman);
  }
}

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

  // 1.5) Türkiye içi → Diyanet'in resmî tablosu (birebir aynı vakitler)
  const dId = hvDiyanetId();
  if (dId) {
    const kapsam = hvDiyanetKapsam(lat, lng);
    if (kapsam > HV_DIYANET_ESIK) {
      // Elde yeterli Diyanet verisi var → ağa hiç çıkma
      try { scheduleNativePrayerNotifications(); } catch (e) {}
      return;
    }
    const oldu = await hvDiyanetCek(dId, lat, lng);
    if (oldu) {
      setOfflineBadge(false);
      const taze = getCachedDay(lat, lng, today);
      if (taze) applyDayTimings(taze);
      try { scheduleNativePrayerNotifications(); } catch (e) { console.warn('Bildirim kurulum hatası:', e); }
      return;
    }
    if (kapsam > 0) {
      // Servise ulaşılamadı ama elde Diyanet verisi var → onu kullan
      setOfflineBadge(typeof navigator !== 'undefined' && navigator.onLine === false);
      try { scheduleNativePrayerNotifications(); } catch (e) {}
      return;
    }
    console.info('Diyanet vakitleri alınamadı → Aladhan yedeğine geçiliyor.');
  }

  // 2) Ağdan aylık takvimi al, önbelleği tazele
  try {
    const ok = await fetchMonthCalendar(lat, lng, today.getFullYear(), today.getMonth() + 1);
    if (ok) {
      setOfflineBadge(false);
      const fresh = getCachedDay(lat, lng, today);
      if (fresh) applyDayTimings(fresh);
      // Ay sonuna yaklaştıysa sonraki ayı da önceden indir
      // (bildirimler 12 gün ileriye kurulduğu için erken indiriyoruz)
      if (today.getDate() >= 18) {
        const nx = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        try { await fetchMonthCalendar(lat, lng, nx.getFullYear(), nx.getMonth() + 1); } catch (e) {}
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

  // 3) Vakitler hazır → telefona arka plan bildirimlerini kur
  try { scheduleNativePrayerNotifications(); } catch (e) { console.warn('Bildirim kurulum hatası:', e); }
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
  setTimeout(scheduleNativePrayerNotifications, 300);
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

/* Gökyüzü cismi: gündüz güneş, gece ay.
   Konum gerçek doğuş/batış saatlerine göre yay çizer:
   doğuşta ufukta doğar, öğlen tepeye çıkar, batışta ufka iner. */
function updateSkyBody() {
  const stage = document.querySelector('.cd-stage');
  if (!stage || !APP_STATE.prayerTimes) return;

  const toMin = (s) => {
    const p = String(s || '').split(':');
    return (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0);
  };
  const t = APP_STATE.prayerTimes;
  const sunrise = toMin(t.Sunrise);
  const sunset = toMin(t.Maghrib);
  if (!sunrise || !sunset) return;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;

  let isDay, prog;
  if (sunset > sunrise && nowMin >= sunrise && nowMin < sunset) {
    isDay = true;
    prog = (nowMin - sunrise) / (sunset - sunrise);
  } else {
    isDay = false;
    const nightLen = (1440 - sunset) + sunrise;
    const elapsed = nowMin >= sunset ? (nowMin - sunset) : (1440 - sunset + nowMin);
    prog = nightLen > 0 ? elapsed / nightLen : 0;
  }
  prog = Math.max(0, Math.min(1, prog));

  const x = 8 + prog * 84;                              // soldan sağa
  const y = 92 - Math.sin(prog * Math.PI) * 80;         // ufuktan tepeye, sonra ufka

  stage.style.setProperty('--sky-x', x.toFixed(2) + '%');
  stage.style.setProperty('--sky-y', y.toFixed(2) + '%');
  const mode = isDay ? 'day' : 'night';
  if (stage.dataset.sky !== mode) stage.dataset.sky = mode;
}
window.updateSkyBody = updateSkyBody;

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

  // Gökyüzündeki güneş/ay konumu (gerçek doğuş-batış saatine göre)
  updateSkyBody();

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

/* Yalnızca iOS'ta DeviceOrientationEvent.requestPermission vardır ve
   her uygulama açılışında BİR KULLANICI DOKUNUŞU ister. Android ve
   masaüstünde hiç izin gerekmez → onay ekranı gösterilmemeli. */
function hvPusulaIzinGerekli() {
  return typeof DeviceOrientationEvent !== 'undefined' &&
         typeof DeviceOrientationEvent.requestPermission === 'function';
}
let hvPusulaBuOturumdaVerildi = false;

/* Kadran çizgileri: her 5° küçük, her 10° orta, her 30° rakamlı.
   Kadranın içine bir kez çizilir, kadranla birlikte döner. */
function hvKadranCiz() {
  const dial = document.getElementById('compass-dial');
  if (!dial || dial.dataset.cizildi === '1') return;
  let html = '<div class="cp-ticks">';
  for (let a = 0; a < 360; a += 5) {
    const buyuk = (a % 30 === 0);
    const orta = (!buyuk && a % 10 === 0);
    const sinif = buyuk ? 'cp-tick buyuk' : (orta ? 'cp-tick orta' : 'cp-tick');
    html += '<i class="' + sinif + '" style="transform:rotate(' + a + 'deg)"></i>';
  }
  for (let a = 0; a < 360; a += 30) {
    if (a % 90 === 0) continue;            // K/D/G/B harfleri zaten var
    html += '<span class="cp-num" style="transform:rotate(' + a + 'deg)">' +
            '<b style="transform:rotate(' + (-a) + 'deg)">' + a + '</b></span>';
  }
  html += '</div>';
  dial.insertAdjacentHTML('afterbegin', html);
  dial.dataset.cizildi = '1';
}

function initQiblaCompass() {
  hvKadranCiz();
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

  // Başlat düğmesini JS ile de bağla (satır içi onclick tek başına yeterli olmayabilir)
  const baslatBtn = document.getElementById('enable-compass-btn');
  if (baslatBtn && !baslatBtn.dataset.hvBagli) {
    baslatBtn.dataset.hvBagli = '1';
    baslatBtn.addEventListener('click', requestQiblaPermissionFlow);
  }

  // Kayıtlı ince ayarı ekrana yansıt
  const ofs = hvKibleOfset();
  const ofsSl = document.getElementById('kible-ofset-slider');
  const ofsEt = document.getElementById('kible-ofset-val');
  if (ofsSl) ofsSl.value = ofs;
  if (ofsEt) ofsEt.textContent = (ofs > 0 ? '+' : '') + ofs.toFixed(0) + '°';

  const modal = document.getElementById('qibla-permission-modal');
  if (modal) modal.style.display = 'none';

  if (!hvPusulaIzinGerekli()) {
    // Android / masaüstü → izin yok, doğrudan başlat
    startCompassSensors(true);
  } else if (hvPusulaBuOturumdaVerildi) {
    // iOS, bu açılışta izin zaten alındı
    startCompassSensors(true);
  } else {
    // iOS, izin bir dokunuş gerektiriyor → engelleyici modal yerine
    // sayfadaki düğmeyi öne çıkar
    const btn = document.getElementById('enable-compass-btn');
    const st = document.getElementById('compass-status-msg');
    if (btn) { btn.innerHTML = '⚡ PUSULAYI BAŞLAT'; btn.classList.add('vurgu'); }
    if (st) st.innerHTML = localStorage.getItem('qibla_permission_granted')
      ? '👆 <b>Pusulayı başlatmak için yukarıdaki düğmeye dokunun.</b> iPhone, her uygulama açılışında tek bir dokunuş ister.'
      : '👆 <b>Pusulayı başlatmak için yukarıdaki düğmeye dokunun.</b> Yön sensörüne erişim izni istenecek.';
  }

  // Elde bir yön varsa onu koru — her girişte 0'a sıçratma (ibre "çift" görünüyordu)
  updateQiblaUI(smoothHeading === null ? 0 : smoothHeading);
}

/* Kıble sayfasından çıkınca sensörü bırak (pil + çakışma) */
function hvPusulaDurdur() {
  try { window.removeEventListener('deviceorientation', handleOrientationEvent, true); } catch (e) {}
  try { window.removeEventListener('deviceorientationabsolute', handleOrientationEvent, true); } catch (e) {}
}
window.hvPusulaDurdur = hvPusulaDurdur;

/* Düğmeye dokunuş = kullanıcı hareketi → iOS izni tam burada istenebilir.
   Eskiden burada sadece bir onay penceresi açılıyordu; o pencere fazladan
   bir adımdı ve Android'de hiç gerekmiyordu. */
function requestQiblaPermissionFlow(event) {
  if (event) event.preventDefault();
  try { localStorage.setItem('qibla_permission_granted', 'true'); } catch (e) {}
  const modal = document.getElementById('qibla-permission-modal');
  if (modal) modal.style.display = 'none';
  startCompassSensors(false);
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

  // Bu fonksiyon kullanıcının dokunuşuyla çalışır → iOS izni burada istenebilir
  startCompassSensors(false);
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

/* (Bu iki fonksiyonun eski kopyası kaldırıldı — güncel tanımları yukarıda.
   Aynı isim iki kez tanımlanınca sonraki öncekini eziyordu ve pusula her
   girişte eski onay penceresini açıyordu.) */



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
    if (isAutoStart && hvPusulaBuOturumdaVerildi) {
      hvPusulaDurdur();
      window.addEventListener('deviceorientation', handleOrientationEvent, true);
      if (btn) { btn.innerHTML = "✅ SENSÖR AKTİF (TELEFONU ÇEVİRİN)"; btn.classList.remove('vurgu'); }
      if (status) status.innerHTML = "✅ <b>Pusula sensörü aktif!</b> Telefonunuzu düz tutarak çevirin.";
    } else if (isAutoStart) {
      if (btn) { btn.innerHTML = "⚡ PUSULAYI BAŞLAT"; btn.classList.add('vurgu'); }
    } else {
      DeviceOrientationEvent.requestPermission()
      .then(permissionState => {
        if (permissionState === 'granted') {
          hvPusulaBuOturumdaVerildi = true;
          try { localStorage.setItem('qibla_permission_granted', 'true'); } catch (e) {}
          hvPusulaDurdur();
          window.addEventListener('deviceorientation', handleOrientationEvent, true);
          if (btn) { btn.innerHTML = "✅ SENSÖR AKTİF (TELEFONU ÇEVİRİN)"; btn.classList.remove('vurgu'); }
          if (status) status.innerHTML = "✅ <b>Pusula sensörü aktif!</b> Telefonunuzu düz tutarak çevirin.";
        } else {
          if (btn) btn.innerHTML = "⚡ PUSULAYI BAŞLAT";
          if (status) status.innerHTML = "⚠️ Yön sensörü izni verilmedi. Pusulayı kullanmak için düğmeye tekrar dokunup izin verin — ya da kıble açınızı kaydırıcıyla elle ayarlayın.";
        }
      })
      .catch(err => {
        // iOS izni yalnızca kullanıcı dokunuşu içinde ister; dokunuş dışında
        // çağrılırsa hata verir. Kayıtlı izni SİLME — sadece düğmeyi göster.
        console.info('Pusula izni dokunuş bekliyor:', err && err.message);
        if (btn) { btn.innerHTML = "⚡ PUSULAYI BAŞLAT"; btn.classList.add('vurgu'); }
        if (status) status.innerHTML = "👆 <b>Pusulayı başlatmak için düğmeye dokunun.</b>";
      });
    }
  } else {
    hvPusulaDurdur();
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

/* Ekranın döndürülmüş olması sensör açısını kaydırır; telafi edilmezse
   telefon yatayken pusula 90° şaşar. */
function hvEkranAcisi() {
  try {
    if (screen.orientation && typeof screen.orientation.angle === 'number') return screen.orientation.angle;
    if (typeof window.orientation === 'number') return window.orientation;
  } catch (e) {}
  return 0;
}

/* Kıble açısı GERÇEK kuzeye göre hesaplanır, pusula ise MANYETİK kuzeyi
   gösterir. Aradaki fark (manyetik sapma) Türkiye'de yaklaşık 5-7° doğudur
   ve enlem-boylama göre değişir. Aşağıdaki yaklaşık model Türkiye ve
   çevresi için ±1° içinde kalır; dünya geneli için makul bir tahmindir.
   iOS'ta webkitCompassHeading zaten GERÇEK kuzeye göre gelir → düzeltme
   uygulanmaz. */
function hvManyetikSapma(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return 0;
  // Türkiye ve yakın çevresi dışında bu yaklaşım geçerli değil → düzeltme yapma.
  // (Yurt dışında kullanıcı "Kıble İnce Ayarı" ile kendisi düzeltebilir.)
  if (lat < 34 || lat > 43.5 || lng < 25 || lng > 45.5) return 0;
  // İstanbul, Ankara, İzmir, Antalya, Trabzon, Erzurum, Diyarbakır ölçümlerine
  // göre uyarlandı; Türkiye genelinde sapma ~0.4° içinde kalıyor.
  const d = 6.0 + (lng - 32.0) * 0.112 + (lat - 39.0) * 0.268;
  return Math.max(-30, Math.min(30, d));
}

function handleOrientationEvent(e) {
  if (isDraggingCompass) return; // parmakla ayar yapılırken sensör devreye girmesin

  let compassHeading = null;
  let mutlak = false;

  if (e.webkitCompassHeading != null && !isNaN(e.webkitCompassHeading)) {
    // iOS: gerçek kuzeye göre, ekran yönü zaten telafi edilmiş
    compassHeading = e.webkitCompassHeading;
    mutlak = true;
  } else if (e.alpha != null && !isNaN(e.alpha)) {
    mutlak = (e.absolute === true || e.type === 'deviceorientationabsolute');
    // Android: alpha cihaz gövdesine göre; ekran döndürülmüşse telafi et
    compassHeading = (360 - e.alpha + hvEkranAcisi()) % 360;
    if (mutlak) {
      // Manyetik → gerçek kuzey düzeltmesi
      const u = APP_STATE.userLocation || {};
      compassHeading = (compassHeading + hvManyetikSapma(u.lat, u.lng) + 360) % 360;
    }
  }

  if (compassHeading == null || isNaN(compassHeading)) return;
  compassHeading = ((compassHeading % 360) + 360) % 360;

  // Göreceli sensör gerçek kuzeyi bilmez → yön anlamsız olur.
  // Bu durumda ibreyi oynatmak yerine kullanıcıyı elle ayara yönlendir.
  if (!mutlak) {
    hvPusulaGuvenilmez();
    return;
  }
  hvPusulaGuvenilir();

  if (smoothHeading === null) {
    smoothHeading = compassHeading;
  } else {
    const oncekiNorm = ((smoothHeading % 360) + 360) % 360;
    let diff = compassHeading - oncekiNorm;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    smoothHeading = oncekiNorm + diff * 0.35;   // daha yumuşak
  }
  // 0-360 dışına taşmasın (eskiden birikip 1000°+ gösteriyordu)
  smoothHeading = ((smoothHeading % 360) + 360) % 360;

  const slider = document.getElementById('manual-compass-slider');
  if (slider) slider.value = Math.round(smoothHeading);

  updateQiblaUI(smoothHeading);
}

/* Sensör güvenilmezse bir kez uyar, ibreyi rastgele oynatma */
let hvPusulaUyarildi = false;
function hvPusulaGuvenilmez() {
  if (hvPusulaUyarildi) return;
  hvPusulaUyarildi = true;
  const st = document.getElementById('compass-status-msg');
  if (st) st.innerHTML = '⚠️ <b>Telefonunuz gerçek kuzeyi ölçemiyor.</b> ' +
    'Kıble açınız yukarıda yazıyor — pusulayı parmağınızla ya da kaydırıcıyla ' +
    'o dereceye getirin. (Telefonu 8 çizer gibi birkaç kez çevirmek pusula ' +
    'sensörünü kalibre edip sorunu çözebilir.)';
  const btn = document.getElementById('enable-compass-btn');
  if (btn) btn.innerHTML = '⚠️ SENSÖR GERÇEK KUZEYİ VERMİYOR';
}
function hvPusulaGuvenilir() {
  if (!hvPusulaUyarildi) return;
  hvPusulaUyarildi = false;
  const st = document.getElementById('compass-status-msg');
  if (st) st.innerHTML = '✅ <b>Pusula sensörü aktif!</b> Telefonunuzu düz tutarak çevirin.';
  const btn = document.getElementById('enable-compass-btn');
  if (btn) btn.innerHTML = '✅ CANLI SENSÖR AKTİF';
}

/* Kıble İnce Ayarı — kullanıcı kendi telefonuna göre birkaç derece
   kaydırıp kaydedebilir; değer cihazda kalır. */
function hvKibleOfset() {
  const v = parseFloat(localStorage.getItem('hv_kible_ofset') || '0');
  return isNaN(v) ? 0 : Math.max(-30, Math.min(30, v));
}
function hvKibleOfsetAyarla(v) {
  const n = Math.max(-30, Math.min(30, parseFloat(v) || 0));
  try { localStorage.setItem('hv_kible_ofset', String(n)); } catch (e) {}
  const et = document.getElementById('kible-ofset-val');
  if (et) et.textContent = (n > 0 ? '+' : '') + n.toFixed(0) + '°';
  updateQiblaUI(smoothHeading === null ? 0 : smoothHeading);
}
function hvKibleOfsetSifirla() {
  const sl = document.getElementById('kible-ofset-slider');
  if (sl) sl.value = 0;
  hvKibleOfsetAyarla(0);
}
window.hvKibleOfsetAyarla = hvKibleOfsetAyarla;
window.hvKibleOfsetSifirla = hvKibleOfsetSifirla;

function updateQiblaUI(heading) {
  const dial = document.getElementById('compass-dial');
  const needle = document.getElementById('compass-needle');
  const headVal = document.getElementById('compass-heading-val');

  heading = ((Number(heading) % 360) + 360) % 360;
  if (headVal) headVal.textContent = `${Math.round(heading)}°`;

  // Rotate dial by -heading so North (K) points to magnetic North
  if (dial) {
    dial.style.transform = `rotate(${-heading}deg)`;
  }

  // Rotate gold needle to point relative to fixed 12 o'clock Kâbe target
  // Needle points straight UP (0°) into 🕋 Kâbe target when heading == qiblaAngle
  const hedefAci = APP_STATE.qiblaAngle + hvKibleOfset();
  const relativeNeedleAngle = hedefAci - heading;

  if (needle) {
    needle.style.transform = `translate(-50%, -50%) rotate(${relativeNeedleAngle}deg)`;
  }

  updateQiblaDirectionPill(hedefAci, heading);
}

function updateQiblaDirectionPill(qiblaAngle, heading) {
  const guidePill = document.getElementById('qibla-direction-pill');
  const statusMsg = document.getElementById('compass-status-msg');

  let diff = (qiblaAngle - heading + 360) % 360;
  if (diff > 180) diff -= 360;

  const absDiff = Math.abs(Math.round(diff));

  // Eskiden 5° ve altı doğrudan "tam kıble" sayılıyordu; bu yüzden
  // 5-4-3-2-1 dereceleri hiç görünmüyordu. Artık yalnızca 1° ve altı
  // "tam", 2-5° arası "az kaldı" olarak gösterilir.
  // İbre tam Kâbe'ye oturduğunda ışıldasın
  const needleEl = document.getElementById('compass-needle');
  if (needleEl) needleEl.classList.toggle('kible-tam', absDiff <= 1);

  if (absDiff <= 1) {
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
  } else if (absDiff <= 5) {
    // Son birkaç derece — yön okunu koru ama "çok az kaldı" hissi ver
    if (guidePill) {
      guidePill.className = 'qibla-pill yaklasti';
      guidePill.innerHTML = (diff > 0 ? '➡️' : '⬅️') + ` Çok az kaldı — ${absDiff}°`;
    }
    if (statusMsg && !isDraggingCompass) {
      statusMsg.innerHTML = `🔸 <b>Çok az kaldı!</b> ${absDiff}° daha ${diff > 0 ? 'sağa' : 'sola'} dönün.`;
      statusMsg.style.color = "";
    }
    const now = Date.now();
    if (now - lastVibrateTime > 900 && navigator.vibrate) {
      navigator.vibrate(25);
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
// Sure fazileti (eski "Önemli Sureler" içeriği artık burada gösteriliyor)
function hvSureFazileti(id) {
  try {
    if (typeof ONEMLI_SURELER === 'undefined') return '';
    const s = ONEMLI_SURELER.find(x => Number(x.id) === Number(id));
    if (!s || !s.fazilet) return '';
    return '<div class="sure-fazilet"><span class="sh-label">⭐ Fazileti</span>' + s.fazilet + '</div>';
  } catch (e) { return ''; }
}
window.hvSureFazileti = hvSureFazileti;

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
      ${hvSureFazileti(id)}
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

  // Türkçe meal uygulamanın içinden (Diyanet meal.js); Arapça + okunuş ağdan
  let yerelMeal = false;
  try { yerelMeal = await hvMealHazir(); } catch (e) {}

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,tr.transliteration${yerelMeal ? '' : ',tr.diyanet'}`);
    const json = await res.json();

    if (json && json.data && json.data.length >= 2) {
      const arAyahs = json.data[0].ayahs;
      const okAyahs = json.data[1].ayahs;
      const trAyahs = (!yerelMeal && json.data[2]) ? json.data[2].ayahs : null;

      verses = arAyahs.map((a, idx) => ({
        verse_number: a.numberInSurah,
        verse: a.text,
        okunusu: okAyahs[idx] ? okAyahs[idx].text : '',
        translation: yerelMeal ? hvMeal(id, a.numberInSurah)
                               : (trAyahs && trAyahs[idx] ? trAyahs[idx].text : '')
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
  const ar = card ? (card.querySelector('.ayah-ar-text')?.textContent || '').trim() : '';
  const text = `${hvSurahName(surah)} Suresi, ${ayah}. Ayet\n\n"${tr}"`;
  if (typeof hvOpenShareCard === 'function') {
    hvOpenShareCard({
      badge: '📖 Ayet-i Kerime',
      arabic: ar,
      text: tr,
      source: `${hvSurahName(surah)} Suresi, ${ayah}. ayet`,
      fallbackText: text
    });
  }
  else if (typeof hvShareText === 'function') hvShareText(text);
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
      } else if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }
    // Arka plan bildirimlerini yeniden kur (kapalıysa temizler)
    setTimeout(() => scheduleNativePrayerNotifications(), 400);
  });

  document.getElementById('notify-time')?.addEventListener('change', (e) => {
    APP_STATE.notifyOffset = parseInt(e.target.value);
    saveSettings();
    scheduleNativePrayerNotifications();
    showToastNotification('⏰ Bildirim zamanı güncellendi',
      APP_STATE.notifyOffset === 0 ? 'Tam vaktinde bildirim gelecek.' : `${APP_STATE.notifyOffset} dakika kala bildirim gelecek.`);
  });

  document.getElementById('notify-sound')?.addEventListener('change', (e) => {
    APP_STATE.notifySound = e.target.value;
    saveSettings();
    // Ses tercihi değişince telefondaki bildirimleri yeni sesle yeniden kur
    setTimeout(scheduleNativePrayerNotifications, 300);
  });

  document.getElementById('notify-both')?.addEventListener('change', (e) => {
    APP_STATE.notifyBoth = e.target.checked;
    saveSettings();
    setTimeout(scheduleNativePrayerNotifications, 300);
    showToastNotification(
      e.target.checked ? '🔔 Çift bildirim açık' : '🔔 Tek bildirim',
      e.target.checked ? 'Hem önceden hatırlatma hem vakit girince ezan gelecek.' : 'Sadece seçtiğin zamanda bildirim gelecek.'
    );
  });

  document.getElementById('notify-cuma')?.addEventListener('change', (e) => {
    APP_STATE.notifyCuma = e.target.checked;
    saveSettings();
    setTimeout(scheduleNativePrayerNotifications, 300);
    showToastNotification(
      e.target.checked ? '🕌 Cuma hatırlatması açık' : '🕌 Cuma hatırlatması kapalı',
      e.target.checked ? 'Cuma sabahı 09:00\'da hatırlatma gelecek.' : ''
    );
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
  const title = "Namaz Dostu — Namaz Hatırlatıcısı";
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
  } else if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
  // İzin verildikten kısa süre sonra arka plan bildirimlerini kur
  setTimeout(() => { try { scheduleNativePrayerNotifications(); } catch (e) {} }, 1200);
};

