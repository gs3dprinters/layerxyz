"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="bg-[#F5F3EE] py-32 px-6 flex items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-6xl md:text-8xl font-sans font-semibold tracking-tighter text-[#181818] leading-[0.9] mb-8">
          START YOUR<br />NEXT OBJECT.
        </h2>
        <p className="text-lg md:text-xl text-[#777777] max-w-2xl mx-auto mb-12">
          Whether you want to shop our collection or create something entirely new.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/shop"
            className="inline-flex justify-center items-center px-8 py-4 bg-[#181818] text-white font-medium hover:bg-[#2A2A2A] transition-colors rounded-full w-full sm:w-auto"
          >
            SHOP COLLECTION
          </Link>
          <Link 
            href="/custom"
            className="inline-flex justify-center items-center px-8 py-4 bg-transparent text-[#181818] border border-[#D4D0C8] hover:border-[#181818] transition-colors rounded-full font-medium w-full sm:w-auto"
          >
            CREATE CUSTOM
          </Link>
        </div>
      </motion.div>
    </section>
  );
}