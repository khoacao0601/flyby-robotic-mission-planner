// Copyright (c) 2026 Khoa Cao. All rights reserved.

import { create } from 'zustand';
import type { User } from '../types/missions';

interface AuthStore {
    user: User | null,
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>(
    (set) => ({
        user: null,
        token: localStorage.getItem('flyby_token'),

        // Save token and update state
        login: (token, user) => {
            localStorage.setItem('flyby_token', token);
            set({ token, user});
        },

        // logout
        logout: () => {
            localStorage.removeItem('flyby_token');
            set({ token: null, user: null });
        }
        
    })
)

