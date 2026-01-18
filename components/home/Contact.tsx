'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-20"
      >
        {/* LEFT — COPY */}
        <div className="space-y-6 max-w-md">
          <h2 className="text-4xl font-semibold tracking-tight">
            Contact us
          </h2>

          <p className="text-gray-400 leading-relaxed">
            Have a question about custom pieces, wholesale, or collaborations?
            Drop us a message and we’ll get back to you shortly.
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Mail className="w-4 h-4" />
            <span>support@thebismuthsmith.com</span>
          </div>
        </div>

        {/* RIGHT — FORM */}
        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Name</label>
            <Input
              placeholder="Your name"
              className="bg-transparent border border-white/10 focus:border-white text-white placeholder:text-gray-600 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-transparent border border-white/10 focus:border-white text-white placeholder:text-gray-600 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Message</label>
            <textarea
              placeholder="How can we help?"
              className="w-full min-h-[140px] resize-none rounded-md bg-transparent border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-white"
            />
          </div>

          <Button
            size="lg"
            className="mt-4 bg-white text-black hover:bg-gray-200 px-10"
          >
            Send
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
