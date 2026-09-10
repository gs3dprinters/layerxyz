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
  categoryLabel?: string;
  description: string;
  longDescription: string;
  price: number;
  pricePrefix?: string;
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
    id: 'prod_portrait',
    slug: 'custom-portrait-sculpture',
    name: 'Custom Portrait Sculpture',
    categoryLabel: 'CUSTOM PORTRAIT SCULPTURE',
    description: 'Personalized portrait sculptures made from customer photographs.',
    longDescription: 'Personalized portrait sculptures created from your photographs and produced to order. Digitally sculpted from your reference images and produced from the selected studio material and finish.',
    price: 1499,
    pricePrefix: 'From ',
    comparePrice: 2490,
    category: 'sculptures',
    images: ['/images/products/custom-portrait-sculpture.jpg'],
    model: '/models/kala-final-print.glb',
    modelUrl: '/models/kala-final-print.glb',
    hasModel: true,
    sizes: [
      { label: 'Desk Miniature', dimensions: '100 × 70 × 70 mm', price: 1499 },
      { label: 'Studio Portrait', dimensions: '180 × 120 × 120 mm', price: 3490 },
      { label: 'Grand Bust', dimensions: '280 × 180 × 180 mm', price: 7990 },
      { label: 'Life Scale', dimensions: '500 × 350 × 350 mm', price: 16990 },
    ],
    materials: [
      { label: 'Studio Matte PLA', slug: 'standard-pla' },
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Warm Sandstone', slug: 'warm-sandstone' },
      { label: 'Light Black Graphite', slug: 'light-black-graphite' },
    ],
    available: true,
    madeToOrder: true,
    details: {
      description: 'Personalized portrait sculptures created from your photographs and produced to order. Digitally sculpted from your reference images to capture likeness, expression, and form.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display on a flat, stable surface. Dust with a soft micro-fiber cloth. Avoid prolonged direct high heat.',
      specifications: 'Source: Customer Photographs · Production: 3D printed to order · Finishing: Studio hand-finished',
    },
    colors: ['#C8B89F', '#242424'],
    relatedSlugs: ['heritage-nandi-sculpture', 'personalized-name-sculpture', 'nataraja-statement-sculpture'],
  },
  {
    id: 'prod_heritage_nandi',
    slug: 'heritage-nandi-sculpture',
    name: 'Nandi Sacred Temple Sculpture',
    categoryLabel: 'HERITAGE COLLECTION',
    description: 'Detailed Indian-inspired sculptures and collectible statues.',
    longDescription: 'A detailed sculpture of the sacred temple Nandi bull. Sculpted with classical South Indian temple iconography, featuring ceremonial bell garlands, ornate embroidered saddle cloth, and plinth. Produced to order from the selected studio material and finish.',
    price: 2490,
    pricePrefix: 'From ',
    comparePrice: 3490,
    category: 'collectibles',
    images: ['/images/products/heritage-nandi-sculpture.jpg'],
    model: '/models/nandi-temple-sculpture.glb',
    modelUrl: '/models/nandi-temple-sculpture.glb',
    hasModel: true,
    sizes: [
      { label: 'Altar Small', dimensions: '120 × 70 × 60 mm', price: 2490 },
      { label: 'Temple Classic', dimensions: '200 × 120 × 100 mm', price: 4990 },
      { label: 'Heritage Grand', dimensions: '350 × 210 × 180 mm', price: 11990 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'Studio Matte PLA', slug: 'standard-pla' },
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Temple Bronze', slug: 'temple-bronze' },
      { label: 'Carved Granite Matte', slug: 'granite-matte' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'NEW',
    details: {
      description: 'Detailed South Indian inspired sculpture. Sculptural details including the neck garland and sacred contours are carefully reproduced.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Clean with a soft dry brush or cloth. Suitable for interior display and executive desks.',
    },
    colors: ['#4A3728', '#2A2D30'],
    relatedSlugs: ['nataraja-statement-sculpture', 'custom-portrait-sculpture', 'personalized-name-sculpture'],
  },
  {
    id: 'prod_personalized_name',
    slug: 'personalized-name-sculpture',
    name: 'Personalized Name & Desk Sculpture',
    categoryLabel: 'PERSONALIZED OBJECTS',
    description: 'Custom names, desk objects, decorative pieces and personalized gifts.',
    longDescription: 'Custom 3D typography nameplates, monogram desk sculptures, and personalized pieces. Produced to order in selected studio finishes with balanced weighted architecture for workspaces and gifting.',
    price: 499,
    pricePrefix: 'From ',
    comparePrice: 990,
    category: 'home',
    images: ['/images/products/personalized-name-sculpture.jpg'],
    model: '/models/personalized-name-sculpture.glb',
    modelUrl: '/models/personalized-name-sculpture.glb',
    hasModel: true,
    sizes: [
      { label: 'Compact / Pocket', dimensions: '90 × 30 × 15 mm', price: 499 },
      { label: 'Executive Desk', dimensions: '180 × 55 × 25 mm', price: 1190 },
      { label: 'Studio Statement', dimensions: '300 × 90 × 40 mm', price: 2490 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'Matte Carbon PETG', slug: 'carbon-petg' },
      { label: 'Studio Matte PLA', slug: 'standard-pla' },
    ],
    finishes: [
      { label: 'Brushed Graphite', slug: 'brushed-graphite' },
      { label: 'Obsidian Matte', slug: 'obsidian-matte' },
      { label: 'Chalk White', slug: 'chalk-white' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'CUSTOM',
    details: {
      description: 'Personalized with your chosen name, word, initials, or brand mark. Custom 3D typography designed for desktop presence.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Wipe with damp cloth. Stable base keeps the piece standing upright.',
    },
    colors: ['#2A2A2A', '#ECEAE4', '#C4B5A0'],
    relatedSlugs: ['custom-portrait-sculpture', 'heritage-nandi-sculpture', 'nataraja-statement-sculpture'],
  },
  {
    id: 'prod_statement_nataraja',
    slug: 'nataraja-statement-sculpture',
    name: 'Nataraja Cosmic Statement Sculpture',
    categoryLabel: 'STATEMENT SCULPTURES',
    description: 'Large-format and premium sculptural pieces.',
    longDescription: 'A commanding representation of Lord Shiva as Nataraja in the cosmic dance of creation and dissolution. Features the detailed arch of flames (Prabhamandala), locks of hair, damaru drum, and lotus pedestal.',
    price: 6990,
    pricePrefix: 'From ',
    comparePrice: 9990,
    category: 'sculptures',
    images: ['/images/products/nataraja-statement-sculpture.jpg'],
    model: '/models/nataraja-statement-sculpture.glb',
    modelUrl: '/models/nataraja-statement-sculpture.glb',
    hasModel: true,
    sizes: [
      { label: 'Studio Edition', dimensions: '250 × 200 × 90 mm', price: 6990 },
      { label: 'Gallery Large', dimensions: '450 × 360 × 160 mm', price: 16990 },
      { label: 'Monument Architectural', dimensions: '850 × 680 × 300 mm', price: 42000 },
    ],
    materials: [
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Chola Antique Bronze', slug: 'chola-bronze' },
      { label: 'Ebony Matte', slug: 'ebony-matte' },
    ],
    available: true,
    madeToOrder: true,
    badge: 'LIMITED',
    details: {
      description: 'Detailed cultural sculpture incorporating the flame circle, expressive posture, and dynamic drapery.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display as an architectural focal piece. Dust with soft feather or microfiber duster.',
    },
    colors: ['#5C4033', '#1E1E1E'],
    relatedSlugs: ['heritage-nandi-sculpture', 'custom-portrait-sculpture', 'personalized-name-sculpture'],
  },
  {
    id: 'prod_kala',
    slug: 'kala-portrait-statue',
    name: 'Kalanidhi Bespoke Portrait Statue',
    description: 'Figurative portrait sculpture produced to order.',
    longDescription: 'A custom figurative sculpture celebrating portrait craftsmanship. Digitally sculpted from reference photographs and produced using Layerxyz\'s 3D printing workflow.',
    price: 8490,
    comparePrice: 10990,
    category: 'figurines',
    images: ['/images/products/kala-statue-optimized.jpg'],
    model: '/models/kala-final-print.glb',
    sizes: [
      { label: 'S (Desk)', dimensions: '150 × 90 × 90 mm', price: 4990 },
      { label: 'M (Studio)', dimensions: '250 × 150 × 150 mm', price: 8490 },
      { label: 'L (Exhibition)', dimensions: '400 × 240 × 240 mm', price: 16990 },
    ],
    materials: [
      { label: 'Studio Matte PLA', slug: 'standard-pla' },
      { label: 'PLA Pro+', slug: 'pla-pro-plus' },
      { label: 'High-Detail Resin', slug: 'engineering-resin' },
    ],
    finishes: [
      { label: 'Warm Sandstone', slug: 'warm-sandstone' },
      { label: 'Light Black Graphite', slug: 'light-black-graphite' },
    ],
    available: true,
    madeToOrder: true,
    details: {
      description: 'A figurative portrait sculpture produced in our Tiruppur studio from reference photographs.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display on a flat, stable surface. Dust with a soft micro-fiber cloth.',
      specifications: 'Source: Reference Photos · Production: 3D printed to order · Finishing: Studio hand-finished',
    },
    colors: ['#C8B89F', '#242424'],
    relatedSlugs: ['the-guardian', 'the-architect', 'sculptural-form-i'],
  },
  {
    id: 'prod_001',
    slug: 'sculptural-form-i',
    name: 'Sculptural Form I',
    description: 'Abstract organic sculpture with flowing geometry.',
    longDescription: 'An exploration of organic form and mathematical precision. Sculptural Form I captures the tension between natural curves and deliberate structure, creating a presence that shifts with perspective. Each piece is printed with fine layer resolution and finished in our studio.',
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
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display indoors away from direct sunlight. Dust with a soft, dry cloth. Avoid moisture and harsh chemicals.',
      specifications: 'Resolution: Fine layer resolution · Finishing: Hand-finished, primed and sealed',
    },
    colors: ['#1E1E1E', '#ECEAE4', '#8B8680'],
    relatedSlugs: ['abstract-wave', 'monolith-series', 'geometric-vessel'],
  },
  {
    id: 'prod_002',
    slug: 'the-guardian',
    name: 'The Guardian',
    description: 'Detailed character figurine with intricate armor.',
    longDescription: 'The Guardian stands as a testament to what modern fabrication can achieve. Originally sculpted digitally by our in-house team, every surface detail — from the layered plate armor to the flowing cape texture — is resolved with exceptional definition using high-detail resin.',
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
      description: 'Part of our character series. The Guardian is digitally sculpted in high polygon detail, then printed with fine definition to preserve surface nuance.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Handle with care. Display on included base. Avoid prolonged sun exposure. Clean with soft brush.',
      specifications: 'Material: High-detail resin or PLA Pro+ · Finishing: Studio cured, cleaned and sealed',
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
      shipping: 'Produced to order or prepared from studio stock. Delivery timing depends on destination.',
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
    longDescription: 'The Mythic Dragon is our most intricate collectible to date. Spanning multiple individually printed and assembled components, this piece showcases high-resolution 3D printing combined with careful studio assembly and finishing.',
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
      description: 'Our flagship collectible. The Mythic Dragon combines individually printed components, precision-fitted and assembled in our studio.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display piece only. Handle by the base. Dust with soft brush. Included display stand with nameplate.',
      specifications: 'Assembly: Multi-part fitted assembly · Finishing: Hand-finished and inspected',
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
      description: 'Each Wave Diffuser tile interlocks cleanly with adjacent tiles. Mount individually or create a larger installation for sound diffusion.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Indoor use only. Wipe with damp cloth. Wall mounting template and hardware included in package.',
      specifications: 'Mounting: French cleat system · Weight: 380g per tile',
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
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display on a flat, stable surface. Avoid humid environments for PLA variants. Dust with soft cloth.',
      specifications: 'Layer aesthetic: Defined visible strata · Single-print construction',
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
      shipping: 'Produced to order or prepared from studio stock. Delivery timing depends on destination.',
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
    longDescription: 'The Architect captures a moment of creative contemplation. Printed in high-detail resin with refined studio resolution, every fold of fabric and subtle expression is preserved. A statement piece for any desk or shelf.',
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
      description: 'Part of our Figures collection. The Architect is digitally sculpted with attention to figurative form and expression, then printed in our studio.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
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
    longDescription: 'Abstract Wave freezes a moment of fluid dynamics into permanent form. Generated through simulation models, the piece captures the precise instant where a wave crests and begins to break — a form that exists for milliseconds in nature, made physical through studio fabrication.',
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
      description: 'Created through computational fluid modeling, then refined by hand in digital sculpting software. Each piece captures a unique moment of wave dynamics.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Display on stable surface. Avoid bumping thin sections. Dust with soft brush.',
      specifications: 'Production: Studio 3D printed · Finishing: Studio cleaned and sealed',
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
      description: 'Limited edition piece. Each Celestial Sphere is printed as a continuous structure using clean bridging — no assembly, no seams. The nested shells are born connected.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Delicate geometry. Display on included base. Do not squeeze or apply pressure. LED base requires USB-C power.',
      specifications: 'Shells: 3 concentric layers · LED base: USB-C, warm white',
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
      description: 'Part of our Workspace collection. Designed with a balanced weighted base for stability. Internal dividers are optimized for common desk items.',
      shipping: 'Produced to order or prepared from studio stock. Delivery timing depends on destination.',
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
    longDescription: 'A meditation on balance and motion. Each element is weighted to achieve equilibrium, creating an evolving sculptural composition driven by air currents.',
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
      description: 'Each mobile is individually balanced in our studio after printing. No two are identical.',
      shipping: 'Made to order. Delivery timing depends on the object, finish and destination.',
      care: 'Hang from a secure ceiling point. Avoid outdoor use. The mobile is self-balancing.',
      specifications: 'Connection: Stainless steel wire · Ceiling mount: Included swivel hook',
    },
    colors: ['#1E1E1E', '#ECEAE4', '#2A2D30'],
    relatedSlugs: ['celestial-sphere', 'abstract-wave', 'sculptural-form-i'],
  },
];

const VERIFIED_MODELS = new Set([
  '/models/kala-final-print.glb',
  '/models/nandi-temple-sculpture.glb',
  '/models/personalized-name-sculpture.glb',
  '/models/nataraja-statement-sculpture.glb',
]);

export const PRODUCTS: Product[] = BASE_PRODUCTS.map((p) => {
  const effectiveModel = p.modelUrl || p.model;
  const isVerified = Boolean(effectiveModel && VERIFIED_MODELS.has(effectiveModel));

  const normalizedFinishes = (p.finishes || []).map((f: any) => {
    if (typeof f === 'string') {
      return {
        label: f,
        slug: f.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-'),
      };
    }
    return f;
  });

  const normalizedMaterials = (p.materials || []).map((m: any) => {
    if (typeof m === 'string') {
      return {
        label: m,
        slug: m.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-'),
      };
    }
    return m;
  });

  return {
    ...p,
    hasModel: isVerified,
    modelUrl: isVerified ? effectiveModel : undefined,
    model: isVerified ? effectiveModel : undefined,
    finishes: normalizedFinishes,
    materials: normalizedMaterials,
    color: p.color || p.colors[0],
    isMadeToOrder: p.isMadeToOrder !== undefined ? p.isMadeToOrder : p.madeToOrder,
    dimensions: p.dimensions || p.sizes[0]?.dimensions,
  };
});

export function getProduct(slugOrId: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  const featuredSlugs = [
    'custom-portrait-sculpture',
    'heritage-nandi-sculpture',
    'personalized-name-sculpture',
    'nataraja-statement-sculpture',
  ];
  return featuredSlugs
    .map((slug) => getProduct(slug))
    .filter((p): p is Product => p !== undefined);
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
