import React from 'react';

export default function CategoryButton({ category, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors shadow-sm ${
                isActive
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-700 border-border-subtle hover:bg-gray-50'
            }`}
        >
            {category}
        </button>
    );
}
