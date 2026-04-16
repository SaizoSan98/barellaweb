'use client';

import { FileText, Settings, ArrowRight, Zap, HelpCircle, Phone, Wrench } from 'lucide-react';
import Link from 'next/link';

const cards = [
  { href: "/admin/hero", label: "Hero szekció", desc: "Főcím, alcím, leírás, gomb szövege", icon: Zap },
  { href: "/admin/services", label: "Szolgáltatások", desc: "Kártyák szövege, főkép és referencia képek", icon: Wrench },
  { href: "/admin/process", label: "Hogyan dolgozunk?", desc: "Munkafolyamat lépések szerkesztése", icon: Settings },
  { href: "/admin/faq", label: "GYIK", desc: "Kérdések és válaszok szerkesztése", icon: HelpCircle },
  { href: "/admin/contact", label: "Kapcsolat & Footer", desc: "Email, telefon, cím, CTA szöveg, social linkek", icon: Phone },
  { href: "/admin/blog", label: "Blog", desc: "Blogbejegyzések kezelése", icon: FileText },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Válassz egy szekciót a szerkesztéshez.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ href, label, desc, icon: Icon }) => (
          <Link key={href} href={href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-900 hover:shadow-sm transition-all group text-left block"
          >
            <div className="bg-gray-100 rounded-lg p-2 w-fit group-hover:bg-gray-900 transition-colors mb-3">
              <Icon size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
            <div className="font-semibold text-gray-900 text-sm">{label}</div>
            <div className="text-xs text-gray-500 mt-0.5 mb-3">{desc}</div>
            <div className="flex items-center gap-1 text-xs text-gray-400 group-hover:text-gray-900 transition-colors">
              Szerkesztés <ArrowRight size={11} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

