import { FAQS } from '@/data/faqs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions | Layerxyz',
  description: 'Answers about Layerxyz 3D fabrication, materials, pricing, custom statues, and shipping.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-28 pb-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase text-[#777777] mb-3">COMMON INQUIRIES</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-lg text-[#6F6B63] leading-relaxed">
            Everything you need to know about our physical editions, custom commissions, and fabrication processes.
          </p>
        </header>

        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8E5DE] mb-16 shadow-xs">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.id || i} value={`item-${i}`} className="border-b border-[#E8E5DE] py-3">
                <AccordionTrigger className="text-lg font-medium text-[#181818] hover:text-[#777777] transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6F6B63] leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-[#FAFAF8] p-10 rounded-3xl border border-[#E8E5DE] text-center">
          <h2 className="text-2xl font-semibold text-[#181818] mb-3">Still have questions?</h2>
          <p className="text-sm text-[#777777] mb-8 max-w-md mx-auto">
            Our studio team is available to review your concept or 3D files directly.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-[#181818] text-white rounded-full font-medium text-sm hover:bg-[#2A2A2A] transition-colors"
          >
            Contact Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
