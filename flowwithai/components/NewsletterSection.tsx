'use client';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-indigo-950/20 to-[#0a0a0f] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-md flex flex-col items-center text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest AI Tools
          </h2>
          <p className="text-slate-400 max-w-xl mb-8">
            Join 50,000+ creators and professionals. Get a weekly summary of the best new AI tools, updates, and tutorials.
          </p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 bg-black/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {status === 'success' ? (
              <div className="px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-400 font-semibold rounded-xl flex items-center justify-center">
                Subscribed ✨
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold rounded-xl transition-all disabled:opacity-70"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            )}
          </form>
          <p className="text-xs text-slate-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
