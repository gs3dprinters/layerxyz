export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  capabilities: string[];
  specs: {
    tolerances: string;
    layerHeights: string;
    buildEnvelope: string;
    primaryApplications: string;
  };
  details: string;
}

export const SERVICES: Service[] = [
  {
    id: "custom-3d-printing",
    number: "01",
    title: "CUSTOM 3D PRINTING",
    subtitle: "Precision Digital Fabrication",
    description:
      "Precision printing for custom designs, components, models and one-off creations. Calibrated for dimensional fidelity and pristine layer consistency.",
    image: "/images/service-printing.jpg",
    capabilities: [
      "One-off custom models & geometry",
      "Low-volume bespoke production",
      "Fine surface resolution (down to 0.08mm)",
      "High-density structural infill patterns",
    ],
    specs: {
      tolerances: "±0.15mm standard",
      layerHeights: "0.08mm – 0.28mm selectable",
      buildEnvelope: "Standard single-build up to 400 × 400 × 450 mm",
      primaryApplications: "Component replacements, custom enclosures, bespoke gifts",
    },
    details:
      "Every print starts with model inspection. We adjust orientation, layer line trajectory, and wall counts to match whether your object prioritizes aesthetic smoothness or load-bearing resilience.",
  },
  {
    id: "statues-sculptures",
    number: "02",
    title: "STATUES & SCULPTURES",
    subtitle: "Artisan Scale & Figurative Craft",
    description:
      "Detailed figurines, character models and statement-scale sculptures built from digital designs. From delicate tabletop miniatures to commanding life-size centrepieces.",
    image: "/images/service-sculptures.jpg",
    capabilities: [
      "Expressive anatomy & digital characters",
      "Multi-part modular statue assembly",
      "Internal structural armature integration",
      "Surface smoothing & satin priming",
    ],
    specs: {
      tolerances: "Sub-millimeter joint dovetailing",
      layerHeights: "0.08mm detail surfaces",
      buildEnvelope: "Modular assemblies up to 2.5+ meters",
      primaryApplications: "Art installations, studio lobbies, character collectibles, brand mascots",
    },
    details:
      "We convert complex digital sculpts into physical reality. For sculptures that surpass ordinary build plates, our multi-stage indexing ensures invisible joining and rock-solid balance.",
  },
  {
    id: "prototyping",
    number: "03",
    title: "PROTOTYPING",
    subtitle: "Rapid Iteration & Physical Proofing",
    description:
      "Turn concepts into physical prototypes quickly, iterate faster and validate ideas in the real world. Test fit, feel, ergonomics, and spatial interaction before tooling.",
    image: "/images/service-prototyping.jpg",
    capabilities: [
      "Ergonomic verification models",
      "Functional snap-fits & living hinges",
      "Brass heat-set threaded inserts",
      "Iterative revision turnaround",
    ],
    specs: {
      tolerances: "±0.1mm on critical fits",
      layerHeights: "0.12mm – 0.20mm functional balance",
      buildEnvelope: "Rapid modular iteration volumes",
      primaryApplications: "Electronics casings, handheld devices, automotive concepts, robotics",
    },
    details:
      "Speed without sloppy tolerances. We work alongside product designers and engineers to transform CAD revisions into physical check-models within days.",
  },
  {
    id: "custom-fabrication",
    number: "04",
    title: "CUSTOM FABRICATION",
    subtitle: "Large-Format Multi-Piece Engineering",
    description:
      "Complex, oversized or multi-part projects engineered, printed and assembled to specification. When standard machines hit their limits, our fabrication pipeline begins.",
    image: "/images/service-fabrication.jpg",
    capabilities: [
      "Multi-piece algorithmic mesh slicing",
      "Keyed alignment joints & dowel pin sockets",
      "Composite core reinforcement",
      "Full hands-on post-processing & bonding",
    ],
    specs: {
      tolerances: "Precision seam matching <0.3mm",
      layerHeights: "Adaptive variable layer heights",
      buildEnvelope: "Architectural & human scale (multi-meter)",
      primaryApplications: "Stage props, exhibition stands, architectural pavilions, retail features",
    },
    details:
      "Large builds require deliberate structural engineering. We analyze load vectors, design hidden structural skeletons, and craft indexed joint networks for seamless physical assembly.",
  },
];
