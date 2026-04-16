import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsPages, cmsSections, cmsContents } from '@/db/cms-schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('pageSlug');
    const sectionSlug = searchParams.get('sectionSlug');
    const contentKey = searchParams.get('contentKey');

    if (!pageSlug || !sectionSlug || !contentKey) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Get page
    const pages = await db.select().from(cmsPages).where(eq(cmsPages.slug, pageSlug)).limit(1);
    if (pages.length === 0) {
      return NextResponse.json({ value: null });
    }

    // Get section
    const sections = await db.select().from(cmsSections)
      .where(and(eq(cmsSections.pageId, pages[0].id), eq(cmsSections.slug, sectionSlug)))
      .limit(1);
    if (sections.length === 0) {
      return NextResponse.json({ value: null });
    }

    // Get content
    const contents = await db.select().from(cmsContents)
      .where(and(
        eq(cmsContents.sectionId, sections[0].id),
        eq(cmsContents.key, contentKey),
        eq(cmsContents.published, true)
      ))
      .limit(1);

    return NextResponse.json({ value: contents[0]?.value || null });
  } catch (error) {
    console.error('Error fetching CMS content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
