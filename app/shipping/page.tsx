import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Delivery | Layerxyz',
  description: 'Shipping timelines, packaging standards, and delivery information for Layerxyz pieces.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-[#777777] mb-3">FULFILLMENT</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-6">
            SHIPPING & DELIVERY
          </h1>
          <p className="text-lg text-[#6F6B63] leading-relaxed">
            Every Layerxyz object is produced individually, inspected by hand, and secured in custom protective packaging.
          </p>
        </header>

        <div className="space-y-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-xl font-medium text-[#181818] mb-3">Production & Dispatch Timelines</h2>
            <p className="text-[#6F6B63] leading-relaxed mb-4">
              Because our editions and custom objects are made to order, standard production ranges from 3 to 7 business days depending on geometric complexity and hand-finishing tier.
            </p>
            <p className="text-[#6F6B63] leading-relaxed">
              Once quality inspection is signed off, orders dispatch via express courier with real-time tracking provided directly to your email.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-xl font-medium text-[#181818] mb-3">Protective Packaging Standards</h2>
            <p className="text-[#6F6B63] leading-relaxed">
              Delicate sculptures, fine facial details, and multi-part assemblies are immobilized using dense shock-absorbing foam inserts and reinforced outer cartons to guarantee transit safety across domestic and international routes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE]">
            <h2 className="text-xl font-medium text-[#181818] mb-3">Large-Scale Installation Logistics</h2>
            <p className="text-[#6F6B63] leading-relaxed">
              For architectural and monumental pieces exceeding 1000mm, we coordinate dedicated crating and freight logistics with tailored assembly guidelines.
            </p>
          </div>
        </div>

        <div className="bg-[#FAFAF8] p-8 rounded-3xl border border-[#E8E5DE] text-center">
          <p className="text-sm text-[#777777] mb-4">Have an urgent timeline or specific delivery requirement?</p>
          <Link href="/contact" className="text-sm font-medium text-[#181818] hover:underline">
            Contact our studio logistics →
          </Link>
        </div>
      </div>
    </div>
  );
}
