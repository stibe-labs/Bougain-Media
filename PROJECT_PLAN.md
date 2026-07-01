# Bougain Media — Website Project Plan

> **Document version:** 1.1  
> **Created:** June 30, 2026  
> **Last updated:** June 30, 2026  
> **Status:** ✅ Plan complete — ready for build when client provides remaining assets  
> **Reference site:** [Betroverse](https://betroverse.in/) — inspiration only, not a copy

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Brand Identity](#2-brand-identity)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Content Inventory](#5-content-inventory)
6. [Site Architecture](#6-site-architecture)
7. [Page Specifications](#7-page-specifications)
8. [Careers Page](#8-careers-page)
9. [Admin Panel](#9-admin-panel)
10. [Design Direction — Modern 2026](#10-design-direction--modern-2026)
11. [Asset Inventory](#11-asset-inventory)
12. [Tech Stack Recommendation](#12-tech-stack-recommendation)
13. [Development Phases](#13-development-phases)
14. [Open Items & Client Checklist](#14-open-items--client-checklist)

---

## 1. Project Overview

### Goal
Build a modern, professional website for **Bougain Mediaa** — a digital marketing and advertising agency — that converts Instagram visitors into leads, showcases services and portfolio work, establishes brand credibility, and attracts talent through a **Careers** page managed via a secure **Admin Panel**.

### Current State
| Item | Status |
|------|--------|
| Instagram presence | ✅ Active (source of brand assets) |
| Website | ❌ Not built yet |
| Logo files | ⏳ Client will provide later (text wordmark used as placeholder until then) |
| Portfolio / case study images | ⚠️ Not yet provided |
| Client testimonials | ⚠️ Not yet provided |
| Admin panel | ❌ Planned — careers management at launch |
| Careers page | ❌ Planned — content driven by admin panel |

### Success Criteria
- Mobile-first, fast-loading, SEO-ready
- Brand-consistent with Instagram visual identity
- Clear path to contact (email, phone, WhatsApp)
- Services and value proposition communicated within 5 seconds
- Portfolio section ready to grow as work is added
- **Careers page** displays live job openings updated from admin
- **Admin panel** lets authorized staff add, edit, publish, and close job listings without touching code

---

## 2. Brand Identity

### Company Name
**Bougain Mediaa** *(note: double "a" at the end — confirm if intentional for legal/branding)*

### Tagline
> **Big ideas. Bigger Results.**

### Brand Personality
| Trait | Expression |
|-------|------------|
| Professional | Clean layouts, serif body copy, restrained palette |
| Creative | Topographic line motifs, script accents, bold typography |
| Results-driven | "Bigger Results" messaging, data-driven language |
| Approachable | Warm cream tones, free consultation CTA, friendly copy |

### Logo Elements (from Instagram)
- **Wordmark:** `BOUGAIN` (bold sans-serif, sage green) + `MEDIAA` (light weight, wide letter-spacing, grey)
- **Icon:** Stylized flowing "B" — sage green, usable as favicon and watermark
- **Motif:** Topographic contour lines in mint/sage green on dark green backgrounds

### Brand Voice
- Confident but not arrogant
- Focus on partnership: *"We'd love to learn more about your business"*
- Emphasis on meaningful marketing, not vanity metrics
- Professional serif tone for long-form; punchy sans-serif for headlines

---

## 3. Color System

Extracted from Instagram graphics. Final hex values should be sampled precisely during design.

### Primary Palette

| Token | Hex (approx.) | Usage |
|-------|---------------|-------|
| `--forest-deep` | `#0F3D2E` | Hero backgrounds, footer, primary buttons, nav |
| `--forest-dark` | `#1A4D3E` | Section alternates, cards on dark |
| `--sage` | `#6B9E8F` | Logo, links, icons, accents |
| `--sage-light` | `#B8DBD4` | Topographic lines, decorative elements |
| `--cream` | `#F5F3EF` | Page backgrounds, light sections |
| `--cream-textured` | `#EAE7DC` | Textured section backgrounds (subtle grain) |
| `--white` | `#FFFFFF` | Cards, text on dark, clean sections |
| `--black` | `#1A1A1A` | Body text, service pill backgrounds |
| `--grey-muted` | `#9CA3A0` | Secondary text, "MEDIAA" wordmark |

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--cta-primary` | `#0F3D2E` | Primary buttons |
| `--cta-hover` | `#1A5C48` | Button hover |
| `--whatsapp` | `#25D366` | WhatsApp CTA only |
| `--error` | `#DC2626` | Form validation |
| `--success` | `#16A34A` | Form success states |

### Color Usage Rules
1. **Dark sections** (forest green) → white/sage text, mint contour decorations
2. **Light sections** (cream/white) → black/dark green text, sage accents
3. Never use more than 2 background colors per viewport
4. WhatsApp green reserved exclusively for WhatsApp button

---

## 4. Typography

### Font Pairing (recommended)

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display / Hero | **Playfair Display** or **Cormorant Garamond** | 700 | Matches Instagram serif "SERVICES", "CONTACT US" |
| Headings (H2–H4) | **DM Sans** or **Outfit** | 600–700 | Modern geometric sans |
| Body | **Source Serif 4** or **Lora** | 400 | Matches Instagram paragraph style |
| Accent / Script | **Pinyon Script** or **Allura** | 400 | For "our" style decorative words — use sparingly |
| UI / Labels | **DM Sans** | 500 | Buttons, nav, form labels |
| Brand wordmark | **DM Sans** | 700 + 300 | BOUGAIN bold + MEDIAA light tracked |

### Type Scale (desktop)

| Element | Size | Line Height | Letter Spacing |
|---------|------|-------------|----------------|
| Hero H1 | 72–96px | 1.05 | -0.02em |
| Section H2 | 48–56px | 1.1 | -0.01em |
| H3 | 32px | 1.2 | 0 |
| Body | 18px | 1.7 | 0 |
| Small / Caption | 14px | 1.5 | 0.05em (labels) |
| Brand wordmark | 14px | 1 | 0.35em (MEDIAA) |

### Typography Rules
- Headlines: sentence case or ALL CAPS for section labels (match Instagram)
- Body: always serif on light backgrounds for brand consistency
- Max line width: 65ch for readability
- Service names: lowercase in pills (as per Instagram)

---

## 5. Content Inventory

All copy extracted from provided Instagram assets.

### 5.1 Hero Section

**Headline:**
```
Big ideas.
Bigger Results.
```

**Subheadline (draft — combine brand messaging):**
```
We blend storytelling, strategy, and data-driven marketing
to help your business grow in the digital world.
```

**Primary CTA:** `Get a Free Consultation`  
**Secondary CTA:** `View Our Services`

---

### 5.2 About Section

**Intro paragraph (from Instagram):**
> We're Bougain Mediaa — a digital marketing agency built around storytelling, strategy, and helping businesses truly grow in the digital world. We're thinkers, creators, and problem-solvers who believe marketing should be meaningful — not just about metrics.

**Extended copy (from Instagram):**
> We know the digital landscape shifts fast — and we're here to help you stay one step ahead. Whether you're trying to increase visibility, generate qualified leads, or build a brand that resonates, our focus is always on results that matter.

**Consultation CTA copy:**
> We'd love to learn more about your business and explore how we can support your goals. Let's start with a free consultation — feel free to reach out anytime to get a feel for who we are and what we do.

**Closing line:**
> Thanks for considering us. We're looking forward to connecting.

**About cards (draft from brand voice):**

| Card | Title | Content |
|------|-------|---------|
| Our Story | Our Story | A digital marketing agency built around storytelling, strategy, and real business growth. |
| Mission | Mission | To deliver tailored, data-driven strategies that help brands connect, engage, and thrive online. |
| Vision | Vision | To make marketing meaningful — where creativity meets measurable results. |

---

### 5.3 Services Section

**Section label:** `What We Do`  
**Section headline:** `our SERVICES` *(script "our" + serif "SERVICES")*

| # | Service | Description (to write during build) |
|---|---------|-------------------------------------|
| 1 | PPC advertising management | Paid campaigns across Google, Meta, and more — optimized for ROI. |
| 2 | Content creation | Visual and written content that tells your brand story. |
| 3 | Social media management | Strategy, posting, and community growth across platforms. |
| 4 | Website maintenance & development | Fast, modern websites that convert visitors into customers. |
| 5 | SEO services | Organic visibility that brings qualified traffic over time. |
| 6 | Email marketing | Nurture leads and retain customers with targeted email campaigns. |

---

### 5.4 Stats Section (placeholder — needs real data)

| Stat | Label | Current Value |
|------|-------|---------------|
| — | Projects Delivered | TBD |
| — | Happy Clients | TBD |
| — | Social Reach | TBD |
| — | Campaigns Run | TBD |

*Betroverse uses animated counters — we can replicate once client provides numbers.*

---

### 5.5 Portfolio Section

**Section label:** `Work We're Proud Of`  
**Section headline:** `Projects We've Delivered`

> ⚠️ **Awaiting assets.** Client to provide project images, client names (with permission), and brief case descriptions.

**Placeholder structure per project:**
- Project image / thumbnail
- Client name or industry
- Services used (tags)
- Optional: link or expand for case study

---

### 5.6 Contact Section

**Section headline:** `CONTACT US`  
**Supporting text:**
> Reach out to our dedicated team for any inquiries, assistance, or information you need.

| Channel | Value |
|---------|-------|
| Email | mediaabougain@gmail.com |
| Phone | +91 8138-869120 |
| WhatsApp | +91 97787-37896 |

**Contact form fields:**
- Name *
- Email *
- Phone (optional)
- Service interested in (dropdown)
- Message *
- Submit: `Send Message`

---

### 5.7 Footer

**Quick Links:** Home · About · Services · Portfolio · Careers · Contact  
**Support links (optional):** Privacy Policy · Get a Quote  
**Copyright:** `© 2026 Bougain Mediaa. All rights reserved.`  
**Social:** Instagram (link TBD)

---

### 5.8 Careers Page (static copy)

**Page headline:** `Join Our Team`  
**Subheadline:**
> We're thinkers, creators, and problem-solvers. If you're passionate about digital marketing and want to do meaningful work, we'd love to hear from you.

**Empty state (no open roles):**
> We don't have any open positions right now — but we're always interested in meeting talented people. Send your resume to mediaabougain@gmail.com and we'll keep you in mind.

**Per-job card (dynamic — from admin):**
- Job title
- Department (e.g. Marketing, Design, Content)
- Location (e.g. Remote, Hybrid, City name)
- Employment type (Full-time · Part-time · Internship · Contract)
- Short excerpt (first ~120 chars of description)
- `View Details` → expands or navigates to `/careers/[slug]`
- `Apply Now` → opens apply flow

**Job detail page fields (dynamic):**
- Full description
- Responsibilities (bullet list)
- Requirements (bullet list)
- Optional: salary range, experience level
- Apply CTA: `Apply for this role` → application form or mailto link

**Application form fields:**
- Full name *
- Email *
- Phone *
- Resume upload (PDF, max 5 MB) *
- Cover letter / message (optional)
- Submit: `Submit Application`

---

## 6. Site Architecture

### Sitemap

```
PUBLIC ROUTES
/                         → Home (single-page with anchor sections)
/careers                  → Careers listing (open positions from database)
/careers/[slug]           → Individual job detail + apply form
/contact                  → Optional dedicated contact page (or #contact on home)

ADMIN ROUTES (auth-protected)
/admin                    → Redirect to /admin/dashboard
/admin/login              → Admin sign-in
/admin/dashboard          → Overview (open roles, recent applications)
/admin/careers            → List all job postings (draft + published + closed)
/admin/careers/new        → Create new job posting
/admin/careers/[id]/edit  → Edit existing job posting
/admin/applications       → View submitted job applications (optional at launch)

API ROUTES
/api/careers              → GET public published jobs
/api/careers/[slug]       → GET single published job
/api/applications         → POST job application
/api/admin/careers        → CRUD (protected)
```

**Architecture decision:** Home remains a single-page site (like Betroverse). Careers is a separate route because listings are dynamic and need SEO-friendly URLs. Admin is a separate protected area.

### Navigation

| Label | Route |
|-------|-------|
| Home | `/` or `#home` |
| About | `#about` |
| Services | `#services` |
| Portfolio | `#portfolio` |
| Careers | `/careers` |
| Contact | `#contact` |

**Nav CTA button:** `Let's Talk` → scrolls to `#contact`

---

## 7. Page Specifications

### 7.1 Home Page — Section Order

```
┌─────────────────────────────────────────────┐
│  NAVBAR (sticky, transparent → solid)       │
├─────────────────────────────────────────────┤
│  HERO                                       │
│  - Full viewport, dark forest green         │
│  - Topographic animated lines (mint)        │
│  - "Big ideas. Bigger Results."             │
│  - CTA buttons                              │
├─────────────────────────────────────────────┤
│  ABOUT                                      │
│  - Cream background                         │
│  - Brand story + 3 cards (Story/Mission/    │
│    Vision)                                  │
│  - Stylized "B" watermark                   │
├─────────────────────────────────────────────┤
│  SERVICES                                   │
│  - White/cream background                   │
│  - "our SERVICES" headline                  │
│  - 6 pill-shaped service cards (grid)       │
│  - Hover: expand with description           │
├─────────────────────────────────────────────┤
│  STATS (optional until data provided)       │
│  - Dark green band                          │
│  - Animated counters                        │
├─────────────────────────────────────────────┤
│  PORTFOLIO                                  │
│  - Masonry or horizontal scroll grid        │
│  - Hover overlay with project name          │
│  - "Explore" CTA                            │
├─────────────────────────────────────────────┤
│  CTA BAND                                   │
│  - "Ready to grow? Get a free consultation" │
│  - WhatsApp + Contact buttons               │
├─────────────────────────────────────────────┤
│  CONTACT                                    │
│  - Split layout: info left, form right      │
│  - Email, Phone, WhatsApp pills             │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
└─────────────────────────────────────────────┘
```

### 7.2 Component List

| Component | Priority | Notes |
|-----------|----------|-------|
| Navbar | P0 | Sticky, mobile hamburger |
| Hero | P0 | Animated topo lines |
| AboutSection | P0 | |
| ServiceCard | P0 | Pill style from Instagram |
| StatsCounter | P1 | Needs real numbers |
| PortfolioGrid | P1 | Needs images |
| ContactForm | P0 | Email via Formspree/Resend |
| Footer | P0 | |
| WhatsAppFloat | P1 | Fixed bottom-right button |
| PageLoader | P2 | Logo animation on first visit |
| ScrollReveal | P1 | Fade-up on scroll |
| JobCard | P0 | Careers listing card |
| JobDetail | P0 | Full job posting view |
| ApplicationForm | P0 | Resume upload + contact fields |
| AdminSidebar | P0 | Admin navigation |
| AdminJobForm | P0 | Create/edit job in admin |
| AdminJobTable | P0 | Manage all postings |

---

## 8. Careers Page

### 8.1 Public Careers (`/careers`)

```
┌─────────────────────────────────────────────┐
│  NAVBAR                                     │
├─────────────────────────────────────────────┤
│  HERO BAND (cream background)               │
│  - "Join Our Team"                          │
│  - Culture intro paragraph                  │
│  - Stylized "B" watermark (subtle)          │
├─────────────────────────────────────────────┤
│  OPEN POSITIONS                             │
│  - Filter pills: All · Full-time · Remote   │
│  - Job cards grid (1 col mobile, 2 col desk)│
│  - Each card: title, dept, location, type   │
│  - Empty state if no published jobs         │
├─────────────────────────────────────────────┤
│  WHY JOIN US (static)                       │
│  - 3 culture value cards                    │
│  - Creative work · Growth · Meaningful impact│
├─────────────────────────────────────────────┤
│  CTA BAND                                   │
│  - "Don't see a fit? Send us your resume"   │
│  - Email: mediaabougain@gmail.com           │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
└─────────────────────────────────────────────┘
```

### 8.2 Job Detail (`/careers/[slug]`)

- Breadcrumb: Home → Careers → [Job Title]
- Full job content (description, responsibilities, requirements)
- Sidebar: location, type, posted date, apply button
- Application form embedded at bottom (or modal)
- SEO: unique `<title>` and meta description per job

### 8.3 Data Flow

```
Admin creates/edits job → saves to database (draft or published)
                              ↓
Published jobs appear on /careers automatically
                              ↓
Visitor applies → application stored in DB + email notification to admin
```

---

## 9. Admin Panel

### 9.1 Overview

A password-protected dashboard at `/admin` where Bougain Media staff can manage career postings without developer help. Built as part of the same Next.js app — not a separate CMS.

### 9.2 Access & Security

| Item | Approach |
|------|----------|
| Authentication | Email + password via **Supabase Auth** or **NextAuth** |
| Authorization | Only pre-approved admin emails can access `/admin/*` |
| Session | HTTP-only cookies, auto-expire after inactivity |
| Route protection | Middleware blocks unauthenticated access to `/admin` |
| Public admin URL | `/admin/login` — no public link in site nav/footer |

**Initial setup:** One admin account created at deploy time. Additional admins can be invited later.

### 9.3 Admin Screens

#### Dashboard (`/admin/dashboard`)
- Count of open positions
- Count of new applications (last 7 days)
- Quick actions: `+ New Job` · `View Applications`
- Recent activity feed

#### Careers Management (`/admin/careers`)

| Action | Description |
|--------|-------------|
| **List** | Table of all jobs with status badges (Draft · Published · Closed) |
| **Create** | Form to add a new job posting |
| **Edit** | Update any field, change status |
| **Publish** | Makes job visible on public `/careers` page |
| **Close** | Hides job from public site, keeps record in admin |
| **Delete** | Permanently remove (with confirmation dialog) |

#### Job Form Fields (admin)

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | Text | ✅ | e.g. "Social Media Manager" |
| Slug | Text | ✅ | Auto-generated from title, editable |
| Department | Select/text | ✅ | Marketing, Design, Content, etc. |
| Location | Text | ✅ | e.g. "Remote", "Kozhikode" |
| Employment type | Select | ✅ | Full-time, Part-time, Internship, Contract |
| Experience level | Select | Optional | Entry, Mid, Senior |
| Description | Rich text | ✅ | Role overview |
| Responsibilities | Textarea (one per line) | ✅ | Rendered as bullet list |
| Requirements | Textarea (one per line) | ✅ | Rendered as bullet list |
| Salary range | Text | Optional | e.g. "₹3–5 LPA" — can hide from public |
| Status | Select | ✅ | Draft · Published · Closed |
| Published at | Date | Auto | Set when status → Published |

#### Applications (`/admin/applications`) — Phase 2 of admin
- List applicants per job
- View resume (PDF download)
- Mark as: New · Reviewed · Shortlisted · Rejected
- Email applicant (mailto link)

### 9.4 Database Schema

```sql
-- Job postings (managed via admin)
CREATE TABLE careers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  department    TEXT NOT NULL,
  location      TEXT NOT NULL,
  employment_type TEXT NOT NULL,  -- full-time | part-time | internship | contract
  experience_level TEXT,
  description   TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL,
  requirements  TEXT[] NOT NULL,
  salary_range  TEXT,
  status        TEXT NOT NULL DEFAULT 'draft',  -- draft | published | closed
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Job applications (submitted from public careers page)
CREATE TABLE applications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id     UUID REFERENCES careers(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL,
  resume_url    TEXT NOT NULL,       -- stored in Supabase Storage
  cover_letter  TEXT,
  status        TEXT DEFAULT 'new',  -- new | reviewed | shortlisted | rejected
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### 9.5 Future Admin Extensions (post-launch)

| Module | Purpose |
|--------|---------|
| Portfolio | Add/edit portfolio projects from admin |
| Testimonials | Manage client quotes |
| Blog / Insights | Publish articles |
| Contact submissions | View contact form entries |
| Site settings | Update stats, social links, hero copy |

---

## 10. Design Direction — Modern 2026

### What "Modern 2026" Means for This Project

Inspired by [Betroverse](https://betroverse.in/) structure but with Bougain Media's distinct identity:

| Trend | Our Application |
|-------|-----------------|
| **Bold typography** | Oversized hero headline, serif/sans contrast |
| **Dark hero sections** | Forest green with mint topo lines |
| **Subtle texture** | Grain overlay on cream sections (matches Instagram) |
| **Micro-interactions** | Service pill hover, counter animations, smooth scroll |
| **Glassmorphism (restrained)** | Nav bar on scroll: frosted cream/green |
| **Bento grid** | Portfolio section layout |
| **Motion** | CSS/Framer Motion — topo lines drift, fade-up on scroll |
| **Accessibility** | WCAG AA contrast, reduced-motion support |
| **Performance** | Static-first, optimized images, < 2s LCP |

### What We Will NOT Copy from Betroverse
- Their specific videography service focus (Bougain is digital marketing)
- Their color scheme (we use forest green + sage, not their palette)
- Their "Register Now" gated form approach
- Generic stock layout without brand motifs

### Key Differentiators for Bougain Media
1. Topographic line animations (signature visual)
2. Pill-shaped service tags (directly from Instagram)
3. Serif body + sans headline pairing
4. Sage green "B" logo watermark throughout
5. WhatsApp-first contact (important for Indian market)

### Responsive Breakpoints

| Name | Width | Layout Changes |
|------|-------|----------------|
| Mobile | < 640px | Single column, hamburger nav, stacked hero |
| Tablet | 640–1024px | 2-col services, condensed nav |
| Desktop | > 1024px | Full layout, side-by-side contact |
| Wide | > 1440px | Max-width container 1280px |

---

## 11. Asset Inventory

### Provided Assets (`/images/`)

| File | Type | Use |
|------|------|-----|
| `WhatsApp Image ...11.23.33 AM.jpeg` | Brand hero graphic | Hero reference, topo lines, tagline |
| `WhatsApp Image ...11.23.33 AM (1).jpeg` | Contact graphic | Contact section design reference |
| `WhatsApp Image ...11.23.33 AM (2).jpeg` | Services graphic | Services section design reference |
| `WhatsApp Image ...11.23.34 AM.jpeg` | About copy slide 2 | About section copy |
| `WhatsApp Image ...11.23.34 AM (1).jpeg` | About copy slide 1 | About section copy |

### Assets Still Needed

| Asset | Format | Priority | Notes |
|-------|--------|----------|-------|
| Logo (transparent PNG/SVG) | SVG + PNG | **Deferred** | Client will provide later — use text wordmark placeholder until then |
| Favicon | ICO/SVG | Medium | Can generate from logo once received |
| Portfolio project images (6–12) | JPG/WebP | **High** | |
| Client logos (with permission) | PNG | Medium | |
| Team photos (optional) | JPG | Low | Useful for careers "Why Join Us" section |
| OG image for social sharing | 1200×630 PNG | Medium | |
| Instagram handle/URL | — | High | |
| Business location/city | — | Medium | Used in job location defaults |
| Real stats (projects, clients, etc.) | — | Medium | |
| Admin login email(s) | — | **High** | Who gets access to `/admin` |

---

## 12. Tech Stack Recommendation

### Recommended: Next.js + Supabase + Tailwind CSS

The admin panel and dynamic careers page require a database and authentication. Supabase provides both with a generous free tier and minimal setup.

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15** (App Router) | SEO, API routes, server components |
| Styling | **Tailwind CSS v4** | Rapid styling, design tokens |
| Database | **Supabase (PostgreSQL)** | Free tier, real-time ready, easy CRUD |
| Auth | **Supabase Auth** | Protects `/admin` routes, email/password login |
| File storage | **Supabase Storage** | Resume PDF uploads from applications |
| ORM (optional) | **Prisma** | Type-safe queries if preferred over Supabase client |
| Animation | **Framer Motion** | Scroll reveals, hero animation |
| Forms (public) | **React Hook Form + Zod** | Validation on contact + application forms |
| Admin UI | **shadcn/ui** | Polished tables, forms, dialogs for admin panel |
| Email notifications | **Resend** | Notify admin on new job applications |
| Hosting | **Vercel** | Zero-config deploy, pairs with Supabase |
| Images | **next/image** + WebP | Auto optimization |
| Icons | **Lucide React** | Clean, consistent |
| Fonts | **next/font** (Google Fonts) | No layout shift |

### Why Supabase over a custom backend
- No separate server to maintain
- PostgreSQL is reliable for careers + applications data
- Built-in file storage for resume uploads
- Auth middleware works cleanly with Next.js
- Free tier sufficient for a marketing agency site
- Easy to extend for portfolio/blog admin later

### Environment Variables (`.env.local`)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, never expose to client

# Admin
ADMIN_EMAIL=                      # initial admin account

# Email (Resend)
RESEND_API_KEY=
NOTIFICATION_EMAIL=mediaabougain@gmail.com

# Site
NEXT_PUBLIC_SITE_URL=https://bougainmedia.com
```

### Project Folder Structure (planned)

```
bougain-media/
├── PROJECT_PLAN.md
├── README.md
├── prisma/                         # if using Prisma
│   └── schema.prisma
├── supabase/
│   └── migrations/                 # SQL migrations
├── public/
│   ├── images/
│   │   ├── logo.svg               # placeholder until client provides
│   │   ├── hero-bg.webp
│   │   └── portfolio/
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Home
│   │   ├── globals.css
│   │   ├── careers/
│   │   │   ├── page.tsx            # Job listings
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Job detail + apply
│   │   ├── admin/
│   │   │   ├── layout.tsx          # Admin shell (sidebar)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── careers/
│   │   │   │   ├── page.tsx        # List all jobs
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx
│   │   │   └── applications/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── careers/
│   │       │   ├── route.ts
│   │       │   └── [slug]/route.ts
│   │       ├── applications/
│   │       │   └── route.ts
│   │       └── admin/
│   │           └── careers/
│   │               ├── route.ts
│   │               └── [id]/route.ts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Stats.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── careers/
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   ├── JobDetail.tsx
│   │   │   └── ApplicationForm.tsx
│   │   ├── admin/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── JobForm.tsx
│   │   │   ├── JobTable.tsx
│   │   │   └── ApplicationTable.tsx
│   │   └── ui/                     # shadcn components
│   │       ├── Button.tsx
│   │       ├── ServicePill.tsx
│   │       └── SectionLabel.tsx
│   ├── lib/
│   │   ├── constants.ts            # static copy, colors, contact info
│   │   ├── supabase/
│   │   │   ├── client.ts           # browser client
│   │   │   ├── server.ts           # server client
│   │   │   └── middleware.ts
│   │   └── validations/
│   │       ├── career.ts           # Zod schemas
│   │       └── application.ts
│   └── middleware.ts               # Protect /admin routes
├── tailwind.config.ts
├── package.json
└── .env.local
```

---

## 13. Development Phases

### Phase 1 — Foundation (Days 1–2)
- [ ] Initialize Next.js project with Tailwind + shadcn/ui
- [ ] Set up Supabase project (database, auth, storage bucket)
- [ ] Run database migrations (careers + applications tables)
- [ ] Set up design tokens (colors, fonts, spacing)
- [ ] Build Navbar + Footer (text wordmark placeholder for logo)
- [ ] Build Hero section with topo line animation
- [ ] Mobile responsive nav

### Phase 2 — Core Public Site (Days 3–5)
- [ ] About section with brand copy
- [ ] Services section with 6 pill cards
- [ ] Contact section with form + info pills
- [ ] WhatsApp floating button
- [ ] Scroll animations
- [ ] Portfolio grid (placeholder or real images)
- [ ] Stats counter section
- [ ] SEO meta tags + OG image

### Phase 3 — Careers Page (Days 6–7)
- [ ] Public `/careers` listing page (reads published jobs from DB)
- [ ] Job detail page `/careers/[slug]`
- [ ] Application form with resume upload
- [ ] Empty state when no jobs published
- [ ] Email notification on new application (Resend)
- [ ] SEO per job posting

### Phase 4 — Admin Panel (Days 8–10)
- [ ] Supabase Auth + middleware route protection
- [ ] Admin login page (`/admin/login`)
- [ ] Admin dashboard with stats overview
- [ ] Careers CRUD: list, create, edit, publish, close, delete
- [ ] Job form with slug auto-generation
- [ ] Applications list view (read submitted applications)
- [ ] Resume download from Supabase Storage

### Phase 5 — Launch (Days 11–12)
- [ ] Replace logo placeholder when client provides file
- [ ] Performance audit (Lighthouse > 90)
- [ ] Cross-browser + mobile testing
- [ ] Deploy to Vercel + connect Supabase production
- [ ] Create initial admin account
- [ ] Connect custom domain (if available)
- [ ] Seed 1–2 sample job postings for demo

### Phase 6 — Post-Launch (ongoing)
- [ ] Add real portfolio projects
- [ ] Add client logos
- [ ] Extend admin: portfolio management
- [ ] Extend admin: contact form submissions viewer
- [ ] Analytics (Google Analytics / Plausible)
- [ ] Privacy policy page

---

## 14. Open Items & Client Checklist

Please provide the following before or during build:

### Must Have
- [ ] Confirm brand name spelling: **Bougain Media** vs **Bougain Mediaa**
- [ ] Instagram profile URL
- [ ] **Admin email address(es)** for `/admin` login access
- [ ] 6+ portfolio images / project screenshots
- [ ] Permission to use client names/logos in portfolio

### Provided Later
- [ ] **Logo** in high resolution (PNG or SVG) — text wordmark used as placeholder until received

### Nice to Have
- [ ] Real stats (projects completed, clients served, etc.)
- [ ] Business address / city for footer and default job locations
- [ ] Team member names and roles (for careers "Why Join Us")
- [ ] Client testimonials (quote + name + company)
- [ ] Custom domain name (e.g., bougainmedia.com)
- [ ] Sample job posting content for launch (1–2 roles)

### Decisions Needed
- [ ] Domain and hosting preference?
- [ ] Any additional services not listed?
- [ ] Target audience: local (city-specific) or pan-India?
- [ ] Application flow: form with resume upload, or email-only apply?
- [ ] Should closed jobs be hidden entirely or show as "Position Filled"?

---

## Quick Reference Card

```
Brand:     Bougain Mediaa
Tagline:   Big ideas. Bigger Results.
Email:     mediaabougain@gmail.com
Phone:     +91 8138-869120
WhatsApp:  +91 97787-37896

Primary:   #0F3D2E (forest green)
Accent:    #B8DBD4 (mint/sage lines)
Background:#F5F3EF (cream)

Services:  PPC · Content · Social Media · Web Dev · SEO · Email

Routes:    /  /careers  /careers/[slug]  /admin
Admin:     Careers CRUD + application viewer
Logo:      Placeholder until client provides file
```

---

## Plan Status Summary

### ✅ Complete (documented & decided)
- Brand identity, colors, typography
- All copy from Instagram assets
- Home page structure (7 sections)
- Careers page + job application flow
- Admin panel (careers CRUD, applications viewer)
- Database schema, API routes, folder structure
- Tech stack (Next.js + Supabase + Tailwind)
- 6-phase development timeline

### ⏳ Waiting on you (can build without, add later)
| Item | Blocks build? |
|------|---------------|
| Logo file | No — text placeholder ready |
| Portfolio images | No — placeholders OK |
| Admin email | Yes — needed before admin goes live |
| Instagram URL | No — add to footer when ready |
| Stats / testimonials | No — optional sections |
| Domain name | No — Vercel URL works for dev |

### ▶️ When you're ready to build
Say **"start Phase 1"** and development begins. You can drop logo, portfolio, and other assets into the project anytime — nothing blocks the initial build.

---

*This document is the single source of truth for the Bougain Media website project. Update it as decisions are made and assets are received.*
