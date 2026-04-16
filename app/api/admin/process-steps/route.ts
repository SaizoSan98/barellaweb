import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { processSteps } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq, asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const all = await db.select().from(processSteps).orderBy(asc(processSteps.order));
    return NextResponse.json(all);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body: { id: number; title: string; description: string }[] = await request.json();
    for (const step of body) {
      await db.update(processSteps)
        .set({ title: step.title, description: step.description, updatedAt: new Date() })
        .where(eq(processSteps.id, step.id));
    }
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
