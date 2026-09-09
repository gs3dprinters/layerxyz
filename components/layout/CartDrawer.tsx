'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#181818]/20 z-50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-[#F5F3EE] z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-[#E8E5DE]">
              <h2 className="text-lg font-semibold tracking-wide text-[#181818]">YOUR CART</h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                aria-label="Close cart" 
                className="text-[#181818] hover:opacity-70 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <p className="text-[#777777]">Your cart is empty.</p>
                  <Link 
                    href="/shop" 
                    onClick={() => setIsCartOpen(false)}
                    className="text-sm font-medium text-[#181818] underline underline-offset-4 hover:text-[#B7FF00] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.variantId}`} className="flex space-x-4 border-b border-[#E8E5DE] pb-6">
                      <div className="w-20 h-24 bg-[#FFFFFF] relative rounded-sm overflow-hidden flex-shrink-0">
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex flex-col flex-grow text-[#181818]">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/product/${item.productId}`} onClick={() => setIsCartOpen(false)} className="font-medium hover:text-[#B7FF00] transition-colors">
                              {item.name}
                            </Link>
                            <div className="text-xs text-[#777777] mt-1 space-y-0.5">
                              {item.size && <p>Size: {item.size}</p>}
                              {item.material && <p>Material: {item.material}</p>}
                            </div>
                          </div>
                          <button 
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="text-[#777777] hover:text-[#181818] transition-colors"
                            aria-label="Remove item"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-auto pt-4">
                          <div className="flex items-center border border-[#D4D0C8] rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-[#E8E5DE] transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-[#E8E5DE] transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className="p-6 border-t border-[#E8E5DE] bg-[#F5F3EE]">
                <div className="flex justify-between items-center mb-6 font-medium text-[#181818]">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-[#777777] mb-4">Shipping and taxes calculated at checkout.</p>
                <div className="space-y-3">
                  <Link 
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full py-4 px-6 bg-[#181818] text-[#F5F3EE] text-center font-medium tracking-wide hover:bg-[#2A2A2A] transition-colors"
                  >
                    CHECKOUT
                  </Link>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="block w-full py-4 px-6 border border-[#181818] text-[#181818] text-center font-medium tracking-wide hover:bg-[#E8E5DE] transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
