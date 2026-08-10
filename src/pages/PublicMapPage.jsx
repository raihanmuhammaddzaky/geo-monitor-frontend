import React, { useState, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import MapArea from '../components/map/MapArea';
import { locationApi } from '../api/locationApi';
import { MapProvider } from '../context/MapContext';

export default function PublicMapPage() {

    return (
        <MapProvider>
            <div className="bg-background-light text-text-main overflow-hidden h-screen w-full flex font-display">
                <Sidebar />
                <MapArea />
            </div>
        </MapProvider>
    );
}

