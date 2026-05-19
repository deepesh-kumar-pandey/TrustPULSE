/**
 * pages/DashboardPage.jsx — Results dashboard
 *
 * Shows after a company search:
 * - Compact search bar at top
 * - RatingCard (metrics overview)
 * - Reviews grid with filtering + sorting
 * - Platform filter tabs
 * - Empty state (if no search yet)
 * - Loading skeleton (while fetching)
 * - Error state (if API failed)
 */

import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import RatingCard from '../components/RatingCard';
import ReviewCard from '../components/ReviewCard';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { FullScreenLoader, SkeletonGrid } from '../components/LoadingSpinner';

// Platform filter tabs
const PLATFORMS = ['All', 'Google', 'Trustpilot', 'Glassdoor', 'Indeed'];

// Sort options
const SORT_OPTIONS = [
  { value: 'date_desc',   label: 'Newest First' },
  { value: 'date_asc',    label: 'Oldest First' },
  { value: 'rating_desc', label: 'Highest Rating' },
  { value: 'rating_asc',  label: 'Lowest Rating' },
];

const DashboardPage = () => {
  const { companyData, loading, error, searchCompany, searchQuery } = useApp();

  // Filter and sort state
  const [activePlatform, setActivePlatform] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    if (!companyData?.reviews) return [];

    let reviews = [...companyData.reviews];

    // Filter by platform
    if (activePlatform !== 'All') {
      reviews = reviews.filter((r) => r.platform === activePlatform);
    }

    // Sort
    reviews.sort((a, b) => {
      switch (sortBy) {
        case 'date_desc':   return new Date(b.reviewDate) - new Date(a.reviewDate);
        case 'date_asc':    return new Date(a.reviewDate) - new Date(b.reviewDate);
        case 'rating_desc': return b.rating - a.rating;
        case 'rating_asc':  return a.rating - b.rating;
        default:            return 0;
      }
    });

    return reviews;
  }, [companyData?.reviews, activePlatform, sortBy]);

  // Platform counts for filter tabs
  const platformCounts = useMemo(() => {
    if (!companyData?.reviews) return {};
    const counts = { All: companyData.reviews.length };
    companyData.reviews.forEach((r) => {
      counts[r.platform] = (counts[r.platform] || 0) + 1;
    });
    return counts;
  }, [companyData?.reviews]);

  return (
    <MainLayout>

      {/* ── Top Search Bar ── */}
      <div className="mb-8">
        <SearchBar placeholder="Search another company..." />
      </div>

      {/* ── Loading State ── */}
      {loading && (
        <>
          <FullScreenLoader message={`Analyzing "${searchQuery || 'company'}"...`} />
          <div className="mt-8">
            <SkeletonGrid count={6} />
          </div>
        </>
      )}

      {/* ── Error State ── */}
      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => searchCompany(searchQuery)}
          retryLabel="Retry Search"
        />
      )}

      {/* ── Empty State (no search yet) ── */}
      {!loading && !error && !companyData && (
        <EmptyState />
      )}

      {/* ── Results ── */}
      {!loading && !error && companyData && (
        <div className="space-y-8 animate-fade-in">

          {/* Rating overview card */}
          <RatingCard companyData={companyData} />

          {/* Reviews section */}
          <div>
            {/* Section header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div>
                <p className="section-label mb-1">Review Feed</p>
                <h2 className="text-xl font-bold text-white">
                  {filteredReviews.length} Review{filteredReviews.length !== 1 ? 's' : ''}
                  {activePlatform !== 'All' && <span className="text-slate-400 font-normal text-base ml-2">from {activePlatform}</span>}
                </h2>
              </div>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-slate-600 text-slate-200 text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label="Sort reviews"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Platform filter tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {PLATFORMS.map((platform) => {
                const count = platformCounts[platform] || 0;
                const isActive = activePlatform === platform;
                return (
                  <button
                    key={platform}
                    onClick={() => setActivePlatform(platform)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-transparent border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {platform}
                    {count > 0 && (
                      <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-500' : 'bg-slate-700'}`}>
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reviews grid */}
            {filteredReviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredReviews.map((review, index) => (
                  <ReviewCard key={`${review.platform}-${index}`} review={review} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <p className="text-lg">No reviews found for <span className="text-slate-300 font-semibold">{activePlatform}</span></p>
                <p className="text-sm mt-1">Try selecting a different platform filter</p>
              </div>
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DashboardPage;
