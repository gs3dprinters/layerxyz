export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "pricing",
    question: "How much does 3D printing cost?",
    answer:
      "Our 3D printing services start from ₹5/g for standard materials. Please note that this is a baseline starting price. Final project quotes depend on material selection (e.g. PLA Pro+, PETG, or photopolymer resins), overall geometry, print duration, internal density, required post-processing/finishing, and quantity. Share your file or dimensions through our project form for an exact, itemized quote.",
  },
  {
    id: "print-from-image",
    question: "Can you print from a 2D image or sketch?",
    answer:
      "In many cases, yes. While 3D printers require 3D geometry files (like STL or OBJ), our studio can evaluate your 2D sketches, reference photographs, or concept art to determine whether it can be digitally modeled or sculpted into a printable 3D asset prior to production.",
  },
  {
    id: "large-statues",
    question: "Can you print large-scale statues or sculptures?",
    answer:
      "Yes. Size does not limit what we can create. Large projects that exceed individual print chambers are intelligently divided into interlocking modular sections using precision dovetail joints, dowel sockets, or internal structural armatures. They are printed in batches and meticulously assembled and seam-finished in our studio.",
  },
  {
    id: "file-formats",
    question: "What 3D file formats do you accept?",
    answer:
      "We accept industry-standard mesh formats including STL, OBJ, and 3MF, as well as engineering CAD solids like STEP, STP, and IGES. You can also upload archives (.ZIP) containing multiple components or reference PDFs/images.",
  },
  {
    id: "finishing-services",
    question: "Do you provide post-processing and finishing?",
    answer:
      "Yes. Finishing and assembly can be custom-tailored to your exact project specifications. Our finishing capabilities include manual support removal, seam smoothing, priming, satin/matte conditioning, and threaded insert installations.",
  },
  {
    id: "single-piece-orders",
    question: "Can I order just a single one-off piece?",
    answer:
      "Absolutely. One-off custom projects are welcome. Whether you need a singular bespoke prototype, a personalized collectible statue, or a single replacement component, we engineer each build with the exact same precision as multi-piece commissions.",
  },
  {
    id: "turnaround-process",
    question: "How does the project process work?",
    answer:
      "First, submit your file or concept via our 'Start a Project' configurator or message us directly on WhatsApp. We inspect the geometry, confirm printability and material suitability, and provide a clear quote. Once approved, production begins and we update you with progress through to final inspection and handover.",
  },
];
