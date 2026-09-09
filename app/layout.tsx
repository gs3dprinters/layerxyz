import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { CartProvider } from '@/lib/cart-context';

export const metadata: Metadata = {
  title: 'Layerxyz — Premium 3D Printed Objects & Custom Fabrication',
  description: 'Premium 3D printed objects and custom fabrication.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'LAYERXYZ',
              image: 'https://layerxyz.com/og-image.jpg',
              description: 'Premium 3D Printed Objects & Custom Fabrication',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tiruppur',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'IN'
              }
            })
          }}
        />
        <meta name="robots" content="index, follow" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="min-h-screen bg-[#F5F3EE] font-sans text-[#181818] antialiased">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
