import { apiClient } from '../../config/api';

interface RegisterPayload {
  displayName: string;
  username: string;
  password: string;
  accountType: 'SON' | 'FATHER';
  age?: number;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    displayName: string;
    username: string;
    accountType: 'SON' | 'FATHER';
    age?: number;
    xp: number;
    streak: number;
    heartsRemaining: number;
  };
}

interface UsernameCheckResponse {
  available: boolean;
}

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  checkUsername: async (username: string): Promise<boolean> => {
    const { data } = await apiClient.post<UsernameCheckResponse>('/auth/check-username', {
      username,
    });
    return data.available;
  },
};
