"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function ContactAdminPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/site-settings").then(r => r.json()).then(setSettings);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact_email: settings.contact_email,
        contact_phone: settings.contact_phone,
        contact_address: settings.contact_address,
        cta_title: settings.cta_title,
        cta_description: settings.cta_description,
        footer_description: settings.footer_description,
        footer_facebook: settings.footer_facebook,
        footer_instagram: settings.footer_instagram,
        footer_linkedin: settings.footer_linkedin,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields = [
    { key: "contact_email", label: "Email cím" },
    { key: "contact_phone", label: "Telefonszám" },
    { key: "contact_address", label: "Székhely / Cím" },
    { key: "cta_title", label: "CTA főcím (pl. Valósítsuk meg elképzeléseit.)" },
    { key: "cta_description", label: "CTA leírás" },
    { key: "footer_description", label: "Footer szöveges leírás" },
    { key: "footer_facebook", label: "Facebook link" },
    { key: "footer_instagram", label: "Instagram link" },
    { key: "footer_linkedin", label: "LinkedIn link" },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Kapcsolat & Footer</h1>
          <p className="text-sm text-gray-500">Elérhetőségek, CTA szekció, footer szövegek</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              value={settings[key] || ""}
              onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Mentés..." : saved ? "✓ Mentve!" : "Mentés"}
        </button>
      </div>
    </div>
  );
}
