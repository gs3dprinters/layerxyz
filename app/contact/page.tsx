import Link from 'next/link';
import { MessageCircle, Mail, MapPin, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/config';
import { getWhatsAppUrl } from '@/lib/utils';

export const metadata = {
  title: 'Contact Studio | Layer XYZ — Tiruppur, India',
  description: 'Get in touch with Layer XYZ studio for custom 3D printed statues, 3D printing quotations, and orders. Call or WhatsApp +91 86105 49543.',
};

export default function ContactPage() {
  const whatsappHref = getWhatsAppUrl(
    "Hi Layer XYZ, I'm reaching out from your contact page to enquire about custom 3D printing and statues."
  );

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-28 sm:pt-36 pb-20 px-6 md:px-12 text-[#242321]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-14 text-center max-w-2xl mx-auto">
          <p className="text-xs font-mono tracking-widest uppercase text-[#8C8275] mb-3">GET IN TOUCH</p>
          <h1 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4">
            CONTACT STUDIO
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            Have a question about a custom statue, want to discuss an STL/CAD 3D printing quotation, or looking for batch manufacturing? We are here to help.
          </p>
        </header>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: WhatsApp (Primary) */}
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E8DCCB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-6">
                <MessageCircle size={24} />
              </div>
              <h2 className="text-lg font-sans font-semibold text-[#242321] mb-1">
                WhatsApp Studio
              </h2>
              <p className="text-xs text-[#6F6B63] mb-4">
                Fastest response for design reviews, quotes, and order updates.
              </p>
              <div className="text-base font-bold font-mono text-[#242321] mb-6">
                {STUDIO_INFO.phoneDisplay}
              </div>
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#25D366] text-white text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-colors shadow-xs"
            >
              <MessageCircle size={15} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E8DCCB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8DCCB] text-[#242321] flex items-center justify-center mb-6">
                <Mail size={22} />
              </div>
              <h2 className="text-lg font-sans font-semibold text-[#242321] mb-1">
                Direct Email
              </h2>
              <p className="text-xs text-[#6F6B63] mb-4">
                For formal purchase orders, large CAD assemblies, and corporate queries.
              </p>
              <a 
                href={`mailto:${STUDIO_INFO.email}`} 
                className="text-sm font-semibold font-mono text-[#242321] hover:underline block mb-6 break-all"
              >
                {STUDIO_INFO.email}
              </a>
            </div>

            <a
              href={`mailto:${STUDIO_INFO.email}`}
              className="inline-flex items-center justify-center w-full py-3 px-4 rounded-full bg-[#242321] text-[#F5F0E8] text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors"
            >
              Send an Email
            </a>
          </div>

          {/* Card 3: Location */}
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E8DCCB] shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8DCCB] text-[#242321] flex items-center justify-center mb-6">
                <MapPin size={22} />
              </div>
              <h2 className="text-lg font-sans font-semibold text-[#242321] mb-1">
                Studio Location
              </h2>
              <p className="text-xs text-[#6F6B63] mb-4">
                In-house digital fabrication facility.
              </p>
              <p className="text-sm font-medium text-[#242321] mb-6">
                {STUDIO_INFO.locationDisplay}
              </p>
            </div>

            <span className="text-[11px] font-mono text-[#8C8275] text-center block py-3 bg-white/70 rounded-full border border-[#E8DCCB]">
              Pan-India Safe Delivery
            </span>
          </div>
        </div>

        {/* Quick Action Banner */}
        <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-3xl border border-[#E8DCCB] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-sans font-semibold text-[#242321] mb-1">
              Have a 3D File or Custom Idea?
            </h3>
            <p className="text-xs sm:text-sm text-[#6F6B63]">
              Upload your files online or select statue sizing for an immediate feasibility check.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/custom-statues"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#242321] text-[#F5F0E8] rounded-full font-medium text-xs font-mono uppercase tracking-wider hover:bg-[#49392E] transition-colors whitespace-nowrap"
            >
              Custom Statues →
            </Link>
            <Link
              href="/3d-printing"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white border border-[#242321] text-[#242321] rounded-full font-medium text-xs font-mono uppercase tracking-wider hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
            >
              3D Printing Quote →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
