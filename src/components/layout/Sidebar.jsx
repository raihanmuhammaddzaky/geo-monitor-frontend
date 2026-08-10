import React, { useState } from 'react';
import SearchBar from '../search/SearchBar';
import FilterSection from '../search/FilterSection';
import FeedList from '../feed/FeedList';
import LocationDetail from '../feed/LocationDetail';
import { useMap } from '../../context/MapContext';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const { selectedLocation, setSelectedLocation } = useMap();

    return (
        <aside className="w-100 h-full bg-white z-10 flex flex-col shadow-float border-r border-border-subtle shrink-0 relative">
            <SearchBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <FilterSection isExpanded={isExpanded} />
            
            <FeedList />

            {/* Munculkan detail jika ada lokasi yang diklik */}
            {selectedLocation && (
                <LocationDetail 
                    location={selectedLocation} 
                    onBack={() => setSelectedLocation(null)} 
                />
            )}
        </aside>
    );
}
