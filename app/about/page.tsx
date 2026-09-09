import Link from 'next/link';

export const metadata = {
  title: 'About | Layerxyz',
  description: 'We are a premium 3D printing studio based in Tiruppur, Tamil Nadu.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#181818] mb-8">
            ABOUT LAYERXYZ
          </h1>
          <div className="text-xl md:text-2xl text-[#2A2A2A] leading-relaxed max-w-3xl">
            We are a premium 3D printing studio based in Tiruppur, Tamil Nadu. We transform digital designs into physical objects — from small desk sculptures to large-scale architectural installations.
          </div>
        </header>

        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE] shadow-sm">
              <h3 className="text-xl font-semibold text-[#181818] mb-4">Precision</h3>
              <p className="text-[#777777] leading-relaxed">
                We believe in the exactness of the digital meeting the warmth of the physical. Every layer is calculated, every finish is intentional.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE] shadow-sm">
              <h3 className="text-xl font-semibold text-[#181818] mb-4">Craft</h3>
              <p className="text-[#777777] leading-relaxed">
                Technology is our tool, but craft is our practice. We finish every object by hand, ensuring a premium feel that machines alone cannot achieve.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[#E8E5DE] shadow-sm">
              <h3 className="text-xl font-semibold text-[#181818] mb-4">Innovation</h3>
              <p className="text-[#777777] leading-relaxed">
                We constantly push the boundaries of what can be made, exploring new materials and techniques to bring impossible shapes into reality.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-24 bg-[#FAFAF8] p-12 rounded-3xl border border-[#E8E5DE] text-center">
          <h2 className="text-2xl font-semibold text-[#181818] mb-4">Our Studio</h2>
          <p className="text-[#777777] mb-2">Tiruppur, Tamil Nadu, India</p>
          <p className="text-[#777777]">Visits by appointment only.</p>
        </section>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-[#181818] mb-6">Have an idea?</h2>
          <Link 
            href="/custom"
            className="inline-block bg-[#181818] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors"
          >
            Start a project
          </Link>
        </div>
      </div>
    </div>
  );
}
