/**
 * routes/healthRoutes.js — Health check routes
 *
 * Mounts the health check controller at /api/health
 */

const express = require('express');
const router = express.Router();
const { getHealth } = require('../controllers/healthController');

// GET /api/health
router.get('/health', getHealth);

module.exports = router;
