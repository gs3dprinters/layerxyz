'use client';

import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block group">
      <a
        href={getWhatsAppUrl("Hi, I'm interested in learning more about your products.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#181818] text-[#F5F3EE] rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#FFFFFF] text-xs font-medium text-[#181818] rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-[#E8E5DE]">
        Chat with us
      </div>
    </div>
  );
}
