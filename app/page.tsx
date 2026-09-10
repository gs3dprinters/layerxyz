import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedCollection from '@/components/sections/FeaturedCollection';
import InteractiveShowcase from '@/components/sections/InteractiveShowcase';
import ShopByCategory from '@/components/sections/ShopByCategory';
import CustomCTASection from '@/components/sections/CustomCTASection';
import SelectedWorkSection from '@/components/sections/SelectedWorkSection';
import LargeScaleSection from '@/components/sections/LargeScaleSection';
import WhyLayerxyz from '@/components/sections/WhyLayerxyz';
import MaterialSection from '@/components/sections/MaterialSection';
import FAQSection from '@/components/sections/FAQSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

export const metadata: Metadata = {
  title: 'Layerxyz — Premium 3D Printed Objects & Custom Sculptures',
  description: 'Layerxyz creates bespoke custom sculptures, physical editions, and architectural works made to order using precision additive fabrication.',
  keywords: [
    'Layerxyz',
    'custom 3D printing',
    'custom sculptures',
    '3D printed objects',
    'custom statues',
    'bespoke fabrication',
    'contemporary sculpture store',
  ],
  openGraph: {
    title: 'Layerxyz — Objects Made Real',
    description: 'Custom 3D printed objects, sculptures and products — made to order.',
    url: 'https://layerxyz.vercel.app',
    siteName: 'Layerxyz',
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col w-full overflow-hidden">
      {/* 1. Hero: Kala Statue & Objects Made Real */}
      <HeroSection />

      {/* 2. Featured Objects: Asymmetric Editorial Grid */}
      <FeaturedCollection />

      {/* 3. Experience in 3D: Dedicated Interactive Showroom */}
      <InteractiveShowcase />

      {/* 4. Shop by Category: Editorial Category Panels */}
      <ShopByCategory />

      {/* 5. Custom Fabrication: Make Something That Doesn't Exist Yet */}
      <CustomCTASection />

      {/* 6. Selected Work: Monolith 01 & Studio Projects */}
      <SelectedWorkSection />

      {/* 7. Scale: From Small Objects to Statement Pieces */}
      <LargeScaleSection />

      {/* 8. The Layerxyz Difference: Core Principles */}
      <WhyLayerxyz />

      {/* 9. Materials & Finish: Matter, Finish, Form */}
      <MaterialSection />

      {/* 10. FAQ: Clarifications & Baseline Pricing */}
      <FAQSection />

      {/* 11. Final CTA: Have an Idea? Let's Make It Real */}
      <FinalCTASection />
    </div>
  );
}