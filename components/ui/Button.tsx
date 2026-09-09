import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const buttonVariants = {
  primary: 'bg-[#181818] text-white hover:bg-[#2A2A2A]',
  secondary: 'bg-white border border-[#E8E5DE] text-[#181818] hover:bg-[#F5F3EE]',
  outline: 'border border-[#181818] text-[#181818] hover:bg-[#181818] hover:text-white',
  ghost: 'text-[#181818] hover:bg-[#E8E5DE]/50',
};

const buttonSizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-base',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  withArrow?: boolean;
  href?: string;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', withArrow, href, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#B7FF00]/50 disabled:opacity-50 disabled:pointer-events-none group';
    
    const combinedClasses = `${baseClasses} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`;
    
    const content = (
      <>
        {children}
        {withArrow && (
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClasses} ref={ref as React.Ref<HTMLAnchorElement>}>
          {content}
        </Link>
      );
    }

    return (
      <button className={combinedClasses} ref={ref as React.Ref<HTMLButtonElement>} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
