'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FAQS } from '@/data/faqs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import Link from 'next/link';

export default function FAQSection() {
  const shouldReduceMotion = useReducedMotion();
  const displayFaqs = FAQS.slice(0, 5);

  return (
    <section className="bg-[#F4F1EA] py-24 md:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left column */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:w-1/3 flex flex-col justify-between"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              CLARIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
              COMMON QUESTIONS
            </h2>
            <p className="text-sm sm:text-base text-[#6F6B63] mb-8 leading-relaxed">
              Have a question about our bespoke portrait commissions, materials, or turnaround timelines?
            </p>
            <p className="text-xs text-[#888888] font-mono mb-8">
              Custom fabrication starts from ₹5/g baseline for standard studio biopolymers.
            </p>
          </div>

          <div>
            <Link 
              href="/custom" 
              className="inline-flex justify-center items-center px-7 py-3.5 bg-[#171716] text-[#F4F1EA] rounded-full font-medium text-xs tracking-wide hover:bg-[#2A2A28] transition-colors"
            >
              INQUIRE ABOUT CUSTOM WORK →
            </Link>
          </div>
        </motion.div>

        {/* Right column: Accordion */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:w-2/3 bg-[#FAFAF8] p-8 sm:p-10 rounded-3xl border border-[#E8E5DE]"
        >
          <Accordion type="single" collapsible className="w-full">
            {displayFaqs.map((faq, i) => (
              <AccordionItem key={faq.id || i} value={`item-${i}`} className="border-b border-[#E8E5DE] py-2">
                <AccordionTrigger className="text-base sm:text-lg font-medium text-[#171716] hover:text-[#6F6B63] transition-colors text-left py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#6F6B63] leading-relaxed pb-6 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="pt-6 mt-4 flex justify-end">
            <Link href="/faq" className="text-xs font-medium text-[#171716] hover:underline">
              View all frequently asked questions →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}