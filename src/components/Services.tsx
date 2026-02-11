"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Snowflake, Zap, Layers, ThermometerSun, ArrowRight, Phone } from "lucide-react";
import { MouseEvent, ElementType } from "react";
import Image from "next/image";
import { useQuote } from "@/components/QuoteContext";

type ServiceItem = {
  icon: ElementType;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  details: string[];
  colSpan: string;
};

const services = [
  {
    icon: Snowflake,
    title: "KLÍMATECHNIKA",
    subtitle: "Intelligens Hűtés",
    description: "Feltöltés alatt..",
    image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=2070&auto=format&fit=crop", // Abstract AC/Air flow
    details: ["Daikin, Gree, Mitsubishi rendszerek", "Rejtett csövezés", "Wi-Fi vezérlés", "Éves karbantartás"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "HŐSZIVATTYÚK",
    subtitle: "Zöld Energia",
    description: "Feltöltés alatt..",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop", // Industrial/Tech
    details: ["COP 4.0+ hatékonyság", "Padlófűtéshez optimalizálva", "HMV készítés"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "PADLÓFŰTÉS",
    subtitle: "Láthatatlan Komfort",
    description: "Feltöltés alatt..",
    image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=2070&auto=format&fit=crop", // Underfloor heating pipes
    details: ["Tacker rendszer", "Osztó-gyűjtő szerelés", "Betonozás"],
    colSpan: "md:col-span-1",
  },
  {
    icon: ThermometerSun,
    title: "MENNYEZETFŰTÉS",
    subtitle: "Sugárzó Technológia",
    description: "Feltöltés alatt..",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop", // Modern interior ceiling
    details: ["Nincs légmozgás", "Ideális allergiásoknak", "Gyors reagálás"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Snowflake,
    title: "KLÍMATISZTÍTÁS",
    subtitle: "Higiénikus Levegő",
    description: "Feltöltés alatt..",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop", // Clean AC Unit
    details: [],
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "VÍZVEZETÉK–CSATORNA",
    subtitle: "Kivitelezés",
    description: "Feltöltés alatt..",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
    details: [],
    colSpan: "md:col-span-1",
  },
];

export function Services() {
  const { openQuote } = useQuote();

  return (
    <section id="services" className="py-20 md:py-32 bg-background relative border-t border-white/5 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-12 bg-primary" />
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Szolgáltatások</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
            Mérnöki <span className="text-gray-600">megoldások</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl font-light">
            Nem csak szerelünk. Tervezünk, optimalizálunk és rendszert építünk.
            Ismerje meg high-end épületgépészeti szolgáltatásainkat.
          </p>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex items-center gap-2 text-primary/60 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
            <ArrowRight size={16} />
            <span>Húzza el a folytatáshoz</span>
        </div>

        {/* MOBILE LAYOUT: Horizontal Snap Scroll with "Extreme" Cards */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
            {services.map((service, index) => (
                <div key={service.title} className="snap-center shrink-0 w-[85vw]">
                     <ServiceCardMobile service={service} index={index} openQuote={openQuote} />
                </div>
            ))}
            {/* Spacer for end of list */}
            <div className="w-2 shrink-0" />
        </div>

        {/* DESKTOP LAYOUT: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCardDesktop 
              key={service.title} 
              service={service} 
              index={index} 
              openQuote={openQuote} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCardMobile({ service, index, openQuote }: { service: ServiceItem; index: number; openQuote: () => void }) {
    return (
        <div className="relative h-[500px] rounded-3xl overflow-hidden group border border-white/10 shadow-2xl">
            {/* Full Height Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="85vw"
                />
                {/* Gradient Overlay - Darker at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-end p-6">
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                     <service.icon size={20} className="text-primary" />
                </div>

                <div className="mb-2">
                     <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                        {service.subtitle}
                     </span>
                     <h3 className="text-3xl font-black text-white uppercase leading-none mb-2 drop-shadow-lg">
                        {service.title}
                     </h3>
                </div>

                <p className="text-gray-300 text-sm font-medium mb-6 line-clamp-3">
                    {service.description}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={openQuote}
                        className="bg-primary text-black py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
                    >
                        Ajánlat <ArrowRight size={14} />
                    </button>
                    <a 
                        href="tel:+36301738866"
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                    >
                        Hívás <Phone size={14} />
                    </a>
                </div>
            </div>
        </div>
    )
}

function ServiceCardDesktop({ service, index, openQuote }: { service: ServiceItem; index: number; openQuote: () => void }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(45, 212, 191, 0.15),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative rounded-3xl border border-white/10 bg-black overflow-hidden ${service.colSpan} flex flex-col`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal transform scale-105 group-hover:scale-110 transition-transform">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover object-center"
          sizes="33vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

      <div className="relative z-10 h-full flex flex-col p-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <service.icon size={24} className="text-gray-300 group-hover:text-primary transition-colors w-7 h-7" />
          </div>
          <span className="text-[10px] font-black text-primary/70 uppercase tracking-[0.2em] border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-md bg-black/20 group-hover:bg-primary/10 group-hover:text-primary transition-all">
            {service.subtitle}
          </span>
        </div>
        
        <h3 className="text-4xl font-black mb-4 text-white group-hover:text-primary transition-colors uppercase tracking-tight">{service.title}</h3>
        <p className="text-gray-400 leading-relaxed mb-8 flex-grow font-light text-lg">
          {service.description}
        </p>

        <div className="space-y-4 border-t border-white/5 pt-8 mt-auto">
          {service.details.map((detail: string, i: number) => (
            <div key={i} className="flex items-center gap-4 text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all" />
              {detail}
            </div>
          ))}
          
          {/* Inline CTA Buttons */}
          <div className="flex flex-row gap-3 mt-6 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
             <button 
               onClick={openQuote}
               className="flex-1 bg-white/10 hover:bg-primary hover:text-black border border-white/10 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
             >
               Ajánlatkérés <ArrowRight size={14} />
             </button>
             <a 
               href="tel:+36301738866"
               className="flex-1 bg-transparent hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
             >
               Hívás <Phone size={14} />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
