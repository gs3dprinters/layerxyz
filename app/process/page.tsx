import React from "react";
import type { Metadata } from "next";
import { ProcessSection } from "@/sections/ProcessSection";
import { TechSpecsSection } from "@/sections/TechSpecsSection";
import { FinalCTASection } from "@/sections/FinalCTASection";
import { SectionBadge } from "@/ui/Badge";
import { CheckCircle2, Sliders, Layers, Hammer, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Fabrication Process — Layerxyz 3D Studio",
  description:
    "How we turn CAD geometry into physical matter: model inspection, algorithmic toolpaths, thermal control, and artisan finishing.",
};

const FINISHING_STEPS = [
  {
    title: "Manual Support De-Bridging",
    desc: "Carefully separating sacrificial tree supports and contact interfaces with micro-cutters to leave no surface divots.",
  },
  {
    title: "Ultrasonic Seam Welding",
    desc: "Fusing modular segments together at the molecular level using mechanical alignment keyways for unbreakable joint bonds.",
  },
  {
    title: "Threaded Heat-Set Inserts",
    desc: "Installing high-strength brass M2/M3/M4 threads directly into boss holes for repeatable mechanical fastener assembly.",
  },
  {
    title: "Surface Conditioning & Satin Sealing",
    desc: "Micro-abrasive blasting, primer leveling, and UV-resistant matte conditioning for an editorial gallery-ready tactile touch.",
  },
];

export default function ProcessPage() {
  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-6 border-b border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-3">
          METHODOLOGY // 03
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground uppercase">
          HOW WE BUILD.
        </h1>
        <p className="mt-4 text-foreground-secondary max-w-xl text-base sm:text-lg font-light leading-relaxed">
          The rigorous engineering pipeline connecting digital NURBS surfaces to
          tactile physical reality.
        </p>
      </div>

      {/* Main Process Section */}
      <ProcessSection />

      {/* Finishing Spotlight Section */}
      <section className="py-24 bg-surface-card border-y border-border">
        <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
          <SectionBadge number="04" label="POST-PROCESSING STANDARDS" />
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase max-w-3xl mb-12">
            BUILT BY ALGORITHMS. <br />
            <span className="text-foreground-secondary font-light">
              FINISHED BY HAND.
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FINISHING_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-surface border border-border p-6 rounded-[2px] flex flex-col justify-between space-y-6"
              >
                <div className="font-mono text-xs text-accent font-semibold">
                  0{idx + 1} // FINISH
                </div>
                <h3 className="text-lg font-medium text-foreground uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-foreground-secondary leading-relaxed font-mono pt-4 border-t border-border">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <TechSpecsSection />

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
}
