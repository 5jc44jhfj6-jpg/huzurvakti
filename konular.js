/* ═══════════════════════════════════════════════════════════════
   v72.8 — KONULARA GÖRE KUR'AN
   31 konu (namaz, sabır, anne-baba, rızık, tövbe…) ve her konunun Kur'an'daki
   başlıca âyetleri. Konuya dokununca âyetlerin Diyanet meâli alt alta açılır;
   "Âyete git" ile sûrede o âyet açılır. Âyetler Diyanet meâlinde tek tek
   okunarak konuya uygunluğu kontrol edilmiştir.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const KONU = [{"g":"İbadet","ad":"Namaz","ik":"🕌","y":[[2,45,45],[2,238,238],[11,114,114],[17,78,78],[20,14,14],[29,45,45],[23,1,2]]},{"g":"İbadet","ad":"Oruç","ik":"🌙","y":[[2,183,185],[2,187,187]]},{"g":"İbadet","ad":"Zekât ve Sadaka","ik":"🤲","y":[[2,261,262],[2,274,274],[3,92,92],[9,60,60],[9,103,103],[64,16,16]]},{"g":"İbadet","ad":"Hac","ik":"🕋","y":[[2,196,197],[3,96,97],[22,27,27]]},{"g":"İbadet","ad":"Dua","ik":"🙏","y":[[2,186,186],[2,201,201],[3,8,8],[7,55,55],[25,74,74],[40,60,60]]},{"g":"İbadet","ad":"Zikir ve Kalp Huzuru","ik":"📿","y":[[13,28,28],[2,152,152],[33,41,42],[63,9,9]]},{"g":"İman","ad":"Allah'ın Birliği","ik":"☝️","y":[[112,1,4],[2,255,255],[59,22,24]]},{"g":"İman","ad":"Ölüm ve Âhiret","ik":"⏳","y":[[3,185,185],[21,35,35],[29,57,57],[62,8,8],[50,19,19]]},{"g":"İman","ad":"Kur'an Hakkında","ik":"📖","y":[[2,2,2],[4,82,82],[15,9,9],[17,9,9],[38,29,29],[54,17,17]]},{"g":"İman","ad":"Peygamberimiz","ik":"🌹","y":[[9,128,128],[21,107,107],[33,21,21],[33,40,40],[68,4,4]]},{"g":"İman","ad":"Tevekkül","ik":"🕊️","y":[[3,159,159],[8,2,2],[33,3,3],[65,3,3]]},{"g":"Umut ve Sabır","ad":"Sabır","ik":"🌿","y":[[2,153,153],[2,155,157],[3,200,200],[16,127,127],[39,10,10],[103,1,3]]},{"g":"Umut ve Sabır","ad":"Zorluk ve Kolaylık","ik":"🌅","y":[[94,5,6],[2,286,286],[65,7,7],[12,87,87]]},{"g":"Umut ve Sabır","ad":"Tövbe ve Bağışlanma","ik":"💧","y":[[39,53,53],[3,135,135],[4,110,110],[25,70,70],[66,8,8]]},{"g":"Umut ve Sabır","ad":"Şükür","ik":"✨","y":[[14,7,7],[2,152,152],[16,18,18],[31,12,12]]},{"g":"Umut ve Sabır","ad":"Rızık","ik":"🌾","y":[[11,6,6],[29,60,60],[34,39,39],[51,58,58],[65,2,3]]},{"g":"Aile ve Toplum","ad":"Anne ve Baba","ik":"👪","y":[[17,23,24],[31,14,15],[46,15,15],[29,8,8],[2,83,83]]},{"g":"Aile ve Toplum","ad":"Evlilik ve Aile","ik":"💍","y":[[30,21,21],[4,1,1],[4,19,19],[2,187,187],[66,6,6]]},{"g":"Aile ve Toplum","ad":"Yetim, Yoksul ve Komşu","ik":"🏘️","y":[[4,36,36],[2,177,177],[76,8,9],[93,9,10],[107,1,3]]},{"g":"Aile ve Toplum","ad":"Adalet","ik":"⚖️","y":[[4,58,58],[4,135,135],[5,8,8],[16,90,90],[49,9,9]]},{"g":"Aile ve Toplum","ad":"Emanet ve Söz","ik":"🤝","y":[[4,58,58],[17,34,34],[23,8,8],[61,2,3]]},{"g":"Aile ve Toplum","ad":"Helal Kazanç ve Ticaret","ik":"🪙","y":[[2,188,188],[2,275,275],[4,29,29],[17,35,35],[83,1,3]]},{"g":"Ahlâk","ad":"Güzel Söz ve Davranış","ik":"💬","y":[[2,83,83],[17,53,53],[25,63,63],[41,34,34]]},{"g":"Ahlâk","ad":"Kibir ve Alçakgönüllülük","ik":"🌱","y":[[17,37,37],[25,63,63],[31,18,19]]},{"g":"Ahlâk","ad":"Affetmek ve Öfke","ik":"🌊","y":[[3,134,134],[7,199,199],[24,22,22],[42,37,37],[42,40,40]]},{"g":"Ahlâk","ad":"Gıybet, Zan ve Alay","ik":"🤐","y":[[49,11,12],[104,1,1]]},{"g":"Ahlâk","ad":"İsraf ve Ölçülülük","ik":"🍃","y":[[7,31,31],[17,26,27],[25,67,67]]},{"g":"Ahlâk","ad":"Doğruluk ve Şahitlik","ik":"🧭","y":[[2,283,283],[4,135,135],[22,30,30],[25,72,72]]},{"g":"Ahlâk","ad":"İçki ve Kumar","ik":"🚫","y":[[2,219,219],[5,90,91]]},{"g":"İlim ve Tefekkür","ad":"İlim ve Okumak","ik":"🎓","y":[[96,1,5],[20,114,114],[39,9,9],[58,11,11]]},{"g":"İlim ve Tefekkür","ad":"Yaratılış ve Kâinat","ik":"🌌","y":[[3,190,191],[21,30,30],[30,22,22],[36,38,40],[16,10,11]]}];
  const e = (x) => (typeof hvEsc === 'function' ? hvEsc(x) : String(x));
  const sAd = (s) => { try { return (typeof hvSurahName === 'function' && hvSurahName(s)) || ('Sûre ' + s); } catch (x) { return 'Sûre ' + s; } };
  const meal = (s, a, b) => { try { const o = []; let son = ''; for (let i = a; i <= b; i++) { const m = hvMeal(s, i) || ''; if (m && m !== son) o.push(m); son = m; } return o.join(' '); } catch (x) { return ''; } };
  const aralik = (y) => y[1] + (y[2] > y[1] ? '–' + y[2] : '');
  let acik = -1;
  function ciz() {
    const kok = document.getElementById('konular-root'); if (!kok) return;
    const gruplar = [...new Set(KONU.map(k => k.g))];
    kok.innerHTML = gruplar.map(g => '<div class="kn-grup">' + e(g) + '</div><div class="kn-izgara">' +
      KONU.map((k, i) => k.g !== g ? '' : '<button class="kn-cip' + (acik === i ? ' on' : '') + '" onclick="hvKonuAc(' + i + ')"><span>' + k.ik + '</span><b>' + e(k.ad) + '</b><small>' + k.y.length + ' âyet</small></button>').join('') + '</div>' +
      (acik >= 0 && KONU[acik].g === g ? detay(acik) : '')).join('') +
      '<div class="ilm-not">Her konunun başlıca âyetleri seçilmiştir; konunun geçtiği bütün âyetler değildir. Meâl: Diyanet İşleri Başkanlığı.</div>';
    if (!window.DIYANET_MEAL && typeof hvMealHazir === 'function') hvMealHazir().then((ok) => { if (ok && document.getElementById('konular-root')) ciz(); }).catch(() => {});
  }
  function detay(i) {
    const k = KONU[i];
    return '<div class="kn-detay" id="kn-detay"><div class="kn-d-bas"><span>' + k.ik + '</span><b>' + e(k.ad) + '</b><button onclick="hvKonuAc(' + i + ')" aria-label="Kapat">✕</button></div>' +
      k.y.map(y => '<div class="kn-ayet"><div class="kn-ref">' + e(sAd(y[0])) + ' Sûresi · ' + aralik(y) + '. âyet</div><div class="kn-meal">' + e(meal(y[0], y[1], y[2]) || 'Meâl yükleniyor…') + '</div><button class="kn-git" onclick="openSurahAt(' + y[0] + ',' + y[1] + ')">📖 Âyete git</button></div>').join('') +
      '</div>';
  }
  window.hvKonuAc = (i) => { acik = acik === i ? -1 : i; ciz(); if (acik >= 0) setTimeout(() => { const d = document.getElementById('kn-detay'); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60); };
  window.HV_KONU = KONU;
  const kaydet = () => { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['konular'] = ciz; };
  if (window.FEATURE_ROUTES) kaydet(); else document.addEventListener('DOMContentLoaded', kaydet);
})();

/* ═════ v73.3 · Âyet menüsünde "🔗 İlgili âyetler" ═════
   Kaynak yalnızca uygulamadaki kendi verimiz: Konulara Göre Kur'an (31 konu) + Peygamber kıssaları.
   Okunan âyet bunlardan birinde geçiyorsa menüde çıkar; geçmiyorsa hiç görünmez. Meâller Diyanet. */
