"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function HeroBackground() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if window is defined and width
    if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
        
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // On mobile, render a super lightweight static div immediately
  if (isMobile) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 z-10" />
            {/* Simple static gradient for mobile - NO ANIMATION, NO HOOKS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
            
            {/* Simple decorative glow - static CSS only */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[60px]" />
        </div>
    );
  }

  return <DesktopHeroBackground />;
}

// Separated Desktop Component to isolate heavy hooks and render logic
function DesktopHeroBackground() {
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
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 overflow-hidden"
      >
        {USE_ANIMATED_BACKGROUND ? (
           // ANIMATED MOSAIC BACKGROUND
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 z-10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10" />
              
              {/* Tilted Container for Diagonal Movement */}
              <div className={`absolute inset-0 flex flex-col gap-8 -rotate-[15deg] scale-150 opacity-60 blur-0 select-none overflow-hidden`}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex whitespace-nowrap gap-8 will-change-transform hero-marquee-row`}
                    style={{
                      animation: `diagonal-scroll ${baseDuration + (i % 3) * 8}s linear infinite ${i % 2 === 0 ? 'normal' : 'reverse'}`,
                      width: 'max-content',
                      // @ts-ignore
                      '--base-duration': `${baseDuration + (i % 3) * 8}s`
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, j) => (
                      <span 
                        key={j} 
                        className={`text-8xl font-black uppercase text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)]`}
                      >
                        {scrollingTexts[j % scrollingTexts.length]}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
           </div>
        ) : (
           // STATIC IMAGE BACKGROUND
           <>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
           </>
        )}
      </motion.div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-10">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
      </div>
    </div>
  );
}
