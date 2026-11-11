'use client';

import { ShieldCheck, Cpu, Palette, Sparkles, Truck, Layers, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const REASONS = [
  {
    title: 'In-House 3D Printing Studio',
    desc: 'We fabricate directly in our studio in Tiruppur, Tamil Nadu. Nothing is outsourced to unverified third parties, giving us complete control over quality and timelines.',
    icon: Layers,
  },
  {
    title: 'Professional Bambu Lab Equipment',
    desc: 'Our printing fleet uses state-of-the-art Bambu Lab additive manufacturing hardware, ensuring high surface resolution, consistent layer bonding, and dimensional accuracy.',
    icon: Cpu,
  },
  {
    title: 'Custom Digital Sculpting & Design',
    desc: 'We don’t just print files — our digital sculptors create custom 3D models from your reference photos, capturing authentic likeness and organic contours.',
    icon: Sparkles,
  },
  {
    title: 'Meticulous Attention to Detail',
    desc: 'From seam hiding and precise support placement to surface smoothing, every print is thoroughly post-processed before packaging.',
    icon: CheckCircle2,
  },
  {
    title: 'Artisanal Assembly & Finishing',
    desc: 'We offer single-colour studio matte textures, temple bronze patinas, and custom hand-painted finishes to turn raw prints into finished works of art.',
    icon: Palette,
  },
  {
    title: 'Prototyping & Bulk Capacity',
    desc: 'From one-off commemorative gifts to commercial production runs of hundreds of units, we scale output with multi-machine parallel scheduling.',
    icon: ShieldCheck,
  },
  {
    title: 'Safe Pan-India Delivery',
    desc: 'Custom sculptures are delicate objects. We pack every order with custom shock-absorbent cushioning and reinforced outer cartons, delivering securely across India.',
    icon: Truck,
  },
];

export default function WhyLayerxyzSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            WHY CLIENTS TRUST US
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4">
            WHY LAYER XYZ
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            We are not an anonymous online print broker. We are an artisanal digital fabrication studio that takes pride in craftsmanship, communication, and real physical quality.
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={idx}
                className="bg-[#F5F0E8] rounded-3xl p-7 sm:p-8 border border-[#E8DCCB] hover:border-[#C4B7A5] hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-[#E8DCCB] flex items-center justify-center text-[#242321] mb-6">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-sans font-semibold text-[#242321] mb-2.5">
                    {reason.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F6B63] leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Quick Studio Fact Card */}
          <div className="bg-[#242321] text-[#F5F0E8] rounded-3xl p-7 sm:p-8 border border-[#33312E] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#A58B70] block mb-2">
                STUDIO PRESENCE
              </span>
              <h3 className="text-2xl font-sans font-semibold mb-3">
                Based in Tiruppur. Shipping Nationwide.
              </h3>
              <p className="text-xs sm:text-sm text-[#A8A49C] leading-relaxed mb-6">
                Have a unique design or want to inspect material samples? Connect with our team directly on WhatsApp for guidance.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F5F0E8] hover:text-[#A58B70] transition-colors"
            >
              <span>Learn More About Our Studio →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
