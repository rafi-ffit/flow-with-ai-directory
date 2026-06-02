import SearchBar from './SearchBar';
import Link from 'next/link';

export default function HeroSection() {
  const popularSearches = ['Video Generator', 'SEO Writing', 'Coding Assistants', 'Image Editor'];

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -ml-[500px] w-[1000px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
          <span className="mr-2 text-indigo-400">✦</span> 500+ AI Tools Listed
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
          Discover the Best AI Tools for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Every Task
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-lg text-slate-400 mb-10">
          Explore, compare and find the perfect AI tools to boost your productivity. 
          Updated daily with the newest and most innovative AI solutions.
        </p>

        {/* Search */}
        <div className="w-full mb-6 relative z-10">
          <SearchBar large={true} />
        </div>

        {/* Popular searches */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
          <span className="mr-2">Popular:</span>
          {popularSearches.map((term) => (
            <Link 
              key={term} 
              href={`/tools?search=${encodeURIComponent(term)}`}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              {term}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
