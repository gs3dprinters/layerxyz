'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UploadCloud, 
  Check, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Ruler, 
  Palette, 
  ShieldCheck, 
  Clock, 
  Info,
  X
} from 'lucide-react';
import { getCustomStatueWhatsAppUrl, formatPrice } from '@/lib/utils';
import { STUDIO_INFO } from '@/lib/config';

const STATUE_SIZES = [
  {
    height: '10 Inch',
    heightMm: '~250 mm',
    price: 8499,
    label: 'Compact Display',
    desc: 'Perfect for desks, bookshelves, and intimate personal spaces.',
  },
  {
    height: '15 Inch',
    heightMm: '~380 mm',
    price: 13999,
    label: 'Substantial Centerpiece',
    desc: 'Ideal for living room sideboards, family altars, and mantelpieces.',
  },
  {
    height: '18 Inch',
    heightMm: '~455 mm',
    price: 17999,
    label: 'Statement Heirloom',
    desc: 'Imposing, high-presence custom statue for commemorative tribute.',
  },
  {
    height: 'Custom Size',
    heightMm: 'Under 100mm to 1000mm+',
    price: null,
    label: 'Bespoke Dimensions',
    desc: 'Large architectural sculptures or miniature collectibles.',
  },
];

const FINISH_OPTIONS = [
  {
    id: 'single-colour-sandstone',
    name: 'Single-Colour Studio Matte',
    desc: 'Clean architectural finish in Warm Sandstone, Obsidian Graphite, or Chalk White.',
  },
  {
    id: 'temple-bronze',
    name: 'Antique Temple Bronze Patina',
    desc: 'Rich metallic patinated tone with aged bronze accents.',
  },
  {
    id: 'hand-painted',
    name: 'Hand-Painted Detailed Finish',
    desc: 'Artisanal polychrome hand painting for realistic attire, skin tones, and filigree.',
  },
];

