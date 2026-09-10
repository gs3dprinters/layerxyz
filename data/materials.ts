export interface Material {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  finish: string;
  applications: string[];
  colors: string[];
  visualColor: string;
}

export const MATERIALS: Material[] = [
  {
    id: "pla-pro-plus",
    name: "PLA / PLA PRO+",
    category: "Studio Biopolymer",
    tagline: "A versatile material for sculptures, figurines, prototypes and everyday objects.",
    description:
      "A versatile material for sculptures, figurines, prototypes and everyday objects.",
    finish: "Smooth semi-matte with crisp geometric definition",
    applications: [
      "Statement sculptures & figurines",
      "Architectural display models",
      "Personalized gifts & desk objects",
      "Concept validation pieces",
    ],
    colors: ["Obsidian Black", "Bone White", "Basalt Gray", "Raw Terracotta"],
    visualColor: "#1E1E1E",
  },
  {
    id: "petg",
    name: "PETG",
    category: "Durable Co-Polyester",
    tagline: "A durable option for functional objects and selected applications.",
    description:
      "A durable option for functional objects and selected applications.",
    finish: "Durable satin finish with clean layer bonding and impact resilience",
    applications: [
      "Functional enclosures & housings",
      "Tactile desk & handheld objects",
      "Display fixtures & brackets",
      "Utility & workshop components",
    ],
    colors: ["Matte Charcoal", "Studio White", "Smoke Gray"],
    visualColor: "#2A2D30",
  },
  {
    id: "custom-finishing",
    name: "CUSTOM FINISHING",
    category: "Studio Surface Treatment",
    tagline: "Selected projects can receive additional surface preparation or finishing depending on the desired result.",
    description:
      "Selected projects can receive additional surface preparation or finishing depending on the desired result.",
    finish: "Hand-prepared, primed, or finished according to project requirements",
    applications: [
      "Gallery display pieces",
      "Commemorative portrait sculptures",
      "Custom color & tone treatments",
      "Bespoke physical commissions",
    ],
    colors: ["Custom Primer", "Metallic Tones", "Bespoke Palette"],
    visualColor: "#C8B89F",
  },
];
