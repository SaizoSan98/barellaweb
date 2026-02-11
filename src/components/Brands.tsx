"use client";

import Image from "next/image";

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
  return (
    <section className="py-10 bg-black border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">
          Kiemelt Technológiai Partnereink
        </p>
      </div>
      
      <div className="relative flex overflow-hidden group">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Marquee Container - duplicated content for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
          {/* First set of brands */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {brands.map((brand, index) => (
              <div 
                key={`b1-${index}`} 
                className="relative w-32 h-12 md:w-40 md:h-16 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Second set of brands */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {brands.map((brand, index) => (
              <div 
                key={`b2-${index}`} 
                className="relative w-32 h-12 md:w-40 md:h-16 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Third set of brands for ultra-wide screens to ensure coverage */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {brands.map((brand, index) => (
              <div 
                key={`b3-${index}`} 
                className="relative w-32 h-12 md:w-40 md:h-16 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-default"
              >
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

