import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import AuthPage from './components/AuthPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [dashboardTab, setDashboardTab] = useState<'home' | 'orders' | 'finance' | 'account'>('home');
  const [ordersSubTab, setOrdersSubTab] = useState<'new' | 'history'>('history');
  const [bookingStep, setBookingStep] = useState(0);

  // Shared application state
  const [balance, setBalance] = useState(450000);
  
  const [orders, setOrders] = useState([
    { id: 'HC-9021', service: 'Servis AC', status: 'Dalam Proses', price: 'Rp 150.000', date: 'Hari Ini', time: '14:00', paymentMethod: 'e-wallet', technician: 'Supriyadi', description: 'AC meneteskan air dan kurang dingin di kamar utama.' },
    { id: 'HC-9020', service: 'Kebersihan', status: 'Selesai', price: 'Rp 80.000', date: '1 Mei 2026', time: '11:00', paymentMethod: 'e-wallet', technician: 'Suparno', description: 'Deep clean area dapur dan ruang makan.' },
    { id: 'HC-8998', service: 'Ledeng', status: 'Selesai', price: 'Rp 100.000', date: '12 Apr 2026', time: '09:00', paymentMethod: 'qr', technician: 'Fajar Widodo', description: 'Pipa wastafel cuci piring tersumbat air kotor.' },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 'TX-8802', type: 'debit', title: 'Pembayaran Servis AC HC-9021', amount: 'Rp 150.000', date: 'Hari Ini, 14:00', status: 'Selesai' },
    { id: 'TX-8801', type: 'credit', title: 'Isi Saldo (Top-Up) Dompet', amount: 'Rp 200.000', date: '19 Mei 2026, 10:15', status: 'Selesai' },
    { id: 'TX-8799', type: 'debit', title: 'Pembayaran Kebersihan Rumah HC-9020', amount: 'Rp 80.000', date: '1 Mei 2026, 11:30', status: 'Selesai' },
    { id: 'TX-8798', type: 'credit', title: 'Cashback Dompet Berkah', amount: 'Rp 15.000', date: '1 Mei 2026, 11:45', status: 'Selesai' },
  ]);

  const [profile, setProfile] = useState({
    name: 'Resfin Firdani',
    email: 'resfinfirdani8@gmail.com',
    phone: '083176558460',
    address: 'Residence Blok A, Pamulang, Tangerang Selatan',
    memberTier: 'Premium Gold Member',
  });

  const handleNavigateToTab = (tab: 'home' | 'orders' | 'finance' | 'account', subTab?: 'new' | 'history') => {
    setDashboardTab(tab);
    if (subTab) {
      setOrdersSubTab(subTab);
    }
    if (subTab === 'new') {
      setBookingStep(0);
    }
    setView('dashboard');
  };

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onNavigate={(v) => setView(v)} 
        currentView={view} 
        onLogout={() => setIsAuthenticated(false)} 
        dashboardTab={dashboardTab}
        onSelectDashboardTab={handleNavigateToTab}
      />
      <main>
        {view === 'landing' ? (
          <LandingPage 
            onStart={() => handleNavigateToTab('home')} 
            onStartWithTab={handleNavigateToTab}
          />
        ) : (
          <Dashboard 
            activeTab={dashboardTab}
            setActiveTab={setDashboardTab}
            balance={balance}
            setBalance={setBalance}
            orders={orders}
            setOrders={setOrders}
            transactions={transactions}
            setTransactions={setTransactions}
            profile={profile}
            setProfile={setProfile}
            bookingStep={bookingStep}
            setBookingStep={setBookingStep}
            ordersSubTab={ordersSubTab}
            setOrdersSubTab={setOrdersSubTab}
          />
        )}
      </main>
      
      {view === 'landing' && (
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary-light mb-4">HomeCare</h3>
              <p className="text-gray-400">Membuat layanan rumah mudah, cepat, dan terpercaya untuk semua orang.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-primary-light">Servis AC</button></li>
                <li><button className="hover:text-primary-light">Ledeng</button></li>
                <li><button className="hover:text-primary-light">Listrik</button></li>
                <li><button className="hover:text-primary-light">Kebersihan</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button className="hover:text-primary-light">Tentang Kami</button></li>
                <li><button className="hover:text-primary-light">Fitur</button></li>
                <li><button className="hover:text-primary-light">Harga</button></li>
                <li><button className="hover:text-primary-light">Kontak</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hubungi Kami</h4>
              <div className="space-y-4">
                <a href="https://wa.me/6283176558460" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary-light transition-colors group">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.824-.312.045-.633.056-1.579-.245-1.199-.348-1.92-1.424-2.126-1.74a4.13 4.13 0 01-.225-.333c-.456-.632-.8-1.554-.533-2.38.167-.506.635-.745.895-.815.26-.07.48-.12.63-.12.16 0 .31.02.43.2.14.21.46 1.12.5 1.21.04.09.07.19.01.31-.06.12-.09.18-.18.29-.09.12-.19.26-.27.35-.1.09-.2.19-.09.37.11.19.49.81 1.05 1.31.72.63 1.32.83 1.51.93.19.1.3.1.41-.04.11-.14.47-.55.6-.73.13-.18.26-.15.44-.09.18.07 1.15.54 1.35.64.19.1.32.15.37.23.05.08.05.46-.1.87z"/>
                    </svg>
                  </div>
                  <span className="text-sm">083176558460</span>
                </a>
                <a href="https://instagram.com/home_care" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary-light transition-colors group">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.319.975.975 1.256 2.242 1.319 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.344 2.633-1.319 3.608-.975.975-2.242 1.256-3.608 1.319-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.344-3.608-1.319-.975-.975-1.256-2.242-1.319-3.608C2.012 15.584 2 15.204 2 12s.012-3.584.07-4.85c.062-1.366.344-2.633 1.319-3.608.975-.975 2.242-1.256 3.608-1.319 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <span className="text-sm">home_care</span>
                </a>
                <a href="https://facebook.com/home_care" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-primary-light transition-colors group">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-primary/20">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </div>
                  <span className="text-sm">home_care</span>
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} HomeCare. Hak cipta dilindungi undang-undang.
          </div>
        </footer>
      )}
    </div>
  );
}
