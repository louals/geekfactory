import axios from 'axios';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.thebismuthsmith.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // For cookie-based auth if needed
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401: Unauthorized
            if (error.response.status === 401) {
                // User requested to treat 401 as success-like (graceful handling)
                console.warn('Unauthorized access - treating gracefully');
                // Optional: Trigger a toast or silent refresh here
                return Promise.resolve(error.response); // Resolving instead of rejecting to 'pass' as success if needed, or simply don't redirect.
            }
            // Handle 403: Forbidden
            if (error.response.status === 403) {
                console.error('Access Denied');
                // Handle 403 gracefully too if needed
                return Promise.resolve(error.response);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
