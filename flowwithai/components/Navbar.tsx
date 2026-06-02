'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Zap } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Categories', path: '/tools?sort=category' }, // Since there is no explicit /category root, linking to tools with maybe a filter state
    { name: 'Submit Tool', path: '/submit' },
  ];

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-md border-white/10'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Zap className="w-5 h-5 text-indigo-400 group-hover:animate-pulse" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            FlowWithAI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {links.slice(0, 3).map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path.split('?')[0]));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={clsx(
                    'text-sm font-medium transition-colors relative hover:text-white',
                    isActive ? 'text-white' : 'text-slate-400'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-indigo-500 rounded-t-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6">
            <Link href="/tools" className="text-slate-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full hover:shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:scale-105 transition-all"
            >
              Submit Tool
            </Link>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0f] border-b border-white/10 shadow-2xl p-4 flex flex-col gap-2"
          >
            {links.map((link) => {
              const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path.split('?')[0]));
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/5 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
