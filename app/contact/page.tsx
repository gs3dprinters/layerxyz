import Link from 'next/link';

export const metadata = {
  title: 'Contact Studio | Layerxyz',
  description: 'Get in touch with Layerxyz studio for custom fabrication inquiries, collaborations, and orders.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-[#777777] mb-3">GET IN TOUCH</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-6">
            CONTACT STUDIO
          </h1>
          <p className="text-lg text-[#6F6B63] leading-relaxed">
            Have a question about an existing piece, or looking to discuss a bespoke sculptural installation? We are here to help.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-lg font-medium text-[#181818] mb-2">Direct Studio Email</h2>
            <p className="text-sm text-[#777777] mb-6">For inquiries, CAD review, and estimates.</p>
            <a 
              href="mailto:studio@layerxyz.com" 
              className="text-base font-semibold text-[#181818] hover:underline"
            >
              studio@layerxyz.com
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-lg font-medium text-[#181818] mb-2">Studio Location</h2>
            <p className="text-sm text-[#777777] mb-6">Visits by prior consultation.</p>
            <p className="text-base font-medium text-[#181818]">
              Tiruppur, Tamil Nadu, India
            </p>
          </div>
        </div>

        <div className="bg-[#FAFAF8] p-10 rounded-3xl border border-[#E8E5DE] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-medium text-[#181818] mb-1">Custom Fabrication Project?</h3>
            <p className="text-sm text-[#777777]">Submit your 3D files or brief through our custom wizard.</p>
          </div>
          <Link
            href="/custom"
            className="inline-flex items-center px-7 py-3.5 bg-[#181818] text-white rounded-full font-medium text-sm hover:bg-[#2A2A2A] transition-colors whitespace-nowrap"
          >
            Start Custom Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
