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
