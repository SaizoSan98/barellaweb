"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Phone, Check, Tag, ChevronDown } from "lucide-react";
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
                viewport={{ once: true, margin: "-50px" }}
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
                            {product.vatInfo || "ÁFA-val"}
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

  // Scroll lock
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const images = product.images || ["/images/ref1.jpg"];
  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "";
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  const hasSale = product.sale && product.salePrice && product.salePrice > 0;
  const displayPrice = hasSale ? product.salePrice : product.price;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="relative w-full h-[90vh] md:h-auto md:max-w-5xl md:max-h-[85vh] bg-white rounded-t-3xl md:rounded-3xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile handle indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full md:hidden z-[260]" />

        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[250] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 md:bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-800 transition-all shadow-sm md:shadow-none"
        >
          <X size={20} className="md:size-24" />
        </button>

        {/* Left Section: Image Gallery */}
        <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto bg-gray-50 flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt={product.brand}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {images.length > 1 && (
            <div className="absolute bottom-14 md:bottom-6 left-0 right-0 flex justify-center gap-2 z-10 px-4">
              {images.map((_ ,idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-full ${idx === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-white/80 hover:bg-white'} shadow-sm`}
                />
              ))}
            </div>
          )}

          <div className="absolute top-6 left-6 z-10">
              <span className="bg-primary text-black text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-md">
                {product.exclusiveLabel || "BARELLA EXCLUSIVE"}
              </span>
          </div>

          {/* Mobile scroll indicator */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center md:hidden z-20 pointer-events-none">
            <div className="flex flex-col items-center animate-bounce text-gray-800 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-white/50">
              <span className="text-[9px] font-black uppercase tracking-widest">Részletek & Árak</span>
              <ChevronDown size={14} className="mt-0.5" />
            </div>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex-1 flex flex-col min-h-0 bg-white">
          <div className="p-6 md:p-10 flex-1">
            
            {/* Header */}
            <div className="mb-6">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.brand} <span className="font-light text-gray-500">{product.type}</span>
              </h2>
              <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {product.availabilityInfo || "RAKTÁRKÉSZLETEN"}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8">
              {product.description || "Ez a prémium berendezés a legmagasabb minőséget képviseli kínálatunkban. Kimagasló mérnöki munka, hosszú élettartam és esztétikus megjelenés jellemzi minden modellünket."}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Főbb jellemzők</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing Box */}
             <div className="bg-gray-50 p-5 md:p-6 rounded-2xl border border-gray-100 mb-6">
               <div className="flex flex-col">
                 <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2">
                   {product.priceTitle || "VÁRHATÓ KIVITELEZÉSI ÁR"}
                 </span>
                 
                 {displayPrice ? (
                   <div className="flex items-baseline gap-2 mb-1">
                     <span className="text-gray-900 text-3xl md:text-5xl font-black tracking-tight">
                       {formatPrice(displayPrice)}
                     </span>
                     <span className="text-gray-500 font-bold text-lg">Ft</span>
                   </div>
                 ) : (
                   <span className="text-gray-900 text-2xl font-bold mb-1">Ár kérésre</span>
                 )}
 
                 {(displayPrice ?? 0) > 0 && (
                   <p className="text-gray-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                     {product.vatInfo || "AZ ÁRAK TARTALMAZZÁK AZ ÁFÁT"}
                   </p>
                 )}

                {product.priceIncludes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-600 text-xs md:text-sm">
                      <span className="font-bold text-gray-800 mr-1">Az ár tartalmazza:</span> 
                      {product.priceIncludes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons - Sticky Bottom */}
          <div className="sticky bottom-0 left-0 right-0 p-4 md:p-6 bg-white border-t border-gray-100 flex flex-col sm:flex-row gap-3 mt-auto shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
            <button 
              onClick={() => { onClose(); openQuote(); }}
              className="flex-[2] bg-primary hover:bg-primary/90 text-black py-4 rounded-xl font-bold uppercase text-xs md:text-sm tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Ingyenes ajánlatot kérek <ArrowRight size={18} />
            </button>
            <a 
              href="tel:+36301738866"
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-bold uppercase text-xs md:text-sm tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={18} /> Hívás
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
