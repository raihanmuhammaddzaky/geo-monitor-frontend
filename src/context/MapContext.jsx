import React, { createContext, useContext, useState, useEffect } from 'react';
import { locationApi } from '../api/locationApi';

const MapContext = createContext();

export const useMap = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

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

    const filteredLocations = locations.filter((loc) => {
        const matchName = (loc.name || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchCity = (loc.city || "").toLowerCase().includes(searchCity.toLowerCase());
        const matchCategory = (loc.category || "").toLowerCase().includes(searchCategory.toLowerCase());
        return matchName && matchCity && matchCategory;
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
