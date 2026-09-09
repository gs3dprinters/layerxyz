import React from "react";
import { Check, Shield, Layers, Gauge, Maximize, Cpu } from "lucide-react";
import { SectionBadge } from "@/ui/Badge";

const SPECS = [
  {
    icon: Layers,
    title: "Layer Stratification",
    metric: "0.08mm – 0.28mm",
    description:
      "Tuned micro-layer deposition to balance surface smoothness with structural density according to project demands.",
  },
  {
    icon: Gauge,
    title: "Dimensional Tolerance",
    metric: "Down to ±0.1mm",
    description:
      "Verified against digital CAD step geometry for accurate component mating, snap-fits, and threaded fasteners.",
  },
  {
    icon: Maximize,
    title: "Production Volume",
    metric: "Up to 2.5m+ (Modular)",
    description:
      "From sub-100mm desktop collectibles to architectural scale installations using keyed dovetail joint matrices.",
  },
  {
    icon: Cpu,
    title: "Internal Density",
    metric: "15% – 100% Solid",
    description:
      "Gyroid, cubic, and concentric structural infill algorithms engineered to withstand physical load vectors.",
  },
];

export function TechSpecsSection() {
  return (
    <section className="relative py-28 md:py-36 bg-surface-card border-y border-border">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <SectionBadge number="05" label="STUDIO STANDARDS" />
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground uppercase">
            PRECISION IS BUILT <br />
            <span className="text-foreground-secondary font-light">
              INTO THE PROCESS.
            </span>
          </h2>
          <p className="mt-6 text-foreground-secondary text-sm md:text-base leading-relaxed">
            We don’t rely on generic factory presets. Every batch produced in our
            studio is calibrated for thermal shrinkage compensation, active layer
            cooling, and repeatable mechanical stability.
          </p>
        </div>

        {/* Technical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface border border-border p-6 sm:p-8 rounded-[2px] flex flex-col justify-between space-y-6 hover:border-foreground/30 transition-colors"
              >
                <div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-accent mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-xs text-foreground-muted uppercase tracking-wider mb-1">
                    {item.title}
                  </div>
                  <div className="font-mono text-2xl text-foreground font-semibold tracking-tight">
                    {item.metric}
                  </div>
                </div>

                <p className="text-xs text-foreground-secondary leading-relaxed pt-4 border-t border-border">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
