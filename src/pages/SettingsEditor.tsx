import { useState, useEffect } from 'react';
import { useSettings, useUpdateSettings } from '@/hooks/useSettings';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const tabs = [
    { key: 'company', label: 'Компания' },
    { key: 'contacts', label: 'Контакты' },
    { key: 'social', label: 'Соцсети' },
    { key: 'seo', label: 'SEO' },
    { key: 'integrations', label: 'Интеграции' },
];

/* Field descriptions for better UX */
const fieldDescriptions: Record<string, string> = {
    site_title: 'Название сайта, отображается в заголовке браузера',
    site_description: 'Краткое описание сайта для SEO',
    org_name: 'Полное юридическое название организации',
    org_short_name: 'Краткое название для отображения на сайте',
    phone: 'Основной телефон для связи',
    email: 'Email для приёма заявок',
    address: 'Физический адрес организации',
    whatsapp_link: 'Ссылка на WhatsApp для кнопки связи',
    map_embed_url: 'Ссылка для встраивания Яндекс.Карты',
    vk_link: 'Ссылка на группу ВКонтакте',
    telegram_link: 'Ссылка на Telegram-канал',
    instagram_link: 'Ссылка на профиль Instagram',
    youtube_link: 'Ссылка на YouTube-канал',
    max_link: 'Ссылка на мессенджер MAX',
    meta_title: 'Заголовок страницы для поисковых систем',
    meta_description: 'Мета-описание для поисковой выдачи',
    meta_keywords: 'Ключевые слова через запятую',
    og_image: 'URL изображения для социальных сетей (Open Graph)',
    telegram_bot_token: 'Токен от @BotFather для отправки уведомлений',
    telegram_chat_id: 'ID чата для получения уведомлений',
    yandex_metrika_id: 'Счётчик Яндекс.Метрики для аналитики',
    google_analytics_id: 'Идентификатор Google Analytics (UA-XXXXX или G-XXXXX)',
    privacy_policy_url: 'Ссылка на страницу политики конфиденциальности',
    consent_agreement_url: 'Ссылка на страницу соглашения на обработку персональных данных',
};

const fieldPlaceholders: Record<string, string> = {
    telegram_bot_token: '123456789:AABBccDDee...',
    telegram_chat_id: '123456789',
    phone: '+7 (XXX) XXX-XX-XX',
    email: 'info@example.com',
    whatsapp_link: 'https://wa.me/7XXXXXXXXXX',
    vk_link: 'https://vk.com/...',
    telegram_link: 'https://t.me/...',
    instagram_link: 'https://instagram.com/...',
    youtube_link: 'https://youtube.com/...',
    max_link: 'https://max.ru/...',
    og_image: 'https://...',
    yandex_metrika_id: '12345678',
    google_analytics_id: 'G-XXXXXXXXXX',
    privacy_policy_url: '/docs/privacy-policy.html',
    consent_agreement_url: '/docs/consent-agreement.html',
};

const SettingsEditor = () => {
    const { settings, isLoading } = useSettings();
    const updateSettings = useUpdateSettings();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('company');
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (settings.length > 0) {
            const map: Record<string, string> = {};
            settings.forEach((s) => (map[s.key] = s.value));
            setFormData(map);
        }
    }, [settings]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const catSettings = settings.filter((s) => s.category === activeTab);
            const updates = catSettings.map((s) => ({ key: s.key, value: formData[s.key] || '' }));
            await updateSettings.mutateAsync(updates);
            toast({ title: 'Настройки сохранены!' });
        } catch {
            toast({ title: 'Ошибка при сохранении', variant: 'destructive' });
        }
        setSaving(false);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const activeSettings = settings.filter((s) => s.category === activeTab);

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
                <p className="text-sm text-gray-500 mt-1">Управление глобальными настройками сайта</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-0 border-b border-gray-200 mb-0 bg-white rounded-t-xl px-1 pt-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-3 text-sm font-medium transition-all relative ${activeTab === tab.key
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-6">
                {activeSettings.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <p>Настройки для этой категории пока не добавлены</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {activeSettings.map((setting) => (
                            <div key={setting.key}>
                                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                                    {setting.label}
                                </label>
                                {setting.type === 'textarea' ? (
                                    <Textarea
                                        value={formData[setting.key] || ''}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, [setting.key]: e.target.value }))
                                        }
                                        placeholder={fieldPlaceholders[setting.key] || ''}
                                        rows={3}
                                        className="bg-gray-50 border-gray-200 focus:bg-white"
                                    />
                                ) : (
                                    <Input
                                        type={setting.type === 'email' ? 'email' : setting.type === 'url' ? 'url' : 'text'}
                                        value={formData[setting.key] || ''}
                                        onChange={(e) =>
                                            setFormData((prev) => ({ ...prev, [setting.key]: e.target.value }))
                                        }
                                        placeholder={fieldPlaceholders[setting.key] || ''}
                                        className="bg-gray-50 border-gray-200 focus:bg-white"
                                    />
                                )}
                                {fieldDescriptions[setting.key] && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        {fieldDescriptions[setting.key]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Save button */}
                {activeSettings.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                            {saving ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Сохранить
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsEditor;
