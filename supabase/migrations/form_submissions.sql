-- Create form_submissions table for tracking form submissions from the website
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    message TEXT,
    organization TEXT,
    form_type TEXT NOT NULL DEFAULT 'contact',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (forms are public)
CREATE POLICY "Anyone can submit forms" ON public.form_submissions
    FOR INSERT WITH CHECK (true);

-- Only admins can read/update/delete
CREATE POLICY "Admins can read submissions" ON public.form_submissions
    FOR SELECT USING (
        auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
    );

CREATE POLICY "Admins can update submissions" ON public.form_submissions
    FOR UPDATE USING (
        auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
    );

CREATE POLICY "Admins can delete submissions" ON public.form_submissions
    FOR DELETE USING (
        auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
    );

-- Insert sample data
INSERT INTO public.form_submissions (name, phone, email, message, form_type, status, created_at) VALUES
('Тест Пользователь', '+7912345678', 'test@mail.ru', 'Test form submission', 'contact', 'new', '2026-02-10 22:27:00+05'),
('пертор', '+7 88888888', '', '', 'partnership', 'new', '2026-02-20 22:55:00+05');
