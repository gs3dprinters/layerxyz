import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-[#F5F3EE] border-t border-[#E8E5DE] pt-16 pb-8 text-[#181818]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-[#777777]">Shop</h3>
            <Link href="/shop?category=sculptures" className="hover:text-[#B7FF00] transition-colors">Sculptures</Link>
            <Link href="/shop?category=figurines" className="hover:text-[#B7FF00] transition-colors">Figurines</Link>
            <Link href="/shop?category=home-objects" className="hover:text-[#B7FF00] transition-colors">Home Objects</Link>
            <Link href="/shop?category=collectibles" className="hover:text-[#B7FF00] transition-colors">Collectibles</Link>
            <Link href="/shop?category=limited" className="hover:text-[#B7FF00] transition-colors">Limited</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-[#777777]">Company</h3>
            <Link href="/about" className="hover:text-[#B7FF00] transition-colors">About</Link>
            <Link href="/custom" className="hover:text-[#B7FF00] transition-colors">Custom</Link>
            <Link href="/3d-studio" className="hover:text-[#B7FF00] transition-colors">3D Studio</Link>
            <Link href="/work" className="hover:text-[#B7FF00] transition-colors">Work</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-[#777777]">Support</h3>
            <Link href="/contact" className="hover:text-[#B7FF00] transition-colors">Contact</Link>
            <Link href="/faq" className="hover:text-[#B7FF00] transition-colors">FAQ</Link>
            <Link href="/shipping" className="hover:text-[#B7FF00] transition-colors">Shipping</Link>
            <Link href="/returns" className="hover:text-[#B7FF00] transition-colors">Returns</Link>
          </div>
          
          <div className="flex flex-col space-y-4">
            <h3 className="font-semibold text-sm tracking-wider uppercase text-[#777777]">Connect</h3>
            <a href="#" className="hover:text-[#B7FF00] transition-colors">WhatsApp</a>
            <a href="mailto:hello@layerxyz.com" className="hover:text-[#B7FF00] transition-colors">Email</a>
            <a href="#" className="hover:text-[#B7FF00] transition-colors">Instagram</a>
            
            <div className="pt-4">
              <h3 className="font-semibold text-sm tracking-wider uppercase text-[#777777] mb-3">Newsletter</h3>
              <form className="flex border-b border-[#D4D0C8] pb-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-transparent border-none outline-none flex-grow text-sm placeholder:text-[#777777]"
                  aria-label="Email address for newsletter"
                />
                <button type="button" aria-label="Subscribe" className="text-[#181818] hover:text-[#B7FF00] transition-colors">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E8E5DE] text-sm text-[#777777]">
          <Logo className="mb-4 md:mb-0" />
          <p>© 2025 LAYERXYZ — Tiruppur, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}
