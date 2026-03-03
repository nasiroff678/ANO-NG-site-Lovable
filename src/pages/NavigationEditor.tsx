import { useState } from 'react';
import { useNavigation, useUpdateNavigation, useCreateNavigationItem, useDeleteNavigationItem } from '@/hooks/useNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, ChevronUp, ChevronDown, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NavigationEditor = () => {
    const { items, isLoading } = useNavigation();
    const updateNav = useUpdateNavigation();
    const createNav = useCreateNavigationItem();
    const deleteNav = useDeleteNavigationItem();
    const { toast } = useToast();
    const [newLabel, setNewLabel] = useState('');
    const [newHref, setNewHref] = useState('');

    const handleAdd = async () => {
        if (!newLabel || !newHref) return;
        try {
            await createNav.mutateAsync({
                label: newLabel,
                href: newHref,
                sort_order: items.length + 1,
                is_visible: true,
                parent_id: null,
                location: 'header',
            });
            setNewLabel('');
            setNewHref('');
            toast({ title: 'Добавлено!' });
        } catch {
            toast({ title: 'Ошибка', variant: 'destructive' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteNav.mutateAsync(id);
            toast({ title: 'Удалено!' });
        } catch {
            toast({ title: 'Ошибка', variant: 'destructive' });
        }
    };

    const handleUpdate = async (id: string, updates: any) => {
        try {
            await updateNav.mutateAsync({ id, ...updates });
        } catch {
            toast({ title: 'Ошибка', variant: 'destructive' });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Навигация</h1>
                <p className="text-sm text-gray-500 mt-1">Управление пунктами меню</p>
            </div>

            <div className="space-y-3 mb-8">
                {items.map((item, i) => (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3"
                    >
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => {
                                    if (i > 0) {
                                        handleUpdate(item.id, { sort_order: items[i - 1].sort_order });
                                        handleUpdate(items[i - 1].id, { sort_order: item.sort_order });
                                    }
                                }}
                                disabled={i === 0}
                                className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                                <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    if (i < items.length - 1) {
                                        handleUpdate(item.id, { sort_order: items[i + 1].sort_order });
                                        handleUpdate(items[i + 1].id, { sort_order: item.sort_order });
                                    }
                                }}
                                disabled={i === items.length - 1}
                                className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex-1 grid grid-cols-2 gap-3">
                            <Input
                                defaultValue={item.label}
                                onBlur={(e) => handleUpdate(item.id, { label: e.target.value })}
                                className="text-sm"
                            />
                            <Input
                                defaultValue={item.href}
                                onBlur={(e) => handleUpdate(item.id, { href: e.target.value })}
                                className="text-sm"
                            />
                        </div>

                        <Switch
                            checked={item.is_visible}
                            onCheckedChange={(checked) => handleUpdate(item.id, { is_visible: checked })}
                        />

                        <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-red-400 hover:text-red-600"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-sm text-gray-700 mb-3">Добавить пункт</h3>
                <div className="flex gap-3">
                    <Input
                        placeholder="Название"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                    />
                    <Input
                        placeholder="Ссылка (#section)"
                        value={newHref}
                        onChange={(e) => setNewHref(e.target.value)}
                    />
                    <Button
                        onClick={handleAdd}
                        disabled={!newLabel || !newHref}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NavigationEditor;
