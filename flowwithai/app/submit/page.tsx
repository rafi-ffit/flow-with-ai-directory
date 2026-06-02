'use client';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SubmitToolPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    tagline: '',
    description: '',
    category: 'Writing',
    pricing: 'Free',
    tags: '',
    logo: ''
  });

  const categories = ['Writing', 'Image Generation', 'Video', 'Audio', 'Code', 'Marketing', 'Productivity', 'Design', 'Research'];
  const pricingOptions = ['Free', 'Freemium', 'Paid'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-3xl p-10 text-center backdrop-blur-md">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Submission Received!</h1>
          <p className="text-slate-400 mb-8">
            Thank you for submitting {formData.name}. Our team will review your submission and add it to directory within 24 hours.
          </p>
          <button 
            onClick={() => {
              setIsSuccess(false);
              setFormData({ name: '', website: '', tagline: '', description: '', category: 'Writing', pricing: 'Free', tags: '', logo: '' });
            }}
            className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
          >
            Submit Another Tool
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Submit Your AI Tool</h1>
        <p className="text-lg text-slate-400">Join the fastest growing directory of AI products.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="relative z-10 space-y-8 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Tool Name *</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. ChatGPT" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />
            </div>
            
            {/* Website URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Website URL *</label>
              <input 
                type="url" 
                name="website"
                required
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              />
            </div>
          </div>

          {/* Short Tagline */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Short Tagline *</label>
            <input 
              type="text" 
              name="tagline"
              required
              maxLength={100}
              value={formData.tagline}
              onChange={handleChange}
              placeholder="A brief catchy description in under 100 characters" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
            />
            <p className="text-xs text-slate-500 text-right">{formData.tagline.length}/100</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Description *</label>
            <textarea 
              name="description"
              required
              maxLength={500}
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="What does your tool do? How does it help users? Be as specific as possible." 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none font-sans"
            ></textarea>
            <p className="text-xs text-slate-500 text-right">{formData.description.length}/500</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Primary Category *</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#1e1e24] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Pricing Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Pricing *</label>
              <div className="flex gap-4">
                {pricingOptions.map(price => (
                  <label key={price} className={`flex-1 flex items-center justify-center p-3 rounded-xl border border-white/10 cursor-pointer transition-all ${formData.pricing === price ? 'bg-indigo-500/20 border-indigo-500/50 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
                    <input 
                      type="radio" 
                      name="pricing" 
                      value={price} 
                      checked={formData.pricing === price}
                      onChange={handleChange}
                      className="hidden" 
                    />
                    <span className="text-sm font-medium">{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Tags (comma separated) *</label>
            <input 
              type="text" 
              name="tags"
              required
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. video editor, text-to-speech, generative design" 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
            />
          </div>

          {/* Logo URL */}
          <div className="space-y-2">
             <label className="text-sm font-medium text-slate-300">Logo Image URL</label>
             <div className="flex items-center gap-4">
                <input 
                  type="url" 
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png" 
                  className="w-full flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                />
                <div className="w-12 h-12 shrink-0 bg-white/5 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                   {formData.logo ? (
                      <img src={formData.logo} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target as any).style.display='none'} />
                   ) : (
                      <span className="text-xs text-slate-600">Logo</span>
                   )}
                </div>
             </div>
          </div>

          <div className="pt-6 border-t border-white/5">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all disabled:opacity-75 flex items-center justify-center gap-2 font-sans hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/0000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Tool for Review'}
            </button>
            <p className="text-center text-sm text-slate-500 mt-4">
              We review submissions within 24 hours. Quality tools are approved instantly.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
