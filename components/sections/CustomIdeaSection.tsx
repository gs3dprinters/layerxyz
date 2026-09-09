"use client";

import React from "react";
import { Button } from "@/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function CustomIdeaSection() {
  const handleStart = () => {
    trackEvent("project_cta_click", { source: "custom_idea_section" });
  };

  return (
    <section className="relative py-32 md:py-44 bg-surface-card border-y border-border overflow-hidden">
      {/* Abstract Architectural Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(212, 255, 63, 0.12) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded-[2px] bg-surface font-mono text-[11px] uppercase tracking-widest text-accent mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BESPOKE FABRICATION</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground uppercase max-w-4xl mx-auto leading-[1.02]">
          HAVE AN IDEA THAT DOESN’T <br />
          <span className="text-foreground-secondary font-light">
            FIT A TEMPLATE?
          </span>
        </h2>

        <div className="mt-6 font-mono text-lg sm:text-xl text-accent tracking-widest uppercase font-medium">
          Good. Neither do we.
        </div>

        <p className="mt-6 text-foreground-secondary text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Tell us what you're building. We'll help figure out the best way to
          slice, reinforce, and make it physical.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            href="/start-a-project"
            size="lg"
            icon
            onClick={handleStart}
            className="px-10 text-xs font-semibold"
          >
            Start a Project
          </Button>

          <Button
            href="/process"
            variant="outline"
            size="lg"
            className="px-8 text-xs text-foreground-secondary hover:text-foreground"
          >
            Explore Fabrication Pipeline
          </Button>
        </div>

        {/* Technical Subtext */}
        <div className="mt-12 font-mono text-xs text-foreground-muted uppercase tracking-wider">
          NON-DISCLOSURE AGREEMENTS RESPECTED • DIRECT CAD REVIEWS
        </div>
      </div>
    </section>
  );
}
