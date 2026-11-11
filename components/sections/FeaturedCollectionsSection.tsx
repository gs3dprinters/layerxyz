'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

// The 7 specific featured collections requested by the user
const FEATURED_SLUGS = [
  'gifts',
  'god-idols',
  'leaders-icons',
  'costume-idols',
  'home-decor',
  'toys-figurines',
  'awards-trophies',
];

export default function FeaturedCollectionsSection() {
  const featuredCategories = FEATURED_SLUGS.map((slug) =>
    CATEGORIES.find((cat) => cat.slug === slug)
  ).filter(Boolean);

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F5F0E8] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              DISCIPLINES & OBJECTS
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] uppercase">
              FEATURED COLLECTIONS
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#242321] hover:text-[#49392E] transition-colors pb-1 border-b border-[#242321]"
            >
              <span>View All Categories</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Categories Grid: 1st card prominent, then responsive 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCategories.map((category, index) => {
            if (!category) return null;

            return (
              <div
                key={category.slug}
                className="group bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#E8DCCB] hover:border-[#C4B7A5] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full bg-[#E8DCCB]/40 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.imageAlt || category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#F5F0E8]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#242321] font-semibold border border-[#D4C5B0]">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-sans font-semibold text-[#242321] mb-2.5 group-hover:text-[#49392E] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#6F6B63] leading-relaxed mb-6 line-clamp-3">
                      {category.description}
                    </p>

                    {/* Subcategories preview tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <span
                          key={sub.slug}
                          className="px-2.5 py-1 rounded-md bg-[#E8DCCB]/50 text-[11px] font-mono text-[#49392E]"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Explore Action Button */}
                  <div className="pt-4 border-t border-[#E8DCCB]">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="inline-flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider font-semibold text-[#242321] group-hover:text-[#49392E] transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight size={15} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
