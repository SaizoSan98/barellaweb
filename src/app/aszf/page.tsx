import { db } from "@/db";
import { legalPages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { siteSettings } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AszfPage() {
  const [page, settingsRows] = await Promise.all([
    db.select().from(legalPages).where(eq(legalPages.slug, 'aszf')).limit(1),
    db.select().from(siteSettings),
  ]);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";
  const legalPage = page[0];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 text-sm">
          <ArrowLeft size={16} /> Vissza a főoldalra
        </Link>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">
          {legalPage?.title || "Általános Szerződési Feltételek"}
        </h1>
        <div className="prose prose-invert prose-sm md:prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
          {legalPage?.content || "A tartalom hamarosan elérhető."}
        </div>
      </div>
      <Contact settings={settings} />
    </main>
  );
}
