"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Eye, EyeOff, Image as ImageIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";

type BlogPost = {
  id: number;
  title: string;
  subtitle: string | null;
  slug: string;
  content: string;
  excerpt: string | null;
  imageUrl: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "", subtitle: "", slug: "", content: "", excerpt: "", imageUrl: "", author: "BARELLA", published: false,
  });

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/blog?admin=true");
    if (res.status === 401) { router.push("/admin/login"); return; }
    setPosts(await res.json());
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase()
      .replace(/[áéíóöőúüű]/g, c => ({ á:"a",é:"e",í:"i",ó:"o",ö:"o",ő:"o",ú:"u",ü:"u",ű:"u" }[c] || c))
      .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").substring(0, 100);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setFormData(p => ({ ...p, imageUrl: data.url }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = editingPost ? `/api/blog/${editingPost.slug}` : "/api/blog";
    const res = await fetch(url, {
      method: editingPost ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setShowForm(false);
      setEditingPost(null);
      setFormData({ title: "", subtitle: "", slug: "", content: "", excerpt: "", imageUrl: "", author: "BARELLA", published: false });
      fetchPosts();
    } else {
      alert((await res.json()).error || "Mentés sikertelen");
    }
    setSaving(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({ title: post.title, subtitle: post.subtitle || "", slug: post.slug, content: post.content, excerpt: post.excerpt || "", imageUrl: post.imageUrl || "", author: post.author, published: post.published });
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Biztosan törölni szeretnéd?")) return;
    await fetch(`/api/blog/${slug}`, { method: "DELETE" });
    fetchPosts();
  };

  if (loading) return <div className="flex items-center justify-center py-12 text-gray-400">Betöltés...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Blog</h1>
          <p className="text-sm text-gray-500">Blogbejegyzések kezelése</p>
        </div>
      </div>

      {!showForm ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">{posts.length} bejegyzés</span>
            <button onClick={() => { setEditingPost(null); setFormData({ title: "", subtitle: "", slug: "", content: "", excerpt: "", imageUrl: "", author: "BARELLA", published: false }); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors">
              <Plus size={16} /> Új bejegyzés
            </button>
          </div>
          <div className="space-y-2">
            {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Még nincs bejegyzés.</div>
            ) : posts.map(post => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{post.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {post.published ? "Élő" : "Piszkozat"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(post.createdAt).toLocaleDateString("hu-HU")}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(post)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Edit2 size={15} className="text-gray-600" />
                  </button>
                  <button onClick={() => handleDelete(post.slug)} className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors text-red-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900">{editingPost ? "Szerkesztés" : "Új bejegyzés"}</h2>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50">Mégse</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cím *</label>
              <input type="text" value={formData.title} required
                onChange={e => setFormData(p => ({ ...p, title: e.target.value, slug: editingPost ? p.slug : generateSlug(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Alcím</label>
              <input type="text" value={formData.subtitle}
                onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">URL slug *</label>
              <input type="text" value={formData.slug} required
                onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tartalom * (Markdown)</label>
              <textarea rows={10} value={formData.content} required
                onChange={e => setFormData(p => ({ ...p, content: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white font-mono focus:outline-none focus:border-blue-500"
                placeholder="# Cím&#10;&#10;Szöveg..." />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kivonat</label>
              <textarea rows={2} value={formData.excerpt}
                onChange={e => setFormData(p => ({ ...p, excerpt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Borítókép</label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <ImageIcon size={15} className="text-gray-500" />
                  <span className="text-sm text-gray-600">{uploading ? "Feltöltés..." : "Kép feltöltése"}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
                {formData.imageUrl && <img src={formData.imageUrl} alt="" className="w-16 h-12 object-cover rounded-lg border" />}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pub" checked={formData.published} onChange={e => setFormData(p => ({ ...p, published: e.target.checked }))} className="w-4 h-4 rounded border-gray-300" />
              <label htmlFor="pub" className="text-sm font-semibold text-gray-700">Publikálva (élő)</label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg font-semibold text-sm hover:bg-gray-50">Mégse</button>
              <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 disabled:opacity-50">
                {saving ? "Mentés..." : "Mentés"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
