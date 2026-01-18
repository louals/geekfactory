'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function Membership() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        {/* LEFT — COPY */}
        <div className="space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-bismuth-purple">
            <Sparkles className="w-4 h-4" />
            Members only
          </div>

          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">
            Bismuth Membership
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Join a small group of collectors with early access to new drops,
            exclusive pieces, and a monthly mystery shard delivered to your
            door.
          </p>

          <ul className="space-y-3 text-gray-300">
            <li>• Early access to limited releases</li>
            <li>• Members-only drops and pricing</li>
            <li>• Monthly mystery shard</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 px-10"
            >
              Join membership
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-10"
            >
              View benefits
            </Button>
          </div>
        </div>

        {/* RIGHT — SIMPLE VISUAL */}
        <div className="relative max-w-md mx-auto">
          {/* subtle brand glow */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-bismuth-purple/20 via-bismuth-cyan/20 to-transparent blur-3xl" />

          <div className="relative rounded-lg border border-white/10 bg-black p-8 space-y-6">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Membership</span>
              <span>#001</span>
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-1/2 bg-white/10 rounded" />
            </div>

            <div className="pt-6 text-sm text-gray-400">
              New drops · Monthly shard · Priority access
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
