import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const all = await db.select().from(siteSettings);
    const result: Record<string, string> = {};
    for (const s of all) result[s.key] = s.value ?? '';
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body: Record<string, string> = await request.json();
    for (const [key, value] of Object.entries(body)) {
      await db.insert(siteSettings)
        .values({ key, value })
        .onConflictDoUpdate({ target: siteSettings.key, set: { value, updatedAt: new Date() } });
    }
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
