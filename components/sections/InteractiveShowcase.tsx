"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ProductViewer = dynamic(() => import("@/3d/ProductViewer"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#E8E5DE] animate-pulse rounded-2xl" />
});

export default function InteractiveShowcase() {
  return (
    <section className="bg-[#FAFAF8] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#181818] mb-4">EXPERIENCE IN 3D</h2>
          <p className="text-[#777777] max-w-2xl mx-auto">Rotate, zoom, and explore every detail.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="w-full aspect-[4/5] md:aspect-[16/10] relative rounded-2xl overflow-hidden bg-[#E8E5DE]"
        >
          <ProductViewer 
            modelPath="/models/kala-final-print.stl"
            productName="Kalanidhi Bespoke Portrait Statue" 
            fallbackColor="#1E1E1E" 
          />
          
          <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none">
            <span className="inline-block px-4 py-2 bg-white/80 backdrop-blur text-xs text-[#181818] tracking-widest uppercase rounded-full shadow-sm">
              Drag to explore
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}