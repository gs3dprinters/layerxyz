import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getCategoryProductCount } from '@/data/products';

export const metadata: Metadata = {
  title: 'Shop by Category — 3D Printed Objects, Idols & Custom Gifts | Layerxyz',
  description: 'Explore objects made for gifting, devotion, collecting, decorating and creating something completely your own across 8 specialized categories.',
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-mono tracking-wider uppercase text-[#6F6B63] mb-8 flex items-center gap-2"
        >
          <Link href="/" className="hover:text-[#171716] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#171716] font-medium">Categories</span>
        </nav>

        {/* Header */}
        <header className="mb-14 sm:mb-20 max-w-3xl">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            CURATED DISCIPLINES • 8 CORE CATEGORIES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4 leading-tight">
            SHOP BY CATEGORY
          </h1>
          <p className="text-base sm:text-lg text-[#5A5750] leading-relaxed font-normal">
            Explore objects made for gifting, devotion, collecting, decorating and creating something completely your own.
          </p>
        </header>

        {/* 8 Categories Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {CATEGORIES.map((category, index) => {
            const catIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            const count = getCategoryProductCount(category.slug);

            return (
              <div
                key={category.slug}
                className="group flex flex-col justify-between rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] p-8 sm:p-10 transition-all duration-300 hover:border-[#171716]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Card Header: Index & Count */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="text-xs font-mono tracking-widest uppercase text-[#8E8B83] px-3 py-1 rounded-full bg-white border border-[#E8E5DE]">
                      CATEGORY {catIndex}
                    </span>
                    <span className="text-xs font-mono text-[#6F6B63]">
                      {count > 0 ? `${count} ${count === 1 ? 'OBJECT' : 'OBJECTS'}` : 'MADE TO ORDER'}
                    </span>
                  </div>

                  {/* Optional Image Banner if available */}
                  {category.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-white border border-[#E8E5DE] mb-6">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Category Title & Description */}
                  <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] tracking-tight mb-3 group-hover:text-black transition-colors">
                    {category.name}
                  </h2>

                  <p className="text-sm text-[#5A5750] leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Subcategory Chips */}
                  <div className="mb-8 pt-5 border-t border-[#E8E5DE]/80">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-3 font-semibold">
                      COLLECTIONS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/categories/${category.slug}?subcategory=${sub.slug}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-[#4A4740] border border-[#E8E5DE] hover:border-[#171716]/40 hover:text-[#171716] transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-[#E8E5DE]/80 flex items-center justify-between">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#171716] font-semibold group-hover:translate-x-1 transition-transform"
                  >
                    EXPLORE {category.name.toUpperCase()}
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href={`/custom?category=${category.slug}`}
                    className="text-xs font-mono uppercase tracking-wider text-[#8E8B83] hover:text-[#171716] transition-colors"
                  >
                    Custom Request →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bespoke Callout */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#181817] text-[#F4F1EA] flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-lg">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#A09D95] flex items-center gap-1.5 mb-2">
              <Sparkles size={13} />
              STUDIO BESPOKE COMMISSIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white mb-2">
              Have a concept not listed here?
            </h2>
            <p className="text-sm text-[#A09D95] leading-relaxed">
              We produce custom physical objects from reference photos, 3D files (.stl, .obj, .step), sketches, or customer ideas in our studio.
            </p>
          </div>
          <Link
            href="/custom"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[#181817] text-xs font-mono uppercase tracking-wider hover:bg-[#EAE6DD] transition-colors whitespace-nowrap self-start md:self-auto font-medium"
          >
            START A PROJECT
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
