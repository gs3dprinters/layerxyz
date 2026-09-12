import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { getCategoryProductCount } from '@/data/products';
import { CategoryImage } from '@/components/ui/CategoryImage';

export const metadata: Metadata = {
  title: 'Shop by Category — 3D Printed Objects, Idols & Custom Gifts | Layerxyz',
  description:
    'Explore objects made for gifting, devotion, collecting, decorating and creating something completely your own across 8 specialized categories.',
};

export default function CategoriesPage() {
  const featuredCategories = CATEGORIES.slice(0, 2);
  const regularCategories = CATEGORIES.slice(2);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* 1. Premium Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-mono tracking-wider uppercase text-[#6F6B63] mb-8 flex items-center gap-2"
        >
          <Link href="/" className="hover:text-[#171716] transition-colors focus-visible:ring-1 focus-visible:ring-[#171716] rounded-xs">
            HOME
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-[#171716] font-medium">CATEGORIES</span>
        </nav>

        {/* 2 & 3. Hero & Supporting Copy */}
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

        {/* 4. Eight Visual Category Cards - Asymmetric Editorial Grid */}

        {/* Top Tier: 2 Featured Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-8 sm:mb-10">
          {featuredCategories.map((category, idx) => {
            const catIndex = `0${idx + 1}`;
            const count = getCategoryProductCount(category.slug);

            return (
              <article
                key={category.slug}
                className="group flex flex-col justify-between rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[#171716]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
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

                  {/* Primary Category Visual */}
                  <div className="mb-6">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#171716] rounded-2xl"
                    >
                      <CategoryImage
                        src={category.image}
                        fallbackSrc={category.secondaryImage}
                        alt={category.imageAlt}
                        aspectRatio="16/10"
                        priority={true}
                      />
                    </Link>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] tracking-tight mb-3">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="hover:text-black transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#171716] rounded-sm"
                    >
                      {category.name}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#5A5750] leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Subcategory Navigation Pills */}
                  <div className="mb-8 pt-5 border-t border-[#E8E5DE]/80">
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/categories/${category.slug}?subcategory=${sub.slug}`}
                          className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#4A4740] border border-[#E8E5DE] hover:border-[#171716]/40 hover:text-[#171716] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#171716]"
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
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#171716] font-semibold group-hover:translate-x-1 transition-transform focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#171716] rounded-xs"
                  >
                    Explore category
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href={`/custom?category=${category.slug}`}
                    className="text-xs font-mono uppercase tracking-wider text-[#8E8B83] hover:text-[#171716] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#171716] rounded-xs"
                  >
                    Custom Request →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Second Tier: 6 Balanced Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {regularCategories.map((category, idx) => {
            const catIndex = `0${idx + 3}`;
            const count = getCategoryProductCount(category.slug);

            return (
              <article
                key={category.slug}
                className="group flex flex-col justify-between rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] p-6 sm:p-7 transition-all duration-300 hover:border-[#171716]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <div>
                  {/* Card Header: Index & Count */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#8E8B83] px-2.5 py-0.5 rounded-full bg-white border border-[#E8E5DE]">
                      CATEGORY {catIndex}
                    </span>
                    <span className="text-xs font-mono text-[#6F6B63]">
                      {count > 0 ? `${count} ${count === 1 ? 'OBJECT' : 'OBJECTS'}` : 'MADE TO ORDER'}
                    </span>
                  </div>

                  {/* Category Image */}
                  <div className="mb-5">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="block focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#171716] rounded-2xl"
                    >
                      <CategoryImage
                        src={category.image}
                        fallbackSrc={category.secondaryImage}
                        alt={category.imageAlt}
                        aspectRatio="4/3"
                      />
                    </Link>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-xl sm:text-2xl font-sans font-semibold text-[#171716] tracking-tight mb-2">
                    <Link
                      href={`/categories/${category.slug}`}
                      className="hover:text-black transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#171716] rounded-sm"
                    >
                      {category.name}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5A5750] leading-relaxed mb-5 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Subcategory Pills */}
                  <div className="mb-6 pt-4 border-t border-[#E8E5DE]/80">
                    <div className="flex flex-wrap gap-1.5">
                      {category.subcategories.slice(0, 4).map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/categories/${category.slug}?subcategory=${sub.slug}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white text-[#4A4740] border border-[#E8E5DE] hover:border-[#171716]/40 hover:text-[#171716] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#171716]"
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
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#171716] font-semibold group-hover:translate-x-1 transition-transform focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#171716] rounded-xs"
                  >
                    Explore category
                    <ArrowRight size={13} />
                  </Link>

                  <Link
                    href={`/custom?category=${category.slug}`}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#8E8B83] hover:text-[#171716] transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#171716] rounded-xs"
                  >
                    Custom Request →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Studio Bespoke Commissions Callout */}
        <section
          aria-label="Custom commission"
          className="p-8 sm:p-12 rounded-3xl bg-[#181817] text-[#F4F1EA] flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-lg"
        >
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
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[#181817] text-xs font-mono uppercase tracking-wider hover:bg-[#EAE6DD] transition-colors whitespace-nowrap self-start md:self-auto font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
          >
            START A PROJECT
            <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </div>
  );
}
