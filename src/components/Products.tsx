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
                      <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-xl">
                        {settings.product_sale_label || "AKCIÓ"}
                      </span>
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="relative w-full h-[90vh] md:h-auto md:max-w-6xl md:max-h-[85vh] bg-[#050505] md:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/5"
        onClick={e => e.stopPropagation()}
      >
        {/* Discrete Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[250] w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
        >
          <X size={20} className="md:size-24" />
        </button>

        {/* Left Section: Immersive but stable Visuals */}
        <div className="relative w-full md:w-1/2 h-[30vh] md:h-auto bg-zinc-900 overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={product.brand}
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />
          
          {images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-10 px-4">
              {images.map((_ ,idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-1 transition-all duration-300 rounded-full ${idx === currentImageIndex ? 'w-10 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-8 left-8 z-10">
              <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/30">Premium Selection</span>
          </div>
        </div>

        {/* Right Section: Balanced Content */}
        <div className="relative flex-1 flex flex-col min-h-0 bg-[#050505] overflow-hidden">
          <div className="p-4 md:p-12 lg:p-16 flex-1 overflow-y-auto">
            <div className="mb-6 md:mb-10">
               <span className="text-primary/70 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                 {settings.product_modal_exclusive_label || "BARELLA EXCLUSIVE"}
               </span>
               <h2 className="text-2xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                {product.brand} <span className="text-zinc-600 ml-2">{product.type}</span>
              </h2>
            </div>

            <p className="text-zinc-400 text-xs md:text-lg leading-relaxed mb-8 md:mb-12 max-w-xl font-light">
              {product.description || "Ez a prémium berendezés a legmagasabb minőséget képviseli kínálatunkban. Kimagasló mérnöki munka, hosszú élettartam és esztétikus megjelenés jellemzi minden modellünket."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-14">
               {product.features?.map((f, i) => (
                 <div key={i} className="bg-white/[0.03] border border-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4 transition-colors hover:bg-white/5">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                       <Check size={14} className="md:size-16" />
                    </div>
                    <span className="text-white text-xs md:text-base font-medium tracking-tight">{f}</span>
                 </div>
               ))}
            </div>

            <div className="relative p-4 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm overflow-hidden mb-8 md:mb-12">
               <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
                  <div>
                    <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                      {settings.product_price_title || "VÁRHATÓ KIVITELEZÉSI ÁR"}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-3xl md:text-7xl font-black tracking-tighter leading-none">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      <span className="text-primary text-base md:text-xl font-bold uppercase ml-1">FT</span>
                    </div>
                    <p className="text-zinc-600 text-[10px] mt-2 md:mt-4 font-bold uppercase tracking-widest">{settings.product_modal_vat_info || "AZ ÁRAK TARTALMAZZÁK AZ ÁFÁT"}</p>
                    
                    {product.priceIncludes && (
                      <p className="text-primary/70 text-[10px] md:text-xs mt-2 md:mt-4 font-bold uppercase tracking-wider italic border-t border-white/5 pt-2 md:pt-4">
                        * {product.priceIncludes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-1 items-start md:items-end">
                     <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">ÁLLAPOT</span>
                     <span className="text-primary text-xs font-bold uppercase tracking-widest bg-primary/5 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-primary/20">{settings.product_card_availability_info || "RAKTÁRKÉSZLETEN"}</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="sticky bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black via-black to-transparent pt-8 md:pt-12 md:px-16 md:pb-16">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl">
              <button 
                onClick={() => { onClose(); openQuote(); }}
                className="flex-[2] bg-primary hover:bg-white text-black py-3 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-base tracking-widest transition-all transform hover:scale-[1.01] active:scale-95 shadow-xl shadow-primary/10 flex items-center justify-center gap-3"
              >
                INGYENES AJÁNLATOT KÉREK <ArrowRight size={16} className="md:size-20" />
              </button>
              <a 
                href="tel:+36301738866"
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 md:py-5 rounded-xl md:rounded-2xl font-black uppercase text-xs md:text-base tracking-widest transition-all flex items-center justify-center gap-3"
              >
                <Phone size={16} className="md:size-20" /> HÍVÁS
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
