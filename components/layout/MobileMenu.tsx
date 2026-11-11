'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronDown, MessageCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { CATEGORIES } from '@/data/categories';
import { getWhatsAppUrl } from '@/lib/utils';
import { STUDIO_INFO } from '@/lib/config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { totalItems } = useCart();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const whatsappLink = getWhatsAppUrl(
    "Hi Layer XYZ, I'm visiting on mobile and would like to talk about a custom order or 3D printing project."
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#242321]/40 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[340px] max-w-[88vw] bg-[#F5F0E8] z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 flex justify-between items-center border-b border-[#E8DCCB]">
              <div>
                <span className="font-bold tracking-wider text-sm text-[#242321] block">LAYER XYZ</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#6F6B63]">
                  Tiruppur Studio
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="hover:opacity-70 transition-opacity text-[#242321] p-1.5"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col py-5 px-6 space-y-4 flex-grow overflow-y-auto">
              <Link
                href="/"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors"
              >
                Home
              </Link>

              <Link
                href="/shop"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors"
              >
                Shop
              </Link>

              {/* Categories Accordion */}
              <div className="border-y border-[#E8DCCB] py-3">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#6F6B63] transition-transform duration-200 ${
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
                        className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold block pb-1 border-b border-[#E8DCCB]"
                      >
                        All 8 Categories →
                      </Link>
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          onClick={onClose}
                          className="text-sm font-medium text-[#49392E] hover:text-[#242321] block py-0.5"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/custom-statues"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors flex items-center justify-between"
              >
                <span>Custom Statues</span>
                <span className="text-[10px] font-mono bg-[#E8DCCB] px-2 py-0.5 rounded text-[#242321]">
                  Featured
                </span>
              </Link>

              <Link
                href="/3d-printing"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors flex items-center justify-between"
              >
                <span>3D Printing Services</span>
                <span className="text-[10px] font-mono bg-[#E8DCCB] px-2 py-0.5 rounded text-[#242321]">
                  CAD / STL
                </span>
              </Link>

              <Link
                href="/work"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors"
              >
                Our Work
              </Link>

              <Link
                href="/about"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors"
              >
                Contact
              </Link>

              <Link
                href="/cart"
                onClick={onClose}
                className="text-xl font-medium text-[#242321] hover:text-[#49392E] transition-colors flex items-center justify-between pt-2 border-t border-[#E8DCCB]"
              >
                <span>Cart</span>
                <span className="text-sm font-mono font-semibold px-2.5 py-0.5 bg-[#242321] text-[#F5F0E8] rounded-full">
                  {totalItems}
                </span>
              </Link>
            </div>

            {/* Bottom Actions & WhatsApp */}
            <div className="p-5 border-t border-[#E8DCCB] bg-white/50 space-y-3">
              <Link
                href="/3d-printing"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-[#242321] text-[#F5F0E8] py-3 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors"
              >
                <span>Get a Free Quote</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow-xs"
              >
                <MessageCircle size={16} />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="pt-2 text-center text-[10px] font-mono text-[#6F6B63]">
                <span>Tiruppur Studio · Pan-India Safe Delivery</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
