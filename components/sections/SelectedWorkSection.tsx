'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

export default function SelectedWorkSection() {
  const shouldReduceMotion = useReducedMotion();
  const projects = PROJECTS.slice(0, 3);

  return (
    <section className="py-28 md:py-36 px-6 sm:px-10 lg:px-16 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
              STUDIO PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-3">
              SELECTED WORK
            </h2>
            <p className="text-base md:text-lg text-[#6F6B63]">
              Objects, prototypes and large-scale pieces created by Layerxyz.
            </p>
          </div>
          <Link
            href="/work"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors"
          >
            VIEW ALL WORK →
          </Link>
        </motion.div>

        {/* Editorial Grid: Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Project 1 (Large / Monolith 01) - 7 cols */}
          {projects[0] && (
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              className="md:col-span-7 flex flex-col"
            >
              <Link
                href={`/work/${projects[0].slug}`}
                className="group flex flex-col h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-8 sm:p-10 transition-all duration-500 hover:border-[#D4D0C8] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)]"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs font-mono text-[#6F6B63] uppercase tracking-wider">
                    {projects[0].categoryLabel || projects[0].category}
                  </span>
                  <span className="text-xs font-mono text-[#6F6B63]">
                    {projects[0].year}
                  </span>
                </div>

                {/* Editorial Visual Composition */}
                <div className="relative w-full aspect-[16/10] my-auto rounded-2xl bg-[#EAE5DC] border border-[#DCD6CC] flex flex-col items-center justify-center p-8 overflow-hidden group-hover:scale-[1.01] transition-transform duration-500">
                  <div className="w-20 h-48 sm:w-28 sm:h-64 rounded-full bg-gradient-to-t from-[#181817] via-[#2E2E2C] to-[#454542] shadow-2xl opacity-90 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[11px] font-mono text-[#6F6B63]">
                    <span>Modular Sculpture</span>
                    <span>{projects[0].specs.dimensions}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8E5DE]/80 mt-6 flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-2xl font-medium text-[#171716] group-hover:text-black transition-colors mb-1">
                      {projects[0].title}
                    </h3>
                    <p className="text-sm text-[#6F6B63] max-w-md line-clamp-2">
                      {projects[0].description}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#171716] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform flex-shrink-0">
                    VIEW CASE →
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Projects 2 & 3 (Stacked) - 5 cols */}
          <div className="md:col-span-5 flex flex-col gap-6 lg:gap-8">
            {projects.slice(1, 3).map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: (i + 1) * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex-1"
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex flex-col h-full bg-[#FAFAF8] rounded-3xl border border-[#E8E5DE] overflow-hidden p-6 sm:p-8 transition-all duration-500 hover:border-[#D4D0C8] hover:shadow-[0_16px_40px_rgba(0,0,0,0.04)] justify-between"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-[#6F6B63] uppercase tracking-wider">
                      {project.categoryLabel || project.category}
                    </span>
                    <span className="text-xs font-mono text-[#6F6B63]">
                      {project.year}
                    </span>
                  </div>

                  {/* Neutral editorial visual block */}
                  <div className="w-full aspect-[16/8] rounded-xl bg-[#EAE5DC] border border-[#DCD6CC] flex items-center justify-center relative overflow-hidden my-3">
                    <span className="text-xs font-mono text-[#6F6B63] tracking-widest uppercase">
                      {project.specs.material.split('(')[0].trim()}
                    </span>
                    <div className="absolute bottom-2 right-4 text-[10px] font-mono text-[#888888]">
                      {project.specs.dimensions}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8E5DE]/80 flex justify-between items-end gap-2 mt-2">
                    <div>
                      <h4 className="text-lg font-medium text-[#171716] group-hover:text-black transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-[#6F6B63] line-clamp-1 mt-0.5">
                        {project.description}
                      </p>
                    </div>
                    <ArrowRight size={16} className="text-[#171716] group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href="/work"
            className="text-sm font-medium text-[#171716] hover:text-[#6F6B63] transition-colors inline-flex items-center gap-2"
          >
            VIEW ALL WORK →
          </Link>
        </div>
      </div>
    </section>
  );
}