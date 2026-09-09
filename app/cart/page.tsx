"use client";

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatPrice, getWhatsAppOrderUrl } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-semibold tracking-tight text-[#181818] mb-6">CART</h1>
        <p className="text-[#777777] mb-8 text-lg">Your cart is empty.</p>
        <Link 
          href="/shop"
          className="bg-[#181818] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight text-[#181818] mb-12">YOUR CART</h1>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8E5DE] mb-8">
          <div className="space-y-6">
            {items.map((item) => {
              const itemId = item.id || item.productId;
              const displayName = item.name || item.product?.name || 'Object';
              return (
                <div key={itemId} className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E8E5DE] last:border-0 last:pb-0">
                  <div className="flex items-center gap-4 flex-1">
                    <div 
                      className="w-20 h-20 rounded-xl flex-shrink-0"
                      style={{ background: item.product?.color || 'linear-gradient(135deg, #E8E5DE, #D4D0C8)' }}
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-[#181818] mb-1">{displayName}</h3>
                      <p className="text-sm text-[#777777]">
                        {item.size && `Size: ${item.size} • `}
                        {item.material && `Material: ${item.material} • `}
                        {item.finish && `Finish: ${item.finish}`}
                      </p>
                      <div className="text-[#181818] font-medium mt-2 md:hidden">
                        {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-8">
                    <div className="flex items-center border border-[#E8E5DE] rounded-full overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-[#F5F3EE] transition-colors text-[#181818]"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-[#181818]">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(itemId, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-[#F5F3EE] transition-colors text-[#181818]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="hidden md:block text-right w-24 text-[#181818] font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button 
                      onClick={() => removeItem(itemId)}
                      className="text-[#777777] hover:text-[#181818] transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <Link 
            href="/shop"
            className="text-[#777777] hover:text-[#181818] font-medium transition-colors"
          >
            ← Continue Shopping
          </Link>

          <div className="w-full md:w-auto bg-white p-6 md:p-8 rounded-2xl border border-[#E8E5DE] shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center gap-12 text-xl">
              <span className="text-[#777777]">Subtotal</span>
              <span className="font-semibold text-[#181818]">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-sm text-[#777777] mb-2">Shipping and taxes calculated via WhatsApp.</p>
            <a 
              href={getWhatsAppOrderUrl(items, subtotal)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#181818] text-white px-8 py-4 rounded-full font-medium text-center hover:bg-[#2A2A2A] transition-colors w-full"
            >
              Complete order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
