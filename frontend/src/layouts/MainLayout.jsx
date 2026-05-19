/**
 * layouts/MainLayout.jsx — App shell wrapper
 *
 * Wraps every page with:
 * - Navbar (sticky top)
 * - Main content area (flex-grow)
 * - Footer (sticks to bottom)
 */

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * MainLayout
 * @param {React.ReactNode} children — Page content
 */
const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
