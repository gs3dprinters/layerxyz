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
    headline: "Multi-section organic monolith engineered for studio exhibition.",
    description:
      "A 1.4-meter fluid geometric sculpture fabricated in 18 interlocking modular segments with internal carbon fiber structural bracing and micro-blasted matte finish.",
    image: "/images/project-sculpture.jpg",
    gallery: [
      "/images/project-sculpture.jpg",
      "/images/project-sculpture-detail.jpg",
      "/images/project-sculpture-joints.jpg",
    ],
    specs: {
      scale: "Statement / XL",
      material: "High-Temp PLA Pro+ (Obsidian Black)",
      production: "18-Segment FDM Modular Fabrication",
      finishing: "Precision Seam Alignment, Ultrasonic Joint Welding & Matte Conditioning",
      dimensions: "1420 × 520 × 480 mm",
      weight: "14.2 kg",
    },
    narrative: {
      challenge:
        "The client required an imposing sculptural centrepiece with sweeping organic undulations that exceeded the physical build envelope of standard single-bed industrial printers without showing seam lines.",
      execution:
        "We sliced the CAD geometry into 18 dovetail-indexed nodes, optimized wall thickness gradient to keep upper tiers lightweight, and printed using calibrated 0.2mm layer deposition with internal ribbing.",
      result:
        "Delivered and assembled on site within 0.4mm cumulative tolerance, presenting a seamless monolithic silhouette under directional gallery spotlights.",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "ergonomic-device-chassis",
    title: "Haptic Input Enclosure",
    category: "Prototype",
    categoryLabel: "Industrial Prototype",
    year: "2025",
    headline: "Functional mechanical housing prototype with snap-fit tolerance.",
    description:
      "Production-intent prototype for an acoustic spatial controller featuring tactile rotary encoders, ultrasonic sensor recesses, and sub-millimeter component clearances.",
    image: "/images/project-prototype.jpg",
    gallery: [
      "/images/project-prototype.jpg",
      "/images/project-prototype-internal.jpg",
    ],
    specs: {
      scale: "Medium / Desktop",
      material: "Matte Carbon-Reinforced PETG",
      production: "High-Speed Sliced Multi-Wall Direct Print",
      finishing: "Vapor-Conditioned Satin Texture & M3 Brass Threaded Heat-Set Inserts",
      dimensions: "260 × 145 × 85 mm",
      weight: "480 g",
    },
    narrative: {
      challenge:
        "Validating ergonomic hand grip curvature and dynamic snap-fit clasp durability before committing to injection tooling.",
      execution:
        "Printed using carbon-fiber composite filament with tuned anisotropic orientation for maximum flexural strength along the latching axis.",
      result:
        "Passed full drop and thermal cycle validation, allowing rapid ergonomic testing with design stakeholders.",
    },
    featured: true,
    order: 2,
  },
  {
    slug: "architectural-pavilion-study",
    title: "Voronoi Pavilion Model",
    category: "Architecture",
    categoryLabel: "Architectural Model",
    year: "2025",
    headline: "Intricate architectural study with hollow lattice spans.",
    description:
      "A delicate 1:100 scale structural model displaying dual-curvature shell geometry and self-supporting internal columns for an international competition presentation.",
    image: "/images/project-pavilion.jpg",
    gallery: [
      "/images/project-pavilion.jpg",
      "/images/project-pavilion-angle.jpg",
    ],
    specs: {
      scale: "Large Model",
      material: "Architectural Bone White PLA",
      production: "Micro-Layer Deposition (0.12mm)",
      finishing: "Manual Tree-Support De-bridging & UV-Stable Clean Seal",
      dimensions: "580 × 580 × 240 mm",
      weight: "1.8 kg",
    },
    narrative: {
      challenge:
        "Achieving razor-thin structural struts (under 1.2mm diameter) over dramatic cantilevers without sag or surface stringing.",
      execution:
        "Implemented custom organic tree supports generated via algorithmic overhang analysis, paired with decelerated outer-wall cooling cycles.",
      result:
        "Flawless white pavilion study showcasing every beam intersection with pristine crispness for client review.",
    },
    featured: true,
    order: 3,
  },
  {
    slug: "cybernetic-artisan-statue",
    title: "The Archon — Character Statue",
    category: "Figurine",
    categoryLabel: "Custom Statue",
    year: "2024",
    headline: "High-definition display statue with multi-material contrast.",
    description:
      "A 450mm collectible artisan sculpture rendered from digital mesh with microscopic surface textiles, mechanical plates, and a cast resin optical core.",
    image: "/images/project-figurine.jpg",
    gallery: [
      "/images/project-figurine.jpg",
      "/images/project-figurine-macro.jpg",
    ],
    specs: {
      scale: "Medium / Large",
      material: "Tough Engineering Resin + PLA Pro+ Base",
      production: "Hybrid 8K Photopolymerization & FDM Core",
      finishing: "Hand-Smoothed, Primer Micro-Coat & Dark Titanium Satin Buffing",
      dimensions: "450 × 280 × 220 mm",
      weight: "2.6 kg",
    },
    narrative: {
      challenge:
        "Balancing structural mass with delicate 0.3mm mechanical filigree and garment flow.",
      execution:
        "Fabricated the dense pedestal and core anatomy in high-impact PLA Pro+, while helmet crests, fingers, and intricate emblems were produced in ultra-fine photopolymer resin.",
      result:
        "Museum-quality display piece combining industrial resilience with microscopic digital fidelity.",
    },
    featured: true,
    order: 4,
  },
  {
    slug: "multi-stage-planetary-gearset",
    title: "Planetary Reduction Assembly",
    category: "Custom Parts",
    categoryLabel: "Custom Mechanical Part",
    year: "2025",
    headline: "Print-in-place high-torque transmission mechanism.",
    description:
      "Functional cycloidal and planetary reduction gear assembly built with 0.15mm running clearances for robotics testing.",
    image: "/images/project-gear.jpg",
    gallery: [
      "/images/project-gear.jpg",
    ],
    specs: {
      scale: "Small / Precision",
      material: "Self-Lubricating Nylon Alloy / PETG",
      production: "Precision Calibrated Clearance FDM",
      finishing: "Deburred Tooth Profiles & Synthetic Fluoropolymer Lubrication",
      dimensions: "160 × 160 × 90 mm",
      weight: "620 g",
    },
    narrative: {
      challenge:
        "Zero-backlash gear meshing straight off the build plate without post-print machining.",
      execution:
        "Applied active dimensional compensation in slicer software to counter plastic thermal contraction.",
      result:
        "Smooth rotational drive with zero tooth binding under 15 Nm test torque loads.",
    },
    featured: false,
    order: 5,
  },
  {
    slug: "biomimetic-acoustic-diffuser",
    title: "Acoustic Diffusion Array",
    category: "Sculpture",
    categoryLabel: "Acoustic Fabrication",
    year: "2024",
    headline: "Parametrically calculated sound scattering wall monolith.",
    description:
      "Custom wall-mounted sound diffusion grid based on prime quadratic residue sequences, merging mathematical acoustics with physical aesthetic impact.",
    image: "/images/project-diffuser.jpg",
    gallery: [
      "/images/project-diffuser.jpg",
    ],
    specs: {
      scale: "Statement Wall Panel",
      material: "Recycled Matte Graphite PLA",
      production: "9-Tile Interlocking Matrix",
      finishing: "Flush Interlocking Keyways & Rear Wall Mount Integrations",
      dimensions: "1200 × 1200 × 180 mm",
      weight: "18.5 kg",
    },
    narrative: {
      challenge:
        "Producing a rigid, non-resonant acoustic surface across 1.44 square meters with repeatable well depths.",
      execution:
        "Engineered internal gyroid infill at 28% density to eliminate acoustic cavity resonance while keeping shipping modularity intact.",
      result:
        "Installed in a private recording studio with measured sound dispersion matching predictive mathematical models.",
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

