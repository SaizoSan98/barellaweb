"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import dynamic from "next/dynamic";
import { Logo } from "@/components/Logo";

const HeroBackground = dynamic(() => import("@/components/HeroBackground").then(mod => mod.HeroBackground), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />
});

export function Hero() {
  const { openQuote } = useQuote();

  return (
    <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden bg-black py-20 md:py-0">
      {/* Background Layer - Separated for performance */}
      <HeroBackground />

      <div className="container relative z-20 px-4">
        <div className="max-w-4xl mx-auto md:text-left text-center">
          
          {/* TITLE: CSS FadeIn for Mobile (Instant LCP), Motion for Desktop */}
          <div className="md:hidden block">
            <div className="flex justify-center mb-6">
               <Logo className="w-20 h-20" variant="white" />
            </div>
            <h1 className="text-6xl sm:text-5xl font-black tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
              <span className="text-white relative inline-block">
                BARELLA
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white via-50% to-gray-600 block mt-4 break-words w-full text-3xl sm:text-4xl tracking-normal sm:tracking-[0.1em] font-bold">
                ÉPÜLETGÉPÉSZET
              </span>
            </h1>
          </div>
          
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 flex md:justify-start justify-center"
            >
               <Logo className="w-24 h-24 md:w-32 md:h-32" variant="white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-black tracking-tighter mb-8 md:mb-8 leading-[0.9] drop-shadow-2xl"
            >
              <span className="text-white relative inline-block">
                BARELLA
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white via-50% to-gray-600 block mt-4 break-words w-full text-7xl font-black">
                ÉPÜLETGÉPÉSZET
              </span>
            </motion.h1>
          </div>

          {/* DESCRIPTION: CSS FadeIn for Mobile, Motion for Desktop */}
          <div className="md:hidden block">
             <p className="text-lg text-gray-300 max-w-2xl mb-10 font-light leading-relaxed mx-auto">
              A jövő épületgépészete. Kompromisszumok nélküli minőség, 
              <span className="text-white font-medium"> ipari precizitás</span> és 
              <span className="text-white font-medium"> intelligens rendszerek</span> egy kézben.
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden md:block text-2xl text-gray-300 max-w-2xl mb-12 font-light leading-relaxed"
          >
            A jövő épületgépészete. Kompromisszumok nélküli minőség, 
            <span className="text-white font-medium block md:inline"> ipari precizitás</span> és 
            <span className="text-white font-medium block md:inline"> intelligens rendszerek</span> egy kézben.
          </motion.p>

          {/* BUTTONS: CSS FadeIn for Mobile, Motion for Desktop */}
          <div className="md:hidden flex flex-col gap-4 items-center justify-center">
             <button 
              onClick={openQuote}
              className="w-full group relative bg-primary text-black px-6 py-3 font-bold text-base tracking-wide overflow-hidden rounded-none skew-x-[-10deg] active:scale-95 transition-transform"
            >
              <span className="block skew-x-[10deg] flex items-center gap-2 justify-center whitespace-nowrap">
                AJÁNLATKÉRÉS <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <a 
              href="/referenciak"
              className="w-full group px-6 py-3 font-bold text-base text-white border border-white/20 skew-x-[-10deg] backdrop-blur-sm inline-block text-center active:scale-95 transition-transform"
            >
              <span className="block skew-x-[10deg] whitespace-nowrap">
                REFERENCIÁK
              </span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="hidden md:flex flex-col sm:flex-row gap-4 md:gap-6 items-center md:items-start justify-center md:justify-start"
          >
            <button 
              onClick={openQuote}
              className="w-full sm:w-auto group relative bg-primary text-black px-6 py-3 md:px-8 md:py-4 font-bold text-base md:text-lg tracking-wide overflow-hidden rounded-none skew-x-[-10deg] hover:bg-white transition-colors duration-300"
            >
              <span className="block skew-x-[10deg] flex items-center gap-2 justify-center whitespace-nowrap">
                AJÁNLATKÉRÉS <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <a 
              href="/referenciak"
              className="w-full sm:w-auto group px-6 py-3 md:px-8 md:py-4 font-bold text-base md:text-lg text-white border border-white/20 hover:border-primary hover:text-primary transition-all duration-300 skew-x-[-10deg] backdrop-blur-sm inline-block text-center"
            >
              <span className="block skew-x-[10deg] whitespace-nowrap">
                REFERENCIÁK
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 animate-bounce"
      >
        <ChevronDown size={24} className="md:w-8 md:h-8" />
      </motion.div>
    </section>
  );
}
