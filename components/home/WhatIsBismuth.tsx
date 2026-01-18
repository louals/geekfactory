'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WhatIsBismuth() {
  return (
    <section className="relative min-h-[90vh] w-full bg-black overflow-hidden flex items-center">
      <div className="relative mx-auto max-w-7xl px-6 w-full z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-xl space-y-8"
        >
          {/* Label */}
          <span className="inline-block text-cyan-400 tracking-[0.3em] uppercase font-serif text-xs font-semibold">
            Element 83
          </span>

          {/* Title */}
          <h2 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-purple-500 uppercase font-serif">
            What is
            <br />
            <span className="text-pink-500">Bismuth?</span>
          </h2>

          {/* Description */}
          <div className="space-y-6 text-gray-400 text-lg font-serif leading-relaxed">
            <p>
              A post-transition metal that defies expectations. When melted and
              cooled, bismuth crystallizes into precise, almost architectural
              forms.
            </p>
            <p>
              The colors aren’t pigments — they’re physics. Light bends across
              oxide layers, creating natural iridescence.
            </p>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ x: 8 }}
            className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors pt-4"
          >
            <span className="text-sm font-bold tracking-widest uppercase font-serif">
              Explore the process
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      {/* THE STICKY IMAGE */}
      <div
        className="absolute bottom-0 right-0 w-[70%] h-[80%] z-10 pointer-events-none select-none"
        style={{
          maskImage:
            'linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to top, black 70%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to left, black 60%, transparent 100%), linear-gradient(to top, black 70%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1, x: 50, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="/whatisbismuth.png"
            alt="Bismuth Crystal"
            fill
            priority
            className="object-contain object-right-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
}
