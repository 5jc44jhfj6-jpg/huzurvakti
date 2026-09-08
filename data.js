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
    okunusu: "Sübhânekellâhümme ve bihamdik ve tebârakesmük ve teâlâ ceddük (ve celle senâük) ve lâ ilâhe ğayruk",
    turkish: "Allah'ım! Sen eksik sıfatlardan pak ve uzaksın. Seni daima böyle tenzih eder ve överim. Senin adın mübarektir. Varlığın her şeyden üstündür. Senden başka ilah yoktur."
  },
  fatiha: {
    title: "Fâtiha Suresi",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ ۝ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ۝ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ۝ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلا الضَّالِّينَ",
    okunusu: "Bismillâhirrahmânirrahîm. Elhamdu lillâhi rabbil 'âlemîn. Errahmânirrahîm. Mâliki yevmiddîn. İyyâke na'budu ve iyyâke neste'în. İhdinassırâtal mustekîm. Sırâtallezîne en'amte 'aleyhim ğayril mağdûbi 'aleyhim ve laddâllîn.",
    turkish: "Bismillahirrahmânirrahîm Hamd, Âlemlerin Rabbi, Rahmân, Rahîm, hesap ve ceza gününün (ahiret gününün) maliki Allah'a mahsustur. (Allahım!) Yalnız sana ibadet ederiz ve yalnız senden yardım dileriz. Bizi doğru yola, kendilerine nimet verdiklerinin yoluna ilet; gazaba uğrayanlarınkine ve sapıklarınkine değil."
  },
  ettehiyyatu: {
    title: "Ettehiyyâtü Duası",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    okunusu: "Ettehiyyâtü lillâhi vessalevâtü vettayyibât. Esselâmü aleyke eyyühen-Nebiyyü ve rahmetullâhi ve berakâtühü. Esselâmü aleynâ ve alâ ibâdillâhis-Sâlihîn. Eşhedü ellâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve Rasülüh.",
    turkish: "Dil ile, beden ve mal ile yapılan bütün ibadetler Allah'adır. Ey Peygamber! Allah'ın selamı, rahmet ve bereketleri senin üzerine olsun. Selam bizim üzerimize ve Allah'ın bütün iyi kulları üzerine olsun. Şahitlik ederim ki, Allah'tan başka ilah yoktur. Yine şahitlik ederim ki, Muhammed, O'nun kulu ve Peygamberidir."
  },
  allahummeSalli: {
    title: "Allahümme Salli Duası",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    okunusu: "Allâhümme salli alâ Muhammediv ve alâ âli Muhammed. Kemâ salleyte alâ İbrâhîme ve alâ âli İbrahîm. İnneke hamîdüm mecîd.",
    turkish: "Allah'ım! Muhammed'e ve Muhammed'in ümmetine rahmet eyle; şerefini yücelt. İbrahim'e ve İbrahim'in ümmetine rahmet ettiğin gibi. Şüphesiz övülmeye layık yalnız sensin, şan ve şeref sahibi de sensin."
  },
  allahummeBarik: {
    title: "Allahümme Bârik Duası",
    arabic: "اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
    okunusu: "Allâhümme bârik alâ Muhammediv ve alâ âli Muhammed. Kemâ barekte alâ İbrâhîme ve alâ âli İbrâhîm. İnneke hamîdüm mecîd",
    turkish: "Allah'ım! Muhammed'e ve Muhammed'in ümmetine hayır ve bereket ver. İbrahim'e ve İbrahim'in ümmetine verdiğin gibi. Şüphesiz övülmeye layık yalnız sensin, şan ve şeref sahibi de sensin."
  },
  rabbenaDuasi: {
    title: "Rabbena Duaları",
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ ۝ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
    okunusu: "Rabbenâ âtinâ fid'dünyâ hasenetev ve fil'âhireti hasenetev ve ginâ azâbennâr. Rabbenâğfirlî ve li-vâlideyye ve lil-Mü'minîne yevme yegûmü'l hisâb.",
    turkish: "Allah'ım! Bize dünyada iyilik ve güzellik, ahirette de iyilik, güzellik ver. Bizi ateşin azabından koru. Ey bizim Rabbimiz! Beni, annemi, babamı ve bütün mü'minleri hesap gününde (herkesin sorguya çekileceği günde) bağışla."
  },
  kunut: {
    title: "Kunut Duaları",
    arabic: "اللَّهُمَّ إِنيَّ نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنَسْتَهْدِيكَ وَنُؤْمِنُ بِكَ وَنَتُوبُ إِلَيْكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ كُلَّهُ نَشْكُرُكَ وَلاَ نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ",
    okunusu: "Allâhümme innâ nesteînüke ve nestağfiruke ve nestehdîk. Ve nü'minü bike ve netûbü ileyk. Ve netevekkelü aleyke ve nüsnî aleykel-hayra kullehû neşküruke ve lâ nekfüruke ve nahleu ve netrukü men yefcüruk Allâhümme iyyâke na'büdü ve leke nusallî ve nescüdü ve ileyke nes'a ve nahfidü nercû rahmeteke ve nahşâ azâbeke inne azâbeke bilküffâri mülhıg",
    turkish: "Allah'ım! Senden yardım isteriz, günahlarımızı bağışlamanı isteriz, razı olduğun şeylere hidayet etmeni isteriz. Sana inanırız, sana tevbe ederiz. Sana güveniriz. Bize verdiğin bütün nimetleri bilerek seni hayır ile överiz. Sana şükrederiz. Hiçbir nimetini inkar etmez ve onları başkasından bilmeyiz. Nimetlerini inkar eden ve sana karşı geleni bırakırız. Allah'ım! Biz yalnız sana kulluk ederiz. Namazı yalnız senin için kılarız, ancak sana secde ederiz. Yalnız sana koşar ve sana yaklaştıracak şeyleri kazanmaya çalışırız. İbadetlerini sevinçle yaparız. Rahmetinin devamını ve çoğalmasını dileriz. Azabından korkarız, şüphesiz senin azabın kafirlere ve inançsızlara ulaşır."
  }
};

