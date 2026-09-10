import Link from 'next/link';

export const metadata = {
  title: 'Returns & Care | Layerxyz',
  description: 'Care instructions and return policies for bespoke Layerxyz sculptures and objects.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-[#777777] mb-3">POLICIES & CARE</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-6">
            RETURNS & CARE
          </h1>
          <p className="text-lg text-[#6F6B63] leading-relaxed">
            Guidance on maintaining the textural finish of your physical piece, along with our replacement and refund standards.
          </p>
        </header>

        <div className="space-y-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-xl font-medium text-[#181818] mb-3">Custom & Bespoke Commissions</h2>
            <p className="text-[#6F6B63] leading-relaxed">
              Personalized portrait sculptures, bespoke CAD prototypes, and commissioned works made to customer specifications cannot be returned once production is completed. Before fabrication, digital proofs and geometry evaluations are confirmed to ensure complete alignment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-xl font-medium text-[#181818] mb-3">Transit Damage & Replacement Policy</h2>
            <p className="text-[#6F6B63] leading-relaxed">
              If an object arrives damaged in transit, photograph the packaging and damaged item within 48 hours of delivery and reach out to our team. We will review and prepare a replacement piece.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-xl font-medium text-[#181818] mb-3">Sculpture & Object Care</h2>
            <ul className="space-y-2 text-[#6F6B63] list-disc list-inside leading-relaxed text-sm">
              <li>Dust gently with a soft microfiber brush or dry lint-free cloth.</li>
              <li>Avoid harsh chemical cleaners or abrasive scouring pads.</li>
              <li>Keep indoor PLA sculptures away from prolonged direct exposure to high-heat sources (&gt;55°C).</li>
              <li>For matte finishes, handle with clean, dry hands to preserve surface uniformity.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#FAFAF8] p-8 rounded-3xl border border-[#E8E5DE] text-center">
          <p className="text-sm text-[#777777] mb-4">Need assistance regarding an existing order?</p>
          <Link href="/contact" className="text-sm font-medium text-[#181818] hover:underline">
            Reach out to our customer care team →
          </Link>
        </div>
      </div>
    </div>
  );
}
