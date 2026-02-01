"use client";

import { QuoteProvider, useQuote } from "@/components/QuoteContext";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { QuoteModal } from "@/components/QuoteModal";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogPostDetailClient({ post }: { post: any }) {
  if (!post) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <h1 className="text-2xl">A keresett cikk nem található.</h1>
        </div>
    );
  }

  return (
    <QuoteProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
            <Link 
              href="/cikkek" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              Vissza a cikkekhez
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary font-bold tracking-widest uppercase mb-2 block">{post.category}</span>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 max-w-4xl">{post.title}</h1>
              <div className="flex flex-wrap gap-6 text-gray-300 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-primary" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-primary" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Description */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p className="text-xl text-gray-200 leading-relaxed font-light mb-8 border-l-4 border-primary pl-6 italic">
                  {post.excerpt}
                </p>
                
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line mb-8">
                    {post.fullDescription}
                  </p>
                  
                  {post.sections && post.sections.map((section: any, idx: number) => (
                    <div key={idx} className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              {post.gallery && post.gallery.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-primary block" />
                    Galéria
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.gallery.map((img: string, idx: number) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative rounded-xl overflow-hidden cursor-pointer group ${idx === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'}`}
                      >
                        <Image
                          src={img}
                          alt={`${post.title} - ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Tags & CTA (Sticky) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                  <Tag size={20} className="text-primary" />
                  Kapcsolódó Témák
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.technologies && post.technologies.map((tech: string, idx: number) => (
                    <span key={idx} className="bg-white/5 text-gray-300 text-sm px-3 py-1.5 rounded-full border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h4 className="text-white font-bold mb-2">Szakszerű kivitelezésre van szüksége?</h4>
                  <p className="text-sm text-gray-400 mb-6">
                    Kérjen ingyenes konzultációt és árajánlatot épületgépészeti munkákra!
                  </p>
                  <QuoteButton />
                </div>
              </div>
            </div>

          </div>
        </div>

        <Contact />
        <QuoteModal />
      </main>
    </QuoteProvider>
  );
}

// Helper component to use quote context
function QuoteButton() {
  const { openQuote } = useQuote();
  return (
    <button 
      onClick={openQuote}
      className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors"
    >
      AJÁNLATKÉRÉS
    </button>
  );
}
