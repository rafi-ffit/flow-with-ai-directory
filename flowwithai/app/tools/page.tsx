import toolsData from '../../data/tools.json';
import ToolCard from '../../components/ToolCard';
import FilterSidebar from '../../components/FilterSidebar';
import SearchBar from '../../components/SearchBar';

export const metadata = {
  title: 'All AI Tools | FlowWithAI',
};

export default async function ToolsDirectory({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.search === 'string' ? params.search.toLowerCase() : '';
  const category = typeof params.category === 'string' ? params.category : 'All';
  const pricing = typeof params.pricing === 'string' ? params.pricing : 'All';
  
  let filteredTools = toolsData.filter((tool) => {
    let match = true;
    if (query) {
      match = match && (tool.name.toLowerCase().includes(query) || tool.tagline.toLowerCase().includes(query) || tool.tags.some(t => t.toLowerCase().includes(query)));
    }
    if (category !== 'All') {
      match = match && tool.category.includes(category);
    }
    if (pricing !== 'All') {
      match = match && tool.pricing === pricing;
    }
    return match;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">AI Tools Directory</h1>
          <p className="text-slate-400">Showing {filteredTools.length} tools based on filters.</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar initialValue={query} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <FilterSidebar />
        
        <div className="flex-1">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool as any} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
              <p className="text-slate-400 max-w-md">Try adjusting your filters or search query to find what you&apos;re looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
