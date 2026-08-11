import React from 'react';
import CategoryButtonList from './CategoryButtonList';
import CityFilter from './CityFilter';

export default function FilterSection({ isExpanded }) {
    return (
        <div className="flex flex-col border-b border-border-subtle bg-white shrink-0">
            {isExpanded && (
                <div className="px-5 pb-5 pt-1 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <CityFilter />
                    <CategoryButtonList />
                </div>
            )}
        </div>
    );
}
