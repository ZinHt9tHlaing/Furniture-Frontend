# Furniture-Frontend

A modern Next.js 16 app built with TypeScript, Tailwind CSS 4, shadcn UI components, React Query, and dark mode support.

## Project Overview

This repository contains a frontend practice project scaffolded with Next.js and customized for component-driven UI development. It includes:

- Next.js App Router with server and client components
- TypeScript with strict checking
- Tailwind CSS 4 and shadcn utility components
- Light/dark theme switching via `next-themes`
- React Query for data fetching state management
- A small collection of reusable UI primitives under `src/components/ui`
- Google font optimization via `next/font`

## Key Features

- `app/layout.tsx`: Root layout with global providers and theme setup
- `src/components/theme-provider.tsx`: Theme wrapper for `next-themes`
- `src/providers/ReactQueryProvider.tsx`: React Query setup and cache provider
- `src/lib/utils.ts`: `cn()` utility for class name composition via `clsx` + `tailwind-merge`
- `src/app/globals.css`: Tailwind imports, shadcn styles, and theme tokens
- Reusable UI components in `src/components/ui`

## Built With

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn UI
- Zustand
- TanStack Query

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm, pnpm, or Yarn

### Installation

Install dependencies:

```bash
npm install
```

or with pnpm:

```bash
pnpm install
```

### Environment Setup

If the app requires environment-specific configuration, create a `.env.local` file in the project root. Example:

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

Next.js automatically loads `.env.local` during development. Do not commit sensitive values to source control.

### Run Locally

Start the development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

### Build for Production

```bash
npm run build
```

Then start the production server locally:

```bash
npm start
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm start` — run production server
- `npm run lint` — run ESLint checks

## Project Structure

- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — reusable UI components and shared providers
- `src/lib/` — utility helpers
- `src/providers/` — application-level providers like React Query
- `public/` — static assets

## Notes

- `app/page.tsx` currently renders a placeholder `HomePage` component.
- `app/layout.tsx` configures fonts, theme, React Query, and global page structure.
- `globals.css` includes theme token definitions, Tailwind imports, and base styling.

## Backend

See the [backend repository](https://github.com/ZinHt9tHlaing/server-practice) for the API source and setup instructions.