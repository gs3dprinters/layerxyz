import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import WhatWeDoSection from '@/components/sections/WhatWeDoSection';
import FeaturedCollectionsSection from '@/components/sections/FeaturedCollectionsSection';
import MadeAtLayerxyzSection from '@/components/sections/MadeAtLayerxyzSection';
import OurProcessSection from '@/components/sections/OurProcessSection';
import WhyLayerxyzSection from '@/components/sections/WhyLayerxyzSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CommercialFAQSection from '@/components/sections/CommercialFAQSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

export const metadata: Metadata = {
  title: 'Layer XYZ — Custom 3D Printed Statues & 3D Printing Services | Tiruppur, India',
  description:
    'Layer XYZ creates bespoke 3D printed statues, personalised portrait sculptures, deity idols, and precision 3D printing manufacturing services in Tiruppur, Tamil Nadu. Fast Pan-India delivery.',
  keywords: [
    'Custom 3D printed statues India',
    '3D printing services Tiruppur',
    'Custom 3D printing India',
    '3D printed Hindu idols',
    'Personalised 3D printed gifts',
    'Bulk 3D printing services India',
    'Custom 3D printed figurines',
    'Layer XYZ',
    '3D statue maker India',
  ],
  openGraph: {
    title: 'Layer XYZ — Your Imagination. Made Real.',
    description:
      'Custom 3D printed statues, personalised gifts and precision-made products. Designed, crafted and brought to life by Layer XYZ in Tiruppur, India.',
    url: 'https://layerxyz.vercel.app',
    siteName: 'Layer XYZ',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] flex flex-col w-full overflow-hidden">
      {/* 1. Hero: YOUR IMAGINATION. MADE REAL. */}
      <HeroSection />

      {/* 2. What We Do: Dual Service Categories Split */}
      <WhatWeDoSection />

      {/* 3. Featured Collections: 7 Curated Product Disciplines */}
      <FeaturedCollectionsSection />

      {/* 4. Made at Layer XYZ: Editorial Craft Gallery with Actual Prints */}
      <MadeAtLayerxyzSection />

      {/* 5. Our Process: Four-Step Visual Methodology */}
      <OurProcessSection />

      {/* 6. Why Layer XYZ: Bambu Lab Fleet, In-House Craft & Pan-India Safe Delivery */}
      <WhyLayerxyzSection />

      {/* 7. Customer Reviews & Studio Trust */}
      <ReviewsSection />

      {/* 8. Commercial FAQ: 9 Specific Commercial Questions Answered */}
      <CommercialFAQSection />

      {/* 9. Final CTA: HAVE AN IDEA? LET'S MAKE IT REAL. */}
      <FinalCTASection />
    </div>
  );
}
