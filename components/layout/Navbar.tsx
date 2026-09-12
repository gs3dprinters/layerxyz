'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, ChevronDown, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/lib/cart-context';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { CATEGORIES } from '@/data/categories';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCategoriesMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseEnterCategories = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCategoriesMenuOpen(true);
  };

  const handleMouseLeaveCategories = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoriesMenuOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled || isCategoriesMenuOpen
            ? 'bg-[#F5F3EE]/95 backdrop-blur-xl py-3 border-b border-[#E8E5DE]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <nav className="hidden md:flex items-center space-x-7">
            <Link
              href="/shop"
              className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group py-2"
            >
              SHOP
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
            </Link>

            {/* CATEGORIES with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterCategories}
              onMouseLeave={handleMouseLeaveCategories}
            >
              <Link
                href="/categories"
                onClick={() => setIsCategoriesMenuOpen(false)}
                className={`inline-flex items-center gap-1 text-sm font-medium tracking-wider transition-colors relative group py-2 ${
                  isCategoriesMenuOpen ? 'text-[#181818]' : 'text-[#181818] hover:text-[#777777]'
                }`}
              >
                CATEGORIES
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isCategoriesMenuOpen ? 'rotate-180' : ''}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#181818] transition-all duration-300 ${
                    isCategoriesMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            </div>

            <Link
              href="/custom"
              className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group py-2"
            >
              CUSTOM
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/collections"
              className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group py-2"
            >
              COLLECTIONS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/3d-studio"
              className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group py-2"
            >
              3D STUDIO
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/work"
              className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group py-2"
            >
              WORK
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group py-2"
            >
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-[#181818] hover:opacity-70 transition-opacity"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="text-[#181818] hover:opacity-70 transition-opacity relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#181818] text-[#F5F3EE] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-[#181818] hover:opacity-70 transition-opacity"
            >
              <Search size={22} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="text-[#181818] hover:opacity-70 transition-opacity relative"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#181818] text-[#F5F3EE] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="text-[#181818] hover:opacity-70 transition-opacity"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Desktop Categories Mega Menu Dropdown */}
        <AnimatePresence>
          {isCategoriesMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="absolute top-full left-0 right-0 bg-[#F4F1EA]/98 backdrop-blur-2xl border-b border-[#E8E5DE] shadow-xl pt-8 pb-8 px-6 lg:px-8 z-40"
              onMouseEnter={handleMouseEnterCategories}
              onMouseLeave={handleMouseLeaveCategories}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-[#E8E5DE]/80">
                  {CATEGORIES.map((category) => (
                    <div key={category.slug} className="space-y-3">
                      <Link
                        href={`/categories/${category.slug}`}
                        onClick={() => setIsCategoriesMenuOpen(false)}
                        className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171716] hover:text-[#777777] transition-colors block"
                      >
                        {category.name}
                      </Link>
                      <ul className="space-y-1.5">
                        {category.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/categories/${category.slug}?subcategory=${sub.slug}`}
                              onClick={() => setIsCategoriesMenuOpen(false)}
                              className="text-xs text-[#6F6B63] hover:text-[#171716] transition-colors block py-0.5"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <Link
                    href="/categories"
                    onClick={() => setIsCategoriesMenuOpen(false)}
                    className="font-mono uppercase tracking-wider text-[#171716] font-semibold hover:text-[#6F6B63] transition-colors flex items-center gap-1.5"
                  >
                    EXPLORE ALL 8 CATEGORIES
                    <ArrowRight size={13} />
                  </Link>
                  <Link
                    href="/custom"
                    onClick={() => setIsCategoriesMenuOpen(false)}
                    className="text-[#6F6B63] hover:text-[#171716] transition-colors"
                  >
                    Have a custom object idea? Start a bespoke commission →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
