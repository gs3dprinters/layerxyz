"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  external?: boolean;
  arrowType?: "right" | "up-right";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      href,
      variant = "primary",
      size = "md",
      icon = false,
      external = false,
      arrowType = "right",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center font-mono text-xs tracking-wider uppercase transition-all duration-300 select-none cursor-pointer overflow-hidden border disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-foreground text-background border-foreground hover:bg-transparent hover:text-foreground active:scale-[0.98]",
      secondary:
        "bg-surface-raised text-foreground border-border hover:border-foreground active:scale-[0.98]",
      outline:
        "bg-transparent text-foreground border-border hover:border-foreground active:scale-[0.98]",
      ghost:
        "bg-transparent text-foreground-secondary border-transparent hover:text-foreground active:scale-[0.98]",
      accent:
        "bg-accent text-background border-accent font-semibold hover:bg-transparent hover:text-accent hover:border-accent active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-10 px-4 gap-2 rounded-[2px]",
      md: "h-12 px-6 gap-3 rounded-[3px]",
      lg: "h-14 px-8 gap-3 text-sm rounded-[4px]",
    };

    const ArrowIcon = arrowType === "up-right" ? ArrowUpRight : ArrowRight;

    const content = (
      <>
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
          {children}
        </span>
        {icon && (
          <ArrowIcon className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-0" />
        )}
      </>
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
          >
            {content}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
