"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitQuote } from '@/lib/api';
import { getWhatsAppUrl } from '@/lib/utils';
import { UploadCloud, X, Check } from 'lucide-react';
import { MATERIALS } from '@/data/materials';

const PROJECT_TYPES = ['Sculpture', 'Figurine', 'Home Object', 'Prototype', 'Architectural Model', 'Custom Part', 'Other'];
const SIZES = ['Small (up to 10cm)', 'Medium (10-20cm)', 'Large (20-50cm)', 'Custom Dimensions'];
const DEADLINES = ['No rush', '2 weeks', '1 month', 'Urgent'];

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
      <div className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl max-w-lg w-full text-center border border-[#E8E5DE] shadow-sm">
          <div className="w-20 h-20 bg-[#B7FF00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-[#181818]" />
          </div>
          <h2 className="text-3xl font-semibold text-[#181818] mb-4">Quote request submitted!</h2>
          <p className="text-[#777777] mb-8">We've received your project details and will be in touch shortly with a quote.</p>
          <a 
            href={getWhatsAppUrl("Hi, I just submitted a custom project request.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#181818] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors"
          >
            Follow up on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#181818] mb-6 leading-[1.1]">
            MAKE SOMETHING<br />
            <span className="text-[#777777]">THAT DOESN'T EXIST YET.</span>
          </h1>
          <p className="text-xl text-[#2A2A2A]">
            Have a model, sketch or idea? We'll turn it into a physical object.
          </p>
        </header>

        <div className="mb-8">
          <div className="flex gap-2 mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1 flex-1 rounded-full transition-colors ${i + 1 <= step ? 'bg-[#181818]' : 'bg-[#E8E5DE]'}`}
              />
            ))}
          </div>
          <div className="text-sm font-medium text-[#777777]">Step {step} of {totalSteps}</div>
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E8E5DE] shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#181818]">What kind of object are you making?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {PROJECT_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => updateField('projectType', type)}
                        className={`p-4 text-left rounded-xl border transition-all ${
                          formData.projectType === type 
                            ? 'border-[#181818] bg-[#F5F3EE]' 
                            : 'border-[#E8E5DE] hover:border-[#D4D0C8]'
                        }`}
                      >
                        <span className="font-medium text-[#181818]">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-[#181818]">Upload your file</h2>
                  <p className="text-[#777777]">Supported formats: .stl, .obj, .3mf, .step, .zip, .jpg, .png</p>
                  
                  <div className="border-2 border-dashed border-[#E8E5DE] rounded-2xl p-12 text-center hover:border-[#181818] transition-colors relative bg-[#FAFAF8]">
                    <input 
                      type="file" 
                      onChange={handleFileChange} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {formData.file ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Check className="text-[#181818]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#181818]">{formData.file.name}</p>
                          <p className="text-sm text-[#777777]">{(formData.file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button 
                          onClick={(e) => { e.preventDefault(); updateField('file', null); }}
                          className="text-sm text-red-500 hover:underline z-10 relative"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <UploadCloud className="text-[#181818]" />
                        </div>
                        <p className="font-medium text-[#181818]">Drop your file here</p>
                        <span className="px-6 py-2 bg-white border border-[#E8E5DE] rounded-full text-sm font-medium text-[#181818]">
                          Choose a file
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center mt-4">
                    <button onClick={handleNext} className="text-[#777777] underline text-sm">
                      Skip this step if you don't have a file yet
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#181818] mb-4">Size & Scale</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SIZES.map(size => (
                        <button
                          key={size}
                          onClick={() => updateField('size', size)}
                          className={`p-4 text-left rounded-xl border transition-all ${
                            formData.size === size 
                              ? 'border-[#181818] bg-[#F5F3EE]' 
                              : 'border-[#E8E5DE] hover:border-[#D4D0C8]'
                          }`}
                        >
                          <span className="font-medium text-[#181818]">{size}</span>
                        </button>
                      ))}
                    </div>
                    {formData.size === 'Custom Dimensions' && (
                      <input 
                        type="text" 
                        placeholder="e.g., 45cm x 30cm x 20cm" 
                        value={formData.customDimensions}
                        onChange={(e) => updateField('customDimensions', e.target.value)}
                        className="w-full mt-3 p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818]"
                      />
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-[#181818] mb-4">Material Preference</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {MATERIALS?.map((mat: any) => (
                        <button
                          key={mat.id}
                          onClick={() => updateField('material', mat.name)}
                          className={`p-4 text-left rounded-xl border transition-all flex flex-col gap-2 ${
                            formData.material === mat.name 
                              ? 'border-[#181818] bg-[#F5F3EE]' 
                              : 'border-[#E8E5DE] hover:border-[#D4D0C8]'
                          }`}
                        >
                          <span className="font-medium text-[#181818]">{mat.name}</span>
                          <span className="text-xs text-[#777777]">{mat.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#181818] mb-4">Project Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-[#181818] mb-2">Quantity</label>
                        <input 
                          type="number" 
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => updateField('quantity', e.target.value)}
                          className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#181818] mb-2">Color Preference</label>
                        <input 
                          type="text" 
                          placeholder="e.g., Matte Black"
                          value={formData.colorPreference}
                          onChange={(e) => updateField('colorPreference', e.target.value)}
                          className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818]"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-[#181818] mb-2">Deadline</label>
                      <div className="flex flex-wrap gap-3">
                        {DEADLINES.map(d => (
                          <button
                            key={d}
                            onClick={() => updateField('deadline', d)}
                            className={`px-5 py-3 rounded-full border text-sm transition-all ${
                              formData.deadline === d 
                                ? 'border-[#181818] bg-[#181818] text-white' 
                                : 'border-[#E8E5DE] hover:border-[#D4D0C8] text-[#181818]'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#181818] mb-2">Describe your project</label>
                      <textarea 
                        rows={4}
                        placeholder="Tell us what you're looking to make, any specific requirements, or special details."
                        value={formData.description}
                        onChange={(e) => updateField('description', e.target.value)}
                        className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818] resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold text-[#181818]">Contact Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#181818] mb-2">Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#181818] mb-2">Email</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#181818] mb-2">Phone / WhatsApp</label>
                        <input 
                          type="tel" 
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          className="w-full p-4 bg-[#FAFAF8] border border-[#E8E5DE] rounded-xl focus:outline-none focus:border-[#181818]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#FAFAF8] p-6 rounded-2xl border border-[#E8E5DE]">
                    <h3 className="font-medium text-[#181818] mb-4">Summary</h3>
                    <ul className="space-y-2 text-sm text-[#777777]">
                      <li><span className="text-[#181818]">Type:</span> {formData.projectType || 'Not specified'}</li>
                      <li><span className="text-[#181818]">Material:</span> {formData.material || 'Not specified'}</li>
                      <li><span className="text-[#181818]">Quantity:</span> {formData.quantity}</li>
                      <li><span className="text-[#181818]">Deadline:</span> {formData.deadline || 'Not specified'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#E8E5DE]">
            {step > 1 ? (
              <button 
                onClick={handlePrev}
                className="px-6 py-3 font-medium text-[#181818] border border-[#E8E5DE] rounded-full hover:bg-[#FAFAF8] transition-colors"
              >
                Back
              </button>
            ) : (
              <div /> // placeholder for spacing
            )}
            
            {step < totalSteps ? (
              <button 
                onClick={handleNext}
                disabled={step === 1 && !formData.projectType}
                className="px-8 py-3 bg-[#181818] text-white rounded-full font-medium hover:bg-[#2A2A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email}
                className="px-8 py-3 bg-[#181818] text-white rounded-full font-medium hover:bg-[#2A2A2A] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'REQUEST A QUOTE'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
