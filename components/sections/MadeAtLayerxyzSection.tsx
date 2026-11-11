'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Ruler, Layers, Palette } from 'lucide-react';
import { getProductWhatsAppUrl } from '@/lib/utils';

interface CompletedProject {
  title: string;
  category: string;
  dimensions: string;
  material: string;
  finishing: string;
  description: string;
  image: string;
  badge?: string;
  productSlug?: string;
}

const COMPLETED_WORKS: CompletedProject[] = [
  {
    title: 'Custom Portrait Sculpture',
    category: 'Custom Human Statue',
    dimensions: '10" Height (~250 mm)',
    material: 'Studio PLA Pro+',
    finishing: 'Warm Sandstone Matte',
    description: 'Digitally sculpted from customer reference photographs to achieve facial fidelity, realistic expression, and balanced bust proportions.',
    image: '/images/products/custom-portrait-sculpture/primary.webp',
    badge: 'ACTUAL STUDIO PRINT',
    productSlug: 'custom-portrait-sculpture',
  },
  {
    title: 'Kala Commemorative Statue',
    category: 'Personalised Figurine',
    dimensions: '12" Height (~305 mm)',
    material: 'High-Density Studio PLA',
    finishing: 'Ebony Matte with Plinth',
    description: 'Photographic conversion sculpture capturing posture and expression, mounted on an integrated solid studio plinth.',
    image: '/images/products/kala-portrait-statue/primary.webp',
    badge: 'ACTUAL STUDIO PRINT',
    productSlug: 'custom-portrait-sculpture',
  },
  {
    title: 'Nandi Sacred Temple Sculpture',
    category: 'Hindu Deity Idol',
    dimensions: '8" Length (~200 mm)',
    material: 'Studio PLA Pro+',
    finishing: 'Chola Bronze Patina',
    description: 'Classical South Indian temple iconography featuring delicate bell garlands, ornate saddle drape, and sculpted pedestal.',
    image: '/images/products/heritage-nandi-sculpture/primary.webp',
    badge: 'ACTUAL STUDIO PRINT',
    productSlug: 'heritage-nandi-sculpture',
  },
  {
    title: 'Toothbrush Slider Holder',
    category: 'Home Décor & Utility',
    dimensions: '140 × 40 × 35 mm',
    material: 'Studio PLA',
    finishing: 'Obsidian Black Matte',
    description: 'Minimalist bathroom organizer featuring a smooth integrated sliding mechanism for dust-free everyday storage.',
    image: '/images/products/toothbrush-slider-holder/primary.webp',
    badge: 'ACTUAL STUDIO PRINT',
    productSlug: 'toothbrush-slider-holder',
  },
  {
    title: 'Elderly Woman Heritage Bust',
    category: 'Custom Portrait Sculpture',
    dimensions: '10" Height (~250 mm)',
    material: 'Studio PLA Pro+',
    finishing: 'Sandstone Studio Finish',
    description: 'Bespoke family tribute sculpted from vintage customer photographs, preserving natural facial features and traditional attire drape.',
    image: '/images/products/custom-portrait-sculpture/gallery-02.webp',
    badge: 'ACTUAL STUDIO PRINT',
    productSlug: 'custom-portrait-sculpture',
  },
  {
    title: 'Nataraja Statement Sculpture',
    category: 'Deity Sculpture',
    dimensions: '18" Height (~455 mm)',
    material: 'Studio PLA Pro+',
    finishing: 'Antique Bronze Effect',
    description: 'Cosmic dancer form with complex flame ring geometry, balanced stance, and crisp layer definition produced on Bambu Lab machines.',
    image: '/images/products/nataraja-statement-sculpture.jpg',
    badge: 'ACTUAL STUDIO PRINT',
    productSlug: 'nataraja-statement-sculpture',
  },
];

export default function MadeAtLayerxyzSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProject = COMPLETED_WORKS[selectedIdx];

  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            PROOF OF CRAFTSMANSHIP
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#242321] uppercase">
                MADE AT LAYER XYZ
              </h2>
              <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl mt-4 leading-relaxed font-normal">
                An editorial showcase of genuine completed works produced at our studio in Tiruppur. We combine digital 3D sculpting, high-precision additive fabrication, and meticulous hand-finishing.
              </p>
            </div>
            <Link
              href="/custom-statues"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors whitespace-nowrap self-start lg:self-auto"
            >
              <span>Commission a Custom Piece</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPLETED_WORKS.map((work, idx) => (
            <div
              key={idx}
              className="bg-[#F5F0E8] rounded-3xl overflow-hidden border border-[#E8DCCB] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Photograph */}
              <div className="relative aspect-square w-full bg-[#E8DCCB]/30 overflow-hidden">
                <Image
                  src={work.image}
                  alt={`${work.title} - ${work.category} made by Layer XYZ`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
                {work.badge && (
                  <div className="absolute top-4 left-4 bg-[#242321]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#F5F0E8]">
                    {work.badge}
                  </div>
                )}
              </div>

              {/* Technical Specifications & Description */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8275] uppercase tracking-wider mb-2">
                    <span>{work.category}</span>
                  </div>

                  <h3 className="text-xl font-sans font-semibold text-[#242321] mb-3">
                    {work.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6F6B63] leading-relaxed mb-6">
                    {work.description}
                  </p>

                  {/* Specifications Table */}
                  <div className="bg-white/80 rounded-2xl p-4 border border-[#E8DCCB] space-y-2 mb-6 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C8275] flex items-center gap-1.5 font-mono">
                        <Ruler size={13} />
                        Dimensions
                      </span>
                      <span className="font-semibold text-[#242321]">{work.dimensions}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#8C8275] flex items-center gap-1.5 font-mono">
                        <Layers size={13} />
                        Material
                      </span>
                      <span className="font-medium text-[#242321]">{work.material}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#8C8275] flex items-center gap-1.5 font-mono">
                        <Palette size={13} />
                        Finishing
                      </span>
                      <span className="font-medium text-[#242321]">{work.finishing}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="pt-3 border-t border-[#E8DCCB] flex items-center justify-between">
                  {work.productSlug ? (
                    <Link
                      href={`/product/${work.productSlug}`}
                      className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold hover:text-[#A58B70] transition-colors flex items-center gap-1"
                    >
                      <span>View Specifications</span>
                      <ArrowRight size={13} />
                    </Link>
                  ) : (
                    <Link
                      href="/custom-statues"
                      className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold hover:text-[#A58B70] transition-colors flex items-center gap-1"
                    >
                      <span>Inquire Custom Piece</span>
                      <ArrowRight size={13} />
                    </Link>
                  )}

                  <a
                    href={getProductWhatsAppUrl({ productName: work.title, slug: work.productSlug })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#25D366] hover:underline"
                  >
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
