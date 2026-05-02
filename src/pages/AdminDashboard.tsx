import { useNavigate } from 'react-router-dom';
import { useAllContent } from '@/hooks/useContent';
import { useSubmissions } from '@/hooks/useSubmissions';
import { FileText, Clock, CheckCircle, Layers } from 'lucide-react';

const AdminDashboard = () => {
    const { sections, isLoading: sectionsLoading } = useAllContent();
    const { submissions, isLoading: submissionsLoading } = useSubmissions();
    const navigate = useNavigate();

    const isLoading = sectionsLoading || submissionsLoading;

    const totalSubmissions = submissions.length;
    const newSubmissions = submissions.filter(s => s.status === 'new').length;
    const completedSubmissions = submissions.filter(s => s.status === 'completed').length;
    const totalSections = sections.length;
    const visibleSections = sections.filter(s => s.is_visible).length;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Обзор</h1>
                <p className="text-sm text-gray-500 mt-1">Добро пожаловать в админ-панель CMS</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <div
                    className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => navigate('/admin/submissions')}
                >
                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Всего заявок</p>
                        <p className="text-2xl font-bold text-gray-900">{totalSubmissions}</p>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => navigate('/admin/submissions')}
                >
                    <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Новые</p>
                        <p className="text-2xl font-bold text-gray-900">{newSubmissions}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Завершено</p>
                        <p className="text-2xl font-bold text-gray-900">{completedSubmissions}</p>
                    </div>
                </div>

                <div
                    className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-shadow"
                    onClick={() => navigate('/admin/sections')}
                >
                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Секции</p>
                        <p className="text-2xl font-bold text-gray-900">{visibleSections}/{totalSections}</p>
                    </div>
                </div>
            </div>

            {/* Quick Start */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-semibold text-gray-900 mb-5">Быстрый старт</h2>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/admin/submissions')}
                        className="flex items-center gap-4 w-full text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                    >
                        <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            1
                        </span>
                        <div>
                            <p className="font-medium text-gray-900">Заявки</p>
                            <p className="text-sm text-gray-500">Просматривайте и управляйте заявками с сайта</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/sections')}
                        className="flex items-center gap-4 w-full text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                    >
                        <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            2
                        </span>
                        <div>
                            <p className="font-medium text-gray-900">Секции</p>
                            <p className="text-sm text-gray-500">Редактируйте контент секций сайта: заголовки, тексты, услуги</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/collections')}
                        className="flex items-center gap-4 w-full text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                    >
                        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            3
                        </span>
                        <div>
                            <p className="font-medium text-gray-900">Коллекции</p>
                            <p className="text-sm text-gray-500">Добавляйте проекты и события построчно — сразу появляются на сайте</p>
                        </div>
                    </button>

                    <button
                        onClick={() => navigate('/admin/settings')}
                        className="flex items-center gap-4 w-full text-left hover:bg-gray-50 rounded-lg p-2 -mx-2 transition-colors"
                    >
                        <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            4
                        </span>
                        <div>
                            <p className="font-medium text-gray-900">Настройки</p>
                            <p className="text-sm text-gray-500">Управляйте контактами, интеграциями и SEO</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
