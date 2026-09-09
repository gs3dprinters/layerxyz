"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionBadge } from "@/ui/Badge";
import { ArrowRight, Layers, Box, Cpu } from "lucide-react";
import Link from "next/link";

export function IntroSection() {
  return (
    <section className="relative py-28 md:py-40 bg-background border-b border-border">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        <SectionBadge number="01" label="WHAT WE DO" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground uppercase leading-[1.04]">
              DIGITAL FILES ARE <br />
              <span className="text-foreground-secondary font-normal">
                ONLY THE BEGINNING.
              </span>
            </h2>

            <p className="mt-8 text-lg sm:text-2xl text-foreground-secondary font-light max-w-2xl leading-relaxed">
              Layerxyz transforms digital designs into physical objects — from
              detailed figurines and prototypes to large-scale sculptures and
              custom parts.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-foreground transition-colors"
              >
                <span>Read our studio philosophy</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Editorial Technical Column */}
          <div className="lg:col-span-4 border-l border-border pl-6 lg:pl-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase text-foreground mb-2">
                <Box className="w-4 h-4 text-accent" />
                <span>Matter Conversion</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed font-mono">
                Bridging NURBS curves and polygon vertices with high-density
                polymers and engineering resins.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase text-foreground mb-2">
                <Layers className="w-4 h-4 text-accent" />
                <span>Additive Stratification</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed font-mono">
                Tuned layer deposition paths that honor geometric stress lines
                rather than generic slicing presets.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase text-foreground mb-2">
                <Cpu className="w-4 h-4 text-accent" />
                <span>Studio Refinement</span>
              </div>
              <p className="text-xs text-foreground-secondary leading-relaxed font-mono">
                Manual support de-bridging, ultrasonic welding, and custom satin
                finishing performed by hand in Tiruppur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
