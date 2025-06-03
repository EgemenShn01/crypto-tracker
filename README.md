# Crypto Tracker

Crypto Tracker is a modern, fully responsive cryptocurrency dashboard built with Next.js, React Query, TypeScript, and Tailwind CSS. The app provides real-time prices, interactive charts, and details for 160+ cryptocurrencies with lightning-fast UX, clean code, and professional UI/UX.


---

## Features

* **Live Prices:** View real-time price, market cap, all-time high/low, and weekly high for top cryptocurrencies.
* **Interactive Chart:** Smooth, animated price charts for each token (1D, 7D, 30D, 90D).
* **Token Explorer:** Detailed token page with stats, external links (Website, Explorer, Twitter/X).
* **Search & Filter:** Instant token search and filter.
* **Dark Mode:** Beautiful light/dark themes, system-aware.
* **News Banner:** Rotating, animated crypto news and alerts.
* **Serverless API:** Next.js API routes proxy Coingecko, fixing CORS for local dev.
* **Responsive Design:** Looks great on any device.
* **Optimized Performance:** Data fetching and caching with React Query.
* **Accessible:** Keyboard-friendly, high contrast, visually accessible components.

---

## Tech Stack

* [Next.js 14+](https://nextjs.org/)
* [React 18+](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)
* [TanStack React Query](https://tanstack.com/query/latest)
* [ApexCharts](https://apexcharts.com/)
* [Coingecko API](https://www.coingecko.com/en/api)

---

## Demo

Try the live app: [https://crypto-tracker-demo.vercel.app](https://crypto-tracker-demo.vercel.app)

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EgemenShn01/crypto-tracker.git
   cd crypto-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Visit [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Folder Structure

```
src/
  app/         # Next.js app directory (routes, API)
  components/  # UI components (charts, lists, header, etc.)
  lib/         # API fetchers and utils
  types/       # TypeScript types
```

---

## API

* No API keys needed (uses public Coingecko endpoints).
* All requests to Coingecko are proxied through Next.js API routes for CORS and security.

---

## Customization & Contributions

* Fork, star, and PRs are welcome!
* Easily customize theme, color palette, and add more providers/news sources.
* For custom endpoints, extend `src/lib/api.ts` and add new API routes in `src/app/api/`.

---


**Created by [Your Name](https://github.com/EgemenShn01) – 2025**
