import React from "react";
import { FAQS } from "@/data/faqs";
import { Accordion } from "@/ui/Accordion";
import { SectionBadge } from "@/ui/Badge";
import { ArrowUpRight } from "lucide-react";

export function FAQSection() {
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    "Hi Layerxyz, I have a question regarding a 3D printing project."
  )}`;

  return (
    <section id="faq" className="relative py-28 md:py-36 bg-background">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Heading & Direct Support Link */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <SectionBadge number="07" label="QUESTIONS & CLARIFICATIONS" />
            <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase leading-[1.05]">
              FREQUENTLY <br />
              <span className="text-foreground-secondary font-light">
                ANSWERED.
              </span>
            </h2>

            <p className="mt-6 text-foreground-secondary text-sm leading-relaxed">
              Transparent answers about our fabrication capabilities, pricing
              structure, file compatibility, and finishing standards.
            </p>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="font-mono text-xs text-foreground-muted uppercase mb-2">
                Have a unique specification?
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-accent hover:underline"
              >
                <span>Ask directly via WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8">
            <Accordion items={FAQS} defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
