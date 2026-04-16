"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useQuote } from "@/components/QuoteContext";

export function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);
  const { openQuote } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down a bit (past the hero CTA usually)
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden"
        >
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 flex gap-2">
            
            <a 
              href="tel:+36301738866"
              className="flex-1 bg-white/10 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm active:bg-white/20 transition-colors"
            >
              <Phone size={18} className="text-primary" />
              HÍVÁS
            </a>

            <button 
              onClick={openQuote}
              className="flex-1 bg-primary text-black rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold text-sm active:bg-white transition-colors shadow-lg shadow-primary/20"
            >
              <Send size={18} />
              AJÁNLAT
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
