import React from 'react';
import Sidebar from '../components/home/Sidebar';
import MapArea from '../components/home/MapArea';

export default function PublicMapPage() {
    return (
        <div className="bg-background-light text-text-main overflow-hidden h-screen w-full flex font-display">
            <Sidebar />
            <MapArea />
        </div>
    );
}
