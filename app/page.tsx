import React from "react";
import { HeroSection } from "@/sections/HeroSection";
import { TrustMarquee } from "@/sections/TrustMarquee";
import { IntroSection } from "@/sections/IntroSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { ScaleSection } from "@/sections/ScaleSection";
import { WorkSection } from "@/sections/WorkSection";
import { ModelShowcase } from "@/3d/ModelShowcase";
import { ProcessSection } from "@/sections/ProcessSection";
import { TechSpecsSection } from "@/sections/TechSpecsSection";
import { MaterialSection } from "@/sections/MaterialSection";
import { CustomIdeaSection } from "@/sections/CustomIdeaSection";
import { FAQSection } from "@/sections/FAQSection";
import { FinalCTASection } from "@/sections/FinalCTASection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Marquee Capability Strip */}
      <TrustMarquee />

      {/* 3. Editorial Intro */}
      <IntroSection />

      {/* 4. Core Services (02 / SERVICES) */}
      <ServicesSection />

      {/* 5. Scale Visualization (Desktop to Statement) */}
      <ScaleSection />

      {/* 6. Selected Works Gallery (03 / WORK) */}
      <WorkSection limit={6} />

      {/* 7. Interactive 3D Model Inspection */}
      <ModelShowcase />

      {/* 8. 4-Stage Fabrication Pipeline (04 / PROCESS) */}
      <ProcessSection />

      {/* 9. Technical Tolerances & Quality Standards */}
      <TechSpecsSection />

      {/* 10. Material System Selector */}
      <MaterialSection />

      {/* 11. Bespoke Custom Idea Callout */}
      <CustomIdeaSection />

      {/* 12. FAQ Accordion */}
      <FAQSection />

      {/* 13. Final Conversion CTA */}
      <FinalCTASection />
    </div>
  );
}
