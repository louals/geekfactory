import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image?: string;
  delay?: number;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  delay = 0,
}: ProductCardProps) {
  return (
    <Card
      className="border-white/10 bg-white/5 backdrop-blur-md overflow-hidden group hover:border-bismuth-cyan/50 transition-all duration-300 h-full flex flex-col justify-between animate-in fade-in zoom-in duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-64 relative bg-black/20 flex items-center justify-center overflow-hidden">
        {/* Abstract Bismuth Placeholder */}
        <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-bismuth-purple/30 to-bismuth-cyan/30 blur-3xl group-hover:scale-150 transition-transform duration-700" />

        {image ? (
          <div className="relative w-full h-full p-8">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="w-24 h-24 border-2 border-bismuth-magenta/30 rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_30px_rgba(217,70,239,0.3)]" />
        )}
      </div>
      <CardContent className="p-6 relative z-10">
        <h3 className="text-xl font-serif font-bold text-white mb-2">{name}</h3>
        <p className="text-bismuth-cyan text-lg font-mono">{price}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0 relative z-10">
        <Button
          asChild
          className="w-full rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:text-bismuth-cyan hover:border-bismuth-cyan/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300"
        >
          <Link href={`/products/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
