'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Category } from '@/data/categories';
import { Product } from '@/data/products';
import { ProductCard } from '@/components/ui/ProductCard';

export interface CategoryDetailClientProps {
  category: Category;
  initialProducts: Product[];
  allCategories: { slug: string; name: string }[];
}

export function CategoryDetailClient({
  category,
  initialProducts,
  allCategories,
}: CategoryDetailClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read subcategory from URL if present
  const subcategoryParam = searchParams.get('subcategory');

  const [activeSubcategory, setActiveSubcategory] = useState<string>(
    subcategoryParam || 'ALL'
  );
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  // Sync state if URL searchParams change
  useEffect(() => {
    if (subcategoryParam) {
      setActiveSubcategory(subcategoryParam);
    } else {
      setActiveSubcategory('ALL');
    }
  }, [subcategoryParam]);

  const handleSubcategoryChange = (subSlug: string) => {
    setActiveSubcategory(subSlug);
    const params = new URLSearchParams(window.location.search);
    if (subSlug === 'ALL') {
      params.delete('subcategory');
    } else {
      params.set('subcategory', subSlug);
    }
    const newQuery = params.toString();
    const newUrl = `/categories/${category.slug}${newQuery ? `?${newQuery}` : ''}`;
    router.replace(newUrl, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (activeSubcategory !== 'ALL') {
      list = list.filter(
        (p) =>
          p.subcategorySlugs && p.subcategorySlugs.includes(activeSubcategory)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [initialProducts, activeSubcategory, sortBy]);

  const currentIndex = allCategories.findIndex((c) => c.slug === category.slug);
  const prevCategory =
    allCategories[(currentIndex - 1 + allCategories.length) % allCategories.length];
  const nextCategory =
    allCategories[(currentIndex + 1) % allCategories.length];

  const activeSubcategoryObj = category.subcategories.find(
    (s) => s.slug === activeSubcategory
  );

  return (
    <div>
      {/* Category Hero Banner */}
      <header className="mb-12 rounded-3xl p-8 sm:p-12 lg:p-14 border border-[#E8E5DE] bg-[#FAFAF8] relative overflow-hidden shadow-xs">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E5DE] text-[11px] font-mono uppercase tracking-widest text-[#6F6B63] mb-5">
            <span>CATEGORY 0{currentIndex + 1}</span>
            <span>•</span>
            <span>{category.subcategories.length} SUB-COLLECTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4 leading-tight">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-[#5A5750] leading-relaxed max-w-2xl mb-8">
            {category.description}
          </p>

          {/* Subcategory Pills Quick Bar inside Hero */}
          <div className="pt-6 border-t border-[#E8E5DE]/80">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-3 font-semibold">
              EXPLORE SUB-CATEGORIES
            </span>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub) => {
                const count = initialProducts.filter(
                  (p) => p.subcategorySlugs && p.subcategorySlugs.includes(sub.slug)
                ).length;
                const isSelected = activeSubcategory === sub.slug;

                return (
                  <button
                    key={sub.slug}
                    onClick={() => handleSubcategoryChange(sub.slug)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                        : 'bg-white text-[#4A4740] border border-[#E8E5DE] hover:border-[#171716]/40 hover:text-[#171716]'
                    }`}
                  >
                    <span>{sub.name}</span>
                    {count > 0 && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-[#EFECE5] text-[#6F6B63]'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Filter & Sort Controls Bar */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E5DE]">
        {/* Left: Subcategory Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full hide-scrollbar">
          <button
            onClick={() => handleSubcategoryChange('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
              activeSubcategory === 'ALL'
                ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                : 'bg-white border border-[#E8E5DE] text-[#4A4740] hover:border-[#D4D0C8] hover:text-[#171716]'
            }`}
          >
            ALL ({initialProducts.length})
          </button>

          {category.subcategories.map((sub) => {
            const count = initialProducts.filter(
              (p) => p.subcategorySlugs && p.subcategorySlugs.includes(sub.slug)
            ).length;
            const isSelected = activeSubcategory === sub.slug;

            return (
              <button
                key={sub.slug}
                onClick={() => handleSubcategoryChange(sub.slug)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#171716] text-[#F4F1EA] shadow-xs'
                    : 'bg-white border border-[#E8E5DE] text-[#55524B] hover:border-[#D4D0C8] hover:text-[#171716]'
                }`}
              >
                <span>{sub.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#EFECE5] text-[#6F6B63]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right: Sort Dropdown & Results Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <span className="text-xs font-mono text-[#8E8B83]">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'OBJECT' : 'OBJECTS'}
          </span>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-[#8E8B83]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E8E5DE] text-xs font-mono uppercase tracking-wider text-[#171716] px-3 py-2 rounded-full focus:outline-none focus:border-[#171716] cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subcategory context description banner if filtered */}
      {activeSubcategoryObj && activeSubcategoryObj.description && (
        <div className="mb-8 p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE] flex items-center justify-between gap-4">
          <p className="text-xs text-[#6F6B63]">
            <span className="font-semibold text-[#171716]">{activeSubcategoryObj.name}:</span>{' '}
            {activeSubcategoryObj.description}
          </p>
          <button
            onClick={() => handleSubcategoryChange('ALL')}
            className="text-[11px] font-mono uppercase tracking-wider text-[#8E8B83] hover:text-[#171716] underline shrink-0"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Product Grid or Polished Empty State */}
      <div className="mb-20">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${activeSubcategory}-${sortBy}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-[#E8E5DE] bg-white p-12 sm:p-16 text-center max-w-2xl mx-auto shadow-xs"
            >
              <div className="w-14 h-14 rounded-full bg-[#FAFAF8] border border-[#E8E5DE] flex items-center justify-center mx-auto mb-6 text-[#171716]">
                <Sparkles size={22} className="text-[#8E8B83]" />
              </div>

              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2 font-medium">
                {category.name.toUpperCase()} {activeSubcategory !== 'ALL' ? `• ${activeSubcategoryObj?.name.toUpperCase()}` : ''}
              </span>

              <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] tracking-tight mb-3">
                THIS COLLECTION IS TAKING SHAPE
              </h3>

              <p className="text-sm sm:text-base text-[#6F6B63] max-w-md mx-auto leading-relaxed mb-8">
                We are developing more objects for this category. If you already have an idea, we can create something specifically for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/custom?category=${category.slug}${activeSubcategory !== 'ALL' ? `&subcategory=${activeSubcategory}` : ''}`}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#171716] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors w-full sm:w-auto font-medium"
                >
                  COMMISSION A CUSTOM PIECE
                  <ArrowRight size={14} />
                </Link>
                {activeSubcategory !== 'ALL' && (
                  <button
                    onClick={() => handleSubcategoryChange('ALL')}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-[#E8E5DE] text-[#171716] text-xs font-mono uppercase tracking-wider hover:border-[#171716]/40 transition-colors w-full sm:w-auto"
                  >
                    VIEW ALL IN {category.name.toUpperCase()}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Bespoke Commission Callout */}
      <div className="rounded-3xl p-8 sm:p-12 bg-[#181817] text-[#F4F1EA] flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 shadow-lg">
        <div className="max-w-2xl">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#A09D95] flex items-center gap-1.5 mb-2">
            <Sparkles size={13} />
            BESPOKE FABRICATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white mb-2">
            Have a custom idea for {category.name}?
          </h2>
          <p className="text-sm text-[#A09D95] leading-relaxed">
            Whether from a reference photograph, 3D model, sketch or unique concept, we produce made-to-order physical objects in our studio.
          </p>
        </div>
        <Link
          href={`/custom?category=${category.slug}`}
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[#181817] text-xs font-mono uppercase tracking-wider hover:bg-[#EAE6DD] transition-colors whitespace-nowrap self-start md:self-auto font-medium"
        >
          START A CUSTOM PROJECT
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Neighbor Category Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#E8E5DE]">
        <Link
          href={`/categories/${prevCategory.slug}`}
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6F6B63] hover:text-[#171716] transition-colors"
        >
          <span>← PREVIOUS:</span>
          <span className="font-semibold text-[#171716] group-hover:underline">
            {prevCategory.name}
          </span>
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
          <span className="font-semibold text-[#171716] group-hover:underline">
            {nextCategory.name}
          </span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
