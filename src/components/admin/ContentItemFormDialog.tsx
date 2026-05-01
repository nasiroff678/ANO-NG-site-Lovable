import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Save } from 'lucide-react';
import ImageUploader from './ImageUploader';
import MultiImageUploader from './MultiImageUploader';
import type { ItemFieldDef } from '@/lib/collections';

interface ContentItemFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    initialData: Record<string, any>;
    fields: ItemFieldDef[];
    saving: boolean;
    onSave: (data: Record<string, any>) => void;
}

export default function ContentItemFormDialog({
    open,
    onOpenChange,
    title,
    initialData,
    fields,
    saving,
    onSave,
}: ContentItemFormDialogProps) {
    const [data, setData] = useState<Record<string, any>>(initialData);

    // Reset when dialog opens with new item
    const [lastInit, setLastInit] = useState(initialData);
    if (lastInit !== initialData) {
        setLastInit(initialData);
        setData(initialData);
    }

    const update = (k: string, v: any) => setData((p) => ({ ...p, [k]: v }));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {fields.map((field) => (
                        <div key={field.key}>
                            {field.type === 'image' ? (
                                <ImageUploader
                                    label={field.label}
                                    value={data[field.key] || ''}
                                    onChange={(url) => update(field.key, url)}
                                />
                            ) : field.type === 'image_array' ? (
                                <MultiImageUploader
                                    label={field.label}
                                    value={data[field.key] || []}
                                    onChange={(urls) => update(field.key, urls)}
                                />
                            ) : field.type === 'textarea' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                    <Textarea
                                        value={data[field.key] || ''}
                                        onChange={(e) => update(field.key, e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            ) : field.type === 'number' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                    <Input
                                        type="number"
                                        value={data[field.key] ?? 0}
                                        onChange={(e) => update(field.key, Number(e.target.value))}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                    <Input
                                        value={data[field.key] || ''}
                                        onChange={(e) => update(field.key, e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
                        Отмена
                    </Button>
                    <Button onClick={() => onSave(data)} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Сохранить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
