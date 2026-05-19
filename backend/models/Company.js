/**
 * models/Company.js — Mongoose schema for a cached company record
 *
 * Each document stores the aggregated review data for one company.
 * The `lastUpdated` field is used to determine cache validity (24h TTL).
 *
 * Embedding reviews directly inside the Company document is efficient
 * for read-heavy workloads since all data is fetched in a single query.
 */

const mongoose = require('mongoose');
const ReviewSchema = require('./Review');

const CompanySchema = new mongoose.Schema(
  {
    // Normalized company name (lowercase) used as the lookup key
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
      lowercase: true, // always store as lowercase for case-insensitive lookups
      index: true,      // index for fast queries
    },

    // Original (display) company name as entered by the user
    displayName: {
      type: String,
      required: [true, 'Display name is required'],
      trim: true,
    },

    // Calculated overall rating (mathematical average of all reviews)
    overallRating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },

    // Total number of reviews across all platforms
    totalReviews: {
      type: Number,
      required: true,
      default: 0,
    },

    // Platform-wise breakdown: { Google: 4.2, Trustpilot: 3.8, ... }
    platformRatings: {
      type: Map,
      of: Number,
      default: {},
    },

    // Array of all individual review sub-documents
    reviews: {
      type: [ReviewSchema],
      default: [],
    },

    // Timestamp when the data was last fetched from scrapers
    // Used to calculate cache age: if (now - lastUpdated) < 24h → serve cache
    lastUpdated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` timestamps
    timestamps: true,
  }
);

/**
 * Virtual field: returns how many hours ago the cache was last updated
 * Useful for debugging cache state without extra computation in controllers.
 */
CompanySchema.virtual('cacheAgeHours').get(function () {
  const ageMs = Date.now() - this.lastUpdated.getTime();
  return Math.round(ageMs / (1000 * 60 * 60) * 10) / 10; // 1 decimal
});

/**
 * Instance method: check if the cached data is still fresh (< 24h)
 */
CompanySchema.methods.isCacheValid = function () {
  const cacheDurationHours = parseInt(process.env.CACHE_DURATION_HOURS || '24', 10);
  const ageMs = Date.now() - this.lastUpdated.getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  return ageHours < cacheDurationHours;
};

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
