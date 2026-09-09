"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/ui/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: "/work", label: "Work", sub: "01" },
  { href: "/services", label: "Services", sub: "02" },
  { href: "/process", label: "Process", sub: "03" },
  { href: "/about", label: "About", sub: "04" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    "Hello Layerxyz, I'm interested in starting a custom 3D printing project."
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border pb-6">
            <Logo showTagline />
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground-secondary hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-6 my-auto">
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: 0.08 * idx, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between py-2 border-b border-border/50 text-2xl font-light tracking-tight text-foreground hover:text-accent transition-colors"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-foreground-muted">
                      {link.sub}
                    </span>
                    <span className="uppercase">{link.label}</span>
                  </span>
                  <ArrowRight className="w-5 h-5 text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-3 pt-6 border-t border-border">
            <Button
              href="/start-a-project"
              size="lg"
              icon
              className="w-full"
              onClick={onClose}
            >
              Start a Project
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[3px] border border-border text-foreground-secondary hover:text-foreground hover:border-foreground font-mono text-xs uppercase tracking-wider transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Chat on WhatsApp
            </a>
            <div className="text-center font-mono text-[10px] text-foreground-muted tracking-widest uppercase pt-2">
              Tiruppur, Tamil Nadu • Digital → Physical
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
