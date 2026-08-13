import { apiClient } from './axiosConfig';

export const categoryApi = {
    // Public: Ambil semua kategori
    getAll: async () => {
        const response = await apiClient.get('/categories');
        return response.data.data;
    },

    // Admin: Buat kategori baru
    create: async (name) => {
        const response = await apiClient.post('/categories', { name });
        return response.data.data;
    },

    // Admin: Update kategori
    update: async (id, name) => {
        const response = await apiClient.put(`/categories/${id}`, { name });
        return response.data.data;
    },

    // Admin: Hapus kategori
    remove: async (id) => {
        const response = await apiClient.delete(`/categories/${id}`);
        return response.data.data;
    },
};
