"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Center Navigation Desktop */}
          <nav
            className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-foreground-secondary"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 transition-colors hover:text-foreground group select-none",
                    isActive && "text-foreground font-medium"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex flex-1 justify-end items-center gap-4">
            <Button
              href="/start-a-project"
              size="sm"
              icon
              className="px-5 text-[11px]"
            >
              Start a Project
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -mr-2 text-foreground hover:text-accent transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
