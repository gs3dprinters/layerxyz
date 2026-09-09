"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, Layers, Cpu, Compass } from "lucide-react";
import { SectionBadge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface ScaleTier {
  id: string;
  sizeLabel: string;
  title: string;
  dimension: string;
  heightMm: number;
  segments: string;
  description: string;
  application: string;
  tolerance: string;
}

const SCALE_TIERS: ScaleTier[] = [
  {
    id: "small",
    sizeLabel: "SMALL",
    title: "FIGURINES & MINIATURES",
    dimension: "50 – 150 mm",
    heightMm: 120,
    segments: "Single piece, zero seams",
    description:
      "Engineered for microscopic facial contours, articulated mechanical joints, and tabletop collectors.",
    application: "Custom statues, collector figurines, jewelry prototypes",
    tolerance: "±0.08 mm",
  },
  {
    id: "medium",
    sizeLabel: "MEDIUM",
    title: "PRODUCT HOUSINGS & MODELS",
    dimension: "150 – 400 mm",
    heightMm: 280,
    segments: "Monolithic or 2-part keyed assembly",
    description:
      "Validating physical handheld ergonomics, snap locks, internal PCB mounting bosses, and aesthetic consumer shells.",
    application: "Audio gear enclosures, IoT prototypes, functional assemblies",
    tolerance: "±0.12 mm",
  },
  {
    id: "large",
    sizeLabel: "LARGE",
    title: "DISPLAY STATUES & PAVILIONS",
    dimension: "400 – 1000 mm",
    heightMm: 750,
    segments: "4 – 8 indexed precision sections",
    description:
      "Substantial exhibition centerpieces and architectural scale studies produced with internal weight balancing and invisible joints.",
    application: "Architectural presentations, retail visual displays, brand icons",
    tolerance: "±0.25 mm aligned",
  },
  {
    id: "xl",
    sizeLabel: "XL / STATEMENT",
    title: "MULTI-PART MONOLITHS",
    dimension: "1000 – 2500+ mm",
    heightMm: 1900,
    segments: "10 – 30+ interlocking structural segments",
    description:
      "Life-size character statues, monumental architectural installations, and kinetic public art engineered with carbon reinforcement.",
    application: "Exhibition pavilions, stage monuments, architectural facades",
    tolerance: "Sub-millimeter joined",
  },
];

export function ScaleSection() {
  const [selectedIdx, setSelectedIdx] = useState(2); // Start at Large
  const current = SCALE_TIERS[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    trackEvent("scale_interaction", { scale: SCALE_TIERS[idx].sizeLabel });
  };

  return (
    <section className="relative py-28 md:py-36 bg-surface-card border-b border-border overflow-hidden">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>DIMENSIONAL RANGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
              FROM DESKTOP-SIZED <br />
              <span className="text-foreground-secondary font-light">
                TO STATEMENT-SIZED.
              </span>
            </h2>
            <p className="font-mono text-xs md:text-sm text-foreground-secondary uppercase tracking-widest mt-2">
              Size shouldn't limit the idea.
            </p>
          </div>

          <div className="font-mono text-xs text-foreground-muted max-w-sm leading-relaxed">
            Most desktop 3D printers halt at 250mm. Our studio pipeline utilizes
            algorithmic mesh slicing, hidden keyways, and structural armatures
            to fabricate at true architectural and human scales.
          </div>
        </div>

        {/* Interactive Scale Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {SCALE_TIERS.map((tier, idx) => {
            const isSelected = selectedIdx === idx;

            return (
              <button
                key={tier.id}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "p-5 text-left border rounded-[2px] transition-all duration-300 select-none cursor-pointer flex flex-col justify-between",
                  isSelected
                    ? "bg-surface-raised border-accent shadow-lg shadow-accent/5"
                    : "bg-surface border-border hover:border-foreground/30 hover:bg-surface-raised/50"
                )}
              >
                <div className="flex items-center justify-between font-mono text-[11px] tracking-widest uppercase mb-3">
                  <span className={isSelected ? "text-accent font-semibold" : "text-foreground-muted"}>
                    {tier.sizeLabel}
                  </span>
                  <span className="text-foreground-secondary">{tier.dimension}</span>
                </div>
                <div className="font-mono text-xs text-foreground font-medium uppercase truncate">
                  {tier.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Scale Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-background border border-border p-6 sm:p-10 rounded-[2px]">
          {/* Visual Scale Canvas with Human Reference */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[460px] bg-surface border border-border/60 rounded-[2px] p-6 flex items-end justify-center overflow-hidden">
            {/* Height measurement ticks */}
            <div className="absolute top-4 left-4 bottom-4 w-12 border-r border-border/50 flex flex-col justify-between font-mono text-[10px] text-foreground-muted select-none">
              <span>2500 MM</span>
              <span>1800 MM — (HUMAN)</span>
              <span>1000 MM</span>
              <span>400 MM</span>
              <span>0 MM</span>
            </div>

            {/* Scale comparison layout */}
            <div className="relative z-10 flex items-end justify-center gap-12 sm:gap-20 w-full pl-12 h-full pb-4">
              {/* Human Reference Silhouette */}
              <div className="flex flex-col items-center select-none opacity-40">
                <div
                  className="w-12 sm:w-16 rounded-t-full bg-foreground-muted/40 border border-foreground/20 relative"
                  style={{ height: "240px" }}
                >
                  <div className="w-5 h-5 rounded-full bg-foreground-muted/50 mx-auto -mt-6" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-foreground-muted mt-2">
                  Human (1.8m)
                </span>
              </div>

              {/* Dynamic Object Silhouette */}
              <div className="flex flex-col items-center select-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: `${Math.max(28, (current.heightMm / 2500) * 320)}px`,
                      opacity: 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                    className={cn(
                      "w-20 sm:w-28 border border-accent bg-accent/10 rounded-[2px] relative flex flex-col justify-between p-2 shadow-2xl shadow-accent/10"
                    )}
                  >
                    {/* Bounding box corner accents */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-accent" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-accent" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-accent" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-accent" />

                    <div className="font-mono text-[9px] text-accent tracking-wider uppercase text-center">
                      {current.dimension}
                    </div>

                    <div className="flex items-center justify-center">
                      <Maximize2 className="w-4 h-4 text-accent/80 animate-pulse" />
                    </div>

                    <div className="font-mono text-[8px] text-foreground-muted tracking-widest text-center uppercase truncate">
                      {current.sizeLabel}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-semibold mt-2">
                  Layerxyz Object
                </span>
              </div>
            </div>

            {/* Bottom Horizon Line */}
            <div className="absolute bottom-4 left-4 right-4 h-[1px] bg-border" />
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="font-mono text-xs text-accent uppercase tracking-widest mb-1">
                Tier Specification // {current.sizeLabel}
              </div>
              <h3 className="text-2xl font-normal tracking-tight text-foreground uppercase">
                {current.title}
              </h3>
              <p className="mt-4 text-sm text-foreground-secondary leading-relaxed">
                {current.description}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-start gap-3">
                <Layers className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-mono text-[11px] uppercase text-foreground-muted">
                    Modular Segmentation
                  </div>
                  <div className="text-xs text-foreground font-medium mt-0.5">
                    {current.segments}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Cpu className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-mono text-[11px] uppercase text-foreground-muted">
                    Assembly Tolerances
                  </div>
                  <div className="text-xs text-foreground font-medium mt-0.5">
                    {current.tolerance}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-mono text-[11px] uppercase text-foreground-muted mb-1">
                  Ideal Applications
                </div>
                <div className="text-xs text-foreground-secondary">
                  {current.application}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button href="/start-a-project" size="md" icon className="w-full">
                Configure {current.sizeLabel} Build
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
