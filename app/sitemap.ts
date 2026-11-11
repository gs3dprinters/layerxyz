import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { COLLECTIONS } from '@/data/collections';
import { CATEGORIES } from '@/data/categories';
import { PROJECTS } from '@/data/projects';
import { STUDIO_INFO } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = STUDIO_INFO.siteUrl;

  const staticRoutes = [
    '',
    '/shop',
    '/categories',
    '/custom-statues',
    '/3d-printing',
    '/custom',
    '/collections',
    '/3d-studio',
    '/about',
    '/work',
    '/cart',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/custom-statues' || route === '/3d-printing' ? 0.95 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const collectionRoutes = COLLECTIONS.map((collection) => ({
    url: `${baseUrl}/collections/${collection.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...projectRoutes,
  ];
}
