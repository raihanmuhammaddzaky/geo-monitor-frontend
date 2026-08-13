import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatCard from '../components/dashboard/StatCard';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';
import { locationApi } from '../api/locationApi';
import { categoryApi } from '../api/categoryApi';

const menuItems = [
    { icon: 'dashboard', label: 'Overview' },
    { icon: 'pending_actions', label: 'Pending Review' },
    { icon: 'map', label: 'Semua Lokasi' },
    { icon: 'category', label: 'Kelola Kategori' },
];

function getOneWeekAgo() {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}

export default function AdminMapPage() {
    const [locations, setLocations] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    // Date range filter
    const [startDate, setStartDate] = useState(getOneWeekAgo());
    const [endDate, setEndDate] = useState(getToday());

    // Category form
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');

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

    // Filter berdasarkan range tanggal untuk statistik
    const filteredByDate = locations.filter(loc => {
        const locDate = new Date(loc.createdAt).toISOString().split('T')[0];
        return locDate >= startDate && locDate <= endDate;
    });

    const pendingLocations = locations.filter(l => l.status === 'pending');

    const stats = {
        total: filteredByDate.length,
        pending: filteredByDate.filter(l => l.status === 'pending').length,
        approved: filteredByDate.filter(l => l.status === 'approved').length,
        rejected: filteredByDate.filter(l => l.status === 'rejected').length,
        categories: categories.length,
    };

    // ===== AKSI APPROVE / REJECT =====
    const handleStatusChange = async (slug, status) => {
        setActionLoading(slug);
        try {
            await locationApi.updateLocationStatus(slug, status);
            await fetchData();
        } catch (error) {
            console.error('Gagal mengubah status:', error);
        } finally {
            setActionLoading(null);
        }
    };

    // ===== AKSI KATEGORI =====
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        try {
            await categoryApi.create(newCategoryName.trim());
            setNewCategoryName('');
            await fetchData();
        } catch (error) {
            console.error('Gagal membuat kategori:', error);
        }
    };

    const handleUpdateCategory = async (id) => {
        if (!editCategoryName.trim()) return;
        try {
            await categoryApi.update(id, editCategoryName.trim());
            setEditingCategory(null);
            setEditCategoryName('');
            await fetchData();
        } catch (error) {
            console.error('Gagal mengubah kategori:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Yakin ingin menghapus kategori ini?')) return;
        try {
            await categoryApi.remove(id);
            await fetchData();
        } catch (error) {
            console.error('Gagal menghapus kategori:', error);
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <StatCard icon="pin_drop" label="Total Lokasi" value={stats.total} color="primary" />
                                    <StatCard icon="hourglass_top" label="Pending" value={stats.pending} color="yellow" />
                                    <StatCard icon="check_circle" label="Approved" value={stats.approved} color="green" />
                                    <StatCard icon="cancel" label="Rejected" value={stats.rejected} color="red" />
                                    <StatCard icon="category" label="Kategori" value={stats.categories} color="blue" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* ===== PENDING REVIEW ===== */}
                    {activeMenu === 1 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Pending Review
                                <span className="ml-2 text-base font-normal text-gray-400">({pendingLocations.length})</span>
                            </h2>
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Nama</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kategori</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kota</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Disubmit Oleh</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Tanggal</th>
                                            <th className="text-center px-5 py-3.5 font-semibold text-gray-600">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingLocations.length === 0 ? (
                                            <tr><td colSpan={6} className="text-center py-8 text-gray-400">Tidak ada lokasi yang menunggu review</td></tr>
                                        ) : (
                                            pendingLocations.map(loc => (
                                                <tr key={loc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-5 py-3.5 font-medium text-gray-900">{loc.name}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.categoryName}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.city || '-'}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.reporterName}</td>
                                                    <td className="px-5 py-3.5 text-gray-500">{new Date(loc.createdAt).toLocaleDateString('id-ID')}</td>
                                                    <td className="px-5 py-3.5">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleStatusChange(loc.slug, 'approved')}
                                                                disabled={actionLoading === loc.slug}
                                                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(loc.slug, 'rejected')}
                                                                disabled={actionLoading === loc.slug}
                                                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ===== SEMUA LOKASI ===== */}
                    {activeMenu === 2 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Semua Lokasi</h2>
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Nama</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kategori</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Kota</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Status</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Disubmit Oleh</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {locations.length === 0 ? (
                                            <tr><td colSpan={6} className="text-center py-8 text-gray-400">Tidak ada data</td></tr>
                                        ) : (
                                            locations.map(loc => (
                                                <tr key={loc.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-5 py-3.5 font-medium text-gray-900">{loc.name}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.categoryName}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.city || '-'}</td>
                                                    <td className="px-5 py-3.5">{statusBadge(loc.status)}</td>
                                                    <td className="px-5 py-3.5 text-gray-600">{loc.reporterName}</td>
                                                    <td className="px-5 py-3.5 text-gray-500">{new Date(loc.createdAt).toLocaleDateString('id-ID')}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ===== KELOLA KATEGORI ===== */}
                    {activeMenu === 3 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Kelola Kategori</h2>

                            {/* Form Tambah Kategori */}
                            <form onSubmit={handleCreateCategory} className="flex gap-3 mb-6 max-w-lg">
                                <input
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                                    placeholder="Nama kategori baru..."
                                />
                                <button type="submit" className="px-5 py-3 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary/90 transition-all shadow-md shrink-0">
                                    Tambah
                                </button>
                            </form>

                            {/* Tabel Kategori */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-lg">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">ID</th>
                                            <th className="text-left px-5 py-3.5 font-semibold text-gray-600">Nama Kategori</th>
                                            <th className="text-center px-5 py-3.5 font-semibold text-gray-600">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.length === 0 ? (
                                            <tr><td colSpan={3} className="text-center py-8 text-gray-400">Belum ada kategori</td></tr>
                                        ) : (
                                            categories.map(cat => (
                                                <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                    <td className="px-5 py-3.5 text-gray-500 font-mono">{cat.id}</td>
                                                    <td className="px-5 py-3.5">
                                                        {editingCategory === cat.id ? (
                                                            <input
                                                                value={editCategoryName}
                                                                onChange={(e) => setEditCategoryName(e.target.value)}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleUpdateCategory(cat.id)}
                                                                className="px-3 py-1.5 rounded-lg border border-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full"
                                                                autoFocus
                                                            />
                                                        ) : (
                                                            <span className="font-medium text-gray-900">{cat.name}</span>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-3.5">
                                                        <div className="flex items-center justify-center gap-2">
                                                            {editingCategory === cat.id ? (
                                                                <>
                                                                    <button onClick={() => handleUpdateCategory(cat.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors">Simpan</button>
                                                                    <button onClick={() => setEditingCategory(null)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Batal</button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button onClick={() => { setEditingCategory(cat.id); setEditCategoryName(cat.name); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">Edit</button>
                                                                    <button onClick={() => handleDeleteCategory(cat.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors">Hapus</button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
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
