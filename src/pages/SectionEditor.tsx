import { useParams, useNavigate } from 'react-router-dom';
import { useContent, useUpdateContent } from '@/hooks/useContent';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import ArrayFieldEditor from '@/components/admin/ArrayFieldEditor';

// Field configurations for each section
const sectionFields: Record<string, { fields: FieldDef[]; arrays: ArrayDef[] }> = {
    hero: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'subheading', label: 'Подзаголовок', type: 'textarea' },
            { key: 'badge_date', label: 'Бейдж: дата', type: 'text' },
            { key: 'badge_ogrn', label: 'Бейдж: ОГРН', type: 'text' },
            { key: 'badge_grant', label: 'Бейдж: грант', type: 'text' },
            { key: 'cta_primary_text', label: 'CTA 1: текст', type: 'text' },
            { key: 'cta_primary_href', label: 'CTA 1: ссылка', type: 'text' },
            { key: 'cta_secondary_text', label: 'CTA 2: текст', type: 'text' },
            { key: 'cta_secondary_href', label: 'CTA 2: ссылка', type: 'text' },
            { key: 'cta_tertiary_text', label: 'CTA 3: текст', type: 'text' },
            { key: 'cta_tertiary_href', label: 'CTA 3: ссылка', type: 'text' },
            { key: 'background_image', label: 'Фоновое изображение', type: 'image' },
        ],
        arrays: [],
    },
    about: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'paragraph_1', label: 'Параграф 1', type: 'textarea' },
            { key: 'paragraph_2', label: 'Параграф 2', type: 'textarea' },
            { key: 'why_us_title', label: '«Почему мы» заголовок', type: 'text' },
            { key: 'why_us_text', label: '«Почему мы» текст', type: 'textarea' },
            { key: 'director_name', label: 'Имя директора', type: 'text' },
            { key: 'director_title', label: 'Должность директора', type: 'text' },
            { key: 'director_photo', label: 'Фото директора', type: 'image' },
        ],
        arrays: [
            {
                key: 'facts',
                label: 'Факты',
                fields: [
                    { key: 'icon', label: 'Иконка', type: 'text' as const },
                    { key: 'label', label: 'Подпись', type: 'text' as const },
                    { key: 'value', label: 'Значение', type: 'text' as const },
                ],
            },
        ],
    },
    activities: {
        fields: [{ key: 'heading', label: 'Заголовок', type: 'text' }],
        arrays: [
            {
                key: 'items',
                label: 'Направления',
                fields: [
                    { key: 'icon', label: 'Иконка', type: 'text' as const },
                    { key: 'title', label: 'Название', type: 'text' as const },
                    { key: 'desc', label: 'Описание', type: 'textarea' as const },
                    { key: 'image', label: 'Изображение', type: 'image' as const },
                ],
            },
        ],
    },
    projects: {
        fields: [{ key: 'heading', label: 'Заголовок', type: 'text' }],
        arrays: [
            {
                key: 'projects',
                label: 'Проекты',
                fields: [
                    { key: 'title', label: 'Название', type: 'text' as const },
                    { key: 'desc', label: 'Описание', type: 'textarea' as const },
                    { key: 'audience', label: 'Аудитория', type: 'text' as const },
                    { key: 'startDate', label: 'Дата начала (напр. 15 июня)', type: 'text' as const },
                    { key: 'endDate', label: 'Дата завершения (ГГГГ-ММ-ДД)', type: 'text' as const },
                    { key: 'image', label: 'Изображение', type: 'image' as const },
                ],
            },
            {
                key: 'upcoming_events',
                label: 'Ближайшие события',
                fields: [
                    { key: 'date', label: 'Дата', type: 'text' as const },
                    { key: 'endDate', label: 'Дата завершения (ГГГГ-ММ-ДД)', type: 'text' as const },
                    { key: 'title', label: 'Название', type: 'text' as const },
                    { key: 'location', label: 'Место', type: 'text' as const },
                ],
            },
        ],
    },
    past_events: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'subtitle', label: 'Подзаголовок', type: 'textarea' },
        ],
        arrays: [
            {
                key: 'events',
                label: 'Мероприятия',
                fields: [
                    { key: 'date', label: 'Дата', type: 'text' as const },
                    { key: 'title', label: 'Название', type: 'text' as const },
                    { key: 'location', label: 'Место', type: 'text' as const },
                    { key: 'participants', label: 'Участников', type: 'number' as const },
                    { key: 'description', label: 'Описание', type: 'textarea' as const },
                    { key: 'image', label: 'Изображение', type: 'image' as const },
                    { key: 'photos', label: 'Фотоотчёт', type: 'image_array' as const },
                    { key: 'web_link_url', label: 'Веб-ссылка (Подробнее)', type: 'text' as const },
                ],
            },
        ],
    },
    results: {
        fields: [{ key: 'heading', label: 'Заголовок', type: 'text' }],
        arrays: [
            {
                key: 'stats',
                label: 'Статистика',
                fields: [
                    { key: 'icon', label: 'Иконка', type: 'text' as const },
                    { key: 'value', label: 'Значение', type: 'text' as const },
                    { key: 'label', label: 'Подпись', type: 'text' as const },
                ],
            },
            {
                key: 'testimonials',
                label: 'Отзывы',
                fields: [
                    { key: 'text', label: 'Текст отзыва', type: 'textarea' as const },
                    { key: 'author', label: 'Автор', type: 'text' as const },
                    { key: 'image', label: 'Фото автора', type: 'image' as const },
                ],
            },
        ],
    },
    team: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'volunteer_title', label: 'Заголовок волонтёрства', type: 'text' },
            { key: 'volunteer_text', label: 'Текст волонтёрства', type: 'textarea' },
            { key: 'volunteer_cta', label: 'Кнопка волонтёрства', type: 'text' },
        ],
        arrays: [
            {
                key: 'members',
                label: 'Команда',
                fields: [
                    { key: 'name', label: 'Имя', type: 'text' as const },
                    { key: 'title', label: 'Должность', type: 'text' as const },
                    { key: 'bio', label: 'Биография', type: 'textarea' as const },
                    { key: 'photo', label: 'Фото', type: 'image' as const },
                ],
            },
        ],
    },
    documents: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'footer_text', label: 'Текст внизу', type: 'textarea' },
        ],
        arrays: [
            {
                key: 'documents',
                label: 'Документы',
                fields: [
                    { key: 'title', label: 'Название', type: 'text' as const },
                    { key: 'description', label: 'Описание', type: 'text' as const },
                    { key: 'file_url', label: 'URL файла', type: 'text' as const },
                    { key: 'color', label: 'Цвет (primary/accent)', type: 'text' as const },
                ],
            },
            {
                key: 'bank_details',
                label: 'Банковские реквизиты',
                fields: [
                    { key: 'label', label: 'Название поля', type: 'text' as const },
                    { key: 'value', label: 'Значение', type: 'text' as const },
                ],
            },
        ],
    },
    partnership: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'form_title', label: 'Заголовок формы', type: 'text' },
        ],
        arrays: [
            {
                key: 'partner_types',
                label: 'Типы партнёров',
                fields: [
                    { key: 'icon', label: 'Иконка', type: 'text' as const },
                    { key: 'title', label: 'Название', type: 'text' as const },
                    { key: 'desc', label: 'Описание', type: 'textarea' as const },
                ],
            },
        ],
    },
    participate: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'subtitle', label: 'Подзаголовок', type: 'textarea' },
            { key: 'form_subtitle', label: 'Подзаголовок формы', type: 'text' },
        ],
        arrays: [
            {
                key: 'tabs',
                label: 'Вкладки',
                fields: [
                    { key: 'key', label: 'Ключ (parent/school/volunteer)', type: 'text' as const },
                    { key: 'icon', label: 'Иконка', type: 'text' as const },
                    { key: 'label', label: 'Название', type: 'text' as const },
                    { key: 'desc', label: 'Описание', type: 'textarea' as const },
                ],
            },
        ],
    },
    contacts: {
        fields: [
            { key: 'heading', label: 'Заголовок', type: 'text' },
            { key: 'form_title', label: 'Заголовок формы', type: 'text' },
            { key: 'success_title', label: 'Заголовок успеха', type: 'text' },
            { key: 'success_text', label: 'Текст успеха', type: 'text' },
        ],
        arrays: [],
    },
    footer: {
        fields: [
            { key: 'org_short_name', label: 'Краткое название', type: 'text' },
            { key: 'org_full_name', label: 'Полное название', type: 'textarea' },
            { key: 'requisites_heading', label: 'Заголовок реквизитов', type: 'text' },
            { key: 'documents_heading', label: 'Заголовок документов', type: 'text' },
        ],
        arrays: [
            {
                key: 'doc_links',
                label: 'Ссылки документов',
                fields: [
                    { key: 'label', label: 'Название', type: 'text' as const },
                    { key: 'href', label: 'Ссылка', type: 'text' as const },
                ],
            },
        ],
    },
};

