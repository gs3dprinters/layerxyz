import Link from 'next/link';
import { PROJECTS } from '@/data/projects';

export const metadata = {
  title: 'Selected Work | Layerxyz',
  description: 'Projects from our studio.',
};

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-4">
            SELECTED WORK
          </h1>
          <p className="text-lg text-[#777777]">
            Projects from our studio.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => {
            const projectTitle = project.title || (project as any).name;
            const projectColor = (project as any).color || 'linear-gradient(135deg, #E8E5DE, #D4D0C8)';
            return (
              <Link key={project.slug} href={`/work/${project.slug}`}>
                <div className="group block relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-[#E8E5DE]">
                  <div 
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: projectColor }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-white/80 text-sm font-medium mb-2 block">{project.category} • {project.year}</span>
                        <h2 className="text-2xl font-semibold text-white">{projectTitle}</h2>
                      </div>
                      <span className="w-10 h-10 rounded-full bg-white text-[#181818] flex items-center justify-center font-medium">
                        →
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center md:hidden bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                    <div>
                      <h2 className="font-semibold text-[#181818]">{projectTitle}</h2>
                      <span className="text-[#777777] text-xs">{project.category}</span>
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
