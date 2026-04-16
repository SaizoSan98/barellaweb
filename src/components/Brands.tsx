"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Brand data with logo paths
const brands = [
  { name: "Daikin", logo: "/images/brands/daikin.svg" },
  { name: "Mitsubishi", logo: "/images/brands/mitsubishi.svg" },
  { name: "Panasonic", logo: "/images/brands/panasonic.svg" },
  { name: "Gree", logo: "/images/brands/gree.svg" },
  { name: "Bosch", logo: "/images/brands/bosch.svg" },
  { name: "Toshiba", logo: "/images/brands/toshiba.svg" },
  { name: "Samsung", logo: "/images/brands/samsung.svg" },
  { name: "LG", logo: "/images/brands/lg.svg" },
];

export function Brands() {
  // Triple the brands array to ensure a seamless infinite loop coverage
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-zinc-500 text-[10px] md:text-sm font-black uppercase tracking-[0.4em]"
        >
          Kiemelt Technológiai Partnereink
        </motion.p>
      </div>
      
      <div className="relative flex overflow-hidden">
        {/* Deep Gradient Masks for high-end feel */}
        <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />

        {/* Framer Motion Marquee - Perfectly smooth, independent of CSS loading */}
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1032], // Approximately -1/3 of the duplicated content width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          <div className="flex gap-16 md:gap-32 px-12 items-center">
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={`${brand.name}-${index}`} 
                className="relative w-32 h-10 md:w-44 md:h-14 opacity-30 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 cursor-default"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 176px"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
