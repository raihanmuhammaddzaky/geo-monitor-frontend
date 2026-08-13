import React from 'react';
import { getImageUrl } from '../../utils/imageUtils';

export default function LocationDetail({ location, onBack }) {
    // Cegah error jika data kosong
    if (!location) return null;

    return (
      
        <div className="absolute inset-0 bg-white z-30 flex flex-col h-full overflow-y-auto animate-in slide-in-from-right-4 duration-300">
            
            <div className="sticky top-0 z-10 flex items-center gap-3 p-4 bg-white/80 backdrop-blur-md border-b border-border-subtle">
                <button 
                    onClick={onBack}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                >
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <h2 className="font-bold text-[15px] text-text-main truncate">
                    Detail Lokasi
                </h2>
            </div>

            <div className="w-full h-48 bg-gray-100 relative shrink-0">
                {location.imagePath ? (
                    <img 
                        src={getImageUrl(location.imagePath)} 
                        alt={location.name} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2">image_not_supported</span>
                        <span className="text-xs font-medium">Tidak ada foto</span>
                    </div>
                )}
                <span className="absolute bottom-3 left-4 px-3 py-1 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded shadow-md">
                    {location.categoryName || 'Kategori'}
                </span>
            </div>

            <div className="p-5 flex flex-col gap-6">
                
                {/* Judul & Info Dasar */}
                <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {location.name || 'Nama Lokasi Belum Diatur'}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        <span className="text-sm font-medium">{location.city || 'Kota Tidak Diketahui'}</span>
                    </div>
                </div>

                {/* Deskripsi Penuh */}
                <div>
                    <h3 className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                        Deskripsi
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {location.description || 'Tidak ada deskripsi yang diberikan untuk lokasi ini.'}
                    </p>
                </div>

                {/* Info Dummy Ekstra (Bisa dihubungkan ke backend nanti) */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Status</span>
                        <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                            Approved
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-gray-400 uppercase">Kordinat</span>
                        <span className="text-sm font-medium text-gray-700 font-mono-custom">
                            {location.latitude?.substring(0,6)}, {location.longitude?.substring(0,6)}
                        </span>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
