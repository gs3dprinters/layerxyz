'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { MATERIALS } from '@/data/materials';

export default function MaterialSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#EAE5DC]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14 md:mb-18 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              TACTILE SURFACES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-3">
              MATTER, FINISH, FORM.
            </h2>
            <p className="text-base md:text-lg text-[#6F6B63]">
              Choose the finish that suits the object.
            </p>
          </div>
          <Link
            href="/custom"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors"
          >
            CUSTOMIZE MATERIAL →
          </Link>
        </motion.div>

        {/* 4 Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS.map((mat, i) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#E8E5DE] flex flex-col justify-between hover:border-[#D4D0C8] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#6F6B63]">
                    {mat.category}
                  </span>
                  <span 
                    className="w-4 h-4 rounded-full border border-black/10 shadow-xs" 
                    style={{ backgroundColor: mat.visualColor }} 
                  />
                </div>

                <h3 className="text-lg font-medium text-[#171716] mb-2">{mat.name}</h3>
                <p className="text-xs text-[#6F6B63] leading-relaxed mb-6">
                  {mat.finish}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E5DE]/80">
                <span className="text-[10px] font-mono uppercase text-[#888888] block mb-2">Available Tones</span>
                <div className="flex flex-wrap gap-1.5">
                  {mat.colors.slice(0, 3).map((col) => (
                    <span key={col} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-[#E8E5DE] text-[#555555]">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
