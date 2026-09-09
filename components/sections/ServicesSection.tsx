"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SectionBadge } from "@/ui/Badge";
import { cn } from "@/lib/utils";

// Visual procedural textures for each service to ensure rich, luxury design visuals
const SERVICE_PATTERNS = [
  // Custom 3D Printing: Stratified layer topography
  `radial-gradient(circle at 75% 25%, rgba(212, 255, 63, 0.08) 0%, transparent 60%), linear-gradient(135deg, #161616 0%, #0c0c0c 100%)`,
  // Statues & Sculptures: Curvilinear sculpted contours
  `radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.06) 0%, transparent 60%), linear-gradient(135deg, #181818 0%, #0d0d0d 100%)`,
  // Prototyping: Technical coordinate wireframe
  `radial-gradient(circle at 80% 80%, rgba(212, 255, 63, 0.06) 0%, transparent 50%), linear-gradient(135deg, #151515 0%, #0a0a0a 100%)`,
  // Custom Fabrication: Multi-segment architectural lattice
  `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.07) 0%, transparent 50%), linear-gradient(135deg, #171717 0%, #0e0e0e 100%)`,
];

export function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-28 md:py-36 bg-background">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionBadge number="02" label="SERVICES" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
              BUILT FOR IDEAS <br />
              <span className="text-foreground-secondary font-light">
                OF EVERY SCALE.
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs text-foreground-muted max-w-sm">
            Whether validating a single mechanical prototype or engineering a
            multi-part gallery sculpture, our process adapts to exact dimensions.
          </div>
        </div>

        {/* 4 Large Editorial Service Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, idx) => {
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative bg-surface border border-border hover:border-foreground/30 transition-all duration-500 rounded-[2px] overflow-hidden flex flex-col justify-between"
              >
                {/* Thin animated line traveling across card on hover */}
                <div
                  className={cn(
                    "absolute top-0 left-0 right-0 h-[2px] bg-accent transition-transform duration-700 ease-out z-20 origin-left",
                    isHovered ? "scale-x-100" : "scale-x-0"
                  )}
                />

                {/* Top Visual Canvas Block */}
                <div
                  className="relative w-full h-56 sm:h-64 p-6 sm:p-8 flex flex-col justify-between border-b border-border overflow-hidden"
                  style={{ background: SERVICE_PATTERNS[idx % SERVICE_PATTERNS.length] }}
                >
                  {/* Subtle technical background grid */}
                  <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Header within Visual Area */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-mono text-xs text-accent tracking-widest font-semibold">
                      {service.number} // FABRICATION
                    </span>
                    <span className="font-mono text-[10px] text-foreground-muted uppercase tracking-wider">
                      {service.specs.tolerances}
                    </span>
                  </div>

                  {/* Visual Subtitle & Animated Arrow */}
                  <div className="relative z-10 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-xs text-foreground-muted uppercase tracking-wider mb-1">
                        {service.subtitle}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground uppercase group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>

                    <div className="w-10 h-10 rounded-full border border-border group-hover:border-accent bg-background/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-foreground-secondary group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Content & Specs Block */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2.5 pt-2 border-t border-border/50">
                    {service.capabilities.map((cap, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-2.5 text-xs font-mono text-foreground/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Technical Strip */}
                  <div className="pt-4 border-t border-border flex items-center justify-between font-mono text-[11px] text-foreground-muted">
                    <div>
                      ENVELOPE:{" "}
                      <span className="text-foreground-secondary">
                        {service.specs.buildEnvelope}
                      </span>
                    </div>
                    <Link
                      href="/start-a-project"
                      className="text-accent hover:underline uppercase tracking-wider font-semibold"
                    >
                      Inquire →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
