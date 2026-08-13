import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';
import { locationApi } from '../api/locationApi';
import { categoryApi } from '../api/categoryApi';
import { useAuth } from '../context/AuthContext';

const menuItems = [
    { icon: 'dashboard', label: 'Overview' },
    { icon: 'add_location', label: 'Input Lokasi' },
    { icon: 'history', label: 'Riwayat Lokasi' },
];

// Helper: Mendapatkan tanggal 7 hari yang lalu dalam format YYYY-MM-DD
function getOneWeekAgo() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}

export default function WorkerDashboardPage() {
    const { user } = useAuth();
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');

    // Date range filter (default: 1 minggu terakhir)
    const [startDate, setStartDate] = useState(getOneWeekAgo());
    const [endDate, setEndDate] = useState(getToday());

    // Form state
    const [formData, setFormData] = useState({
        name: '', description: '', categoryId: '', latitude: '', longitude: '', city: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

    const fetchData = async () => {
        try {
            const [locData, catData] = await Promise.all([
                locationApi.getAllLocationsAdmin(),
                categoryApi.getAll(),
            ]);
            setLocations(locData || []);
            setCategories(catData || []);
        } catch (error) {
            console.error('Gagal mengambil data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter lokasi milik worker ini saja
    const myLocations = locations.filter(loc => loc.reporterName === user?.name);

    // Filter berdasarkan range tanggal untuk statistik
    const filteredByDate = myLocations.filter(loc => {
        const locDate = new Date(loc.createdAt).toISOString().split('T')[0];
        return locDate >= startDate && locDate <= endDate;
    });

    // Filter berdasarkan status untuk tabel riwayat
    const filteredByStatus = statusFilter === 'all'
        ? myLocations
        : myLocations.filter(loc => loc.status === statusFilter);

    const stats = {
        total: filteredByDate.length,
        pending: filteredByDate.filter(l => l.status === 'pending').length,
        approved: filteredByDate.filter(l => l.status === 'approved').length,
        rejected: filteredByDate.filter(l => l.status === 'rejected').length,
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: '', text: '' });

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('categoryId', formData.categoryId);
            data.append('latitude', formData.latitude);
            data.append('longitude', formData.longitude);
            data.append('city', formData.city);
            if (imageFile) data.append('image', imageFile);

            await locationApi.createLocation(data);
            setSubmitMessage({ type: 'success', text: 'Lokasi berhasil dikirim! Menunggu persetujuan Admin.' });
            setFormData({ name: '', description: '', categoryId: '', latitude: '', longitude: '', city: '' });
            setImageFile(null);
            fetchData();
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'Gagal mengirim lokasi. Silakan coba lagi.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const statusBadge = (status) => {
        const map = {
            pending: 'bg-amber-100 text-amber-700',
            approved: 'bg-emerald-100 text-emerald-700',
            rejected: 'bg-red-100 text-red-700',
        };
        return (
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${map[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <DashboardLayout menuItems={menuItems}>
            {(activeMenu) => (
                <div className="p-6 lg:p-8">
                    {/* ===== OVERVIEW ===== */}
                    {activeMenu === 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                                <DateRangeFilter
                                    startDate={startDate}
                                    endDate={endDate}
                                    onStartDateChange={setStartDate}
                                    onEndDateChange={setEndDate}
                                />
                            </div>
                            {isLoading ? (
                                <p className="text-gray-500">Memuat data...</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <StatCard icon="pin_drop" label="Total Disubmit" value={stats.total} color="primary" />
                                    <StatCard icon="hourglass_top" label="Pending" value={stats.pending} color="yellow" />
                                    <StatCard icon="check_circle" label="Approved" value={stats.approved} color="green" />
                                    <StatCard icon="cancel" label="Rejected" value={stats.rejected} color="red" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* ===== FORM INPUT LOKASI ===== */}
                    {activeMenu === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Lokasi Baru</h2>
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm max-w-2xl">
                                {submitMessage.text && (
                                    <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${submitMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                                        {submitMessage.text}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lokasi</label>
                                        <input name="name" value={formData.name} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Contoh: Jalan Rusak di Jl. Sudirman" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                        <textarea name="description" value={formData.description} onChange={handleFormChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Jelaskan kondisi lokasi..." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                            <select name="categoryId" value={formData.categoryId} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white">
                                                <option value="">Pilih Kategori</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                                            <input name="city" value={formData.city} onChange={handleFormChange} className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Contoh: Palembang" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                            <input name="latitude" value={formData.latitude} onChange={handleFormChange} required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="-2.9921" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                            <input name="longitude" value={formData.longitude} onChange={handleFormChange} required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary" placeholder="104.7634" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Foto Lokasi</label>
                                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
                                    </div>
                                    <button type="submit" disabled={isSubmitting} className={`mt-2 w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                        {isSubmitting ? 'Mengirim...' : 'Kirim Lokasi'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* ===== RIWAYAT LOKASI ===== */}
                    {activeMenu === 2 && (
                        <div>
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                <h2 className="text-2xl font-bold text-gray-900">Riwayat Lokasi Saya</h2>
                                {/* Filter Status */}
                                <div className="flex gap-2">
                                    {['all', 'pending', 'approved', 'rejected'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setStatusFilter(s)}
                                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                                                statusFilter === s
                                                ? 'bg-primary text-white'
                                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            {s === 'all' ? 'Semua' : s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Nama</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kategori</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kota</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredByStatus.length === 0 ? (
                                            <tr><td colSpan={5} className="text-center py-8 text-gray-400">Tidak ada data</td></tr>
                                        ) : (
                                            filteredByStatus.map(loc => (
                                                <tr key={loc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-5 py-3.5 font-medium text-gray-900">{loc.name}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.categoryName}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.city || '-'}</td>
                                                    <td className="px-5 py-3.5">{statusBadge(loc.status)}</td>
                                                    <td className="px-5 py-3.5 text-gray-500">{new Date(loc.createdAt).toLocaleDateString('id-ID')}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
}
