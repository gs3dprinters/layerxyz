import { notFound } from 'next/navigation';
import Link from 'next/link';
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
    title: `${project.name} | Layerxyz`,
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
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <nav className="text-sm text-[#777777] mb-8 flex gap-2">
          <Link href="/work" className="hover:text-[#181818] transition-colors">Selected Work</Link>
          <span>/</span>
          <span className="text-[#181818]">{project.name}</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#181818] mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-[#777777]">
            <span className="px-3 py-1 bg-white border border-[#E8E5DE] rounded-full">{project.category}</span>
            <span className="px-3 py-1 bg-white border border-[#E8E5DE] rounded-full">{project.year}</span>
          </div>
        </header>

        <div 
          className="w-full aspect-video md:aspect-[21/9] rounded-3xl mb-16 overflow-hidden border border-[#E8E5DE]"
          style={{ background: project.color || 'linear-gradient(135deg, #E8E5DE, #D4D0C8)' }}
        />

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg text-[#2A2A2A] mb-16">
            <h2 className="text-2xl font-semibold text-[#181818] mb-4">The Challenge</h2>
            <p className="mb-8">{project.challenge || 'To create a physical manifestation of a complex digital design while maintaining precise tolerances and structural integrity.'}</p>
            
            <h2 className="text-2xl font-semibold text-[#181818] mb-4">Execution</h2>
            <p className="mb-8">{project.execution || 'Utilizing advanced additive manufacturing techniques paired with meticulous hand-finishing to achieve a seamless, premium surface.'}</p>
            
            <h2 className="text-2xl font-semibold text-[#181818] mb-4">Result</h2>
            <p className="mb-8">{project.result || 'An object that sits comfortably in the real world, bridging the gap between digital ideation and physical reality.'}</p>
          </div>

          <div className="border-t border-[#E8E5DE] mb-16 pt-8">
            <Accordion title="Technical Specifications">
              <div className="py-4 space-y-3 font-mono text-sm text-[#777777]">
                <div className="flex justify-between border-b border-[#E8E5DE] pb-2">
                  <span>Material</span>
                  <span className="text-[#181818]">{project.material || 'Various'}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E5DE] pb-2">
                  <span>Dimensions</span>
                  <span className="text-[#181818]">{project.dimensions || 'Custom'}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span>Weight</span>
                  <span className="text-[#181818]">{project.weight || 'Custom'}</span>
                </div>
              </div>
            </Accordion>
          </div>

          <div className="bg-white p-12 rounded-3xl border border-[#E8E5DE] text-center">
            <h2 className="text-2xl font-semibold text-[#181818] mb-4">Start a similar project</h2>
            <p className="text-[#777777] mb-8">Have a vision in mind? Let's bring it to life.</p>
            <Link 
              href="/custom"
              className="inline-block bg-[#181818] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
