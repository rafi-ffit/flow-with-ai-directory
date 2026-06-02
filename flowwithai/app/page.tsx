import toolsData from '../data/tools.json';
import HeroSection from '../components/HeroSection';
import ToolCard from '../components/ToolCard';
import CategoryCard from '../components/CategoryCard';
import NewsletterSection from '../components/NewsletterSection';
import Link from 'next/link';

export default function Home() {
  const featuredTools = toolsData.filter(t => t.featured);
  const categories = [
    { name: 'Writing', icon: '✍️', count: toolsData.filter(t => t.category === 'Writing').length },
    { name: 'Image Generation', icon: '🎨', count: toolsData.filter(t => t.category === 'Image Generation').length },
    { name: 'Video', icon: '🎬', count: toolsData.filter(t => t.category === 'Video').length },
    { name: 'Code', icon: '💻', count: toolsData.filter(t => t.category === 'Code').length },
    { name: 'Audio', icon: '🎧', count: toolsData.filter(t => t.category === 'Audio').length },
    { name: 'Productivity', icon: '⚡', count: toolsData.filter(t => t.category === 'Productivity').length },
    { name: 'Design', icon: '✨', count: toolsData.filter(t => t.category === 'Design').length },
    { name: 'Marketing', icon: '📈', count: toolsData.filter(t => t.category === 'Marketing').length },
  ];

  return (
    <>
      <HeroSection />

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
            <div>
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-slate-400">Tools Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">20+</div>
              <div className="text-sm text-slate-400">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">100K+</div>
              <div className="text-sm text-slate-400">Monthly Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">Daily</div>
              <div className="text-sm text-slate-400">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Segment */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10 border-b border-transparent">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured AI Tools</h2>
            <p className="text-slate-400">Top picks engineered for excellence.</p>
          </div>
          <Link href="/tools?sort=trending" className="hidden sm:inline-flex text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            View All →
          </Link>
        </div>
        
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory gap-6 hide-scrollbar">
          {featuredTools.map((tool) => (
            <div key={tool.id} className="w-[300px] sm:w-[360px] snap-center shrink-0">
              <ToolCard tool={tool as any} />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
            <p className="text-slate-400">Find the right AI model tailored to your exact use-case.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} name={cat.name} icon={cat.icon} count={cat.count} />
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Grid (Preview) */}
      <section className="py-20 max-w-7xl mx-auto px-4">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Discoveries</h2>
            <p className="text-slate-400">Fresh additions to the directory.</p>
          </div>
         <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Writing', 'Image Generation', 'Video', 'Code'].map((pill) => (
               <Link 
                  key={pill} 
                  href={pill === 'All' ? '/tools' : `/tools?category=${encodeURIComponent(pill)}`}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
                >
                  {pill}
                </Link>
            ))}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsData.slice(0, 8).map(tool => (
               <ToolCard key={tool.id} tool={tool as any} />
            ))}
         </div>

         <div className="mt-12 text-center">
            <Link href="/tools" className="inline-flex px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-medium transition-all hover:scale-105">
               Load More Tools
            </Link>
         </div>
      </section>

      <NewsletterSection />
    </>
  );
}
