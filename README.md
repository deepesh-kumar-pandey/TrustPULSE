# TrustPULSE 🔍

### Centralized Company Review Aggregator

> One search. Complete picture. — Aggregate company reviews from Google, Trustpilot, Glassdoor, and Indeed into a single professional dashboard.

![TrustPULSE Banner](https://via.placeholder.com/1200x400/0f172a/3b82f6?text=TrustPULSE+—+Centralized+Company+Review+Aggregator)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Docker Setup](#docker-setup)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Data Schema](#-data-schema)
- [Cache System](#-cache-system)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)

---

## 🌐 Overview

TrustPULSE solves the problem of scattered company reputation data. Instead of manually visiting four different review sites, users get a **consolidated trust score** from a single search.

**Key principles:**
- ✅ Pure mathematics — no AI, no ML, no sentiment analysis
- ✅ 24-hour MongoDB-backed caching
- ✅ Modular, scalable architecture
- ✅ Production-ready Docker setup
- ✅ Mobile-responsive dark-mode UI

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 Multi-platform aggregation | Google, Trustpilot, Glassdoor, Indeed |
| 📊 Mathematical averaging | Sum of all ratings ÷ total reviews |
| ⚡ 24-hour cache | MongoDB TTL cache, no redundant scraping |
| 📱 Responsive UI | Works on mobile, tablet, desktop |
| 🎯 Platform filter tabs | Filter reviews by platform |
| 🔃 Sort reviews | By date (newest/oldest) or rating (high/low) |
| 🏷️ Platform badges | Color-coded per platform |
| 💾 Cache refresh | Force-refresh stale data via API |
| 🩺 Health check | `/api/health` endpoint for monitoring |
| 🐳 Docker support | Full `docker-compose up` setup |

---

## 🏗️ Architecture

```
User Browser
     │
     ▼
React Frontend (Vite)
     │  Axios HTTP requests
     ▼
Express Backend API
     │
     ├── Cache Check ──► MongoDB
     │       │
     │       ├── HIT  (< 24h) ──► Return cached data ✅
     │       │
     │       └── MISS / EXPIRED
     │               │
     │               ▼
     │         Scraper Service
     │         ┌───┬───┬───┬───┐
     │         │ G │ T │ Gl│ I │  (parallel Promise.allSettled)
     │         └───┴───┴───┴───┘
     │               │
     │         Rating Calculator
     │         (sum ÷ count)
     │               │
     │         Save to MongoDB
     │               │
     └───────── Return fresh data
```

### Cache Flow

```
Request → Check MongoDB → Found?
                              YES → Age < 24h? → YES → Return cache ✅
                                               → NO  → Re-scrape
                              NO  → Run scrapers → Calculate avg → Save → Return
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP client |
| Tailwind CSS v3 | Utility-first styling |
| Vite | Build tool & dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 20 | JavaScript runtime |
| Express.js 4 | Web framework |
| Mongoose 8 | MongoDB ODM |
| Morgan | HTTP request logger |
| CORS | Cross-origin support |
| dotenv | Environment variables |

### Database
| Technology | Purpose |
|---|---|
| MongoDB 7 | Primary database & cache store |

### DevOps
| Technology | Purpose |
|---|---|
| Docker | Container runtime |
| Docker Compose | Multi-service orchestration |
| Nginx | Static file server + API proxy |

---

## 📁 Folder Structure

```
TrustPULSE/
│
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── companyController.js   # GET /api/company/:name
│   │   ├── cacheController.js     # POST /api/cache/refresh
│   │   └── healthController.js   # GET /api/health
│   ├── middleware/
│   │   ├── asyncHandler.js        # Async error wrapper
│   │   └── errorMiddleware.js     # Global error handler
│   ├── models/
│   │   ├── Company.js             # Company Mongoose schema
│   │   └── Review.js              # Review sub-document schema
│   ├── routes/
│   │   ├── companyRoutes.js       # Company + cache routes
│   │   └── healthRoutes.js        # Health check route
│   ├── scrapers/
│   │   ├── googleScraper.js       # Mock Google reviews
│   │   ├── trustpilotScraper.js   # Mock Trustpilot reviews
│   │   ├── glassdoorScraper.js    # Mock Glassdoor reviews
│   │   └── indeedScraper.js       # Mock Indeed reviews
│   ├── services/
│   │   ├── scraperService.js      # Orchestrates all scrapers
│   │   └── cacheService.js        # Cache check + DB logic
│   ├── utils/
│   │   ├── ratingCalculator.js    # Math averaging utility
│   │   └── logger.js              # Console logger
│   ├── .env                       # Local environment variables
│   ├── .env.example               # Template for .env
│   ├── Dockerfile
│   ├── package.json
│   └── server.js                  # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── RatingCard.jsx
│   │   │   ├── ReviewCard.jsx
│   │   │   ├── PlatformBadge.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx     # Global state (Context API)
│   │   ├── hooks/
│   │   │   └── useCompanyData.js  # Custom data fetching hook
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx     # Navbar + Content + Footer
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Landing page with hero
│   │   │   ├── DashboardPage.jsx  # Results dashboard
│   │   │   └── ErrorPage.jsx      # 404 page
│   │   ├── services/
│   │   │   └── api.js             # Axios instance + API methods
│   │   ├── App.jsx                # Routes definition
│   │   ├── main.jsx               # React root mount
│   │   └── index.css              # Tailwind + global styles
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org) >= 18.0.0
- [npm](https://npmjs.com) >= 9.0.0
- [MongoDB](https://mongodb.com) (for local dev without Docker)
- [Docker](https://docker.com) + [Docker Compose](https://docs.docker.com/compose/) (for Docker setup)

---

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/TrustPULSE.git
cd TrustPULSE
```

#### 2. Setup and run the Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env — set MONGO_URI to your local MongoDB
# e.g. MONGO_URI=mongodb://localhost:27017/trustpulse

# Start the development server (with auto-restart via nodemon)
npm run dev
```

Backend will start at: **http://localhost:5000**

#### 3. Setup and run the Frontend

```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start Vite dev server
npm run dev
```

Frontend will start at: **http://localhost:3000**

> 💡 The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically — no CORS issues.

---

### Docker Setup

The easiest way to run the full stack:

```bash
# From the project root directory
docker-compose up --build
```

This will:
1. Pull the MongoDB 7 image
2. Build the backend Docker image
3. Build the frontend Docker image (Vite build → Nginx)
4. Start all 3 services with health-check ordering

| Service  | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:5000 |
| MongoDB  | mongodb://localhost:27017 |

**Stop services:**
```bash
docker-compose down
```

**Stop and wipe database:**
```bash
docker-compose down -v
```

**Rebuild after code changes:**
```bash
docker-compose up --build
```

**View logs:**
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Express server port |
| `MONGO_URI` | `mongodb://mongodb:27017/trustpulse` | MongoDB connection string |
| `NODE_ENV` | `development` | Environment mode |
| `CACHE_DURATION_HOURS` | `24` | Cache TTL in hours |

### Frontend (`frontend/.env`)

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `/api` | API base URL (Vite proxy handles it in dev) |

---

## 📡 API Routes

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "status": "ok",
  "message": "🔍 TrustPULSE API is running",
  "timestamp": "2026-05-19T05:00:00.000Z",
  "uptime": "120s",
  "environment": "development",
  "database": { "status": "connected", "state": 1 },
  "version": "1.0.0"
}
```

---

### Get Company Reviews

```
GET /api/company/:name
GET /api/company/:name?refresh=true   ← force bypass cache
```

**Example:** `GET /api/company/Google`

**Response:**
```json
{
  "success": true,
  "data": {
    "companyName": "Google",
    "overallRating": 4.1,
    "totalReviews": 20,
    "platformRatings": {
      "Google":     4.4,
      "Trustpilot": 3.9,
      "Glassdoor":  3.7,
      "Indeed":     3.7
    },
    "reviews": [ ... ],
    "lastUpdated": "2026-05-19T05:00:00.000Z",
    "fromCache": false
  }
}
```

---

### Force Refresh Cache

```
POST /api/cache/refresh
Content-Type: application/json

{ "companyName": "Google" }
```

**Response:**
```json
{
  "success": true,
  "message": "Cache refreshed successfully for \"Google\"",
  "data": { ... }
}
```

---

### Check Cache Status

```
GET /api/cache/status/:name
```

**Response:**
```json
{
  "success": true,
  "cached": true,
  "companyName": "Google",
  "lastUpdated": "2026-05-19T05:00:00.000Z",
  "cacheAgeHours": 2.5,
  "cacheValid": true,
  "cacheDurationHours": 24,
  "totalReviews": 20,
  "overallRating": 4.1
}
```

---

## 📐 Data Schema

### Standard Review Schema (all platforms)

```json
{
  "platform":     "Google",
  "reviewerName": "Rahul Sharma",
  "rating":       4.5,
  "reviewText":   "Great company to work with...",
  "reviewDate":   "2026-05-10"
}
```

### Company Document (MongoDB)

```json
{
  "companyName":    "google",
  "displayName":    "Google",
  "overallRating":  4.1,
  "totalReviews":   20,
  "platformRatings": {
    "Google": 4.4, "Trustpilot": 3.9,
    "Glassdoor": 3.7, "Indeed": 3.7
  },
  "reviews":        [ ...20 review objects... ],
  "lastUpdated":    "2026-05-19T05:00:00.000Z",
  "createdAt":      "2026-05-19T05:00:00.000Z",
  "updatedAt":      "2026-05-19T05:00:00.000Z"
}
```

---

## ⚡ Cache System

The cache system follows this decision tree:

```
Request for company "X"
        │
        ▼
  Find in MongoDB
        │
    ┌───┴──────┐
   YES         NO
    │           │
   Age       Run scrapers
  < 24h?        │
    │        Calculate avg
   YES   NO     │
    │    │   Save to DB
  Return  │      │
  cache   └──► Return fresh data
```

The cache duration is configurable via `CACHE_DURATION_HOURS` in the `.env` file.

---

## 🔢 Rating Calculation

Pure mathematical averaging — no AI:

```
overallRating = sum(all individual ratings) / count(all reviews)
```

**Example with 20 reviews:**

| Platform   | Reviews | Sum   | Average |
|------------|---------|-------|---------|
| Google     | 5       | 22.0  | 4.4     |
| Trustpilot | 5       | 19.5  | 3.9     |
| Glassdoor  | 5       | 18.5  | 3.7     |
| Indeed     | 5       | 18.5  | 3.7     |
| **Total**  | **20**  | **78.5** | **3.9** |

Result is rounded to 1 decimal place.

---

## 📸 Screenshots

> *(Add screenshots of your running app here)*

| Page | Description |
|---|---|
| `screenshot-home.png` | Landing page with hero search |
| `screenshot-dashboard.png` | Results dashboard with metrics |
| `screenshot-mobile.png` | Mobile responsive view |

---

## 🔭 Future Improvements

| Feature | Priority |
|---|---|
| Real web scraping (Puppeteer/Playwright) | High |
| Pagination for reviews | Medium |
| Export to PDF/CSV | Medium |
| Company comparison mode | Medium |
| User authentication | Low |
| Email alerts for rating drops | Low |
| Redis caching for speed | Low |
| GraphQL API | Low |

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <strong>Built with ❤️ using the MERN Stack</strong><br/>
  <sub>MongoDB · Express · React · Node.js</sub>
</div>