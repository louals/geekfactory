import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/api';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAuth: (user: User, accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            setAuth: (user, accessToken, refreshToken) =>
                set({ user, accessToken, refreshToken }),
            clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
            updateUser: (updatedUser) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedUser } : null,
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
