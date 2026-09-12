'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { CATEGORIES } from '@/data/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { totalItems } = useCart();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#181818]/20 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[320px] max-w-[85vw] bg-[#F5F3EE] z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-[#E8E5DE]">
              <span className="font-semibold tracking-wide text-[#181818]">LAYERXYZ</span>
              <button onClick={onClose} aria-label="Close menu" className="hover:opacity-70 transition-opacity text-[#181818]">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col py-6 px-6 space-y-5 flex-grow overflow-y-auto">
              <Link
                href="/shop"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                Shop
              </Link>

              {/* Categories Accordion */}
              <div className="border-y border-[#E8E5DE]/80 py-3">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={20}
                    className={`text-[#777777] transition-transform duration-200 ${
                      isCategoriesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isCategoriesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pt-3 pl-2 space-y-2.5"
                    >
                      <Link
                        href="/categories"
                        onClick={onClose}
                        className="text-xs font-mono uppercase tracking-wider text-[#171716] font-semibold block pb-1 border-b border-[#E8E5DE]/60"
                      >
                        All 8 Categories →
                      </Link>
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          onClick={onClose}
                          className="text-sm font-medium text-[#4A4740] hover:text-[#171716] block py-0.5"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/custom"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                Custom
              </Link>

              <Link
                href="/collections"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                Collections
              </Link>

              <Link
                href="/3d-studio"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                3D Studio
              </Link>

              <Link
                href="/work"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                Work
              </Link>

              <Link
                href="/about"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                About
              </Link>

              <Link
                href="/cart"
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#777777] transition-colors flex items-center"
              >
                Cart ({totalItems})
              </Link>
            </div>

            <div className="p-6 border-t border-[#E8E5DE]">
              <Link
                href="/contact"
                onClick={onClose}
                className="text-sm font-medium text-[#181818] hover:text-[#777777] transition-colors"
              >
                Contact Studio →
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
