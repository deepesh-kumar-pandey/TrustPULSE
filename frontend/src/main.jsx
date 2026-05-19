/**
 * src/main.jsx — React application entry point
 *
 * Mounts the React app into the #root DOM element.
 * Wraps the app with BrowserRouter for client-side routing.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
