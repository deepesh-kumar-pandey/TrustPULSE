const { runAllScrapers } = require('./scraperService');
const { calculateOverallRating, calculatePlatformRatings } = require('../utils/ratingCalculator');
const logger = require('../utils/logger');
const fs = require('fs');
const path = require('path');

const getCompanyData = async (rawCompanyName, forceRefresh = false) => {
  const companyName = rawCompanyName.trim().toLowerCase();
  const displayName = rawCompanyName.trim();

  logger.info(`📥 Received request for company: "${displayName}"`);
  logger.info(`⚠️ MongoDB cache bypassed. Fetching fresh data...`);

  const allReviews = await runAllScrapers(displayName);

  if (allReviews.length === 0) {
    throw new Error(`No reviews found for company: "${displayName}". Please try a different company name.`);
  }

  const overallRating = calculateOverallRating(allReviews);
  const platformRatings = calculatePlatformRatings(allReviews);

  const result = {
    companyName: displayName,
    overallRating,
    totalReviews: allReviews.length,
    platformRatings,
    reviews: allReviews,
    lastUpdated: new Date(),
    fromCache: false,
  };

  // Write to temporary log file instead of MongoDB
  const logFile = path.join(__dirname, '../log.output');
  fs.writeFileSync(logFile, JSON.stringify(result, null, 2));
  logger.info(`💾 Saved data to temporary file: log.output`);

  return result;
};

module.exports = { getCompanyData };
