import { Popup } from "react-leaflet";

export const PopupDetail = ({ location }) => {
    const { imagePath, name, categoryName, city, description } = location;
    return (
        <Popup>
            <div className="min-w-50 max-w-62.5">

                {imagePath && (
                    <img
                        src={imagePath}
                        alt={name}
                        className="w-full h-28 object-cover rounded-t-md mb-2"
                    />
                )}

                <div className="p-1">
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded mb-1">
                        {categoryName || 'Lokasi'}
                    </span>

                    <h3 className="font-bold text-[15px] text-gray-900 leading-tight mb-1">
                        {name}
                    </h3>

                    <div className="flex items-center gap-1 text-gray-500 mb-2">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span className="text-xs font-medium">{city}</span>
                    </div>

                    {description && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-3 border-t border-gray-100 pt-2">
                            {description}
                        </p>
                    )}

                    <button className="w-full py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors">
                        Lihat Detail
                    </button>
                </div>
            </div>
        </Popup>
    )
}

