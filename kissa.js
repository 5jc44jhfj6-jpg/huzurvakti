/* ═══════════════════════════════════════════════════════════════
   v72.8 — PEYGAMBERLER VE KISSALARI + KISSA BAĞLANTILARI + İNİŞ DÖNEMİ
   • Öğren › "Peygamberler ve Kıssaları": Kur'an'da adı geçen 25 peygamber ve
     diğer ibretli kıssalar; her birinin Kur'an'da anlatıldığı yerler (dokununca
     o sûrenin o âyetine gidilir). Seçili sıraya (mushaf / iniş) göre dizilir.
   • Okurken: bir peygamber kıssasının başladığı âyetin altına "başka nerede
     geçiyor" notu.
   • Okuma ekranının başında sûrenin iniş sırası ve dönemi (Kahire listesi, yaklaşık).
   Âyet aralıkları yaklaşıktır; her aralık Diyanet meâlinde ilgili adın (ya da
   kıssanın anahtar kelimesinin) geçtiği âyetlerle doğrulanmıştır.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const VERI = {"p":[{"id":"adem","ad":"Hz. Âdem","o":"İlk insan ve ilk peygamber. Yaratılışı, meleklerin secdesi, İblis'in kibri ve cennetten yeryüzüne inişi anlatılır.","y":[[2,30,39],[7,11,25],[15,26,44],[17,61,65],[18,50,50],[20,115,123],[38,71,85]]},{"id":"idris","ad":"Hz. İdris","o":"Sabırlı, dürüst bir peygamber olarak anılır; Allah onu yüce bir makama yükseltmiştir.","y":[[19,56,57],[21,85,86]]},{"id":"nuh","ad":"Hz. Nûh","o":"Kavmini yüzyıllarca tevhide çağırdı. İnanmayanlar tufanda helâk oldu; iman edenler gemiyle kurtuldu.","y":[[7,59,64],[10,71,73],[11,25,49],[23,23,30],[26,105,122],[29,14,15],[37,75,82],[54,9,17],[71,1,28]]},{"id":"hud","ad":"Hz. Hûd","o":"Güçlü ve kibirli Âd kavmine gönderildi. Kavmi uyarıları dinlemeyince şiddetli bir rüzgârla helâk edildi.","y":[[7,65,72],[11,50,60],[26,123,140],[46,21,26],[54,18,21],[69,6,8]]},{"id":"salih","ad":"Hz. Sâlih","o":"Semûd kavmine gönderildi. Mucize olarak verilen dişi deveyi öldüren kavim, korkunç bir sesle helâk oldu.","y":[[7,73,79],[11,61,68],[15,80,84],[26,141,159],[27,45,53],[54,23,32],[91,11,15]]},{"id":"ibrahim","ad":"Hz. İbrahim","o":"Putlara karşı tevhidi savundu, ateşe atıldı ama ateş onu yakmadı. Oğlu İsmail ile Kâbe'yi inşa etti. \"Allah'ın dostu\" (Halîlullah) olarak anılır.","y":[[2,124,132],[2,258,260],[6,74,83],[11,69,76],[14,35,41],[15,51,60],[19,41,50],[21,51,73],[26,69,89],[29,16,27],[37,83,113],[51,24,37]]},{"id":"lut","ad":"Hz. Lût","o":"Hz. İbrahim'in yeğeni. Çirkin işlerde ısrar eden kavmini uyardı; kavmi taş yağmuruyla helâk edildi.","y":[[7,80,84],[11,77,83],[15,61,77],[26,160,175],[27,54,58],[29,28,35],[37,133,138],[54,33,39]]},{"id":"ismail","ad":"Hz. İsmail","o":"Hz. İbrahim'in oğlu. Babasıyla birlikte Kâbe'nin temellerini yükseltti; sözüne sadık bir peygamber olarak anılır.","y":[[2,125,129],[19,54,55],[21,85,86],[38,48,48]]},{"id":"ishak","ad":"Hz. İshak","o":"Hz. İbrahim'in oğlu. Doğumu, yaşlı anne babasına meleklerce müjdelendi.","y":[[11,71,71],[37,112,113],[19,49,49]]},{"id":"yakub","ad":"Hz. Yakub","o":"Hz. İshak'ın oğlu, Hz. Yusuf'un babası. Oğullarına tevhidi vasiyet etti; Yusuf'un ayrılığına sabırla katlandı.","y":[[2,132,133],[12,4,18],[12,83,100],[19,49,49]]},{"id":"yusuf","ad":"Hz. Yusuf","o":"Kardeşlerince kuyuya atıldı, Mısır'da köle olarak satıldı, iftiraya uğrayıp zindana girdi; sonunda Mısır'da yönetici oldu ve ailesine kavuştu. Kur'an bu kıssayı \"kıssaların en güzeli\" diye anlatır.","y":[[12,3,101],[40,34,34]]},{"id":"eyyub","ad":"Hz. Eyyûb","o":"Ağır hastalık ve kayıplara uğradı ama sabrını hiç kaybetmedi. Sabrın örneği olarak anılır.","y":[[21,83,84],[38,41,44]]},{"id":"suayb","ad":"Hz. Şuayb","o":"Medyen halkına gönderildi. Ölçü ve tartıda hile yapan kavmini dürüstlüğe çağırdı.","y":[[7,85,93],[11,84,95],[26,176,191],[29,36,37]]},{"id":"musa","ad":"Hz. Mûsâ","o":"Firavun'un sarayında büyüdü; Tûr'da Allah ile konuştu. Asa ve beyaz el mucizeleriyle Firavun'a gönderildi, İsrâiloğullarını Mısır'dan çıkardı. Kur'an'da adı en çok geçen peygamberdir.","y":[[2,49,61],[7,103,162],[10,75,92],[17,101,104],[18,60,82],[20,9,98],[26,10,68],[27,7,14],[28,3,46],[40,23,46],[43,46,56],[44,17,33],[79,15,26]]},{"id":"harun","ad":"Hz. Hârûn","o":"Hz. Mûsâ'nın kardeşi. Mûsâ'nın duası üzerine ona yardımcı ve sözcü olarak peygamberlik verildi.","y":[[7,142,142],[7,150,151],[19,53,53],[20,29,36],[20,90,94]]},{"id":"zulkifl","ad":"Hz. Zülkifl","o":"Sabredenlerden ve seçkin kullardan biri olarak anılır.","y":[[21,85,86],[38,48,48]]},{"id":"davud","ad":"Hz. Davud","o":"Câlût'u yendi, hükümdarlık ve hikmet verildi. Zebur ona indirildi; dağlar ve kuşlar onunla birlikte tesbih ederdi.","y":[[2,251,251],[21,78,80],[34,10,11],[38,17,26]]},{"id":"suleyman","ad":"Hz. Süleyman","o":"Hz. Davud'un oğlu. Rüzgâr ve cinler emrine verildi, kuşların dilini anlardı. Sebe melikesi Belkıs ile olan kıssası anlatılır.","y":[[21,78,82],[27,15,44],[34,12,14],[38,30,40]]},{"id":"ilyas","ad":"Hz. İlyas","o":"Kavmini Ba'l putuna tapmaktan vazgeçirip Allah'a kulluğa çağırdı.","y":[[6,85,85],[37,123,132]]},{"id":"elyesa","ad":"Hz. Elyesa","o":"Seçkin ve hayırlı kullardan biri olarak anılır.","y":[[6,86,86],[38,48,48]]},{"id":"yunus","ad":"Hz. Yûnus","o":"Kavminden ayrılıp gemiye bindi, balık onu yuttu. Balığın karnında \"Senden başka ilâh yoktur\" diye dua edince kurtuldu.","y":[[10,98,98],[21,87,88],[37,139,148],[68,48,50]]},{"id":"zekeriya","ad":"Hz. Zekeriya","o":"Hz. Meryem'in bakımını üstlendi. Yaşlılığında evlat için dua etti; Yahya ile müjdelendi.","y":[[3,37,41],[19,2,11],[21,89,90]]},{"id":"yahya","ad":"Hz. Yahya","o":"Hz. Zekeriya'nın oğlu. Küçük yaşta hikmet verildi; anne babasına iyi davranan, takvalı bir peygamberdi.","y":[[3,39,39],[19,12,15],[21,90,90]]},{"id":"isa","ad":"Hz. Îsâ","o":"Babasız olarak Hz. Meryem'den doğdu, beşikte konuştu. İncil ona verildi; Allah'ın izniyle mucizeler gösterdi.","y":[[3,42,59],[4,156,159],[5,110,118],[19,16,36],[61,6,6]]},{"id":"muhammed","ad":"Hz. Muhammed ﷺ","o":"Son peygamber. Kur'an ona indirildi; Kur'an onu \"peygamberlerin sonuncusu\" ve \"âlemlere rahmet\" olarak tanıtır.","y":[[3,144,144],[33,40,40],[47,2,2],[48,29,29],[61,6,6]]}],"d":[{"id":"meryem","ad":"Hz. Meryem","o":"Kur'an'da adıyla anılan tek kadın; bir sûreye adı verilmiştir. Mabette yetişmesi ve Îsâ'yı dünyaya getirmesi anlatılır.","y":[[3,35,37],[3,42,47],[19,16,34],[66,12,12]]},{"id":"lokman","ad":"Lokman","o":"Hikmet verilmiş bilge bir kul. Oğluna verdiği öğütler anlatılır.","y":[[31,12,19]]},{"id":"kehf","ad":"Ashâb-ı Kehf (Mağara Arkadaşları)","o":"İnançları yüzünden mağaraya sığınan gençler yıllarca uyutulup sonra uyandırıldı.","y":[[18,9,26]]},{"id":"hizir","ad":"Hz. Mûsâ ve Salih Kul (Hızır)","o":"Hz. Mûsâ'nın kendisine ilim verilmiş bir kulla yolculuğu: gemi, çocuk ve duvar olayları.","y":[[18,60,82]]},{"id":"zulkarneyn","ad":"Zülkarneyn","o":"Doğuya ve batıya seferler yapan âdil hükümdar; Ye'cûc ve Me'cûc'a karşı sed yaptı.","y":[[18,83,98]]},{"id":"karun","ad":"Kârûn","o":"Servetiyle böbürlenen Kârûn, sarayıyla birlikte yerin dibine geçirildi.","y":[[28,76,82]]},{"id":"talut","ad":"Tâlût ve Câlût","o":"İsrâiloğullarına hükümdar seçilen Tâlût'un ordusu ile Câlût'un savaşı; Davud'un Câlût'u yenmesi.","y":[[2,246,251]]},{"id":"ademogullari","ad":"Âdem'in İki Oğlu","o":"Kardeşini kıskançlıkla öldüren kişi ve pişmanlığı; insanlık tarihindeki ilk cinayet.","y":[[5,27,31]]},{"id":"fil","ad":"Fil Sahipleri","o":"Kâbe'yi yıkmaya gelen fil ordusu, Allah'ın gönderdiği kuşlarla perişan edildi.","y":[[105,1,5]]},{"id":"sebe","ad":"Sebe Halkı","o":"Bolluk içindeyken nankörlük eden Sebe halkı sel ile cezalandırıldı.","y":[[34,15,19]]},{"id":"uhdud","ad":"Ashâb-ı Uhdûd (Hendek Sahipleri)","o":"İnananları ateş dolu hendeklere atan zalimler lanetlendi.","y":[[85,4,10]]}]};
  const nz = () => { try { return localStorage.getItem('hv_sure_sira') === 'nuzul'; } catch (e) { return false; } };
  const sira = (s) => (window.hvNuzulSira ? window.hvNuzulSira(s) : 0) || s;
  const sAd = (s) => { try { return (typeof hvSurahName === 'function' && hvSurahName(s)) || ('Sûre ' + s); } catch (e) { return 'Sûre ' + s; } };
  const e = (x) => (typeof hvEsc === 'function' ? hvEsc(x) : String(x));
  const aralik = (x) => x[1] + (x[2] > x[1] ? '–' + x[2] : '');
  const dizi = (ys) => ys.slice().sort((a, b) => nz() ? (sira(a[0]) - sira(b[0]) || a[1] - b[1]) : (a[0] - b[0] || a[1] - b[1]));
  // os/oa: okurken bulunulan yer (sûre, âyet) → gidilen yerden "okuduğuna dön" ile geri gelinir
  const cip = (x, os, oa) => '<button onclick="event.stopPropagation();hvKissaGit(' + x[0] + ',' + x[1] + (os ? ',' + os + ',' + oa : '') + ')">' + e(sAd(x[0])) + ' <i>' + aralik(x) + '</i></button>';

  /* ── iniş dönemi ── */
  const DONEM = [
    [1, 30, 'Mekke · ilk dönem', 'Davetin ilk yılları. Allah\'ın birliği, âhiret ve güzel ahlâk öne çıkar; sûreler kısa ve etkileyicidir.'],
    [31, 60, 'Mekke · orta dönem', 'Baskıların arttığı yıllar. Peygamber kıssalarıyla sabır ve teselli öğütlenir.'],
    [61, 86, 'Mekke · son dönem', 'Hicrete yakın en zor yıllar. İman esasları pekiştirilir, ümit ve sabır aşılanır.'],
    [87, 100, 'Medine · ilk dönem', 'Hicretten sonra yeni toplum kuruluyor. İbadet, aile ve toplum hükümleri iner.'],
    [101, 114, 'Medine · son dönem', 'İslâm toplumunun güçlendiği yıllar. Hukuk, barış antlaşmaları ve vedalaşma.']
  ];
  window.hvSureDonem = (s) => { const n = window.hvNuzulSira ? window.hvNuzulSira(s) : 0; if (!n) return null; const d = DONEM.find(x => n >= x[0] && n <= x[1]); return d ? { sira: n, ad: d[2], acik: d[3] } : null; };
  function donemKoy(id) {
    const w = document.getElementById('ayah-list-wrap'); if (!w) return;
    const eski = w.querySelector('.ks-donem'); if (eski) eski.remove();
    const d = window.hvSureDonem(id); if (!d) return;
    const el = document.createElement('div'); el.className = 'ks-donem';
    el.innerHTML = '<div class="ks-donem-ust"><span>İniş sırası <b>' + d.sira + '</b></span><i></i><span>' + e(d.ad) + '</span></div><div class="ks-donem-alt">' + e(d.acik) + '</div>';
    const yer = w.querySelector('.ok-ozet') || w.querySelector('.ok-gezin');
    if (yer) yer.after(el); else w.prepend(el);
  }

  /* ── okurken kıssa notu (yalnız peygamberler; başka yerde de geçenler) ── */
  function kissaKoy(id, mod) {
    const w = document.getElementById('ayah-list-wrap'); if (!w) return;
    w.querySelectorAll('.ks-not').forEach(x => x.remove());
    if (mod === 'bilgi' || mod === 'arapca') return;
    const konan = {};
    VERI.p.forEach((g) => g.y.forEach((r) => {
      if (r[0] !== id) return;
      let el = null; for (let a = r[1]; a >= Math.max(1, r[1] - 6) && !el; a--) el = document.getElementById('ayah-' + a);
      if (!el) return;
      const digerleri = dizi(g.y.filter(x => !(x[0] === r[0] && x[1] === r[1])));
      if (!digerleri.length) return;
      const n = document.createElement('div'); n.className = 'ks-not';
      n.innerHTML = '<div class="ks-bas"><span>📜</span><b>' + e(g.ad) + ' kıssası</b><small>' + (r[2] > r[1] ? aralik(r) + '. âyetler' : r[1] + '. âyet') + '</small></div>' +
        '<div class="ks-ac">Bu kıssa Kur\'an\'da başka yerlerde de anlatılır' + (nz() ? ' (iniş sırasıyla)' : '') + ':</div>' +
        '<div class="ks-cip">' + digerleri.map(x => cip(x, id, r[1])).join('') + '</div>' +
        '<button class="ks-tum" onclick="event.stopPropagation();hvPeyAc(\'' + g.id + '\')">Peygamberler ve Kıssaları ›</button>';
      n.addEventListener('click', (ev) => ev.stopPropagation());
      // aynı âyete birden çok not düşerse alt alta sıralansın
      const k = el.id; (konan[k] || el).after(n); konan[k] = n;
    }));
  }
  const git = (s, a) => { try { if (typeof hvAyetSecGit === 'function') hvAyetSecGit(s, a); else openSurahAt(s, a); } catch (x) { try { openSurahAt(s, a); } catch (y) {} } };
  /* v72.9: kıssanın başka geçtiği yere gidince solda "‹ Okuduğuna dön" düğmesi çıkar; dokununca kaldığın âyete döner.
     Oradan başka bir yere daha gidilse de düğme ilk okuduğun yeri hatırlar. */
  let donus = null;
  function donusCiz() {
    let b = document.getElementById('ks-geri');
    if (!donus) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('button'); b.id = 'ks-geri'; b.onclick = () => window.hvKissaDon(); document.body.appendChild(b); requestAnimationFrame(() => b.classList.add('gor')); }
    b.innerHTML = '<span>‹</span><b>Okuduğuna dön</b><small>' + e(sAd(donus.s)) + ' ' + donus.a + '. âyet</small>';
  }
  window.hvKissaDon = () => { const d = donus; donus = null; donusCiz(); if (d) git(d.s, d.a); };
  window.hvKissaGit = (s, a, os, oa) => {
    if (os && !donus) donus = { s: Number(os), a: Number(oa) || 1, ayni: Number(s) === Number(os), ayrildi: false };
    git(s, a); donusCiz();
  };
  // okuma ekranından çıkılınca ya da kişi kendisi eski sûreye dönünce düğme kalksın
  setInterval(() => {
    if (!donus) return;
    let sayfa = ''; try { sayfa = APP_STATE.currentPage; } catch (x) {}
    const O = window.hvOK || {};
    if (sayfa !== 'quran') { donus = null; donusCiz(); return; }
    if (Number(O.id) !== donus.s) donus.ayrildi = true;
    else if (donus.ayrildi && !donus.ayni) { donus = null; donusCiz(); }
  }, 1500);
  window.hvKissaUygula = (id, m) => { try { id = Number(id); if (m !== 'bilgi') donemKoy(id); kissaKoy(id, m); } catch (x) {} };

  /* ── Öğren › Peygamberler ve Kıssaları ── */
  let sekme = 'p', acik = '', ara = '';
  const tr = (s) => String(s || '').toLocaleLowerCase('tr').replace(/[âà]/g, 'a').replace(/[îì]/g, 'i').replace(/[ûù]/g, 'u');
  // 25 peygamberin lakap ve hayatı content.js'teki PEYGAMBERLER'den (aynı sıra); yoksa kısa özet
  const bilgi = (g) => { const i = VERI.p.indexOf(g); const P = (typeof PEYGAMBERLER !== 'undefined' && i >= 0) ? PEYGAMBERLER[i] : null; return { lakab: P ? P.lakab : '', info: P ? P.info : g.o }; };
  function kart(g, i) {
    const ac = acik === g.id, b = bilgi(g);
    return '<div class="pk-kart' + (ac ? ' ac' : '') + '" id="pk-' + g.id + '" onclick="hvPeyKart(\'' + g.id + '\')">' +
      '<div class="pk-ust"><span class="pk-no">' + (VERI.p.indexOf(g) >= 0 ? i + 1 : '✦') + '</span><span class="pk-ad"><b>' + e(g.ad) + '</b><small>' + (b.lakab ? e(b.lakab) + ' · ' : '') + g.y.length + ' yerde anlatılır</small></span><i>' + (ac ? '−' : '+') + '</i></div>' +
      '<div class="pk-oz">' + e(b.info) + '</div>' +
      (ac ? '<div class="pk-yer"><div class="pk-yer-b">Kur\'an\'da anlatıldığı yerler' + (nz() ? ' · iniş sırasıyla' : '') + '</div><div class="ks-cip">' + dizi(g.y).map(cip).join('') + '</div></div>' : '') +
      '</div>';
  }
  function liste() {
    const L = document.getElementById('pk-liste'); if (!L) return;
    const q = tr(ara.trim());
    const kaynak = q ? VERI.p.concat(VERI.d) : VERI[sekme];
    const sonuc = kaynak.filter(g => !q || tr(g.ad + ' ' + bilgi(g).lakab + ' ' + bilgi(g).info).includes(q));
    L.innerHTML = sonuc.length ? sonuc.map((g) => kart(g, VERI.p.indexOf(g))).join('') : '<div class="pk-bos">Sonuç bulunamadı.</div>';
    document.querySelectorAll('#pk-sekme button').forEach(b => b.classList.toggle('on', !q && b.dataset.s === sekme));
  }
  window.hvPeyKissaCiz = function () {
    const c = document.getElementById('peygamberler-content'); if (!c) return;
    if (!c.dataset.kuruldu) {
      c.dataset.kuruldu = '1';
      c.innerHTML = '<input id="pk-ara" class="ilm-ara" type="search" placeholder="🔍 Peygamber ya da kıssa ara…" oninput="hvPeyAra(this.value)">' +
        '<div id="pk-sekme" class="pk-sekme"><button data-s="p" onclick="hvPeySekme(\'p\')">Peygamberler <small>25</small></button><button data-s="d" onclick="hvPeySekme(\'d\')">Diğer Kıssalar <small>' + VERI.d.length + '</small></button></div>' +
        '<div id="pk-liste"></div>' +
        '<div class="ilm-not">Peygamberler yaklaşık tarih sırasıyla dizilmiştir. Bir karta dokununca kıssanın Kur\'an\'da anlatıldığı yerler açılır; bir yere dokununca o sûrenin o âyeti açılır. Âyet aralıkları yaklaşıktır. Kaynak: Diyanet İlmihali, TDV İslâm Ansiklopedisi.</div>';
    }
    liste();
    if (acik) setTimeout(() => { const k = document.getElementById('pk-' + acik); if (k) k.scrollIntoView({ block: 'center' }); }, 120);
  };
  window.hvPeyKart = (id) => { acik = acik === id ? '' : id; liste(); };
  window.hvPeySekme = (s) => { sekme = s; ara = ''; acik = ''; const a = document.getElementById('pk-ara'); if (a) a.value = ''; liste(); };
  window.hvPeyAra = (v) => { ara = v || ''; liste(); };
  window.hvPeyAc = (id) => { acik = id; sekme = VERI.p.some(g => g.id === id) ? 'p' : 'd'; ara = ''; try { navigateTo('peygamberler'); } catch (x) {} };
  window.HV_PEYGAMBER = VERI;
  const kaydet = () => { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['peygamberler'] = window.hvPeyKissaCiz; };
  if (window.FEATURE_ROUTES) kaydet(); else document.addEventListener('DOMContentLoaded', kaydet);
})();
