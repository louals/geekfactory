'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Package,
  Heart,
  LogOut,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const { toggleCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/30">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-black/95 border-r border-white/10 text-white"
            >
              <div className="flex flex-col gap-6 mt-10">
                <Link
                  href="/"
                  className="text-xl font-medium hover:text-bismuth-cyan"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-xl font-medium hover:text-bismuth-magenta"
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-xl font-medium hover:text-bismuth-purple"
                >
                  About
                </Link>
                <Link
                  href="/articles"
                  className="text-xl font-medium hover:text-bismuth-teal"
                >
                  Articles
                </Link>
                <Link
                  href="/wholesale"
                  className="text-xl font-medium hover:text-bismuth-lavender"
                >
                  Wholesale
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="group">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-20 h-20 object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/products"
            className="text-sm uppercase tracking-widest hover:text-bismuth-cyan transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-bismuth-cyan after:transition-all hover:after:w-full"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-sm uppercase tracking-widest hover:text-bismuth-magenta transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-bismuth-magenta after:transition-all hover:after:w-full"
          >
            About
          </Link>
          <Link
            href="/articles"
            className="text-sm uppercase tracking-widest hover:text-bismuth-purple transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-bismuth-purple after:transition-all hover:after:w-full"
          >
            Articles
          </Link>
          <Link
            href="/wholesale"
            className="text-sm uppercase tracking-widest hover:text-bismuth-teal transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-bismuth-teal after:transition-all hover:after:w-full"
          >
            Wholesale
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-bismuth-cyan transition-colors hidden sm:flex"
          >
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-bismuth-purple transition-colors"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-black/95 border-white/10 text-white backdrop-blur-xl"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/orders">
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/wishlist">
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/profile/address">
                <DropdownMenuItem className="cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:text-white">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Address</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-900/10 focus:bg-red-900/10 focus:text-red-300">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-bismuth-magenta transition-colors relative"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-bismuth-cyan ring-2 ring-black"></span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
}
