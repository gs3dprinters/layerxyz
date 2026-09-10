"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '@/data/collections';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 sm:mb-18">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            CURATED EDITIONS
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
            COLLECTIONS
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl font-normal">
            Curated groups of physical objects exploring form, heritage, personalized expression, and sculptural presence.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COLLECTIONS.map((collection) => {
            const isCustom = collection.id === 'custom';
            const href = isCustom ? '/custom' : `/collections/${collection.slug}`;
            
            return (
              <Link key={collection.id} href={href}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group block relative overflow-hidden rounded-3xl aspect-[16/10] border border-[#E8E5DE] shadow-xs hover:border-[#D4D0C8] hover:shadow-md transition-all"
                  style={{ background: collection.color || 'linear-gradient(135deg, #FAFAF8, #ECEAE4)' }}
                >
                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2">
                        {isCustom ? 'COMMISSION STUDIO' : 'COLLECTION'}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] mb-2">{collection.name}</h2>
                      <p className="text-sm sm:text-base text-[#55524B] max-w-md">{collection.tagline}</p>
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t border-black/5">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#171716] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-black/5">
                        {isCustom ? 'Custom Orders' : `${collection.productSlugs?.length || 0} Objects`}
                      </span>
                      <span className="w-10 h-10 rounded-full bg-[#181817] text-[#F4F1EA] flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-xs">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
