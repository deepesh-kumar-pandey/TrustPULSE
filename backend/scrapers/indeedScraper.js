/**
 * scrapers/indeedScraper.js — Mock Indeed Reviews scraper
 *
 * Returns employer/company reviews as they appear on Indeed.
 * Follows the STANDARD REVIEW JSON SCHEMA exactly.
 *
 * @param {string} companyName
 * @returns {Promise<Array>}
 */

const scrapeIndeed = (companyName) => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 400) + 200;

    setTimeout(() => {
      const reviews = [
        {
          platform: 'Indeed',
          reviewerName: 'Software Engineer',
          rating: 4.0,
          reviewText: `${companyName} is a solid employer. Good salary and benefits. The technical work is interesting and challenging. Management could be more transparent about company direction but overall a good place to grow.`,
          reviewDate: '2026-05-14',
        },
        {
          platform: 'Indeed',
          reviewerName: 'Customer Support Rep',
          rating: 3.0,
          reviewText: `Working at ${companyName} was okay. The job itself is manageable but the workload can be overwhelming during peak periods. Training was minimal and I had to figure out a lot on my own.`,
          reviewDate: '2026-05-01',
        },
        {
          platform: 'Indeed',
          reviewerName: 'Operations Lead',
          rating: 4.5,
          reviewText: `I've worked at ${companyName} for 4 years and it has been a rewarding journey. The company values innovation and hard work is recognized and rewarded. The team is diverse and talented.`,
          reviewDate: '2026-04-26',
        },
        {
          platform: 'Indeed',
          reviewerName: 'Sales Executive',
          rating: 3.5,
          reviewText: `${companyName} has a great product to sell which makes the job easier. However, targets can be unrealistic at times and the pressure from management can be stressful. Commission structure is fair though.`,
          reviewDate: '2026-04-16',
        },
        {
          platform: 'Indeed',
          reviewerName: 'Data Analyst',
          rating: 4.0,
          reviewText: `Really enjoyed my time at ${companyName}. Great learning opportunities and the data infrastructure is modern. Management is approachable and open to new ideas. Would recommend for those starting their data career.`,
          reviewDate: '2026-04-08',
        },
      ];

      const { adjustRating } = require('../utils/mockDataHelper');
      reviews.forEach(r => r.rating = adjustRating(r.rating, companyName, 'Indeed', 4));

      resolve(reviews);
    }, delay);
  });
};

module.exports = { scrapeIndeed };
