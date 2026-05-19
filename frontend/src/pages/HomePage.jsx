/**
 * pages/HomePage.jsx — Landing page
 *
 * Hero section with:
 * - Animated headline
 * - Search bar (large variant)
 * - Platform icons
 * - Feature highlights
 * - Stats row
 */

import SearchBar from '../components/SearchBar';
import MainLayout from '../layouts/MainLayout';

// ── Feature cards data ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: '🔍',
    title: 'Multi-Platform Aggregation',
    desc: 'Collects reviews from Google, Trustpilot, Glassdoor, and Indeed in one request.',
  },
  {
    icon: '📊',
    title: 'Mathematical Averaging',
    desc: 'Pure data science — no AI or sentiment analysis. Just accurate math.',
  },
  {
    icon: '⚡',
    title: '24-Hour Smart Cache',
    desc: 'MongoDB-backed caching delivers instant results for repeated searches.',
  },
  {
    icon: '📱',
    title: 'Responsive Dashboard',
    desc: 'Professional dashboard UI that works seamlessly on any device.',
  },
];

const STATS = [
  { value: '4',    label: 'Platforms' },
  { value: '24h',  label: 'Cache TTL' },
  { value: '100%', label: 'Data Driven' },
  { value: '0',    label: 'AI Used' },
];

const HomePage = () => {
  return (
    <MainLayout>

      {/* ── Hero Section ── */}
      <section className="py-12 md:py-20 text-center animate-fade-in">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold px-5 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          Real-time review aggregation from 4 major platforms
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          One Search.{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">Complete Picture.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          TrustPULSE aggregates company reviews from Google, Trustpilot, Glassdoor, and Indeed
          into a single consolidated trust dashboard.
        </p>

        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar large placeholder="Search any company... e.g. Google, Amazon, Microsoft" />
        </div>

        {/* Platform pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[
            { icon: '🔴', name: 'Google',     color: 'border-red-500/30 text-red-400 bg-red-500/5' },
            { icon: '⭐', name: 'Trustpilot', color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' },
            { icon: '🏢', name: 'Glassdoor',  color: 'border-green-500/30 text-green-400 bg-green-500/5' },
            { icon: '💼', name: 'Indeed',     color: 'border-violet-500/30 text-violet-400 bg-violet-500/5' },
          ].map(({ icon, name, color }) => (
            <span
              key={name}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${color}`}
            >
              <span>{icon}</span>{name}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats Row ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {STATS.map(({ value, label }, i) => (
          <div
            key={label}
            className="glass-card p-5 text-center animate-slide-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="text-3xl font-black text-gradient mb-1">{value}</div>
            <div className="text-slate-400 text-sm">{label}</div>
          </div>
        ))}
      </section>

      {/* ── Features Grid ── */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <p className="section-label mb-2">Why TrustPULSE</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Built for clarity, not complexity</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon, title, desc }, i) => (
            <div
              key={title}
              className="glass-card p-6 hover:border-slate-600/60 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="glass-card p-8 md:p-12 mb-8">
        <div className="text-center mb-10">
          <p className="section-label mb-2">How It Works</p>
          <h2 className="text-2xl font-bold text-white">3 simple steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Enter Company Name', desc: 'Type any company name in the search bar above.' },
            { step: '02', title: 'We Aggregate',       desc: 'Our system fetches reviews from all 4 platforms simultaneously.' },
            { step: '03', title: 'View Dashboard',     desc: 'See ratings, reviews, and platform breakdowns in one clean view.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-blue-600/20 border-2 border-blue-500/40 rounded-2xl flex items-center justify-center text-blue-400 font-black text-lg mb-4">
                {step}
              </div>
              <h3 className="text-white font-semibold mb-2">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

    </MainLayout>
  );
};

export default HomePage;
