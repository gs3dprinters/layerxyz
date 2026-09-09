"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroSculpture = dynamic(() => import("@/3d/HeroSculpture"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#181818] animate-ping" />
        <span className="text-xs font-sans tracking-[0.2em] uppercase text-[#181818] font-medium">
          LOADING OBJECT
        </span>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="min-h-[92vh] bg-[#F5F3EE] w-full flex flex-col md:flex-row items-center px-6 lg:px-12 py-8 md:py-0 overflow-hidden relative">
      {/* LEFT 45%: Headline, Copy, Actions */}
      <div className="w-full md:w-[45%] flex flex-col justify-center z-10 pt-8 md:pt-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl sm:text-7xl lg:text-8xl font-sans font-semibold tracking-tighter text-[#181818] leading-[0.92] mb-6"
          >
            OBJECTS<br />MADE REAL.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-[#777777] mb-10 max-w-md leading-relaxed"
          >
            Custom 3D printed objects, sculptures and products — made to order.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/shop"
              className="inline-flex justify-center items-center px-8 py-4 bg-[#181818] text-white font-medium hover:bg-[#2A2A2A] transition-colors rounded-full text-sm tracking-wide"
            >
              SHOP COLLECTION
            </Link>
            <Link 
              href="/custom"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-[#181818] border border-[#D4D0C8] hover:border-[#181818] transition-colors rounded-full font-medium text-sm tracking-wide"
            >
              CREATE SOMETHING CUSTOM
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* RIGHT 55%: Large Real Kala Statue 3D Model */}
      <div className="w-full md:w-[55%] h-[60vh] sm:h-[68vh] md:h-[90vh] lg:h-[94vh] relative flex flex-col items-center justify-center mt-6 md:mt-0">
        <div className="w-full h-full relative">
          <HeroSculpture />
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <span className="text-[11px] text-[#777777] tracking-[0.25em] uppercase font-medium">
            EXPLORE IN 3D
          </span>
        </div>
      </div>
    </section>
  );
}