'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-4xl lg:text-6xl font-serif font-bold text-center mb-12">
          The <span className="text-bismuth-magenta">Artisan&apos;s</span> Tale
        </h1>

        <div className="prose prose-invert prose-lg mx-auto">
          <p className="text-xl text-gray-300 leading-relaxed text-center mb-12">
            &quot;We don&apos;t just sell jewelry; we capture instants of
            crystallization where chaos aligns into perfect order.&quot;
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-bismuth-cyan">
                Our Philosophy
              </h2>
              <p className="text-gray-400">
                The Bismuth Smith was born from a fascination with the elemental
                forces of nature. Bismuth, element 83, is a paradox—a heavy
                metal that wants to be a rainbow. Our craft is about guiding
                this transition, timing the cooling process to milliseconds to
                achieve specific color spectrums.
              </p>
            </div>
            <div className="h-80 bg-white/5 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-bismuth-purple/20 to-bismuth-cyan/20 animate-pulse" />
              {/* Placeholder for About Image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-sm">
                [Foundry Image]
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-bismuth-purple">
              Sustainability
            </h2>
            <p className="text-gray-400">
              We believe in ethical sourcing. Our raw Bismuth is 99.99% pure and
              sourced responsibly. Because Bismuth is non-toxic (unlike Lead),
              it represents a cleaner, safer future for metallurgy art. Every
              scrap from our workshop is remelted and recycled into new
              creations. Nothing is wasted.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
