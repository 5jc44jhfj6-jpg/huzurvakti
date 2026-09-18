/* ========================================================
   Huzur Vakti - Yeni Özellik Veri Setleri (content.js)
   Bu dosya mevcut data.js'i değiştirmez, sadece yeni veriler ekler.
   ======================================================== */

/* ══════════ GÜNÜN HADİSİ (40+ Hadis) ══════════ */
const HADITHS = [
  { ar: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ", text: "Ameller (yapılan işler) ancak niyetlere göre değerlenir. Herkese niyet ettiği şeyin karşılığı vardır.", source: "Buhârî, Müslim" },
  { text: "Kolaylaştırınız, güçleştirmeyiniz. Müjdeleyiniz, nefret ettirmeyiniz.", source: "Buhârî, İlim 11" },
  { text: "Müslüman, elinden ve dilinden diğer Müslümanların zarar görmediği kimsedir.", source: "Buhârî, Îmân 4" },
  { text: "Sizin en hayırlınız, Kur'an'ı öğrenen ve öğretendir.", source: "Buhârî, Fedâilü'l-Kur'ân 21" },
  { text: "Temizlik imanın yarısıdır.", source: "Müslim, Tahâret 1" },
  { text: "Kişi sevdiği ile beraberdir.", source: "Buhârî, Edeb 96" },
  { text: "Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen bizden değildir.", source: "Tirmizî, Birr 15" },
  { text: "Mümin bir delikten iki kez ısırılmaz.", source: "Buhârî, Edeb 83" },
  { text: "Allah katında en sevimli amel, az da olsa devamlı olanıdır.", source: "Buhârî, Îmân 32" },
  { text: "Güzel söz sadakadır.", source: "Buhârî, Cihâd 72" },
  { text: "İnsanların en hayırlısı, insanlara en faydalı olanıdır.", source: "Beyhakî" },
  { text: "Veren el, alan elden üstündür.", source: "Buhârî, Zekât 18" },
  { text: "Allah'a ve ahiret gününe iman eden ya hayır söylesin ya da sussun.", source: "Buhârî, Edeb 31" },
  { text: "Cennet annelerin ayakları altındadır.", source: "Nesâî, Cihâd 6" },
  { text: "Sizin en hayırlınız, ailesine karşı en iyi olanınızdır.", source: "Tirmizî, Menâkıb 63" },
  { text: "Zenginlik, mal çokluğu değildir. Asıl zenginlik gönül tokluğudur.", source: "Buhârî, Rikâk 15" },
  { text: "Komşusu açken tok yatan bizden değildir.", source: "Hâkim, Müstedrek" },
  { text: "Bir kötülük gördüğünüzde onu elinizle, gücünüz yetmezse dilinizle, ona da gücünüz yetmezse kalbinizle düzeltmeye çalışın.", source: "Müslim, Îmân 78" },
  { text: "Kim bir mümini bir sıkıntıdan kurtarırsa, Allah da onu kıyamet günü sıkıntılarından kurtarır.", source: "Müslim, Zikr 38" },
  { text: "Gülümsemen kardeşinin yüzüne karşı bir sadakadır.", source: "Tirmizî, Birr 36" },
  { text: "Dua ibadetin özüdür.", source: "Tirmizî, Deavât 1" },
  { text: "Allah sizin suretlerinize ve mallarınıza değil, kalplerinize ve amellerinize bakar.", source: "Müslim, Birr 34" },
  { text: "Öfkelendiğinde susan kurtuldu.", source: "Ahmed b. Hanbel" },
  { text: "İki nimet vardır ki insanların çoğu onları değerlendirmede aldanmıştır: Sağlık ve boş vakit.", source: "Buhârî, Rikâk 1" },
  { text: "Kim Allah için bir cami yaparsa, Allah da ona cennette bir ev yapar.", source: "Buhârî, Salât 65" },
  { text: "Namazın anahtarı temizliktir.", source: "Ebû Dâvûd, Tahâret 31" },
  { text: "Ramazan ayı girip de günahları bağışlanmadan çıkan kimse rahmetten uzak olsun.", source: "Tirmizî, Deavât 100" },
  { text: "Sadaka malı eksiltmez.", source: "Müslim, Birr 69" },
  { text: "Kolayca kızmayan ve çabuk sakinleşen kişi en hayırlınızdır.", source: "Tirmizî, Fiten 26" },
  { text: "İlim öğrenmek her Müslümana farzdır.", source: "İbn Mâce, Mukaddime 17" },
  { text: "Cömert insan Allah'a yakın, cennete yakın, insanlara yakın ve cehennemden uzaktır.", source: "Tirmizî, Birr 40" },
  { text: "Kim bir hayra vesile olursa, o hayrı yapan gibi sevap alır.", source: "Müslim, İmâre 133" },
  { text: "Yumuşaklık nerede bulunursa orayı süsler, nereden çekilip alınırsa orayı çirkinleştirir.", source: "Müslim, Birr 78" },
  { text: "Mümin müminin aynasıdır.", source: "Ebû Dâvûd, Edeb 49" },
  { text: "En üstün cihad, zalim sultanın karşısında hakkı söylemektir.", source: "Ebû Dâvûd, Melâhim 17" },
  { text: "Kim bir yetimin başını okşarsa, elinin dokunduğu her kıl sayısınca ona sevap yazılır.", source: "Ahmed b. Hanbel" },
  { text: "Allah'ım! Faydasız ilimden, huşû duymayan kalpten, doymayan nefisten Sana sığınırım.", source: "Müslim, Zikr 73" },
  { text: "Din nasihattir (samimiyettir).", source: "Müslim, Îmân 95" },
  { text: "İnsanlara teşekkür etmeyen, Allah'a da şükretmez.", source: "Tirmizî, Birr 35" },
  { text: "Sabır, aydınlıktır.", source: "Müslim, Tahâret 1" },
  { text: "Rızkının bol olmasını isteyen, akrabası ile ilişkisini sürdürsün.", source: "Buhârî, Edeb 12" }
];

/* ══════════ ESMAÜL HÜSNA (99 İsim) ══════════ */
const ESMA_UL_HUSNA = [
  { no: 1, ar: "اللَّهُ", tr: "Allah", meaning: "Tek yaratıcının özel ismi, varlığı zorunlu olan, bütün kemâl sıfatları kendisinde toplayan hakiki ma'bûd." },
  { no: 2, ar: "الرَّحْمَنُ", tr: "er-Rahmân", meaning: "Sonsuz merhametiyle lütuf ve ihsanda bulunan." },
  { no: 3, ar: "الرَّحِيمُ", tr: "er-Rahîm", meaning: "Rahmetiyle her şeyi kuşatan." },
  { no: 4, ar: "الْمَلِكُ", tr: "el-Melik", meaning: "Bütün varlıkların sahibi/hükümdârı." },
  { no: 5, ar: "الْقُدُّوسُ", tr: "el-Kuddûs", meaning: "Eksiklik ve kusurlardan münezzeh/uzak olan, bütün kemâl sıfatları kendisinde toplayan." },
  { no: 6, ar: "السَّلاَمُ", tr: "es-Selâm", meaning: "Esenlik ve selâmet veren, yaratılmışlara özgü değişikliklerden ve yok oluştan münezzeh olan." },
  { no: 7, ar: "الْمُؤْمِنُ", tr: "el-Mü'min", meaning: "Bütün mahlûkâta emniyet/güven veren ve kendisine güvenilen." },
  { no: 8, ar: "الْمُهَيْمِنُ", tr: "el-Müheymin", meaning: "Kâinatın bütün işlerini gözetip yöneten, her şeyi hükmü altına alan." },
  { no: 9, ar: "الْعَزِيزُ", tr: "el-Azîz", meaning: "Ulu, galip, her şeye üstün gelen izzet sahibi." },
  { no: 10, ar: "الْجَبَّارُ", tr: "el-Cebbâr", meaning: "Dilediğini yaptırma gücüne sahip olan, her şeyi tasarrufu altına alan ve irâdesini her durumda yürüten." },
  { no: 11, ar: "الْمُتَكَبِّرُ", tr: "el-Mütekebbir", meaning: "Büyüklüğünü izhar eden, son derece ulu, yüce." },
  { no: 12, ar: "الْخَالِقُ", tr: "el-Hâlik", meaning: "Her şeyin yaratıcısı, hikmeti gereği her şeyi ölçülü yaratan." },
  { no: 13, ar: "الْبَارِئُ", tr: "el-Bâri'", meaning: "Yoktan yaratan, maddesi ve örneği olmadan îcat eden." },
  { no: 14, ar: "الْمُصَوِّرُ", tr: "el-Musavvir", meaning: "Varlığa şekil ve sûret veren." },
  { no: 15, ar: "الْغَفَّارُ", tr: "el-Gaffâr", meaning: "Kusur ve günahları örten, çokça bağışlayan." },
  { no: 16, ar: "الْقَهَّارُ", tr: "el-Kahhâr", meaning: "Yenilmeyen, dilediğini yerine getiren, kendisine her şeyin boyun eğdiği yegâne kudret ve tasarruf sahibi." },
  { no: 17, ar: "الْوَهَّابُ", tr: "el-Vehhâb", meaning: "Karşılıksız olarak çokça nimet veren ve ihsanda bulunan." },
  { no: 18, ar: "الرَّزَّاقُ", tr: "er-Rezzâk", meaning: "Maddî ve manevî bol rızık veren, her türlü rızık imkânlarını yaratan." },
  { no: 19, ar: "الْفَتَّاحُ", tr: "el-Fettâh", meaning: "Hayır kapılarını açan, hükmüyle adaleti sağlayan." },
  { no: 20, ar: "اَلْعَلِيمُ", tr: "el-Alîm", meaning: "İlmi her şeyi kuşatan." },
  { no: 21, ar: "الْقَابِضُ", tr: "el-Kâbız", meaning: "Her şeyi teslim alan, hikmeti gereği rızkı ve her türlü nimeti ölçülü veren, eceli gelenlerin ruhlarını teslim alan." },
  { no: 22, ar: "الْبَاسِطُ", tr: "el-Bâsıt", meaning: "Rızkı ve her türlü rızık imkânını genişleten, ömürleri uzatan." },
  { no: 23, ar: "الْخَافِضُ", tr: "el-Hâfıd", meaning: "Kâfirleri ve zalimleri alçaltan." },
  { no: 24, ar: "الرَّافِعُ", tr: "er-Râfi`", meaning: "Müminleri yükselten, izzetli ve şerefli kılan." },
  { no: 25, ar: "الْمُعِزُّ", tr: "el-Muizz", meaning: "Yücelten, güçlü ve aziz kılan." },
  { no: 26, ar: "الْمُذِلُّ", tr: "el-Müzill", meaning: "Boyun eğdiren, değersiz kılan." },
  { no: 27, ar: "السَّمِيعُ", tr: "es-Semî`", meaning: "Her şeyi işiten." },
  { no: 28, ar: "الْبَصِيرُ", tr: "el-Basîr", meaning: "Her şeyi gören." },
  { no: 29, ar: "الْحَكَمُ", tr: "el-Hakem", meaning: "Nihaî hükmü veren." },
  { no: 30, ar: "الْعَدْلُ", tr: "el-Adl", meaning: "Adaletli, her şeyi yerli yerinde yapan." },
  { no: 31, ar: "اللَّطِيفُ", tr: "el-Latîf", meaning: "En gizli ve ince hususları dahi bilen, lütufta bulunan, zâtı duyularla algılanamayan, fiillerini rıfk ile gerçekleştiren." },
  { no: 32, ar: "الْخَبِيرُ", tr: "el-Habîr", meaning: "Gizli ve açık her şeyden haberdar olan, dilediğini haber veren." },
  { no: 33, ar: "الْحَلِيمُ", tr: "el-Halîm", meaning: "Sabırlı, acele ve kızgınlıkla muamele etmeyen, kudreti olduğu hâlde hemen cezalandırmayan." },
  { no: 34, ar: "الْعَظِيمُ", tr: "el-Azîm", meaning: "Zât ve sıfatları bakımından pek yüce olan, azametli olan." },
  { no: 35, ar: "الْغَفُورُ", tr: "el-Gafûr", meaning: "Çok affedici ve bağışlayıcı olan." },
  { no: 36, ar: "الشَّكُورُ", tr: "eş-Şekûr", meaning: "Yapılan iyi amellerin karşılığını bolca veren." },
  { no: 37, ar: "الْعَلِيُّ", tr: "el-Aliyy", meaning: "Yücelik ve hükümranlıkta kendisine eşit veya kendisinden daha üstün bir varlık bulunmayan." },
  { no: 38, ar: "الْكَبِيرُ", tr: "el-Kebîr", meaning: "Zâtının ve sıfatlarının mahiyeti bilinemeyecek kadar büyük ve ulu olan." },
  { no: 39, ar: "الْحَفِيظُ", tr: "el-Hafîz", meaning: "Her şey gözetiminde olan, koruyan ve kâinatı dengede tutan." },
  { no: 40, ar: "الْمُقِيتُ", tr: "el-Mukît", meaning: "Mahlukatın gıdasını yaratıp veren, güç yetiren ve koruyup gözeten." },
  { no: 41, ar: "الْحَسِيبُ", tr: "el-Hasîb", meaning: "Hesaba çeken, her şeyin neticesini bilen." },
  { no: 42, ar: "الْجَلِيلُ", tr: "el-Celîl", meaning: "Hiçbir kayıt ve kıyas kabul etmeksizin azamet sahibi, kıymeti ve mertebesi en yüce olan." },
  { no: 43, ar: "الْكَرِيمُ", tr: "el-Kerîm", meaning: "Çok cömert, nimet ve ihsanı bol olan." },
  { no: 44, ar: "الرَّقِيبُ", tr: "er-Rakîb", meaning: "Gözeten, koruyan ve bütün işler murakabesi/kontrolü altında olan." },
  { no: 45, ar: "الْمُجِيبُ", tr: "el-Mücîb", meaning: "Dua ve dilekleri kabul eden." },
  { no: 46, ar: "الْوَاسِعُ", tr: "el-Vâsi`", meaning: "İlmi, rahmeti ve kudreti her şeyi kuşatan." },
  { no: 47, ar: "الْحَكِيمُ", tr: "el-Hakîm", meaning: "Her işi, emri ve yasağı yerli yerinde olan." },
  { no: 48, ar: "الْوَدُودُ", tr: "el-Vedûd", meaning: "Müminleri seven ve onlar tarafından da sevilen." },
  { no: 49, ar: "الْمَجِيدُ", tr: "el-Mecîd", meaning: "Her türlü eksiklikten münezzeh, lütuf ve ikramı bol olan." },
  { no: 50, ar: "الْبَاعِثُ", tr: "el-Bâis", meaning: "Ölüleri dirilten, peygamberler gönderen." },
  { no: 51, ar: "الشَّهِيدُ", tr: "eş-Şehîd", meaning: "Her şeye muttali olan, kendisine hiçbir şey gizli kalmayan." },
  { no: 52, ar: "الْحَقُّ", tr: "el-Hakk", meaning: "Bizzat ve sürekli olarak var olan, varlığı kendinden olan, uluhiyet ve rububiyeti gerçek olan." },
  { no: 53, ar: "الْوَكِيلُ", tr: "el-Vekîl", meaning: "Bütün yaratıkların işlerinin görülmesinde güvenilip dayanılan, bu konuda tam yeterli olan." },
  { no: 54, ar: "الْقَوِيُّ", tr: "el-Kavî", meaning: "Gücü ve kuvveti her şeye yeten." },
  { no: 55, ar: "الْمَتِينُ", tr: "el-Metîn", meaning: "Âcizliği, zafiyeti ve güçsüzlüğü olmayan, güçlü olan." },
  { no: 56, ar: "الْوَلِيُّ", tr: "el-Velî", meaning: "Müminlere dost ve yardımcı olan." },
  { no: 57, ar: "الْحَمِيدُ", tr: "el-Hamîd", meaning: "Çok övülen, bütün övgülere ve övgülerin en yücesine layık olan." },
  { no: 58, ar: "الْمُحْصِي", tr: "el-Muhsî", meaning: "Gizli ve âşikâr her şeyin ölçü ve sayısını bütün ayrıntılarıyla bilen." },
  { no: 59, ar: "الْمُبْدِئُ", tr: "el-Mübdi'", meaning: "Her şeyi yoktan var eden." },
  { no: 60, ar: "الْمُعِيدُ", tr: "el-Muîd", meaning: "Varlıkları ölümlerinden sonra tekrar yaratan." },
  { no: 61, ar: "الْمُحْيِي", tr: "el-Muhyî", meaning: "Hayat veren, yaşatan ve dirilten." },
  { no: 62, ar: "اَلْمُمِيتُ", tr: "el-Mümît", meaning: "Öldüren, canları kabzeden." },
  { no: 63, ar: "الْحَيُّ", tr: "el-Hayy", meaning: "Ezelî ve ebedî olarak diri ve ölümsüz olan." },
  { no: 64, ar: "الْقَيُّومُ", tr: "el-Kayyûm", meaning: "Varlığı kendinden olan, her şeyin varlığı kendisine bağlı olan, kâinatı idare eden." },
  { no: 65, ar: "الْوَاجِدُ", tr: "el-Vâcid", meaning: "Her şeyi bilen, hiçbir şeye muhtaç olmayan, emrini ve isteğini daima gerçekleştiren." },
  { no: 66, ar: "الْمَاجِدُ", tr: "el-Mâcid", meaning: "Şânı yüce ve sonsuz kerem sahibi olan." },
  { no: 67, ar: "الْوَاحِدُ", tr: "el-Vâhid", meaning: "Bir, tek, yegâne varlık; zâtında, ilah ve rab oluşunda ortağı olmayan." },
  { no: 68, ar: "الصَّمَدُ", tr: "es-Samed", meaning: "Herkesin kendisine muhtaç olduğu, kendisi ise kimseye muhtaç olmayan, ezelî ve ebedî olan." },
  { no: 69, ar: "الْقَادِرُ", tr: "el-Kâdir", meaning: "Her şeye gücü yeten." },
  { no: 70, ar: "الْمُقْتَدِرُ", tr: "el-Muktedir", meaning: "Güç ve kuvvetinde hiçbir sınır olmayan." },
  { no: 71, ar: "الْمُقَدِّمُ", tr: "el-Mukaddim", meaning: "Hikmeti gereği istediğini öne alan, ileri geçiren." },
  { no: 72, ar: "الْمُؤَخِّرُ", tr: "el-Muahhir", meaning: "Hikmeti gereği dilediğini geriye bırakan." },
  { no: 73, ar: "الأوَّلُ", tr: "el-Evvel", meaning: "Varlığının başlangıcı olmayan, ezelî olan." },
  { no: 74, ar: "الآخِرُ", tr: "el-Âhir", meaning: "Varlığının sonu olmayan, ebedî olan." },
  { no: 75, ar: "الظَّاهِرُ", tr: "ez-Zâhir", meaning: "Varlığını ve birliğini belgeleyen birçok delilin bulunması açısından varlığı açık olan." },
  { no: 76, ar: "الْبَاطِنُ", tr: "el-Bâtın", meaning: "Zâtı itibarıyla gizli olan, bütün gizlilikleri bilen." },
  { no: 77, ar: "الْوَالِي", tr: "el-Vâlî", meaning: "Kâinatı yöneten, onlar için gerekli olan her şeyi üstlenen." },
  { no: 78, ar: "الْمُتَعَالِي", tr: "el-Müteâlî", meaning: "Noksanlıklardan berî, aşkın ve yüce olan." },
  { no: 79, ar: "الْبَرُّ", tr: "el-Berr", meaning: "Çokça iyilik eden." },
  { no: 80, ar: "التَّوَّابُ", tr: "et-Tevvâb", meaning: "Kullarını tövbelerini kabul eden." },
  { no: 81, ar: "الْمُنْتَقِمُ", tr: "el-Müntakım", meaning: "Suçluları yaptıklarına karşılık cezalandıran." },
  { no: 82, ar: "العَفُوُّ", tr: "el-Afüvv", meaning: "Çokça affeden." },
  { no: 83, ar: "الرَّؤُوفُ", tr: "er-Raûf", meaning: "Merhameti ve şefkati çok olan." },
  { no: 84, ar: "مَالِكُ الْمُلْكِ", tr: "Mâlikü'l-mülk", meaning: "Mülkün gerçek sahibi, tüm mevcûdâtı idare eden." },
  { no: 85, ar: "ذُوالْجَلاَلِ وَالإكْرَامِ", tr: "Zü'l-celâli ve'l-ikrâm", meaning: "Sonsuz yücelik ve ikram sahibi olan." },
  { no: 86, ar: "الْمُقْسِطُ", tr: "el-Muksit", meaning: "Adaleti gerçekleştiren, hakkaniyetle hükmeden." },
  { no: 87, ar: "الْجَامِعُ", tr: "el-Câmi'", meaning: "Dünya ve ahirette bütün mahlûkâtı bir araya getirme kudretine sahip olan." },
  { no: 88, ar: "الْغَنِيُّ", tr: "el-Ganî", meaning: "Hiçbir şeye ihtiyacı olmayan." },
  { no: 89, ar: "الْمُغْنِي", tr: "el-Muğnî", meaning: "İhtiyaçtan kurtaran zengin kılan." },
  { no: 90, ar: "اَلْمَانِعُ", tr: "el-Mâni`", meaning: "Hikmeti gereği engel koyan, mâni olan." },
  { no: 91, ar: "الضَّارُّ", tr: "ed-Dârr", meaning: "Hikmeti gereği elem ve zarar verici şeyleri yaratan." },
  { no: 92, ar: "النَّافِعُ", tr: "en-Nâfi`", meaning: "Hayrı ve faydayı yaratan ve veren." },
  { no: 93, ar: "النُّورُ", tr: "en-Nûr", meaning: "Nurlandıran, her şeyi aydınlatan, kalplere nur ve iman veren." },
  { no: 94, ar: "الْهَادِي", tr: "el-Hâdî", meaning: "Doğru yolu gösteren, hidâyete erdiren." },
  { no: 95, ar: "الْبَدِيعُ", tr: "el-Bedî`", meaning: "Örneksiz ve benzersiz olarak yoktan yaratan." },
  { no: 96, ar: "اَلْبَاقِي", tr: "el-Bâkî", meaning: "Varlığı sürekli olan, ebedî, sonsuz olan." },
  { no: 97, ar: "الْوَارِثُ", tr: "el-Vâris", meaning: "Varlığının sonunun bulunmaması vasfıyla kâinatın gerçek sahibi." },
  { no: 98, ar: "الرَّشِيدُ", tr: "er-Reşîd", meaning: "Yol gösteren, her işi isabetli olan." },
  { no: 99, ar: "الصَّبُورُ", tr: "es-Sabûr", meaning: "Günahkârları hemen cezalandırmayıp onlara mühlet tanıyan." }
];

const DUA_LEARN = [
  {
    title: "Sübhaneke Duası",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
    okunusu: "Sübhânekellâhümme ve bihamdik ve tebârakesmük ve teâlâ ceddük (ve celle senâük) ve lâ ilâhe ğayruk",
    turkish: "Allah'ım! Sen eksik sıfatlardan pak ve uzaksın. Seni daima böyle tenzih eder ve överim. Senin adın mübarektir. Varlığın her şeyden üstündür. Senden başka ilah yoktur.",
    note: "Namaza başlarken, iftitah tekbirinden sonra okunur."
  },
  {
    title: "Ettehiyyâtü Duası",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    okunusu: "Ettehiyyâtü lillâhi vessalevâtü vettayyibât. Esselâmü aleyke eyyühen-Nebiyyü ve rahmetullâhi ve berakâtühü. Esselâmü aleynâ ve alâ ibâdillâhis-Sâlihîn. Eşhedü ellâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve Rasülüh.",
    turkish: "Dil ile, beden ve mal ile yapılan bütün ibadetler Allah'adır. Ey Peygamber! Allah'ın selamı, rahmet ve bereketleri senin üzerine olsun. Selam bizim üzerimize ve Allah'ın bütün iyi kulları üzerine olsun. Şahitlik ederim ki, Allah'tan başka ilah yoktur. Yine şahitlik ederim ki, Muhammed, O'nun kulu ve Peygamberidir.",
    note: "Her oturuşta (ka'de) okunur."
  },
  {
    title: "Salli - Bârik Duaları",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ ۝ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    okunusu: "Allâhümme salli alâ Muhammediv ve alâ âli Muhammed. Kemâ salleyte alâ İbrâhîme ve alâ âli İbrahîm. İnneke hamîdüm mecîd. Allâhümme bârik alâ Muhammediv ve alâ âli Muhammed. Kemâ barekte alâ İbrâhîme ve alâ âli İbrâhîm. İnneke hamîdüm mecîd",
    turkish: "Allah'ım! Muhammed'e ve Muhammed'in ümmetine rahmet eyle; şerefini yücelt. İbrahim'e ve İbrahim'in ümmetine rahmet ettiğin gibi. Şüphesiz övülmeye layık yalnız sensin, şan ve şeref sahibi de sensin. Allah'ım! Muhammed'e ve Muhammed'in ümmetine hayır ve bereket ver. İbrahim'e ve İbrahim'in ümmetine verdiğin gibi. Şüphesiz övülmeye layık yalnız sensin, şan ve şeref sahibi de sensin.",
    note: "Son oturuşta Ettehiyyâtü'den sonra okunur."
  },
  {
    title: "Kunut Duaları",
    arabic: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ وَلَا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ",
    okunusu: "Allâhümme innâ nesteînüke ve nestağfiruke ve nestehdîk. Ve nü'minü bike ve netûbü ileyk. Ve netevekkelü aleyke ve nüsnî aleykel-hayra kullehû neşküruke ve lâ nekfüruke ve nahleu ve netrukü men yefcüruk",
    turkish: "Allah'ım! Senden yardım isteriz, günahlarımızı bağışlamanı isteriz, razı olduğun şeylere hidayet etmeni isteriz. Sana inanırız, sana tevbe ederiz. Sana güveniriz. Bize verdiğin bütün nimetleri bilerek seni hayır ile överiz. Sana şükrederiz. Hiçbir nimetini inkar etmez ve onları başkasından bilmeyiz. Nimetlerini inkar eden ve sana karşı geleni bırakırız.",
    note: "Vitir namazının 3. rekâtında okunur."
  },
  {
    title: "Âyetel Kürsî",
    arabic: "اَللّٰهُ لَٓا اِلٰهَ اِلَّا هُوَۚ اَلْحَىُّ الْقَيُّومُۚ لَا تَاْخُذُهُ سِنَةٌ وَلَا نَوْمٌۜ لَهُ مَا فِى السَّمٰوَاتِ وَمَا فِى الْاَرْضِۜ مَنْ ذَا الَّذٖى يَشْفَعُ عِنْدَهُٓ اِلَّا بِاِذْنِهٖۜ يَعْلَمُ مَا بَيْنَ اَيْدٖيهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحٖيطُونَ بِشَىْءٍ مِنْ عِلْمِهٖٓ اِلَّا بِمَا شَٓاءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوَاتِ وَالْاَرْضَۚ وَلَا يَؤُ۫دُهُ حِفْظُهُمَاۚ وَهُوَ الْعَلِىُّ الْعَظٖيمُ",
    okunusu: "Allâhü lâ ilâhe illâ hüvel-hayyül-kayyûm. Lâ te'huzühû sinetün ve lâ nevm. Lehû mâ fis-semâvâti ve mâ fil-ard. Menzellezî yeşfeu indehû illâ bi-iznih. Ya'lemü mâ beyne eydîhim ve mâ halfehüm. Ve lâ yühîtûne bi-şey'in min ilmihî illâ bimâ şâ'. Vesia kürsiyyühüs-semâvâti vel-ard. Ve lâ yeûdühû hıfzuhümâ ve hüvel-aliyyül-azîm.",
    turkish: "Allah kendisinden başka hiçbir ilah olmayandır. Diridir, kayyumdur. Onu ne bir uyuklama tutabilir, ne de bir uyku. Göklerdeki her şey, yerdeki her şey onundur. İzni olmaksızın onun katında şefaatte bulunacak kimdir? O, kulların önlerindekileri ve arkalarındakileri (yaptıklarını ve yapacaklarını) bilir. Onlar onun ilminden, kendisinin dilediği kadarından başka bir şey kavrayamazlar. Onun kürsüsü bütün gökleri ve yeri kaplayıp kuşatmıştır. (O, göklere, yere, bütün evrene hükmetmektedir.) Gökleri ve yeri koruyup gözetmek ona güç gelmez. O, yücedir, büyüktür.",
    note: "Bakara suresi 255. ayet. En faziletli ayetlerdendir."
  },
  {
    title: "Âmenerrasûlü (Bakara 285-286)",
    arabic: "اٰمَنَ الرَّسُولُ بِمَٓا اُنْزِلَ اِلَيْهِ مِنْ رَبِّهٖ وَالْمُؤْمِنُونَؕ كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰٓئِكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖؕ لَا نُفَرِّقُ بَيْنَ اَحَدٍ مِنْ رُسُلِهٖࣞ وَقَالُوا سَمِعْنَا وَاَطَعْنَا غُفْرَانَكَ رَبَّنَا وَاِلَيْكَ الْمَصٖيرُ ۝ لَا يُكَلِّفُ اللّٰهُ نَفْسًا اِلَّا وُسْعَهَاۜ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْۜ رَبَّنَا لَا تُؤَاخِذْنَٓا اِنْ نَسٖينَٓا اَوْ اَخْطَاْنَاۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَٓا اِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذٖينَ مِنْ قَبْلِنَاۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهٖۚ وَاعْفُ عَنَّا۠ وَاغْفِرْ لَنَا۠ وَارْحَمْنَا۠ اَنْتَ مَوْلٰينَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرٖينَ",
    okunusu: "Âmener-rasûlü bimâ ünzile ileyhi min rabbihî vel-mü'minûn. Küllün âmene billâhi ve melâiketihî ve kütübihî ve rusülih. Lâ nüferriku beyne ehadin min rusülih. Ve kâlû semi'nâ ve eta'nâ ğufrâneke rabbenâ ve ileykel-masîr.",
    turkish: "Peygamber, Rabbinden kendisine indirilene iman etti, mü'minler de (iman ettiler). Her biri; Allah'a, meleklerine, kitaplarına ve peygamberlerine iman ettiler ve şöyle dediler: \"Onun peygamberlerinden hiçbirini (diğerinden) ayırt etmeyiz.\" Şöyle de dediler: \"İşittik ve itaat ettik. Ey Rabbimiz! Senden bağışlama dileriz. Sonunda dönüş yalnız sanadır.\" Allah bir kimseyi ancak gücünün yettiği şeyle yükümlü kılar. Onun kazandığı iyilik kendi yararına, kötülük de kendi zararınadır. (Şöyle diyerek dua ediniz): \"Ey Rabbimiz! Unutur, ya da yanılırsak bizi sorumlu tutma! Ey Rabbimiz! Bize, bizden öncekilere yüklediğin gibi ağır yük yükleme. Ey Rabbimiz! Bize gücümüzün yetmediği şeyleri yükleme! Bizi affet, bizi bağışla, bize acı! Sen bizim Mevlâmızsın. Kâfirler topluluğuna karşı bize yardım et.\"",
    note: "Bakara suresinin son iki ayetidir. Yatmadan önce okunması tavsiye edilir."
  },
  {
    title: "Rabbenâ Duaları",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    okunusu: "Rabbenâ âtinâ fid'dünyâ hasenetev ve fil'âhireti hasenetev ve ginâ azâbennâr. Rabbenâğfirlî ve li-vâlideyye ve lil-Mü'minîne yevme yegûmü'l hisâb.",
    turkish: "Allah'ım! Bize dünyada iyilik ve güzellik, ahirette de iyilik, güzellik ver. Bizi ateşin azabından koru. Ey bizim Rabbimiz! Beni, annemi, babamı ve bütün mü'minleri hesap gününde (herkesin sorguya çekileceği günde) bağışla.",
    note: "Son oturuşta Salli-Bârik'ten sonra okunur."
  },
  {
    title: "Kunut Duası (2. Kısım)",
    arabic: "اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَى وَنَحْفِدُ نَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ",
    okunusu: "Allâhümme iyyâke na'büdü ve leke nusallî ve nescüdü ve ileyke nes'a ve nahfidü nercû rahmeteke ve nahşâ azâbeke inne azâbeke bilküffâri mülhıg",
    turkish: "Allah'ım! Biz yalnız sana kulluk ederiz. Namazı yalnız senin için kılarız, ancak sana secde ederiz. Yalnız sana koşar ve sana yaklaştıracak şeyleri kazanmaya çalışırız. İbadetlerini sevinçle yaparız. Rahmetinin devamını ve çoğalmasını dileriz. Azabından korkarız, şüphesiz senin azabın kafirlere ve inançsızlara ulaşır.",
    note: "Vitir namazında birinci Kunut duasının devamıdır."
  },
  {
    title: "Namaz Tesbihâtı (Selamdan Sonra)",
    arabic: "سُبْحَانَ اللَّهِ (٣٣) اَلْحَمْدُ لِلَّهِ (٣٣) اَللَّهُ أَكْبَرُ (٣٣) لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    okunusu: "Sübhânallâh (33), Elhamdülillâh (33), Allâhü ekber (33). Lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr.",
    turkish: "33 defa Sübhânallah, 33 defa Elhamdülillah, 33 defa Allahu Ekber denir; ardından tevhid getirilir. Namazdan sonra okunması sünnettir.",
    note: "Farz namazların ardından okunan tesbihattır."
  },
  {
    title: "Kelime-i Tevhîd",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ",
    okunusu: "Lâ ilâhe illallah Muhammedün resûlullah",
    turkish: "Allah'tan başka ilâh yoktur, Hazreti Muhammed (sallallahu aleyhi ve sellem) Allah'ın elçisidir.",
    note: "İslam'ın temel kelimesidir."
  },
  {
    title: "Kelime-i Şehâdet",
    arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    okunusu: "Eşhedü en lâ ilâhe illallah ve eşhedü enne Muhammeden abdühû ve resûlüh",
    turkish: "Şahitlik ederim ki Allah'tan başka ilâh yoktur. Yine şahitlik ederim ki, Hazreti Muhammed (sallallahu aleyhi ve sellem) Allah'ın kulu ve elçisidir.",
    note: "İman esasının dille ikrarıdır."
  }
];

/* ══════════ NAMAZDA OKUNAN SURELER (Zamm-ı Sure - Tam Metin) ══════════ */
const KISA_SURELER = [
  {
    title: "Fâtiha Sûresi",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
    okunusu: "Bismillâhirrahmânirrahîm. Elhamdü lillâhi rabbil-âlemîn. Errahmânirrahîm. Mâliki yevmid-dîn. İyyâke na'büdü ve iyyâke nesteîn. İhdinas-sırâtal-müstakîm. Sırâtallezîne en'amte aleyhim ğayril-mağdûbi aleyhim ve lad-dâllîn.",
    turkish: "Rahmân ve Rahîm olan Allah’ın adıyla. Hamd, Âlemlerin Rabbi, Rahmân, Rahîm, hesap, mükâfat ve ceza gününün (ahiret gününün) mâliki Allah’a mahsustur. (Allahım!) Yalnız sana ibadet ederiz ve yalnız senden yardım dileriz. Bizi doğru yola, kendilerine nimet verdiklerinin yoluna ilet; gazaba uğrayanlarınkine ve sapıklarınkine değil."
  },
  {
    title: "Duhâ Sûresi",
    arabic: "وَالضُّحَىٰ ۝ وَالَّيْلِ إِذَا سَجَىٰ ۝ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ۝ وَلَلْءَاخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰٓ ۝ أَلَمْ يَجِدْكَ يَتِيمًا فَـَٔاوَىٰ ۝ وَوَجَدَكَ ضَآلًّا فَهَدَىٰ ۝ وَوَجَدَكَ عَآئِلًا فَأَغْنَىٰ ۝ فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ ۝ وَأَمَّا السَّآئِلَ فَلَا تَنْهَرْ ۝ وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
    okunusu: "Vedduhâ. Velleyli izâ secâ. Mâ vedde'ake rabbüke vemâ kalâ. Velel'âhiratü hayrul leke minel-ûlâ. Velesevfe yü'tîke rabbüke feterdâ. Elem yecidke yetîmen feâvâ. Vevecedeke dâllen fehedâ. Vevecedeke 'âilen feagnâ. Feemmel-yetîme felâ takher. Veemmes-sâile felâ tenher. Veemmâ bini'meti rabbike fehaddis.",
    turkish: "Kuşluk vaktine andolsun, Karanlığı çöktüğü vakit geceye andolsun ki, Rabbin seni terk etmedi, sana darılmadı da. Muhakkak ki âhiret senin için dünyadan daha hayırlıdır. Şüphesiz, Rabbin sana verecek ve sen de hoşnut olacaksın. Seni yetim bulup da barındırmadı mı? Seni yolunu kaybetmiş olarak bulup da yola iletmedi mi? Seni ihtiyaç içinde bulup da zengin etmedi mi? Öyleyse sakın yetimi ezme! Sakın isteyeni azarlama! Rabbinin nimetine gelince; işte onu anlat."
  },
  {
    title: "İnşirâh (Şerh) Sûresi",
    arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۝ وَوَضَعْنَا عَنْكَ وِزْرَكَ ۝ الَّذِي أَنْقَضَ ظَهْرَكَ ۝ وَرَفَعْنَا لَكَ ذِكْرَكَ ۝ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ فَإِذَا فَرَغْتَ فَانْصَبْ ۝ وَإِلَى رَبِّكَ فَارْغَبْ",
    okunusu: "Elem neşrah leke sadrak. Ve vada'nâ anke vizrak. Ellezî enkada zahrak. Ve rafa'nâ leke zikrak. Fe-inne maal-usri yüsrâ. İnne maal-usri yüsrâ. Fe-izâ farağte fensab. Ve ilâ rabbike fergab.",
    turkish: "(Ey Muhammed!) Senin göğsünü açıp genişletmedik mi? Belini büken yükünü üzerinden kaldırmadık mı? Senin şânını yükseltmedik mi? Şüphesiz güçlükle beraber bir kolaylık vardır. Gerçekten, güçlükle beraber bir kolaylık vardır. Öyleyse, bir işi bitirince diğerine koyul. Ancak Rabbine yönel ve yalvar."
  },
  {
    title: "Tîn Sûresi",
    arabic: "وَالتِّينِ وَالزَّيْتُونِ ۝ وَطُورِ سِينِينَ ۝ وَهَذَا الْبَلَدِ الْأَمِينِ ۝ لَقَدْ خَلَقْنَا الْإِنْسَانَ فِي أَحْسَنِ تَقْوِيمٍ ۝ ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ ۝ فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ ۝ أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ",
    okunusu: "Vet-tîni vez-zeytûn. Ve tûri sînîn. Ve hâzel-beledil-emîn. Lekad halaknel-insâne fî ahseni takvîm. Sümme radednâhü esfele sâfilîn. İllellezîne âmenû ve amilüs-sâlihâti fe-lehüm ecrun ğayru memnûn. Femâ yükezzibüke ba'dü biddîn. Eleysallâhü bi ahkemil hâkimîn.",
    turkish: "Tîn’e ve zeytûn’a andolsun. Sinâ dağına andolsun, Bu güvenli şehre (Mekke’ye) andolsun ki, Biz, gerçekten insanı en güzel bir biçimde yarattık. Sonra onu, aşağıların aşağısına indirdik. Ancak, iman edip salih ameller işleyenler başka. Onlar için devamlı bir mükâfat vardır. (Ey insan!) Böyle iken, hangi şey sana hesap, mükâfat ve cezayı yalanlatıyor? Allah, hükmedenlerin en iyi hükmedeni değil midir?"
  },
  {
    title: "Alak Sûresi",
    arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِى خَلَقَ ۝ خَلَقَ الْإِنسَٰنَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ۝ الَّذِى عَلَّمَ بِالْقَلَمِ ۝ عَلَّمَ الْإِنسَٰنَ مَا لَمْ يَعْلَمْ ۝ كَلَّآ إِنَّ الْإِنسَٰنَ لَيَطْغَىٰٓ ۝ أَن رَّءَاهُ اسْتَغْنَىٰٓ ۝ إِنَّ إِلَىٰ رَبِّكَ الرُّجْعَىٰٓ ۝ أَرَءَيْتَ الَّذِى يَنْهَىٰ ۝ عَبْدًا إِذَا صَلَّىٰٓ ۝ أَرَءَيْتَ إِن كَانَ عَلَى الْهُدَىٰٓ ۝ أَوْ أَمَرَ بِالتَّقْوَىٰٓ ۝ أَرَءَيْتَ إِن كَذَّبَ وَتَوَلَّىٰٓ ۝ أَلَمْ يَعْلَم بِأَنَّ اللَّهَ يَرَىٰ ۝ كَلَّا لَئِن لَّمْ يَنتَهِ لَنَسْفَعًا بِالنَّاصِيَةِ ۝ نَاصِيَةٍ كَٰذِبَةٍ خَاطِئَةٍ ۝ فَلْيَدْعُ نَادِيَهُ ۝ سَنَدْعُ الزَّبَانِيَةَ ۝ كَلَّا لَا تُطِعْهُ وَاسْجُدْ وَاقْتَرِب",
    okunusu: "İkra' bismi rabbikel-lezî halek. Halekal-insâne min 'alak. İkra' verabbükel-ekram. Ellezî 'alleme bilkalem. 'Allemel-insâne mâ lem ya'lem. Kellâ innel-insâne leyatgâ. Er raâhüs-tagnâ. İnne ilâ rabbiker-ruc'â. Era'eytel-lezî yenhâ. 'Abden izâ sallâ. Era'eyte in kâne 'alel-hüdâ. Ev emera bittakvâ. Era'eyte in kezzebe vetevellâ. Elem ya'lem biennel-lâhe yerâ. Kellâ leil lem yentehi lenesfe'am binnâsiyeh. Nâsiyetin kâzibetin hâtieh. Felyed'u nâdiyeh. Sened'uz-zebâniyeh. Kellâ. Lâ tüti'hü vescüd vakterib.",
    turkish: "Yaratan Rabbinin adıyla oku! O, insanı “alak”dan yarattı. Oku! Senin Rabbin en cömert olandır. O, kalemle yazmayı öğretendir, insana bilmediğini öğretendir. Hayır, insan kendini yeterli gördüğü için mutlaka azgınlık eder. Şüphesiz dönüş ancak Rabbinedir. Sen, namaz kıldığında kulu (bundan) engelleyeni gördün mü? Ne dersin, ya o (engellenen kul) hidâyet üzere ise; ya da takvayı (Allah’a karşı gelmekten sakınmayı) emrediyorsa!? Ne dersin engelleyen, Peygamberi yalanlamış ve yüz çevirmişse!? O Allah’ın, her şeyi gördüğünü bilmiyor mu? Hayır! Andolsun, eğer vazgeçmezse, muhakkak onu perçeminden; o yalancı, günahkâr perçeminden yakalarız. Haydi, taraftarlarını çağırsın. Biz de zebânileri çağıracağız. Hayır! Sakın sen ona uyma; secde et ve Rabbine yaklaş."
  },
  {
    title: "Kadir Sûresi",
    arabic: "إِنَّا أَنْزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ ۝ وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ ۝ لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ ۝ تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِمْ مِنْ كُلِّ أَمْرٍ ۝ سَلَامٌ هِيَ حَتَّى مَطْلَعِ الْفَجْرِ",
    okunusu: "İnnâ enzelnâhü fî leyletil-kadr. Ve mâ edrâke mâ leyletül-kadr. Leyletül-kadri hayrun min elfi şehr. Tenezzelül-melâiketü ver-rûhu fîhâ bi-izni rabbihim min külli emr. Selâmün hiye hattâ matlail-fecr.",
    turkish: "Şüphesiz, biz onu (Kur’an’ı) Kadir gecesinde indirdik. Bilir misin nedir Kadir gecesi? Kadir gecesi bin aydan daha hayırlıdır. Melekler ve Ruh (Cebrail) o gecede, Rablerinin izniyle her türlü iş için iner de iner. O gece, tan yerinin ağarmasına kadar bir esenliktir."
  },
  {
    title: "Beyyine Sûresi",
    arabic: "لَمْ يَكُنِ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَٰبِ وَالْمُشْرِكِينَ مُنفَكِّينَ حَتَّىٰ تَأْتِيَهُمُ الْبَيِّنَةُ ۝ رَسُولٌ مِّنَ اللَّهِ يَتْلُوا صُحُفًا مُّطَهَّرَةً ۝ فِيهَا كُتُبٌ قَيِّمَةٌ ۝ وَمَا تَفَرَّقَ الَّذِينَ أُوتُوا الْكِتَٰبَ إِلَّا مِن بَعْدِ مَا جَآءَتْهُمُ الْبَيِّنَةُ ۝ وَمَآ أُمِرُوٓا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَآءَ وَيُقِيمُوا الصَّلَوٰةَ وَيُؤْتُوا الزَّكَوٰةَ وَذَٰلِكَ دِينُ الْقَيِّمَةِ ۝ إِنَّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَٰبِ وَالْمُشْرِكِينَ فِى نَارِ جَهَنَّمَ خَٰلِدِينَ فِيهَآ أُولَٰٓئِكَ هُمْ شَرُّ الْبَرِيَّةِ ۝ إِنَّ الَّذِينَ ءَامَنُوا وَعَمِلُوا الصَّٰلِحَٰتِ أُولَٰٓئِكَ هُمْ خَيْرُ الْبَرِيَّةِ ۝ جَزَآؤُهُمْ عِندَ رَبِّهِمْ جَنَّٰتُ عَدْنٍ تَجْرِى مِن تَحْتِهَا الْأَنْهَٰرُ خَٰلِدِينَ فِيهَآ أَبَدًا رَّضِىَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ذَٰلِكَ لِمَنْ خَشِىَ رَبَّهُ",
    okunusu: "Lem yekünil-lezîne keferû min ehlil-kitâbi velmüşrikîne münfekkîne hattâ te'tiyehümül-beyyineh. Rasûlüm minel-lâhi yetlû suhufem mütahherah. Fîhâ kütübün kayyimeh. Vemâ teferrakal-lezîne ûtül-kitâbe illâ mim ba'di mâ câethümül-beyyineh. Vemâ ümirû illâ liya'büdül-lâhe muhlisîne lehüd-dîne hunefâe veyükîmus-salâte veyü'tüz-zekâte vezâlike dînül-kayyimeh. İnnel-lezîne keferû min ehlil-kitâbi velmüşrikîne fî nâri cehenneme hâlidîne fîhâ. Ülâike hüm şerrul-beriyyeh. İnnel-lezîne âmenû ve'amilus-sâlihâti ülâike hüm hayrul-beriyyeh. Cezâühüm 'inde rabbihim cennâtü 'adnin tecrî min tahtihel-enhâru hâlidîne fîhâ ebedâ. Radiyel-lâhü 'anhüm veradû 'anh. Zâlike limen haşiye rabbeh.",
    turkish: "Kitap ehlinden inkâr edenler ile Allah’a ortak koşanlar, kendilerine apaçık delil gelinceye kadar (küfürden) ayrılacak değillerdi. Bu delil, tertemiz sahifeleri okuyan, Allah tarafından gönderilen bir peygamberdir. O sahifelerde dosdoğru hükümler vardır. Kendilerine kitap verilenler, ancak kendilerine o apaçık delil geldikten sonra ayrılığa düştüler. Hâlbuki onlara, ancak dini Allah’a has kılarak, hakka yönelen kimseler olarak O’na kulluk etmeleri, namazı kılmaları ve zekâtı vermeleri emredilmişti. İşte bu dosdoğru dindir. Şüphesiz, inkâr eden kitap ehli ile Allah’a ortak koşanlar, içinde ebedî kalmak üzere cehennem ateşindedirler. İşte onlar insanların en kötüsüdürler. Şüphesiz, iman edip, salih ameller işleyenler var ya; işte onlar insanların en hayırlısıdırlar. Rableri katında onların mükâfatı, içlerinden ırmaklar akan, içlerinde ebedî kalacakları Adn cennetleridir. Allah onlardan razı olmuştur, onlar da Allah’tan razı olmuşlardır. İşte bu mükâfat Rablerine derin saygı duyanlara mahsustur."
  },
  {
    title: "Zilzâl Sûresi",
    arabic: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا ۝ وَأَخْرَجَتِ الْأَرْضُ أَثْقَالَهَا ۝ وَقَالَ الْإِنْسَانُ مَا لَهَا ۝ يَوْمَئِذٍ تُحَدِّثُ أَخْبَارَهَا ۝ بِأَنَّ رَبَّكَ أَوْحَى لَهَا ۝ يَوْمَئِذٍ يَصْدُرُ النَّاسُ أَشْتَاتًا لِيُرَوْا أَعْمَالَهُمْ ۝ فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ",
    okunusu: "İzâ zülziletil-ardu zilzâlehâ. Ve ahracetil-ardu eskâlehâ. Ve kâlel-insânü mâ lehâ. Yevme-izin tühaddisü ahbârehâ. Bi-enne rabbeke evhâ lehâ. Yevme-izin yasdürün-nâsü eştâten li-yürav a'mâlehüm. Fe-men ya'mel miskâle zerretin hayran yerah. Ve men ya'mel miskâle zerretin şerran yerah.",
    turkish: "Yeryüzü kendine has bir sarsıntıya uğratıldığı, içindekileri dışarıya çıkarıp attığı ve insan, “Ona ne oluyor?” dediği zaman, İşte o gün, yer, kendi haberlerini anlatır. Çünkü Rabbin ona (öyle) vahyetmiştir. O gün insanlar amellerinin kendilerine gösterilmesi için bölük bölük kabirlerinden çıkacaklardır. Artık kim zerre ağırlığınca bir hayır işlerse, onun mükâfatını görecektir. Kim de zerre ağırlığınca bir kötülük işlerse, onun cezasını görecektir."
  },
  {
    title: "Âdiyât Sûresi",
    arabic: "وَالْعَٰدِيَٰتِ ضَبْحًا ۝ فَالْمُورِيَٰتِ قَدْحًا ۝ فَالْمُغِيرَٰتِ صُبْحًا ۝ فَأَثَرْنَ بِهِ نَقْعًا ۝ فَوَسَطْنَ بِهِ جَمْعًا ۝ إِنَّ الْإِنسَٰنَ لِرَبِّهِ لَكَنُودٌ ۝ وَإِنَّهُ عَلَىٰ ذَٰلِكَ لَشَهِيدٌ ۝ وَإِنَّهُ لِحُبِّ الْخَيْرِ لَشَدِيدٌ ۝ أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ مَا فِى الْقُبُورِ ۝ وَحُصِّلَ مَا فِى الصُّدُورِ ۝ إِنَّ رَبَّهُم بِهِمْ يَوْمَئِذٍ لَّخَبِيرٌ",
    okunusu: "Vel'âdiyâti dabhâ. Felmûriyâti kadhâ. Felmügîrâti subhâ. Feeserne bihî nak'â. Fevesatne bihî cem'â. İnnel-insâne lirabbihî lekenûd. Veinnehû 'alâ zâlike leşehîd. Veinnehû lihubbil-hayri leşedîd. Efelâ ya'lemü izâ bü'sira mâ fil-kubûr. Vehussile mâ fis-sudûr. İnne rabbehüm bihim yevmeizil lehabîr.",
    turkish: "Soluk soluğa süratle koşan, (koşarken ayaklarını) vurarak ateş çıkaran, sabah erkenden baskın yapan, orada tozu dumana katan ve düşman topluluğunun ortasına dalan atlara andolsun ki, insan gerçekten Rabbine karşı pek nankördür. Hiç şüphesiz buna kendisi de şahittir. Hiç şüphesiz o, mal sevgisi sebebiyle çok katıdır. Acaba o bilmiyor mu ki, kabirlerde bulunanlar çıkarıldığı ve kalplerdeki ortaya konulduğu zaman, işte o gün onların Rabbi kendilerinin her hâlinden mutlaka haberdardır."
  },
  {
    title: "Kâria Sûresi",
    arabic: "الْقَارِعَةُ ۝ مَا الْقَارِعَةُ ۝ وَمَآ أَدْرَىٰكَ مَا الْقَارِعَةُ ۝ يَوْمَ يَكُونُ النَّاسُ كَالْفَرَاشِ الْمَبْثُوثِ ۝ وَتَكُونُ الْجِبَالُ كَالْعِهْنِ الْمَنفُوشِ ۝ فَأَمَّا مَن ثَقُلَتْ مَوَٰزِينُهُ ۝ فَهُوَ فِى عِيشَةٍ رَّاضِيَةٍ ۝ وَأَمَّا مَنْ خَفَّتْ مَوَٰزِينُهُ ۝ فَأُمُّهُ هَاوِيَةٌ ۝ وَمَآ أَدْرَىٰكَ مَا هِيَهْ ۝ نَارٌ حَامِيَةٌ",
    okunusu: "Elkâri'ah. Mel-kâri'ah. Vemâ edrâke mel-kâri'ah. Yevme yekûnün-nâsü kelferâşil-mebsûs. Vetekûnül-cibâlü kel'ihnil-menfûş. Feemmâ men sekulet mevâzînüh. Fehüve fî 'îşetir râdiyeh. Veemmâ men haffet mevâzînüh. Feümmühû hâviyeh. Vemâ edrâke mâ hiyeh. Nârun hâmiyeh.",
    turkish: "Yürekleri hoplatan büyük felaket! Nedir o yürekleri hoplatan büyük felaket? Bilir misin nedir yürekleri hoplatan büyük felaket? O gün insanlar, her biri bir tarafa uçuşan küçük kelebekler gibi olacaktır. Dağlar da atılmış renkli yünler gibi olacaktır. İşte o vakit, kimin tartıları ağır gelmişse, Artık o, hoşnut olacağı bir hayat içinde olacaktır. Ama kimin de tartıları hafif gelirse, İşte onun anası (varacağı yer) Hâviye’dir. Bilir misin nedir Hâviye? O, kızgın bir ateştir."
  },
  {
    title: "Tekâsür Sûresi",
    arabic: "أَلْهَىٰكُمُ التَّكَاثُرُ ۝ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ ۝ كَلَّا سَوْفَ تَعْلَمُونَ ۝ ثُمَّ كَلَّا سَوْفَ تَعْلَمُونَ ۝ كَلَّا لَوْ تَعْلَمُونَ عِلْمَ الْيَقِينِ ۝ لَتَرَوُنَّ الْجَحِيمَ ۝ ثُمَّ لَتَرَوُنَّهَا عَيْنَ الْيَقِينِ ۝ ثُمَّ لَتُسْـَٔلُنَّ يَوْمَئِذٍ عَنِ النَّعِيمِ",
    okunusu: "Elhâkümüt-tekâsür. Hattâ zürtümül-mekâbir. Kellâ sevfe ta'lemûn. Sümme kellâ sevfe ta'lemûn. Kellâ lev ta'lemûne 'ilmel-yekîn. Leteravunnel-cehîm. Sümme leteravunnehâ 'aynel-yekîn. Sümme letüs'elünne yevmeizin 'anin-ne'îm.",
    turkish: "Çoklukla övünmek sizi, kabirlere varıncaya (ölünceye) kadar oyaladı. Hayır; ileride bileceksiniz! Hayır, Hayır! İleride bileceksiniz! Hayır, kesin olarak bir bilseniz.. Andolsun, o cehennemi muhakkak göreceksiniz. Yine andolsun, onu gözünüzle kesin olarak göreceksiniz. Sonra o gün, nimetlerden mutlaka hesaba çekileceksiniz?"
  },
  {
    title: "Asr Sûresi",
    arabic: "وَالْعَصْرِ ۝ إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ ۝ إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
    okunusu: "Vel-asr. İnnel-insâne le-fî husr. İllellezîne âmenû ve amilüs-sâlihâti ve tevâsav bil-hakkı ve tevâsav bis-sabr.",
    turkish: "Andolsun zamana ki, insan gerçekten ziyan içindedir. Ancak, iman edip de sâlih ameller işleyenler, birbirlerine hakkı tavsiye edenler, birbirlerine sabrı tavsiye edenler başka (Onlar ziyanda değillerdir)."
  },
  {
    title: "Hümeze Sûresi",
    arabic: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ ۝ الَّذِى جَمَعَ مَالًا وَعَدَّدَهُ ۝ يَحْسَبُ أَنَّ مَالَهُٓ أَخْلَدَهُ ۝ كَلَّا لَيُنبَذَنَّ فِى الْحُطَمَةِ ۝ وَمَآ أَدْرَىٰكَ مَا الْحُطَمَةُ ۝ نَارُ اللَّهِ الْمُوقَدَةُ ۝ الَّتِى تَطَّلِعُ عَلَى الْأَفْـِٔدَةِ ۝ إِنَّهَا عَلَيْهِم مُّؤْصَدَةٌ ۝ فِى عَمَدٍ مُّمَدَّدَةٍ",
    okunusu: "Veylül likülli hümezetil lümezeh. Ellezî ceme'a mâlev ve'addedeh. Yahsebü enne mâlehû ahledeh. Kellâ leyümbezenne fil-hutameh. Vemâ edrâke mel-hutameh. Nârul-lâhil-mûkadeh. Elletî tettali'u 'alel-ef'ideh. İnnehâ 'aleyhim mü'sadeh. Fî 'amedim mümeddedeh.",
    turkish: "Mal toplayan ve onu durmadan sayan, insanları arkadan çekiştiren, kaş göz işaretiyle alay eden her kişinin vay hâline! O, malının, kendisini ebedîleştirdiğini sanır. Hayır! Andolsun ki o, Hutâme’ye atılacaktır. Bilir misin nedir Hutame? O, Allah’ın, yüreklere işleyen tutuşturulmuş ateşidir. Şüphesiz uzatılmış direkler arasında (bağlı oldukları hâlde) ateş onların üzerine kapatılacaktır."
  },
  {
    title: "Fîl Sûresi",
    arabic: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ ۝ أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ ۝ وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ ۝ تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ ۝ فَجَعَلَهُمْ كَعَصْفٍ مَأْكُولٍ",
    okunusu: "Elem tera keyfe feale rabbüke bi-ashâbil-fîl. Elem yec'al keydehüm fî tadlîl. Ve ersele aleyhim tayran ebâbîl. Termîhim bi-hicâratin min siccîl. Fecealehüm keasfin me'kûl.",
    turkish: "Rabbinin, fil sahiplerine (bir fille desteklenmiş orduya) ne yaptığını görmedin mi? Onların tuzaklarını boşa çıkarmadı mı? Üzerlerine balçıktan pişirilmiş taşlar atan sürü sürü kuşlar gönderdi. Nihayet onları yenilmiş ekin yaprakları hâline getirdi."
  },
  {
    title: "Kureyş Sûresi",
    arabic: "لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ ۝ فَلْيَعْبُدُوا رَبَّ هَذَا الْبَيْتِ ۝ الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ",
    okunusu: "Li-îlâfi Kureyş. Îlâfihim rihleteş-şitâi ves-sayf. Felya'büdû rabbe hâzel-beyt. Ellezî et'amehüm min cûin ve âmenehüm min havf.",
    turkish: "Kureyş’i ısındırıp alıştırdığı; onları kışın (Yemen’e) ve yazın (Şam’a) yaptıkları yolculuğa ısındırıp alıştırdığı için, Kureyş de, kendilerini besleyip açlıklarını gideren ve onları korkudan emin kılan bu evin (Kâbe’nin) Rabbine kulluk etsin."
  },
  {
    title: "Mâûn Sûresi",
    arabic: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ ۝ فَذَلِكَ الَّذِي يَدُعُّ الْيَتِيمَ ۝ وَلَا يَحُضُّ عَلَى طَعَامِ الْمِسْكِينِ ۝ فَوَيْلٌ لِلْمُصَلِّينَ ۝ الَّذِينَ هُمْ عَنْ صَلَاتِهِمْ سَاهُونَ ۝ الَّذِينَ هُمْ يُرَاءُونَ ۝ وَيَمْنَعُونَ الْمَاعُونَ",
    okunusu: "Eraeytellezî yükezzibü bid-dîn. Fe-zâlikellezî yedu'ul-yetîm. Ve lâ yehuddu alâ taâmil-miskîn. Fe-veylün lil-musallîn. Ellezîne hüm an salâtihim sâhûn. Ellezîne hüm yürâûn. Ve yemneûnel-mâûn.",
    turkish: "Gördün mü, o hesap ve ceza gününü yalanlayanı! İşte o, yetimi itip kakan, yoksula yedirmeyi özendirmeyen kimsedir. Yazıklar olsun o namaz kılanlara ki, Onlar namazlarını ciddiye almazlar. Onlar (namazlarıyla) gösteriş yaparlar. Ufacık bir şeyi bile ödünç vermezler."
  },
  {
    title: "Kevser Sûresi",
    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ ۝ فَصَلِّ لِرَبِّكَ وَانْحَرْ ۝ إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
    okunusu: "İnnâ a'taynâkel-kevser. Fe-salli li-rabbike venhar. İnne şânieke hüvel-ebter.",
    turkish: "Şüphesiz biz sana Kevser’i verdik. O hâlde, Rabbin için namaz kıl, kurban kes. Doğrusu sana buğzeden, soyu kesik olanın ta kendisidir."
  },
  {
    title: "Kâfirûn Sûresi",
    arabic: "قُلْ يَا أَيُّهَا الْكَافِرُونَ ۝ لَا أَعْبُدُ مَا تَعْبُدُونَ ۝ وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ ۝ وَلَا أَنَا عَابِدٌ مَا عَبَدْتُمْ ۝ وَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ ۝ لَكُمْ دِينُكُمْ وَلِيَ دِينِ",
    okunusu: "Kul yâ eyyühel-kâfirûn. Lâ a'büdü mâ ta'büdûn. Ve lâ entüm âbidûne mâ a'büd. Ve lâ ene âbidün mâ abedtüm. Ve lâ entüm âbidûne mâ a'büd. Leküm dînüküm ve liye dîn.",
    turkish: "De ki: “Ey Kâfirler!” “Ben sizin kulluk ettiklerinize kulluk etmem.” “Siz de benim kulluk ettiğime kulluk edecek değilsiniz.” “Ben sizin kulluk ettiklerinize kulluk edecek değilim.” “Siz de benim kulluk ettiğime kulluk edecek değilsiniz.” “Sizin dininiz size, benim dinim de banadır.”"
  },
  {
    title: "Nasr Sûresi",
    arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ إِنَّهُ كَانَ تَوَّابًا",
    okunusu: "İzâ câe nasrullâhi vel-feth. Ve raeyten-nâse yedhulûne fî dînillâhi efvâcâ. Fe-sebbih bi-hamdi rabbike vestağfirh, innehû kâne tevvâbâ.",
    turkish: "Allah’ın yardımı ve fetih (Mekke fethi) geldiğinde ve insanların bölük bölük Allah’ın dinine girdiğini gördüğünde, Rabbine hamd ederek tespihte bulun ve O’ndan bağışlama dile. Çünkü O, tövbeleri çok kabul edendir."
  },
  {
    title: "Tebbet (Mesed) Sûresi",
    arabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ۝ مَا أَغْنَى عَنْهُ مَالُهُ وَمَا كَسَبَ ۝ سَيَصْلَى نَارًا ذَاتَ لَهَبٍ ۝ وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ ۝ فِي جِيدِهَا حَبْلٌ مِنْ مَسَدٍ",
    okunusu: "Tebbet yedâ ebî lehebin ve tebb. Mâ ağnâ anhü mâlühû ve mâ keseb. Seyaslâ nâran zâte leheb. Vemraetühû hammâletel-hatab. Fî cîdihâ hablün min mesed.",
    turkish: "Ebû Leheb’in elleri kurusun. Zaten kurudu. Ona ne malı fayda verdi, ne de kazandığı. O, bir alevli ateşe girecektir. Boynunda bükülmüş hurma liflerinden bir ip olduğu hâlde sırtında odun taşıyarak karısı da (o ateşe girecektir)."
  },
  {
    title: "İhlâs Sûresi",
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    okunusu: "Kul hüvellâhü ehad. Allâhüs-samed. Lem yelid ve lem yûled. Ve lem yekün lehû küfüven ehad.",
    turkish: "De ki: “O, Allah’tır, bir tektir.” “Allah Samed’dir. (Her şey O’na muhtaçtır; O, hiçbir şeye muhtaç değildir.)” O’ndan çocuk olmamıştır (Kimsenin babası değildir). Kendisi de doğmamıştır (kimsenin çocuğu değildir).” “Hiçbir şey O’na denk ve benzer değildir.”"
  },
  {
    title: "Felâk Sûresi",
    arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    okunusu: "Kul eûzü bi-rabbil-felak. Min şerri mâ halak. Ve min şerri ğâsikın izâ vekab. Ve min şerrin-neffâsâti fil-ukad. Ve min şerri hâsidin izâ hased.",
    turkish: "De ki: “Yarattığı şeylerin kötülüğünden, karanlığı çöktüğü zaman gecenin kötülüğünden, düğümlere üfleyenlerin kötülüğünden, haset ettiği zaman hasetçinin kötülüğünden, sabah aydınlığının Rabbine sığınırım.”"
  },
  {
    title: "Nâs Sûresi",
    arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
    okunusu: "Kul eûzü bi-rabbin-nâs. Melikin-nâs. İlâhin-nâs. Min şerril-vesvâsil-hannâs. Ellezî yüvesvisü fî sudûrin-nâs. Minel-cinneti ven-nâs.",
    turkish: "De ki: “Cinlerden ve insanlardan; insanların kalplerine vesvese veren sinsi vesvesecinin kötülüğünden, insanların Rabbine, insanların Melik’ine, insanların İlâh’ına sığınırım.”"
  }
];

/* ══════════ SABAH / AKŞAM EZKÂRI (Tam Metin) ══════════ */
const EZKAR_SABAH = [
  { title: "Âyetel Kürsî", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", okunusu: "Allâhü lâ ilâhe illâ hüvel-hayyül-kayyûm. Lâ te'huzühû sinetün ve lâ nevm. Lehû mâ fis-semâvâti ve mâ fil-ard. Menzellezî yeşfeu indehû illâ bi-iznih. Ya'lemü mâ beyne eydîhim ve mâ halfehüm. Ve lâ yühîtûne bi-şey'in min ilmihî illâ bimâ şâ'. Vesia kürsiyyühüs-semâvâti vel-ard. Ve lâ yeûdühû hıfzuhümâ ve hüvel-aliyyül-azîm.", turkish: "Allah, kendisinden başka hiçbir ilah olmayandır. Diridir, kayyumdur. O'nu ne bir uyuklama ne de uyku tutar. Göklerdeki ve yerdeki her şey O'nundur. Sabah okuyan akşama kadar korunur.", count: 1 },
  { title: "İhlâs Sûresi", arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", okunusu: "Kul hüvellâhü ehad. Allâhüs-samed. Lem yelid ve lem yûled. Ve lem yekün lehû küfüven ehad.", turkish: "De ki: O Allah birdir. Allah Samed'dir (her şey O'na muhtaç, O hiçbir şeye muhtaç değil). O doğurmamış ve doğmamıştır. Hiçbir şey O'na denk değildir.", count: 3 },
  { title: "Felâk Sûresi", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", okunusu: "Kul eûzü bi-rabbil-felak. Min şerri mâ halak. Ve min şerri ğâsikın izâ vekab. Ve min şerrin-neffâsâti fil-ukad. Ve min şerri hâsidin izâ hased.", turkish: "De ki: Yarattığı şeylerin şerrinden, karanlığı çöktüğü zaman gecenin şerrinden, düğümlere üfleyen büyücülerin şerrinden ve haset ettiği zaman hasetçinin şerrinden sabahın Rabbine sığınırım.", count: 3 },
  { title: "Nâs Sûresi", arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ", okunusu: "Kul eûzü bi-rabbin-nâs. Melikin-nâs. İlâhin-nâs. Min şerril-vesvâsil-hannâs. Ellezî yüvesvisü fî sudûrin-nâs. Minel-cinneti ven-nâs.", turkish: "De ki: İnsanların Rabbine, insanların Melik'ine, insanların İlah'ına; sinsi vesvesecinin, insanların göğüslerine vesvese veren cin ve insanların şerrinden sığınırım.", count: 3 },
  { title: "Sabah Tesbihi", arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", okunusu: "Allahümme bike esbahnâ ve bike emseynâ ve bike nehyâ ve bike nemûtü ve ileyke'l-masîr.", turkish: "Allah'ım! Senin iznin ve yardımla sabahladık ve akşamladık. Yine senin izin ve yardımla yaşar ve ölürüz. Sonunda dönüş yalnız sanadır.", count: 1 },
  { title: "Seyyidü'l-İstiğfar", arabic: "اَللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", okunusu: "Allâhümme ente rabbî lâ ilâhe illâ ente, halaktenî ve ene abdük, ve ene alâ ahdike ve va'dike mesteta't. Eûzü bike min şerri mâ sana't. Ebûü leke bi-ni'metike aleyye ve ebûü bi-zenbî fağfir lî fe-innehû lâ yağfiruz-zünûbe illâ ent.", turkish: "Allah'ım! Sen benim Rabbimsin! Senden başka hiçbir ilâh yoktur. Beni sen yarattın. Ben senin kulunum; gücüm yettiği kadarıyla senin ahdin ve va'din üzere bulunuyorum. Yaptığım fenalıkların şerrinden sana sığınırım. Üzerimde olan nimetlerini itiraf ederim; günahımı da itiraf ederim. Beni bağışla; çünkü senden başka hiçbir kimse günahları bağışlamaz.", count: 1 },
  { title: "Tesbih (Sübhânallâhi ve bi-hamdih)", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", okunusu: "Sübhânallâhi ve bihamdihî", turkish: "Allah her türlü eksiklikten uzak ve çok yücedir. O'na hamdederim.", count: 100 },
  { title: "Salavât-ı Şerife", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيد، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", okunusu: "Allâhümme salli ve sellim alâ nebiyyinâ Muhammed.", turkish: "Allah'ım! Muhammed'e ve Muhammed'in ailesine, İbrahim ve onun ailesi üzerine salât ettiğin gibi salât et!", count: 10 },
  { title: "Tevhid", arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", okunusu: "Lâ ilâhe illâllâhü vahdehû lâ şerîke leh. Lehü'l-mülkü ve lehü'l-hamdü yuhyî ve yümît. Ve hüve hayyün lâ yemût. Biyedihi'l-hayr. Ve hüve alâ külli şey'in kadîr", turkish: "Allah'tan başka hiçbir ilâh yoktur. O tektir. O'nun hiçbir ortağı yoktur. Mülk O'nundur. Hamd O'na mahsustur. O diriltir ve öldürür. O ise hep diridir, ölmez. Her hayır O'nun elindedir. O her şeye kadirdir.", count: 10 },
  { title: "İstiğfar", arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ", okunusu: "Estağfirullâhel-azîm ellezî lâ ilâhe illâ hüvel-hayyel-kayyûme ve etûbü ileyh.", turkish: "Kendisinden başka ilah olmayan, Hayy ve Kayyûm olan yüce Allah'tan bağışlanma diler ve O'na tövbe ederim.", count: 33 }
];

const EZKAR_AKSAM = [
  { title: "Âyetel Kürsî", arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ", okunusu: "Allâhü lâ ilâhe illâ hüvel-hayyül-kayyûm. Lâ te'huzühû sinetün ve lâ nevm. Lehû mâ fis-semâvâti ve mâ fil-ard. Menzellezî yeşfeu indehû illâ bi-iznih. Ya'lemü mâ beyne eydîhim ve mâ halfehüm. Vesia kürsiyyühüs-semâvâti vel-ard. Ve lâ yeûdühû hıfzuhümâ ve hüvel-aliyyül-azîm.", turkish: "Allah, kendisinden başka hiçbir ilah olmayandır. Diridir, kayyumdur. Akşam okuyan sabaha kadar korunur.", count: 1 },
  { title: "İhlâs Sûresi", arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ", okunusu: "Kul hüvellâhü ehad. Allâhüs-samed. Lem yelid ve lem yûled. Ve lem yekün lehû küfüven ehad.", turkish: "De ki: O Allah birdir. Allah Samed'dir. O doğurmamış ve doğmamıştır. Hiçbir şey O'na denk değildir.", count: 3 },
  { title: "Felâk Sûresi", arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ", okunusu: "Kul eûzü bi-rabbil-felak. Min şerri mâ halak. Ve min şerri ğâsikın izâ vekab. Ve min şerrin-neffâsâti fil-ukad. Ve min şerri hâsidin izâ hased.", turkish: "De ki: Yarattığı şeylerin şerrinden, karanlığı çöktüğü zaman gecenin şerrinden, düğümlere üfleyen büyücülerin şerrinden ve haset ettiği zaman hasetçinin şerrinden sabahın Rabbine sığınırım.", count: 3 },
  { title: "Nâs Sûresi", arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ", okunusu: "Kul eûzü bi-rabbin-nâs. Melikin-nâs. İlâhin-nâs. Min şerril-vesvâsil-hannâs. Ellezî yüvesvisü fî sudûrin-nâs. Minel-cinneti ven-nâs.", turkish: "De ki: İnsanların Rabbine, Melik'ine, İlah'ına; sinsi vesvesecinin, insanların göğüslerine vesvese veren cin ve insanların şerrinden sığınırım.", count: 3 },
  { title: "Akşam Tesbihi", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", okunusu: "Allahümme bike esbahnâ ve bike emseynâ ve bike nehyâ ve bike nemûtü ve ileyke'l-masîr.", turkish: "Allah'ım! Senin iznin ve yardımla sabahladık ve akşamladık. Yine senin izin ve yardımla yaşar ve ölürüz. Sonunda dönüş yalnız sanadır.", count: 1 },
  { title: "Sığınma Duası", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ", okunusu: "Bismillâhillezî lâ yedurru mea'smihî şey'ün fi'l-ardı velâ fi's-semâi ve hüve's-semî'u'l-'alîm.", turkish: "Allah'ın adıyla… O'nun adıyla (hareket edildiğinde) yerde ve gökte hiçbir şeyin zararı dokunmaz. O, hakkıyla işitendir, hakkıyla bilendir.", count: 3 },
  { title: "Seyyidü'l-İstiğfar", arabic: "اَللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ.", okunusu: "Allâhümme ente rabbî lâ ilâhe illâ ente, halaktenî ve ene abdük, ve ene alâ ahdike ve va'dike mesteta't. Eûzü bike min şerri mâ sana't. Ebûü leke bi-ni'metike aleyye ve ebûü bi-zenbî fağfir lî fe-innehû lâ yağfiruz-zünûbe illâ ent.", turkish: "Allah'ım! Sen benim Rabbimsin! Senden başka hiçbir ilâh yoktur. Beni sen yarattın. Ben senin kulunum; gücüm yettiği kadarıyla senin ahdin ve va'din üzere bulunuyorum. Yaptığım fenalıkların şerrinden sana sığınırım. Üzerimde olan nimetlerini itiraf ederim; günahımı da itiraf ederim. Beni bağışla; çünkü senden başka hiçbir kimse günahları bağışlamaz.", count: 1 },
  { title: "Tesbih (Sübhânallâhi ve bi-hamdih)", arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ", okunusu: "Sübhânallâhi ve bihamdihî", turkish: "Allah her türlü eksiklikten uzak ve çok yücedir. O'na hamdederim.", count: 100 },
  { title: "Salavât-ı Şerife", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيد، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ", okunusu: "Allâhümme salli ve sellim alâ nebiyyinâ Muhammed.", turkish: "Allah'ım! Muhammed'e ve Muhammed'in ailesine, İbrahim ve onun ailesi üzerine salât ettiğin gibi salât et!", count: 10 },
  { title: "İstiğfar", arabic: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ", okunusu: "Estağfirullâhel-azîm ellezî lâ ilâhe illâ hüvel-hayyel-kayyûme ve etûbü ileyh.", turkish: "Kendisinden başka ilah olmayan, Hayy ve Kayyûm olan yüce Allah'tan bağışlanma diler ve O'na tövbe ederim.", count: 33 }
];

/* ══════════ GÜNLÜK DUALAR ══════════ */
const GUNLUK_DUALAR = [
  { title: "Yemekten Önce", arabic: "إِذَا أَكَلَ أَحَدُكُمْ طَعَامًا فَلْيَقُلْ بِسْمِ اللَّهِ، فَإِنْ نَسِيَ فِى أَوَّلِهِ فَلْيَقُلْ بِسْمِ اللَّهِ فِى أَوَّلِهِ وَآخِرِهِ.", okunusu: "Bismillâh — (unutulursa) Bismillâhi fî evvelihî ve âhirihî.", turkish: "Biriniz yemek yiyeceği zaman, 'Bismillâh' (Allah'ın adıyla) desin. Eğer yemeğin başında besmele çekmeyi unutursa, 'Başında da sonunda da Allah'ın adıyla' desin.", tag: "yemek" },
  { title: "Yemekten Sonra", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ", okunusu: "Elhamdü li'llâhi'llezî et'amenâ ve sekânâ ve ce'alenâ müslimîn.", turkish: "Bizi doyurup içiren ve bizi Müslümanlardan eyleyen Allah'a hamdolsun.", tag: "yemek" },
  { title: "Uyumadan Önce", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", okunusu: "Allahümme eslemtü nefsî ileyke ve veccehtü vechî ileyke ve fevvaztü emrî ileyke ve elce'tü zahrî ileyke rağbeten ve rehbeten ileyke, lâ melcee ve lâ mencee minke illâ ileyke, âmentü bi kitâbikellezî enzelte ve bi nebiyyikellezî erselte", turkish: "Allah'ım! (rahmetini) umarak, (azabından) korkarak kendimi sana teslim ettim. Yüzümü sana çevirdim. İşimi sana ısmarladım. Sırtımı sana dayadım, sana sığındım. Senden başka sığınak, senden başka dayanak yoktur. İndirdiğin kitaba ve gönderdiğin peygambere inandım.", tag: "uyku" },
  { title: "Uyanınca", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", okunusu: "Elhamdü lillâhillezî ahyânâ ba'de mâ emâtenâ ve ileyhin-nüşûr.", turkish: "Bizi öldürdükten sonra dirilten Allah'a hamd olsun. Dönüş O'nadır.", tag: "uyku" },
  { title: "Tuvalete Girerken", arabic: "اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", okunusu: "Allâhümme innî eûzü bike mine'l-hubüsi ve'l-habâis.", turkish: "Allah'ım! Her türlü pislikten ve necasetten sana sığınırım.", tag: "tuvalet" },
  { title: "Tuvaletten Çıkarken", arabic: "غُفْرَانَكَ", okunusu: "Ğufrânek", turkish: "Senden bağışlanma dilerim.", tag: "tuvalet" },
  { title: "Eve Girerken", arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا", okunusu: "Bismillâhi velecnâ ve bismillâhi haracnâ ve alâ rabbinâ tevekkelnâ.", turkish: "Allah'ın adıyla girer, Allah'ın adıyla çıkarız ve Rabbimize güveniriz.", tag: "ev" },
  { title: "Evden Çıkarken", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", okunusu: "Bismillâhi tevekkeltü alâllâhi ve lâ havle ve lâ kuvvete illâ billâh.", turkish: "Allah'ın adıyla, Allah'a tevekkül ettim. Güç ve kuvvet ancak Allah'tandır.", tag: "ev" },
  { title: "Yolculuğa Çıkarken", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ", okunusu: "Sübhânellezî sahhara lenâ hâzâ ve mâ künnâ lehû mukrinîn.", turkish: "Bunu bizim hizmetimize veren Allah'ı tesbih ederim. Buna bizim gücümüz yetmezdi.", tag: "yolculuk" },
  { title: "Abdestten Sonra", arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", okunusu: "Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh.", turkish: "Şahitlik ederim ki Allah'tan başka ilah yoktur ve Muhammed O'nun kulu ve elçisidir.", tag: "abdest" },
  { title: "Camiye Girerken", arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", okunusu: "Allâhümmeftah lî ebvâbe rahmetik.", turkish: "Allah'ım! Bana rahmet kapılarını aç.", tag: "cami" },
  { title: "Camiden Çıkarken", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", okunusu: "Allâhümme innî es'elüke min fadlik.", turkish: "Allah'ım! Senden lütfunu isterim.", tag: "cami" },
  { title: "Aynaya Bakınca", arabic: "اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي", okunusu: "Allâhümme kemâ hassente halkî fe-hassin hulukî.", turkish: "Allah'ım! Yaratılışımı güzel yaptığın gibi ahlakımı da güzelleştir.", tag: "ayna" },
  { title: "Nazara Karşı", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ", okunusu: "Eûzü bi-kelimâtillâhit-tâmmeti min külli şeytânin ve hâmmetin ve min külli aynin lâmmeh.", turkish: "Her türlü şeytandan, zararlıdan ve kem gözden Allah'ın tam kelimelerine sığınırım.", tag: "nazar" },
  { title: "Sıkıntı Anında", arabic: "اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ", okunusu: "Allahümme innî e'ûzü bike mine'l-hemmi ve'l-hazeni. Ve e'ûzü bike mine'l-'aczi ve'l-keseli. Ve e'ûzü bike mine'l-cübni ve'l-buhli. Ve e'ûzü bike min ğalebeti'd-deyni ve kahri'r-ricâli.", turkish: "Allah'ım! Kederden ve üzüntüden, acizlikten, tembellikten, cimrilikten, korkaklıktan, borç yükünden ve insanların kahrından sana sığınırım.", tag: "sıkıntı" },
  { title: "Hastalık Anında", arabic: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ وَاشْفِ أَنْتَ الشَّافِي", okunusu: "Allahümme Rabbe'n-nâsi! Ezhibi'l-be'se, veşfihi, ve ente'ş-şâfî", turkish: "Allah'ım, ey insanların Rabbi! Sıkıntıyı gider, şifa ver. Senin vereceğin şifadan başka şifa yoktur.", tag: "hastalık" },
  { title: "Rızık İçin", arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", okunusu: "Allahümmekfinî bihalâlike an harâmike ve ağninî bifadlike ammen sivâke", turkish: "Allah'ım! Harama bulaşmaktansa, helalinle yetineyim. Beni lütfunla Senden başkasına muhtaç etme.", tag: "rızık" },
  { title: "İşe Başlarken", arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", okunusu: "Bismillâhirrahmânirrahîm.", turkish: "Rahman ve Rahim olan Allah'ın adıyla.", tag: "iş" }
];

/* ══════════ ÖNEMLİ SURELER (Hızlı Erişim) ══════════ */
const ONEMLI_SURELER = [
  { id: 1, name: "Fâtiha", fazilet: "Namazın direği, her rekâtta okunan; şifa ve dua suresidir. Kur'an'ın anasıdır (Ümmü'l-Kitâb)." },
  { id: 2, name: "Bakara", fazilet: "En uzun suredir. İçinde Âyetel Kürsî ve Âmenerrasûlü bulunur; okunan eve şeytan giremez." },
  { id: 3, name: "Âl-i İmran", fazilet: "İman, sabır ve dua ayetleriyle doludur; Bakara ile birlikte 'Zehravân' (iki nur) denir." },
  { id: 13, name: "Ra'd", fazilet: "Allah'ın kudretini ve kâinattaki ayetlerini anlatır; kalplerin ancak zikirle huzur bulacağını bildirir." },
  { id: 17, name: "İsrâ", fazilet: "Miraç mucizesiyle başlar; ana-babaya iyilik ve güzel ahlak ayetleriyle bilinir." },
  { id: 18, name: "Kehf", fazilet: "Cuma günü okuyana iki cuma arası nur olur, Deccal fitnesinden korur." },
  { id: 19, name: "Meryem", fazilet: "Hz. Meryem ve Hz. İsa'nın kıssasını anlatır; rahmet ve tevhid suresidir." },
  { id: 20, name: "Tâhâ", fazilet: "Hz. Musa'nın kıssası; Hz. Ömer'in bu sureyi okuyunca Müslüman olduğu rivayet edilir." },
  { id: 32, name: "Secde", fazilet: "Peygamberimizin cuma sabah namazında okuduğu; içinde tilavet secdesi bulunan suredir." },
  { id: 36, name: "Yâsîn", fazilet: "Kur'an'ın kalbidir. Ölülerin ve dirilerin üzerine okunur; huzur ve mağfiret vesilesidir." },
  { id: 44, name: "Duhân", fazilet: "Cuma gecesi okuyanın bağışlanacağı rivayet edilen mübarek suredir." },
  { id: 48, name: "Fetih", fazilet: "Zafer, feth ve müjde suresidir; okuyana kolaylık ve bereket vesilesidir." },
  { id: 50, name: "Kâf", fazilet: "Öldükten sonra dirilişi ve ahireti güçlü tasvirlerle anlatır." },
  { id: 55, name: "Rahmân", fazilet: "Kur'an'ın gelini; Allah'ın nimetlerini sayan şükür suresidir." },
  { id: 56, name: "Vâkıa", fazilet: "Fakirlik korkusuna karşı okunur; her gece okuyana fakirlik dokunmaz." },
  { id: 59, name: "Haşr", fazilet: "Son ayetleri Allah'ın güzel isimlerini içerir; sabah-akşam okunması tavsiye edilir." },
  { id: 62, name: "Cuma", fazilet: "Cuma gününün ve namazının önemini bildirir; cuma günü okunması sünnettir." },
  { id: 63, name: "Münâfikûn", fazilet: "Münafıkların hallerini anlatır; mümini uyarır ve samimiyete çağırır." },
  { id: 67, name: "Mülk (Tebâreke)", fazilet: "Kabir azabına engel olur; okuyanı ölene kadar korur ve ona şefaat eder." },
  { id: 73, name: "Müzzemmil", fazilet: "Gece ibadeti ve Kur'an tilavetine teşvik eder; kulluk sabrını öğretir." },
  { id: 78, name: "Nebe' (Amme)", fazilet: "Ahiret ve kıyamet hallerini anlatan uyarıcı suredir." },
  { id: 87, name: "A'lâ", fazilet: "Peygamberimizin vitir ve bayram namazlarında okuduğu; tesbih ve arınma suresidir." },
  { id: 93, name: "Duhâ", fazilet: "Peygamberimize teselli ve müjde suresidir; ümitsizliğe karşı okunur." },
  { id: 94, name: "İnşirâh (Şerh)", fazilet: "'Her zorlukla beraber bir kolaylık vardır' müjdesini verir; sıkıntıya karşı okunur." },
  { id: 97, name: "Kadir", fazilet: "Kadir gecesinin bin aydan hayırlı olduğunu bildirir; Ramazan'da çok okunur." },
  { id: 108, name: "Kevser", fazilet: "En kısa suredir; Peygamberimize verilen Kevser'i ve bol hayrı müjdeler." },
  { id: 112, name: "İhlâs", fazilet: "Tevhidin özü; üç kez okunması Kur'an'ın üçte birine denktir." },
  { id: 113, name: "Felâk", fazilet: "Dış şerlerden, büyü ve kötülüklerden korunma (muavvize) suresidir." },
  { id: 114, name: "Nâs", fazilet: "İç vesveseden, cin ve insan şerrinden korunma (muavvize) suresidir." }
];

/* ══════════ HİCRİ TAKVİM - KANDİL VE ÖNEMLİ GÜNLER (2026) ══════════ */
/* KANDIL_GUNLERI kaldırıldı (v64.8): dini günler artık hicri takvimden otomatik hesaplanıyor → features.js hvDiniGunler() */

/* ══════════ CUMA MESAJLARI ══════════ */
const CUMA_MESAJLARI = [
  "Cuma; kalplerin arındığı, duaların kabul olduğu bereketli gündür. Hayırlı Cumalar.",
  "Rabbim bu mübarek Cuma hürmetine gönüllerinizi ferah, dualarınızı makbul eylesin. Hayırlı Cumalar.",
  "Bir Cuma sabahı daha... Kalbiniz huzurla, gönlünüz imanla dolsun. Hayırlı Cumalar.",
  "Salât ve selamların en güzeli Efendimize olsun. Bu Cuma rahmet olsun üzerinize. Hayırlı Cumalar.",
  "Duaların göklere yükseldiği bu güzel günde adınız hayırla anılsın. Hayırlı Cumalar.",
  "Cuma; bereketin, rahmetin ve mağfiretin günüdür. Allah dualarınızı kabul etsin. Hayırlı Cumalar.",
  "Gönlünüzden geçen tüm güzel dilekler kabul olsun. Bu Cuma yüzünüz gülsün. Hayırlı Cumalar.",
  "Rahmet kapılarının ardına kadar açıldığı bu günde Rabbim sizi affetsin. Hayırlı Cumalar.",
  "Kalbi Allah sevgisiyle dolu olanlara ne mutlu. Bu Cuma huzur bulasınız. Hayırlı Cumalar.",
  "Bugün Cuma; tövbelerin kabul, günahların af, duaların makbul olduğu gün. Hayırlı Cumalar.",
  "Allah'ım! Bu Cuma hürmetine hastalarımıza şifa, dertlilere derman, dualarımıza kabul nasip eyle. Âmin. Hayırlı Cumalar.",
  "Selam olsun imanla yaşayanlara ve gönlü güzel insanlara. Hayırlı Cumalar.",
  "Rabbim, bu mübarek günde evinize bereket, sofranıza bolluk, kalbinize huzur versin. Hayırlı Cumalar.",
  "Ellerin semaya açıldığı, gönüllerin Rabbe yöneldiği bu güzel günde dualarınız kabul olsun. Hayırlı Cumalar.",
  "Cuma günü bir bayramdır; kalbi kırık olanların gönlü onarılsın, umudu tükenenlerin umudu yeşersin. Hayırlı Cumalar.",
  "Allah bu Cuma hürmetine sizi sevdiklerinizden ayırmasın, ömrünüze bereket katsın. Hayırlı Cumalar.",
  "Sevgili Peygamberimiz buyurdu: Günlerinizin en faziletlisi Cuma günüdür. Bu güzel günde salavatla anılın. Hayırlı Cumalar.",
  "Rabbim gönlünüzdeki hüznü sevince, sıkıntıyı ferahlığa çevirsin. Hayırlı Cumalar.",
  "Bu Cuma, geçmişin yüklerini bırakıp yeni bir sayfa açma günü olsun. Allah kolaylık versin. Hayırlı Cumalar.",
  "Sabrınız kabule, umudunuz nasibe, dualarınız icabete dönüşsün. Hayırlı Cumalar.",
  "Anne babanızın, sevdiklerinizin ve tüm Müslümanların günahları affolsun. Hayırlı Cumalar.",
  "Rabbim, rızkınızı helalinden bol, ömrünüzü hayırla uzun eylesin. Hayırlı Cumalar.",
  "Her Cuma bir başlangıçtır. Bu hafta kalbiniz ferah, işleriniz rast gitsin. Hayırlı Cumalar.",
  "Rabbimiz, ahirete göçen yakınlarımıza rahmet, geride kalanlara sabır ve huzur versin. Hayırlı Cumalar."
];

/* ══════════ İSLAMİ BİLGİ QUİZİ (50 Soru) ══════════ */
const QUIZ_QUESTIONS = [
  { q: "Kur'an-ı Kerim kaç sureden oluşur?", options: ["112", "114", "116", "120"], answer: 1 },
  { q: "İslam'ın ilk şartı nedir?", options: ["Namaz", "Oruç", "Kelime-i Şehadet", "Zekât"], answer: 2 },
  { q: "Günde kaç vakit namaz farzdır?", options: ["3", "4", "5", "6"], answer: 2 },
  { q: "Ramazan ayında tutulan oruç hangi namazdan sonra açılır (iftar)?", options: ["Öğle", "İkindi", "Akşam", "Yatsı"], answer: 2 },
  { q: "Kur'an'ın ilk suresi hangisidir?", options: ["Bakara", "Fâtiha", "İhlâs", "Nâs"], answer: 1 },
  { q: "Kur'an'ın en uzun suresi hangisidir?", options: ["Bakara", "Âl-i İmran", "Nisâ", "Mâide"], answer: 0 },
  { q: "Peygamberimiz Hz. Muhammed (s.a.v.) hangi şehirde doğmuştur?", options: ["Medine", "Kudüs", "Mekke", "Taif"], answer: 2 },
  { q: "Kâbe hangi şehirdedir?", options: ["Medine", "Mekke", "Şam", "Bağdat"], answer: 1 },
  { q: "Zekât kaç oranında verilir?", options: ["%2,5", "%5", "%10", "%20"], answer: 0 },
  { q: "Hac ibadeti nerede yapılır?", options: ["Medine", "Mekke", "Kudüs", "Necef"], answer: 1 },
  { q: "İlk vahiy hangi ayla başlamıştır?", options: ["Recep", "Şaban", "Ramazan", "Muharrem"], answer: 2 },
  { q: "Namazda kıble neresidir?", options: ["Mescid-i Aksa", "Kâbe", "Mescid-i Nebevî", "Arafat"], answer: 1 },
  { q: "Peygamberimizin annesinin adı nedir?", options: ["Halime", "Âmine", "Hatice", "Fatıma"], answer: 1 },
  { q: "Peygamberimizin ilk eşi kimdir?", options: ["Âişe", "Hatice", "Hafsa", "Zeynep"], answer: 1 },
  { q: "Kur'an kaç yılda tamamlanmıştır (yaklaşık)?", options: ["10 yıl", "23 yıl", "30 yıl", "40 yıl"], answer: 1 },
  { q: "Hangisi meleklerdendir?", options: ["Cebrail", "Ebu Leheb", "Bilal", "Selman"], answer: 0 },
  { q: "Vahiy getiren melek hangisidir?", options: ["Mikail", "İsrafil", "Cebrail", "Azrail"], answer: 2 },
  { q: "Can alan melek hangisidir?", options: ["Cebrail", "Azrail", "Mikail", "İsrafil"], answer: 1 },
  { q: "Kur'an'ın 'kalbi' olarak bilinen sure hangisidir?", options: ["Yâsîn", "Mülk", "Rahmân", "Fetih"], answer: 0 },
  { q: "Sabah namazının farzı kaç rekâttır?", options: ["2", "3", "4", "5"], answer: 0 },
  { q: "Öğle namazının farzı kaç rekâttır?", options: ["2", "3", "4", "5"], answer: 2 },
  { q: "Akşam namazının farzı kaç rekâttır?", options: ["2", "3", "4", "5"], answer: 1 },
  { q: "İhlâs suresi kaç ayettir?", options: ["3", "4", "5", "6"], answer: 1 },
  { q: "Hangisi büyük meleklerden değildir?", options: ["Cebrail", "Mikail", "Harut", "İsrafil"], answer: 2 },
  { q: "Peygamberimizin dedesi kimdir?", options: ["Ebu Talib", "Abdulmuttalib", "Abdullah", "Hamza"], answer: 1 },
  { q: "İlk Müslüman erkek kimdir (büyükler arasında)?", options: ["Ömer", "Ebubekir", "Osman", "Ali"], answer: 1 },
  { q: "Hangi peygamber 'Halilullah' (Allah'ın dostu) lakabıyla anılır?", options: ["Musa", "İbrahim", "İsa", "Nuh"], answer: 1 },
  { q: "Balığın karnında dua eden peygamber kimdir?", options: ["Yunus", "Yusuf", "Eyyub", "Zekeriya"], answer: 0 },
  { q: "Gemi yapan ve tufandan kurtulan peygamber kimdir?", options: ["Nuh", "Hud", "Salih", "Lut"], answer: 0 },
  { q: "Hangisi abdesti bozar?", options: ["Gülmek (namaz dışı)", "Su içmek", "Tuvalete gitmek", "Konuşmak"], answer: 2 },
  { q: "Cuma namazı kimlere farzdır?", options: ["Kadınlara", "Çocuklara", "Akıllı-baliğ erkeklere", "Yolculara"], answer: 2 },
  { q: "Teravih namazı hangi ayda kılınır?", options: ["Şaban", "Ramazan", "Şevval", "Recep"], answer: 1 },
  { q: "Kur'an'da adı geçen tek kadın kimdir?", options: ["Âişe", "Meryem", "Hatice", "Fatıma"], answer: 1 },
  { q: "Namaz kılmak için abdest almak neyin şartıdır?", options: ["Sünnet", "Farz (şart)", "Vacip", "Müstehap"], answer: 1 },
  { q: "Hangisi haram aylardan biridir?", options: ["Şaban", "Muharrem", "Ramazan", "Şevval"], answer: 1 },
  { q: "Kurban Bayramı kaç gündür?", options: ["1", "2", "3", "4"], answer: 3 },
  { q: "Ramazan Bayramı kaç gündür?", options: ["1", "2", "3", "4"], answer: 2 },
  { q: "İslam'ın şartları kaç tanedir?", options: ["4", "5", "6", "7"], answer: 1 },
  { q: "İmanın şartları kaç tanedir?", options: ["4", "5", "6", "7"], answer: 2 },
  { q: "Kur'an-ı Kerim kaç cüzdür?", options: ["20", "30", "40", "60"], answer: 1 },
  { q: "Hangisi bir Kur'an suresidir?", options: ["Tevhid", "Kevser", "Salavat", "Tekbir"], answer: 1 },
  { q: "Miraç mucizesi hangi peygamberimize aittir?", options: ["Musa", "İsa", "Muhammed", "İbrahim"], answer: 2 },
  { q: "Peygamberimizin Mekke'den Medine'ye göçüne ne denir?", options: ["Miraç", "Hicret", "İsra", "Bedir"], answer: 1 },
  { q: "İlk cami hangisidir?", options: ["Mescid-i Nebevî", "Mescid-i Aksa", "Kâbe (Mescid-i Haram)", "Kuba"], answer: 2 },
  { q: "Namazda Fâtiha'dan sonra okunan sureye ne denir?", options: ["Zamm-ı sure", "Tekbir", "Kunut", "Tesbih"], answer: 0 },
  { q: "Oruç hangi durumda bozulmaz?", options: ["Bilerek yemek", "Su içmek", "Unutarak yemek", "Sigara içmek"], answer: 2 },
  { q: "Vitir namazı kaç rekâttır?", options: ["1", "2", "3", "4"], answer: 2 },
  { q: "Hangisi peygamberimizin torunudur?", options: ["Hamza", "Hasan", "Bilal", "Osman"], answer: 1 },
  { q: "Kelime-i Tevhid nasıl başlar?", options: ["Elhamdülillah", "Lâ ilâhe illallah", "Sübhanallah", "Allahu Ekber"], answer: 1 },
  { q: "Kur'an'ın son suresi hangisidir?", options: ["İhlâs", "Felâk", "Nâs", "Kevser"], answer: 2 }
];

/* ══════════ RÜYA TABİRLERİ (55 Tabir) ══════════ */
/* RUYA_TABIRLERI kaldırıldı (v65.1) */

/* ══════════ BEBEK İSİMLERİ (110 İsim) ══════════ */
const BEBEK_ISIMLERI = [
  { name: "Ahmet", gender: "erkek", meaning: "En çok övülen, Hz. Muhammed'in isimlerinden biri." },
  { name: "Mehmet", gender: "erkek", meaning: "Muhammed isminin Türkçe söylenişi; övülmüş." },
  { name: "Mustafa", gender: "erkek", meaning: "Seçilmiş, arınmış; Peygamberimizin isimlerinden." },
  { name: "Ali", gender: "erkek", meaning: "Yüce, ulu, şerefli." },
  { name: "Ömer", gender: "erkek", meaning: "Uzun ömürlü, hayat dolu." },
  { name: "Osman", gender: "erkek", meaning: "Toy kuşu yavrusu; ashaptan bir sahabe adı." },
  { name: "Yusuf", gender: "erkek", meaning: "Allah'ın kat kat verdiği; bir peygamber adı." },
  { name: "İbrahim", gender: "erkek", meaning: "Halktan yüce, halkların babası; bir peygamber adı." },
  { name: "İsmail", gender: "erkek", meaning: "Allah işitti; bir peygamber adı." },
  { name: "Hamza", gender: "erkek", meaning: "Aslan, güçlü; Peygamberimizin amcası." },
  { name: "Emir", gender: "erkek", meaning: "Bey, komutan, yönetici." },
  { name: "Yunus", gender: "erkek", meaning: "Bir peygamber adı; deniz balığı." },
  { name: "Enes", gender: "erkek", meaning: "Cana yakın, dost, ünsiyet kuran." },
  { name: "Bilal", gender: "erkek", meaning: "Su ile ıslatan; İlk müezzin Bilal-i Habeşi." },
  { name: "Selim", gender: "erkek", meaning: "Sağlam, kusursuz, temiz kalpli." },
  { name: "Kerem", gender: "erkek", meaning: "Cömertlik, iyilik, asalet." },
  { name: "Yasin", gender: "erkek", meaning: "Kur'an'ın 36. suresi; 'Ey insan' anlamında." },
  { name: "Taha", gender: "erkek", meaning: "Kur'an'ın 20. suresi; Peygamberimize hitap." },
  { name: "Eymen", gender: "erkek", meaning: "Uğurlu, hayırlı, sağ taraftan olan." },
  { name: "Furkan", gender: "erkek", meaning: "Hak ile batılı ayıran; Kur'an'ın adlarından." },
  { name: "Kaan", gender: "erkek", meaning: "Hükümdar, hakan." },
  { name: "Poyraz", gender: "erkek", meaning: "Kuzeydoğudan esen serin rüzgar." },
  { name: "Aras", gender: "erkek", meaning: "Bir nehir adı; akarsu." },
  { name: "Miraç", gender: "erkek", meaning: "Yükseğe çıkma; Peygamberimizin göğe yükselişi." },
  { name: "Talha", gender: "erkek", meaning: "Cennette bir ağaç; cennetle müjdelenen sahabe." },
  { name: "Muhammed", gender: "erkek", meaning: "Övülmüş, hamd edilmiş; Peygamberimizin adı." },
  { name: "Halil", gender: "erkek", meaning: "Samimi dost; İbrahim peygamberin lakabı." },
  { name: "Salih", gender: "erkek", meaning: "İyi, dürüst, yararlı; bir peygamber adı." },
  { name: "Davut", gender: "erkek", meaning: "Sevgili; bir peygamber adı." },
  { name: "Süleyman", gender: "erkek", meaning: "Huzurlu, barış içinde; bir peygamber adı." },
  { name: "Harun", gender: "erkek", meaning: "Dağ gibi güçlü; bir peygamber adı." },
  { name: "Musa", gender: "erkek", meaning: "Sudan çıkarılan; bir peygamber adı." },
  { name: "İsa", gender: "erkek", meaning: "Kurtarıcı; bir peygamber adı." },
  { name: "Zekeriya", gender: "erkek", meaning: "Allah'ı çokça anan; bir peygamber adı." },
  { name: "Yahya", gender: "erkek", meaning: "Yaşayan, canlı; bir peygamber adı." },
  { name: "Eyüp", gender: "erkek", meaning: "Sabrın simgesi; bir peygamber adı." },
  { name: "Kuzey", gender: "erkek", meaning: "Dört ana yönden biri; serin ve güçlü." },
  { name: "Alp", gender: "erkek", meaning: "Yiğit, kahraman, cesur." },
  { name: "Arda", gender: "erkek", meaning: "İşaret, nişan; nesil, ardıl." },
  { name: "Toprak", gender: "erkek", meaning: "Bereketli, verimli; sabırlı ve mütevazı." },
  { name: "Efe", gender: "erkek", meaning: "Yiğit, mert, Ege'nin kabadayısı." },
  { name: "Ege", gender: "erkek", meaning: "Bir deniz adı; ferah ve engin." },
  { name: "Çınar", gender: "erkek", meaning: "Uzun ömürlü, güçlü ve heybetli bir ağaç." },
  { name: "Berat", gender: "erkek", meaning: "Nişan, ferman; günahlardan kurtuluş belgesi." },
  { name: "Ömer Faruk", gender: "erkek", meaning: "Hak ile batılı ayıran uzun ömürlü." },
  { name: "Ensar", gender: "erkek", meaning: "Yardımcılar; Medineli Müslümanlar." },
  { name: "Redvan", gender: "erkek", meaning: "Hoşnutluk; cennet meleklerinden birinin adı." },
  { name: "Sinan", gender: "erkek", meaning: "Mızrak ucu; keskin ve güçlü." },
  { name: "Kemal", gender: "erkek", meaning: "Olgunluk, mükemmellik, erdem." },
  { name: "Barış", gender: "erkek", meaning: "Huzur, sükûnet, uzlaşma." },
  { name: "Deniz", gender: "erkek", meaning: "Engin su kütlesi; ferahlık ve bereket." },
  { name: "Umut", gender: "erkek", meaning: "Beklenti, ümit, iyi günlere inanç." },
  { name: "Metehan", gender: "erkek", meaning: "Büyük Türk hükümdarı; kahraman." },
  { name: "Batuhan", gender: "erkek", meaning: "Güçlü hükümdar, sağlam han." },

  { name: "Zeynep", gender: "kiz", meaning: "Değerli taş, süs ağacı; Peygamberimizin kızı." },
  { name: "Fatma", gender: "kiz", meaning: "Sütten kesilen; Peygamberimizin kızı Fatıma." },
  { name: "Ayşe", gender: "kiz", meaning: "Yaşayan, hayat dolu; Peygamberimizin eşi." },
  { name: "Hatice", gender: "kiz", meaning: "Erken doğan; Peygamberimizin ilk eşi." },
  { name: "Elif", gender: "kiz", meaning: "Alfabenin ilk harfi; incelik ve zarafet." },
  { name: "Meryem", gender: "kiz", meaning: "İbadet eden; Hz. İsa'nın annesi." },
  { name: "Sümeyye", gender: "kiz", meaning: "İslam'ın ilk kadın şehidi." },
  { name: "Hafsa", gender: "kiz", meaning: "Aslan yavrusu; Peygamberimizin eşi." },
  { name: "Rukiye", gender: "kiz", meaning: "Yükselen, dua; Peygamberimizin kızı." },
  { name: "Esma", gender: "kiz", meaning: "İsimler, güzel adlar; ünlü bir sahabe adı." },
  { name: "Rana", gender: "kiz", meaning: "Göz alıcı, güzel, hoş görünüşlü." },
  { name: "Zehra", gender: "kiz", meaning: "Parlak, aydınlık; Fatıma'nın lakabı." },
  { name: "Beyza", gender: "kiz", meaning: "Bembeyaz, tertemiz, saf." },
  { name: "Büşra", gender: "kiz", meaning: "Müjde, sevindirici haber." },
  { name: "Kübra", gender: "kiz", meaning: "En büyük, ulu." },
  { name: "Sena", gender: "kiz", meaning: "Övgü, şükür, methetme." },
  { name: "Nisa", gender: "kiz", meaning: "Kadınlar; Kur'an'da bir sure adı." },
  { name: "Nur", gender: "kiz", meaning: "Işık, aydınlık, parlaklık." },
  { name: "Melek", gender: "kiz", meaning: "İyilik ve saflığın timsali; melek." },
  { name: "İkra", gender: "kiz", meaning: "Oku; ilk inen vahyin ilk kelimesi." },
  { name: "Sude", gender: "kiz", meaning: "Menfaat, fayda, huzur." },
  { name: "Defne", gender: "kiz", meaning: "Her mevsim yeşil kalan hoş kokulu ağaç." },
  { name: "Naz", gender: "kiz", meaning: "İşve, cilve, nazlılık." },
  { name: "Ela", gender: "kiz", meaning: "Sarıya çalan kahverengi göz rengi." },
  { name: "Duru", gender: "kiz", meaning: "Berrak, temiz, saf." },
  { name: "Ada", gender: "kiz", meaning: "Etrafı suyla çevrili kara parçası; huzur adası." },
  { name: "Ravza", gender: "kiz", meaning: "Cennet bahçesi; Peygamberimizin kabrinin bulunduğu yer." },
  { name: "Berra", gender: "kiz", meaning: "İyilik eden, hayırlı, itaatkâr." },
  { name: "Cemre", gender: "kiz", meaning: "Kışın sonuna doğru havaya düşen sıcaklık; ateş közü." },
  { name: "Eslem", gender: "kiz", meaning: "Kusursuz, en sağlam, teslim olan." },
  { name: "Feyza", gender: "kiz", meaning: "Bolluk, bereket, feyz." },
  { name: "Gökçe", gender: "kiz", meaning: "Gök rengi, mavi; güzel, sevimli." },
  { name: "Hira", gender: "kiz", meaning: "İlk vahyin geldiği mağaranın adı." },
  { name: "İrem", gender: "kiz", meaning: "Cennet bahçesi." },
  { name: "Kumsal", gender: "kiz", meaning: "Deniz kıyısındaki ince kum." },
  { name: "Lamia", gender: "kiz", meaning: "Parlayan, parıldayan." },
  { name: "Masal", gender: "kiz", meaning: "Hayal dünyası, güzel anlatı." },
  { name: "Nehir", gender: "kiz", meaning: "Akarsu; bereket ve süreklilik." },
  { name: "Öykü", gender: "kiz", meaning: "Hikâye, kısa anlatı." },
  { name: "Pınar", gender: "kiz", meaning: "Yerden kaynayan su, kaynak; berraklık." },
  { name: "Rüya", gender: "kiz", meaning: "Uykuda görülen düş; güzel hayaller." },
  { name: "Sıla", gender: "kiz", meaning: "Kavuşma, memlekete dönüş, birleşme." },
  { name: "Şevval", gender: "kiz", meaning: "Ramazan sonrası hicri ay; bayram ayı." },
  { name: "Tuana", gender: "kiz", meaning: "Cennette bir ırmak; Allah'ın nuru." },
  { name: "Yağmur", gender: "kiz", meaning: "Rahmet, bereket; gökten inen su." },
  { name: "Yaren", gender: "kiz", meaning: "Yakın dost, arkadaş, sırdaş." },
  { name: "Zülal", gender: "kiz", meaning: "Tatlı, saf ve berrak su." },
  { name: "Asel", gender: "kiz", meaning: "Bal; tatlılık ve şirinlik." },
  { name: "Berin", gender: "kiz", meaning: "En yüce, en yüksek." },
  { name: "Ceylin", gender: "kiz", meaning: "Cennet suyu, cennet ırmağı (Selsebil)." },
  { name: "Dilek", gender: "kiz", meaning: "İstek, arzu, temenni." },
  { name: "Hümeyra", gender: "kiz", meaning: "Beyaz tenli; Hz. Âişe'nin lakabı." },
  { name: "Vera", gender: "kiz", meaning: "Takva, günahtan sakınma, incelik." },
  { name: "Reyyan", gender: "kiz", meaning: "Cennetin oruç tutanlara ayrılan kapısı." },
  { name: "Amine", gender: "kiz", meaning: "Güvenilir, emin; Peygamberimizin annesi." }
];

/* ══════════ ABDEST / GUSÜL / TEYEMMÜM REHBERİ ══════════ */
const TAHARET_REHBERI = [
  {
    key: "abdest",
    title: "Abdest (Namaz Abdesti)",
    intro: "Abdestin farzları dörttür: Yüzü yıkamak, kolları dirseklerle birlikte yıkamak, başın dörtte birini mesh etmek, ayakları topuklarla birlikte yıkamak.",
    steps: [
      { n: 1, title: "Niyet ve Besmele", desc: "\"Niyet ettim Allah rızası için abdest almaya\" denir ve \"Eûzü billâhi mineş-şeytânir-racîm. Bismillâhirrahmânirrahîm\" denilerek başlanır." },
      { n: 2, title: "Elleri yıkamak", desc: "Eller bileklere kadar üç kez yıkanır; parmak araları ovulur, varsa yüzük oynatılır." },
      { n: 3, title: "Ağza su vermek (Mazmaza)", desc: "Sağ el ile ağza üç kez su alınıp çalkalanır. (Oruçlu değilse boğaza kadar iyice yapılır.)" },
      { n: 4, title: "Burna su vermek (İstinşak)", desc: "Sağ el ile buruna üç kez su çekilir, sol el ile sümkürülerek temizlenir." },
      { n: 5, title: "Yüzü yıkamak (FARZ)", desc: "Alnın saç bittiği yerden çene altına, iki kulak yumuşağı arasına kadar yüz üç kez yıkanır." },
      { n: 6, title: "Sağ kolu yıkamak (FARZ)", desc: "Sağ kol, dirsekle birlikte üç kez yıkanır; kuru yer bırakılmaz." },
      { n: 7, title: "Sol kolu yıkamak (FARZ)", desc: "Sol kol, dirsekle birlikte üç kez yıkanır." },
      { n: 8, title: "Başı mesh etmek (FARZ)", desc: "Eller ıslatılıp başın en az dörtte biri (genelde tamamı) bir kez mesh edilir." },
      { n: 9, title: "Kulakları ve boynu mesh etmek", desc: "Islak parmaklarla kulakların içi ve dışı, parmak arkalarıyla da boyun bir kez mesh edilir." },
      { n: 10, title: "Ayakları yıkamak (FARZ)", desc: "Önce sağ, sonra sol ayak topuklarla birlikte üç kez yıkanır; parmak araları sol elin küçük parmağıyla ovulur." },
      { n: 11, title: "Abdest duası", desc: "Abdestten sonra kıbleye dönülüp Kelime-i Şehadet getirilir: \"Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh.\"" }
    ]
  },
  {
    key: "gusul",
    title: "Gusül (Boy Abdesti)",
    intro: "Guslün farzları üçtür: Ağza su vermek (mazmaza), burna su vermek (istinşak) ve tüm bedeni hiç kuru yer bırakmadan yıkamak.",
    steps: [
      { n: 1, title: "Niyet", desc: "\"Niyet ettim Allah rızası için gusletmeye (boy abdesti almaya)\" denir, besmele çekilir." },
      { n: 2, title: "Elleri ve avret mahallini yıkamak", desc: "Önce eller yıkanır, ardından vücuttaki necaset ve avret mahalli temizlenir." },
      { n: 3, title: "Abdest almak", desc: "Namaz abdesti gibi eksiksiz bir abdest alınır (ayaklar sona bırakılabilir)." },
      { n: 4, title: "Ağza ve burna su vermek (FARZ)", desc: "Ağza ve buruna, boğaza ve genize su ulaşacak şekilde üç kez su verilir." },
      { n: 5, title: "Başa ve tüm bedene su dökmek (FARZ)", desc: "Önce başa, sonra sağ omuza, sonra sol omuza üçer kez su dökülür ve bütün beden ovularak yıkanır; kuru yer bırakılmaz." },
      { n: 6, title: "Sona bırakılan ayaklar", desc: "Bir yerde birikinti varsa çekilip ayaklar en son yıkanarak gusül tamamlanır." }
    ]
  },
  {
    key: "teyemmum",
    title: "Teyemmüm (Toprakla Temizlik)",
    intro: "Su bulunmadığında veya kullanmaya engel (hastalık vb.) olduğunda, temiz toprak/toprak cinsi bir şeyle abdest veya gusül yerine yapılır. Farzları: niyet ve iki vuruşla yüz ile kolları mesh etmek.",
    steps: [
      { n: 1, title: "Niyet", desc: "Abdest veya gusül yerine olduğuna niyet edilir, besmele çekilir." },
      { n: 2, title: "İlk vuruş ve yüzü mesh", desc: "İki el temiz toprağa (veya toz, taş, kireç gibi toprak cinsine) vurulur, silkelenir ve tüm yüz bir kez mesh edilir." },
      { n: 3, title: "İkinci vuruş ve kolları mesh", desc: "Eller tekrar toprağa vurulur; önce sağ kol dirsekle birlikte sol elle, sonra sol kol sağ elle mesh edilir." },
      { n: 4, title: "Not", desc: "Bir teyemmümle dilediğin kadar namaz kılınabilir; su bulununca teyemmüm bozulur." }
    ]
  }
];

/* ══════════ ÖZEL NAMAZLAR ══════════ */
const OZEL_NAMAZLAR = [
  {
    title: "Cuma Namazı",
    ozet: "Hutbe + 2 rekât farz (cemaatle). Akıllı, ergen, hür, mukim erkeklere farzdır.",
    detay: "Cuma günü öğle vakti kılınır. İlk sünnet 4 rekât kılınır. İmam minberde hutbe okur; hutbe dinlenirken konuşulmaz. Ardından imamla birlikte 2 rekât farz cemaatle kılınır. Sonra 4 rekât son sünnet kılınır. Cuma namazını kılan öğle namazını ayrıca kılmaz."
  },
  {
    title: "Bayram Namazı",
    ozet: "2 rekât vacip, cemaatle, fazladan tekbirlerle. Hutbe namazdan sonradır.",
    detay: "Ramazan ve Kurban bayramında güneş doğup kerahet vakti çıkınca kılınır. 1. rekât: Sübhaneke okunur, ardından üç kez 'Allahu Ekber' denilerek eller kaldırılıp yanlara salınır (üçüncüde bağlanır), Fatiha ve sure okunur. 2. rekât: Fatiha ve sure okunduktan sonra üç tekbir alınır, dördüncü tekbirle rükûa gidilir. Namazdan sonra hutbe okunur."
  },
  {
    title: "Teravih Namazı",
    ozet: "20 rekât sünnet-i müekkede. Ramazan gecelerinde yatsıdan sonra kılınır.",
    detay: "Yatsının farzından ve son sünnetinden sonra, vitirden önce kılınır. Genelde ikişer rekât halinde on selamla (2x10) veya dörder rekât halinde kılınır. Cemaatle kılınması faziletlidir. Her dört rekâtta bir kısa istirahat (tesbih) yapılır."
  },
  {
    title: "Cenaze Namazı",
    ozet: "Farz-ı kifaye. Ayakta kılınır; rükû ve secde yoktur, dört tekbirden ibarettir.",
    detay: "Cemaat, cenaze karşıda olacak şekilde saf tutar. Niyet edilir (erkek/kadın/çocuk cenazesi olduğu belirtilir). 1. Tekbir: eller bağlanır, Sübhaneke okunur (ve tamamı). 2. Tekbir: Allahümme Salli ve Allahümme Bârik okunur. 3. Tekbir: cenaze duası (bilmeyen 'Allahümmağfir lihayyinâ ve meyyitinâ...' veya Rabbenâ duasını) okunur. 4. Tekbir: bir şey okunmadan önce sağa, sonra sola selam verilir."
  }
];

/* ══════════ İMAN ESASLARI (ÂMENTÜ) ══════════ */
const AMENTU = {
  arabic: "آمَنْتُ بِاللهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ وَبِالْقَدَرِ خَيْرِهِ وَشَرِّهِ مِنَ اللهِ تَعَالَى وَالْبَعْثُ بَعْدَ الْمَوْتِ حَقٌّ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
  okunusu: "Âmentü billâhi ve melâiketihî ve kütübihî ve rusülihî vel-yevmil-âhiri ve bil-kaderi hayrihî ve şerrihî minallâhi teâlâ vel-ba'sü ba'del-mevti hakkun. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve rasûlüh.",
  turkish: "Allah'a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe, kadere; hayrın ve şerrin Allah'tan olduğuna inandım. Öldükten sonra dirilmek haktır. Şahitlik ederim ki Allah'tan başka ilah yoktur ve yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir."
};
const IMAN_ESASLARI = [
  { title: "1. Allah'a İman", desc: "Allah'ın var ve bir olduğuna, eşi ve benzeri bulunmadığına, bütün kemal sıfatlarla nitelendiğine ve her türlü noksanlıktan uzak olduğuna inanmaktır." },
  { title: "2. Meleklere İman", desc: "Nurdan yaratılmış, günah işlemeyen, Allah'ın emirlerini yerine getiren meleklerin varlığına inanmaktır (Cebrail, Mikail, İsrafil, Azrail dört büyük melektir)." },
  { title: "3. Kitaplara İman", desc: "Allah'ın peygamberlerine gönderdiği ilahi kitaplara inanmaktır. Dört büyük kitap: Tevrat (Musa), Zebur (Davud), İncil (İsa), Kur'an (Hz. Muhammed). Kur'an en son ve değişmemiş kitaptır." },
  { title: "4. Peygamberlere İman", desc: "Allah'ın insanlara doğru yolu göstermek için gönderdiği peygamberlere inanmaktır. İlki Hz. Âdem, sonuncusu Hz. Muhammed'dir (s.a.v.)." },
  { title: "5. Ahiret Gününe İman", desc: "Öldükten sonra dirilmeye, hesaba, cennet ve cehennemin varlığına, amellerin karşılığının verileceğine inanmaktır." },
  { title: "6. Kadere İman", desc: "Hayır ve şerrin, olmuş ve olacak her şeyin Allah'ın bilmesi, dilemesi ve yaratmasıyla olduğuna; kulun da cüz'i iradesiyle sorumlu olduğuna inanmaktır." }
];

/* ══════════ PEYGAMBERLER (Kur'an'da adı geçen 25) ══════════ */
const PEYGAMBERLER = [
  { name: "Hz. Âdem", lakab: "Safiyyullah", info: "İlk insan ve ilk peygamber; babası olmayan iki insandan biridir. Allah onu topraktan yaratıp meleklere secde ettirdi ve isimleri öğretti. Cennette yasak ağaçtan yiyince dünyaya indirildi; tövbe etti ve tövbesi kabul edildi. İnsanlığa tevhidi, ibadeti ve temel geçim yollarını öğretti." },
  { name: "Hz. İdris", lakab: "İlmin Öncüsü", info: "Hz. Âdem'den sonra gelen peygamberlerdendir. Kalemle ilk yazı yazan, elbise diken, yıldız ve hesap ilmiyle uğraşan ilk kişi olarak bilinir. Kur'an onu 'sıddîk (çok doğru) bir peygamber' olarak över ve yüce bir makama çıkarıldığını bildirir." },
  { name: "Hz. Nûh", lakab: "Ulü'l-Azm", info: "Kavmini 950 yıl tevhide çağırdı ama pek azı iman etti. Allah'ın emriyle büyük bir gemi yaptı; iman edenleri ve hayvanlardan çiftler alarak tufandan kurtuldu. İnkâr eden kavmi ve kendi oğlu suda boğuldu. Azim ve sabır sahibi beş büyük peygamberden (ulü'l-azm) biridir." },
  { name: "Hz. Hûd", lakab: "Âd Kavminin Nebisi", info: "Yemen taraflarında yaşayan, güçlü ve mağrur Âd kavmine gönderildi. Onları putperestlikten ve zulümden sakındırdı. Kavmi inkârda direnince şiddetli ve soğuk bir kasırgayla helak oldu; Hûd ve iman edenler kurtuldu." },
  { name: "Hz. Sâlih", lakab: "Deve Mucizesi", info: "Semûd kavmine gönderildi. Kavmin isteği üzerine kayadan mucize olarak dişi bir deve çıktı. Deveyi kesmemeleri emredildiği halde kestiler; bunun üzerine korkunç bir sarsıntı ve sayha ile helak oldular." },
  { name: "Hz. İbrâhim", lakab: "Halîlullah", info: "'Allah'ın dostu' unvanıyla anılır. Putlara ve Nemrut'a karşı tevhidi savundu; ateşe atıldı fakat ateş onu yakmadı. Oğlu İsmail ile Kâbe'yi inşa etti ve haccı başlattı. Kurban imtihanını sabırla geçti. Üç büyük dinin atası kabul edilir; ulü'l-azmdendir." },
  { name: "Hz. Lût", lakab: "İffet Davetçisi", info: "Hz. İbrahim'in yeğenidir. Sodom halkını, o güne dek görülmemiş ahlaksızlıktan (eşcinsellik) sakındırdı. Kavmi inatla direnince, üzerlerine taş yağdıran bir azapla helak edildi; Lût ve ailesi (inkârcı karısı hariç) kurtuldu." },
  { name: "Hz. İsmâil", lakab: "Zebîhullah", info: "Hz. İbrahim'in büyük oğlu, Arapların atasıdır. Küçükken annesi Hacer ile Mekke vadisine bırakıldı; zemzem suyu onun için çıktı. Babası rüyasında kendisini kurban ettiğini görünce 'Sabredenlerden bulacaksın' diyerek teslim oldu; yerine cennetten koç gönderildi. Kâbe'yi babasıyla birlikte yaptı." },
  { name: "Hz. İshâk", lakab: "İsrailoğulları Atası", info: "Hz. İbrahim'in Hz. Sâre'den olan oğludur; yaşlılıkta müjdelenmiştir. Salih ve bereketli bir peygamber olarak babasının tevhid davasını sürdürdü. Kendisinden sonra gelen İsrailoğulları peygamberlerinin ceddidir." },
  { name: "Hz. Yâkub", lakab: "İsrâîl", info: "Hz. İshak'ın oğludur; 'İsrail' de denir. On iki oğlu oldu ve bunlardan İsrailoğulları'nın on iki kolu türedi. Sevgili oğlu Yusuf'un kaybıyla yıllarca sabırla imtihan edildi; ağlamaktan gözleri görmez oldu, sonunda oğluna kavuştu." },
  { name: "Hz. Yûsuf", lakab: "Güzellik ve Sabır", info: "Hz. Yakub'un oğludur; olağanüstü güzelliğiyle bilinir. Kardeşleri onu kuyuya attı, köle olarak satıldı, iftiraya uğrayıp zindana atıldı. Rüya yorumu ilmiyle Mısır'a maliye bakanı (aziz) oldu; kıtlıkta halkı ve ailesini kurtardı, kardeşlerini affetti. Kıssası 'kıssaların en güzeli' diye anılır." },
  { name: "Hz. Eyyûb", lakab: "Sabrın Sembolü", info: "Büyük servet, evlat ve sağlık sahibiyken hepsini kaybetti, ağır bir hastalığa yakalandı. Yıllarca hiç şikâyet etmeden sabretti, hep Allah'a şükretti. Sonunda şifa buldu, malı ve ailesi kat kat iade edildi. Sabrın en büyük örneğidir." },
  { name: "Hz. Şuayb", lakab: "Hatiplerin Peygamberi", info: "Medyen ve Eyke halkına gönderildi. Onları putperestlikten, ölçü-tartıda hile yapmaktan ve haksız kazançtan sakındırdı. Güzel ve etkili konuşmasıyla tanınır. Kavmi zulümde direnince şiddetli bir azapla helak oldu." },
  { name: "Hz. Mûsâ", lakab: "Kelîmullah", info: "Allah ile perdesiz konuşan (Kelîmullah) peygamberdir; ulü'l-azmdendir. Firavun'un sarayında büyüdü, sonra ona karşı gönderildi. Asası yılana dönüşmek, denizi yarmak gibi dokuz mucizeyle desteklendi. İsrailoğullarını Firavun'un zulmünden kurtardı; Tûr'da Tevrat kendisine verildi." },
  { name: "Hz. Hârûn", lakab: "Musa'nın Veziri", info: "Hz. Musa'nın büyük kardeşi ve yardımcısıdır. Güzel ve düzgün konuşmasıyla Musa'nın vezirliğini yaptı, tebliğde ona destek oldu. Musa Tûr'a gittiğinde kavmin başında kaldı ve buzağıya tapmaya kalkışanları uyardı." },
  { name: "Hz. Zülkifl", lakab: "Sözünde Duran", info: "Kur'an'da sabreden salih peygamberlerden sayılır. Verdiği sözde durması, adaleti ve ibadete düşkünlüğüyle anılır. Bir görüşe göre kavmine gündüz oruç, gece ibadet sözü verip bunu ömür boyu sürdürmüştür." },
  { name: "Hz. Dâvud", lakab: "Zebur Sahibi", info: "Hem peygamber hem de büyük bir hükümdardır. Genç yaşta zalim Câlût'u (Golyat) yendi. Kendisine Zebur verildi; öyle güzel sesle zikrederdi ki dağlar ve kuşlar ona eşlik ederdi. Demiri elinde yumuşatıp zırh yapardı; helal kazanç için el emeğiyle geçinirdi." },
  { name: "Hz. Süleymân", lakab: "Hükümdar Nebi", info: "Hz. Davud'un oğludur; tarihin en büyük saltanatına sahip peygamberdir. Rüzgâra, cinlere ve hayvanların diline hükmetti; karınca ve Hüdhüd kuşuyla konuştu. Sebe melikesi Belkıs'ı imana getirdi. Bütün gücüne rağmen kulluğu ve şükrü elden bırakmadı." },
  { name: "Hz. İlyâs", lakab: "Tevhid Bekçisi", info: "İsrailoğullarını, taptıkları 'Ba'l' adlı puttan ve sapkınlıktan sakındırmak için gönderildi. Kavmi onu yalanlayınca kıtlık ve kuraklıkla imtihan edildiler. Sabrı ve tevhiddeki kararlılığıyla anılır." },
  { name: "Hz. Elyesâ", lakab: "İlyas'ın Halefi", info: "Hz. İlyas'tan sonra İsrailoğullarına gönderilen peygamberdir. Kur'an onu hayırlı ve seçkin kullar arasında zikreder. Kavmini tevhide ve salih amele çağırdı." },
  { name: "Hz. Yûnus", lakab: "Zünnûn", info: "Ninova halkına gönderildi. Kavmi iman etmeyince izinsiz onları terk etti; bindiği gemiden denize atıldı ve büyük bir balık onu yuttu. Balığın karnında 'Lâ ilâhe illâ ente sübhâneke innî küntü minez-zâlimîn' diye dua etti, kurtuldu. Dönünce kavminin tamamı iman etti." },
  { name: "Hz. Zekeriyyâ", lakab: "Meryem'in Hâmisi", info: "Beytü'l-Makdis'te görevli, marangozlukla geçinen bir peygamberdi. Hz. Meryem'in bakımını üstlendi ve onun yanında ilahi ikramlar gördü. Çok yaşlı ve eşi kısır olmasına rağmen Allah'a dua edip oğlu Yahya ile müjdelendi." },
  { name: "Hz. Yahyâ", lakab: "Genç Zâhid", info: "Hz. Zekeriya'nın oğludur; daha çocukken kendisine hikmet ve ilim verildi. İffeti, zühdü ve yumuşak kalbiyle bilinir. Hz. İsa'nın peygamberliğini destekledi; hak yolda tavizsiz durduğu için şehit edildi." },
  { name: "Hz. Îsâ", lakab: "Rûhullah / Mesîh", info: "Babasız, mucizevî şekilde Hz. Meryem'den dünyaya geldi; beşikte konuştu. Kendisine İncil verildi; ulü'l-azmdendir. Allah'ın izniyle hastaları iyileştirir, ölüleri diriltirdi. Öldürülmedi, Allah katına yükseltildi; kıyamete yakın döneceği bildirilir." },
  { name: "Hz. Muhammed", lakab: "Hâtemü'l-Enbiyâ (s.a.v.)", info: "Son peygamber ve peygamberlerin sonuncusudur (Hâtemü'l-Enbiyâ). Bütün insanlığa ve cinlere gönderilen tek peygamberdir; ulü'l-azmdendir. En büyük mucizesi, kıyamete kadar değişmeden kalacak olan Kur'an-ı Kerim'dir. Güzel ahlakı tamamlamak için gönderilmiş; 'âlemlere rahmet' olarak nitelenmiştir." }
];

/* ══════════ SİYER — Peygamberimizin Hayatından Önemli Olaylar ══════════ */
const SIYER_OLAYLARI = [
  { yil: "571", baslik: "Doğumu", desc: "Fil Yılı'nda Mekke'de dünyaya geldi. Babası Abdullah o doğmadan, annesi Âmine altı yaşındayken vefat etti." },
  { yil: "576", baslik: "Yetim Kalışı ve Bakımı", desc: "Annesinin vefatından sonra dedesi Abdulmuttalib, sonra amcası Ebû Talib himayesine aldı." },
  { yil: "595", baslik: "Hz. Hatice ile Evliliği", desc: "Ticaretteki dürüstlüğü sebebiyle 'Muhammedü'l-Emîn' denildi. 25 yaşında Hz. Hatice ile evlendi." },
  { yil: "610", baslik: "İlk Vahiy", desc: "40 yaşında Hira mağarasında Cebrail vasıtasıyla ilk vahiy (Alak suresi 'Oku!') geldi. Peygamberlik başladı." },
  { yil: "613", baslik: "Açıktan Davet", desc: "Üç yıl gizli davetten sonra İslam açıkça tebliğ edilmeye başlandı; müşriklerin baskısı arttı." },
  { yil: "615", baslik: "Habeşistan'a Hicret", desc: "Baskılardan kaçan bir grup Müslüman, adil hükümdar Necaşi'nin ülkesi Habeşistan'a hicret etti." },
  { yil: "619", baslik: "Hüzün Yılı", desc: "Amcası Ebû Talib ve eşi Hz. Hatice aynı yıl vefat etti. Bu yıla 'Senetü'l-Hüzn' denildi." },
  { yil: "620", baslik: "İsra ve Miraç", desc: "Mescid-i Haram'dan Mescid-i Aksa'ya, oradan göklere yükseltildi. Beş vakit namaz farz kılındı." },
  { yil: "622", baslik: "Hicret", desc: "Mekke'den Medine'ye hicret etti. Bu olay Hicrî takvimin başlangıcı sayıldı. Mescid-i Nebevî inşa edildi." },
  { yil: "624", baslik: "Bedir Savaşı", desc: "Müslümanların sayıca az olmasına rağmen kazandığı ilk büyük zafer." },
  { yil: "625", baslik: "Uhud Savaşı", desc: "Okçuların yerini terk etmesiyle zor bir gün yaşandı; Hz. Hamza şehit oldu." },
  { yil: "627", baslik: "Hendek Savaşı", desc: "Medine çevresine hendek kazılarak şehir savunuldu; kuşatma püskürtüldü." },
  { yil: "628", baslik: "Hudeybiye Antlaşması", desc: "Mekkelilerle yapılan ve İslam'ın yayılmasına zemin hazırlayan barış antlaşması." },
  { yil: "630", baslik: "Mekke'nin Fethi", desc: "Mekke kan dökülmeden fethedildi; Kâbe putlardan temizlendi, genel af ilan edildi." },
  { yil: "631", baslik: "Veda Haccı ve Hutbesi", desc: "Hac ibadeti eda edildi; insan hakları, kardeşlik ve emanet üzerine Veda Hutbesi irad edildi." },
  { yil: "632", baslik: "Vefatı", desc: "Medine'de Hz. Âişe'nin evinde vefat etti; Mescid-i Nebevî'ye (Ravza) defnedildi." }
];

/* ══════════ DİNİ SÖZLÜK ══════════ */
const DINI_SOZLUK = [
  { term: "Abdest", meaning: "Namaz ve bazı ibadetler için belirli uzuvları usulüne göre yıkama/mesh etme temizliği." },
  { term: "Ahiret", meaning: "Öldükten sonra başlayan ve sonsuz olan hayat; hesap, cennet ve cehennem yurdu." },
  { term: "Amel", meaning: "İnsanın yaptığı iş, davranış; özellikle ibadet ve iyi/kötü fiiller." },
  { term: "Ashab (Sahabe)", meaning: "Peygamberimizi mümin olarak gören ve mümin olarak vefat eden kimseler." },
  { term: "Ayet", meaning: "Kur'an'ın en küçük bölümü; sureleri oluşturan cümleler." },
  { term: "Berat", meaning: "Günahlardan kurtuluş, aklanma; Şaban'ın 15. gecesi 'Berat Kandili'." },
  { term: "Beytullah", meaning: "Allah'ın evi; Mekke'deki Kâbe." },
  { term: "Cami", meaning: "Müslümanların topluca namaz kıldığı, cuma namazı kılınabilen ibadethane." },
  { term: "Cennet", meaning: "İman edip salih amel işleyenlerin ahirette ödüllendirileceği sonsuz nimet yurdu." },
  { term: "Cehennem", meaning: "İnkâr edenlerin ve isyankârların ahirette ceza göreceği azap yurdu." },
  { term: "Cüz", meaning: "Kur'an'ın otuz eşit bölümünden her biri (yaklaşık 20 sayfa)." },
  { term: "Ezan", meaning: "Namaz vaktinin girdiğini bildiren, belirli sözlerle yapılan çağrı." },
  { term: "Farz", meaning: "Allah'ın kesin olarak yapılmasını emrettiği, terki günah olan ibadet/hüküm." },
  { term: "Fıtır Sadakası (Fitre)", meaning: "Ramazan bayramından önce, zengin Müslümanların vermesi vacip olan sadaka." },
  { term: "Gusül", meaning: "Bütün bedeni yıkamayı gerektiren büyük temizlik (boy abdesti)." },
  { term: "Hadis", meaning: "Peygamberimizin sözleri, fiilleri ve onayları." },
  { term: "Hac", meaning: "Şartlarını taşıyanların ömürde bir kez Kâbe'yi ziyaret ederek yaptığı ibadet." },
  { term: "Halal (Helal)", meaning: "Dinen yapılmasına/yenilmesine izin verilen, meşru olan şey." },
  { term: "Haram", meaning: "Dinen kesin olarak yasaklanan, yapılması günah olan şey." },
  { term: "Hicret", meaning: "Peygamberimizin ve Müslümanların Mekke'den Medine'ye göçü; Hicrî takvimin başı." },
  { term: "İbadet", meaning: "Allah'a kulluk niyetiyle yapılan namaz, oruç, zekât, hac gibi fiiller." },
  { term: "İhlas", meaning: "İbadeti yalnız Allah rızası için, gösterişten uzak, samimi yapmak." },
  { term: "İmam", meaning: "Cemaate namaz kıldıran kişi; dinî önder." },
  { term: "İman", meaning: "Allah'a ve iman esaslarına kalpten inanmak, dille ikrar etmek." },
  { term: "Kâbe", meaning: "Mekke'de bulunan, Müslümanların kıblesi olan mukaddes yapı." },
  { term: "Kader", meaning: "Allah'ın olacak her şeyi ezelî ilmiyle bilip takdir etmesi." },
  { term: "Kıble", meaning: "Namazda yönelinen taraf; Kâbe'nin bulunduğu yön." },
  { term: "Kunut", meaning: "Vitir namazının üçüncü rekâtında ayakta okunan dualar." },
  { term: "Mekruh", meaning: "Yapılması hoş karşılanmayan, terki sevap olan davranış." },
  { term: "Mescid", meaning: "İçinde namaz kılınan ibadet yeri (cami de bir mescittir)." },
  { term: "Mübah", meaning: "Yapılması da yapılmaması da serbest olan, günah/sevap olmayan fiil." },
  { term: "Nafile", meaning: "Farz ve vacip dışında, sevap için gönüllü yapılan ibadet." },
  { term: "Nisab", meaning: "Zekât ve kurbanın gerekli olması için gereken asgari zenginlik ölçüsü." },
  { term: "Oruç", meaning: "Tan yerinin ağarmasından güneş batışına kadar yeme-içme ve orucu bozan şeylerden uzak durmak." },
  { term: "Rekât", meaning: "Namazın kıyam, rükû ve iki secdeden oluşan bir bölümü." },
  { term: "Rükû", meaning: "Namazda eller dizlere konarak öne eğilme hareketi." },
  { term: "Sadaka", meaning: "Allah rızası için karşılıksız yapılan yardım ve iyilik." },
  { term: "Secde", meaning: "Namazda alın, burun, eller, dizler ve ayak parmaklarını yere koyarak yapılan en yakın kulluk hâli." },
  { term: "Sünnet", meaning: "Peygamberimizin yaptığı ve tavsiye ettiği, farz olmayan ibadet ve davranışlar." },
  { term: "Sure", meaning: "Kur'an'ın ayetlerden oluşan 114 bölümünden her biri." },
  { term: "Şükür", meaning: "Allah'ın verdiği nimetlere karşı O'na minnet ve teşekkür duymak, itaat etmek." },
  { term: "Takva", meaning: "Allah'a karşı gelmekten sakınmak, emirlerine uyup yasaklarından kaçınmak." },
  { term: "Tesbih", meaning: "Allah'ı 'Sübhânallah' diyerek her türlü noksanlıktan tenzih etmek; zikir." },
  { term: "Tevhid", meaning: "Allah'ın bir olduğuna inanmak; 'Lâ ilâhe illallah' esası." },
  { term: "Vacip", meaning: "Farza yakın kuvvette, yapılması gereken dinî hüküm (vitir, bayram namazı gibi)." },
  { term: "Zekât", meaning: "Nisaba ulaşan malın belli bir oranının (kırkta bir) ihtiyaç sahiplerine verilmesi; İslam'ın şartı." },
  { term: "Zikir", meaning: "Allah'ı anmak; tesbih, tehlil, tekbir gibi sözlerle O'nu hatırlamak." }
];

/* ══════════ 40 HADİS (İmam Nevevî) ══════════ */
const KIRK_HADIS = [
  { no: 1, text: "Ameller ancak niyetlere göredir ve herkese niyet ettiğinin karşılığı vardır. Kimin hicreti Allah'a ve Resulüne ise, hicreti Allah ve Resulünedir.", source: "Buhârî, Müslim" },
  { no: 2, text: "İslam; Allah'tan başka ilah olmadığına ve Muhammed'in O'nun elçisi olduğuna şahitlik etmen, namazı kılman, zekâtı vermen, Ramazan orucunu tutman ve gücün yetiyorsa haccetmendir. İman; Allah'a, meleklerine, kitaplarına, peygamberlerine, ahiret gününe ve kadere inanmandır. İhsan; Allah'a O'nu görüyormuş gibi kulluk etmendir; sen O'nu görmesen de O seni görür.", source: "Müslim (Cibrîl hadisi)" },
  { no: 3, text: "İslam beş temel üzerine kurulmuştur: Allah'tan başka ilah olmadığına ve Muhammed'in Allah'ın elçisi olduğuna şahitlik etmek, namaz kılmak, zekât vermek, haccetmek ve Ramazan orucunu tutmak.", source: "Buhârî, Müslim" },
  { no: 4, text: "Sizden birinizin yaratılışı annesinin karnında toplanır; sonra sırasıyla nutfe, alaka ve mudga olur. Sonra melek gönderilir, ruh üflenir ve dört şey (rızkı, eceli, ameli, mutlu mu bedbaht mı olacağı) yazılır. Ameller sonuçlarına göredir.", source: "Buhârî, Müslim" },
  { no: 5, text: "Kim bizim bu dinimizde ondan olmayan bir şey ortaya çıkarırsa, o reddedilir.", source: "Buhârî, Müslim" },
  { no: 6, text: "Helal bellidir, haram bellidir. İkisi arasında şüpheli şeyler vardır. Kim şüphelilerden sakınırsa dinini ve ırzını korumuş olur. Dikkat edin, her hükümdarın bir koruluğu vardır; Allah'ın koruluğu da haramlarıdır.", source: "Buhârî, Müslim" },
  { no: 7, text: "Din nasihattir (samimiyet ve iyilik dilemektir). 'Kime?' diye sorduk. 'Allah'a, Kitabına, Resulüne, Müslümanların yöneticilerine ve bütün Müslümanlara' buyurdu.", source: "Müslim" },
  { no: 8, text: "İnsanlar 'Lâ ilâhe illallah' deyip namazı kılıp zekâtı verinceye kadar onlarla savaşmakla emrolundum. Bunu yaptıklarında kanlarını ve mallarını benden korumuş olurlar; hesapları ise Allah'a aittir.", source: "Buhârî, Müslim" },
  { no: 9, text: "Size yasakladığım şeylerden kaçının, emrettiğim şeyleri de gücünüz yettiğince yapın. Sizden öncekileri, çok soru sormaları ve peygamberlerine muhalefetleri helak etti.", source: "Buhârî, Müslim" },
  { no: 10, text: "Allah temizdir, ancak temiz olanı kabul eder. Allah, peygamberlerine emrettiğini müminlere de emretmiştir: 'Temiz şeylerden yiyin ve salih amel işleyin.'", source: "Müslim" },
  { no: 11, text: "Sana şüphe veren şeyi bırak, şüphe vermeyene geç. Çünkü doğruluk huzur, yalan ise kuşkudur.", source: "Tirmizî, Nesâî" },
  { no: 12, text: "Kişinin kendisini ilgilendirmeyen (boş) şeyleri terk etmesi, güzel Müslümanlığındandır.", source: "Tirmizî" },
  { no: 13, text: "Sizden biriniz, kendisi için istediğini kardeşi için de istemedikçe (gerçek anlamda) iman etmiş olmaz.", source: "Buhârî, Müslim" },
  { no: 14, text: "Müslüman bir kimsenin kanı ancak üç şeyden biriyle helal olur: Evlendikten sonra zina eden, cana karşılık can, dinini terk edip cemaatten ayrılan.", source: "Buhârî, Müslim" },
  { no: 15, text: "Allah'a ve ahiret gününe iman eden ya hayır söylesin ya da sussun. Allah'a ve ahiret gününe iman eden komşusuna ikram etsin. Allah'a ve ahiret gününe iman eden misafirine ikram etsin.", source: "Buhârî, Müslim" },
  { no: 16, text: "Bir adam Peygamber'den öğüt istedi. 'Öfkelenme (kızma)' buyurdu. Adam birkaç kez tekrar istedi, her defasında 'Öfkelenme' buyurdu.", source: "Buhârî" },
  { no: 17, text: "Allah her şeyde ihsanı (işi güzel yapmayı) farz kılmıştır. Öyleyse öldüreceğiniz zaman güzelce öldürün, keseceğiniz zaman güzelce kesin; bıçağınızı bileyin ve hayvanı rahatlatın.", source: "Müslim" },
  { no: 18, text: "Nerede olursan ol Allah'a karşı gelmekten sakın. Kötülüğün ardından hemen iyilik yap ki onu silsin. İnsanlara güzel ahlakla davran.", source: "Tirmizî" },
  { no: 19, text: "Allah'ın (emirlerini) gözet ki O'nu karşında (yardımcı) bulasın. Bir şey isteyeceksen Allah'tan iste, yardım dileyeceksen Allah'tan dile. Bil ki bütün ümmet bir araya gelse, Allah'ın yazmadığı bir fayda veremez.", source: "Tirmizî" },
  { no: 20, text: "Utanmadıktan sonra dilediğini yap. Önceki peygamberlerin sözünden insanlara ulaşan (öğütlerden biri) budur.", source: "Buhârî" },
  { no: 21, text: "'Allah'a iman ettim' de, sonra da dosdoğru ol.", source: "Müslim" },
  { no: 22, text: "Bir adam: 'Farz namazları kılsam, Ramazan orucunu tutsam, helali helal haramı haram bilsem ve fazlasını yapmasam cennete girer miyim?' diye sordu. Peygamber: 'Evet' buyurdu.", source: "Müslim" },
  { no: 23, text: "Temizlik imanın yarısıdır. 'Elhamdülillah' mizanı doldurur; 'Sübhânallah ve elhamdülillah' yer ile gök arasını doldurur. Namaz nurdur, sadaka delildir, sabır aydınlıktır. Kur'an lehine veya aleyhine bir delildir.", source: "Müslim" },
  { no: 24, text: "Allah şöyle buyurur: 'Ey kullarım! Ben zulmü kendime haram kıldım, onu aranızda da haram kıldım; öyleyse birbirinize zulmetmeyin. Ey kullarım! Hepiniz açsınız, benim doyurduğum hariç; benden isteyin sizi doyurayım...'", source: "Müslim (Kudsî)" },
  { no: 25, text: "Fakir sahabiler: 'Zenginler sevapları alıp götürdü; namaz kılıyor, oruç tutuyor, mallarıyla sadaka veriyorlar' dediler. Peygamber: 'Allah size de tesbih edecek bir şey verdi: Her tesbih, tekbir ve tahmid bir sadakadır' buyurdu.", source: "Müslim" },
  { no: 26, text: "İnsanın her bir eklemi için her gün bir sadaka gerekir. İki kişinin arasını düzeltmen sadakadır, bineğine yardımın sadakadır, güzel söz sadakadır, namaza her adımın sadakadır, yoldan eziyet veren şeyi kaldırman sadakadır.", source: "Buhârî, Müslim" },
  { no: 27, text: "İyilik güzel ahlaktır. Günah ise içini tırmalayan ve insanların bilmesinden hoşlanmadığın şeydir.", source: "Müslim" },
  { no: 28, text: "Size Allah'tan korkmayı, başınızdakini dinleyip itaat etmeyi tavsiye ederim. Benden sonra çok ihtilaf göreceksiniz; siz benim ve hidayete ermiş halifelerimin sünnetine sarılın, onu azı dişlerinizle tutun. Sonradan çıkarılan (bidat) şeylerden sakının.", source: "Ebû Dâvûd, Tirmizî" },
  { no: 29, text: "Bir adam: 'Beni cennete koyacak, cehennemden uzaklaştıracak ameli söyle' dedi. Peygamber: 'Allah'a kulluk edip O'na hiçbir şeyi ortak koşmaman, namazı kılman, zekâtı vermen, orucu tutman ve haccetmen' buyurdu; sonra hayır kapılarını (oruç, sadaka, gece namazı) gösterdi.", source: "Tirmizî" },
  { no: 30, text: "Allah bir takım farzlar koydu, onları zayi etmeyin. Sınırlar çizdi, onları aşmayın. Bazı şeyleri haram kıldı, onları çiğnemeyin. Bazı şeyler hakkında da unutmaksızın size rahmet olarak sustu; onları araştırmayın.", source: "Dârekutnî" },
  { no: 31, text: "Bir adam: 'Bana öyle bir amel göster ki, onu yapınca Allah da insanlar da beni sevsin' dedi. Peygamber: 'Dünyaya karşı zâhid ol ki Allah seni sevsin; insanların elindekine göz dikme ki insanlar seni sevsin' buyurdu.", source: "İbn Mâce" },
  { no: 32, text: "Ne (başkasına) zarar vermek vardır, ne de zarara zararla karşılık vermek.", source: "İbn Mâce, Muvatta" },
  { no: 33, text: "Delil getirmek davacıya, yemin etmek ise inkâr edene düşer.", source: "Beyhakî" },
  { no: 34, text: "Sizden kim bir kötülük görürse onu eliyle değiştirsin; buna gücü yetmezse diliyle; buna da gücü yetmezse kalbiyle (buğzetsin). Bu ise imanın en zayıfıdır.", source: "Müslim" },
  { no: 35, text: "Birbirinize haset etmeyin, kin tutmayın, sırt çevirmeyin; ey Allah'ın kulları kardeş olun. Müslüman Müslümanın kardeşidir; ona zulmetmez, onu yalnız bırakmaz ve küçük görmez. Takva işte buradadır (kalbe işaret etti).", source: "Müslim" },
  { no: 36, text: "Kim bir mümini dünya sıkıntılarından birinden kurtarırsa, Allah da onu kıyamet sıkıntılarından kurtarır. Kim bir ilim öğrenmek için yola çıkarsa, Allah ona cennetin yolunu kolaylaştırır. Bir topluluk Allah'ı zikretmek için toplanırsa üzerlerine sekinet iner ve rahmet onları kaplar.", source: "Müslim" },
  { no: 37, text: "Allah iyilik ve kötülükleri yazdı: Kim bir iyiliğe niyetlenip yapmazsa Allah tam bir iyilik yazar; niyetlenip yaparsa on ilâ yedi yüz kat yazar. Kim bir kötülüğe niyetlenip yapmazsa tam bir iyilik, yaparsa yalnızca bir kötülük yazar.", source: "Buhârî, Müslim" },
  { no: 38, text: "Allah şöyle buyurur: 'Kim benim bir dostuma düşmanlık ederse, ben ona harp ilan ederim. Kulum bana en çok, farz kıldıklarımla yaklaşır. Nafilelerle yaklaşmaya devam eder de nihayet ben onu severim...'", source: "Buhârî (Kudsî)" },
  { no: 39, text: "Şüphesiz Allah, ümmetimden hata ile, unutarak ve zorlanarak yaptıkları şeylerin (günahını) affetmiştir.", source: "İbn Mâce, Beyhakî" },
  { no: 40, text: "Peygamber omzumdan tutup: 'Dünyada bir garip yahut bir yolcu gibi ol' buyurdu. İbn Ömer derdi ki: 'Akşama erdiğinde sabahı bekleme, sabaha erdiğinde akşamı bekleme; sağlığından hastalığın, hayatından ölümün için (azık) al.'", source: "Buhârî" },
  { no: 41, text: "Sizden biriniz, arzu ve hevesi benim getirdiğime (İslam'a) tâbi olmadıkça (kâmil manada) iman etmiş olmaz.", source: "Nevevî (hasen sahih)" },
  { no: 42, text: "Allah şöyle buyurur: 'Ey Âdemoğlu! Sen bana dua edip beni umdukça, günahların ne olursa olsun seni bağışlarım, aldırmam. Ey Âdemoğlu! Günahların göğe ulaşsa da benden bağışlanma dilesen seni bağışlarım. Ey Âdemoğlu! Bana hiçbir şeyi ortak koşmadan dünya dolusu günahla gelsen, ben de seni o kadar mağfiretle karşılarım.'", source: "Tirmizî (Kudsî)" },
  { no: 43, text: "Kul, bir günah işlediğinde kalbinde siyah bir nokta oluşur. Tövbe edip vazgeçerse kalbi cilalanır; günaha devam ederse o siyahlık kalbini kaplar. İşte Kur'an'da geçen 'kalplerini paslandıran' budur.", source: "Tirmizî" },
  { no: 44, text: "Merhamet edenlere Rahmân merhamet eder. Siz yerdekilere merhamet edin ki göktekiler de size merhamet etsin.", source: "Ebû Dâvûd, Tirmizî" },
  { no: 45, text: "Kim bir kavme benzemeye çalışırsa o da onlardandır.", source: "Ebû Dâvûd" },
  { no: 46, text: "Allah'a en sevimli yerler mescitler, en sevimsiz yerler ise çarşı-pazarlardır.", source: "Müslim" },
  { no: 47, text: "Kolaylaştırın, güçleştirmeyin; müjdeleyin, nefret ettirmeyin.", source: "Buhârî, Müslim" },
  { no: 48, text: "Sizden biriniz kendisi için sevip istediğini (Müslüman) kardeşi için de istemedikçe (kâmil) mümin olamaz.", source: "Buhârî, Müslim" },
  { no: 49, text: "Allah'ım! Faydasız ilimden, huşû duymayan kalpten, doymayan nefisten ve kabul olunmayan duadan sana sığınırım.", source: "Müslim" },
  { no: 50, text: "Cömert insan Allah'a yakın, cennete yakın, insanlara yakın ve cehennemden uzaktır. Cimri ise Allah'tan uzak, cennetten uzak, insanlardan uzak ve cehenneme yakındır.", source: "Tirmizî" },
  { no: 51, text: "İnsanların en hayırlısı, insanlara en faydalı olanıdır.", source: "Taberânî, Beyhakî" },
  { no: 52, text: "Zenginlik mal çokluğuyla değildir; asıl zenginlik gönül tokluğudur.", source: "Buhârî, Müslim" },
  { no: 53, text: "Komşusu şerrinden emin olmayan kimse (kâmil manada) cennete giremez.", source: "Müslim" },
  { no: 54, text: "Güzel söz sadakadır.", source: "Buhârî, Müslim" },
  { no: 55, text: "Allah katında en sevimli amel, az da olsa devamlı olanıdır.", source: "Buhârî, Müslim" },
  { no: 56, text: "Bir kötülüğün ardından hemen bir iyilik yap ki onu silsin; insanlara da güzel ahlakla davran.", source: "Tirmizî" },
  { no: 57, text: "Veren el, alan elden üstündür.", source: "Buhârî, Müslim" },
  { no: 58, text: "Kim Allah için bir mescit yaparsa, Allah da ona cennette bir köşk yapar.", source: "Buhârî, Müslim" },
  { no: 59, text: "Cennet annelerin ayakları altındadır.", source: "Nesâî, Ahmed" },
  { no: 60, text: "İki nimet vardır ki insanların çoğu onları değerlendirmede aldanmıştır: Sağlık ve boş vakit.", source: "Buhârî" },
  { no: 61, text: "Rızkının bollaşmasını ve ömrünün uzamasını isteyen, akrabasıyla ilgisini kessin (sıla-i rahim yapsın).", source: "Buhârî, Müslim" },
  { no: 62, text: "Kişi, sevdiğiyle beraberdir.", source: "Buhârî, Müslim" },
  { no: 63, text: "Cennet nimetlerinin en küçüğüne sahip olan bile dünya ve içindekilerin on katına sahip olur.", source: "Müslim" },
  { no: 64, text: "Allah'ım! Senden hidayet, takva, iffet ve gönül zenginliği isterim.", source: "Müslim" },
  { no: 65, text: "Bir kul, bir Müslüman kardeşinin gıyabında ona dua ederse, görevli bir melek 'Aynısı sana da olsun' der.", source: "Müslim" },
  { no: 66, text: "Sabır aydınlıktır. Kur'an ise senin lehine veya aleyhine bir delildir.", source: "Müslim" },
  { no: 67, text: "Müslümanın Müslümana beş hakkı vardır: Selamını almak, hastasını ziyaret etmek, cenazesine katılmak, davetine gitmek ve aksırınca 'yerhamükellah' demek.", source: "Buhârî, Müslim" },
  { no: 68, text: "Bir yetimin başını okşayan kimseye, elinin dokunduğu her saç teli sayısınca sevap yazılır.", source: "Ahmed" },
  { no: 69, text: "Küçüklerimize merhamet etmeyen, büyüklerimize saygı göstermeyen bizden değildir.", source: "Tirmizî" },
  { no: 70, text: "Ademoğlu yaşlanır ama içinde iki şey gençleşir: Mala düşkünlük ve uzun yaşama arzusu.", source: "Buhârî, Müslim" },
  { no: 71, text: "Kim geceleyin on ayet okursa gafillerden yazılmaz.", source: "Hâkim, Dârimî" },
  { no: 72, text: "Amellerin en faziletlisi, vaktinde kılınan namazdır. Sonra ana-babaya iyilik, sonra Allah yolunda cihaddır.", source: "Buhârî, Müslim" },
  { no: 73, text: "Allah bir kulu sevdiği zaman Cebrail'e 'Ben falanı seviyorum, sen de sev' der; sonra bu sevgi yeryüzünde de yayılır.", source: "Buhârî, Müslim" },
  { no: 74, text: "Kim bir oruçluyu iftar ettirirse, orucun sevabından hiçbir şey eksilmeden oruçlunun sevabı kadar sevap kazanır.", source: "Tirmizî" },
  { no: 75, text: "Sizin en hayırlınız, ahlakça en güzel olanınızdır.", source: "Buhârî, Müslim" },
  { no: 76, text: "Öfke anında kendine hâkim olan gerçek pehlivandır.", source: "Buhârî, Müslim" },
  { no: 77, text: "Bir mümin bir dikenin batmasına varıncaya kadar başına gelen her sıkıntı sebebiyle günahlarından bağışlanır.", source: "Buhârî, Müslim" },
  { no: 78, text: "Nerede olursan ol Allah'a karşı gelmekten sakın; insanlarla güzel geçin.", source: "Tirmizî" },
  { no: 79, text: "Kim bir ilim öğrenmek için bir yola girerse, Allah ona cennete giden yolu kolaylaştırır.", source: "Müslim" },
  { no: 80, text: "Din kardeşine tebessüm etmen bir sadakadır; iyiliği emredip kötülükten sakındırman sadakadır; yolunu şaşırana yol göstermen sadakadır.", source: "Tirmizî" },
  { no: 81, text: "Allah sizin ne dış görünüşünüze ne de mallarınıza bakar; ancak kalplerinize ve amellerinize bakar.", source: "Müslim" },
  { no: 82, text: "İnsanlara teşekkür etmeyen, Allah'a da şükretmez.", source: "Ebû Dâvûd, Tirmizî" },
  { no: 83, text: "Kim insanların derdiyle dertlenmezse onlardan değildir.", source: "Hâkim" },
  { no: 84, text: "Haya (utanma) imandandır.", source: "Buhârî, Müslim" },
  { no: 85, text: "Kim Allah'a ve ahiret gününe iman ediyorsa misafirine ikram etsin.", source: "Buhârî, Müslim" },
  { no: 86, text: "Kim bir topluluğa su dağıtırsa, en son içen kendisi olsun.", source: "Müslim" },
  { no: 87, text: "Namaz dinin direğidir.", source: "Beyhakî" },
  { no: 88, text: "Ademoğlunun her sözü lehine değil aleyhinedir; ancak iyiliği emretmesi, kötülükten sakındırması ve Allah'ı zikretmesi müstesna.", source: "Tirmizî, İbn Mâce" },
  { no: 89, text: "Tevbe eden, hiç günah işlememiş gibidir.", source: "İbn Mâce" },
  { no: 90, text: "Din kolaylıktır. Dini zorlaştıran, ona güç yetiremez, altında kalır.", source: "Buhârî" },
  { no: 91, text: "Cennet, hoşa gitmeyen zorluklarla; cehennem ise nefse hoş gelen arzularla çevrilmiştir.", source: "Buhârî, Müslim" },
  { no: 92, text: "Bir kimse abdesti güzelce alır, sonra iki rekât namaz kılıp huşû ile Rabbine yönelirse, geçmiş günahları bağışlanır.", source: "Buhârî, Müslim" },
  { no: 93, text: "Ölüleri hayırla anın; onların kötülüklerini söylemekten sakının.", source: "Ebû Dâvûd, Tirmizî" },
  { no: 94, text: "Kim bir kardeşinin ihtiyacını görürse, Allah da onun ihtiyacını görür.", source: "Buhârî, Müslim" },
  { no: 95, text: "Doğruluk iyiliğe, iyilik cennete götürür. Kişi doğru söyleye söyleye Allah katında 'sıddîk' yazılır.", source: "Buhârî, Müslim" },
  { no: 96, text: "Kim benim adıma yalan uydurursa cehennemdeki yerine hazırlansın.", source: "Buhârî, Müslim" },
  { no: 97, text: "İki kişinin arasını düzeltmek, oruç, namaz ve sadakanın derecesinden üstündür; çünkü ara bozukluğu (dini) kökünden kazır.", source: "Ebû Dâvûd, Tirmizî" },
  { no: 98, text: "Allah'a en sevimli amel, vaktinde kılınan namaz ve ana-babaya iyiliktir.", source: "Buhârî, Müslim" },
  { no: 99, text: "Kim sabah-akşam yüz defa 'Sübhânallâhi ve bi-hamdih' derse, günahları deniz köpüğü kadar da olsa bağışlanır.", source: "Buhârî, Müslim" },
  { no: 100, text: "İki kelime vardır ki dile hafif, mizanda ağır ve Rahmân'a sevimlidir: 'Sübhânallâhi ve bi-hamdihî, sübhânallâhil-azîm.'", source: "Buhârî, Müslim" }
];

/* ══════════ SURE HAKKINDA — Kısa Açıklama (114 Sure) ══════════ */
const SURE_ACIKLAMA = {
  1: "Kur'an'ın özü ve anası. Hamd, yalnız Allah'a kulluk ve doğru yola iletilme duasını içerir; her rekâtta okunur.",
  2: "Kur'an'ın en uzun suresi. İman esasları, ibadet, hukuk, oruç, hac ve Âyetel Kürsî ile Bakara kıssasını işler.",
  3: "İman, sabır, Uhud Savaşı ve Hz. Meryem ile İsa'dan bahseder; Ehl-i Kitab'a tevhide çağrı yapar.",
  4: "Kadın hakları, miras, aile hukuku, adalet ve toplumsal düzen konularını ayrıntılı biçimde ele alır.",
  5: "Helal-haram, ahitlere bağlılık, adalet ve son ilahi buyruklar; sofra (mâide) mucizesini anlatır.",
  6: "Tevhid, Allah'ın kudreti ve şirkin reddi ağırlıklıdır; iman esaslarını güçlü delillerle işler.",
  7: "Âdem'in yaratılışı, peygamber kıssaları ve inkârcı kavimlerin akıbeti üzerinden ibret verir.",
  8: "Bedir Savaşı, ganimet hükümleri, sabır ve Allah'a tevekkül konularını ele alır.",
  9: "Tövbe ve antlaşmalar; münafıkların halleri ve Tebük Seferi anlatılır (besmelesiz başlar).",
  10: "Tevhid, peygamberlik, ahiret ve Hz. Yunus'un kavmiyle Allah'ın rahmeti işlenir.",
  11: "Nûh, Hûd, Sâlih, Lût ve Şuayb kıssalarıyla sabır ve istikamet öğretilir.",
  12: "'Kıssaların en güzeli' Hz. Yusuf'un hayatı; sabır, iffet ve Allah'ın takdiri anlatılır.",
  13: "Allah'ın kâinattaki ayetleri; kalplerin ancak Allah'ı anmakla huzur bulacağı vurgulanır.",
  14: "Hz. İbrahim'in duası; nimete şükür, tevhid ve peygamberlerin tebliği işlenir.",
  15: "Yaratılış, Kur'an'ın korunması ve inkârcı kavimlerin akıbeti anlatılır.",
  16: "Sayısız ilahi nimet ('Nahl'=arı örneğiyle); şükür, tevhid ve güzel ahlaka çağırır.",
  17: "İsra mucizesiyle başlar; ana-babaya iyilik, güzel ahlak ve toplumsal edep ayetlerini içerir.",
  18: "Ashab-ı Kehf, Hz. Musa-Hızır ve Zülkarneyn kıssaları; Deccal fitnesinden korur.",
  19: "Hz. Zekeriya, Yahya, Meryem ve İsa'nın doğumu; Allah'ın rahmeti ağırlıklıdır.",
  20: "Hz. Musa'nın kıssası; tevhid, namaz ve Allah'ın kullarına şefkati anlatılır.",
  21: "Peygamberlerin ortak tevhid mücadelesi ve ahiret gerçeği işlenir.",
  22: "Hac ibadeti, kurban, cihad ve kıyametin dehşeti anlatılır.",
  23: "Kurtuluşa eren müminlerin vasıfları; namaz, iffet ve emanete riayet sıralanır.",
  24: "İffet, örtünme, aile ahlakı ve 'Nur Ayeti' ile toplumsal temizlik işlenir.",
  25: "Furkan (hak-batıl ölçüsü) Kur'an; Rahmân'ın has kullarının nitelikleri anlatılır.",
  26: "Musa, İbrahim, Nûh, Hûd, Sâlih, Lût ve Şuayb kıssalarıyla tebliğ ve sabır öğretilir.",
  27: "Hz. Süleyman, karınca ve Sebe melikesi Belkıs kıssası; ilim ve şükür işlenir.",
  28: "Hz. Musa'nın doğumu, Firavun'un zulmü ve Karun'un kibri üzerinden ibret verir.",
  29: "İman imtihanı ve sabır ('Ankebût'=örümcek ağı örneğiyle) dünyanın zayıflığı anlatılır.",
  30: "Rumların galibiyeti müjdesi; Allah'ın kâinattaki ayetleri ve dirilişe deliller.",
  31: "Hz. Lokman'ın oğluna öğütleri; şükür, namaz, güzel ahlak ve tevazu işlenir.",
  32: "Yaratılış, diriliş ve secde; müminlerin gece ibadeti övülür (tilavet secdesi vardır).",
  33: "Hendek Savaşı, peygamber ailesi, örtünme ve Peygamber'e salavat konularını içerir.",
  34: "Sebe halkının nankörlüğü; Davud ve Süleyman'a verilen nimetler ve şükür işlenir.",
  35: "Allah'ın yaratıcılığı ('Fâtır'); nimetler, şükür ve tevhid vurgulanır.",
  36: "Kur'an'ın kalbi; tevhid, peygamberlik, diriliş ve ahiret güçlü biçimde anlatılır.",
  37: "Saf tutan melekler; peygamber kıssaları ve Hz. İsmail'in kurban imtihanı işlenir.",
  38: "Hz. Davud, Süleyman ve Eyyûb'un sabrı; tevhid ve inkârcılara uyarı.",
  39: "İhlas ve tevhid; Allah'ın rahmetinden ümit kesilmemesi güçlü biçimde öğütlenir.",
  40: "Mümin (Firavun ailesinden gizli iman eden) örneği; dua ve tevhid işlenir.",
  41: "Kur'an'ın açıklayıcılığı ('Fussilet'); tevhid ve inkâra karşı deliller sunulur.",
  42: "İstişare (danışma) ve ilahi vahyin ortak esasları; Allah'a yöneliş anlatılır.",
  43: "Süs ve dünya malının aldatıcılığı ('Zuhruf'); tevhid ve önceki peygamberler.",
  44: "Duman (kıyamet alameti) ve Firavun'un helakı; ahiret hakikati işlenir.",
  45: "Diz çökmüş milletler ('Câsiye'); kâinattaki ayetler ve hesap günü anlatılır.",
  46: "Kum tepeleri ('Ahkâf') Âd kavmi; ana-babaya iyilik ve cinlerin imanı işlenir.",
  47: "Cihad, sabat ve inkârcıların amellerinin boşa çıkışı anlatılır.",
  48: "Hudeybiye ve fetih müjdesi; zafer, sekinet ve müminlerin vasıfları.",
  49: "Toplumsal ahlak; gıybet, alay, zan ve tecessüsten sakındırıp kardeşliğe çağırır.",
  50: "Diriliş ve ahiret gerçeği güçlü tasvirlerle; insanın her sözünün kaydedildiği bildirilir.",
  51: "Rüzgârlar ('Zâriyât') ve rızık; 'Ben cinleri ve insanları ancak bana kulluk etsinler diye yarattım' ayeti.",
  52: "Tûr dağına yemin; ahiret, cennet ve inkârcıların akıbeti işlenir.",
  53: "Necm (yıldız); Miraç, vahyin hak oluşu ve putların hiçliği anlatılır.",
  54: "Ayın yarılması mucizesi; geçmiş kavimlerin helakı ve Kur'an'ın kolaylığı.",
  55: "Kur'an'ın gelini; Allah'ın nimetlerini sayan ('Hangi nimeti yalanlarsınız?') şükür suresi.",
  56: "Kıyamet ve üç grup insan (öncüler, sağ-sol ehli); fakirliğe karşı okunur.",
  57: "Demir ('Hadîd') ve infak; Allah'ın mülkü, iman ve dünya hayatının geçiciliği.",
  58: "Mücadele eden kadın; toplumsal hukuk ve Allah'ın her şeyi işittiği vurgulanır.",
  59: "Haşr (sürgün); Allah'ın güzel isimleriyle biten, tevekkül ve infak suresi.",
  60: "İmtihan edilen (Mümtehine); dostluk-düşmanlık ölçüsü ve kadınların biati.",
  61: "Saf tutmak; Allah yolunda birlik ve İsa'nın Ahmed'i müjdelemesi anlatılır.",
  62: "Cuma namazı ve önemi; ilmin değeri ve dünya meşgalesine karşı uyarı.",
  63: "Münafıkların iç yüzü ve iki yüzlülüğe karşı müminlere uyarı.",
  64: "Aldanma günü ('Teğâbün') kıyamet; iman, mal-evlat imtihanı ve tevekkül.",
  65: "Boşanma (Talâk) hükümleri; takva sahibine Allah'ın çıkış yolu vereceği müjdesi.",
  66: "Peygamber ailesi; tövbe ('nasuh tövbe') ve örnek mümin kadınlar anlatılır.",
  67: "Mülk (Tebâreke); Allah'ın hükümranlığı, kabir azabına engel olan koruyucu sure.",
  68: "Kalem'e yemin; Peygamber'in yüce ahlakı ve sabır öğütlenir.",
  69: "Gerçekleşecek olan ('Hâkka') kıyamet; amel defterleri ve hesap anlatılır.",
  70: "Yükseliş dereceleri ('Meâric'); sabır, namaz ve insanın açgözlülüğü işlenir.",
  71: "Hz. Nûh'un kavmini tevhide çağırışı ve istiğfarın bereketi anlatılır.",
  72: "Cinlerin Kur'an'ı dinleyip iman etmesi; tevhid ve Allah'a sığınma.",
  73: "Örtüsüne bürünen ('Müzzemmil'); gece ibadeti ve Kur'an tilavetine teşvik.",
  74: "Örtüye bürünen ('Müddessir'); tebliğe kalkış, uyarı ve temizlik emri.",
  75: "Kıyamet günü ve dirilişin kesinliği; insanın parmak uçlarına kadar diriltilmesi.",
  76: "İnsanın yaratılışı; iyilerin cennet nimetleri ve infakın fazileti anlatılır.",
  77: "Gönderilenler ('Mürselât'); kıyamet ve yalanlayanların akıbeti tekrar tekrar uyarır.",
  78: "Büyük haber ('Nebe'/Amme') kıyamet; cehennem ve cennet tablolarıyla uyarır.",
  79: "Söküp çıkaranlar ('Nâziât'); Firavun'un kıssası ve kıyametin dehşeti.",
  80: "Yüzünü ekşiten ('Abese'); âmâ sahabe olayı ve insanın nankörlüğü.",
  81: "Güneşin dürülmesi; kıyamet alametleri ve amel defterlerinin açılışı.",
  82: "Göğün yarılması; kıyamet ve amelleri kaydeden meleklerin (kirâmen kâtibîn) bildirilmesi.",
  83: "Ölçü-tartıda hile yapanlar ('Mutaffifîn'); dürüstlük ve ahiret hesabı.",
  84: "Göğün yarılması; amel defteri sağdan/arkadan verilenler ve hesap anlatılır.",
  85: "Burçlar; Ashab-ı Uhdud'un imanı ve zalimlere karşı sabır işlenir.",
  86: "Tarık (gece yıldızı); insanın yaratılışı ve her nefsin bir gözeticisi olduğu.",
  87: "Yüce Rabbi tesbih ('A'lâ'); arınma, namaz ve ahiretin üstünlüğü (bayram/vitirde okunur).",
  88: "Kuşatan gün ('Gâşiye') kıyamet; cennet-cehennem ve kâinattaki ibret tabloları.",
  89: "Fecre yemin; Âd, Semûd, Firavun'un helakı ve huzura eren nefse müjde.",
  90: "Beled (Mekke şehri); insanın imtihanı ve zor yokuşu (hayır işlerini) aşmaya çağrı.",
  91: "Güneşe yemin; nefsini arındıranın kurtuluşu ve Semûd kavminin helakı.",
  92: "Geceye yemin; verip-korunanla cimrilik edenin farkı ve iki yol anlatılır.",
  93: "Kuşluk vakti ('Duhâ'); Peygamber'e teselli, yetime ve isteyene şefkat öğüdü.",
  94: "İnşirah (gönül ferahlığı); 'Her zorlukla beraber bir kolaylık vardır' müjdesi.",
  95: "İncir-zeytine yemin; insanın en güzel biçimde yaratıldığı ve amelin değeri.",
  96: "Alak; ilk inen ayetler ('Oku!'), ilmin değeri ve azgın insana uyarı (secde vardır).",
  97: "Kadir gecesi; bin aydan hayırlı gecenin fazileti ve Kur'an'ın inişi.",
  98: "Apaçık delil ('Beyyine'); Ehl-i Kitap, iman edenlerin ve inkârcıların akıbeti.",
  99: "Zilzâl (sarsıntı); kıyamette zerre kadar hayrın da şerrin de karşılığının görülmesi.",
  100: "Soluyan atlar ('Âdiyât'); insanın nankörlüğü ve mala düşkünlüğü anlatılır.",
  101: "Kâria (kapı çalan kıyamet); amellerin tartılacağı mizan ve hesap günü.",
  102: "Çoklukla övünme ('Tekâsür'); dünya hırsının aldatıcılığı ve nimetlerden sorgu.",
  103: "Asr; zamana yeminle insanın ziyanda olduğu, iman-amel-hak-sabır ile kurtuluş.",
  104: "Hümeze (dedikoducu/mal yığan); insanları küçümseyenlerin akıbeti uyarısı.",
  105: "Fil; Kâbe'yi yıkmak isteyen ordunun ebâbil kuşlarıyla helak edilmesi.",
  106: "Kureyş; Kâbe'nin Rabbine kulluk ve nimetlere (güven-rızık) şükür çağrısı.",
  107: "Mâûn; dini yalanlayan, yetimi iten ve namazından gafil riyakârlara uyarı.",
  108: "Kevser; Peygamber'e verilen bol hayır, namaz ve kurban emri (en kısa sure).",
  109: "Kâfirûn; tevhidin net ifadesi, 'Sizin dininiz size, benim dinim bana.'",
  110: "Nasr; Allah'ın yardımı, fetih ve kitleler halinde İslam'a giriş müjdesi.",
  111: "Tebbet (Mesed); Ebû Leheb'in ve karısının inkârdaki akıbeti anlatılır.",
  112: "İhlâs; tevhidin özü, Allah'ın birliği ve benzersizliği (Kur'an'ın üçte biri).",
  113: "Felâk; yaratılmışların, gecenin, büyünün ve hasedin şerrinden Allah'a sığınma.",
  114: "Nâs; insan ve cin şeytanlarının vesvesesinden insanların Rabbine sığınma."
};


/* ══════════════════════════════════════════════════════════════
   0'DAN DUA ÖĞREN — satır satır Arapça + okunuş (anlam yok)
   Her sayfa: { ad, alt, satirlar:[{ar, ok, not?}], ses?:[{s,a}] }
   ses: everyayah'tan çalınacak Kur'an âyetleri (sûre, âyet)
   ══════════════════════════════════════════════════════════════ */
const SIFIRDAN_NAMAZ_DUALARI = [
  {
    ad: "Eûzü – Besmele", alt: "Namaza ve okumaya başlarken",
    satirlar: [
      { ar: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", ok: "Eûzü billâhi mineş-şeytânir-racîm", seg: -1 },
      { ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", ok: "Bismillâhir-rahmânir-rahîm", seg: 0 }
    ],
    ses: [{ s: 1, a: 1 }]
  },
  {
    ad: "Sübhâneke", alt: "İftitah tekbirinden sonra",
    satirlar: [
      { ar: "سُبْحَانَكَ اللَّهُمَّ", ok: "Sübhânekellâhümme" },
      { ar: "وَبِحَمْدِكَ", ok: "ve bihamdik" },
      { ar: "وَتَبَارَكَ اسْمُكَ", ok: "ve tebârakesmük" },
      { ar: "وَتَعَالَى جَدُّكَ", ok: "ve teâlâ ceddük" },
      { ar: "وَجَلَّ ثَنَاؤُكَ", ok: "ve celle senâük", not: "Yalnız cenaze namazında okunur" },
      { ar: "وَلَا إِلَهَ غَيْرُكَ", ok: "ve lâ ilâhe ğayruk" }
    ]
  },
  {
    ad: "Rükû – Secde Tesbihleri", alt: "Rükûda, kalkarken ve secdede",
    satirlar: [
      { ar: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", ok: "Sübhâne rabbiyel-azîm", not: "Rükûda 3 kere" },
      { ar: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ", ok: "Semiallâhü limen hamideh", not: "Rükûdan kalkarken" },
      { ar: "رَبَّنَا لَكَ الْحَمْدُ", ok: "Rabbenâ lekel-hamd", not: "Doğrulunca" },
      { ar: "سُبْحَانَ رَبِّيَ الْأَعْلَى", ok: "Sübhâne rabbiyel-a'lâ", not: "Secdede 3 kere" },
      { ar: "اَلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ", ok: "Esselâmü aleyküm ve rahmetullâh", not: "Selam verirken sağa ve sola" }
    ]
  },
  {
    ad: "Ettehiyyâtü", alt: "Oturuşlarda (ka'de)",
    satirlar: [
      { ar: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ", ok: "Ettehiyyâtü lillâhi vessalevâtü vettayyibât" },
      { ar: "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ", ok: "Esselâmü aleyke eyyühen-nebiyyü" },
      { ar: "وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", ok: "ve rahmetullâhi ve berakâtüh" },
      { ar: "السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ", ok: "Esselâmü aleynâ ve alâ ibâdillâhis-sâlihîn" },
      { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", ok: "Eşhedü en lâ ilâhe illallâh" },
      { ar: "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", ok: "ve eşhedü enne Muhammeden abdühû ve rasûlüh" }
    ]
  },
  {
    ad: "Allâhümme Salli", alt: "Son oturuşta Ettehiyyâtü'den sonra",
    satirlar: [
      { ar: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ", ok: "Allâhümme salli alâ Muhammediv ve alâ âli Muhammed" },
      { ar: "كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ", ok: "kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm" },
      { ar: "إِنَّكَ حَمِيدٌ مَجِيدٌ", ok: "inneke hamîdüm mecîd" }
    ]
  },
  {
    ad: "Allâhümme Bârik", alt: "Allâhümme Salli'den sonra",
    satirlar: [
      { ar: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ", ok: "Allâhümme bârik alâ Muhammediv ve alâ âli Muhammed" },
      { ar: "كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ", ok: "kemâ bârekte alâ İbrâhîme ve alâ âli İbrâhîm" },
      { ar: "إِنَّكَ حَمِيدٌ مَجِيدٌ", ok: "inneke hamîdüm mecîd" }
    ]
  },
  {
    ad: "Rabbenâ Âtinâ", alt: "Salli-Bârik'ten sonra (Bakara 201)",
    satirlar: [
      { ar: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً", ok: "Rabbenâ âtinâ fid-dünyâ haseneten" },
      { ar: "وَفِي الْآخِرَةِ حَسَنَةً", ok: "ve fil-âhirati haseneten" },
      { ar: "وَقِنَا عَذَابَ النَّارِ", ok: "ve kınâ azâben-nâr" }
    ],
    ses: [{ s: 2, a: 201 }]
  },
  {
    ad: "Rabbenâğfirlî", alt: "Rabbenâ Âtinâ'dan sonra (İbrâhîm 41)",
    satirlar: [
      { ar: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ", ok: "Rabbenâğfir lî ve li-vâlideyye" },
      { ar: "وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ", ok: "ve lil-mü'minîne yevme yekûmül-hisâb" }
    ],
    ses: [{ s: 14, a: 41 }]
  },
  {
    ad: "Kunut Duası (1)", alt: "Vitir namazının 3. rekâtında",
    satirlar: [
      { ar: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ", ok: "Allâhümme innâ nesteînüke" },
      { ar: "وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ", ok: "ve nestağfiruke ve nestehdîk" },
      { ar: "وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ", ok: "ve nü'minü bike ve netûbü ileyk" },
      { ar: "وَنَتَوَكَّلُ عَلَيْكَ", ok: "ve netevekkelü aleyk" },
      { ar: "وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ", ok: "ve nüsnî aleykel-hayra küllehû" },
      { ar: "نَشْكُرُكَ وَلَا نَكْفُرُكَ", ok: "neşküruke ve lâ nekfüruk" },
      { ar: "وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ", ok: "ve nahleu ve netrukü men yefcüruk" }
    ]
  },
  {
    ad: "Kunut Duası (2)", alt: "Birinci Kunut'un devamı",
    satirlar: [
      { ar: "اللَّهُمَّ إِيَّاكَ نَعْبُدُ", ok: "Allâhümme iyyâke na'büdü" },
      { ar: "وَلَكَ نُصَلِّي وَنَسْجُدُ", ok: "ve leke nusallî ve nescüdü" },
      { ar: "وَإِلَيْكَ نَسْعَى وَنَحْفِدُ", ok: "ve ileyke nes'â ve nahfidü" },
      { ar: "نَرْجُو رَحْمَتَكَ", ok: "nercû rahmeteke" },
      { ar: "وَنَخْشَى عَذَابَكَ", ok: "ve nahşâ azâbeke" },
      { ar: "إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ", ok: "inne azâbeke bil-küffâri mülhık" }
    ]
  },
  {
    ad: "Âyetel Kürsî", alt: "Bakara 255 — namazlardan sonra",
    satirlar: [
      { ar: "اَللّٰهُ لَٓا اِلٰهَ اِلَّا هُوَۚ اَلْحَىُّ الْقَيُّومُۚ", ok: "Allâhü lâ ilâhe illâ hüvel-hayyül-kayyûm" },
      { ar: "لَا تَاْخُذُهُ سِنَةٌ وَلَا نَوْمٌۜ", ok: "Lâ te'huzühû sinetün ve lâ nevm" },
      { ar: "لَهُ مَا فِى السَّمٰوَاتِ وَمَا فِى الْاَرْضِۜ", ok: "Lehû mâ fis-semâvâti ve mâ fil-ard" },
      { ar: "مَنْ ذَا الَّذٖى يَشْفَعُ عِنْدَهُٓ اِلَّا بِاِذْنِهٖۜ", ok: "Men zellezî yeşfeu indehû illâ bi-iznih" },
      { ar: "يَعْلَمُ مَا بَيْنَ اَيْدٖيهِمْ وَمَا خَلْفَهُمْۚ", ok: "Ya'lemü mâ beyne eydîhim ve mâ halfehüm" },
      { ar: "وَلَا يُحٖيطُونَ بِشَىْءٍ مِنْ عِلْمِهٖٓ اِلَّا بِمَا شَٓاءَۚ", ok: "Ve lâ yühîtûne bi-şey'in min ilmihî illâ bimâ şâ'" },
      { ar: "وَسِعَ كُرْسِيُّهُ السَّمٰوَاتِ وَالْاَرْضَۚ", ok: "Vesia kürsiyyühüs-semâvâti vel-ard" },
      { ar: "وَلَا يَؤُ۫دُهُ حِفْظُهُمَاۚ وَهُوَ الْعَلِىُّ الْعَظٖيمُ", ok: "Ve lâ yeûdühû hıfzuhümâ ve hüvel-aliyyül-azîm" }
    ],
    ses: [{ s: 2, a: 255 }]
  },
  {
    ad: "Âmenerrasûlü", alt: "Bakara 285-286 — yatsıdan sonra",
    satirlar: [
      { ar: "اٰمَنَ الرَّسُولُ بِمَٓا اُنْزِلَ اِلَيْهِ مِنْ رَبِّهٖ وَالْمُؤْمِنُونَؕ", ok: "Âmener-rasûlü bimâ ünzile ileyhi min rabbihî vel-mü'minûn", seg: 0 },
      { ar: "كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰٓئِكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖؕ", ok: "Küllün âmene billâhi ve melâiketihî ve kütübihî ve rusülih", seg: 0 },
      { ar: "لَا نُفَرِّقُ بَيْنَ اَحَدٍ مِنْ رُسُلِهٖࣞ", ok: "Lâ nüferriku beyne ehadin min rusülih", seg: 0 },
      { ar: "وَقَالُوا سَمِعْنَا وَاَطَعْنَا غُفْرَانَكَ رَبَّنَا وَاِلَيْكَ الْمَصٖيرُ", ok: "Ve kâlû semi'nâ ve eta'nâ ğufrâneke rabbenâ ve ileykel-masîr", seg: 0 },
      { ar: "لَا يُكَلِّفُ اللّٰهُ نَفْسًا اِلَّا وُسْعَهَاۜ", ok: "Lâ yükellifullâhü nefsen illâ vüs'ahâ", seg: 1 },
      { ar: "لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْۜ", ok: "Lehâ mâ kesebet ve aleyhâ mektesebet", seg: 1 },
      { ar: "رَبَّنَا لَا تُؤَاخِذْنَٓا اِنْ نَسٖينَٓا اَوْ اَخْطَاْنَاۚ", ok: "Rabbenâ lâ tüâhiznâ in nesînâ ev ahta'nâ", seg: 1 },
      { ar: "رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَٓا اِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذٖينَ مِنْ قَبْلِنَاۚ", ok: "Rabbenâ ve lâ tahmil aleynâ ısran kemâ hameltehû alellezîne min kablinâ", seg: 1 },
      { ar: "رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهٖۚ", ok: "Rabbenâ ve lâ tühammilnâ mâ lâ tâkate lenâ bih", seg: 1 },
      { ar: "وَاعْفُ عَنَّا۠ وَاغْفِرْ لَنَا۠ وَارْحَمْنَا۠", ok: "Va'fü annâ vağfir lenâ verhamnâ", seg: 1 },
      { ar: "اَنْتَ مَوْلٰينَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرٖينَ", ok: "Ente mevlânâ fensurnâ alel-kavmil-kâfirîn", seg: 1 }
    ],
    ses: [{ s: 2, a: 285 }, { s: 2, a: 286 }]
  },
  {
    ad: "Namaz Tesbihâtı", alt: "Selamdan sonra",
    satirlar: [
      { ar: "سُبْحَانَ اللَّهِ", ok: "Sübhânallâh", not: "33 kere" },
      { ar: "اَلْحَمْدُ لِلَّهِ", ok: "Elhamdülillâh", not: "33 kere" },
      { ar: "اَللَّهُ أَكْبَرُ", ok: "Allâhü ekber", not: "33 kere" },
      { ar: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", ok: "Lâ ilâhe illallâhü vahdehû lâ şerîke leh" },
      { ar: "لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ", ok: "lehül-mülkü ve lehül-hamdü" },
      { ar: "وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", ok: "ve hüve alâ külli şey'in kadîr" }
    ]
  },
  {
    ad: "Kelime-i Tevhîd", alt: "",
    satirlar: [
      { ar: "لَا إِلَهَ إِلَّا اللَّهُ", ok: "Lâ ilâhe illallâh" },
      { ar: "مُحَمَّدٌ رَسُولُ اللَّهِ", ok: "Muhammedün rasûlullâh" }
    ]
  },
  {
    ad: "Kelime-i Şehâdet", alt: "",
    satirlar: [
      { ar: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ", ok: "Eşhedü en lâ ilâhe illallâh" },
      { ar: "وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", ok: "ve eşhedü enne Muhammeden abdühû ve rasûlüh" }
    ]
  }
];

/* KISA_SURELER'de okunuş cümle cümle; iki sûrede cümle sayısı âyet
   sayısıyla uyuşmuyor. Buradaki listeler âyet âyet doğru bölünmüş hâli. */
const SIFIRDAN_SURE_OKUNUS = {
  "Alak Sûresi": [
    "İkra' bismi rabbikel-lezî halek.", "Halekal-insâne min 'alak.", "İkra' verabbükel-ekram.",
    "Ellezî 'alleme bilkalem.", "'Allemel-insâne mâ lem ya'lem.", "Kellâ innel-insâne leyatgâ.",
    "Er raâhüs-tagnâ.", "İnne ilâ rabbiker-ruc'â.", "Era'eytel-lezî yenhâ.", "'Abden izâ sallâ.",
    "Era'eyte in kâne 'alel-hüdâ.", "Ev emera bittakvâ.", "Era'eyte in kezzebe vetevellâ.",
    "Elem ya'lem biennel-lâhe yerâ.", "Kellâ leil lem yentehi lenesfe'am binnâsiyeh.",
    "Nâsiyetin kâzibetin hâtieh.", "Felyed'u nâdiyeh.", "Sened'uz-zebâniyeh.",
    "Kellâ, lâ tüti'hü vescüd vakterib."
  ],
  "Beyyine Sûresi": [
    "Lem yekünil-lezîne keferû min ehlil-kitâbi velmüşrikîne münfekkîne hattâ te'tiyehümül-beyyineh.",
    "Rasûlüm minel-lâhi yetlû suhufem mütahherah.",
    "Fîhâ kütübün kayyimeh.",
    "Vemâ teferrakal-lezîne ûtül-kitâbe illâ mim ba'di mâ câethümül-beyyineh.",
    "Vemâ ümirû illâ liya'büdül-lâhe muhlisîne lehüd-dîne hunefâe veyükîmus-salâte veyü'tüz-zekâte vezâlike dînül-kayyimeh.",
    "İnnel-lezîne keferû min ehlil-kitâbi velmüşrikîne fî nâri cehenneme hâlidîne fîhâ, ülâike hüm şerrul-beriyyeh.",
    "İnnel-lezîne âmenû ve'amilus-sâlihâti ülâike hüm hayrul-beriyyeh.",
    "Cezâühüm 'inde rabbihim cennâtü 'adnin tecrî min tahtihel-enhâru hâlidîne fîhâ ebedâ, radiyel-lâhü 'anhüm veradû 'anh, zâlike limen haşiye rabbeh."
  ]
};

/* Kur'an'daki dualar — âyetler uygulamanın Kur'an servisinden çekilir
   (Arapça + okunuş + hoca sesi), ilk açılışta cihaza kaydedilir. */
const SIFIRDAN_KURAN_DUALARI = [
  { ad: "Rabbenâ tekabbel minnâ", alt: "Bakara 127-128 · İbrâhîm ve İsmâil (a.s.)", s: 2, b: 127, e: 128 },
  { ad: "Rabbenâ âtinâ fid-dünyâ", alt: "Bakara 201", s: 2, b: 201, e: 201 },
  { ad: "Rabbenâ efriğ aleynâ sabran", alt: "Bakara 250 · Tâlût'un ordusu", s: 2, b: 250, e: 250 },
  { ad: "Rabbenâ lâ tüâhiznâ", alt: "Bakara 286", s: 2, b: 286, e: 286 },
  { ad: "Rabbenâ lâ tüziğ kulûbenâ", alt: "Âl-i İmrân 8-9", s: 3, b: 8, e: 9 },
  { ad: "Rabbenâ innenâ âmennâ", alt: "Âl-i İmrân 16", s: 3, b: 16, e: 16 },
  { ad: "Rabbi heb lî min ledünke", alt: "Âl-i İmrân 38 · Zekeriyyâ (a.s.)", s: 3, b: 38, e: 38 },
  { ad: "Rabbenâ âmennâ bimâ enzelte", alt: "Âl-i İmrân 53 · Havârîler", s: 3, b: 53, e: 53 },
  { ad: "Rabbenağfir lenâ zünûbenâ", alt: "Âl-i İmrân 147", s: 3, b: 147, e: 147 },
  { ad: "Rabbenâ mâ halakte hâzâ bâtılâ", alt: "Âl-i İmrân 191-194", s: 3, b: 191, e: 194 },
  { ad: "Rabbenâ ahricnâ", alt: "Nisâ 75", s: 4, b: 75, e: 75 },
  { ad: "Rabbenâ âmennâ fektübnâ", alt: "Mâide 83", s: 5, b: 83, e: 83 },
  { ad: "Rabbenâ zalemnâ enfüsenâ", alt: "A'râf 23 · Âdem (a.s.)", s: 7, b: 23, e: 23 },
  { ad: "Rabbenâ lâ tec'alnâ meal-kavmiz-zâlimîn", alt: "A'râf 47", s: 7, b: 47, e: 47 },
  { ad: "Rabbenâ eftah beynenâ", alt: "A'râf 89 · Şuayb (a.s.)", s: 7, b: 89, e: 89 },
  { ad: "Rabbenâ efriğ aleynâ sabran ve teveffenâ", alt: "A'râf 126 · Sihirbazların imanı", s: 7, b: 126, e: 126 },
  { ad: "Rabbiğfir lî ve li ehî", alt: "A'râf 151 · Mûsâ (a.s.)", s: 7, b: 151, e: 151 },
  { ad: "Rabbenâ lâ tec'alnâ fitneten", alt: "Yûnus 85-86", s: 10, b: 85, e: 86 },
  { ad: "Rabbi innî eûzü bike", alt: "Hûd 47 · Nûh (a.s.)", s: 11, b: 47, e: 47 },
  { ad: "Rabbi kad âteytenî minel-mülk", alt: "Yûsuf 101 · Yûsuf (a.s.)", s: 12, b: 101, e: 101 },
  { ad: "Rabbic'alnî mukîmes-salâh", alt: "İbrâhîm 40-41 · İbrâhîm (a.s.)", s: 14, b: 40, e: 41 },
  { ad: "Rabbirhamhümâ", alt: "İsrâ 24 · Anne-baba için", s: 17, b: 24, e: 24 },
  { ad: "Rabbi edhilnî müdhale sıdk", alt: "İsrâ 80", s: 17, b: 80, e: 80 },
  { ad: "Rabbenâ âtinâ min ledünke rahmeh", alt: "Kehf 10 · Ashâb-ı Kehf", s: 18, b: 10, e: 10 },
  { ad: "Rabbişrah lî sadrî", alt: "Tâhâ 25-28 · Mûsâ (a.s.)", s: 20, b: 25, e: 28 },
  { ad: "Rabbi zidnî ilmâ", alt: "Tâhâ 114", s: 20, b: 114, e: 114 },
  { ad: "Ennî messeniyed-durru", alt: "Enbiyâ 83 · Eyyûb (a.s.)", s: 21, b: 83, e: 83 },
  { ad: "Lâ ilâhe illâ ente sübhânek", alt: "Enbiyâ 87 · Yûnus (a.s.)", s: 21, b: 87, e: 87 },
  { ad: "Rabbi lâ tezernî ferdâ", alt: "Enbiyâ 89 · Zekeriyyâ (a.s.)", s: 21, b: 89, e: 89 },
  { ad: "Rabbi eûzü bike min hemezâtiş-şeyâtîn", alt: "Mü'minûn 97-98", s: 23, b: 97, e: 98 },
  { ad: "Rabbenâ âmennâ fağfir lenâ", alt: "Mü'minûn 109", s: 23, b: 109, e: 109 },
  { ad: "Rabbiğfir verham", alt: "Mü'minûn 118", s: 23, b: 118, e: 118 },
  { ad: "Rabbenasrif annâ azâbe cehennem", alt: "Furkân 65-66", s: 25, b: 65, e: 66 },
  { ad: "Rabbenâ heb lenâ min ezvâcinâ", alt: "Furkân 74", s: 25, b: 74, e: 74 },
  { ad: "Rabbi heb lî hukmen", alt: "Şuarâ 83-85 · İbrâhîm (a.s.)", s: 26, b: 83, e: 85 },
  { ad: "Rabbi evzi'nî en eşküra", alt: "Neml 19 · Süleymân (a.s.)", s: 27, b: 19, e: 19 },
  { ad: "Rabbi innî zalemtü nefsî", alt: "Kasas 16 · Mûsâ (a.s.)", s: 28, b: 16, e: 16 },
  { ad: "Rabbi innî limâ enzelte ileyye", alt: "Kasas 24 · Mûsâ (a.s.)", s: 28, b: 24, e: 24 },
  { ad: "Rabbinsurnî", alt: "Ankebût 30 · Lût (a.s.)", s: 29, b: 30, e: 30 },
  { ad: "Rabbi heb lî mines-sâlihîn", alt: "Sâffât 100 · İbrâhîm (a.s.)", s: 37, b: 100, e: 100 },
  { ad: "Rabbenâ vesi'te külle şey'in", alt: "Mü'min 7-8 · Meleklerin duası", s: 40, b: 7, e: 8 },
  { ad: "Rabbi evzi'nî en eşküra ni'metek", alt: "Ahkâf 15", s: 46, b: 15, e: 15 },
  { ad: "Rabbenağfir lenâ ve li ihvâninâ", alt: "Haşr 10", s: 59, b: 10, e: 10 },
  { ad: "Rabbenâ aleyke tevekkelnâ", alt: "Mümtehine 4-5", s: 60, b: 4, e: 5 },
  { ad: "Rabbenâ etmim lenâ nûranâ", alt: "Tahrîm 8", s: 66, b: 8, e: 8 },
  { ad: "Rabbiğfir lî ve li vâlideyye", alt: "Nûh 28 · Nûh (a.s.)", s: 71, b: 28, e: 28 }
];

/* ══════════ v65.0 — ÖZEL NAMAZLAR EKLERİ (Hanefî fıkhı / Diyanet İlmihali) ══════════ */
OZEL_NAMAZLAR.push(
  {
    title: "Vitir Namazı",
    ozet: "3 rekât, vacip. Yatsıdan sonra, tercihen gecenin son kısmında kılınır.",
    detay: "Yatsı namazının farzından ve son sünnetinden sonra 3 rekât olarak kılınır; tek selamla tamamlanır. Her rekâtta Fâtiha ve bir sûre okunur. Üçüncü rekâtta sûreden sonra eller kulak hizasına kaldırılıp tekbir alınır, eller bağlanır ve Kunut duaları okunur; ardından rükû ve secdeye gidilir. Gece kalkma alışkanlığı olan, vitri teheccüdden sonraya bırakabilir. Unutulursa kazası gerekir."
  },
  {
    title: "Teheccüd Namazı",
    ozet: "Gece namazı. Yatsıdan sonra bir miktar uyuyup kalkarak 2–8 rekât kılınır.",
    detay: "Kur'an'da (İsrâ 79, Müzzemmil) övülen, Peygamberimizin hiç terk etmediği nafile namazdır. Yatsıdan sonra uyuyup gecenin son üçte birinde kalkarak ikişer rekât hâlinde kılınır; 2, 4, 6 veya 8 rekât olabilir. Uzun kıraat ve huşû ile kılınması, sonunda dua ve istiğfar edilmesi tavsiye edilir. Bu vakit duaların kabulüne en yakın vakittir. Vitir henüz kılınmadıysa teheccüdden sonra kılınır."
  },
  {
    title: "Kuşluk (Duhâ) Namazı",
    ozet: "2–12 rekât nafile. Güneş doğduktan ~45 dk sonra ile öğle arasında kılınır.",
    detay: "İşrak vaktinden (güneşin doğuşundan yaklaşık 45 dakika sonra) öğle namazına yaklaşık 10 dakika kalana kadar kılınabilir. En azı 2, orta hâli 4, en fazlası 12 rekâttır; ikişer rekât hâlinde kılınır. Hadiste 'Kim sabah namazını cemaatle kılıp güneş doğana kadar zikirle oturur, sonra iki rekât kılarsa hac ve umre sevabı alır' buyrulmuştur. Kerahet vaktinde (güneş doğarken) kılınmaz; uygulamanın ana sayfasındaki 'Kuşluk' saatleri bu aralığı gösterir."
  },
  {
    title: "Evvâbîn Namazı",
    ozet: "Akşam namazından sonra 6 rekât nafile (2+2+2).",
    detay: "Akşam namazının farz ve sünnetinden sonra, yatsıya kadar olan sürede ikişer rekât hâlinde 6 rekât kılınır. 'Evvâbîn' Allah'a çokça yönelenler demektir. Hadiste, akşamla yatsı arasında altı rekât kılana on iki yıllık ibadet sevabı müjdelenmiştir. Akşamın iki rekât sünneti de bu altı rekâta dâhil sayılabilir."
  },
  {
    title: "Tesbih Namazı",
    ozet: "4 rekât. Her rekâtta 75, toplam 300 tesbih okunur. Ömürde bir kez olsun tavsiye edilir.",
    detay: "Tesbih: 'Sübhânallâhi vel-hamdü lillâhi ve lâ ilâhe illallâhü vallâhü ekber'. Her rekâtta: Sübhâneke'den sonra 15, Fâtiha ve sûreden sonra 10, rükûda 10, rükûdan doğrulunca 10, birinci secdede 10, iki secde arasında 10, ikinci secdede 10 kez okunur (toplam 75). Dört rekâtta 300 olur. Tek veya iki selamla kılınabilir. Hadiste 'Her gün kılabilirsen kıl; gücün yetmezse haftada, ayda, yılda bir; o da olmazsa ömründe bir kere kıl' buyrulmuştur. Kandil gecelerinde ve Ramazan'da çokça kılınır."
  },
  {
    title: "İstihâre Namazı",
    ozet: "2 rekât. Bir konuda hayırlı olanı Allah'tan istemek için kılınır, ardından istihâre duası okunur.",
    detay: "Evlilik, iş, yolculuk gibi meşru bir işte tereddüt edildiğinde 2 rekât nafile kılınır. Birinci rekâtta Kâfirûn, ikinci rekâtta İhlâs sûresi okunması tavsiye edilir. Selamdan sonra Peygamberimizin öğrettiği istihâre duası okunur: 'Allâhümme innî estehîruke bi-ilmike ve estakdiruke bi-kudretike...' Rüya görmek şart değildir; kalbin meylettiği yön hayırlı kabul edilir. Gerekirse yedi güne kadar tekrarlanabilir. Kerahet vakitlerinde kılınmaz."
  },
  {
    title: "Hâcet Namazı",
    ozet: "2 veya 4 rekât. Dünyevî ya da uhrevî bir ihtiyaç için kılınıp dua edilir.",
    detay: "Yatsıdan sonra 2 (bazı rivayetlerde 4 veya 12) rekât kılınır. Birinci rekâtta Fâtiha'dan sonra 3 Âyetel Kürsî, diğer rekâtlarda İhlâs, Felâk ve Nâs okunması tavsiye edilir. Namazdan sonra Allah'a hamd, Peygamberimize salavat getirilir ve hâcet duası okunur: 'Lâ ilâhe illallâhül-halîmül-kerîm. Sübhânallâhi rabbil-arşil-azîm. El-hamdü lillâhi rabbil-âlemîn...' Ardından ihtiyaç içtenlikle Allah'a arz edilir."
  },
  {
    title: "Tahiyyetü'l-Mescid",
    ozet: "Camiye girince oturmadan önce kılınan 2 rekât nafile.",
    detay: "Mescide giren kişinin oturmadan önce 2 rekât kılması sünnettir; 'mescidi selamlama' anlamına gelir. Kerahet vaktinde girilmişse kılınmaz. Camiye girip hemen farz veya sünnet bir namaza durulursa o namaz tahiyyetü'l-mescid yerine de geçer. Cuma günü hutbe başlamışsa kılınmaz, hutbe dinlenir."
  },
  {
    title: "Tövbe Namazı",
    ozet: "2 rekât. Bir günahtan sonra abdest alıp kılınır, ardından samimiyetle istiğfar edilir.",
    detay: "Hadiste 'Bir kul günah işler de güzelce abdest alıp iki rekât namaz kılar ve Allah'tan bağışlanma dilerse Allah onu bağışlar' buyrulmuştur. Güzelce abdest alınır, 2 rekât nafile kılınır; sonra günah için pişmanlık duyularak 'Estağfirullâh el-azîm ellezî lâ ilâhe illâ hüvel-hayyel-kayyûme ve etûbü ileyh' ile tövbe ve istiğfar edilir. Kul hakkı varsa helallik almak gerekir."
  },
  {
    title: "Şükür Namazı ve Şükür Secdesi",
    ozet: "Bir nimete kavuşunca 2 rekât namaz veya bir şükür secdesi yapılır.",
    detay: "Bir nimete kavuşan ya da bir beladan kurtulan kişi, Allah'a şükür için 2 rekât nafile kılar veya kıbleye dönüp tekbir alarak bir secde yapar; secdede 'Sübhâne rabbiyel-a'lâ' der, hamd ve şükreder, sonra tekbirle kalkar. Peygamberimiz sevindirici haber aldığında şükür secdesi yapmıştır."
  },
  {
    title: "Yolcu (Sefer) Namazı",
    ozet: "Yolcu, 4 rekâtlı farzları 2 rekât kılar; öğle-ikindi ve akşam-yatsı birleştirilebilir (Şafiî).",
    detay: "En az 90 km (Hanefî'de yaklaşık 90 km) mesafeye giden ve 15 günden az kalacak kişi 'seferî'dir. Öğle, ikindi ve yatsı farzları 2 rekât kılınır (sabah ve akşam değişmez). Sünnetler kılınabilir; sıkıntı hâlinde terk edilebilir. Hanefî'de vakitler birleştirilmez; Şafiî'de öğle-ikindi ve akşam-yatsı cem edilebilir. Seferî, mukim imama uyarsa 4 rekât kılar; mukim, seferî imama uyarsa imam selam verince kalkıp kalan iki rekâtı tamamlar."
  },
  {
    title: "Hasta Namazı",
    ozet: "Ayakta duramayan oturarak, oturamayan yatarak, îmâ ile kılar. Namaz hiçbir hâlde düşmez.",
    detay: "Ayakta durmaya gücü yetmeyen oturarak kılar; rükû ve secdeyi yapabiliyorsa yapar. Secdeye eğilemeyen, rükû için biraz, secde için daha fazla eğilerek îmâ eder; secde için önüne yastık vb. koymak gerekmez. Oturamayan sırt üstü yatar, ayaklarını kıbleye uzatır, başını hafifçe kaldırıp îmâ ile kılar. Abdest alamayan teyemmüm eder; su ve toprak kullanamayan mazeretli sayılır. Bilinç açıkken namaz terk edilmez; geçen namazlar iyileşince kaza edilir."
  }
);

/* ══════════ v65.0 — GÜNLÜK DUALAR: düzeltme + ekler ══════════ */
// Düzeltme: "Uyumadan Önce" duasında Arapça ile okunuş uyuşmuyordu
(function () {
  const u = GUNLUK_DUALAR.find(d => d.title === "Uyumadan Önce");
  if (u) {
    u.arabic = "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ وَوَجَّهْتُ وَجْهِي إِلَيْكَ وَفَوَّضْتُ أَمْرِي إِلَيْكَ وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ رَغْبَةً وَرَهْبَةً إِلَيْكَ لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ";
  }
})();
GUNLUK_DUALAR.push(
  { title: "Yatağa Yatarken (Kısa)", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", okunusu: "Bismikellâhümme emûtü ve ahyâ", turkish: "Allah'ım! Senin adınla ölür (uyur) ve senin adınla dirilirim (uyanırım).", tag: "uyku" },
  { title: "Korkulu Rüya Görünce", arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ", okunusu: "Eûzü bi-kelimâtillâhit-tâmmâti min ğadabihî ve ıkâbihî ve şerri ibâdihî ve min hemezâtiş-şeyâtîni ve en yahdurûn", turkish: "Allah'ın gazabından, azabından, kullarının şerrinden, şeytanların vesveselerinden ve yanımda bulunmalarından Allah'ın eksiksiz kelimelerine sığınırım.", tag: "uyku" },
  { title: "Elbise Giyerken", arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", okunusu: "Elhamdü lillâhillezî kesânî hâzâ ve razekanîhi min ğayri havlin minnî ve lâ kuvveh", turkish: "Benden bir güç ve kuvvet olmaksızın bana bunu giydiren ve rızık olarak veren Allah'a hamdolsun.", tag: "giyim" },
  { title: "Vasıtaya Binince", arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ", okunusu: "Sübhânellezî sahhara lenâ hâzâ ve mâ künnâ lehû mukrinîn. Ve innâ ilâ rabbinâ le-munkalibûn", turkish: "Bunu bizim hizmetimize veren Allah'ı tesbih ederim; yoksa biz buna güç yetiremezdik. Şüphesiz biz Rabbimize döneceğiz. (Zuhruf 13-14)", tag: "yolculuk" },
  { title: "Yolcuyu Uğurlarken", arabic: "أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ", okunusu: "Estevdiullâhe dîneke ve emâneteke ve havâtîme amelik", turkish: "Dinini, emanetini ve amellerinin sonunu Allah'a emanet ediyorum.", tag: "yolculuk" },
  { title: "Seferden Dönünce", arabic: "آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ", okunusu: "Âyibûne tâibûne âbidûne li-rabbinâ hâmidûn", turkish: "Dönenler, tövbe edenler, ibadet edenler ve Rabbimize hamd edenleriz.", tag: "yolculuk" },
  { title: "Ezan Duyunca (Ezandan Sonra)", arabic: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ", okunusu: "Allâhümme rabbe hâzihid-da'vetit-tâmmeti ves-salâtil-kâimeti âti Muhammedenil-vesîlete vel-fadîlete veb'ashü makâmen mahmûdenillezî vaadteh", turkish: "Ey bu eksiksiz davetin ve kılınacak namazın Rabbi olan Allah'ım! Muhammed'e vesîleyi ve fazileti ver; onu vaad ettiğin Makâm-ı Mahmûd'a ulaştır.", tag: "ezan" },
  { title: "Üzüntü ve Keder Anında", arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ", okunusu: "Allâhümme innî eûzü bike minel-hemmi vel-hazeni vel-aczi vel-keseli vel-buhli vel-cübni ve dala'id-deyni ve ğalebetir-ricâl", turkish: "Allah'ım! Kaygıdan, üzüntüden, acizlikten, tembellikten, cimrilikten, korkaklıktan, borç yükünden ve insanların baskısından sana sığınırım.", tag: "sıkıntı" },
  { title: "Öfkelenince", arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", okunusu: "Eûzü billâhi mineş-şeytânir-racîm", turkish: "Kovulmuş şeytandan Allah'a sığınırım. (Öfke anında abdest almak ve oturmak da tavsiye edilir.)", tag: "sıkıntı" },
  { title: "Musibet Anında", arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا", okunusu: "İnnâ lillâhi ve innâ ileyhi râciûn. Allâhümme'cürnî fî musîbetî ve ahlif lî hayran minhâ", turkish: "Biz Allah'a aidiz ve O'na döneceğiz. Allah'ım! Musibetimde bana ecir ver ve onun yerine bana daha hayırlısını ihsan et.", tag: "sıkıntı" },
  { title: "Zor Bir İş Öncesi", arabic: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا", okunusu: "Allâhümme lâ sehle illâ mâ cealtehû sehlen ve ente tec'alül-hazne izâ şi'te sehlâ", turkish: "Allah'ım! Senin kolay kıldığından başka kolay yoktur. Sen dilersen zoru da kolay kılarsın.", tag: "iş" },
  { title: "Borçtan Kurtulmak İçin", arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ", okunusu: "Allâhümmekfinî bi-halâlike an harâmike ve ağninî bi-fadlike ammen sivâk", turkish: "Allah'ım! Helâlinle beni haramından müstağni kıl; lütfunla beni senden başkasına muhtaç etme.", tag: "rızık" },
  { title: "Hasta Ziyaretinde", arabic: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ", okunusu: "Lâ be'se tahûrun inşâallâh", turkish: "Geçmiş olsun; inşallah bu hastalık günahlara kefaret olur, temizler.", tag: "hastalık" },
  { title: "Hastaya Şifa Duası", arabic: "اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِ أَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا", okunusu: "Allâhümme rabben-nâsi ezhibil-be'se, işfi enteş-şâfî, lâ şifâe illâ şifâüke şifâen lâ yuğâdiru sekamâ", turkish: "Ey insanların Rabbi olan Allah'ım! Sıkıntıyı gider, şifa ver; şifa veren sensin. Senin şifandan başka şifa yoktur. Hiçbir hastalık bırakmayan bir şifa ver.", tag: "hastalık" },
  { title: "Hapşırınca ve Cevabı", arabic: "الْحَمْدُ لِلَّهِ — يَرْحَمُكَ اللَّهُ — يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ", okunusu: "Elhamdülillâh — Yerhamükellâh — Yehdîkümullâhü ve yuslihu bâleküm", turkish: "Hapşıran: 'Allah'a hamdolsun' der. Duyan: 'Allah sana merhamet etsin' der. Hapşıran cevap verir: 'Allah size hidayet versin ve hâlinizi düzeltsin.'", tag: "günlük" },
  { title: "Bir Şeyi Beğenince", arabic: "مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ", okunusu: "Mâşâallâh, lâ kuvvete illâ billâh", turkish: "Allah dilemiş (de olmuş); güç ve kuvvet ancak Allah'tandır. (Nazardan korunmak için söylenir.)", tag: "nazar" },
  { title: "Yeni Doğan Bebek İçin", arabic: "أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ", okunusu: "Üîzüke bi-kelimâtillâhit-tâmmeti min külli şeytânin ve hâmmetin ve min külli aynin lâmmeh", turkish: "Seni her şeytandan, zararlı haşereden ve kem gözden Allah'ın eksiksiz kelimelerine sığındırırım. (Peygamberimiz torunlarına okurdu.)", tag: "aile" },
  { title: "Evlenenlere", arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ", okunusu: "Bârekellâhü leke ve bâreke aleyke ve cemea beynekümâ fî hayr", turkish: "Allah sana mübarek kılsın, üzerine bereket indirsin ve sizi hayırda bir araya getirsin.", tag: "aile" },
  { title: "Anne Baba İçin", arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", okunusu: "Rabbirhamhümâ kemâ rabbeyânî sağîrâ", turkish: "Rabbim! Onlar beni küçükken nasıl yetiştirdilerse sen de onlara öyle merhamet et. (İsrâ 24)", tag: "aile" },
  { title: "Yağmur Yağarken", arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا", okunusu: "Allâhümme sayyiben nâfiâ", turkish: "Allah'ım! Bunu faydalı bir yağmur kıl.", tag: "tabiat" },
  { title: "Gök Gürleyince", arabic: "سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ", okunusu: "Sübhânellezî yüsebbihur-ra'dü bi-hamdihî vel-melâiketü min hîfetih", turkish: "Gök gürültüsünün hamd ile, meleklerin de korkusundan tesbih ettiği Allah'ı tesbih ederim.", tag: "tabiat" },
  { title: "Rüzgâr Estiğinde", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَأَعُوذُ بِكَ مِنْ شَرِّهَا", okunusu: "Allâhümme innî es'elüke hayrahâ ve eûzü bike min şerrihâ", turkish: "Allah'ım! Senden bunun hayrını isterim, şerrinden sana sığınırım.", tag: "tabiat" },
  { title: "Hilâli (Yeni Ayı) Görünce", arabic: "اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ رَبِّي وَرَبُّكَ اللَّهُ", okunusu: "Allâhümme ehillehû aleynâ bil-emni vel-îmâni ves-selâmeti vel-islâm. Rabbî ve rabbükellâh", turkish: "Allah'ım! Bu ayı üzerimize güven, iman, esenlik ve İslâm ile doğdur. (Ey hilâl!) Benim de Rabbim, senin de Rabbin Allah'tır.", tag: "tabiat" },
  { title: "Pazara / Çarşıya Girerken", arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", okunusu: "Lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü yuhyî ve yümîtü ve hüve hayyün lâ yemût, bi-yedihil-hayru ve hüve alâ külli şey'in kadîr", turkish: "Allah'tan başka ilâh yoktur, O tektir, ortağı yoktur. Mülk O'nundur, hamd O'nadır. Diriltir ve öldürür; O ölmeyen diridir. Hayır O'nun elindedir ve O her şeye kadirdir.", tag: "günlük" },
  { title: "Kabir Ziyaretinde", arabic: "السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ", okunusu: "Esselâmü aleyküm ehled-diyâri minel-mü'minîne vel-müslimîn, ve innâ inşâallâhü biküm lâhikûn, nes'elüllâhe lenâ ve lekümül-âfiyeh", turkish: "Ey bu diyarın mümin ve Müslüman sakinleri! Selam üzerinize olsun. İnşallah biz de size katılacağız. Bizim ve sizin için Allah'tan afiyet dileriz.", tag: "ziyaret" },
  { title: "Taziyede (Baş Sağlığı)", arabic: "إِنَّ لِلَّهِ مَا أَخَذَ وَلَهُ مَا أَعْطَى وَكُلُّ شَيْءٍ عِنْدَهُ بِأَجَلٍ مُسَمًّى فَلْتَصْبِرْ وَلْتَحْتَسِبْ", okunusu: "İnne lillâhi mâ ehaze ve lehû mâ a'tâ ve küllü şey'in indehû bi-ecelin müsemmâ, fel-tasbir vel-tahtesib", turkish: "Aldığı da verdiği de Allah'ındır; her şeyin O'nun katında belli bir eceli vardır. Sabret ve sevabını Allah'tan bekle.", tag: "ziyaret" },
  { title: "Vesvese Gelince", arabic: "آمَنْتُ بِاللَّهِ وَرُسُلِهِ — هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ", okunusu: "Âmentü billâhi ve rusülih — Hüvel-evvelü vel-âhiru vez-zâhiru vel-bâtınu ve hüve bi-külli şey'in alîm", turkish: "Allah'a ve peygamberlerine iman ettim. — O ilktir, sondur, zâhirdir, bâtındır ve O her şeyi bilendir. (Hadîd 3; vesvesede okunması tavsiye edilir.)", tag: "sıkıntı" },
  { title: "Namazdan Sonra (Kısa Dua)", arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ", okunusu: "Allâhümme einnî alâ zikrike ve şükrike ve hüsni ibâdetik", turkish: "Allah'ım! Seni zikretmek, sana şükretmek ve sana güzelce ibadet etmek için bana yardım et.", tag: "namaz" },
  { title: "Yemek Davetine Cevap", arabic: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ", okunusu: "Allâhümme bârik lehüm fîmâ razaktehüm vağfir lehüm verhamhüm", turkish: "Allah'ım! Onlara verdiğin rızkı bereketli kıl, onları bağışla ve onlara merhamet et. (Ev sahibine dua)", tag: "yemek" },
  { title: "Su İçtikten Sonra", arabic: "الْحَمْدُ لِلَّهِ الَّذِي سَقَانَا عَذْبًا فُرَاتًا بِرَحْمَتِهِ وَلَمْ يَجْعَلْهُ مِلْحًا أُجَاجًا بِذُنُوبِنَا", okunusu: "Elhamdü lillâhillezî sekânâ azben fürâten bi-rahmetihî ve lem yec'alhü milhan ücâcen bi-zünûbinâ", turkish: "Rahmetiyle bize tatlı ve içimi hoş su içiren, günahlarımız sebebiyle onu tuzlu ve acı kılmayan Allah'a hamdolsun.", tag: "yemek" }
);

/* ══════════ v65.0 — SABAH & AKŞAM EZKÂRI (20 + 20, kaynak: Hısnü'l-Müslim / sahih hadisler) ══════════ */
(function () {
  const AYETEL = EZKAR_SABAH.find(z => z.title === "Âyetel Kürsî");
  const IHLAS = EZKAR_SABAH.find(z => z.title === "İhlâs Sûresi");
  const FELAK = EZKAR_SABAH.find(z => z.title === "Felâk Sûresi");
  const NAS = EZKAR_SABAH.find(z => z.title === "Nâs Sûresi");
  const SEYYID = EZKAR_SABAH.find(z => z.title === "Seyyidü'l-İstiğfar");
  const SALAVAT = EZKAR_SABAH.find(z => z.title === "Salavât-ı Şerife");

  const ortak = (sabah) => [
    AYETEL && Object.assign({}, AYETEL, { count: 1, turkish: (AYETEL.turkish || "") + " (Sabah-akşam okuyan, Allah'ın korumasında olur.)" }),
    IHLAS && Object.assign({}, IHLAS, { count: 3 }),
    FELAK && Object.assign({}, FELAK, { count: 3 }),
    NAS && Object.assign({}, NAS, { count: 3 }),
    sabah ? {
      title: "Sabah Tesbihi",
      arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ",
      okunusu: "Asbahnâ ve asbahal-mülkü lillâh, vel-hamdü lillâh, lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr. Rabbi es'elüke hayra mâ fî hâzel-yevmi ve hayra mâ ba'dehû ve eûzü bike min şerri mâ fî hâzel-yevmi ve şerri mâ ba'deh",
      turkish: "Sabaha erdik; mülk de Allah'ın olarak sabaha erdi. Hamd Allah'adır. Allah'tan başka ilâh yoktur, O tektir, ortağı yoktur; mülk O'nundur, hamd O'nadır ve O her şeye kadirdir. Rabbim! Bu günün ve sonrasının hayrını senden ister, bu günün ve sonrasının şerrinden sana sığınırım.", count: 1
    } : {
      title: "Akşam Tesbihi",
      arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا",
      okunusu: "Emseynâ ve emsel-mülkü lillâh, vel-hamdü lillâh, lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr. Rabbi es'elüke hayra mâ fî hâzihil-leyleti ve hayra mâ ba'dehâ ve eûzü bike min şerri mâ fî hâzihil-leyleti ve şerri mâ ba'dehâ",
      turkish: "Akşama erdik; mülk de Allah'ın olarak akşama erdi. Hamd Allah'adır. Allah'tan başka ilâh yoktur, O tektir, ortağı yoktur; mülk O'nundur, hamd O'nadır ve O her şeye kadirdir. Rabbim! Bu gecenin ve sonrasının hayrını senden ister, bu gecenin ve sonrasının şerrinden sana sığınırım.", count: 1
    },
    sabah ? {
      title: "Sabaha Erdirene Hamd",
      arabic: "اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
      okunusu: "Allâhümme bike asbahnâ ve bike emseynâ ve bike nahyâ ve bike nemûtü ve ileyken-nüşûr",
      turkish: "Allah'ım! Senin lütfunla sabaha erdik, seninle akşama erdik; seninle yaşar, seninle ölürüz. Dönüş sanadır.", count: 1
    } : {
      title: "Akşama Erdirene Hamd",
      arabic: "اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
      okunusu: "Allâhümme bike emseynâ ve bike asbahnâ ve bike nahyâ ve bike nemûtü ve ileykel-masîr",
      turkish: "Allah'ım! Senin lütfunla akşama erdik, seninle sabaha erdik; seninle yaşar, seninle ölürüz. Varış sanadır.", count: 1
    },
    SEYYID && Object.assign({}, SEYYID, { count: 1 }),
    {
      title: "Din, Dünya, Aile ve Mal İçin Afiyet",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي اللَّهُمَّ اسْتُرْ عَوْرَاتِي وَآمِنْ رَوْعَاتِي",
      okunusu: "Allâhümme innî es'elükel-âfiyete fid-dünyâ vel-âhirah. Allâhümme innî es'elükel-afve vel-âfiyete fî dînî ve dünyâye ve ehlî ve mâlî. Allâhümmestür avrâtî ve âmin rav'âtî",
      turkish: "Allah'ım! Dünya ve ahirette senden afiyet dilerim. Allah'ım! Dinim, dünyam, ailem ve malım hakkında senden af ve afiyet dilerim. Allah'ım! Ayıplarımı ört, korkularımdan emin kıl.", count: 1
    },
    {
      title: "Bedene, Kulağa, Göze Afiyet",
      arabic: "اللَّهُمَّ عَافِنِي فِي بَدَنِي اللَّهُمَّ عَافِنِي فِي سَمْعِي اللَّهُمَّ عَافِنِي فِي بَصَرِي لَا إِلَهَ إِلَّا أَنْتَ",
      okunusu: "Allâhümme âfinî fî bedenî, Allâhümme âfinî fî sem'î, Allâhümme âfinî fî basarî, lâ ilâhe illâ ent",
      turkish: "Allah'ım! Bedenime afiyet ver. Allah'ım! Kulağıma afiyet ver. Allah'ım! Gözüme afiyet ver. Senden başka ilâh yoktur.", count: 3
    },
    {
      title: "Küfür ve Fakirlikten Sığınma",
      arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ لَا إِلَهَ إِلَّا أَنْتَ",
      okunusu: "Allâhümme innî eûzü bike minel-küfri vel-fakr, ve eûzü bike min azâbil-kabr, lâ ilâhe illâ ent",
      turkish: "Allah'ım! Küfürden ve fakirlikten sana sığınırım; kabir azabından sana sığınırım. Senden başka ilâh yoktur.", count: 3
    },
    {
      title: "Hasbiyallâh",
      arabic: "حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
      okunusu: "Hasbiyallâhü lâ ilâhe illâ hüve aleyhi tevekkeltü ve hüve rabbül-arşil-azîm",
      turkish: "Allah bana yeter; O'ndan başka ilâh yoktur. O'na tevekkül ettim; O büyük Arş'ın Rabbidir. (Tevbe 129 — 7 kez okuyana Allah dünya ve ahiret sıkıntılarında kâfi gelir.)", count: 7
    },
    {
      title: "Allah'ın Adıyla Korunma",
      arabic: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
      okunusu: "Bismillâhillezî lâ yedurru maasmihî şey'ün fil-ardı ve lâ fis-semâi ve hüves-semîul-alîm",
      turkish: "İsmiyle yerde ve gökte hiçbir şeyin zarar veremeyeceği Allah'ın adıyla. O işitendir, bilendir. (3 kez okuyana o gün/gece hiçbir şey zarar vermez.)", count: 3
    },
    {
      title: "Rıza Duası",
      arabic: "رَضِيتُ بِاللَّهِ رَبًّا وَبِالْإِسْلَامِ دِينًا وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا",
      okunusu: "Radîtü billâhi rabben ve bil-islâmi dînen ve bi-Muhammedin sallallâhü aleyhi ve selleme nebiyyâ",
      turkish: "Rab olarak Allah'tan, din olarak İslâm'dan, peygamber olarak Muhammed'den (s.a.v.) razı oldum.", count: 3
    },
    {
      title: "Yâ Hayyu Yâ Kayyûm",
      arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ أَصْلِحْ لِي شَأْنِي كُلَّهُ وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
      okunusu: "Yâ Hayyü yâ Kayyûm, bi-rahmetike estağîs, aslih lî şe'nî küllehû ve lâ tekilnî ilâ nefsî tarfete ayn",
      turkish: "Ey Hayy, ey Kayyûm! Rahmetinle yardım dilerim. Bütün işlerimi düzelt ve beni göz açıp kapayıncaya kadar bile nefsime bırakma.", count: 1
    },
    {
      title: "Fıtrat Üzere Sabah/Akşam",
      arabic: sabah ? "أَصْبَحْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ" : "أَمْسَيْنَا عَلَى فِطْرَةِ الْإِسْلَامِ وَعَلَى كَلِمَةِ الْإِخْلَاصِ وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَلَى مِلَّةِ أَبِينَا إِبْرَاهِيمَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
      okunusu: (sabah ? "Asbahnâ" : "Emseynâ") + " alâ fıtratil-islâm ve alâ kelimetil-ihlâs ve alâ dîni nebiyyinâ Muhammedin sallallâhü aleyhi ve sellem ve alâ milleti ebînâ İbrâhîme hanîfen müslimen ve mâ kâne minel-müşrikîn",
      turkish: (sabah ? "Sabaha" : "Akşama") + " İslâm fıtratı, ihlâs kelimesi, Peygamberimiz Muhammed'in (s.a.v.) dini ve hanîf, Müslüman olan, müşriklerden olmayan babamız İbrahim'in milleti üzere erdik.", count: 1
    },
    {
      title: "Sübhânallâhi ve bi-hamdihî",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      okunusu: "Sübhânallâhi ve bi-hamdih",
      turkish: "Allah'ı hamd ile tesbih ederim. (Günde 100 kez söyleyenin günahları denizin köpüğü kadar da olsa bağışlanır.)", count: 100
    },
    {
      title: "Sübhânallâhi ve bi-hamdihî adede halkıh",
      arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ",
      okunusu: "Sübhânallâhi ve bi-hamdihî adede halkıhî ve rıdâ nefsihî ve zinete arşihî ve midâde kelimâtih",
      turkish: "Yarattıkları sayısınca, kendisinin razı olacağı kadar, Arş'ının ağırlığınca ve kelimelerinin mürekkebi kadar Allah'ı hamd ile tesbih ederim.", count: 3
    },
    {
      title: "Lâ ilâhe illallâhü vahdehû",
      arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      okunusu: "Lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr",
      turkish: "Allah'tan başka ilâh yoktur; O tektir, ortağı yoktur. Mülk O'nundur, hamd O'nadır ve O her şeye kadirdir. (10 kez; 100 kez söyleyene köle azat etme sevabı.)", count: 10
    },
    sabah ? {
      title: "Faydalı İlim, Temiz Rızık",
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
      okunusu: "Allâhümme innî es'elüke ilmen nâfian ve rızkan tayyiben ve amelen mütekabbelâ",
      turkish: "Allah'ım! Senden faydalı ilim, temiz rızık ve kabul edilmiş amel isterim. (Sabah namazından sonra okunur.)", count: 1
    } : {
      title: "Gecenin Şerrinden Sığınma",
      arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
      okunusu: "Eûzü bi-kelimâtillâhit-tâmmâti min şerri mâ halak",
      turkish: "Yarattıklarının şerrinden Allah'ın eksiksiz kelimelerine sığınırım. (Akşam 3 kez okuyana o gece zehirli hayvan zarar vermez.)", count: 3
    },
    SALAVAT && Object.assign({}, SALAVAT, { count: 10 }),
    {
      title: "İstiğfar",
      arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
      okunusu: "Estağfirullâhe ve etûbü ileyh",
      turkish: "Allah'tan bağışlanma diler ve O'na tövbe ederim. (Peygamberimiz günde 100 kez istiğfar ederdi.)", count: 100
    }
  ].filter(Boolean);

  EZKAR_SABAH.length = 0; ortak(true).forEach(z => EZKAR_SABAH.push(z));
  EZKAR_AKSAM.length = 0; ortak(false).forEach(z => EZKAR_AKSAM.push(z));
})();

/* ══════════ v65.0 — DİNİ SÖZLÜK EKLERİ (47 → 150) ══════════ */
DINI_SOZLUK.push(
  { term: "Âdâb", meaning: "Bir işi yaparken uyulması güzel görülen edep ve nezaket kuralları." },
  { term: "Âlem", meaning: "Allah'ın dışındaki her şey; yaratılmışların tamamı." },
  { term: "Âmentü", meaning: "İmanın altı esasını özetleyen 'inandım' ile başlayan ifade." },
  { term: "Âmin", meaning: "Duanın sonunda söylenen 'Kabul buyur' anlamındaki söz." },
  { term: "Arafat", meaning: "Mekke yakınında, hacıların Kurban Bayramı arefesinde vakfe yaptığı ova." },
  { term: "Arefe", meaning: "Bayramdan bir önceki gün; Kurban Bayramı arefesinde hacılar Arafat'ta bulunur." },
  { term: "Arş", meaning: "Allah'ın kudret ve hükümranlığını simgeleyen, yaratılmışların en yücesi olan varlık." },
  { term: "Âyetel Kürsî", meaning: "Bakara sûresinin 255. âyeti; Allah'ın sıfatlarını anlatan, korunma için okunan âyet." },
  { term: "Bâtıl", meaning: "Gerçek olmayan, boş, geçersiz; hakkın zıddı." },
  { term: "Bereket", meaning: "Allah'tan gelen hayır ve bolluk; bir şeyin azken çok fayda vermesi." },
  { term: "Besmele", meaning: "'Bismillâhirrahmânirrahîm' — Rahmân ve Rahîm olan Allah'ın adıyla." },
  { term: "Bid'at", meaning: "Dinde sonradan ortaya çıkan, sünnette dayanağı olmayan uygulama." },
  { term: "Cemaat", meaning: "Namazı bir imamın arkasında birlikte kılan topluluk; en az iki kişiyle oluşur." },
  { term: "Cenaze Namazı", meaning: "Ölen Müslüman için kılınan, rükû ve secdesi olmayan, dört tekbirli dua niteliğindeki namaz." },
  { term: "Cihad", meaning: "Allah yolunda gayret; nefisle mücadele, ilim, infak ve gerektiğinde savunma." },
  { term: "Cin", meaning: "Ateşten yaratılmış, gözle görülmeyen, sorumluluk sahibi varlıklar." },
  { term: "Cuma", meaning: "Haftanın en faziletli günü; öğle vaktinde cemaatle kılınan iki rekâtlık farz namaz." },
  { term: "Delil", meaning: "Bir hükmün dayandığı Kur'an, sünnet, icmâ ve kıyas gibi kaynak." },
  { term: "Diyet", meaning: "Öldürme veya yaralama karşılığında ödenen mal bedeli." },
  { term: "Dua", meaning: "Kulun Allah'a yalvarması, isteklerini arz etmesi; ibadetin özü." },
  { term: "Dünya", meaning: "İçinde yaşadığımız, imtihan yeri olan geçici hayat." },
  { term: "Ecel", meaning: "Her canlı için takdir edilmiş ölüm vakti." },
  { term: "Ecir", meaning: "Yapılan iyilik ve ibadetin Allah katındaki karşılığı, sevap." },
  { term: "Ehl-i Beyt", meaning: "Peygamberimizin ev halkı; Hz. Ali, Hz. Fâtıma, Hz. Hasan ve Hz. Hüseyin." },
  { term: "Ehl-i Kitap", meaning: "Kendilerine ilâhî kitap gönderilen Yahudi ve Hristiyanlar." },
  { term: "Ehl-i Sünnet", meaning: "Peygamberimizin ve sahabenin yolunu izleyen ana akım Müslümanlar." },
  { term: "Esmâü'l-Hüsnâ", meaning: "Allah'ın en güzel isimleri; 99 isim olarak bilinir." },
  { term: "Evliya", meaning: "Allah'ın dostları; takvası ve ihlâsıyla Allah'a yakın olan kimseler." },
  { term: "Evvâbîn", meaning: "Akşam ile yatsı arasında kılınan altı rekâtlık nafile namaz." },
  { term: "Fâsık", meaning: "Büyük günah işleyen veya küçük günahta ısrar eden kimse." },
  { term: "Fetva", meaning: "Dinî bir konuda yetkili âlimin verdiği hüküm, görüş." },
  { term: "Fıkıh", meaning: "İbadet, muamelât ve helâl-haramı inceleyen İslâm hukuku ilmi." },
  { term: "Fidye", meaning: "Oruç tutamayan yaşlı ve hastaların her gün için verdiği bedel." },
  { term: "Fitne", meaning: "İmtihan, kargaşa, insanları doğru yoldan saptıran karışıklık." },
  { term: "Gıybet", meaning: "Bir kimsenin arkasından hoşlanmayacağı şekilde konuşmak; büyük günah." },
  { term: "Hafız", meaning: "Kur'an-ı Kerim'in tamamını ezberleyen kimse." },
  { term: "Hamd", meaning: "Allah'ı övmek, nimetleri için O'na şükretmek; 'Elhamdülillâh'." },
  { term: "Hanîf", meaning: "Şirkten uzak, yalnız Allah'a yönelen; Hz. İbrahim'in dini." },
  { term: "Haşr", meaning: "Kıyamet günü bütün insanların diriltilip hesap için toplanması." },
  { term: "Hatim", meaning: "Kur'an-ı Kerim'i baştan sona okuyup bitirmek." },
  { term: "Havle", meaning: "'Lâ havle ve lâ kuvvete illâ billâh' — güç ve kuvvet ancak Allah'tandır." },
  { term: "Hayâ", meaning: "Utanma duygusu, edep; imandan bir şubedir." },
  { term: "Hayız", meaning: "Kadınların aylık âdet hâli; bu sürede namaz ve oruç tutulmaz." },
  { term: "Hidayet", meaning: "Allah'ın kulunu doğru yola iletmesi." },
  { term: "Hilâl", meaning: "Ayın ilk görünen ince şekli; hicrî ayların başlangıcı." },
  { term: "Hutbe", meaning: "Cuma ve bayram namazlarında imamın minberden yaptığı konuşma." },
  { term: "Huşû", meaning: "Namazda kalp ve bedenle Allah'a saygı içinde olma hâli." },
  { term: "İcmâ", meaning: "İslâm âlimlerinin bir konuda görüş birliği etmesi." },
  { term: "İçtihat", meaning: "Âlimin Kur'an ve sünnetten hüküm çıkarmak için çaba göstermesi." },
  { term: "İftar", meaning: "Oruç açma; akşam ezanıyla orucun sona ermesi." },
  { term: "İhram", meaning: "Hac ve umrede giyilen dikişsiz örtü ve o hâlde uyulan yasaklar." },
  { term: "İhsan", meaning: "Allah'ı görüyormuş gibi ibadet etmek; iyilik yapmak." },
  { term: "İkindi", meaning: "Günün dördüncü farz namazı; asr vakti." },
  { term: "İmsak", meaning: "Oruca başlama vakti; sabah namazı vaktinin girişi." },
  { term: "İnfak", meaning: "Allah rızası için malından harcamak, vermek." },
  { term: "İsra", meaning: "Peygamberimizin bir gecede Mekke'den Kudüs'e götürülmesi." },
  { term: "İstiğfar", meaning: "Allah'tan günahların bağışlanmasını dilemek; 'Estağfirullah'." },
  { term: "İstihâre", meaning: "Bir işin hayırlı olup olmadığını Allah'tan dilemek için kılınan namaz ve dua." },
  { term: "İşrak", meaning: "Güneşin doğuşundan yaklaşık 45 dakika sonra başlayan, kuşluk namazının kılınabildiği vakit." },
  { term: "İtikâf", meaning: "Ramazan'ın son on gününde ibadet amacıyla camide kalmak." },
  { term: "Kâfir", meaning: "İman etmeyen, hakkı örten kimse." },
  { term: "Kadir Gecesi", meaning: "Kur'an'ın indirilmeye başlandığı, bin aydan hayırlı gece." },
  { term: "Kandil", meaning: "Mübarek geceler; Mevlid, Regaib, Miraç, Berat ve Kadir geceleri." },
  { term: "Kaza", meaning: "Vaktinde kılınamayan namazın veya tutulamayan orucun sonradan yerine getirilmesi." },
  { term: "Kefâret", meaning: "İşlenen bir günah veya bozulan yeminin telafisi için yapılan ibadet, bedel." },
  { term: "Kerahet Vakti", meaning: "Güneş doğarken, tam tepedeyken ve batarken nafile namaz kılınmayan vakitler." },
  { term: "Kıraat", meaning: "Namazda Kur'an okumak; Kur'an'ı usulüne göre okuma ilmi." },
  { term: "Kıyam", meaning: "Namazda ayakta durmak; namazın farzlarındandır." },
  { term: "Kıyamet", meaning: "Dünyanın sonu; ölülerin diriltilip hesaba çekileceği gün." },
  { term: "Kıyas", meaning: "Hükmü bilinen bir meseleye benzeterek yeni meseleye hüküm vermek." },
  { term: "Kurban", meaning: "Allah'a yakınlaşmak için bayramda kesilen hayvan; gücü yetene vaciptir." },
  { term: "Kuşluk", meaning: "İşrak ile öğle arasındaki vakit; bu vakitte kılınan nafile namaz (duhâ)." },
  { term: "Küfür", meaning: "İman edilmesi gerekenleri inkâr etmek." },
  { term: "Mahşer", meaning: "Kıyamet günü insanların hesap için toplanacağı yer." },
  { term: "Mahrem", meaning: "Evlenilmesi ebediyen haram olan yakın akraba; gizli olan." },
  { term: "Mekke", meaning: "Kâbe'nin bulunduğu, Peygamberimizin doğduğu kutsal şehir." },
  { term: "Medine", meaning: "Peygamberimizin hicret ettiği ve kabrinin bulunduğu şehir." },
  { term: "Melek", meaning: "Nurdan yaratılmış, Allah'a itaat eden, günah işlemeyen varlıklar." },
  { term: "Mevlid", meaning: "Peygamberimizin doğumu; doğum gecesi (12 Rebiülevvel)." },
  { term: "Mihrap", meaning: "Camide imamın namaz kıldırdığı, kıbleyi gösteren oyuk." },
  { term: "Minber", meaning: "Camide hutbe okunan basamaklı yüksek yer." },
  { term: "Miraç", meaning: "Peygamberimizin göklere yükseltilerek Allah'ın huzuruna çıkarılması." },
  { term: "Muharrem", meaning: "Hicrî yılın ilk ayı; Aşure günü bu aydadır." },
  { term: "Mukim", meaning: "Yolcu olmayan, bulunduğu yerde ikamet eden kimse." },
  { term: "Mümin", meaning: "Allah'a ve iman esaslarına inanan kimse." },
  { term: "Münafık", meaning: "İnanmadığı hâlde inanmış görünen kimse." },
  { term: "Müstehap", meaning: "Yapılması sevap, terki günah olmayan güzel davranış (mendup)." },
  { term: "Müzdelife", meaning: "Arafat ile Mina arasında, hacıların arefe gecesi kaldığı yer." },
  { term: "Namaz", meaning: "Günde beş vakit farz olan, tekbirle başlayıp selamla biten ibadet." },
  { term: "Nefis", meaning: "İnsanın kendisi; kötülüğü emreden arzu ve istekler." },
  { term: "Niyet", meaning: "Bir ibadeti yapmaya kalben karar vermek; ibadetlerin şartıdır." },
  { term: "Peygamber", meaning: "Allah'ın insanlara mesajını iletmek için seçtiği elçi (nebi, resul)." },
  { term: "Ramazan", meaning: "Hicrî yılın dokuzuncu ayı; oruç ayı." },
  { term: "Regaib", meaning: "Recep ayının ilk Cuma gecesi; üç ayların ilk kandili." },
  { term: "Rızık", meaning: "Allah'ın canlılara verdiği yiyecek, içecek ve her türlü nimet." },
  { term: "Riyâ", meaning: "İbadeti gösteriş için yapmak; gizli şirk sayılır." },
  { term: "Ruh", meaning: "İnsana hayat veren, mahiyeti Allah'ın bilgisinde olan cevher." },
  { term: "Sabır", meaning: "Zorluklara ve ibadetlere dayanmak, günahlardan kaçınmak." },
  { term: "Sahur", meaning: "Oruç için imsaktan önce yenen yemek." },
  { term: "Sa'y", meaning: "Hac ve umrede Safa ile Merve arasında yedi kez gidip gelmek." },
  { term: "Selam", meaning: "Namazın sonunda sağa ve sola 'Esselâmü aleyküm ve rahmetullah' demek; Müslümanların selamlaşması." },
  { term: "Selef", meaning: "İlk üç nesil: sahabe, tâbiîn ve tebe-i tâbiîn." },
  { term: "Sevap", meaning: "İyi amellerin Allah katındaki mükâfatı." },
  { term: "Sırat", meaning: "Cehennem üzerine kurulacak, cennete giden köprü; doğru yol." },
  { term: "Siyer", meaning: "Peygamberimizin hayatını anlatan ilim." },
  { term: "Sünnet-i Müekkede", meaning: "Peygamberimizin devamlı yaptığı, terkini hoş görmediği sünnet." },
  { term: "Şeytan", meaning: "İnsanı kötülüğe sürükleyen, Allah'ın rahmetinden kovulmuş varlık; İblis." },
  { term: "Şefaat", meaning: "Ahirette Peygamberimizin ve salihlerin Allah'ın izniyle affa aracılık etmesi." },
  { term: "Şehit", meaning: "Allah yolunda canını veren kimse." },
  { term: "Şer", meaning: "Kötülük; hayrın zıddı." },
  { term: "Şirk", meaning: "Allah'a ortak koşmak; en büyük günah." },
  { term: "Tâbiîn", meaning: "Sahabeyi görüp onlardan ilim alan nesil." },
  { term: "Taharet", meaning: "Maddi ve manevi temizlik; abdest ve gusül." },
  { term: "Tahiyyat", meaning: "Namazın oturuşlarında okunan 'Ettehiyyâtü' duası." },
  { term: "Tavaf", meaning: "Kâbe'nin etrafında yedi kez dönmek." },
  { term: "Tefekkür", meaning: "Allah'ın yarattıkları ve nimetleri üzerinde derin düşünmek." },
  { term: "Tefsir", meaning: "Kur'an âyetlerini açıklama ilmi." },
  { term: "Teheccüd", meaning: "Gece uyuduktan sonra kalkılarak kılınan nafile namaz." },
  { term: "Tekbir", meaning: "'Allâhü ekber' — Allah en büyüktür." },
  { term: "Telbiye", meaning: "Hac ve umrede söylenen 'Lebbeyk Allâhümme lebbeyk' nidası." },
  { term: "Teravih", meaning: "Ramazan gecelerinde yatsıdan sonra kılınan 20 rekâtlık sünnet namaz." },
  { term: "Teşrik Tekbiri", meaning: "Kurban Bayramı arefesi sabahından bayramın 4. günü ikindisine kadar farzlardan sonra alınan tekbir." },
  { term: "Tevekkül", meaning: "Gerekeni yaptıktan sonra sonucu Allah'a bırakmak, O'na güvenmek." },
  { term: "Teyemmüm", meaning: "Su bulunamadığında temiz toprakla alınan abdest." },
  { term: "Tövbe", meaning: "Günahtan pişmanlık duyup Allah'a yönelmek ve bir daha yapmamaya karar vermek." },
  { term: "Ümmet", meaning: "Bir peygambere inananların tamamı; Muhammed ümmeti." },
  { term: "Umre", meaning: "Hac mevsimi dışında da yapılabilen, ihram, tavaf ve sa'yden oluşan ziyaret ibadeti." },
  { term: "Vahiy", meaning: "Allah'ın peygamberlerine mesajını bildirmesi." },
  { term: "Vakfe", meaning: "Haccın farzı; arefe günü Arafat'ta bir süre bulunmak." },
  { term: "Vesvese", meaning: "Şeytanın kalbe attığı şüphe ve kuruntu." },
  { term: "Vitir", meaning: "Yatsıdan sonra kılınan üç rekâtlık vacip namaz; Kunut duası okunur." },
  { term: "Yatsı", meaning: "Günün beşinci farz namazı; akşam kızıllığının kaybolmasıyla başlar." },
  { term: "Yemin", meaning: "Allah'ın adını anarak bir sözü kuvvetlendirmek; bozulursa kefaret gerekir." },
  { term: "Zemzem", meaning: "Kâbe yakınındaki mübarek kuyunun suyu." },
  { term: "Zeval", meaning: "Güneşin tam tepe noktasından batıya kaymaya başlaması; öğle vaktinin girişi." },
  { term: "Zilhicce", meaning: "Hicrî yılın son ayı; hac ve Kurban Bayramı bu aydadır." },
  { term: "Zühd", meaning: "Dünyaya kalpten bağlanmamak, ahireti tercih etmek." }
);
(function () {
  const g = {}; const tekil = [];
  DINI_SOZLUK.forEach(x => { const k = x.term.toLocaleLowerCase('tr'); if (!g[k]) { g[k] = 1; tekil.push(x); } });
  DINI_SOZLUK.length = 0; tekil.forEach(x => DINI_SOZLUK.push(x));
  DINI_SOZLUK.sort((a, b) => a.term.localeCompare(b.term, 'tr'));
})();

/* ══════════ v65.0 — SİYER EKLERİ (16 → 30, kronolojik) ══════════ */
SIYER_OLAYLARI.push(
  { yil: "590", baslik: "Hılfü'l-Fudûl", desc: "Yirmili yaşlarında, Mekke'de haksızlığa uğrayanları korumak için kurulan 'Erdemliler Anlaşması'na katıldı; sonraları 'Böyle bir anlaşmaya yine çağrılsam katılırım' buyurdu." },
  { yil: "605", baslik: "Kâbe Hakemliği", desc: "Kâbe onarımında Hacerülesved'i yerine kimin koyacağı tartışılınca, 'el-Emîn' olarak hakem seçildi; taşı bir örtüye koyup her kabileden birine tutturarak anlaşmazlığı çözdü." },
  { yil: "611", baslik: "Gizli Davet ve İlk Müslümanlar", desc: "Üç yıl boyunca yakın çevresini gizlice İslâm'a davet etti. Hz. Hatice, Hz. Ali, Hz. Ebû Bekir ve Zeyd b. Hârise ilk Müslümanlardandır." },
  { yil: "616", baslik: "Boykot Yılları", desc: "Müşrikler Hâşimoğullarına üç yıl süren sosyal ve ekonomik boykot uyguladı; Müslümanlar büyük sıkıntı çekti, boykot sahifesini kurtlar yedi ve boykot sona erdi." },
  { yil: "619", baslik: "Tâif Yolculuğu", desc: "Mekke'de davet imkânı daralınca Tâif'e gitti; taşlanarak kovuldu. Bir bağda dinlenirken 'Ey Rabbim, kuvvetimin zayıflığını sana şikâyet ederim' diye dua etti, onlara beddua etmedi." },
  { yil: "621", baslik: "Akabe Biatları", desc: "Medineli Müslümanlar iki yıl üst üste Akabe'de Peygamberimize biat etti; ikinci biatta 75 kişi onu Medine'ye davet edip koruyacaklarına söz verdi." },
  { yil: "622", baslik: "Mescid-i Nebevî ve Kardeşlik", desc: "Medine'de mescit inşa edildi; Mekkeli muhacirlerle Medineli ensar kardeş ilan edildi. Medine Sözleşmesi ile şehirde birlikte yaşama esasları belirlendi." },
  { yil: "624", baslik: "Kıblenin Değişmesi ve Orucun Farz Kılınması", desc: "Hicretin 2. yılında kıble Mescid-i Aksâ'dan Kâbe'ye çevrildi; Ramazan orucu ve zekât farz kılındı, ilk bayram namazı kılındı." },
  { yil: "628", baslik: "Hayber'in Fethi", desc: "Hudeybiye'den sonra Yahudi kalelerinin bulunduğu Hayber fethedildi; Hz. Ali'nin kahramanlığıyla son kale düştü." },
  { yil: "628", baslik: "Hükümdarlara Mektuplar", desc: "Bizans, İran, Habeşistan, Mısır ve çevre hükümdarlarına İslâm'a davet mektupları gönderdi; mektuplarına 'Muhammed Resûlullah' mührünü bastı." },
  { yil: "630", baslik: "Huneyn ve Tâif", desc: "Mekke'nin fethinden sonra Hevâzin kabilesiyle Huneyn'de savaşıldı; başlangıçtaki dağılmaya rağmen zafer kazanıldı, ganimetler bağışlandı." },
  { yil: "630", baslik: "Tebük Seferi", desc: "Bizans tehdidine karşı kıtlık ve sıcakta 30 bin kişilik orduyla Tebük'e gidildi; savaş olmadı, çevre kabilelerle antlaşmalar yapıldı." },
  { yil: "631", baslik: "Heyetler (Elçiler) Yılı", desc: "Arap Yarımadası'nın dört bir yanından kabile heyetleri Medine'ye gelip Müslüman oldu; İslâm yarımadaya yayıldı." },
  { yil: "632", baslik: "Son Hastalığı ve Hz. Ebû Bekir'in İmamlığı", desc: "Hastalığı ağırlaşınca namazı kıldırması için Hz. Ebû Bekir'i görevlendirdi; vefatından önce ümmetine 'Namaz, namaz!' diye vasiyet etti." }
);
(function () {
  const sira = { "Hüzün Yılı": 0, "Tâif Yolculuğu": 1, "Kıblenin Değişmesi ve Orucun Farz Kılınması": 0, "Bedir Savaşı": 1, "Hudeybiye Antlaşması": 0, "Hayber'in Fethi": 1, "Hükümdarlara Mektuplar": 2,
    "Mekke'nin Fethi": 0, "Huneyn ve Tâif": 1, "Tebük Seferi": 2, "Veda Haccı ve Hutbesi": 0, "Son Hastalığı ve Hz. Ebû Bekir'in İmamlığı": 1, "Vefatı": 2 };
  SIYER_OLAYLARI.forEach(o => { if (o.baslik === "Veda Haccı ve Hutbesi") o.yil = "632"; });
  SIYER_OLAYLARI.sort((a, b) => (parseInt(a.yil, 10) - parseInt(b.yil, 10)) || ((sira[a.baslik] || 0) - (sira[b.baslik] || 0)));
})();

/* ══════════ v65.0 — HAC & UMRE REHBERİ ══════════ */
const HAC_UMRE = {
  giris: "Umre; ihrama girip Kâbe'yi tavaf etmek ve Safa-Merve arasında sa'y yapmaktan oluşur, yılın her günü yapılabilir. Hac ise bunlara ek olarak Zilhicce'nin 9. günü Arafat'ta vakfe, Müzdelife, Mina ve şeytan taşlamayı kapsar; ömürde bir kez, gücü yetene farzdır. Aşağıdaki adımlar Diyanet'in Hanefî uygulamasına göredir.",
  bolumler: [
    {
      ad: "Umre Nasıl Yapılır?", ikon: "🕋",
      adimlar: [
        { baslik: "1. Hazırlık ve İhram", metin: "Mîkat sınırından önce (uçakla gidenler genelde uçakta) gusül veya abdest alınır, erkekler dikişsiz iki parça beyaz örtüye bürünür; kadınlar normal tesettürlü kıyafetle ihrama girer. İki rekât ihram namazı kılınır, 'Allah'ım, umre yapmak istiyorum; kolaylaştır ve kabul et' diye niyet edilir ve telbiye getirilir. Bu andan itibaren ihram yasakları başlar: koku sürmek, tırnak kesmek, saç-kıl almak, avlanmak, tartışmak ve eşle beraber olmak yasaktır." },
        { baslik: "2. Telbiye", metin: "Mescid-i Haram'a girene kadar sık sık 'Lebbeyk Allâhümme lebbeyk…' denir. Erkekler sesli, kadınlar kısık sesle söyler." },
        { baslik: "3. Mescid-i Haram'a Giriş", metin: "Sağ ayakla, besmele ve salavatla girilir; Kâbe görülünce dua edilir (bu an duanın kabul olduğu anlardandır)." },
        { baslik: "4. Umre Tavafı", metin: "Hacerülesved hizasından 'Bismillâhi Allâhü ekber' diyerek başlanır; Kâbe sol tarafta kalacak şekilde 7 şavt (tur) dönülür. Her şavtta Hacerülesved'e uzaktan selam verilir; Rükn-i Yemânî ile Hacerülesved arasında 'Rabbenâ âtinâ…' okunur. Erkekler ilk üç şavtta hızlı ve çalımlı yürür (remel); sağ omuz açık tutulur (ıztıbâ). Tavafta abdestli olmak şarttır." },
        { baslik: "5. Tavaf Namazı ve Zemzem", metin: "Tavaf bitince mümkünse Makâm-ı İbrâhim arkasında 2 rekât tavaf namazı kılınır, ardından Zemzem içilir ve dua edilir." },
        { baslik: "6. Sa'y", metin: "Safa tepesine çıkılıp Kâbe'ye dönülerek tekbir ve dua edilir; Safa'dan Merve'ye 4 gidiş, 3 dönüş olmak üzere 7 şavt yürünür. Yeşil ışıklar arasında erkekler hızlanır (hervele). Merve'de bitirilir ve dua edilir." },
        { baslik: "7. Tıraş ve İhramdan Çıkış", metin: "Erkekler saçlarını tıraş eder veya kısaltır, kadınlar saç ucundan bir parmak boğumu kadar keser. Böylece umre tamamlanır ve ihram yasakları biter." }
      ]
    },
    {
      ad: "Hac Nasıl Yapılır?", ikon: "🏔️",
      adimlar: [
        { baslik: "Hac çeşitleri", metin: "Türkiye'den gidenler çoğunlukla 'temettu' haccı yapar: önce umre yapılır, ihramdan çıkılır; 8 Zilhicce'de yeniden hac için ihrama girilir. Kurban kesmek bu haccın vacibidir." },
        { baslik: "8 Zilhicce — Terviye: Mina", metin: "Mekke'de hac niyetiyle ihrama girilir, telbiye getirilir. Sünnet olan, bu günü Mina'da geçirmek ve beş vakit namazı orada kılmaktır (günümüzde kafileler doğrudan Arafat'a da çıkabilir)." },
        { baslik: "9 Zilhicce — Arefe: Arafat Vakfesi", metin: "Haccın en önemli farzı. Öğleden sonra güneş batana kadar Arafat sınırları içinde bulunmak gerekir; bir an bile bulunan haccı kaçırmamış olur. Öğle ve ikindi cem edilerek kılınır, kıbleye dönülüp gün boyu dua, tövbe, Kur'an ve zikirle geçirilir. Peygamberimiz 'Hac, Arafat'tır' buyurmuştur." },
        { baslik: "Arefe gecesi — Müzdelife", metin: "Güneş battıktan sonra Müzdelife'ye geçilir; akşam ve yatsı yatsı vaktinde birlikte kılınır. Gece burada kalınır, sabah namazından sonra Müzdelife vakfesi yapılır (vacip). Şeytan taşlamak için küçük taşlar toplanır." },
        { baslik: "10 Zilhicce — Bayramın 1. günü: Mina", metin: "Sırayla: (1) Büyük şeytana (Akabe cemresi) 7 taş atılır, telbiye biter. (2) Kurban kesilir (temettu ve kıran haccında vacip). (3) Tıraş olunup ihramdan çıkılır; artık eşle beraberlik dışında yasaklar kalkar. (4) Mekke'ye inip ziyaret tavafı (farz) ve haccın sa'yi yapılır; sa'y daha önce yapılmadıysa şimdi yapılır." },
        { baslik: "11–12 (13) Zilhicce — Şeytan taşlama", metin: "Her gün zevalden sonra küçük, orta ve büyük cemreye yedişer taş atılır (toplam 21). 12. gün Mina'dan ayrılınabilir; 13. güne kalan o gün de taşlar. Geceleri Mina'da kalmak sünnettir." },
        { baslik: "Veda Tavafı", metin: "Mekke'den ayrılmadan önce 7 şavt veda tavafı yapılır (vacip). Hayızlı kadınlardan düşer. Böylece hac tamamlanır." },
        { baslik: "Medine Ziyareti", metin: "Haccın parçası olmasa da Peygamberimizin kabrini ve Mescid-i Nebevî'yi ziyaret etmek büyük fazilettir. Ravza'da edeple selam verilir, Cennetü'l-Bakî ve Uhud ziyaret edilir." }
      ]
    },
    {
      ad: "Pratik Bilgiler", ikon: "🧳",
      adimlar: [
        { baslik: "Yanınıza alın", metin: "İhram örtüsü ve kemeri, terlik, seccade, küçük Kur'an/bu uygulama, ilaçlar, güneş şemsiyesi, su matarası, taş torbası, kimlik ve otel kartı. Telefonunuzda kıble pusulası ve vakitler için Namaz Dostu'nu kullanabilirsiniz." },
        { baslik: "Sağlık", metin: "Bol su için, güneşten korunun, kalabalıkta kafileden ayrılmayın. Yaşlı ve hastalar tavafı tekerlekli sandalyeyle yapabilir; vekâleten şeytan taşlatmak mümkündür." },
        { baslik: "Kadınlar", metin: "İhramda yüz ve eller açık, eldiven ve peçe takılmaz. Hayız hâlinde tavaf yapılmaz; sa'y ve Arafat vakfesi yapılabilir, tavaf temizlenince tamamlanır." },
        { baslik: "Sık yapılan hatalar", metin: "İhramda kokulu sabun kullanmak, tavafı abdestsiz yapmak, şavt sayısını şaşırmak (tesbih/sayaçla sayın), Arafat'tan güneş batmadan ayrılmak, veda tavafını unutmak. Şüphe hâlinde kafile hocasına sorun." }
      ]
    }
  ],
  dualar: [
    { title: "Telbiye", arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ", okunusu: "Lebbeyk Allâhümme lebbeyk. Lebbeyke lâ şerîke leke lebbeyk. İnnel-hamde ven-ni'mete leke vel-mülk. Lâ şerîke lek", turkish: "Buyur Allah'ım buyur! Emrindeyim, buyur! Senin hiçbir ortağın yoktur. Emrindeyim, buyur! Şüphesiz hamd sana, nimet sana, mülk de senindir; senin ortağın yoktur." },
    { title: "Kâbe'yi Görünce", arabic: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ فَحَيِّنَا رَبَّنَا بِالسَّلَامِ", okunusu: "Allâhümme entes-selâmü ve minkes-selâm, fe-hayyinâ rabbenâ bis-selâm", turkish: "Allah'ım! Sen selâmsın, selâmet sendendir. Rabbimiz, bizi selâmetle yaşat." },
    { title: "Tavafa Başlarken", arabic: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ اللَّهُمَّ إِيمَانًا بِكَ وَتَصْدِيقًا بِكِتَابِكَ وَوَفَاءً بِعَهْدِكَ وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ", okunusu: "Bismillâhi Allâhü ekber. Allâhümme îmânen bike ve tasdîkan bi-kitâbike ve vefâen bi-ahdike vettibâan li-sünneti nebiyyike Muhammedin sallallâhü aleyhi ve sellem", turkish: "Allah'ın adıyla, Allah en büyüktür. Allah'ım! Sana iman ederek, kitabını tasdik ederek, ahdine vefa göstererek ve Peygamberin Muhammed'in (s.a.v.) sünnetine uyarak (tavaf ediyorum)." },
    { title: "Rükn-i Yemânî ile Hacerülesved Arasında", arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", okunusu: "Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhirati haseneten ve kınâ azâben-nâr", turkish: "Rabbimiz! Bize dünyada iyilik, ahirette de iyilik ver ve bizi cehennem azabından koru. (Bakara 201)" },
    { title: "Safa ve Merve'de", arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ — لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ أَنْجَزَ وَعْدَهُ وَنَصَرَ عَبْدَهُ وَهَزَمَ الْأَحْزَابَ وَحْدَهُ", okunusu: "İnnes-Safâ vel-Mervete min şeâirillâh — Lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr. Lâ ilâhe illallâhü vahdehû enceze va'dehû ve nasara abdehû ve hezemel-ahzâbe vahdeh", turkish: "Şüphesiz Safa ve Merve Allah'ın nişanelerindendir. — Allah'tan başka ilâh yoktur; O tektir, ortağı yoktur; mülk O'nundur, hamd O'nadır, O her şeye kadirdir. Allah'tan başka ilâh yoktur; O vaadini yerine getirdi, kuluna yardım etti ve düşman topluluklarını tek başına bozguna uğrattı." },
    { title: "Arafat'ta (En Hayırlı Dua)", arabic: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", okunusu: "Lâ ilâhe illallâhü vahdehû lâ şerîke leh, lehül-mülkü ve lehül-hamdü ve hüve alâ külli şey'in kadîr", turkish: "Allah'tan başka ilâh yoktur; O tektir, ortağı yoktur. Mülk O'nundur, hamd O'nadır ve O her şeye kadirdir. (Peygamberimiz: 'Duaların en hayırlısı Arefe günü duasıdır; benim ve benden önceki peygamberlerin söylediği en hayırlı söz budur.')" },
    { title: "Şeytan Taşlarken", arabic: "بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَنِ", okunusu: "Bismillâhi Allâhü ekber, rağmen liş-şeytâni ve rıdan lir-Rahmân", turkish: "Allah'ın adıyla, Allah en büyüktür; şeytana rağmen, Rahmân'ın rızası için. (Her taşta 'Bismillâhi Allâhü ekber' denir.)" },
    { title: "Zemzem İçerken", arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا وَاسِعًا وَشِفَاءً مِنْ كُلِّ دَاءٍ", okunusu: "Allâhümme innî es'elüke ilmen nâfian ve rızkan vâsian ve şifâen min külli dâ'", turkish: "Allah'ım! Senden faydalı ilim, geniş rızık ve her dertten şifa dilerim. (Zemzem ne niyetle içilirse onun içindir.)" },
    { title: "Ravza'da Peygamberimize Selam", arabic: "السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ، السَّلَامُ عَلَيْكَ يَا خَيْرَ خَلْقِ اللَّهِ", okunusu: "Esselâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berakâtüh. Esselâmü aleyke yâ Resûlallâh. Esselâmü aleyke yâ hayra halkıllâh", turkish: "Selam sana ey Peygamber; Allah'ın rahmeti ve bereketi üzerine olsun. Selam sana ey Allah'ın Resûlü. Selam sana ey Allah'ın yarattıklarının en hayırlısı." }
  ]
};

/* ══════════ v65.0 — MÜBAREK GECELER (KANDİL) REHBERİ ══════════ */
const GECELER_REHBERI = [
  {
    ad: "Regaip Kandili", anahtar: "Regaip",
    ne: "Recep ayının ilk Cuma gecesi; üç ayların ve kandillerin ilkidir. 'Regâib' çokça rağbet edilen, bol ihsan demektir.",
    yap: ["Kaza namazı veya nafile namaz kılın; tesbih namazı tavsiye edilir.", "Perşembe günü oruç tutmak güzeldir.", "Kur'an okuyun; Yâsîn ve İhlâs sûreleri.", "Bol bol istiğfar ve salavat.", "Aile ve akraba ile helalleşin, dargınları barıştırın.", "Sadaka verin, kandil simidi/tatlısı geleneği paylaşmanın vesilesidir."],
    dua: "Allâhümme bârik lenâ fî Recebe ve Şa'bân ve belliğnâ Ramazân — Allah'ım! Recep ve Şaban'ı bize mübarek kıl ve bizi Ramazan'a ulaştır.",
    hadis: "Peygamberimiz Recep ayı girince 'Allah'ım, Recep ve Şaban'ı bize mübarek kıl, bizi Ramazan'a ulaştır' diye dua ederdi."
  },
  {
    ad: "Miraç Kandili", anahtar: "Miraç",
    ne: "27 Recep gecesi. Peygamberimizin Mescid-i Haram'dan Mescid-i Aksâ'ya (İsrâ), oradan göklere (Miraç) yükseltildiği, beş vakit namazın farz kılındığı gece.",
    yap: ["Beş vakit namaz bu gece hediye edildi: namazlarınızı gözden geçirin, kazalarınızı kılın.", "12 rekât nafile namaz (2'şer rekât) kılınabilir.", "İsrâ sûresinin ilk âyeti ve Necm sûresi okunur.", "Âmenerrasûlü (Bakara 285-286) bu gecede verildi; okuyun.", "Gündüzünde oruç tutmak faziletlidir.", "Tövbe, istiğfar ve uzun dua."],
    dua: "Sübhânellezî esrâ bi-abdihî leylen minel-mescidil-harâmi ilel-mescidil-aksâ — Kulunu bir gece Mescid-i Haram'dan Mescid-i Aksâ'ya götüren Allah her türlü noksandan münezzehtir. (İsrâ 1)",
    hadis: "Peygamberimize Miraç'ta üç şey verildi: beş vakit namaz, Bakara sûresinin son âyetleri ve şirk koşmayanların bağışlanacağı müjdesi."
  },
  {
    ad: "Berat Kandili", anahtar: "Berat",
    ne: "15 Şaban gecesi. 'Berat' borçtan, cezadan kurtuluş demektir; bir yıllık rızık ve ecellerin takdir edildiği, günahların bağışlandığı gece kabul edilir.",
    yap: ["Gecenin bir kısmını namazla ihya edin; 100 rekâta kadar nafile kılanlar olur, 2-12 rekât da yeterlidir.", "Yâsîn sûresini üç niyetle (uzun ömür, bela-musibetten korunma, rızık) okumak yaygın gelenektir.", "Berat duası ve bol istiğfar.", "Ertesi gün (15 Şaban) oruç tutmak müstehaptır.", "Kul haklarını ödeyin, küskünlükleri bitirin — hadiste kin tutanın bu gece affedilmediği bildirilir.", "Kabir ziyareti ve geçmişler için dua."],
    dua: "Allâhümme innî es'elükel-afve vel-âfiyete fid-dünyâ vel-âhirah — Allah'ım! Dünya ve ahirette senden af ve afiyet dilerim.",
    hadis: "Peygamberimiz: 'Allah Şaban'ın on beşinci gecesinde kullarına rahmetiyle tecelli eder; müşrik ve kin tutan dışında herkesi bağışlar.'"
  },
  {
    ad: "Kadir Gecesi", anahtar: "Kadir",
    ne: "Ramazan'ın 27. gecesi olarak kutlanır (son on günün tek gecelerinde aranması tavsiye edilir). Kur'an'ın indirilmeye başlandığı, bin aydan hayırlı gece.",
    yap: ["Kadir sûresini okuyun ve anlamını düşünün.", "Teravih ve teheccüd; gece boyunca nafile namaz.", "Kur'an okuyun, hatim varsa bu gece bitirin.", "Peygamberimizin Hz. Âişe'ye öğrettiği duayı çokça söyleyin.", "Sadaka ve fitre verin, iftar açtırın.", "Ramazan'ın son on gününde itikâfa girmek sünnettir."],
    dua: "Allâhümme inneke afüvvün kerîmün tühibbül-afve fa'fü annî — Allah'ım! Sen affedicisin, kerimsin, affetmeyi seversin; beni affet.",
    hadis: "Peygamberimiz: 'Kim Kadir Gecesi'ni inanarak ve sevabını Allah'tan bekleyerek ihya ederse geçmiş günahları bağışlanır.'"
  },
  {
    ad: "Mevlid Kandili", anahtar: "Mevlid",
    ne: "12 Rebiülevvel gecesi. Peygamber Efendimizin (s.a.v.) dünyaya teşrif ettiği gece; 'Mevlid' doğum demektir.",
    yap: ["Bol bol salavat getirin: 'Allâhümme salli alâ seyyidinâ Muhammedin ve alâ âlihî ve sahbihî ve sellim'.", "Siyer okuyun; Peygamberimizin hayatından bir bölüm öğrenin (uygulamada Siyer bölümü).", "Sünnetlerinden birini hayatınıza katmaya niyet edin.", "Kur'an okuyun; Duhâ ve İnşirâh sûreleri.", "Yetim ve yoksulları sevindirin; Peygamberimiz yetimdi.", "Aile ile birlikte Mevlid-i Şerif okumak Anadolu geleneğidir."],
    dua: "Allâhümme salli alâ Muhammedin ve alâ âli Muhammed, kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm, inneke hamîdün mecîd.",
    hadis: "Peygamberimiz: 'Kim bana bir salavat getirirse Allah ona on rahmet eder.'"
  },
  {
    ad: "Ramazan Bayramı", anahtar: "Ramazan Bayramı",
    ne: "Şevval'in ilk üç günü. Bir aylık orucun ardından sevinç, şükür ve ikram günleri.",
    yap: ["Bayram sabahı gusül/abdest alın, en güzel elbisenizi giyin, camiye giderken bir şey yiyin (Ramazan Bayramı'na özgü).", "Bayram namazına gidin; yolda tekbir getirin.", "Fitreyi bayram namazından önce verin.", "Büyükleri ziyaret edin, küskünleri barıştırın, kabristanı ziyaret edin.", "Bayram günü oruç tutulmaz.", "Şevval'de 6 gün oruç tutmak bütün yıl oruç tutmuş gibi sevap kazandırır."],
    dua: "Tekabbelallâhü minnâ ve minküm — Allah bizden ve sizden kabul etsin. (Sahabenin bayramlaşma sözü)",
    hadis: "Peygamberimiz: 'Ramazan orucunu tutup ardından Şevval'den altı gün tutan, bütün yılı oruçlu geçirmiş gibi olur.'"
  },
  {
    ad: "Kurban Bayramı", anahtar: "Kurban",
    ne: "Zilhicce'nin 10-13. günleri. Hz. İbrahim'in teslimiyetini hatırlatan, hacıların haccını tamamladığı, kurban kesilen bayram.",
    yap: ["Arefe sabahından bayramın 4. günü ikindisine kadar her farzdan sonra teşrik tekbiri: 'Allâhü ekber Allâhü ekber lâ ilâhe illallâhü vallâhü ekber Allâhü ekber ve lillâhil-hamd'.", "Arefe günü oruç tutmak (hacda olmayanlara) iki yılın günahına kefarettir.", "Bayram namazına giderken bir şey yemeyin; ilk lokma kurban etinden olsun (sünnet).", "Kurbanı bayram namazından sonra kesin; etini üçe bölün: fakir, komşu-akraba, ev.", "Zilhicce'nin ilk on günü oruç, zikir ve ibadet için çok faziletlidir.", "Ziyaretler, hediye ve çocukları sevindirmek."],
    dua: "Bismillâhi Allâhü ekber — (kurban keserken) Allah'ın adıyla, Allah en büyüktür. Allâhümme hâzâ minke ve leke — Allah'ım, bu sendendir ve sanadır.",
    hadis: "Peygamberimiz: 'Hiçbir günde yapılan salih amel Allah'a Zilhicce'nin ilk on gününde yapılandan daha sevimli değildir.'"
  },
  {
    ad: "Aşure Günü", anahtar: "Aşure",
    ne: "Muharrem'in 10. günü. Hz. Nuh'un gemisinin karaya oturduğu, Hz. Mûsâ'nın kurtulduğu gün olarak anılır; Hz. Hüseyin'in Kerbelâ şehadeti de bu gündedir.",
    yap: ["Aşure orucu tutun; Yahudilere benzememek için 9 veya 11. günü de ekleyin.", "Aile bütçesini bugün geniş tutmak, aşure pişirip komşularla paylaşmak gelenektir.", "Sadaka verin, hasta ziyaret edin.", "Kerbelâ şehitleri ve Ehl-i Beyt için dua edin.", "Gusül abdesti, tırnak kesmek ve temizlik tavsiye edilir."],
    dua: "Hasbünallâhü ve ni'mel-vekîl — Allah bize yeter, O ne güzel vekildir.",
    hadis: "Peygamberimiz: 'Aşure günü orucunun geçmiş bir yılın günahlarına kefaret olmasını Allah'tan umarım.'"
  }
];

/* ══════════ v65.1 — TECVİD DERSLERİ (Elifbâ'nın devamı) ══════════ */
const TECVID_DERSLERI = [
  {
    ad: "Tecvid Nedir?", ozet: "Kur'an'ı, harflerin hakkını vererek ve kurallarına uygun okuma ilmi.",
    kural: "Tecvid, Kur'an harflerini çıkış yerlerinden (mahreç) ve sıfatlarına uygun okumayı, uzatma (med), gizleme (ihfâ), katma (idgam) gibi kuralları öğretir. Kur'an'ı tecvidle okumak sünnete uygun okumaktır; anlamı bozan hatalardan (lahn-ı celî) kaçınmak farzdır, ince hataları (lahn-ı hafî) düzeltmek ise faziletlidir. Bu derslerde en sık karşılaşılan kurallar sade örneklerle anlatılır; dinleyerek pekiştirmek için Kur'an Oku bölümündeki hoca sesini kullanın.",
    ornekler: [{ ar: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا", ok: "Ve rattilil-Kur'âne tertîlâ", not: "Kur'an'ı tane tane, tertil ile oku. (Müzzemmil 4)" }]
  },
  {
    ad: "Harflerin Mahreçleri ve Kalın Harfler", ozet: "Her harfin çıkış yeri vardır; 7 harf her zaman kalın okunur.",
    kural: "Harfler boğaz (ء ه ع ح غ خ), dil (ق ك ج ش ي ض ل ن ر ط د ت ص ز س ظ ذ ث), dudak (ف ب م و) ve geniz (gunne) bölgelerinden çıkar. Yedi harf daima kalın (dolgun) okunur — 'hurûf-ı isti'lâ': خ ص ض غ ط ق ظ. Bunları 'Hussa dağtin kız' diye ezberleyebilirsiniz. Diğer harfler incedir; ل ve ر ile Allah lafzı bazı yerlerde kalın, bazı yerlerde ince okunur (ilerideki ders).",
    ornekler: [
      { ar: "خَلَقَ", ok: "halaka", not: "خ ve ق kalın" },
      { ar: "صِرَاطَ", ok: "sırâta", not: "ص ve ط kalın; ر burada kalın" },
      { ar: "ظَلَمَ", ok: "zaleme", not: "ظ kalın" }
    ]
  },
  {
    ad: "Med Harfleri ve Tabiî Med", ozet: "Elif, vav ve ya harfleri sesi 1 elif miktarı (bir parmak kaldıracak süre) uzatır.",
    kural: "Med harfleri üçtür: harekesiz elif (öncesi üstün), harekesiz vav (öncesi ötre), harekesiz ya (öncesi esre). Bu harflerden sonra hemze veya sükûn yoksa 'tabiî med' olur ve ses bir elif miktarı (yaklaşık bir saniye) uzatılır. Uzatmayı ne kısaltmalı ne de abartmalı.",
    ornekler: [
      { ar: "قَالَ", ok: "kâle", not: "elif ile tabiî med" },
      { ar: "يَقُولُ", ok: "yekûlü", not: "vav ile tabiî med" },
      { ar: "قِيلَ", ok: "kîle", not: "ya ile tabiî med" }
    ]
  },
  {
    ad: "Medd-i Muttasıl (Bitişik Uzatma)", ozet: "Med harfinden sonra aynı kelimede hemze gelirse 4 elif uzatılır.",
    kural: "Med harfi ile hemze aynı kelimedeyse 'muttasıl' (bitişik) med olur; uzatmak vaciptir. Uzunluk 4 elif miktarıdır (en az 2, en çok 5 kabul edilir). Mushafta genellikle harfin üzerinde küçük bir med işareti (~) bulunur.",
    ornekler: [
      { ar: "جَاءَ", ok: "câââe", not: "elif + hemze aynı kelimede" },
      { ar: "سُوءَ", ok: "sûûûe", not: "vav + hemze" },
      { ar: "السَّمَاءِ", ok: "es-semâââi", not: "elif + hemze" }
    ]
  },
  {
    ad: "Medd-i Munfasıl (Ayrı Uzatma)", ozet: "Med harfi bir kelimenin sonunda, hemze sonraki kelimenin başındaysa 2–4 elif uzatılır.",
    kural: "Med harfi ile hemze ayrı kelimelerdeyse 'munfasıl' (ayrı) med olur; uzatmak câizdir, Türkiye'de yaygın uygulama 4 elif (en az 2) uzatmaktır. Durulursa (vakıf) hemze okunmadığı için med tabiî medde döner.",
    ornekler: [
      { ar: "بِمَا أُنْزِلَ", ok: "bimâââ ünzile", not: "elif kelime sonunda, hemze sonraki kelimede" },
      { ar: "يَا أَيُّهَا", ok: "yâââ eyyühâ", not: "ünlem yâ'sı + hemze" },
      { ar: "قُوا أَنْفُسَكُمْ", ok: "kûûû enfüseküm", not: "vav + hemze" }
    ]
  },
  {
    ad: "Medd-i Lâzım (Zorunlu Uzatma)", ozet: "Med harfinden sonra sürekli sükûn (cezm ya da şedde) gelirse 4 elif uzatılır.",
    kural: "Med harfinden sonra kelimenin aslında bulunan bir sükûn (cezimli veya şeddeli harf) gelirse 'lâzım' med olur; 4 elif uzatmak vaciptir. Durulsa da durulmasa da uzatma değişmez. Sûre başlarındaki hurûf-ı mukattaa'da (الٓمٓ gibi) da lâzım med vardır.",
    ornekler: [
      { ar: "وَلَا الضَّالِّينَ", ok: "ve led-dâââllîn", not: "elif + şeddeli lâm (Fâtiha 7)" },
      { ar: "الٓمٓ", ok: "Elif-lâââm-mîîîm", not: "hurûf-ı mukattaa (Bakara 1)" },
      { ar: "الْحَاقَّةُ", ok: "el-hâââkkah", not: "elif + şeddeli kaf" }
    ]
  },
  {
    ad: "Medd-i Ârız (Geçici Uzatma)", ozet: "Med harfinden sonraki harfte durulunca oluşan sükûnla 1–4 elif uzatılır.",
    kural: "Med harfinden sonra gelen harf aslında harekeli olduğu hâlde, o kelimede durulduğu için sükûnlu okunursa 'ârız' (geçici) med olur. Uzunluk okuyanın tercihine göre 1, 2 veya 4 eliftir; bir okuyuşta aynı ölçü korunmalıdır. Durulmadan geçilirse tabiî med olarak okunur.",
    ornekler: [
      { ar: "الرَّحِيمِ", ok: "er-rahîîîm", not: "durunca ya'dan sonraki mîm sükûnlu olur" },
      { ar: "نَسْتَعِينُ", ok: "nesteîîîn", not: "Fâtiha 5, vakıfta" },
      { ar: "يَعْلَمُونَ", ok: "ya'lemûûûn", not: "vav + vakıf sükûnu" }
    ]
  },
  {
    ad: "Medd-i Lîn (Yumuşak Uzatma)", ozet: "Üstünden sonra cezimli vav veya ya gelir, sonrasında durulursa yumuşakça uzatılır.",
    kural: "Harekesi üstün olan bir harften sonra cezimli vav (وْ) veya cezimli ya (يْ) gelirse 'lîn' harfi oluşur; bu harften sonraki harfte durulursa medd-i lîn olur ve 1–4 elif yumuşak bir uzatmayla okunur. Durulmazsa uzatılmaz.",
    ornekler: [
      { ar: "خَوْفٍ", ok: "havf → havvvf (vakıfta)", not: "Kureyş 4" },
      { ar: "الْبَيْتِ", ok: "el-beyt (vakıfta uzar)", not: "Kureyş 3" },
      { ar: "قُرَيْشٍ", ok: "Kureyş", not: "Kureyş 1, vakıfta lîn" }
    ]
  },
  {
    ad: "İzhâr (Açık Okuma)", ozet: "Sakin nûn veya tenvinden sonra boğaz harfi gelirse nûn açıkça okunur.",
    kural: "Sakin nûn (نْ) veya tenvin (ً ٍ ٌ) den sonra altı boğaz harfinden biri (ء ه ع ح غ خ) gelirse nûn sesi gizlenmeden, gunnesiz ve açık okunur. Bu harfleri 'Ehâ, hâ, ğâ' diye üçlü hatırlayabilirsiniz.",
    ornekler: [
      { ar: "مِنْ هَادٍ", ok: "min hâd", not: "nûn açık: ه" },
      { ar: "عَلِيمٌ حَكِيمٌ", ok: "alîmün hakîm", not: "tenvin + ح" },
      { ar: "مَنْ آمَنَ", ok: "men âmene", not: "nûn + hemze" }
    ]
  },
  {
    ad: "İdgam (Katarak Okuma)", ozet: "Sakin nûn/tenvin, 'يرملون' harflerine katılır: ي م ن و ile gunneli, ل ر ile gunnesiz.",
    kural: "Sakin nûn veya tenvinden sonra ي م ن و harflerinden biri gelirse nûn bu harfe katılır ve genizden 'gunne' ile 1,5–2 elif miktarı tutulur (idgam maa'l-gunne). ل veya ر gelirse gunnesiz, doğrudan katılarak okunur (idgam bilâ gunne). Bu kural yalnız iki ayrı kelime arasında geçerlidir; دُنْيَا، قِنْوَان gibi tek kelimede izhar yapılır.",
    ornekler: [
      { ar: "مِنْ وَالٍ", ok: "miv-vâl", not: "gunneli: nûn → vav" },
      { ar: "مِنْ نُورٍ", ok: "min-nûr", not: "gunneli: nûn → nûn" },
      { ar: "مِنْ رَبِّهِمْ", ok: "mir-rabbihim", not: "gunnesiz: nûn → ر" },
      { ar: "هُدًى لِلْمُتَّقِينَ", ok: "hüdel-lil-müttakîn", not: "tenvin → ل, gunnesiz (Bakara 2)" }
    ]
  },
  {
    ad: "İklâb (Çevirme)", ozet: "Sakin nûn/tenvinden sonra ب gelirse nûn, gunneli bir mîm'e dönüşür.",
    kural: "Sakin nûn veya tenvinden sonra ب harfi gelirse nûn sesi 'mîm'e çevrilir ve dudaklar hafifçe kapatılarak gunne ile okunur. Mushafta nûn'un üzerine küçük bir mîm (م) konarak gösterilir.",
    ornekler: [
      { ar: "مِنْ بَعْدِ", ok: "mim-ba'di", not: "nûn → mîm" },
      { ar: "سَمِيعٌ بَصِيرٌ", ok: "semîum-basîr", not: "tenvin → mîm" },
      { ar: "أَنْبِئْهُمْ", ok: "embi'hüm", not: "tek kelimede iklâb (Bakara 33)" }
    ]
  },
  {
    ad: "İhfâ (Gizleme)", ozet: "Sakin nûn/tenvinden sonra kalan 15 harf gelirse nûn gizlenerek, genizden okunur.",
    kural: "İzhâr, idgam ve iklâb harfleri dışındaki 15 harf (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك) sakin nûn veya tenvinden sonra gelirse, dil nûn'un mahrecine değdirilmeden nûn sesi genizden (gunne ile) 1,5 elif miktarı gizlenerek okunur. Sonraki harf kalınsa gunne kalın, inceyse ince çıkar.",
    ornekler: [
      { ar: "مِنْ كُلِّ", ok: "min~külli", not: "nûn gizli, ك ince" },
      { ar: "أَنْتَ", ok: "en~te", not: "tek kelimede ihfâ" },
      { ar: "عَنْ صَلَاتِهِمْ", ok: "an~salâtihim", not: "ص kalın → kalın gunne" },
      { ar: "مَاءً دَافِقًا", ok: "mâen~dâfika", not: "tenvin + د" }
    ]
  },
  {
    ad: "Sakin Mîm'in Hükümleri", ozet: "Sakin mîm'den sonra mîm gelirse idgam, ب gelirse dudak ihfâsı, diğer harflerde izhâr.",
    kural: "Sakin mîm (مْ) den sonra: (1) mîm gelirse iki mîm birleştirilip gunne ile okunur — idgam-ı misleyn maa'l-gunne; (2) ب gelirse mîm dudaklar hafif açık tutularak gunne ile gizlenir — ihfâ-i şefevî; (3) diğer harfler gelirse mîm açıkça okunur — izhâr-ı şefevî. Özellikle ف ve و harflerinde mîm'i açık okumaya dikkat edilir.",
    ornekler: [
      { ar: "لَهُمْ مَا", ok: "lehüm-mâ", not: "idgam-ı misleyn (gunneli)" },
      { ar: "تَرْمِيهِمْ بِحِجَارَةٍ", ok: "termîhim~bi-hicâratin", not: "ihfâ-i şefevî (Fîl 4)" },
      { ar: "لَهُمْ فِيهَا", ok: "lehüm fîhâ", not: "izhâr-ı şefevî" }
    ]
  },
  {
    ad: "Kalkale (Sıçratma)", ozet: "ق ط ب ج د harfleri cezimli olunca ses hafif titretilerek çıkarılır.",
    kural: "'Kutbu ced' (قطب جد) harfleri sükûnlu okunduğunda mahreçte hapsedilen ses hafif bir sıçramayla bırakılır. Kelime ortasında hafif (kalkale-i suğrâ), kelime sonunda durulunca daha belirgin (kalkale-i kübrâ) yapılır. Kalkale harfin kendi sesiyle olur; 'ı', 'i' gibi bir ünlü eklenmez.",
    ornekler: [
      { ar: "يَقْطَعُونَ", ok: "yak'taûn", not: "kelime ortasında ق" },
      { ar: "أَحَدٌ", ok: "ehad' (vakıfta)", not: "İhlâs 1, kübrâ" },
      { ar: "الْفَلَقِ", ok: "el-felak' (vakıfta)", not: "Felâk 1" },
      { ar: "أَبْتَرُ", ok: "eb'ter", not: "Kevser 3, ب" }
    ]
  },
  {
    ad: "Lafzatullah ve Râ Harfi", ozet: "Allah lafzındaki lâm ve râ harfi, önceki harekeye göre kalın ya da ince okunur.",
    kural: "Allah (الله) lafzından önceki harf üstün veya ötre ise lâm kalın, esre ise ince okunur. Râ harfi: harekesi üstün veya ötre ise kalın; esre ise ince; cezimli ise önceki harfin harekesine bakılır (üstün/ötre → kalın, esre → ince). Vakıfta sondaki râ, önceki harekeye göre okunur.",
    ornekler: [
      { ar: "قَالَ اللَّهُ", ok: "kâlallâh", not: "önce üstün → kalın lâm" },
      { ar: "بِسْمِ اللَّهِ", ok: "bismillâh", not: "önce esre → ince lâm" },
      { ar: "رَبِّ", ok: "rabbi", not: "üstün → kalın râ" },
      { ar: "رِزْقًا", ok: "rizkan", not: "esre → ince râ" }
    ]
  },
  {
    ad: "Gunne, Sekte ve Vakıf İşaretleri", ozet: "Şeddeli nûn/mîm'de genizden tutma, dört yerde nefes almadan kısa duruş ve mushaftaki durak işaretleri.",
    kural: "GUNNE: Şeddeli nûn (نّ) ve mîm (مّ) her zaman genizden 1,5–2 elif miktarı tutularak okunur. SEKTE: Kur'an'da dört yerde nefes almadan sesi kısaca kesmek gerekir — Kehf 1 (عِوَجًا), Yâsîn 52 (مَرْقَدِنَا), Kıyâme 27 (مَنْ رَاقٍ), Mutaffifîn 14 (بَلْ رَانَ). VAKIF İŞARETLERİ: م durmak gerekli · لا durulmaz · ج durmak da geçmek de olur · صلى geçmek daha iyi · قلى durmak daha iyi · ∴ ∴ ikisinden yalnız birinde durulur (muânaka).",
    ornekler: [
      { ar: "إِنَّ", ok: "innne", not: "şeddeli nûn → gunne" },
      { ar: "ثُمَّ", ok: "sümmme", not: "şeddeli mîm → gunne" },
      { ar: "عِوَجًا ۜ قَيِّمًا", ok: "ivecâ (sekte) kayyimâ", not: "Kehf 1-2" },
      { ar: "مَنْ رَاقٍ", ok: "men (sekte) râk", not: "Kıyâme 27 — burada idgam yapılmaz" }
    ]
  }
];
