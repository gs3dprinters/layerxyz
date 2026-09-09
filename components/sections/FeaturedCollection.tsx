"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductGrid from "@/ui/ProductGrid";

export default function FeaturedCollection() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-24 px-6 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#181818] mb-2">FEATURED OBJECTS</h2>
            <p className="text-[#777777]">Designed digitally. Made physically.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <ProductGrid products={products} columns={4} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/shop" className="text-[#181818] hover:text-[#777777] font-medium transition-colors inline-flex items-center gap-2">
            View all objects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}