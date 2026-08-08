import React from 'react';

export default function LocationCard({ item }) {
    return (
        <div className="p-4 border-border-subtle hover:bg-gray-50 cursor-pointer transition-colors group flex gap-4 shadow-md mb-1">
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 ${item.colorClass} text-[10px] font-bold uppercase tracking-wider rounded`}>
                            {item.type}
                        </span>
                        <span className="font-mono-custom text-muted text-xs">{item.time}</span>
                    </div>
                    <h3 className="text-[15px] font-bold text-text-main leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                </div>
                <div className="flex items-center gap-1 mt-2 text-muted">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="font-medium text-xs text-text-main">{item.location}</span>
                </div>
            </div>
            {item.image ? (
                <img 
                    className="w-16 h-16 rounded-lg object-cover border border-border-subtle shrink-0" 
                    alt={item.title} 
                    src={item.image} 
                />
            ) : (
                <div className="w-16 h-16 rounded-lg bg-surface flex items-center justify-center border border-border-subtle shrink-0">
                    <span className="material-symbols-outlined text-muted text-2xl">{item.icon || 'bolt'}</span>
                </div>
            )}
        </div>
    );
}
