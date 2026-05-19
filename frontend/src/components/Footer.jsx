/**
 * components/Footer.jsx — Site footer
 */

const Footer = () => (
  <footer className="border-t border-slate-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">
            <span className="text-gradient">Trust</span>
            <span className="text-white">PULSE</span>
          </span>
          <span className="text-slate-600 text-sm">·</span>
          <span className="text-slate-500 text-sm">Centralized Company Review Aggregator</span>
        </div>

        {/* Platform list */}
        <div className="flex items-center gap-4 text-slate-500 text-xs">
          <span>Aggregating from:</span>
          {['🔴 Google', '⭐ Trustpilot', '🏢 Glassdoor', '💼 Indeed'].map((p) => (
            <span key={p} className="text-slate-400">{p}</span>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} TrustPULSE. Built with MERN Stack.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
