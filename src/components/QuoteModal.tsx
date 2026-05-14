"use client";

import { X, Send, MapPin, Wrench, FileText, User, Mail, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { useQuote } from "@/components/QuoteContext";
import { useState, useEffect, useRef } from "react";

export function QuoteModal() {
  const { isOpen, closeQuote } = useQuote();
  const [formStep, setFormStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', location: '', service: 'Klíma telepítés', description: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Scroll lock when open
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeQuote();
      };
      document.addEventListener('keydown', handleEscape);
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = originalStyle;
        window.removeEventListener("resize", checkMobile);
      };
    }
    
    return () => window.removeEventListener("resize", checkMobile);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Backdrop - Instant opacity */}
      <div
        onClick={closeQuote}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
      />

      {/* Modal Container - Instant appearance */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
      >
        {/* Modal Content - Changed to Light/White Theme */}
        <form onSubmit={handleSubmit} className="bg-white text-black w-full md:max-w-2xl h-auto max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden pointer-events-auto relative flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50 shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Ajánlatkérés</h2>
              <p className="text-sm text-gray-500">Pár percen belül felvesszük Önnel a kapcsolatot.</p>
            </div>
            <button 
              onClick={closeQuote}
              className="p-2 -mr-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-black active:scale-95 touch-manipulation"
              aria-label="Bezárás"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form Body - Scrollable */}
          <div className="p-6 overflow-y-auto custom-scrollbar space-y-6 flex-grow">

            {/* Success State */}
            {status === 'success' && (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle size={64} className="text-green-500" />
                <h3 className="text-2xl font-bold text-black">Ajánlatkérés elküldve!</h3>
                <p className="text-gray-500 max-w-sm">Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot. Az összefoglalót elküldtük a megadott email címre.</p>
                <button onClick={closeQuote} className="mt-4 bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all">Bezárás</button>
              </div>
            )}

            {/* Error State */}
            {status === 'error' && (
              <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                <AlertCircle size={48} className="text-red-500" />
                <p className="text-gray-700 font-medium">Hiba történt az elküldés során. Kérjük, próbálja újra vagy hívjon minket!</p>
                <button onClick={() => setStatus('idle')} className="mt-2 text-sm underline text-gray-500">Újrapróbálás</button>
              </div>
            )}

            {/* Form */}
            {(status === 'idle' || status === 'sending') && (
            <>

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
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Pl. Budapest, XII. kerület"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700 font-medium">Technológia</label>
                  <div className="relative">
                     <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Az Ön neve"
                    required
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="pelda@email.hu"
                    required
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+36 30 123 4567"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-black focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-100 mt-4 space-y-4">
              <div className="flex items-center gap-3 px-3 py-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer" onClick={() => {
                const cb = document.getElementById('terms-quote') as HTMLInputElement;
                if(cb) cb.click();
              }}>
                <input type="checkbox" id="terms-quote" className="w-5 h-5 shrink-0 accent-black rounded cursor-pointer pointer-events-none" required />
                <label htmlFor="terms-quote" className="text-sm text-gray-700 leading-snug cursor-pointer select-none text-left pointer-events-none">
                  Elfogadom az <a href="/documents/adatvedelmi_tajekoztato.pdf" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-primary pointer-events-auto" onClick={e => e.stopPropagation()}>Adatvédelmi tájékoztatót</a> és az <a href="/documents/aszf.pdf" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-primary pointer-events-auto" onClick={e => e.stopPropagation()}>ÁSZF</a>-et.
                </label>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{status === 'sending' ? 'Küldés...' : 'Ajánlatkérés Küldése'}</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
