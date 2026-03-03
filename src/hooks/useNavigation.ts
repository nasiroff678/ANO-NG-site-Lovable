import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    sort_order: number;
    is_visible: boolean;
    parent_id: string | null;
    location: 'header' | 'footer' | 'both';
}

export function useNavigation(location?: 'header' | 'footer') {
    const { data, isLoading, error } = useQuery({
        queryKey: ['navigation_items', location ?? 'all'],
        queryFn: async () => {
            let query = supabase
                .from('navigation_items')
                .select('*')
                .order('sort_order');
            if (location) {
                query = query.or(`location.eq.${location},location.eq.both`);
            }
            const { data, error } = await query;
            if (error) throw error;
            return data as NavigationItem[];
        },
        staleTime: 1000 * 60 * 5,
    });

    return { items: data ?? [], isLoading, error };
}

export function useUpdateNavigation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (items: Partial<NavigationItem> & { id: string }) => {
            const { error } = await supabase
                .from('navigation_items')
                .update({ ...items, updated_at: new Date().toISOString() })
                .eq('id', items.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['navigation_items'] });
        },
    });
}

export function useCreateNavigationItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (item: Omit<NavigationItem, 'id'>) => {
            const { data, error } = await supabase
                .from('navigation_items')
                .insert(item)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['navigation_items'] });
        },
    });
}

export function useDeleteNavigationItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('navigation_items')
                .delete()
                .eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['navigation_items'] });
        },
    });
}
