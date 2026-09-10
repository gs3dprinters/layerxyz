import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCollection, COLLECTIONS } from '@/data/collections';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/ui/ProductGrid';
import { notFound, redirect } from 'next/navigation';

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const collection = getCollection(resolvedParams.slug);
  if (!collection) return { title: 'Collection Not Found | Layerxyz' };
  
  return {
    title: `${collection.name} | Layerxyz`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  if (resolvedParams.slug === 'custom') {
    redirect('/custom');
  }

  const collection = getCollection(resolvedParams.slug);
  if (!collection) {
    notFound();
  }

  const collectionProducts = PRODUCTS.filter(p => collection.productSlugs?.includes(p.slug));

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono tracking-wider uppercase text-[#6F6B63] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#171716] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#171716] transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-[#171716] font-medium">{collection.name}</span>
        </nav>

        {/* Hero visual banner */}
        <header className="mb-16 md:mb-20 rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#E8E5DE] relative overflow-hidden bg-gradient-to-br from-white/90 to-[#EFECE5]/80 shadow-xs">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#E8E5DE] text-[11px] font-mono uppercase tracking-widest text-[#6F6B63] mb-6">
              <span>COLLECTION SERIES</span>
              <span>•</span>
              <span>{collectionProducts.length} OBJECTS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4 leading-tight">
              {collection.name}
            </h1>
            <p className="text-lg sm:text-xl text-[#6F6B63] mb-6 font-medium">
              {collection.tagline}
            </p>
            <p className="text-sm sm:text-base text-[#55524B] leading-relaxed max-w-2xl">
              {collection.description}
            </p>
          </div>
        </header>

        {/* Product Grid */}
        <ProductGrid products={collectionProducts} />

        {/* Bottom Custom CTA */}
        <section className="mt-28 py-20 border-t border-[#E8E5DE] text-center">
          <div className="max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-4 font-medium">
              BESPOKE EDITIONS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-6 leading-tight">
              CREATE SOMETHING THAT DOESN&apos;T EXIST YET.
            </h2>
            <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed mb-10">
              Have a photograph, sketch, CAD file or idea that isn&apos;t in the collection? Work directly with the Layerxyz studio to create a bespoke physical object.
            </p>
            <Link
              href="/custom"
              className="inline-flex justify-center items-center gap-2 px-9 py-4 bg-[#181817] text-[#F4F1EA] font-medium hover:bg-[#2A2A28] transition-colors rounded-full text-sm tracking-wide shadow-sm"
            >
              START A CUSTOM PROJECT
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
