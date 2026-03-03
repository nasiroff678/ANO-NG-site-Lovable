import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 bg-gray-50 p-6 md:p-8 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
