'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import { STUDIO_INFO } from '@/lib/config';

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: 'Can I order a completely customised statue?',
    a: 'Yes! We create bespoke statues, figurines, and deity idols from customer photographs, sketches, or reference concepts. Our 3D sculptors digitally model your subject, send preview renders for your confirmation, and then 3D print and hand-finish the piece.',
  },
  {
    q: 'Can I provide my own STL or 3MF file?',
    a: 'Absolutely. If you already have a 3D model in .STL, .3MF, .STEP, .STP, or .OBJ format, you can upload it directly through our 3D Printing Services page or send it via WhatsApp. We will inspect the mesh geometry, verify printability, and provide a direct quote.',
  },
  {
    q: 'Do you provide painting and finishing?',
    a: 'Yes. We offer several finish tiers: single-colour studio matte textures (warm sandstone, ebony graphite, chalk white), antique temple bronze patinas, and detailed hand-painting for commemorative figurines and deity statues.',
  },
  {
    q: 'What materials do you support?',
    a: 'Our primary production materials are Studio PLA / PLA Pro+ (for high-detail statues, gifts, and display objects) and PETG (for impact-resistant and temperature-tolerant functional parts). We also support flexible TPU and ultra-high-detail resin upon request.',
  },
  {
    q: 'Can you manufacture products in bulk?',
    a: 'Yes. We operate a fleet of high-speed Bambu Lab 3D printers capable of handling small-to-medium batch manufacturing runs (from 10 to 500+ units) for corporate gifts, trophies, product casings, and custom merchandise.',
  },
  {
    q: 'Do you deliver across India?',
    a: 'Yes. We ship to all pin codes across India via reliable express courier partners. Because statues and custom objects are delicate, we use custom-cut shock-absorbent foam and rigid multi-wall packaging to ensure safe, damage-free arrival.',
  },
  {
    q: 'How does the quotation process work?',
    a: 'For custom statues, we assess scale, complexity, and finishing requirements. For 3D printing services, we calculate material volume, print duration, and post-processing needs. We typically provide a transparent quotation within a few business hours.',
  },
  {
    q: 'What is the payment process?',
    a: 'Our standard terms for custom fabrication and manufacturing are simple: a 50% advance payment is required before digital 3D modelling and printing begins, and the remaining 50% balance is payable during the shipping process before final delivery. Shipping charges are calculated based on parcel weight and destination.',
  },
  {
    q: 'How long does production take?',
    a: 'Production duration depends on the scope. Ready or standard catalogue prints typically ship within 3–5 business days. Custom statues requiring 3D digital modelling, customer preview approval, and hand-finishing typically take 7–14 days. Urgent orders can be accommodated upon request.',
  },
];

export default function CommercialFAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const whatsappHref = getWhatsAppUrl(
    "Hi Layer XYZ, I have a question about your custom 3D printing services."
  );

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-b border-[#E8DCCB]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            COMMERCIAL CLARITY
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            Everything you need to know about custom statues, printing your CAD files, materials, payment terms, and Pan-India shipping.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#F5F0E8] rounded-2xl border border-[#E8DCCB] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-sans font-semibold text-[#242321]">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E8DCCB] flex items-center justify-center flex-shrink-0 text-[#242321]">
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[#6F6B63] leading-relaxed border-t border-[#E8DCCB]/60 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Query Help */}
        <div className="mt-12 text-center p-6 bg-white/60 rounded-2xl border border-[#E8DCCB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-sm font-semibold text-[#242321] block">Have another question or custom request?</span>
            <span className="text-xs text-[#6F6B63]">Our Tiruppur team answers directly on WhatsApp.</span>
          </div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-colors"
          >
            <MessageCircle size={15} />
            <span>Ask us on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
