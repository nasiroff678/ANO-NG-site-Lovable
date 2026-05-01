import { useNavigate } from 'react-router-dom';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { COLLECTIONS } from '@/lib/collections';
import { useContentItems } from '@/hooks/useContentItems';

const CollectionRow = ({ category, title, description, onClick }: { category: string; title: string; description: string; onClick: () => void }) => {
    const { items, isLoading } = useContentItems(category);
    return (
        <button
            onClick={onClick}
            className="w-full bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-sm transition-shadow text-left"
        >
            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <FolderOpen className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 truncate">{description}</p>
            </div>
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                {isLoading ? '…' : items.length}
            </span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
    );
};

const AdminCollections = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Коллекции</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Записи добавляются построчно — каждая запись сразу появляется на сайте у всех пользователей.
                </p>
            </div>

            <div className="space-y-3">
                {Object.values(COLLECTIONS).map((cfg) => (
                    <CollectionRow
                        key={cfg.category}
                        category={cfg.category}
                        title={cfg.title}
                        description={cfg.description}
                        onClick={() => navigate(`/admin/collections/${cfg.category}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminCollections;
