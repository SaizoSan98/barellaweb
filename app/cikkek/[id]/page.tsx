import BlogPostDetailClient from "./BlogPostDetailClient";
import { db } from "@/db";
import { blogPosts, siteSettings } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function generateStaticParams() {
  return [];
}

export const dynamic = 'force-dynamic';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const idOrSlug = resolvedParams.id;

  const settingsRows = await db.select().from(siteSettings);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  if (/^\d+$/.test(idOrSlug)) {
    return <BlogPostDetailClient post={undefined} settings={settings} />;
  }

  // Otherwise, fetch from DB by slug
  try {
    const results = await db.select().from(blogPosts)
      .where(and(eq(blogPosts.slug, idOrSlug), eq(blogPosts.published, true)))
      .limit(1);

    if (results.length === 0) {
      return <BlogPostDetailClient post={undefined} settings={settings} />;
    }

    const dbPost = results[0];
    // Map DB post to the format BlogPostDetailClient expects
    const post = {
      id: dbPost.id,
      title: dbPost.title,
      slug: dbPost.slug,
      category: dbPost.subtitle || 'BLOG',
      coverImage: dbPost.imageUrl || 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop',
      date: dbPost.publishedAt
        ? new Date(dbPost.publishedAt.toString()).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date(dbPost.createdAt!.toString()).toLocaleDateString('hu-HU'),
      readTime: `${Math.max(1, Math.ceil(dbPost.content.length / 1000))} perc olvasás`,
      excerpt: dbPost.excerpt || '',
      fullDescription: dbPost.content,
      technologies: [],
      sections: [],
      gallery: dbPost.imageUrl ? [dbPost.imageUrl] : [],
    };

    return <BlogPostDetailClient post={post} settings={settings} />;
  } catch {
    return <BlogPostDetailClient post={undefined} settings={settings} />;
  }
}
