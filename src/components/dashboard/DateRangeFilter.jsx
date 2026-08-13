import React from 'react';

export default function DateRangeFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
    return (
        <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Periode:</span>
            <div className="flex items-center gap-2">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => onStartDateChange(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                />
                <span className="text-gray-400 text-sm">s/d</span>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => onEndDateChange(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
                />
            </div>
        </div>
    );
}
