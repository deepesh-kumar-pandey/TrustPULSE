/**
 * App.jsx — Root React component
 *
 * Sets up:
 * - AppProvider (global state context)
 * - React Router routes
 *
 * Routes:
 *   /            → HomePage
 *   /dashboard   → DashboardPage
 *   *            → ErrorPage (404)
 */

import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage      from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ErrorPage     from './pages/ErrorPage';

const App = () => {
  return (
    // AppProvider wraps everything so all pages can access global state
    <AppProvider>
      <Routes>
        {/* Home / landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Dashboard / results page */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* Catch-all 404 route — must be last */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
