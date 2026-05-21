import { Menu, X, Home, Briefcase, Star, DollarSign, Clock, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Navbar({ 
  onNavigate, 
  currentView, 
  onLogout,
  dashboardTab,
  onSelectDashboardTab
}: { 
  onNavigate: (v: 'landing' | 'dashboard') => void, 
  currentView: string, 
  onLogout: () => void,
  dashboardTab?: 'home' | 'orders' | 'finance' | 'account',
  onSelectDashboardTab?: (t: 'home' | 'orders' | 'finance' | 'account') => void
}) {
  const [isOpen, setIsOpen] = useState(false);

  const landingLinks = [
    { name: 'Beranda', href: '#', icon: Home, action: () => onNavigate('landing') },
    { name: 'Layanan', href: '#services', icon: Briefcase, action: () => { onNavigate('landing'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Fitur', href: '#features', icon: Star, action: () => { onNavigate('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Harga', href: '#pricing', icon: DollarSign, action: () => { onNavigate('landing'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { name: 'Riwayat Pesanan', href: '#', icon: Clock, action: () => onSelectDashboardTab?.('orders') },
  ];

  const dashboardLinks = [
    { name: 'Beranda', icon: Home, activeId: 'home', action: () => onSelectDashboardTab?.('home') },
    { name: 'Pesanan', icon: Briefcase, activeId: 'orders', action: () => onSelectDashboardTab?.('orders') },
    { name: 'Keuangan', icon: DollarSign, activeId: 'finance', action: () => onSelectDashboardTab?.('finance') },
    { name: 'Akun Saya', icon: User, activeId: 'account', action: () => onSelectDashboardTab?.('account') },
  ];

  const links = currentView === 'dashboard' ? dashboardLinks : landingLinks;

  const isActive = (link: any) => {
    if (currentView === 'dashboard') {
      return dashboardTab === link.activeId;
    }
    return false;
  };

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
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  setIsOpen(false);
                }}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary flex items-center gap-1.5 py-2 px-3 rounded-xl",
                  isActive(link) 
                    ? "text-primary bg-primary/5 font-extrabold" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <link.icon size={16} />
                {link.name}
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="p-2.5 rounded-full border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all flex items-center gap-2"
              title="Keluar"
            >
              <LogOut size={20} />
            </button>
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
            className="md:hidden bg-white border-b border-gray-200 py-4 px-6 space-y-3"
          >
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  link.action();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-4 w-full text-left py-2.5 px-4 rounded-xl font-medium",
                  isActive(link) 
                    ? "text-primary bg-primary/5 font-bold" 
                    : "text-gray-600"
                )}
              >
                <link.icon size={20} />
                {link.name}
              </button>
            ))}
            <button 
              onClick={onLogout}
              className="w-full border border-gray-200 text-gray-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <LogOut size={20} />
              Keluar
            </button>
            <button 
              onClick={() => {
                onNavigate('dashboard');
                setIsOpen(false);
              }}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={20} />
              Dashboard Utama
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
