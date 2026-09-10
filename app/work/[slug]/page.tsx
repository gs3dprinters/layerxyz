import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROJECTS, getProject } from '@/data/projects';
import Accordion from '@/ui/Accordion';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);
  if (!project) return { title: 'Project Not Found | Layerxyz' };
  
  return {
    title: `${project.name} | Layerxyz Case Study`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs font-mono tracking-wider uppercase text-[#6F6B63] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#171716] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/work" className="hover:text-[#171716] transition-colors">Selected Work</Link>
          <span>/</span>
          <span className="text-[#171716] font-medium">{project.name}</span>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 bg-white border border-[#E8E5DE] rounded-full text-[#6F6B63]">
              {project.category}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 bg-white border border-[#E8E5DE] rounded-full text-[#6F6B63]">
              {project.year}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716]">
            {project.name}
          </h1>
        </header>

        <div 
          className="w-full aspect-video md:aspect-[21/9] rounded-3xl mb-16 overflow-hidden border border-[#E8E5DE] shadow-xs"
          style={{ background: project.color || 'linear-gradient(135deg, #FAFAF8, #ECEAE4)' }}
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 mb-16 text-base sm:text-lg text-[#55524B] leading-relaxed">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8E8B83] block mb-2 font-medium">
                OBJECTIVE
              </span>
              <h2 className="text-2xl font-sans font-semibold text-[#171716] mb-3">The Brief</h2>
              <p>{project.challenge || 'To bring a distinctive digital design into a durable physical form with balanced proportions and clean surfaces.'}</p>
            </div>
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8E8B83] block mb-2 font-medium">
                PROCESS
              </span>
              <h2 className="text-2xl font-sans font-semibold text-[#171716] mb-3">Fabrication & Refinement</h2>
              <p>{project.execution || 'Carefully produced via studio additive fabrication and finished by hand to achieve an intentional, tactile surface.'}</p>
            </div>
            
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8E8B83] block mb-2 font-medium">
                OUTCOME
              </span>
              <h2 className="text-2xl font-sans font-semibold text-[#171716] mb-3">Physical Presence</h2>
              <p>{project.result || 'An object that sits comfortably in physical space, bridging computational form with tangible studio craftsmanship.'}</p>
            </div>
          </div>

          <div className="border-t border-[#E8E5DE] mb-16 pt-8">
            <Accordion title="Studio Specifications">
              <div className="py-4 space-y-3 font-mono text-xs text-[#6F6B63]">
                <div className="flex justify-between border-b border-[#E8E5DE] pb-2">
                  <span>Material</span>
                  <span className="text-[#171716] font-medium">{project.material || 'Studio Material'}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DE] pb-2">
                  <span>Dimensions</span>
                  <span className="text-[#171716] font-medium">{project.dimensions || 'Bespoke Sizing'}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Finishing</span>
                  <span className="text-[#171716] font-medium">{project.weight || 'Studio Hand-Finished'}</span>
                </div>
              </div>
            </Accordion>
          </div>

          <div className="bg-[#FAFAF8] p-10 sm:p-14 rounded-3xl border border-[#E8E5DE] text-center">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#8E8B83] block mb-2">
              BESPOKE INQUIRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#171716] mb-3">Start a similar project</h2>
            <p className="text-sm text-[#6F6B63] mb-8 max-w-md mx-auto">Have a concept or model in mind? Work directly with our studio team.</p>
            <Link 
              href="/custom"
              className="inline-flex items-center justify-center gap-2 bg-[#181817] text-[#F4F1EA] px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-[#2A2A28] transition-colors shadow-xs"
            >
              Request a Custom Quote
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
