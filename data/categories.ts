export type Subcategory = {
  slug: string;
  name: string;
  description?: string;
};

export type Category = {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  subcategories: Subcategory[];
  image: string;
  secondaryImage?: string;
  imageAlt: string;
  sourceType: 'category-reference' | 'approved-product-image' | 'fallback';
  sourceUrl: string;
  featured?: boolean;
};

export const CATEGORIES: Category[] = [
  {
    slug: 'gifts',
    name: 'Gifts',
    shortName: 'Gifts',
    description: 'Thoughtful objects made personal — from names and photographs to meaningful gifts created for someone special.',
    image: '/images/makerworld/gifts/gifts-01.webp',
    secondaryImage: '/images/makerworld/gifts/gifts-02.webp',
    imageAlt: 'Decorative personalized gift object and monogram desk keepsake',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/collections/76000',
    featured: true,
    subcategories: [
      { slug: 'personalized-gifts', name: 'Personalized Gifts', description: 'Custom-crafted personal gifts tailored with names, moments, and thoughtful details.' },
      { slug: 'name-photo-gifts', name: 'Name & Photo Gifts', description: 'Custom names, desk monograms, and photo-derived sculptural keepsakes.' },
      { slug: 'keychains', name: 'Keychains', description: 'Pocket-sized personalized tokens, custom initial keychains, and monogram tags.' },
      { slug: 'couple-gifts', name: 'Couple Gifts', description: 'Commemorative wedding, anniversary, and silhouette sculptures crafted for two.' },
      { slug: 'custom-gift-items', name: 'Custom Gift Items', description: 'Unique bespoke gifts made to order from customer ideas and concepts.' },
    ],
  },
  {
    slug: 'god-idols',
    name: 'God Idols',
    shortName: 'God Idols',
    description: 'Devotional sculptures and carefully crafted deity idols made for homes, prayer spaces and meaningful occasions.',
    image: '/images/makerworld/god-idols/god-idols-01.webp',
    secondaryImage: '/images/makerworld/god-idols/god-idols-02.webp',
    imageAlt: 'Devotional temple Nandi sculpture and sacred deity idol',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/3d-models?keyword=statue',
    featured: true,
    subcategories: [
      { slug: 'ganesha', name: 'Ganesha', description: 'Auspicious Ganesha statues in classical and contemporary sculptural styles.' },
      { slug: 'murugan', name: 'Murugan', description: 'Devotional Murugan sculptures crafted with traditional South Indian iconographic proportions.' },
      { slug: 'krishna', name: 'Krishna', description: 'Artistic Krishna sculptures designed for prayer spaces and home altars.' },
      { slug: 'shiva', name: 'Shiva', description: 'Iconic representations of Shiva, Nataraja, and sacred temple Nandi forms.' },
      { slug: 'lakshmi', name: 'Lakshmi', description: 'Serene Lakshmi deity idols crafted with fine surface definition.' },
      { slug: 'other-deity-idols', name: 'Other Deity Idols', description: 'Sacred deity sculptures, devotional forms, and traditional altar idols.' },
    ],
  },
  {
    slug: 'leaders-icons',
    name: 'Leaders & Icons',
    shortName: 'Leaders & Icons',
    description: 'Portrait sculptures celebrating influential leaders, cultural icons, historical personalities and people who shaped our world.',
    image: '/images/makerworld/leaders-icons/leaders-icons-01.webp',
    secondaryImage: '/images/makerworld/leaders-icons/leaders-icons-02.webp',
    imageAlt: 'Portrait sculpture commemorating historic cultural leader',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/3d-models?keyword=bust',
    featured: true,
    subcategories: [
      { slug: 'political-leaders', name: 'Political Leaders', description: 'Statues and portrait busts of prominent political figures and nation builders.' },
      { slug: 'social-reformers', name: 'Social Reformers', description: 'Commemorative sculptures honoring social visionaries, thinkers, and reformers.' },
      { slug: 'historical-personalities', name: 'Historical Personalities', description: 'Sculptural tributes to legendary historical rulers, scholars, and pioneers.' },
      { slug: 'tamil-icons', name: 'Tamil Icons', description: 'Celebrated cultural icons, literary greats, and historic personalities of Tamil heritage.' },
      { slug: 'famous-personalities', name: 'Famous Personalities', description: 'Iconic world personalities, innovators, and cultural figures.' },
    ],
  },
  {
    slug: 'costume-idols',
    name: 'Costume Idols',
    shortName: 'Costume Idols',
    description: 'Character-inspired figures, collectible sculptures and custom miniatures made for fans, collectors and creators.',
    image: '/images/makerworld/costume-idols/costume-idols-01.webp',
    secondaryImage: '/images/makerworld/costume-idols/costume-idols-02.webp',
    imageAlt: 'Stylized superhero character sculpture and display miniature',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/3d-models?keyword=character',
    featured: false,
    subcategories: [
      { slug: 'movie-characters', name: 'Movie Characters', description: 'Cinematic character figures and film-inspired sculptural display pieces.' },
      { slug: 'superheroes', name: 'Superheroes', description: 'Dynamic superhero figures and comic-inspired collectibles.' },
      { slug: 'action-figures', name: 'Action Figures', description: 'Detailed action figures and posed sculptural character models.' },
      { slug: 'custom-characters', name: 'Custom Characters', description: 'Bespoke original character designs sculpted from illustrations and sketches.' },
      { slug: 'character-miniatures', name: 'Character Miniatures', description: 'Tabletop and display-scale character miniatures.' },
    ],
  },
  {
    slug: 'home-decor',
    name: 'Home Décor',
    shortName: 'Home Décor',
    description: 'Sculptural objects and personalized décor designed to bring character, texture and individuality into your space.',
    image: '/images/makerworld/home-decor/home-decor-01.webp',
    secondaryImage: '/images/makerworld/home-decor/home-decor-02.webp',
    imageAlt: 'Contemporary sculptural architectural vessel and interior accent',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/collections/2257814-home-decor',
    featured: true,
    subcategories: [
      { slug: 'showpieces', name: 'Showpieces', description: 'Distinctive focal sculptures and architectural statement centerpieces.' },
      { slug: 'decorative-sculptures', name: 'Decorative Sculptures', description: 'Contemporary geometric, abstract, and figurative art pieces.' },
      { slug: 'table-decor', name: 'Table Décor', description: 'Tactile desk objects, sculptural vessels, trays, and organizers.' },
      { slug: 'wall-decor', name: 'Wall Décor', description: 'Textured wall reliefs, acoustic diffusion panels, and hanging sculptural forms.' },
      { slug: 'customized-decor', name: 'Customized Décor', description: 'Bespoke home accents tailored to interior dimensions and color palettes.' },
    ],
  },
  {
    slug: 'toys-figurines',
    name: 'Toys & Figurines',
    shortName: 'Toys & Figurines',
    description: 'Miniatures, collectible figures and custom figurines designed for display, gifting and personal collections.',
    image: '/images/makerworld/toys-figurines/toys-figurines-01.webp',
    secondaryImage: '/images/makerworld/toys-figurines/toys-figurines-02.webp',
    imageAlt: 'Collectible designer art toy miniature and display figurine',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/collections/1011481-toys',
    featured: false,
    subcategories: [
      { slug: 'miniatures', name: 'Miniatures', description: 'Precision scale miniatures and desktop display figures.' },
      { slug: 'collectible-figures', name: 'Collectible Figures', description: 'Art figurines, mythical beasts, and curated shelf collectibles.' },
      { slug: 'character-figures', name: 'Character Figures', description: 'Stylized character models and stylized collectible forms.' },
      { slug: 'custom-figurines', name: 'Custom Figurines', description: 'Personalized figurine commissions fabricated from custom files.' },
    ],
  },
  {
    slug: 'awards-trophies',
    name: 'Awards & Trophies',
    shortName: 'Awards & Trophies',
    description: 'Custom-made awards, trophies and mementos created for achievements, celebrations, businesses and special events.',
    image: '/images/makerworld/awards-trophies/awards-trophies-01.webp',
    secondaryImage: '/images/makerworld/awards-trophies/awards-trophies-02.webp',
    imageAlt: 'Geometric faceted achievement trophy and recognition award',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/more-models/prize-3d-print-model-download?orderBy=likeCount',
    featured: false,
    subcategories: [
      { slug: 'custom-trophies', name: 'Custom Trophies', description: 'Distinctive custom-designed trophies built around institutional logos and milestones.' },
      { slug: 'awards', name: 'Awards', description: 'Recognition plaques, physical accolades, and honor tokens.' },
      { slug: 'mementos', name: 'Mementos', description: 'Commemorative keepsakes designed for anniversaries, conferences, and celebrations.' },
      { slug: 'corporate-event-trophies', name: 'Corporate/Event Trophies', description: 'Branded event trophies and corporate celebration awards.' },
    ],
  },
  {
    slug: 'custom-creations',
    name: 'Custom Creations',
    shortName: 'Custom Creations',
    description: 'Have an idea that does not exist yet? Turn your reference, sketch, photograph or concept into a custom physical object.',
    image: '/images/makerworld/custom-creations/custom-creations-01.webp',
    secondaryImage: '/images/makerworld/custom-creations/custom-creations-02.webp',
    imageAlt: 'Bespoke custom portrait sculpture and personalized fabrication',
    sourceType: 'category-reference',
    sourceUrl: 'https://makerworld.com/en/3d-models?keyword=customizable',
    featured: true,
    subcategories: [
      { slug: 'custom-3d-models', name: 'Custom 3D Models', description: '3D printing from client CAD files, STL, OBJ, and 3MF datasets.' },
      { slug: 'personalized-designs', name: 'Personalized Designs', description: 'Custom modifications of existing models with unique dimensions, names, or textures.' },
      { slug: 'customer-provided-ideas', name: 'Customer-Provided Ideas', description: 'Concepts brought to reality from reference photographs, sketches, or physical samples.' },
      { slug: 'made-to-order-products', name: 'Made-to-Order Products', description: 'Bespoke one-off fabrications and small-batch production pieces.' },
    ],
  },
];

export function getAllCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return getCategoryBySlug(slug);
}

export function getSubcategory(categorySlug: string, subcategorySlug: string): Subcategory | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return category.subcategories.find((s) => s.slug === subcategorySlug);
}
