import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { blogPosts, siteSettings } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await db.select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
    .limit(1);

  if (!post || post.length === 0) {
    return { title: 'Cikk nem található' };
  }

  return {
    title: `${post[0].title} | BARELLA Blog`,
    description: post[0].excerpt || post[0].content.slice(0, 160),
  };
}

// Simple markdown parser
function parseMarkdown(content: string) {
  return content
    .split('\n')
    .map((line, i) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-3xl md:text-4xl font-black uppercase my-8">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl md:text-3xl font-bold uppercase my-6 text-primary">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold uppercase my-4 text-gray-300">{line.slice(4)}</h3>;
      }
      
      // List items
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={i} className="ml-6 my-2 text-gray-300">{parseInline(line.slice(2))}</li>;
      }
      
      // Empty line
      if (line.trim() === '') {
        return <div key={i} className="h-4" />;
      }
      
      // Regular paragraph
      return <p key={i} className="my-4 text-gray-300 leading-relaxed">{parseInline(line)}</p>;
    });
}

function parseInline(text: string) {
  // Bold: **text**
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  // Italic: *text*
  text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  const [post, settingsRows] = await Promise.all([
    db.select().from(blogPosts).where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true))).limit(1),
    db.select().from(siteSettings),
  ]);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  if (!post || post.length === 0) {
    notFound();
  }

  const article = post[0];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/cikkek"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Vissza a cikkekhez</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  {article.publishedAt 
                    ? new Date(article.publishedAt.toString()).toLocaleDateString('hu-HU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : article.createdAt
                      ? new Date(article.createdAt.toString()).toLocaleDateString('hu-HU')
                      : ''
                  }
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              {article.title}
            </h1>
            
            {article.subtitle && (
              <p className="text-xl md:text-2xl text-primary font-medium">
                {article.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-invert prose-lg max-w-none">
              {parseMarkdown(article.content)}
            </div>

            {/* CTA */}
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold uppercase mb-4">
                  További kérdése van?
                </h3>
                <p className="text-gray-400 mb-6">
                  Vegye fel velünk a kapcsolatot és szakértőink készséggel válaszolnak.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-xl font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Kapcsolatfelvétel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <Contact settings={settings} />
    </main>
  );
}
