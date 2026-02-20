'use client';


import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  User as UserIcon,
  Search,
  Menu,
  Package,
  Heart,
  LogOut,
  MapPin,
  X,
  Crown,
  UserCircle,
  Gavel,
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
import { useAuthStore } from '@/lib/auth-store';
import { authService } from '@/lib/services/auth';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

const NAV_LINKS = [
  { label: 'Shop', href: '/products' },
  { label: 'Auctions', href: '/auctions' },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'About', href: '/about' },
  { label: 'Articles', href: '/articles' },
];

export default function Navbar() {
  const router = useRouter();
  const { toggleCart, items, fetchCart } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [mounted, setMounted] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  // Search States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    fetchCart();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchCart]);
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);


  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      toast.success('Logged out successfully');
      router.push('/');
    }
  };

  const itemCount = mounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out ${scrolled
        ? 'border-b border-white/10 bg-black/80 backdrop-blur-2xl py-2'
        : 'border-b border-transparent bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between relative">
        {/* BRAND IDENTITY */}
        <div
          className={`flex-1 flex justify-start transition-opacity ${isSearchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}
        >
          <Link href="/" className="block">
            <Image
              src={logo}
              alt="Brand logo"
              width={120}
              height={40}
              className={`transition-all duration-500 ${scrolled ? 'scale-90' : 'scale-100'}`}
              priority
            />
          </Link>
        </div>

        {/* CENTER LINKS */}
        {!isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex flex-none items-center gap-10"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative px-2 py-1 text-[14px] uppercase tracking-widest text-white/60 transition-colors hover:text-white"
              >
                <span className="absolute left-0 top-0 h-0 w-0 border-l border-t border-white opacity-0 transition-all duration-300 group-hover:h-2 group-hover:w-2 group-hover:opacity-100" />
                {link.label}
                <span className="absolute bottom-0 right-0 h-0 w-0 border-b border-r border-white opacity-0 transition-all duration-300 group-hover:h-2 group-hover:w-2 group-hover:opacity-100" />
              </Link>
            ))}
          </motion.div>
        )}

        {/* SEARCH OVERLAY INPUT */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '40%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white/5 border border-white/10 px-4 py-1 backdrop-blur-md"
            >
              <form
                onSubmit={handleSearch}
                className="flex w-full items-center"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="SEARCH PRODUCTS..."
                  className="w-full bg-transparent border-none text-white text-xs tracking-widest focus:ring-0 outline-none h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-4 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT ACTIONS */}
        <div className="flex-1 flex items-center justify-end gap-1 md:gap-3">
          {!isSearchOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>
          )}

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <UserIcon className="h-[18px] w-[18px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 bg-black/90 border-white/10 text-white backdrop-blur-2xl rounded-none mt-4 p-2"
            >
              {!mounted ? (
                <div className="p-4 text-center text-white/20 text-[10px] uppercase tracking-widest">
                  Loading...
                </div>
              ) : user ? (
                <>
                  <DropdownMenuLabel className="px-4 py-3 flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">
                      Logged in as
                    </span>
                    <span className="text-white font-medium truncate">
                      {user.name}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  {user.role === 'admin' && (
                    <MenuItem
                      icon={<Crown className="h-4 w-4 text-bismuth-magenta" />}
                      label="Admin Dashboard"
                      href="/admin"
                    />
                  )}
                  <MenuItem
                    icon={<UserCircle className="h-4 w-4" />}
                    label="Profile"
                    href="/profile"
                  />

                  <MenuItem
                    icon={<Crown className="h-4 w-4" />}
                    label="Membership"
                    href="/membership"
                  />
                  <DropdownMenuSeparator className="bg-white/5" />
                  <MenuItem
                    icon={<Package className="h-4 w-4" />}
                    label="Orders"
                    href="/profile/orders"
                  />
                  <MenuItem
                    icon={<Gavel className="h-4 w-4" />}
                    label="My Bids"
                    href="/profile/bids"
                  />
                  <MenuItem
                    icon={<MapPin className="h-4 w-4" />}
                    label="Addresses"
                    href="/profile/address"
                  />
                  <MenuItem
                    icon={<Heart className="h-4 w-4" />}
                    label="Wishlist"
                    href="/wishlist"
                  />
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">
                      Log out
                    </span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel className="px-4 py-3 text-[10px] uppercase tracking-widest text-white/40">
                    Welcome
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <MenuItem
                    icon={<UserCircle className="h-4 w-4" />}
                    label="Login"
                    href="/login"
                  />
                  <MenuItem
                    icon={<UserCircle className="h-4 w-4" />}
                    label="Register"
                    href="/register"
                  />
                </>
              )}

            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCart}
            className="group relative text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden ml-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/5 transition-colors"
                >
                  <Menu className="h-5 w-5 text-white/90" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-black border-white/10 p-0 w-[300px]"
              >
                <div className="flex flex-col h-full pt-20 px-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="py-4 text-2xl font-light tracking-tight text-white/70 hover:text-white border-b border-white/5"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-auto pb-10 flex flex-col gap-4">
                    {mounted && user ? (
                      <>
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="py-4 text-xl font-light tracking-tight text-bismuth-magenta hover:text-white border-b border-white/5 flex items-center gap-3"
                          >
                            <Crown className="h-5 w-5" />
                            Admin Dashboard
                          </Link>
                        )}
                        <Link
                          href="/profile"
                          className="py-4 text-xl font-light tracking-tight text-white/70 hover:text-white border-b border-white/5 flex items-center gap-3"
                        >
                          <UserCircle className="h-5 w-5" />
                          Profile
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="py-4 text-xl font-light tracking-tight text-red-400 hover:text-red-300 border-b border-white/5 flex items-center gap-3 w-full text-left"
                        >
                          <LogOut className="h-5 w-5" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="py-4 text-xl font-light tracking-tight text-white/70 hover:text-white border-b border-white/5 flex items-center gap-3"
                        >
                          <UserCircle className="h-5 w-5" />
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="py-4 text-xl font-light tracking-tight text-white/70 hover:text-white border-b border-white/5 flex items-center gap-3"
                        >
                          <UserCircle className="h-5 w-5" />
                          Register
                        </Link>
                      </>
                    )}

                  </div>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav >
  );
}

function MenuItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <DropdownMenuItem className="flex items-center px-4 py-3 text-white/70 focus:bg-white/5 focus:text-white cursor-pointer transition-colors">
        <span className="mr-3 opacity-70">{icon}</span>
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </DropdownMenuItem>
    </Link>
  );
}

