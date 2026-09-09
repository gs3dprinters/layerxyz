import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Layers, Cpu, Compass, Maximize2 } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";
import { Button } from "@/ui/Button";
import { SectionBadge } from "@/ui/Badge";
import { FinalCTASection } from "@/sections/FinalCTASection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Layerxyz Studio Archive`,
    description: project.headline,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-28">
      {/* Top Breadcrumb */}
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pb-8 border-b border-border">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Selected Works</span>
        </Link>
      </div>

      {/* Project Hero Header */}
      <section className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
          <span className="text-accent bg-surface-raised px-2.5 py-1 rounded-[2px] border border-border">
            {project.categoryLabel}
          </span>
          <span className="text-foreground-muted">YEAR // {project.year}</span>
          <span className="text-foreground-muted">•</span>
          <span className="text-foreground-muted">SCALE // {project.specs.scale}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-foreground uppercase leading-[0.98] max-w-4xl">
          {project.title}
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-foreground-secondary font-light max-w-3xl leading-relaxed">
          {project.headline}
        </p>
      </section>

      {/* Hero Visual Presentation Banner */}
      <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 mb-20">
        <div
          className="relative w-full aspect-[16/9] max-h-[640px] bg-surface-card border border-border rounded-[2px] overflow-hidden flex items-center justify-center p-8 sm:p-16"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(212, 255, 63, 0.07) 0%, transparent 60%), linear-gradient(135deg, #16181b 0%, #090a0c 100%)",
          }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Central Stylized 3D Wireframe Presentation Mockup */}
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="w-full h-full rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full border border-dashed border-accent/30 flex items-center justify-center">
                <div className="w-1/2 h-1/2 rounded-full border border-white/20 flex flex-col items-center justify-center text-center p-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                    {project.specs.scale}
                  </span>
                  <span className="font-mono text-[10px] text-foreground-muted mt-1">
                    {project.specs.dimensions}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Technical Stamps */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-foreground-muted uppercase tracking-wider">
            <div>OBJECT DIMENSIONS: {project.specs.dimensions}</div>
            <div>VERIFIED SURFACE // TOLERANCE ±0.15MM</div>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      <section className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 py-16 border-y border-border">
        <SectionBadge number="01" label="TECHNICAL SPECIFICATIONS" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 font-mono text-xs">
          <div className="p-6 bg-surface border border-border rounded-[2px]">
            <span className="text-foreground-muted uppercase block mb-1">
              Envelope Scale
            </span>
            <span className="text-foreground text-sm font-semibold block">
              {project.specs.scale}
            </span>
            <span className="text-foreground-secondary text-[11px] mt-1 block">
              {project.specs.dimensions}
            </span>
          </div>

          <div className="p-6 bg-surface border border-border rounded-[2px]">
            <span className="text-foreground-muted uppercase block mb-1">
              Material System
            </span>
            <span className="text-foreground text-sm font-semibold block">
              {project.specs.material}
            </span>
            <span className="text-foreground-secondary text-[11px] mt-1 block">
              {project.specs.weight ? `Mass: ${project.specs.weight}` : "Precision Infill"}
            </span>
          </div>

          <div className="p-6 bg-surface border border-border rounded-[2px]">
            <span className="text-foreground-muted uppercase block mb-1">
              Production Methodology
            </span>
            <span className="text-foreground text-sm font-semibold block">
              {project.specs.production}
            </span>
          </div>

          <div className="p-6 bg-surface border border-border rounded-[2px]">
            <span className="text-foreground-muted uppercase block mb-1">
              Surface & Assembly
            </span>
            <span className="text-foreground text-sm font-semibold block">
              {project.specs.finishing}
            </span>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <SectionBadge number="02" label="EXECUTION STORY" />
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-foreground uppercase">
              HOW WE MADE IT PHYSICAL.
            </h2>
            <p className="mt-4 text-foreground-secondary text-sm leading-relaxed">
              Every custom object demands individual engineering—from toolpath
              orientation to internal load-distribution ribs.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-10 pl-0 lg:pl-10 lg:border-l border-border">
            {/* The Challenge */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                01 // THE CHALLENGE
              </h3>
              <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed">
                {project.narrative.challenge}
              </p>
            </div>

            {/* Execution */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                02 // FABRICATION PIPELINE
              </h3>
              <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed">
                {project.narrative.execution}
              </p>
            </div>

            {/* Result */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                03 // PHYSICAL VERIFICATION & FINISH
              </h3>
              <p className="text-foreground-secondary text-base sm:text-lg leading-relaxed">
                {project.narrative.result}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project CTA Bar */}
      <section className="border-t border-border bg-surface py-16">
        <div className="max-w-site mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-1">
              HAVE A SIMILAR BUILD IN MIND?
            </div>
            <div className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground uppercase">
              Start Your Project Inquiries.
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button href="/start-a-project" size="lg" icon>
              Start a Project
            </Button>
            <Button href="/work" variant="outline" size="lg">
              Next Project
            </Button>
          </div>
        </div>
      </section>

      <FinalCTASection />
    </div>
  );
}
