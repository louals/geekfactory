'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative container mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between min-h-screen bg-transparent text-white overflow-hidden">
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="lg:w-1/2 space-y-12 z-20"
      >
        <div className="space-y-2">
          <h1 className="text-6xl lg:text-[100px] font-serif leading-[0.9] tracking-tight text-white">
            Luminous <br />
            handmade <br />
            <span className="relative inline-block italic font-extralight py-2">
              jewelry
              {/* Decorative Oval Stroke */}
              <svg
                className="absolute -inset-x-6 -inset-y-1 w-[120%] h-[110%] text-white/30"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <ellipse
                  cx="50"
                  cy="50"
                  rx="48"
                  ry="38"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </svg>
              {/* Star Icon */}
              <span className="absolute -right-10 top-2 text-3xl font-light opacity-80">
                ✦
              </span>
            </span>
          </h1>
        </div>

        <div className="space-y-8">
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase max-w-[280px] leading-relaxed">
            The only sign that matters, <br />
            Shop high class bismuth jewelry in our shop
          </p>

          <div className="flex items-center gap-10">
            {/* CTA Button */}
            <Link
              href="/products"
              className="group relative flex items-center gap-6 text-sm tracking-[0.3em] uppercase
    border border-white/20 rounded-full px-8 py-3
    overflow-hidden
    transition-all duration-500 ease-out
    hover:border-white hover:text-black"
            >
              {/* Background slide */}
              <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

              {/* Text */}
              <span className="relative z-10">See More</span>

              {/* Arrow bubble */}
              <div
                className="relative z-10 w-9 h-9 rounded-full border border-current
      flex items-center justify-center
      transition-all duration-300
      group-hover:bg-black group-hover:text-white"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right Image Composition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center"
      >
        <div className="relative w-[340px] h-[480px] lg:w-[500px] lg:h-[650px]">
          {/* Arch Clipping Mask */}
          <div className="absolute inset-0 rounded-t-full overflow-hidden border border-white/5 bg-neutral-900/40">
            <Image
              src="/image.png"
              alt="Bismuth Jewelry"
              fill
              className="object-cover brightness-[0.85] contrast-[1.1] hover:scale-105 transition-transform duration-[3s]"
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Circular Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <p className="text-[8px] tracking-[0.8em] uppercase rotate-90 whitespace-nowrap mb-8">
          Scroll to explore
        </p>
      </div>
    </section>
  );
}
