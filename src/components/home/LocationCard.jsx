import React from 'react';

export default function LocationCard({ item }) {
    // Menentukan warna badge berdasarkan status
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        rejected: 'bg-red-100 text-red-800'
    };
    const badgeColor = statusColors[item.status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    const displayStatus = item.status || 'Unknown';
    
    // Format waktu
    const timeString = item.createdAt 
        ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    return (
        <div className="p-4 border-b border-border-subtle hover:bg-gray-50 cursor-pointer transition-colors group flex gap-4 shadow-sm mb-1">
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 ${badgeColor} text-[10px] font-bold uppercase tracking-wider rounded`}>
                            {displayStatus}
                        </span>
                        <span className="font-mono-custom text-muted text-xs">{timeString}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                        {item.name || 'Tanpa Nama'}
                    </h3>
                </div>
                <div className="flex items-center gap-1 mt-2 text-muted">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="font-medium text-xs text-text-main">{item.city || 'Kota tidak diketahui'}</span>
                </div>
            </div>
            {item.imagePath ? (
                <img 
                    className="w-16 h-16 rounded-lg object-cover border border-border-subtle shrink-0" 
                    alt={item.name || 'Lokasi'} 
                    src={item.imagePath} 
                />
            ) : (
                <div className="w-16 h-16 rounded-lg bg-surface flex items-center justify-center border border-border-subtle shrink-0">
                    <span className="material-symbols-outlined text-muted text-2xl">location_city</span>
                </div>
            )}
        </div>
    );
}
