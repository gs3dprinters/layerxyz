"use client";

import React from "react";

const STRIP_ITEMS = [
  "CUSTOM FABRICATION",
  "PRECISION PRINTING",
  "LARGE-SCALE BUILDS",
  "RAPID PROTOTYPING",
  "MADE TO SPEC",
  "SURFACE CONDITIONING",
  "MULTI-PART ASSEMBLY",
  "DIGITAL → PHYSICAL",
];

export function TrustMarquee() {
  return (
    <section className="relative w-full border-y border-border bg-surface overflow-hidden py-4 select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] text-foreground-secondary">
        {/* Double array for seamless infinite marquee loop */}
        {[...STRIP_ITEMS, ...STRIP_ITEMS, ...STRIP_ITEMS].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-8 px-6 font-mono text-[11px] tracking-[0.25em] uppercase"
          >
            <span className="hover:text-foreground transition-colors cursor-default">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
          </div>
        ))}
      </div>
    </section>
  );
}
