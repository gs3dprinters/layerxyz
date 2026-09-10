'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Minus,
  Plus,
  Check,
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  Box,
  Compass,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import { Product } from '@/data/products';
import { FINISH_PRESETS } from '@/components/3d/ProductViewer';

const ProductViewer = dynamic(() => import('@/3d/ProductViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE]">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#181817] animate-ping" />
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#181817] font-medium">
          PREPARING 3D OBJECT
        </span>
      </div>
    </div>
  ),
});

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const shouldReduceMotion = useReducedMotion();
  const { addItem } = useCart();

  if (!product) return notFound();

  // State
  const [selectedSize, setSelectedSize] = useState<any>(product.sizes?.[0] || null);
  const [selectedFinish, setSelectedFinish] = useState<any>(product.finishes?.[0] || null);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(product.materials?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Dynamic Price calculation based on real product size data
  const currentPrice = selectedSize ? selectedSize.price : product.price;

  // Active finish slug for live 3D Three.js PBR material updates
  const activeFinishSlug = selectedFinish?.slug || 'warm-sandstone';

  // Add to Cart handler
  const handleAddToCart = () => {
    const sizeLabel = selectedSize?.label || selectedSize?.name || 'Standard';
    const matLabel = typeof selectedMaterial === 'object' ? selectedMaterial?.label : selectedMaterial || 'Standard';
    const finishLabel = typeof selectedFinish === 'object' ? selectedFinish?.label : selectedFinish || 'Smooth Matte';

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: currentPrice,
      quantity,
      size: sizeLabel,
      material: matLabel,
      finish: finishLabel,
      image: product.images?.[0] || '',
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2400);
  };

  // Helper to retrieve tone color preview for finish buttons
  const getFinishTone = (finish: any) => {
    const slug = finish?.slug || '';
    if (FINISH_PRESETS[slug]) {
      return FINISH_PRESETS[slug].color;
    }
    return '#C8B89F';
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-24 md:pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono tracking-wider uppercase text-[#6F6B63] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#171716] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#171716] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#171716] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* ========================================================================= */}
        {/* STEP 2: PRODUCT HERO (Split Layout: 58% 3D / 42% Product Info)             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-28 md:mb-36">
          {/* LEFT (7 cols ~58%): Large Interactive 3D Viewer or Editorial Image */}
          <div className="lg:col-span-7 w-full sticky top-28">
            {product.hasModel && product.modelUrl ? (
              <ProductViewer
                modelUrl={product.modelUrl}
                productName={product.name}
                activeFinishSlug={activeFinishSlug}
                fallbackColor={product.colors?.[0] || '#C8B89F'}
                posterImage={product.images?.[0]}
              />
            ) : (
              <div className="w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden bg-[#FAFAF8] border border-[#E8E5DE] relative flex items-center justify-center p-8 shadow-xs">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="max-h-[85%] max-w-[85%] object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-700"
                  />
                ) : (
                  <div
                    className="w-48 h-48 rounded-3xl shadow-xl flex items-center justify-center text-xs font-mono text-[#6F6B63] tracking-widest uppercase border border-black/5"
                    style={{ background: product.color || '#E8E5DE' }}
                  >
                    STUDIO OBJECT
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT (5 cols ~42%): Product Information & Configuration Controls */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Category Eyebrow */}
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              {product.categoryLabel || product.category.toUpperCase()}
            </span>

            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-[#171716] leading-[1.05] mb-4">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price & Stock Row */}
            <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-[#E8E5DE]">
              <span className="text-3xl sm:text-4xl font-semibold text-[#171716] tracking-tight">
                {product.pricePrefix && !selectedSize ? product.pricePrefix : ''}
                {formatPrice(currentPrice)}
              </span>

              {product.comparePrice && (
                <span className="text-base font-mono text-[#8E8B83] line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}

              <span className="ml-auto text-[11px] font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-white border border-[#E8E5DE] text-[#4A4740]">
                {product.isMadeToOrder ? 'Made to Order' : 'In Stock'}
              </span>
            </div>

            {/* SIZE SELECTOR */}
            {product.sizes && product.sizes.length > 0 ? (
              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#171716] font-medium">
                    SIZE
                  </span>
                  {selectedSize?.dimensions && (
                    <span className="text-xs font-mono text-[#6F6B63]">
                      {selectedSize.dimensions}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize?.label === size.label;
                    return (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`p-3.5 rounded-2xl text-left border transition-all ${
                          isSelected
                            ? 'bg-[#171716] text-[#F4F1EA] border-[#171716] shadow-xs'
                            : 'bg-white/80 hover:bg-white text-[#171716] border-[#E8E5DE] hover:border-[#D4D0C8]'
                        }`}
                      >
                        <span className="block text-xs font-medium">{size.label}</span>
                        <span className={`block text-[11px] mt-1 ${isSelected ? 'text-[#C8B89F]' : 'text-[#6F6B63]'}`}>
                          {formatPrice(size.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mb-8 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE] flex justify-between items-center text-xs">
                <span className="font-mono uppercase text-[#6F6B63]">Dimensions</span>
                <span className="font-medium text-[#171716]">Bespoke Sizing Available</span>
              </div>
            )}

            {/* FINISH SELECTOR (Updates 3D Model in Real Time) */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#171716] font-medium">
                    FINISH
                  </span>
                  <span className="text-xs font-medium text-[#6F6B63]">
                    {selectedFinish?.label || 'Studio Finish'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {product.finishes.map((finish: any) => {
                    const isSelected = selectedFinish?.label === finish.label;
                    const toneColor = getFinishTone(finish);

                    return (
                      <button
                        key={finish.label}
                        onClick={() => setSelectedFinish(finish)}
                        className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#171716] text-[#F4F1EA] border-[#171716] shadow-xs'
                            : 'bg-white/80 hover:bg-white text-[#171716] border-[#E8E5DE] hover:border-[#D4D0C8]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs flex-shrink-0"
                          style={{ backgroundColor: toneColor }}
                        />
                        <span>{finish.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTIONS */}
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center border border-[#E8E5DE] rounded-full bg-white px-2 py-1 shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-2 text-[#6F6B63] hover:text-[#171716] transition-colors rounded-full hover:bg-[#F4F1EA]"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-sm font-mono font-medium text-[#171716]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-2 text-[#6F6B63] hover:text-[#171716] transition-colors rounded-full hover:bg-[#F4F1EA]"
                >
                  <Plus size={15} />
                </button>
              </div>

              <span className="text-xs text-[#6F6B63] font-mono">
                Subtotal: {formatPrice(currentPrice * quantity)}
              </span>
            </div>

            {/* PRIMARY CTA: Dominant Add to Cart */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-8 rounded-full bg-[#181817] text-[#F4F1EA] font-medium text-sm tracking-wide hover:bg-[#2A2A28] transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check size={16} className="text-[#C8B89F]" />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    ADD TO CART • {formatPrice(currentPrice * quantity)}
                  </>
                )}
              </button>

              {/* Secondary CTA: Custom Version */}
              <Link
                href="/custom"
                className="w-full py-3.5 px-8 rounded-full bg-white text-[#171716] border border-[#171716] font-medium text-xs tracking-wide hover:bg-[#F4F1EA] transition-colors text-center"
              >
                REQUEST BESPOKE CUSTOMIZATION
              </Link>

              {/* Direct Studio Inquiry Action */}
              {(() => {
                const inquiryUrl = getWhatsAppUrl(`Hi, I'm inquiring about ordering the ${product.name} in ${selectedFinish?.label || 'standard finish'} (${selectedSize?.label || 'standard size'}).`);
                const isExternal = inquiryUrl.startsWith('http');
                return (
                  <a
                    href={inquiryUrl}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="w-full py-3 px-6 rounded-full bg-white text-[#6F6B63] hover:text-[#171716] border border-[#E8E5DE] text-xs font-medium hover:border-[#D4D0C8] transition-colors text-center"
                  >
                    {isExternal ? 'Inquire directly on WhatsApp →' : 'Inquire with our studio →'}
                  </a>
                );
              })()}
            </div>

            {/* Subtle Product Trust Row - 3 Pillars */}
            <div className="pt-6 border-t border-[#E8E5DE] grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                  MADE TO ORDER
                </span>
                <span className="text-xs font-medium text-[#171716] leading-tight block">
                  Produced individually for your order.
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                  STUDIO MADE
                </span>
                <span className="text-xs font-medium text-[#171716] leading-tight block">
                  Created through the Layerxyz studio.
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                  NATIONWIDE DELIVERY
                </span>
                <span className="text-xs font-medium text-[#171716] leading-tight block">
                  Available across India.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP 12: THE OBJECT (Large Editorial Story Section)                       */}
        {/* ========================================================================= */}
        <section className="py-24 border-t border-[#E8E5DE]">
          <div className="max-w-4xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              EDITORIAL NARRATIVE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-8 leading-tight">
              THE OBJECT.
            </h2>
            <div className="space-y-6 text-base sm:text-xl text-[#55524B] leading-relaxed font-normal">
              <p>
                {product.longDescription || product.description}
              </p>
              {product.details?.description && (
                <p className="text-sm sm:text-base text-[#6F6B63]">
                  {product.details.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 13: FULL-WIDTH PRODUCT VISUAL                                       */}
        {/* ========================================================================= */}
        {product.images && product.images[0] && (
          <section className="my-16">
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-[#FAFAF8] border border-[#E8E5DE] relative flex items-center justify-center p-8 shadow-xs">
              <img
                src={product.images[0]}
                alt={`${product.name} Studio Presentation`}
                className="max-h-[90%] max-w-[90%] object-contain drop-shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-xs font-mono text-[#6F6B63] pointer-events-none">
                <span className="uppercase tracking-widest">{product.name}</span>
                <span>Tiruppur Studio Edition</span>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* STEP 14: DETAILS & SPECIFICATIONS                                        */}
        {/* ========================================================================= */}
        <section className="py-24 border-t border-[#E8E5DE]">
          <div className="max-w-4xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              SPECIFICATION SHEET
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-[#171716] mb-12">
              DETAILS & SPECIFICATIONS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]">
                <span className="text-[10px] font-mono uppercase text-[#8E8B83] block mb-2">
                  DIMENSIONS & SCALE
                </span>
                <p className="font-medium text-[#171716] mb-1">
                  {selectedSize?.dimensions || product.dimensions || 'Bespoke Sizing'}
                </p>
                <p className="text-xs text-[#6F6B63]">
                  Individually verified prior to final studio packaging.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]">
                <span className="text-[10px] font-mono uppercase text-[#8E8B83] block mb-2">
                  MATERIAL & FINISH
                </span>
                <p className="font-medium text-[#171716] mb-1">
                  {selectedFinish?.label || 'Studio Finish'} ({selectedMaterial?.label || 'Studio Material'})
                </p>
                <p className="text-xs text-[#6F6B63]">
                  Finished and prepared for display.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]">
                <span className="text-[10px] font-mono uppercase text-[#8E8B83] block mb-2">
                  SHIPPING & TRANSIT
                </span>
                <p className="font-medium text-[#171716] mb-1">
                  {product.details?.shipping || 'Made to order. Delivery timing depends on the object, finish and destination.'}
                </p>
                <p className="text-xs text-[#6F6B63]">
                  Carefully secured in protective packaging.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE]">
                <span className="text-[10px] font-mono uppercase text-[#8E8B83] block mb-2">
                  CARE & PRESERVATION
                </span>
                <p className="font-medium text-[#171716] mb-1">
                  {product.details?.care || 'Dust gently with a clean micro-fiber cloth.'}
                </p>
                <p className="text-xs text-[#6F6B63]">
                  Avoid exposure to abrasive cleaners and high moisture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 15: HOW IT'S MADE (4-Step Visual Craft Progression)                  */}
        {/* ========================================================================= */}
        <section className="py-24 border-t border-[#E8E5DE]">
          <div className="max-w-7xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              FABRICATION PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-[#171716] mb-14">
              HOW IT&apos;S MADE
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] flex flex-col justify-between h-full">
                <span className="text-xs font-mono text-[#6F6B63] mb-8 block">01 / DIGITAL SCULPT</span>
                <div>
                  <h3 className="text-base font-medium text-[#171716] mb-2">Digital Preparation</h3>
                  <p className="text-xs text-[#6F6B63] leading-relaxed">
                    Your reference photographs or digital files are prepared into a printable 3D form.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] flex flex-col justify-between h-full">
                <span className="text-xs font-mono text-[#6F6B63] mb-8 block">02 / TOOLPATH</span>
                <div>
                  <h3 className="text-base font-medium text-[#171716] mb-2">Toolpath & Slicing</h3>
                  <p className="text-xs text-[#6F6B63] leading-relaxed">
                    The model is oriented and prepared for the printing process.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] flex flex-col justify-between h-full">
                <span className="text-xs font-mono text-[#6F6B63] mb-8 block">03 / FABRICATION</span>
                <div>
                  <h3 className="text-base font-medium text-[#171716] mb-2">Additive Fabrication</h3>
                  <p className="text-xs text-[#6F6B63] leading-relaxed">
                    The object is produced layer by layer using the selected printing material.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] flex flex-col justify-between h-full">
                <span className="text-xs font-mono text-[#6F6B63] mb-8 block">04 / FINISHING</span>
                <div>
                  <h3 className="text-base font-medium text-[#171716] mb-2">Studio Finishing</h3>
                  <p className="text-xs text-[#6F6B63] leading-relaxed">
                    The printed piece is cleaned, finished where required, and prepared for delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STEP 16: RELATED OBJECTS ("YOU MAY ALSO LIKE")                           */}
        {/* ========================================================================= */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-24 border-t border-[#E8E5DE]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-2 font-medium">
                  EXPLORE FURTHER
                </span>
                <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#171716]">
                  YOU MAY ALSO LIKE
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-xs font-medium text-[#171716] hover:text-[#6F6B63] transition-colors inline-flex items-center gap-1.5"
              >
                VIEW FULL COLLECTION →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.slice(0, 3).map((item) => (
                <Link
                  key={item.slug}
                  href={`/product/${item.slug}`}
                  className="group flex flex-col bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-6 hover:border-[#D4D0C8] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] transition-all"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl bg-[#EAE5DC] relative overflow-hidden mb-6 flex items-center justify-center p-4">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="max-h-[85%] max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-[#DCD6CC] shadow-xs flex items-center justify-center text-[10px] font-mono text-[#6F6B63] uppercase">
                        OBJECT
                      </div>
                    )}
                    {item.hasModel && (
                      <span className="absolute top-3 right-3 text-[10px] font-mono uppercase bg-white/85 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-[#E8E5DE] text-[#171716]">
                        3D
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#6F6B63] block mb-1">
                    {item.categoryLabel || item.category}
                  </span>
                  <h3 className="text-lg font-medium text-[#171716] group-hover:text-black transition-colors mb-1">
                    {item.name}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-[#E8E5DE]/80 flex justify-between items-center text-sm">
                    <span className="font-semibold text-[#171716]">
                      {item.pricePrefix || ''}{formatPrice(item.price)}
                    </span>
                    <span className="text-xs font-medium text-[#171716] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      VIEW OBJECT →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* STEP 17: CUSTOM VERSION CTA                                              */}
        {/* ========================================================================= */}
        <section className="py-24 border-t border-[#E8E5DE] text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-4 font-medium">
              BESPOKE EDITIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-6 leading-tight">
              CREATE SOMETHING THAT DOESN&apos;T EXIST YET.
            </h2>
            <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed mb-10">
              Have a photograph, sketch, CAD file or idea that isn&apos;t in the collection? Work directly with the Layerxyz studio to create a bespoke physical object.
            </p>
            <Link
              href="/custom"
              className="inline-flex justify-center items-center gap-2 px-9 py-4 bg-[#181817] text-[#F4F1EA] font-medium hover:bg-[#2A2A28] transition-colors rounded-full text-sm tracking-wide shadow-sm"
            >
              START A CUSTOM PROJECT
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
