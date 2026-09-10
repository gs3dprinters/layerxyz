'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ShopByCategory() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              EXPLORE BY DISCIPLINE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716]">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors"
          >
            VIEW ALL COLLECTIONS →
          </Link>
        </motion.div>

        {/* Editorial Category Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* 1. SCULPTURES — Large Feature Panel (7 cols) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:col-span-7"
          >
            <Link
              href="/collections/sculptures"
              className="group relative flex flex-col justify-between h-[360px] sm:h-[420px] rounded-3xl p-8 sm:p-10 bg-[#EAE5DC] border border-[#DCD6CC] overflow-hidden transition-all duration-500 hover:border-[#171716]/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start z-10">
                <span className="text-xs font-mono tracking-widest uppercase text-[#6F6B63]">
                  COLLECTION 01
                </span>
                <span className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center text-[#171716] group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={15} />
                </span>
              </div>

              <div className="z-10 mt-auto">
                <h3 className="text-3xl sm:text-4xl font-sans font-semibold text-[#171716] tracking-tight mb-2">
                  SCULPTURES
                </h3>
                <p className="text-sm sm:text-base text-[#6F6B63] max-w-md leading-relaxed">
                  Abstract and architectural forms that command presence. Designed to exist as standalone statements in curated spaces.
                </p>
              </div>

              {/* Decorative soft architectural blur */}
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            </Link>
          </motion.div>

          {/* 2. FIGURINES — Smaller Panel (5 cols) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:col-span-5"
          >
            <Link
              href="/collections/figurines"
              className="group relative flex flex-col justify-between h-[360px] sm:h-[420px] rounded-3xl p-8 sm:p-10 bg-[#FAFAF8] border border-[#E8E5DE] overflow-hidden transition-all duration-500 hover:border-[#171716]/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start z-10">
                <span className="text-xs font-mono tracking-widest uppercase text-[#6F6B63]">
                  COLLECTION 02
                </span>
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#171716] group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={15} />
                </span>
              </div>

              <div className="z-10 mt-auto">
                <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] tracking-tight mb-2">
                  FIGURINES
                </h3>
                <p className="text-sm text-[#6F6B63] leading-relaxed">
                  Characters, cultural icons and contemplative portraits translated into physical form.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* 3. HOME OBJECTS (4 cols) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:col-span-4"
          >
            <Link
              href="/collections/home-objects"
              className="group relative flex flex-col justify-between h-[300px] rounded-3xl p-8 bg-[#FAFAF8] border border-[#E8E5DE] overflow-hidden transition-all duration-500 hover:border-[#171716]/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start z-10">
                <span className="text-xs font-mono tracking-widest uppercase text-[#6F6B63]">
                  COLLECTION 03
                </span>
                <ArrowRight size={15} className="text-[#171716] group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="z-10 mt-auto">
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#171716] mb-1">
                  HOME OBJECTS
                </h3>
                <p className="text-xs sm:text-sm text-[#6F6B63]">
                  Functional vessels, desk objects, and tactile pieces for daily living.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* 4. LIMITED OBJECTS (4 cols) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:col-span-4"
          >
            <Link
              href="/collections/limited"
              className="group relative flex flex-col justify-between h-[300px] rounded-3xl p-8 bg-[#FAFAF8] border border-[#E8E5DE] overflow-hidden transition-all duration-500 hover:border-[#171716]/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)]"
            >
              <div className="flex justify-between items-start z-10">
                <span className="text-xs font-mono tracking-widest uppercase text-[#6F6B63]">
                  COLLECTION 04
                </span>
                <ArrowRight size={15} className="text-[#171716] group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="z-10 mt-auto">
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-[#171716] mb-1">
                  LIMITED EDITIONS
                </h3>
                <p className="text-xs sm:text-sm text-[#6F6B63]">
                  Numbered studio editions and experimental geometry in small runs.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* 5. CUSTOM FABRICATION (4 cols) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
            className="md:col-span-4"
          >
            <Link
              href="/custom"
              className="group relative flex flex-col justify-between h-[300px] rounded-3xl p-8 bg-[#181817] text-[#F4F1EA] overflow-hidden transition-all duration-500 hover:bg-[#2A2A28] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
            >
              <div className="flex justify-between items-start z-10">
                <span className="text-xs font-mono tracking-widest uppercase text-[#A09D95] flex items-center gap-1.5">
                  <Sparkles size={12} />
                  STUDIO BESPOKE
                </span>
                <ArrowRight size={15} className="text-[#F4F1EA] group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="z-10 mt-auto">
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-white mb-1">
                  CUSTOM PROJECT
                </h3>
                <p className="text-xs sm:text-sm text-[#A09D95]">
                  From sketches or 3D files to a finished physical sculpture.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}