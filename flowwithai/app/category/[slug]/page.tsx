import toolsData from '../../../data/tools.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ToolCard from '../../../components/ToolCard';
import { ChevronLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categoryName = resolvedParams.slug.replace('-', ' ');
  return {
    title: `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} AI Tools | FlowWithAI`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const categoryFormatted = resolvedParams.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  const categoryTools = toolsData.filter(
    (tool) => tool.category.toLowerCase() === categoryFormatted.toLowerCase()
  );

  const icons: { [key: string]: string } = {
    'Writing': '✍️',
    'Image Generation': '🎨',
    'Video': '🎬',
    'Code': '💻',
    'Audio': '🎧',
    'Productivity': '⚡',
    'Design': '✨',
    'Marketing': '📈',
    'Research': '🔬'
  };

  const currentIcon = icons[categoryFormatted] || '🔥';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors mb-8">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Directory
      </Link>

      <div className="py-12 md:py-20 flex flex-col items-center text-center border-b border-white/5 mb-12">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)] border border-white/10">
          {currentIcon}
        </div>
        <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-6">
          {categoryTools.length} {categoryTools.length === 1 ? 'Tool' : 'Tools'}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          {categoryFormatted} AI Tools
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl">
          Everything you need to level up your {categoryFormatted.toLowerCase()} workflow with the latest AI technologies.
        </p>
      </div>

      {categoryTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool as any} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-white/5 bg-white/[0.01] rounded-3xl">
          <h2 className="text-2xl font-bold text-white mb-2">No tools found</h2>
          <p className="text-slate-400">We&apos;re updating our directory. Submit your favorite tool!</p>
          <Link href="/submit" className="inline-flex mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white rounded-xl font-medium transition-colors shadow-lg">
            Submit a Tool
          </Link>
        </div>
      )}
    </div>
  );
}
