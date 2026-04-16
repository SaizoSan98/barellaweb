"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Check, Tag } from "lucide-react";
import type { Product } from "@/db/schema";

// Products component - displays product cards and modal
export function Products({ products, settings }: { products: Product[], settings: Record<string, string> }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const publishedProducts = products.filter(p => p.published);
  
  if (publishedProducts.length === 0) return null;

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined) return "";
    return new Intl.NumberFormat('hu-HU').format(price);
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-black relative border-t border-white/5 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Termékeink</span>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Premium <span className="text-gray-600">kínálat</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Kiváló minőségű klíma és fűtési rendszerek modern technológiával, szakértői telepítéssel
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {publishedProducts.map((product) => {
            const images = product.images || [];
            const mainImage = images[0] || "/images/ref1.jpg";
            const hasSale = product.sale && product.salePrice && product.salePrice > 0;
            const displayPrice = hasSale ? product.salePrice : product.price;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white/5 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:border-primary/50 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative aspect-square bg-gray-900 overflow-hidden">
                  <Image
                    src={mainImage}
                    alt={`${product.brand} ${product.type}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {hasSale && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-600/30">
                      AKCIÓ
                    </div>
                  )}
                </div>

                <div className="p-3 md:p-5">
                  <div className="mb-2 md:mb-3">
                    <h3 className="text-white font-bold text-sm md:text-lg mb-1 group-hover:text-primary transition-colors">{product.brand}</h3>
                    <p className="text-gray-400 text-xs md:text-sm">{product.type}</p>
                  </div>
                  
                  <div className="flex items-end">
                    <div>
                      {displayPrice ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-white font-bold text-lg md:text-2xl">{formatPrice(displayPrice)} Ft</span>
                          {hasSale && product.price && (
                            <span className="text-gray-500 text-xs md:text-sm line-through">{formatPrice(product.price)} Ft</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs md:text-sm">Ár egyeztetés alatt</span>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{settings.product_card_vat_label || "ÁFA-val"}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="max-w-5xl w-full max-h-[90vh] relative rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-white shadow-2xl h-full">
              {/* Close button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
              >
                <X size={24} className="text-gray-700" />
              </button>

              <div className="overflow-y-auto h-full p-6 md:p-10 pt-20">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Images */}
                  <div className="flex flex-col items-center">
                    <div className="relative h-[350px] w-full max-w-[350px] rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-lg">
                      <Image
                        src={selectedProduct.images?.[0] || "/images/ref1.jpg"}
                        alt={selectedProduct.brand}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 80vw, 35vw"
                        priority
                      />
                    </div>
                    {selectedProduct.images && selectedProduct.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 w-full max-w-[350px]">
                        {selectedProduct.images.slice(1).map((img, idx) => (
                          <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                            <Image
                              src={img}
                              alt={`${selectedProduct.brand} ${idx + 2}`}
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 768px) 18vw, 8vw"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-4xl font-black text-gray-900 mb-2">{selectedProduct.brand}</h2>
                      <p className="text-primary text-xl font-semibold">{selectedProduct.type}</p>
                    </div>

                    {selectedProduct.description && (
                      <p className="text-gray-700 leading-relaxed text-lg">{selectedProduct.description}</p>
                    )}

                    {selectedProduct.features && selectedProduct.features.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-gray-900 font-bold mb-4 flex items-center gap-2 text-lg">
                          <Tag size={20} className="text-primary" />
                          Termékjellemzők
                        </h3>
                        <ul className="space-y-3">
                          {selectedProduct.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={14} className="text-primary" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-baseline gap-4 mb-2">
                        {selectedProduct.sale && selectedProduct.salePrice && selectedProduct.salePrice > 0 ? (
                          <>
                            <span className="text-4xl font-black text-red-600">{formatPrice(selectedProduct.salePrice)} Ft</span>
                            {selectedProduct.price && (
                              <span className="text-xl text-gray-400 line-through">{formatPrice(selectedProduct.price)} Ft</span>
                            )}
                          </>
                        ) : selectedProduct.price ? (
                          <span className="text-4xl font-black text-gray-900">{formatPrice(selectedProduct.price)} Ft</span>
                        ) : (
                          <span className="text-gray-500 text-lg">Ár egyeztetés alatt</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">Az árak tartalmazzák az ÁFÁT!</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                      <p className="text-gray-700 text-sm">
                        A termék elérhetőségéről tájékozódjon telefonon, vagy valamelyik elérhetőségünkön!
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-black transition-all duration-300"
                    >
                      Bezárás
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
