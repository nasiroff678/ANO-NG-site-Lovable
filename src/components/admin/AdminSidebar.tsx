import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutGrid,
    FileText,
    Layers,
    FolderOpen,
    Navigation,
    Settings,
    LogOut,
    ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const links = [
    { to: '/admin/dashboard', icon: LayoutGrid, label: 'Обзор' },
    { to: '/admin/submissions', icon: FileText, label: 'Заявки' },
    { to: '/admin/sections', icon: Layers, label: 'Секции' },
    { to: '/admin/collections', icon: FolderOpen, label: 'Коллекции' },
    { to: '/admin/navigation', icon: Navigation, label: 'Навигация' },
    { to: '/admin/settings', icon: Settings, label: 'Настройки' },
];

const AdminSidebar = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin');
    };

    return (
        <aside className="w-56 min-h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="px-5 py-5 border-b border-gray-100">
                <h1 className="font-bold text-gray-900 text-sm">CMS Админка</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <link.icon className="w-[18px] h-[18px]" />
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom actions */}
            <div className="px-3 pb-4 space-y-1 border-t border-gray-100 pt-3">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                >
                    <ExternalLink className="w-[18px] h-[18px]" />
                    Открыть сайт
                </a>
                <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                >
                    <LogOut className="w-[18px] h-[18px]" />
                    Выйти
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
