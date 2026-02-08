import api from '../api';
import { Product, Category } from '@/types/api';

export const productService = {
    getProducts: async (activeOnly = true) => {
        const response = await api.get<Product[]>('/products', {
            params: { activeOnly },
        });
        return response.data;
    },

    getProductsByCategory: async (categoryId: string, activeOnly = true) => {
        const response = await api.get<Product[]>(`/products/category/${categoryId}`, {
            params: { activeOnly },
        });
        return response.data;
    },

    getProductById: async (id: string) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    createProduct: async (data: any) => {
        const response = await api.post<Product>('/products', data);
        return response.data;
    },

    updateProduct: async (id: string, data: any) => {
        const response = await api.patch<Product>(`/products/${id}`, data);
        return response.data;
    },

    deleteProduct: async (id: string) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    getCategoryBySlug: async (slug: string) => {
        const response = await api.get<Category>(`/categories/slug/${slug}`);
        return response.data;
    },
};

