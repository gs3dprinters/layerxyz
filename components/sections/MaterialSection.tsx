"use client";

import React, { useState } from "react";
import { Check, Layers, ShieldCheck, Thermometer } from "lucide-react";
import { MATERIALS, Material } from "@/data/materials";
import { SectionBadge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

export function MaterialSection() {
  const [selectedMat, setSelectedMat] = useState<number>(0);
  const current = MATERIALS[selectedMat];

  return (
    <section id="materials" className="relative py-28 md:py-36 bg-background">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionBadge number="06" label="SUBSTRATES & POLYMERS" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
              ENGINEERED FOR <br />
              <span className="text-foreground-secondary font-light">
                TACTILE FIDELITY.
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs text-foreground-muted max-w-sm">
            From tough engineering biopolymers to carbon-fiber reinforced
            composites and high-detail optical photopolymers.
          </div>
        </div>

        {/* Material Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Material Select Buttons Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {MATERIALS.map((mat, idx) => {
              const isSelected = selectedMat === idx;

              return (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMat(idx)}
                  className={cn(
                    "w-full text-left p-5 sm:p-6 border rounded-[2px] transition-all duration-300 select-none cursor-pointer flex items-center justify-between",
                    isSelected
                      ? "bg-surface-raised border-accent shadow-xl shadow-accent/5"
                      : "bg-surface border-border hover:border-foreground/30 hover:bg-surface-raised/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Visual Color Pill */}
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-inner flex-shrink-0"
                      style={{ backgroundColor: mat.visualColor }}
                    />
                    <div>
                      <div className="font-mono text-[10px] text-foreground-muted uppercase tracking-widest">
                        {mat.category}
                      </div>
                      <div className="text-base sm:text-lg font-medium text-foreground uppercase tracking-tight">
                        {mat.name}
                      </div>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "font-mono text-xs uppercase tracking-wider font-medium",
                      isSelected ? "text-accent" : "text-foreground-muted"
                    )}
                  >
                    {isSelected ? "ACTIVE" : "SELECT"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Material Spec Panel */}
          <div className="lg:col-span-7 bg-surface border border-border rounded-[2px] p-8 sm:p-10 flex flex-col justify-between">
            {/* Top Identity */}
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">
                    {current.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground uppercase mt-1">
                    {current.name}
                  </h3>
                </div>

                <div
                  className="w-8 h-8 rounded-full border border-white/20"
                  style={{ backgroundColor: current.visualColor }}
                />
              </div>

              <p className="text-sm sm:text-base text-foreground-secondary leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            {/* Spec Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-border font-mono text-xs">
              <div>
                <span className="text-foreground-muted block text-[10px] uppercase">
                  Surface Texture
                </span>
                <span className="text-foreground font-medium mt-1 block">
                  {current.finish}
                </span>
              </div>

              <div>
                <span className="text-foreground-muted block text-[10px] uppercase">
                  Tensile Rating
                </span>
                <span className="text-foreground font-medium mt-1 block">
                  {current.tensileStrength}
                </span>
              </div>

              <div>
                <span className="text-foreground-muted block text-[10px] uppercase">
                  Thermal Deflection
                </span>
                <span className="text-foreground font-medium mt-1 block">
                  {current.heatResistance}
                </span>
              </div>
            </div>

            {/* Applications List & Action */}
            <div className="pt-6 space-y-4">
              <div className="font-mono text-[11px] uppercase text-foreground-muted tracking-wider">
                Common Build Applications:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.applications.map((app, aIdx) => (
                  <div
                    key={aIdx}
                    className="flex items-center gap-2 text-xs text-foreground/80 font-mono"
                  >
                    <Check className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-foreground-muted">
                  AVAILABLE IN VARIOUS FINISHES
                </span>
                <Button href="/start-a-project" size="sm" icon>
                  Choose {current.name}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
