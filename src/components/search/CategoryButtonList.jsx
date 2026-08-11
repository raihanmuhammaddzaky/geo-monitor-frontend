import React from 'react';
import { useMap } from '../../context/MapContext';
import CategoryButton from './CategoryButton';

export default function CategoryButtonList() {
    const { searchCategory, setSearchCategory } = useMap();
    const categories = ['Infrastruktur', 'Bencana', 'Fasilitas Umum'];

    return (
        <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">Categories</span>
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                    const isActive = searchCategory === category;
                    return (
                        <CategoryButton
                            key={category}
                            category={category}
                            isActive={isActive}
                            onClick={() => setSearchCategory(isActive ? "" : category)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
