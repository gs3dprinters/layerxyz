import React from 'react';

const badgeVariants = {
  default: 'bg-[#F5F3EE] text-[#2A2A2A] border border-[#E8E5DE]',
  accent: 'bg-[#B7FF00]/10 text-[#2A2A2A] border border-[#B7FF00]/20',
  dark: 'bg-[#181818] text-white border-transparent',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants;
  className?: string;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono tracking-wide uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-[#B7FF00]/50 ${badgeVariants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
