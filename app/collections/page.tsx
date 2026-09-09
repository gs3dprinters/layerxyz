"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLLECTIONS } from '@/data/collections';

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-4">
            COLLECTIONS
          </h1>
          <p className="text-lg text-[#777777]">
            Curated groups of objects.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLECTIONS.map((collection) => {
            const isCustom = collection.id === 'custom';
            const href = isCustom ? '/custom' : `/collections/${collection.slug}`;
            
            return (
              <Link key={collection.id} href={href}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group block relative overflow-hidden rounded-2xl aspect-[16/9]"
                  style={{ background: collection.color || 'linear-gradient(135deg, #E8E5DE, #D4D0C8)' }}
                >
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-semibold text-[#181818] mb-2">{collection.name}</h2>
                      <p className="text-[#2A2A2A] opacity-80">{collection.tagline}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium text-[#181818] bg-white/30 backdrop-blur-md px-3 py-1 rounded-full">
                        {collection.productSlugs?.length || 0} Objects
                      </span>
                      <span className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        →
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
