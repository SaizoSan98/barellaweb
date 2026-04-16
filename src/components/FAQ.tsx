import { db } from "@/db";
import { faqItems } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { FAQList } from "@/components/FAQList";
import { unstable_noStore as noStore } from "next/cache";

export async function FAQ() {
  noStore();
  const faqs = await db.select().from(faqItems)
    .where(eq(faqItems.published, true))
    .orderBy(asc(faqItems.order));

  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Tudnivalók</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Gyakori <span className="text-gray-600">kérdések</span>
          </h2>
        </div>
        <FAQList faqs={faqs} />
      </div>
    </section>
  );
}
