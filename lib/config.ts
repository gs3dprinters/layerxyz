/**
 * LAYER XYZ — Central Studio Configuration
 * 
 * Edit the variables below or supply environment variables in .env.local:
 * - NEXT_PUBLIC_WHATSAPP_NUMBER
 * - NEXT_PUBLIC_CONTACT_EMAIL
 * - NEXT_PUBLIC_SITE_URL
 */

// Business WhatsApp Number (with country code, digits only)
export const BUSINESS_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918610549543";

export const STUDIO_INFO = {
  name: "Layer XYZ",
  legalName: "Layer XYZ Studio",
  tagline: "Your Imagination. Made Real.",
  phone: "8610549543",
  phoneDisplay: "+91 86105 49543",
  whatsappUrl: "https://wa.me/918610549543",
  description:
    "Premium 3D printing and custom product manufacturing studio based in Tiruppur, Tamil Nadu, India. Specialising in custom statues, deity idols, personalised gifts, and industrial 3D printing services.",
  city: "Tiruppur",
  state: "Tamil Nadu",
  country: "India",
  locationDisplay: "Tiruppur, Tamil Nadu, India",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "studio@layerxyz.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://layerxyz.vercel.app",
  paymentTerms: {
    advancePercentage: 50,
    shippingPercentage: 50,
    summary: "50% advance before work begins · 50% during the shipping process",
    details:
      "For all customised statues and manufacturing orders, production begins after design confirmation and a 50% advance payment. The remaining 50% is payable during the shipping process before final delivery. Shipping and delivery charges are calculated based on package size and destination.",
  },
  acceptedFormats: [".stl", ".3mf", ".step", ".stp", ".obj", ".zip"],
  materialsSupported: [
    { name: "PLA / PLA Pro+", desc: "Clean dimensional accuracy, sharp details, ideal for statues, display pieces and decorative items." },
    { name: "PETG", desc: "Durable, impact and temperature resistant, ideal for functional parts and utility products." },
    { name: "Flexible TPU", desc: "Rubber-like flexibility, impact dampening, custom gaskets and protective cases." },
    { name: "High-Detail Resin", desc: "Ultra-fine layer definition for miniatures and intricate jewelry masters." },
  ],
  standardStatuePricing: [
    { height: "10 Inch", heightMm: "~250 mm", price: 8499, description: "Compact desk and shelf display size" },
    { height: "15 Inch", heightMm: "~380 mm", price: 13999, description: "Substantial mantelpiece and living room statue" },
    { height: "18 Inch", heightMm: "~455 mm", price: 17999, description: "Imposing statement heirloom sculpture" },
  ],
};
