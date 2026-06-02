export default function LoadingSkeleton() {
  return (
    <div className="rounded-[16px] border border-white/5 bg-white/[0.02] p-5 animate-pulse">
      <div className="mb-4 flex items-start justify-between">
        <div className="h-12 w-12 rounded-xl bg-white/10"></div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-4 w-16 rounded-full bg-white/10"></div>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <div className="h-6 w-32 rounded-md bg-white/10"></div>
        <div className="h-4 w-16 rounded-full bg-white/10"></div>
      </div>
      <div className="mb-4 h-8 w-full rounded-md bg-white/10"></div>
      <div className="mb-6 flex gap-2">
        <div className="h-6 w-16 rounded-full bg-white/10"></div>
        <div className="h-6 w-16 rounded-full bg-white/10"></div>
        <div className="h-6 w-16 rounded-full bg-white/10"></div>
      </div>
      <div className="mt-auto flex gap-3">
        <div className="h-10 flex-1 rounded-lg bg-white/10"></div>
        <div className="h-10 flex-1 rounded-lg bg-white/10"></div>
      </div>
    </div>
  );
}
