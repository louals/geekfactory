import axios from 'axios';
import { useAuthStore } from './auth-store';

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://aurora-crystal-server.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to get session ID for guests
const getSessionId = () => {
  if (typeof window === 'undefined') return null;
  let sessionId = sessionStorage.getItem('x-session-id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('x-session-id', sessionId);
  }
  return sessionId;
};

// Request interceptor to add auth token or session ID
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    // 1. Add Auth Token if it exists
    const hasToken = accessToken && accessToken !== 'null' && accessToken !== 'undefined';
    if (hasToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 2. ALWAYS add Session ID if it exists
    // The backend error "Either userId (auth) or sessionId must be provided"
    // suggests that it needs at least one of these. For guests, sessionId is mandatory.
    // For logged-in users, having sessionId active helps with cart merging/migration.
    const sessionId = getSessionId();
    if (sessionId) {
      config.headers['x-session-id'] = sessionId;
      config.headers['X-Session-ID'] = sessionId; // Some backends are case-sensitive
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;
          const user = useAuthStore.getState().user;
          if (user) {
            setAuth(user, newAccessToken, newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          clearAuth();
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

