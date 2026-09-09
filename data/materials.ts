export interface Material {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  finish: string;
  tensileStrength: string;
  heatResistance: string;
  applications: string[];
  colors: string[];
  visualColor: string;
}

export const MATERIALS: Material[] = [
  {
    id: "pla-pro-plus",
    name: "PLA PRO+",
    category: "High-Performance Biopolymer",
    tagline: "Superior layer adhesion, sharp corners, and high impact resistance.",
    description:
      "Toughened polylactic acid engineered with impact modifiers. Offers crisp geometric definition with 4× the impact resistance of standard hobbyist PLA.",
    finish: "Smooth semi-matte with fine layer definition",
    tensileStrength: "High / 45 MPa",
    heatResistance: "Up to 55°C",
    applications: [
      "Statement statues & figurines",
      "Architectural display models",
      "Cosmetic product housings",
      "Concept validation models",
    ],
    colors: ["Obsidian Black", "Bone White", "Basalt Gray", "Raw Terracotta"],
    visualColor: "#1E1E1E",
  },
  {
    id: "carbon-petg",
    name: "MATTE CARBON PETG",
    category: "Composite Co-Polyester",
    tagline: "High rigidity, chemical resistance, and an elegant textured dark sheen.",
    description:
      "Infused with chopped micro-carbon fibers for dimensional stability and zero-warp printing. Yields a rich textured graphite surface that diffuses light cleanly.",
    finish: "Textured matte graphite, almost completely hides layer lines",
    tensileStrength: "Very High / 58 MPa",
    heatResistance: "Up to 75°C",
    applications: [
      "Functional mechanical enclosures",
      "Robotic chassis components",
      "Drone brackets & mounting fixtures",
      "Tactile consumer device shells",
    ],
    colors: ["Carbon Matte Gray", "Deep Stealth Black"],
    visualColor: "#2A2D30",
  },
  {
    id: "standard-pla",
    name: "STUDIO MATTE PLA",
    category: "Precision Display Resin",
    tagline: "Ultra-clean surface clarity for geometric architecture and artistic forms.",
    description:
      "Pure organic polylactic acid optimized for fine overhangs, razor-sharp edge transitions, and uniform monochromatic photography backgrounds.",
    finish: "Velvety non-reflective matte finish",
    tensileStrength: "Moderate / 38 MPa",
    heatResistance: "Up to 52°C",
    applications: [
      "Scale architectural studies",
      "Interior sculpture editions",
      "Packaging volume mockups",
      "Educational visual aids",
    ],
    colors: ["Architectural White", "Concrete Gray", "Cast Iron Black"],
    visualColor: "#ECEAE4",
  },
  {
    id: "engineering-resin",
    name: "HIGH-DETAIL RESIN",
    category: "UV Photopolymer",
    tagline: "Microscopic fidelity for intricate jewelry, miniature figurines, and molds.",
    description:
      "Cured via high-resolution optical light engines for sub-50-micron features. Near-isotropic mechanical properties with glass-smooth organic contours.",
    finish: "Ultra-smooth satin, virtually zero layer visibility",
    tensileStrength: "High Rigidity / 65 MPa",
    heatResistance: "Up to 80°C (Post-Cured)",
    applications: [
      "Collector figurines & portrait sculpts",
      "Master patterns for silicone molding",
      "Micro-mechanical gear trains",
      "Wearable prototypes",
    ],
    colors: ["Onyx Smoke", "Translucent Amber", "Neutral Gray"],
    visualColor: "#3F3D56",
  },
];
