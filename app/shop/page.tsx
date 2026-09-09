"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/ui/ProductGrid';

const CATEGORIES = ['ALL', 'SCULPTURES', 'FIGURINES', 'HOME', 'COLLECTIBLES', 'LIMITED'];
const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Name A-Z'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeSort, setActiveSort] = useState('Newest');

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== 'ALL') {
      result = result.filter(p => p.category.toUpperCase() === activeCategory);
    }
    
    switch (activeSort) {
      case 'Price: Low to High':
        return [...result].sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return [...result].sort((a, b) => b.price - a.price);
      case 'Name A-Z':
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case 'Newest':
      default:
        return result;
    }
  }, [activeCategory, activeSort]);

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-4">
            SHOP OBJECTS
          </h1>
          <p className="text-lg text-[#777777]">
            Objects designed to live in the real world.
          </p>
        </header>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 hide-scrollbar gap-2">
            {CATEGORIES.map(category => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-[#181818] border border-[#E8E5DE] hover:border-[#D4D0C8]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#181818] rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30, ease: [0.16, 1, 0.3, 1] as const }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#777777]">{filteredProducts.length} objects</span>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-transparent border border-[#E8E5DE] rounded-full px-4 py-2 text-sm text-[#181818] focus:outline-none focus:border-[#D4D0C8]"
            >
              {SORTS.map(sort => (
                <option key={sort} value={sort}>{sort}</option>
              ))}
            </select>
          </div>
        </div>

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
      </div>
    </div>
  );
}
