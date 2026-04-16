export const dynamic = 'force-dynamic';

import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { Brands } from "@/components/Brands";
import { Products } from "@/components/Products";
import { db } from "@/db";
import { siteSettings, services as servicesTable, products as productsTable } from "@/db/schema";
import { asc } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  const [settingsRows, serviceRows, productRows] = await Promise.all([
    db.select().from(siteSettings),
    db.select().from(servicesTable).orderBy(asc(servicesTable.order)),
    db.select().from(productsTable).orderBy(asc(productsTable.order)),
  ]);

  const settings: Record<string, string> = {};
  for (const s of settingsRows) settings[s.key] = s.value ?? "";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero settings={settings} />
      <Brands />
      <Services services={serviceRows} />
      <Process />
      {settings.show_products === 'true' && <Products products={productRows} settings={settings} />}
      <FAQ />
      <Contact settings={settings} />
    </main>
  );
}
