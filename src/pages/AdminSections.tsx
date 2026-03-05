import { useNavigate } from 'react-router-dom';
import { useAllContent, useUpdateContent } from '@/hooks/useContent';
import { Eye, EyeOff, Edit } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const AdminSections = () => {
    const { sections, isLoading } = useAllContent();
    const updateContent = useUpdateContent();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleToggleVisibility = async (id: string, currentValue: boolean) => {
        try {
            await updateContent.mutateAsync({ id, is_visible: !currentValue });
            toast({ title: 'Готово', description: `Секция ${!currentValue ? 'показана' : 'скрыта'}` });
        } catch {
            toast({ title: 'Ошибка', description: 'Не удалось обновить', variant: 'destructive' });
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Секции</h1>
                    <p className="text-sm text-gray-500 mt-1">Управление контентом секций сайта</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">{sections.length} секций</span>
                </div>
            </div>

            <div className="grid gap-3">
                {sections.map((section) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between hover:shadow-sm transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${section.is_visible
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-gray-100 text-gray-400'
                                    }`}
                            >
                                {section.is_visible ? (
                                    <Eye className="w-5 h-5" />
                                ) : (
                                    <EyeOff className="w-5 h-5" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {section.id === 'results' ? 'Результаты и отзывы' : section.section_name}
                                </h3>
                                <p className="text-xs text-gray-400">ID: {section.id}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Switch
                                checked={section.is_visible}
                                onCheckedChange={() => handleToggleVisibility(section.id, section.is_visible)}
                            />
                            <button
                                onClick={() => navigate(`/admin/sections/${section.id}`)}
                                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
                            >
                                <Edit className="w-4 h-4" /> Редактировать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSections;
