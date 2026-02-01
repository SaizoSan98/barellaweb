"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Snowflake, Zap, Layers, ThermometerSun } from "lucide-react";
import { MouseEvent } from "react";
import Image from "next/image";

const services = [
  {
    icon: Snowflake,
    title: "KLÍMATECHNIKA",
    subtitle: "Intelligens Hűtés",
    description: "Prémium kategóriás split és multi-split rendszerek tervezése és telepítése. Csendes működés, maximális energiahatékonyság és intelligens vezérlés.",
    image: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?q=80&w=2070&auto=format&fit=crop", // Abstract AC/Air flow
    details: ["Daikin, Gree, Mitsubishi rendszerek", "Rejtett csövezés", "Wi-Fi vezérlés", "Éves karbantartás"],
    colSpan: "md:col-span-2",
  },
  {
    icon: Zap,
    title: "HŐSZIVATTYÚK",
    subtitle: "Zöld Energia",
    description: "A jövő fűtési megoldása. Levegő-víz hőszivattyús rendszerek teljeskörű kivitelezése H-tarifás ügyintézéssel.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop", // Industrial/Tech
    details: ["COP 4.0+ hatékonyság", "Padlófűtéshez optimalizálva", "HMV készítés"],
    colSpan: "md:col-span-1",
  },
  {
    icon: Layers,
    title: "PADLÓFŰTÉS",
    subtitle: "Láthatatlan Komfort",
    description: "Komfort és esztétika. Egyenletes hőeloszlás, portalan működés, láthatatlan gépészet.",
    image: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?q=80&w=2070&auto=format&fit=crop", // Underfloor heating pipes
    details: ["Tacker rendszer", "Osztó-gyűjtő szerelés", "Betonozás"],
    colSpan: "md:col-span-1",
  },
  {
    icon: ThermometerSun,
    title: "MENNYEZETFŰTÉS",
    subtitle: "Sugárzó Technológia",
    description: "A legmodernebb sugárzó fűtési-hűtési technológia. Huzatmentes hűtés nyáron, kellemes meleg télen.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2070&auto=format&fit=crop", // Modern interior ceiling
    details: ["Nincs légmozgás", "Ideális allergiásoknak", "Gyors reagálás"],
    colSpan: "md:col-span-2",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-background relative border-t border-white/5 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-3xl border border-white/10 bg-black overflow-hidden ${service.colSpan}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(45, 212, 191, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Background Image (Subtle) */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity group-hover:mix-blend-normal transform scale-105 group-hover:scale-110 transition-transform duration-700">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

      <div className="relative z-10 h-full flex flex-col p-8 md:p-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <service.icon size={28} className="text-gray-300 group-hover:text-primary transition-colors" />
          </div>
          <span className="text-[10px] font-black text-primary/70 uppercase tracking-[0.2em] border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-md bg-black/20 group-hover:bg-primary/10 group-hover:text-primary transition-all">
            {service.subtitle}
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black mb-4 text-white group-hover:text-primary transition-colors uppercase tracking-tight">{service.title}</h3>
        <p className="text-gray-400 leading-relaxed mb-8 flex-grow font-light text-base md:text-lg">
          {service.description}
        </p>

        <div className="space-y-4 border-t border-white/5 pt-8 mt-auto">
          {service.details.map((detail: string, i: number) => (
            <div key={i} className="flex items-center gap-4 text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-all" />
              {detail}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
