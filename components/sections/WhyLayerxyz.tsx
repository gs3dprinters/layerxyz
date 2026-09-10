'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Target, Package, Sparkles } from 'lucide-react';

export default function WhyLayerxyz() {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      icon: <Target className="w-6 h-6 text-[#171716] mb-6" strokeWidth={1.5} />,
      title: 'Precision Made',
      description: 'Calculated layer deposition and geometric alignment ensure every curve and contour matches digital intent.',
    },
    {
      icon: <Package className="w-6 h-6 text-[#171716] mb-6" strokeWidth={1.5} />,
      title: 'Made to Order',
      description: 'Each piece is produced individually in our studio. No mass-production overstock. No compromise in execution.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#171716] mb-6" strokeWidth={1.5} />,
      title: 'Expert Finishing',
      description: 'Hand-conditioned by our studio artisans. Seams are smoothed, surfaces primed, and textures sealed to perfection.',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14 md:mb-18 text-center max-w-2xl mx-auto"
        >
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            CORE PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716]">
            THE LAYERXYZ DIFFERENCE
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {principles.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              className="bg-[#FAFAF8] rounded-3xl p-8 sm:p-10 border border-[#E8E5DE] transition-all duration-300 hover:border-[#D4D0C8] hover:shadow-[0_12px_32px_rgba(0,0,0,0.03)]"
            >
              {item.icon}
              <h3 className="text-xl font-medium text-[#171716] mb-3">{item.title}</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}