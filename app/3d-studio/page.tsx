"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ShoppingBag, RotateCcw } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import { FINISH_PRESETS } from '@/components/3d/ProductViewer';

const ProductViewer = dynamic(() => import('@/3d/ProductViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE]">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#171716] animate-ping" />
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#171716] font-medium">
          LOADING 3D SHOWROOM
        </span>
      </div>
    </div>
  ),
});

export default function Studio3DPage() {
  const { addItem } = useCart();
  const modelsList = PRODUCTS.filter(p => p.hasModel && p.modelUrl);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = modelsList[activeIndex] || modelsList[0];
  const [selectedFinishSlug, setSelectedFinishSlug] = useState<string>(
    activeProduct?.finishes?.[0]?.slug || 'warm-sandstone'
  );
  const [isAdded, setIsAdded] = useState(false);

  const handleSelectModel = (idx: number) => {
    setActiveIndex(idx);
    const prod = modelsList[idx];
    if (prod && prod.finishes && prod.finishes[0]) {
      setSelectedFinishSlug(prod.finishes[0].slug);
    }
  };

  const handleAddToCart = () => {
    if (!activeProduct) return;
    const sizeLabel = activeProduct.sizes?.[0]?.label || 'Standard';
    const finishLabel = activeProduct.finishes?.find(f => f.slug === selectedFinishSlug)?.label || 'Studio Finish';

    addItem({
      productId: activeProduct.id,
      slug: activeProduct.slug,
      name: activeProduct.name,
      price: activeProduct.price,
      quantity: 1,
      size: sizeLabel,
      material: 'Studio Material',
      finish: finishLabel,
      image: activeProduct.images?.[0] || '',
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-12 sm:mb-16">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            VIRTUAL SHOWROOM
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
            THE 3D STUDIO
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl font-normal">
            Explore selected Layerxyz objects in three dimensions. Inspect volumetric depth, tactile silhouettes, and studio finishes in real time.
          </p>
        </header>

        {/* Model Selector Tabs */}
        <div className="flex overflow-x-auto pb-3 mb-8 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar gap-2 sm:gap-3">
          {modelsList.map((product, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={product.id}
                onClick={() => handleSelectModel(idx)}
                className={`whitespace-nowrap px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                    : 'bg-white/80 text-[#171716] border border-[#E8E5DE] hover:border-[#D4D0C8] hover:bg-white'
                }`}
              >
                {product.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Showroom Hero Stage */}
        <div className="mb-20 rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 3D Canvas Viewport (8 cols) */}
            <div className="lg:col-span-8 w-full h-[460px] sm:h-[540px] lg:h-[600px] relative rounded-2xl overflow-hidden bg-[#ECEAE4]/40 border border-[#E8E5DE]/80">
              <ProductViewer
                key={`${activeProduct.slug}-${selectedFinishSlug}`}
                modelUrl={activeProduct.modelUrl}
                productName={activeProduct.name}
                activeFinishSlug={selectedFinishSlug}
                fallbackColor={activeProduct.color || '#C8B89F'}
                posterImage={activeProduct.images?.[0]}
              />
            </div>

            {/* Object Information & Direct Commerce Strip (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full py-2">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E5DE] text-[10px] font-mono uppercase tracking-widest text-[#6F6B63] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#171716] animate-pulse" />
                  <span>INTERACTIVE 3D OBJECT</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] tracking-tight mb-2">
                  {activeProduct.name}
                </h2>

                <p className="text-sm text-[#6F6B63] leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                <div className="pb-6 mb-6 border-b border-[#E8E5DE]">
                  <span className="text-xs font-mono uppercase text-[#8E8B83] block mb-1">
                    STARTING AT
                  </span>
                  <div className="text-3xl font-semibold text-[#171716] tracking-tight">
                    {activeProduct.pricePrefix || ''}{formatPrice(activeProduct.price)}
                  </div>
                </div>

                {/* Finish preset switcher */}
                {activeProduct.finishes && activeProduct.finishes.length > 0 && (
                  <div className="mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-3">
                      FINISH PREVIEW
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProduct.finishes.map((f) => {
                        const isSelected = selectedFinishSlug === f.slug;
                        const preset = FINISH_PRESETS[f.slug];
                        return (
                          <button
                            key={f.slug}
                            onClick={() => setSelectedFinishSlug(f.slug)}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border text-xs transition-all ${
                              isSelected
                                ? 'bg-[#171716] text-[#F4F1EA] border-[#171716]'
                                : 'bg-white hover:bg-[#F4F1EA] text-[#171716] border-[#E8E5DE]'
                            }`}
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/10"
                              style={{ backgroundColor: preset?.color || '#C8B89F' }}
                            />
                            <span>{f.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions: View Object & Add to Cart */}
              <div className="space-y-3 pt-4 border-t border-[#E8E5DE]">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 px-6 rounded-full bg-[#181817] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      ADDED TO CART
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} />
                      ADD TO CART • {formatPrice(activeProduct.price)}
                    </>
                  )}
                </button>

                <Link
                  href={`/product/${activeProduct.slug}`}
                  className="w-full py-3.5 px-6 rounded-full bg-white text-[#171716] border border-[#171716] text-xs font-mono uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors text-center inline-flex items-center justify-center gap-2"
                >
                  VIEW OBJECT DETAILS
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Curated 3D Gallery Grid */}
        <section className="pt-12 border-t border-[#E8E5DE]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-2 font-medium">
                COLLECTION HIGHLIGHTS
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#171716]">
                ALL 3D OBJECTS
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono uppercase tracking-wider text-[#171716] hover:text-[#6F6B63] transition-colors inline-flex items-center gap-1.5"
            >
              EXPLORE FULL COLLECTION →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modelsList.map((product, idx) => (
              <div
                key={product.id}
                onClick={() => {
                  handleSelectModel(idx);
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className={`group flex flex-col p-5 rounded-3xl bg-[#FAFAF8] border transition-all cursor-pointer ${
                  activeIndex === idx
                    ? 'border-[#171716] shadow-sm'
                    : 'border-[#E8E5DE] hover:border-[#D4D0C8] hover:shadow-xs'
                }`}
              >
                <div className="w-full aspect-square rounded-2xl bg-[#EAE5DC] relative overflow-hidden mb-4 flex items-center justify-center p-4">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-xs font-mono uppercase text-[#6F6B63]">3D Model</div>
                  )}
                  <span className="absolute top-3 right-3 text-[10px] font-mono uppercase bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#E8E5DE] text-[#171716]">
                    3D
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E8B83] block mb-1">
                  {product.categoryLabel || product.category}
                </span>
                <h4 className="text-base font-medium text-[#171716] group-hover:text-black transition-colors mb-1 line-clamp-1">
                  {product.name}
                </h4>
                <div className="mt-auto pt-3 border-t border-[#E8E5DE] flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#171716]">
                    {product.pricePrefix || ''}{formatPrice(product.price)}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#6F6B63] group-hover:text-[#171716]">
                    {activeIndex === idx ? 'ACTIVE' : 'INSPECT →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
