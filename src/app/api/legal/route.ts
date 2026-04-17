import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { legalPages } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    const page = await db.select().from(legalPages).where(eq(legalPages.slug, slug)).limit(1);
    if (page.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(page[0]);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
