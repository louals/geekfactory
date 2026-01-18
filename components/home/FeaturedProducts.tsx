'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function FeaturedProducts() {
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="group rounded-xl bg-white/5 border border-white/10 p-4 hover:border-bismuth-purple/50 transition-colors"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-black/40 mb-4">
              <Image
                src={`/category-crystals.png`}
                alt="Crystal Product"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-xs font-bold px-2 py-1 rounded text-white">
                NEW
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">
              Iridescent Hopper #{i}
            </h3>
            <p className="text-gray-400 text-sm mb-3">Raw Specimen</p>
            <div className="flex items-center justify-between">
              <span className="text-bismuth-cyan font-bold">$45.00</span>
              <Button
                size="sm"
                variant="ghost"
                className="hover:bg-bismuth-purple/20 hover:text-bismuth-purple rounded-full w-8 h-8 p-0"
              >
                +
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
