import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// GET - list blog posts (public: only published, admin: all)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    
    let posts;
    
    if (!admin) {
      // Public endpoint - only published
      posts = await db.select().from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.publishedAt));
    } else {
      // Admin endpoint - check auth
      const session = await auth();
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    }
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST - create new post (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, subtitle, slug, content, excerpt, imageUrl, author, published } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = await db.insert(blogPosts).values({
      title,
      subtitle,
      slug,
      content,
      excerpt: excerpt || content.slice(0, 200) + '...',
      imageUrl,
      author: author || 'BARELLA',
      published: published || false,
      publishedAt: published ? new Date() : null,
    }).returning();

    // Revalidate paths to ensure immediate update on live site
    revalidatePath('/cikkek');
    revalidatePath('/');

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
