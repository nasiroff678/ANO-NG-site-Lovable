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
                                        <a
                                            href={getWhatsAppLink(sub.phone)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-medium bg-green-500 text-white px-4 py-1.5 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            WhatsApp
                                        </a>
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
