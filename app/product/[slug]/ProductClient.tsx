"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getWhatsAppUrl } from '@/lib/utils';
import Accordion from '@/ui/Accordion';
import ProductGrid from '@/ui/ProductGrid';
import { Minus, Plus } from 'lucide-react';

const ProductViewer = dynamic(() => import('@/3d/ProductViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-[#E8E5DE]" />
});

export default function ProductClient({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials?.[0] || null);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return notFound();

  const handleAddToCart = () => {
    const sizeLabel = selectedSize?.label || selectedSize?.name || 'Standard';
    const matLabel = typeof selectedMaterial === 'object' ? selectedMaterial?.label : selectedMaterial || 'Standard';
    const finishLabel = typeof selectedFinish === 'object' ? selectedFinish?.label : selectedFinish || 'Smooth Matte';

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: selectedSize ? selectedSize.price : product.price,
      quantity,
      size: sizeLabel,
      material: matLabel,
      finish: finishLabel,
      image: product.images?.[0] || '',
    });
  };

  const displayPrice = selectedSize ? selectedSize.price : product.price;

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 mb-24">
          
          <div className="w-full h-full min-h-[60vh] rounded-2xl overflow-hidden bg-[#FAFAF8] border border-[#E8E5DE]">
            {product.hasModel ? (
              <ProductViewer modelUrl={product.modelUrl} color={product.color} />
            ) : (
              <div 
                className="w-full h-full aspect-[4/5]"
                style={{ background: product.color || 'linear-gradient(135deg, #E8E5DE, #D4D0C8)' }}
              />
            )}
          </div>

          <div className="flex flex-col">
            <nav className="text-sm text-[#777777] mb-6 flex gap-2">
              <Link href="/" className="hover:text-[#181818] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-[#181818] transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-[#181818]">{product.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-semibold text-[#181818] mb-4">{product.name}</h1>
            <p className="text-xl text-[#777777] mb-6">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-2xl font-medium text-[#181818]">{formatPrice(displayPrice)}</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium border border-[#E8E5DE] bg-white text-[#181818]">
                {product.isMadeToOrder ? 'Made to Order' : 'In Stock'}
              </span>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#181818] mb-3">SIZE</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: any) => {
                    const label = size.label || size.name;
                    const isSelected = (selectedSize?.label || selectedSize?.name) === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                          isSelected 
                            ? 'border-[#181818] bg-[#181818] text-white' 
                            : 'border-[#E8E5DE] text-[#181818] hover:border-[#D4D0C8]'
                        }`}
                      >
                        {label} {size.dimensions ? `(${size.dimensions})` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.materials && product.materials.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#181818] mb-3">MATERIAL</h3>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((mat: any) => {
                    const label = typeof mat === 'object' ? mat.label : mat;
                    const isSelected = (typeof selectedMaterial === 'object' ? selectedMaterial?.label : selectedMaterial) === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setSelectedMaterial(mat)}
                        className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                          isSelected 
                            ? 'border-[#181818] bg-[#181818] text-white' 
                            : 'border-[#E8E5DE] text-[#181818] hover:border-[#D4D0C8]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {product.finishes && product.finishes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-medium text-[#181818] mb-3">FINISH</h3>
                <div className="flex flex-wrap gap-3">
                  {product.finishes.map((finish: any) => {
                    const label = typeof finish === 'object' ? finish.label : finish;
                    const isSelected = (typeof selectedFinish === 'object' ? selectedFinish?.label : selectedFinish) === label;
                    return (
                      <button
                        key={label}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                          isSelected 
                            ? 'border-[#181818] bg-[#181818] text-white' 
                            : 'border-[#E8E5DE] text-[#181818] hover:border-[#D4D0C8]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center border border-[#E8E5DE] rounded-full overflow-hidden bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-[#F5F3EE] transition-colors text-[#181818]"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center text-sm font-medium text-[#181818]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-[#F5F3EE] transition-colors text-[#181818]"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#181818] text-white py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                ADD TO CART
              </button>
              <a 
                href={getWhatsAppUrl(`Hi, I'm interested in the ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-[#181818] border border-[#E8E5DE] py-4 rounded-full font-medium hover:border-[#D4D0C8] transition-colors text-center"
              >
                CHAT ON WHATSAPP
              </a>
            </div>

            <div className="mt-12 border-t border-[#E8E5DE]">
              <Accordion title="Description">
                <p className="text-[#777777] py-4">{product.longDescription || product.description}</p>
              </Accordion>
              <Accordion title="Details & Specifications">
                <div className="text-[#777777] py-4 space-y-2">
                  <p>Dimensions: {product.dimensions || 'Various'}</p>
                  <p>Weight: {product.weight || 'Various'}</p>
                  <p>Designed and manufactured in Tiruppur, TN.</p>
                </div>
              </Accordion>
              <Accordion title="Shipping">
                <p className="text-[#777777] py-4">
                  Ships globally. Domestic orders within India usually arrive in 3-5 business days. International shipping varies by location.
                </p>
              </Accordion>
              <Accordion title="Care">
                <p className="text-[#777777] py-4">
                  Wipe clean with a soft, damp cloth. Avoid harsh chemicals or abrasive materials to preserve the finish.
                </p>
              </Accordion>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="border-t border-[#E8E5DE] pt-16">
            <h2 className="text-2xl font-semibold text-[#181818] mb-8">YOU MAY ALSO LIKE</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
