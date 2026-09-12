'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Clock, Layers, Ruler, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, Category, CategoryProduct } from '@/data/categories';
import { formatPrice } from '@/lib/utils';

export default function ShopByCategory() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(CATEGORIES[0].slug);

  const activeCategory: Category =
    CATEGORIES.find((c) => c.slug === selectedCategorySlug) || CATEGORIES[0];

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA] border-t border-[#E8E5DE]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              EXPLORE BY DISCIPLINE • 8 CORE CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-3">
              SHOP BY CATEGORY
            </h2>
            <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl font-normal leading-relaxed">
              Explore our full production spectrum — from sacred deity idols and personalized commemorative gifts to architectural home décor, dynamic superhero action figures, and bespoke made-to-order fabrications.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors whitespace-nowrap self-start md:self-auto"
          >
            VIEW ALL 8 CATEGORIES →
          </Link>
        </motion.div>

        {/* Category Selector Tabs */}
        <div className="mb-10 overflow-x-auto pb-3 -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((category, index) => {
              const isActive = category.slug === activeCategory.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategorySlug(category.slug)}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-[#F4F1EA] shadow-sm'
                      : 'text-[#55524B] bg-white/80 border border-[#E8E5DE] hover:border-[#D4D0C8] hover:bg-white hover:text-[#171716]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-[#171716] rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10 opacity-60 text-[10px]">
                    0{index + 1}
                  </span>
                  <span className="relative z-10 font-medium">
                    {category.name}
                  </span>
                  <span className={`relative z-10 text-[9px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EAE6DD] text-[#6F6B63]'
                  }`}>
                    From {formatPrice(category.startingPrice)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Category Deep-Dive Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] overflow-hidden shadow-xs p-6 sm:p-10 lg:p-12 mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Left Column: Category Narrative, Subcategories & Specs */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono tracking-widest uppercase text-[#8E8B83] px-3 py-1 rounded-full bg-white border border-[#E8E5DE]">
                      CATEGORY {CATEGORIES.findIndex((c) => c.slug === activeCategory.slug) + 1 < 10 ? `0${CATEGORIES.findIndex((c) => c.slug === activeCategory.slug) + 1}` : CATEGORIES.findIndex((c) => c.slug === activeCategory.slug) + 1}
                    </span>
                    <span className="text-xs font-mono tracking-wider text-[#6F6B63]">
                      Starting from {formatPrice(activeCategory.startingPrice)}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-sans font-semibold text-[#171716] tracking-tight mb-3">
                    {activeCategory.name}
                  </h3>

                  <p className="text-base font-medium text-[#4A4740] mb-4">
                    {activeCategory.tagline}
                  </p>

                  <p className="text-sm text-[#6F6B63] leading-relaxed mb-6">
                    {activeCategory.description}
                  </p>

                  {/* Category-Specific Subcategories */}
                  <div className="mb-6 pt-5 border-t border-[#E8E5DE]">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-3 font-semibold">
                      INCLUDED PRODUCT TYPES & SPECIALIZATIONS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeCategory.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#171716] border border-[#E8E5DE] shadow-xs"
                        >
                          <CheckCircle2 size={12} className="text-[#8E8B83]" />
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specifications Bar */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/70 border border-[#E8E5DE] text-xs">
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-[#8E8B83] mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-[#8E8B83]">Lead Time</span>
                        <span className="font-medium text-[#171716]">{activeCategory.leadTime}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Layers size={14} className="text-[#8E8B83] mt-0.5 shrink-0" />
                      <div>
                        <span className="block text-[10px] font-mono uppercase text-[#8E8B83]">Materials</span>
                        <span className="font-medium text-[#171716] truncate block">{activeCategory.materials[0]} & more</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-8 text-xs text-[#55524B]">
                    {activeCategory.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#171716]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    href={`/categories/${activeCategory.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#171716] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors"
                  >
                    EXPLORE ALL {activeCategory.name.toUpperCase()}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href={`/start-a-project?category=${activeCategory.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-[#E8E5DE] text-[#171716] text-xs font-mono uppercase tracking-wider hover:border-[#D4D0C8] hover:bg-[#F9F7F2] transition-colors"
                  >
                    CUSTOM REQUEST
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Category-Specific Product Showcase */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E5DE]">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#6F6B63] font-medium">
                    CATEGORY-SPECIFIC PRODUCT DETAILS ({activeCategory.products.length} OBJECTS)
                  </span>
                  <Link
                    href={`/categories/${activeCategory.slug}`}
                    className="text-xs font-mono uppercase text-[#171716] hover:text-[#6F6B63] transition-colors flex items-center gap-1"
                  >
                    VIEW FULL CATALOGUE →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCategory.products.slice(0, 4).map((product: CategoryProduct) => (
                    <div
                      key={product.id}
                      className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E8E5DE] hover:border-[#171716]/30 hover:shadow-sm transition-all duration-300"
                    >
                      <div>
                        {/* Subcategory Pill & Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-mono tracking-wider uppercase text-[#8E8B83] px-2.5 py-0.5 rounded-full bg-[#F4F1EA] border border-[#E8E5DE] truncate">
                            {product.subcategory}
                          </span>
                          {product.badge && (
                            <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#171716] text-white font-medium">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Product Title */}
                        <h4 className="text-base font-semibold text-[#171716] group-hover:text-black transition-colors mb-1.5 line-clamp-1">
                          {product.name}
                        </h4>

                        {/* Product Description */}
                        <p className="text-xs text-[#6F6B63] line-clamp-2 leading-relaxed mb-4">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F0ECE4] space-y-2">
                        {/* Specifications */}
                        <div className="flex items-center justify-between text-[11px] text-[#8E8B83]">
                          <span className="flex items-center gap-1">
                            <Ruler size={11} />
                            {product.dimensions}
                          </span>
                          <span className="truncate max-w-[130px]">
                            {product.materials[0]}
                          </span>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-sm font-semibold text-[#171716]">
                              {product.pricePrefix || ''}{formatPrice(product.price)}
                            </span>
                            {product.comparePrice && (
                              <span className="text-xs text-[#8E8B83] line-through">
                                {formatPrice(product.comparePrice)}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/categories/${activeCategory.slug}#${product.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-mono uppercase text-[#171716] group-hover:translate-x-0.5 transition-transform"
                          >
                            DETAILS
                            <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 8 Categories Quick Browse Grid */}
        <div className="mt-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest uppercase text-[#6F6B63]">
              ALL 8 CATEGORIES AT A GLANCE
            </span>
            <span className="text-xs font-mono text-[#8E8B83]">
              CLICK ANY CATEGORY TO VIEW FULL SPECIFICATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE] hover:border-[#171716]/40 hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#8E8B83]">
                      0{idx + 1}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#F4F1EA] group-hover:bg-[#171716] group-hover:text-white flex items-center justify-center text-[#171716] transition-colors">
                      <ArrowRight size={13} />
                    </span>
                  </div>

                  <h4 className="text-xl font-sans font-semibold text-[#171716] mb-1.5 group-hover:translate-x-0.5 transition-transform">
                    {cat.name}
                  </h4>

                  <p className="text-xs text-[#6F6B63] line-clamp-2 mb-4 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <div className="space-y-1 mb-4">
                    {cat.subcategories.slice(0, 3).map((sub) => (
                      <div key={sub} className="text-[11px] text-[#55524B] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[#8E8B83]" />
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                    {cat.subcategories.length > 3 && (
                      <span className="text-[10px] font-mono text-[#8E8B83] block pt-0.5">
                        +{cat.subcategories.length - 3} more sub-items
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8E5DE] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-[#8E8B83]">From</span>
                  <span className="font-semibold text-[#171716]">
                    {formatPrice(cat.startingPrice)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}