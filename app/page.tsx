import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Services } from "@/components/Services";
import { References } from "@/components/References";
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
        <QuoteModal />
        <ScrollToTop />
      </main>
    </QuoteProvider>
  );
}
