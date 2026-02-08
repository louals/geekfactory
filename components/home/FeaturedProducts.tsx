'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { productService } from '@/lib/services/products';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types/api';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, isLoading: isAdding } = useCartStore();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      await addItem(product, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bold font-serif">Featured Crystals</h2>
        <Link
          href="/products"
          className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          View All
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:border-bismuth-purple/50 transition-colors"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden bg-black/40 mb-4">
                {product.images?.[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-bismuth-cyan/10 to-bismuth-purple/10 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Image</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-white">
                  NEW
                </div>
              </div>
              <Link href={`/products/${product._id}`}>
                <h3 className="text-lg font-medium text-white mb-1 hover:text-bismuth-cyan transition-colors truncate">
                  {product.name}
                </h3>
              </Link>
              <p className="text-gray-400 text-sm mb-3">
                {typeof product.category === 'string' ? '' : product.category.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-bismuth-cyan font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAddToCart(product)}
                  disabled={isAdding || product.stock <= 0}
                  className="hover:bg-bismuth-purple/20 hover:text-bismuth-purple rounded-full w-8 h-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

