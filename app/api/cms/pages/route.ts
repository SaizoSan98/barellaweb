import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsPages } from '@/db/cms-schema';
import { auth } from '@/lib/auth';
import { eq, asc } from 'drizzle-orm';

// GET - list all pages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (slug) {
      // Get single page by slug
      const page = await db.select().from(cmsPages)
        .where(eq(cmsPages.slug, slug))
        .limit(1);
      return NextResponse.json(page[0] || null);
    }
    
    // Get all pages
    const pages = await db.select().from(cmsPages).orderBy(asc(cmsPages.order));
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching CMS pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

// POST - create new page (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, description, published } = body;

    const newPage = await db.insert(cmsPages).values({
      slug,
      title,
      description,
      published: published ?? true,
    }).returning();

    return NextResponse.json(newPage[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating CMS page:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
