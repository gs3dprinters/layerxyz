'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#F5F3EE] border-t border-[#E8E5DE] pt-16 pb-8 text-[#181818]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#777777]">Shop</h3>
            <Link href="/shop?category=sculptures" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Sculptures</Link>
            <Link href="/shop?category=figurines" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Figurines</Link>
            <Link href="/shop?category=home-objects" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Home Objects</Link>
            <Link href="/shop?category=collectibles" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Collectibles</Link>
            <Link href="/shop?category=limited" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Limited Editions</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#777777]">Studio</h3>
            <Link href="/about" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">About Studio</Link>
            <Link href="/custom" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Custom Fabrication</Link>
            <Link href="/3d-studio" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">3D Showroom</Link>
            <Link href="/work" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Selected Work</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#777777]">Support</h3>
            <Link href="/contact" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Contact Studio</Link>
            <Link href="/faq" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Frequently Asked</Link>
            <Link href="/shipping" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Shipping & Delivery</Link>
            <Link href="/returns" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Returns & Care</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#777777]">Connect</h3>
            <a href="mailto:studio@layerxyz.com" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">studio@layerxyz.com</a>
            <Link href="/contact" className="hover:text-[#181818] text-[#555555] transition-colors text-sm">Direct Inquiry</Link>
            <span className="text-xs text-[#888888]">Tiruppur, Tamil Nadu, India</span>
            
            <div className="pt-4">
              <h3 className="font-semibold text-xs tracking-wider uppercase text-[#777777] mb-3">Newsletter</h3>
              <form className="flex border-b border-[#D4D0C8] pb-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-transparent border-none outline-none flex-grow text-sm placeholder:text-[#999999] text-[#181818]"
                  aria-label="Email address for newsletter"
                />
                <button type="button" aria-label="Subscribe" className="text-[#181818] hover:text-[#777777] transition-colors">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E8E5DE] text-xs text-[#777777]">
          <Logo className="mb-4 md:mb-0" />
          <p>© {new Date().getFullYear()} LAYERXYZ — Tiruppur, Tamil Nadu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
