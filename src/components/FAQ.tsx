"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Mennyi idő alatt készül el egy klíma telepítés?",
    answer: "Egy átlagos split klíma telepítése 3-5 órát vesz igénybe. Ez magában foglalja a kültéri és beltéri egység felszerelését, a csövezést, a vákuumozást és a beüzemelést is. Igyekszünk a lehető legkisebb kosszal és zajjal dolgozni."
  },
  {
    question: "Milyen márkákkal dolgoznak?",
    answer: "Kizárólag megbízható, minőségi gyártók termékeit telepítjük. Kiemelt partnereink: Daikin, Mitsubishi Electric, Panasonic, Gree, Bosch. Ezekhez a márkákhoz teljes körű szervizháttérrel és alkatrészellátással rendelkezünk."
  },
  {
    question: "Van garancia a munkára?",
    answer: "Természetesen. Minden általunk végzett telepítésre szerelési garanciát vállalunk. A készülékekre a gyártói garancia érvényes (általában 3-5 év), melynek feltétele az évenkénti karbantartás elvégzése."
  },
  {
    question: "Ingyenes a felmérés?",
    answer: "Budapesten és Pest megyében a helyszíni felmérés díjmentes, amennyiben elfogadja árajánlatunkat. Egyéb esetben kiszállási díjat számolhatunk fel, amit megrendelés esetén jóváírunk a végösszegből."
  },
  {
    question: "Hőszivattyúhoz intézik a H-tarifát?",
    answer: "Igen, teljes körű ügyintézést vállalunk. A H-tarifa igényléséhez szükséges kivitelezői nyilatkozatot és egyéb dokumentációt mi állítjuk ki és segítünk a szolgáltató felé történő benyújtásban."
  }
];

export function FAQ() {
  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Tudnivalók</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Gyakori <span className="text-gray-600">kérdések</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 hover:border-primary/30 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-primary border-primary text-black' : 'border-white/20 text-white'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      
      {/* CSS-only animation for mobile performance if desired, but simple height animation is usually fine */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
