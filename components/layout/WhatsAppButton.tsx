"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton() {
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const message = encodeURIComponent(
    "Hi Layerxyz, I'm interested in starting a custom 3D printing project. Can you help me with a quote?"
  );
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${message}`;

  const handleClick = () => {
    trackEvent("whatsapp_click", { source: "floating_button" });
  };

  return (
    <>
      {/* Desktop Floating Button */}
      <aside aria-label="Quick contact" className="hidden md:block fixed bottom-8 right-8 z-30">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group relative flex items-center gap-3 px-4 py-3 bg-surface/90 hover:bg-surface-raised backdrop-blur-md border border-border hover:border-emerald-500/50 rounded-[4px] shadow-2xl transition-all duration-300 select-none cursor-pointer"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <div className="flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] tracking-widest uppercase text-foreground group-hover:text-emerald-400 transition-colors">
              Chat With Us
            </span>
          </div>

          <span className="font-mono text-[10px] text-foreground-muted border-l border-border pl-2">
            WhatsApp
          </span>
        </a>
      </aside>

      {/* Mobile Fixed Bottom Bar */}
      <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-background/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <Link
            href="/start-a-project"
            onClick={() => trackEvent("project_cta_click", { source: "mobile_fixed_bar" })}
            className="flex-1 h-12 flex items-center justify-center gap-2 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold rounded-[3px] active:scale-[0.98] transition-transform"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="h-12 px-4 flex items-center justify-center gap-2 bg-surface-raised border border-border text-foreground rounded-[3px] active:scale-[0.98] transition-transform"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs uppercase tracking-wider">WA</span>
          </a>
        </div>
      </aside>
    </>
  );
}
