"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function SelectedWorkSection() {
  const projects = PROJECTS.slice(0, 3);
  
  return (
    <section className="py-24 px-6 bg-[#F5F3EE]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#181818] mb-2">SELECTED WORK</h2>
          <p className="text-[#777777]">From concept to physical object.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {projects.map((project, i) => {
            const isFirst = i === 0;
            const isSecond = i === 1;
            const isThird = i === 2;
            
            let colSpan = "md:col-span-12";
            if (isSecond) colSpan = "md:col-span-5 md:col-start-1 mt-0 md:mt-24";
            if (isThird) colSpan = "md:col-span-6 md:col-start-7 mt-0 md:-mt-12";

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className={`${colSpan}`}
              >
                <Link href={`/work/${project.slug}`} className="block group">
                  <div className="w-full aspect-[4/3] md:aspect-auto md:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E8E5DE] to-[#D4D0C8] mb-6 relative">
                    <div className="absolute inset-0 bg-[#2A2A2A]/5 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-medium text-[#181818]">{project.title}</h3>
                      <p className="text-sm text-[#777777]">{project.category}</p>
                    </div>
                    <div className="text-sm text-[#777777] font-mono">
                      <span>{project.year}</span>
                      {project.specs?.dimensions && <span className="ml-4">{project.specs.dimensions}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <Link href="/work" className="text-[#181818] hover:text-[#777777] font-medium transition-colors">
            View all work →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}