const DAILY_VERSES = [
  { surah: "Nahl", surahNumber: 16, ayah: 90, arabic: "۞ إِنَّ ٱللَّهَ يَأْمُرُ بِٱلْعَدْلِ وَٱلْإِحْسَٰنِ وَإِيتَآئِ ذِى ٱلْقُرْبَىٰ وَيَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ وَٱلْبَغْىِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ", turkish: "Şüphesiz Allah, adaleti, iyilik yapmayı, yakınlara yardım etmeyi emreder; hayasızlığı, fenalık ve azgınlığı da yasaklar. O, düşünüp tutasınız diye size öğüt veriyor." },
  { surah: "Bakara", surahNumber: 2, ayah: 152, arabic: "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ", turkish: "Öyleyse yalnız beni anın ki ben de sizi anayım. Bana şükredin, sakın nankörlük etmeyin." },
  { surah: "Bakara", surahNumber: 2, ayah: 186, arabic: "وَإِذَا سَأَلَكَ عِبَادِى عَنِّى فَإِنِّى قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا۟ لِى وَلْيُؤْمِنُوا۟ بِى لَعَلَّهُمْ يَرْشُدُونَ", turkish: "Kullarım, beni senden sorarlarsa, (bilsinler ki), gerçekten ben (onlara çok) yakınım. Bana dua edince, dua edenin duasına cevap veririm. O halde, doğru yolu bulmaları için benim davetime uysunlar, bana iman etsinler." },
  { surah: "Bakara", surahNumber: 2, ayah: 286, arabic: "لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًۭا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَٰفِرِينَ", turkish: "Allah bir kimseyi ancak gücünün yettiği şeyle yükümlü kılar. Onun kazandığı iyilik kendi yararına, kötülük de kendi zararınadır. (Şöyle diyerek dua ediniz): \"Ey Rabbimiz! Unutur, ya da yanılırsak bizi sorumlu tutma! Ey Rabbimiz! Bize, bizden öncekilere yüklediğin gibi ağır yük yükleme. Ey Rabbimiz! Bize gücümüzün yetmediği şeyleri yükleme! Bizi affet, bizi bağışla, bize acı! Sen bizim Mevlâmızsın. Kâfirler topluluğuna karşı bize yardım et.\"" },
  { surah: "Al-i İmran", surahNumber: 3, ayah: 139, arabic: "وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ", turkish: "Gevşemeyin, hüzünlenmeyin. Eğer (gerçekten) iman etmiş kimseler iseniz üstün olan sizlersiniz." },
  { surah: "İnşirah", surahNumber: 94, ayah: 5, arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", turkish: "Şüphesiz güçlükle beraber bir kolaylık vardır." },
  { surah: "Rad", surahNumber: 13, ayah: 28, arabic: "ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ", turkish: "Onlar, inananlar ve kalpleri Allah'ı anmakla huzura kavuşanlardır. Biliniz ki, kalpler ancak Allah'ı anmakla huzur bulur." },
  { surah: "İbrahim", surahNumber: 14, ayah: 7, arabic: "وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِى لَشَدِيدٌۭ", turkish: "Hani Rabbiniz şöyle duyurmuştu: \"Andolsun, eğer şükrederseniz elbette size nimetimi artırırım. Eğer nankörlük ederseniz hiç şüphesiz azabım çok şiddetlidir.\"" },
  { surah: "Ankebut", surahNumber: 29, ayah: 45, arabic: "ٱتْلُ مَآ أُوحِىَ إِلَيْكَ مِنَ ٱلْكِتَٰبِ وَأَقِمِ ٱلصَّلَوٰةَ ۖ إِنَّ ٱلصَّلَوٰةَ تَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ ۗ وَلَذِكْرُ ٱللَّهِ أَكْبَرُ ۗ وَٱللَّهُ يَعْلَمُ مَا تَصْنَعُونَ", turkish: "(Ey Muhammed!) Kitaptan sana vahyolunanı oku, namazı da dosdoğru kıl. Çünkü namaz, insanı hayasızlıktan ve kötülükten alıkor. Allah'ı anmak (olan namaz) elbette en büyük ibadettir. Allah yaptıklarınızı biliyor." },
  { surah: "Talak", surahNumber: 65, ayah: 3, arabic: "وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ ۚ إِنَّ ٱللَّهَ بَٰلِغُ أَمْرِهِۦ ۚ قَدْ جَعَلَ ٱللَّهُ لِكُلِّ شَىْءٍۢ قَدْرًۭا", turkish: "Onu beklemediği yerden rızıklandırır. Kim Allah'a tevekkül ederse, O kendisine yeter. Şüphesiz Allah emrini yerine getirendir. Allah her şeye bir ölçü koymuştur." },
  { surah: "Zümer", surahNumber: 39, ayah: 53, arabic: "۞ قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ", turkish: "De ki: \"Ey kendilerinin aleyhine aşırı giden kullarım! Allah'ın rahmetinden ümidinizi kesmeyin. Şüphesiz Allah bütün günahları affeder. Çünkü O, çok bağışlayandır, çok merhamet edendir.\"" },
  { surah: "Mülk", surahNumber: 67, ayah: 1, arabic: "تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌ", turkish: "Hükümranlık elinde olan Allah, yücedir. O, her şeye hakkıyla gücü yetendir." },
  { surah: "Müminun", surahNumber: 23, ayah: 1, arabic: "قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ", turkish: "Mü'minler gerçekten kurtuluşa ermişlerdir." },
  { surah: "Hucurat", surahNumber: 49, ayah: 13, arabic: "يَٰٓأَيُّهَا ٱلنَّاسُ إِنَّا خَلَقْنَٰكُم مِّن ذَكَرٍۢ وَأُنثَىٰ وَجَعَلْنَٰكُمْ شُعُوبًۭا وَقَبَآئِلَ لِتَعَارَفُوٓا۟ ۚ إِنَّ أَكْرَمَكُمْ عِندَ ٱللَّهِ أَتْقَىٰكُمْ ۚ إِنَّ ٱللَّهَ عَلِيمٌ خَبِيرٌۭ", turkish: "Ey insanlar! Şüphe yok ki, biz sizi bir erkek ve bir dişiden yarattık ve birbirinizi tanımanız için sizi boylara ve kabilelere ayırdık. Allah katında en değerli olanınız, O'na karşı gelmekten en çok sakınanınızdır. Şüphesiz Allah hakkıyla bilendir, hakkıyla haberdâr olandır." },
  { surah: "Yunus", surahNumber: 10, ayah: 62, arabic: "أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ", turkish: "Bilesiniz ki, Allah'ın dostlarına hiçbir korku yoktur. Onlar üzülmeyeceklerdir de." },
  { surah: "Tevbe", surahNumber: 9, ayah: 40, arabic: "إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ ٱللَّهُ إِذْ أَخْرَجَهُ ٱلَّذِينَ كَفَرُوا۟ ثَانِىَ ٱثْنَيْنِ إِذْ هُمَا فِى ٱلْغَارِ إِذْ يَقُولُ لِصَٰحِبِهِۦ لَا تَحْزَنْ إِنَّ ٱللَّهَ مَعَنَا ۖ فَأَنزَلَ ٱللَّهُ سَكِينَتَهُۥ عَلَيْهِ وَأَيَّدَهُۥ بِجُنُودٍۢ لَّمْ تَرَوْهَا وَجَعَلَ كَلِمَةَ ٱلَّذِينَ كَفَرُوا۟ ٱلسُّفْلَىٰ ۗ وَكَلِمَةُ ٱللَّهِ هِىَ ٱلْعُلْيَا ۗ وَٱللَّهُ عَزِيزٌ حَكِيمٌ", turkish: "Eğer siz ona (Peygamber'e) yardım etmezseniz, (biliyorsunuz ki) inkar edenler onu iki kişiden biri olarak (Mekke'den) çıkardıkları zaman, ona bizzat Allah yardım etmişti. Hani onlar mağarada bulunuyorlardı. Hani o arkadaşına, \"Üzülme, çünkü Allah bizimle berâber\" diyordu. Allah da onun üzerine güven duygusu ve huzur indirmiş, sizin kendilerini görmediğiniz bir takım ordularla onu desteklemiş, böylece inkar edenlerin sözünü alçaltmıştı. Allah'ın sözü ise en yücedir. Allah mutlak güç sahibidir, hüküm ve hikmet sahibidir." },
  { surah: "Hadid", surahNumber: 57, ayah: 4, arabic: "هُوَ ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ فِى سِتَّةِ أَيَّامٍۢ ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ ۚ يَعْلَمُ مَا يَلِجُ فِى ٱلْأَرْضِ وَمَا يَخْرُجُ مِنْهَا وَمَا يَنزِلُ مِنَ ٱلسَّمَآءِ وَمَا يَعْرُجُ فِيهَا ۖ وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۚ وَٱللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌۭ", turkish: "O, gökleri ve yeri altı günde (altı evrede) yaratan, sonra Arş'a kurulandır. Yere gireni, ondan çıkanı, gökten ineni, oraya yükseleni bilir. Nerede olsanız, O sizinle beraberdir. Allah bütün yaptıklarınızı hakkıyla görendir." },
  { surah: "Taha", surahNumber: 20, ayah: 14, arabic: "إِنَّنِىٓ أَنَا ٱللَّهُ لَآ إِلَٰهَ إِلَّآ أَنَا۠ فَٱعْبُدْنِى وَأَقِمِ ٱلصَّلَوٰةَ لِذِكْرِىٓ", turkish: "\"Şüphe yok ki ben Allah'ım. Benden başka hiçbir ilah yoktur. O halde bana ibadet et ve beni anmak için namaz kıl.\"" },
  { surah: "Yasin", surahNumber: 36, ayah: 58, arabic: "سَلَٰمٌۭ قَوْلًۭا مِّن رَّبٍّۢ رَّحِيمٍۢ", turkish: "Çok merhametli olan Rab'den bir söz olarak (kendilerine) \"Selam\" (vardır)." },
  { surah: "Kehf", surahNumber: 18, ayah: 10, arabic: "إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةًۭ وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًۭا", turkish: "Hani o gençler mağaraya sığınmışlardı da, \"Ey Rabbimiz! Bize katından bir rahmet ver ve içinde bulunduğumuz şu durumda bize kurtuluş ve doğruluğa ulaşmayı kolaylaştır\" demişlerdi." },
  { surah: "Maide", surahNumber: 5, ayah: 2, arabic: "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تُحِلُّوا۟ شَعَٰٓئِرَ ٱللَّهِ وَلَا ٱلشَّهْرَ ٱلْحَرَامَ وَلَا ٱلْهَدْىَ وَلَا ٱلْقَلَٰٓئِدَ وَلَآ ءَآمِّينَ ٱلْبَيْتَ ٱلْحَرَامَ يَبْتَغُونَ فَضْلًۭا مِّن رَّبِّهِمْ وَرِضْوَٰنًۭا ۚ وَإِذَا حَلَلْتُمْ فَٱصْطَادُوا۟ ۚ وَلَا يَجْرِمَنَّكُمْ شَنَـَٔانُ قَوْمٍ أَن صَدُّوكُمْ عَنِ ٱلْمَسْجِدِ ٱلْحَرَامِ أَن تَعْتَدُوا۟ ۘ وَتَعَاوَنُوا۟ عَلَى ٱلْبِرِّ وَٱلتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا۟ عَلَى ٱلْإِثْمِ وَٱلْعُدْوَٰنِ ۚ وَٱتَّقُوا۟ ٱللَّهَ ۖ إِنَّ ٱللَّهَ شَدِيدُ ٱلْعِقَابِ", turkish: "Ey iman edenler! Allah'ın (koyduğu din) nişanelerine, haram aya, hac kurbanına, (bu kurbanlıklara takılı) gerdanlıklara ve de Rab'lerinden bol nimet ve hoşnutluk isteyerek Kâ'be'ye gelenlere sakın saygısızlık etmeyin. İhramdan çıktığınızda (isterseniz) avlanın. Sizi Mescid-i Haram'dan alıkoydular diye bir takımlarına beslediğiniz kin, sakın ha sizi, haddi aşmaya sürüklemesin. İyilik ve takva (Allah'a karşı gelmekten sakınma) üzere yardımlaşın. Ama günah ve düşmanlık üzere yardımlaşmayın. Allah'a karşı gelmekten sakının. Çünkü Allah'ın cezası çok şiddetlidir." },
  { surah: "Nur", surahNumber: 24, ayah: 35, arabic: "۞ ٱللَّهُ نُورُ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۚ مَثَلُ نُورِهِۦ كَمِشْكَوٰةٍۢ فِيهَا مِصْبَاحٌ ۖ ٱلْمِصْبَاحُ فِى زُجَاجَةٍ ۖ ٱلزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌۭ دُرِّىٌّۭ يُوقَدُ مِن شَجَرَةٍۢ مُّبَٰرَكَةٍۢ زَيْتُونَةٍۢ لَّا شَرْقِيَّةٍۢ وَلَا غَرْبِيَّةٍۢ يَكَادُ زَيْتُهَا يُضِىٓءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌۭ ۚ نُّورٌ عَلَىٰ نُورٍۢ ۗ يَهْدِى ٱللَّهُ لِنُورِهِۦ مَن يَشَآءُ ۚ وَيَضْرِبُ ٱللَّهُ ٱلْأَمْثَٰلَ لِلنَّاسِ ۗ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌۭ", turkish: "Allah göklerin ve yerin nurudur. Onun nurunun temsili şudur: Duvarda bir hücre; içinde bir kandil, kandil de bir cam fânûs içinde. Fânûs sanki inci gibi parlayan bir yıldız. Mübarek bir ağaçtan, ne doğuya, ne de batıya ait olan zeytin ağacından tutuşturulur. Bu ağacın yağı, ateş dokunmasa bile, neredeyse aydınlatacak (kadar berrak) tır. Nur üstüne nur. Allah dilediği kimseyi nuruna iletir. Allah insanlar için misaller verir. Allah her şeyi hakkıyla bilendir." },
  { surah: "Lokman", surahNumber: 31, ayah: 17, arabic: "يَٰبُنَىَّ أَقِمِ ٱلصَّلَوٰةَ وَأْمُرْ بِٱلْمَعْرُوفِ وَٱنْهَ عَنِ ٱلْمُنكَرِ وَٱصْبِرْ عَلَىٰ مَآ أَصَابَكَ ۖ إِنَّ ذَٰلِكَ مِنْ عَزْمِ ٱلْأُمُورِ", turkish: "\"Yavrum! Namazı dosdoğru kıl. İyiliği emret. Kötülükten alıkoy. Başına gelen musibetlere karşı sabırlı ol. Çünkü bunlar kesin olarak emredilmiş işlerdendir.\"" },
  { surah: "Müzzemmil", surahNumber: 73, ayah: 8, arabic: "وَٱذْكُرِ ٱسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًۭا", turkish: "Rabbinin adını an ve bütün benliğinle O'na yönel." },
  { surah: "Furkan", surahNumber: 25, ayah: 74, arabic: "وَٱلَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّٰتِنَا قُرَّةَ أَعْيُنٍۢ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا", turkish: "Onlar, \"Ey Rabbimiz! Eşlerimizi ve çocuklarımızı bize göz aydınlığı kıl ve bizi Allah'a karşı gelmekten sakınanlara önder eyle\" diyenlerdir." },
  { surah: "Haşr", surahNumber: 59, ayah: 22, arabic: "هُوَ ٱللَّهُ ٱلَّذِى لَآ إِلَٰهَ إِلَّا هُوَ ۖ عَٰلِمُ ٱلْغَيْبِ وَٱلشَّهَٰدَةِ ۖ هُوَ ٱلرَّحْمَٰنُ ٱلرَّحِيمُ", turkish: "O, kendisinden başka hiçbir ilah olmayan Allah'tır. Gaybı da, görünen âlemi de bilendir. O, Rahmân'dır, Rahîm'dir." },
  { surah: "Nisa", surahNumber: 4, ayah: 32, arabic: "وَلَا تَتَمَنَّوْا۟ مَا فَضَّلَ ٱللَّهُ بِهِۦ بَعْضَكُمْ عَلَىٰ بَعْضٍۢ ۚ لِّلرِّجَالِ نَصِيبٌۭ مِّمَّا ٱكْتَسَبُوا۟ ۖ وَلِلنِّسَآءِ نَصِيبٌۭ مِّمَّا ٱكْتَسَبْنَ ۚ وَسْـَٔلُوا۟ ٱللَّهَ مِن فَضْلِهِۦٓ ۗ إِنَّ ٱللَّهَ كَانَ بِكُلِّ شَىْءٍ عَلِيمًۭا", turkish: "Allah'ın, kiminizi kiminize üstün kılmaya vesile yaptığı şeyleri (haset ederek) arzu edip durmayın. Erkeklere kazandıklarından bir pay vardır. Kadınlara da kazandıklarından bir pay vardır. Allah'tan, onun lütfunu isteyin. Şüphesiz Allah her şeyi hakkıyla bilendir." },
  { surah: "Şura", surahNumber: 42, ayah: 19, arabic: "ٱللَّهُ لَطِيفٌۢ بِعِبَادِهِۦ يَرْزُقُ مَن يَشَآءُ ۖ وَهُوَ ٱلْقَوِىُّ ٱلْعَزِيزُ", turkish: "Allah kullarına çok lütufkârdır, dilediğini rızıklandırır. O, kuvvetlidir, mutlak güç sahibidir." },
  { surah: "Fetih", surahNumber: 48, ayah: 29, arabic: "مُّحَمَّدٌۭ رَّسُولُ ٱللَّهِ ۚ وَٱلَّذِينَ مَعَهُۥٓ أَشِدَّآءُ عَلَى ٱلْكُفَّارِ رُحَمَآءُ بَيْنَهُمْ ۖ تَرَىٰهُمْ رُكَّعًۭا سُجَّدًۭا يَبْتَغُونَ فَضْلًۭا مِّنَ ٱللَّهِ وَرِضْوَٰنًۭا ۖ سِيمَاهُمْ فِى وُجُوهِهِم مِّنْ أَثَرِ ٱلسُّجُودِ ۚ ذَٰلِكَ مَثَلُهُمْ فِى ٱلتَّوْرَىٰةِ ۚ وَمَثَلُهُمْ فِى ٱلْإِنجِيلِ كَزَرْعٍ أَخْرَجَ شَطْـَٔهُۥ فَـَٔازَرَهُۥ فَٱسْتَغْلَظَ فَٱسْتَوَىٰ عَلَىٰ سُوقِهِۦ يُعْجِبُ ٱلزُّرَّاعَ لِيَغِيظَ بِهِمُ ٱلْكُفَّارَ ۗ وَعَدَ ٱللَّهُ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ مِنْهُم مَّغْفِرَةًۭ وَأَجْرًا عَظِيمًۢا", turkish: "Muhammed, Allah'ın Resülüdür. Onunla beraber olanlar, inkârcılara karşı çetin, birbirlerine karşı da merhametlidirler. Onların, rükû ve secde halinde, Allah'tan lütuf ve hoşnutluk istediklerini görürsün. Onların secde eseri olan alametleri yüzlerindedir. İşte bu, onların Tevrat'ta ve İncil'de anlatılan durumlarıdır: Onlar filizini çıkarmış, onu kuvvetlendirmiş, kalınlaşmış, gövdesi üzerine dikilmiş, ziraatçıların hoşuna gelen bir ekin gibidirler. Allah kendileri sebebiyle inkarcıları öfkelendirmek için onları böyle sağlam ve dirençli kılar. Allah, içlerinden iman edip salih amel işleyenlere bir bağışlama ve büyük bir mükafat vaad etmiştir." }
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
