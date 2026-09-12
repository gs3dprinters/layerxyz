import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Layers, Sparkles, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Categories & Specialized Fabrications | Layerxyz',
  description: 'Explore all 8 categories of custom 3D printing and fabrication: Gifts, God Idols, Leaders & Icons, Costume Idols, Home Décor, Toys & Figurines, Awards & Trophies, and Custom Creations.',
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono tracking-wider uppercase text-[#6F6B63] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#171716] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#171716] font-medium">Categories</span>
        </nav>

        {/* Master Header */}
        <header className="mb-14 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            DISCIPLINES & PRODUCT SUITES • 8 CATEGORIES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
            CATEGORIES
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl font-normal leading-relaxed">
            Every category represents a specialized fabrication pipeline at Layerxyz. Whether sacred devotional idols, commemorative leadership busts, or bespoke architectural showpieces, each object is engineered with tailored substrates and hand-finished precision.
          </p>
        </header>

        {/* 8 Categories Detailed Directory */}
        <div className="space-y-12">
          {CATEGORIES.map((category, index) => {
            const catIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            return (
              <section
                key={category.id}
                id={category.slug}
                className="rounded-3xl bg-[#FAFAF8] border border-[#E8E5DE] p-8 sm:p-10 lg:p-12 transition-all hover:border-[#D4D0C8] shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column: Category Narrative, Specs & Subcategories */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono tracking-widest uppercase text-[#8E8B83] px-3 py-1 rounded-full bg-white border border-[#E8E5DE]">
                          CATEGORY {catIndex}
                        </span>
                        <span className="text-xs font-mono text-[#6F6B63]">
                          Starting from {formatPrice(category.startingPrice)}
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-sans font-semibold text-[#171716] tracking-tight mb-2">
                        {category.name}
                      </h2>

                      <p className="text-base font-medium text-[#4A4740] mb-4">
                        {category.tagline}
                      </p>

                      <p className="text-sm text-[#6F6B63] leading-relaxed mb-6">
                        {category.description}
                      </p>

                      {/* Exact Subcategories Required by User */}
                      <div className="mb-6 pt-5 border-t border-[#E8E5DE]">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-3 font-semibold">
                          SPECIALIZED SUB-CATEGORIES
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.map((sub) => (
                            <span
                              key={sub}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#171716] border border-[#E8E5DE] shadow-xs"
                            >
                              <CheckCircle2 size={12} className="text-[#8E8B83]" />
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Technical Specs Strip */}
                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/70 border border-[#E8E5DE] text-xs">
                        <div className="flex items-start gap-2">
                          <Clock size={14} className="text-[#8E8B83] mt-0.5 shrink-0" />
                          <div>
                            <span className="block text-[10px] font-mono uppercase text-[#8E8B83]">Lead Time</span>
                            <span className="font-medium text-[#171716]">{category.leadTime}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Layers size={14} className="text-[#8E8B83] mt-0.5 shrink-0" />
                          <div>
                            <span className="block text-[10px] font-mono uppercase text-[#8E8B83]">Substrates</span>
                            <span className="font-medium text-[#171716] truncate block">{category.materials.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <Link
                        href={`/categories/${category.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#171716] text-[#F4F1EA] text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors"
                      >
                        VIEW {category.name.toUpperCase()} CATALOGUE
                        <ArrowRight size={14} />
                      </Link>
                      <Link
                        href={`/start-a-project?category=${category.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white border border-[#E8E5DE] text-[#171716] text-xs font-mono uppercase tracking-wider hover:border-[#D4D0C8] hover:bg-[#F9F7F2] transition-colors"
                      >
                        COMMISSION BESPOKE
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Category-Specific Product Showcase */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E5DE]">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#6F6B63] font-medium">
                        CATEGORY-SPECIFIC PRODUCT DETAILS
                      </span>
                      <Link
                        href={`/categories/${category.slug}`}
                        className="text-xs font-mono uppercase text-[#171716] hover:text-[#6F6B63] transition-colors"
                      >
                        SEE ALL ({category.products.length}) →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {category.products.map((product) => (
                        <div
                          key={product.id}
                          className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-[#E8E5DE] hover:border-[#171716]/30 hover:shadow-xs transition-all duration-300"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-[10px] font-mono tracking-wider uppercase text-[#8E8B83] px-2.5 py-0.5 rounded-full bg-[#F4F1EA] border border-[#E8E5DE] truncate">
                                {product.subcategory}
                              </span>
                              {product.badge && (
                                <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#171716] text-white font-medium">
                                  {product.badge}
                                </span>
                              )}
                            </div>

                            <h3 className="text-base font-semibold text-[#171716] group-hover:text-black transition-colors mb-1.5">
                              {product.name}
                            </h3>

                            <p className="text-xs text-[#6F6B63] line-clamp-2 leading-relaxed mb-4">
                              {product.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-[#F0ECE4] space-y-2">
                            <div className="text-[11px] text-[#8E8B83] flex items-center justify-between">
                              <span>Dim: {product.dimensions}</span>
                              <span className="truncate max-w-[120px]">{product.materials[0]}</span>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm font-semibold text-[#171716]">
                                  {product.pricePrefix || ''}{formatPrice(product.price)}
                                </span>
                                {product.comparePrice && (
                                  <span className="text-xs text-[#8E8B83] line-through">
                                    {formatPrice(product.comparePrice)}
                                  </span>
                                )}
                              </div>
                              <Link
                                href={`/categories/${category.slug}#${product.slug}`}
                                className="inline-flex items-center gap-1 text-xs font-mono uppercase text-[#171716] group-hover:translate-x-0.5 transition-transform font-medium"
                              >
                                SPEC DETAILS
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom Custom Project Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#181817] text-[#F4F1EA] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#A09D95] flex items-center gap-1.5 mb-2">
              <Sparkles size={13} />
              STUDIO BESPOKE COMMISSIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-white mb-2">
              Have a category or concept not listed here?
            </h2>
            <p className="text-sm text-[#A09D95] leading-relaxed">
              Layerxyz operates a fully equipped digital prototyping and custom fabrication studio in Tiruppur. We welcome custom files (.stl, .obj, .step), photographs, or raw sketches for made-to-order production.
            </p>
          </div>
          <Link
            href="/start-a-project"
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
