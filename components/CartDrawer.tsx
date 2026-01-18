'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/store';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

export function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, total } =
    useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-md bg-black/95 border-l border-white/10 backdrop-blur-xl flex flex-col h-full border-r-0">
        <SheetHeader className="space-y-4 pr-6">
          <SheetTitle className="text-2xl font-serif font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-bismuth-magenta" />
            Your Cart
          </SheetTitle>
          <Separator className="bg-white/10" />
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-xl text-white font-medium">Your cart is empty</p>
            <p className="text-gray-500 text-center max-w-[200px]">
              Looks like you haven&apos;t added any magic to your cart yet.
            </p>
            <SheetClose asChild>
              <Button className="mt-4 bg-white/10 hover:bg-white/20 text-white rounded-full">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative w-24 h-24 bg-white/5 rounded-lg border border-white/10 overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-bismuth-cyan/20 to-bismuth-purple/20" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-white font-medium line-clamp-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-400">
                        {item.variant || 'Standard'}
                      </p>
                      <p className="text-bismuth-cyan font-mono">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-white" />
                        </button>
                        <span className="text-white font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/10 bg-black/50 backdrop-blur-md -mx-6 px-6 pb-6">
              <div className="flex justify-between text-base">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-medium font-mono">
                  ${total().toFixed(2)} USD
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-3">
                <Button className="w-full rounded-full bg-gradient-to-r from-bismuth-cyan to-bismuth-purple text-black font-bold h-12 text-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all border-none">
                  Checkout
                </Button>
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-white/10 hover:bg-white/5 text-gray-400 hover:text-white h-12"
                  >
                    View Cart
                  </Button>
                </SheetClose>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
