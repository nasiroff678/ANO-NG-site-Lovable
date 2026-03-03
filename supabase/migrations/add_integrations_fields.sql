-- Add extra integration settings
INSERT INTO public.site_settings (key, value, label, type, category) VALUES
('yandex_metrika_id', '', 'Яндекс.Метрика ID', 'text', 'integrations'),
('google_analytics_id', '', 'Google Analytics ID', 'text', 'integrations'),
('privacy_policy_url', '/docs/privacy-policy.html', 'Политика конфиденциальности (URL)', 'text', 'integrations'),
('consent_agreement_url', '/docs/consent-agreement.html', 'Соглашение на обработку ПД (URL)', 'text', 'integrations')
ON CONFLICT (key) DO NOTHING;
