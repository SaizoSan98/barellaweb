"use client";

// Simple SVG placeholders for brands if real logos are not available.
// In a real project, these should be replaced with actual brand SVG logos.
const brands = [
  { name: "Daikin", color: "#0099D8" },
  { name: "Mitsubishi", color: "#E60012" },
  { name: "Panasonic", color: "#00438F" },
  { name: "Gree", color: "#009743" },
  { name: "Bosch", color: "#E20015" },
  { name: "Toshiba", color: "#0096D6" },
  { name: "Samsung", color: "#FF0000" },
  { name: "LG", color: "#1428A0" },
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
              <span 
                key={`b1-${index}`} 
                className="text-xl md:text-2xl font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors cursor-default select-none"
              >
                {brand.name}
              </span>
            ))}
          </div>
          
          {/* Second set of brands */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {brands.map((brand, index) => (
              <span 
                key={`b2-${index}`} 
                className="text-xl md:text-2xl font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors cursor-default select-none"
              >
                {brand.name}
              </span>
            ))}
          </div>

          {/* Third set of brands for ultra-wide screens to ensure coverage */}
          <div className="flex gap-12 md:gap-24 px-6 md:px-12 items-center">
            {brands.map((brand, index) => (
              <span 
                key={`b3-${index}`} 
                className="text-xl md:text-2xl font-black text-gray-600 uppercase tracking-widest hover:text-white transition-colors cursor-default select-none"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
