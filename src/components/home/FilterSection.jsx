import React, { useState } from 'react';

export default function FilterSection() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex flex-col border-b border-border-subtle bg-white shrink-0">
            {/* Main Categories */}
            <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide items-center">
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-text-main text-white px-4 transition-colors">
                    <span className="text-sm font-semibold">All</span>
                </button>
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface text-text-main hover:bg-gray-200 px-4 transition-colors border border-transparent">
                    <span className="text-sm font-medium">Infrastructure</span>
                </button>
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-surface text-text-main hover:bg-gray-200 px-4 transition-colors border border-transparent">
                    <span className="text-sm font-medium">Utility</span>
                </button>
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex h-8 shrink-0 items-center justify-center gap-x-1 rounded-lg bg-white text-[#008075] hover:bg-gray-50 px-3 transition-colors border border-border-subtle ml-auto"
                >
                    <span className="text-sm font-semibold">Filters</span>
                    <span className="material-symbols-outlined text-lg">
                        {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                </button>
            </div>

            {/* Expanded Section */}
            {isExpanded && (
                <div className="px-4 pb-4 pt-2 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Filter by City</span>
                        <div className="flex items-center h-10 w-full rounded-lg border border-border-subtle bg-surface px-3 focus-within:border-primary transition-colors gap-2">
                            <span className="material-symbols-outlined text-muted text-lg">location_on</span>
                            <input className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-1 placeholder:text-muted" placeholder="Enter city name..." type="text" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">More Categories</span>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-4 py-1.5 rounded-full border border-border-subtle text-xs font-medium hover:bg-gray-50 transition-colors">Traffic</button>
                            <button className="px-4 py-1.5 rounded-full border border-border-subtle text-xs font-medium hover:bg-gray-50 transition-colors">Environment</button>
                            <button className="px-4 py-1.5 rounded-full border border-border-subtle text-xs font-medium hover:bg-gray-50 transition-colors">Security</button>
                            <button className="px-4 py-1.5 rounded-full border border-border-subtle text-xs font-medium hover:bg-gray-50 transition-colors">Disaster</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
