const logger = require('../utils/logger');

const connectDB = async () => {
  logger.info(`⚠️ MongoDB connection bypassed for local testing (No DB mode).`);
};

module.exports = connectDB;
