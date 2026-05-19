/**
 * context/AppContext.jsx — Global application state
 *
 * Provides shared state across all components without prop drilling.
 * Manages: company data, loading state, error state, and search query.
 *
 * Usage:
 *   import { useApp } from '../context/AppContext';
 *   const { companyData, loading, error, searchCompany } = useApp();
 */

import { createContext, useContext, useState, useCallback } from 'react';
import { fetchCompanyReviews, refreshCompanyCache } from '../services/api';

// Create the context
const AppContext = createContext(null);

/**
 * AppProvider — wraps the app and provides global state
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const AppProvider = ({ children }) => {
  // ── State ────────────────────────────────────────────────────────────────
  const [companyData, setCompanyData] = useState(null);  // Fetched company data
  const [loading, setLoading]         = useState(false);  // Is a request in flight?
  const [error, setError]             = useState(null);   // Error message string
  const [searchQuery, setSearchQuery] = useState('');     // Current search input value
  const [hasSearched, setHasSearched] = useState(false);  // Has the user searched yet?

  // ── Actions ──────────────────────────────────────────────────────────────

  /**
   * searchCompany — fetches company data and updates state
   * @param {string} companyName
   * @param {boolean} forceRefresh
   */
  const searchCompany = useCallback(async (companyName, forceRefresh = false) => {
    if (!companyName || companyName.trim() === '') return;

    setLoading(true);
    setError(null);
    setCompanyData(null);
    setHasSearched(true);

    try {
      const response = await fetchCompanyReviews(companyName.trim(), forceRefresh);
      setCompanyData(response.data);
    } catch (err) {
      setError(err.userMessage || 'Failed to fetch company data');
      setCompanyData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * refreshCache — forces a cache bypass and re-fetches data
   */
  const refreshCache = useCallback(async (companyName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await refreshCompanyCache(companyName);
      setCompanyData(response.data);
    } catch (err) {
      setError(err.userMessage || 'Failed to refresh cache');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * clearResults — resets state back to initial
   */
  const clearResults = useCallback(() => {
    setCompanyData(null);
    setError(null);
    setSearchQuery('');
    setHasSearched(false);
  }, []);

  // ── Context Value ─────────────────────────────────────────────────────────
  const value = {
    companyData,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    hasSearched,
    searchCompany,
    refreshCache,
    clearResults,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * useApp — custom hook to access the app context
 * @returns {Object} context value
 */
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
