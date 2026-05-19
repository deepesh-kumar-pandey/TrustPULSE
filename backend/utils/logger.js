/**
 * utils/logger.js — Simple console logger utility
 *
 * Provides colored, timestamped log output for different log levels.
 * This is a lightweight logger — in production you'd swap this for
 * a library like Winston or Pino.
 *
 * Usage:
 *   const logger = require('./utils/logger');
 *   logger.info('Server started');
 *   logger.error('Something went wrong');
 *   logger.warn('Cache miss');
 *   logger.debug('DB query result', data);
 */

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  gray: '\x1b[90m',
};

/**
 * Returns the current timestamp in a readable format
 * e.g. "2026-05-19 10:30:45"
 */
const getTimestamp = () => {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
};

const logger = {
  /**
   * INFO — general operational messages
   * @param {string} message
   */
  info: (message) => {
    console.log(`${colors.green}[INFO]${colors.reset} ${colors.gray}${getTimestamp()}${colors.reset} ${message}`);
  },

  /**
   * ERROR — critical failures that need immediate attention
   * @param {string} message
   * @param {Error|null} error - optional error object
   */
  error: (message, error = null) => {
    console.error(`${colors.red}[ERROR]${colors.reset} ${colors.gray}${getTimestamp()}${colors.reset} ${message}`);
    if (error && error.stack) {
      console.error(`${colors.red}${error.stack}${colors.reset}`);
    }
  },

  /**
   * WARN — non-critical issues that should be monitored
   * @param {string} message
   */
  warn: (message) => {
    console.warn(`${colors.yellow}[WARN]${colors.reset} ${colors.gray}${getTimestamp()}${colors.reset} ${message}`);
  },

  /**
   * DEBUG — detailed diagnostic information (only shown in development)
   * @param {string} message
   * @param {*} data - optional data to log
   */
  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${colors.magenta}[DEBUG]${colors.reset} ${colors.gray}${getTimestamp()}${colors.reset} ${message}`);
      if (data !== null) {
        console.log(colors.gray, JSON.stringify(data, null, 2), colors.reset);
      }
    }
  },

  /**
   * CACHE — cache-specific log events
   * @param {string} message
   */
  cache: (message) => {
    console.log(`${colors.cyan}[CACHE]${colors.reset} ${colors.gray}${getTimestamp()}${colors.reset} ${message}`);
  },
};

module.exports = logger;
