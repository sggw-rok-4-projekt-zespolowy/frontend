import { useAuthStore } from '@/stores/auth-store';

import api from './api';
import {
  type AuthResponse,
  type LoginRequest,
  type RegisterRequest,
  type User,
} from '../types/auth';

export const authService = {
  /**
   * Login with email and password
   * Backend sets refresh token as HTTP-only cookie
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const { access_token, user } = response.data;

    // Store access token in memory (Zustand)
    useAuthStore.getState().setAuth(user, access_token);

    return response.data;
  },

  /**
   * Register a new user
   * Backend sets refresh token as HTTP-only cookie
   */
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', data);
    const { access_token, user } = response.data;

    // Store access token in memory (Zustand)
    useAuthStore.getState().setAuth(user, access_token);

    return response.data;
  },

  /**
   * Refresh access token using HTTP-only refresh token cookie
   * Called on app initialization to restore session
   */
  async refresh(): Promise<AuthResponse | null> {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh');
      const { access_token, user } = response.data;

      useAuthStore.getState().setAuth(user, access_token);

      return response.data;
    } catch {
      // Refresh failed - user needs to login again
      useAuthStore.getState().logout();
      return null;
    }
  },

  /**
   * Logout user
   * Backend clears the refresh token cookie
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore errors - we're logging out anyway
    } finally {
      useAuthStore.getState().logout();
    }
  },

  /**
   * Get current user info
   */
  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  /**
   * Initialize auth state on app load
   * Attempts to refresh token if cookie exists
   */
  async initialize(): Promise<void> {
    const store = useAuthStore.getState();

    // Already initialized
    if (store.isInitialized) {
      return;
    }

    store.setLoading(true);

    try {
      // Try to refresh token (cookie sent automatically)
      await this.refresh();
    } catch {
      // No valid session
      store.logout();
    } finally {
      store.setInitialized(true);
    }
  },
};
