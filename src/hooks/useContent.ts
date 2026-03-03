import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface SiteContent {
    id: string;
    section_name: string;
    content: Record<string, any>;
    is_visible: boolean;
    sort_order: number;
    updated_at: string;
}

export function useContent(sectionId: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['site_content', sectionId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .eq('id', sectionId)
                .single();
            if (error) throw error;
            return data as SiteContent;
        },
        staleTime: 1000 * 60 * 5,
    });

    return {
        content: data?.content ?? null,
        isVisible: data?.is_visible ?? true,
        isLoading,
        error,
        raw: data,
    };
}

export function useAllContent() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['site_content', 'all'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_content')
                .select('*')
                .order('sort_order');
            if (error) throw error;
            return data as SiteContent[];
        },
        staleTime: 1000 * 60 * 5,
    });

    return { sections: data ?? [], isLoading, error };
}

export function useUpdateContent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            content,
            is_visible,
        }: {
            id: string;
            content?: Record<string, any>;
            is_visible?: boolean;
        }) => {
            const updates: Record<string, any> = { updated_at: new Date().toISOString() };
            if (content !== undefined) updates.content = content;
            if (is_visible !== undefined) updates.is_visible = is_visible;

            const { data, error } = await supabase
                .from('site_content')
                .update(updates)
                .eq('id', id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['site_content', data.id] });
            queryClient.invalidateQueries({ queryKey: ['site_content', 'all'] });
        },
    });
}
