/**
 * middleware/asyncHandler.js — Async route handler wrapper
 *
 * Wraps async Express route handlers so we don't need try/catch
 * in every controller. Automatically catches rejected Promises
 * and forwards the error to Express's global error handler.
 *
 * Usage:
 *   router.get('/route', asyncHandler(async (req, res) => {
 *     const data = await someAsyncOperation();
 *     res.json(data);
 *   }));
 *
 * Without this wrapper you'd need:
 *   router.get('/route', async (req, res, next) => {
 *     try {
 *       const data = await someAsyncOperation();
 *       res.json(data);
 *     } catch (err) {
 *       next(err); // manually forward error
 *     }
 *   });
 *
 * @param {Function} fn - Async route handler function
 * @returns {Function} - Express middleware that auto-catches errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
