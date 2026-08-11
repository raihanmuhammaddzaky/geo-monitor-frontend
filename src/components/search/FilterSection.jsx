import React from 'react';
import { useMap } from '../../context/MapContext';
import CategoryButtonList from './CategoryButtonList';

export default function FilterSection({ isExpanded }) {
    const { searchCity, setSearchCity } = useMap();

    return (
        <div className="flex flex-col border-b border-border-subtle bg-white shrink-0">
            {isExpanded && (
                <div className="px-5 pb-5 pt-1 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* 1. FILTER KOTA */}
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Filter by City</span>
                        <div className="flex items-center h-11 w-full rounded-xl border border-border-subtle bg-surface px-3 focus-within:border-primary transition-colors gap-2">
                            <span className="material-symbols-outlined text-muted text-[20px]">location_on</span>
                            <input 
                                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-1 placeholder:text-muted" 
                                placeholder="Enter city name..." 
                                type="text"
                                value={searchCity}
                                onChange={(e) => setSearchCity(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 2. FILTER KATEGORI */}
                    <CategoryButtonList />
                </div>
            )}
        </div>
    );
}
