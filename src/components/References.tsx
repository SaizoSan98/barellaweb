"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";
import { useRef, useState, MouseEvent } from "react";
import { ArrowUpRight, ArrowRight, Phone } from "lucide-react";
import { projectsData } from "@/lib/data";
import Link from "next/link";
import { useQuote } from "@/components/QuoteContext";

// Take only the first 3 projects for the home page
const projects = projectsData.slice(0, 3);

export function References() {
  const containerRef = useRef(null);
  const { openQuote } = useQuote();

  return (
    <section id="references" ref={containerRef} className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Background Text Decoration - Keep it simple */}
      <div className="absolute top-20 right-0 opacity-[0.02] select-none pointer-events-none">
        <span className="text-[20vw] font-black text-white leading-none">WORK</span>
      </div>
      
      {/* Background Gradient - Removed blur for better animation performance */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
               <div className="h-[1px] w-12 bg-primary" />
               <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Referenciák</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              Kiemelt <span className="text-gray-600">projektjeink</span>
            </h2>
          </div>
          
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex items-center gap-2 text-primary/60 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
            <ArrowRight size={16} />
            <span>Húzza el a folytatáshoz</span>
        </div>

        {/* MOBILE LAYOUT: Horizontal Snap Scroll with "Extreme" Cards */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
            {projects.map((project, index) => (
                <div key={project.id} className="snap-center shrink-0 w-[85vw]">
                     <ProjectCardMobile project={project} index={index} openQuote={openQuote} />
                </div>
            ))}
            {/* Spacer for end of list */}
            <div className="w-2 shrink-0" />
        </div>

        {/* DESKTOP LAYOUT: Expanding Flex Cards */}
        <div className="hidden md:block">
            <ExpandingProjectsRow projects={projects} />
        </div>
      </div>
    </section>
  );
}

function ProjectCardMobile({ project, index, openQuote }: { project: any, index: number, openQuote: () => void }) {
    return (
        <div className="relative h-[500px] rounded-3xl overflow-hidden group border border-white/10 shadow-2xl">
            {/* Full Height Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={project.coverImage || project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="85vw"
                />
                {/* Gradient Overlay - Darker at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-end p-6">
                
                {/* Category Badge */}
                <div className="absolute top-6 right-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                        {project.category}
                    </span>
                </div>

                <div className="mb-2">
                     <h3 className="text-3xl font-black text-white uppercase leading-none mb-2 drop-shadow-lg">
                        {project.title}
                     </h3>
                </div>

                <p className="text-gray-300 text-sm font-medium mb-6 line-clamp-3">
                    {project.description}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 gap-3">
                    <button 
                        onClick={openQuote}
                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                    >
                        Ajánlatkérés <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}

function ExpandingProjectsRow({ projects }: { projects: any[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default first item active

    return (
        <div className="flex w-full gap-4 h-[600px]">
            {projects.map((project, index) => (
                <ProjectCardExpanding 
                    key={project.id} 
                    project={project} 
                    isActive={activeIndex === index}
                    onHover={() => setActiveIndex(index)}
                    onLeave={() => setActiveIndex(null)}
                />
            ))}
        </div>
    );
}

function ProjectCardExpanding({ project, isActive, onHover, onLeave }: { project: any; isActive: boolean; onHover: () => void; onLeave: () => void }) {
    return (
        <motion.div
            layout
            initial={false}
            animate={{ flex: isActive ? 2 : 1 }}
            transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 40,
                mass: 1,
                layout: { duration: 0.3 }
            }}
            className="relative rounded-3xl overflow-hidden cursor-pointer group h-full [will-change:flex,transform] [backface-visibility:hidden]"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
             {/* Background Image */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src={project.coverImage || project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1200px) 33vw, 60vw"
                    priority={project.id <= 3}
                />
                <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isActive ? 'opacity-30' : 'opacity-60'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 z-10 pointer-events-none">
                
                {/* Vertical Title for Inactive State */}
                <motion.div 
                    layout
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-100'}`}
                >
                    <h3 className="text-3xl font-black text-white uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 whitespace-nowrap opacity-80">
                        {project.title}
                    </h3>
                </motion.div>

                {/* Active Content */}
                <motion.div 
                    layout
                    className={`transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}
                >
                     <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                        {project.category}
                     </span>
                     <h3 className="text-5xl font-black text-white uppercase leading-none mb-6 drop-shadow-lg">
                        {project.title}
                     </h3>
                     <p className="text-gray-300 text-lg font-medium mb-8 max-w-xl line-clamp-3">
                        {project.description}
                     </p>
                </motion.div>
            </div>
        </motion.div>
    )
}
