import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDimension(mm: number): string {
  if (mm >= 1000) {
    return `${(mm / 1000).toFixed(1)}m`;
  }
  return `${mm}mm`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getWhatsAppUrl(message?: string): string {
  const phone = "919876543210";
  const text = message || "Hi, I'm interested in Layerxyz products.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppOrderUrl(items: any[], subtotal?: number): string {
  const phone = "919876543210";
  let message = "Hi! I'd like to place an order:\n\n";
  items.forEach((item) => {
    const name = item.name || item.product?.name || 'Object';
    const size = item.size || '';
    const material = item.material || '';
    const price = item.price || item.product?.price || 0;
    const qty = item.quantity || 1;
    message += `• ${name} ${size ? `(${size}${material ? `, ${material}` : ''})` : ''} × ${qty} — ${formatPrice(price * qty)}\n`;
  });
  const total = subtotal !== undefined ? subtotal : items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  message += `\nTotal: ${formatPrice(total)}\n\nPlease let me know about availability and payment.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
