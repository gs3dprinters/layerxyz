"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { getFeaturedProducts } from "@/data/products";
import ProductGrid from "@/ui/ProductGrid";

export default function FeaturedCollection() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-3">
              FEATURED OBJECTS
            </h2>
            <p className="text-base md:text-lg text-[#777777]">
              Designed digitally. Made physically.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#181818] hover:text-[#777777] transition-colors"
          >
            VIEW ALL OBJECTS →
          </Link>
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
          className="mt-16 flex justify-center md:hidden"
        >
          <Link
            href="/shop"
            className="text-sm font-medium text-[#181818] hover:text-[#777777] transition-colors inline-flex items-center gap-2"
          >
            VIEW ALL OBJECTS →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}