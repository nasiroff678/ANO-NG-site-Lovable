import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ImageUploader from './ImageUploader';
import MultiImageUploader from './MultiImageUploader';

interface FieldConfig {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'image' | 'image_array';
}

interface ArrayFieldEditorProps {
    label: string;
    items: Record<string, any>[];
    fields: FieldConfig[];
    onChange: (items: Record<string, any>[]) => void;
    maxItems?: number;
}

const ArrayFieldEditor = ({ label, items, fields, onChange, maxItems }: ArrayFieldEditorProps) => {
    const addItem = () => {
        const newItem: Record<string, any> = {};
        fields.forEach((f) => {
            newItem[f.key] = f.type === 'number' ? 0 : '';
        });
        onChange([...items, newItem]);
    };

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, key: string, value: any) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [key]: value };
        onChange(updated);
    };

    const moveItem = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= items.length) return;
        const updated = [...items];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        onChange(updated);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                {(!maxItems || items.length < maxItems) && (
                    <Button type="button" variant="outline" size="sm" onClick={addItem}>
                        <Plus className="w-4 h-4 mr-1" /> Добавить
                    </Button>
                )}
            </div>

            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">#{i + 1}</span>
                            <div className="flex items-center gap-1">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveItem(i, 'up')}
                                    disabled={i === 0}
                                    className="h-7 w-7 p-0"
                                >
                                    <ChevronUp className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => moveItem(i, 'down')}
                                    disabled={i === items.length - 1}
                                    className="h-7 w-7 p-0"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(i)}
                                    className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-3">
                            {fields.map((field) => (
                                <div key={field.key}>
                                    {field.type === 'image' ? (
                                        <ImageUploader
                                            label={field.label}
                                            value={item[field.key] || ''}
                                            onChange={(url) => updateItem(i, field.key, url)}
                                        />
                                    ) : field.type === 'image_array' ? (
                                        <MultiImageUploader
                                            label={field.label}
                                            value={item[field.key] || []}
                                            onChange={(urls) => updateItem(i, field.key, urls)}
                                        />
                                    ) : field.type === 'textarea' ? (
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                {field.label}
                                            </label>
                                            <Textarea
                                                value={item[field.key] || ''}
                                                onChange={(e) => updateItem(i, field.key, e.target.value)}
                                                rows={2}
                                            />
                                        </div>
                                    ) : field.type === 'number' ? (
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                {field.label}
                                            </label>
                                            <Input
                                                type="number"
                                                value={item[field.key] || 0}
                                                onChange={(e) => updateItem(i, field.key, Number(e.target.value))}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">
                                                {field.label}
                                            </label>
                                            <Input
                                                value={item[field.key] || ''}
                                                onChange={(e) => updateItem(i, field.key, e.target.value)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <p className="text-center text-sm text-gray-400 py-6">
                        Нет элементов. Нажмите «Добавить» чтобы начать.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ArrayFieldEditor;
