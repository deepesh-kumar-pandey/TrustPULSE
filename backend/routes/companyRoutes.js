/**
 * routes/companyRoutes.js — Company and cache routes
 *
 * Mounts:
 *   GET  /api/company/:name      — Fetch company reviews (with cache)
 *   POST /api/cache/refresh      — Force refresh company cache
 *   GET  /api/cache/status/:name — Get cache metadata for a company
 */

const express = require('express');
const router = express.Router();
const { getCompanyReviews } = require('../controllers/companyController');
const { refreshCache, getCacheStatus } = require('../controllers/cacheController');

// ─── Company Routes ──────────────────────────────────────────────────────────

/**
 * @route   GET /api/company/:name
 * @desc    Get aggregated reviews for a company (with 24h cache)
 * @example GET /api/company/Google
 * @example GET /api/company/Google?refresh=true  (force re-scrape)
 */
router.get('/company/:name', getCompanyReviews);

// ─── Cache Routes ─────────────────────────────────────────────────────────────

/**
 * @route   POST /api/cache/refresh
 * @desc    Force refresh cached data for a company
 * @body    { "companyName": "Google" }
 */
router.post('/cache/refresh', refreshCache);

/**
 * @route   GET /api/cache/status/:name
 * @desc    Check cache validity for a company
 * @example GET /api/cache/status/Google
 */
router.get('/cache/status/:name', getCacheStatus);

module.exports = router;
