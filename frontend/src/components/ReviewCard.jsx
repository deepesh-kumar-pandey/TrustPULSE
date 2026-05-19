/**
 * components/ReviewCard.jsx — Individual review card
 *
 * Displays a single review with:
 * - Platform badge
 * - Star rating
 * - Reviewer name + avatar initial
 * - Review text (collapsible if long)
 * - Review date
 */

import { useState } from 'react';
import PlatformBadge from './PlatformBadge';

// ── Avatar colors per platform ────────────────────────────────────────────────
const AVATAR_COLORS = {
  Google:     'from-red-500 to-orange-500',
  Trustpilot: 'from-emerald-500 to-green-500',
  Glassdoor:  'from-green-500 to-teal-500',
  Indeed:     'from-violet-500 to-purple-500',
};

// ── Star Rating (small, inline) ───────────────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-3.5 h-3.5 ${rating >= star ? 'text-amber-400' : 'text-slate-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="ml-1 text-slate-400 text-xs font-semibold">{rating.toFixed(1)}</span>
  </div>
);

// ── Format date string ─────────────────────────────────────────────────────────
const formatDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

/**
 * ReviewCard
 * @param {Object} review — review object from API
 * @param {number} index — card index for animation delay
 */
const ReviewCard = ({ review, index = 0 }) => {
  const { platform, reviewerName, rating, reviewText, reviewDate } = review;
  const [expanded, setExpanded] = useState(false);

  // Truncate long reviews
  const MAX_CHARS = 180;
  const isLong = reviewText?.length > MAX_CHARS;
  const displayText = isLong && !expanded
    ? reviewText.slice(0, MAX_CHARS) + '...'
    : reviewText;

  // Get first letter of reviewer name for avatar
  const initial = reviewerName?.charAt(0)?.toUpperCase() || '?';
  const avatarGradient = AVATAR_COLORS[platform] || 'from-blue-500 to-cyan-500';

  return (
    <div
      className="glass-card p-5 hover:border-slate-600/70 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover animate-slide-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* ── Header: Platform badge + rating ── */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <PlatformBadge platform={platform} />
        <StarRating rating={rating} />
      </div>

      {/* ── Reviewer info ── */}
      <div className="flex items-center gap-3 mb-3">
        {/* Avatar circle with gradient */}
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
          {initial}
        </div>
        <div>
          <p className="text-slate-200 font-semibold text-sm leading-tight">{reviewerName}</p>
          <p className="text-slate-500 text-xs">{formatDate(reviewDate)}</p>
        </div>
      </div>

      {/* ── Review text ── */}
      <p className="text-slate-300 text-sm leading-relaxed">
        {displayText}
      </p>

      {/* ── Read more / less toggle ── */}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
        >
          {expanded ? '← Show less' : 'Read more →'}
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
