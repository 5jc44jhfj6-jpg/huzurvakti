/* ═══════════════════════════════════════════════════════════════
   v72.8 — ÂYETE NOT ALMA + NOTLARIM
   • Okurken bir âyete dokun → açılan pencerede "📝 Bu âyete not ekle".
   • Notu olan âyetin altında küçük bir "📝 Notun" satırı görünür (dokununca açılır).
   • Kur'an sekmesi › Notlarım: bütün notlar, en yeniden eskiye.
   Notlar yalnızca bu cihazda saklanır: localStorage 'hv_ayet_not' = { "s:a": { m: metin, t: zaman } }
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const ANAH = 'hv_ayet_not';
  const e = (x) => (typeof hvEsc === 'function' ? hvEsc(x) : String(x == null ? '' : x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])));
  const sAd = (s) => { try { return (typeof hvSurahName === 'function' && hvSurahName(s)) || ('Sûre ' + s); } catch (x) { return 'Sûre ' + s; } };
  const oku = () => { try { return JSON.parse(localStorage.getItem(ANAH) || '{}') || {}; } catch (x) { return {}; } };
  const yaz = (o) => { try { localStorage.setItem(ANAH, JSON.stringify(o)); } catch (x) {} };
  const notu = (s, a) => oku()[s + ':' + a] || null;
  window.hvNotSay = () => Object.keys(oku()).length;
  const tarih = (ts) => { try { if (!ts) return ''; const d = new Date(ts), b = new Date(); const g = Math.floor((new Date(b.toDateString()) - new Date(d.toDateString())) / 864e5); return g === 0 ? 'Bugün' : g === 1 ? 'Dün' : g < 7 ? g + ' gün önce' : d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: d.getFullYear() === b.getFullYear() ? undefined : 'numeric' }); } catch (x) { return ''; } };
  const toast = (a, b) => { try { hvToast(a, b); } catch (x) {} };

  /* ── âyet penceresine not alanı ── */
  let duzenle = false, hedef = { s: 0, a: 0 };   // pencere açıldığı andaki âyet (sonradan kaydırma odak değiştirse de)
  function alanCiz() {
    const box = document.getElementById('ok-sheet-ic'); if (!box) return;
    let alan = box.querySelector('.an-alan');
    if (!alan) { const O = window.hvOK || {}; hedef = { s: O.id, a: O.odak }; alan = document.createElement('div'); alan.className = 'an-alan'; box.appendChild(alan); }
    const s = hedef.s, a = hedef.a; if (!s || !a) return;
    const n = notu(s, a);
    if (duzenle) {
      alan.innerHTML = `<div class="an-et">📝 ${n ? 'Notunu düzenle' : 'Bu âyete not'}</div>
        <textarea id="an-metin" rows="4" maxlength="2000" placeholder="Bu âyet sana ne düşündürdü? Kime söylemek istersin? Neyle ilgili?">${e(n ? n.m : '')}</textarea>
        <div class="an-dug"><button class="an-kaydet" onclick="hvNotKaydet()">Kaydet</button><button onclick="hvNotVazgec()">Vazgeç</button>${n ? '<button class="an-sil" onclick="hvNotSil()">Sil</button>' : ''}</div>`;
      setTimeout(() => { const t = document.getElementById('an-metin'); if (t) { t.focus(); t.setSelectionRange(t.value.length, t.value.length); } }, 60);
    } else if (n) {
      alan.innerHTML = `<div class="an-kutu" onclick="hvNotDuzenle()"><div class="an-et">📝 Notun <small>${tarih(n.t)}</small></div><div class="an-yazi">${e(n.m)}</div><div class="an-ipucu">Düzenlemek için dokun</div></div>`;
    } else {
      alan.innerHTML = `<button class="an-ekle" onclick="hvNotDuzenle()"><span>📝</span>Bu âyete not ekle</button>`;
    }
  }
  window.hvNotDuzenle = () => { duzenle = true; alanCiz(); };
  window.hvNotVazgec = () => { duzenle = false; alanCiz(); };
  window.hvNotKaydet = () => {
    const s = hedef.s, a = hedef.a; const t = document.getElementById('an-metin');
    if (!s || !a || !t) return;
    const m = t.value.trim(); const o = oku();
    if (m) { o[s + ':' + a] = { m, t: Date.now() }; toast('📝 Not kaydedildi', sAd(s) + ' Sûresi · ' + a + '. âyet'); }
    else { delete o[s + ':' + a]; }
    yaz(o); duzenle = false; alanCiz(); okuyucuNotlari(s);
  };
  window.hvNotSil = (s, a) => {
    s = s || hedef.s; a = a || hedef.a; if (!s || !a) return;
    const o = oku(); delete o[s + ':' + a]; yaz(o); duzenle = false;
    toast('Not silindi', sAd(s) + ' Sûresi · ' + a + '. âyet');
    alanCiz(); okuyucuNotlari(s); if (document.getElementById('notlarim-root')) liste();
  };
  // âyet penceresi her çizildiğinde (yer imi, kaldığın yer…) not alanını yeniden koy
  new MutationObserver(() => {
    const box = document.getElementById('ok-sheet-ic');
    if (box && !box.querySelector('.an-alan') && box.querySelector('.ok-sh-btn')) { duzenle = false; alanCiz(); }
  }).observe(document.documentElement, { childList: true, subtree: true });

  /* ── okurken âyetin altında not ── */
  function okuyucuNotlari(id) {
    const w = document.getElementById('ayah-list-wrap'); if (!w) return;
    w.querySelectorAll('.an-not').forEach(x => x.remove());
    const o = oku(); const on = id + ':';
    Object.keys(o).filter(k => k.indexOf(on) === 0).forEach((k) => {
      const a = Number(k.split(':')[1]);
      let el = null; for (let x = a; x >= Math.max(1, a - 6) && !el; x--) el = document.getElementById('ayah-' + x);
      if (!el) return;
      const d = document.createElement('div'); d.className = 'an-not';
      d.innerHTML = `<span>📝</span><b>${a}. âyete notun:</b> ${e(o[k].m.length > 140 ? o[k].m.slice(0, 138) + '…' : o[k].m)}`;
      d.addEventListener('click', (ev) => { ev.stopPropagation(); try { hvOkAyet(a); } catch (x) {} });
      el.after(d);
    });
  }
  (window.hvOkCizSonra = window.hvOkCizSonra || []).push((id, m) => { if (m !== 'bilgi') okuyucuNotlari(Number(id)); });

  /* ── Notlarım sayfası ── */
  function liste() {
    const kok = document.getElementById('notlarim-root'); if (!kok) return;
    const o = oku(); const L = Object.keys(o).map(k => ({ k, s: Number(k.split(':')[0]), a: Number(k.split(':')[1]), m: o[k].m, t: o[k].t })).sort((x, y) => (y.t || 0) - (x.t || 0));
    const meal = (s, a) => { try { const m = (window.DIYANET_MEAL && typeof hvMeal === 'function') ? hvMeal(s, a) : ''; return m.length > 120 ? m.slice(0, 118).replace(/\s+\S*$/, '') + '…' : m; } catch (x) { return ''; } };
    kok.innerHTML = L.length ? `<div class="yi-say">${L.length} not</div>` + L.map(x => `
      <div class="nl-kart">
        <div class="nl-bas"><b>${e(sAd(x.s))} Sûresi <em>${x.a}. âyet</em></b><small>${tarih(x.t)}</small></div>
        <div class="nl-not">${e(x.m)}</div>
        ${meal(x.s, x.a) ? `<div class="nl-meal">“${e(meal(x.s, x.a))}”</div>` : ''}
        <div class="nl-dug"><button onclick="openSurahAt(${x.s},${x.a})">📖 Âyete git</button><button class="nl-sil" onclick="hvNotSil(${x.s},${x.a})">Sil</button></div>
      </div>`).join('')
      : `<div class="yi-bos"><div class="yi-bos-ik">📝</div><b>Henüz notun yok</b><p>Okurken bir âyete dokun, <b>📝 Bu âyete not ekle</b> de. Notların burada alt alta durur.</p><button onclick="navigateTo('kurandua')">Kur'an'a git ›</button></div>`;
    if (!window.DIYANET_MEAL && L.length && typeof hvMealHazir === 'function') hvMealHazir().then((ok) => { if (ok && document.getElementById('notlarim-root')) liste(); }).catch(() => {});
  }
  window.hvNotlarimCiz = liste;
  const kaydet = () => { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['notlarim'] = liste; };
  if (window.FEATURE_ROUTES) kaydet(); else document.addEventListener('DOMContentLoaded', kaydet);

  /* ── v72.9: Yer İmlerim kartında âyetin notu da görünsün ── */
  function imNotlari() {
    const kok = document.getElementById('yerimleri-root'); if (!kok) return;
    const o = oku();
    kok.querySelectorAll('.yi-kart').forEach((k) => {
      const p = (k.id || '').split('-'); const key = p[1] + ':' + p[2];
      const n = o[key]; const var_ = k.querySelector('.yi-notu');
      const imza = n ? String(n.t) : '';
      if (var_ && var_.dataset.t === imza) return;
      if (var_) var_.remove();
      if (!n) return;
      const yer = k.querySelector('.yi-m'); if (!yer) return;
      const d = document.createElement('span'); d.className = 'yi-notu'; d.dataset.t = imza;
      d.innerHTML = `<i>📝</i>${e(n.m.length > 120 ? n.m.slice(0, 118) + '…' : n.m)}`;
      const sm = yer.querySelector('small'); if (sm) yer.insertBefore(d, sm); else yer.appendChild(d);
    });
  }
  new MutationObserver(() => { if (document.getElementById('yerimleri-root')) imNotlari(); })
    .observe(document.documentElement, { childList: true, subtree: true });

  /* ── v72.9: okurken âyete BASILI TUT → yer imlerine ekle (tekrar basılı tut → kaldır) ── */
  let zam = null, x0 = 0, y0 = 0, yutUntil = 0;
  const ayetEl = (t) => {
    const w = document.getElementById('ayah-list-wrap'); if (!w || !t || !t.closest) return null;
    const el = t.closest('[id^="ayah-"]'); return el && w.contains(el) ? el : null;
  };
  const iptal = () => { if (zam) { clearTimeout(zam); zam = null; } document.querySelectorAll('.ok-basili').forEach(x => x.classList.remove('ok-basili')); };
  function imle(el) {
    const O = window.hvOK || {}; const s = Number(O.id), a = Number((el.id || '').slice(5));
    if (!s || !a || typeof window.hvToggleBookmark !== 'function') return;
    try { if (navigator.vibrate) navigator.vibrate(35); } catch (x) {}
    window.hvToggleBookmark(s, a, null);
    const on = !!((typeof hvGetBookmarks === 'function' ? hvGetBookmarks() : {})[s + ':' + a]);
    el.classList.toggle('ayah-marked', on);
    el.classList.remove('ok-basili'); el.classList.add('ok-imlendi');
    setTimeout(() => el.classList.remove('ok-imlendi'), 700);
    yutUntil = Date.now() + 800;
  }
  document.addEventListener('touchstart', (ev) => {
    iptal(); if (ev.touches.length !== 1) return;
    const el = ayetEl(ev.target); if (!el) return;
    x0 = ev.touches[0].clientX; y0 = ev.touches[0].clientY;
    el.classList.add('ok-basili');
    zam = setTimeout(() => { zam = null; imle(el); }, 550);
  }, { passive: true });
  document.addEventListener('touchmove', (ev) => {
    if (!zam) return; const t = ev.touches[0];
    if (Math.abs(t.clientX - x0) > 10 || Math.abs(t.clientY - y0) > 10) iptal();
  }, { passive: true });
  document.addEventListener('touchend', iptal, { passive: true });
  document.addEventListener('touchcancel', iptal, { passive: true });
  // basılı tutma bitince gelen tıklama âyet penceresini açmasın
  document.addEventListener('click', (ev) => { if (Date.now() < yutUntil && ayetEl(ev.target)) { ev.stopPropagation(); ev.preventDefault(); } }, true);
  // uzun basınca çıkan kopyala/seç menüsü yerine yer imi (bilgisayarda sağ tık da aynı işi görür)
  document.addEventListener('contextmenu', (ev) => {
    const el = ayetEl(ev.target); if (!el) return;
    ev.preventDefault(); if (Date.now() < yutUntil) return; iptal(); imle(el);
  });
})();
