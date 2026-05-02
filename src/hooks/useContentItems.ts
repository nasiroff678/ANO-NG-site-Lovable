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

type LegacyCollectionConfig = {
    sectionId: string;
    arrayKey: string;
};

const KEY = (category: string) => ['content_items', category];
const LEGACY_COLLECTIONS: Record<string, LegacyCollectionConfig> = {
    projects: { sectionId: 'projects', arrayKey: 'projects' },
    upcoming_events: { sectionId: 'projects', arrayKey: 'upcoming_events' },
    past_events: { sectionId: 'past_events', arrayKey: 'events' },
};

const getLegacyConfig = (category: string) => LEGACY_COLLECTIONS[category];

const isContentItemsSchemaMissing = (error: any) => {
    return error?.code === 'PGRST205' || String(error?.message || '').includes("public.content_items");
};

const createLegacyId = () => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const normalizeLegacyItems = (category: string, rawItems: any[], onlyVisible?: boolean): ContentItem[] => {
    const normalized = (Array.isArray(rawItems) ? rawItems : []).map((item, index) => ({
        id: item?.collection_item_id || `legacy-${index}`,
        category,
        data: item ?? {},
        sort_order: typeof item?.sort_order === 'number' ? item.sort_order : index,
        is_visible: typeof item?.is_visible === 'boolean' ? item.is_visible : true,
        created_at: item?.created_at || new Date(0).toISOString(),
        updated_at: item?.updated_at || new Date(0).toISOString(),
    }));

    return onlyVisible ? normalized.filter((item) => item.is_visible) : normalized;
};

async function readLegacyItems(category: string, onlyVisible?: boolean) {
    const config = getLegacyConfig(category);
    if (!config) return [] as ContentItem[];

    const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', config.sectionId)
        .maybeSingle();

    if (error) throw error;

    const rawItems = Array.isArray(data?.content?.[config.arrayKey]) ? data.content[config.arrayKey] : [];
    return normalizeLegacyItems(category, rawItems, onlyVisible);
}

async function updateLegacyItems(
    category: string,
    updater: (items: Record<string, any>[]) => Record<string, any>[]
) {
    const config = getLegacyConfig(category);
    if (!config) {
        throw new Error('Для этой коллекции не настроен резервный режим сохранения.');
    }

    const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', config.sectionId)
        .maybeSingle();

    if (error) throw error;

    const content = data?.content && typeof data.content === 'object' ? { ...data.content } : {};
    const currentItems = Array.isArray(content[config.arrayKey]) ? [...content[config.arrayKey]] : [];
    const nextItems = updater(currentItems);

    const { error: updateError } = await supabase
        .from('site_content')
        .update({
            content: {
                ...content,
                [config.arrayKey]: nextItems,
            },
            updated_at: new Date().toISOString(),
        })
        .eq('id', config.sectionId);

    if (updateError) throw updateError;

    return normalizeLegacyItems(category, nextItems, false);
}

const invalidateCategoryQueries = (qc: ReturnType<typeof useQueryClient>, category: string) => {
    qc.invalidateQueries({ queryKey: KEY(category), refetchType: 'active' });

    const config = getLegacyConfig(category);
    if (config) {
        qc.invalidateQueries({ queryKey: ['site_content', config.sectionId], refetchType: 'active' });
        qc.invalidateQueries({ queryKey: ['site_content', 'all'], refetchType: 'active' });
    }
};

export function useContentItems(category: string, opts?: { onlyVisible?: boolean }) {
    const { data, isLoading, error } = useQuery({
        queryKey: KEY(category),
        enabled: !!category,
        queryFn: async () => {
            let query = supabase
                .from('content_items')
                .select('*')
                .eq('category', category)
                .order('sort_order', { ascending: true })
                .order('created_at', { ascending: true });
            if (opts?.onlyVisible) query = query.eq('is_visible', true);

            const { data, error } = await query;
            if (error) {
                if (isContentItemsSchemaMissing(error)) {
                    return readLegacyItems(category, opts?.onlyVisible);
                }
                throw error;
            }

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
            const payload = {
                category: input.category,
                data: input.data,
                sort_order: input.sort_order ?? 0,
                is_visible: input.is_visible ?? true,
            };

            const { data, error } = await supabase.from('content_items').insert(payload).select().single();
            if (!error) return data as ContentItem;

            if (!isContentItemsSchemaMissing(error)) throw error;

            const createdAt = new Date().toISOString();
            const legacyItem = {
                ...input.data,
                collection_item_id: createLegacyId(),
                sort_order: input.sort_order ?? 0,
                is_visible: input.is_visible ?? true,
                created_at: createdAt,
                updated_at: createdAt,
            };

            const items = await updateLegacyItems(input.category, (currentItems) => [...currentItems, legacyItem]);
            return items[items.length - 1] as ContentItem;
        },
        onSuccess: (item) => {
            invalidateCategoryQueries(qc, item.category);
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

            if (!error) {
                if (!data || data.length === 0) {
                    throw new Error('Изменения не сохранены: нет прав (RLS). Проверьте что вы вошли как админ.');
                }
                return data[0] as ContentItem;
            }

            if (!isContentItemsSchemaMissing(error)) throw error;

            const items = await updateLegacyItems(input.category, (currentItems) => {
                const index = currentItems.findIndex((item, idx) => (item?.collection_item_id || `legacy-${idx}`) === input.id);
                if (index === -1) {
                    throw new Error('Запись не найдена. Обновите страницу и попробуйте снова.');
                }

                const currentItem = currentItems[index] ?? {};
                currentItems[index] = {
                    ...currentItem,
                    ...(input.data ?? {}),
                    sort_order: input.sort_order ?? currentItem.sort_order ?? index,
                    is_visible: input.is_visible ?? (typeof currentItem.is_visible === 'boolean' ? currentItem.is_visible : true),
                    updated_at: new Date().toISOString(),
                };

                return currentItems;
            });

            const updatedItem = items.find((item) => item.id === input.id);
            if (!updatedItem) {
                throw new Error('Запись обновлена, но не удалось перечитать результат.');
            }
            return updatedItem;
        },
        onSuccess: (item) => {
            invalidateCategoryQueries(qc, item.category);
        },
    });
}

export function useDeleteContentItem() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (input: { id: string; category: string }) => {
            const { error } = await supabase.from('content_items').delete().eq('id', input.id);
            if (!error) return input;

            if (!isContentItemsSchemaMissing(error)) throw error;

            await updateLegacyItems(input.category, (currentItems) => {
                const index = currentItems.findIndex((item, idx) => (item?.collection_item_id || `legacy-${idx}`) === input.id);
                if (index === -1) {
                    throw new Error('Запись не найдена. Обновите страницу и попробуйте снова.');
                }
                currentItems.splice(index, 1);
                return currentItems;
            });

            return input;
        },
        onSuccess: (input) => {
            invalidateCategoryQueries(qc, input.category);
        },
    });
}
