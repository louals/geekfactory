'use client';

import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import WhatIsBismuth from '@/components/home/WhatIsBismuth';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Membership from '@/components/home/Membership';
import MysteryBox from '@/components/home/MysteryBox';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-black text-white selection:bg-bismuth-cyan selection:text-black">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-bismuth-purple/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-bismuth-cyan/5 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <Hero />
      <Categories />
      <WhatIsBismuth />
      <FeaturedProducts />
      <Membership />
      <MysteryBox />
      <Contact />
    </div>
  );
}
