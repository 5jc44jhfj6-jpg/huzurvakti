const PRAYER_GUIDE_DATA = {
  sabah: {
    name: "Sabah Namazı",
    totalRakat: 4,
    parts: [
      {
        type: "sünnet",
        rakat: 2,
        description: "2 Rekât Sünnet",
        steps: [
          {
            step: 1,
            title: "1. Rekât: Niyet, Tekbir & Sübhaneke + Fatiha + Zamm-ı Sure",
            description: "Kıbleye dönülür. 'Niyet ettim Allah rızası için bugünkü sabah namazının 2 rekât sünnetini kılmaya' denir. 'Allahu Ekber' diyerek tekbir alınır ve eller bağlanır. Önce Sübhaneke okunur, ardından Eûzü-Besmele çekilip Fâtiha ve Zamm-ı sure (örneğin Kevser veya İhlâs) okunur. Rükû ve secdelere gidilir.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ... ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme ve bi hamdike... Bismillâhirrahmânirrahîm. Elhamdu lillâhi rabbil 'âlemîn...",
            turkishMeaning: "Allah en büyüktür. Allah'ım Seni tenzih ederim... Rahmân ve Rahîm olan Allah'ın adıyla. Hamd âlemlerin Rabbine mahsustur..."
          },
          {
            step: 2,
            title: "2. Rekât & Son Oturuş (Dualar & Selam)",
            description: "2. rekâta kalkılır. Besmele çekilir, Fâtiha ve bir Zamm-ı sure okunur. Rükû ve 2 secde yapıldıktan sonra oturulur. Ettehiyyâtü, Allahümme Salli, Allahümme Bârik ve Rabbenâ duaları okunur. Önce sağa sonra sola 'Esselâmü aleyküm ve rahmetullâh' denilerek selam verilir.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ... ۝ اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ... ۝ رَبَّنَا آتِنَا فِي الدُّنْيَا... ۝ السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            okunusuText: "Ettehiyyâtu lillâhi... Allâhumme salli 'alâ Muhammedin... Rabbenâ âtinâ fiddunyâ... Esselâmu 'aleykum ve rahmetullâh",
            turkishMeaning: "Her türlü hürmet Allah'adır... Allah'ım Hz. Muhammed'e rahmet et... Ey Rabbimiz bize dünyada ve ahirette iyilik ver... Allah'ın selamı üzerinize olsun."
          }
        ]
      },
      {
        type: "farz",
        rakat: 2,
        description: "2 Rekât Farz",
        steps: [
          {
            step: 1,
            title: "1. Rekât: Kamet, Niyet, Tekbir & Okuyuş",
            description: "Kamet getirilir. 'Niyet ettim Allah rızası için bugünkü sabah namazının 2 rekât farzını kılmaya' denir. Tekbir alınarak eller bağlanır. Sübhaneke, Eûzü-Besmele, Fâtiha ve Zamm-ı sure okunup rükû ve secdeler yapılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ... ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme ve bi hamdike... Bismillâhirrahmânirrahîm...",
            turkishMeaning: "Allah en büyüktür. Allah'ım seni overim... Rahmân ve Rahîm olan Allah'ın adıyla..."
          },
          {
            step: 2,
            title: "2. Rekât & Son Oturuş (Selam)",
            description: "Ayağa kalkılır. Besmele, Fâtiha ve Zamm-ı sure okunur. Rükû ve secdelerden sonra oturulur. Ettehiyyâtü, Salli-Bârik ve Rabbenâ duaları okunup sağa ve sola selam verilerek farz tamamlanır.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ... ۝ السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            okunusuText: "Ettehiyyâtu lillâhi... Esselâmu 'aleykum ve rahmetullâh",
            turkishMeaning: "Bütün ibadetler Allah'adır... Allah'ın selamı ve rahmeti üzerinize olsun."
          }
        ]
      }
    ]
  },
  ogle: {
    name: "Öğle Namazı",
    totalRakat: 10,
    parts: [
      {
        type: "sünnet",
        rakat: 4,
        description: "4 Rekât İlk Sünnet",
        steps: [
          {
            step: 1,
            title: "1. Rekât: Niyet, Tekbir & Sübhaneke + Fatiha + Zamm-ı Sure",
            description: "'Niyet ettim Allah rızası için öğle namazının 4 rekât ilk sünnetini kılmaya' denir. Tekbir alınır, eller bağlanır. Sübhaneke, Eûzü-Besmele, Fâtiha ve Zamm-ı sure okunur. Rükû ve secdeler yapılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ... ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme... Bismillâhirrahmânirrahîm. Elhamdu lillâhi...",
            turkishMeaning: "Allah en büyüktür. Allah'ım seni tenzih ederim..."
          },
          {
            step: 2,
            title: "2. Rekât & İlk Oturuş (Sadece Ettehiyyâtü)",
            description: "2. rekâtta Besmele, Fâtiha ve Zamm-ı sure okunur. Rükû ve secdeden sonra oturulur. İlk oturuşta SADECE Ettehiyyâtü duası okunur, selam verilmeden 3. rekâta kalkılır.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...",
            okunusuText: "Ettehiyyâtu lillâhi vessalevâtu vettayyibât...",
            turkishMeaning: "Her türlü hürmet, ibadet ve temiz şeyler Allah'adır..."
          },
          {
            step: 3,
            title: "3. Rekât: Besmele + Fatiha + Zamm-ı Sure",
            description: "3. rekâta kalkılır. Besmele çekilir, Fâtiha ve Zamm-ı sure okunur. Rükû ve secdeler yapılır.",
            arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ...",
            okunusuText: "Bismillâhirrahmânirrahîm. Elhamdu lillâhi...",
            turkishMeaning: "Rahmân ve Rahîm olan Allah'ın adıyla..."
          },
          {
            step: 4,
            title: "4. Rekât & Son Oturuş (Dualar & Selam)",
            description: "4. rekâtta Besmele, Fâtiha ve Zamm-ı sure okunur. Secdelerden sonra oturulur. Ettehiyyâtü, Salli-Bârik ve Rabbenâ duaları okunup sağa ve sola selam verilerek ilk sünnet tamamlanır.",
            arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ... ۝ رَبَّنَا آتِنَا فِي الدُّنْيَا...",
            okunusuText: "Allâhumme salli 'alâ Muhammedin... Rabbenâ âtinâ fiddunyâ...",
            turkishMeaning: "Allah'ım Hz. Muhammed'e rahmet eyle... Ey Rabbimiz bize dünyada iyilik ver..."
          }
        ]
      },
      {
        type: "farz",
        rakat: 4,
        description: "4 Rekât Farz",
        steps: [
          {
            step: 1,
            title: "1. Rekât: Kamet & Niyet (Zamm-ı Sureli)",
            description: "Kamet getirilir. 'Niyet ettim Allah rızası için öğle namazının 4 rekât farzını kılmaya' denir. Tekbir alınır, Sübhaneke, Fatiha ve Zamm-ı sure okunur.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme...",
            turkishMeaning: "Allah en büyüktür..."
          },
          {
            step: 2,
            title: "2. Rekât & İlk Oturuş (Sadece Ettehiyyâtü)",
            description: "2. rekâtta Besmele, Fâtiha ve Zamm-ı sure okunur. Secdelerden sonra oturulur. Sadece Ettehiyyâtü okunup 3. rekâta kalkılır.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ...",
            okunusuText: "Ettehiyyâtu lillâhi...",
            turkishMeaning: "Bütün ibadetler Allah'adır..."
          },
          {
            step: 3,
            title: "3. ve 4. Rekât (Sadece Fatiha - Zamm-ı Suresiz) & Selam",
            description: "Farzın 3. ve 4. rekâtlarında Zamm-ı sure OKUNMAZ; SADECE Besmele ve Fâtiha okunur. Rükû ve secdelerden sonra oturulup Ettehiyyâtü, Salli-Bârik ve Rabbenâ okunarak selam verilir.",
            arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...",
            okunusuText: "Bismillâhirrahmânirrahîm. Elhamdu lillâhi...",
            turkishMeaning: "Rahmân ve Rahîm olan Allah'ın adıyla..."
          }
        ]
      },
      {
        type: "sünnet",
        rakat: 2,
        description: "2 Rekât Son Sünnet",
        steps: [
          {
            step: 1,
            title: "1. Rekât: Niyet & Dualar",
            description: "Öğle namazının 2 rekât son sünnetine niyet edilir. Tekbir alınır, Sübhaneke, Fatiha ve Zamm-ı sure okunur.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme...",
            turkishMeaning: "Allah en büyüktür..."
          },
          {
            step: 2,
            title: "2. Rekât & Son Oturuş (Selam)",
            description: "Besmele, Fatiha ve Zamm-ı sure okunur. Rükû ve secdelerden sonra oturulur. Ettehiyyatü, Salli-Barik ve Rabbena okunup selam verilir.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ... ۝ السَّلَامُ عَلَيْكُمْ",
            okunusuText: "Ettehiyyâtu lillâhi... Esselâmu 'aleykum",
            turkishMeaning: "Bütün ibadetler Allah'adır..."
          }
        ]
      }
    ]
  },
  ikindi: {
    name: "İkindi Namazı",
    totalRakat: 8,
    parts: [
      {
        type: "sünnet",
        rakat: 4,
        description: "4 Rekât Sünnet",
        steps: [
          {
            step: 1,
            title: "1. ve 2. Rekât & İlk Oturuş (Salli-Bârik Okunur)",
            description: "Niyet edilip kılınır. İkindi sünneti gayr-i müekked sünnet olduğu için 2. rekâttaki ilk oturuşta Ettehiyyâtü'den sonra Salli ve Bârik duaları da okunur ve 3. rekâta kalkılır.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ... ۝ اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ... ۝ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ...",
            okunusuText: "Ettehiyyâtu lillâhi... Allâhumme salli 'alâ Muhammedin... Allâhumme bârik 'alâ Muhammedin...",
            turkishMeaning: "Bütün hürmetler Allah'adır... Allah'ım Hz. Muhammed'e ve ailesine rahmet ve bereket eyle..."
          },
          {
            step: 2,
            title: "3. ve 4. Rekât (Sübhaneke ile Başlama) & Selam",
            description: "3. rekâta kalkıldığında 1. rekât gibi Sübhaneke duası ile başlanır. Fatiha ve Zamm-ı sure okunur. 4. rekâtta da Fatiha ve Zamm-ı sure okunup oturulur ve selam verilir.",
            arabicText: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ... ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...",
            okunusuText: "Sübhânekellâhumme ve bi hamdike... Bismillâhirrahmânirrahîm...",
            turkishMeaning: "Allah'ım seni her türlü noksandan tenzih ederim..."
          }
        ]
      },
      {
        type: "farz",
        rakat: 4,
        description: "4 Rekât Farz",
        steps: [
          {
            step: 1,
            title: "1. ve 2. Rekât (Zamm-ı Sureli)",
            description: "Kamet getirilir. Farza niyet edilip ilk iki rekâtta Fatiha + Zamm-ı sure okunur. İkinci rekâtta sadece Ettehiyyatü okunup kalkılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme...",
            turkishMeaning: "Allah en büyüktür..."
          },
          {
            step: 2,
            title: "3. ve 4. Rekât (Sadece Fatiha) & Selam",
            description: "3. ve 4. rekâtlarda zamm-ı sure okunmaz, sadece Fatiha okunur. Son oturuşta Ettehiyyatü, Salli-Barik ve Rabbena okunup selam verilir.",
            arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ... ۝ التَّحِيَّاتُ لِلَّهِ...",
            okunusuText: "Bismillâhirrahmânirrahîm... Ettehiyyâtu lillâhi...",
            turkishMeaning: "Rahmân ve Rahîm olan Allah'ın adıyla..."
          }
        ]
      }
    ]
  },
  aksam: {
    name: "Akşam Namazı",
    totalRakat: 5,
    parts: [
      {
        type: "farz",
        rakat: 3,
        description: "3 Rekât Farz",
        steps: [
          {
            step: 1,
            title: "1. ve 2. Rekât (Zamm-ı Sureli & İlk Oturuş)",
            description: "Akşam namazına ÖNCE Farz kılınarak başlanır. Kamet getirilir. 1. ve 2. rekâtta Fatiha ve Zamm-ı sure okunur. 2. rekâtta oturulup sadece Ettehiyyatü okunur ve 3. rekâta kalkılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ... ۝ التَّحِيَّاتُ لِلَّهِ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme... Ettehiyyâtu lillâhi...",
            turkishMeaning: "Allah en büyüktür... Bütün ibadetler Allah'adır..."
          },
          {
            step: 2,
            title: "3. Rekât (Sadece Fatiha) & Selam",
            description: "3. rekâtta SADECE Besmele ve Fâtiha okunur (zamm-ı sure okunmaz). Rükû ve secdelerden sonra oturulup tüm dualar okunur ve selam verilir.",
            arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ... ۝ السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            okunusuText: "Bismillâhirrahmânirrahîm... Esselâmu 'aleykum ve rahmetullâh",
            turkishMeaning: "Rahmân ve Rahîm olan Allah'ın adıyla... Allah'ın selamı üzerinize olsun."
          }
        ]
      },
      {
        type: "sunnet",
        rakat: 2,
        description: "2 Rekât Sünnet",
        steps: [
          {
            step: 1,
            title: "1. ve 2. Rekât Sünnet & Selam",
            description: "Farzdan sonra 2 rekât sünnete niyet edilir. Sabah namazının sünneti gibi 2 rekât kılınarak selam verilir.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme...",
            turkishMeaning: "Allah en büyüktür..."
          }
        ]
      }
    ]
  },
  yatsi: {
    name: "Yatsı Namazı",
    totalRakat: 13,
    parts: [
      {
        type: "sünnet",
        rakat: 4,
        description: "4 Rekât İlk Sünnet",
        steps: [
          {
            step: 1,
            title: "1. Rekât: Niyet, Tekbir & Sübhaneke + Fatiha + Zamm-ı Sure",
            description: "'Niyet ettim Allah rızası için yatsı namazının 4 rekât ilk sünnetini kılmaya' denir. Tekbir alınır, eller bağlanır. Sübhaneke, Eûzü-Besmele, Fâtiha ve Zamm-ı sure (Kevser/İhlas vb.) okunup rükû ve secdeler yapılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ... ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme ve bi hamdike... Bismillâhirrahmânirrahîm. Elhamdu lillâhi...",
            turkishMeaning: "Allah en büyüktür. Allah'ım seni tenzih ederim... Rahmân ve Rahîm olan Allah'ın adıyla..."
          },
          {
            step: 2,
            title: "2. Rekât & İlk Oturuş (Salli-Bârik Okunur)",
            description: "2. rekâtta Besmele, Fâtiha ve Zamm-ı sure okunur. Secdelerden sonra oturulur. Yatsı ilk sünneti gayr-i müekked sünnet olduğu için ilk oturuşta Ettehiyyâtü ile birlikte SALLİ ve BÂRİK duaları da okunur.",
            arabicText: "التَّحِيَّاتُ لِلَّهِ... ۝ اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ... ۝ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ...",
            okunusuText: "Ettehiyyâtu lillâhi... Allâhumme salli 'alâ Muhammedin... Allâhumme bârik 'alâ Muhammedin...",
            turkishMeaning: "Bütün hürmetler Allah'adır... Allah'ım Hz. Muhammed'e rahmet ve bereket eyle..."
          },
          {
            step: 3,
            title: "3. Rekât (Sübhaneke Okunarak Başlanır)",
            description: "✅ EVET! 3. rekâta kalkıldığında tıpkı yeni bir namaza başlar gibi ÖNCE Sübhaneke duası okunur. Ardından Eûzü-Besmele çekilip Fâtiha ve Zamm-ı sure okunur. Rükû ve secdeler yapılır.",
            arabicText: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ... ۝ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...",
            okunusuText: "Sübhânekellâhumme ve bi hamdike... Bismillâhirrahmânirrahîm...",
            turkishMeaning: "Allah'ım seni her türlü noksandan tenzih ederim... Rahmân ve Rahîm olan Allah'ın adıyla..."
          },
          {
            step: 4,
            title: "4. Rekât & Son Oturuş (Dualar & Selam)",
            description: "4. rekâtta Besmele, Fâtiha ve Zamm-ı sure okunur. Secdelerden sonra oturulur. Ettehiyyâtü, Salli-Bârik ve Rabbenâ duaları okunup sağa ve sola selam verilerek ilk sünnet tamamlanır.",
            arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ... ۝ رَبَّنَا آتِنَا فِي الدُّنْيَا... ۝ السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
            okunusuText: "Allâhumme salli 'alâ Muhammedin... Rabbenâ âtinâ fiddunyâ... Esselâmu 'aleykum ve rahmetullâh",
            turkishMeaning: "Allah'ım Hz. Muhammed'e rahmet eyle... Ey Rabbimiz bize dünyada ve ahirette iyilik ver..."
          }
        ]
      },
      {
        type: "farz",
        rakat: 4,
        description: "4 Rekât Farz",
        steps: [
          {
            step: 1,
            title: "1. ve 2. Rekât Farz",
            description: "Kamet getirilir. İlk 2 rekâtta Fatiha ve zamm-ı sure okunur. İkinci rekâtta sadece Ettehiyyatü okunup kalkılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme...",
            turkishMeaning: "Allah en büyüktür..."
          },
          {
            step: 2,
            title: "3. ve 4. Rekât (Sadece Fatiha) & Selam",
            description: "Son iki rekâtta sadece Fatiha okunur ve son oturuşta dualar okunup selam verilir.",
            arabicText: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...",
            okunusuText: "Bismillâhirrahmânirrahîm...",
            turkishMeaning: "Rahmân ve Rahîm olan Allah'ın adıyla..."
          }
        ]
      },
      {
        type: "sunnet",
        rakat: 2,
        description: "2 Rekât Son Sünnet",
        steps: [
          {
            step: 1,
            title: "2 Rekât Son Sünnet",
            description: "2 rekât son sünnete niyet edilir. Sabah namazının sünneti gibi kılınıp selam verilir.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme...",
            turkishMeaning: "Allah en büyüktür..."
          }
        ]
      },
      {
        type: "vitir",
        rakat: 3,
        description: "3 Rekât Vitir Vacip",
        steps: [
          {
            step: 1,
            title: "1. ve 2. Rekât",
            description: "Vitir namazına niyet edilir. 1. ve 2. rekâtlarda Fatiha ve Zamm-ı sure okunur. 2. rekâtta oturulup SADECE Ettehiyyatü okunur ve 3. rekâta kalkılır.",
            arabicText: "اللَّهُ أَكْبَرُ ۝ سُبْحَانَكَ اللَّهُمَّ... ۝ التَّحِيَّاتُ لِلَّهِ...",
            okunusuText: "Allâhu Ekber. Sübhânekellâhumme... Ettehiyyâtu lillâhi...",
            turkishMeaning: "Allah en büyüktür..."
          },
          {
            step: 2,
            title: "3. Rekât & Kunut Tekbiri ve Duaları",
            description: "3. rekâtta Fâtiha ve Zamm-ı sure okunduktan sonra RÜKÛA GİTMEDEN eller kulak hizasına kaldırılıp 'Allahu Ekber' diyerek tekbir alınır. Tekrar eller bağlanıp Kunut Duaları okunur, ardından rükû ve secdeler yapılıp oturulur ve selam verilir.",
            arabicText: "اللَّهُمَّ إِنيَّ نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ...",
            okunusuText: "Allâhumme innâ neste'înuke ve nestagfiruke ve nestehdîk. Ve nu'minu bike ve netûbu ileyk...",
            turkishMeaning: "Allah'ım! Senden yardım dileriz, günahlarımızı bağışlamanı dileriz, bizi hidayete erdirmeni dileriz..."
          }
        ]
      }
    ]
  }
};

