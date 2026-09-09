import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex flex-col select-none focus:outline-none",
        className
      )}
    >
      <div className="flex items-center gap-1.5 font-mono text-sm tracking-[0.28em] font-semibold text-foreground transition-colors group-hover:text-accent">
        <span>LAYERXYZ</span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
      </div>
      {showTagline && (
        <span className="font-mono text-[9px] tracking-[0.25em] text-foreground-muted uppercase mt-0.5">
          Digital → Physical
        </span>
      )}
    </Link>
  );
}
