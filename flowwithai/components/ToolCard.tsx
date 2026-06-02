import Link from 'next/link';
import Image from 'next/image';
import { Tool } from '../types';
import clsx from 'clsx';
import { ExternalLink } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Freemium':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'Paid':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-slate-300 bg-slate-500/10 border-slate-500/20';
    }
  };

  const isNew = () => {
    const addedDate = new Date(tool.dateAdded);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return addedDate >= thirtyDaysAgo;
  };

  return (
    <div
      className={clsx(
        'group relative flex flex-col justify-between rounded-[16px] bg-white/[0.02] p-5 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04]',
        tool.featured
          ? 'border border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]'
          : 'border border-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
      )}
    >
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            {tool.logo ? (
               <Image
                 src={tool.logo}
                 alt={`${tool.name} logo`}
                 fill
                 sizes="48px"
                 referrerPolicy="no-referrer"
                 className="object-cover"
               />
            ) : (
               <span className="text-lg font-bold text-white">{tool.name.charAt(0)}</span>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={clsx(
                'inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium',
                getPricingColor(tool.pricing)
              )}
            >
              {tool.pricing}
            </span>
            {isNew() && (
              <span className="inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                New
              </span>
            )}
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
            {tool.name}
          </h3>
          <Link
            href={`/category/${tool.category.toLowerCase().replace(' ', '-')}`}
            className="shrink-0 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-medium text-indigo-400 hover:bg-indigo-500/20 transition-colors"
          >
            {tool.category}
          </Link>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-slate-400 min-h-[40px]">
          {tool.tagline}
        </p>

        <div className="mb-6 flex flex-wrap gap-2">
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-xs text-slate-400">
              +{tool.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto flex gap-3">
        <Link
          href={`/tools/${tool.slug}`}
          className="flex-1 rounded-lg bg-white/5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Details
        </Link>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-500/10 py-2.5 text-sm font-medium text-indigo-400 transition-all hover:bg-gradient-to-r hover:from-indigo-500 hover:to-violet-600 hover:text-white"
        >
          Visit <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
