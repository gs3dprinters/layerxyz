"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function AccordionItem({
  id,
  title,
  children,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  return (
    <div className="border-b border-border transition-colors duration-300">
      <button
        id={`faq-btn-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="w-full py-7 flex items-center justify-between text-left group cursor-pointer select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        <div className="flex items-start gap-6 md:gap-10 pr-4">
          <span className="font-mono text-xs text-foreground-muted mt-1 tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg md:text-xl font-normal text-foreground group-hover:text-foreground/80 tracking-tight transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground-secondary group-hover:border-foreground/30 transition-all duration-300">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-accent" />
          ) : (
            <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform duration-300" />
          )}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12 md:pl-16 pr-4 text-foreground-secondary text-sm md:text-base leading-relaxed max-w-3xl">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: Array<{ id: string; question: string; answer: string }>;
  defaultOpenIndex?: number;
}

export function Accordion({ items, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full divide-y divide-border border-t border-border">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.question}
          index={index}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          {item.answer}
        </AccordionItem>
      ))}
    </div>
  );
}
