"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

export function Contact() {
  return (
    <footer id="contact" className="relative bg-black pt-32 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[150px] rounded-full opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal-900/20 blur-[150px] rounded-full opacity-30 pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-[1] pointer-events-none mix-blend-overlay" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* CTA Section */}
        <div className="mb-32 flex flex-col md:flex-row items-end justify-between gap-12 border-b border-white/10 pb-20">
            <div className="max-w-4xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8"
                >
                    Valósítsuk meg <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">elképzeléseit.</span>
                </motion.h2>
                <p className="text-xl text-gray-400 max-w-xl border-l-2 border-primary/50 pl-6">
                    Legyen szó tervezésről vagy kivitelezésről, mi készen állunk a kihívásokra. Lépjen velünk kapcsolatba még ma!
                </p>
            </div>
            
            <motion.a 
                href="mailto:barella.gep@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black rounded-full text-lg font-bold uppercase tracking-widest overflow-hidden"
            >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Kapcsolatfelvétel</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <ArrowUpRight className="relative z-10 group-hover:text-white transition-colors duration-300" />
            </motion.a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            {/* Brand & Social */}
            <div className="lg:col-span-5 space-y-12">
                <Link href="/" className="block group">
                    <h3 className="text-4xl font-black tracking-tighter uppercase text-white group-hover:text-primary transition-colors duration-300">
                        BARELLA <span className="text-primary group-hover:text-white transition-colors duration-300">ÉPÜLETGÉPÉSZET</span>
                    </h3>
                </Link>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                    Ipari precizitású épületgépészeti megoldások. Innovatív technológiák és megbízható szakértelem egy helyen.
                </p>
                <div className="flex gap-4">
                    <SocialButton icon={Facebook} href="#" />
                    <SocialButton icon={Instagram} href="#" />
                    <SocialButton icon={Linkedin} href="#" />
                </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Navigáció</h4>
                <ul className="space-y-6">
                    <FooterLink href="/">Kezdőlap</FooterLink>
                    <FooterLink href="#services">Szolgáltatások</FooterLink>
                    <FooterLink href="#references">Referenciák</FooterLink>
                    <FooterLink href="#contact">Kapcsolat</FooterLink>
                </ul>
            </div>

            {/* Contact Info Cards */}
            <div className="lg:col-span-4 space-y-6">
                 <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-8">Elérhetőségek</h4>
                 <ContactCard icon={Mail} label="Email Cím" value="barella.gep@gmail.com" href="mailto:barella.gep@gmail.com" />
                 <ContactCard icon={Phone} label="Telefonszám" value="+36 30 173 88 66" href="tel:+36301738866" />
                 <ContactCard icon={MapPin} label="Székhely" value="Magyarország" />
            </div>
        </div>

        {/* Huge Footer Text - Marquee Effect */}
        <div className="border-t border-white/10 pt-12 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
             
             <div className="w-full overflow-hidden mb-12 opacity-10 select-none pointer-events-none">
                <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                    className="flex whitespace-nowrap gap-12"
                >
                    <span className="text-[6rem] md:text-[10rem] font-black uppercase leading-none text-transparent [-webkit-text-stroke:2px_white]">BARELLA ÉPÜLETGÉPÉSZET</span>
                    <span className="text-[6rem] md:text-[10rem] font-black uppercase leading-none text-transparent [-webkit-text-stroke:2px_white]">BARELLA ÉPÜLETGÉPÉSZET</span>
                </motion.div>
             </div>
             
             <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm relative z-20">
                <p>© {new Date().getFullYear()} BARELLA Épületgépészet. Minden jog fenntartva.</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-primary transition-colors">Adatvédelmi nyilatkozat</a>
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
      className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 group backdrop-blur-sm"
    >
      <Icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
    </a>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group text-lg">
        <span className="w-2 h-2 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
        <span className="group-hover:translate-x-2 transition-transform duration-300">{children}</span>
      </Link>
    </li>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
    const Content = () => (
        <div className="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <Icon size={24} />
            </div>
            <div>
                <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</span>
                <span className="text-lg text-white font-medium group-hover:text-primary transition-colors duration-300">{value}</span>
            </div>
        </div>
    );

    if (href) {
        return <a href={href} className="block">{Content()}</a>;
    }
    return Content();
}
