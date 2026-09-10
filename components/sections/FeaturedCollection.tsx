'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getProduct } from '@/data/products';

const CardModelViewer = dynamic(() => import('@/3d/CardModelViewer'), {
  ssr: false,
  loading: () => null,
});

export default function FeaturedCollection() {
  const shouldReduceMotion = useReducedMotion();

  // Retrieve the 4 real models from data/products.ts
  const flagshipProduct = getProduct('custom-portrait-sculpture');
  const nandiProduct = getProduct('heritage-nandi-sculpture');
  const nameProduct = getProduct('personalized-name-sculpture');
  const natarajaProduct = getProduct('nataraja-statement-sculpture');

  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  if (!flagshipProduct || !nandiProduct || !nameProduct || !natarajaProduct) {
    return null;
  }

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              CURATED OBJECTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-3">
              FEATURED OBJECTS
            </h2>
            <p className="text-base md:text-lg text-[#6F6B63]">
              Designed digitally. Made physically.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors"
          >
            VIEW ALL OBJECTS →
          </Link>
        </motion.div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* 1. FLAGSHIP LEFT (7 Cols): Custom Portrait Sculpture (Kala) */}
          <motion.div
            initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-7 flex flex-col"
          >
            <Link
              href={`/product/${flagshipProduct.slug}`}
              onMouseEnter={() => setHoveredSlug(flagshipProduct.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="group flex flex-col h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-6 sm:p-8 transition-all duration-500 hover:border-[#D4D0C8] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)]"
            >
              {/* Large 3D Canvas Area */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] my-auto">
                <CardModelViewer
                  modelUrl={flagshipProduct.modelUrl || '/models/kala-final-print.glb'}
                  posterImage={flagshipProduct.images[0]}
                  isHovered={hoveredSlug === flagshipProduct.slug}
                  productName={flagshipProduct.name}
                />

                {/* Subtle hover affordance */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <span className="inline-flex items-center gap-2 bg-[#171716] text-[#F4F1EA] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide shadow-md whitespace-nowrap">
                    VIEW IN 3D
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-6 border-t border-[#E8E5DE]/80 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium text-[#171716] mb-1">
                    {flagshipProduct.name}
                  </h3>
                  <p className="text-sm text-[#6F6B63] max-w-md">
                    {flagshipProduct.description}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-semibold text-[#171716]">
                    {flagshipProduct.pricePrefix || ''}{formatPrice(flagshipProduct.price)}
                  </span>
                  <span className="block text-xs text-[#6F6B63] font-mono">Bespoke sizing</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* SECONDARY RIGHT (5 Cols): Curated real pieces */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            {/* 2. Top Secondary: Nandi Sacred Temple Sculpture */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="flex-1"
            >
              <Link
                href={`/product/${nandiProduct.slug}`}
                onMouseEnter={() => setHoveredSlug(nandiProduct.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="group flex flex-col h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-6 transition-all duration-500 hover:border-[#D4D0C8] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="relative w-full aspect-[16/10] my-2">
                  <CardModelViewer
                    modelUrl={nandiProduct.modelUrl || '/models/nandi-temple-sculpture.glb'}
                    posterImage={nandiProduct.images[0]}
                    isHovered={hoveredSlug === nandiProduct.slug}
                    productName={nandiProduct.name}
                  />
                </div>

                <div className="pt-4 border-t border-[#E8E5DE]/80 flex items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-base font-medium text-[#171716] group-hover:text-black transition-colors">
                      {nandiProduct.name}
                    </h3>
                    <p className="text-xs text-[#6F6B63] line-clamp-1">
                      {nandiProduct.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#171716] whitespace-nowrap">
                    {formatPrice(nandiProduct.price)}
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Bottom Secondary Grid: Name Sculpture + Nataraja */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* 3. Personalized Name & Desk Sculpture */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={`/product/${nameProduct.slug}`}
                  onMouseEnter={() => setHoveredSlug(nameProduct.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className="group flex flex-col h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-5 transition-all duration-500 hover:border-[#D4D0C8] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative w-full aspect-square my-2">
                    <CardModelViewer
                      modelUrl={nameProduct.modelUrl || '/models/personalized-name-sculpture.glb'}
                      posterImage={nameProduct.images[0]}
                      isHovered={hoveredSlug === nameProduct.slug}
                      productName={nameProduct.name}
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E8E5DE]/80">
                    <h4 className="text-sm font-medium text-[#171716] truncate">
                      {nameProduct.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#171716] block mt-1">
                      {formatPrice(nameProduct.price)}
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* 4. Nataraja Cosmic Statement Sculpture */}
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={`/product/${natarajaProduct.slug}`}
                  onMouseEnter={() => setHoveredSlug(natarajaProduct.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className="group flex flex-col h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-5 transition-all duration-500 hover:border-[#D4D0C8] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)]"
                >
                  <div className="relative w-full aspect-square my-2">
                    <CardModelViewer
                      modelUrl={natarajaProduct.modelUrl || '/models/nataraja-statement-sculpture.glb'}
                      posterImage={natarajaProduct.images[0]}
                      isHovered={hoveredSlug === natarajaProduct.slug}
                      productName={natarajaProduct.name}
                    />
                  </div>

                  <div className="pt-3 border-t border-[#E8E5DE]/80">
                    <h4 className="text-sm font-medium text-[#171716] truncate">
                      {natarajaProduct.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#171716] block mt-1">
                      {formatPrice(natarajaProduct.price)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href="/shop"
            className="text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors inline-flex items-center gap-2"
          >
            VIEW ALL OBJECTS →
          </Link>
        </div>
      </div>
    </section>
  );
}