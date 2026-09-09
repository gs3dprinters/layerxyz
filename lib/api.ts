/**
 * API abstraction layer for Layerxyz
 *
 * All functions persist to localStorage as a fallback when no backend endpoint is configured.
 * Replace the implementations with actual API calls when connecting to:
 * - Supabase / Firebase / Custom backend
 * - Resend / Formspree for email
 * - Stripe / Razorpay for payments
 */

const INQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || "";
const QUOTE_ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT || "";

interface ProjectInquiry {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  hasFile: string;
  dimensions: string;
  quantity: string;
  deadline: string;
  description: string;
  file?: File | null;
}

export interface QuoteRequest {
  projectType: string;
  hasFile?: boolean;
  file?: File | null;
  fileName?: string;
  fileSize?: number;
  size?: string;
  customDimensions?: string;
  dimensions?: string | { width: string; height: string; depth: string };
  quantity?: number | string;
  material?: string;
  finish?: string;
  color?: string;
  colorPreference?: string;
  deadline?: string;
  description?: string;
  name: string;
  email: string;
  phone: string;
  [key: string]: any;
}

interface OrderData {
  items: {
    productId: string;
    name: string;
    size: string;
    material: string;
    finish: string;
    quantity: number;
    price: number;
  }[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  subtotal: number;
  notes?: string;
}

function persistToStorage(key: string, data: unknown): void {
  try {
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push({
      ...data as Record<string, unknown>,
      submittedAt: new Date().toISOString(),
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    // Storage unavailable
  }
}

export async function submitProjectInquiry(data: ProjectInquiry): Promise<{ success: boolean; message: string }> {
  if (INQUIRY_ENDPOINT) {
    try {
      const res = await fetch(INQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return { success: true, message: "Inquiry submitted successfully." };
      return { success: false, message: "Failed to submit. Please try WhatsApp." };
    } catch {
      // Fall through to localStorage
    }
  }

  persistToStorage("layerxyz-inquiries", data);
  return {
    success: true,
    message: "Inquiry saved. We'll connect with you via WhatsApp.",
  };
}

export async function submitQuote(data: QuoteRequest): Promise<{ success: boolean; message: string }> {
  if (QUOTE_ENDPOINT) {
    try {
      const res = await fetch(QUOTE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return { success: true, message: "Quote request submitted." };
      return { success: false, message: "Failed to submit. Please try WhatsApp." };
    } catch {
      // Fall through to localStorage
    }
  }

  persistToStorage("layerxyz-quotes", data);
  return {
    success: true,
    message: "Quote request saved. We'll reach out with pricing shortly.",
  };
}

export async function uploadProjectFile(file: File): Promise<{ success: boolean; url?: string; message: string }> {
  // Future: Upload to S3/Cloudinary/Supabase Storage
  // For now, just validate and return file info
  const maxSize = 100 * 1024 * 1024; // 100MB
  const allowedTypes = [
    ".stl", ".obj", ".3mf", ".step", ".stp", ".iges", ".igs",
    ".zip", ".jpg", ".jpeg", ".png", ".webp", ".pdf",
  ];

  const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!allowedTypes.includes(ext)) {
    return { success: false, message: `File type ${ext} is not supported.` };
  }

  if (file.size > maxSize) {
    return { success: false, message: "File is too large. Maximum size is 100MB." };
  }

  return {
    success: true,
    url: URL.createObjectURL(file),
    message: "File ready for submission.",
  };
}

export async function createOrder(data: OrderData): Promise<{ success: boolean; orderId?: string; message: string }> {
  // Future: Create order in backend + initiate payment
  const orderId = `LXY-${Date.now().toString(36).toUpperCase()}`;

  persistToStorage("layerxyz-orders", { ...data, orderId });

  return {
    success: true,
    orderId,
    message: "Order created. Complete payment via WhatsApp to confirm.",
  };
}
