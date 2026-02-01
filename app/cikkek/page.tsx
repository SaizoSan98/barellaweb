"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { QuoteProvider } from "@/components/QuoteContext";
import { QuoteModal } from "@/components/QuoteModal";
import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/lib/data";

export default function BlogPage() {
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
              Hasznos <span className="text-primary">Cikkek</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Szakmai tanácsok, tippek és érdekességek az épületgépészet világából. Olvassa el legfrissebb írásainkat!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogData.map((post, index) => (
              <Link key={post.id} href={`/cikkek/${post.id}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                     <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Hover Overlay Icon - Desktop */}
                    <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-primary/90 text-black px-4 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            OLVASÁS
                        </div>
                    </div>

                    {/* Mobile Badge - Always Visible */}
                    <div className="absolute bottom-4 right-4 md:hidden bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg z-10">
                      OLVASÁS
                    </div>
                  </div>
                  
                  <div className="p-6">
                     <div className="flex justify-between items-center mb-3">
                        <span className="text-primary text-xs font-bold tracking-widest uppercase block">{post.category}</span>
                        <span className="text-gray-500 text-xs">{post.date}</span>
                     </div>
                     <h3 className="text-xl font-bold text-white mb-3 leading-tight">{post.title}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                       {post.excerpt}
                     </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        <Contact />
        <QuoteModal />
      </main>
    </QuoteProvider>
  );
}
