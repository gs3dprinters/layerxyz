'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/ui/ProductCard';
import { Product } from '@/data/products';

export interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ProductGrid({ products, columns = 4, className = '' }: ProductGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      default: return 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:gap-y-12 lg:gap-x-8 ${getGridCols()} ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}

export default ProductGrid;
