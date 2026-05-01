// Field definitions per content_items category — shared between list and editor.
export interface ItemFieldDef {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'image' | 'image_array';
}

export interface CollectionConfig {
    category: string;
    title: string;
    description: string;
    titleField: string; // which field to show as the row title in the list
    subtitleField?: string;
    imageField?: string;
    fields: ItemFieldDef[];
}

export const COLLECTIONS: Record<string, CollectionConfig> = {
    projects: {
        category: 'projects',
        title: 'Проекты',
        description: 'Текущие и предстоящие проекты организации',
        titleField: 'title',
        subtitleField: 'audience',
        imageField: 'image',
        fields: [
            { key: 'title', label: 'Название', type: 'text' },
            { key: 'desc', label: 'Описание', type: 'textarea' },
            { key: 'audience', label: 'Аудитория', type: 'text' },
            { key: 'startDate', label: 'Дата начала (напр. 15 июня 2026)', type: 'text' },
            { key: 'endDate', label: 'Дата завершения (ГГГГ-ММ-ДД)', type: 'text' },
            { key: 'image', label: 'Изображение', type: 'image' },
        ],
    },
    upcoming_events: {
        category: 'upcoming_events',
        title: 'Ближайшие события',
        description: 'События, которые скоро состоятся',
        titleField: 'title',
        subtitleField: 'location',
        fields: [
            { key: 'date', label: 'Дата (напр. 15 июня 2026)', type: 'text' },
            { key: 'endDate', label: 'Дата завершения (ГГГГ-ММ-ДД)', type: 'text' },
            { key: 'title', label: 'Название', type: 'text' },
            { key: 'location', label: 'Место', type: 'text' },
        ],
    },
    past_events: {
        category: 'past_events',
        title: 'Прошедшие мероприятия',
        description: 'Архив проведённых мероприятий с фотоотчётами',
        titleField: 'title',
        subtitleField: 'date',
        imageField: 'image',
        fields: [
            { key: 'date', label: 'Дата (напр. 15 марта 2025)', type: 'text' },
            { key: 'title', label: 'Название', type: 'text' },
            { key: 'location', label: 'Место', type: 'text' },
            { key: 'participants', label: 'Участников', type: 'number' },
            { key: 'description', label: 'Описание', type: 'textarea' },
            { key: 'image', label: 'Главное изображение', type: 'image' },
            { key: 'photos', label: 'Фотоотчёт', type: 'image_array' },
            { key: 'web_link_url', label: 'Веб-ссылка (Подробнее)', type: 'text' },
        ],
    },
};
