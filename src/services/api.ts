import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { useAuthStore } from '@/stores/auth-store';

// Create axios instance
const api = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL as string | undefined) ??
    'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Important: send cookies with requests
  withCredentials: true,
});

// Request interceptor - add access token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    );
  },
);

export default api;
