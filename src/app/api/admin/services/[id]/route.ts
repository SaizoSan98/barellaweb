import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { services } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const updated = await db.update(services)
      .set({
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        fullDescription: body.fullDescription,
        image: body.image,
        details: body.details,
        gallery: body.gallery,
        colSpan: body.colSpan,
        order: body.order,
        published: body.published,
        updatedAt: new Date(),
      })
      .where(eq(services.id, Number(id)))
      .returning();
    revalidatePath('/', 'layout');
    return NextResponse.json(updated[0]);
  } catch (e) {
    console.error('Service update error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
