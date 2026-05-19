/**
 * hooks/useCompanyData.js — Custom hook for company data fetching
 *
 * Encapsulates local component-level data fetching state.
 * An alternative to using global context — useful for components
 * that need their own isolated fetch state.
 *
 * Usage:
 *   const { data, loading, error, fetch } = useCompanyData();
 *   fetch('Google');
 */

import { useState, useCallback } from 'react';
import { fetchCompanyReviews } from '../services/api';

/**
 * useCompanyData
 * @returns {{ data, loading, error, fetchData, reset }}
 */
const useCompanyData = () => {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  /**
   * fetchData — fetches company review data
   * @param {string} companyName
   * @param {boolean} forceRefresh
   */
  const fetchData = useCallback(async (companyName, forceRefresh = false) => {
    if (!companyName?.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetchCompanyReviews(companyName.trim(), forceRefresh);
      setData(response.data);
    } catch (err) {
      setError(err.userMessage || 'Failed to load company data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * reset — clears all state
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchData, reset };
};

export default useCompanyData;
