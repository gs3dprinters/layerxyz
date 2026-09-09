"use client";

import { PRODUCTS } from '@/data/products';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Studio3DPage() {
  const productsWith3D = PRODUCTS.filter(p => p.hasModel);

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#181818] mb-4">
            SEE IT FROM EVERY ANGLE.
          </h1>
          <p className="text-lg md:text-xl text-[#777777] max-w-2xl">
            Explore Layerxyz objects in interactive 3D. Rotate, zoom, and explore every detail before making it yours.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsWith3D.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <motion.div 
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                className="group flex flex-col gap-4"
              >
                <div 
                  className="aspect-square rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#E8E5DE]"
                  style={{ background: product.color || 'linear-gradient(135deg, #E8E5DE, #D4D0C8)' }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors z-10" />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-[#181818] z-20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse" />
                    Interactive 3D
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-[#181818]">{product.name}</h3>
                  <p className="text-[#777777] text-sm">View details & 3D model →</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
