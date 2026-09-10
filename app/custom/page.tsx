"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitQuote } from '@/lib/api';
import { getWhatsAppUrl } from '@/lib/utils';
import { UploadCloud, Check, ArrowRight, Layers, Ruler, Sparkles, Send, FileText } from 'lucide-react';
import { MATERIALS } from '@/data/materials';

const PROCESS_STAGES = [
  {
    step: '01',
    title: 'SHARE YOUR IDEA',
    desc: 'Photograph, sketch, CAD file, 3D model or reference.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'DIGITAL DEVELOPMENT',
    desc: 'The idea is prepared and refined for physical production.',
    icon: Layers,
  },
  {
    step: '03',
    title: 'CHOOSE YOUR SCALE',
    desc: 'From compact desk pieces to large sculptural statements.',
    icon: Ruler,
  },
  {
    step: '04',
    title: 'CHOOSE MATERIAL / FINISH',
    desc: 'PLA / PLA PRO+, PETG, and custom hand finishing.',
    icon: Sparkles,
  },
  {
    step: '05',
    title: 'GET A QUOTE',
    desc: 'Receive transparent pricing and production timeline.',
    icon: Send,
  },
];

const PROJECT_TYPES = [
  'Custom Portrait Sculpture',
  'Heritage / Religious Statue',
  'Personalized Name / Desk Object',
  'Statement / Large Scale Sculpture',
  'Architectural / Scale Model',
  'Prototype / Custom Object',
];

const SIZES = [
  'Miniature (Under 100mm)',
  'Desk / Display (100mm – 200mm)',
  'Substantial (200mm – 400mm)',
  'Large Format (400mm – 1000mm+)',
  'Custom Dimensions',
];

const DEADLINES = ['Standard Timeline', 'Within 2–3 Weeks', 'Within 1 Month', 'Urgent Inquiry'];

