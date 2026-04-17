import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { legalPages } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const all = await db.select().from(legalPages);
    return NextResponse.json(all);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { slug, title, content } = await request.json();
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    await db.update(legalPages)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(legalPages.slug, slug));
    revalidatePath('/', 'layout');
    revalidatePath(`/adatvedelem`);
    revalidatePath(`/suti-kezeles`);
    revalidatePath(`/aszf`);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
