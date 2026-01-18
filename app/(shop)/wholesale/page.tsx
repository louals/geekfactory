'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WholesalePage() {
  return (
    <div className="container mx-auto px-4 py-20 text-white min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12 backdrop-blur-md"
      >
        <div className="text-center mb-10">
          <span className="text-bismuth-teal uppercase tracking-widest text-sm font-semibold">
            B2B Partners
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold mt-2">
            Wholesale Inquiries
          </h1>
          <p className="text-gray-400 mt-4">
            Interested in stocking The Bismuth Smith in your boutique or
            gallery? We offer competitive wholesale pricing for bulk orders of
            20+ units.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Company Name</label>
              <Input
                className="bg-black/50 border-white/10"
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Tax ID / VAT</label>
              <Input
                className="bg-black/50 border-white/10"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Email Address</label>
            <Input
              type="email"
              className="bg-black/50 border-white/10"
              placeholder="buyer@company.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Expected Volume</label>
            <select className="flex h-9 w-full rounded-md border border-white/10 bg-black/50 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white">
              <option>20-50 units</option>
              <option>50-100 units</option>
              <option>100+ units</option>
            </select>
          </div>

          <Button className="w-full bg-gradient-to-r from-bismuth-teal to-bismuth-cyan text-black font-semibold mt-4">
            Request Access
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
