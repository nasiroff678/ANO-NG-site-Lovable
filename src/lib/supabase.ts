import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ryiyjogozakefslipqpz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5aXlqb2dvemFrZWZzbGlwcXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NTcyNDQsImV4cCI6MjA4ODEzMzI0NH0.XNwP0Ilb_vkpnGu5uhUyMXRcbNxPX37zJoep0EaZs3I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
