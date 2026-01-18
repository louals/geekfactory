'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      title: 'Crystals',
      image: '/category-crystals.png',
      href: '/products?category=crystals',
    },
    {
      title: 'Jewelry',
      image: '/category-jewelry.png',
      href: '/products?category=jewelry',
    },
    {
      title: 'Sculpture',
      image: '/category-sculpture.png',
      href: '/products?category=sculpture',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            href={cat.href}
            className="group relative h-[400px] overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-2xl font-bold text-white mb-2">
                {cat.title}
              </h3>
              <div className="flex items-center gap-2 text-bismuth-cyan text-sm uppercase tracking-wider font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Shop Now <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </section>
  );
}
