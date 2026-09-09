import HeroSection from "@/sections/HeroSection";
import FeaturedCollection from "@/sections/FeaturedCollection";
import InteractiveShowcase from "@/sections/InteractiveShowcase";
import ShopByCategory from "@/sections/ShopByCategory";
import CustomCTASection from "@/sections/CustomCTASection";
import SelectedWorkSection from "@/sections/SelectedWorkSection";
import LargeScaleSection from "@/sections/LargeScaleSection";
import WhyLayerxyz from "@/sections/WhyLayerxyz";
import FAQSection from "@/sections/FAQSection";
import FinalCTASection from "@/sections/FinalCTASection";

export const metadata = {
  title: "Layerxyz | Custom 3D Printed Objects",
  description: "Designed digitally. Made physically. Custom 3D printed objects, sculptures and products — made to order.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F3EE] flex flex-col w-full overflow-hidden">
      <HeroSection />
      <FeaturedCollection />
      <InteractiveShowcase />
      <ShopByCategory />
      <CustomCTASection />
      <SelectedWorkSection />
      <LargeScaleSection />
      <WhyLayerxyz />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}