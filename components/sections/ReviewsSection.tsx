'use client';

import { Star, MessageSquareQuote, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    quote: "The facial likeness on the custom bust created from our photograph exceeded our expectations. They shared 3D preview renders before printing, and the sandstone finish feels solid and premium.",
    author: "R. Narayanan",
    location: "Chennai, Tamil Nadu",
    project: "Custom Portrait Bust (10 Inch)",
    rating: 5,
  },
  {
    quote: "Ordered the sacred Nandi sculpture for our puja space. The bell garlands and plinth detail came out extraordinarily sharp. Packed securely with multi-layer cushioning — arrived in pristine condition.",
    author: "P. Karthikeyan",
    location: "Bengaluru, Karnataka",
    project: "Nandi Temple Sculpture (8 Inch)",
    rating: 5,
  },
  {
    quote: "Sent over a set of mechanical STEP files for prototype enclosures. Layer XYZ provided a clear quote within hours, used high-density PETG, and held tight tolerances across all mounting holes.",
    author: "S. Vignesh",
    location: "Coimbatore, Tamil Nadu",
    project: "PETG Technical Prototype Enclosure",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#F5F0E8] border-b border-[#E8DCCB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            CLIENT EXPERIENCES
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4">
            CUSTOMER TRUST & REVIEWS
          </h2>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            From heirloom portrait statues to rapid technical prototypes, our focus is craftsmanship, transparent communication, and safe delivery across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8DCCB] hover:border-[#C4B7A5] hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-[#A58B70] mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" stroke="none" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#242321] leading-relaxed mb-6 font-normal italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#E8DCCB]/80 flex flex-col">
                <span className="text-sm font-semibold text-[#242321]">
                  {review.author}
                </span>
                <span className="text-xs text-[#6F6B63] mb-1">
                  {review.location}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A58B70] font-medium">
                  {review.project}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 pt-10 border-t border-[#E8DCCB] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-xl font-bold font-sans text-[#242321]">100% In-House</span>
            <span className="text-xs text-[#6F6B63]">Fabricated in Tiruppur</span>
          </div>
          <div>
            <span className="block text-xl font-bold font-sans text-[#242321]">3D Preview</span>
            <span className="text-xs text-[#6F6B63]">Confirmed before printing</span>
          </div>
          <div>
            <span className="block text-xl font-bold font-sans text-[#242321]">Multi-Layer Packing</span>
            <span className="text-xs text-[#6F6B63]">Damage-free Pan-India shipping</span>
          </div>
          <div>
            <span className="block text-xl font-bold font-sans text-[#242321]">50% Advance</span>
            <span className="text-xs text-[#6F6B63]">Balance during dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
