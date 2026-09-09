'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { searchProducts, Product } from '@/data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
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
    if (query.trim().length > 1) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-[#F5F3EE] flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="max-w-4xl mx-auto w-full px-6 pt-16 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-[#D4D0C8] pb-4 mb-8">
              <Search className="text-[#777777] mr-4" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, materials..."
                className="flex-grow bg-transparent border-none outline-none text-2xl text-[#181818] placeholder:text-[#777777]"
              />
              <button 
                onClick={onClose}
                className="text-[#181818] hover:opacity-70 transition-opacity ml-4"
                aria-label="Close search"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pb-16">
              {query.length > 1 && results.length === 0 && (
                <p className="text-[#777777] text-center mt-12">No results found for &quot;{query}&quot;</p>
              )}
              
              {results.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex flex-col border border-[#E8E5DE] p-4 bg-[#FFFFFF] hover:border-[#D4D0C8] transition-colors rounded-sm"
                    >
                      <h4 className="font-medium text-[#181818] group-hover:text-[#B7FF00] transition-colors">{product.name}</h4>
                      <p className="text-sm text-[#777777] mt-1 capitalize">{product.category}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
