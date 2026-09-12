'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { searchProducts, Product } from '@/data/products';
import { CATEGORIES, Category, Subcategory } from '@/data/categories';
import { formatPrice } from '@/lib/utils';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MatchingCategory {
  category: Category;
  matchedSubcategory?: Subcategory;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [categoryResults, setCategoryResults] = useState<MatchingCategory[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setProductResults([]);
      setCategoryResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 1) {
      setProductResults(searchProducts(q));

      // Match categories and subcategories
      const matchedCats: MatchingCategory[] = [];
      for (const cat of CATEGORIES) {
        if (
          cat.name.toLowerCase().includes(q) ||
          cat.description.toLowerCase().includes(q)
        ) {
          matchedCats.push({ category: cat });
        } else {
          const matchedSub = cat.subcategories.find(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              (s.description && s.description.toLowerCase().includes(q))
          );
          if (matchedSub) {
            matchedCats.push({ category: cat, matchedSubcategory: matchedSub });
          }
        }
      }
      setCategoryResults(matchedCats);
    } else {
      setProductResults([]);
      setCategoryResults([]);
    }
  }, [query]);

  const hasResults = productResults.length > 0 || categoryResults.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#F4F1EA] flex flex-col"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="max-w-4xl mx-auto w-full px-6 pt-16 flex flex-col h-full">
            {/* Search Input Bar */}
            <div className="flex items-center justify-between border-b border-[#D4D0C8] pb-4 mb-8">
              <Search className="text-[#8E8B83] mr-4" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search categories, products, deities, gifts..."
                className="flex-grow bg-transparent border-none outline-none text-2xl text-[#181818] placeholder:text-[#8E8B83]"
              />
              <button
                onClick={onClose}
                className="text-[#181818] hover:opacity-70 transition-opacity ml-4 p-1"
                aria-label="Close search"
              >
                <X size={26} />
              </button>
            </div>

            {/* Search Results Container */}
            <div className="flex-grow overflow-y-auto pb-16 space-y-10">
              {query.length > 1 && !hasResults && (
                <div className="text-center py-16">
                  <p className="text-[#6F6B63] text-base mb-3">No results found for &quot;{query}&quot;</p>
                  <p className="text-xs text-[#8E8B83]">
                    Try searching for &quot;gifts&quot;, &quot;sculpture&quot;, &quot;nandi&quot;, or &quot;home decor&quot;.
                  </p>
                </div>
              )}

              {/* Matching Categories */}
              {categoryResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E8E5DE]">
                    <Layers size={14} className="text-[#8E8B83]" />
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6B63] font-medium">
                      CATEGORIES & SUITES ({categoryResults.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categoryResults.map(({ category, matchedSubcategory }) => {
                      const href = matchedSubcategory
                        ? `/categories/${category.slug}?subcategory=${matchedSubcategory.slug}`
                        : `/categories/${category.slug}`;

                      return (
                        <Link
                          key={`${category.slug}-${matchedSubcategory?.slug || 'root'}`}
                          href={href}
                          onClick={onClose}
                          className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E8E5DE] hover:border-[#181818]/40 hover:shadow-xs transition-all"
                        >
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#8E8B83] block">
                              Category {matchedSubcategory ? `• ${matchedSubcategory.name}` : ''}
                            </span>
                            <h4 className="text-base font-semibold text-[#171716] group-hover:text-black transition-colors">
                              {category.name}
                            </h4>
                          </div>
                          <ArrowRight size={14} className="text-[#8E8B83] group-hover:text-[#171716] group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {productResults.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#E8E5DE]">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#6F6B63] font-medium">
                      OBJECTS & PRODUCTS ({productResults.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {productResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex flex-col justify-between p-4 rounded-2xl bg-white border border-[#E8E5DE] hover:border-[#181818]/40 hover:shadow-xs transition-all"
                      >
                        <div>
                          {product.images?.[0] && (
                            <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E8E5DE] mb-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <h4 className="font-semibold text-sm text-[#181818] group-hover:text-black transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-[#777777] mt-1 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#E8E5DE]/60 flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#181818]">
                            {product.pricePrefix || ''}{formatPrice(product.price)}
                          </span>
                          <span className="font-mono text-[#8E8B83] group-hover:text-[#181818] transition-colors flex items-center gap-1">
                            VIEW
                            <ArrowRight size={11} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
