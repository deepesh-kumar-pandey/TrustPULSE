/**
 * components/RatingCard.jsx — Dashboard metrics overview
 *
 * Displays:
 * - Overall rating with large number + star visualization
 * - Total review count
 * - Platform count
 * - Per-platform rating breakdown
 * - Cache status indicator
 * - Rating label (Excellent / Very Good / Good / Average / Poor)
 */

import PlatformBadge from './PlatformBadge';

// ── Star Rating Display ────────────────────────────────────────────────────────
const StarRating = ({ rating, size = 'md' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-7 h-7' };
  const starSize = sizes[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const halfFilled = !filled && rating >= star - 0.5;

        return (
          <svg key={star} className={`${starSize} ${filled || halfFilled ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

// ── Rating label helper ────────────────────────────────────────────────────────
const getRatingLabel = (rating) => {
  if (rating >= 4.5) return { label: 'Excellent', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (rating >= 4.0) return { label: 'Very Good', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
  if (rating >= 3.0) return { label: 'Good',      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
  if (rating >= 2.0) return { label: 'Average',   color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  return               { label: 'Poor',           color: 'text-red-400 bg-red-500/10 border-red-500/30' };
};

/**
 * RatingCard
 * @param {Object} companyData — full company data object from API
 */
const RatingCard = ({ companyData }) => {
  const {
    companyName,
    overallRating,
    totalReviews,
    platformRatings = {},
    lastUpdated,
    fromCache,
  } = companyData;

  const { label, color } = getRatingLabel(overallRating);
  const platformCount = Object.keys(platformRatings).length;

  // Format date
  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

  return (
    <div className="glass-card p-6 md:p-8 animate-slide-up">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <p className="section-label mb-1">Company Analysis</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white capitalize">{companyName}</h2>
        </div>

        {/* Cache badge */}
        <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${
          fromCache
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${fromCache ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
          {fromCache ? 'Cached' : 'Fresh Data'}
        </div>
      </div>

      {/* ── Main Metrics Row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

        {/* Overall Rating */}
        <div className="sm:col-span-1 flex flex-col items-center sm:items-start bg-slate-700/30 rounded-2xl p-5 border border-slate-700/50">
          <p className="section-label mb-2">Overall Rating</p>
          <div className="text-6xl font-black text-white mb-2 leading-none">{overallRating}</div>
          <StarRating rating={overallRating} size="md" />
          <span className={`mt-3 text-xs font-bold px-3 py-1 rounded-full border ${color}`}>{label}</span>
        </div>

        {/* Review Count */}
        <div className="flex flex-col items-center sm:items-start bg-slate-700/30 rounded-2xl p-5 border border-slate-700/50">
          <p className="section-label mb-2">Total Reviews</p>
          <div className="text-5xl font-black text-white mb-1 leading-none">{totalReviews}</div>
          <p className="text-slate-400 text-sm">reviews aggregated</p>
          <p className="text-slate-500 text-xs mt-1">across {platformCount} platforms</p>
        </div>

        {/* Platforms */}
        <div className="flex flex-col bg-slate-700/30 rounded-2xl p-5 border border-slate-700/50">
          <p className="section-label mb-3">Platform Breakdown</p>
          <div className="space-y-2.5 flex-1">
            {Object.entries(platformRatings).map(([platform, rating]) => (
              <div key={platform} className="flex items-center justify-between">
                <PlatformBadge platform={platform} size="sm" />
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-700"
                      style={{ width: `${(rating / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-white font-semibold text-sm w-6 text-right">{rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer: last updated ── */}
      <div className="flex items-center gap-2 text-slate-500 text-xs border-t border-slate-700/50 pt-4">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Last updated: {formattedDate}</span>
      </div>
    </div>
  );
};

export default RatingCard;
