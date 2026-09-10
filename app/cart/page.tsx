"use client";

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getWhatsAppOrderUrl } from '@/lib/utils';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] text-[#171716] flex flex-col items-center justify-center px-6 pt-32 pb-24">
        <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
          YOUR SELECTION
        </span>
        <h1 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-base text-[#6F6B63] mb-8 text-center max-w-md">
          Discover our curated collection of physical sculptures, heritage objects, and personalized forms.
        </p>
        <Link 
          href="/shop"
          className="bg-[#181817] text-[#F4F1EA] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors shadow-xs inline-flex items-center gap-2"
        >
          Explore Collection
          <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 sm:mb-14">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-2 font-medium">
            BAG REVIEW
          </span>
          <h1 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#171716]">
            YOUR CART
          </h1>
        </header>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xs border border-[#E8E5DE] mb-10">
          <div className="space-y-6">
            {items.map((item) => {
              const itemId = item.id || item.productId;
              const displayName = item.name || item.product?.name || 'Studio Object';
              const itemImage = item.image || item.product?.images?.[0];

              return (
                <div key={itemId} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E8E5DE] last:border-0 last:pb-0">
                  <div className="flex items-center gap-5 flex-1">
                    <div className="w-20 h-20 rounded-2xl flex-shrink-0 bg-[#FAFAF8] border border-[#E8E5DE] overflow-hidden flex items-center justify-center p-2">
                      {itemImage ? (
                        <img src={itemImage} alt={displayName} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-[10px] font-mono uppercase text-[#8E8B83]">Object</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-sans font-semibold text-base sm:text-lg text-[#171716] mb-1">
                        {displayName}
                      </h3>
                      <p className="text-xs text-[#6F6B63] space-x-2">
                        {item.size && <span>Size: <strong className="text-[#171716]">{item.size}</strong></span>}
                        {item.finish && <span>• Finish: <strong className="text-[#171716]">{item.finish}</strong></span>}
                        {item.material && <span>• Material: <strong className="text-[#171716]">{item.material}</strong></span>}
                      </p>
                      <div className="text-sm font-semibold text-[#171716] mt-2 sm:hidden">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-8">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#E8E5DE] rounded-full overflow-hidden bg-white px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                        className="p-1.5 hover:bg-[#F4F1EA] transition-colors text-[#6F6B63] hover:text-[#171716] rounded-full"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-medium text-[#171716]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                        className="p-1.5 hover:bg-[#F4F1EA] transition-colors text-[#6F6B63] hover:text-[#171716] rounded-full"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="hidden sm:block text-right w-28 text-sm font-semibold text-[#171716]">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button 
                      onClick={() => removeItem(itemId)}
                      className="text-[#8E8B83] hover:text-red-600 transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Action & Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <Link 
            href="/shop"
            className="text-xs font-mono uppercase tracking-wider text-[#6F6B63] hover:text-[#171716] transition-colors inline-flex items-center gap-1.5"
          >
            ← Continue Shopping
          </Link>

          <div className="w-full md:w-auto min-w-[340px] bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E5DE] shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-baseline gap-12 pb-4 border-b border-[#E8E5DE]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#6F6B63]">Subtotal</span>
              <span className="text-2xl font-semibold text-[#171716]">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-[#6F6B63] leading-relaxed">
              Made to order. Shipping destination and delivery details confirmed directly with our Tiruppur studio.
            </p>
            {(() => {
              const orderUrl = getWhatsAppOrderUrl(items, subtotal);
              const isExternal = orderUrl.startsWith('http');
              return (
                <a 
                  href={orderUrl}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="bg-[#181817] text-[#F4F1EA] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider text-center hover:bg-[#2A2A28] transition-colors w-full shadow-xs flex items-center justify-center gap-2"
                >
                  {isExternal ? 'Complete Order via WhatsApp →' : 'Inquire & Complete Order →'}
                </a>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
