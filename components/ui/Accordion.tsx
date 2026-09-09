'use client';

import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ChevronDown } from 'lucide-react';

const AccordionContext = createContext<{
  openItems: Set<string | number>;
  toggleItem: (id: string | number) => void;
}>({
  openItems: new Set(),
  toggleItem: () => {},
});

const AccordionItemContext = createContext<{
  id: string | number;
  isOpen: boolean;
}>({
  id: '',
  isOpen: false,
});

export interface AccordionItemProps {
  title?: string;
  content?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  id?: string;
  value?: string;
  className?: string;
  children?: React.ReactNode;
}

export function AccordionItem({
  title,
  content,
  isOpen: controlledIsOpen,
  onToggle,
  id,
  value,
  className = '',
  children,
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  const itemId = value || id || title || 'accordion-item';
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : context.openItems.has(itemId);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      context.toggleItem(itemId);
    }
  };

  // If children are provided, render as composable container
  if (children) {
    return (
      <AccordionItemContext.Provider value={{ id: itemId, isOpen }}>
        <div className={`border-b border-[#E8E5DE] last:border-b-0 ${className}`}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }

  // Otherwise render title + content mode
  const contentId = `accordion-content-${itemId}`;
  const headerId = `accordion-header-${itemId}`;

  return (
    <div className={`border-b border-[#E8E5DE] last:border-b-0 ${className}`}>
      <button
        type="button"
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={handleToggle}
        className="flex w-full items-center justify-between py-5 text-left text-base font-medium text-[#181818] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B7FF00]/50"
      >
        <span>{title}</span>
        <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F3EE]">
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#181818]" />
          ) : (
            <Plus className="h-4 w-4 text-[#181818]" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden"
          >
            <div className="pb-5 pr-10 text-sm leading-relaxed text-[#777777]">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AccordionTrigger({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const itemCtx = useContext(AccordionItemContext);
  const accCtx = useContext(AccordionContext);

  return (
    <button
      type="button"
      aria-expanded={itemCtx.isOpen}
      onClick={() => accCtx.toggleItem(itemCtx.id)}
      className={`flex w-full items-center justify-between py-4 text-left font-medium text-[#181818] transition-colors focus:outline-none ${className}`}
    >
      <span>{children}</span>
      <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F3EE]">
        {itemCtx.isOpen ? (
          <Minus className="h-4 w-4 text-[#181818]" />
        ) : (
          <Plus className="h-4 w-4 text-[#181818]" />
        )}
      </span>
    </button>
  );
}

export function AccordionContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const itemCtx = useContext(AccordionItemContext);

  return (
    <AnimatePresence initial={false}>
      {itemCtx.isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          className="overflow-hidden"
        >
          <div className={className}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface AccordionProps {
  items?: Omit<AccordionItemProps, 'isOpen' | 'onToggle' | 'id'>[];
  allowMultiple?: boolean;
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  children?: React.ReactNode;
  title?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  type,
  className = '',
  children,
  title,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string | number>>(new Set([0, 'item-0']));
  const isMultiple = allowMultiple || type === 'multiple';

  // Standalone single-item accordion with title and children
  if (title && children) {
    return (
      <AccordionItem
        title={title}
        content={children}
        isOpen={openItems.has(title)}
        onToggle={() => {
          setOpenItems((prev) => {
            const next = new Set(prev);
            if (next.has(title)) next.delete(title);
            else next.add(title);
            return next;
          });
        }}
      />
    );
  }

  const toggleItem = (id: string | number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!isMultiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  // If composable children passed
  if (children) {
    return (
      <AccordionContext.Provider value={{ openItems, toggleItem }}>
        <div className={`w-full ${className}`}>{children}</div>
      </AccordionContext.Provider>
    );
  }

  // If items array passed
  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`w-full ${className}`}>
        {items?.map((item, index) => (
          <AccordionItem
            key={index}
            id={`item-${index}`}
            title={item.title}
            content={item.content}
            isOpen={openItems.has(`item-${index}`) || openItems.has(index)}
            onToggle={() => toggleItem(`item-${index}`)}
          />
        ))}
      </div>
    </AccordionContext.Provider>
  );
}

export default Accordion;
