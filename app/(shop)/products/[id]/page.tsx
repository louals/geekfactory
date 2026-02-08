'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { productService } from '@/lib/services/products';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types/api';
import { Loader2, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, isLoading: isAdding } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Product not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 text-white animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button asChild variant="outline">
          <Link href="/products">Back to Collection</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addItem(product, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
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

          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="relative z-10 object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-out"
              priority
            />
          ) : (
            <div className="relative z-10 w-48 h-48 border-4 border-bismuth-magenta/30 rotate-45 group-hover:rotate-90 transition-transform duration-700 shadow-[0_0_50px_rgba(217,70,239,0.3)]" />
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-bismuth-cyan tracking-widest uppercase text-xs font-bold mb-2 border border-bismuth-cyan/30 inline-block px-3 py-1 rounded-full bg-bismuth-cyan/10">
              {typeof product.category === 'string' ? 'Collection' : product.category.name}
            </h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              {product.name}
            </h1>
            <p className="text-3xl text-bismuth-magenta font-mono font-medium">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
            {product.description || 'No description available.'}
          </p>

          {/* Specs */}
          <div className="bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-bismuth-purple rounded-full"></span>
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  Stock Availability
                </span>
                <span className="text-white font-medium text-lg">
                  {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  Element
                </span>
                <span className="text-white font-medium text-lg">
                  Bismuth (Bi)
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isAdding || product.stock <= 0}
              className="flex-1 rounded-full bg-gradient-to-r from-bismuth-cyan to-bismuth-purple text-black font-bold text-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all border-none h-14 relative overflow-hidden group"
            >
              {isAdding ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="relative z-10">
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </span>
              )}
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-14 w-14 rounded-full border-white/20 hover:bg-white/10 hover:text-bismuth-magenta hover:border-bismuth-magenta transition-colors"
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

