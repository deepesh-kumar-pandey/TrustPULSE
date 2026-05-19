/**
 * components/EmptyState.jsx — Empty state UI
 *
 * Shown when the user hasn't searched for a company yet.
 * Includes:
 * - Illustrated graphic
 * - Call-to-action text
 * - Platform logos list
 */

const PLATFORMS = [
  { name: 'Google',     icon: '🔴', desc: 'Customer Reviews' },
  { name: 'Trustpilot', icon: '⭐', desc: 'Business Reviews' },
  { name: 'Glassdoor',  icon: '🏢', desc: 'Employee Reviews' },
  { name: 'Indeed',     icon: '💼', desc: 'Job & Company' },
];

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">

    {/* ── Illustration ── */}
    <div className="relative mb-10">
      {/* Outer glow ring */}
      <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-blue-500/10 blur-xl" />

      {/* Icon container */}
      <div className="relative w-28 h-28 bg-slate-800/80 border-2 border-slate-700/50 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
        <svg className="w-14 h-14 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
    </div>

    {/* ── Text content ── */}
    <h3 className="text-2xl font-bold text-white mb-3">
      Start your company analysis
    </h3>
    <p className="text-slate-400 text-base max-w-md leading-relaxed mb-10">
      Enter any company name above to get a consolidated trust score
      aggregated from all major review platforms.
    </p>

    {/* ── Platform cards ── */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl w-full">
      {PLATFORMS.map((platform, i) => (
        <div
          key={platform.name}
          className="glass-card p-4 text-center hover:border-slate-600/60 transition-all duration-200 animate-slide-up"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="text-2xl mb-2">{platform.icon}</div>
          <p className="text-slate-200 text-sm font-semibold">{platform.name}</p>
          <p className="text-slate-500 text-xs mt-0.5">{platform.desc}</p>
        </div>
      ))}
    </div>

    {/* ── Tip ── */}
    <p className="mt-8 text-slate-600 text-sm">
      💡 Try searching for: <span className="text-slate-400 font-medium">Google</span>, <span className="text-slate-400 font-medium">Amazon</span>, or <span className="text-slate-400 font-medium">Microsoft</span>
    </p>
  </div>
);

export default EmptyState;
