import { apiClient } from './axiosConfig';

export const locationApi = {
    getAllLocations: async () => {
        const response = await apiClient.get('/locations');
        // Backend mengembalikan response dalam bentuk { status, message, data }
        // Kita perlu me-return response.data.data yang berisi array sesungguhnya
        return response.data.data;
    },
};
