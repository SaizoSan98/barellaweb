"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useQuote } from "@/components/QuoteContext";

export function Hero() {
  const { openQuote } = useQuote();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // TOGGLE: Set this to true to use the animated text mosaic background, false for the original image background
  const USE_ANIMATED_BACKGROUND = true;

  // Optimized animation settings
  const baseDuration = 40;
  const scrollingTexts = [
    "BARELLA ÉPÜLETGÉPÉSZET",
    "HŐSZIVATTYÚK",
    "KLÍMÁK",
    "FŰTÉSI ÉS HŰTÉSI RENDSZEREK"
  ];

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Layer */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        {USE_ANIMATED_BACKGROUND ? (
           // ANIMATED MOSAIC BACKGROUND - OPTIMIZED CSS VERSION
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
              {/* Mobile Static Background Image */}
              <div 
                className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop")' }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-black/30 md:backdrop-blur-[2px] z-10" />
              
              {/* Tilted Container for Diagonal Movement */}
              <div className={`absolute inset-0 flex flex-col md:gap-8 gap-4 -rotate-[15deg] scale-150 opacity-60 blur-0 select-none pointer-events-none overflow-hidden ${typeof window !== 'undefined' && window.innerWidth < 768 ? 'hidden' : 'flex'}`}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex whitespace-nowrap gap-8 will-change-transform hero-marquee-row ${i % 5 !== 0 ? 'hidden md:flex' : 'flex'}`}
                    style={{
                      // On mobile, use a static transform to prevent GPU churn, or a very simple animation
                      animation: typeof window !== 'undefined' && window.innerWidth < 768 
                        ? 'none' 
                        : `diagonal-scroll ${baseDuration + (i % 3) * 8}s linear infinite ${i % 2 === 0 ? 'normal' : 'reverse'}`,
                      width: 'max-content',
                      // @ts-ignore
                      '--base-duration': `${baseDuration + (i % 3) * 8}s`
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, j) => (
                      <span 
                        key={j} 
                        className={`md:text-8xl text-6xl font-black uppercase text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)] ${j >= 4 ? 'hidden md:inline' : 'inline'}`}
                      >
                        {scrollingTexts[j % scrollingTexts.length]}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
           </div>
        ) : (
           // STATIC IMAGE BACKGROUND - FALLBACK
           <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop")' }}
            />
            {/* Dark, heavy overlay for premium text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
           </>
        )}
      </motion.div>

      {/* Decorative Glow Elements - VISIBLE ON MOBILE TOO NOW */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
          {/* Mobile Specific Glow */}
          <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
      </div>

      <div className="container relative z-20 px-4">
        <div className="max-w-4xl mx-auto md:text-left text-center">
          
          {/* TITLE: CSS FadeIn for Mobile (Instant LCP), Motion for Desktop */}
          <div className="md:hidden block animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: '0s' }}>
            <h1 className="text-6xl sm:text-5xl font-black tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl">
              <span className="text-white relative inline-block">
                BARELLA
                <span className="absolute -bottom-2 left-0 h-1 bg-primary w-full animate-[widthGrow_0.8s_ease-out_forwards]" />
              </span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white via-50% to-gray-600 block mt-4 break-words w-full text-4xl tracking-[0.1em] font-bold">
                ÉPÜLETGÉPÉSZET
              </span>
            </h1>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="hidden md:block text-5xl md:text-8xl font-black tracking-tighter mb-8 md:mb-8 leading-[0.9] drop-shadow-2xl"
          >
            <span className="text-white relative inline-block">
              BARELLA
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white via-50% to-gray-600 block mt-4 break-words w-full text-7xl font-black">
              ÉPÜLETGÉPÉSZET
            </span>
          </motion.h1>

          {/* DESCRIPTION: CSS FadeIn for Mobile, Motion for Desktop */}
          <div className="md:hidden block animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
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
          <div className="md:hidden flex flex-col gap-4 items-center justify-center animate-[fadeIn_0.8s_ease-out_forwards]" style={{ animationDelay: '0.4s' }}>
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
