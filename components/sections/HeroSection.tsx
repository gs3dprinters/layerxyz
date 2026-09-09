"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/ui/Button";
import { HeroSculpture } from "@/3d/HeroSculpture";
import { trackEvent } from "@/lib/analytics";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const handleStartClick = () => {
    trackEvent("project_cta_click", { source: "hero_primary" });
  };

  return (
    <section className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-background">
      {/* Precision Background Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Typography Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Studio Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 border border-border rounded-[2px] bg-surface font-mono text-[11px] uppercase tracking-widest text-foreground-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
                <span>FABRICATION STUDIO</span>
                <span className="text-foreground/30">•</span>
                <span className="text-foreground-muted">TIRUPPUR, INDIA</span>
              </div>
            </motion.div>

            {/* Master Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-medium tracking-tight text-foreground leading-[0.92] uppercase select-none"
            >
              <span className="block">WE TURN</span>
              <span className="block text-foreground/90">DIGITAL IDEAS</span>
              <span className="block">INTO PHYSICAL</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground-secondary to-foreground/40">
                OBJECTS.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-base sm:text-lg text-foreground-secondary font-light leading-relaxed"
            >
              Custom 3D printing, sculptures, prototypes and fabrication —
              engineered and finished to your exact physical specifications.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Button
                href="/start-a-project"
                size="lg"
                icon
                onClick={handleStartClick}
                className="px-8 text-xs font-semibold"
              >
                Start a Project
              </Button>

              <Button
                href="#selected-work"
                variant="outline"
                size="lg"
                className="px-6 text-xs text-foreground-secondary hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <span>Explore Our Work</span>
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                </span>
              </Button>
            </motion.div>

            {/* Technical Verification Strip */}
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t border-border/70 grid grid-cols-3 gap-4 font-mono text-xs"
            >
              <div>
                <span className="text-foreground-muted block text-[10px] uppercase tracking-wider">
                  Tolerances
                </span>
                <span className="text-foreground font-medium mt-0.5 block">
                  Down to ±0.1mm
                </span>
              </div>
              <div>
                <span className="text-foreground-muted block text-[10px] uppercase tracking-wider">
                  Scale Envelope
                </span>
                <span className="text-foreground font-medium mt-0.5 block">
                  50mm – 2.5m+
                </span>
              </div>
              <div>
                <span className="text-foreground-muted block text-[10px] uppercase tracking-wider">
                  Base Material
                </span>
                <span className="text-foreground font-medium mt-0.5 block">
                  From ₹5 / gram
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right / 3D Visual Object Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="lg:col-span-5 relative w-full flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-[540px] rounded-[2px] bg-gradient-to-b from-surface/50 to-transparent border border-border p-2">
              {/* Live 3D Sculpture Component */}
              <HeroSculpture />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Subtle Navigation Cue */}
      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-10 lg:px-16 w-full pt-8 flex items-center justify-between text-foreground-muted font-mono text-[10px] uppercase tracking-widest border-t border-border/40">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>LAYERXYZ STUDIO // ARCHIVE 2026</span>
        </div>
        <div className="hidden sm:block">SCROLL TO EXAMINE FABRICATIONS ↓</div>
      </div>
    </section>
  );
}