(function () {
  let acik = '';
  const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const sAd = (s) => { try { const x = (ALL_114_SURAHS || []).find(z => Number(z.id) === Number(s)); return x ? x.name : s + '. sûre'; } catch (e) { return s + '. sûre'; } };
  const meal = (s, a) => { const M = window.DIYANET_MEAL; const x = M && M[s]; const t = Array.isArray(x) ? x[a - 1] : (x && x[a]); return t || ''; };
  const icinde = (y, s, n) => y[0] === Number(s) && n >= y[1] && n <= y[2];
  function bul(s, n) {
    const g = [];
    (window.HV_KONU || []).forEach((k, i) => { if (k.y.some(y => icinde(y, s, n))) { const d = k.y.filter(y => !icinde(y, s, n)); if (d.length) g.push({ key: 'k' + i, ad: k.ad, ik: k.ik || '🗂️', tur: 'konu', y: d }); } });
    const P = window.HV_PEYGAMBER; if (P) ['p', 'd'].forEach(t => (P[t] || []).forEach(p => { if (p.y.some(y => icinde(y, s, n))) { const d = p.y.filter(y => !icinde(y, s, n)); if (d.length) g.push({ key: 'p' + p.id, ad: p.ad, ik: '📜', tur: 'kıssa', y: d }); } }));
    return g;
  }
  function ciz(s, n) {
    const g = bul(s, n); if (!g.length) return '';
    if (acik && !g.some(x => x.key === acik)) acik = '';
    return `<div id="ok-ilg" class="ok-ilg"><div class="ok-ilg-bas">🔗 İlgili âyetler</div>
      <div class="ok-ilg-cip">${g.map(x => `<button class="${x.key === acik ? 'on' : ''}" onclick="hvIlgiliAc('${x.key}',${s},${n})">${x.ik} ${esc(x.ad)}${x.tur === 'kıssa' ? ' kıssası' : ''} <small>${x.y.length}</small></button>`).join('')}</div>
      ${acik ? (() => { const x = g.find(z => z.key === acik); return `<div class="ok-ilg-lis">${x.y.map(y => { const m = meal(y[0], y[1]); return `<button onclick="hvIlgiliGit(${y[0]},${y[1]},${s},${n})"><b>${esc(sAd(y[0]))} ${y[1]}${y[2] > y[1] ? '–' + y[2] : ''}</b>${m ? `<span>${esc(m)}</span>` : ''}<i>›</i></button>`; }).join('')}</div>`; })() : ''}
    </div>`;
  }
  window.hvIlgiliHtml = (s, n) => { try { return ciz(s, n); } catch (e) { return ''; } };
  window.hvIlgiliAc = (k, s, n) => {
    acik = acik === k ? '' : k;
    const kutu = document.getElementById('ok-ilg'); if (!kutu) return;
    const yap = () => { const t = document.createElement('div'); t.innerHTML = ciz(s, n); const y = t.firstElementChild; if (y) kutu.replaceWith(y); };
    if (acik && !window.DIYANET_MEAL && typeof hvMealHazir === 'function') hvMealHazir().then(yap); else yap();
    if (acik) setTimeout(() => { const l = document.querySelector('#ok-ilg .ok-ilg-lis'); if (l) l.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 60);
  };
  window.hvIlgiliGit = (s, a, os, oa) => { acik = ''; try { hvOkKapat(); } catch (e) {} setTimeout(() => { if (window.hvKissaGit) hvKissaGit(s, a, os, oa); else openSurahAt(s, a); }, 200); };
})();
