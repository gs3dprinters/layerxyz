'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Cpu, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function WhatWeDoSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F5F0E8] border-b border-[#E8DCCB] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            TWO DEDICATED DISCIPLINES
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] mb-4 uppercase">
            WHAT WE DO AT LAYER XYZ
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            Whether you want a finished bespoke sculpture crafted for your home or need engineering-grade 3D printing for your designs, we provide two distinct services under one roof.
          </p>
        </div>

        {/* Two Visually Distinct Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* CARD A: CUSTOM STATUES & FINISHED PRODUCTS */}
          <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E8DCCB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#E8DCCB]/40 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />

            <div>
              {/* Category Pill */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCCB] text-[#49392E] text-[11px] font-mono uppercase tracking-wider font-semibold">
                  <Sparkles size={13} />
                  Bespoke Objects & Statues
                </span>
                <span className="text-xs font-mono text-[#8C8275]">01 / FINISHED CREATIONS</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-[#242321] mb-4">
                Custom Statues & Physical Products
              </h3>

              <p className="text-sm sm:text-base text-[#6F6B63] leading-relaxed mb-8">
                We transform personal photographs, sketches, and devotional ideas into heirloom-quality physical sculptures. Every piece is sculpted in 3D, printed, hand-assembled, and finished with care.
              </p>

              {/* Showcase items */}
              <div className="space-y-3 mb-10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Custom Human Statues & Portraits</span>
                    <span className="text-xs text-[#6F6B63]">Sculpted from customer photos in 10", 15", and 18" scale.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Hindu Deity Idols</span>
                    <span className="text-xs text-[#6F6B63]">Classical iconography including Nandi, Nataraja, Murugan, and Ganesha.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Personalised Gifts & Monograms</span>
                    <span className="text-xs text-[#6F6B63]">Names, commemorative dates, custom keychains, and couple tokens.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Collectibles, Figurines & Home Décor</span>
                    <span className="text-xs text-[#6F6B63]">Costume idols, miniatures, and minimalist architectural accessories.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors"
              >
                <span>Explore Collections</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/custom-statues"
                className="text-xs font-mono text-[#49392E] hover:text-[#242321] underline underline-offset-4"
              >
                Order custom portrait statue →
              </Link>
            </div>
          </div>

          {/* CARD B: 3D PRINTING SERVICES */}
          <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E8DCCB] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#E8DCCB]/40 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />

            <div>
              {/* Category Pill */}
              <div className="flex items-center justify-between mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCCB] text-[#49392E] text-[11px] font-mono uppercase tracking-wider font-semibold">
                  <Cpu size={13} />
                  Professional Fabrication
                </span>
                <span className="text-xs font-mono text-[#8C8275]">02 / MANUFACTURING SERVICES</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-[#242321] mb-4">
                3D Printing & Manufacturing Services
              </h3>

              <p className="text-sm sm:text-base text-[#6F6B63] leading-relaxed mb-8">
                Have your own CAD model, STL or 3MF file? Our Tiruppur studio operates high-precision Bambu Lab 3D printers producing single prototypes to batch manufacturing runs.
              </p>

              {/* Showcase items */}
              <div className="space-y-3 mb-10">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">High-Speed PLA & PLA Pro+ Printing</span>
                    <span className="text-xs text-[#6F6B63]">Rigid, crisp layer definition for display parts, packaging studies, and enclosures.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Technical PETG & Functional Parts</span>
                    <span className="text-xs text-[#6F6B63]">Impact resistance, heat endurance, mechanical brackets and durable components.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Rapid Prototyping for Innovators</span>
                    <span className="text-xs text-[#6F6B63]">Fast design iterations from CAD files with tight dimensional tolerances.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#A58B70] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-[#242321] block">Bulk & Batch Production</span>
                    <span className="text-xs text-[#6F6B63]">Multi-machine capacity for small batches (10 to 500+ units) at commercial rates.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/3d-printing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors"
              >
                <span>Get a Printing Quote</span>
                <ArrowRight size={14} />
              </Link>
              <span className="text-xs font-mono text-[#6F6B63]">
                Accepts .STL, .3MF, .STEP files
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
