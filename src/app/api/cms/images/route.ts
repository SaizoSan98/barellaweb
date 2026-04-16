import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsImages } from '@/db/cms-schema';
import { auth } from '@/lib/auth';
import { eq, asc } from 'drizzle-orm';

// GET - list images by content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('contentId');
    
    if (contentId) {
      const images = await db.select().from(cmsImages)
        .where(eq(cmsImages.contentId, Number(contentId)))
        .orderBy(asc(cmsImages.order));
      return NextResponse.json(images);
    }
    
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching CMS images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

// POST - create new image (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contentId, url, alt, width, height, order } = body;

    const newImage = await db.insert(cmsImages).values({
      contentId,
      url,
      alt,
      width,
      height,
      order: order ?? 0,
    }).returning();

    return NextResponse.json(newImage[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating CMS image:', error);
    return NextResponse.json({ error: 'Failed to create image' }, { status: 500 });
  }
}
