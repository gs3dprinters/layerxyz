import React from "react";
import type { Metadata } from "next";
import { SectionBadge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { FinalCTASection } from "@/sections/FinalCTASection";
import { ArrowUpRight, MapPin, Compass, ShieldCheck, Hammer } from "lucide-react";

export const metadata: Metadata = {
  title: "About Layerxyz — Fabrication Studio in Tiruppur",
  description:
    "Layerxyz is a custom 3D printing and physical fabrication studio based in Tiruppur, Tamil Nadu, turning digital concepts into tangible objects.",
};

export default function AboutPage() {
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "studio@layerxyz.com";

  return (
    <div className="pt-24 min-h-screen bg-background text-foreground">
      {/* Editorial Header */}
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-6 border-b border-border">
        <div className="font-mono text-xs text-accent uppercase tracking-[0.25em] mb-3">
          STUDIO ESSENCE // 04
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground uppercase leading-[0.98]">
          WE MAKE DIGITAL <br />
          <span className="text-foreground-secondary font-light">
            THINGS REAL.
          </span>
        </h1>
        <p className="mt-4 text-foreground-secondary max-w-xl text-base sm:text-lg font-light leading-relaxed">
          Based in Tiruppur, Tamil Nadu. Combining digital fabrication precision
          with hands-on post-processing to create objects meant to exist beyond
          the screen.
        </p>
      </div>

      {/* Main Narrative & Studio Philosophy */}
      <section className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 py-24 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight text-foreground uppercase">
              NOT JUST SOMEONE WITH A 3D PRINTER.
            </h2>

            <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed font-light">
              Layerxyz is a custom 3D printing studio focused on turning digital
              designs into physical objects. From one-off creations to large,
              multi-part builds, we combine digital fabrication with hands-on
              finishing to create objects that are meant to exist beyond the
              screen.
            </p>

            <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed font-light">
              We started Layerxyz to bridge the divide between high-end digital
              artistry and real-world industrial tactility. While software allows
              infinite digital manipulation, bringing complex forms into the
              tangible realm requires deep understanding of polymer thermal
              shrinkage, mechanical stress vectors, joint tolerances, and surface
              refinement.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/start-a-project" size="lg" icon>
                Start a Project
              </Button>
              <Button
                href={`https://wa.me/${whatsappNum}`}
                variant="outline"
                size="lg"
                external
              >
                Direct WhatsApp Inquiries
              </Button>
            </div>
          </div>

          {/* Studio Credentials & Location Card */}
          <div className="lg:col-span-5 bg-surface border border-border p-8 rounded-[2px] space-y-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-widest mb-3">
                <MapPin className="w-4 h-4" />
                <span>STUDIO LOCATION</span>
              </div>
              <div className="text-xl font-medium text-foreground uppercase">
                Tiruppur, Tamil Nadu, India
              </div>
              <p className="text-xs text-foreground-muted font-mono mt-1">
                Servicing clients across Tamil Nadu, Bangalore, Mumbai, and all of India.
              </p>
            </div>

            <div className="border-t border-border pt-6 space-y-4 font-mono text-xs">
              <div className="flex items-start gap-3">
                <Compass className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <span className="text-foreground-muted uppercase block">Core Focus</span>
                  <span className="text-foreground mt-0.5 block">
                    Custom 3D Printing, Statues, Prototypes & Large-Format Builds
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <span className="text-foreground-muted uppercase block">Quality Standard</span>
                  <span className="text-foreground mt-0.5 block">
                    Layer lines down to 0.08mm • Sub-millimeter keyed joints
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hammer className="w-4 h-4 text-accent mt-0.5" />
                <div>
                  <span className="text-foreground-muted uppercase block">Materials</span>
                  <span className="text-foreground mt-0.5 block">
                    PLA Pro+, Matte Carbon PETG, Engineering Resins
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6 font-mono text-xs text-foreground-muted">
              Direct: <span className="text-foreground">{contactEmail}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workshop / Atmosphere Mockup */}
      <section className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div
          className="relative w-full aspect-[21/9] max-h-[480px] bg-surface-card border border-border rounded-[2px] p-8 sm:p-14 flex flex-col justify-between overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(212, 255, 63, 0.06) 0%, transparent 60%), linear-gradient(135deg, #161616 0%, #0a0a0a 100%)",
          }}
        >
          <div className="flex items-center justify-between font-mono text-xs text-accent uppercase tracking-widest">
            <span>STUDIO ENVIRONMENT // WORKSHOP</span>
            <span className="text-foreground-muted">TIRUPPUR FACILITY</span>
          </div>

          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-4xl font-normal tracking-tight text-foreground uppercase">
              BUILT FOR ONE-OFF IDEAS.
            </h3>
            <p className="text-foreground-secondary text-sm sm:text-base mt-2">
              Whether you need one unique sculpture or a functional prototype for
              user validation, we apply the exact same high-precision rigor.
            </p>
          </div>

          <div className="font-mono text-[11px] text-foreground-muted uppercase tracking-wider">
            LAYERXYZ STUDIO • 2026
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTASection />
    </div>
  );
}
