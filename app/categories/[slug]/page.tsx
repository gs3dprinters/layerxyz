import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CATEGORIES, getCategoryBySlug } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import { CategoryDetailClient } from '@/components/sections/CategoryDetailClient';

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return {
      title: 'Category Not Found | Layerxyz',
    };
  }

  return {
    title: `${category.name} — 3D Printed Objects & Custom Fabrication | Layerxyz`,
    description: category.description,
    keywords: [
      category.name,
      ...category.subcategories.map((s) => s.name),
      '3D printing',
      'custom 3D models',
      'Layerxyz',
      'Tiruppur',
    ],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const category = getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const initialProducts = getProductsByCategory(category.slug);

  const allCategories = CATEGORIES.map((c) => ({
    slug: c.slug,
    name: c.name,
  }));

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
          <Link href="/categories" className="hover:text-[#171716] transition-colors">
            Categories
          </Link>
          <span>/</span>
          <span className="text-[#171716] font-medium">{category.name}</span>
        </nav>

        {/* Client Interactive Category Experience */}
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs font-mono uppercase text-[#8E8B83]">Loading Category...</div>}>
          <CategoryDetailClient
            category={category}
            initialProducts={initialProducts}
            allCategories={allCategories}
          />
        </Suspense>
      </div>
    </div>
  );
}
