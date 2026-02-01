"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/lib/data";

export default function ReferencesPage() {
  return (
    <QuoteProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        <div className="pt-32 pb-20 px-4 container mx-auto">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase mb-6">
              Összes <span className="text-primary">Referencia</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Tekintse meg eddigi munkáinkat. Büszkék vagyunk rá, hogy minden projektünkben a maximális minőségre törekszünk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <Link key={project.id} href={`/referenciak/${project.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                     <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/90 text-black px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            MEGTEKINTÉS
                        </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                     <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                     <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                       {project.description}
                     </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <Contact />
        <MobileStickyBar />
        <QuoteModal />
      </main>
    </QuoteProvider>
  );
}
