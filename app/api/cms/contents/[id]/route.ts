import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { cmsContents } from '@/db/cms-schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// PUT - update content (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    const { value, jsonValue, published } = body;

    const updatedContent = await db
      .update(cmsContents)
      .set({
        value: value ?? undefined,
        jsonValue: jsonValue ?? undefined,
        published: published ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(cmsContents.id, id))
      .returning();

    if (updatedContent.length === 0) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    // Revalidate all paths to ensure immediate update on live site
    revalidatePath('/');
    revalidatePath('/szolgaltatasok');
    revalidatePath('/cikkek');
    revalidatePath('/referenciak');
    revalidatePath('/[slug]');

    return NextResponse.json(updatedContent[0]);
  } catch (error: any) {
    console.error('Error updating CMS content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
