import React from 'react';
import LocationCard from './LocationCard';


export default function FeedList({ locations, isLoading }) {
    // Pastikan locations adalah array sebelum di-map
    const safeLocations = Array.isArray(locations) ? locations : [];

    return (
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
            {isLoading && <div className="p-4 text-center">Loading...</div>}
            {!isLoading && safeLocations.map(location => (
                <LocationCard key={location.id} item={location} />
            ))}
        </div>
    );
}
