import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { faqItems } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const all = await db.select().from(faqItems).orderBy(asc(faqItems.order));
    return NextResponse.json(all);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const maxOrder = await db.select().from(faqItems).orderBy(asc(faqItems.order));
    const order = maxOrder.length + 1;
    const created = await db.insert(faqItems).values({ ...body, order }).returning();
    revalidatePath('/', 'layout');
    return NextResponse.json(created[0], { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body: { id: number; question: string; answer: string }[] = await request.json();
    for (const item of body) {
      await db.update(faqItems)
        .set({ question: item.question, answer: item.answer, updatedAt: new Date() })
        .where(eq(faqItems.id, item.id));
    }
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get('id'));
    await db.delete(faqItems).where(eq(faqItems.id, id));
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
