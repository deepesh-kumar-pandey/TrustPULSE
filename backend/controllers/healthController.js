/**
 * controllers/healthController.js — API health check controller
 *
 * GET /api/health
 * Returns the current server and database status.
 * Useful for Docker health checks, load balancers, and monitoring tools.
 */

const mongoose = require('mongoose');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * @route   GET /api/health
 * @desc    Returns API health status
 * @access  Public
 */
const getHealth = asyncHandler(async (req, res) => {
  // Check MongoDB connection state
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const dbState = mongoose.connection.readyState;
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  res.status(200).json({
    success: true,
    status: 'ok',
    message: '🔍 TrustPULSE API is running',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || 'development',
    database: {
      status: dbStatus,
      state: dbState,
    },
    version: '1.0.0',
  });
});

module.exports = { getHealth };
