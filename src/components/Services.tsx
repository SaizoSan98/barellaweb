"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Snowflake, Zap, Layers, ThermometerSun, ArrowRight, Phone, X, ChevronDown, Plug, Droplets } from "lucide-react";
import { ElementType, useState } from "react";
import Image from "next/image";
import { useQuote } from "@/components/QuoteContext";
import type { Service } from "@/db/schema";

const SERVICE_ICONS: ElementType[] = [Snowflake, Zap, ThermometerSun, Layers, Plug, Plug, Droplets];

type ServiceItem = {
  icon: ElementType;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  details: string[];
  gallery: string[];
  colSpan: string;
};

const _staticServices = [
  {
    icon: Snowflake,
    title: "KLÍMATECHNIKA",
    subtitle: "Intelligens Hűtés",
    description: "Lakossági és ipari klímarendszerek szakszerű telepítése, helyszíni felméréstől a teljes kivitelezésig.",
    fullDescription: `Minden egyes telepítésünknél a tiszta, precíz és pontos munkavégzés az alapelvünk. Fontos számunkra, hogy ügyfeleink ne csak egy jól működő rendszert kapjanak, hanem egy esztétikusan és szakszerűen kivitelezett megoldást is.

A munkát minden esetben helyszíni felméréssel kezdjük, ahol felmérjük az adott ingatlan adottságait, és a legoptimálisabb megoldást javasoljuk. A megbeszélt időpontokat betartjuk, pontosan érkezünk, és a kivitelezést előre egyeztetett módon végezzük el.

A telepítés során szigorúan betartjuk a szakmai előírásokat:
• szakszerű csővezetés és rögzítés
• esztétikus kivitelezés
• teljes körű villanyszerelési munkák
• nitrogénes nyomáspróba a rendszer tömítettségének ellenőrzésére

Minden általunk telepített berendezésre garanciát vállalunk, így ügyfeleink hosszú távon is biztonságban érezhetik magukat.`,
    image: "/images/ref1.jpg",
    details: ["Daikin, Gree, Mitsubishi rendszerek", "Rejtett csövezés", "Wi-Fi vezérlés", "Teljes körű villanyszerelés"],
    gallery: ["/images/ref1.jpg", "/images/ref2.jpg", "/images/ref3.jpg"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "HŐSZIVATTYÚK",
    subtitle: "Zöld Energia",
    description: "Split és monoblokkos hőszivattyúk telepítése teljes körű kivitelezéssel, hőigény-számítással.",
    fullDescription: `Split és monoblokkos hőszivattyúk telepítését is vállaljuk, teljes körű kivitelezéssel. Munkánk során a precizitás, megbízhatóság és a szakmai szabályok maximális betartása az elsődleges szempont.

Minden projektet alapos helyszíni felméréssel és hőigény-számítással kezdünk, hogy a rendszer pontosan az adott ingatlan igényeihez legyen méretezve. Ennek köszönhetően a telepített berendezések nemcsak hatékonyan, hanem gazdaságosan is üzemelnek.

A kivitelezés során teljes körű gépészeti kialakítást vagy meglévő rendszerek átalakítását is elvégezzük, beleértve:
• hőszivattyú telepítést (split és monoblokkos rendszerek)
• komplett csőhálózat kiépítést
• villanyszerelési munkákat
• rendszerbe integrálást (padlófűtés, radiátoros rendszer, HMV)
• szakszerű beüzemelést

A telepítés minden esetben a szakmai előírások szerint történik, így biztosítva a hosszú távú, megbízható működést. Az általunk kivitelezett rendszerekre garanciát vállalunk.`,
    image: "/images/heatpump.jpeg",
    details: ["COP 4.0+ hatékonyság", "Hőigény-számítás", "Padlófűtéshez optimalizálva", "Teljes körű villanyszerelés"],
    gallery: ["/images/heatpump.jpeg", "/images/ref1.jpg"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "PADLÓFŰTÉS",
    subtitle: "Láthatatlan Komfort",
    description: "Padlófűtés rendszerek komplett kivitelezése szigeteléstől a csőfektetésig és beüzemelésig.",
    fullDescription: `Padlófűtés rendszerek teljes körű kivitelezését vállaljuk, a szigeteléstől egészen a csőfektetésig és beüzemelésig. Legyen szó új építésről vagy felújításról, minden esetben az adott ingatlanhoz legjobban illeszkedő megoldást alkalmazzuk.

Dolgozunk hagyományos, rendszerlemezes és tackeres technológiával is, így rugalmasan tudunk alkalmazkodni a különböző műszaki igényekhez és kivitelezési körülményekhez.

A munkafolyamat során:
• elkészítjük a megfelelő padlószigetelést
• precízen lefektetjük a csőhálózatot
• biztosítjuk az egyenletes hőeloszlást
• betartjuk a szakmai előírásokat

A rendszereket minden esetben hőigény-számítás alapján alakítjuk ki, így garantált a hatékony és gazdaságos működés.

Precízen, tisztán dolgozunk, és hosszú távon megbízható rendszereket adunk át ügyfeleinknek.`,
    image: "/images/tacker1.jpg",
    details: ["Tacker, lemez és hagyományos technológia", "Osztó-gyűjtő szerelés", "Hőigény-számítás", "Betonozás"],
    gallery: ["/images/tacker1.jpg", "/images/padlofutes.jpg"],
    colSpan: "md:col-span-1",
  },
  {
    icon: ThermometerSun,
    title: "MENNYEZETFŰTÉS",
    subtitle: "Sugárzó Technológia",
    description: "Mennyezeti hűtés-fűtés rendszerek kivitelezése huzatmentes, egyenletes hőérzetért.",
    fullDescription: `A mennyezeti hűtés-fűtés korszerű, energiatakarékos és esztétikus megoldás, amely huzatmentesen biztosítja az egyenletes hőérzetet az egész helyiségben. A rendszer sugárzó hőleadással működik, így komfortosabb, mint a hagyományos megoldások.

Vállaljuk mennyezeti hűtő-fűtő rendszerek teljes körű kivitelezését, új építésnél és meglévő ingatlanok átalakításánál is. A tervezést minden esetben hőigény-számítás alapján végezzük, hogy a rendszer hatékonyan és gazdaságosan működjön.

A kivitelezés során precíz csőfektetéssel, szakszerű kialakítással és a szakmai előírások betartásával dolgozunk, biztosítva a hosszú távú, megbízható működést.`,
    image: "/images/mennyezetfutes.jpg",
    details: ["Hűtés és fűtés egy rendszerben", "Nincs légmozgás", "Ideális allergiásoknak", "Esztétikus megoldás"],
    gallery: ["/images/mennyezetfutes.jpg", "/images/ref1.jpg"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Snowflake,
    title: "KLÍMATISZTÍTÁS",
    subtitle: "Higiénikus Levegő",
    description: "Alapos, vegyszeres klínamosás szétszereléssel, fertőtlenítéssel a hatékony és egészséges működésért.",
    fullDescription: `A klímaberendezések rendszeres tisztítása elengedhetetlen a hatékony működés és az egészséges levegő biztosítása érdekében. Szolgáltatásunk során nem csak felületi tisztítást végzünk, hanem alapos, vegyszeres klímamosást.

A készülékeket szükség esetén részben vagy teljesen szétszereljük, hogy minden kritikus alkatrészhez hozzáférjünk. A tisztítás során:
• speciális tisztítószerekkel mossuk át a hőcserélőt
• eltávolítjuk a lerakódott szennyeződéseket és penészt
• fertőtlenítjük a készüléket
• kitisztítjuk a kondenzvíz elvezetést
• ellenőrizzük a működést

A vegyszeres tisztítás nemcsak a kellemetlen szagokat szünteti meg, hanem hozzájárul a berendezés hosszabb élettartamához és gazdaságosabb működéséhez is.`,
    image: "/images/climate2.jpg",
    details: ["Teljes szétszerelés", "Vegyszeres mosás", "Fertőtlenítés", "Penész eltávolítás"],
    gallery: ["/images/climate2.jpg", "/images/ref1.jpg"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Plug,
    title: "VILLANYSZERELÉS",
    subtitle: "Biztonságos Áram",
    description: "Lakossági villanyszerelési munkák kivitelezése, kisebb bővítésektől a teljes hálózatok felújításáig.",
    fullDescription: `Vállaljuk lakossági villanyszerelési munkák kivitelezését, a kisebb bővítésektől egészen a komplett hálózatok felújításáig.

Szolgáltatásaink:
• teljes villanyhálózat kiépítése és felújítása
• mérőhely utáni hálózat kialakítása
• elosztószekrények szerelése, bővítése
• áramkörök kialakítása, áthelyezése
• dugaljak, kapcsolók, világítási körök kiépítése
• klímák és hőszivattyúk elektromos betáplálásának kiépítése
• külön áramkörök kialakítása nagyobb fogyasztókhoz

Munkáink során a biztonságot és a megbízható működést tartjuk szem előtt, a vonatkozó szabványok betartásával.

Célunk, hogy ügyfeleink korszerű, biztonságos és hosszú távon jól működő elektromos rendszert kapjanak, legyen szó teljes felújításról vagy egyedi igényekről.`,
    image: "/images/villany.jpg",
    details: ["Teljes hálózat kiépítése", "Elosztószekrény szerelés", "Klíma és hőszivattyú betáplálás", "Szabványos kivitelezés"],
    gallery: ["/images/villany.jpg", "/images/ref1.jpg"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Droplets,
    title: "VÍZVEZETÉK ÉS CSATORNA",
    subtitle: "Alaprendszerek",
    description: "Víz- és szennyvízrendszerek kiépítése vízórától a végpontokig, új építés és felújítás esetén.",
    fullDescription: `A víz- és csatornahálózat az épület egyik legfontosabb alap rendszere, ezért kiemelten fontos a szakszerű és precíz kivitelezés. Vállaljuk teljes víz- és szennyvízrendszerek kiépítését a vízórától egészen a végpontokig.

Legyen szó új építésű ingatlanról vagy felújításról, a teljes rendszert megtervezzük és kivitelezzük:
• hideg- és melegvíz hálózat kiépítése
• szennyvíz és csatornarendszer kialakítása
• strangok, leágazások, kiállások pontos kialakítása
• gépészeti helyiségek teljes szerelése
• szerelvényezés (csaptelepek, WC-k, mosdók, zuhanyok beépítése)

Munkánk során korszerű anyagokkal és bevált technológiákkal dolgozunk, hogy a rendszer hosszú távon megbízhatóan és problémamentesen működjön.`,
    image: "/images/vizvezetek.jpg",
    details: ["Hideg- és melegvíz hálózat", "Szennyvízrendszer", "Szerelvényezés", "Gépészeti helyiségek"],
    gallery: ["/images/vizvezetek.jpg", "/images/ref1.jpg"],
    colSpan: "md:col-span-1",
  },
];

export function Services({ services: dbServices }: { services: Service[] }) {
  const { openQuote } = useQuote();
  const [expandedService, setExpandedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = dbServices.map((s, i) => ({
    icon: SERVICE_ICONS[i % SERVICE_ICONS.length],
    title: s.title,
    subtitle: s.subtitle || "",
    description: s.description || "",
    fullDescription: s.fullDescription || "",
    image: s.image || "/images/ref1.jpg",
    details: s.details || [],
    gallery: s.gallery || [],
    colSpan: s.colSpan || "md:col-span-1",
  }));

  return (
    <section id="services" className="py-12 md:py-24 bg-background relative border-t border-white/5 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-10 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
             <div className="h-[1px] w-12 bg-primary" />
             <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm">Szolgáltatások</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4 uppercase">
            Mérnöki <span className="text-gray-600">megoldások</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
            Nem csak szerelünk. Tervezünk, optimalizálunk és rendszert építünk.
          </p>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden flex items-center gap-2 text-primary/60 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
            <ArrowRight size={16} />
            <span>Húzza el a folytatáshoz</span>
        </div>

        {/* MOBILE LAYOUT: Horizontal Snap Scroll */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 scrollbar-hide">
            {services.map((service, index) => (
                <div key={service.title} className="snap-center shrink-0 w-[85vw]">
                     <ServiceCardMobile service={service} index={index} openQuote={openQuote} onExpand={() => setExpandedService(service)} />
                </div>
            ))}
            <div className="w-2 shrink-0" />
        </div>

        {/* DESKTOP LAYOUT: Balanced Bento Grid */}
        <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-6">
            {services.map((service) => (
                <ServiceCardDesktop 
                    key={service.title} 
                    service={service} 
                    openQuote={openQuote} 
                    onExpand={() => setExpandedService(service)}
                />
            ))}
        </div>
      </div>

      {/* Expanded Service Modal */}
      <AnimatePresence>
        {expandedService && (
            <ServiceDetailModal 
                service={expandedService} 
                onClose={() => setExpandedService(null)} 
                openQuote={openQuote}
            />
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCardDesktop({ service, openQuote, onExpand }: { service: ServiceItem; openQuote: () => void; onExpand: () => void }) {
    return (
        <motion.div 
            className={`relative h-[480px] rounded-2xl overflow-hidden cursor-pointer group border border-white/5 hover:border-primary/40 transition-all duration-500 ${service.colSpan}`}
            onClick={onExpand}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/50 transition-all duration-300" />
            </div>

            {/* Click Hint - Subtle indicator */}
            <div className="absolute top-4 right-4 z-20">
                <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <ChevronDown size={24} className="text-white group-hover:text-black rotate-[-90deg] group-hover:rotate-0 transition-transform duration-300" />
                </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 z-10">
                {/* Top: Icon */}
                <div className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                    <service.icon size={26} className="text-primary" />
                </div>

                {/* Bottom: Text */}
                <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[9px] font-bold uppercase tracking-[0.2em] mb-3">
                        {service.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase leading-tight mb-3 tracking-tighter">
                        {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-medium line-clamp-2 mb-4">
                        {service.description}
                    </p>
                    
                    {/* Details Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {service.details.slice(0, 3).map((detail, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-1 rounded-md bg-white/10 text-gray-300 border border-white/10">
                                {detail}
                            </span>
                        ))}
                    </div>

                    {/* Expand Hint Button */}
                    <div className="flex gap-3">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onExpand(); }}
                            className="flex-1 bg-white/10 hover:bg-primary text-white hover:text-black py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/20 hover:border-primary"
                        >
                            Részletek <ChevronDown size={16} className="rotate-[-90deg]" />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); openQuote(); }}
                            className="flex-1 bg-primary/90 hover:bg-primary text-black py-3 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Ajánlatkérés <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function ServiceCardMobile({ service, index, openQuote, onExpand }: { service: ServiceItem; index: number; openQuote: () => void; onExpand: () => void }) {
    return (
        <div 
            className="relative h-[520px] rounded-3xl overflow-hidden group border-2 border-white/10 active:border-primary/50 shadow-2xl cursor-pointer"
            onClick={onExpand}
        >
            {/* Full Height Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-active:scale-105"
                    sizes="85vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Expand Hint Badge - Top Right */}
            <div className="absolute top-4 right-4 z-20">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 active:bg-primary/20 active:border-primary/40">
                    <span className="text-white text-xs font-bold uppercase tracking-wider">Részletek</span>
                    <ChevronDown size={18} className="text-white rotate-[-90deg]" />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-6">
                {/* Top: Icon */}
                <div className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                    <service.icon size={22} className="text-primary" />
                </div>

                {/* Bottom Content */}
                <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                        {service.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase leading-tight mb-3 drop-shadow-lg">
                        {service.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm font-medium mb-4 line-clamp-2">
                        {service.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={(e) => { e.stopPropagation(); openQuote(); }}
                            className="bg-primary text-black py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
                        >
                            Ajánlatkérés <ArrowRight size={14} />
                        </button>
                        <a 
                            href="tel:+36301738866"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/10 active:bg-white/20 border border-white/20 text-white py-3 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors"
                        >
                            Hívás <Phone size={14} />
                        </a>
                    </div>
                    
                    {/* Tap hint - subtle fade */}
                    <div className="mt-3 text-center">
                        <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                            Érintse meg a kártyát a részletekért →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ServiceDetailModal({ service, onClose, openQuote }: { service: ServiceItem; onClose: () => void; openQuote: () => void }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-hidden"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-3xl border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-12 h-12 min-w-[44px] min-h-[44px] rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all duration-300 active:scale-95"
                    >
                        <X size={24} />
                    </button>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                                <service.icon size={24} className="text-primary" />
                            </div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                {service.subtitle}
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase leading-tight">
                            {service.title}
                        </h2>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {service.fullDescription}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Szolgáltatás jellemzők</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {service.details.map((detail, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    <span className="text-sm text-gray-300">{detail}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery Grid */}
                    {service.gallery && service.gallery.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Referencia képek</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {service.gallery.map((img, idx) => (
                                    <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                        <Image
                                            src={img}
                                            alt={`${service.title} - ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, 300px"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                        <button 
                            onClick={() => { onClose(); openQuote(); }}
                            className="flex-1 bg-primary hover:bg-white text-black py-4 rounded-xl font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            Ajánlatkérés <ArrowRight size={18} />
                        </button>
                        <a 
                            href="tel:+36301738866"
                            className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-4 rounded-xl font-bold uppercase text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <Phone size={18} />
                            +36 30 173 88 66
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
