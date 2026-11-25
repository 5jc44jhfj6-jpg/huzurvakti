/* ═══════════════════════════════════════════════════════════════
   v72.8 — OKUMA KOLAYLIĞI (meal okurken göz takibi)
   Okuma ekranındaki "📖 Oku" düğmesi ilk basışta bu menüyü açar; seçilen mod
   kaydedilir (hv_okuma_kolay), sonra sormadan o modla başlar. Okurken panelin
   üstündeki "📖 Mod ▾" etiketiyle değiştirilir.
     duz   : sayfa seçilen hızda akar (yeni.js'teki eski otomatik kaydırma)
     kelime: sarı vurgu kelimeden kelimeye ilerler
     satir : okunan satır yanar, sonra alttakine geçer
     ayet  : okunan âyet öne çıkar, gerisi solar
   Hız: paneldeki ½ … 5 düğmeleri (dakikada kelime). "Hızımı öğren" ile 1× kişinin hızına ayarlanır (hv_okuma_wpm).
   Yalnız Türkçe meâl metni üzerinde çalışır (Meâl ve Âyet görünümleri); Arapça görünümünde düz kaydırmaya düşer.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const MODLAR = [
    { id: 'duz', ik: '⇣', ad: 'Düz kaydırma', kisa: 'Düz', ac: 'Sayfa seçtiğin hızda akar' },
    { id: 'kelime', ik: '🟨', ad: 'Kelime kelime', kisa: 'Kelime', ac: 'Sarı vurgu kelimeden kelimeye ilerler' },
    { id: 'satir', ik: '▬', ad: 'Satır satır', kisa: 'Satır', ac: 'Okuduğun satır yanar, sonra alttakine geçer' },
    { id: 'ayet', ik: '📄', ad: 'Âyet âyet', kisa: 'Âyet', ac: 'Okuduğun âyet öne çıkar, gerisi solar' },
    { id: 'sesli', ik: '🔊', ad: 'Dinle ve oku', kisa: 'Sesli', ac: 'Meal sesli okunur, okunan cümle yanar' },
    { id: 'odak', ik: '🎯', ad: 'Odak modu', kisa: 'Odak', ac: 'Ekranda tek âyet; kaydırarak sonrakine geç' },
    { id: 'dokun', ik: '👆', ad: 'Dokundukça ilerle', kisa: 'Dokun', ac: 'Her dokunuşta sonraki cümle; zamanlayıcı yok' }
  ];
  const yk = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
  const yz = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const toast = (a, b) => { try { hvToast(a, b); } catch (e) {} };
  window.hvOkumaModAdi = (id) => (MODLAR.find(m => m.id === id) || MODLAR[0]).kisa;

  /* hız: dakikada kelime (1× = kişinin hızı ya da 150) */
  const CARPAN = { '0.5': 0.55, '1': 1, '1.5': 1.2, '2': 1.4, '2.5': 1.6, '3': 1.8, '4': 2.2, '5': 2.7 };
  const temelWpm = () => { const v = parseFloat(yk('hv_okuma_wpm', '')); return v >= 60 && v <= 600 ? v : 130; };

  /* ── menü ── */
  let menuSonra = null, menuIptal = null;
  window.hvOkumaMenu = (sonra, iptal) => {
    menuSonra = sonra || null; menuIptal = iptal || null;
    let o = document.getElementById('om-arka');
    if (!o) {
      o = document.createElement('div'); o.id = 'om-arka';
      o.addEventListener('click', (e) => { if (e.target === o) menuKapat(true); });
      document.body.appendChild(o);
    }
    const sec = yk('hv_okuma_kolay', '') || 'satir';
    o.innerHTML = `<div id="om"><div class="om-tut"></div><h3>📖 Okuma kolaylığı</h3><div class="om-alt-y">Meali nasıl okumak istersin? Seçimin hatırlanır; okurken üstteki etiketten değiştirebilirsin.</div>
      ${MODLAR.map(m => `<button class="om-s${m.id === sec ? ' on' : ''}" data-m="${m.id}" onclick="hvOkumaSec('${m.id}')"><span class="om-ik">${m.ik}</span><span class="om-m"><b>${m.ad}</b><small>${m.ac}</small></span><span class="om-r"></span></button>`).join('')}
      <div class="om-hiz"><span>Hız: okurken alttaki ½ … 5 düğmelerinden.</span><button onclick="hvOkumaHizOgren()">⏱ Hızımı öğren</button></div>
      <button class="om-bas" onclick="hvOkumaBasla()">▶ Okumaya başla</button></div>`;
    o.classList.add('ac');
  };
  function menuKapat(iptal) { const o = document.getElementById('om-arka'); if (o) o.classList.remove('ac'); if (iptal && menuIptal) { const f = menuIptal; menuIptal = null; f(); } }
  window.hvOkumaSec = (id) => { document.querySelectorAll('#om .om-s').forEach(b => b.classList.toggle('on', b.dataset.m === id)); };
  window.hvOkumaBasla = () => {
    const b = document.querySelector('#om .om-s.on'); const id = b ? b.dataset.m : 'satir';
    yz('hv_okuma_kolay', id); menuIptal = null; menuKapat(false);
    const f = menuSonra; menuSonra = null; if (f) f();
    try { window.hvOtoCiz && window.hvOtoCiz(); } catch (e) {}
  };

  /* ── Hızımı öğren: kısa bir metni normal hızda okur, "Bitti"ye basar ── */
  const ORNEK = 'Rahmân’ın kulları, yeryüzünde vakar ve tevazu ile yürüyen kimselerdir. Cahiller onlara laf attıkları zaman, “selâm!” der geçerler. Onlar, gecelerini Rablerine secde ederek ve kıyamda durarak geçirirler. Onlar, “Ey Rabbimiz! Cehennem azabını bizden uzaklaştır. Çünkü onun azabı sürekli bir azaptır” derler. Onlar, harcadıklarında ne israf ne de cimrilik edenlerdir. Onların harcamaları, bu ikisi arası dengeli bir harcamadır.';
  let olcBas = 0;
  window.hvOkumaHizOgren = () => {
    const o = document.getElementById('om'); if (!o) return;
    o.innerHTML = `<div class="om-tut"></div><h3>⏱ Hızımı öğren</h3><div class="om-alt-y">Aşağıdaki meali her zamanki gibi, anlayarak oku. Bitirince <b>Bitti</b>'ye bas.</div>
      <div class="om-ornek">${ORNEK}<div class="om-kaynak">Furkân 25/63-67 · Diyanet meâli</div></div>
      <button class="om-bas" onclick="hvOkumaHizBitti()">✓ Bitti</button>`;
    olcBas = Date.now();
  };
  window.hvOkumaHizBitti = () => {
    const sn = (Date.now() - olcBas) / 1000; const kelime = ORNEK.split(/\s+/).length;
    if (sn < 6) { toast('Biraz hızlı oldu', 'Metni okuyup öyle Bitti’ye bas.'); return; }
    const wpm = Math.max(70, Math.min(400, Math.round(kelime / sn * 60)));
    yz('hv_okuma_wpm', String(wpm));
    toast('⏱ Okuma hızın: dakikada ' + wpm + ' kelime', '1× hız artık senin hızın. Daha yavaş ya da hızlı için ½ … 5.');
    window.hvOkumaMenu(menuSonra, menuIptal);
  };

  /* ── motor ── */
  const kutu = () => { const w = document.getElementById('ayah-list-wrap'); return w ? w.closest('.hero-frame-box') : null; };
  const harf = (t) => Math.max(1, String(t).replace(/[\s'’`"“”().,;:!?…\-–]/g, '').length);
  let M = null;   // { mod, kel:[span], i, t, sure:{}, satirlar, ayetler }
  function sar() {
    // meal metnini kelime kelime <span class="ow"> içine al (bir kez)
    const w = document.getElementById('ayah-list-wrap'); if (!w) return [];
    const kutular = w.querySelectorAll('.ok-mp, .ok-meal');
    kutular.forEach((k) => {
      if (k.dataset.owSarildi) return; k.dataset.owSarildi = '1';
      const yur = document.createTreeWalker(k, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && n.parentElement.closest('b, .kr-ortak, .ks-not, .an-not, .ow')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      const L = []; let n; while ((n = yur.nextNode())) L.push(n);
      L.forEach((tn) => {
        const par = tn.nodeValue.split(/(\s+)/); if (par.length < 2 && !par[0].trim()) return;
        const fr = document.createDocumentFragment();
        par.forEach((p) => { if (!p) return; if (/^\s+$/.test(p)) fr.appendChild(document.createTextNode(p)); else { const s = document.createElement('span'); s.className = 'ow'; s.textContent = p; fr.appendChild(s); } });
        tn.replaceWith(fr);
      });
    });
    return [...w.querySelectorAll('.ow')];
  }
  const ayetKutusu = (el) => el.closest('.ok-ayet, .ok-mp');
  function sureMs(span) {
    const wpm = temelWpm() * (CARPAN[M.hiz] || 1);
    const ort = 5.2;   // Türkçe ortalama kelime uzunluğu (harf)
    let ms = (60000 / wpm) * (harf(span.textContent) / ort);
    const son = span.textContent.slice(-1);
    if (/[.!?…]/.test(son)) ms += 320; else if (/[,;:]/.test(son)) ms += 160;
    return Math.max(110, ms);
  }
  function baslangic(kel) {
    const k = kutu(); if (!k) return 0;
    const ust = k.getBoundingClientRect().top + 70;
    for (let i = 0; i < kel.length; i++) if (kel[i].getBoundingClientRect().top >= ust) return i;
    return 0;
  }
  function takip(el) {
    const k = kutu(); if (!k || !el) return;
    const kr = k.getBoundingClientRect(), r = el.getBoundingClientRect();
    const y = r.top - kr.top, h = k.clientHeight;
    if (y > h * 0.48 || y < h * 0.12) k.scrollTo({ top: k.scrollTop + y - h * 0.30, behavior: 'smooth' });
  }
  function satirGrubu(i) {   // i. kelimenin bulunduğu satırdaki kelimeler (aynı âyet kutusu + aynı üst konum)
    const kel = M.kel, t0 = Math.round(kel[i].offsetTop), kb = ayetKutusu(kel[i]);
    let a = i, b = i;
    while (a > 0 && Math.abs(Math.round(kel[a - 1].offsetTop) - t0) < 4 && ayetKutusu(kel[a - 1]) === kb) a--;
    while (b < kel.length - 1 && Math.abs(Math.round(kel[b + 1].offsetTop) - t0) < 4 && ayetKutusu(kel[b + 1]) === kb) b++;
    return [a, b];
  }
  function ayetGrubu(i) {
    const kel = M.kel, kb = ayetKutusu(kel[i]); let a = i, b = i;
    while (a > 0 && ayetKutusu(kel[a - 1]) === kb) a--;
    while (b < kel.length - 1 && ayetKutusu(kel[b + 1]) === kb) b++;
    return [a, b];
  }
  // cümle: nokta/ünlem/soru ile biten kelimeye ya da âyet kutusunun sonuna kadar
  const cumleSonu = (t) => /[.!?…]["”’)\]]*$/.test(t);
  function cumleGrubu(i) {
    const kel = M.kel, kb = ayetKutusu(kel[i]); let a = i, b = i;
    while (a > 0 && ayetKutusu(kel[a - 1]) === kb && !cumleSonu(kel[a - 1].textContent)) a--;
    while (b < kel.length - 1 && !cumleSonu(kel[b].textContent) && ayetKutusu(kel[b + 1]) === kb) b++;
    return [a, b];
  }
  /* sesli okuma (telefonun Türkçe sesi; Android'de kabuk speechSynthesis'i sağlar) */
  const sesHiz = () => Math.min(1.8, Math.max(0.6, ((typeof hvTtsHiz === 'function') ? hvTtsHiz() : 0.9) * Math.sqrt(CARPAN[M.hiz] || 1)));
  function konus(metin, bitti) {
    const n = ++M.nesil;
    let tamam = false;
    const son = (ok) => { if (tamam || !M || n !== M.nesil) return; tamam = true; clearTimeout(M.t); bitti(ok); };
    try {
      const u = new SpeechSynthesisUtterance(metin);
      u.lang = 'tr-TR'; try { const v = (typeof hvTtsTurkceSes === 'function') ? hvTtsTurkceSes() : null; if (v) u.voice = v; } catch (e) {}
      u.rate = sesHiz(); u.pitch = 1; u.volume = 1;
      u.onend = () => son(true); u.onerror = () => son(false);
      M.t = setTimeout(() => son(true), Math.max(2500, metin.length * 95 / u.rate + 3000));   // onend gelmeyen cihazlar için emniyet
      speechSynthesis.speak(u);
    } catch (e) { son(false); }
  }
  function sesSus() { try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {} }
  function isaretTemizle() {
    document.querySelectorAll('.ow-simdi, .ow-satir').forEach(x => x.classList.remove('ow-simdi', 'ow-satir'));
    document.querySelectorAll('.okm-odak').forEach(x => x.classList.remove('okm-odak'));
  }
  function adim() {
    if (!M || !M.calisiyor) return;
    const kel = M.kel;
    if (M.i >= kel.length) { bitir(true); return; }
    if (!document.body.contains(kel[M.i])) { yenidenKur(); return; }
    let a = M.i, b = M.i;
    if (M.mod === 'satir') [a, b] = satirGrubu(M.i);
    else if (M.mod === 'ayet') [a, b] = ayetGrubu(M.i);
    else if (M.mod === 'sesli' || M.mod === 'dokun') [a, b] = cumleGrubu(M.i);
    isaretTemizle();
    for (let j = M.okunan; j < a; j++) kel[j].classList.add('ow-ok');
    M.okunan = Math.max(M.okunan, a);
    if (M.mod === 'kelime') kel[a].classList.add('ow-simdi');
    else if (M.mod === 'satir') for (let j = a; j <= b; j++) kel[j].classList.add('ow-satir');
    else if (M.mod === 'ayet') { const k = ayetKutusu(kel[a]); if (k) k.classList.add('okm-odak'); for (let j = a; j <= b; j++) kel[j].classList.add('ow-ok'); }
    else for (let j = a; j <= b; j++) kel[j].classList.add('ow-satir');   // sesli / dokun: cümle
    takip(kel[a]);
    if (M.mod === 'dokun') { M.cB = b; return; }   // zamanlayıcı yok: dokununca ileri()
    if (M.mod === 'sesli') {
      const metin = kel.slice(a, b + 1).map(x => x.textContent).join(' ');
      konus(metin, (ok) => { if (!M || !M.calisiyor) return; if (!ok) { toast('Sesli okuma durdu', 'Telefonun Türkçe sesi açılamadı.'); window.hvOtoKaydirDur && window.hvOtoKaydirDur(); return; } M.i = b + 1; adim(); });
      return;
    }
    let ms = 0; for (let j = a; j <= b; j++) ms += sureMs(kel[j]);
    if (M.mod === 'ayet') ms += 600;   // âyet arası nefes
    M.i = b + 1;
    M.t = setTimeout(adim, ms);
  }
  function yenidenKur() {   // okuyucu yeniden çizildiyse (yer imi, not…) kaldığı kelimeden sürdür
    if (!M) return;
    const sira = M.i; clearTimeout(M.t); if (M.mod === 'sesli') { M.nesil++; sesSus(); }
    document.getElementById('ayah-list-wrap')?.classList.add('okm-aktif', 'okm-' + M.mod);
    M.kel = sar(); M.i = Math.min(sira, M.kel.length); M.okunan = 0;
    for (let j = 0; j < M.i; j++) M.kel[j].classList.add('ow-ok');
    M.okunan = M.i; adim();
  }
  function bitir(sureSonu) {
    if (!M) return; clearTimeout(M.t); M.calisiyor = false;
    isaretTemizle();
    if (sureSonu) { const k = kutu(); if (k) k.scrollTo({ top: k.scrollHeight, behavior: 'smooth' }); setTimeout(() => { try { window.hvOtoSureBitti && window.hvOtoSureBitti(); } catch (e) {} }, 700); }
  }
  function temizle() {
    const w = document.getElementById('ayah-list-wrap');
    if (w) { w.classList.remove('okm-aktif', 'okm-kelime', 'okm-satir', 'okm-ayet', 'okm-sesli', 'okm-dokun'); }
    isaretTemizle();
    document.querySelectorAll('.ow-ok').forEach(x => x.classList.remove('ow-ok'));
  }
  /* ── Odak modu: ekranda tek âyet ── */
  let O = null;   // { kartlar:[{no, meal}], i }
  function odakKartlari() {
    const w = document.getElementById('ayah-list-wrap'); if (!w) return [];
    const out = [];
    w.querySelectorAll('.ok-mp, .ok-ayet').forEach((k) => {
      const no = (k.querySelector('b, .kr-mad') || {}).textContent || '';
      let meal = '';
      if (k.classList.contains('ok-mp')) { const c = k.cloneNode(true); c.querySelectorAll('b, .kr-ortak, .an-not, .ks-not').forEach(x => x.remove()); meal = c.textContent; }
      else { const m = k.querySelector('.ok-meal'); if (!m || m.classList.contains('kr-ortak-bos')) return; const c = m.cloneNode(true); c.querySelectorAll('.kr-ortak').forEach(x => x.remove()); meal = c.textContent; }
      meal = meal.replace(/\s+/g, ' ').trim(); if (!meal) return;
      out.push({ no: no.trim(), meal, el: k });
    });
    return out;
  }
  function odakAc() {
    const kartlar = odakKartlari(); if (!kartlar.length) return false;
    // ekranda görünen ilk âyetten başla
    const k = kutu(); let i = 0;
    if (k) { const ust = k.getBoundingClientRect().top + 60; i = Math.max(0, kartlar.findIndex(x => x.el.getBoundingClientRect().bottom > ust)); }
    O = { kartlar, i };
    let d = document.getElementById('odak-m');
    if (!d) {
      d = document.createElement('div'); d.id = 'odak-m';
      d.innerHTML = `<div class="od-ust"><b id="od-sure"></b><span id="od-say"></span><button class="od-x" aria-label="Kapat" onclick="hvOtoKaydirDur && hvOtoKaydirDur()">✕</button></div>
        <div class="od-orta" id="od-orta"><div class="od-no" id="od-no"></div><div class="od-meal" id="od-meal"></div></div>
        <div class="od-alt"><button onclick="hvOdakGit(-1)" aria-label="Önceki">‹</button><div class="od-cizgi"><i id="od-dolu"></i></div><button onclick="hvOdakGit(1)" aria-label="Sonraki">›</button></div>
        <div class="od-ipucu">Sağa-sola kaydır ya da yanlara dokun</div>`;
      document.body.appendChild(d);
      let x0 = null, y0 = null;
      const orta = d.querySelector('#od-orta');
      orta.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      orta.addEventListener('touchend', (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null; if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { window.hvOdakGit(dx < 0 ? 1 : -1); d._kaydi = Date.now(); } }, { passive: true });
      orta.addEventListener('click', (e) => { if (d._kaydi && Date.now() - d._kaydi < 400) return; const r = orta.getBoundingClientRect(); window.hvOdakGit(e.clientX > r.left + r.width * 0.4 ? 1 : -1); });
    }
    d.classList.add('ac'); odakCiz();
    return true;
  }
  function odakCiz() {
    if (!O) return; const x = O.kartlar[O.i]; if (!x) return;
    const id = (window.hvOK && window.hvOK.id) || 0;
    const sAd = (() => { try { return hvSurahName(id) + ' Sûresi'; } catch (e) { return ''; } })();
    document.getElementById('od-sure').textContent = sAd;
    document.getElementById('od-say').textContent = (O.i + 1) + ' / ' + O.kartlar.length;
    document.getElementById('od-no').textContent = x.no ? x.no + '. âyet' : '';
    const m = document.getElementById('od-meal'); m.textContent = x.meal;
    m.style.fontSize = x.meal.length > 420 ? '1.12rem' : x.meal.length > 220 ? '1.28rem' : '1.46rem';
    m.classList.remove('gel'); void m.offsetWidth; m.classList.add('gel');
    document.getElementById('od-dolu').style.width = ((O.i + 1) / O.kartlar.length * 100) + '%';
  }
  window.hvOdakGit = (y) => {
    if (!O) return;
    const yeni = O.i + y;
    if (yeni < 0) return;
    if (yeni >= O.kartlar.length) {   // sûre bitti → sıradaki sûreye geçiş (kaydırmadaki gibi)
      const el = O.kartlar[O.i].el; odakKapat(); try { el.scrollIntoView({ block: 'center' }); } catch (e) {}
      try { window.hvOtoSureBitti && window.hvOtoSureBitti(); } catch (e) {}
      return;
    }
    O.i = yeni; odakCiz();
  };
  function odakKapat() {
    const d = document.getElementById('odak-m');
    if (d && d.classList.contains('ac')) {
      d.classList.remove('ac');
      if (O && O.kartlar[O.i]) { const el = O.kartlar[O.i].el; const k = kutu(); if (k && el) { const kr = k.getBoundingClientRect(), r = el.getBoundingClientRect(); k.scrollTop += r.top - kr.top - k.clientHeight * 0.25; } }
    }
    O = null;
  }

  window.hvOkuMotor = {
    basla(mod, hiz) {
      const w = document.getElementById('ayah-list-wrap'); if (!w) return false;
      if (!w.querySelector('.ok-mp, .ok-meal')) {   // Arapça görünüm: meal yok → düz kaydırma
        toast('Bu görünümde meal yok', 'Okuma kolaylığı mealde çalışır. Meâl ya da Âyet görünümüne geç; şimdilik düz kaydırma.');
        return false;
      }
      if (mod === 'odak') { if (M) { clearTimeout(M.t); M = null; } temizle(); return odakAc(); }
      if (mod === 'sesli') {
        if (!window.speechSynthesis || (typeof hvTtsTurkceVarMi === 'function' && !hvTtsTurkceVarMi())) {
          toast('Türkçe ses bulunamadı', 'Telefonunda Türkçe konuşma sesi yok; satır satır okumaya geçildi.'); mod = 'satir';
        } else { try { hvTtsIsit && hvTtsIsit(); } catch (e) {} }
      }
      if (M) clearTimeout(M.t);
      temizle();
      const kel = sar(); if (!kel.length) return false;
      w.classList.add('okm-aktif', 'okm-' + mod);
      M = { mod, hiz, kel, i: baslangic(kel), okunan: 0, calisiyor: true, t: 0, nesil: 0, cB: 0 };
      for (let j = 0; j < M.i; j++) kel[j].classList.add('ow-ok');
      M.okunan = M.i;
      adim();
      return true;
    },
    dur() { odakKapat(); if (!M) return; clearTimeout(M.t); if (M.mod === 'sesli') { M.nesil++; sesSus(); } M.calisiyor = false; },   // vurgular kalır: devam edince oradan sürer
    ileri() {   // Dokundukça ilerle: sonraki cümle
      if (!M || M.mod !== 'dokun' || !M.calisiyor) return false;
      for (let j = M.i; j <= M.cB; j++) M.kel[j] && M.kel[j].classList.add('ow-ok');
      M.okunan = Math.max(M.okunan, M.cB + 1); M.i = M.cB + 1; adim(); return true;
    },
    modDokun() { return !!(M && M.mod === 'dokun' && M.calisiyor); },
    hiz(h) { if (M) M.hiz = h; },
    sifirla() { if (M) clearTimeout(M.t); M = null; temizle(); }
  };
  // ▶ ile yeniden başlayınca kaldığı yerden sürsün: basla() çağrısında M varsa ve aynı sûredeyse oradan
  const asilBasla = window.hvOkuMotor.basla;
  window.hvOkuMotor.basla = function (mod, hiz) {
    const w = document.getElementById('ayah-list-wrap');
    if (mod !== 'odak' && M && !M.calisiyor && M.mod === mod && w && w.classList.contains('okm-aktif') && M.kel.length && document.body.contains(M.kel[Math.min(M.i, M.kel.length - 1)])) {
      M.hiz = hiz; M.calisiyor = true;
      if (mod === 'sesli') { try { hvTtsIsit && hvTtsIsit(); } catch (e) {} }
      // kullanıcı elle kaydırdıysa görünen yerden devam et
      const k = kutu(), el = M.kel[Math.min(M.i, M.kel.length - 1)];
      if (k && el) { const r = el.getBoundingClientRect(), kr = k.getBoundingClientRect(); if (r.top < kr.top || r.bottom > kr.bottom) { const b = baslangic(M.kel); M.i = b; for (let j = 0; j < b; j++) M.kel[j].classList.add('ow-ok'); M.okunan = Math.max(M.okunan, b); } }
      adim(); return true;
    }
    return asilBasla(mod, hiz);
  };
  // okuyucu yeniden çizildiğinde (sûre değişti ya da görünüm değişti) motoru bırak
  (window.hvOkCizSonra = window.hvOkCizSonra || []).push(() => {
    if (!M) return;
    if (M.calisiyor) setTimeout(yenidenKur, 30); else { M = null; }
  });
})();
