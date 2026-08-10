import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MapArea from '../components/map/MapArea';
import { locationApi } from '../api/locationApi';

export default function PublicMapPage() {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await locationApi.getAllLocations();
                setLocations(data);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLocations();
    }, []); 
    
    return (
        <div className="bg-background-light text-text-main overflow-hidden h-screen w-full flex font-display">
            <Sidebar locations={locations} isLoading={isLoading} />
            <MapArea locations={locations} isLoading={isLoading} />
        </div>
    );
}

