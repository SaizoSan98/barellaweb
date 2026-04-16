import { NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsPages, cmsSections, cmsContents } from '@/db/cms-schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🌱 Seeding CMS data...');

    // Check if home page already exists
    const existingPages = await db.select().from(cmsPages).where(eq(cmsPages.slug, 'home'));
    if (existingPages.length > 0) {
      return NextResponse.json({ message: 'CMS data already seeded' });
    }

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
        key: 'hero_subtitle',
        type: 'text',
        value: 'Modern épületgépészet és klímatechnika',
        order: 1,
        published: true,
      },
      {
        sectionId: heroSection.id,
        key: 'hero_cta_text',
        type: 'text',
        value: 'Kérj árajánlatot',
        order: 2,
        published: true,
      },
      {
        sectionId: heroSection.id,
        key: 'hero_phone',
        type: 'text',
        value: '+36 30 173 88 66',
        order: 3,
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
        value: 'info@barella.hu',
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
        value: 'Budapest, Magyarország',
        order: 2,
        published: true,
      },
    ]);

    console.log('✅ Contact contents created');

    console.log('🎉 CMS seeding completed!');

    return NextResponse.json({ message: 'CMS data seeded successfully' });
  } catch (error) {
    console.error('Error seeding CMS:', error);
    return NextResponse.json({ error: 'Failed to seed CMS data' }, { status: 500 });
  }
}