interface FieldDef {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'image_array';
}

interface ArrayDef {
    key: string;
    label: string;
    fields: { key: string; label: string; type: 'text' | 'textarea' | 'number' | 'image' | 'image_array' }[];
}

const SectionEditor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { content, isLoading, raw } = useContent(id || '');
    const updateContent = useUpdateContent();
    const { toast } = useToast();
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (content) {
            setFormData({ ...content });
        }
    }, [content]);

    if (!id || !sectionFields[id]) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">Секция не найдена</p>
                <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/dashboard')}>
                    Назад
                </Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const config = sectionFields[id];

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateContent.mutateAsync({ id, content: formData });
            toast({ title: 'Сохранено!', description: `Секция «${raw?.section_name}» обновлена` });
        } catch {
            toast({ title: 'Ошибка', description: 'Не удалось сохранить', variant: 'destructive' });
        }
        setSaving(false);
    };

    const updateField = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
                    <ArrowLeft className="w-4 h-4 mr-1" /> Назад
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">
                        {id === 'results' ? 'Результаты и отзывы' : raw?.section_name}
                    </h1>
                    <p className="text-sm text-gray-400">ID: {id}</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Сохранить
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                {config.fields.map((field) => (
                    <div key={field.key}>
                        {field.type === 'image' ? (
                            <ImageUploader
                                label={field.label}
                                value={formData[field.key] || ''}
                                onChange={(url) => updateField(field.key, url)}
                            />
                        ) : field.type === 'textarea' ? (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                <Textarea
                                    value={formData[field.key] || ''}
                                    onChange={(e) => updateField(field.key, e.target.value)}
                                    rows={3}
                                />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                                <Input
                                    value={formData[field.key] || ''}
                                    onChange={(e) => updateField(field.key, e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                ))}

                {config.arrays.map((arr) => (
                    <div key={arr.key} className="pt-4 border-t border-gray-100">
                        <ArrayFieldEditor
                            label={arr.label}
                            items={formData[arr.key] || []}
                            fields={arr.fields}
                            onChange={(items) => updateField(arr.key, items)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionEditor;
