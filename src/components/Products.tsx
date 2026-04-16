"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Phone, Check, Tag } from "lucide-react";
import type { Product } from "@/db/schema";
import { useQuote } from "@/components/QuoteContext";

// Products component - displays product cards and modal with 2026 Premium Design
export function Products({ products, settings }: { products: Product[], settings: Record<string, string> }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { openQuote } = useQuote();
  const publishedProducts = products.filter(p => p.published);
  
  if (publishedProducts.length === 0) return null;

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "";
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  // Use dynamic settings or fallbacks for the section header
  const sectionTitle = settings.product_section_title || "Premium kínálat";
  const sectionDescription = settings.product_section_description || "Kiváló minőségű klíma és fűtési rendszerek modern technológiával, szakértői telepítéssel";

  return (
    <section id="products" className="py-16 md:py-24 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Dynamic Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-sm mb-3 block"
          >
            Termékeink
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none"
          >
            {sectionTitle.split(' ').map((word, i) => (
              <span key={i} className={i === sectionTitle.split(' ').length - 1 ? "text-gray-600" : ""}>{word} </span>
            ))}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-6 max-w-xl mx-auto text-sm md:text-lg leading-relaxed font-light"
          >
            {sectionDescription}
          </motion.p>
        </div>

        {/* Product Grid - Extreme Modern 2026 Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {publishedProducts.map((product, idx) => {
            const images = product.images || [];
            const mainImage = images[0] || "/images/ref1.jpg";
            const hasSale = product.sale && product.salePrice && product.salePrice > 0;
            const displayPrice = hasSale ? product.salePrice : product.price;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setSelectedProduct(product)}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={`${product.brand} ${product.type}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0 shadow-inner"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  
                  {/* Subtle vignette / Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />

                  {/* Dynamic Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {hasSale && (
                      <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">HOT SALE</span>
                    )}
                    <span className="bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">{product.brand}</span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 md:p-6">
                  <h3 className="text-white font-black text-sm md:text-xl uppercase tracking-tighter leading-tight mb-2 group-hover:text-primary transition-colors">
                    {product.brand} <span className="text-zinc-600 block text-xs md:text-sm">{product.type}</span>
                  </h3>
                  
                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      {displayPrice ? (
                        <div className="flex flex-col">
                          <span className="text-white font-black text-xl md:text-3xl tracking-tighter group-hover:text-primary transition-colors">
                            {formatPrice(displayPrice)} <span className="text-[10px] md:text-xs opacity-40 ml-1 uppercase">FT</span>
                          </span>
                          <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-tighter mt-0.5">
                            {settings.product_card_vat_label || "ÁFA-val"}
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-700 text-[10px] font-black uppercase tracking-widest">Ár kérésre</span>
                      )}
                    </div>

                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-500">
                      <ArrowRight size={18} className="text-white group-hover:text-black" />
                    </div>
                  </div>
                </div>

                {/* Inner Glow Overlay */}
                <div className="absolute inset-0 rounded-[2.5rem] border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-700 pointer-events-none shadow-inner" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Extreme Modern 2026 Modal Detail View */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            settings={settings} 
            onClose={() => setSelectedProduct(null)} 
            openQuote={openQuote} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductDetailModal({ product, settings, onClose, openQuote }: { product: Product, settings: any, onClose: () => void, openQuote: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || ["/images/ref1.jpg"];
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "";
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl md:p-6"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        className="relative w-full h-[100dvh] md:h-auto md:max-w-7xl md:max-h-[92vh] bg-[#050505] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(45,212,191,0.1)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[250] w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-xl"
        >
          <X size={28} />
        </button>

        {/* Left Aspect: Immersive Visuals */}
        <div className="relative w-full md:w-[55%] h-[40vh] md:h-full overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={product.brand}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#050505]/30" />
          
          {/* Slider controls */}
          {images.length > 1 && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10 px-4">
              {images.map((_ ,idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1.5 transition-all duration-500 rounded-full shadow-lg ${idx === currentImageIndex ? 'w-10 bg-primary' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          )}

          {/* Special Label */}
          <div className="absolute top-8 left-8 z-10">
              <span className="bg-primary/90 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em] shadow-2xl">Premium Selection</span>
          </div>
        </div>

        {/* Right Aspect: Editorial Content */}
        <div className="relative flex-1 flex flex-col h-[60vh] md:h-auto overflow-y-auto no-scrollbar bg-[#050505] border-l border-white/5">
          <div className="p-8 md:p-16 flex-1">
            <div className="mb-4">
               <span className="text-primary text-xs font-black uppercase tracking-[0.5em] mb-4 block">BARELLA EXCLUSIVE</span>
               <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                {product.brand} <br />
                <span className="text-zinc-800">{product.type}</span>
              </h2>
            </div>

            <p className="text-zinc-400 text-base md:text-xl leading-relaxed mb-12 font-light max-w-lg">
              {product.description || "Ez a prémium berendezés a legmagasabb minőséget képviseli kínálatunkban. Kimagasló mérnöki munka, hosszú élettartam és esztétikus megjelenés jellemzi minden modellünket."}
            </p>

            {/* Bento Grid Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
               {product.features?.map((f, i) => (
                 <div key={i} className="bg-white/[0.02] border border-white/5 p-4 rounded-3xl flex items-center gap-4 group hover:bg-white/[0.05] transition-colors">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Check size={20} />
                    </div>
                    <span className="text-white text-sm md:text-base font-medium tracking-tight">{f}</span>
                 </div>
               ))}
            </div>

            {/* Pricing Section - Ultra Modern */}
            <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-3xl overflow-hidden group mb-12">
               <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] group-hover:bg-primary/10 transition-colors" />
               <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div>
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">VÁRHATÓ KIVITELEZÉSI ÁR</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-none">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      <span className="text-primary text-xl md:text-2xl font-black uppercase ml-1 opacity-80 tracking-tighter">FT</span>
                    </div>
                    <p className="text-zinc-600 text-[10px] md:text-xs mt-4 font-black uppercase tracking-widest">{settings.product_modal_vat_info || "AZ ÁRAK TARTALMAZZÁK AZ ÁFÁT"}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-start md:items-end">
                     <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">ÁLLAPOT</span>
                     <span className="text-primary text-xs font-black uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">{settings.product_card_availability_info || "RAKTÁRKÉSZLETEN"}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Sticky Bottom UX for high conversion */}
          <div className="sticky bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent pt-12 md:px-16 md:pb-16">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => { onClose(); openQuote(); }}
                className="flex-[3] bg-primary hover:bg-white text-black py-5 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black uppercase text-sm md:text-xl tracking-[0.2em] transition-all transform hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(45,212,191,0.3)] flex items-center justify-center gap-4"
              >
                AJÁNLATOT KÉREK <ArrowRight size={24} />
              </button>
              <a 
                href="tel:+36301738866"
                className="flex-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white py-5 md:py-8 rounded-[2rem] md:rounded-[2.5rem] font-black uppercase text-sm md:text-xl tracking-[0.2em] transition-all flex items-center justify-center gap-4"
              >
                <Phone size={24} /> HÍVÁS
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
