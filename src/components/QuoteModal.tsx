"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MapPin, Wrench, FileText, User, Mail, Phone } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import { useState } from "react";

export function QuoteModal() {
  const { isOpen, closeQuote } = useQuote();
  const [formStep, setFormStep] = useState(1); // Future enhancement: multi-step

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuote}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            {/* Modal Content - Changed to Light/White Theme */}
            <div className="bg-white text-black w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col max-h-[90vh]">
              
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <div>
                  <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Ajánlatkérés</h2>
                  <p className="text-sm text-gray-500">Pár percen belül felvesszük Önnel a kapcsolatot.</p>
                </div>
                <button 
                  onClick={closeQuote}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form Body - Scrollable */}
              <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
                
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
                            <option>Hőszivattyú rendszer</option>
                            <option>Padlófűtés</option>
                            <option>Mennyezetfűtés</option>
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

                <div className="h-[1px] bg-gray-100 w-full" />

                {/* Section 2: Contact Info */}
                <div className="space-y-4">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 sticky bottom-0">
                <button className="w-full bg-primary text-black font-bold text-lg py-4 rounded-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group">
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                  AJÁNLATKÉRÉS KÜLDÉSE
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Az adatok elküldésével elfogadja az Adatvédelmi irányelveinket.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
