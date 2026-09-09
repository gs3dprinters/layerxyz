"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { COLLECTIONS } from "@/data/collections";

export default function ShopByCategory() {
  return (
    <section className="py-24 px-6 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#181818]">SHOP BY CATEGORY</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COLLECTIONS.slice(0, 5).map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Link href={`/collections/${category.slug}`} className="block group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8E5DE] to-[#D4D0C8]">
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 ease-in-out"
                  style={{ backgroundColor: category.color || '#2A2A2A' }}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl font-medium text-[#181818] mb-2">{category.name}</h3>
                    <p className="text-[#777777] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {category.tagline || 'Explore collection'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}