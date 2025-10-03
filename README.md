# Portfolio Performance Dashboard — Quick Start (Existing GitHub Repo)

### What’s inside (short)
- Angular 19, standalone components, Angular Material, SCSS
- Highcharts (via `highcharts-angular`)
- Jest unit tests (+ optional Playwright E2E)

## 📝 App Description
A compact **Angular 19** single‑page app inspired by buy‑side portfolio tools.
It lets you:
- **Select a portfolio** (left nav or select input).
- View **positions in a Material table**: `ISIN | Instrument | Qty | Price | Market Value`.
  - Client‑side **sorting** by Market Value (qty × price)
  - Text **filter** with 300ms debounce
- See **charts (Highcharts)**:
  - **Allocation** (pie/donut) by sector (sum of qty × price per sector)
  - **History** (line) of portfolio value over 12 mock time points
- Proper **states**: loading, empty, error + snackbar and retry
- **HTTP interceptor** adds `X-Client-Id: pictet-solutions`
- **Mock data** via `PortfolioService` (RxJS `delay`), so **no backend required**
- **Tests** with Jest (service + component); optional **Playwright** E2E for the filter flow

Minimal instructions to **clone, install and run** the project you already pushed to GitHub.

## ✅ Prerequisites
- **Node** ≥ 18 (20 LTS recommended)
- **npm** ≥ 9 (or pnpm/yarn if you prefer)
- **Git**

## 1) Clone the repository
```bash
git clone <YOUR_REPO_URL>.git
cd <your-repo-folder>
```

## 2) Install dependencies
```bash
# Prefer exact lockfile installs when package-lock.json is present
npm ci
# If you don't have a lockfile yet
# npm i
```

## 3) (Optional) Install Playwright browsers (for E2E)
```bash
# If the repo includes E2E tests
npx playwright install
```

## 4) Start the dev server
```bash
npm start
```
App runs at **http://localhost:4200/** by default.

## 5) Run unit tests (Jest)
```bash
npm test
# or watch mode
npm run test:watch
```

## 6) Run E2E tests (optional)
In one terminal:
```bash
npm start
```
In another terminal:
```bash
npm run e2e
```

## 7) Build for production
```bash
npm run build
```
Build output is generated under `dist/portfolio-dashboard/` (or your project name).

---

Replace `<YOUR_REPO_URL>` and `<your-repo-folder>` above with your actual GitHub URL and folder name.
