-- Raw PostgreSQL Schema for Bougain Media

CREATE TABLE IF NOT EXISTS careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL CHECK (employment_type IN ('full-time', 'part-time', 'internship', 'contract')),
  experience_level TEXT,
  description TEXT NOT NULL,
  responsibilities TEXT[] NOT NULL DEFAULT '{}',
  requirements TEXT[] NOT NULL DEFAULT '{}',
  salary_range TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id UUID REFERENCES careers(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('video', 'photo')),
  industry TEXT NOT NULL,
  result TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  video_src TEXT,
  aspect TEXT DEFAULT '16:9' CHECK (aspect IN ('16:9', '9:16', '4:3')),
  span TEXT DEFAULT 'md' CHECK (span IN ('lg', 'sm', 'md')),
  featured BOOLEAN DEFAULT false,
  section TEXT DEFAULT 'ai-concept-ads',
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE portfolio_items ADD COLUMN IF NOT EXISTS section TEXT DEFAULT 'ai-concept-ads';

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  tag TEXT NOT NULL,
  image TEXT NOT NULL,
  video TEXT,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_careers_status ON careers(status);
CREATE INDEX IF NOT EXISTS idx_careers_slug ON careers(slug);
CREATE INDEX IF NOT EXISTS idx_applications_career_id ON applications(career_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_items(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_items(order_index);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);
