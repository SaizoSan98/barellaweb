import Link from 'next/link';
import { db } from '@/db';
import { blogPosts, siteSettings } from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { ArrowRight, Calendar } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Contact } from '@/components/Contact';

export const revalidate = 60; // Revalidate every minute

export const metadata = {
  title: 'Blog | BARELLA Épületgépészet',
  description: 'Szakmai cikkek, tippek és hírek épületgépészeti témában. Klíma, hőszivattyú, padlófűtés és több.',
};

export default async function BlogListPage() {
  const [posts, settingsRows] = await Promise.all([
    db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt)),
    db.select().from(siteSettings),
  ]);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              Szakmai <span className="text-gray-600">tudástár</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Hasznos cikkek, tippek és hírek épületgépészeti témában. 
              Tájékozódjon szakértőink írásaiból.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Hamarosan érkeznek az első bejegyzések...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/cikkek/${post.slug}`}
                  className="group block relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                      <Calendar size={14} />
                      <span>
                        {post.publishedAt 
                          ? new Date(post.publishedAt.toString()).toLocaleDateString('hu-HU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : post.createdAt 
                            ? new Date(post.createdAt.toString()).toLocaleDateString('hu-HU')
                            : ''
                        }
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-bold uppercase mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.subtitle && (
                      <p className="text-primary text-sm font-medium mb-3">
                        {post.subtitle}
                      </p>
                    )}
                    
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {post.excerpt || post.content.slice(0, 150)}...
                    </p>

                    <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                      <span>Elolvasom</span>
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Contact settings={settings} />
    </main>
  );
}
