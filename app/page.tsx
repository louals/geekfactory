"use client"

import * as React from "react"
import Image from "next/image"
import { 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Zap, 
  Play, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube, 
  Globe,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function Home() {
  const [showMap, setShowMap] = React.useState(false);

  const mangas = [
    { name: "One Piece Vol. 105", author: "Eiichiro Oda", price: "DA 1200", image: "/images/mangas/onepiece.jpg", rating: 5 },
    { name: "Jujutsu Kaisen Vol. 20", author: "Gege Akutami", price: "DA 900", image: "/images/mangas/Jujutsu_kaisen.jpg", rating: 5 },
    { name: "Blue Lock Vol. 1", author: "Yusuke Nomura", price: "DA 1200", image: "/images/mangas/Blue_Lock.png", rating: 5 },
    { name: "Naruto: Sasuke's Story", author: "Masashi Kishimoto", price: "DA 1000", image: "/images/mangas/naruto.jpg", rating: 4 },
    { name: "Chainsaw Man Vol. 12", author: "Tatsuki Fujimoto", price: "DA 1200", image: "/images/mangas/cms.jpeg", rating: 5 },
    { name: "Demon Slayer Complete", author: "Koyoharu Gotouge", price: "DA 1000", image: "/images/mangas/demonslayer.jpg", rating: 5 },
    { name: "Attack on Titan Final", author: "Hajime Isayama", price: "DA 1500", image: "/images/mangas/aot.jpg", rating: 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pt-20 md:pt-32">
      <main className="flex-1 space-y-12 md:space-y-24">
        
        {/* Responsive Hero Section */}
        <section className="container mx-auto px-4 md:px-12 lg:px-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[3617/1890] group overflow-visible">
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900/50">
                <Image 
                  src="/images/hero.png" 
                  alt="GeekFactory Hero Banner" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="absolute -bottom-4 right-4 md:inset-y-0 md:-right-8 lg:-right-12 flex items-center z-20">
                 <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 font-black px-6 h-12 md:h-16 md:px-10 text-xs md:text-lg shadow-2xl flex items-center gap-2 transition-all duration-300 active:scale-95">
                   NOUVEAUTÉS <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                 </Button>
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex gap-3 z-20">
                 <div className="w-8 h-1 rounded-full bg-primary" />
                 <div className="w-8 h-1 rounded-full bg-white/10" />
                 <div className="w-8 h-1 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </section>

        {/* Manga Section */}
        <section className="container mx-auto px-4 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
             <div>
               <h2 className="text-xl md:text-3xl font-black font-orbitron tracking-tighter text-white uppercase italic leading-tight">
                 Manga à prix découverte
               </h2>
               <div className="h-1 w-12 md:h-1.5 md:w-16 bg-primary mt-2" />
             </div>
             <div className="flex gap-2 self-end">
               <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full border-white/10 bg-white/5 text-white hover:text-primary transition-all">
                 <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
               </Button>
               <Button variant="outline" size="icon" className="h-8 w-8 md:h-10 md:w-10 rounded-full border-white/10 bg-white/5 text-white hover:text-primary transition-all">
                 <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
               </Button>
             </div>
          </div>

          <div className="flex gap-3 md:gap-6 overflow-x-auto pb-10 no-scrollbar snap-x px-1">
            {mangas.map((manga, i) => (
              <div key={i} className="min-w-[150px] md:min-w-[210px] lg:min-w-[250px] snap-start group">
                <div className="relative aspect-[3/4.5] w-full rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-500 group-hover:border-primary/50">
                   <Image src={manga.image} alt={manga.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute inset-x-2 bottom-2 md:inset-x-3 md:bottom-3 z-20">
                      <Button className="w-full bg-primary/95 hover:bg-primary text-white text-[10px] font-black h-9 md:h-10 rounded-lg md:rounded-xl md:translate-y-6 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        AJOUTER
                      </Button>
                   </div>
                </div>
                <div className="mt-3 px-1">
                   <p className="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-0.5">{manga.author}</p>
                   <h3 className="text-xs md:text-sm font-bold text-white truncate leading-tight mb-1">{manga.name}</h3>
                   <div className="flex items-center justify-between">
                      <span className="text-sm md:text-base font-black text-white">{manga.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-2 w-2 md:h-2.5 md:w-2.5 fill-primary text-primary" />
                        <span className="text-[9px] md:text-[10px] font-bold text-zinc-500">{manga.rating}.0</span>
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location Section - Updated Hours */}
        <section className="container mx-auto px-4 py-12 md:py-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div>
                <h2 className="text-3xl md:text-5xl font-black font-orbitron tracking-tighter text-white uppercase italic leading-none mb-4">
                  GEEK<span className="text-primary">FACTORY</span>
                </h2>
                <p className="text-zinc-400 text-sm md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Venez découvrir notre univers en plein cœur d'Alger. Un espace dédié aux passionnés de manga, 
                  gaming et pop-culture japonaise.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-start gap-4 text-left">
                  <div className="mt-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs md:font-bold text-white uppercase tracking-wider">Adresse</h4>
                    <p className="text-zinc-500 text-xs md:text-sm">03 avenue Michal, El Achour 16104</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="mt-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-zinc-400" />
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    <h4 className="text-xs md:font-bold text-white uppercase tracking-wider">Horaires</h4>
                    <div className="text-[10px] md:text-sm text-zinc-500 font-bold uppercase tracking-tighter grid grid-cols-2 gap-x-4">
                       <span className="text-zinc-400">Sam - Jeu</span> <span>10:00 – 20:00</span>
                       <span className="text-zinc-400">Vendredi</span> <span className="text-primary">15:00 – 20:00</span>
                       <span className="text-zinc-400">Dimanche</span> <span className="text-zinc-700">Fermé</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 text-left">
                  <div className="mt-1 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-4 w-4 md:h-5 md:w-5 text-zinc-400" />
                  </div>
                  <div>
                    <h4 className="text-xs md:font-bold text-white uppercase tracking-wider">Contact</h4>
                    <p className="text-zinc-500 text-xs md:text-sm">0557604763</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setShowMap(!showMap)}
                className="w-full sm:w-auto font-orbitron font-black tracking-widest uppercase bg-primary text-white px-8 h-12 md:h-14 rounded-2xl gap-2 group transition-all"
              >
                {showMap ? "MASQUER LA CARTE" : "DÉCOUVRIR LE LIEU"}
                <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", showMap ? "rotate-180" : "")} />
              </Button>
            </div>

            <div className="flex justify-center">
              <div className="relative aspect-square w-full max-w-sm sm:max-w-md rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group bg-zinc-900 shadow-2xl">
                {!showMap ? (
                  <div className="relative h-full w-full">
                    <Image 
                      src="/location.png" 
                      alt="GeekFactory Physical Store" 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6">
                       <Zap className="h-6 w-6 text-primary mb-2" />
                       <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter italic">VISITEZ-NOUS</h3>
                    </div>
                  </div>
                ) : (
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.3353380581425!2d2.983561!3d36.714506799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128faf0cc018469b%3A0xe6bb61a3f37554e4!2sGeek%20factory%20Dz!5e0!3m2!1sen!2sdz!4v1776668446907!5m2!1sen!2sdz" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale invert brightness-90 contrast-125"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Mobile-Friendly Footer - Updated Socials */}
      <footer className="border-t border-white/5 pt-16 md:pt-32 pb-8 md:pb-12 bg-black overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 mb-16 md:mb-24 text-center sm:text-left">
             <div className="space-y-6 sm:space-y-8">
                <Link href="/" className="inline-block relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden border border-white/10 mx-auto sm:mx-0">
                   <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                </Link>
                <div className="space-y-4">
                   <span className="block font-orbitron font-black text-2xl md:text-3xl text-primary tracking-tighter uppercase leading-tight">GEEKFACTORY</span>
                   <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0 uppercase tracking-widest font-medium">
                     L'excellence de la culture geek à portée de main en Algérie.
                   </p>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3 md:gap-4">
                  <a href="https://www.instagram.com/geek_factory_dz/" target="_blank" className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-primary transition-colors group">
                    <Instagram className="h-4 w-4 md:h-5 md:w-5 text-zinc-400 group-hover:text-white" />
                  </a>
                  <a href="http://facebook.com/geekfactorydz/" target="_blank" className="h-9 w-9 md:h-10 md:w-10 rounded-lg bg-zinc-900 flex items-center justify-center hover:bg-primary transition-colors group">
                    <Facebook className="h-4 w-4 md:h-5 md:w-5 text-zinc-400 group-hover:text-white" />
                  </a>
                </div>
             </div>

             <div className="hidden sm:flex flex-col gap-6">
                <span className="text-white font-black text-sm uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Collection</span>
                <nav className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">
                  <a href="#" className="hover:text-primary transition-colors">Figurines</a>
                   <a href="#" className="hover:text-primary transition-colors">Mangas</a>
                   <a href="#" className="hover:text-primary transition-colors">Gaming</a>
                   <a href="#" className="hover:text-primary transition-colors">Exclusivités</a>
                </nav>
             </div>

             <div className="hidden lg:flex flex-col gap-6">
                <span className="text-white font-black text-sm uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Commerce</span>
                <nav className="flex flex-col gap-4 text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">
                  <a href="#" className="hover:text-primary transition-colors">Livraison</a>
                   <a href="#" className="hover:text-primary transition-colors">Garantie</a>
                   <a href="#" className="hover:text-primary transition-colors">FAQ</a>
                </nav>
             </div>

             <div className="flex flex-col gap-6">
                <span className="text-white font-black text-sm uppercase tracking-[0.2em] border-l-4 sm:border-primary pl-4">Newsletter</span>
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.1em] font-bold max-w-xs mx-auto sm:mx-0">
                  Rejoignez la factory pour les dernières news et offres exclusives.
                </p>
                <div className="flex gap-2 max-w-xs mx-auto sm:mx-0">
                  <input type="email" placeholder="E-mail" className="bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-xs w-full focus:outline-none" />
                  <Button size="icon" className="bg-primary hover:bg-primary/80 shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
             </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col gap-6 text-center">
             <div className="flex items-center justify-center gap-4 text-[9px] text-zinc-600 font-orbitron uppercase tracking-widest">
               <span>AUTHENTIC GEEK GEAR</span>
               <div className="h-1 w-1 rounded-full bg-zinc-800" />
               <span>EST. 2026</span>
             </div>
             <p className="text-[8px] md:text-[9px] text-zinc-600 tracking-[0.4em] font-orbitron uppercase leading-relaxed">
               © GEEKFACTORY ALGÉRIE. ALL RIGHTS RESERVED.
             </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