const PRAYER_DUAS = {
  subhaneke: {
    title: "Sübhaneke Duası",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ ، وَتَبَارَكَ اسْمُكَ ، وَتَعَالَى جَدُّكَ ، وَلاَ إِلَهَ غَيْرُكَ",
    okunusu: "Sübhânekellâhumme ve bi hamdike ve tebârekesmuke ve teâlâ cedduke ve lâ ilâhe ğayruk.",
    turkish: "Allah'ım! Seni her türlü noksanlıktan tenzih eder, hamd ile överim. Senin adın mübarektir, şanın yücedir. Senden başka hiçbir ilah yoktur."
  },
  fatiha: {
    title: "Fâtiha Suresi",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلا الضَّالِّينَ",
    okunusu: "Bismillâhirrahmânirrahîm. Elhamdu lillâhi rabbil 'âlemîn. Errahmânirrahîm. Mâliki yevmiddîn. İyyâke na'budu ve iyyâke neste'în. İhdinassırâtal mustekîm. Sırâtallezîne en'amte 'aleyhim ğayril mağdûbi 'aleyhim ve laddâllîn.",
    turkish: "Rahmân ve Rahîm olan Allah'ın adıyla. Hamd, âlemlerin Rabbi olan Allah'a mahsustur. O Rahmân'dır, Rahîm'dir. Din gününün sahibidir. Ancak sana kulluk eder ve ancak senden yardım dileriz. Bizi doğru yola ilet; kendilerine nimet verdiğin kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil."
  },
  ettehiyyatu: {
    title: "Ettehiyyâtü Duası",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    okunusu: "Ettehiyyâtu lillâhi vessalevâtu vettayyibât. Esselâmu 'aleyke eyyuhennebiyyu ve rahmetullâhi ve berakâtuh. Esselâmu 'aleynâ ve 'alâ 'ibâdillâhis-sâlihîn. Eşhedu en lâ ilâhe illallâh ve eşhedu enne Muhammeden 'abduhû ve rasûluh.",
    turkish: "Her türlü hürmet, ibadet ve tayyib (temiz) şeyler Allah'adır. Ey Peygamber! Allah'ın selamı, rahmeti ve bereketleri senin üzerine olsun. Selam bizim ve Allah'ın salih kullarının üzerine olsun. Şahitlik ederim ki Allah'tan başka ilah yoktur. Yine şahitlik ederim ki Muhammed O'nun kulu ve elçisidir."
  },
  allahummeSalli: {
    title: "Allahümme Salli Duası",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    okunusu: "Allâhumme salli 'alâ Muhammedin ve 'alâ âli Muhammedin kemâ salleyte 'alâ İbrâhîme ve 'alâ âli İbrâhîme inneke hamîdun mecîd.",
    turkish: "Allah'ım! Hz. İbrahim'e ve ailesine rahmet ettiğin gibi Hz. Muhammed'e ve ailesine de rahmet eyle. Şüphesiz sen övülmeye layıksın, şanı yüce olansın."
  },
  allahummeBarik: {
    title: "Allahümme Bârik Duası",
    arabic: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    okunusu: "Allâhumme bârik 'alâ Muhammedin ve 'alâ âli Muhammedin kemâ bârakte 'alâ İbrâhîme ve 'alâ âli İbrâhîme inneke hamîdun mecîd.",
    turkish: "Allah'ım! Hz. İbrahim'e ve ailesine bereket ihsan ettiğin gibi Hz. Muhammed'e ve ailesine de bereket ihsan eyle. Şüphesiz sen övülmeye layıksın, şanı yüce olansın."
  },
  rabbenaDuasi: {
    title: "Rabbena Duaları",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    okunusu: "Rabbenâ âtinâ fiddunyâ haseneten ve fil-âhireti haseneten ve kınâ 'azâbennâr. Rabbenâğfirlî ve li-vâlideyye ve lil-mu'minîne yevme yekûmul-hisâb.",
    turkish: "Ey Rabbimiz! Bize dünyada da iyilik ve güzellik ver, ahirette de iyilik ve güzellik ver. Bizi cehennem azabından koru. Ey Rabbimiz! Hesabın görüleceği gün beni, anne-babamı ve bütün müminleri bağışla."
  },
  kunut: {
    title: "Kunut Duaları",
    arabic: "اللَّهُمَّ إِنيَّ نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ وَلاَ نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ",
    okunusu: "Allâhumme innâ neste'înuke ve nestagfiruke ve nestehdîk. Ve nu'minu bike ve netûbu ileyk. Ve netevekkelu 'aleyke ve nusnî 'aleykel-khayra kulleh. Neşkuruke ve lâ nekfuruke ve nakhla'u ve netruku mey yefjuruk.",
    turkish: "Allah'ım! Senden yardım dileriz, günahlarımızı bağışlamanı dileriz, bizi hidayete erdirmeni dileriz. Sana iman ederiz, sana tövbe ederiz, sana güveniriz. Seni bütün hayırlarla anarız."
  }
};

