/* ═══════════════════════════════════════════════════════════════
   v72.7 — SORULARLA İLMİHAL
   Sık sorulan sorulara kısa cevaplar. Hanefî mezhebi esas alınmıştır,
   Diyanet İşleri Başkanlığı'nın ilmihal ve fetvalarıyla uyumlu yazılmıştır.
   Özel durumlar için Diyanet ALO 190 Fetva Hattı önerilir.
   Biçim: { k: kategori, s: soru, c: cevap, y: kaynak, a: arama kelimeleri }
   ═══════════════════════════════════════════════════════════════ */
const HV_ILMIHAL_KAT = ['Oruç', 'Abdest', 'Gusül', 'Namaz', 'Zekât', 'Fitre', 'Kurban', 'Cenaze', 'Hac', 'Kur\'an'];

const HV_ILMIHAL = [
  // ── ORUÇ ──
  { k: 'Oruç', s: 'Unutarak yer içersem oruç bozulur mu?',
    c: 'Hayır, bozulmaz. Oruçlu olduğunu unutarak yiyip içen kişi hatırlayınca hemen bırakır ve orucuna devam eder. Kaza da kefaret de gerekmez.',
    y: 'Diyanet İlmihali, Oruç · Buhârî, Savm 26', a: 'unutmak yemek icmek' },
  { k: 'Oruç', s: 'Sahura kalkamazsam oruç tutabilir miyim?',
    c: 'Evet. Sahur sünnettir, orucun şartı değildir. Sahura kalkamayan kişi orucuna niyet ederek tutar. Hanefî mezhebine göre Ramazan orucu için niyet, gün içinde öğle vaktine yakın bir zamana (kuşluk vaktinin sonuna) kadar yapılabilir.',
    y: 'Diyanet İlmihali, Oruç', a: 'sahur kalkamamak niyet' },
  { k: 'Oruç', s: 'Oruca niyet nasıl edilir?',
    c: 'Niyet, kalben o günün orucunu tutmaya karar vermektir. Dille söylemek şart değildir ama güzeldir: "Niyet ettim Allah rızası için bugünkü Ramazan orucunu tutmaya." Sahura kalkmak da niyet yerine geçer.',
    y: 'Diyanet İlmihali, Oruç', a: 'niyet sahur' },
  { k: 'Oruç', s: 'Diş fırçalamak orucu bozar mı?',
    c: 'Macun ve su yutulmadığı sürece diş fırçalamak orucu bozmaz. Yine de boğaza kaçma ihtimaline karşı dikkatli olmak, mümkünse misvak ya da macunsuz fırça kullanmak daha uygundur.',
    y: 'Diyanet İşleri Başkanlığı, Oruç ile ilgili fetvalar', a: 'dis fircalamak macun misvak' },
  { k: 'Oruç', s: 'İğne olmak ve kan aldırmak orucu bozar mı?',
    c: 'Besleyici olmayan, tedavi amaçlı iğneler orucu bozmaz. Gıda yerine geçen serum gibi besleyici iğneler orucu bozar. Kan aldırmak ve kan vermek orucu bozmaz; ancak kişiyi halsiz bırakacaksa iftardan sonraya bırakmak daha iyidir.',
    y: 'Diyanet İşleri Başkanlığı, Din İşleri Yüksek Kurulu kararları', a: 'igne serum kan aldirmak kan vermek' },
  { k: 'Oruç', s: 'Göz damlası orucu bozar mı?',
    c: 'Hayır. Göz damlası ve göze sürülen merhem orucu bozmaz.',
    y: 'Diyanet İşleri Başkanlığı, Oruç ile ilgili fetvalar', a: 'goz damlasi merhem' },
  { k: 'Oruç', s: 'Oruçluyken kusarsam orucum bozulur mu?',
    c: 'Kendiliğinden kusmak orucu bozmaz. Kasten ve ağız dolusu kusmak ise orucu bozar; bu durumda yalnızca kaza gerekir, kefaret gerekmez.',
    y: 'Diyanet İlmihali, Oruç · Tirmizî, Savm 25', a: 'kusmak' },
  { k: 'Oruç', s: 'Hangi durumlarda kaza ve kefaret gerekir?',
    c: 'Ramazan orucunu, mazeret olmadan bilerek yiyip içerek ya da cinsel ilişkiyle bozan kişiye hem kaza hem kefaret gerekir. Kefaret, ara vermeden 60 gün oruç tutmaktır; buna gücü yetmeyen 60 fakiri doyurur. Yalnızca kaza gerektiren durumlar ise yenip içilmesi âdet olmayan bir şeyi yutmak gibi hallerdir.',
    y: 'Diyanet İlmihali, Oruç', a: 'kefaret kaza 60 gun' },
  { k: 'Oruç', s: 'Hasta ve yaşlılar nasıl oruç tutar? Fidye nedir?',
    c: 'Geçici hastalığı olan, iyileşince tutamadığı günleri kaza eder. İyileşme ümidi olmayan hasta ile oruç tutamayacak kadar yaşlı kişi oruç tutmaz; her gün için bir fakire fidye (bir fitre miktarı) verir. Fidye miktarını Diyanet her yıl açıklar.',
    y: 'Bakara 2/184 · Diyanet İlmihali', a: 'hasta yasli fidye' },
  { k: 'Oruç', s: 'Yolculukta oruç tutmak zorunda mıyım?',
    c: 'Yolcu (90 km ve üzeri yolculuğa çıkan) Ramazan orucunu tutmayabilir, sonra kaza eder. Zorlanmayacaksa tutması daha faziletlidir.',
    y: 'Bakara 2/184-185 · Diyanet İlmihali', a: 'yolculuk sefer yolcu' },
  { k: 'Oruç', s: 'Hamile ve emziren kadın oruç tutmalı mı?',
    c: 'Kendisine ya da bebeğine zarar gelmesinden endişe eden hamile veya emziren kadın oruç tutmaz, daha sonra kaza eder.',
    y: 'Diyanet İlmihali, Oruç', a: 'hamile emziren gebe' },
  { k: 'Oruç', s: 'Özel hâlindeki kadın oruç tutar mı?',
    c: 'Hayız (âdet) ve nifas (lohusalık) hâlindeki kadın oruç tutmaz ve namaz kılmaz. Tutamadığı oruçları sonra kaza eder; kılamadığı namazları ise kaza etmez.',
    y: 'Diyanet İlmihali · Müslim, Hayz 69', a: 'adet hayiz lohusa kadin' },

  // ── ABDEST ──
  { k: 'Abdest', s: 'Abdestin farzları nelerdir?',
    c: 'Dörttür: 1) Yüzü bir kez yıkamak, 2) Kolları dirseklerle birlikte yıkamak, 3) Başın dörtte birini meshetmek, 4) Ayakları topuklarla birlikte yıkamak.',
    y: 'Mâide 5/6 · Diyanet İlmihali, Abdest', a: 'abdest farz' },
  { k: 'Abdest', s: 'Abdestin sünnetleri nelerdir?',
    c: 'Başlıcaları: niyet etmek, besmele çekmek, elleri bileklere kadar yıkamak, ağza ve buruna su vermek, misvak kullanmak, kulakları ve boynu meshetmek, organları üçer kez yıkamak, sırayla ve ara vermeden almak.',
    y: 'Diyanet İlmihali, Abdest', a: 'abdest sunnet' },
  { k: 'Abdest', s: 'Abdesti neler bozar?',
    c: 'Hanefî mezhebine göre: idrar, dışkı, yel gibi önden ve arkadan çıkan her şey; vücudun bir yerinden kan, irin gibi akıntının çıkıp akması; ağız dolusu kusmak; bayılmak, sarhoş olmak; yaslanarak ya da uzanarak uyumak; rükûlu-secdeli bir namazda sesli gülmek ve cinsel ilişki.',
    y: 'Diyanet İlmihali, Abdest', a: 'abdest bozan kan uyku' },
  { k: 'Abdest', s: 'Oje ve tırnak cilası abdeste engel mi?',
    c: 'Suyun tırnağa ulaşmasına engel olan oje varken alınan abdest geçerli olmaz. Abdest almadan önce çıkarılması gerekir. Kına ise renk verir, tabaka oluşturmaz; abdeste engel değildir.',
    y: 'Diyanet İşleri Başkanlığı, Taharet ile ilgili fetvalar', a: 'oje cila kina tirnak kadin' },
  { k: 'Abdest', s: 'Diş dolgusu ve kaplama abdeste ve gusle engel mi?',
    c: 'Hayır. Tedavi amacıyla yaptırılan dolgu, kaplama ve köprü abdeste de gusle de engel değildir.',
    y: 'Diyanet İşleri Başkanlığı, Din İşleri Yüksek Kurulu', a: 'dis dolgu kaplama kopru gusul' },
  { k: 'Abdest', s: 'Mest üzerine mesh nasıl yapılır, süresi ne kadar?',
    c: 'Mestler abdestli iken giyilmiş olmalıdır. Mesh süresi mukim için 24 saat, yolcu için 72 saattir; süre mestleri giydikten sonra abdestin ilk bozulduğu andan başlar. Islak elin üç parmağıyla ayak parmaklarının ucundan bileğe doğru, mestin üstüne bir kez çekilir.',
    y: 'Diyanet İlmihali, Mesh', a: 'mest mesh corap' },
  { k: 'Abdest', s: 'Yaranın üzerindeki bandaj ya da alçı ne olur?',
    c: 'Yıkanması ya da çıkarılması zarar verecek yara bandı, sargı veya alçının üzerine ıslak elle mesh edilir. Bu mesh, altındaki yeri yıkamak yerine geçer.',
    y: 'Diyanet İlmihali, Sargı üzerine mesh', a: 'yara bant sargi alci cebire' },
  { k: 'Abdest', s: 'Teyemmüm ne zaman ve nasıl yapılır?',
    c: 'Su bulunamadığında ya da su kullanmak hastalığa zarar vereceğinde abdest veya gusül yerine teyemmüm yapılır. Niyet edilir; eller temiz toprağa (taş, kum gibi toprak cinsinden şeylere) vurulup yüze sürülür, ikinci kez vurulup kollar dirseklerle birlikte meshedilir.',
    y: 'Mâide 5/6 · Diyanet İlmihali, Teyemmüm', a: 'teyemmum su yok toprak' },

  // ── GUSÜL ──
  { k: 'Gusül', s: 'Guslün farzları nelerdir?',
    c: 'Hanefî mezhebine göre üçtür: 1) Ağza su vermek (mazmaza), 2) Buruna su vermek (istinşak), 3) Bütün vücudu kuru yer kalmayacak şekilde yıkamak.',
    y: 'Diyanet İlmihali, Gusül', a: 'gusul boy abdesti farz' },
  { k: 'Gusül', s: 'Gusül ne zaman gerekir?',
    c: 'Cünüplük hâlinde (cinsel ilişki veya ihtilam sonrası) ve kadınlarda âdet ile lohusalık bittiğinde gusül farz olur. Cuma ve bayram namazı için gusül almak sünnettir.',
    y: 'Diyanet İlmihali, Gusül', a: 'gusul cunup ihtilam adet' },
  { k: 'Gusül', s: 'Gusül nasıl alınır?',
    c: 'Niyet edilir, besmele çekilir; eller ve avret yerleri yıkanır, vücutta pislik varsa temizlenir. Namaz abdesti gibi abdest alınır. Sonra ağza ve buruna üçer kez su verilir, baştan başlanarak bütün vücut üç kez yıkanır; kuru yer kalmamasına dikkat edilir.',
    y: 'Diyanet İlmihali, Gusül', a: 'gusul nasil alinir' },

  // ── NAMAZ ──
  { k: 'Namaz', s: 'Kur\'an\'da namazın beş vakit olduğu yazıyor mu?',
    c: '"Beş" sayısı Kur\'an\'da geçmez; ancak namaz vakitlerine işaret eden âyetler vardır: "Gündüzün iki ucunda ve gecenin gündüze yakın saatlerinde namaz kıl" (Hûd 114), "Güneşin batıya kaymasından gecenin karanlığına kadar namazı kıl, sabah namazını da kıl" (İsrâ 78). Rûm 17-18\'de akşam, sabah, ikindi ve öğle vakitleri anılır; Bakara 238\'de "Namazlara ve orta namaza devam edin" buyrulur. Namazın beş vakit oluşu, rekâtları ve kılınışı Peygamberimizin uygulamasıyla (sünnetle) belirlenmiştir. Bütün mezhepler ve Diyanet bu konuda görüş birliği içindedir.',
    y: 'Hûd 11/114 · İsrâ 17/78 · Rûm 30/17-18 · Bakara 2/238 · Diyanet İlmihali', a: 'bes vakit kuranda yaziyor mu namaz vakitleri ayet' },
  { k: 'Namaz', s: 'Namazın nasıl kılınacağı Kur\'an\'da anlatılıyor mu?',
    c: 'Ana unsurları Kur\'an\'da geçer: abdest (Mâide 6), su yoksa teyemmüm (Nisâ 43), kıbleye yönelmek (Bakara 144), kıyam (Bakara 238), rükû ve secde (Hac 77), Kur\'an okumak (Müzzemmil 20), yolculukta kısaltmak (Nisâ 101). Rekât sayıları, Fâtiha ve zamm-ı sûre okumak, Tahiyyat, selam ve hareketlerin sırası ise Peygamberimizin uygulamasından öğrenilmiştir. Peygamberimiz "Beni nasıl namaz kılarken görüyorsanız siz de öyle kılın" buyurmuştur.',
    y: 'Mâide 5/6 · Bakara 2/144, 238 · Hac 22/77 · Buhârî, Ezân 18', a: 'namaz nasil kilinir kuranda rekat sunnet' },
  { k: 'Namaz', s: 'Cemaatle kılmak ile tek başına kılmak arasında fark var mı?',
    c: 'İkisi de geçerli namazdır; ancak cemaatle kılmanın fazileti çok büyüktür. Kur\'an\'da "Rükû edenlerle birlikte rükû edin" buyrulur (Bakara 43). Peygamberimiz "Cemaatle kılınan namaz, tek başına kılınandan yirmi yedi derece daha faziletlidir" buyurmuştur. Hanefî mezhebine göre beş vakit namazı cemaatle kılmak erkekler için sünnet-i müekkededir. Cuma namazı ise ancak cemaatle kılınır ve erkeklere farzdır.',
    y: 'Bakara 2/43 · Nisâ 4/102 · Buhârî, Ezân 30 · Müslim, Mesâcid 249 · Diyanet İlmihali', a: 'cemaat tek basina fark fazilet 27 derece cuma' },
  { k: 'Namaz', s: 'Namazın farzları nelerdir?',
    c: 'On ikidir. Namazdan önceki şartlar: hadesten taharet (abdest/gusül), necasetten taharet (temizlik), setr-i avret (örtünme), istikbâl-i kıble (kıbleye dönmek), vakit ve niyet. Namazın içindeki rükünler: iftitah tekbiri, kıyam, kırâat, rükû, secde ve son oturuş (ka\'de-i ahîre).',
    y: 'Diyanet İlmihali, Namaz', a: 'namaz farz sart rukun' },
  { k: 'Namaz', s: 'Namazı neler bozar?',
    c: 'Başlıcaları: konuşmak, bir şey yiyip içmek, göğsü kıbleden çevirmek, dışarıdan bakan kişinin namazda olmadığını düşüneceği kadar fazla hareket (amel-i kesîr), sesli gülmek, abdestin bozulması ve namazın bir farzını yerine getirmemek.',
    y: 'Diyanet İlmihali, Namaz', a: 'namaz bozan konusmak gulmek' },
  { k: 'Namaz', s: 'Sehiv secdesi ne zaman ve nasıl yapılır?',
    c: 'Namazda bir vâcip yanılarak terk edilir ya da bir farz geciktirilirse sehiv secdesi gerekir. Son oturuşta Ettehiyyâtü okunduktan sonra sağa selam verilir, iki secde yapılır, tekrar oturup Ettehiyyâtü, Salli-Bârik ve dualar okunarak iki tarafa selam verilir.',
    y: 'Diyanet İlmihali, Sehiv secdesi', a: 'sehiv secdesi yanilma unutma' },
  { k: 'Namaz', s: 'Kaza namazı nasıl kılınır?',
    c: 'Vaktinde kılınamayan farz namazlar ile vitir namazı kaza edilir; sünnetler kaza edilmez. Niyet ederken hangi namaz olduğu belirtilir, örneğin "Kılamadığım ilk sabah namazının farzını kaza etmeye". Güneş doğarken, tam tepedeyken ve batarken kaza namazı kılınmaz.',
    y: 'Diyanet İlmihali, Kaza namazı', a: 'kaza namazi nasil' },
  { k: 'Namaz', s: 'Yolculukta namaz nasıl kılınır?',
    c: '90 km ve daha uzak bir yere gidip orada 15 günden az kalacak kişi yolcu (seferî) sayılır. Dört rekâtlı farzları (öğle, ikindi, yatsı) iki rekât kılar; sabah ve akşamın farzı ile vitir değişmez. Vakit müsaitse sünnetler de kılınabilir.',
    y: 'Diyanet İlmihali, Seferîlik', a: 'yolculuk seferi kisaltma' },
  { k: 'Namaz', s: 'İmama sonradan yetişen kişi ne yapar?',
    c: 'İmamı rükûda yakalayan o rekâtı kılmış sayılır. Kaçırdığı rekâtlar varsa imam iki tarafa selam verdikten sonra selam vermeden kalkar ve eksik rekâtlarını kendi başına tamamlar.',
    y: 'Diyanet İlmihali, Cemaatle namaz', a: 'mesbuk cemaat gec kalmak' },
  { k: 'Namaz', s: 'Cuma namazı kimlere farzdır?',
    c: 'Erkek, akıllı ve ergen, sağlıklı ve yolcu olmayan (mukim) Müslümanlara farzdır. Kadınlara, yolculara ve hastalara farz değildir; bunlar kılarlarsa o günün öğle namazı yerine geçer.',
    y: 'Cuma 62/9 · Diyanet İlmihali', a: 'cuma namazi kadin yolcu' },
  { k: 'Namaz', s: 'Vitir namazı nasıl kılınır?',
    c: 'Hanefî mezhebine göre vâciptir, yatsıdan sonra kılınır ve üç rekâttır. İkinci rekâtta oturulup Ettehiyyâtü okunur; üçüncü rekâtta Fâtiha ve zammı sûreden sonra tekbir alınıp Kunut duaları okunur, sonra rükûya gidilir.',
    y: 'Diyanet İlmihali, Vitir', a: 'vitir kunut vacip' },
  { k: 'Namaz', s: 'Teravih namazı kaç rekâttır?',
    c: 'Ramazan gecelerinde yatsıdan sonra, vitirden önce kılınan sünnet bir namazdır. Hanefî mezhebinde yirmi rekâttır; ikişer ya da dörder rekâtta bir selam verilir. Cemaatle kılınması sünnettir, evde de kılınabilir.',
    y: 'Diyanet İlmihali, Teravih', a: 'teravih ramazan rekat' },
  { k: 'Namaz', s: 'Namazda Fâtiha\'dan sonra ne kadar okunmalı?',
    c: 'Farzların ilk iki rekâtında, vitir ve nafilelerin her rekâtında Fâtiha\'dan sonra en az üç kısa âyet ya da bu uzunlukta bir âyet okumak vâciptir.',
    y: 'Diyanet İlmihali, Kırâat', a: 'zammi sure kiraat okumak' },
  { k: 'Namaz', s: 'Hangi vakitlerde namaz kılınmaz?',
    c: 'Güneş doğarken (doğuştan yaklaşık 45 dakika sonrasına kadar), güneş tam tepedeyken ve güneş batarken namaz kılınmaz. Ayrıca sabah namazının farzından sonra güneş doğana kadar ve ikindinin farzından sonra akşama kadar nafile namaz kılınmaz; kaza kılınabilir.',
    y: 'Diyanet İlmihali, Kerahat vakitleri · Müslim, Müsâfirîn 293', a: 'kerahat vakit mekruh' },
  { k: 'Namaz', s: 'Âdet gören kadın namaz kılar mı, kaza eder mi?',
    c: 'Hayız ve lohusalık hâlinde namaz kılınmaz ve bu namazlar kaza edilmez.',
    y: 'Diyanet İlmihali · Müslim, Hayz 69', a: 'adet kadin namaz kaza' },

  // ── ZEKÂT ──
  { k: 'Zekât', s: 'Zekât kimlere farzdır?',
    c: 'Temel ihtiyaçları ve borçları dışında nisap miktarı (80,18 gram altın ya da değeri) mala sahip olan ve bu malın üzerinden bir kamerî yıl geçen akıllı, ergen Müslümana farzdır. Oranı kırkta birdir (%2,5).',
    y: 'Diyanet İlmihali, Zekât', a: 'zekat nisap altin yuzde' },
  { k: 'Zekât', s: 'Zekât kimlere verilir, kimlere verilmez?',
    c: 'Fakirlere, yoksullara, borçlulara, yolda kalmışlara ve Allah yolunda olanlara verilir. Kişinin anne-babasına, dede ve ninesine, çocuklarına, torunlarına ve eşine zekât verilmez; kardeş, amca, teyze gibi diğer akrabalara ihtiyaç sahibiyse verilebilir ve daha faziletlidir.',
    y: 'Tevbe 9/60 · Diyanet İlmihali', a: 'zekat kime verilir akraba' },

  // ── FİTRE ──
  { k: 'Fitre', s: 'Fitre nedir, ne kadardır?',
    c: 'Ramazan bayramına ulaşan ve temel ihtiyaçları dışında nisap miktarı mala sahip olan Müslümanın kendisi ve bakmakla yükümlü olduğu küçük çocukları için verdiği sadakadır (zekâttaki gibi bir yıl şartı yoktur). Miktarını Diyanet her yıl açıklar; uygulamadaki Zekât ve Fitre bölümünden bakabilirsin.',
    y: 'Diyanet İlmihali, Sadaka-i fıtr', a: 'fitre sadakai fitir miktar' },
  { k: 'Fitre', s: 'Fitre ne zaman verilir?',
    c: 'Bayram namazından önce verilmesi sünnettir. İhtiyaç sahibinin bayram ihtiyacını karşılayabilmesi için Ramazan içinde erken verilmesi daha uygundur.',
    y: 'Diyanet İlmihali · Buhârî, Zekât 76', a: 'fitre zaman bayram' },

  // ── KURBAN ──
  { k: 'Kurban', s: 'Kurban kimlere vâciptir?',
    c: 'Hanefî mezhebine göre; akıllı, ergen, mukim (yolcu olmayan) ve temel ihtiyaçları dışında nisap miktarı mala sahip Müslümana vâciptir. Kurban, bayramın ilk günü bayram namazından sonra başlayıp üçüncü günün akşamına kadar kesilir.',
    y: 'Diyanet İlmihali, Kurban', a: 'kurban vacip nisap zaman' },
  { k: 'Kurban', s: 'Hangi hayvanlar kurban edilir?',
    c: 'Koyun ve keçi bir yaşını doldurmuş olmalıdır (gösterişli, altı ayı doldurmuş koyun da olur) ve bir kişi adına kesilir. Sığır ve manda iki yaşını, deve beş yaşını doldurmuş olmalıdır; bunlara yedi kişiye kadar ortak olunabilir.',
    y: 'Diyanet İlmihali, Kurban', a: 'kurban hayvan yas koyun sigir hisse' },

  // ── CENAZE ──
  { k: 'Cenaze', s: 'Cenaze namazı nasıl kılınır?',
    c: 'Farz-ı kifâyedir; rükû ve secdesi yoktur, ayakta dört tekbirle kılınır. Birinci tekbirden sonra Sübhâneke ("ve celle senâük" ile), ikinciden sonra Salli-Bârik, üçüncüden sonra cenaze duası (bilmeyen Rabbenâ âtinâ okuyabilir) okunur; dördüncü tekbirden sonra iki tarafa selam verilir.',
    y: 'Diyanet İlmihali, Cenaze namazı', a: 'cenaze namazi nasil kilinir tekbir' },
  { k: 'Cenaze', s: 'Vefat eden biri için neler yapılır?',
    c: 'Gözleri ve ağzı kapatılır, yakınlarına haber verilir. Yıkanır, kefenlenir, cenaze namazı kılınır ve defnedilir. Ardından onun için dua etmek, Kur\'an okumak, sadaka vermek ve borcu varsa ödemek tavsiye edilir.',
    y: 'Diyanet İlmihali, Cenaze', a: 'vefat olum cenaze yapilacaklar' },

  // ── HAC ──
  { k: 'Hac', s: 'Haccın farzları nelerdir?',
    c: 'Üçtür: ihrama girmek, Arefe günü Arafat\'ta vakfe yapmak ve ziyaret tavafını yapmak.',
    y: 'Diyanet İlmihali, Hac', a: 'hac farz ihram arafat tavaf' },
  { k: 'Hac', s: 'Umre ile hac arasındaki fark nedir?',
    c: 'Hac, ömürde bir kez gücü yetene farzdır ve belirli günlerde (Zilhicce ayında) yapılır. Umre ise sünnettir ve yılın her zamanı yapılabilir; ihram, tavaf, sa\'y ve tıraş olmaktan ibarettir, Arafat vakfesi yoktur.',
    y: 'Âl-i İmrân 3/97 · Diyanet İlmihali', a: 'umre hac fark' },

  // ── KUR'AN ──
  { k: 'Kur\'an', s: 'Abdestsiz Kur\'an okunur mu?',
    c: 'Abdestsiz kişi Kur\'an\'ı ezberden okuyabilir; ancak Hanefî mezhebine göre basılı Mushaf\'a dokunamaz. Telefon ve tablet ekranından okumak Mushaf\'a dokunmak hükmünde değildir; abdestsiz de okunabilir.',
    y: 'Vâkıa 56/79 · Diyanet İşleri Başkanlığı fetvaları', a: 'abdestsiz kuran okumak telefon mushaf' },
  { k: 'Kur\'an', s: 'Cünüp ya da âdetli iken Kur\'an okunur mu?',
    c: 'Cünüp, âdetli ve lohusa olan kişi Kur\'an okuyamaz ve Mushaf\'a dokunamaz. Ancak dua ve zikir niyetiyle Fâtiha gibi dua içeren âyetleri okuyabilir, besmele çekebilir, dua edebilir.',
    y: 'Diyanet İlmihali', a: 'cunup adet kuran okumak' },
  { k: 'Kur\'an', s: 'Hatim duası nasıl yapılır?',
    c: 'Kur\'an\'ın tamamı okunduktan sonra yapılan duadır; belirli bir kalıbı yoktur. Genellikle Duhâ sûresinden itibaren son sûreler okunup Fâtiha ve Bakara\'nın ilk âyetleriyle bitirilir, ardından kişi kendi diliyle dua eder.',
    y: 'Diyanet İşleri Başkanlığı', a: 'hatim duasi' },
  { k: 'Kur\'an', s: 'Mushaf sırası ile iniş (nüzul) sırası neden farklı?',
    c: 'Mushaf sırası Fâtiha ile başlayıp Nâs ile biten, Peygamberimiz zamanında belirlenen ve bütün Mushafların basıldığı sıradır; namazda ve hatimde bu sıra esas alınır. İniş sırası ise âyetlerin indiriliş sırasıdır; ilk inen Alak sûresinin ilk âyetleridir. İniş sırası âlimlerin rivayetlerden çıkardığı yaklaşık bir sıralamadır; bu yüzden kaynaktan kaynağa küçük farklar görülür. En yaygın liste 1924 Kahire Mushafı\'nda kullanılandır. Bazı meal ve tefsirler konuların tarihî bağlamını göstermek için bu sırayı izler.',
    y: 'Diyanet İşleri Başkanlığı · TDV İslâm Ansiklopedisi, "Nüzûl"', a: 'nuzul inis sirasi mushaf sirasi farkli' },
  { k: 'Kur\'an', s: 'Uygulamadaki meal hangisi, güvenilir mi?',
    c: 'Uygulamada Diyanet İşleri Başkanlığı\'nın Kur\'an-ı Kerim Meâli (Halil Altuntaş – Muzaffer Şahin) kullanılır. İlahiyatçılardan oluşan bir heyetin gözden geçirdiği, Türkiye\'de en yaygın kullanılan mealdir. Unutmamak gerekir ki her meal bir çeviri ve yorumdur; Arapça metin bütün kaynaklarda aynıdır. Anlamakta zorlanılan âyetlerde tefsirlere bakmak faydalıdır.',
    y: 'Diyanet İşleri Başkanlığı, Kur\'an-ı Kerim Meâli', a: 'meal diyanet guvenilir hangi meal' },
  { k: 'Kur\'an', s: 'Bazı kıssalar neden birden fazla sûrede anlatılıyor?',
    c: 'Hz. Mûsâ, Hz. İbrâhim ve Hz. Nûh gibi peygamberlerin kıssaları farklı sûrelerde, farklı yönleriyle anlatılır. Her sûrede kıssanın o sûrenin konusuna uygun bölümü öne çıkarılır; böylece aynı olaydan farklı dersler verilir. Bu bir tekrar değil, Kur\'an\'ın anlatım üslubudur.',
    y: 'Diyanet İşleri Başkanlığı · TDV İslâm Ansiklopedisi, "Kıssa"', a: 'kissa tekrar musa bakara taha neden ayni' }
];
window.HV_ILMIHAL = HV_ILMIHAL;