export default function CustomProjectPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: '',
    file: null as File | null,
    size: '',
    customDimensions: '',
    material: '',
    finish: '',
    quantity: '1',
    deadline: '',
    description: '',
    colorPreference: '',
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 5;

  const handleNext = () => setStep(s => Math.min(totalSteps, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitQuote(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex flex-col items-center justify-center p-6 pt-32">
        <div className="bg-white p-10 sm:p-14 rounded-3xl max-w-lg w-full text-center border border-[#E8E5DE] shadow-sm">
          <div className="w-16 h-16 bg-[#171716] text-[#F4F1EA] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={28} />
          </div>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2">
            COMMISSION INQUIRY RECEIVED
          </span>
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] mb-3">
            Quote request submitted.
          </h2>
          <p className="text-sm text-[#6F6B63] mb-8 leading-relaxed">
            Our studio will review your project parameters and get in touch with feasibility, pricing, and timeline guidance.
          </p>
          <div className="space-y-3">
            <a 
              href={getWhatsAppUrl(`Hi Layerxyz studio, I have just submitted a custom commission request for ${formData.projectType || 'a custom project'}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-[#181817] text-[#F4F1EA] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors shadow-xs"
            >
              Follow up on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Editorial Header */}
        <header className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            BESPOKE FABRICATION
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-6 leading-[1.1]">
            BRING YOUR IDEA INTO THE REAL WORLD.
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] leading-relaxed">
            From photographs and sketches to digital files and original concepts, we turn ideas into physical objects.
          </p>
        </header>

        {/* 5-Stage Visual Journey */}
        <section className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS_STAGES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E5DE] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#8E8B83]">{s.step}</span>
                      <Icon size={16} className="text-[#171716]" />
                    </div>
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#171716] mb-2">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6F6B63] leading-relaxed mt-2">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Multi-Step Commission Form Container */}
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex gap-2 mb-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 flex-1 rounded-full transition-colors ${i + 1 <= step ? 'bg-[#181817]' : 'bg-[#E8E5DE]'}`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-[#6F6B63] uppercase tracking-wider">
              <span>Step {step} of {totalSteps}</span>
              <span>
                {step === 1 && 'Object Type'}
                {step === 2 && 'Reference File'}
                {step === 3 && 'Scale & Material'}
                {step === 4 && 'Details & Timeline'}
                {step === 5 && 'Contact & Summary'}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#E8E5DE] shadow-xs">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              >
                {/* STEP 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                        STAGE 01
                      </span>
                      <h2 className="text-2xl font-sans font-semibold text-[#171716]">
                        What kind of object are you looking to create?
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PROJECT_TYPES.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateField('projectType', type)}
                          className={`p-4 text-left rounded-2xl border transition-all ${
                            formData.projectType === type 
                              ? 'border-[#171716] bg-[#171716] text-[#F4F1EA] shadow-xs' 
                              : 'border-[#E8E5DE] bg-white hover:border-[#D4D0C8] text-[#171716]'
                          }`}
                        >
                          <span className="text-sm font-medium block">{type}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                        STAGE 02
                      </span>
                      <h2 className="text-2xl font-sans font-semibold text-[#171716]">
                        Share reference files or 3D data
                      </h2>
                      <p className="text-xs text-[#6F6B63] mt-1">
                        Supported: .stl, .obj, .3mf, .step, .zip, .jpg, .png, .pdf
                      </p>
                    </div>
                    
                    <div className="border-2 border-dashed border-[#E8E5DE] rounded-2xl p-10 text-center hover:border-[#171716] transition-colors relative bg-[#FAFAF8]">
                      <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      {formData.file ? (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs border border-[#E8E5DE]">
                            <Check className="text-[#171716]" size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-[#171716]">{formData.file.name}</p>
                            <p className="text-xs text-[#6F6B63]">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <button 
                            type="button"
                            onClick={(e) => { e.preventDefault(); updateField('file', null); }}
                            className="text-xs text-red-600 hover:underline z-10 relative mt-1"
                          >
                            Remove file
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs border border-[#E8E5DE]">
                            <UploadCloud className="text-[#171716]" size={20} />
                          </div>
                          <p className="font-medium text-sm text-[#171716]">Drop your reference or model here</p>
                          <span className="px-5 py-2 bg-white border border-[#E8E5DE] rounded-full text-xs font-mono uppercase tracking-wider text-[#171716]">
                            Browse Files
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <button 
                        type="button"
                        onClick={handleNext} 
                        className="text-xs font-mono uppercase tracking-wider text-[#6F6B63] hover:text-[#171716] underline underline-offset-4"
                      >
                        Don&apos;t have a file yet? Skip this step →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                        STAGE 03
                      </span>
                      <h2 className="text-2xl font-sans font-semibold text-[#171716] mb-4">Scale & Dimensions</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {SIZES.map(size => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => updateField('size', size)}
                            className={`p-4 text-left rounded-2xl border transition-all ${
                              formData.size === size 
                                ? 'border-[#171716] bg-[#171716] text-[#F4F1EA] shadow-xs' 
                                : 'border-[#E8E5DE] bg-white hover:border-[#D4D0C8] text-[#171716]'
                            }`}
                          >
                            <span className="text-sm font-medium block">{size}</span>
                          </button>
                        ))}
                      </div>
                      {formData.size === 'Custom Dimensions' && (
                        <input 
                          type="text" 
                          placeholder="e.g., 250mm x 150mm x 180mm" 
                          value={formData.customDimensions}
                          onChange={(e) => updateField('customDimensions', e.target.value)}
                          className="w-full mt-3 p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817]"
                        />
                      )}
                    </div>

                    <div className="pt-6 border-t border-[#E8E5DE]">
                      <h3 className="text-lg font-sans font-semibold text-[#171716] mb-3">Material Choice</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {MATERIALS?.map((mat: any) => (
                          <button
                            key={mat.id}
                            type="button"
                            onClick={() => updateField('material', mat.name)}
                            className={`p-4 text-left rounded-2xl border transition-all flex flex-col justify-between ${
                              formData.material === mat.name 
                                ? 'border-[#171716] bg-[#171716] text-[#F4F1EA] shadow-xs' 
                                : 'border-[#E8E5DE] bg-white hover:border-[#D4D0C8] text-[#171716]'
                            }`}
                          >
                            <div>
                              <span className="text-xs font-mono uppercase tracking-wider block font-semibold mb-1">{mat.name}</span>
                              <span className={`text-xs block ${formData.material === mat.name ? 'text-[#C8B89F]' : 'text-[#6F6B63]'}`}>
                                {mat.description}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                        STAGE 04
                      </span>
                      <h2 className="text-2xl font-sans font-semibold text-[#171716] mb-4">Project Parameters</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-2">Quantity</label>
                        <input 
                          type="number" 
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => updateField('quantity', e.target.value)}
                          className="w-full p-3.5 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-2">Color / Finish Preference</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Natural Ivory, Matte Black, Sandstone"
                          value={formData.colorPreference}
                          onChange={(e) => updateField('colorPreference', e.target.value)}
                          className="w-full p-3.5 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-2">Timeline Expectations</label>
                      <div className="flex flex-wrap gap-2.5">
                        {DEADLINES.map(d => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => updateField('deadline', d)}
                            className={`px-4 py-2.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all ${
                              formData.deadline === d 
                                ? 'border-[#171716] bg-[#171716] text-[#F4F1EA]' 
                                : 'border-[#E8E5DE] bg-white hover:border-[#D4D0C8] text-[#171716]'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-2">Project Description</label>
                      <textarea 
                        rows={4}
                        placeholder="Detail your requirements, intended purpose, dimensions, or any specific studio finishes requested."
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817] resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8B83] block mb-1">
                        STAGE 05
                      </span>
                      <h2 className="text-2xl font-sans font-semibold text-[#171716]">Contact Details & Submission</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-1.5">Your Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className="w-full p-3.5 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817]"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-1.5">Email Address</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full p-3.5 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-[#171716] mb-1.5">WhatsApp / Phone</label>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="w-full p-3.5 bg-[#FAFAF8] border border-[#E8E5DE] rounded-2xl text-sm focus:outline-none focus:border-[#181817]"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Summary box */}
                    <div className="bg-[#FAFAF8] p-5 rounded-2xl border border-[#E8E5DE] text-xs">
                      <h4 className="font-mono uppercase tracking-wider text-[#8E8B83] mb-3">Inquiry Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-[#55524B]">
                        <div><strong className="text-[#171716]">Type:</strong> {formData.projectType || 'Standard custom'}</div>
                        <div><strong className="text-[#171716]">Scale:</strong> {formData.size || 'Not specified'}</div>
                        <div><strong className="text-[#171716]">Material:</strong> {formData.material || 'To be recommended'}</div>
                        <div><strong className="text-[#171716]">Qty:</strong> {formData.quantity}</div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#E8E5DE]">
              {step > 1 ? (
                <button 
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 text-xs font-mono uppercase tracking-wider text-[#171716] border border-[#E8E5DE] rounded-full hover:bg-[#FAFAF8] transition-colors"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}
              
              {step < totalSteps ? (
                <button 
                  type="button"
                  onClick={handleNext}
                  disabled={step === 1 && !formData.projectType}
                  className="px-8 py-3.5 bg-[#181817] text-[#F4F1EA] rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  Next Step →
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className="px-8 py-3.5 bg-[#181817] text-[#F4F1EA] rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors disabled:opacity-40 shadow-xs flex items-center gap-2"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'REQUEST A QUOTE'}
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
