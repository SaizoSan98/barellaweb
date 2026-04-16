"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function HeroAdminPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-settings").then(r => r.json()).then(setSettings);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hero_title: settings.hero_title,
          hero_subtitle: settings.hero_subtitle,
          hero_description: settings.hero_description,
          hero_cta_text: settings.hero_cta_text,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setSaveError(data.error || `Hiba: ${res.status}`);
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      setSaveError('Hálózati hiba');
    } finally {
      setSaving(false);
    }
  };

  const fields = [
    { key: "hero_title", label: "Főcím (pl. BARELLA)", type: "input" },
    { key: "hero_subtitle", label: "Alcím (pl. Modern épületgépészet...)", type: "input" },
    { key: "hero_description", label: "Leírás szöveg", type: "textarea" },
    { key: "hero_cta_text", label: "Gomb szövege (pl. AJÁNLATKÉRÉS)", type: "input" },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hero szekció</h1>
          <p className="text-sm text-gray-500">Főoldal fejléc szövegek</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            {type === "textarea" ? (
              <textarea
                rows={3}
                value={settings[key] || ""}
                onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            ) : (
              <input
                type="text"
                value={settings[key] || ""}
                onChange={e => setSettings(p => ({ ...p, [key]: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        ))}

        {saveError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">❌ {saveError}</div>
        )}
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
