const asyncHandler = require('../middleware/asyncHandler');
const { getCompanyData } = require('../services/cacheService');
const logger = require('../utils/logger');

const refreshCache = asyncHandler(async (req, res) => {
  const { companyName } = req.body;

  if (!companyName || companyName.trim() === '') {
    res.status(400);
    throw new Error('companyName is required in the request body');
  }

  logger.info(`🔄 POST /api/cache/refresh — Forcing refresh for: "${companyName}"`);

  const companyData = await getCompanyData(companyName, true);

  res.status(200).json({
    success: true,
    message: `Cache refreshed successfully for "${companyName}"`,
    data: companyData,
  });
});

const getCacheStatus = asyncHandler(async (req, res) => {
  const { name } = req.params;
  
  res.status(200).json({
    success: true,
    cached: false,
    message: `Database bypassed, no cache available for "${name}"`,
  });
});

module.exports = { refreshCache, getCacheStatus };
