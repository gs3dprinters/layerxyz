'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F4F1EA] py-32 md:py-44 px-6 sm:px-10 lg:px-16 flex items-center justify-center text-center relative">
      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-4xl w-full"
      >
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-6 font-medium">
          COMMISSION OR DISCOVER
        </span>
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-sans font-semibold tracking-tighter text-[#171716] leading-[0.9] mb-8">
          HAVE AN IDEA?<br />LET&apos;S MAKE IT REAL.
        </h2>
        <p className="text-base sm:text-xl text-[#6F6B63] max-w-xl mx-auto mb-12 leading-relaxed">
          Bring us a photograph, sketch, 3D file or simply an idea.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/custom"
            className="inline-flex justify-center items-center gap-2 px-9 py-4 bg-[#181817] text-[#F4F1EA] font-medium hover:bg-[#2A2A28] transition-colors rounded-full text-sm tracking-wide shadow-sm w-full sm:w-auto"
          >
            START A PROJECT
            <ArrowRight size={15} />
          </Link>
          <Link 
            href="/shop"
            className="inline-flex justify-center items-center px-9 py-4 bg-transparent text-[#171716] border border-[#D4D0C8] hover:border-[#171716] transition-colors rounded-full font-medium text-sm tracking-wide w-full sm:w-auto"
          >
            SHOP OBJECTS →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}