import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    useContentItems, useCreateContentItem, useUpdateContentItem, useDeleteContentItem,
    type ContentItem,
} from '@/hooks/useContentItems';
import { COLLECTIONS } from '@/lib/collections';
import ContentItemFormDialog from '@/components/admin/ContentItemFormDialog';

const CollectionEditor = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const { toast } = useToast();
    const config = category ? COLLECTIONS[category] : undefined;

    const { items, isLoading } = useContentItems(category || '');
    const createM = useCreateContentItem();
    const updateM = useUpdateContentItem();
    const deleteM = useDeleteContentItem();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<ContentItem | null>(null);

    if (!config) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">Коллекция не найдена</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/dashboard')}>Назад</Button>
            </div>
        );
    }

    const handleAdd = () => {
        setEditingItem(null);
        setDialogOpen(true);
    };

    const handleEdit = (item: ContentItem) => {
        setEditingItem(item);
        setDialogOpen(true);
    };

    const handleSave = async (data: Record<string, any>) => {
        try {
            if (editingItem) {
                await updateM.mutateAsync({ id: editingItem.id, category: config.category, data });
                toast({ title: 'Сохранено', description: 'Запись обновлена' });
            } else {
                const maxOrder = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
                await createM.mutateAsync({ category: config.category, data, sort_order: maxOrder + 1 });
                toast({ title: 'Создано', description: 'Запись добавлена' });
            }
            setDialogOpen(false);
        } catch (e: any) {
            toast({ title: 'Ошибка', description: e.message || 'Не удалось сохранить', variant: 'destructive' });
        }
    };

    const handleToggle = async (item: ContentItem) => {
        try {
            await updateM.mutateAsync({ id: item.id, category: config.category, is_visible: !item.is_visible });
        } catch (e: any) {
            toast({ title: 'Ошибка', description: e.message, variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!confirmDelete) return;
        try {
            await deleteM.mutateAsync({ id: confirmDelete.id, category: config.category });
            toast({ title: 'Удалено', description: 'Запись удалена' });
            setConfirmDelete(null);
        } catch (e: any) {
            toast({ title: 'Ошибка', description: e.message, variant: 'destructive' });
        }
    };

    const buildEmpty = () => {
        const empty: Record<string, any> = {};
        config.fields.forEach((f) => {
            empty[f.key] = f.type === 'number' ? 0 : f.type === 'image_array' ? [] : '';
        });
        return empty;
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/collections')}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Назад
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
                    <p className="text-sm text-gray-500 mt-1">{config.description}</p>
                </div>
                <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" /> Добавить
                </Button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                </div>
            ) : items.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                    <p className="text-gray-500 mb-4">Записей пока нет</p>
                    <Button onClick={handleAdd} variant="outline">
                        <Plus className="w-4 h-4 mr-2" /> Создать первую
                    </Button>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => {
                        const title = item.data[config.titleField] || '(без названия)';
                        const subtitle = config.subtitleField ? item.data[config.subtitleField] : '';
                        const image = config.imageField ? item.data[config.imageField] : '';
                        return (
                            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                                {image ? (
                                    <img src={image} alt="" className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold truncate ${item.is_visible ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {title}
                                    </h3>
                                    {subtitle && <p className="text-sm text-gray-500 truncate">{subtitle}</p>}
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        {item.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        <Switch checked={item.is_visible} onCheckedChange={() => handleToggle(item)} />
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => setConfirmDelete(item)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <ContentItemFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={editingItem ? `Редактировать: ${editingItem.data[config.titleField] || ''}` : `Новая запись: ${config.title}`}
                initialData={editingItem?.data ?? buildEmpty()}
                fields={config.fields}
                saving={createM.isPending || updateM.isPending}
                onSave={handleSave}
            />

            <AlertDialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
                        <AlertDialogDescription>
                            «{confirmDelete?.data[config.titleField]}» будет удалена навсегда. Это действие нельзя отменить.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default CollectionEditor;
