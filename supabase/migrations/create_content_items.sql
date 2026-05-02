-- Migration: Create content_items table
-- Run this in Supabase Dashboard -> SQL Editor

CREATE TABLE IF NOT EXISTS public.content_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  data jsonb NOT NULL DEFAULT '{}',
  sort_order integer NOT NULL DEFAULT 0,
  is_visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS content_items_category_idx ON public.content_items (category);
CREATE INDEX IF NOT EXISTS content_items_sort_order_idx ON public.content_items (category, sort_order);

ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous) to read items
CREATE POLICY IF NOT EXISTS "Allow public read" ON public.content_items
  FOR SELECT USING (true);

-- Allow authenticated users (admins) to write
CREATE POLICY IF NOT EXISTS "Allow auth write" ON public.content_items
  FOR ALL USING (auth.role() = 'authenticated');
