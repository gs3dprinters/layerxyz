"use client";
import { motion } from "framer-motion";
import { FAQS } from "@/data/faqs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/ui/Accordion";
import Link from "next/link";

export default function FAQSection() {
  return (
    <section className="bg-[#FAFAF8] py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:w-1/3 flex flex-col"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#181818] mb-6">COMMON QUESTIONS</h2>
          <p className="text-[#777777] mb-8">Can&apos;t find what you&apos;re looking for? Reach out directly.</p>
          <Link 
            href="https://wa.me/1234567890" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center items-center px-6 py-3 bg-[#181818] text-white rounded-full font-medium w-max hover:bg-[#2A2A2A] transition-colors"
          >
            Chat on WhatsApp
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="lg:w-2/3"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-[#E8E5DE] py-2">
                <AccordionTrigger className="text-lg font-medium text-[#181818] hover:text-[#777777] transition-colors text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#777777] leading-relaxed pb-6 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}