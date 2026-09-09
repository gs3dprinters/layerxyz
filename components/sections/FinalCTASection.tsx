"use client";

import React from "react";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/ui/Button";
import { trackEvent } from "@/lib/analytics";

export function FinalCTASection() {
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    "Hi Layerxyz, I have a project ready to build. Let's discuss."
  )}`;

  return (
    <section className="relative py-32 md:py-48 bg-surface-card border-t border-border overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-site mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-6">
          DIGITAL → PHYSICAL
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-foreground uppercase leading-[0.92] max-w-5xl mx-auto">
          READY TO MAKE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground-secondary to-foreground/50">
            IT REAL?
          </span>
        </h2>

        <p className="mt-8 text-lg sm:text-xl text-foreground-secondary font-light max-w-xl mx-auto leading-relaxed">
          Send us the idea. We'll take it from there.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Button
            href="/start-a-project"
            size="lg"
            icon
            onClick={() => trackEvent("project_cta_click", { source: "final_cta" })}
            className="px-10 text-xs font-semibold"
          >
            Start a Project
          </Button>

          <Button
            href={whatsappUrl}
            variant="outline"
            size="lg"
            external
            onClick={() => trackEvent("whatsapp_click", { source: "final_cta" })}
            className="px-8 text-xs text-foreground-secondary hover:text-foreground border-border hover:border-emerald-500/50"
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Us</span>
            </span>
          </Button>
        </div>

        {/* Location & Studio Stamp */}
        <div className="mt-16 font-mono text-[11px] text-foreground-muted uppercase tracking-widest">
          STUDIO LOCATION: TIRUPPUR, TAMIL NADU, INDIA • ZERO COMPROMISE FABRICATION
        </div>
      </div>
    </section>
  );
}
