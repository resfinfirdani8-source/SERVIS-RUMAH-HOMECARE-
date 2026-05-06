import { Menu, X, Home, Briefcase, Star, DollarSign, Clock, Info, Mail, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Navbar({ onNavigate, currentView }: { onNavigate: (v: 'landing' | 'dashboard') => void, currentView: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#', icon: Home, view: 'landing' },
    { name: 'Layanan', href: '#services', icon: Briefcase, view: 'landing' },
    { name: 'Fitur', href: '#features', icon: Star, view: 'landing' },
    { name: 'Harga', href: '#pricing', icon: DollarSign, view: 'landing' },
    { name: 'Riwayat Pesanan', href: '#', icon: Clock, view: 'dashboard' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">HomeCare</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.view as 'landing' | 'dashboard');
                  setIsOpen(false);
                }}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  (currentView === link.view && (link.name !== 'Beranda' && link.name !== 'Home')) ? "text-primary" : "text-gray-600"
                )}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-all flex items-center gap-2"
            >
              <LayoutDashboard size={18} />
              {currentView === 'landing' ? 'Mulai Sekarang' : 'Dashboard'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-200 py-4 px-6 space-y-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavigate(link.view as 'landing' | 'dashboard');
                  setIsOpen(false);
                }}
                className="flex items-center gap-4 w-full text-left py-2 text-gray-600 font-medium"
              >
                <link.icon size={20} />
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => {
                onNavigate('dashboard');
                setIsOpen(false);
              }}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={20} />
              Open App
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