(function () {
  let kat = 'Oruç', acik = -1;
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const sade = (s) => String(s || '').toLocaleLowerCase('tr-TR')
    .replace(/[âà]/g, 'a').replace(/[îı]/g, 'i').replace(/[ûü]/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/['’]/g, '');

  function liste() {
    const ara = document.getElementById('ilm-ara');
    const q = sade(ara ? ara.value : '').trim();
    const kutu = document.getElementById('ilm-liste');
    if (!kutu) return;
    let veri = HV_ILMIHAL.map((x, i) => Object.assign({ i }, x));
    if (q) {
      const kel = q.split(/\s+/).filter(Boolean);
      veri = veri.filter(x => { const h = sade(x.s + ' ' + x.c + ' ' + x.a + ' ' + x.k); return kel.every(w => h.indexOf(w) >= 0); });
    } else veri = veri.filter(x => x.k === kat);
    document.querySelectorAll('#ilm-cipler button').forEach(b => b.classList.toggle('on', !q && b.dataset.k === kat));
    if (!veri.length) { kutu.innerHTML = '<div class="ilm-bos">Bu soruya kayıtlı bir cevap bulamadım. Diyanet\'in <b>ALO 190</b> Fetva Hattı\'ndan sorabilirsin.</div>'; return; }
    kutu.innerHTML = veri.map(x => `
      <div class="ilm-s${x.i === acik ? ' acik' : ''}">
        <button class="ilm-soru" onclick="hvIlmAc(${x.i})"><span>${esc(x.s)}</span><b>${x.i === acik ? '−' : '+'}</b></button>
        ${x.i === acik ? `<div class="ilm-cevap">${esc(x.c)}<div class="ilm-kay">Kaynak: ${esc(x.y)}${q ? ' · ' + esc(x.k) : ''}</div></div>` : ''}
      </div>`).join('');
  }
  window.renderIlmihal = function () {
    const c = document.getElementById('ilmihal-content');
    if (!c) return;
    if (!c.dataset.kuruldu) {
      c.dataset.kuruldu = '1';
      c.innerHTML = `
        <input id="ilm-ara" class="ilm-ara" type="search" placeholder="🔍 Soru ara (ör. abdest, oruç bozar mı)…" oninput="hvIlmListe()">
        <div id="ilm-cipler" class="ilm-cipler">${HV_ILMIHAL_KAT.map(k => `<button data-k="${esc(k)}" onclick="hvIlmKat('${k.replace(/'/g, "\\'")}')">${esc(k)}</button>`).join('')}</div>
        <div id="ilm-liste"></div>
        <div class="ilm-not">Cevaplar Hanefî mezhebine göre, Diyanet İşleri Başkanlığı'nın ilmihal ve fetvaları esas alınarak kısaca yazılmıştır. Özel durumların için <b>ALO 190</b> Diyanet Fetva Hattı'nı arayabilirsin.</div>`;
    }
    liste();
  };
  window.hvIlmListe = liste;
  window.hvIlmKat = function (k) { kat = k; acik = -1; const a = document.getElementById('ilm-ara'); if (a) a.value = ''; liste(); };
  window.hvIlmAc = function (i) { acik = acik === i ? -1 : i; liste(); };
  if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['ilmihal'] = window.renderIlmihal;
  else document.addEventListener('DOMContentLoaded', () => { if (window.FEATURE_ROUTES) window.FEATURE_ROUTES['ilmihal'] = window.renderIlmihal; });
})();
