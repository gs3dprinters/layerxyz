"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const HeroSculpture = dynamic(() => import("@/3d/HeroSculpture"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#E8E5DE] animate-pulse rounded-lg" />
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
    <section className="min-h-[90vh] bg-[#F5F3EE] w-full flex flex-col md:flex-row items-center px-6 py-12 md:py-0 overflow-hidden relative">
      <div className="flex-1 w-full flex flex-col justify-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-sans font-semibold tracking-tighter text-[#181818] leading-[0.9] mb-6"
          >
            OBJECTS<br />MADE REAL.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-[#777777] mb-10 max-w-md"
          >
            Custom 3D printed objects, sculptures and products — made to order.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/shop"
              className="inline-flex justify-center items-center px-8 py-4 bg-[#181818] text-white font-medium hover:bg-[#2A2A2A] transition-colors rounded-full"
            >
              SHOP COLLECTION
            </Link>
            <Link 
              href="/custom"
              className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-[#181818] border border-[#D4D0C8] hover:border-[#181818] transition-colors rounded-full font-medium"
            >
              CREATE SOMETHING CUSTOM
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="flex-1 w-full h-[50vh] md:h-[90vh] relative flex flex-col items-center justify-center mt-12 md:mt-0">
        <div className="w-full h-full max-h-[800px] relative">
          <HeroSculpture />
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <span className="text-xs text-[#777777] tracking-widest uppercase">EXPLORE IN 3D</span>
        </div>
      </div>
    </section>
  );
}