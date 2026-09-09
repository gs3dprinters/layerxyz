import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#181818] mb-4">
        PAGE NOT FOUND
      </h1>
      <p className="text-lg text-[#777777] mb-12">
        The page you're looking for doesn't exist.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/shop"
          className="bg-[#181818] text-white px-8 py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors"
        >
          Continue Shopping
        </Link>
        <Link 
          href="/"
          className="bg-white text-[#181818] border border-[#E8E5DE] px-8 py-4 rounded-full font-medium hover:border-[#D4D0C8] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
