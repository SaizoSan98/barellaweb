import { db } from '@/db';
import { cmsPages, cmsSections, cmsContents } from '@/db/cms-schema';

export async function seedCMS() {
  console.log('🌱 Seeding CMS data...');

  // Create home page
  const [homePage] = await db.insert(cmsPages).values({
    slug: 'home',
    title: 'Kezdőlap',
    description: 'Főoldal',
    order: 0,
    published: true,
  }).returning();

  console.log('✅ Home page created:', homePage.id);

  // Create Hero section
  const [heroSection] = await db.insert(cmsSections).values({
    pageId: homePage.id,
    slug: 'hero',
    title: 'Hero szekció',
    order: 0,
    published: true,
  }).returning();

  console.log('✅ Hero section created:', heroSection.id);

  // Create Hero contents
  await db.insert(cmsContents).values([
    {
      sectionId: heroSection.id,
      key: 'hero_title',
      type: 'text',
      value: 'BARELLA',
      order: 0,
      published: true,
    },
    {
      sectionId: heroSection.id,
      key: 'hero_cta_text',
      type: 'text',
      value: 'AJÁNLATKÉRÉS',
      order: 1,
      published: true,
    },
  ]);

  console.log('✅ Hero contents created');

  // Create Contact section
  const [contactSection] = await db.insert(cmsSections).values({
    pageId: homePage.id,
    slug: 'contact',
    title: 'Kapcsolat szekció',
    order: 1,
    published: true,
  }).returning();

  console.log('✅ Contact section created:', contactSection.id);

  // Create Contact contents
  await db.insert(cmsContents).values([
    {
      sectionId: contactSection.id,
      key: 'contact_email',
      type: 'text',
      value: 'barella.gep@gmail.com',
      order: 0,
      published: true,
    },
    {
      sectionId: contactSection.id,
      key: 'contact_phone',
      type: 'text',
      value: '+36 30 173 88 66',
      order: 1,
      published: true,
    },
    {
      sectionId: contactSection.id,
      key: 'contact_address',
      type: 'text',
      value: 'Magyarország',
      order: 2,
      published: true,
    },
  ]);

  console.log('✅ Contact contents created');

  // Create Brands section
  const [brandsSection] = await db.insert(cmsSections).values({
    pageId: homePage.id,
    slug: 'brands',
    title: 'Technológiai partnerek',
    order: 2,
    published: true,
  }).returning();

  console.log('✅ Brands section created:', brandsSection.id);

  // Create Brands contents
  await db.insert(cmsContents).values([
    {
      sectionId: brandsSection.id,
      key: 'brands_title',
      type: 'text',
      value: 'Kiemelt Technológiai Partnereink',
      order: 0,
      published: true,
    },
  ]);

  console.log('✅ Brands contents created');

  // Create Process section
  const [processSection] = await db.insert(cmsSections).values({
    pageId: homePage.id,
    slug: 'process',
    title: 'Hogyan dolgozunk',
    order: 3,
    published: true,
  }).returning();

  console.log('✅ Process section created:', processSection.id);

  // Create Process contents
  await db.insert(cmsContents).values([
    {
      sectionId: processSection.id,
      key: 'process_subtitle',
      type: 'text',
      value: 'Hogyan dolgozunk?',
      order: 0,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_title',
      type: 'text',
      value: 'A közös munka lépései',
      order: 1,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_1_title',
      type: 'text',
      value: 'Kapcsolatfelvétel',
      order: 2,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_1_desc',
      type: 'text',
      value: 'Kérjen ajánlatot online vagy telefonon. 24 órán belül visszahívjuk.',
      order: 3,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_2_title',
      type: 'text',
      value: 'Ingyenes Felmérés',
      order: 4,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_2_desc',
      type: 'text',
      value: 'Szakértő kollégánk a helyszínen méri fel az igényeket és lehetőségeket.',
      order: 5,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_3_title',
      type: 'text',
      value: 'Tervezés & Ajánlat',
      order: 6,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_3_desc',
      type: 'text',
      value: 'Pontos, rejtett költségektől mentes árajánlatot és ütemtervet készítünk.',
      order: 7,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_4_title',
      type: 'text',
      value: 'Kivitelezés & Garancia',
      order: 8,
      published: true,
    },
    {
      sectionId: processSection.id,
      key: 'process_step_4_desc',
      type: 'text',
      value: 'Tiszta, precíz munka a megbeszélt határidőre, teljes körű garanciával.',
      order: 9,
      published: true,
    },
  ]);

  console.log('✅ Process contents created');

  // Create FAQ section
  const [faqSection] = await db.insert(cmsSections).values({
    pageId: homePage.id,
    slug: 'faq',
    title: 'GYIK',
    order: 4,
    published: true,
  }).returning();

  console.log('✅ FAQ section created:', faqSection.id);

  // Create FAQ contents
  await db.insert(cmsContents).values([
    {
      sectionId: faqSection.id,
      key: 'faq_subtitle',
      type: 'text',
      value: 'Tudnivalók',
      order: 0,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_title',
      type: 'text',
      value: 'Gyakori kérdések',
      order: 1,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_1_question',
      type: 'text',
      value: 'Mennyi idő alatt készül el egy klíma telepítés?',
      order: 2,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_1_answer',
      type: 'text',
      value: 'Egy átlagos split klíma telepítése 3-5 órát vesz igénybe. Ez magában foglalja a kültéri és beltéri egység felszerelését, a csövezést, a vákuumozást és a beüzemelést is.',
      order: 3,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_2_question',
      type: 'text',
      value: 'Milyen márkákkal dolgoznak?',
      order: 4,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_2_answer',
      type: 'text',
      value: 'Kizárólag megbízható, minőségi gyártók termékeit telepítjük. Kiemelt partnereink: Daikin, Mitsubishi Electric, Panasonic, Gree, Bosch.',
      order: 5,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_3_question',
      type: 'text',
      value: 'Van garancia a munkára?',
      order: 6,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_3_answer',
      type: 'text',
      value: 'Természetesen. Minden általunk végzett telepítésre szerelési garanciát vállalunk. A készülékekre a gyártói garancia érvényes (általában 3-5 év).',
      order: 7,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_4_question',
      type: 'text',
      value: 'Ingyenes a felmérés?',
      order: 8,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_4_answer',
      type: 'text',
      value: 'Budapesten és Pest megyében a helyszíni felmérés díjmentes, amennyiben elfogadja árajánlatunkat.',
      order: 9,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_5_question',
      type: 'text',
      value: 'Hőszivattyúhoz intézik a H-tarifát?',
      order: 10,
      published: true,
    },
    {
      sectionId: faqSection.id,
      key: 'faq_5_answer',
      type: 'text',
      value: 'Igen, teljes körű ügyintézést vállalunk. A H-tarifa igényléséhez szükséges kivitelezői nyilatkozatot és egyéb dokumentációt mi állítjuk ki.',
      order: 11,
      published: true,
    },
  ]);

  console.log('✅ FAQ contents created');

  // Create services page
  const [servicesPage] = await db.insert(cmsPages).values({
    slug: 'services',
    title: 'Szolgáltatások',
    description: 'Szolgáltatások oldala',
    order: 1,
    published: true,
  }).returning();

  console.log('✅ Services page created:', servicesPage.id);

  // Create Services section
  const [servicesSection] = await db.insert(cmsSections).values({
    pageId: servicesPage.id,
    slug: 'services_list',
    title: 'Szolgáltatások lista',
    order: 0,
    published: true,
  }).returning();

  console.log('✅ Services section created:', servicesSection.id);

  // Create Services contents (placeholder for service images)
  await db.insert(cmsContents).values([
    {
      sectionId: servicesSection.id,
      key: 'service_1_image',
      type: 'image',
      value: '/images/services/klimatechnika.jpg',
      order: 0,
      published: true,
    },
    {
      sectionId: servicesSection.id,
      key: 'service_2_image',
      type: 'image',
      value: '/images/services/hoszivattyu.jpg',
      order: 1,
      published: true,
    },
    {
      sectionId: servicesSection.id,
      key: 'service_3_image',
      type: 'image',
      value: '/images/services/ventilacio.jpg',
      order: 2,
      published: true,
    },
    {
      sectionId: servicesSection.id,
      key: 'service_4_image',
      type: 'image',
      value: '/images/services/vizgazdalkodas.jpg',
      order: 3,
      published: true,
    },
    {
      sectionId: servicesSection.id,
      key: 'service_5_image',
      type: 'image',
      value: '/images/services/gepeszetechnika.jpg',
      order: 4,
      published: true,
    },
    {
      sectionId: servicesSection.id,
      key: 'service_6_image',
      type: 'image',
      value: '/images/services/karbantartas.jpg',
      order: 5,
      published: true,
    },
  ]);

  console.log('✅ Services contents created');

  // Create Services Reference Images section
  const [servicesRefSection] = await db.insert(cmsSections).values({
    pageId: servicesPage.id,
    slug: 'services_references',
    title: 'Szolgáltatások referencia képek',
    order: 1,
    published: true,
  }).returning();

  console.log('✅ Services Reference section created:', servicesRefSection.id);

  // Create Services Reference contents
  await db.insert(cmsContents).values([
    {
      sectionId: servicesRefSection.id,
      key: 'service_1_ref_1',
      type: 'image',
      value: '/images/references/klimatechnika-1.jpg',
      order: 0,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_1_ref_2',
      type: 'image',
      value: '/images/references/klimatechnika-2.jpg',
      order: 1,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_2_ref_1',
      type: 'image',
      value: '/images/references/hoszivattyu-1.jpg',
      order: 2,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_2_ref_2',
      type: 'image',
      value: '/images/references/hoszivattyu-2.jpg',
      order: 3,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_3_ref_1',
      type: 'image',
      value: '/images/references/ventilacio-1.jpg',
      order: 4,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_3_ref_2',
      type: 'image',
      value: '/images/references/ventilacio-2.jpg',
      order: 5,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_4_ref_1',
      type: 'image',
      value: '/images/references/vizgazdalkodas-1.jpg',
      order: 6,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_4_ref_2',
      type: 'image',
      value: '/images/references/vizgazdalkodas-2.jpg',
      order: 7,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_5_ref_1',
      type: 'image',
      value: '/images/references/gepeszetechnika-1.jpg',
      order: 8,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_5_ref_2',
      type: 'image',
      value: '/images/references/gepeszetechnika-2.jpg',
      order: 9,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_6_ref_1',
      type: 'image',
      value: '/images/references/karbantartas-1.jpg',
      order: 10,
      published: true,
    },
    {
      sectionId: servicesRefSection.id,
      key: 'service_6_ref_2',
      type: 'image',
      value: '/images/references/karbantartas-2.jpg',
      order: 11,
      published: true,
    },
  ]);

  console.log('✅ Services Reference contents created');

  console.log('🎉 CMS seeding completed!');
}

// Run if executed directly
if (require.main === module) {
  seedCMS()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Error seeding CMS:', error);
      process.exit(1);
    });
}
