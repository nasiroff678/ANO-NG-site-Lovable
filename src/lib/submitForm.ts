import { supabase } from '@/lib/supabase';

interface SubmitFormData {
    name: string;
    phone: string;
    email?: string;
    message?: string;
    organization?: string;
    form_type: string;
}

export const submitForm = async (data: SubmitFormData) => {
    const { error } = await supabase
        .from('form_submissions')
        .insert([{
            name: data.name,
            phone: data.phone,
            email: data.email || null,
            message: data.message || null,
            organization: data.organization || null,
            form_type: data.form_type,
            status: 'new',
        }]);
    if (error) throw error;
};
