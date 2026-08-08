import React from 'react';

export default function MapArea() {
    return (
        <main className="flex-1 relative bg-surface z-0">
            {/* Map Background Placeholder */}
            <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDr5wfDNGaD_ac7R_goEhRwE6Ie-ZIUtwta56BtFDga3kQ2PATI6yM0omshssi50B4n0L_2M-fd1jmZL1Ts5vVh5Nrfh4AfYooqcNEs8iH9gVo43b61z5FXifPTiZUVWVIDC7nVPhOjUP_cQB-qNG29SKKuSZqtiaS18pRm1RhXLI6_W4bVd3_GHchOnqPkN3O8jM-6roK8vAAre3CrherXT2s934h6UUWYShHukZC9wkbI3kJi0O26Q')" }}
            >
                {/* Overlay to make it look more like a UI map than a photo */}
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            </div>

            {/* Map Pins */}
            <div className="absolute top-[30%] left-[40%] flex flex-col items-center group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-accent border-2 border-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-[16px]">water_drop</span>
                </div>
                <div className="w-2 h-2 bg-accent/50 rounded-full blur-[2px] mt-1"></div>
            </div>

            <div className="absolute top-[50%] left-[60%] flex flex-col items-center group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-accent border-2 border-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-[16px]">warning</span>
                </div>
                <div className="w-2 h-2 bg-accent/50 rounded-full blur-[2px] mt-1"></div>
            </div>

            <div className="absolute top-[20%] left-[70%] flex flex-col items-center group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-accent border-2 border-white shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-white text-[16px]">bolt</span>
                </div>
                <div className="w-2 h-2 bg-accent/50 rounded-full blur-[2px] mt-1"></div>
            </div>

            {/* Floating Controls */}
            <div className="absolute right-6 top-6 flex flex-col gap-2 z-10">
                <div className="flex flex-col rounded-lg bg-white shadow-float overflow-hidden border border-border-subtle">
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-text-main transition-colors border-b border-border-subtle">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-text-main transition-colors">
                        <span className="material-symbols-outlined">remove</span>
                    </button>
                </div>
                <button className="w-10 h-10 rounded-lg bg-white shadow-float flex items-center justify-center hover:bg-gray-50 text-text-main transition-colors border border-border-subtle mt-2">
                    <span className="material-symbols-outlined">my_location</span>
                </button>
            </div>
        </main>
    );
}
