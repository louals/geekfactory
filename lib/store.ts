import { create } from 'zustand';
import { cartService } from './services/cart';
import { productService } from './services/products';
import { Product } from '@/types/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  totalAmount: number;
  isLoading: boolean;
  productCache: Record<string, Product>; // Cache to avoid redundant product fetches
  fetchCart: () => Promise<void>;
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  toggleCart: () => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  subtotal: 0,
  totalAmount: 0,
  isLoading: false,
  productCache: {},

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const cart = await cartService.getCart();
      console.log('DEBUG: Raw cart data from server:', cart);

      const formattedItems: CartItem[] = cart.items.map((item: any) => {
        // Handle nested product data vs flat ID
        const hasNestedProduct = item.productId && typeof item.productId === 'object';
        const productData = hasNestedProduct ? item.productId : (item.product || get().productCache[item.productId] || {});
        const id = hasNestedProduct ? item.productId._id : (item.productId || item.id);

        return {
          id: id,
          name: item.name || productData.name || item.productName || item.title || 'Unknown Product',
          price: item.price || item.unitPrice || productData.price || (item.subtotal / item.quantity) || 0,
          image: item.image || productData.image || productData.images?.[0] || item.product?.image || '',
          quantity: item.quantity,
          variant: item.variant,
        };
      });

      set({
        items: formattedItems,
        subtotal: cart.subtotal || 0,
        totalAmount: cart.total || 0,
        isLoading: false,
      });

      // Enrichment Step: If any items are still 'Unknown Product', fetch their details
      const unknownItems = formattedItems.filter(item => item.name === 'Unknown Product' && item.id);
      if (unknownItems.length > 0) {
        console.log('DEBUG: Enrichment needed for items:', unknownItems);

        for (const item of unknownItems) {
          try {
            const product = await productService.getProductById(item.id);
            if (product) {
              set(state => ({
                productCache: { ...state.productCache, [item.id]: product },
                items: state.items.map(i => i.id === item.id ? {
                  ...i,
                  name: product.name,
                  image: product.image || product.images?.[0] || i.image,
                  price: i.price || product.price
                } : i)
              }));
            }
          } catch (e) {
            console.error(`Failed to enrich product ${item.id}:`, e);
          }
        }
      }

    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ isLoading: false });
    }
  },

  addItem: async (product, quantity) => {
    set({ isLoading: true });
    try {
      // Add to cache immediately so fetchCart can use it
      set(state => ({
        productCache: { ...state.productCache, [product._id]: product }
      }));

      await cartService.addItem(product._id, quantity);
      await get().fetchCart();
      set({ isOpen: true });
    } catch (error) {
      console.error('Failed to add item:', error);
      throw error; // Re-throw so components can handle it
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (productId) => {
    set({ isLoading: true });
    try {
      await cartService.removeItem(productId);
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId, quantity) => {
    set({ isLoading: true });
    try {
      await cartService.updateItem(productId, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [], subtotal: 0, totalAmount: 0 }),
}));

