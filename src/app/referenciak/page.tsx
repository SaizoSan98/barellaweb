import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { ReferencesGrid } from "./ReferencesGrid";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";

export default async function ReferencesPage() {
  const settingsRows = await db.select().from(siteSettings);
  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ReferencesGrid />
      <Contact settings={settings} />
    </main>
  );
}
