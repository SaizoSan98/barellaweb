"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Contact() {
  return (
    <footer id="contact" className="relative bg-black pt-20 pb-0 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[150px] rounded-full opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal-900/20 blur-[150px] rounded-full opacity-30 pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1] pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* CTA Section - More Compact */}
        <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div className="max-w-3xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6"
                >
                    Valósítsuk meg <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">elképzeléseit.</span>
                </motion.h2>
                <p className="text-lg text-gray-400 max-w-xl border-l-2 border-primary/50 pl-6">
                    Legyen szó tervezésről vagy kivitelezésről, mi készen állunk a kihívásokra.
                </p>
            </div>
            
            <motion.a 
                href="mailto:barella.gep@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl text-sm font-bold uppercase tracking-widest overflow-hidden shrink-0"
            >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Kapcsolatfelvétel</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <ArrowUpRight className="relative z-10 group-hover:text-white transition-colors duration-300 w-5 h-5" />
            </motion.a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
            {/* Brand & Social */}
            <div className="lg:col-span-4 space-y-8">
                <Link href="/" className="block group">
                    <h3 className="text-3xl font-black tracking-tighter uppercase text-white group-hover:text-primary transition-colors duration-300">
                        BARELLA <span className="text-primary group-hover:text-white transition-colors duration-300">ÉPÜLETGÉPÉSZET</span>
                    </h3>
                </Link>
                <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                    Ipari precizitású épületgépészeti megoldások. Innovatív technológiák és megbízható szakértelem egy helyen.
                </p>
                <div className="flex gap-3">
                    <SocialButton icon={Facebook} href="#" />
                    <SocialButton icon={Instagram} href="#" />
                    <SocialButton icon={Linkedin} href="#" />
                </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Navigáció</h4>
                <ul className="space-y-4">
                    <FooterLink href="/">Kezdőlap</FooterLink>
                    <FooterLink href="#services">Szolgáltatások</FooterLink>
                    <FooterLink href="#references">Referenciák</FooterLink>
                    <FooterLink href="#contact">Kapcsolat</FooterLink>
                </ul>
            </div>

            {/* Contact Info Cards - Redesigned Premium */}
            <div className="lg:col-span-5 space-y-4">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Elérhetőségek</h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ContactCard icon={Mail} label="Email" value="barella.gep@gmail.com" href="mailto:barella.gep@gmail.com" />
                    <ContactCard icon={Phone} label="Telefon" value="+36 30 173 88 66" href="tel:+36301738866" />
                    <ContactCard icon={MapPin} label="Székhely" value="Magyarország" fullWidth />
                 </div>
            </div>
        </div>

        {/* Huge Footer Text - Marquee Effect */}
        <div className="border-t border-white/10 pt-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
             
             <div className="w-full overflow-hidden mb-8 opacity-10 select-none pointer-events-none">
                <div 
                    className="flex whitespace-nowrap gap-12 will-change-transform"
                    style={{ animation: "marquee 30s linear infinite" }}
                >
                    <span className="text-[5rem] md:text-[8rem] font-black uppercase leading-none text-transparent [-webkit-text-stroke:2px_white]">BARELLA ÉPÜLETGÉPÉSZET</span>
                    <span className="text-[5rem] md:text-[8rem] font-black uppercase leading-none text-transparent [-webkit-text-stroke:2px_white]">BARELLA ÉPÜLETGÉPÉSZET</span>
                </div>
             </div>
             
             <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs relative z-20 pb-8">
                <p>© {new Date().getFullYear()} BARELLA Épületgépészet.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Adatvédelem</a>
                    <a href="#" className="hover:text-primary transition-colors">ÁSZF</a>
                </div>
             </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href}
      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group backdrop-blur-sm"
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
        <span className="group-hover:translate-x-2 transition-transform duration-300">{children}</span>
      </Link>
    </li>
  );
}

function ContactCard({ icon: Icon, label, value, href, fullWidth }: { icon: any, label: string, value: string, href?: string, fullWidth?: boolean }) {
    const Content = () => (
        <div className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 group h-full ${fullWidth ? 'col-span-1 sm:col-span-2' : ''}`}>
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Icon size={18} />
            </div>
            <div className="min-w-0 overflow-hidden">
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">{label}</span>
                <span className="text-sm text-white font-medium group-hover:text-primary transition-colors duration-300 truncate block">{value}</span>
            </div>
        </div>
    );

    if (href) {
        return <a href={href} className={fullWidth ? 'col-span-1 sm:col-span-2' : ''}>{Content()}</a>;
    }
    return Content();
}
