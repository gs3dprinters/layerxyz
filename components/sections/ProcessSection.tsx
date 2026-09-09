"use client";

import React, { useState } from "react";
import { Upload, Sliders, Play, Sparkles, Check, ArrowRight } from "lucide-react";
import { SectionBadge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    step: "01",
    title: "UPLOAD",
    action: "Send the digital design",
    description:
      "Send us your STL, OBJ, CAD file (STEP/IGES) or even a reference concept image. We analyze volumetric feasibility and dimensional intent immediately.",
    icon: Upload,
    visualState: "Digital Raw Mesh",
    metrics: "Mesh density & watertight boundary check",
  },
  {
    step: "02",
    title: "PREPARE",
    action: "Algorithmic slicing & kinematics",
    description:
      "We inspect wall thicknesses, stress overhangs, layer trajectory, internal infill geometry, and multi-part joint dovetails to prevent shear failure.",
    icon: Sliders,
    visualState: "Sliced Toolpaths (G-Code)",
    metrics: "Variable layer height & orientation optimization",
  },
  {
    step: "03",
    title: "PRINT",
    action: "Stratified deposition",
    description:
      "The model is produced using carefully tuned printing parameters—thermal bed mapping, controlled chamber ambient temps, and active micro-cooling.",
    icon: Play,
    visualState: "Stratified Physical Solid",
    metrics: "Continuous thermal & layer telemetry",
  },
  {
    step: "04",
    title: "FINISH",
    action: "Studio craftsmanship",
    description:
      "Parts are de-supported by hand, seam-welded, ultrasonic bonded, deburred, primed, and satin conditioned to achieve a gallery-grade physical tactile finish.",
    icon: Sparkles,
    visualState: "Refined Final Object",
    metrics: "Hand-finished surface calibration",
  },
];

export function ProcessSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="process" className="relative py-28 md:py-36 bg-background border-t border-border">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionBadge number="04" label="FABRICATION PIPELINE" />
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
              FROM FILE TO <br />
              <span className="text-foreground-secondary font-light">
                FINISHED OBJECT.
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs text-foreground-muted max-w-sm">
            A methodical four-stage pipeline that bridges pure digital CAD
            mathematics into physical matter with zero compromise on surface
            quality.
          </div>
        </div>

        {/* Interactive 4-Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Stage Buttons / Pipeline Steps */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              const Icon = stage.icon;

              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStage(idx)}
                  className={cn(
                    "w-full text-left p-6 sm:p-7 border rounded-[2px] transition-all duration-300 select-none cursor-pointer flex flex-col justify-between",
                    isActive
                      ? "bg-surface-raised border-accent shadow-xl shadow-accent/5"
                      : "bg-surface border-border hover:border-foreground/30 hover:bg-surface-raised/50"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "font-mono text-xs font-bold tracking-widest",
                          isActive ? "text-accent" : "text-foreground-muted"
                        )}
                      >
                        {stage.step} //
                      </span>
                      <h3 className="text-lg sm:text-xl font-medium tracking-tight text-foreground uppercase">
                        {stage.title}
                      </h3>
                    </div>
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center transition-colors",
                        isActive
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-foreground-muted"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground-secondary leading-relaxed pl-8">
                    {stage.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Visual State Progression Monitor */}
          <div className="lg:col-span-6 bg-surface border border-border rounded-[2px] p-8 sm:p-10 flex flex-col justify-between">
            {/* Monitor Header */}
            <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[11px] uppercase tracking-wider text-foreground-muted">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>ACTIVE STAGE: {STAGES[activeStage].step}</span>
              </div>
              <div className="text-foreground-secondary">
                {STAGES[activeStage].visualState}
              </div>
            </div>

            {/* Central Wireframe to Solid Transformation Graphic */}
            <div className="my-10 relative aspect-square max-h-[300px] mx-auto w-full flex items-center justify-center">
              {/* Dynamic State Diagram */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Outermost wireframe circle */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full border transition-all duration-700",
                    activeStage >= 0
                      ? "border-accent/40 border-dashed animate-spin-slow"
                      : "border-border"
                  )}
                />

                {/* Slicing contour lines */}
                <div
                  className={cn(
                    "absolute inset-6 rounded-full border transition-all duration-700",
                    activeStage >= 1
                      ? "border-foreground/60 scale-100"
                      : "border-border/30 scale-90"
                  )}
                />

                {/* Stratified Core */}
                <div
                  className={cn(
                    "w-36 h-36 rounded-full flex flex-col items-center justify-center p-4 text-center transition-all duration-700 shadow-2xl",
                    activeStage === 3
                      ? "bg-foreground text-background scale-105"
                      : "bg-surface-raised border border-accent/40 text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold mb-1">
                    {activeStage === 3 ? "OBJECT COMPLETE" : "IN PROCESS"}
                  </span>
                  <span className="text-xs uppercase font-medium">
                    {STAGES[activeStage].visualState}
                  </span>
                </div>
              </div>
            </div>

            {/* Monitor Footer Metrics */}
            <div className="space-y-4 pt-4 border-t border-border font-mono text-xs">
              <div className="flex items-center justify-between text-foreground-muted">
                <span>VERIFICATION METRIC:</span>
                <span className="text-foreground">{STAGES[activeStage].metrics}</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-foreground-muted">
                  READY TO SEND A FILE?
                </span>
                <Button href="/start-a-project" size="sm" icon>
                  Upload 3D Model
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
