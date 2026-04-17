"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Shield, Cookie, FileText } from "lucide-react";
import Link from "next/link";

type LegalPage = {
  id: number;
  slug: string;
  title: string;
  content: string | null;
  updatedAt: string | null;
};

const SLUG_ICONS: Record<string, any> = {
  'adatvedelem': Shield,
  'suti-kezeles': Cookie,
  'aszf': FileText,
};

export default function LegalAdminPage() {
  const [pages, setPages] = useState<LegalPage[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/legal").then(r => r.json()).then(setPages);
  }, []);

  const startEdit = (page: LegalPage) => {
    setEditing(page.slug);
    setEditTitle(page.title);
    setEditContent(page.content || "");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: editing, title: editTitle, content: editContent }),
      });
      if (res.ok) {
        setSaved(true);
        setPages(prev => prev.map(p => p.slug === editing ? { ...p, title: editTitle, content: editContent } : p));
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {
      alert("Hiba történt");
    } finally {
      setSaving(false);
    }
  };

  const editingPage = pages.find(p => p.slug === editing);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Jogi oldalak</h1>
        </div>

        <div className="space-y-4">
          {pages.map((page) => {
            const Icon = SLUG_ICONS[page.slug] || FileText;
            const isEditing = editing === page.slug;

            return (
              <div key={page.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => isEditing ? setEditing(null) : startEdit(page)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">{page.title}</span>
                      <p className="text-xs text-gray-500">/{page.slug}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); startEdit(page); }}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Szerkesztés
                  </button>
                </div>

                {isEditing && (
                  <div className="border-t border-gray-200 p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Cím</label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Tartalom (Markdown)</label>
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={20}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-primary font-mono"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        <Save size={16} />
                        {saving ? "Mentés..." : saved ? "✓ Mentve" : "Mentés"}
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Bezárás
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
