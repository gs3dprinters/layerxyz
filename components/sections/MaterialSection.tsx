'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { MATERIALS } from '@/data/materials';

export default function MaterialSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeMaterialId, setActiveMaterialId] = useState(MATERIALS[0].id);

  // Helper gradient styling for tactile luxury swatches
  const swatchStyles: Record<string, { swatchBg: string; border: string; accent: string }> = {
    'pla-pro-plus': {
      swatchBg: 'linear-gradient(145deg, #2b2b29 0%, #151514 100%)',
      border: 'rgba(255,255,255,0.1)',
      accent: '#C8B89F',
    },
    'petg': {
      swatchBg: 'radial-gradient(circle at 30% 30%, #383B3E 0%, #1F2123 100%)',
      border: 'rgba(255,255,255,0.08)',
      accent: '#A09D95',
    },
    'custom-finishing': {
      swatchBg: 'linear-gradient(145deg, #D4C5AE 0%, #9E8D75 100%)',
      border: 'rgba(0,0,0,0.08)',
      accent: '#181817',
    },
  };

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#EAE5DC] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              STUDIO MATERIALS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-3">
              MATTER, FINISH, FORM.
            </h2>
            <p className="text-base sm:text-lg text-[#6F6B63] max-w-xl">
              Choose the surface that best suits the object.
            </p>
          </div>
          <Link
            href="/custom"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors group"
          >
            REQUEST MATERIAL SAMPLE
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* 3 Luxury Material Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {MATERIALS.map((mat, i) => {
            const style = swatchStyles[mat.id] || {
              swatchBg: mat.visualColor,
              border: 'rgba(0,0,0,0.1)',
              accent: '#181817',
            };
            const isSelected = activeMaterialId === mat.id;

            return (
              <motion.div
                key={mat.id}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                onClick={() => setActiveMaterialId(mat.id)}
                className={`group cursor-pointer rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-500 relative ${
                  isSelected
                    ? 'bg-[#FAFAF8] border border-[#171716] shadow-[0_16px_40px_rgba(0,0,0,0.06)] scale-[1.01]'
                    : 'bg-[#FAFAF8]/80 hover:bg-[#FAFAF8] border border-[#E8E5DE] hover:border-[#D4D0C8] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)]'
                }`}
              >
                <div>
                  {/* Tactile Swatch Block */}
                  <div className="relative w-full aspect-[16/10] rounded-2xl mb-6 overflow-hidden flex items-center justify-center p-4 transition-transform duration-500 group-hover:scale-[1.02]">
                    <div
                      className="w-full h-full rounded-xl shadow-inner relative flex items-center justify-center"
                      style={{
                        background: style.swatchBg,
                        border: `1px solid ${style.border}`,
                      }}
                    >
                      {/* Subtle tactile surface sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none rounded-xl" />
                      
                      {isSelected && (
                        <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-xs">
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Classification */}
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#6F6B63] block mb-2 font-medium">
                    {mat.category}
                  </span>

                  {/* Material Name */}
                  <h3 className="text-xl font-medium text-[#171716] mb-2 tracking-tight group-hover:text-black transition-colors">
                    {mat.name}
                  </h3>

                  {/* Finish Description */}
                  <p className="text-xs text-[#55524B] leading-relaxed mb-6">
                    {mat.finish}
                  </p>
                </div>

                {/* Available Tones */}
                <div className="pt-5 border-t border-[#E8E5DE]/80">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#888888] block mb-2.5">
                    Available Tones
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {mat.colors.slice(0, 3).map((tone) => (
                      <span
                        key={tone}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#E8E5DE] text-[#4A4740] font-sans font-medium"
                      >
                        {tone}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footnote Link */}
        <div className="mt-14 pt-8 border-t border-[#D4D0C8]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F6B63]">
          <span>Each physical object is produced and inspected in our Tiruppur studio.</span>
          <Link href="/custom" className="text-[#171716] font-medium hover:underline inline-flex items-center gap-1.5">
            Discuss a custom finish or material commission →
          </Link>
        </div>
      </div>
    </section>
  );
}
