import React, { useState } from 'react';
import SearchBar from '../search/SearchBar';
import FilterSection from '../search/FilterSection';
import FeedList from '../feed/FeedList';

export default function Sidebar({locations, isLoading}) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside className="w-100 h-full bg-white z-10 flex flex-col shadow-float border-r border-border-subtle shrink-0">
            <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <FilterSection isExpanded={isExpanded} />
            <FeedList locations={locations} isLoading={isLoading} />
        </aside>
    );
}
