'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UploadCloud, 
  Check, 
  ArrowRight, 
  MessageCircle, 
  Cpu, 
  Layers, 
  Ruler, 
  ShieldCheck, 
  Clock, 
  FileCode,
  X
} from 'lucide-react';
import { getPrintingQuoteWhatsAppUrl } from '@/lib/utils';
import { STUDIO_INFO } from '@/lib/config';

const SUPPORTED_MATERIALS = [
  {
    name: 'PLA / PLA Pro+',
    category: 'Aesthetic & Display',
    desc: 'High surface definition, sharp edges, and zero warping. Perfect for architectural scale models, figurine prototypes, and display shells.',
  },
  {
    name: 'Technical PETG',
    category: 'Engineering & Functional',
    desc: 'Impact resistant, moisture-proof, and heat tolerant up to 75°C. Best for functional brackets, mechanical adapters, and outdoor fixtures.',
  },
  {
    name: 'Flexible TPU (95A)',
    category: 'Elastomer / Flexible',
    desc: 'Rubber-like compliance, vibration damping, custom gaskets, protective covers, and wearable prototypes.',
  },
  {
    name: 'High-Detail Resin',
    category: 'Miniature & Jewelry',
    desc: 'Micron-level layer accuracy (25–50μm) for ultra-miniatures, master molds, and delicate mechanical gears.',
  },
];

