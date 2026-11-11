'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/lib/cart-context';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { CATEGORIES } from '@/data/categories';
import { getWhatsAppUrl } from '@/lib/utils';

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
            ? 'bg-[#F5F0E8]/95 backdrop-blur-xl py-3 border-b border-[#E8DCCB]'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Studio Identifier */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Logo />
            <span className="hidden xl:inline-block text-[10px] font-mono tracking-widest uppercase text-[#6F6B63] pl-2 border-l border-[#D4D0C8]">
              Tiruppur Studio
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
            <Link
              href="/"
              className="text-xs xl:text-sm font-medium tracking-wider text-[#242321] hover:text-[#49392E] transition-colors relative group py-2"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#242321] transition-all group-hover:w-full duration-300"></span>
            </Link>

            {/* SHOP with Categories Mega Menu */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterCategories}
              onMouseLeave={handleMouseLeaveCategories}
            >
              <Link
                href="/shop"
                onClick={() => setIsCategoriesMenuOpen(false)}
                className={`inline-flex items-center gap-1 text-xs xl:text-sm font-medium tracking-wider transition-colors relative group py-2 ${
                  isCategoriesMenuOpen ? 'text-[#242321]' : 'text-[#242321] hover:text-[#49392E]'
                }`}
              >
                SHOP
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${isCategoriesMenuOpen ? 'rotate-180' : ''}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#242321] transition-all duration-300 ${
                    isCategoriesMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            </div>

            <Link
              href="/custom-statues"
              className="text-xs xl:text-sm font-medium tracking-wider text-[#242321] hover:text-[#49392E] transition-colors relative group py-2"
            >
              CUSTOM STATUES
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#242321] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/3d-printing"
              className="text-xs xl:text-sm font-medium tracking-wider text-[#242321] hover:text-[#49392E] transition-colors relative group py-2"
            >
              3D PRINTING SERVICES
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#242321] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/work"
              className="text-xs xl:text-sm font-medium tracking-wider text-[#242321] hover:text-[#49392E] transition-colors relative group py-2"
            >
              OUR WORK
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#242321] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/about"
              className="text-xs xl:text-sm font-medium tracking-wider text-[#242321] hover:text-[#49392E] transition-colors relative group py-2"
            >
              ABOUT US
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#242321] transition-all group-hover:w-full duration-300"></span>
            </Link>

            <Link
              href="/contact"
              className="text-xs xl:text-sm font-medium tracking-wider text-[#242321] hover:text-[#49392E] transition-colors relative group py-2"
            >
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#242321] transition-all group-hover:w-full duration-300"></span>
            </Link>
          </nav>

          {/* Desktop Right Actions: Search, Cart, Get a Quote Button */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search objects"
              className="text-[#242321] hover:opacity-70 transition-opacity p-1.5"
            >
              <Search size={19} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="text-[#242321] hover:opacity-70 transition-opacity relative p-1.5"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#242321] text-[#F5F0E8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Prominent GET A QUOTE CTA */}
            <Link
              href="/3d-printing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors shadow-xs"
            >
              <span>GET A QUOTE</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/3d-printing"
              className="px-3 py-1.5 rounded-full bg-[#242321] text-[#F5F0E8] text-[11px] font-mono uppercase tracking-wider"
            >
              Quote
            </Link>
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="text-[#242321] p-1.5"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="text-[#242321] p-1.5 relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#242321] text-[#F5F0E8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
              className="text-[#242321] p-1.5"
            >
              <Menu size={22} />
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
              className="absolute top-full left-0 right-0 bg-[#F5F0E8]/98 backdrop-blur-2xl border-b border-[#E8DCCB] shadow-xl pt-7 pb-8 px-6 lg:px-8 z-40"
              onMouseEnter={handleMouseEnterCategories}
              onMouseLeave={handleMouseLeaveCategories}
            >
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-[#E8DCCB]">
                  {CATEGORIES.map((category) => (
                    <div key={category.slug} className="space-y-2.5">
                      <Link
                        href={`/categories/${category.slug}`}
                        onClick={() => setIsCategoriesMenuOpen(false)}
                        className="text-xs font-mono font-semibold uppercase tracking-wider text-[#242321] hover:text-[#A58B70] transition-colors block"
                      >
                        {category.name}
                      </Link>
                      <ul className="space-y-1">
                        {category.subcategories.slice(0, 4).map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/categories/${category.slug}?subcategory=${sub.slug}`}
                              onClick={() => setIsCategoriesMenuOpen(false)}
                              className="text-xs text-[#6F6B63] hover:text-[#242321] transition-colors block py-0.5"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar inside Mega Menu */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-6">
                    <Link
                      href="/shop"
                      onClick={() => setIsCategoriesMenuOpen(false)}
                      className="font-mono uppercase tracking-wider text-[#242321] font-semibold hover:text-[#A58B70] transition-colors flex items-center gap-1.5"
                    >
                      BROWSE FULL SHOP CATALOG
                      <ArrowRight size={13} />
                    </Link>
                    <Link
                      href="/categories"
                      onClick={() => setIsCategoriesMenuOpen(false)}
                      className="font-mono uppercase tracking-wider text-[#6F6B63] hover:text-[#242321] transition-colors"
                    >
                      VIEW ALL 8 CATEGORIES
                    </Link>
                  </div>
                  <Link
                    href="/custom-statues"
                    onClick={() => setIsCategoriesMenuOpen(false)}
                    className="text-[#6F6B63] hover:text-[#242321] transition-colors"
                  >
                    Want a personalised statue from photo? Start custom order →
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
