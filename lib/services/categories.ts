import api from '../api';
import { Category } from '@/types/api';

export const categoryService = {
    getCategories: async () => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    getCategoryById: async (id: string) => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },

    getCategoryBySlug: async (slug: string) => {
        const response = await api.get<Category>(`/categories/slug/${slug}`);
        return response.data;
    },

    createCategory: async (data: Partial<Category>) => {
        const response = await api.post<Category>('/categories', data);
        return response.data;
    },

    updateCategory: async (id: string, data: Partial<Category>) => {
        const response = await api.patch<Category>(`/categories/${id}`, data);
        return response.data;
    },

    deleteCategory: async (id: string) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    },
};
