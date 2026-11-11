import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BUSINESS_WHATSAPP_NUMBER } from "./config";

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

/**
 * Basic WhatsApp link generator
 */
export function getWhatsAppUrl(message?: string): string {
  const phone = BUSINESS_WHATSAPP_NUMBER;
  const text = message || "Hi Layer XYZ, I'm interested in your custom 3D printing and sculpture studio services.";
  if (!phone) return "/contact";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Pre-filled WhatsApp link for Custom Statue enquiries
 */
export function getCustomStatueWhatsAppUrl(data: {
  name?: string;
  height?: string;
  finish?: string;
  location?: string;
  budget?: string;
  notes?: string;
}): string {
  const phone = BUSINESS_WHATSAPP_NUMBER;
  let text = "Hi Layer XYZ, I would like to enquire about a Custom 3D Printed Statue:\n\n";
  if (data.name) text += `• Name: ${data.name}\n`;
  if (data.height) text += `• Desired Height: ${data.height}\n`;
  if (data.finish) text += `• Finish Preference: ${data.finish}\n`;
  if (data.location) text += `• Delivery Location: ${data.location}\n`;
  if (data.budget) text += `• Approximate Budget: ${data.budget}\n`;
  if (data.notes) text += `• Details: ${data.notes}\n`;
  text += "\nI have reference photos ready to share. Please let me know the process, timeline and pricing quotation.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Pre-filled WhatsApp link for 3D Printing Service quotations
 */
export function getPrintingQuoteWhatsAppUrl(data: {
  name?: string;
  fileType?: string;
  material?: string;
  quantity?: string | number;
  dimensions?: string;
  deadline?: string;
  notes?: string;
}): string {
  const phone = BUSINESS_WHATSAPP_NUMBER;
  let text = "Hi Layer XYZ, I would like a quote for 3D Printing Services:\n\n";
  if (data.name) text += `• Name: ${data.name}\n`;
  if (data.fileType) text += `• File Format: ${data.fileType}\n`;
  if (data.material) text += `• Material: ${data.material}\n`;
  if (data.quantity) text += `• Quantity: ${data.quantity}\n`;
  if (data.dimensions) text += `• Approximate Dimensions: ${data.dimensions}\n`;
  if (data.deadline) text += `• Target Deadline: ${data.deadline}\n`;
  if (data.notes) text += `• Notes / Requirements: ${data.notes}\n`;
  text += "\nI have 3D files (STL/3MF/STEP) ready to share for review. Please provide an estimated quotation.";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Pre-filled WhatsApp link for a specific product
 */
export function getProductWhatsAppUrl(data: {
  productName: string;
  size?: string;
  finish?: string;
  price?: number;
  slug?: string;
}): string {
  const phone = BUSINESS_WHATSAPP_NUMBER;
  let text = `Hi Layer XYZ, I'm interested in the "${data.productName}"`;
  if (data.size) text += ` (${data.size})`;
  if (data.finish) text += ` in ${data.finish}`;
  if (data.price) text += ` priced at ${formatPrice(data.price)}`;
  text += `.\nLink: https://layerxyz.vercel.app/product/${data.slug || ''}\n\nCould you share details on availability, customization options, and delivery to my location?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Cart WhatsApp order generator with structured payment note
 */
export function getWhatsAppOrderUrl(items: any[], subtotal?: number): string {
  const phone = BUSINESS_WHATSAPP_NUMBER;
  let message = "Hi Layer XYZ! I'd like to place an order from your store:\n\n";
  items.forEach((item) => {
    const name = item.name || item.product?.name || 'Object';
    const size = item.size || '';
    const finish = item.finish || '';
    const material = item.material || '';
    const price = item.price || item.product?.price || 0;
    const qty = item.quantity || 1;
    const variantParts = [size, finish, material].filter(Boolean).join(', ');
    message += `• ${name} ${variantParts ? `(${variantParts})` : ''} × ${qty} — ${formatPrice(price * qty)}\n`;
  });
  const total = subtotal !== undefined ? subtotal : items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  message += `\nTotal: ${formatPrice(total)}\n\nPlease confirm availability, shipping charges to my address, and payment details (50% advance / 50% on dispatch for custom work).`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
