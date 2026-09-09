import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
}

const paddingVariants = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', padding = 'md', hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white rounded-xl border border-[#E8E5DE] ${paddingVariants[padding]} ${
          hoverEffect ? 'transition-shadow hover:shadow-lg' : ''
        } ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
