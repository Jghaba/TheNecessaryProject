# CLAUDE.md — TheNecessaryProject Cheat Sheet

> Personal long-term memory for Claude Code. Update whenever architecture, stack, or deployment changes.

---

## Project Overview

**TheNecessaryProject** is a full-stack MERN e-commerce platform for a Romanian men's fashion brand ("TheNecessary"), extended with an AI-powered marketing analytics module. The platform lets the admin generate social-media content via Google Gemini, create trackable campaign URLs, attribute orders to specific campaigns, and pull organic Instagram metrics through the Meta Graph API — all in one dashboard.

---

## Tech Stack

**Backend**
- Node.js v18+ (ES Modules — `"type": "module"` in package.json)
- Express.js v4
- MongoDB (Mongoose v8) hosted on **MongoDB Atlas**
- JWT auth via `jsonwebtoken` — token stored in **HTTP-only cookie**
- bcryptjs (salt 10) for password hashing
- multer for image uploads → `/uploads/` static folder
- `@google/generative-ai` SDK — model `gemini-2.5-flash`
- Meta Graph API v19.0 (Instagram Business)
- PayPal REST API (`PAYPAL_CLIENT_ID` env var; sandbox in dev, live in prod)
- node-cron for scheduled Instagram sync

**Frontend**
- React 18 (CRA)
- Redux Toolkit + RTK Query (all HTTP via slices)
- React Router DOM v6
- React Bootstrap 5
- Recharts (`BarChart`, `PieChart`)
- React Toastify

**Infrastructure**
- Hosting: **Render** (Node.js web service, auto-deploy on push to `main`)
- DB: MongoDB Atlas (M0 free tier)
- Docker: `Dockerfile` + `docker-compose.yaml` present (local dev alternative)

---

## Architecture & Flow

```
React SPA (Redux + RTK Query)
        │ HTTPS REST
Node.js + Express server (backend/server.js)
        │                    │
   MongoDB Atlas        External APIs
   (5 collections)      • Gemini 2.5 Flash (AI content)
                        • Meta Graph API v19.0 (Instagram)
                        • PayPal SDK (payments)
```

**Tracking attribution flow:**
`/?social_analytics_id=<uuid>` → frontend stores in `sessionStorage` + fires `PUT /api/analytics/:id/click` → on paid order `PUT /api/analytics/:id/convert` → `sessionStorage` cleared (single-touch).

**Instagram sync flow:**
Admin clicks "Sync" (or cron runs) → `POST /api/analytics/sync` → `backend/utils/instagramScraper.js` → Meta Graph API → updates `Analytics` docs by `postId` (shortcode).

---

## Key Files & Directories

```
/                           root (package.json — monorepo scripts)
├── backend/
│   ├── server.js           entry point; mounts all routes + cron import
│   ├── config/db.js        MongoDB Atlas connection
│   ├── controllers/
│   │   ├── analyticsController.js   AI gen, tracking, sync, dashboard KPIs
│   │   ├── orderController.js       checkout, PayPal, delivery
│   │   ├── productController.js     CRUD + search + reviews
│   │   └── userController.js        auth (register/login/logout/profile)
│   ├── models/
│   │   ├── AnalyticsModel.js        campaign + organic metrics + tracking
│   │   ├── SiteMetricsModel.js      singleton — direct traffic counters
│   │   ├── OderModel.js             orders (note: typo in filename)
│   │   ├── ProductModel.js
│   │   └── UserModel.js
│   ├── routes/             one file per resource (mirrors controllers)
│   ├── middleware/
│   │   ├── authMiddleware.js        protect (JWT) + admin guard
│   │   └── errorMiddleware.js       notFound + errorHandler
│   ├── utils/
│   │   ├── instagramScraper.js      Meta Graph API sync logic
│   │   ├── generateToken.js         JWT creation → HTTP-only cookie
│   │   ├── calcPrices.js            tax/shipping/total helpers
│   │   └── paypal.js               PayPal client token fetch
│   ├── cron/syncInstagramMetrics.js scheduled auto-sync (node-cron)
│   └── seeder.js           import (`npm run data:import`) / destroy (`-d` flag)
│
├── frontend/src/
│   ├── index.js            tracking param detection (sessionStorage + click call)
│   ├── App.js              React Router routes (incl. PrivateRoute, AdminRoute)
│   ├── store.js            Redux store
│   ├── slices/
│   │   ├── analyticsApiSlice.js     all analytics RTK Query endpoints
│   │   ├── apiSlice.js              base RTK Query setup
│   │   ├── authSlice.js             user info in Redux (from cookie)
│   │   ├── cartSlice.js             cart state (localStorage)
│   │   ├── ordersApiSlice.js
│   │   ├── productsApiSlice.js
│   │   └── usersApiSlice.js
│   └── screens/
│       ├── admin/
│       │   ├── AnalyticsDashboardScreen.jsx   KPI cards, charts, campaign table
│       │   ├── CreateCampaignScreen.jsx        AI content gen + tracking URL
│       │   ├── ProductListScreen.jsx / ProductEditScreen.jsx
│       │   ├── OrderListScreen.jsx
│       │   └── UserListScreen.jsx / UserEditScreen.jsx
│       └── (HomeScreen, ProductScreen, CartScreen, CheckoutFlow…)
│
├── Dockerfile              production container build
├── docker-compose.yaml     local dev with Docker
└── uploads/                multer product images (served as /uploads static)
```

