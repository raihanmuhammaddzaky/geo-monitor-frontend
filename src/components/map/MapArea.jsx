import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PopupDetail } from './PopupDetail';



export default function MapArea({ locations = [], isLoading }) {
    const defaultCenter = [-6.2088, 106.8456];
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
                {!isLoading && locations.map((loc) => {
                    if (!loc.latitude || !loc.longitude) return null;

                    return (
                        <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                            <PopupDetail>
                                <PopupDetail loc={loc} />
                            </PopupDetail>

                        </Marker>
                    );
                })}
            </MapContainer>
        </main>
    );
}
