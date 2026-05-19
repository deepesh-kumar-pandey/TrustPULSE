/**
 * controllers/companyController.js — Company review data controller
 *
 * Handles the main API endpoint for fetching company review data.
 * Delegates all business logic to the cacheService.
 *
 * @route   GET /api/company/:name
 */

const asyncHandler = require('../middleware/asyncHandler');
const { getCompanyData } = require('../services/cacheService');
const logger = require('../utils/logger');

/**
 * @route   GET /api/company/:name
 * @desc    Fetch aggregated reviews for a company (with 24h cache)
 * @access  Public
 *
 * URL params:
 *   name (string) — Company name to search for
 *
 * Query params:
 *   refresh (boolean) — If 'true', bypass cache and re-fetch
 *
 * Response:
 * {
 *   success: true,
 *   data: {
 *     companyName: string,
 *     overallRating: number,
 *     totalReviews: number,
 *     platformRatings: { Google: 4.2, ... },
 *     reviews: [...],
 *     lastUpdated: Date,
 *     fromCache: boolean,
 *   }
 * }
 */
const getCompanyReviews = asyncHandler(async (req, res) => {
  const { name } = req.params;

  // Validate: company name must be provided
  if (!name || name.trim() === '') {
    res.status(400);
    throw new Error('Company name is required');
  }

  // Validate: company name length
  if (name.trim().length < 2) {
    res.status(400);
    throw new Error('Company name must be at least 2 characters');
  }

  if (name.trim().length > 100) {
    res.status(400);
    throw new Error('Company name cannot exceed 100 characters');
  }

  // Check for force refresh query param
  const forceRefresh = req.query.refresh === 'true';

  logger.info(`📨 GET /api/company/${name} | forceRefresh: ${forceRefresh}`);

  // Delegate to cache service (handles cache check + scraping + DB save)
  const companyData = await getCompanyData(name, forceRefresh);

  res.status(200).json({
    success: true,
    data: companyData,
  });
});

module.exports = { getCompanyReviews };
