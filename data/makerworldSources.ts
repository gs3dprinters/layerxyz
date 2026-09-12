/**
 * Layerxyz MakerWorld Source & Attribution Registry
 *
 * This file maintains discovery references, attribution details, and usage categories
 * for visual references inspired by or sourced from public MakerWorld collections.
 *
 * Attribution Rules:
 * - No MakerWorld models are presented as Layerxyz products.
 * - Creator names and licenses are recorded only when explicitly verified.
 * - Usage type indicates whether an asset is a reference, product image, or studio fallback.
 */

export type MakerWorldSource = {
  category: string;
  title: string;
  sourceUrl: string;
  imageUrl?: string;
  creator?: string;
  license?: string;
  usage: 'category-reference' | 'approved-product-image' | 'fallback';
  attributionRequired: boolean;
  notes?: string;
};

export const MAKERWORLD_SOURCES: Record<string, MakerWorldSource[]> = {
  gifts: [
    {
      category: 'gifts',
      title: 'MakerWorld Gift Ideas Curated Collection',
      sourceUrl: 'https://makerworld.com/en/collections/76000',
      imageUrl: '/images/makerworld/gifts/gifts-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Curated collection reference for personalized gifts and desk tokens. Local studio render used as primary visual asset.',
    },
    {
      category: 'gifts',
      title: 'Personalized Typographic & Monogram Objects',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=personalized',
      imageUrl: '/images/makerworld/gifts/gifts-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Visual reference for personalized nameplates, initial keepsakes, and commemorative gifts.',
    },
  ],

  'god-idols': [
    {
      category: 'god-idols',
      title: 'Devotional Statues & Ganesha Sculptures',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=ganesha',
      imageUrl: '/images/makerworld/god-idols/god-idols-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Auspicious deity sculpture reference. Layerxyz studio temple sculpture render used as primary asset.',
    },
    {
      category: 'god-idols',
      title: 'Sacred Temple Sculptures & Deity Idols',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=statue',
      imageUrl: '/images/makerworld/god-idols/god-idols-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'References for Shiva, Murugan, Krishna, and traditional iconographic bronzes.',
    },
  ],

  'leaders-icons': [
    {
      category: 'leaders-icons',
      title: 'Portrait Sculptures & Commemorative Busts',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=bust',
      imageUrl: '/images/makerworld/leaders-icons/leaders-icons-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Commemorative portrait bust reference. Layerxyz studio bronze portrait render used as primary asset.',
    },
    {
      category: 'leaders-icons',
      title: 'Historical Figures & Iconic Personalities',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=portrait',
      imageUrl: '/images/makerworld/leaders-icons/leaders-icons-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Visual reference for cultural icons and commemorative figures.',
    },
  ],

  'costume-idols': [
    {
      category: 'costume-idols',
      title: 'Character Miniatures & Pop-Culture Figurines',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=character',
      imageUrl: '/images/makerworld/costume-idols/costume-idols-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Cinematic character and superhero display sculpture reference. Layerxyz studio render used.',
    },
    {
      category: 'costume-idols',
      title: 'Action Figures & Heroic Sculptures',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=superhero',
      imageUrl: '/images/makerworld/costume-idols/costume-idols-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Dynamic action pose visual inspiration for comic and movie character figurines.',
    },
  ],

  'home-decor': [
    {
      category: 'home-decor',
      title: 'MakerWorld Home Décor Curated Collection',
      sourceUrl: 'https://makerworld.com/en/collections/2257814-home-decor',
      imageUrl: '/images/makerworld/home-decor/home-decor-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Contemporary geometric home decor reference. Studio sculptural piece render used as primary asset.',
    },
    {
      category: 'home-decor',
      title: 'Architectural Vessels & Interior Sculptures',
      sourceUrl: 'https://makerworld.com/en/3d-models/401-decor',
      imageUrl: '/images/makerworld/home-decor/home-decor-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Curated reference for organic vases, centerpieces, and decorative display objects.',
    },
  ],

  'toys-figurines': [
    {
      category: 'toys-figurines',
      title: 'MakerWorld Toys & Collectibles Curated Collection',
      sourceUrl: 'https://makerworld.com/en/collections/1011481-toys',
      imageUrl: '/images/makerworld/toys-figurines/toys-figurines-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Display miniatures and desk figurine inspiration. Studio miniature sculpture render used as primary asset.',
    },
    {
      category: 'toys-figurines',
      title: 'Collectible Tabletop Figurines & Stylized Forms',
      sourceUrl: 'https://makerworld.com/en/collections/2658995',
      imageUrl: '/images/makerworld/toys-figurines/toys-figurines-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Collectible toy figures and stylized art toys visual reference.',
    },
  ],

  'awards-trophies': [
    {
      category: 'awards-trophies',
      title: 'Prize & Award 3D Print Model Collection',
      sourceUrl: 'https://makerworld.com/en/more-models/prize-3d-print-model-download?orderBy=likeCount',
      imageUrl: '/images/makerworld/awards-trophies/awards-trophies-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Recognition trophy and geometric award visual reference. Studio custom trophy render used as primary asset.',
    },
    {
      category: 'awards-trophies',
      title: 'Corporate Mementos & Achievement Awards',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=trophy',
      imageUrl: '/images/makerworld/awards-trophies/awards-trophies-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Customizable achievement pedestals and event recognition tokens.',
    },
  ],

  'custom-creations': [
    {
      category: 'custom-creations',
      title: 'Customizable & Parametric 3D Creations',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=customizable',
      imageUrl: '/images/makerworld/custom-creations/custom-creations-01.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Bespoke custom 3D model commissions reference. Studio custom portrait render used as primary asset.',
    },
    {
      category: 'custom-creations',
      title: 'Personalized Bespoke Designs & Customer Ideas',
      sourceUrl: 'https://makerworld.com/en/3d-models?keyword=custom%20design',
      imageUrl: '/images/makerworld/custom-creations/custom-creations-02.webp',
      usage: 'category-reference',
      attributionRequired: false,
      notes: 'Concept-to-physical object custom fabrication reference.',
    },
  ],
};

export function getCategorySources(categorySlug: string): MakerWorldSource[] {
  return MAKERWORLD_SOURCES[categorySlug] || [];
}

export function getAllSources(): MakerWorldSource[] {
  return Object.values(MAKERWORLD_SOURCES).flat();
}
