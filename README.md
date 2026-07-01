# Bougain Media Website

Modern marketing agency website for **Bougain Mediaa**.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS v4
- Framer Motion
- Supabase (careers + admin — configure when ready)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment

Copy `.env.example` to `.env.local` and fill in Supabase keys when ready:

```bash
cp .env.example .env.local
```

## Project Structure

- `src/app/` — pages (home, careers, admin)
- `src/components/` — UI sections
- `src/lib/constants.ts` — all site copy
- `supabase/migrations/` — database schema
- `PROJECT_PLAN.md` — full project blueprint

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Status

- ✅ Phase 1: Home page, Navbar, Footer, Hero, all sections
- ✅ Careers page (static — awaiting Supabase)
- ⏳ Admin panel (Phase 4)
- ⏳ Logo (client to provide)
