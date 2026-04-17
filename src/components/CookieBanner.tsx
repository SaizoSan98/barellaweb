"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import Link from "next/link";

const COOKIE_KEY = "barella_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] p-4 md:p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">Ez a weboldal sütiket használ</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Weboldalunk az alapvető működéshez és a felhasználói élmény javításához sütiket (cookie-kat) használ. 
                  További információért kérjük, olvassa el{" "}
                  <Link href="/suti-kezeles" className="text-primary hover:underline">süti kezelési tájékoztatónkat</Link>.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={reject}
                className="flex-1 md:flex-none px-4 py-2.5 border border-white/10 rounded-xl text-sm text-gray-400 hover:bg-white/5 transition-colors font-medium"
              >
                Elutasítom
              </button>
              <button
                onClick={accept}
                className="flex-1 md:flex-none px-6 py-2.5 bg-primary hover:bg-white text-black rounded-xl text-sm font-bold transition-colors"
              >
                Elfogadom
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
