/**
 * components/LoadingSpinner.jsx — Loading states
 *
 * Includes:
 * 1. FullScreenLoader — centered spinner for initial data fetch
 * 2. SkeletonCard — shimmer placeholder for review cards
 * 3. SkeletonMetrics — shimmer placeholder for metric cards
 */

// ── Full Screen Spinner ────────────────────────────────────────────────────────
export const FullScreenLoader = ({ message = 'Fetching reviews...' }) => (
  <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
    {/* Outer spinning ring */}
    <div className="relative w-20 h-20 mb-6">
      <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
      <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
      <div className="absolute inset-3 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
    </div>

    <p className="text-slate-300 font-semibold text-lg">{message}</p>
    <p className="text-slate-500 text-sm mt-1.5">Checking Google · Trustpilot · Glassdoor · Indeed</p>

    {/* Animated platform dots */}
    <div className="flex gap-2 mt-5">
      {['bg-red-400', 'bg-emerald-400', 'bg-green-400', 'bg-violet-400'].map((color, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${color} animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);

// ── Skeleton Review Card ───────────────────────────────────────────────────────
export const SkeletonCard = () => (
  <div className="glass-card p-5 space-y-4 animate-pulse">
    {/* Header row: badge + rating */}
    <div className="flex items-center justify-between">
      <div className="skeleton h-5 w-24 rounded-full" />
      <div className="skeleton h-5 w-16 rounded-lg" />
    </div>
    {/* Reviewer name */}
    <div className="skeleton h-4 w-32 rounded" />
    {/* Review text lines */}
    <div className="space-y-2">
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-5/6 rounded" />
      <div className="skeleton h-3 w-4/6 rounded" />
    </div>
    {/* Footer: date */}
    <div className="skeleton h-3 w-24 rounded" />
  </div>
);

// ── Skeleton Metric Card ───────────────────────────────────────────────────────
export const SkeletonMetric = () => (
  <div className="glass-card p-6 animate-pulse">
    <div className="skeleton h-4 w-24 rounded mb-4" />
    <div className="skeleton h-10 w-20 rounded mb-2" />
    <div className="skeleton h-3 w-32 rounded" />
  </div>
);

// ── Skeleton Review Grid ───────────────────────────────────────────────────────
export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// Default export: inline spinner for buttons/small areas
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8' };
  return (
    <svg
      className={`animate-spin text-current ${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
};

export default LoadingSpinner;
