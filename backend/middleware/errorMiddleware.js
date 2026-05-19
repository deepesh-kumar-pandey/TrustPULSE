/**
 * middleware/errorMiddleware.js — Global Express error handler
 *
 * This is the LAST middleware registered in server.js.
 * It receives errors forwarded via next(err) from any route or middleware.
 *
 * Responsibilities:
 * - Determine appropriate HTTP status code
 * - Format consistent error response JSON
 * - Log errors to console
 * - Hide internal error details in production
 */

const logger = require('../utils/logger');

/**
 * errorMiddleware
 * Express error handling middleware (must have 4 parameters).
 *
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function (required for error middleware signature)
 */
const errorMiddleware = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Log the full error details server-side
  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, err);

  // Determine HTTP status code:
  // Use err.statusCode if set, or check for Mongoose validation errors,
  // or fall back to 500 (Internal Server Error)
  let statusCode = err.statusCode || err.status || 500;

  // Mongoose Validation Error → 400 Bad Request
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  // Mongoose Cast Error (invalid ObjectId) → 400 Bad Request
  if (err.name === 'CastError') {
    statusCode = 400;
    err.message = `Invalid value for field: ${err.path}`;
  }

  // MongoDB Duplicate Key Error → 409 Conflict
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    err.message = `Duplicate value for ${field}`;
  }

  // Build the error response
  const errorResponse = {
    success: false,
    message: err.message || 'Internal Server Error',
    // Only include stack trace in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;
