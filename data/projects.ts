export interface Project {
  slug: string;
  title: string;
  category: "Sculpture" | "Prototype" | "Figurine" | "Architecture" | "Custom Parts";
  categoryLabel: string;
  year: string;
  headline: string;
  description: string;
  image: string;
  gallery: string[];
  specs: {
    scale: string;
    material: string;
    production: string;
    finishing: string;
    dimensions: string;
    weight?: string;
  };
  narrative: {
    challenge: string;
    execution: string;
    result: string;
  };
  featured: boolean;
  order: number;
}

export const PROJECTS: Project[] = [
  {
    slug: "statement-monolith-sculpture",
    title: "Monolith 01 — Kinetic Form",
    category: "Sculpture",
    categoryLabel: "Large Sculpture",
    year: "2025",
    headline: "Multi-section organic sculpture developed for exhibition.",
    description:
      "A large-format sculptural study developed as a modular physical object, combining flowing geometry with a strong architectural presence.",
    image: "/images/project-sculpture.jpg",
    gallery: [
      "/images/project-sculpture.jpg",
      "/images/project-sculpture-detail.jpg",
      "/images/project-sculpture-joints.jpg",
    ],
    specs: {
      scale: "Statement / XL",
      material: "Studio PLA Pro+ (Obsidian Black)",
      production: "Modular Section Fabrication",
      finishing: "Seam Alignment, Modular Joining & Studio Matte Finish",
      dimensions: "1420 × 520 × 480 mm",
      weight: "14.2 kg",
    },
    narrative: {
      challenge:
        "The project called for an imposing sculptural piece with sweeping fluid undulations designed to be assembled seamlessly at exhibition scale.",
      execution:
        "Our studio divided the digital geometry into interlocking modular sections, balancing strength and weight across the vertical form.",
      result:
        "Assembled and presented on site with clean joins and a unified matte silhouette under directional lighting.",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "ergonomic-device-chassis",
    title: "Haptic Controller Study",
    category: "Prototype",
    categoryLabel: "Design Study",
    year: "2025",
    headline: "Tactile ergonomics study developed for physical evaluation.",
    description:
      "A physical design study exploring tactile contours, surface ergonomics, and component fit for handheld interaction.",
    image: "/images/project-prototype.jpg",
    gallery: [
      "/images/project-prototype.jpg",
      "/images/project-prototype-internal.jpg",
    ],
    specs: {
      scale: "Desktop Study",
      material: "Studio PETG (Matte Charcoal)",
      production: "Direct Studio Print",
      finishing: "Satin Surface Finish & Component Fitting",
      dimensions: "260 × 145 × 85 mm",
      weight: "480 g",
    },
    narrative: {
      challenge:
        "Evaluating ergonomic hand feel, grip curvature, and tactile balance before finalizing physical production.",
      execution:
        "Produced in Studio PETG with layer orientation aligned for surface feel and structural rigidity.",
      result:
        "Provided a tangible, high-quality physical study enabling immediate hands-on review and refinement.",
    },
    featured: true,
    order: 2,
  },
  {
    slug: "architectural-pavilion-study",
    title: "Voronoi Pavilion Model",
    category: "Architecture",
    categoryLabel: "Architectural Study",
    year: "2025",
    headline: "Intricate architectural model with complex lattice spans.",
    description:
      "A 1:100 scale structural study displaying dual-curvature shell geometry and self-supporting columns for an architectural design presentation.",
    image: "/images/project-pavilion.jpg",
    gallery: [
      "/images/project-pavilion.jpg",
      "/images/project-pavilion-angle.jpg",
    ],
    specs: {
      scale: "Scale Model",
      material: "Studio Matte PLA (Architectural White)",
      production: "Fine-Detail Layer Print",
      finishing: "Support Removal & Clean Studio Finish",
      dimensions: "580 × 580 × 240 mm",
      weight: "1.8 kg",
    },
    narrative: {
      challenge:
        "Realizing slender structural lattice beams over wide cantilevers with clean geometric clarity.",
      execution:
        "Prepared with specialized support structures and controlled cooling to preserve thin architectural members.",
      result:
        "Pristine white pavilion study showcasing every beam intersection with clarity for client review.",
    },
    featured: true,
    order: 3,
  },
  {
    slug: "cybernetic-artisan-statue",
    title: "The Archon — Character Sculpture",
    category: "Figurine",
    categoryLabel: "Sculptural Piece",
    year: "2024",
    headline: "Detailed figurative sculpture with crisp surface definition.",
    description:
      "A 450mm collectible sculpture rendered from a digital model with detailed surface contours, mechanical forms, and a studio finish.",
    image: "/images/project-figurine.jpg",
    gallery: [
      "/images/project-figurine.jpg",
      "/images/project-figurine-macro.jpg",
    ],
    specs: {
      scale: "Medium / Large",
      material: "Studio PLA Pro+ & Custom Finishing",
      production: "Multi-Section Studio Fabrication",
      finishing: "Hand-Smoothed, Primed & Satin Finished",
      dimensions: "450 × 280 × 220 mm",
      weight: "2.6 kg",
    },
    narrative: {
      challenge:
        "Balancing structural presence with fine decorative relief and flowing anatomical contours.",
      execution:
        "Fabricated in sections to ensure clean feature definition across all angles, followed by hand smoothing and priming.",
      result:
        "A distinctive display sculpture combining clean assembly with sharp digital detail.",
    },
    featured: true,
    order: 4,
  },
  {
    slug: "multi-stage-planetary-gearset",
    title: "Planetary Mechanism Study",
    category: "Custom Parts",
    categoryLabel: "Mechanical Study",
    year: "2025",
    headline: "Physical demonstration study of mechanical gear interaction.",
    description:
      "A functional gear interaction study fabricated to evaluate rotational movement and mechanical geometry.",
    image: "/images/project-gear.jpg",
    gallery: [
      "/images/project-gear.jpg",
    ],
    specs: {
      scale: "Desktop Mechanism",
      material: "Studio PETG",
      production: "Integrated Mechanism Print",
      finishing: "Clean Surface Preparation",
      dimensions: "160 × 160 × 90 mm",
      weight: "620 g",
    },
    narrative: {
      challenge:
        "Fabricating moving internal components in a single build with smooth initial rotation.",
      execution:
        "Optimized part spacing and layer settings to achieve clean separation of moving teeth.",
      result:
        "Smooth hand-operated rotational movement demonstrating mechanical principles physically.",
    },
    featured: false,
    order: 5,
  },
  {
    slug: "biomimetic-acoustic-diffuser",
    title: "Acoustic Diffusion Panel",
    category: "Sculpture",
    categoryLabel: "Wall Sculpture",
    year: "2024",
    headline: "Sculptural wall panel designed with mathematical surface patterns.",
    description:
      "A custom wall-mounted panel based on acoustic diffusion geometry, balancing functional sound scattering with sculptural presence.",
    image: "/images/project-diffuser.jpg",
    gallery: [
      "/images/project-diffuser.jpg",
    ],
    specs: {
      scale: "Statement Wall Panel",
      material: "Studio Matte PLA",
      production: "Modular Multi-Tile Fabrication",
      finishing: "Flush Interlocking Keyways & Wall Mount Integration",
      dimensions: "1200 × 1200 × 180 mm",
      weight: "18.5 kg",
    },
    narrative: {
      challenge:
        "Producing a cohesive modular relief pattern across a large surface area for interior installation.",
      execution:
        "Divided the geometric array into interlocking tiles engineered for secure wall mounting.",
      result:
        "Installed as a sculptural acoustic backdrop with seamless tile transitions.",
    },
    featured: false,
    order: 6,
  },
];

export function getProject(slug: string) {
  const p = PROJECTS.find((project) => project.slug === slug);
  if (!p) return undefined;
  return {
    ...p,
    name: p.title,
    material: p.specs.material,
    dimensions: p.specs.dimensions,
    weight: p.specs.weight,
    challenge: p.narrative.challenge,
    execution: p.narrative.execution,
    result: p.narrative.result,
    color: '#2A2A2A',
  };
}

