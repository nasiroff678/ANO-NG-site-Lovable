import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Submission {
    id: string;
    name: string;
    phone: string;
    email: string;
    message: string;
    form_type: string;
    status: 'new' | 'in_progress' | 'completed';
    created_at: string;
}

export const useSubmissions = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['submissions'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('form_submissions')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            return (data || []) as Submission[];
        },
    });

    return { submissions: data || [], isLoading, error };
};

export const useUpdateSubmissionStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const { error } = await supabase
                .from('form_submissions')
                .update({ status })
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submissions'] }),
    });
};

export const useDeleteSubmission = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('form_submissions')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['submissions'] }),
    });
};
