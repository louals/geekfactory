import api from '../api';
import { User } from '@/types/api';

export const userService = {
    getAllUsers: async () => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    getUserById: async (id: string) => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    createUser: async (data: any) => {
        const response = await api.post<User>('/users', data);
        return response.data;
    },

    updateUser: async (id: string, data: Partial<User>) => {
        const response = await api.patch<User>(`/users/${id}`, data);
        return response.data;
    },

    deleteUser: async (id: string) => {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
};
