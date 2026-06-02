'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FilterState } from '../types';

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const filters: FilterState = {
    category: searchParams.get('category') || 'All',
    pricing: searchParams.get('pricing') || 'All',
    tags: searchParams.getAll('tags'),
    search: searchParams.get('search') || '',
    sort: (searchParams.get('sort') as any) || 'Newest',
  };

  const categories = ['All', 'Writing', 'Image Generation', 'Video', 'Audio', 'Code', 'Marketing', 'Productivity', 'Design', 'Research'];
  const pricingOptions = ['All', 'Free', 'Freemium', 'Paid'];

  const updateFilters = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.category !== 'All') params.set('category', newFilters.category);
    if (newFilters.pricing !== 'All') params.set('pricing', newFilters.pricing);
    if (newFilters.sort !== 'Newest') params.set('sort', newFilters.sort);
    newFilters.tags.forEach(tag => params.append('tags', tag));

    router.push(`/tools?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full lg:w-[280px] shrink-0 space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase mb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 border rounded border-white/20 bg-white/5 group-hover:border-indigo-500/50 transition-colors">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={filters.category === cat}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {filters.category === cat && (
                  <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
                )}
              </div>
              <span className={`text-sm transition-colors ${filters.category === cat ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Pricing Filter */}
      <div>
        <h3 className="text-sm font-semibold tracking-wider text-slate-300 uppercase mb-4">Pricing</h3>
        <div className="flex flex-col gap-2">
          {pricingOptions.map(price => (
            <label key={price} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex text-indigo-500 items-center justify-center w-5 h-5 border rounded-full border-white/20 bg-white/5 group-hover:border-indigo-500/50 transition-colors">
                <input
                  type="radio"
                  name="pricing"
                  value={price}
                  checked={filters.pricing === price}
                  onChange={(e) => updateFilters('pricing', e.target.value)}
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                />
                {filters.pricing === price && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                )}
              </div>
              <span className={`text-sm transition-colors ${filters.pricing === price ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {price}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Reset button if filters active */}
      {(filters.category !== 'All' || filters.pricing !== 'All' || filters.search !== '') && (
        <button 
          onClick={() => router.push('/tools')}
          className="w-full py-2 text-sm font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
