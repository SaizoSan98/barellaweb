import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// GET single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');

    let query = db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    
    if (!admin) {
      // Public - only published
      query = db.select().from(blogPosts).where(
        and(eq(blogPosts.slug, slug), eq(blogPosts.published, true))
      );
    } else {
      // Admin - check auth
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const post = await query.limit(1);
    
    if (!post || post.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

// PUT - update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, content, excerpt, imageUrl, author, published } = body;

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (author !== undefined) updateData.author = author;
    if (published !== undefined) {
      updateData.published = published;
      if (published) {
        updateData.publishedAt = new Date();
      }
    }

    const updated = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.slug, slug))
      .returning();

    if (!updated || updated.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Revalidate paths to ensure immediate update on live site
    revalidatePath('/cikkek');
    revalidatePath('/');
    revalidatePath(`/cikkek/${slug}`);

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE - delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const deleted = await db.delete(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .returning();

    if (!deleted || deleted.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Revalidate paths to ensure immediate update on live site
    revalidatePath('/cikkek');
    revalidatePath('/');

    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
