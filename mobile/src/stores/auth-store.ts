import { create } from 'zustand';
import { getItem, setItem, deleteItem } from '../utils/storage';

interface UserProfile {
  id: string;
  displayName: string;
  username: string;
  accountType: 'SON' | 'FATHER';
  age?: number;
  xp: number;
  streak: number;
  heartsRemaining: number;
}

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: UserProfile) => Promise<void>;
  clearAuth: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (token, user) => {
    await setItem('accessToken', token);
    await setItem('user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true, isLoading: false });
  },

  clearAuth: async () => {
    await deleteItem('accessToken');
    await deleteItem('user');
    set({ token: null, user: null, isAuthenticated: false, isLoading: false });
  },

  loadStoredAuth: async () => {
    const token = await getItem('accessToken');
    const userJson = await getItem('user');

    if (token && userJson) {
      const user = JSON.parse(userJson);
      set({ token, user, isAuthenticated: true, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },
}));
