'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import { BUSINESS_WHATSAPP_NUMBER } from '@/lib/config';

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappHref = getWhatsAppUrl(
    "Hi Layer XYZ, I'm visiting your website and would like to enquire about your custom 3D printed statues and 3D printing services."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Hover / Active Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center bg-[#171716] text-[#F5F3EE] px-4 py-2.5 rounded-full shadow-lg border border-[#33312E] text-xs font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            <span>Chat with our Tiruppur Studio</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with Layer XYZ on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {/* Subtle Ping Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-75 pointer-events-none" />
        
        {/* WhatsApp Icon */}
        <MessageCircle size={28} className="relative z-10 fill-current" />

        {/* Small Studio Online Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-300 border-2 border-white rounded-full z-20" />
      </a>
    </div>
  );
}
