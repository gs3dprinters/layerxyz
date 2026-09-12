'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/lib/cart-context';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';

const navLinks = [
  { name: 'SHOP', href: '/shop' },
  { name: 'CATEGORIES', href: '/categories' },
  { name: 'CUSTOM', href: '/custom' },
  { name: 'COLLECTIONS', href: '/collections' },
  { name: '3D STUDIO', href: '/3d-studio' },
  { name: 'WORK', href: '/work' },
  { name: 'ABOUT', href: '/about' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#F5F3EE]/85 backdrop-blur-xl py-3 border-b border-[#E8E5DE]' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium tracking-wider text-[#181818] hover:text-[#777777] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#181818] transition-all group-hover:w-full duration-300"></span>
              </Link>
            ))}
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
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
