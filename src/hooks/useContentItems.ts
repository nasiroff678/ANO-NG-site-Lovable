import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface ContentItem {
    id: string;
    category: string;
    data: Record<string, any>;
    sort_order: number;
    is_visible: boolean;
    created_at: string;
    updated_at: string;
}

const KEY = (category: string) => ['content_items', category];

export function useContentItems(category: string, opts?: { onlyVisible?: boolean }) {
    const { data, isLoading, error } = useQuery({
        queryKey: KEY(category),
        queryFn: async () => {
            let query = supabase
                .from('content_items')
                .select('*')
                .eq('category', category)
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: true });
            if (opts?.onlyVisible) query = query.eq('is_visible', true);
            const { data, error } = await query;
            if (error) throw error;
            return (data ?? []) as ContentItem[];
        },
        staleTime: 1000 * 30,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    return { items: data ?? [], isLoading, error };
}

export function useCreateContentItem() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: { category: string; data: Record<string, any>; sort_order?: number; is_visible?: boolean }) => {
            const { data, error } = await supabase
                .from('content_items')
                .insert({
                    category: input.category,
                    data: input.data,
                    sort_order: input.sort_order ?? 0,
                    is_visible: input.is_visible ?? true,
                })
                .select()
                .single();
            if (error) throw error;
            return data as ContentItem;
        },
        onSuccess: (item) => {
            qc.invalidateQueries({ queryKey: KEY(item.category), refetchType: 'active' });
        },
    });
}

export function useUpdateContentItem() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: { id: string; category: string; data?: Record<string, any>; sort_order?: number; is_visible?: boolean }) => {
            const updates: Record<string, any> = {};
            if (input.data !== undefined) updates.data = input.data;
            if (input.sort_order !== undefined) updates.sort_order = input.sort_order;
            if (input.is_visible !== undefined) updates.is_visible = input.is_visible;
            const { data, error } = await supabase
                .from('content_items')
                .update(updates)
                .eq('id', input.id)
                .select();
            if (error) throw error;
            if (!data || data.length === 0) {
                throw new Error('Изменения не сохранены: нет прав (RLS). Проверьте что вы вошли как админ.');
            }
            return data[0] as ContentItem;
        },
        onSuccess: (item) => {
            qc.invalidateQueries({ queryKey: KEY(item.category), refetchType: 'active' });
        },
    });
}

export function useDeleteContentItem() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: async (input: { id: string; category: string }) => {
            const { error } = await supabase.from('content_items').delete().eq('id', input.id);
            if (error) throw error;
            return input;
        },
        onSuccess: (input) => {
            qc.invalidateQueries({ queryKey: KEY(input.category), refetchType: 'active' });
        },
    });
}
