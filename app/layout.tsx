import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { CustomCursor } from "@/layout/CustomCursor";
import { WhatsAppButton } from "@/layout/WhatsAppButton";
import { NoiseOverlay } from "@/ui/NoiseOverlay";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://layerxyz.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Layerxyz — Custom 3D Printing & Fabrication",
    template: "%s | Layerxyz",
  },
  description:
    "Layerxyz turns digital designs into physical objects through custom 3D printing, statues, prototypes, models and fabrication.",
  keywords: [
    "3D printing in Tiruppur",
    "3D printing in Coimbatore",
    "custom 3D printing Tamil Nadu",
    "3D printing services India",
    "custom statues",
    "3D printed statues",
    "3D printing prototypes",
    "large scale 3D printing",
    "rapid prototyping studio",
  ],
  authors: [{ name: "Layerxyz Studio" }],
  creator: "Layerxyz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Layerxyz — Custom 3D Printing & Fabrication",
    description:
      "Layerxyz turns digital designs into physical objects through custom 3D printing, statues, prototypes, models and fabrication.",
    siteName: "Layerxyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Layerxyz — Custom 3D Printing & Fabrication",
    description:
      "Layerxyz turns digital designs into physical objects through custom 3D printing, statues, prototypes, models and fabrication.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Local Business Structured Data for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Layerxyz",
    description:
      "Professional custom 3D printing and fabrication studio specializing in custom statues, prototypes, and architectural models.",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tiruppur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.1085,
      longitude: 77.3411,
    },
    priceRange: "₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent selection:text-background relative">
        {/* Film grain noise texture */}
        <NoiseOverlay />

        {/* Desktop Custom Precision Cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Viewport */}
        <main>{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Floating / Mobile Fixed WhatsApp CTA */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
