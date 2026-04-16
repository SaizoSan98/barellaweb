import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsSections } from '@/db/cms-schema';
import { auth } from '@/lib/auth';
import { eq, asc } from 'drizzle-orm';

// GET - list sections by page
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    const slug = searchParams.get('slug');
    
    if (pageId) {
      const sections = await db.select().from(cmsSections)
        .where(eq(cmsSections.pageId, Number(pageId)))
        .orderBy(asc(cmsSections.order));
      return NextResponse.json(sections);
    }
    
    if (slug) {
      const section = await db.select().from(cmsSections)
        .where(eq(cmsSections.slug, slug))
        .limit(1);
      return NextResponse.json(section[0] || null);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching CMS sections:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

// POST - create new section (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pageId, slug, title, order, published } = body;

    const newSection = await db.insert(cmsSections).values({
      pageId,
      slug,
      title,
      order: order ?? 0,
      published: published ?? true,
    }).returning();

    return NextResponse.json(newSection[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating CMS section:', error);
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}
