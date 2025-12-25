import type { User } from '@root/lib/index.js'
import { create } from 'zustand'
import { logout as apiLogout } from '@features/index.js'; 
import { useLoading } from '@hooks/index.js';

interface UserState {
    user: User | null;
    login: (userData: User | null) => void;
    logout: () => Promise<void>;
}

export const useUser = create<UserState>((set) => ({
    user: null,
    login: (userData) => {
        set({ user: userData });
    },
    logout: async () => {
        const { setLoading } = useLoading.getState(); 

        try {
            setLoading(true);
            await apiLogout();
            set({ user: null });
        } catch {
            console.warn('failed to log user out');
        } finally {
            setLoading(false);
        }
    }
}))

export default useUser;