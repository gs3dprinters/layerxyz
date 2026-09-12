'use client';

import React, { useState } from 'react';
import { Sparkles, ImageOff } from 'lucide-react';

export interface CategoryImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: '16/9' | '4/3' | '4/5' | '1/1' | '16/10';
  className?: string;
  priority?: boolean;
}

export function CategoryImage({
  src,
  alt,
  fallbackSrc,
  aspectRatio = '16/9',
  className = '',
  priority = false,
}: CategoryImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '16/10': 'aspect-[16/10]',
  }[aspectRatio] || 'aspect-[16/9]';

  const handleError = () => {
    if (!hasError && fallbackSrc && src !== fallbackSrc) {
      // Try fallback source first
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-[#F0ECE4] border border-[#E8E5DE] transition-colors ${aspectClass} ${className}`}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0ECE4] via-[#F8F6F1] to-[#F0ECE4] animate-pulse" />
      )}

      {/* Render Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`w-full h-full object-contain p-3 sm:p-4 transition-all duration-500 group-hover:scale-105 ${
            isLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
          }`}
        />
      ) : (
        /* Graceful Neutral Category Fallback */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#F7F5F0]">
          <div className="w-12 h-12 rounded-full bg-white border border-[#E8E5DE] flex items-center justify-center mb-3 text-[#8E8B83] shadow-xs">
            <Sparkles size={18} />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8E8B83] font-medium">
            STUDIO VISUAL REFERENCE
          </span>
          <p className="text-xs text-[#6F6B63] mt-1 max-w-[200px] line-clamp-1">
            {alt}
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryImage;
