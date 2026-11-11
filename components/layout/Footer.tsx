'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { getWhatsAppUrl } from '@/lib/utils';
import { STUDIO_INFO } from '@/lib/config';

export function Footer() {
  const whatsappHref = getWhatsAppUrl(
    "Hi Layer XYZ, I'm reaching out from your website footer to enquire about your services."
  );

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8DCCB] pt-16 pb-10 text-[#242321]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Col 1: Categories */}
          <div className="flex flex-col space-y-2.5">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#8C8275] mb-1 font-mono">
              <Link href="/categories" className="hover:text-[#242321] transition-colors">Categories</Link>
            </h3>
            <Link href="/categories/gifts" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Gifts & Keepsakes</Link>
            <Link href="/categories/god-idols" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">God Idols & Deities</Link>
            <Link href="/categories/leaders-icons" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Leaders & Icons</Link>
            <Link href="/categories/costume-idols" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Costume Idols</Link>
            <Link href="/categories/home-decor" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Home Décor & Utility</Link>
            <Link href="/categories/toys-figurines" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Toys & Figurines</Link>
            <Link href="/categories/awards-trophies" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Awards & Trophies</Link>
            <Link href="/categories/custom-creations" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Custom Creations</Link>
          </div>
          
          {/* Col 2: Services & Studio */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#8C8275] font-mono">Studio Services</h3>
            <Link href="/custom-statues" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Custom Portrait Statues</Link>
            <Link href="/3d-printing" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">3D Printing Services (CAD/STL)</Link>
            <Link href="/work" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Our Work & Craftsmanship</Link>
            <Link href="/3d-studio" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Interactive 3D Showroom</Link>
            <Link href="/about" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">About Layer XYZ</Link>
          </div>
          
          {/* Col 3: Support & Terms */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#8C8275] font-mono">Customer Care</h3>
            <Link href="/contact" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Contact Studio</Link>
            <Link href="/faq" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Commercial FAQ</Link>
            <Link href="/shipping" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Pan-India Shipping</Link>
            <Link href="/returns" className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">Returns & Care Instructions</Link>
            <div className="pt-2 text-xs text-[#8C8275] leading-relaxed">
              Payment Terms: 50% advance before fabrication · 50% during dispatch.
            </div>
          </div>
          
          {/* Col 4: Studio Presence & Contact */}
          <div className="flex flex-col space-y-3.5">
            <h3 className="font-semibold text-xs tracking-wider uppercase text-[#8C8275] font-mono">Tiruppur Studio</h3>
            <p className="text-xs text-[#6F6B63] leading-relaxed">
              {STUDIO_INFO.locationDisplay}
            </p>
            <a href={`mailto:${STUDIO_INFO.email}`} className="hover:text-[#242321] text-[#6F6B63] transition-colors text-sm">
              {STUDIO_INFO.email}
            </a>

            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow-xs"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-3 border-t border-[#E8DCCB] text-[11px] text-[#8C8275]">
              Bambu Lab additive printing fleet · Single orders to batch manufacturing.
            </div>
          </div>
        </div>
        
        {/* Copyright & Base */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E8DCCB] text-xs text-[#8C8275]">
          <Logo className="mb-4 md:mb-0" />
          <p>© {new Date().getFullYear()} Layer XYZ. Crafted in Tiruppur, Tamil Nadu, India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
