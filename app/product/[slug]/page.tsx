import { getProduct, getRelatedProducts, PRODUCTS } from '@/data/products';
import ProductClient from './ProductClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);
  if (!product) return { title: 'Product Not Found | Layerxyz' };
  
  return {
    title: `${product.name} | Layerxyz`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProduct(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
