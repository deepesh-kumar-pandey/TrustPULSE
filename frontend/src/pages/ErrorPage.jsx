/**
 * pages/ErrorPage.jsx — 404 / generic error page
 *
 * Shown when:
 * - Route doesn't exist (404)
 * - App encounters a fatal rendering error
 */

import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const ErrorPage = () => (
  <MainLayout>
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">

      {/* ── 404 Visual ── */}
      <div className="relative mb-8">
        <div className="text-9xl font-black text-slate-800 select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl">🔍</div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-10">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/" className="btn-primary">
          ← Back to Home
        </Link>
        <Link to="/dashboard" className="btn-secondary">
          Go to Dashboard
        </Link>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-14">
        {['bg-blue-400', 'bg-cyan-400', 'bg-slate-600'].map((color, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${color} animate-bounce`} style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  </MainLayout>
);

export default ErrorPage;
