import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface SiteSetting {
    key: string;
    value: string;
    label: string;
    type: string;
    category: string;
}

export function useSettings(category?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['site_settings', category ?? 'all'],
        queryFn: async () => {
            let query = supabase.from('site_settings').select('*');
            if (category) query = query.eq('category', category);
            const { data, error } = await query;
            if (error) throw error;
            return data as SiteSetting[];
        },
        staleTime: 0,
        gcTime: 1000 * 60,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    const settingsMap = (data ?? []).reduce(
        (acc, s) => ({ ...acc, [s.key]: s.value }),
        {} as Record<string, string>
    );

    return { settings: data ?? [], settingsMap, isLoading, error };
}

export function useSetting(key: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['site_settings', 'single', key],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', key)
                .single();
            if (error) throw error;
            return data.value as string;
        },
        staleTime: 0,
        gcTime: 1000 * 60,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    });

    return { value: data ?? '', isLoading };
}

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: { key: string; value: string }[]) => {
            for (const { key, value } of updates) {
                const { data, error } = await supabase
                    .from('site_settings')
                    .update({ value, updated_at: new Date().toISOString() })
                    .eq('key', key)
                    .select();
                if (error) throw error;
                if (!data || data.length === 0) {
                    throw new Error(`Настройка "${key}" не сохранена: нет прав на запись (RLS). Проверьте политики таблицы site_settings в Supabase.`);
                }
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['site_settings'] });
        },
    });
}
