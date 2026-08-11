import React from 'react';
import { useMap } from '../../context/MapContext';

export default function SearchBar({ isExpanded, setIsExpanded }) {
    const { searchQueary, setSearchQuery } = useMap();
    return (
        <div className="px-5 pt-6 pb-4 border-b border-border-subtle bg-white z-20 flex gap-3 items-center">
            <label className="flex flex-col flex-1 h-11 min-w-0">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors bg-surface">
                    <div className="text-muted flex items-center justify-center pl-3 rounded-l-xl">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-text-main focus:outline-none focus:ring-0 border-none bg-transparent h-full placeholder:text-muted px-3 text-sm font-medium"
                        placeholder="Search locations, IDs..."
                        type="text"
                        value={searchQueary}
                        onChange={(e) => { setSearchQuery(e.target.value) }}
                    />
                </div>
            </label>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors border shadow-sm ${isExpanded
                    ? 'bg-primary/10 text-primary border-primary/30'
                    : 'bg-white text-muted hover:bg-gray-50 border-border-subtle'
                    }`}
                title="Toggle Filters"
            >
                <span className="material-symbols-outlined text-[22px]">
                    tune
                </span>
            </button>
        </div>
    );
}
