'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Cpu } from 'lucide-react';

export default function FinalCTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F5F0E8] py-28 sm:py-36 md:py-44 px-6 sm:px-10 lg:px-16 flex items-center justify-center text-center relative overflow-hidden">
      {/* Subtle Sandstone Radial Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E8DCCB]/60 via-[#F5F0E8] to-[#F5F0E8] pointer-events-none -z-0" />

      <motion.div
        initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-4xl w-full relative z-10"
      >
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-4 font-medium">
          COMMISSION OR FABRICATE
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-semibold tracking-tight text-[#242321] leading-[1.0] mb-6 uppercase">
          HAVE AN IDEA?<br />
          <span className="text-[#49392E]">LET&apos;S MAKE IT REAL.</span>
        </h2>
        <p className="text-base sm:text-xl text-[#6F6B63] max-w-xl mx-auto mb-10 leading-relaxed font-normal">
          Share your idea with us and let Layer XYZ bring it to life.
        </p>

        {/* Two Required Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/custom-statues"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-[#242321] text-[#F5F0E8] font-medium hover:bg-[#49392E] transition-all rounded-full text-xs font-mono uppercase tracking-wider shadow-sm hover:shadow-md w-full sm:w-auto"
          >
            <Sparkles size={14} />
            <span>Start Your Custom Order</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/3d-printing"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-transparent text-[#242321] border border-[#242321] hover:bg-[#242321] hover:text-[#F5F0E8] transition-all rounded-full font-medium text-xs font-mono uppercase tracking-wider w-full sm:w-auto"
          >
            <Cpu size={14} />
            <span>Get a Free Printing Quote</span>
          </Link>
        </div>

        {/* Location & Safe Transit Guarantee */}
        <div className="mt-12 text-xs font-mono text-[#8C8275]">
          <span>Tiruppur, Tamil Nadu · Nationwide Safe Packaging & Delivery</span>
        </div>
      </motion.div>
    </section>
  );
}
