import Link from 'next/link';
import { ArrowRight, Cpu, Layers, Sparkles, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: 'About Layer XYZ — 3D Printing & Custom Manufacturing Studio | Tiruppur',
  description:
    'Layer XYZ is a Tiruppur-based 3D printing and custom manufacturing studio focused on transforming ideas into physical products. Serving customers across India.',
};

export default function AboutPage() {
  const whatsappHref = getWhatsAppUrl(
    "Hi Layer XYZ, I'd like to learn more about your studio and fabrication capabilities."
  );

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#242321] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-16 md:mb-24">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            ABOUT LAYER XYZ
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#242321] mb-8 leading-[1.05] uppercase">
            YOUR IMAGINATION.<br />
            <span className="text-[#49392E]">MADE REAL IN TIRUPPUR.</span>
          </h1>
          <div className="text-lg sm:text-2xl text-[#49392E] leading-relaxed max-w-3xl font-normal">
            Layer XYZ is a Tiruppur-based 3D printing and custom manufacturing studio focused on transforming ideas into physical products. We combine digital design, 3D printing, assembly and finishing to create personalised products, sculptures and functional objects.
          </div>
        </header>

        {/* The Dual Market Mission */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start border-t border-[#E8DCCB] pt-16">
          <div className="md:col-span-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C8275] block mb-2">
              OUR DUAL FOCUS
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#242321]">
              Artisanal Craft & Engineering Precision
            </h2>
          </div>
          <div className="md:col-span-8 space-y-6 text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            <p>
              We serve two distinct customer groups with equal dedication:
            </p>
            <div className="space-y-4">
              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCB]">
                <h3 className="text-lg font-sans font-semibold text-[#242321] mb-1">
                  1. Bespoke Physical Products & Statues
                </h3>
                <p className="text-sm text-[#6F6B63]">
                  Patrons and families looking for beautifully sculpted custom human portrait statues, Hindu deity idols, personalized gift keepsakes, and distinctive home décor objects.
                </p>
              </div>

              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCB]">
                <h3 className="text-lg font-sans font-semibold text-[#242321] mb-1">
                  2. 3D Printing & Manufacturing Services
                </h3>
                <p className="text-sm text-[#6F6B63]">
                  Engineers, architects, businesses, and designers needing rapid prototyping, functional PETG components, and scalable batch 3D printing from CAD files.
                </p>
              </div>
            </div>
            <p>
              Every piece manufactured in our Tiruppur facility is inspected, hand-finished, and packed with multi-layer shockproof cushioning to guarantee pristine arrival anywhere in India.
            </p>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#E8DCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#E8DCCB] flex items-center justify-center text-[#242321] mb-6">
                <Cpu size={20} />
              </div>
              <span className="text-xs font-mono text-[#8C8275] block mb-2">01 / TECHNOLOGY</span>
              <h3 className="text-xl font-sans font-semibold text-[#242321] mb-3">Bambu Lab Fleet</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">
                State-of-the-art additive hardware providing micro-layer tolerances, clean surface definition, and reliable batch repeatability.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#E8DCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#E8DCCB] flex items-center justify-center text-[#242321] mb-6">
                <Sparkles size={20} />
              </div>
              <span className="text-xs font-mono text-[#8C8275] block mb-2">02 / SCULPTING</span>
              <h3 className="text-xl font-sans font-semibold text-[#242321] mb-3">Digital to Physical</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">
                We transform customer photos into expressive 3D models with confirmed preview renders before initiating production.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#E8DCCB]">
              <div className="w-10 h-10 rounded-xl bg-[#E8DCCB] flex items-center justify-center text-[#242321] mb-6">
                <ShieldCheck size={20} />
              </div>
              <span className="text-xs font-mono text-[#8C8275] block mb-2">03 / INTEGRITY</span>
              <h3 className="text-xl font-sans font-semibold text-[#242321] mb-3">Transparent Terms</h3>
              <p className="text-sm text-[#6F6B63] leading-relaxed">
                Clear 50% advance before production and 50% on shipping. Honest timelines, tracked nationwide delivery, and direct WhatsApp support.
              </p>
            </div>
          </div>
        </section>

        {/* Location & Contact Bar */}
        <section className="mb-24 bg-[#FAF7F2] p-10 sm:p-14 rounded-3xl border border-[#E8DCCB] flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8C8275] block mb-2">
              STUDIO LOCATION
            </span>
            <h3 className="text-2xl font-sans font-semibold text-[#242321] mb-2">
              Tiruppur, Tamil Nadu, India
            </h3>
            <p className="text-sm text-[#6F6B63]">
              Manufactured locally in Tamil Nadu and shipped securely nationwide across India.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow-xs"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Studio</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors"
            >
              Contact Details
            </Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center py-16 border-t border-[#E8DCCB]">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            COMMISSIONS & INQUIRIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-semibold text-[#242321] mb-6 uppercase">
            HAVE AN IDEA? LET&apos;S MAKE IT REAL.
          </h2>
          <p className="text-base text-[#6F6B63] max-w-xl mx-auto mb-8">
            Connect with our team to start a custom portrait statue or receive an immediate 3D printing quotation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/custom-statues"
              className="px-8 py-4 bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider rounded-full hover:bg-[#49392E] transition-colors shadow-sm"
            >
              Order Custom Statue
            </Link>
            <Link
              href="/3d-printing"
              className="px-8 py-4 bg-transparent border border-[#242321] text-[#242321] text-xs font-mono uppercase tracking-wider rounded-full hover:bg-[#242321] hover:text-[#F5F0E8] transition-colors"
            >
              Get 3D Printing Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
