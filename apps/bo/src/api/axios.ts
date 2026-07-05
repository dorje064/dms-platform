import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth.store';

const api = axios.create({
  baseURL: import.meta.env['VITE_API_BASE_URL'] ?? 'http://localhost:3333/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global 401 handler → auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
      toast.error('Session expired. Please log in again.');
    }
    return Promise.reject(error);
  },
);

export default api;
