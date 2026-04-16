"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

type Step = { id: number; title: string; description: string; order: number };

export default function ProcessAdminPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/process-steps").then(r => r.json()).then(setSteps);
  }, []);

  const handleChange = (id: number, field: "title" | "description", value: string) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/process-steps", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(steps),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hogyan dolgozunk?</h1>
          <p className="text-sm text-gray-500">Munkafolyamat lépések szerkesztése</p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">{index + 1}</span>
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Lépés</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cím</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={e => handleChange(step.id, "title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Leírás</label>
                <textarea
                  rows={2}
                  value={step.description || ""}
                  onChange={e => handleChange(step.id, "description", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Mentés..." : saved ? "✓ Mentve!" : "Összes mentése"}
        </button>
      </div>
    </div>
  );
}