const DAILY_VERSES = [
  { surah: "Nahl", surahNumber: 16, ayah: 90, arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَى", turkish: "Şüphesiz Allah, adaleti, iyilik yapmayı ve yakınlara bakmayı emreder." },
  { surah: "Bakara", surahNumber: 2, ayah: 152, arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", turkish: "Öyleyse beni anın ki ben de sizi anayım. Bana şükredin ve nankörlük etmeyin." },
  { surah: "Bakara", surahNumber: 2, ayah: 186, arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ", turkish: "Kullarım sana beni sorduklarında bilsinler ki şüphesiz ben onlara çok yakınım. Bana dua edenin duasına icabet ederim." },
  { surah: "Bakara", surahNumber: 2, ayah: 286, arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", turkish: "Allah, hiç kimseye gücünün yettiğinden fazlasını yüklemez." },
  { surah: "Al-i İmran", surahNumber: 3, ayah: 139, arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ", turkish: "Gevşemeyin, üzülmeyin; eğer gerçekten inanıyorsanız en üstün olan sizsiniz." },
  { surah: "İnşirah", surahNumber: 94, ayah: 5, arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا", turkish: "Şüphesiz zorlukla beraber bir kolaylık vardır. Evet, zorlukla beraber bir kolaylık vardır." },
  { surah: "Rad", surahNumber: 13, ayah: 28, arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", turkish: "Bilesiniz ki, kalpler ancak Allah'ı anmakla huzur bulur." },
  { surah: "İbrahim", surahNumber: 14, ayah: 7, arabic: "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ", turkish: "Eğer şükrederseniz, elbette size olan nimetimi artırırım." },
  { surah: "Ankebut", surahNumber: 29, ayah: 45, arabic: "وَأَقِمِ الصَّلَاةَ إِنَّ الصَّلَاةَ تَنْهَى عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ", turkish: "Namazı dosdoğru kıl. Muhakkak ki namaz, insanı hayâsızlıktan ve kötülükten alıkoyar." },
  { surah: "Talak", surahNumber: 65, ayah: 3, arabic: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", turkish: "Kim Allah'a tevekkül ederse, O kendisine yeter." },
  { surah: "Zümer", surahNumber: 39, ayah: 53, arabic: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا", turkish: "Allah'ın rahmetinden ümit kesmeyin. Şüphesiz Allah, bütün günahları bağışlar." },
  { surah: "Mülk", surahNumber: 67, ayah: 1, arabic: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ", turkish: "Hükümranlık elinde olan Allah ne yücedir! O, her şeye hakkıyla gücü yetendir." },
  { surah: "Müminun", surahNumber: 23, ayah: 1, arabic: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ", turkish: "Müminler gerçekten kurtuluşa ermiştir." },
  { surah: "Hucurat", surahNumber: 49, ayah: 13, arabic: "إِنَّ أَكْرَمَكُمْ عِنْدَ اللَّهِ أَتْقَاكُمْ", turkish: "Şüphesiz, Allah katında en değerliniz, O'na karşı en çok takva sahibi olanınızdır." },
  { surah: "Yunus", surahNumber: 10, ayah: 62, arabic: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ", turkish: "Bilesiniz ki, Allah'ın dostlarına korku yoktur ve onlar üzülmeyeceklerdir." },
  { surah: "Tevbe", surahNumber: 9, ayah: 40, arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا", turkish: "Üzülme, çünkü Allah bizimle beraberdir." },
  { surah: "Hadid", surahNumber: 57, ayah: 4, arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ", turkish: "Nerede olursanız olun, O sizinle beraberdir." },
  { surah: "Taha", surahNumber: 20, ayah: 14, arabic: "فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي", turkish: "Bana ibadet et ve beni anmak için namaz kıl." },
  { surah: "Yasin", surahNumber: 36, ayah: 58, arabic: "سَلَامٌ قَوْلًا مِنْ رَبٍّ رَحِيمٍ", turkish: "Onlara merhametli Rabbin söylediği selam vardır." },
  { surah: "Kehf", surahNumber: 18, ayah: 10, arabic: "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا", turkish: "Ey Rabbimiz! Bize katından bir rahmet ver ve bize işimizde bir doğruluk hazırla." },
  { surah: "Maide", surahNumber: 5, ayah: 2, arabic: "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ", turkish: "İyilik ve takva üzerinde yardımlaşın." },
  { surah: "Nur", surahNumber: 24, ayah: 35, arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", turkish: "Allah, göklerin ve yerin nurudur." },
  { surah: "Lokman", surahNumber: 31, ayah: 17, arabic: "يَا بُنَيَّ أَقِمِ الصَّلَاةَ وَأْمُرْ بِالْمَعْرُوفِ وَانْهَ عَنِ الْمُنْكَرِ وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ", turkish: "Yavrucuğum! Namazı dosdoğru kıl, iyiliği emret, kötülükten vazgeçir ve başına gelene sabret." },
  { surah: "Müzzemmil", surahNumber: 73, ayah: 8, arabic: "وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا", turkish: "Rabbinin adını an ve bütün varlığınla O'na yönel." },
  { surah: "Furkan", surahNumber: 25, ayah: 74, arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ", turkish: "Ey Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl." },
  { surah: "Haşr", surahNumber: 59, ayah: 22, arabic: "هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ هُوَ الرَّحْمَٰنُ الرَّحِيمُ", turkish: "O, kendisinden başka hiçbir ilah olmayan Allah'tır. Gaybı da, görünen alemi de bilendir. O, Rahman'dır, Rahim'dir." },
  { surah: "Nisa", surahNumber: 4, ayah: 32, arabic: "وَاسْأَلُوا اللَّهَ مِنْ فَضْلِهِ", turkish: "Allah'tan O'nun lütfunu isteyin." },
  { surah: "Şura", surahNumber: 42, ayah: 19, arabic: "اللَّهُ لَطِيفٌ بِعِبَادِهِ يَرْزُقُ مَنْ يَشَاءُ", turkish: "Allah, kullarına çok lütufkardır. Dilediğini rızıklandırır." },
  { surah: "Fetih", surahNumber: 48, ayah: 29, arabic: "مُحَمَّدٌ رَسُولُ اللَّهِ", turkish: "Muhammed Allah'ın Resulüdür." }
];

const PRAYER_NAMES = {
  Fajr: { name: "İmsak", icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer-icon"><path d="M12 2v4M8 6h8M6 10a6 6 0 0 1 12 0v7H6v-7zM8 17v4h8v-4M12 10v4"/></svg>` },
  Sunrise: { name: "Güneş", icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer-icon"><path d="M17 18a5 5 0 0 0-10 0M12 2v3M4.22 6.22l2.12 2.12M2 14h3M19 14h3M17.66 8.34l2.12-2.12M12 18v3M2 22h20"/></svg>` },
  Dhuhr: { name: "Öğle", icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer-icon"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>` },
  Asr: { name: "İkindi", icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer-icon"><path d="M3 21h18M6 21v-7a3 3 0 0 1 6 0v7M12 21v-9a3 3 0 0 1 6 0v9M4 14V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5M14 12V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5M12 2v3M6 4V7M18 2V5"/></svg>` },
  Maghrib: { name: "Akşam", icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/><path d="M19 3v4M21 5h-4"/></svg>` },
  Isha: { name: "Yatsı", icon: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="svg-prayer-icon"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8M12 11V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4M4 13V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4M8 11V9a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2M3 21h18M12 2v3"/></svg>` }
};

/* Complete metadata list of ALL 114 Surahs of the Holy Quran */
const ALL_114_SURAHS = [
  { id: 1, name: "Fâtiha", name_original: "الفاتحة", verse_count: 7, revelation_place: "Mekke" },
  { id: 2, name: "Bakara", name_original: "البقرة", verse_count: 286, revelation_place: "Medine" },
  { id: 3, name: "Âl-i İmran", name_original: "آل عمران", verse_count: 200, revelation_place: "Medine" },
  { id: 4, name: "Nisâ", name_original: "النساء", verse_count: 176, revelation_place: "Medine" },
  { id: 5, name: "Mâide", name_original: "المائدة", verse_count: 120, revelation_place: "Medine" },
  { id: 6, name: "En'âm", name_original: "الأنعام", verse_count: 165, revelation_place: "Mekke" },
  { id: 7, name: "A'râf", name_original: "الأعراف", verse_count: 206, revelation_place: "Mekke" },
  { id: 8, name: "Enfâl", name_original: "الأنفال", verse_count: 75, revelation_place: "Medine" },
  { id: 9, name: "Tevbe", name_original: "التوبة", verse_count: 129, revelation_place: "Medine" },
  { id: 10, name: "Yûnus", name_original: "يونس", verse_count: 109, revelation_place: "Mekke" },
  { id: 11, name: "Hûd", name_original: "هود", verse_count: 123, revelation_place: "Mekke" },
  { id: 12, name: "Yûsuf", name_original: "يوسف", verse_count: 111, revelation_place: "Mekke" },
  { id: 13, name: "Ra'd", name_original: "الرعد", verse_count: 43, revelation_place: "Medine" },
  { id: 14, name: "İbrâhîm", name_original: "إبراهيم", verse_count: 52, revelation_place: "Mekke" },
  { id: 15, name: "Hicr", name_original: "الحجر", verse_count: 99, revelation_place: "Mekke" },
  { id: 16, name: "Nahl", name_original: "النحل", verse_count: 128, revelation_place: "Mekke" },
  { id: 17, name: "İsrâ", name_original: "الإسراء", verse_count: 111, revelation_place: "Mekke" },
  { id: 18, name: "Kehf", name_original: "الكهف", verse_count: 110, revelation_place: "Mekke" },
  { id: 19, name: "Meryem", name_original: "مريم", verse_count: 98, revelation_place: "Mekke" },
  { id: 20, name: "Tâhâ", name_original: "طه", verse_count: 135, revelation_place: "Mekke" },
  { id: 21, name: "Enbiyâ", name_original: "الأنبياء", verse_count: 112, revelation_place: "Mekke" },
  { id: 22, name: "Hac", name_original: "الحج", verse_count: 78, revelation_place: "Medine" },
  { id: 23, name: "Mü'minûn", name_original: "المؤمنون", verse_count: 118, revelation_place: "Mekke" },
  { id: 24, name: "Nûr", name_original: "النور", verse_count: 64, revelation_place: "Medine" },
  { id: 25, name: "Furkân", name_original: "الفرقان", verse_count: 77, revelation_place: "Mekke" },
  { id: 26, name: "Şuarâ", name_original: "الشعراء", verse_count: 227, revelation_place: "Mekke" },
  { id: 27, name: "Neml", name_original: "النمل", verse_count: 93, revelation_place: "Mekke" },
  { id: 28, name: "Kasas", name_original: "القصص", verse_count: 88, revelation_place: "Mekke" },
  { id: 29, name: "Ankebût", name_original: "العنكبوت", verse_count: 69, revelation_place: "Mekke" },
  { id: 30, name: "Rûm", name_original: "الروم", verse_count: 60, revelation_place: "Mekke" },
  { id: 31, name: "Lokmân", name_original: "لقمان", verse_count: 34, revelation_place: "Mekke" },
  { id: 32, name: "Secde", name_original: "السجدة", verse_count: 30, revelation_place: "Mekke" },
  { id: 33, name: "Ahzâb", name_original: "الأحزاب", verse_count: 73, revelation_place: "Medine" },
  { id: 34, name: "Sebe'", name_original: "سبإ", verse_count: 54, revelation_place: "Mekke" },
  { id: 35, name: "Fâtır", name_original: "فاطر", verse_count: 45, revelation_place: "Mekke" },
  { id: 36, name: "Yâsîn", name_original: "يس", verse_count: 83, revelation_place: "Mekke" },
  { id: 37, name: "Sâffât", name_original: "الصافات", verse_count: 182, revelation_place: "Mekke" },
  { id: 38, name: "Sâd", name_original: "ص", verse_count: 88, revelation_place: "Mekke" },
  { id: 39, name: "Zümer", name_original: "الزمر", verse_count: 75, revelation_place: "Mekke" },
  { id: 40, name: "Mü'min (Gâfir)", name_original: "غافر", verse_count: 85, revelation_place: "Mekke" },
  { id: 41, name: "Fussilet", name_original: "فصلت", verse_count: 54, revelation_place: "Mekke" },
  { id: 42, name: "Şûrâ", name_original: "الشورى", verse_count: 53, revelation_place: "Mekke" },
  { id: 43, name: "Zuhruf", name_original: "الزخرف", verse_count: 89, revelation_place: "Mekke" },
  { id: 44, name: "Duhân", name_original: "الدخان", verse_count: 59, revelation_place: "Mekke" },
  { id: 45, name: "Câsiye", name_original: "الجاثية", verse_count: 37, revelation_place: "Mekke" },
  { id: 46, name: "Ahkâf", name_original: "الأحقاف", verse_count: 35, revelation_place: "Mekke" },
  { id: 47, name: "Muhammed", name_original: "محمد", verse_count: 38, revelation_place: "Medine" },
  { id: 48, name: "Fetih", name_original: "الفتح", verse_count: 29, revelation_place: "Medine" },
  { id: 49, name: "Hucurât", name_original: "الحجرات", verse_count: 18, revelation_place: "Medine" },
  { id: 50, name: "Kâf", name_original: "ق", verse_count: 45, revelation_place: "Mekke" },
  { id: 51, name: "Zâriyât", name_original: "الذاريات", verse_count: 60, revelation_place: "Mekke" },
  { id: 52, name: "Tûr", name_original: "الطور", verse_count: 49, revelation_place: "Mekke" },
  { id: 53, name: "Necm", name_original: "النجم", verse_count: 62, revelation_place: "Mekke" },
  { id: 54, name: "Kamer", name_original: "القمر", verse_count: 55, revelation_place: "Mekke" },
  { id: 55, name: "Rahmân", name_original: "الرحمن", verse_count: 78, revelation_place: "Medine" },
  { id: 56, name: "Vâkıa", name_original: "الواقعة", verse_count: 96, revelation_place: "Mekke" },
  { id: 57, name: "Hadîd", name_original: "الحديد", verse_count: 29, revelation_place: "Medine" },
  { id: 58, name: "Mücâdele", name_original: "المجادلة", verse_count: 22, revelation_place: "Medine" },
  { id: 59, name: "Haşr", name_original: "الحشر", verse_count: 24, revelation_place: "Medine" },
  { id: 60, name: "Mümtehine", name_original: "الممتحنة", verse_count: 13, revelation_place: "Medine" },
  { id: 61, name: "Saff", name_original: "الصف", verse_count: 14, revelation_place: "Medine" },
  { id: 62, name: "Cuma", name_original: "الجمعة", verse_count: 11, revelation_place: "Medine" },
  { id: 63, name: "Münâfikûn", name_original: "المنافقون", verse_count: 11, revelation_place: "Medine" },
  { id: 64, name: "Tegâbun", name_original: "التغابن", verse_count: 18, revelation_place: "Medine" },
  { id: 65, name: "Talâk", name_original: "الطلاق", verse_count: 12, revelation_place: "Medine" },
  { id: 66, name: "Tahrîm", name_original: "التحريم", verse_count: 12, revelation_place: "Medine" },
  { id: 67, name: "Mülk", name_original: "الملك", verse_count: 30, revelation_place: "Mekke" },
  { id: 68, name: "Kalem", name_original: "القلم", verse_count: 52, revelation_place: "Mekke" },
  { id: 69, name: "Hâkka", name_original: "الحاقة", verse_count: 52, revelation_place: "Mekke" },
  { id: 70, name: "Meâric", name_original: "المعارج", verse_count: 44, revelation_place: "Mekke" },
  { id: 71, name: "Nûh", name_original: "نوح", verse_count: 28, revelation_place: "Mekke" },
  { id: 72, name: "Cin", name_original: "الجن", verse_count: 28, revelation_place: "Mekke" },
  { id: 73, name: "Müzzemmil", name_original: "المزمل", verse_count: 20, revelation_place: "Mekke" },
  { id: 74, name: "Müddessir", name_original: "المدثر", verse_count: 56, revelation_place: "Mekke" },
  { id: 75, name: "Kıyâmet", name_original: "القيامة", verse_count: 40, revelation_place: "Mekke" },
  { id: 76, name: "İnsân", name_original: "الإنسان", verse_count: 31, revelation_place: "Medine" },
  { id: 77, name: "Mürselât", name_original: "المرسلات", verse_count: 50, revelation_place: "Mekke" },
  { id: 78, name: "Nebe'", name_original: "النبإ", verse_count: 40, revelation_place: "Mekke" },
  { id: 79, name: "Nâziât", name_original: "النازعات", verse_count: 46, revelation_place: "Mekke" },
  { id: 80, name: "Abese", name_original: "عبس", verse_count: 42, revelation_place: "Mekke" },
  { id: 81, name: "Tekvîr", name_original: "التكوير", verse_count: 29, revelation_place: "Mekke" },
  { id: 82, name: "İnfitâr", name_original: "الإنفطار", verse_count: 19, revelation_place: "Mekke" },
  { id: 83, name: "Mutaffifîn", name_original: "المطففين", verse_count: 36, revelation_place: "Mekke" },
  { id: 84, name: "İnşikâk", name_original: "الإنشقاق", verse_count: 25, revelation_place: "Mekke" },
  { id: 85, name: "Bürûc", name_original: "البروج", verse_count: 22, revelation_place: "Mekke" },
  { id: 86, name: "Târık", name_original: "الطارق", verse_count: 17, revelation_place: "Mekke" },
  { id: 87, name: "A'lâ", name_original: "الأعلى", verse_count: 19, revelation_place: "Mekke" },
  { id: 88, name: "Gâşiye", name_original: "الغاشية", verse_count: 26, revelation_place: "Mekke" },
  { id: 89, name: "Fecr", name_original: "الفجر", verse_count: 30, revelation_place: "Mekke" },
  { id: 90, name: "Beled", name_original: "البلد", verse_count: 20, revelation_place: "Mekke" },
  { id: 91, name: "Şems", name_original: "الشمس", verse_count: 15, revelation_place: "Mekke" },
  { id: 92, name: "Leyl", name_original: "الليل", verse_count: 21, revelation_place: "Mekke" },
  { id: 93, name: "Duhâ", name_original: "الضحى", verse_count: 11, revelation_place: "Mekke" },
  { id: 94, name: "İnşirâh", name_original: "الشرح", verse_count: 8, revelation_place: "Mekke" },
  { id: 95, name: "Tîn", name_original: "التين", verse_count: 8, revelation_place: "Mekke" },
  { id: 96, name: "Alak", name_original: "العلق", verse_count: 19, revelation_place: "Mekke" },
  { id: 97, name: "Kadir", name_original: "القدر", verse_count: 5, revelation_place: "Mekke" },
  { id: 98, name: "Beyyine", name_original: "البينة", verse_count: 8, revelation_place: "Medine" },
  { id: 99, name: "Zilzâl", name_original: "Zilzal", verse_count: 8, revelation_place: "Medine" },
  { id: 100, name: "Âdiyât", name_original: "العاديات", verse_count: 11, revelation_place: "Mekke" },
  { id: 101, name: "Kâri'a", name_original: "القارعة", verse_count: 11, revelation_place: "Mekke" },
  { id: 102, name: "Tekâsür", name_original: "التكاثر", verse_count: 8, revelation_place: "Mekke" },
  { id: 103, name: "Asr", name_original: "العصر", verse_count: 3, revelation_place: "Mekke" },
  { id: 104, name: "Hümeze", name_original: "الهمزة", verse_count: 9, revelation_place: "Mekke" },
  { id: 105, name: "Fîl", name_original: "الفيل", verse_count: 5, revelation_place: "Mekke" },
  { id: 106, name: "Kureyş", name_original: "قريش", verse_count: 4, revelation_place: "Mekke" },
  { id: 107, name: "Mâûn", name_original: "الماعون", verse_count: 7, revelation_place: "Mekke" },
  { id: 108, name: "Kevser", name_original: "الكوثر", verse_count: 3, revelation_place: "Mekke" },
  { id: 109, name: "Kâfirûn", name_original: "الكافرون", verse_count: 6, revelation_place: "Mekke" },
  { id: 110, name: "Nasr", name_original: "النصر", verse_count: 3, revelation_place: "Medine" },
  { id: 111, name: "Tebbet (Mesed)", name_original: "المسد", verse_count: 5, revelation_place: "Mekke" },
  { id: 112, name: "İhlâs", name_original: "الإخلاص", verse_count: 4, revelation_place: "Mekke" },
  { id: 113, name: "Felâk", name_original: "الفلق", verse_count: 5, revelation_place: "Mekke" },
  { id: 114, name: "Nâs", name_original: "الناس", verse_count: 6, revelation_place: "Mekke" }
];
