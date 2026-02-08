import api from '../api';
import { Cart } from '@/types/api';

export const cartService = {
    getCart: async () => {
        const response = await api.get<Cart>('/cart');
        return response.data;
    },

    addItem: async (productId: string, quantity: number) => {
        const response = await api.post<Cart>('/cart/items', { productId, quantity });
        return response.data;
    },

    updateItem: async (productId: string, quantity: number) => {
        const response = await api.patch<Cart>(`/cart/items/${productId}`, {
            quantity,
        });
        return response.data;
    },

    removeItem: async (productId: string) => {
        const response = await api.delete<Cart>(`/cart/items/${productId}`);
        return response.data;
    },
};
