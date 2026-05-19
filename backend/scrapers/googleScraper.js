/**
 * scrapers/googleScraper.js — Mock Google Reviews scraper
 *
 * In a real production system, this would use Puppeteer/Playwright
 * to scrape Google Maps reviews. Here we return realistic mock data
 * that follows the STANDARD REVIEW JSON SCHEMA exactly.
 *
 * Standard schema per review:
 * {
 *   platform:     string
 *   reviewerName: string
 *   rating:       number (1-5)
 *   reviewText:   string
 *   reviewDate:   string (YYYY-MM-DD)
 * }
 */

/**
 * Generates mock Google reviews for a given company name.
 * Returns a Promise (simulates async network/scrape call).
 *
 * @param {string} companyName - The company to fetch reviews for
 * @returns {Promise<Array>} - Array of review objects
 */
const scrapeGoogle = (companyName) => {
  return new Promise((resolve) => {
    // Simulate network delay (200-600ms)
    const delay = Math.floor(Math.random() * 400) + 200;

    setTimeout(() => {
      const reviews = [
        {
          platform: 'Google',
          reviewerName: 'Rahul Sharma',
          rating: 4.5,
          reviewText: `${companyName} has been an excellent experience overall. Their customer support team is very responsive and resolved my issues quickly. Highly recommended for anyone looking for reliable service.`,
          reviewDate: '2026-05-10',
        },
        {
          platform: 'Google',
          reviewerName: 'Priya Mehta',
          rating: 5.0,
          reviewText: `Absolutely love working with ${companyName}! The quality of their products and services is top-notch. I've been a customer for 3 years and never been disappointed.`,
          reviewDate: '2026-05-05',
        },
        {
          platform: 'Google',
          reviewerName: 'Arjun Patel',
          rating: 3.5,
          reviewText: `${companyName} is decent but there is room for improvement. The product is good but the delivery was delayed by a week. Customer service was helpful once I reached out.`,
          reviewDate: '2026-04-28',
        },
        {
          platform: 'Google',
          reviewerName: 'Sneha Kapoor',
          rating: 4.0,
          reviewText: `Good overall experience with ${companyName}. The onboarding process was smooth and the team was professional. Would suggest better communication during the process.`,
          reviewDate: '2026-04-20',
        },
        {
          platform: 'Google',
          reviewerName: 'Vikram Nair',
          rating: 5.0,
          reviewText: `${companyName} exceeded my expectations! Best decision I made to choose them. The entire process from start to finish was seamless. 5 stars without any doubt.`,
          reviewDate: '2026-04-15',
        },
      ];

      const { adjustRating } = require('../utils/mockDataHelper');
      reviews.forEach(r => r.rating = adjustRating(r.rating, companyName, 'Google', 1));

      resolve(reviews);
    }, delay);
  });
};

module.exports = { scrapeGoogle };
