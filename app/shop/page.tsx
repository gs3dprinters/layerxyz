"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/ui/ProductGrid';

const FILTER_TABS = [
  { id: 'ALL', label: 'ALL' },
  { id: 'CATEGORIES', label: '8 CATEGORIES', isLink: true, href: '/categories' },
  { id: 'SCULPTURES', label: 'SCULPTURES' },
  { id: 'FIGURINES', label: 'FIGURINES' },
  { id: 'HOME', label: 'HOME OBJECTS' },
  { id: 'LIMITED', label: 'LIMITED OBJECTS' },
  { id: 'CUSTOM', label: 'CUSTOM', isLink: true, href: '/custom' },
];

const SORTS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export default function ShopPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSort, setActiveSort] = useState('Featured');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory === 'SCULPTURES') {
      result = result.filter(p => p.category === 'sculptures');
    } else if (activeCategory === 'FIGURINES') {
      result = result.filter(p => p.category === 'figurines');
    } else if (activeCategory === 'HOME') {
      result = result.filter(p => p.category === 'home');
    } else if (activeCategory === 'LIMITED') {
      result = result.filter(p => p.category === 'limited' || p.category === 'collectibles');
    }

    switch (activeSort) {
      case 'Price: Low to High':
        return result.sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return result.sort((a, b) => b.price - a.price);
      case 'Newest':
        return result.reverse();
      case 'Featured':
      default:
        return result;
    }
  }, [activeCategory, activeSort]);

  const handleTabClick = (tab: typeof FILTER_TABS[0]) => {
    if (tab.isLink && tab.href) {
      router.push(tab.href);
      return;
    }
    setActiveCategory(tab.id);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-14 sm:mb-18">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            CATALOGUE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
            THE COLLECTION
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl font-normal">
            Objects designed digitally and made physically, one piece at a time.
          </p>
        </header>

        {/* Filter Bar & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-[#E8E5DE]">
          {/* Filter Pills */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 hide-scrollbar gap-2">
            {FILTER_TABS.map(tab => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab)}
                  className={`relative whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-[#F4F1EA]'
                      : 'text-[#171716] bg-white/70 border border-[#E8E5DE] hover:border-[#D4D0C8] hover:bg-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#171716] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30, ease: [0.16, 1, 0.3, 1] as const }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {tab.label}
                  {tab.isLink && <span className="ml-1 text-[10px] opacity-70">↗</span>}
                </button>
              );
            })}
          </div>

          {/* Counts & Sort Dropdown */}
          <div className="flex items-center justify-between md:justify-end gap-5">
            <span className="text-xs font-mono text-[#6F6B63] uppercase tracking-wider">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'OBJECT' : 'OBJECTS'}
            </span>
            <div className="relative">
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                aria-label="Sort products"
                className="appearance-none bg-white border border-[#E8E5DE] rounded-full pl-4 pr-9 py-2 text-xs font-mono uppercase tracking-wider text-[#171716] focus:outline-none focus:border-[#171716] cursor-pointer"
              >
                {SORTS.map(sort => (
                  <option key={sort} value={sort}>Sort: {sort}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#171716]">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + activeSort}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <ProductGrid products={filteredProducts} />
          </motion.div>
        </AnimatePresence>

        {/* Bespoke Custom Project Callout banner at bottom */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2">
              BESPOKE COMMISSIONS
            </span>
            <h3 className="text-2xl font-sans font-semibold text-[#171716] mb-2">
              Create something that doesn&apos;t exist yet.
            </h3>
            <p className="text-sm text-[#6F6B63]">
              Have a photograph, CAD file, sketch or original concept? Work directly with our studio to fabricate a custom physical object.
            </p>
          </div>
          <Link
            href="/custom"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#181817] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors whitespace-nowrap self-start md:self-auto"
          >
            START A CUSTOM PROJECT
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
