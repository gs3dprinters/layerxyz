import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "studio@layerxyz.com";

  return (
    <footer className="border-t border-border bg-surface-card text-foreground">
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-border">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Logo className="mb-4" />
              <p className="text-foreground-secondary text-sm md:text-base max-w-sm leading-relaxed mb-6">
                Professional custom 3D printing and fabrication studio. We turn
                digital designs into physical objects with industrial precision
                and studio-grade finishing.
              </p>
            </div>
            <div className="font-mono text-xs text-foreground-muted space-y-1">
              <div>STUDIO / FABRICATION LAB</div>
              <div className="text-foreground-secondary">
                Tiruppur, Tamil Nadu, India
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-2 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Navigation
            </div>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-foreground-secondary">
              <li>
                <Link
                  href="/work"
                  className="hover:text-foreground transition-colors"
                >
                  Selected Work
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/process"
                  className="hover:text-foreground transition-colors"
                >
                  Fabrication Process
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/start-a-project"
                  className="text-accent hover:underline transition-colors"
                >
                  Start a Project →
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="md:col-span-2 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Capabilities
            </div>
            <ul className="space-y-2.5 font-mono text-xs tracking-wider text-foreground-secondary">
              <li>Custom 3D Printing</li>
              <li>Statues & Figurines</li>
              <li>Functional Prototypes</li>
              <li>Architectural Models</li>
              <li>Multi-Piece Monoliths</li>
              <li>Surface Conditioning</li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-3 space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-foreground-muted">
              Direct Inquiries
            </div>
            <ul className="space-y-3 font-mono text-xs tracking-wider">
              <li>
                <a
                  href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(
                    "Hello Layerxyz, I would like to inquire about a custom 3D build."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
                >
                  <span>WhatsApp Inquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
                >
                  <span>{contactEmail}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground-secondary hover:text-foreground transition-colors"
                >
                  <span>Instagram / @layerxyz</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-[2px] bg-surface font-mono text-[11px] text-foreground-secondary">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Fabrication queue active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-foreground-muted">
          <div>
            © {currentYear} Layerxyz. All rights reserved. Made in Tiruppur, India.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-foreground-secondary">DIGITAL → PHYSICAL</span>
            <span>•</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy Notice
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms of Fabrication
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
