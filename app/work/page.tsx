import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/projects';

export const metadata = {
  title: 'Selected Work | Layerxyz — Studio Case Studies',
  description: 'Physical fabrication and custom sculpture projects created by Layerxyz.',
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#171716] pt-28 sm:pt-36 pb-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-14 sm:mb-18">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6F6B63] block mb-3 font-medium">
            STUDIO ARCHIVE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-semibold tracking-tight text-[#171716] mb-4">
            SELECTED WORK
          </h1>
          <p className="text-base sm:text-lg text-[#6F6B63] max-w-2xl font-normal">
            A curated cross-section of bespoke commissions, physical sculptures, and studio fabrications.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => {
            const projectTitle = project.title || (project as any).name;
            const projectColor = (project as any).color || 'linear-gradient(135deg, #FAFAF8, #ECEAE4)';
            return (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <div className="group block relative rounded-3xl overflow-hidden aspect-[16/11] bg-white border border-[#E8E5DE] shadow-xs hover:border-[#D4D0C8] hover:shadow-md transition-all">
                  <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: projectColor }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#F4F1EA]/80 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {project.category} • {project.year}
                      </span>
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-sans font-semibold text-[#F4F1EA] mb-1">
                          {projectTitle}
                        </h2>
                        <span className="text-xs text-[#F4F1EA]/70 line-clamp-1 max-w-md">
                          {project.description}
                        </span>
                      </div>
                      <span className="w-10 h-10 rounded-full bg-white text-[#171716] flex items-center justify-center font-medium transform group-hover:scale-110 transition-transform shadow-sm">
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
