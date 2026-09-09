"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { SectionBadge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Subtle studio visual backdrops for projects
const PROJECT_THEMES = [
  "linear-gradient(135deg, #18191c 0%, #0a0b0d 100%)",
  "linear-gradient(135deg, #1f1b18 0%, #0e0d0c 100%)",
  "linear-gradient(135deg, #171c18 0%, #0c0e0c 100%)",
  "linear-gradient(135deg, #1a171f 0%, #0d0b0f 100%)",
  "linear-gradient(135deg, #1c1c1c 0%, #0b0b0b 100%)",
  "linear-gradient(135deg, #15191c 0%, #0a0c0e 100%)",
];

export function WorkSection({ limit }: { limit?: number }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", "Sculpture", "Prototype", "Figurine", "Architecture", "Custom Parts"];

  const filtered = PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="selected-work" className="relative py-28 md:py-36 bg-background">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionBadge number="03" label="SELECTED WORK" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
              OBJECTS WE'VE MADE.
            </h2>
            <p className="font-mono text-xs md:text-sm text-foreground-secondary uppercase tracking-widest mt-2">
              From precision prototypes to statement-scale sculptures.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  trackEvent("project_view", { filter: cat });
                }}
                className={cn(
                  "px-3 py-1.5 uppercase rounded-[2px] border transition-colors cursor-pointer text-[11px] tracking-wider",
                  activeCategory === cat
                    ? "bg-foreground text-background border-foreground font-semibold"
                    : "bg-surface text-foreground-secondary border-border hover:border-foreground/30 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry/Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {displayed.map((project, idx) => {
            // Strategic 2-column spans for editorial rhythm
            const isWide = idx === 0 || idx === 3;
            const colSpan = isWide ? "lg:col-span-8" : "lg:col-span-4";

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                data-cursor="view"
                className={cn(
                  "group relative bg-surface border border-border hover:border-border-light rounded-[2px] overflow-hidden flex flex-col justify-between transition-all duration-500",
                  colSpan
                )}
              >
                {/* Visual Photography / Presentation Canvas */}
                <div
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] p-6 sm:p-8 flex flex-col justify-between overflow-hidden border-b border-border"
                  style={{ background: PROJECT_THEMES[idx % PROJECT_THEMES.length] }}
                >
                  {/* Subtle technical wireframe grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-700 pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                      backgroundSize: "28px 28px",
                    }}
                  />

                  {/* Project Abstract Visual Artifact Graphic */}
                  <div className="absolute inset-0 flex items-center justify-center p-12 transition-transform duration-700 ease-out group-hover:scale-105">
                    <div className="relative w-full h-full max-w-[280px] max-h-[280px] rounded-full border border-white/10 flex items-center justify-center">
                      <div className="w-3/4 h-3/4 rounded-full border border-dashed border-white/20 animate-spin-slow" />
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-widest text-foreground-muted opacity-40 group-hover:opacity-70 transition-opacity">
                        {project.category} // {project.specs.scale}
                      </div>
                    </div>
                  </div>

                  {/* Top Tags */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                    <span className="text-accent bg-background/60 backdrop-blur-md px-2.5 py-1 rounded-[2px] border border-border">
                      {project.categoryLabel}
                    </span>
                    <span className="text-foreground-muted bg-background/60 backdrop-blur-md px-2 py-1 rounded-[2px] border border-border">
                      {project.specs.dimensions}
                    </span>
                  </div>

                  {/* Bottom View Project Callout */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-foreground-muted uppercase tracking-widest mb-1">
                        FABRICATION ARCHIVE // {project.year}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground uppercase group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-border group-hover:border-accent bg-background/70 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-foreground-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Metadata Details Bar */}
                <div className="p-6 flex flex-col justify-between space-y-4">
                  <p className="text-foreground-secondary text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {project.headline}
                  </p>

                  <div className="pt-3 border-t border-border flex flex-wrap items-center justify-between font-mono text-[11px] text-foreground-muted gap-2">
                    <div>
                      MAT: <span className="text-foreground/90">{project.specs.material}</span>
                    </div>
                    <div className="text-accent group-hover:underline uppercase tracking-wider font-medium">
                      View Project Details →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Works CTA */}
        {limit && (
          <div className="mt-14 text-center">
            <Button
              href="/work"
              variant="outline"
              size="lg"
              icon
              className="px-8"
            >
              Explore Full Archive ({PROJECTS.length} Projects)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
