// Shared data for projects to ensure consistency across pages
export const projectsData = [
  {
    id: 1,
    title: "MODERN KLÍMATECHNIKA",
    slug: "modern-klimatechnika",
    category: "LAKOSSÁGI",
    coverImage: "/images/ref1.jpg",
    gallery: [
      "/images/ref1.jpg",
      "https://images.unsplash.com/photo-1599818818579-d41933b4972d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
    ],
    description: "Nappali split klíma láthatatlan csövezéssel, Wi-Fi vezérléssel integrálva okosotthon rendszerbe.",
    fullDescription: "Egy modern családi ház komplett hűtési megoldásának kiépítése volt a feladat. A megrendelő kiemelt kérése volt, hogy a gépészet a lehető legkevésbé legyen látható, ugyanakkor a hatékonyság ne sérüljön. A Daikin Stylish beltéri egységek tökéletesen illeszkednek a minimál enteriőrbe, miközben a rejtett csövezésnek köszönhetően semmilyen vezeték nem rontja az összképet.",
    technologies: ["Daikin Stylish", "R32 hűtőközeg", "Wi-Fi vezérlés", "Rejtett kondenzvíz elvezetés"],
    location: "Budapest, XII. kerület",
    year: "2024"
  },
  {
    id: 2,
    title: "HŐSZIVATTYÚ RENDSZER",
    slug: "hoszivattyu-rendszer",
    category: "ENERGIATAKARÉKOS",
    coverImage: "/images/ref2.jpg",
    gallery: [
      "/images/ref2.jpg",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Monoblokk hőszivattyú telepítése puffer tartállyal, HMV készítéssel és padlófűtés vezérléssel.",
    fullDescription: "Teljes fűtéskorszerűsítés egy 180 nm-es családi házban. A régi gázkazánt egy modern, levegő-víz hőszivattyúra cseréltük. A rendszer része egy 200 literes használati melegvíz tartály és egy 100 literes puffertartály a fűtési kör stabilizálására. A padlófűtés zónánkénti vezérlést kapott a maximális komfort érdekében.",
    technologies: ["Panasonic Aquarea", "Monoblokk", "Zónavezérlés", "HMV készítés"],
    location: "Szentendre",
    year: "2023"
  },
  {
    id: 3,
    title: "IPARI GÉPÉSZET",
    slug: "ipari-gepeszet",
    category: "NAGY TELJESÍTMÉNY",
    coverImage: "/images/ref3.jpg",
    gallery: [
      "/images/ref3.jpg",
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Kensol hőszivattyú kültéri egység speciális rezgéscsillapított állványzaton, fagyvédelemmel.",
    fullDescription: "Ipari létesítmény hűtési és fűtési igényeinek kiszolgálása nagy teljesítményű hőszivattyúkkal. A kültéri egységek speciális, egyedileg gyártott horganyzott acél állványzatra kerültek, rezgéscsillapító gumibakokkal. A rendszer fagyvédelmét glikolos feltöltés és elektromos kísérőfűtés biztosítja a kritikus szakaszokon.",
    technologies: ["Kensol High Power", "Rezgéscsillapítás", "Fagyvédelem", "Ipari automatika"],
    location: "Debrecen, Ipari Park",
    year: "2024"
  },
  {
    id: 4,
    title: "IRODAHÁZ VRF RENDSZER",
    slug: "irodahaz-vrf",
    category: "KERESKEDELMI",
    coverImage: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c54be3855091?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Többzónás VRF rendszer kiépítése központi vezérléssel egy 2000 m2-es irodaház számára.",
    fullDescription: "Egy háromszintes irodaház komplett klimatizálása VRF rendszerrel. A rendszer lehetővé teszi, hogy az egyes irodákban egymástól függetlenül lehessen hűteni vagy fűteni. A központi vezérlőrendszeren keresztül az üzemeltető nyomon követheti az energiafogyasztást és időzített programokat állíthat be.",
    technologies: ["VRF/VRV Rendszer", "3-csöves technológia", "BMS integráció", "Kazettás beltérik"],
    location: "Budaörs",
    year: "2023"
  },
  {
    id: 5,
    title: "MEDENCE FŰTÉS",
    slug: "medence-futes",
    category: "SPECIALITÁS",
    coverImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-e328701102b9?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Speciális titán hőcserélős hőszivattyú telepítése kültéri medence gazdaságos fűtésére.",
    fullDescription: "Kültéri úszómedence fűtésének megoldása a tavaszi és őszi szezon meghosszabbítására. A telepített hőszivattyú speciális titán hőcserélővel rendelkezik, amely ellenáll a klóros vagy sós víznek is. A rendszer képes a medence vizét állandó 28°C-on tartani minimális energiafelhasználás mellett.",
    technologies: ["Titán hőcserélő", "Inverteres kompresszor", "Bypass ág", "Smart vezérlés"],
    location: "Balatonfüred",
    year: "2023"
  },
  {
    id: 6,
    title: "CSARNOK SZELLŐZTETÉS",
    slug: "csarnok-szelloztetes",
    category: "IPARI",
    coverImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=2070&auto=format&fit=crop"
    ],
    description: "Nagy teljesítményű légkezelő gépek telepítése hővisszanyeréssel ipari gyártócsarnokban.",
    fullDescription: "Egy 5000 légköbméteres gyártócsarnok légcseréjének biztosítása. A telepített légkezelő berendezések forgódobos hővisszanyerővel rendelkeznek, így télen a kifújt levegő hőjét visszanyerve fűtik fel a friss levegőt, jelentős energiamegtakarítást eredményezve.",
    technologies: ["Hővisszanyerés", "Forgódobos hőcserélő", "Textil légcsatorna", "CO2 érzékelés"],
    location: "Győr",
    year: "2024"
  }
];

export const blogData = [
  {
    id: 1,
    title: "Hőszivattyú vs. Gázfűtés: Melyik éri meg jobban 2026-ban?",
    slug: "hoszivattyu-vs-gazfutes-2026",
    category: "SZAKMAI TANÁCSOK",
    coverImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
    date: "2026. Január 15.",
    readTime: "5 perc olvasás",
    excerpt: "Részletes összehasonlítás a modern hőszivattyús rendszerek és a hagyományos kondenzációs gázkazánok között. Megtérülés, hatékonyság és fenntarthatóság.",
    fullDescription: "A fűtési rendszerek korszerűsítése során a legtöbb ingatlantulajdonos dilemmája: maradjunk a bevált gázfűtésnél, vagy váltsunk modern hőszivattyúra? Ebben a cikkben részletesen körbejárjuk a témát, figyelembe véve a bekerülési költségeket, az üzemeltetési kiadásokat és a környezetvédelmi szempontokat is.\n\nA hőszivattyúk technológiai fejlődése az elmúlt években robbanásszerű volt. A modern levegő-víz hőszivattyúk már -20°C alatt is képesek hatékonyan fűteni, miközben nyáron hűtésre is használhatók. Ezzel szemben a gázfűtés egy kiforrott, de fosszilis energiahordozóra épülő technológia, amelynek jövője bizonytalanabb az európai uniós szabályozások tükrében.",
    technologies: ["SCOP érték", "H-tarifa", "Kondenzációs technika", "Energiahatékonyság"],
    sections: [
      {
        title: "A hőszivattyú előnyei",
        content: "A hőszivattyús rendszerek legfőbb előnye a kiemelkedő energiahatékonyság. Míg egy modern gázkazán maximum 98-99%-os hatásfokkal működik, addig egy hőszivattyú COP értéke (teljesítménytényezője) 3 és 5 között mozog. Ez azt jelenti, hogy 1 kWh elektromos áram felhasználásával 3-5 kWh hőenergiát képes előállítani."
      },
      {
        title: "Költségek összehasonlítása",
        content: "Bár a hőszivattyú beruházási költsége magasabb (általában 2-3 millió Ft-tól indul), a H-tarifás áramelszámolás és a napelemekkel való kombinálhatóság miatt az üzemeltetési költsége töredéke lehet a gázfűtésének. Egy átlagos szigetelésű, 100 nm-es családi ház esetén az éves fűtési költség akár 40-50%-kal is csökkenthető."
      }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35a5f9b2a04?q=80&w=2069&auto=format&fit=crop"
    ]
  }
];
