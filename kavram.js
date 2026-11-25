/* ═══════════════════════════════════════════════════════════════
   v72.8 — MEALDE KAVRAM AÇIKLAMASI
   Diyanet meâlinde geçen dinî kavramların (takvâ, Levh-i Mahfûz, tâğût…) altı
   hafifçe çizilir; dokununca kısa açıklama çıkar. Açıklamalar Dinî Sözlük'ten
   gelir. Sözlükte olmayan Kur'an kavramları sözlüğe de eklenir.
   Her kavram bir sûrede yalnız ilk geçtiği yerde işaretlenir (sayfa kalabalıklaşmasın).
   Okuma ayarı: hv_kavram ('0' = kapalı).
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const KAVRAM = [{"t":"Levh-i Mahfûz","r":"Levh-i Mahf[uû]z\\p{L}*","a":"Korunmuş levha. Allah'ın ilminde her şeyin yazılı olduğu, değişmeyen kayıt; Kur'an'ın aslının da orada bulunduğu bildirilir (Bürûc 85/21-22)."},{"t":"Sidretü'l-Müntehâ","r":"Sidretü['’]?l-M[uü]nteh[aâ]\\p{L}*","a":"Yaratılmışlar âleminin son sınırı kabul edilen yer. Peygamberimiz Mi'rac'da Cebrâil'i orada asıl suretiyle görmüştür (Necm 53/14)."},{"t":"Ahiret","r":"(?<!\\p{L})[Aa]hiret\\p{L}*"},{"t":"Arş","r":"(?<!\\p{L})Arş\\p{L}*"},{"t":"Bâtıl","r":"(?<!\\p{L})b[aâ]tıl\\p{L}*"},{"t":"Cin","r":"(?<!\\p{L})[Cc]in(?:ler\\p{L}*|n[iıe]\\p{L}*)?(?!\\p{L})"},{"t":"Ecel","r":"(?<!\\p{L})ecel\\p{L}*"},{"t":"Ehl-i Kitap","r":"Kitap ehl\\p{L}*|[Ee]hl-i [Kk]itap\\p{L}*"},{"t":"Fâsık","r":"(?<!\\p{L})f[aâ]sık\\p{L}*"},{"t":"Fitne","r":"(?<!\\p{L})fitne\\p{L}*"},{"t":"Hanîf","r":"(?<!\\p{L})han[iî]f\\p{L}*"},{"t":"Haşr","r":"(?<!\\p{L})haşr\\p{L}*"},{"t":"Hidayet","r":"(?<!\\p{L})hidayet\\p{L}*"},{"t":"İhsan","r":"(?<!\\p{L})ihsan\\p{L}*"},{"t":"Küfür","r":"(?<!\\p{L})küfr\\p{L}*|(?<!\\p{L})küfür\\p{L}*"},{"t":"Münafık","r":"(?<!\\p{L})m[uü]nafık\\p{L}*"},{"t":"Rızık","r":"(?<!\\p{L})rız[ık]\\p{L}*"},{"t":"Şefaat","r":"(?<!\\p{L})şef[aâ]at\\p{L}*"},{"t":"Şirk","r":"(?<!\\p{L})ortak koş\\p{L}*"},{"t":"Takva","r":"(?<!\\p{L})takv[aâ]\\p{L}*"},{"t":"Tevekkül","r":"(?<!\\p{L})tevekkül\\p{L}*"},{"t":"Tövbe","r":"(?<!\\p{L})tövbe\\p{L}*"},{"t":"Vahiy","r":"(?<!\\p{L})vahi?y\\p{L}*"},{"t":"Zekât","r":"(?<!\\p{L})zek[aâ]t\\p{L}*"},{"t":"Kıyamet","r":"(?<!\\p{L})[Kk]ıyamet\\p{L}*"},{"t":"Mahşer","r":"(?<!\\p{L})mahşer\\p{L}*"},{"t":"Melek","r":"(?<!\\p{L})[Mm]elek(?:ler\\p{L}*)?(?!\\p{L})"},{"t":"Nefis","r":"(?<!\\p{L})nefs\\p{L}*|(?<!\\p{L})nefis(?!\\p{L})"},{"t":"Ruh","r":"(?<!\\p{L})[Rr]uh(?:u|un|tan|a|tur|lar\\p{L}*)?(?!\\p{L})"},{"t":"Şeytan","r":"(?<!\\p{L})[Şş]eytan\\p{L}*"},{"t":"Şükür","r":"(?<!\\p{L})şükr\\p{L}*|(?<!\\p{L})şükür\\p{L}*"},{"t":"Tevhid","r":"(?<!\\p{L})tevhid\\p{L}*"},{"t":"Hicret","r":"(?<!\\p{L})hicret\\p{L}*"},{"t":"Sadaka","r":"(?<!\\p{L})sadaka\\p{L}*"},{"t":"Tâğût","r":"(?<!\\p{L})t[aâ]ğ[uû]t\\p{L}*","a":"Allah'tan başka tapılan, insanları Allah'ın yolundan saptıran her şey: putlar, şeytan, zalim ve azgın güçler."},{"t":"Tevrat","r":"(?<!\\p{L})Tevrat\\p{L}*","a":"Hz. Mûsâ'ya indirilen ilâhî kitap."},{"t":"İncil","r":"(?<!\\p{L})İncil\\p{L}*","a":"Hz. Îsâ'ya indirilen ilâhî kitap."},{"t":"Zebûr","r":"(?<!\\p{L})Zeb[uû]r\\p{L}*","a":"Hz. Dâvûd'a verilen ilâhî kitap; Allah'ı öven ve öğüt veren ilâhîlerden oluşur."},{"t":"Furkan","r":"(?<!\\p{L})Furk[aâ]n\\p{L}*","a":"Hakkı bâtıldan ayıran demektir. Kur'an'ın isimlerinden biridir; Tevrat için de kullanılmıştır."},{"t":"Salih Amel","r":"(?<!\\p{L})salih amel\\p{L}*","a":"Allah rızası için yapılan, dine ve akla uygun her türlü iyi iş. Kur'an'da çoğunlukla imanla birlikte anılır: \"İman edip salih amel işleyenler…\""},{"t":"Kürsî","r":"(?<!\\p{L})[Kk]ürsü\\p{L}*","a":"Allah'ın hükümranlığını, ilmini ve kudretini anlatan kavram: \"O'nun kürsüsü bütün gökleri ve yeri kaplamıştır\" (Bakara 2/255, Âyetü'l-Kürsî)."},{"t":"Ruhu'l-Kudüs","r":"Ruhu['’]l-Kudüs\\p{L}*","a":"Kutsal ruh; Kur'an'da Cebrâil (a.s.) için kullanılır (Nahl 16/102)."}];
  const e = (x) => (typeof hvEsc === 'function' ? hvEsc(x) : String(x));
  const S = () => (typeof DINI_SOZLUK !== 'undefined' ? DINI_SOZLUK : null);
  /* sözlükte olmayanları sözlüğe ekle (alfabetik yerine) */
  try {
    const D = S();
    if (D) KAVRAM.forEach((k) => {
      if (!k.a || D.some(x => x.term === k.t)) return;
      const yeni = { term: k.t, meaning: k.a };
      const i = D.findIndex(x => x.term.localeCompare(k.t, 'tr') > 0);
      if (i < 0) D.push(yeni); else D.splice(i, 0, yeni);
    });
  } catch (x) {}
  const anlam = (t) => { const D = S(); const x = D && D.find(z => z.term === t); return x ? x.meaning : ''; };
  const RE = KAVRAM.map(k => { try { return new RegExp(k.r, 'iu'); } catch (x) { return null; } });
  const acik = () => { try { return localStorage.getItem('hv_kavram') !== '0'; } catch (x) { return true; } };

  function isaretle(id, mod) {
    if (!acik() || mod === 'bilgi' || mod === 'arapca') return;
    const w = document.getElementById('ayah-list-wrap'); if (!w) return;
    const kutular = w.querySelectorAll(mod === 'meal' ? '.ok-mp' : '.ok-meal');
    const goruldu = {};
    kutular.forEach((kutu) => {
      const yur = document.createTreeWalker(kutu, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && n.parentElement.closest('b, .kr-ortak, .kv, .ks-not, .an-not')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
      const dugumler = []; let n; while ((n = yur.nextNode())) dugumler.push(n);
      dugumler.forEach((dg) => {
        let metin = dg.nodeValue; if (!metin || metin.length < 3) return;
        let en = null;   // bu düğümde en önce geçen, henüz işaretlenmemiş kavram
        KAVRAM.forEach((k, i) => { if (goruldu[i] || !RE[i]) return; const m = RE[i].exec(metin); if (m && (!en || m.index < en.m.index || (m.index === en.m.index && m[0].length > en.m[0].length))) en = { i, m }; });
        if (!en) return;
        goruldu[en.i] = 1;
        const bas = en.m.index, son = bas + en.m[0].length;
        const sp = document.createElement('span'); sp.className = 'kv'; sp.dataset.kv = en.i; sp.textContent = metin.slice(bas, son);
        const arka = document.createTextNode(metin.slice(son));
        dg.nodeValue = metin.slice(0, bas);
        dg.after(sp); sp.after(arka);
      });
    });
  }
  (window.hvOkCizSonra = window.hvOkCizSonra || []).push(isaretle);

  /* dokununca açıklama kartı */
  function kartAc(i) {
    const k = KAVRAM[i]; if (!k) return;
    let o = document.getElementById('kv-kart');
    if (!o) { o = document.createElement('div'); o.id = 'kv-kart'; document.body.appendChild(o); o.addEventListener('click', (ev) => { if (ev.target === o) kapat(); }); }
    o.innerHTML = '<div class="kv-kutu"><div class="kv-bas"><small>Kavram</small><b>' + e(k.t) + '</b><button class="kv-x" aria-label="Kapat" onclick="hvKavramKapat()">✕</button></div>' +
      '<p>' + e(anlam(k.t) || k.a || '') + '</p>' +
      '<div class="kv-alt"><button onclick="hvKavramSozluk(' + i + ')">📚 Dinî Sözlük ›</button><button class="kv-kapa" onclick="hvKavramAyar(false)">Altı çizilileri gizle</button></div></div>';
    o.classList.add('ac');
  }
  function kapat() { const o = document.getElementById('kv-kart'); if (o) o.classList.remove('ac'); }
  window.hvKavramKapat = kapat;
  window.hvKavramSozluk = (i) => { kapat(); const k = KAVRAM[i]; try { navigateTo('sozluk'); setTimeout(() => { const g = document.getElementById('sozluk-search-input'); if (g && k) { g.value = k.t; try { renderSozluk(k.t); } catch (x) {} } }, 80); } catch (x) {} };
  window.hvKavramAyar = (ac) => { try { localStorage.setItem('hv_kavram', ac ? '1' : '0'); } catch (x) {} kapat();
    document.querySelectorAll('.kv').forEach(s => s.replaceWith(document.createTextNode(s.textContent)));
    try { hvToast(ac ? 'Kavramlar gösteriliyor' : 'Kavramlar gizlendi', ac ? 'Mealdeki kavramların altı çizili.' : 'Okuma ayarlarından (⋯) tekrar açabilirsin.'); } catch (x) {} };
  document.addEventListener('click', (ev) => {
    const s = ev.target && ev.target.closest && ev.target.closest('.kv'); if (!s) return;
    ev.stopPropagation(); ev.preventDefault(); kartAc(Number(s.dataset.kv));
  }, true);
  window.hvKavramDegis = (btn) => {
    const ac = !(btn && btn.classList.contains('on'));
    if (btn) btn.classList.toggle('on', ac);
    if (!ac) { window.hvKavramAyar(false); return; }
    try { localStorage.setItem('hv_kavram', '1'); } catch (x) {}
    const w = document.getElementById('ayah-list-wrap');
    const mod = w && w.querySelector('.ok-mealakis') ? 'meal' : (w && w.querySelector('.ok-mushaf') ? 'arapca' : 'birlikte');
    try { isaretle(0, mod); } catch (x) {}
  };
  window.HV_KAVRAM = KAVRAM;
})();
