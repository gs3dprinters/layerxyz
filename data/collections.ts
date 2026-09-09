export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  productSlugs: string[];
  color: string;
}

export const COLLECTIONS: Collection[] = [
  {
    id: 'col_001',
    slug: 'sculptures',
    name: 'Sculptures',
    tagline: 'Objects with presence.',
    description: 'Abstract and architectural forms that command attention. Each sculpture is designed to exist as a standalone statement — objects that shift perception depending on where you stand.',
    productSlugs: ['sculptural-form-i', 'monolith-series', 'abstract-wave'],
    color: '#181818',
  },
  {
    id: 'col_002',
    slug: 'figurines',
    name: 'Figurines',
    tagline: 'Characters, people and ideas made physical.',
    description: 'From mythical creatures to contemplative figures and bespoke portrait statues, our figurine collection brings digital sculptures into the physical world with extraordinary detail and craftsmanship.',
    productSlugs: ['kala-portrait-statue', 'the-guardian', 'mythic-dragon', 'the-architect'],
    color: '#3F3D56',
  },
  {
    id: 'col_003',
    slug: 'home-objects',
    name: 'Home Objects',
    tagline: 'Functional objects with an unusual point of view.',
    description: 'Objects designed for daily life that refuse to be ordinary. Vases, planters, organizers and acoustic panels — each one balances function with distinctive form.',
    productSlugs: ['geometric-vessel', 'wave-diffuser', 'modular-planter', 'desk-organizer'],
    color: '#C4B5A0',
  },
  {
    id: 'col_004',
    slug: 'limited',
    name: 'Limited Objects',
    tagline: 'Small runs. Made to order.',
    description: 'Numbered editions and experimental pieces. These objects push the boundaries of what we can make and are produced in intentionally limited quantities.',
    productSlugs: ['celestial-sphere', 'kinetic-mobile'],
    color: '#8B4513',
  },
  {
    id: 'col_005',
    slug: 'custom',
    name: 'Custom',
    tagline: 'Nothing standard.',
    description: 'Have a design, a sketch, or an idea? We turn your vision into a physical object. From single prototypes to small production runs, every custom project is unique.',
    productSlugs: [],
    color: '#2A2A2A',
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find(c => c.slug === slug);
}

export function getCollectionProducts(slug: string) {
  const collection = getCollection(slug);
  if (!collection) return [];

  // Dynamic import to avoid circular dependency
  const { PRODUCTS } = require('./products');
  return collection.productSlugs
    .map((s: string) => PRODUCTS.find((p: { slug: string }) => p.slug === s))
    .filter(Boolean);
}
