'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock, Layers, Ruler, Sparkles, MessageCircle } from 'lucide-react';
import { Category, CategoryProduct } from '@/data/categories';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';

export interface CategoryDetailClientProps {
  category: Category;
  allCategories: { slug: string; name: string }[];
}

export function CategoryDetailClient({ category, allCategories }: CategoryDetailClientProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>('ALL');

  const filteredProducts = useMemo(() => {
    if (activeSubcategory === 'ALL') {
      return category.products;
    }
    return category.products.filter(
      (p) => p.subcategory.toLowerCase() === activeSubcategory.toLowerCase()
    );
  }, [category.products, activeSubcategory]);

  const currentIndex = allCategories.findIndex((c) => c.slug === category.slug);
  const prevCategory = allCategories[(currentIndex - 1 + allCategories.length) % allCategories.length];
  const nextCategory = allCategories[(currentIndex + 1) % allCategories.length];

  return (
    <div>
      {/* Category Hero Banner */}
      <header className="mb-14 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E8E5DE] bg-[#FAFAF8] relative overflow-hidden shadow-xs">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E5DE] text-[11px] font-mono uppercase tracking-widest text-[#6F6B63] mb-6">
            <span>CATEGORY 0{currentIndex + 1}</span>
            <span>•</span>
            <span>{category.products.length} PRODUCTS</span>
            <span>•</span>
            <span>FROM {formatPrice(category.startingPrice)}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4 leading-tight">
            {category.name}
          </h1>

          <p className="text-lg sm:text-xl text-[#4A4740] mb-4 font-medium">
            {category.tagline}
          </p>

          <p className="text-sm sm:text-base text-[#6F6B63] leading-relaxed max-w-2xl mb-8">
            {category.description}
          </p>

          {/* Quick Specifications Strip */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-[#E8E5DE] text-xs">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-[#8E8B83]" />
              <span className="text-[#6F6B63]">Lead Time:</span>
              <span className="font-semibold text-[#171716]">{category.leadTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={15} className="text-[#8E8B83]" />
              <span className="text-[#6F6B63]">Materials:</span>
              <span className="font-semibold text-[#171716]">{category.materials.join(', ')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-[#8E8B83]" />
              <span className="text-[#6F6B63]">Finishes:</span>
              <span className="font-semibold text-[#171716]">{category.finishes.join(', ')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Subcategory Filter Pills */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#6F6B63] font-medium">
            FILTER BY SUB-CATEGORY ({category.subcategories.length} AVAILABLE)
          </span>
          <span className="text-xs font-mono text-[#8E8B83]">
            SHOWING {filteredProducts.length} OF {category.products.length} OBJECTS
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveSubcategory('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
              activeSubcategory === 'ALL'
                ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                : 'bg-white border border-[#E8E5DE] text-[#171716] hover:border-[#D4D0C8]'
            }`}
          >
            ALL ITEMS ({category.products.length})
          </button>

          {category.subcategories.map((sub) => {
            const count = category.products.filter(
              (p) => p.subcategory.toLowerCase() === sub.toLowerCase()
            ).length;
            const isActive = activeSubcategory.toLowerCase() === sub.toLowerCase();

            return (
              <button
                key={sub}
                onClick={() => setActiveSubcategory(sub)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                    : 'bg-white border border-[#E8E5DE] text-[#55524B] hover:border-[#D4D0C8] hover:text-[#171716]'
                }`}
              >
                <span>{sub}</span>
                {count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EFECE5] text-[#6F6B63]'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid with Category-Specific Details */}
      <div className="mb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubcategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product: CategoryProduct) => {
              const whatsappOrderText = `Hi Layerxyz! I am interested in ordering/customizing the "${product.name}" from your ${category.name} collection (${product.subcategory}). Starting at ${formatPrice(product.price)}.`;

              return (
                <div
                  key={product.id}
                  id={product.slug}
                  className="group flex flex-col justify-between rounded-3xl bg-white border border-[#E8E5DE] p-6 hover:border-[#171716]/30 hover:shadow-md transition-all duration-300"
                >
                  <div>
                    {/* Header: Subcategory badge & optional status pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-[#6F6B63] px-3 py-1 rounded-full bg-[#F4F1EA] border border-[#E8E5DE]">
                        {product.subcategory}
                      </span>
                      {product.badge && (
                        <span className="text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-[#171716] text-[#F4F1EA] font-semibold">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-sans font-semibold text-[#171716] mb-2 group-hover:text-black transition-colors">
                      {product.name}
                    </h3>

                    {/* Product Description */}
                    <p className="text-sm text-[#6F6B63] leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Technical Details Box */}
                    <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE] space-y-2 mb-6 text-xs">
                      <div className="flex items-center justify-between text-[#55524B]">
                        <span className="flex items-center gap-1.5 text-[#8E8B83]">
                          <Ruler size={13} />
                          Dimensions
                        </span>
                        <span className="font-mono text-[#171716]">{product.dimensions}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#55524B]">
                        <span className="flex items-center gap-1.5 text-[#8E8B83]">
                          <Layers size={13} />
                          Materials
                        </span>
                        <span className="truncate max-w-[170px] text-[#171716] font-medium">{product.materials.join(', ')}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#55524B]">
                        <span className="flex items-center gap-1.5 text-[#8E8B83]">
                          <Sparkles size={13} />
                          Finishes
                        </span>
                        <span className="truncate max-w-[170px] text-[#171716]">{product.finishes.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="pt-4 border-t border-[#E8E5DE]">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-xs text-[#8E8B83] block font-mono">Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-semibold text-[#171716]">
                            {product.pricePrefix || ''}{formatPrice(product.price)}
                          </span>
                          {product.comparePrice && (
                            <span className="text-xs text-[#8E8B83] line-through">
                              {formatPrice(product.comparePrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase text-[#8E8B83] bg-[#F4F1EA] px-2.5 py-1 rounded-full border border-[#E8E5DE]">
                        Made to Order
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getWhatsAppUrl(whatsappOrderText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-full bg-[#171716] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors"
                      >
                        <MessageCircle size={13} />
                        ORDER / INQUIRE
                      </a>
                      <Link
                        href={`/start-a-project?category=${category.slug}&product=${product.slug}`}
                        className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-full bg-white border border-[#E8E5DE] text-[#171716] text-xs font-mono uppercase tracking-wider hover:border-[#D4D0C8] hover:bg-[#F9F7F2] transition-colors"
                      >
                        CUSTOMIZE
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Category Craftsmanship & FAQ Note */}
      <div className="rounded-3xl p-8 sm:p-10 bg-white border border-[#E8E5DE] mb-16">
        <div className="max-w-3xl">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2 font-semibold">
            STUDIO FABRICATION STANDARDS FOR {category.name.toUpperCase()}
          </span>
          <h3 className="text-2xl font-sans font-semibold text-[#171716] mb-3">
            Crafted locally in Tiruppur with precision additive technology
          </h3>
          <p className="text-sm text-[#6F6B63] leading-relaxed mb-6">
            Every piece in the {category.name} collection undergoes rigorous pre-print geometric slicing, temperature-controlled printing, hand-finishing, and studio inspection. If you have custom dimension constraints or require specific finishes (such as bronze patina, terracotta, or matte black graphite), our studio team is ready to accommodate.
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider">
            {category.highlights.map((h, i) => (
              <span key={i} className="flex items-center gap-2 text-[#171716]">
                <CheckCircle2 size={14} className="text-[#171716]" />
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Pagination / Neighbor Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E8E5DE]">
        <Link
          href={`/categories/${prevCategory.slug}`}
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6F6B63] hover:text-[#171716] transition-colors"
        >
          <span>← PREVIOUS:</span>
          <span className="font-semibold text-[#171716] group-hover:underline">{prevCategory.name}</span>
        </Link>
        <Link
          href="/categories"
          className="text-xs font-mono uppercase tracking-widest text-[#8E8B83] hover:text-[#171716] transition-colors"
        >
          VIEW ALL 8 CATEGORIES
        </Link>
        <Link
          href={`/categories/${nextCategory.slug}`}
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6F6B63] hover:text-[#171716] transition-colors"
        >
          <span>NEXT:</span>
          <span className="font-semibold text-[#171716] group-hover:underline">{nextCategory.name}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
