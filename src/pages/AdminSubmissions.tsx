import { useState } from 'react';
import { useSubmissions, useUpdateSubmissionStatus, useDeleteSubmission } from '@/hooks/useSubmissions';
import { useToast } from '@/hooks/use-toast';
import { Phone, Calendar, MessageSquare, Trash2, RefreshCw, Filter } from 'lucide-react';

const statusLabels: Record<string, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    completed: 'Завершена',
};

const statusColors: Record<string, string> = {
    new: 'bg-green-100 text-green-700',
    in_progress: 'bg-amber-100 text-amber-700',
    completed: 'bg-gray-100 text-gray-500',
};

const formTypeLabels: Record<string, string> = {
    parent: 'Запись на мероприятие',
    school: 'Заявка от школы',
    volunteer: 'Волонтёрство',
    partnership: 'Партнёрство',
    contact: 'Обратная связь',
};

const AdminSubmissions = () => {
    const { submissions, isLoading } = useSubmissions();
    const updateStatus = useUpdateSubmissionStatus();
    const deleteSubmission = useDeleteSubmission();
    const { toast } = useToast();
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all'
        ? submissions
        : submissions.filter(s => s.status === filter);

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await updateStatus.mutateAsync({ id, status });
            toast({ title: 'Обновлено', description: `Статус изменён на «${statusLabels[status]}»` });
        } catch {
            toast({ title: 'Ошибка', variant: 'destructive' });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Удалить заявку?')) return;
        try {
            await deleteSubmission.mutateAsync(id);
            toast({ title: 'Удалено' });
        } catch {
            toast({ title: 'Ошибка', variant: 'destructive' });
        }
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ', ' + d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const getWhatsAppLink = (phone: string) => {
        const cleaned = phone.replace(/\D/g, '');
        return `https://wa.me/${cleaned}`;
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
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
                    <p className="text-sm text-gray-500 mt-1">Все заявки с формы обратной связи ({submissions.length})</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Все</option>
                            <option value="new">Новые</option>
                            <option value="in_progress">В работе</option>
                            <option value="completed">Завершённые</option>
                        </select>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Обновить
                    </button>
                </div>
            </div>

            {/* Submissions List */}
            {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500">Заявок пока нет</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((sub) => (
                        <div key={sub.id} className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-start justify-between gap-4">
                                {/* Left: Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 flex-wrap mb-2">
                                        <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[sub.status]}`}>
                                            ◎ {statusLabels[sub.status]}
                                        </span>
                                        {sub.form_type && (
                                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600">
                                                {formTypeLabels[sub.form_type] || sub.form_type}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                        {sub.phone && (
                                            <span className="flex items-center gap-1.5">
                                                <Phone className="w-3.5 h-3.5 text-blue-500" />
                                                {sub.phone}
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(sub.created_at)}
                                        </span>
                                    </div>

                                    {sub.message && (
                                        <div className="flex items-start gap-1.5 text-sm text-gray-600 mt-2 bg-gray-50 rounded-lg px-3 py-2">
                                            <MessageSquare className="w-3.5 h-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                                            <span>{sub.message}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Right: Actions */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <select
                                        value={sub.status}
                                        onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                                        className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[100px]"
                                    >
                                        <option value="new">Новая</option>
                                        <option value="in_progress">В работе</option>
                                        <option value="completed">Завершена</option>
                                    </select>

                                    {sub.phone && (
                                        <div className="flex gap-2">
                                            <a
                                                href={getWhatsAppLink(sub.phone)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-center shadow-sm"
                                            >
                                                WhatsApp
                                            </a>
                                            <a
                                                href={`https://t.me/+${sub.phone.replace(/\D/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium bg-[#0088cc] text-white px-3 py-1.5 rounded-lg hover:bg-[#0077b3] transition-colors text-center shadow-sm"
                                            >
                                                Telegram
                                            </a>
                                            <a
                                                href="https://max.ru"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium bg-[#0077FF] text-white px-3 py-1.5 rounded-lg hover:bg-[#0066DD] transition-colors text-center shadow-sm flex items-center justify-center gap-1 leading-none"
                                            >
                                                <svg viewBox="0 0 131 42" fill="none" className="h-2.5 w-auto fill-current">
                                                    <path fill="currentColor" fillRule="evenodd" d="M21.47 41.88c-4.11 0-6.02-.6-9.34-3-2.1 2.7-8.75 4.81-9.04 1.2 0-2.71-.6-5-1.28-7.5C1 29.5.08 26.07.08 21.1.08 9.23 9.82.3 21.36.3c11.55 0 20.6 9.37 20.6 20.91a20.6 20.6 0 0 1-20.49 20.67Zm.17-31.32c-5.62-.29-10 3.6-10.97 9.7-.8 5.05.62 11.2 1.83 11.52.58.14 2.04-1.04 2.95-1.95a10.4 10.4 0 0 0 5.08 1.81 10.7 10.7 0 0 0 11.19-9.97 10.7 10.7 0 0 0-10.08-11.1Z" clipRule="evenodd" />
                                                    <path fill="currentColor" d="M60.3 32.15h-4.44v-21h7.23l4.84 14.41h.65l5.05-14.41h7.07v21h-4.45v-15.6h-.64l-5.5 15.6H66.2l-5.25-15.6h-.65v15.6ZM94.59 32.55c-1.97 0-3.73-.46-5.3-1.37a9.99 9.99 0 0 1-3.67-3.88 12.15 12.15 0 0 1-1.29-5.65c0-2.1.43-3.98 1.3-5.62a9.63 9.63 0 0 1 3.67-3.88 10.04 10.04 0 0 1 5.29-1.4c1.75 0 3.3.37 4.64 1.12 1.35.73 2.45 1.62 3.31 2.67l.97-3.4H107v21h-3.47l-.97-3.39a11.45 11.45 0 0 1-3.32 2.7 9.62 9.62 0 0 1-4.64 1.1Zm1.13-4.16c1.97 0 3.55-.62 4.77-1.86a6.7 6.7 0 0 0 1.85-4.88c0-2-.62-3.61-1.85-4.85a6.3 6.3 0 0 0-4.77-1.9c-1.94 0-3.51.63-4.72 1.9a6.63 6.63 0 0 0-1.82 4.85c0 1.99.6 3.62 1.82 4.88a6.32 6.32 0 0 0 4.72 1.86ZM115.03 32.15h-5.25l6.66-10.75-5.9-10.25h5.26l3.91 7.06h.77l4.12-7.06h5.13l-5.9 9.97 6.67 11.03h-5.42l-4.48-7.96h-.77l-4.8 7.96Z" />
                                                </svg> <span className="pt-0.5">Написать</span>
                                            </a>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        className="text-xs font-medium bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminSubmissions;
