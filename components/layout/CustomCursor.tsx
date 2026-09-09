"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Detect touch device
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest("[data-cursor='view']")) {
        setCursorType("view");
      } else if (target.closest("[data-cursor='drag']")) {
        setCursorType("drag");
      } else if (
        target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='hover']")
      ) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <aside aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          scale: cursorType === "view" || cursorType === "drag" ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Context Ring */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border border-foreground/30 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: position.x,
          y: position.y,
          width: cursorType === "view" || cursorType === "drag" ? 64 : cursorType === "hover" ? 38 : 22,
          height: cursorType === "view" || cursorType === "drag" ? 64 : cursorType === "hover" ? 38 : 22,
          backgroundColor:
            cursorType === "view" || cursorType === "drag"
              ? "rgba(8, 8, 8, 0.85)"
              : "transparent",
          borderColor:
            cursorType === "view"
              ? "rgba(212, 255, 63, 0.6)"
              : cursorType === "drag"
              ? "rgba(255, 255, 255, 0.4)"
              : cursorType === "hover"
              ? "rgba(212, 255, 63, 0.4)"
              : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.15 }}
      >
        {cursorType === "view" && (
          <span className="font-mono text-[9px] tracking-widest text-accent uppercase font-bold">
            VIEW
          </span>
        )}
        {cursorType === "drag" && (
          <span className="font-mono text-[8px] tracking-widest text-foreground uppercase">
            ROTATE
          </span>
        )}
      </motion.div>
    </aside>
  );
}
