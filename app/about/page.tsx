import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Hammer } from 'lucide-react';

export const metadata = {
  title: 'About | Layerxyz — Physical Object & Sculpture Studio',
  description: 'Layerxyz is a custom 3D fabrication and contemporary object studio based in Tiruppur, Tamil Nadu.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-16 md:mb-24">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            STUDIO PHILOSOPHY
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-8 leading-[1.08]">
            DIGITALLY CONCEIVED.<br />PHYSICALLY FABRICATED.
          </h1>
          <div className="text-lg sm:text-2xl text-[#55524B] leading-relaxed max-w-3xl font-normal">
            Layerxyz is a physical object and custom fabrication studio based in Tiruppur, Tamil Nadu. We specialize in transforming digital forms, client reference photographs, and original models into tangible, display-grade physical objects.
          </div>
        </header>

        {/* Narrative Section */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-t border-[#E8E5DE] pt-16">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E8B83] block mb-2">
              THE PRACTICE
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716]">
              Objects with substance and physical presence.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base sm:text-lg text-[#55524B] leading-relaxed">
            <p>
              In an increasingly ephemeral digital environment, we build objects meant to occupy physical space. From personalized portrait sculptures and sacred heritage figures to desk objects and large-format architectural models, each creation bridges computational geometry with physical manufacturing.
            </p>
            <p>
              Our workflow unites precise 3D fabrication with attentive studio post-processing: layer preparation, supportive structuring, surface refinement, and protective sealants.
            </p>
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAFAF8] p-8 sm:p-10 rounded-3xl border border-[#E8E5DE]">
              <span className="text-xs font-mono text-[#8E8B83] block mb-6">01 / MATERIAL HONESTY</span>
              <h3 className="text-xl font-sans font-semibold text-[#171716] mb-3">Material Honesty</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">
                We work with verified studio materials — robust PLA / PLA PRO+ formulations, weather-tolerant PETG, and tactile hand finishes.
              </p>
            </div>
            <div className="bg-[#FAFAF8] p-8 sm:p-10 rounded-3xl border border-[#E8E5DE]">
              <span className="text-xs font-mono text-[#8E8B83] block mb-6">02 / ATTENTIVE CRAFT</span>
              <h3 className="text-xl font-sans font-semibold text-[#171716] mb-3">Careful Making</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">
                Every object is produced to order in our studio. Nothing is mass-warehoused. Each print is inspected and finished with individual attention.
              </p>
            </div>
            <div className="bg-[#FAFAF8] p-8 sm:p-10 rounded-3xl border border-[#E8E5DE]">
              <span className="text-xs font-mono text-[#8E8B83] block mb-6">03 / BESPOKE COMMISSIONS</span>
              <h3 className="text-xl font-sans font-semibold text-[#171716] mb-3">Direct Collaboration</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">
                Whether working from a family photograph, a CAD concept, or an architectural file, we partner directly with patrons to realize their vision.
              </p>
            </div>
          </div>
        </section>

        {/* Studio Location & Nationwide Reach */}
        <section className="mb-24 bg-[#FAFAF8] p-10 sm:p-14 rounded-3xl border border-[#E8E5DE] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2">
              STUDIO LOCATION
            </span>
            <h3 className="text-2xl font-sans font-semibold text-[#171716] mb-2">
              Tiruppur, Tamil Nadu, India
            </h3>
            <p className="text-sm text-[#6F6B63]">
              Fabricated locally in Tamil Nadu and delivered securely across India.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[#171716] bg-white px-5 py-3 rounded-full border border-[#E8E5DE] whitespace-nowrap self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#171716]" />
            STUDIO VISITS BY APPOINTMENT
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center py-16 border-t border-[#E8E5DE]">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            COMMISSIONS & INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-[#171716] mb-6">
            Bring your next object to life.
          </h2>
          <p className="text-base text-[#6F6B63] max-w-xl mx-auto mb-8">
            Explore our collection of finished sculptures or commission a custom fabrication directly with our studio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-[#181817] text-[#F4F1EA] rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors shadow-xs"
            >
              Shop Collection
            </Link>
            <Link 
              href="/custom"
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#171716] border border-[#171716] rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#F4F1EA] transition-colors"
            >
              Start a Custom Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
