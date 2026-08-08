import React from 'react';

export default function SearchBar() {
    return (
        <div className="px-4 pt-5 pb-3 border-b border-border-subtle bg-white z-20">
            <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-subtle focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
                    <div className="text-muted flex bg-surface items-center justify-center pl-4 rounded-l-lg">
                        <span className="material-symbols-outlined text-xl">search</span>
                    </div>
                    <input 
                        className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-text-main focus:outline-none focus:ring-0 border-none bg-surface h-full placeholder:text-muted px-4 pl-2 text-sm font-medium leading-normal" 
                        placeholder="Search locations, IDs..." 
                        type="text"
                    />
                </div>
            </label>
        </div>
    );
}
