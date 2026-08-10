import React, { createContext, useContext, useState, useEffect } from 'react';
import { locationApi } from '../api/locationApi';

// 1. Buat Context
const MapContext = createContext();

// 2. Custom Hook agar lebih gampang dipanggil nanti
export const useMap = () => useContext(MapContext);

// 3. Komponen Provider
export const MapProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Ambil data dari Backend
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

    // Logika Filter (Otomatis jalan tiap kali searchQuery/searchCity berubah)
    const filteredLocations = locations.filter((loc) => {
        const matchName = (loc.name || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchCity = (loc.city || "").toLowerCase().includes(searchCity.toLowerCase());
        return matchName && matchCity;
    });

    return (
        <MapContext.Provider value={{
            locations: filteredLocations, 
            isLoading,
            searchQuery, setSearchQuery,
            searchCity, setSearchCity,
            selectedLocation, setSelectedLocation
        }}>
            {children}
        </MapContext.Provider>
    );
};
