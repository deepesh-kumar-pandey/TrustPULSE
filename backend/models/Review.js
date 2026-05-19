/**
 * models/Review.js — Mongoose sub-document schema for a single review
 *
 * This schema is embedded inside the Company document as an array.
 * It enforces the STANDARD REVIEW JSON SCHEMA required by all scrapers.
 *
 * Standard schema:
 * {
 *   platform:     string  — Source platform name
 *   reviewerName: string  — Name of the reviewer
 *   rating:       number  — Rating value (1.0 – 5.0)
 *   reviewText:   string  — The actual review content
 *   reviewDate:   string  — Date of the review (YYYY-MM-DD)
 * }
 */

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    // Which platform this review came from
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      enum: ['Google', 'Trustpilot', 'Glassdoor', 'Indeed'],
      trim: true,
    },

    // Display name of the person who left the review
    reviewerName: {
      type: String,
      required: [true, 'Reviewer name is required'],
      trim: true,
      maxlength: [100, 'Reviewer name cannot exceed 100 characters'],
    },

    // Numeric rating — must be between 1.0 and 5.0
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },

    // Full text of the review
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      maxlength: [2000, 'Review text cannot exceed 2000 characters'],
    },

    // Date the review was posted (stored as string for cross-platform compatibility)
    reviewDate: {
      type: String,
      required: [true, 'Review date is required'],
    },
  },
  {
    // _id: false prevents Mongoose from creating a separate _id for each sub-document
    // Set to true if you want individual review IDs (useful for future CRUD operations)
    _id: true,
  }
);

module.exports = ReviewSchema;
