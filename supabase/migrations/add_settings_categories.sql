-- Add company settings
INSERT INTO public.site_settings (key, value, label, type, category) VALUES
('org_name', 'АНО «Новые горизонты»', 'Название организации', 'text', 'company'),
('org_short_name', 'Новые горизонты', 'Краткое название', 'text', 'company')
ON CONFLICT (key) DO NOTHING;

-- Add integrations settings
INSERT INTO public.site_settings (key, value, label, type, category) VALUES
('telegram_bot_token', '', 'Telegram Bot Token', 'text', 'integrations'),
('telegram_chat_id', '', 'Telegram Chat ID', 'text', 'integrations')
ON CONFLICT (key) DO NOTHING;
