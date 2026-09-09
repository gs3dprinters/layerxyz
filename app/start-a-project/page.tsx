"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  FileArchive,
  FileImage,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { submitProjectInquiry, ProjectInquiryData } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/ui/Button";
import { SectionBadge } from "@/ui/Badge";
import { cn } from "@/lib/utils";

const OBJECT_TYPES = [
  { id: "Statue", label: "Statue", desc: "Display sculpture, artistic forms, large-format pieces" },
  { id: "Prototype", label: "Prototype", desc: "Design validation, functional test shells, mechanical fits" },
  { id: "Figurine", label: "Figurine", desc: "High-detail miniatures, characters, tabletop collector models" },
  { id: "Product", label: "Product Enclosure", desc: "Consumer electronics casing, audio gear, custom bezels" },
  { id: "Part", label: "Custom Part", desc: "Replacement brackets, gears, jigs, fixtures, adapters" },
  { id: "Other", label: "Other / Bespoke", desc: "Architectural study, stage prop, hybrid fabrication" },
];

const FILE_OPTIONS = [
  { id: "yes", label: "YES, I HAVE A 3D FILE", desc: "STL, OBJ, 3MF, STEP, STP, IGES ready" },
  { id: "no", label: "NO, ONLY 2D IMAGES / SKETCHES", desc: "Need 3D modeling assistance from our studio" },
  { id: "not-sure", label: "NOT SURE / NEED GUIDANCE", desc: "Have concept dimensions, looking for feasibility" },
];

const ALLOWED_EXTENSIONS = [
  ".stl", ".obj", ".3mf", ".step", ".stp", ".iges", ".igs", ".zip",
  ".jpg", ".jpeg", ".png", ".webp", ".pdf",
];

