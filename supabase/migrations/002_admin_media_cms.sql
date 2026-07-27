-- Migration 002: Admin Media & Content Customization CMS Schema

-- 1. Portfolio Items Table
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
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Services Table
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

-- 3. Site Settings (Key-Value Content Store for Hero, About, Contact & Captions)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_items(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_items(order_index);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);

-- RLS Policies
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read all published CMS items
CREATE POLICY "Public read portfolio_items" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Authenticated admins have full write access
CREATE POLICY "Admin write portfolio_items" ON portfolio_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Storage Bucket Creation & Policies for Media Files (videos and images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to media bucket
CREATE POLICY "Public media access" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated admins to upload & delete files in media bucket
CREATE POLICY "Admin upload media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin update media" ON storage.objects
  FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

CREATE POLICY "Admin delete media" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
