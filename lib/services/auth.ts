import api from '../api';
import { AuthResponse } from '@/types/api';

export const authService = {
    register: async (data: {
        name: string;
        email: string;
        password: string;
        role?: string;
        discountPercentage?: number;
    }) => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    login: async (data: { email: string; password: string }) => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    logout: async () => {
        await api.post('/auth/logout');
    },

    getMe: async () => {
        const response = await api.get('/users/me');
        return response.data;
    },

    updateMe: async (data: { name?: string; discountPercentage?: number }) => {
        const response = await api.patch('/users/me', data);
        return response.data;
    },
};
