# ============================================================
# Backend Dockerfile — TrustPULSE Express API
# ============================================================
# Multi-stage build for smaller production image size.
# Stage 1: Install dependencies
# Stage 2: Run the application
# ============================================================

# ── Stage 1: Base ─────────────────────────────────────────
FROM node:20-alpine AS base

# Set working directory inside container
WORKDIR /app

# Copy package files first (for Docker layer caching)
# If package.json doesn't change, npm install won't re-run
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# ── Stage 2: Runtime ──────────────────────────────────────
FROM node:20-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy installed node_modules from the base stage
COPY --from=base /app/node_modules ./node_modules

# Copy all source code
COPY . .

# Expose the API port
EXPOSE 5000

# Set Node environment
ENV NODE_ENV=production

# Health check: ping the /api/health endpoint every 30 seconds
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
