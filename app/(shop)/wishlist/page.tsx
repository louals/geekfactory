'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  // In a real app, fetch wishlist from store or API
  const wishlistItems: unknown[] = [];

  return (
    <div className="container mx-auto px-4 py-20 text-white min-h-screen">
      <h1 className="text-4xl font-serif font-bold mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-8">
            The elements are calling. Go find something shiny.
          </p>
          <Button
            asChild
            className="bg-white text-black hover:bg-bismuth-cyan/80"
          >
            <Link href="/products">Browse Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Render wishlist items here */}
        </div>
      )}
    </div>
  );
}
