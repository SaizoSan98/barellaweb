import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import dynamic from 'next/dynamic';

// Lazy load below-fold components
const References = dynamic(() => import('@/components/References').then(mod => mod.References), {
  loading: () => <div className="h-screen bg-black" />
});
const Services = dynamic(() => import('@/components/Services').then(mod => mod.Services));
const Contact = dynamic(() => import('@/components/Contact').then(mod => mod.Contact));

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
