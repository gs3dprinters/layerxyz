'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, Box } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/data/products';

const CardModelViewer = dynamic(() => import('@/3d/CardModelViewer'), {
  ssr: false,
  loading: () => null,
});

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const posterImage = product.images?.[0] || '';
  const modelUrl = product.modelUrl || product.model;

  // Meaningful Ecommerce Badge formatting
  const getBadgeStyle = (badge?: string) => {
    switch (badge?.toUpperCase()) {
      case 'BESTSELLER':
        return 'bg-[#181818] text-white border-black';
      case 'CUSTOM':
        return 'bg-white/95 text-[#181818] border-[#E8E5DE] shadow-xs';
      case 'NEW':
        return 'bg-[#EAE7E0] text-[#242424] border-[#DDD8CF]';
      case 'LIMITED':
        return 'bg-[#181818] text-[#E8D7B8] border-[#38332A]';
      default:
        return 'bg-white/90 text-[#181818] border-[#E8E5DE]';
    }
  };

  const formattedPrice = `${product.pricePrefix || ''}${formatPrice(product.price)}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full"
    >
      <Link
        href={`/product/${product.slug || product.id}`}
        className="flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#181818] rounded-2xl"
      >
        {/* Visual 3D Showcase Container */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE] transition-all duration-500 ease-out group-hover:border-[#D4D0C8] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
          {/* Meaningful Ecommerce Status Badge */}
          {product.badge && ['BESTSELLER', 'NEW', 'CUSTOM', 'LIMITED'].includes(product.badge.toUpperCase()) && (
            <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase border font-medium ${getBadgeStyle(product.badge)}`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Very Subtle Integrated 3D Indicator */}
          {modelUrl && (
            <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#E8E5DE]/80 text-[#888888] group-hover:text-[#181818] transition-colors">
              <Box className="w-3 h-3" />
              <span className="text-[10px] font-mono font-medium tracking-tight">3D</span>
            </div>
          )}

          {/* 3D Model / Poster Canvas */}
          <div className="w-full h-full">
            {modelUrl ? (
              <CardModelViewer
                modelUrl={modelUrl}
                posterImage={posterImage}
                isHovered={isHovered}
                productName={product.name}
              />
            ) : (
              posterImage && (
                <img
                  src={posterImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )
            )}
          </div>

          {/* Hover Floating Action: "VIEW IN 3D →" */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
            <span className="inline-flex items-center gap-1.5 bg-[#181818] text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide shadow-md whitespace-nowrap">
              VIEW IN 3D
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>

        {/* Product Information */}
        <div className="pt-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-base md:text-lg font-medium text-[#181818] tracking-tight group-hover:text-black transition-colors">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-[#777777] line-clamp-1 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between border-t border-[#E8E5DE]/60">
            <span className="text-sm font-semibold text-[#181818]">
              {formattedPrice}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#777777] group-hover:text-[#181818] transition-colors">
              VIEW IN 3D
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
