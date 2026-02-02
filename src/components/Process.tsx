"use client";

import { CheckCircle2, Clock, Wrench, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: CheckCircle2,
    title: "Kapcsolatfelvétel",
    description: "Kérjen ajánlatot online vagy telefonon. 24 órán belül visszahívjuk."
  },
  {
    icon: Wrench,
    title: "Ingyenes Felmérés",
    description: "Szakértő kollégánk a helyszínen méri fel az igényeket és lehetőségeket."
  },
  {
    icon: Clock,
    title: "Tervezés & Ajánlat",
    description: "Pontos, rejtett költségektől mentes árajánlatot és ütemtervet készítünk."
  },
  {
    icon: ShieldCheck,
    title: "Kivitelezés & Garancia",
    description: "Tiszta, precíz munka a megbeszélt határidőre, teljes körű garanciával."
  }
];

export function Process() {
  return (
    <section className="py-20 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Hogyan dolgozunk?</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            A közös munka <span className="text-gray-600">lépései</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-black border-2 border-white/10 flex items-center justify-center mb-6 group-hover:border-primary group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <step.icon className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{step.description}</p>
              
              {/* Step Number Background */}
              <span className="absolute -top-4 -right-4 text-6xl font-black text-white/5 select-none -z-10 group-hover:text-primary/10 transition-colors">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