---

## Database Collections

| Collection | Key fields | Notes |
|---|---|---|
| `users` | name, email, password (bcrypt), isAdmin | JWT issued on login |
| `products` | name, image, price, countInStock, reviews[] | reviews embed user ref |
| `orders` | user, orderItems[], paymentResult, isPaid, isDelivered | PayPal result stored |
| `analytics` | campaignId (UUID), source, clicks, conversions, totalRevenue, views, likes, shares, saved, postId | core new module |
| `sitemetrics` | `_id: 'global'` singleton — directVisits, directConversions, directRevenue | direct traffic bucket |

---

## API Endpoints (quick ref)

**E-commerce**
- `POST /api/users` / `POST /api/users/login` / `POST /api/users/logout`
- `GET|PUT /api/users/profile` | `GET /api/users` (admin)
- `GET /api/products` (paginated+search) | `GET|POST|PUT|DELETE /api/products/:id`
- `POST /api/products/:id/reviews`
- `POST /api/orders` | `GET /api/orders/myorders` | `GET /api/orders/:id`
- `PUT /api/orders/:id/pay` | `PUT /api/orders/:id/deliver` (admin)
- `GET /api/config/paypal`

**Analytics (new module)**
- `GET /api/analytics` — dashboard KPIs (query: `startDate`, `endDate`)
- `POST /api/analytics` — create campaign record (admin)
- `POST /api/analytics/generate` — Gemini AI content gen (admin)
- `POST /api/analytics/sync` — trigger Instagram sync (admin)
- `POST /api/analytics/direct-visit` — record direct visit (public)
- `POST /api/analytics/direct-convert` — record direct conversion (private)
- `PUT /api/analytics/:campaignId/click` — increment click (public)
- `PUT /api/analytics/:campaignId/convert` — attribute conversion (private)
- `PUT /api/analytics/:campaignId/post` — link Instagram post shortcode (admin)

---

## Deployment & Environments

| | Local Dev | Production |
|---|---|---|
| Start | `npm run dev` (concurrently: nodemon + CRA) | `npm start` → `node backend/server.js` |
| Build | `npm run build` (installs + builds frontend into `/frontend/build`) | Render runs this automatically |
| DB | Local `.env` MONGO_URI → Atlas | Render env var → same Atlas cluster |
| Frontend | CRA dev server on :3000, proxy to :5000 | Served as static from `/frontend/build` |
| Deployment | — | Push to `main` on GitHub → Render auto-deploys |

**Required env vars (set in Render dashboard, never committed):**
```
MONGO_URI
JWT_SECRET
PAYPAL_CLIENT_ID
GEMINI_API_KEY
INSTAGRAM_ACCESS_TOKEN          # Long-Lived Token, max 60 days — must renew
INSTAGRAM_BUSINESS_ACCOUNT_ID
NODE_ENV=production
PORT                            # Render injects this automatically
```

**Seeder commands:**
```bash
npm run data:import    # Users → Products → Analytics → Orders → SiteMetrics
npm run data:destroy   # wipe all collections
```

---

## Assumptions & Rules

- **ES Modules throughout backend** — always use `import/export`, never `require()`.
- **No `_id` typo** — the Order model file is named `OderModel.js` (typo); import path must match.
- **Instagram token renewal** — Long-Lived Access Token expires after ~60 days. Remind the user to refresh it in the Render env var before expiry.
- **Gemini response parsing** — API may wrap JSON in ` ```json ``` ` fences; strip them before `JSON.parse()` (already done in `analyticsController.js`).
- **Single-touch attribution** — `sessionStorage` is cleared after first conversion; a user reloading mid-checkout won't double-count.
- **Admin guard** — `protect` + `admin` middleware must both be applied to all admin routes; never expose admin endpoints without both.
- **Image uploads** — multer writes to local `/uploads/`; in production on Render this is ephemeral (lost on redeploy). If persistence is needed, migrate to cloud storage (S3/Cloudinary).
- **PayPal sandbox vs live** — controlled by `PAYPAL_CLIENT_ID` value; no code change needed between environments.
- **Cron sync** — `backend/cron/syncInstagramMetrics.js` is imported once in `server.js`; it auto-runs on a schedule. Don't import it twice.

---

## Maintenance Checklist

Remind me to update this file when:
- [ ] A new npm dependency is added or removed
- [ ] A new API route or collection is created
- [ ] The deployment platform or DB tier changes
- [ ] Instagram token is renewed or a new external API is integrated
- [ ] Frontend routing or Redux slice structure changes significantly
