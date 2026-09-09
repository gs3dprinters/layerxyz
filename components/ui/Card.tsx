import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  cornerMarks?: boolean;
}

export function Card({
  className,
  children,
  hoverEffect = true,
  cornerMarks = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface border border-border transition-all duration-500 rounded-[2px]",
        hoverEffect && "hover:border-border-light hover:bg-surface-raised/80",
        className
      )}
      {...props}
    >
      {cornerMarks && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/30 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/30 pointer-events-none" />
        </>
      )}
      {children}
    </div>
  );
}
