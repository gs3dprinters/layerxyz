'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { name: 'Shop', href: '/shop' },
  { name: 'Custom', href: '/custom' },
  { name: 'Collections', href: '/collections' },
  { name: '3D Studio', href: '/3d-studio' },
  { name: 'About', href: '/about' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { totalItems } = useCart();

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
            className="fixed inset-y-0 right-0 w-[300px] bg-[#F5F3EE] z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-[#E8E5DE]">
              <span className="font-semibold tracking-wide text-[#181818]">LAYERXYZ</span>
              <button onClick={onClose} aria-label="Close menu" className="hover:opacity-70 transition-opacity text-[#181818]">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col py-8 px-6 space-y-6 flex-grow overflow-y-auto">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="text-2xl font-medium text-[#181818] hover:text-[#B7FF00] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                href="/cart" 
                onClick={onClose}
                className="text-2xl font-medium text-[#181818] hover:text-[#B7FF00] transition-colors flex items-center"
              >
                Cart ({totalItems})
              </Link>
            </div>
            
            <div className="p-6 border-t border-[#E8E5DE]">
              <a 
                href={getWhatsAppUrl("Hi, I'm interested in your products.")} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#181818] hover:text-[#B7FF00] transition-colors"
              >
                WhatsApp Contact
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
