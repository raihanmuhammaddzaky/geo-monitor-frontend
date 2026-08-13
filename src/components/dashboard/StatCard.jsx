import React from 'react';

export default function StatCard({ icon, label, value, color = 'primary' }) {
    const colorMap = {
        primary: 'bg-primary/10 text-primary',
        yellow: 'bg-amber-50 text-amber-600',
        green: 'bg-emerald-50 text-emerald-600',
        red: 'bg-red-50 text-red-600',
        blue: 'bg-blue-50 text-blue-600',
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 shadow-sm">
            <div className={`w-12 h-12 rounded-xl ${colorMap[color]} flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[24px]">{icon}</span>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
            </div>
        </div>
    );
}
