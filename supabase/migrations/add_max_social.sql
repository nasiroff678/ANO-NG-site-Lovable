-- Add MAX messenger to social settings
INSERT INTO public.site_settings (key, value, label, type, category) VALUES
('max_link', '', 'MAX ссылка', 'url', 'social')
ON CONFLICT (key) DO NOTHING;
