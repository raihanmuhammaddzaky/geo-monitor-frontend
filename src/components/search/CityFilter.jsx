import React from 'react';
import { useMap } from '../../context/MapContext';

export default function CityFilter() {
    const { searchCity, setSearchCity } = useMap();

    return (
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
    );
}
