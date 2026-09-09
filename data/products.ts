export interface ProductSize {
  label: string;
  dimensions: string;
  price: number;
}

export interface ProductMaterial {
  label: string;
  slug: string;
}

export interface ProductFinish {
  label: string;
  slug: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  comparePrice?: number;
  category: 'sculptures' | 'figurines' | 'home' | 'collectibles' | 'limited';
  images: string[];
  model?: string;
  hasModel?: boolean;
  modelUrl?: string;
  color?: string;
  isMadeToOrder?: boolean;
  dimensions?: string;
  weight?: string;
  sizes: ProductSize[];
  materials: ProductMaterial[];
  finishes: ProductFinish[];
  available: boolean;
  madeToOrder: boolean;
  badge?: string;
  details: {
    description: string;
    shipping: string;
    care: string;
    specifications?: string;
  };
  colors: string[];
  relatedSlugs: string[];
}

const BASE_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    slug: 'sculptural-form-i',
    name: 'Sculptural Form I',
    description: 'Abstract organic sculpture with flowing geometry.',
    longDescription: 'An exploration of organic form and mathematical precision. Sculptural Form I captures the tension between natural curves and deliberate structure, creating a presence that shifts with perspective. Each piece is printed at ultra-fine resolution and hand-finished to achieve a smooth, gallery-quality surface.',
    price: 4990,
    comparePrice: 5990,
    category: 'sculptures',
    images: ['/images/products/sculptural-form-1.jpg'],
    model: '/models/sculpture-01.glb',
    sizes: [
      { label: 'S', dimensions: '120 × 80 × 80 mm', price: 2990 },
      { label: 'M', dimensions: '200 × 130 × 130 mm', price: 4990 },
      { label: 'L', dimensions: '350 × 220 × 220 mm', price: 9990 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Raw Layer', slug: 'raw-layer' },
      { label: 'Satin Sealed', slug: 'satin-sealed' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'New',
    details: {
      description: 'Sculptural Form I is part of our ongoing series exploring the boundary between digital design and physical presence. Each piece begins as a parametric model, refined through dozens of iterations before being committed to material.',
      shipping: 'Made to order. Ships within 7–12 business days. Carefully packaged in custom foam-lined boxes. Free shipping on orders above ₹5,000.',
      care: 'Display indoors away from direct sunlight. Dust with a soft, dry cloth. Avoid moisture and harsh chemicals.',
      specifications: 'Resolution: 0.08mm layers · Infill: 40% gyroid · Wall thickness: 1.6mm · Post-processing: Sanded, primed, sealed',
    },
    colors: ['#1E1E1E', '#ECEAE4', '#8B8680'],
    relatedSlugs: ['abstract-wave', 'monolith-series', 'geometric-vessel'],
  },
  {
    id: 'prod_002',
    slug: 'the-guardian',
    name: 'The Guardian',
    description: 'Detailed character figurine with intricate armor.',
    longDescription: 'The Guardian stands as a testament to what modern fabrication can achieve. Originally sculpted digitally by our in-house team, every surface detail — from the layered plate armor to the flowing cape texture — is resolved at sub-50-micron precision using high-detail resin.',
    price: 3490,
    category: 'figurines',
    images: ['/images/products/the-guardian.jpg'],
    model: '/models/guardian.glb',
    sizes: [
      { label: 'S', dimensions: '100 × 60 × 60 mm', price: 1990 },
      { label: 'M', dimensions: '180 × 100 × 100 mm', price: 3490 },
      { label: 'L', dimensions: '300 × 170 × 170 mm', price: 7990 },
    ],
    materials: [
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Hand-Painted', slug: 'hand-painted' },
      { label: 'Raw', slug: 'raw' },
    ],
    available: true,
    madeToOrder: true,
    details: {
      description: 'Part of our character series. The Guardian is digitally sculpted with over 2 million polygons of detail, then printed at maximum resolution to preserve every surface nuance.',
      shipping: 'Made to order. Ships within 10–15 business days. Includes display base and certificate of authenticity.',
      care: 'Handle with care. Display on included base. Avoid prolonged sun exposure to prevent discoloration. Clean with soft brush.',
      specifications: 'Resolution: 0.025mm (resin) · Supports: Auto-generated & hand-placed · Post-processing: Support removal, UV cure, prime, seal',
    },
    colors: ['#3F3D56', '#1E1E1E', '#ECEAE4'],
    relatedSlugs: ['mythic-dragon', 'the-architect', 'sculptural-form-i'],
  },
  {
    id: 'prod_003',
    slug: 'geometric-vessel',
    name: 'Geometric Vessel',
    description: 'Functional decorative vase with faceted geometry.',
    longDescription: 'A functional object that challenges the distinction between art and utility. The Geometric Vessel features precisely calculated facets that catch and scatter light, creating ever-changing surface patterns throughout the day. Watertight interior with a matte exterior finish.',
    price: 2490,
    category: 'home',
    images: ['/images/products/geometric-vessel.jpg'],
    sizes: [
      { label: 'S', dimensions: '100 × 100 × 150 mm', price: 1490 },
      { label: 'M', dimensions: '140 × 140 × 220 mm', price: 2490 },
      { label: 'L', dimensions: '180 × 180 × 300 mm', price: 4490 },
    ],
    materials: [
      { label: 'Studio PLA', slug: 'standard-pla' },
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Satin Sealed', slug: 'satin-sealed' },
    ],
    available: true,
    madeToOrder: false,
    details: {
      description: 'Designed in-house as part of our Home Objects collection. Each vessel is printed with a sealed interior for water-tightness, making it fully functional for dried or fresh arrangements.',
      shipping: 'In stock — ships within 3–5 business days. Gift wrapping available.',
      care: 'Hand wash only. Do not microwave or dishwasher. Pat dry after contact with water. Display away from direct heat sources.',
    },
    colors: ['#ECEAE4', '#1E1E1E', '#C4B5A0'],
    relatedSlugs: ['modular-planter', 'wave-diffuser', 'desk-organizer'],
  },
  {
    id: 'prod_004',
    slug: 'mythic-dragon',
    name: 'Mythic Dragon',
    description: 'Highly detailed collectible dragon figure.',
    longDescription: 'The Mythic Dragon is our most intricate collectible to date. Spanning over 80 individually printed and assembled components, this piece showcases the extreme potential of high-resolution 3D printing combined with expert hand-assembly and finishing.',
    price: 6990,
    category: 'collectibles',
    images: ['/images/products/mythic-dragon.jpg'],
    model: '/models/dragon.glb',
    sizes: [
      { label: 'M', dimensions: '250 × 200 × 180 mm', price: 6990 },
      { label: 'L', dimensions: '400 × 320 × 280 mm', price: 14990 },
      { label: 'XL', dimensions: '600 × 480 × 420 mm', price: 29990 },
    ],
    materials: [
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
      { label: 'PLA Pro+ & Resin', slug: 'pla-pro-plus' },
    ],
    finishes: [
      { label: 'Hand-Painted', slug: 'hand-painted' },
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Metallic', slug: 'metallic' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'Popular',
    details: {
      description: 'Our flagship collectible. The Mythic Dragon pushes the boundaries of desktop manufacturing with over 80 individually printed components, precision-fitted and hand-assembled.',
      shipping: 'Made to order. Production time: 15–20 business days. Ships in reinforced custom crate.',
      care: 'Display piece only. Handle by the base. Dust with soft brush. Included display stand with nameplate.',
      specifications: 'Components: 80+ pieces · Assembly: Precision dovetail + adhesive · Resolution: 0.025mm (details), 0.1mm (structural)',
    },
    colors: ['#2A2D30', '#1E1E1E', '#8B4513'],
    relatedSlugs: ['the-guardian', 'the-architect', 'celestial-sphere'],
  },
  {
    id: 'prod_005',
    slug: 'wave-diffuser',
    name: 'Wave Diffuser',
    description: 'Acoustic wall panel with biomimetic surface.',
    longDescription: 'Inspired by natural wave patterns, this acoustic diffuser transforms any wall into both a visual statement and a functional sound treatment. The mathematically optimized surface geometry scatters sound waves across a wide frequency range.',
    price: 3990,
    category: 'home',
    images: ['/images/products/wave-diffuser.jpg'],
    sizes: [
      { label: 'Single', dimensions: '300 × 300 × 45 mm', price: 3990 },
      { label: 'Set of 4', dimensions: '300 × 300 × 45 mm each', price: 13990 },
      { label: 'Set of 9', dimensions: '300 × 300 × 45 mm each', price: 29990 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'Studio PLA', slug: 'standard-pla' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Raw Layer', slug: 'raw-layer' },
    ],
    available: true,
    madeToOrder: true,
    details: {
      description: 'Each Wave Diffuser tile interlocks seamlessly with adjacent tiles. Mount individually or create a larger installation. The surface pattern is computationally optimized for broadband sound diffusion.',
      shipping: 'Made to order. Ships within 7–10 business days. Mounting hardware included.',
      care: 'Indoor use only. Wipe with damp cloth. Wall mounting template and hardware included in package.',
      specifications: 'Frequency range: 500Hz–8kHz · Mounting: French cleat system · Weight: 380g per tile',
    },
    colors: ['#ECEAE4', '#1E1E1E', '#8B8680'],
    relatedSlugs: ['geometric-vessel', 'modular-planter', 'desk-organizer'],
  },
  {
    id: 'prod_006',
    slug: 'monolith-series',
    name: 'Monolith Series',
    description: 'Architectural sculpture with stacked layer aesthetic.',
    longDescription: 'The Monolith Series celebrates the inherent beauty of additive manufacturing. Rather than hiding the layer lines, each piece amplifies them — creating towering forms where every stratum is a deliberate design element. Available in three heights.',
    price: 7990,
    category: 'sculptures',
    images: ['/images/products/monolith-series.jpg'],
    model: '/models/monolith.glb',
    sizes: [
      { label: 'Tower', dimensions: '120 × 120 × 350 mm', price: 4990 },
      { label: 'Column', dimensions: '150 × 150 × 550 mm', price: 7990 },
      { label: 'Monument', dimensions: '200 × 200 × 800 mm', price: 14990 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'Carbon PETG', slug: 'carbon-petg' },
    ],
    finishes: [
      { label: 'Raw Layer', slug: 'raw-layer' },
      { label: 'Satin Sealed', slug: 'satin-sealed' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'Signature',
    details: {
      description: 'Our signature piece. The Monolith Series embraces the visible strata of 3D printing as an aesthetic choice, creating objects that could only exist through this process.',
      shipping: 'Made to order. Ships within 10–14 business days. Custom foam-lined crate for larger sizes.',
      care: 'Display on a flat, stable surface. Avoid humid environments for PLA variants. Dust with soft cloth.',
      specifications: 'Layer height: 0.20mm (deliberate visibility) · Infill: 30% gyroid · Single-print construction',
    },
    colors: ['#1E1E1E', '#2A2D30', '#ECEAE4'],
    relatedSlugs: ['sculptural-form-i', 'abstract-wave', 'celestial-sphere'],
  },
  {
    id: 'prod_007',
    slug: 'modular-planter',
    name: 'Modular Planter',
    description: 'Stackable geometric planter with drainage system.',
    longDescription: 'A planter system designed for modern spaces. Each module connects via a hidden locking mechanism, allowing vertical or horizontal expansion. Integrated drainage channels ensure healthy root systems while keeping surfaces clean.',
    price: 1990,
    category: 'home',
    images: ['/images/products/modular-planter.jpg'],
    sizes: [
      { label: 'Single', dimensions: '110 × 110 × 100 mm', price: 1490 },
      { label: 'Stack of 3', dimensions: '110 × 110 × 300 mm', price: 3990 },
      { label: 'Wall Set', dimensions: '330 × 110 × 200 mm', price: 5490 },
    ],
    materials: [
      { label: 'Studio PLA', slug: 'standard-pla' },
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Raw Layer', slug: 'raw-layer' },
    ],
    available: true,
    madeToOrder: false,
    details: {
      description: 'Designed for small succulents, herbs, and air plants. The modular locking system lets you reconfigure your arrangement as your collection grows.',
      shipping: 'In stock — ships within 3–5 business days. Includes drainage trays.',
      care: 'Wipe with damp cloth. Do not soak. Use included drainage tray to protect surfaces.',
    },
    colors: ['#ECEAE4', '#C4B5A0', '#1E1E1E'],
    relatedSlugs: ['geometric-vessel', 'wave-diffuser', 'desk-organizer'],
  },
  {
    id: 'prod_008',
    slug: 'the-architect',
    name: 'The Architect',
    description: 'Detailed human figure in contemplative pose.',
    longDescription: 'The Architect captures a moment of creative contemplation. Printed in high-detail resin at museum-quality resolution, every fold of fabric and subtle expression is preserved. A statement piece for any desk or shelf.',
    price: 2990,
    category: 'figurines',
    images: ['/images/products/the-architect.jpg'],
    model: '/models/architect.glb',
    sizes: [
      { label: 'Desk', dimensions: '80 × 60 × 140 mm', price: 1990 },
      { label: 'Shelf', dimensions: '130 × 100 × 230 mm', price: 2990 },
      { label: 'Display', dimensions: '200 × 150 × 350 mm', price: 5990 },
    ],
    materials: [
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Hand-Painted', slug: 'hand-painted' },
      { label: 'Bronze Effect', slug: 'bronze-effect' },
    ],
    available: true,
    madeToOrder: true,
    details: {
      description: 'Part of our Figures collection. The Architect is digitally sculpted with attention to anatomical accuracy and emotional expression, then printed at maximum resolution.',
      shipping: 'Made to order. Ships within 10–12 business days. Includes display base.',
      care: 'Handle by the base. Display indoors. Clean with soft brush. Avoid water exposure for painted finishes.',
    },
    colors: ['#3F3D56', '#8B4513', '#ECEAE4'],
    relatedSlugs: ['the-guardian', 'mythic-dragon', 'sculptural-form-i'],
  },
  {
    id: 'prod_009',
    slug: 'abstract-wave',
    name: 'Abstract Wave',
    description: 'Flowing parametric sculpture inspired by ocean dynamics.',
    longDescription: 'Abstract Wave freezes a moment of fluid dynamics into permanent form. Generated through custom simulation software, the piece captures the precise instant where a wave crests and begins to break — a form that exists for milliseconds in nature, made permanent through fabrication.',
    price: 5490,
    category: 'sculptures',
    images: ['/images/products/abstract-wave.jpg'],
    model: '/models/wave.glb',
    sizes: [
      { label: 'S', dimensions: '180 × 80 × 120 mm', price: 2990 },
      { label: 'M', dimensions: '300 × 130 × 200 mm', price: 5490 },
      { label: 'L', dimensions: '500 × 220 × 330 mm', price: 12990 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Satin Sealed', slug: 'satin-sealed' },
      { label: 'Translucent', slug: 'translucent' },
    ],
    available: true,
    madeToOrder: true,
    details: {
      description: 'Created through computational fluid simulation, then refined by hand in digital sculpting software. Each piece captures a unique moment of wave dynamics.',
      shipping: 'Made to order. Ships within 10–14 business days. Custom packaging for delicate geometry.',
      care: 'Display on stable surface. Avoid bumping thin sections. Dust with soft brush or compressed air.',
      specifications: 'Simulation: Navier-Stokes fluid solver · Resolution: 0.08mm · Support strategy: Soluble PVA',
    },
    colors: ['#ECEAE4', '#87CEEB', '#1E1E1E'],
    relatedSlugs: ['sculptural-form-i', 'monolith-series', 'celestial-sphere'],
  },
  {
    id: 'prod_010',
    slug: 'celestial-sphere',
    name: 'Celestial Sphere',
    description: 'Nested geometric orb with internal illumination.',
    longDescription: 'A study in nested complexity. The Celestial Sphere consists of three concentric geometric shells, each printed as a single continuous structure. When backlit, the overlapping patterns create mesmerizing shadow projections. Available with optional LED base.',
    price: 4490,
    category: 'limited',
    images: ['/images/products/celestial-sphere.jpg'],
    model: '/models/sphere.glb',
    sizes: [
      { label: 'S', dimensions: '100 × 100 × 100 mm', price: 2490 },
      { label: 'M', dimensions: '160 × 160 × 160 mm', price: 4490 },
      { label: 'L', dimensions: '250 × 250 × 250 mm', price: 8990 },
    ],
    materials: [
      { label: 'Studio PLA', slug: 'standard-pla' },
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Translucent', slug: 'translucent' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'Limited',
    details: {
      description: 'Limited edition piece. Each Celestial Sphere is printed as a single continuous structure using advanced bridging techniques — no assembly, no seams. The nested shells are born connected.',
      shipping: 'Limited production. Ships within 12–18 business days. Numbered edition with certificate.',
      care: 'Extremely delicate. Display on included base. Do not squeeze or apply pressure. LED base requires USB-C power.',
      specifications: 'Shells: 3 concentric layers · Bridging: Custom retraction profile · LED base: USB-C, warm white 2700K',
    },
    colors: ['#ECEAE4', '#FFD700', '#3F3D56'],
    relatedSlugs: ['abstract-wave', 'monolith-series', 'sculptural-form-i'],
  },
  {
    id: 'prod_011',
    slug: 'desk-organizer',
    name: 'Desk Organizer',
    description: 'Minimal desktop storage with hidden compartments.',
    longDescription: 'Designed for the modern workspace. Clean exterior lines conceal thoughtful internal divisions for pens, cards, cables, and small accessories. The weighted base keeps everything stable.',
    price: 1790,
    category: 'home',
    images: ['/images/products/desk-organizer.jpg'],
    sizes: [
      { label: 'Compact', dimensions: '120 × 80 × 80 mm', price: 1290 },
      { label: 'Standard', dimensions: '200 × 100 × 90 mm', price: 1790 },
      { label: 'Wide', dimensions: '300 × 120 × 90 mm', price: 2490 },
    ],
    materials: [
      { label: 'Studio PLA', slug: 'standard-pla' },
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Satin Sealed', slug: 'satin-sealed' },
    ],
    available: true,
    madeToOrder: false,
    details: {
      description: 'Part of our Workspace collection. Designed with weighted steel inserts in the base for stability. Internal dividers are optimized for common desk items.',
      shipping: 'In stock — ships within 2–4 business days.',
      care: 'Wipe with soft damp cloth. Avoid submerging in water.',
    },
    colors: ['#ECEAE4', '#1E1E1E', '#8B8680'],
    relatedSlugs: ['modular-planter', 'geometric-vessel', 'wave-diffuser'],
  },
  {
    id: 'prod_012',
    slug: 'kinetic-mobile',
    name: 'Kinetic Mobile',
    description: 'Hanging sculptural mobile with balanced geometric forms.',
    longDescription: 'A meditation on balance and motion. Each element is precisely weighted to achieve perfect equilibrium, creating a constantly evolving sculptural composition driven by nothing more than air currents.',
    price: 5990,
    category: 'limited',
    images: ['/images/products/kinetic-mobile.jpg'],
    sizes: [
      { label: 'Petite', dimensions: '300 × 300 × 400 mm span', price: 3990 },
      { label: 'Grande', dimensions: '500 × 500 × 600 mm span', price: 5990 },
      { label: 'Statement', dimensions: '800 × 800 × 1000 mm span', price: 12990 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'Carbon PETG', slug: 'carbon-petg' },
    ],
    finishes: [
      { label: 'Smooth Matte', slug: 'smooth-matte' },
      { label: 'Metallic', slug: 'metallic' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'Limited',
    details: {
      description: 'Each mobile is individually balanced by hand after printing. No two are identical. The geometry is parametrically generated but the balance point is found through physical testing.',
      shipping: 'Made to order. Ships within 14–18 business days. Special packaging to preserve balance calibration.',
      care: 'Hang from a secure ceiling point rated for at least 2kg. Avoid outdoor use. The mobile is self-balancing — do not adjust arms.',
      specifications: 'Elements: 7–12 depending on size · Connection: Stainless steel wire · Ceiling mount: Included swivel hook',
    },
    colors: ['#1E1E1E', '#ECEAE4', '#2A2D30'],
    relatedSlugs: ['celestial-sphere', 'abstract-wave', 'sculptural-form-i'],
  },
];

export const PRODUCTS: Product[] = BASE_PRODUCTS.map((p) => ({
  ...p,
  hasModel: p.hasModel !== undefined ? p.hasModel : !!p.model,
  modelUrl: p.modelUrl || p.model,
  color: p.color || p.colors[0],
  isMadeToOrder: p.isMadeToOrder !== undefined ? p.isMadeToOrder : p.madeToOrder,
  dimensions: p.dimensions || p.sizes[0]?.dimensions,
}));

export function getProduct(slugOrId: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.badge).slice(0, 4);
}

export function getRelatedProducts(slugOrId: string): Product[] {
  const product = getProduct(slugOrId);
  if (!product) return [];
  return product.relatedSlugs
    .map((s) => getProduct(s))
    .filter((p): p is Product => p !== undefined);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