export default function StartAProjectPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Form State
  const [formData, setFormData] = useState<ProjectInquiryData>({
    objectType: "Statue",
    hasFile: "yes",
    files: [],
    name: "",
    email: "",
    phone: "",
    description: "",
    approximateSize: "",
    quantity: "1 piece",
    deadline: "",
    preferredMaterial: "PLA Pro+",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    id?: string;
    message?: string;
  } | null>(null);

  // File Upload Handling
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileError(null);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
    }
  };

  const processFiles = (files: File[]) => {
    const valid: File[] = [];
    for (const f of files) {
      const ext = "." + f.name.split(".").pop()?.toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        if (f.size > 100 * 1024 * 1024) {
          setFileError(`File ${f.name} exceeds 100MB max limit.`);
          return;
        }
        valid.push(f);
      } else {
        setFileError(`Format "${ext}" not supported. Use STL, OBJ, STEP, 3MF, ZIP, or Images.`);
        return;
      }
    }
    setUploadedFiles((prev) => [...prev, ...valid]);
    setFormData((prev) => ({
      ...prev,
      files: [...(prev.files || []), ...valid.map((f) => ({ name: f.name, size: f.size, type: f.type }))],
    }));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      files: (prev.files || []).filter((_, i) => i !== index),
    }));
  };

  // Validation
  const validateStep4 = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Your name or studio name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.description.trim()) {
      errors.description = "Brief project description is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (currentStep === 1) {
      trackEvent("quote_started", { objectType: formData.objectType });
    }
    if (currentStep === 4) {
      if (!validateStep4()) return;
    }
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await submitProjectInquiry(formData);
      setSubmissionResult({ id: res.inquiryId, message: res.message });
      setIsSubmitted(true);
      trackEvent("quote_submitted", {
        inquiryId: res.inquiryId,
        objectType: formData.objectType,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    `Hi Layerxyz, I am planning a project for a ${formData.objectType}. Can you give me advice on fabrication?`
  )}`;

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-border pb-6 mb-10">
          <Link
            href="/"
            className="font-mono text-xs text-foreground-muted hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Studio</span>
          </Link>

          {!isSubmitted && (
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-foreground-muted">PROGRESS:</span>
              <span className="text-accent font-semibold">
                0{currentStep} / 0{totalSteps}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="w-full h-[2px] bg-surface-raised mb-12 relative overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "20%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            />
          </div>
        )}

        {/* Main Step Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className="bg-surface border border-border p-8 sm:p-14 rounded-[2px] text-center"
              >
                <div className="w-16 h-16 rounded-full border border-accent/40 bg-accent/10 text-accent mx-auto flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">
                  INQUIRY CONFIRMED // {submissionResult?.id}
                </div>

                <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-foreground uppercase">
                  PROJECT RECEIVED.
                </h1>

                <p className="mt-6 text-foreground-secondary text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
                  Thanks. We've got the details. Our engineering team in
                  Tiruppur will inspect your specifications, verify printability,
                  and contact you with an itemized project estimate.
                </p>

                <div className="mt-8 p-4 bg-surface-raised border border-border max-w-md mx-auto font-mono text-xs text-foreground-muted">
                  EXPECTED REVIEW TURNAROUND: <span className="text-foreground">Within 24 Hours</span>
                </div>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button href="/" size="lg" icon>
                    Back to Home
                  </Button>
                  <Button
                    href={whatsappUrl}
                    variant="outline"
                    size="lg"
                    external
                    className="border-emerald-500/40 text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Follow-up on WhatsApp</span>
                    </span>
                  </Button>
                </div>
              </motion.div>
            ) : (
              /* Step 1: Object Type */
              currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-8"
                >
                  <div>
                    <SectionBadge number="01" label="OBJECT CLASSIFICATION" />
                    <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase">
                      WHAT ARE YOU MAKING?
                    </h1>
                    <p className="text-foreground-secondary text-sm sm:text-base mt-2">
                      Select the closest category to help us tailor our print parameters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {OBJECT_TYPES.map((type) => {
                      const isSelected = formData.objectType === type.id;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, objectType: type.id })}
                          className={cn(
                            "p-6 text-left border rounded-[2px] transition-all duration-200 cursor-pointer flex flex-col justify-between select-none",
                            isSelected
                              ? "bg-surface-raised border-accent shadow-xl shadow-accent/5"
                              : "bg-surface border-border hover:border-foreground/30 hover:bg-surface-raised/50"
                          )}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xl font-medium tracking-tight text-foreground uppercase">
                              {type.label}
                            </span>
                            <span
                              className={cn(
                                "w-4 h-4 rounded-full border flex items-center justify-center",
                                isSelected ? "border-accent bg-accent" : "border-border"
                              )}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-background" />}
                            </span>
                          </div>
                          <p className="text-xs text-foreground-muted leading-relaxed font-mono">
                            {type.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )
            )}

            {/* Step 2: 3D File Status */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div>
                  <SectionBadge number="02" label="ASSET READINESS" />
                  <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase">
                    DO YOU HAVE A 3D FILE?
                  </h1>
                  <p className="text-foreground-secondary text-sm sm:text-base mt-2">
                    We can fabricate directly from your mesh/CAD or assist in converting 2D designs.
                  </p>
                </div>

                <div className="space-y-4">
                  {FILE_OPTIONS.map((opt) => {
                    const isSelected = formData.hasFile === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, hasFile: opt.id as "yes" | "no" | "not-sure" })
                        }
                        className={cn(
                          "w-full p-6 text-left border rounded-[2px] transition-all duration-200 cursor-pointer flex items-center justify-between select-none",
                          isSelected
                            ? "bg-surface-raised border-accent shadow-xl shadow-accent/5"
                            : "bg-surface border-border hover:border-foreground/30 hover:bg-surface-raised/50"
                        )}
                      >
                        <div>
                          <div className="text-base sm:text-lg font-medium text-foreground uppercase tracking-tight">
                            {opt.label}
                          </div>
                          <div className="text-xs text-foreground-muted font-mono mt-1">
                            {opt.desc}
                          </div>
                        </div>

                        <span
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ml-4",
                            isSelected ? "border-accent bg-accent" : "border-border"
                          )}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-background" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 3: File Upload */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div>
                  <SectionBadge number="03" label="FILE SUBMISSION" />
                  <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase">
                    UPLOAD FILES
                  </h1>
                  <p className="text-foreground-secondary text-sm sm:text-base mt-2">
                    Upload your 3D CAD files (.stl, .obj, .3mf, .step, .zip) or concept images. Max 100MB.
                  </p>
                </div>

                {/* Dropzone */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-border hover:border-accent bg-surface/60 rounded-[2px] p-8 sm:p-14 text-center transition-colors relative group"
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    accept=".stl,.obj,.3mf,.step,.stp,.iges,.igs,.zip,.jpg,.jpeg,.png,.webp,.pdf"
                  />
                  <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground-muted group-hover:text-accent group-hover:border-accent mx-auto mb-4 transition-colors">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="font-mono text-sm text-foreground uppercase tracking-wider mb-1">
                    Drag and drop files here or <span className="text-accent underline">browse</span>
                  </div>
                  <div className="font-mono text-xs text-foreground-muted">
                    Supports STL, OBJ, 3MF, STEP, STP, IGES, ZIP, JPG, PNG, PDF (Up to 100MB)
                  </div>
                </div>

                {/* Error Message */}
                {fileError && (
                  <div className="flex items-center gap-2 text-xs font-mono text-red-400 bg-red-950/20 border border-red-900/50 p-3 rounded-[2px]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Uploaded File List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-mono text-xs uppercase text-foreground-muted">
                      Uploaded Assets ({uploadedFiles.length})
                    </div>
                    <div className="divide-y divide-border border border-border rounded-[2px] bg-surface">
                      {uploadedFiles.map((file, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 flex items-center justify-between text-xs font-mono"
                        >
                          <div className="flex items-center gap-3 truncate pr-4">
                            <FileCode className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-foreground truncate">{file.name}</span>
                            <span className="text-foreground-muted flex-shrink-0">
                              ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(idx)}
                            className="text-red-400 hover:text-red-300 uppercase cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skip if no file */}
                {formData.hasFile !== "yes" && uploadedFiles.length === 0 && (
                  <div className="font-mono text-xs text-foreground-muted bg-surface p-4 border border-border rounded-[2px]">
                    Note: Since you indicated you do not have a 3D file, you can upload sketches or skip this step to describe your project in Step 4.
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Project & Contact Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div>
                  <SectionBadge number="04" label="PROJECT SPECIFICATIONS" />
                  <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase">
                    PROJECT DETAILS
                  </h1>
                  <p className="text-foreground-secondary text-sm sm:text-base mt-2">
                    Tell us about your timeline, size expectations, and how to reach you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      Name or Studio *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full h-12 px-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors"
                    />
                    {formErrors.name && (
                      <span className="text-red-400 text-[11px]">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@domain.com"
                      className="w-full h-12 px-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors"
                    />
                    {formErrors.email && (
                      <span className="text-red-400 text-[11px]">{formErrors.email}</span>
                    )}
                  </div>

                  {/* WhatsApp / Phone */}
                  <div className="space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      WhatsApp / Phone (Optional for quick coordination)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full h-12 px-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors"
                    />
                  </div>

                  {/* Approximate Size */}
                  <div className="space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      Approximate Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.approximateSize}
                      onChange={(e) => setFormData({ ...formData, approximateSize: e.target.value })}
                      placeholder="e.g. 300 × 150 × 120 mm"
                      className="w-full h-12 px-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full h-12 px-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors"
                    >
                      <option value="1 piece">1 Piece (One-Off Build)</option>
                      <option value="2-5 pieces">2 – 5 Pieces (Iteration / Batch)</option>
                      <option value="5-20 pieces">5 – 20 Pieces (Small Run)</option>
                      <option value="20+ pieces">20+ Pieces (Bespoke Run)</option>
                    </select>
                  </div>

                  {/* Deadline */}
                  <div className="space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      Desired Delivery Date / Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="e.g. Next 10 days / No rush"
                      className="w-full h-12 px-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-foreground-muted uppercase tracking-wider block">
                      Project Description & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe what you want to achieve, mechanical tolerances needed, or specific finishing requirements..."
                      className="w-full p-4 bg-surface border border-border focus:border-accent text-foreground text-sm rounded-[2px] outline-none transition-colors resize-none"
                    />
                    {formErrors.description && (
                      <span className="text-red-400 text-[11px]">{formErrors.description}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                <div>
                  <SectionBadge number="05" label="CONFIRMATION & DISPATCH" />
                  <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-foreground uppercase">
                    REVIEW INQUIRY
                  </h1>
                  <p className="text-foreground-secondary text-sm sm:text-base mt-2">
                    Verify your project parameters before dispatching to our engineering queue.
                  </p>
                </div>

                <div className="bg-surface border border-border p-6 sm:p-8 rounded-[2px] space-y-6 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-4 pb-6 border-b border-border">
                    <div>
                      <span className="text-foreground-muted block uppercase">Classification</span>
                      <span className="text-foreground font-semibold mt-1 block">
                        {formData.objectType}
                      </span>
                    </div>
                    <div>
                      <span className="text-foreground-muted block uppercase">CAD / 3D File</span>
                      <span className="text-foreground font-semibold mt-1 block">
                        {formData.hasFile === "yes"
                          ? `${uploadedFiles.length} file(s) attached`
                          : formData.hasFile}
                      </span>
                    </div>
                    <div>
                      <span className="text-foreground-muted block uppercase">Client / Studio</span>
                      <span className="text-foreground font-semibold mt-1 block">{formData.name}</span>
                    </div>
                    <div>
                      <span className="text-foreground-muted block uppercase">Contact Email</span>
                      <span className="text-foreground font-semibold mt-1 block">{formData.email}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-foreground-muted block uppercase mb-1">
                      Project Intent
                    </span>
                    <p className="text-foreground-secondary leading-relaxed bg-surface-raised p-4 rounded-[2px]">
                      {formData.description}
                    </p>
                  </div>

                  <div className="p-4 border border-border/80 bg-surface-card rounded-[2px] flex items-center gap-3 text-foreground-muted">
                    <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>
                      Quotes start from ₹5/g based on geometry, internal density, and finishing. No instant automated charges.
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          {!isSubmitted && (
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleBack}
                  className="text-foreground-secondary hover:text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </span>
                </Button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <Button size="md" icon onClick={handleNext}>
                  Continue to Step 0{currentStep + 1}
                </Button>
              ) : (
                <Button
                  size="lg"
                  icon
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-10 font-semibold"
                >
                  {isSubmitting ? "Dispatching..." : "Submit Project Inquiry"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
