import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
}

export default function CategoryCard({ name, icon, count }: CategoryCardProps) {
  const slug = name.toLowerCase().replace(' ', '-');
  
  return (
    <Link
      href={`/category/${slug}`}
      className="group flex flex-col items-center justify-center gap-3 rounded-[16px] border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/30 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl transition-transform group-hover:scale-110 group-hover:bg-indigo-500/10">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{name}</h3>
        <p className="text-sm text-slate-500 mt-1">{count} Tools</p>
      </div>
    </Link>
  );
}
