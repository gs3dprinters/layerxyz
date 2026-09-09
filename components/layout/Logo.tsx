import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn("font-sans font-semibold tracking-wide text-[#181818] text-xl", className)}
      aria-label="Layerxyz Logo"
    >
      LAYERXYZ
    </Link>
  );
}
