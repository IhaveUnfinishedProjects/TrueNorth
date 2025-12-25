import type { User } from '@root/lib/index.js'
import { create } from 'zustand'
import { logout } from '@features/index.js';

interface UserState {
  user: User | null;
  login: (userData: User | null) => void;
  logout: () => void;
}

export const useUser = create<UserState>((set) => ({
    user: null,
    login: (userData) => set({ user: userData }),
    logout: async () => {
      try {
        await logout();
        set({ user: null });
      } catch {
        console.warn('failed to log user out');
      }
    }
}))

export default useUser;