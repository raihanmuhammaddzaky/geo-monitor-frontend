import { apiClient } from './axiosConfig';

export const locationApi = {
    // Public: Ambil lokasi yang sudah approved
    getAllLocations: async () => {
        const response = await apiClient.get('/locations');
        return response.data.data;
    },

    // Auth: Ambil semua lokasi (semua status)
    getAllLocationsAdmin: async () => {
        const response = await apiClient.get('/locations/all');
        return response.data.data;
    },

    // Auth: Ambil lokasi berstatus pending
    getPendingLocations: async () => {
        const response = await apiClient.get('/locations/pending');
        return response.data.data;
    },

    // Worker: Buat lokasi baru (dengan upload gambar)
    createLocation: async (formData) => {
        const response = await apiClient.post('/locations', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.data;
    },

    // Admin: Update status lokasi (approve/reject)
    updateLocationStatus: async (slug, status) => {
        const response = await apiClient.put(`/locations/${slug}/status`, { status });
        return response.data.data;
    },
};

