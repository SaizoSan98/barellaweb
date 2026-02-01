import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { References } from "@/components/References";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <QuoteProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Services />
        <References />
        <Contact />
        <MobileStickyBar />
        <QuoteModal />
      </main>
    </QuoteProvider>
  );
}
