'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/data/products';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Extract colors from product, or use fallbacks
  const bgColors = product.colors && product.colors.length >= 2 
    ? product.colors 
    : ['#ECEAE4', '#F5F3EE'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      className="group relative flex flex-col"
    >
      <Link href={`/product/${product.slug || product.id}`} className="block relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#181818] rounded-xl">
        <div 
          className="relative aspect-[3/4] w-full overflow-hidden rounded-xl mb-4 bg-gradient-to-br"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${bgColors[0]}, ${bgColors[1]})`
          }}
        >
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant={product.badge === 'New' ? 'dark' : 'accent'}>
                {product.badge}
              </Badge>
            </div>
          )}

          {product.hasModel && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="default" className="shadow-sm">3D</Badge>
            </div>
          )}

          <motion.div
            className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 bg-white/90 text-[#181818] px-6 py-3 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm">
              View product →
            </span>
          </motion.div>
        </div>

        <div>
          <h3 className="text-base font-medium text-[#181818] group-hover:text-[#2A2A2A] transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-[#777777] line-clamp-1">
            {product.description || product.category}
          </p>
          <div className="mt-2 text-sm font-medium text-[#181818]">
            {formatPrice(product.price)}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
