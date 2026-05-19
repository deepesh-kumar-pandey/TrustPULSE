/**
 * utils/ratingCalculator.js — Mathematical rating aggregation utility
 *
 * IMPORTANT: This system uses ONLY pure mathematics.
 * NO AI, NO machine learning, NO sentiment analysis.
 *
 * Formula:
 *   overallAverage = (sum of all ratings) / totalReviews
 *
 * Example:
 *   Google      ratings avg = 4.2
 *   Trustpilot  ratings avg = 3.8
 *   Indeed      ratings avg = 4.0
 *   Glassdoor   ratings avg = 3.9
 *
 *   But we average ALL individual review ratings, not platform averages:
 *   sum(all ratings) / count(all reviews)
 */

const logger = require('./logger');

/**
 * calculateOverallRating
 * Computes the overall average rating from an array of review objects.
 *
 * @param {Array} reviews - Array of review objects with a `rating` field
 * @returns {number} - Overall average rating rounded to 1 decimal place (e.g. 4.1)
 */
const calculateOverallRating = (reviews) => {
  // Guard: if no reviews, return 0
  if (!reviews || reviews.length === 0) {
    logger.warn('calculateOverallRating: No reviews provided, returning 0');
    return 0;
  }

  // Sum all numeric ratings
  const totalRatingSum = reviews.reduce((sum, review) => {
    const rating = parseFloat(review.rating);

    // Skip invalid ratings (NaN, out of range)
    if (isNaN(rating) || rating < 1 || rating > 5) {
      logger.warn(`Skipping invalid rating: ${review.rating}`);
      return sum;
    }

    return sum + rating;
  }, 0);

  const validReviewCount = reviews.filter((r) => {
    const rating = parseFloat(r.rating);
    return !isNaN(rating) && rating >= 1 && rating <= 5;
  }).length;

  if (validReviewCount === 0) return 0;

  // Mathematical average
  const average = totalRatingSum / validReviewCount;

  // Round to 1 decimal place
  return Math.round(average * 10) / 10;
};

/**
 * calculatePlatformRatings
 * Computes the average rating per platform from the reviews array.
 *
 * @param {Array} reviews - Array of review objects
 * @returns {Object} - Map of platform → average rating, e.g. { Google: 4.2, Trustpilot: 3.8 }
 */
const calculatePlatformRatings = (reviews) => {
  if (!reviews || reviews.length === 0) return {};

  // Group reviews by platform
  const platformGroups = {};

  reviews.forEach((review) => {
    const { platform, rating } = review;
    if (!platform) return;

    if (!platformGroups[platform]) {
      platformGroups[platform] = { sum: 0, count: 0 };
    }

    const parsedRating = parseFloat(rating);
    if (!isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5) {
      platformGroups[platform].sum += parsedRating;
      platformGroups[platform].count += 1;
    }
  });

  // Calculate average per platform
  const platformRatings = {};
  Object.entries(platformGroups).forEach(([platform, { sum, count }]) => {
    platformRatings[platform] = Math.round((sum / count) * 10) / 10;
  });

  logger.debug('Platform ratings calculated', platformRatings);
  return platformRatings;
};

/**
 * getRatingLabel
 * Returns a descriptive label based on the numeric rating.
 *
 * @param {number} rating
 * @returns {string} - e.g. "Excellent", "Good", "Average", "Poor"
 */
const getRatingLabel = (rating) => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.0) return 'Good';
  if (rating >= 2.0) return 'Average';
  return 'Poor';
};

module.exports = {
  calculateOverallRating,
  calculatePlatformRatings,
  getRatingLabel,
};
