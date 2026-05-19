/**
 * components/SearchBar.jsx — Company search input
 *
 * Features:
 * - Controlled input with validation
 * - Loading state (disables button + shows spinner)
 * - Enter key submission
 * - Clear button
 * - Keyboard shortcut hint
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';

// ── Icons ─────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19A8 8 0 113 11a8 8 0 018 8z" />
  </svg>
);

const ClearIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/**
 * SearchBar
 * @param {boolean} large - Use large hero variant on home page
 * @param {string} placeholder - Custom placeholder text
 */
const SearchBar = ({ large = false, placeholder = 'Search a company... e.g. Google, Amazon' }) => {
  const { searchQuery, setSearchQuery, searchCompany, loading } = useApp();
  const [inputValue, setInputValue] = useState(searchQuery || '');
  const [validationError, setValidationError] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Auto-focus on mount (hero search bar)
  useEffect(() => {
    if (large && inputRef.current) {
      inputRef.current.focus();
    }
  }, [large]);

  // Validate input
  const validate = (value) => {
    if (!value.trim()) {
      return 'Please enter a company name';
    }
    if (value.trim().length < 2) {
      return 'Company name must be at least 2 characters';
    }
    if (value.trim().length > 100) {
      return 'Company name is too long';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e?.preventDefault();

    const error = validate(inputValue);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError('');
    setSearchQuery(inputValue);

    // Navigate to dashboard page first
    navigate('/dashboard');

    // Then trigger the search
    await searchCompany(inputValue);
  };

  // Clear input
  const handleClear = () => {
    setInputValue('');
    setValidationError('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  // Input size classes based on the `large` prop
  const inputClass = large
    ? 'bg-slate-800/80 border border-slate-600 text-slate-100 placeholder-slate-400 pl-12 pr-12 py-4 rounded-2xl w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
    : 'input-field pl-10 pr-10 py-3';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center gap-3">
        {/* Search input wrapper */}
        <div className="relative flex-1">
          {/* Search icon */}
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${large ? '' : 'left-3'}`}>
            <SearchIcon />
          </div>

          <input
            ref={inputRef}
            id="company-search-input"
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (validationError) setValidationError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={placeholder}
            className={inputClass}
            disabled={loading}
            aria-label="Company name search"
            autoComplete="off"
          />

          {/* Clear button — shows only when there's input */}
          {inputValue && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-0.5 rounded"
              aria-label="Clear search"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          id="search-submit-btn"
          className={`btn-primary flex items-center gap-2 whitespace-nowrap ${large ? 'px-8 py-4 text-base rounded-2xl' : ''}`}
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <SearchIcon />
              <span>{large ? 'Analyze Company' : 'Search'}</span>
            </>
          )}
        </button>
      </div>

      {/* Validation error */}
      {validationError && (
        <p className="mt-2 text-red-400 text-sm flex items-center gap-1.5 animate-fade-in">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {validationError}
        </p>
      )}

      {/* Hint text on hero */}
      {large && !validationError && (
        <p className="mt-3 text-slate-500 text-sm text-center">
          Aggregates data from Google · Trustpilot · Glassdoor · Indeed
        </p>
      )}
    </form>
  );
};

export default SearchBar;
