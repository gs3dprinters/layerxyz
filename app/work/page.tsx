import React from "react";
import type { Metadata } from "next";
import { WorkSection } from "@/sections/WorkSection";
import { FinalCTASection } from "@/sections/FinalCTASection";

export const metadata: Metadata = {
  title: "Selected Work — Layerxyz 3D Studio",
  description:
    "Explore our archive of custom 3D printed statues, functional prototypes, architectural models, and large-scale modular sculptures.",
};

export default function WorkArchivePage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      {/* Editorial Header */}
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-6 border-b border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-3">
          PORTFOLIO ARCHIVE // 01
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground uppercase">
          FABRICATED OBJECTS.
        </h1>
        <p className="mt-4 text-foreground-secondary max-w-xl text-base sm:text-lg font-light leading-relaxed">
          A curated selection of commissions fabricated from high-grade polymers,
          composite fibers, and optical photopolymers.
        </p>
      </div>

      {/* Full Work Gallery */}
      <WorkSection />

      {/* Conversion Section */}
      <FinalCTASection />
    </div>
  );
}
