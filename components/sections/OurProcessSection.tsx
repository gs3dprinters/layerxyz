'use client';

import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Box, Cpu, PackageCheck } from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'SHARE YOUR IDEA',
    headline: 'Reference & Concept',
    desc: 'Customer shares reference photographs, sketches, CAD files, or creative concepts. We evaluate proportions, scale, and functional feasibility.',
    icon: ImageIcon,
  },
  {
    step: '02',
    title: 'DESIGN & MODELLING',
    headline: 'Digital Sculpting',
    desc: 'Our digital sculptors craft a high-detail 3D model. We share renders and preview images with you for review and design confirmation before printing.',
    icon: Box,
  },
  {
    step: '03',
    title: '3D PRINTING',
    headline: 'Precision Additive Build',
    desc: 'Once the design is confirmed and the 50% advance is received, the object is manufactured on professional Bambu Lab 3D printers with tight layer tolerances.',
    icon: Cpu,
  },
  {
    step: '04',
    title: 'FINISHING & DELIVERY',
    headline: 'Artisanal Finishing & Shipping',
    desc: 'The product is carefully inspected, assembled, surface-finished or painted when required, and packed in multi-layer shockproof packaging for safe Pan-India delivery.',
    icon: PackageCheck,
  },
];

export default function OurProcessSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F5F0E8] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            FROM CONCEPT TO PHYSICAL OBJECT
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4">
            OUR FOUR-STEP PROCESS
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            Every statue, custom gift, and engineered part follows a rigorous studio methodology ensuring likeness, precision, and reliable delivery across India.
          </p>
        </div>

        {/* 4-Step Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PROCESS_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8DCCB] hover:border-[#C4B7A5] hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-sans font-bold text-[#E8DCCB] group-hover:text-[#A58B70] transition-colors">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#E8DCCB]/50 flex items-center justify-center text-[#242321] group-hover:bg-[#242321] group-hover:text-[#F5F0E8] transition-all">
                      <Icon size={22} />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C8275] block mb-1">
                    {step.headline}
                  </span>
                  <h3 className="text-lg font-sans font-semibold text-[#242321] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6F6B63] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E8DCCB]/70 flex items-center justify-between text-[11px] font-mono text-[#8C8275]">
                  <span>Step {step.step} of 04</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A58B70]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Process Note on Terms & Timelines */}
        <div className="mt-12 bg-white/70 rounded-2xl p-6 sm:p-8 border border-[#E8DCCB] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#242321] font-semibold block mb-1">
              Transparent Production Terms
            </span>
            <p className="text-xs sm:text-sm text-[#6F6B63] leading-relaxed">
              Standard custom orders commence upon 3D digital model approval and 50% advance payment. The balance 50% is payable during shipping before final dispatch. Timelines depend on geometry complexity and finishing requirements.
            </p>
          </div>
          <Link
            href="/custom-statues"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors whitespace-nowrap"
          >
            <span>Start Your Order</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
