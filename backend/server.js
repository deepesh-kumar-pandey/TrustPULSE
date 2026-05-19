/**
 * server.js — Entry point for TrustPULSE Express backend
 *
 * Responsibilities:
 *  - Load environment variables
 *  - Connect to MongoDB
 *  - Register middleware (CORS, JSON parsing, logging)
 *  - Mount API routes
 *  - Attach global error handler
 *  - Start HTTP server
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load .env variables before anything else
dotenv.config();

const connectDB = require('./config/db');
const companyRoutes = require('./routes/companyRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const logger = require('./utils/logger');

// ─── App Initialization ──────────────────────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

// ─── Connect to Database ─────────────────────────────────────────────────────
connectDB();

// ─── Global Middleware ───────────────────────────────────────────────────────

// Allow cross-origin requests from the React frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['http://localhost:3000']
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: false }));

// HTTP request logger — 'dev' format shows method, URL, status, response time
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── API Routes ──────────────────────────────────────────────────────────────

// Health check: GET /api/health
app.use('/api', healthRoutes);

// Company data: GET /api/company/:name | POST /api/cache/refresh
app.use('/api', companyRoutes);

// ─── Root route (sanity check) ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🔍 TrustPULSE API is running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/health',
      company: 'GET /api/company/:name',
      refresh: 'POST /api/cache/refresh',
    },
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Must be registered AFTER all routes
app.use(errorMiddleware);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  logger.info(`🚀 TrustPULSE server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

module.exports = app;
