'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function MysteryBox() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        {/* IMAGE — LEFT */}
        <div className="relative w-full max-w-md mx-auto">
          {/* subtle brand glow */}
          <div className="absolute -inset-12 bg-gradient-to-tr from-bismuth-cyan/20 via-bismuth-purple/20 to-bismuth-magenta/20 blur-3xl" />

          <div className="relative aspect-square bg-black border border-white/10 rounded-lg overflow-hidden">
            <Image
              src="/mystery-box.png"
              alt="Bismuth Mystery Box"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* CONTENT — RIGHT */}
        <div className="space-y-8 max-w-xl">
          <span className="text-sm tracking-widest uppercase text-bismuth-purple">
            Curated Surprise
          </span>

          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">
            Mystery Box
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Not sure what to choose? Each Mystery Box contains a curated
            selection of authentic bismuth pieces, hand-picked to exceed the
            value of the box.
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>• 3 unique bismuth specimens</li>
            <li>• Collector’s guide included</li>
            <li>• Chance to receive rare gold bismuth</li>
          </ul>

          <div className="flex items-center gap-6">
            <span className="text-2xl font-medium">$99</span>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-8"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
