"use client";

import { X, Send, MapPin, Wrench, FileText, User, Mail, Phone } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import { useState, useEffect } from "react";

export function QuoteModal() {
  const { isOpen, closeQuote } = useQuote();
  const [formStep, setFormStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - Instant opacity */}
      <div
        onClick={closeQuote}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
      />

      {/* Modal Container - Instant appearance */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-0 md:p-4 pointer-events-none"
      >
        {/* Modal Content - Changed to Light/White Theme */}
        <div className="bg-white text-black w-full md:max-w-2xl h-full md:h-auto md:rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col md:max-h-[90vh]">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Ajánlatkérés</h2>
              <p className="text-sm text-gray-500">Pár percen belül felvesszük Önnel a kapcsolatot.</p>
            </div>
            <button 
              onClick={closeQuote}
              className="p-4 -m-4 md:p-2 md:m-0 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-black active:scale-95 touch-manipulation"
              aria-label="Bezárás"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Body - Scrollable */}
          <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-grow pb-24 md:pb-6">
            
            {/* Section 1: Project Details */}
            <div className="space-y-4">
              <h3 className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Wrench size={14} /> Projekt Részletei
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-700 font-medium">Munkavégzés helye (Város)</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Pl. Budapest, XII. kerület"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700 font-medium">Technológia</label>
                  <div className="relative">
                     <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                        <option>Klíma telepítés</option>
                        <option>Klímatisztítás</option>
                        <option>Hőszivattyú rendszer</option>
                        <option>Padlófűtés</option>
                        <option>Mennyezetfűtés</option>
                        <option>Vízvezeték–csatorna kivitelezés</option>
                        <option>Komplex gépészet</option>
                        <option>Egyéb / Tanácsadás</option>
                     </select>
                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                       ▼
                     </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-medium">Rövid leírás</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea 
                    rows={3}
                    placeholder="Kérjük, írja le röviden az elképzelését (pl. hány helyiség, mekkora alapterület)..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact Info */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <User size={14} /> Elérhetőségek
              </h3>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-medium">Név / Cégnév</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Az Ön neve"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-medium">Email cím</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    placeholder="pelda@email.hu"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 font-medium">Telefonszám</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="tel" 
                    placeholder="+36 30 123 4567"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 relative">
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group">
              <span>Ajánlatkérés Küldése</span>
              <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">
              Az adatok elküldésével elfogadja az Adatvédelmi Tájékoztatót.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
