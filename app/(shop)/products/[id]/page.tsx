import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // Placeholder data structure (in a real app, fetch from DB)
  const product = {
    id,
    name: 'Bismuth Crystal Pendant',
    price: '$129.00',
    description:
      'A stunning geometric formation of pure Bismuth, grown in our lab to achieve vibrant iridescent colors. This piece features a unique hopper crystal structure, maximizing light refraction. Each oxidization layer provides a different color based on its thickness.',
    specs: [
      { label: 'Element', value: 'Bismuth (Bi)' },
      { label: 'Atomic Number', value: '83' },
      { label: 'Crystal System', value: 'Rhombohedral' },
      { label: 'Hardness', value: '2.25 Mohs' },
      { label: 'Melting Point', value: '271.4°C' },
      { label: 'Origin', value: 'Lab Grown (USA)' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="mb-8">
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-bismuth-cyan transition-colors"
        >
          ← Back to Collection
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image Section */}
        <div className="relative aspect-square w-full max-w-[600px] mx-auto bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md flex items-center justify-center p-10 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-bismuth-cyan/10 to-bismuth-purple/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* Background Glow */}
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-bismuth-cyan to-bismuth-purple animate-pulse blur-[100px] opacity-30" />

          <Image
            src="/hero-bismuth.png"
            alt="Product"
            width={500}
            height={500}
            className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-out"
            priority
          />
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-bismuth-cyan tracking-widest uppercase text-xs font-bold mb-2 border border-bismuth-cyan/30 inline-block px-3 py-1 rounded-full bg-bismuth-cyan/10">
              Atomic Collection
            </h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              {product.name}
            </h1>
            <p className="text-3xl text-bismuth-magenta font-mono font-medium">
              {product.price}
            </p>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
            {product.description}
          </p>

          {/* Specs */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-bismuth-purple rounded-full"></span>
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest">
                    {spec.label}
                  </span>
                  <span className="text-white font-medium text-lg">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              size="lg"
              className="flex-1 rounded-full bg-gradient-to-r from-bismuth-cyan to-bismuth-purple text-black font-bold text-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all border-none h-14 relative overflow-hidden group"
            >
              <span className="relative z-10">Add to Cart</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-14 w-14 rounded-full border-white/20 hover:bg-white/10 hover:text-bismuth-magenta hover:border-bismuth-magenta transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
