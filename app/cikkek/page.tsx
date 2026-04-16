import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { db } from "@/db";
import { blogPosts, siteSettings } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { BlogList } from "@/components/BlogList";

export default async function BlogPage() {
  const [dbPosts, settingsRows] = await Promise.all([
    db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.publishedAt)),
    db.select().from(siteSettings),
  ]);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  return (
    <QuoteProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />

        <div className="pt-32 pb-20 px-4 container mx-auto">
          <BlogList posts={dbPosts} />
        </div>

        <Contact settings={settings} />
        <QuoteModal />
      </main>
    </QuoteProvider>
  );
}
