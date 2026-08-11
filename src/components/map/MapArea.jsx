import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap as useLeafletMap } from 'react-leaflet';
import { PopupDetail } from './PopupDetail';
import { useMap } from '../../context/MapContext';

function MapController() {
    const leafletMap = useLeafletMap();
    const { selectedLocation } = useMap();
    useEffect(() => {
        if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
            leafletMap.flyTo(
                [selectedLocation.latitude, selectedLocation.longitude],
                15,
                { duration: 1.5 }
            );
        }
    }, [selectedLocation, leafletMap]);
    return null;
}


export default function MapArea() {
    const { locations, isLoading, selectedLocation } = useMap();
    const defaultCenter = [-6.2088, 106.8456];
    const markerRefs = useRef({});

    useEffect(() => {
        if (selectedLocation && markerRefs.current[selectedLocation.id]) {
            setTimeout(() => {
                markerRefs.current[selectedLocation.id].openPopup();
            }, 300);
        }
    }, [selectedLocation]);

    return (
        <main className="flex-1 relative z-0">

            <MapContainer
                center={defaultCenter}
                zoom={11}
                className="w-full h-full"
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapController />

                {!isLoading && locations.map((location) => {
                    if (!location.latitude || !location.longitude) return null;

                    return (
                        <Marker
                            key={location.id}
                            position={[location.latitude, location.longitude]}
                            ref={(ref) => { markerRefs.current[location.id] = ref; }}
                        >
                            <PopupDetail location={location} />
                        </Marker>
                    );
                })}
            </MapContainer>
        </main>
    );
}
