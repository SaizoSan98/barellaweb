"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { useQuote } from "@/components/QuoteContext";
import { Logo } from "@/components/Logo";

const navItems = [
  { name: "Kezdőlap", href: "/" },
  { name: "Szolgáltatások", href: "/#services" },
  { name: "Referenciák", href: "/referenciak" },
  { name: "Hasznos cikkek", href: "/cikkek" },
  { name: "Kapcsolat", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openQuote } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b ${
        scrolled 
          ? "bg-black/95 border-white/10 h-20" // Removed backdrop-blur for performance
          : "bg-transparent border-transparent h-24"
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group relative z-50">
           <Logo className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" />
           <div className="flex flex-col gap-1">
             <span className="text-xl font-black tracking-tighter text-white leading-none">BARELLA</span>
             <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-bold leading-none">Épületgépészet</span>
           </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 mr-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
            <a 
              href="tel:+36301738866" 
              className="flex items-center gap-2 text-white hover:text-primary transition-colors font-bold text-sm"
            >
              <Phone size={16} />
              +36 30 173 88 66
            </a>
            
            <button 
              onClick={openQuote}
              className="bg-primary text-black px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]"
            >
              AJÁNLATKÉRÉS
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white z-[101] relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center h-[100dvh] w-screen overflow-hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Background decoration - Simplified for mobile performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
              <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[30px]" />
              <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[30px]" />
            </div>

            {/* Logo in Mobile Menu */}
            <div
              className="absolute top-8 left-8 flex items-center gap-4"
            >
              <Logo className="w-10 h-10" />
              <div className="flex flex-col gap-1">
                <span className="text-xl font-black tracking-tighter text-white leading-none">BARELLA</span>
                <span className="text-[10px] tracking-[0.2em] text-primary uppercase font-bold leading-none">Épületgépészet</span>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-center relative z-10 w-full px-8">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className="text-4xl font-black text-white hover:text-primary transition-colors tracking-tight block py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
