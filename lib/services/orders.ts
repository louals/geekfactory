import api from '../api';
import { Order } from '@/types/api';

export const orderService = {
    createOrder: async (orderData: { email?: string; name?: string; phone?: string; address?: string }) => {
        const response = await api.post<Order>('/orders', orderData);
        return response.data;
    },

    getOrdersMe: async () => {
        const response = await api.get<Order[]>('/orders/me');
        return response.data;
    },

    getOrderById: async (id: string, email?: string) => {
        const response = await api.get<Order>(`/orders/${id}`, {
            params: email ? { email } : {},
        });
        return response.data;
    },

    getAllOrders: async () => {
        const response = await api.get<Order[]>('/orders');
        return response.data;
    },

    updateOrderStatus: async (id: string, status: string) => {
        const response = await api.patch(`/orders/${id}/status`, { status });
        return response.data;
    },
};
