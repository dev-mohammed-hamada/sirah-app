import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../services/api/auth-service';
import { useAuthStore } from '../stores/auth-store';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      await setAuth(data.accessToken, data.user);
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: authService.register,
    onSuccess: async (data) => {
      await setAuth(data.accessToken, data.user);
    },
  });
}

export function useCheckUsername(username: string) {
  return useQuery({
    queryKey: ['checkUsername', username],
    queryFn: () => authService.checkUsername(username),
    enabled: username.length >= 3,
    retry: false,
  });
}
