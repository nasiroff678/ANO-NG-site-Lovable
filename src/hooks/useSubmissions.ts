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

export const useSubmissions = (page = 1, pageSize = 20) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['submissions', page, pageSize],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);
      if (error) throw error;
      return (data || []) as Submission[];
    },
    staleTime: 1000 * 60 * 5,
  });

  return { submissions: data ?? [], isLoading, error };
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
