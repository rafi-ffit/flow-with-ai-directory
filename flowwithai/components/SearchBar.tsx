'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initialValue = '', large = false }: { initialValue?: string; large?: boolean }) {
  const [query, setQuery] = useState(initialValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?search=${encodeURIComponent(query)}`);
    } else {
      router.push('/tools');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center w-full mx-auto group ${large ? 'max-w-[600px]' : ''}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
        <Search className={large ? "w-6 h-6" : "w-5 h-5"} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`w-full bg-white/5 border border-white/10 rounded-full text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 backdrop-blur-md transition-all shadow-inner ${
          large ? 'py-4 pl-12 pr-32 text-lg' : 'py-2 pl-12 pr-20 text-sm'
        }`}
        placeholder="Search for AI tools, categor...\u200B"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          type="submit"
          className={`bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-full transition-colors ${
            large ? 'px-6 py-2 text-base' : 'px-4 py-1 text-xs'
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
