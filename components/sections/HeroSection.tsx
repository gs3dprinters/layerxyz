'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ArrowRight, Sparkles, ShieldCheck, Box, Eye, CheckCircle2 } from 'lucide-react';

const HeroSculpture = dynamic(() => import('@/3d/HeroSculpture'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#242321] animate-ping" />
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#242321] font-medium">
          PREPARING 3D VIEW
        </span>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="min-h-[92vh] lg:min-h-[96vh] bg-[#F5F0E8] w-full flex flex-col lg:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 lg:pt-24 pb-12 overflow-hidden relative border-b border-[#E8DCCB]">
      {/* Background Subtle Sandstone Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E8DCCB]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* LEFT 50%: Eyebrow, Main Headline, Supporting Text, Two Prominent CTAs, Studio Proof */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center z-10 pt-4 pb-8 lg:pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DCCB]/60 border border-[#D4C5B0] text-[11px] font-mono tracking-[0.2em] uppercase text-[#49392E] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A58B70]" />
              Layer XYZ · Tiruppur, Tamil Nadu
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-[4.75rem] font-sans font-semibold tracking-tight text-[#242321] leading-[0.98] mb-6 uppercase"
          >
            YOUR IMAGINATION.<br />
            <span className="text-[#49392E]">MADE REAL.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-[#6F6B63] mb-8 leading-relaxed font-normal"
          >
            Custom 3D printed statues, personalised gifts and precision-made products. Designed, crafted and brought to life by Layer XYZ.
          </motion.p>

          {/* Two Prominent CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10"
          >
            <Link
              href="/shop"
              className="inline-flex justify-center items-center px-8 py-4 bg-[#242321] text-[#F5F0E8] font-medium hover:bg-[#49392E] transition-all rounded-full text-xs font-mono uppercase tracking-wider shadow-sm hover:shadow-md"
            >
              <span>Explore Collections</span>
              <ArrowRight size={15} className="ml-2" />
            </Link>

            <Link
              href="/custom-statues"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-[#242321] border border-[#242321] hover:bg-[#242321] hover:text-[#F5F0E8] transition-all rounded-full font-medium text-xs font-mono uppercase tracking-wider"
            >
              <span>Create Your Custom Statue</span>
            </Link>
          </motion.div>

          {/* Studio Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-[#E8DCCB] grid grid-cols-3 gap-3 text-left"
          >
            <div>
              <span className="block text-xs font-semibold text-[#242321]">In-House Craft</span>
              <span className="text-[11px] text-[#6F6B63] block">Bambu Lab 3D fleet</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#242321]">Pan-India Safe</span>
              <span className="text-[11px] text-[#6F6B63] block">Shockproof transit</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#242321]">50% Advance</span>
              <span className="text-[11px] text-[#6F6B63] block">50% upon shipping</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* RIGHT 50%: Large High-Quality Photograph of Actual Completed Statue with 3D Toggle */}
      <div className="w-full lg:w-[50%] flex flex-col items-center justify-center relative mt-6 lg:mt-0">
        <div className="relative w-full max-w-lg aspect-square sm:aspect-[4/4.5] bg-[#E8DCCB]/30 rounded-3xl overflow-hidden border border-[#D4C5B0] shadow-sm flex items-center justify-center p-4 sm:p-6">
          
          {/* View Mode Toggle: Photograph vs 3D */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-[#F5F0E8]/90 backdrop-blur-md p-1 rounded-full border border-[#D4C5B0] text-[10px] font-mono uppercase tracking-wider">
            <button
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'photo'
                  ? 'bg-[#242321] text-[#F5F0E8] font-semibold'
                  : 'text-[#6F6B63] hover:text-[#242321]'
              }`}
            >
              <Eye size={12} />
              <span>Photograph</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === '3d'
                  ? 'bg-[#242321] text-[#F5F0E8] font-semibold'
                  : 'text-[#6F6B63] hover:text-[#242321]'
              }`}
            >
              <Box size={12} />
              <span>3D Model</span>
            </button>
          </div>

          {/* Primary View: Real Product Photograph */}
          {viewMode === 'photo' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/products/kala-portrait-statue/primary.webp"
                alt="Actual completed custom statue fabricated at Layer XYZ studio"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute bottom-3 left-3 bg-[#F5F0E8]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D4C5B0] text-[10px] font-mono text-[#242321]">
                <span className="font-semibold uppercase">Actual Studio Print:</span> Kala Custom Statue · 12" Ebony Finish
              </div>
            </div>
          ) : (
            /* Interactive 3D Model View */
            <div className="w-full h-full relative">
              <HeroSculpture />
            </div>
          )}
        </div>

        {/* Caption below visual */}
        <div className="mt-4 flex items-center justify-between w-full max-w-lg text-[11px] font-mono text-[#6F6B63] px-2">
          <span>Tiruppur Fabrication Studio</span>
          <Link
            href="/custom-statues"
            className="text-[#242321] font-semibold hover:text-[#A58B70] transition-colors flex items-center gap-1"
          >
            <span>Custom Statue Pricing Guide</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
