import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardLayout({ children, menuItems }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState(0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
                {/* Logo / Brand */}
                <div className="p-5 border-b border-gray-200">
                    <h1 className="text-lg font-bold text-gray-900">📍 Geo Monitor</h1>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{user?.role} Dashboard</p>
                </div>

                {/* Menu Navigation */}
                <nav className="flex-1 p-3 flex flex-col gap-1">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveMenu(index)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                                activeMenu === index
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* User Info + Logout */}
                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-bold text-sm">{user?.name?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Keluar
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children(activeMenu)}
            </main>
        </div>
    );
}
