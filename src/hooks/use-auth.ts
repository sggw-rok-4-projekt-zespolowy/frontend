import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import { authService } from '@/services/auth';
import { useAuthStore } from '@/stores/auth-store';

/**
 * Hook for accessing auth state and actions
 */
export function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, accessToken } = useAuthStore();

  const logout = useCallback(async () => {
    await authService.logout();
    void navigate('/login');
  }, [navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    accessToken,
    logout,
  };
}
