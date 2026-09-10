'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

export default function LargeScaleSection() {
  const shouldReduceMotion = useReducedMotion();

  const tiers = [
    { label: '50mm', name: 'Desk Artifacts', heightClass: 'h-14 sm:h-20', bgClass: 'bg-[#DCD6CC]' },
    { label: '250mm', name: 'Studio Sculptures', heightClass: 'h-24 sm:h-36', bgClass: 'bg-[#C8B89F]' },
    { label: '1000mm', name: 'Monumental Busts', heightClass: 'h-40 sm:h-60', bgClass: 'bg-[#4A4843]' },
    { label: '2500mm+', name: 'Architectural Works', heightClass: 'h-56 sm:h-80', bgClass: 'bg-[#181817]' },
  ];

  return (
    <section className="bg-[#EAE5DC] py-28 md:py-36 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
        {/* Left Typography */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex-1 w-full max-w-xl"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-4 font-medium">
            SCALE CAPABILITIES
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tighter leading-[0.92] text-[#171716] mb-6">
            FROM SMALL OBJECTS<br />TO STATEMENT PIECES.
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B63] mb-10 leading-relaxed">
            Layerxyz crafts physical objects across a broad dimensional spectrum — from an intimate 50mm desk artifact to commanding 2500mm+ architectural works.
          </p>
          <Link 
            href="/custom"
            className="text-[#171716] hover:text-[#6F6B63] font-medium transition-colors border-b border-[#171716] hover:border-[#6F6B63] pb-1 inline-flex text-sm tracking-wide"
          >
            Start a custom commission →
          </Link>
        </motion.div>

        {/* Right Scale Visual Comparison */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex-1 w-full"
        >
          <div className="w-full aspect-[4/3] rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] relative flex items-end p-6 sm:p-10 shadow-xs">
            <div className="w-full flex items-end justify-between gap-3 sm:gap-6">
              {tiers.map((tier) => (
                <div key={tier.label} className="w-1/4 flex flex-col items-center gap-3">
                  <span className="text-[10px] sm:text-xs text-[#6F6B63] font-mono tracking-wider">
                    {tier.label}
                  </span>
                  <div className={`w-full ${tier.heightClass} ${tier.bgClass} rounded-2xl transition-transform hover:scale-[1.03] duration-300 shadow-sm`} />
                  <span className="text-[10px] sm:text-[11px] text-[#6F6B63] text-center font-medium leading-tight">
                    {tier.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}