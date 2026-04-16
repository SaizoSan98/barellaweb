import { db } from '@/db';
import { siteSettings, services, processSteps, faqItems } from '@/db/schema';

export async function seedSiteData() {
  // Site settings
  const settingsData = [
    { key: 'hero_title', value: 'BARELLA' },
    { key: 'hero_subtitle', value: 'Modern épületgépészet és klímatechnika' },
    { key: 'hero_description', value: 'A jövő épületgépészete. Kompromisszumok nélküli minőség, ipari precizitás és megbízható szakértelem minden projektben.' },
    { key: 'hero_cta_text', value: 'AJÁNLATKÉRÉS' },
    { key: 'contact_email', value: 'barella.gep@gmail.com' },
    { key: 'contact_phone', value: '+36 30 123 4567' },
    { key: 'contact_address', value: 'Budapest, Magyarország' },
    { key: 'footer_description', value: 'Ipari precizitású épületgépészeti megoldások. Innovatív technológiák és megbízható szakértelem egy helyen.' },
    { key: 'footer_facebook', value: '#' },
    { key: 'footer_instagram', value: '#' },
    { key: 'footer_linkedin', value: '#' },
    { key: 'cta_title', value: 'Valósítsuk meg elképzeléseit.' },
    { key: 'cta_description', value: 'Legyen szó tervezésről vagy kivitelezésről, mi készen állunk a kihívásokra.' },
    { key: 'brands_title', value: 'Kiemelt Technológiai Partnereink' },
    { key: 'product_card_vat_label', value: 'ÁFA-val' },
    { key: 'product_card_availability_info', value: 'A termék elérhetőségéről tájékozódjon telefonon, vagy valamelyik elérhetőségünkön!' },
    { key: 'product_modal_vat_info', value: 'Az árak tartalmazzák az ÁFÁT!' },
  ];

  for (const setting of settingsData) {
    await db.insert(siteSettings)
      .values(setting)
      .onConflictDoNothing();
  }
  console.log('✅ Site settings seeded');

  // Services
  const existingServices = await db.select().from(services).limit(1);
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        title: 'KLÍMATECHNIKA',
        subtitle: 'Intelligens Hűtés',
        description: 'Lakossági és ipari klímarendszerek szakszerű telepítése, helyszíni felméréstől a teljes kivitelezésig.',
        fullDescription: `Minden egyes telepítésünknél a tiszta, precíz és pontos munkavégzés az alapelvünk. Fontos számunkra, hogy ügyfeleink ne csak egy jól működő rendszert kapjanak, hanem egy esztétikusan és szakszerűen kivitelezett megoldást is.

A munkát minden esetben helyszíni felméréssel kezdjük, ahol felmérjük az adott ingatlan adottságait, és a legoptimálisabb megoldást javasoljuk.

A telepítés során szigorúan betartjuk a szakmai előírásokat:
• szakszerű csővezetés és rögzítés
• esztétikus kivitelezés
• teljes körű villanyszerelési munkák
• nitrogénes nyomáspróba a rendszer tömítettségének ellenőrzésére

Minden általunk telepített berendezésre garanciát vállalunk.`,
        image: '/images/ref1.jpg',
        details: ['Daikin, Gree, Mitsubishi rendszerek', 'Rejtett csövezés', 'Wi-Fi vezérlés', 'Teljes körű villanyszerelés'],
        gallery: ['/images/ref1.jpg', '/images/ref2.jpg', '/images/ref3.jpg'],
        colSpan: 'md:col-span-2',
        order: 1,
      },
      {
        title: 'HŐSZIVATTYÚK',
        subtitle: 'Zöld Energia',
        description: 'Split és monoblokkos hőszivattyúk telepítése teljes körű kivitelezéssel, hőigény-számítással.',
        fullDescription: `Split és monoblokkos hőszivattyúk telepítését is vállaljuk, teljes körű kivitelezéssel. Munkánk során a precizitás, megbízhatóság és a szakmai szabályok maximális betartása az elsődleges szempont.

Minden projektet alapos helyszíni felméréssel és hőigény-számítással kezdünk.

A kivitelezés során teljes körű gépészeti kialakítást végzünk:
• hőszivattyú telepítést (split és monoblokkos rendszerek)
• komplett csőhálózat kiépítést
• villanyszerelési munkákat
• rendszerbe integrálást (padlófűtés, radiátoros rendszer, HMV)`,
        image: '/images/heatpump.jpeg',
        details: ['COP 4.0+ hatékonyság', 'Hőigény-számítás', 'Padlófűtéshez optimalizálva', 'Teljes körű villanyszerelés'],
        gallery: ['/images/heatpump.jpeg', '/images/ref1.jpg'],
        colSpan: 'md:col-span-1',
        order: 2,
      },
      {
        title: 'PADLÓFŰTÉS',
        subtitle: 'Láthatatlan Komfort',
        description: 'Padlófűtés rendszerek komplett kivitelezése szigeteléstől a csőfektetésig és beüzemelésig.',
        fullDescription: `Padlófűtés rendszerek teljes körű kivitelezését vállaljuk, a szigeteléstől egészen a csőfektetésig és beüzemelésig.

Dolgozunk hagyományos, rendszerlemezes és tackeres technológiával is.

A munkafolyamat során:
• elkészítjük a megfelelő padlószigetelést
• precízen lefektetjük a csőhálózatot
• biztosítjuk az egyenletes hőeloszlást
• betartjuk a szakmai előírásokat`,
        image: '/images/tacker1.jpg',
        details: ['Tacker, lemez és hagyományos technológia', 'Osztó-gyűjtő szerelés', 'Hőigény-számítás', 'Betonozás'],
        gallery: ['/images/tacker1.jpg', '/images/padlofutes.jpg'],
        colSpan: 'md:col-span-1',
        order: 3,
      },
      {
        title: 'MENNYEZETFŰTÉS',
        subtitle: 'Sugárzó Technológia',
        description: 'Mennyezeti hűtés-fűtés rendszerek kivitelezése huzatmentes, egyenletes hőérzetért.',
        fullDescription: `A mennyezeti hűtés-fűtés korszerű, energiatakarékos és esztétikus megoldás, amely huzatmentesen biztosítja az egyenletes hőérzetet az egész helyiségben.

Vállaljuk mennyezeti hűtő-fűtő rendszerek teljes körű kivitelezését, új építésnél és meglévő ingatlanok átalakításánál is.`,
        image: '/images/mennyezetfutes.jpg',
        details: ['Hűtés és fűtés egy rendszerben', 'Nincs légmozgás', 'Ideális allergiásoknak', 'Esztétikus megoldás'],
        gallery: ['/images/mennyezetfutes.jpg', '/images/ref1.jpg'],
        colSpan: 'md:col-span-2',
        order: 4,
      },
      {
        title: 'KLÍMATISZTÍTÁS',
        subtitle: 'Higiénikus Levegő',
        description: 'Alapos, vegyszeres klímamosás szétszereléssel, fertőtlenítéssel a hatékony és egészséges működésért.',
        fullDescription: `A klímaberendezések rendszeres tisztítása elengedhetetlen a hatékony működés és az egészséges levegő biztosítása érdekében.

A tisztítás során:
• speciális tisztítószerekkel mossuk át a hőcserélőt
• eltávolítjuk a lerakódott szennyeződéseket és penészt
• fertőtlenítjük a készüléket
• kitisztítjuk a kondenzvíz elvezetést`,
        image: '/images/climate2.jpg',
        details: ['Teljes szétszerelés', 'Vegyszeres mosás', 'Fertőtlenítés', 'Penész eltávolítás'],
        gallery: ['/images/climate2.jpg', '/images/ref1.jpg'],
        colSpan: 'md:col-span-1',
        order: 5,
      },
      {
        title: 'VILLANYSZERELÉS',
        subtitle: 'Biztonságos Áram',
        description: 'Lakossági villanyszerelési munkák kivitelezése, kisebb bővítésektől a teljes hálózatok felújításáig.',
        fullDescription: `Vállaljuk lakossági villanyszerelési munkák kivitelezését, a kisebb bővítésektől egészen a komplett hálózatok felújításáig.

Szolgáltatásaink:
• teljes villanyhálózat kiépítése és felújítása
• elosztószekrények szerelése, bővítése
• klímák és hőszivattyúk elektromos betáplálásának kiépítése`,
        image: '/images/villany.jpg',
        details: ['Teljes hálózat kiépítése', 'Elosztószekrény szerelés', 'Klíma és hőszivattyú betáplálás', 'Szabványos kivitelezés'],
        gallery: ['/images/villany.jpg', '/images/ref1.jpg'],
        colSpan: 'md:col-span-1',
        order: 6,
      },
      {
        title: 'VÍZVEZETÉK ÉS CSATORNA',
        subtitle: 'Alaprendszerek',
        description: 'Víz- és szennyvízrendszerek kiépítése vízórától a végpontokig, új építés és felújítás esetén.',
        fullDescription: `A víz- és csatornahálózat az épület egyik legfontosabb alap rendszere. Vállaljuk teljes víz- és szennyvízrendszerek kiépítését a vízórától egészen a végpontokig.

• hideg- és melegvíz hálózat kiépítése
• szennyvíz és csatornarendszer kialakítása
• szerelvényezés (csaptelepek, WC-k, mosdók, zuhanyok beépítése)`,
        image: '/images/vizvezetek.jpg',
        details: ['Hideg- és melegvíz hálózat', 'Szennyvízrendszer', 'Szerelvényezés', 'Gépészeti helyiségek'],
        gallery: ['/images/vizvezetek.jpg', '/images/ref1.jpg'],
        colSpan: 'md:col-span-1',
        order: 7,
      },
    ]);
    console.log('✅ Services seeded');
  }

  // Process steps
  const existingSteps = await db.select().from(processSteps).limit(1);
  if (existingSteps.length === 0) {
    await db.insert(processSteps).values([
      { title: 'Kapcsolatfelvétel', description: 'Kérjen ajánlatot online vagy telefonon. 24 órán belül visszahívjuk.', order: 1 },
      { title: 'Ingyenes Felmérés', description: 'Szakértő kollégánk a helyszínen méri fel az igényeket és lehetőségeket.', order: 2 },
      { title: 'Tervezés & Ajánlat', description: 'Pontos, rejtett költségektől mentes árajánlatot és ütemtervet készítünk.', order: 3 },
      { title: 'Kivitelezés & Garancia', description: 'Tiszta, precíz munka a megbeszélt határidőre, teljes körű garanciával.', order: 4 },
    ]);
    console.log('✅ Process steps seeded');
  }

  // FAQ items
  const existingFaqs = await db.select().from(faqItems).limit(1);
  if (existingFaqs.length === 0) {
    await db.insert(faqItems).values([
      {
        question: 'Mennyi idő alatt készül el egy klíma telepítés?',
        answer: 'Egy átlagos split klíma telepítése 3-5 órát vesz igénybe. Ez magában foglalja a kültéri és beltéri egység felszerelését, a csövezést, a vákuumozást és a beüzemelést is.',
        order: 1,
      },
      {
        question: 'Milyen márkákkal dolgoznak?',
        answer: 'Kizárólag megbízható, minőségi gyártók termékeit telepítjük. Kiemelt partnereink: Daikin, Mitsubishi Electric, Panasonic, Gree, Bosch.',
        order: 2,
      },
      {
        question: 'Van garancia a munkára?',
        answer: 'Természetesen. Minden általunk végzett telepítésre szerelési garanciát vállalunk. A készülékekre a gyártói garancia érvényes (általában 3-5 év), melynek feltétele az évenkénti karbantartás elvégzése.',
        order: 3,
      },
      {
        question: 'Ingyenes a felmérés?',
        answer: 'Budapesten és Pest megyében a helyszíni felmérés díjmentes, amennyiben elfogadja árajánlatunkat.',
        order: 4,
      },
      {
        question: 'Hőszivattyúhoz intézik a H-tarifát?',
        answer: 'Igen, teljes körű ügyintézést vállalunk. A H-tarifa igényléséhez szükséges kivitelezői nyilatkozatot és egyéb dokumentációt mi állítjuk ki.',
        order: 5,
      },
    ]);
    console.log('✅ FAQ items seeded');
  }

  console.log('🎉 Site data seeding completed!');
}

if (require.main === module) {
  seedSiteData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error seeding site data:', error);
      process.exit(1);
    });
}
