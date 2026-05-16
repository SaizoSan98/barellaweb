"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, ChevronDown, ChevronUp, ImageIcon } from "lucide-react";
import Link from "next/link";
import type { Service } from "@/db/schema";

export default function ServicesAdminPage() {
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/services").then(r => r.json()).then(setServiceList);
  }, []);

  const handleChange = (id: number, field: keyof Service, value: any) => {
    setServiceList(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSave = async (service: Service) => {
    setSaving(service.id);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      if (!res.ok) {
        const data = await res.json();
        setSaveError(data.error || `Hiba: ${res.status}`);
      } else {
        setSaved(service.id);
        setTimeout(() => setSaved(null), 2000);
      }
    } catch (e) {
      setSaveError('Hálózati hiba');
    } finally {
      setSaving(null);
    }
  };

  const handleImageUpload = async (serviceId: number, field: "image" | "gallery", galleryIndex?: number, e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (!file) return;
    const uploadKey = `${serviceId}-${field}-${galleryIndex ?? ""}`;
    setUploading(uploadKey);
    try {
      const { uploadImage } = await import("@/lib/uploadImage");
      const url = await uploadImage(file, "/api/upload");
      setServiceList(prev => prev.map(s => {
        if (s.id !== serviceId) return s;
        if (field === "image") return { ...s, image: url };
        const gallery = [...(s.gallery || [])];
        if (galleryIndex !== undefined) gallery[galleryIndex] = url;
        else gallery.push(url);
        return { ...s, gallery };
      }));
    } catch {
      alert("Kép feltöltése sikertelen");
    } finally {
      setUploading(null);
    }
  };

  const removeGalleryImage = (serviceId: number, index: number) => {
    setServiceList(prev => prev.map(s => {
      if (s.id !== serviceId) return s;
      const gallery = [...(s.gallery || [])];
      gallery.splice(index, 1);
      return { ...s, gallery };
    }));
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Szolgáltatások</h1>
          <p className="text-sm text-gray-500">Minden szolgáltatás szövege, képe és referencia képek</p>
        </div>
      </div>

      <div className="space-y-3">
        {serviceList.map((service) => (
          <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === service.id ? null : service.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {service.image && (
                  <img src={service.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                )}
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-sm">{service.title}</div>
                  <div className="text-xs text-gray-500">{service.subtitle}</div>
                </div>
              </div>
              {expanded === service.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>

            {expanded === service.id && (
              <div className="border-t border-gray-100 p-5 space-y-5">
                {/* Főkép */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Főkép</label>
                  <div className="flex items-start gap-4">
                    {service.image && (
                      <img src={service.image} alt="" className="w-24 h-16 rounded-lg object-cover border border-gray-200 shrink-0" />
                    )}
                    <div className="flex-1 space-y-2">
                      <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-fit">
                        <Upload size={15} className="text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {uploading === `${service.id}-image-` ? "Feltöltés..." : "Kép cseréje"}
                        </span>
                        <input type="file" accept="image/*" className="hidden"
                          onChange={e => handleImageUpload(service.id, "image", undefined, e)}
                          disabled={!!uploading} />
                      </label>
                      <input
                        type="text"
                        value={service.image || ""}
                        onChange={e => handleChange(service.id, "image", e.target.value)}
                        placeholder="Vagy kézi URL..."
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-900 bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Szövegek */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cím</label>
                    <input type="text" value={service.title}
                      onChange={e => handleChange(service.id, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Alcím</label>
                    <input type="text" value={service.subtitle || ""}
                      onChange={e => handleChange(service.id, "subtitle", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Rövid leírás (kártyán)</label>
                  <textarea rows={2} value={service.description || ""}
                    onChange={e => handleChange(service.id, "description", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teljes leírás (részletes nézetben)</label>
                  <textarea rows={6} value={service.fullDescription || ""}
                    onChange={e => handleChange(service.id, "fullDescription", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white font-mono focus:outline-none focus:border-blue-500" />
                </div>

                {/* Referencia képek (galéria) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Referencia képek (galéria)</label>
                  <div className="flex flex-wrap gap-3">
                    {(service.gallery || []).map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt="" className="w-20 h-16 rounded-lg object-cover border border-gray-200" />
                        <div className="absolute inset-0 bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                          <label className="p-1 bg-white/80 rounded cursor-pointer hover:bg-white transition-colors">
                            <Upload size={12} className="text-gray-700" />
                            <input type="file" accept="image/*" className="hidden"
                              onChange={e => handleImageUpload(service.id, "gallery", idx, e)}
                              disabled={!!uploading} />
                          </label>
                          <button onClick={() => removeGalleryImage(service.id, idx)}
                            className="p-1 bg-red-500/80 text-white rounded hover:bg-red-500 transition-colors">
                            <span className="text-xs">×</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <label className="w-20 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <ImageIcon size={16} className="text-gray-400" />
                        <span className="text-xs text-gray-400">Hozzáad</span>
                      </div>
                      <input type="file" accept="image/*" className="hidden"
                        onChange={e => handleImageUpload(service.id, "gallery", undefined, e)}
                        disabled={!!uploading} />
                    </label>
                  </div>
                </div>

                {saveError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    ❌ {saveError}
                  </div>
                )}
                <button
                  onClick={() => handleSave(service)}
                  disabled={saving === service.id}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving === service.id ? "Mentés..." : saved === service.id ? "✓ Mentve!" : "Mentés"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
