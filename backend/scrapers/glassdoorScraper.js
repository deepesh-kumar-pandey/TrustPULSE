/**
 * scrapers/glassdoorScraper.js — Mock Glassdoor Reviews scraper
 *
 * Returns employee/company reviews as they would appear on Glassdoor.
 * Follows the STANDARD REVIEW JSON SCHEMA exactly.
 *
 * @param {string} companyName
 * @returns {Promise<Array>}
 */

const scrapeGlassdoor = (companyName) => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 400) + 200;

    setTimeout(() => {
      const reviews = [
        {
          platform: 'Glassdoor',
          reviewerName: 'Current Employee',
          rating: 4.0,
          reviewText: `Working at ${companyName} has been a great experience. The work culture is collaborative and management is supportive. Good work-life balance and the compensation is competitive. Highly recommend for software engineers.`,
          reviewDate: '2026-05-08',
        },
        {
          platform: 'Glassdoor',
          reviewerName: 'Former Employee',
          rating: 2.5,
          reviewText: `${companyName} has a lot of potential but management needs serious improvement. The leadership style is micromanaging and growth opportunities are limited. Left after 2 years due to lack of career progression.`,
          reviewDate: '2026-04-30',
        },
        {
          platform: 'Glassdoor',
          reviewerName: 'Senior Developer',
          rating: 4.5,
          reviewText: `Great technical team at ${companyName}. The engineering culture is strong with a focus on quality code and best practices. Leadership genuinely cares about employee development. Flexible remote work policy is a big plus.`,
          reviewDate: '2026-04-22',
        },
        {
          platform: 'Glassdoor',
          reviewerName: 'Product Manager',
          rating: 3.5,
          reviewText: `${companyName} is a decent place to work. The product vision is clear and the team is talented. However, processes can be slow and there is sometimes a disconnect between departments.`,
          reviewDate: '2026-04-14',
        },
        {
          platform: 'Glassdoor',
          reviewerName: 'Marketing Analyst',
          rating: 4.0,
          reviewText: `Positive experience overall at ${companyName}. The company invests in its employees through training and development. Benefits package is comprehensive. Culture could be more inclusive at senior levels.`,
          reviewDate: '2026-04-06',
        },
      ];

      const { adjustRating } = require('../utils/mockDataHelper');
      reviews.forEach(r => r.rating = adjustRating(r.rating, companyName, 'Glassdoor', 3));

      resolve(reviews);
    }, delay);
  });
};

module.exports = { scrapeGlassdoor };
