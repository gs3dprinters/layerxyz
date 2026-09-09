import React from "react";
import type { Metadata } from "next";
import { ServicesSection } from "@/sections/ServicesSection";
import { TechSpecsSection } from "@/sections/TechSpecsSection";
import { ScaleSection } from "@/sections/ScaleSection";
import { MaterialSection } from "@/sections/MaterialSection";
import { FinalCTASection } from "@/sections/FinalCTASection";
import { SectionBadge } from "@/ui/Badge";
import { Button } from "@/ui/Button";

export const metadata: Metadata = {
  title: "Services & Capabilities — Layerxyz 3D Studio",
  description:
    "Explore our professional fabrication services: custom 3D printing, statues & sculptures, prototyping, and modular multi-piece custom fabrication.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-6 border-b border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-3">
          STUDIO CAPABILITIES // 02
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground uppercase">
          FABRICATION SERVICES.
        </h1>
        <p className="mt-4 text-foreground-secondary max-w-xl text-base sm:text-lg font-light leading-relaxed">
          Built for ideas of every scale—from sub-millimeter component prototypes to
          commanding multi-part display monoliths.
        </p>
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Scale Section */}
      <ScaleSection />

      {/* Technical Standards */}
      <TechSpecsSection />

      {/* Material Options */}
      <MaterialSection />

      {/* Closing CTA */}
      <FinalCTASection />
    </div>
  );
}
