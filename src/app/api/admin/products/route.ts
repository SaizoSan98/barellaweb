import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { auth } from '@/lib/auth';
import { asc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const all = await db.select().from(products).orderBy(asc(products.order));
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
    const created = await db.insert(products).values({
      brand: body.brand,
      type: body.type,
      description: body.description,
      features: body.features || [],
      images: body.images || [],
      price: body.price || 0,
      salePrice: body.salePrice || 0,
      sale: body.sale || false,
      priceIncludes: body.priceIncludes || "",
      order: body.order || 0,
      published: body.published ?? true,
    }).returning();
    revalidatePath('/', 'layout');
    return NextResponse.json(created[0], { status: 201 });
  } catch (e) {
    console.error('Product create error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
