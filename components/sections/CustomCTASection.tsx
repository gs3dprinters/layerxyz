"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomCTASection() {
  return (
    <section className="bg-[#181818] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <h2 className="text-5xl md:text-7xl font-sans font-semibold tracking-tighter leading-[0.9] mb-8">
            MAKE SOMETHING<br />THAT DOESN&apos;T EXIST YET.
          </h2>
          <p className="text-lg md:text-xl text-[#A0A0A0] max-w-2xl mx-auto mb-12">
            Have a model, sketch or idea? We&apos;ll turn it into a physical object.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/custom"
              className="inline-flex justify-center items-center px-8 py-4 bg-white text-[#181818] font-medium hover:bg-[#F5F3EE] transition-colors rounded-full"
            >
              START A CUSTOM PROJECT
            </Link>
            <Link 
              href="/about"
              className="text-[#A0A0A0] hover:text-white transition-colors"
            >
              Learn about our process →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}