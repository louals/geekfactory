"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { name: "MANGA", href: "#" },
  { name: "FIGURINES", href: "#" },
  { name: "GAMING", href: "#" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      {/* 🟢 MAIN NAVBAR */}
      <nav 
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled 
            ? "bg-black/95 backdrop-blur-xl border-white/10 h-16" 
            : "bg-black border-white/5 h-20 md:h-24"
        )}
      >
        <div className="container mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          
          {/* 1. LOGO (Left) */}
          <div className="flex items-center gap-4">
            <Link href="/" className="group h-10 w-10 md:h-16 md:w-16 relative block">
              <Image 
                src="/images/logo.jpg" 
                alt="GeekFactory Logo" 
                fill 
                className="object-cover rounded-full border-2 border-white/10 group-hover:border-primary transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* 2. NAVIGATION LINKS (Center - Hidden on Mobile) */}
          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-12">
            {NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative text-[11px] xl:text-xs font-black tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300 py-2 flex items-center gap-1"
              >
                <span>{item.name}</span>
                <ChevronDown className={cn(
                  "h-3 w-3 opacity-50 transition-transform duration-300",
                  hoveredIndex === idx ? "translate-y-0.5 opacity-100 text-primary" : ""
                )} />
                
                <span 
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-300 ease-out",
                    hoveredIndex === idx ? "w-full opacity-100" : "w-0 opacity-0"
                  )} 
                />
              </Link>
            ))}
          </div>

          {/* 3. ACTIONS (Right) */}
          <div className="flex items-center gap-4 md:gap-7">
            <button className="hidden md:block text-white/60 hover:text-primary transition-all duration-300">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/" className="hidden sm:block text-white/60 hover:text-primary transition-all duration-300">
              <User className="h-5 w-5" />
            </Link>
            <Link href="#" className="relative text-white/60 hover:text-primary transition-all duration-300 group">
              <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110" />
              <span className="absolute -top-2 -right-2 bg-primary text-[8px] md:text-[9px] text-white font-black h-4 w-4 md:h-5 md:w-5 flex items-center justify-center rounded-full border-2 border-black">
                0
              </span>
            </Link>

            {/* Mobile Menu Sheet */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/5">
                    <Menu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black border-white/10 text-white w-full sm:max-w-xs p-0">
                  <SheetHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
                    <SheetTitle className="text-left font-orbitron font-black text-xl text-primary italic">GEEKFACTORY</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-2 p-4 pt-10">
                    {NAV_ITEMS.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href} 
                        className="text-2xl font-black tracking-widest text-zinc-400 hover:text-white px-2 py-4 border-b border-white/5 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="mt-auto pt-10 px-2 space-y-6">
                       <div className="flex items-center gap-4 text-zinc-500 uppercase text-xs font-bold tracking-widest">
                          <Search className="h-4 w-4" /> RECHERCHER
                       </div>
                       <Link href="/" className="flex items-center gap-4 text-zinc-500 uppercase text-xs font-bold tracking-widest">
                          <User className="h-4 w-4" /> MON COMPTE
                       </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </div>
      </nav>
    </div>
  )
}
