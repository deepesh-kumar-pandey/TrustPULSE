/**
 * scrapers/trustpilotScraper.js — Mock Trustpilot Reviews scraper
 *
 * Returns realistic mock Trustpilot reviews for a given company.
 * Follows the STANDARD REVIEW JSON SCHEMA exactly.
 *
 * @param {string} companyName
 * @returns {Promise<Array>}
 */

const scrapeTrustpilot = (companyName) => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 400) + 200;

    setTimeout(() => {
      const reviews = [
        {
          platform: 'Trustpilot',
          reviewerName: 'Emily Watson',
          rating: 4.0,
          reviewText: `I've been using ${companyName}'s services for 6 months. Overall the experience has been positive. Their platform is intuitive and the pricing is fair. A few minor glitches but nothing major.`,
          reviewDate: '2026-05-12',
        },
        {
          platform: 'Trustpilot',
          reviewerName: 'James O\'Brien',
          rating: 3.0,
          reviewText: `Mixed experience with ${companyName}. Some things work great, others need a lot of improvement. The support team is responsive but the product itself has some bugs that have been unresolved for months.`,
          reviewDate: '2026-05-02',
        },
        {
          platform: 'Trustpilot',
          reviewerName: 'Sophie Anderson',
          rating: 5.0,
          reviewText: `Outstanding service from ${companyName}! I had a complex issue and their team went above and beyond to solve it. This is what customer service should look like. Truly impressed.`,
          reviewDate: '2026-04-25',
        },
        {
          platform: 'Trustpilot',
          reviewerName: 'Marco Rossi',
          rating: 4.0,
          reviewText: `${companyName} delivers on its promises. The product quality is consistent and the team is professional. Delivery could be faster but the quality makes up for it.`,
          reviewDate: '2026-04-18',
        },
        {
          platform: 'Trustpilot',
          reviewerName: 'Aisha Johnson',
          rating: 3.5,
          reviewText: `Average experience. ${companyName} has potential but needs to work on its user interface and communication. The core product is solid but the experience around it needs polish.`,
          reviewDate: '2026-04-10',
        },
      ];

      const { adjustRating } = require('../utils/mockDataHelper');
      reviews.forEach(r => r.rating = adjustRating(r.rating, companyName, 'Trustpilot', 2));

      resolve(reviews);
    }, delay);
  });
};

module.exports = { scrapeTrustpilot };
