"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, Trash2, Plus, ImageIcon, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/db/schema";

export default function ProductsAdminPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [showProducts, setShowProducts] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [vatLabel, setVatLabel] = useState("");
  const [availabilityInfo, setAvailabilityInfo] = useState("");
  const [modalVatInfo, setModalVatInfo] = useState("");

  useEffect(() => {
    fetch("/api/admin/products").then(r => r.json()).then(setProductList);
    fetch("/api/admin/site-settings").then(r => r.json()).then(data => {
      setShowProducts(data.show_products === 'true');
      setVatLabel(data.product_card_vat_label || "ÁFA-val");
      setAvailabilityInfo(data.product_card_availability_info || "A termék elérhetőségéről tájékozódjon telefonon, vagy valamelyik elérhetőségünkön!");
      setModalVatInfo(data.product_modal_vat_info || "Az árak tartalmazzák az ÁFÁT!");
    });
  }, []);

  const handleChange = (id: number, field: keyof Product, value: any) => {
    setProductList(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSave = async (product: Product) => {
    setSaving(product.id);
    setSaveError(null);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) {
        const data = await res.json();
        setSaveError(data.error || `Hiba: ${res.status}`);
      } else {
        setSaved(product.id);
        setTimeout(() => setSaved(null), 2000);
      }
    } catch (e) {
      setSaveError('Hálózati hiba');
    } finally {
      setSaving(null);
    }
  };

  const handleImageUpload = async (productId: number, field: "images", imageIndex?: number, e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (!file) return;
    const uploadKey = `${productId}-${field}-${imageIndex ?? ""}`;
    setUploading(uploadKey);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const product = productList.find(p => p.id === productId);
        if (!product) return;
        const images = [...(product.images || [])];
        if (imageIndex !== undefined) {
          images[imageIndex] = data.url;
        } else {
          images.push(data.url);
        }
        handleChange(productId, "images", images);
      }
    } catch (e) {
      console.error("Upload error:", e);
    } finally {
      setUploading(null);
    }
  };

  const handleDeleteImage = (productId: number, imageIndex: number) => {
    const product = productList.find(p => p.id === productId);
    if (!product) return;
    const images = [...(product.images || [])];
    images.splice(imageIndex, 1);
    handleChange(productId, "images", images);
  };

  const handleAddProduct = async () => {
    const newOrder = productList.length > 0 ? Math.max(...productList.map(p => p.order || 0)) + 1 : 0;
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: "Új márka",
          type: "Új típus",
          description: "",
          features: [],
          images: [],
          price: 0,
          salePrice: 0,
          sale: false,
          order: newOrder,
          published: true,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setProductList(prev => [...prev, created]);
        setExpanded(created.id);
      }
    } catch (e) {
      console.error("Create error:", e);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Biztosan törlöd ezt a terméket?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProductList(prev => prev.filter(p => p.id !== id));
      if (expanded === id) setExpanded(null);
    } catch (e) {
      console.error("Delete error:", e);
    }
  };

  const handleToggleProducts = async () => {
    const newValue = !showProducts;
    setSavingSettings(true);
    try {
      await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show_products: newValue.toString() }),
      });
      setShowProducts(newValue);
    } catch {
      alert("Hiba történt");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveGlobalSettings = async () => {
    setSavingSettings(true);
    try {
      await fetch("/api/admin/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_card_vat_label: vatLabel,
          product_card_availability_info: availabilityInfo,
          product_modal_vat_info: modalVatInfo,
        }),
      });
      alert("Beállítások sikeresen mentve!");
    } catch {
      alert("Hiba történt a mentés során");
    } finally {
      setSavingSettings(false);
    }
  };

  const handleAddFeature = (productId: number) => {
    const product = productList.find(p => p.id === productId);
    if (!product) return;
    handleChange(productId, "features", [...(product.features || []), ""]);
  };

  const handleFeatureChange = (productId: number, featureIndex: number, value: string) => {
    const product = productList.find(p => p.id === productId);
    if (!product) return;
    const features = [...(product.features || [])];
    features[featureIndex] = value;
    handleChange(productId, "features", features);
  };

  const handleDeleteFeature = (productId: number, featureIndex: number) => {
    const product = productList.find(p => p.id === productId);
    if (!product) return;
    const features = [...(product.features || [])];
    features.splice(featureIndex, 1);
    handleChange(productId, "features", features);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
            <ArrowLeft size={20} className="text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Termekeink</h1>
        </div>

        {/* Toggle section */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Termékek szekció megjelenítése</h3>
            <p className="text-sm text-gray-500">Főoldalon</p>
          </div>
          <button
            onClick={handleToggleProducts}
            disabled={savingSettings}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {showProducts ? (
              <>
                <ToggleRight size={20} className="text-green-600" />
                <span className="text-green-600 font-semibold">BE</span>
              </>
            ) : (
              <>
                <ToggleLeft size={20} className="text-gray-400" />
                <span className="text-gray-400 font-semibold">KI</span>
              </>
            )}
          </button>
        </div>

        {/* Global Product Settings */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Termék kártya feliratok</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ÁFA felirat (pl. ÁFA-val)</label>
              <input
                type="text"
                value={vatLabel}
                onChange={e => setVatLabel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Elérhetőségi tájékoztató</label>
              <textarea
                value={availabilityInfo}
                onChange={e => setAvailabilityInfo(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Részletes ÁFA tájékoztató (modálban)</label>
              <input
                type="text"
                value={modalVatInfo}
                onChange={e => setModalVatInfo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveGlobalSettings}
                disabled={savingSettings}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg font-bold text-sm hover:bg-primary/80 transition-colors disabled:opacity-50"
              >
                <Save size={16} />
                {savingSettings ? "Mentés..." : "Feliratok mentése"}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
          >
            <Plus size={16} />
            Új termék
          </button>
        </div>

        {saveError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            ❌ {saveError}
          </div>
        )}

        <div className="space-y-4">
          {productList.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(expanded === product.id ? null : product.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-semibold text-gray-900">{product.brand} - {product.type}</span>
                  {!product.published && <span className="text-xs text-gray-500">(Rejtett)</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSave(product); }}
                    disabled={saving === product.id}
                    className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={14} />
                    {saving === product.id ? "Mentés..." : saved === product.id ? "✓" : "Mentés"}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }}
                    className="p-1.5 rounded hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {expanded === product.id && (
                <div className="p-4 border-t border-gray-200 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Márka</label>
                      <input
                        type="text"
                        value={product.brand}
                        onChange={(e) => handleChange(product.id, "brand", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Típus</label>
                      <input
                        type="text"
                        value={product.type}
                        onChange={(e) => handleChange(product.id, "type", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ár (Ft)</label>
                      <input
                        type="number"
                        value={product.price === 0 || product.price === null ? "" : product.price}
                        onChange={(e) => handleChange(product.id, "price", e.target.value === "" ? 0 : Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Akciós ár (Ft)</label>
                      <input
                        type="number"
                        value={product.salePrice === 0 || product.salePrice === null ? "" : product.salePrice}
                        onChange={(e) => handleChange(product.id, "salePrice", e.target.value === "" ? 0 : Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`sale-${product.id}`}
                      checked={product.sale ?? false}
                      onChange={(e) => handleChange(product.id, "sale", e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={`sale-${product.id}`} className="text-sm text-gray-700">
                      Akciós jelzés (AKCIÓ badge)
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Leírás</label>
                    <textarea
                      value={product.description || ""}
                      onChange={(e) => handleChange(product.id, "description", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Tulajdonságok</label>
                      <button
                        onClick={() => handleAddFeature(product.id)}
                        className="text-xs text-primary hover:underline"
                      >
                        + Tulajdonság hozzáadása
                      </button>
                    </div>
                    <div className="space-y-2">
                      {(product.features || []).map((feature, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => handleFeatureChange(product.id, idx, e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleDeleteFeature(product.id, idx)}
                            className="p-2 rounded hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Képek</label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(product.images || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleDeleteImage(product.id, idx)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                      {(product.images || []).length < 8 && (
                        <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                          <input type="file" accept="image/*" className="hidden"
                            onChange={e => handleImageUpload(product.id, "images", undefined, e)}
                            disabled={!!uploading}
                          />
                          {uploading === `${product.id}-images-` ? (
                            <span className="text-xs text-gray-500">Feltöltés...</span>
                          ) : (
                            <>
                              <ImageIcon size={20} className="text-gray-400" />
                              <span className="text-xs text-gray-400 mt-1">Kép hozzáadása</span>
                            </>
                          )}
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`published-${product.id}`}
                      checked={product.published ?? false}
                      onChange={(e) => handleChange(product.id, "published", e.target.checked)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor={`published-${product.id}`} className="text-sm text-gray-700">
                      Megjelenítés az oldalon
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
