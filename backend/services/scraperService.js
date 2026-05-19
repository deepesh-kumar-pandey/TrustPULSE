/**
 * services/scraperService.js — Orchestrates all platform scrapers
 *
 * This service:
 * 1. Calls all 4 scrapers in parallel (using Promise.allSettled)
 * 2. Handles individual scraper failures gracefully
 * 3. Merges all results into a single flat array
 * 4. Returns the unified reviews array
 *
 * Using Promise.allSettled instead of Promise.all means
 * if one scraper fails, the others still return data.
 */

const { scrapeGoogle } = require('../scrapers/googleScraper');
const { scrapeTrustpilot } = require('../scrapers/trustpilotScraper');
const { scrapeGlassdoor } = require('../scrapers/glassdoorScraper');
const { scrapeIndeed } = require('../scrapers/indeedScraper');
const logger = require('../utils/logger');

/**
 * runAllScrapers
 * Runs all platform scrapers in parallel and returns merged results.
 *
 * @param {string} companyName - The company to fetch reviews for
 * @returns {Promise<Array>} - Flat array of all review objects from all platforms
 */
const runAllScrapers = async (companyName) => {
  logger.info(`🔍 Starting scrapers for company: "${companyName}"`);

  // Run all scrapers simultaneously using Promise.allSettled
  // This ensures one failure doesn't block other platforms
  const scraperResults = await Promise.allSettled([
    scrapeGoogle(companyName),
    scrapeTrustpilot(companyName),
    scrapeGlassdoor(companyName),
    scrapeIndeed(companyName),
  ]);

  const platformNames = ['Google', 'Trustpilot', 'Glassdoor', 'Indeed'];
  const allReviews = [];

  // Process each scraper result
  scraperResults.forEach((result, index) => {
    const platform = platformNames[index];

    if (result.status === 'fulfilled') {
      const reviews = result.value;
      logger.info(`✅ ${platform}: fetched ${reviews.length} reviews`);
      allReviews.push(...reviews);
    } else {
      // Log the failure but continue — partial data is better than no data
      logger.error(`❌ ${platform} scraper failed: ${result.reason?.message || 'Unknown error'}`);
    }
  });

  logger.info(`📊 Total reviews collected: ${allReviews.length}`);
  return allReviews;
};

module.exports = { runAllScrapers };
