"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/lib/data";
import Link from "next/link";

// Take only the first 3 projects for the home page
const projects = projectsData.slice(0, 3);

export function References() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="references" ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background Text Decoration */}
      <div className="absolute top-20 right-0 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[20vw] font-black text-white leading-none">WORK</span>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
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
          
          <a 
            href="/referenciak"
            className="text-white border-b border-primary pb-1 hover:text-primary transition-colors uppercase tracking-widest text-sm font-bold flex items-center gap-2"
          >
            Összes megtekintése <ArrowUpRight size={16} />
          </a>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
    >
      <div className="w-full md:w-3/5 relative group perspective-1000">
        <div className="overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(45,212,191,0.2)]">
          <motion.div style={{ y: isEven ? y : y }} className="relative aspect-[16/9] w-full transform transition-transform duration-700 group-hover:scale-105">
             <Image
              src={project.coverImage || project.image}
              alt={project.title}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
            
            {/* Overlay Content on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center bg-black/20">
                    <ArrowUpRight className="text-white w-8 h-8" />
                </div>
            </div>
          </motion.div>
        </div>
        
        {/* Corner Accents - Enhanced */}
        <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
      </div>

      <div className="w-full md:w-2/5 md:px-8">
        <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-primary/50" />
            <span className="text-primary font-black tracking-[0.2em] text-xs uppercase">{project.category}</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
            {project.title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light border-l-2 border-white/10 pl-6">
          {project.description}
        </p>
        <Link 
          href={`/referenciak/${project.id}`}
          className="group inline-flex items-center gap-4 text-white font-bold text-sm uppercase tracking-widest hover:text-primary transition-colors"
        >
          <span className="relative">
            Projekt megtekintése
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
            <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
