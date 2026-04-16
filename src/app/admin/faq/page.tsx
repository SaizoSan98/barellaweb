"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

type FAQ = { id: number; question: string; answer: string; order: number };

export default function FAQAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/faq").then(r => r.json()).then(setFaqs);
  }, []);

  const handleChange = (id: number, field: "question" | "answer", value: string) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faqs),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdd = async () => {
    const res = await fetch("/api/admin/faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "Új kérdés", answer: "Válasz szövege", published: true }),
    });
    const newFaq = await res.json();
    setFaqs(prev => [...prev, newFaq]);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Biztosan törli ezt a kérdést?")) return;
    await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
    setFaqs(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gyakori kérdések (GYIK)</h1>
          <p className="text-sm text-gray-500">Kérdések és válaszok szerkesztése</p>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{index + 1}. kérdés</span>
              <button onClick={() => handleDelete(faq.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kérdés</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={e => handleChange(faq.id, "question", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Válasz</label>
                <textarea
                  rows={3}
                  value={faq.answer}
                  onChange={e => handleChange(faq.id, "answer", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} />
          Új kérdés hozzáadása
        </button>
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