export default function ThreeDPrintingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    material: 'PLA / PLA Pro+',
    quantity: '1',
    dimensions: '',
    deadline: 'Standard (5–7 Days)',
    notes: '',
  });

  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['.stl', '.3mf', '.step', '.stp', '.obj', '.zip'];
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!validExtensions.includes(ext)) {
        setErrorMsg(`Unsupported file type (${ext}). Please upload .STL, .3MF, .STEP, .OBJ, or a .ZIP archive.`);
        return;
      }

      setErrorMsg('');
      setUploadedFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const removeFile = () => {
    setUploadedFileName('');
    setFileSize('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg('Please enter your WhatsApp contact number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    const waUrl = getPrintingQuoteWhatsAppUrl({
      name: formData.name,
      fileType: uploadedFileName ? uploadedFileName : 'Files ready to share via WhatsApp',
      material: formData.material,
      quantity: formData.quantity,
      dimensions: formData.dimensions,
      deadline: formData.deadline,
      notes: formData.notes,
    });

    // Auto-open in new tab after 1.2s
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  const generatedWhatsAppUrl = getPrintingQuoteWhatsAppUrl({
    name: formData.name,
    fileType: uploadedFileName ? uploadedFileName : '3D files ready',
    material: formData.material,
    quantity: formData.quantity,
    dimensions: formData.dimensions,
    deadline: formData.deadline,
    notes: formData.notes,
  });

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#242321] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Header */}
        <header className="mb-14 sm:mb-20 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DCCB] text-[11px] font-mono tracking-[0.2em] uppercase text-[#49392E] font-semibold mb-4">
            <Cpu size={12} />
            Additive Manufacturing Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#242321] uppercase mb-4 leading-[1.05]">
            3D PRINTING SERVICES
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            High-speed, precision additive fabrication in Tiruppur. We accept your 3D models and CAD files to produce one-off functional prototypes, design iterations, or commercial batch manufacturing.
          </p>
        </header>

        {/* Accepted File Formats & Fleet Capability Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DCCB]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block mb-2">
              ACCEPTED FORMATS
            </span>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {['.STL', '.3MF', '.STEP', '.OBJ', '.ZIP'].map((fmt) => (
                <span key={fmt} className="px-2.5 py-1 bg-[#E8DCCB]/60 rounded-md text-xs font-mono font-semibold text-[#242321]">
                  {fmt}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#6F6B63]">
              Native Bambu Lab 3MF and standard mesh or solid STEP files accepted.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DCCB]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block mb-2">
              STUDIO CAPACITY
            </span>
            <h3 className="text-lg font-sans font-bold text-[#242321] mb-1">
              Bambu Lab 3D Fleet
            </h3>
            <p className="text-xs text-[#6F6B63] leading-relaxed">
              Layer heights down to 0.08mm. Enclosed print volumes up to 256 × 256 × 256 mm per section, with modular assembly for larger objects.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DCCB]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8275] block mb-2">
              PRODUCTION VOLUME
            </span>
            <h3 className="text-lg font-sans font-bold text-[#242321] mb-1">
              1 to 500+ Units
            </h3>
            <p className="text-xs text-[#6F6B63] leading-relaxed">
              Rapid single-unit validation in 24–48 hours, or scheduled commercial multi-machine batch manufacturing.
            </p>
          </div>
        </div>

        {/* Materials Overview */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8C8275] block mb-1">
              Engineered & Aesthetic Resins/Polymers
            </span>
            <h2 className="text-2xl font-sans font-semibold text-[#242321]">
              Supported Studio Materials
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORTED_MATERIALS.map((mat) => (
              <div
                key={mat.name}
                onClick={() => setFormData({ ...formData, material: mat.name })}
                className={`cursor-pointer rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  formData.material === mat.name
                    ? 'bg-[#FAF7F2] border-[#242321] shadow-md ring-2 ring-[#242321]'
                    : 'bg-white/80 border-[#E8DCCB] hover:border-[#C4B7A5]'
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A58B70] block mb-1">
                    {mat.category}
                  </span>
                  <h4 className="text-base font-sans font-bold text-[#242321] mb-2">
                    {mat.name}
                  </h4>
                  <p className="text-xs text-[#6F6B63] leading-relaxed">
                    {mat.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8DCCB] text-[11px] font-mono text-[#8C8275]">
                  {formData.material === mat.name ? '✓ Selected' : 'Click to select'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commercial Payment Terms Banner */}
        <section className="mb-14 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DCCB] flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-[#E8DCCB] flex items-center justify-center text-[#242321] flex-shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div className="flex-grow">
            <span className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold block mb-0.5">
              Payment & Quotation Guarantee
            </span>
            <p className="text-xs sm:text-sm text-[#6F6B63] leading-relaxed">
              Every quote is reviewed by our engineering team based on geometry, volume, and infill density. <strong>Standard terms: 50% advance before printing</strong> and <strong>50% balance during dispatch</strong>. Fast turnaround with Pan-India tracked courier delivery.
            </p>
          </div>
        </section>

        {/* Quotation Enquiry Form */}
        <section className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-[#E8DCCB] shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#242321] text-[#F5F0E8] flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A58B70] block mb-2 font-semibold">
                REQUEST LOGGED
              </span>
              <h2 className="text-3xl font-sans font-semibold text-[#242321] mb-4">
                Thank You, {formData.name}!
              </h2>
              <p className="text-sm text-[#6F6B63] leading-relaxed mb-8">
                Your 3D printing quotation request for <strong>{formData.quantity} unit(s)</strong> in <strong>{formData.material}</strong> has been received. Our team will review your files and provide exact pricing on WhatsApp.
              </p>

              <div className="space-y-3">
                <a
                  href={generatedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-medium rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#20ba59] transition-all shadow-md"
                >
                  <MessageCircle size={18} />
                  <span>Send Files on WhatsApp</span>
                </a>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full inline-flex items-center justify-center px-6 py-3 text-xs font-mono text-[#6F6B63] hover:text-[#242321] transition-colors"
                >
                  Submit another file for quotation
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-2xl font-sans font-semibold text-[#242321] mb-2">
                  Request a 3D Printing Quotation
                </h3>
                <p className="text-xs sm:text-sm text-[#6F6B63]">
                  Attach your 3D model or specify project details. We review files manually to ensure fair pricing and 100% build feasibility.
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
                    placeholder="e.g. Anand Sivakumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    WhatsApp Contact Number *
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

              {/* File Attachment Upload */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                  Attach 3D Model File (.STL, .3MF, .STEP, .OBJ, .ZIP)
                </label>

                {uploadedFileName ? (
                  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E8DCCB]">
                    <div className="flex items-center gap-3">
                      <FileCode size={24} className="text-[#242321]" />
                      <div>
                        <span className="text-sm font-semibold text-[#242321] block">
                          {uploadedFileName}
                        </span>
                        <span className="text-xs text-[#6F6B63]">{fileSize}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1.5 text-[#6F6B63] hover:text-red-600 transition-colors"
                      title="Remove file"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border-2 border-dashed border-[#E8DCCB] hover:border-[#242321] transition-colors cursor-pointer">
                    <UploadCloud size={32} className="text-[#8C8275] mb-2" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold">
                      Click to browse or drop your 3D model
                    </span>
                    <span className="text-[11px] text-[#6F6B63] mt-1">
                      STL, 3MF, STEP, OBJ, or ZIP archive (up to 50MB)
                    </span>
                    <input
                      type="file"
                      accept=".stl,.3mf,.step,.stp,.obj,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                )}
                <span className="text-[11px] text-[#8C8275] block mt-1.5">
                  Large files or multiple CAD assemblies can also be sent directly to our team via WhatsApp or Google Drive.
                </span>
              </div>

              {/* Quantity, Dimensions & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Quantity *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 piece, 25 pieces"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Approx. Dimensions (mm)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 120 × 80 × 45 mm"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                    Target Deadline
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                  >
                    <option value="Urgent (24–48 Hours)">Urgent (24–48 Hours)</option>
                    <option value="Standard (5–7 Days)">Standard (5–7 Days)</option>
                    <option value="Flexible (1–2 Weeks)">Flexible (1–2 Weeks)</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#242321] font-semibold mb-2">
                  Technical Instructions / Infill / Tolerance Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 40% gyroid infill for strength, specific color preference, assembly fit tolerance..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-[#E8DCCB] text-sm text-[#242321] placeholder-[#A8A49C] focus:outline-none focus:ring-2 focus:ring-[#242321]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E8DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#242321] text-[#F5F0E8] font-medium hover:bg-[#49392E] transition-all rounded-full text-xs font-mono uppercase tracking-wider shadow-sm"
                >
                  <Cpu size={14} />
                  <span>Request Custom Printing Quote</span>
                  <ArrowRight size={14} />
                </button>

                <div className="flex items-center gap-2 text-xs text-[#6F6B63]">
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Immediate review on WhatsApp</span>
                </div>
              </div>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
