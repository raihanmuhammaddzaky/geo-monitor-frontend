import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterSection from './FilterSection';
import FeedList from './FeedList';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <aside className="w-[400px] h-full bg-white z-10 flex flex-col shadow-float border-r border-border-subtle shrink-0">
            <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <FilterSection isExpanded={isExpanded} />
            <FeedList />
        </aside>
    );
}
