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
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-b border-[#E8E5DE] pb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#181818] mb-4">
              {collection.name}
            </h1>
            <p className="text-xl text-[#777777] mb-6">
              {collection.tagline}
            </p>
            <p className="text-[#2A2A2A] leading-relaxed">
              {collection.description}
            </p>
          </div>
          <div className="text-sm font-medium text-[#181818] bg-white px-4 py-2 rounded-full border border-[#E8E5DE]">
            {collectionProducts.length} Objects
          </div>
        </header>

        <ProductGrid products={collectionProducts} />
      </div>
    </div>
  );
}
