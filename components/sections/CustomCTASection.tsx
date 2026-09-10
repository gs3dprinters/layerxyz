'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CustomCTASection() {
  const shouldReduceMotion = useReducedMotion();

  const stages = [
    {
      num: '01',
      title: 'Digital Concept',
      desc: 'Photographs, sketches, CAD files or an idea become the starting point for the piece.',
    },
    {
      num: '02',
      title: 'Digital Sculpting',
      desc: 'The form is developed digitally and prepared for physical production.',
    },
    {
      num: '03',
      title: 'Physical Object',
      desc: 'The finished form is produced, refined and prepared according to the requirements of the project.',
    },
    {
      num: '04',
      title: 'Final Finish',
      desc: 'Where applicable, selected pieces can receive additional surface preparation or finishing.',
    },
  ];

  return (
    <section className="bg-[#181817] text-[#F4F1EA] py-28 md:py-36 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#A09D95] block mb-4 font-medium">
            BESPOKE FABRICATION
          </span>
          <motion.h2 
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans font-semibold tracking-tighter leading-[0.92] mb-6 text-white"
          >
            MAKE SOMETHING<br />THAT DOESN&apos;T EXIST YET.
          </motion.h2>
          <p className="text-base sm:text-xl text-[#A09D95] leading-relaxed max-w-2xl">
            From a photograph, sketch or idea to a physical object made specifically for you.
          </p>
        </div>

        {/* Conceptual progression cards (non-technical, editorial) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 md:mb-20">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.num}
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              className="p-8 rounded-3xl bg-[#222220] border border-[#2E2E2B] flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-xs font-mono text-[#A09D95]">{stage.num}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A09D95]/40" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">{stage.title}</h3>
                <p className="text-sm text-[#A09D95] leading-relaxed">{stage.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Row */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6"
        >
          <Link 
            href="/custom"
            className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-white text-[#181817] font-medium hover:bg-[#F4F1EA] transition-colors rounded-full text-sm tracking-wide shadow-sm"
          >
            CREATE SOMETHING CUSTOM
            <ArrowRight size={16} />
          </Link>
          <Link 
            href="/about"
            className="inline-flex justify-center items-center text-sm font-medium text-[#A09D95] hover:text-white transition-colors"
          >
            Learn about our studio process →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}