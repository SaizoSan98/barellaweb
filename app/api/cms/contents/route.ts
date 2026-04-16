import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsContents } from '@/db/cms-schema';
import { auth } from '@/lib/auth';
import { eq, asc } from 'drizzle-orm';

// GET - list contents by section
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');
    
    if (sectionId) {
      const contents = await db.select().from(cmsContents)
        .where(eq(cmsContents.sectionId, Number(sectionId)))
        .orderBy(asc(cmsContents.order));
      return NextResponse.json(contents);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching CMS contents:', error);
    return NextResponse.json({ error: 'Failed to fetch contents' }, { status: 500 });
  }
}

// POST - create new content (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sectionId, key, type, value, jsonValue, order, published } = body;

    const newContent = await db.insert(cmsContents).values({
      sectionId,
      key,
      type,
      value,
      jsonValue,
      order: order ?? 0,
      published: published ?? true,
    }).returning();

    return NextResponse.json(newContent[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating CMS content:', error);
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 });
  }
}
