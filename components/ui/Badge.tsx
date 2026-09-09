import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline" | "number";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const styles = {
    default: "bg-surface-raised text-foreground-secondary border-border",
    accent: "bg-accent/10 text-accent border-accent/30",
    outline: "bg-transparent text-foreground-secondary border-border",
    number: "bg-transparent text-foreground/40 border-transparent tracking-widest",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider border rounded-[2px]",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionBadge({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground-secondary mb-4", className)}>
      <span className="text-accent">{number}</span>
      <span className="text-foreground/30">/</span>
      <span>{label}</span>
    </div>
  );
}
