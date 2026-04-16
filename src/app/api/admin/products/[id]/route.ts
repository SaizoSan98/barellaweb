import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    const body = await request.json();
    const updated = await db.update(products)
      .set({
        brand: body.brand,
        type: body.type,
        description: body.description,
        features: body.features,
        images: body.images,
        price: body.price,
        salePrice: body.salePrice,
        sale: body.sale,
        order: body.order,
        published: body.published,
        updatedAt: new Date(),
      })
      .where(eq(products.id, Number(id)))
      .returning();
    revalidatePath('/', 'layout');
    return NextResponse.json(updated[0]);
  } catch (e) {
    console.error('Product update error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    await db.delete(products).where(eq(products.id, Number(id)));
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
