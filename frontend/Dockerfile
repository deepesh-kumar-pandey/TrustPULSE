# ============================================================
# Frontend Dockerfile — TrustPULSE React App
# ============================================================
# Two-stage build:
#   Stage 1: Build the Vite production bundle
#   Stage 2: Serve static files via nginx
# ============================================================

# ── Stage 1: Builder ──────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the Vite production bundle
# Output goes to /app/dist
RUN npm run build

# ── Stage 2: Nginx Serving ────────────────────────────────
FROM nginx:alpine AS runtime

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
# (Needed so React Router links don't 404 on page refresh)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Nginx runs in foreground by default
CMD ["nginx", "-g", "daemon off;"]
