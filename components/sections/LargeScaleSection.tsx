"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LargeScaleSection() {
  return (
    <section className="bg-[#FAFAF8] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex-1 w-full"
        >
          <h2 className="text-5xl md:text-6xl font-sans font-semibold tracking-tighter leading-[0.9] text-[#181818] mb-8">
            FROM SMALL OBJECTS<br />TO STATEMENT PIECES.
          </h2>
          <p className="text-lg text-[#777777] mb-10 max-w-md">
            Whether it&apos;s a 50mm intricate figurine or a 2500mm+ sculptural installation, our production capabilities scale to meet your vision. We handle complex multi-part assemblies and massive monolithic prints.
          </p>
          <Link 
            href="/custom"
            className="text-[#181818] hover:text-[#777777] font-medium transition-colors border-b border-[#181818] hover:border-[#777777] pb-1 inline-flex"
          >
            Start a large-scale project →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex-1 w-full"
        >
          <div className="w-full aspect-square md:aspect-[4/3] rounded-3xl bg-gradient-to-tr from-[#E8E5DE] to-[#F5F3EE] relative flex items-end p-8 border border-[#E8E5DE]">
            <div className="w-full flex items-end justify-between gap-4 h-3/4">
              <div className="w-1/4 h-1/6 bg-[#D4D0C8] rounded-t-lg relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#777777] font-mono">50mm</span>
              </div>
              <div className="w-1/4 h-2/6 bg-[#C0BDB6] rounded-t-lg relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#777777] font-mono">250mm</span>
              </div>
              <div className="w-1/4 h-3/5 bg-[#A8A59E] rounded-t-lg relative">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#777777] font-mono">1000mm</span>
              </div>
              <div className="w-1/4 h-full bg-[#181818] rounded-t-lg relative shadow-xl">
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#181818] font-mono font-medium">2500mm+</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}