'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HeroSculpture = dynamic(() => import('@/3d/HeroSculpture'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#181817] animate-ping" />
        <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#181817] font-medium">
          LOADING SCULPTURE
        </span>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="min-h-[92vh] lg:min-h-[96vh] bg-[#F4F1EA] w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 pt-24 md:pt-0 overflow-hidden relative">
      {/* LEFT 46%: Eyebrow, Display Headline, Copy, CTAs */}
      <div className="w-full md:w-[46%] lg:w-[44%] flex flex-col justify-center z-10 pt-4 sm:pt-8 md:pt-0 pb-6 md:pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
            <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-[#6F6B63] font-medium">
              LAYERXYZ / OBJECTS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-[5.75rem] font-sans font-semibold tracking-tighter text-[#171716] leading-[0.9] mb-6"
          >
            OBJECTS<br />MADE REAL.
          </motion.h1>
          
          {/* Supporting Copy */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-[#6F6B63] mb-10 max-w-md leading-relaxed"
          >
            Custom 3D printed objects, sculptures and products — made to order.
          </motion.p>
          
          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link 
              href="/shop"
              className="inline-flex justify-center items-center px-8 py-4 bg-[#181817] text-[#F4F1EA] font-medium hover:bg-[#2A2A28] transition-colors rounded-full text-sm tracking-wide shadow-xs"
            >
              SHOP COLLECTION
            </Link>
            <Link 
              href="/custom"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-[#171716] border border-[#D4D0C8] hover:border-[#171716] transition-colors rounded-full font-medium text-sm tracking-wide"
            >
              CREATE SOMETHING CUSTOM
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* RIGHT 54%: Large Real Kala Statue 3D Model */}
      <div className="w-full md:w-[54%] lg:w-[56%] h-[50vh] sm:h-[62vh] md:h-[88vh] lg:h-[92vh] relative flex flex-col items-center justify-center mt-4 md:mt-0">
        <div className="w-full h-full relative">
          <HeroSculpture />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <span className="text-[10px] text-[#6F6B63] tracking-[0.25em] uppercase font-mono">
            EXPLORE IN 3D
          </span>
        </div>
      </div>
    </section>
  );
}