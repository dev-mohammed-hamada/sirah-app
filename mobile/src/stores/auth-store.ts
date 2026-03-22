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

// TODO: Remove before release — bypasses auth for testing
const DEV_BYPASS_AUTH = __DEV__ && true;

const DEV_USER: UserProfile = {
  id: 'dev-son-1',
  displayName: 'محمد',
  username: 'dev_son',
  accountType: 'SON',
  age: 10,
  xp: 150,
  streak: 3,
  heartsRemaining: 5,
};

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
    if (DEV_BYPASS_AUTH) {
      set({ token: 'dev-token', user: DEV_USER, isAuthenticated: true, isLoading: false });
      return;
    }

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
