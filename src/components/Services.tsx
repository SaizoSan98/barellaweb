"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Snowflake, Zap, Layers, ThermometerSun, ArrowRight, Phone } from "lucide-react";
import { MouseEvent, ElementType, useState } from "react";
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
    image: "/images/climate1.jpg", // Local image
    details: ["Daikin, Gree, Mitsubishi rendszerek", "Rejtett csövezés", "Wi-Fi vezérlés", "Éves karbantartás"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "HŐSZIVATTYÚK",
    subtitle: "Zöld Energia",
    description: "Feltöltés alatt..",
    image: "/images/heatpump.jpeg", // Local image
    details: ["COP 4.0+ hatékonyság", "Padlófűtéshez optimalizálva", "HMV készítés"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "PADLÓFŰTÉS",
    subtitle: "Láthatatlan Komfort",
    description: "Feltöltés alatt..",
    image: "/images/padlofutes.jpg", // Local image
    details: ["Tacker rendszer", "Osztó-gyűjtő szerelés", "Betonozás"],
    colSpan: "md:col-span-1",
  },
  {
    icon: ThermometerSun,
    title: "MENNYEZETFŰTÉS",
    subtitle: "Sugárzó Technológia",
    description: "Feltöltés alatt..",
    image: "/images/mennyezetfutes.jpg", // Local image
    details: ["Nincs légmozgás", "Ideális allergiásoknak", "Gyors reagálás"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Snowflake,
    title: "KLÍMATISZTÍTÁS",
    subtitle: "Higiénikus Levegő",
    description: "Feltöltés alatt..",
    image: "/images/climate2.jpg", // Local image
    details: [],
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "VÍZVEZETÉK–CSATORNA",
    subtitle: "Kivitelezés",
    description: "Feltöltés alatt..",
    image: "/images/vizvezetek.jpg", // Local image
    details: [],
    colSpan: "md:col-span-1",
  },
];

export function Services() {
  const { openQuote } = useQuote();

  // Split services into two rows for desktop expanding layout
  const firstRow = services.slice(0, 3);
  const secondRow = services.slice(3, 6);

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

        {/* DESKTOP LAYOUT: Expanding Flex Cards */}
        <div className="hidden md:flex flex-col gap-6">
            <ExpandingRow services={firstRow} openQuote={openQuote} />
            <ExpandingRow services={secondRow} openQuote={openQuote} />
        </div>
      </div>
    </section>
  );
}

function ExpandingRow({ services, openQuote }: { services: ServiceItem[], openQuote: () => void }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default first item active

    return (
        <div className="flex w-full gap-4 h-[500px]" onMouseLeave={() => setActiveIndex(null)}>
            {services.map((service, index) => (
                <ServiceCardExpanding 
                    key={service.title} 
                    service={service} 
                    isActive={activeIndex === index}
                    onHover={() => setActiveIndex(index)}
                    openQuote={openQuote}
                />
            ))}
        </div>
    );
}

function ServiceCardExpanding({ service, isActive, onHover, openQuote }: { service: ServiceItem; isActive: boolean; onHover: () => void; openQuote: () => void }) {
    return (
        <div 
            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group ${isActive ? 'flex-[3]' : 'flex-1'}`}
            onMouseEnter={onHover}
        >
             {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100 grayscale-[50%]'}`}
                    sizes="(max-width: 1200px) 33vw, 50vw"
                />
                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isActive ? 'opacity-40' : 'opacity-70 hover:opacity-50'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 z-10">
                {/* Icon - Always visible but moves */}
                <div className={`absolute top-8 left-8 transition-all duration-500 ${isActive ? 'bg-black/40 backdrop-blur-md w-16 h-16 rounded-2xl border border-white/10' : 'bg-transparent w-auto h-auto'}`}>
                    <div className="w-full h-full flex items-center justify-center">
                        <service.icon size={isActive ? 32 : 28} className={`text-primary transition-all duration-300 ${isActive ? 'scale-100' : 'scale-100'}`} />
                    </div>
                </div>

                {/* Vertical Title for Inactive State */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-100'}`}>
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 whitespace-nowrap opacity-80">
                        {service.title}
                    </h3>
                </div>

                {/* Active Content */}
                <div className={`transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
                     <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                        {service.subtitle}
                     </span>
                     <h3 className="text-4xl font-black text-white uppercase leading-none mb-4 drop-shadow-lg">
                        {service.title}
                     </h3>
                     <p className="text-gray-300 text-base font-medium mb-8 max-w-lg line-clamp-3">
                        {service.description}
                     </p>

                     <div className="flex gap-4">
                        <button 
                            onClick={(e) => { e.stopPropagation(); openQuote(); }}
                            className="bg-primary hover:bg-white text-black py-3 px-6 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center gap-2"
                        >
                            Ajánlatkérés <ArrowRight size={16} />
                        </button>
                     </div>
                </div>
            </div>
        </div>
    )
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
