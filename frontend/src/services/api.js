/**
 * services/api.js — Axios HTTP client configuration
 *
 * Creates a pre-configured Axios instance with:
 * - Base URL from environment variables
 * - Default headers
 * - Request/response interceptors for error normalization
 *
 * Usage:
 *   import api from '../services/api';
 *   const { data } = await api.get('/company/Google');
 */

import axios from 'axios';

// Base URL: uses Vite env variable or falls back to localhost
// In Docker: VITE_API_URL should be set in the frontend .env
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 second timeout (scrapers can be slow)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Runs before every request is sent
api.interceptors.request.use(
  (config) => {
    // You could add auth tokens here if needed in future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Runs after every response is received
api.interceptors.response.use(
  // Success: return response as-is
  (response) => response,

  // Error: normalize the error message before rejecting
  (error) => {
    let errorMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      // Server responded with an error status code (4xx, 5xx)
      errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was sent but no response received (network issue)
      errorMessage = 'Cannot connect to the server. Please check your connection.';
    } else if (error.code === 'ECONNABORTED') {
      // Request timed out
      errorMessage = 'Request timed out. The server is taking too long to respond.';
    }

    // Attach normalized message to the error object
    error.userMessage = errorMessage;
    return Promise.reject(error);
  }
);

// ─── API Methods ──────────────────────────────────────────────────────────────

/**
 * Fetch aggregated reviews for a company
 * @param {string} companyName
 * @param {boolean} forceRefresh - bypass cache if true
 * @returns {Promise<Object>} company data
 */
export const fetchCompanyReviews = async (companyName, forceRefresh = false) => {
  const params = forceRefresh ? { refresh: 'true' } : {};
  const response = await api.get(`/company/${encodeURIComponent(companyName)}`, { params });
  return response.data;
};

/**
 * Force refresh cache for a company
 * @param {string} companyName
 * @returns {Promise<Object>} fresh company data
 */
export const refreshCompanyCache = async (companyName) => {
  const response = await api.post('/cache/refresh', { companyName });
  return response.data;
};

/**
 * Get API health status
 * @returns {Promise<Object>} health data
 */
export const getHealthStatus = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