export default function CustomStatuePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    height: '10 Inch',
    customHeight: '',
    finish: 'Single-Colour Studio Matte',
    location: '',
    budget: '',
    notes: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFileName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp phone number.');
      return;
    }
    if (!formData.location.trim()) {
      setErrorMsg('Please enter your delivery city or pin code.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    // Pre-filled WhatsApp redirect
    const heightDisplay = formData.height === 'Custom Size' && formData.customHeight
      ? `Custom (${formData.customHeight})`
      : formData.height;

    const waUrl = getCustomStatueWhatsAppUrl({
      name: formData.name,
      height: heightDisplay,
      finish: formData.finish,
      location: formData.location,
      budget: formData.budget,
      notes: formData.notes + (imageFileName ? ` [Uploaded reference photo: ${imageFileName}]` : ''),
    });

    // Auto-open in new tab after 1.5s for seamless conversion
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  const generatedWhatsAppUrl = getCustomStatueWhatsAppUrl({
    name: formData.name,
    height: formData.height === 'Custom Size' && formData.customHeight ? formData.customHeight : formData.height,
    finish: formData.finish,
    location: formData.location,
    budget: formData.budget,
    notes: formData.notes,
  });

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#242321] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Header */}
        <header className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DCCB] text-[11px] font-mono tracking-[0.2em] uppercase text-[#49392E] font-semibold mb-4">
            <Sparkles size={12} />
            Bespoke Portraiture & Statues
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4 leading-[1.05]">
            CUSTOM 3D PRINTED STATUES
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            From family photographs, portraits of elders, children, or sacred deity concepts — our Tiruppur studio digitally sculpts, 3D prints, and hand-finishes bespoke physical statues.
          </p>
        </header>

        {/* Pricing & Scale Overview Grid */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C8275] block mb-1">
              Standard Portrait Statue Scales
            </span>
            <h2 className="text-2xl font-sans font-semibold text-[#242321]">
              Select Your Preferred Height
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATUE_SIZES.map((size) => {
              const isSelected = formData.height === size.height;
              return (
                <div
                  key={size.height}
                  onClick={() => setFormData({ ...formData, height: size.height })}
                  className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#FAF7F2] border-[#242321] shadow-md ring-2 ring-[#242321]'
                      : 'bg-white/80 border-[#E8DCCB] hover:border-[#C4B7A5] hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-sans font-bold text-[#242321]">
                        {size.height}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#242321] text-white flex items-center justify-center text-xs">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[#8C8275] block mb-2">
                      {size.heightMm}
                    </span>
                    <p className="text-xs text-[#6F6B63] mb-4">
                      {size.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E8DCCB]">
                    {size.price ? (
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#8C8275] block">Starting at</span>
                        <span className="text-xl font-sans font-bold text-[#242321]">
                          {formatPrice(size.price)}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#8C8275] block">Pricing</span>
                        <span className="text-base font-sans font-semibold text-[#242321]">
                          Custom Quote
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Clear Payment Terms Banner */}
        <section className="mb-14 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DCCB] flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#E8DCCB] flex items-center justify-center text-[#242321] flex-shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="flex-grow">
            <span className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold block mb-0.5">
              Standard Commercial Payment Terms
            </span>
            <p className="text-xs sm:text-sm text-[#6F6B63] leading-relaxed">
              Production begins after design confirmation and a <strong>50% advance payment</strong>. The remaining <strong>50% balance</strong> is payable during the shipping process before final delivery. Delivery and shipping charges are calculated separately based on package weight and location.
            </p>
          </div>
        </section>

        {/* Custom Statue Enquiry Form */}
        <section className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E8DCCB] shadow-sm">
          {isSubmitted ? (
            /* On-Screen Success Confirmation */
            <div className="text-center py-10 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#242321] text-[#F5F0E8] flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A58B70] block mb-2 font-semibold">
                ENQUIRY RECEIVED
              </span>
              <h2 className="text-3xl font-sans font-semibold text-[#242321] mb-4">
                Thank You, {formData.name}!
              </h2>
              <p className="text-sm text-[#6F6B63] leading-relaxed mb-8">
                Your custom statue request for a <strong>{formData.height}</strong> piece with <strong>{formData.finish}</strong> has been received. Our studio will review your reference image and get in touch on WhatsApp.
              </p>

              <div className="space-y-3">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-medium rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-md"
                >
                  <MessageCircle size={18} />
                  <span>Open WhatsApp Conversation Now</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-xs font-mono text-[#6F6B63] hover:text-[#242321] transition-colors"
                >
                  Submit another custom enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-2xl font-sans font-semibold text-[#242321] mb-2">
                  Custom Statue Enquiry Form
                </h3>
                <p className="text-xs sm:text-sm text-[#6F6B63]">
                  Fill out the parameters below. We will inspect your reference photo and give you exact feasibility and turnaround time.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                  {errorMsg}
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Delivery Location (City / State / Pincode) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Coimbatore, Tamil Nadu - 641001"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>
              </div>

              {/* Reference Image Upload */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                  Reference Photograph or Concept Image
                </label>
                
                {imagePreview ? (
                  <div className="relative inline-block border border-[#E8DCCB] rounded-2xl p-2 bg-white">
                    <img
                      src={imagePreview}
                      alt="Uploaded reference"
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-[#242321] text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>
                    <span className="block text-[10px] font-mono text-[#6F6B63] mt-1 truncate max-w-[128px]">
                      {imageFileName}
                    </span>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border-2 border-dashed border-[#E8DCCB] hover:border-[#242321] transition-colors cursor-pointer">
                    <UploadCloud size={32} className="text-[#8C8275] mb-2" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold">
                      Click to upload reference photo
                    </span>
                    <span className="text-[11px] text-[#6F6B63] mt-1">
                      JPG, PNG, WEBP (Clear lighting preferred)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Finish Options */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-3">
                  Select Finishing Option
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {FINISH_OPTIONS.map((f) => {
                    const isSelected = formData.finish === f.name;
                    return (
                      <div
                        key={f.id}
                        onClick={() => setFormData({ ...formData, finish: f.name })}
                        className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                          isSelected
                            ? 'bg-white border-[#242321] ring-2 ring-[#242321]'
                            : 'bg-white/60 border-[#E8DCCB] hover:border-[#C4B7A5]'
                        }`}
                      >
                        <span className="text-sm font-semibold text-[#242321] block mb-1">
                          {f.name}
                        </span>
                        <span className="text-xs text-[#6F6B63] leading-relaxed block">
                          {f.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Additional Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Approximate Budget (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹10,000 – ₹15,000"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Special Instructions / Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Specific expression, traditional attire details, plinth inscription, or target date..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E8DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#242321] text-[#F5F0E8] font-medium hover:bg-[#49392E] transition-all rounded-full text-xs font-mono uppercase tracking-wider shadow-sm"
                >
                  <span>Submit Custom Statue Enquiry</span>
                  <ArrowRight size={14} />
                </button>

                <div className="flex items-center gap-2 text-xs text-[#6F6B63]">
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Direct follow-up on WhatsApp after submit</span>
                </div>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
