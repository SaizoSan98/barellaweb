import { db } from '@/db';
import { cmsPages, cmsSections, cmsContents } from '@/db/cms-schema';
import { eq, and } from 'drizzle-orm';

// Get content by key from a section
export async function getCmsContent(pageSlug: string, sectionSlug: string, contentKey: string) {
  try {
    const page = await db.select().from(cmsPages).where(eq(cmsPages.slug, pageSlug)).limit(1);
    if (page.length === 0) return null;

    const section = await db.select().from(cmsSections)
      .where(and(eq(cmsSections.pageId, page[0].id), eq(cmsSections.slug, sectionSlug)))
      .limit(1);
    if (section.length === 0) return null;

    const content = await db.select().from(cmsContents)
      .where(and(eq(cmsContents.sectionId, section[0].id), eq(cmsContents.key, contentKey), eq(cmsContents.published, true)))
      .limit(1);

    return content[0]?.value || null;
  } catch (error) {
    console.error('Error fetching CMS content:', error);
    return null;
  }
}

// Get all contents from a section
export async function getCmsSectionContents(pageSlug: string, sectionSlug: string) {
  try {
    const page = await db.select().from(cmsPages).where(eq(cmsPages.slug, pageSlug)).limit(1);
    if (page.length === 0) return {};

    const section = await db.select().from(cmsSections)
      .where(and(eq(cmsSections.pageId, page[0].id), eq(cmsSections.slug, sectionSlug)))
      .limit(1);
    if (section.length === 0) return {};

    const contents = await db.select().from(cmsContents)
      .where(and(eq(cmsContents.sectionId, section[0].id), eq(cmsContents.published, true)));

    const contentMap: Record<string, string> = {};
    contents.forEach(c => {
      if (c.value) contentMap[c.key] = c.value;
    });

    return contentMap;
  } catch (error) {
    console.error('Error fetching CMS section contents:', error);
    return {};
  }
}
