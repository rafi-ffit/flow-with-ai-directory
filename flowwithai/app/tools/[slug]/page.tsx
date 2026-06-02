import toolsData from '../../../data/tools.json';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, CheckCircle2, ChevronRight, Share2 } from 'lucide-react';
import ToolCard from '../../../components/ToolCard';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tool = toolsData.find(t => t.slug === resolvedParams.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} - AI Tool | FlowWithAI`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} on FlowWithAI`,
      description: tool.tagline,
      images: [tool.logo]
    }
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tool = toolsData.find(t => t.slug === resolvedParams.slug);
  
  if (!tool) {
    notFound();
  }

  const relatedTools = toolsData
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-white">{tool.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header area */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="relative w-24 h-24 shrink-0 bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
              {tool.logo ? (
                <Image src={tool.logo} alt={tool.name} fill sizes="96px" className="object-cover" />
              ) : (
                <span className="text-4xl font-bold">{tool.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">{tool.name}</h1>
              <p className="text-xl text-slate-400">{tool.tagline}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium border border-indigo-500/20">
              {tool.category}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/10">
              {tool.pricing}
            </span>
            {tool.featured && (
              <span className="px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium border border-amber-500/20">
                Featured
              </span>
            )}
          </div>

          <div className="prose prose-invert prose-indigo max-w-none">
            <h2 className="text-2xl font-bold text-white mb-4">About {tool.name}</h2>
            <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">{tool.description}</p>
          </div>

          <div>
             <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
             <div className="flex flex-wrap gap-2">
                {tool.tags.map(tag => (
                   <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300">
                      {tag}
                   </span>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <a 
              href={tool.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02]"
            >
              Visit Website <ExternalLink className="w-5 h-5" />
            </a>
            
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">Pricing</span>
                <span className="text-white font-medium">{tool.pricing}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">Category</span>
                <span className="text-white font-medium">{tool.category}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-slate-400">Date Added</span>
                <span className="text-white font-medium">{new Date(tool.dateAdded).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-400">Verified Listing</span>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
            </div>
            
            <button className="flex w-full mt-6 items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors">
               <Share2 className="w-4 h-4" /> Share Tool
            </button>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mt-24 border-t border-white/10 pt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Related {tool.category} Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map(t => (
              <ToolCard key={t.id} tool={t as any} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
