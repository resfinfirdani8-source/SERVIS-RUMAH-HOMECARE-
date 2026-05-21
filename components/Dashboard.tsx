import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Bell, 
  Filter,
  Plus,
  ArrowLeft,
  Smartphone,
  Wallet,
  Building,
  QrCode,
  DollarSign,
  Star,
  Wind,
  Zap,
  Droplets,
  Sparkles,
  Hammer,
  Video,
  WashingMachine,
  Paintbrush,
  Wrench,
  User,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

interface DashboardProps {
  activeTab: 'home' | 'orders' | 'finance' | 'account';
  setActiveTab: (tab: 'home' | 'orders' | 'finance' | 'account') => void;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  orders: any[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  transactions: any[];
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>;
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  bookingStep: number;
  setBookingStep: (step: number) => void;
  ordersSubTab: 'new' | 'history';
  setOrdersSubTab: (tab: 'new' | 'history') => void;
}

export default function Dashboard({
  activeTab,
  setActiveTab,
  balance,
  setBalance,
  orders,
  setOrders,
  transactions,
  setTransactions,
  profile,
  setProfile,
  bookingStep,
  setBookingStep,
  ordersSubTab,
  setOrdersSubTab,
}: DashboardProps) {

  return (
    <div className="pt-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-2 shrink-0">
            <button 
              onClick={() => { setActiveTab('home'); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm", activeTab === 'home' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <Smartphone size={18} /> Beranda
            </button>
            <button 
              onClick={() => { setActiveTab('orders'); setOrdersSubTab('history'); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm", activeTab === 'orders' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <Briefcase size={18} /> Pesanan Saya
            </button>
            <button 
              onClick={() => { setActiveTab('finance'); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm", activeTab === 'finance' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <Wallet size={18} /> Keuangan
            </button>
            <button 
              onClick={() => { setActiveTab('account'); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm", activeTab === 'account' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <User size={18} /> Akun Saya
            </button>
          </aside>

          {/* Main Content Area */}
          <div className="grow">
            <AnimatePresence mode="wait">
              {activeTab === 'home' && (
                <OverviewTab 
                  onBook={() => { setActiveTab('orders'); setOrdersSubTab('new'); setBookingStep(0); }} 
                  onGoToFinance={() => setActiveTab('finance')}
                  balance={balance}
                  orders={orders}
                  profile={profile}
                  key="home" 
                />
              )}
              {activeTab === 'orders' && (
                <OrdersTab
                  orders={orders}
                  setOrders={setOrders}
                  balance={balance}
                  setBalance={setBalance}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  bookingStep={bookingStep}
                  setBookingStep={setBookingStep}
                  ordersSubTab={ordersSubTab}
                  setOrdersSubTab={setOrdersSubTab}
                  key="orders"
                />
              )}
              {activeTab === 'finance' && (
                <FinanceTab
                  balance={balance}
                  setBalance={setBalance}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  key="finance"
                />
              )}
              {activeTab === 'account' && (
                <AccountTab
                  profile={profile}
                  setProfile={setProfile}
                  key="account"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. HOME / OVERVIEW TAB
function OverviewTab({ 
  onBook, 
  onGoToFinance, 
  balance, 
  orders, 
  profile 
}: { 
  onBook: () => void, 
  onGoToFinance: () => void, 
  balance: number, 
  orders: any[], 
  profile: any 
}) {
  const activeOrders = orders.filter(o => o.status === 'Dalam Proses' || o.status === 'Menunggu Pembayaran');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Halo, {profile.name}!</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm">Kelola layanan rumah terpercaya Anda di satu tempat terpusat.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="bg-white p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-primary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-primary to-rose-700 p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-lg shadow-primary/20">
        <div className="relative z-10 max-w-md">
          <span className="text-[10px] bg-white/20 text-white font-black px-3 py-1 rounded-full uppercase tracking-wider">PROMO KHUSUS MEI</span>
          <h3 className="text-2xl font-black mt-3 leading-tight">Cepat, Murah, dan Bergaransi Resmi</h3>
          <p className="text-white/80 text-sm mt-2 font-medium">Lakukan perawatan AC atau perbaki pipa bocor dengan kode voucher <span className="font-bold underline">HCKILAT</span></p>
          <button onClick={onBook} className="mt-5 bg-white text-primary font-bold px-6 py-2.5 rounded-xl text-sm hover:scale-105 transition-transform">
            Pesan Sekarang
          </button>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 hidden md:block bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400')] bg-cover opacity-10 transform skew-x-12" />
      </div>

      {/* Stats row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Saldo Dompet', value: `Rp ${balance.toLocaleString('id-ID')}`, icon: Wallet, color: 'bg-indigo-500', action: onGoToFinance, actionLabel: 'Lihat Dompet' },
          { label: 'Pesanan Aktif', value: `${activeOrders.length}`, icon: Clock, color: 'bg-primary', action: onBook, actionLabel: 'Lihat Detail' },
          { label: 'Selesai', value: `${orders.filter(o => o.status === 'Selesai').length}`, icon: CheckCircle2, color: 'bg-green-500' },
          { label: 'Loyalitas Tier', value: 'Gold Tier', icon: Star, color: 'bg-yellow-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className={cn("w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-white", stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
            </div>
            {stat.action ? (
              <button onClick={stat.action} className="text-xs text-primary font-bold hover:underline text-left mt-4 pt-3 border-t border-gray-50 flex items-center gap-1">
                {stat.actionLabel} <ChevronRight size={12} />
              </button>
            ) : (
              <div className="text-xs text-gray-400 font-semibold mt-4 pt-3 border-t border-gray-50">Sistem Aktif</div>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Layanan Sedang Diproses</h3>
            <button onClick={onBook} className="text-sm text-primary font-bold hover:underline">Selesai/Semua</button>
          </div>
          <div className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center text-gray-500">
                <p className="font-semibold text-lg text-gray-700">Tidak ada pesanan aktif</p>
                <p className="text-sm text-gray-400 mt-1">Gunakan tab Pemesanan untuk menugaskan teknisi ahli hari ini!</p>
                <button onClick={onBook} className="mt-4 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-md hover:bg-primary-light transition-all">
                  Pesan Layanan Baru
                </button>
              </div>
            ) : (
              activeOrders.map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                         <SmartIcon service={order.service} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{order.service}</p>
                        <p className="text-xs text-gray-500 font-medium">ID Pesanan No: {order.id}</p>
                      </div>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{order.date}, pukul {order.time}</span>
                    </div>
                    {order.technician && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        <span>Teknisi: {order.technician}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions sidebar */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Aksi Cepat</h3>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <button onClick={onBook} className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-between hover:bg-primary-light transition-all">
              Pesan Layanan Baru <Plus size={20} />
            </button>
            <button onClick={onGoToFinance} className="w-full bg-indigo-50 text-indigo-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-between hover:bg-indigo-100 transition-all">
              Isi Ulang Saldo Dompet <Wallet size={20} />
            </button>
            <a href="https://wa.me/6283176558460" target="_blank" rel="noreferrer" className="w-full bg-orange-50 text-orange-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-between hover:bg-orange-100 transition-all text-center flex justify-between">
              Hubungi CS WhatsApp <Bell size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 2. UNIFIED ORDERS TAB (NEW BOOKING + BOOKING HISTORY)
function OrdersTab({
  orders,
  setOrders,
  balance,
  setBalance,
  transactions,
  setTransactions,
  bookingStep,
  setBookingStep,
  ordersSubTab,
  setOrdersSubTab,
}: {
  orders: any[],
  setOrders: React.Dispatch<React.SetStateAction<any[]>>,
  balance: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  transactions: any[],
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>,
  bookingStep: number,
  setBookingStep: (s: number) => void,
  ordersSubTab: 'new' | 'history',
  setOrdersSubTab: (t: 'new' | 'history') => void,
}) {
  return (
    <div className="space-y-6">
      {/* Segment switcher */}
      <div className="bg-white p-1 rounded-2xl border border-gray-200 flex max-w-md shadow-sm">
        <button
          onClick={() => setOrdersSubTab('history')}
          className={cn(
            "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2",
            ordersSubTab === 'history' ? "bg-primary text-white shadow-md shadow-primary/25" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Clock size={16} /> Riwayat & Status
        </button>
        <button
          onClick={() => { setOrdersSubTab('new'); setBookingStep(0); }}
          className={cn(
            "flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2",
            ordersSubTab === 'new' ? "bg-primary text-white shadow-md shadow-primary/25" : "text-gray-500 hover:text-gray-900"
          )}
        >
          <Plus size={16} /> Buat Pesanan Baru
        </button>
      </div>

      <AnimatePresence mode="wait">
        {ordersSubTab === 'new' ? (
          <BookingTab 
            step={bookingStep} 
            setStep={setBookingStep} 
            orders={orders}
            setOrders={setOrders}
            balance={balance}
            setBalance={setBalance}
            transactions={transactions}
            setTransactions={setTransactions}
            onComplete={() => {
              setOrdersSubTab('history');
            }} 
          />
        ) : (
          <HistoryTab orders={orders} />
        )}
      </AnimatePresence>
    </div>
  );
}

// BOOKING PROCESS COMPONENT
function BookingTab({ 
  step, 
  setStep, 
  orders,
  setOrders,
  balance,
  setBalance,
  transactions,
  setTransactions,
  onComplete 
}: { 
  step: number, 
  setStep: (s: number) => void, 
  orders: any[],
  setOrders: React.Dispatch<React.SetStateAction<any[]>>,
  balance: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  transactions: any[],
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>,
  onComplete: () => void 
}) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [issueDescription, setIssueDescription] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState<any>(null);

  const services = [
    { id: '1', name: 'Servis AC', price: 'Rp 150.000', icon: Wind },
    { id: '2', name: 'Listrik', price: 'Rp 120.000', icon: Zap },
    { id: '3', name: 'Ledeng', price: 'Rp 100.000', icon: Droplets },
    { id: '4', name: 'Kebersihan', price: 'Rp 80.000/jam', icon: Sparkles },
    { id: '5', name: 'Renovasi', price: 'Rp 350.000/hari', icon: Hammer },
    { id: '6', name: 'Instalasi CCTV', price: 'Rp 250.000', icon: Video },
    { id: '7', name: 'Mesin Cuci', price: 'Rp 180.000', icon: WashingMachine },
    { id: '8', name: 'Cat Rumah', price: 'Rp 140.000/hari', icon: Paintbrush },
    { id: '9', name: 'Lainnya', price: 'Sesuai Pengecekan', icon: Wrench },
  ];

  const technicians = [
    { id: 'tech-1', name: 'Supriyadi', role: 'Mitra AC', rating: 5.0, distance: '1.2 km', logo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=120&h=120', reviews: 48, spec: 'Sangat Ahli & Bersertifikat' },
    { id: 'tech-2', name: 'Suparno', role: 'Mitra Serbaguna', rating: 4.8, distance: '3.1 km', logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120&h=120', reviews: 32, spec: 'Mitra Teladan & Berpengalaman' },
    { id: 'tech-3', name: 'Fajar Widodo', role: 'Mitra Ledeng', rating: 4.9, distance: '4.5 km', logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120', reviews: 54, spec: 'Sopan, Ramah & Cepat' },
  ];

  const paymentMethods = [
    { id: 'e-wallet', name: 'Saldo Dompet HomeCare', icon: Wallet },
    { id: 'va', name: 'Virtual Bank Transfer', icon: Building },
    { id: 'cash', name: 'Serahkan Tunai ke Teknisi', icon: DollarSign },
  ];

  const handleConfirmOrder = () => {
    const newOrderId = `HC-${Math.floor(Math.random() * 9000 + 1000)}`;
    const costText = services.find(s => s.name === selectedService)?.price || 'Rp 150.000';
    const costVal = parseInt(costText.replace(/[^0-9]/g, '')) || 150000;

    const newOrderObj = {
      id: newOrderId,
      service: selectedService || 'Layanan HomeCare',
      status: 'Dalam Proses',
      price: costText,
      date: format(selectedDate, 'd MMM yyyy'),
      time: selectedTime,
      paymentMethod: selectedPayment === 'e-wallet' ? 'Dompet Elektronik' : selectedPayment === 'va' ? 'Virtual Account' : 'Tunai',
      technician: selectedTechnician?.name || 'Supriyadi',
      description: issueDescription || 'Pengecekan standar dan perbaikan mekanis.'
    };

    if (selectedPayment === 'e-wallet') {
      if (balance >= costVal) {
        setBalance(prev => prev - costVal);
        setTransactions(prev => [
          {
            id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
            type: 'debit',
            title: `Bayar Order ${selectedService} (${newOrderId})`,
            amount: `Rp ${costVal.toLocaleString('id-ID')}`,
            date: 'Baru saja',
            status: 'Selesai'
          },
          ...prev
        ]);
      } else {
        newOrderObj.status = 'Menunggu Pembayaran';
      }
    } else {
      setTransactions(prev => [
        {
          id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
          type: 'debit',
          title: `Tagihan Order ${selectedService} (${newOrderId})`,
          amount: costText,
          date: 'Baru saja',
          status: 'Menunggu Pembayaran'
        },
        ...prev
      ]);
    }

    setOrders(prev => [newOrderObj, ...prev]);
    setStep(4);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-8">
      {/* Progress timeline indicator */}
      <div className="flex items-center gap-4 mb-4">
        {[0, 1, 2, 3, 4].map((s) => (
          <div key={s} className="grow h-1.5 rounded-full overflow-hidden bg-gray-200">
            <motion.div 
              initial={false}
              animate={{ width: step >= s ? '100%' : '0%' }}
              className="h-full bg-primary"
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900">Layanan apa yang Anda butuhkan?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {services.map((s) => (
                <button 
                  key={s.id}
                  onClick={() => { setSelectedService(s.name); setStep(1); }}
                  className={cn("p-5 rounded-3xl border text-left transition-all hover:scale-[1.01] flex flex-col justify-between h-40", selectedService === s.name ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm" : "border-gray-200 bg-white hover:border-primary-light")}
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary mb-4">
                    <s.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 border-none outline-none leading-tight">{s.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{s.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(0)} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><ArrowLeft size={20}/></button>
              <h3 className="text-2xl font-black text-gray-900">Kapan kami harus berkunjung?</h3>
            </div>
            
            <Calendar value={selectedDate} onChange={setSelectedDate} />
            
            <div className="space-y-3 pt-4">
              <h4 className="font-bold text-gray-900">Konfirmasi Jam Kedatangan</h4>
              <div className="grid grid-cols-5 gap-2">
                {['09:00', '11:00', '13:00', '15:00', '17:00'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={cn(
                      "py-3 rounded-xl border text-xs font-bold transition-all", 
                      selectedTime === t 
                        ? "border-primary bg-primary text-white shadow-md shadow-primary/20" 
                        : "bg-white border-gray-200 hover:border-primary text-gray-700 hover:text-primary"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <h4 className="font-bold text-gray-900">Rincian Masalah / Deskripsi Tambahan</h4>
              <textarea
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="Rincian kerusakan piringan AC, pipa pecah, dsb agar alat yang dibawa teknisi sesuai..."
                rows={3}
                className="w-full bg-white border border-gray-250 p-4 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none shadow-sm text-sm text-gray-800"
              />
            </div>

            <button onClick={() => { if(!selectedTechnician) { setSelectedTechnician(technicians[0]); } setStep(2); }} className="w-full btn-primary py-4">
              Cari Mitra Teknisi
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft size={20}/></button>
              <h3 className="text-2xl font-black text-gray-900">Mitra Teknisi Terdekat</h3>
            </div>

            <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-2xl text-xs text-amber-800 leading-relaxed font-semibold">
              Menampilkan teknisi bersertifikasi yang siap dikirim dalam kurun waktu 1 jam dari lokasi Anda.
            </div>

            <div className="space-y-3">
              {technicians.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => { setSelectedTechnician(tech); setStep(3); }}
                  className={cn(
                    "w-full p-4 rounded-3xl border text-left flex items-center justify-between transition-all hover:scale-[1.005]",
                    selectedTechnician?.id === tech.id ? "border-primary bg-primary/5" : "border-gray-200 bg-white shadow-sm"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <img src={tech.logo} alt={tech.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-gray-900 text-base leading-tight">{tech.name}</h4>
                        <span className="text-[9px] uppercase font-black px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{tech.role}</span>
                      </div>
                      <p className="text-xs text-amber-500 font-bold mt-1">★ {tech.rating.toFixed(1)} • <span className="text-gray-400 font-medium">({tech.reviews} ulasan)</span> • <span className="text-gray-500 font-medium">{tech.distance}</span></p>
                      <p className="text-xs text-primary font-bold mt-0.5">{tech.spec}</p>
                    </div>
                  </div>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", selectedTechnician?.id === tech.id ? "border-primary bg-primary" : "border-gray-300")}>
                    {selectedTechnician?.id === tech.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <button onClick={() => setStep(3)} className="w-full btn-primary py-4">Isi Pembayaran</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(2)} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft size={20}/></button>
              <h3 className="text-2xl font-black text-gray-900">Metode Pembayaran</h3>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <button 
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={cn("w-full p-4 rounded-2xl border flex items-center justify-between transition-all", selectedPayment === pm.id ? "border-primary bg-primary/5" : "border-gray-200 bg-white")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
                      <pm.icon size={20} />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900 block text-sm">{pm.name}</span>
                      {pm.id === 'e-wallet' && (
                        <span className="text-xs text-gray-400 font-semibold block">Saldo saat ini: Rp {balance.toLocaleString('id-ID')}</span>
                      )}
                    </div>
                  </div>
                  <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", selectedPayment === pm.id ? "border-primary bg-primary" : "border-gray-300")}>
                    {selectedPayment === pm.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            {selectedPayment === 'e-wallet' && balance < 150000 && (
              <div className="p-3.5 bg-red-50 border border-red-200/50 rounded-xl text-xs text-red-700 font-bold">
                Saldo Anda tidak mencukupi untuk pembayaran instan via Dompet Elektronik. Silakan top-up saldo terlebih dahulu di menu Keuangan, atau gunakan metode Tunai.
              </div>
            )}

            <button 
              onClick={handleConfirmOrder} 
              disabled={selectedPayment === 'e-wallet' && balance < (parseInt(services.find(s => s.name === selectedService)?.price.replace(/[^0-9]/g, '')) || 100000)}
              className="w-full btn-primary py-4 mt-8 disabled:opacity-50"
            >
              Konfirmasi & Buat Pesanan
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={40} />
            </div>
            
            <h3 className="text-3xl font-black text-gray-900">Pesanan Diproses!</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">Pemberitahuan telah terkirim ke WhatsApp mitra teknisi terdekat. Terima kasih telah memercayai <span className="font-bold text-primary">HomeCare</span>.</p>
            
            <div className="bg-gray-100 p-6 rounded-3xl text-left space-y-3 max-w-md mx-auto text-sm">
              <p className="text-[10px] text-gray-400 font-black tracking-widest uppercase border-b border-gray-200/80 pb-2">Rincian Nota Pemesanan</p>
              <div className="flex justify-between font-bold text-gray-800"><span>Layanan</span> <span>{selectedService}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tanggal</span> <span>{format(selectedDate, 'd MMM yyyy')}</span></div>
              <div className="flex justify-between text-gray-600"><span>Waktu Panggilan</span> <span>{selectedTime}</span></div>
              {selectedTechnician && (
                <div className="flex justify-between text-gray-600"><span>Mitra Petugas</span> <span className="font-bold text-gray-800">{selectedTechnician.name}</span></div>
              )}
              {issueDescription && (
                <div className="border-t border-gray-200 pt-2 text-xs text-gray-400 flex flex-col gap-1">
                  <span>URAIAN KELUHAN:</span>
                  <span className="font-medium text-gray-600 italic">"{issueDescription}"</span>
                </div>
              )}
            </div>

            <button onClick={onComplete} className="w-full btn-primary py-4 max-w-md mx-auto">
              Lihat Riwayat & Status
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// 2b. RIWAYAT / HISTORY TABLE LIST
function HistoryTab({ orders }: { orders: any[] }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Riwayat Pekerjaan</h2>
        <button className="flex items-center gap-2 text-xs font-bold text-gray-600 bg-white border border-gray-250 px-4 py-2 rounded-xl">
          <Filter size={14} /> Filter Pekerjaan
        </button>
      </div>
      
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 text-center text-gray-400 font-semibold shadow-sm">
            Belum ada riwayat pesanan yang dibuat.
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-primary shrink-0">
                  <SmartIcon service={order.service} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 leading-snug">{order.service}</h4>
                  <p className="text-xs text-gray-500 font-medium mt-1">ID: <span className="font-bold text-gray-700">{order.id}</span> • {order.date} pukul {order.time}</p>
                  <p className="text-xs text-gray-700 font-semibold mt-1 flex items-center gap-1"><User size={12}/> Mitra: {order.technician}</p>
                  {order.description && (
                     <p className="text-[11px] text-gray-400 mt-1 italic shrink max-w-md">" {order.description} "</p>
                  )}
                  <div className="flex items-center gap-1.5 mt-2.5">
                     <span className="text-[9px] font-black text-gray-400 uppercase tracking-wide bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                       {order.paymentMethod}
                     </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end gap-8 shrink-0">
                <div className="text-right">
                  <p className="font-extrabold text-gray-900 text-lg leading-none">{order.price}</p>
                  <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mt-1">Estimasi Biaya</p>
                </div>
                <div className="flex items-center gap-2">
                   <StatusBadge status={order.status} />
                   <ChevronRight size={18} className="text-gray-300" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

// 3. FINANCE / KEUANGAN TAB CONTROLLER
function FinanceTab({
  balance,
  setBalance,
  transactions,
  setTransactions,
}: {
  balance: number,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  transactions: any[],
  setTransactions: React.Dispatch<React.SetStateAction<any[]>>,
}) {
  const [topupAmount, setTopupAmount] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [topupMethod, setTopupMethod] = useState<string>('GoPay');
  const [showTopupResult, setShowTopupResult] = useState<boolean>(false);
  const [paylaterActivated, setPaylaterActivated] = useState<boolean>(false);

  const presets = [50000, 100000, 200000, 500000];

  const handleTopUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = selectedPreset || parseInt(topupAmount) || 0;
    if (amountNum <= 0) return;

    setBalance(prev => prev + amountNum);
    setTransactions(prev => [
      {
        id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
        type: 'credit',
        title: `Top-Up Saldo via ${topupMethod}`,
        amount: `Rp ${amountNum.toLocaleString('id-ID')}`,
        date: 'Hari ini',
        status: 'Selesai'
      },
      ...prev
    ]);

    setTopupAmount('');
    setSelectedPreset(null);
    setShowTopupResult(true);
    setTimeout(() => setShowTopupResult(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Keuangan & Saldo</h2>
          <p className="text-gray-500 font-medium text-sm">Kelola pengisian saldo elektronik, pembayaran non-tunai, dan tagihan PayLater.</p>
        </div>
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
          <DollarSign size={24} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Balance view card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 p-8 rounded-3xl text-white shadow-xl shadow-indigo-900/10 relative overflow-hidden flex flex-col justify-between h-56">
            <div>
              <p className="text-xs uppercase tracking-widest font-black text-indigo-200">SALDO DOMPET ELEKTRONIK</p>
              <p className="text-4xl font-black mt-3">Rp {balance.toLocaleString('id-ID')}</p>
            </div>
            <div className="flex gap-4 pt-6 border-t border-indigo-600/50">
              <div className="text-sm">
                <span className="text-indigo-200 block text-xs">Poin Member</span>
                <span className="font-bold">1.250 Poin</span>
              </div>
              <div className="h-8 w-[1px] bg-indigo-600/50" />
              <div className="text-sm">
                <span className="text-indigo-200 block text-xs">Tier Loyalitas</span>
                <span className="font-bold">Premium Gold</span>
              </div>
            </div>
          </div>

          {/* PayLater section */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-105 text-amber-600 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">HomeCare PayLater</h4>
                  <p className="text-xs text-gray-400 font-semibold">Bayar 30 Hari Kemudian, Bunga 0%</p>
                </div>
              </div>
              <button 
                onClick={() => setPaylaterActivated(!paylaterActivated)}
                className={cn(
                  "w-12 h-6 rounded-full p-1 transition-colors outline-none",
                  paylaterActivated ? "bg-green-500" : "bg-gray-200"
                )}
              >
                <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", paylaterActivated ? "translate-x-6" : "")} />
              </button>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-500">Limit Tersedia</span>
                <span className="font-bold text-gray-900">{paylaterActivated ? 'Rp 1.500.000 / Rp 1.500.000' : 'Rp 0'}</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className={cn("h-full transition-all duration-500", paylaterActivated ? "w-full bg-green-500" : "w-0")} />
              </div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">Bebas cicilan hingga 3 bulan tanpa biaya administrasi tambahan.</p>
          </div>
        </div>

        {/* Top-up form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold">Top-Up Saldo</h3>
          <form onSubmit={handleTopUpSubmit} className="space-y-4">
            <label className="text-[10px] text-gray-400 font-black tracking-wider block uppercase">Pilih Nominal Cepat</label>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => { setSelectedPreset(p); setTopupAmount(''); }}
                  className={cn(
                    "py-3 rounded-2xl border text-xs font-bold transition-all",
                    selectedPreset === p 
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/20" 
                      : "border-gray-200 bg-white hover:border-primary-light text-gray-700"
                  )}
                >
                  Rp {p.toLocaleString('id-ID')}
                </button>
              ))}
            </div>

            <div className="relative pt-2">
              <span className="absolute left-4 top-1/2 translate-y-1 text-gray-400 font-bold text-sm">Rp</span>
              <input
                type="text"
                placeholder="Jumlah Kustom..."
                value={topupAmount}
                onChange={(e) => {
                  setTopupAmount(e.target.value.replace(/[^0-9]/g, ''));
                  setSelectedPreset(null);
                }}
                className="w-full bg-gray-50 border border-gray-100 pt-7 pb-3 pr-4 pl-12 rounded-2xl font-black text-gray-900 outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-inner"
              />
              <span className="absolute left-4 top-3 text-[9px] text-gray-400 font-black uppercase">JUMLAH KUSTOM</span>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs text-gray-500 font-bold block uppercase tracking-wider">Metode Pembayaran</label>
              <select
                value={topupMethod}
                onChange={(e) => setTopupMethod(e.target.value)}
                className="w-full bg-gray-50 border border-gray-150 p-4 rounded-2xl font-bold focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all text-sm text-gray-800"
              >
                <option value="GoPay">e-wallet (GoPay)</option>
                <option value="OVO">e-wallet (OVO)</option>
                <option value="ShopeePay">e-wallet (ShopeePay)</option>
                <option value="BCA Virtual Account">Transfer VA Bank BCA</option>
                <option value="Mandiri Virtual Account">Transfer VA Bank Mandiri</option>
              </select>
            </div>

            {showTopupResult && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-50 text-green-700 rounded-2xl flex items-center gap-2 font-bold text-xs border border-green-200/50">
                <CheckCircle2 size={16} /> Saldo berhasil dikreditkan ke dompet Anda!
              </motion.div>
            )}

            <button type="submit" className="w-full btn-primary py-4">
              Konfirmasi Pengisian Saldo
            </button>
          </form>
        </div>
      </div>

      {/* Transactions list */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Riwayat Transaksi</h3>
        <div className="bg-white rounded-3xl border border-gray-100 divide-y divide-gray-50 shadow-sm overflow-hidden">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", tx.type === 'credit' ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600")}>
                  <DollarSign size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-snug">{tx.title}</h4>
                  <p className="text-xs text-gray-400 font-medium">{tx.date} • ID Transaksi: {tx.id}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className={cn("font-black text-lg", tx.type === 'credit' ? "text-green-600" : "text-gray-900")}>
                  {tx.type === 'credit' ? '+' : '-'}{tx.amount}
                </p>
                <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-800 mt-1">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// 4. ACCOUNT / SETTINGS COREFIT TAB
function AccountTab({
  profile,
  setProfile,
}: {
  profile: any,
  setProfile: React.Dispatch<React.SetStateAction<any>>,
}) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);
  const [showStatus, setShowStatus] = useState(false);

  const [waNotify, setWaNotify] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(true);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      name,
      email,
      phone,
      address,
    });
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Akun Saya</h2>
          <p className="text-gray-500 font-medium text-sm">Ubah detail akun pribadi, alamat penugasan teknisi, dan opsi keamanan.</p>
        </div>
        <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-2xl flex items-center justify-center">
          <User size={24} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left tier card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 h-full justify-between">
          <div className="space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 border-4 border-primary/25 rounded-full overflow-hidden flex items-center justify-center mx-auto">
                <User size={44} className="text-primary" />
              </div>
              <span className="absolute bottom-0 right-1/2 translate-x-12 bg-primary text-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-primary-light transition-colors">
                <Plus size={12} />
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{profile.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
              <span className="mt-2.5 inline-block text-[10px] uppercase tracking-wider font-black px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                ★ {profile.memberTier}
              </span>
            </div>
          </div>
          <div className="w-full pt-4 border-t border-gray-100 text-left">
            <span className="text-[10px] text-gray-400 font-black block tracking-wider uppercase">Privilese Keanggotaan</span>
            <p className="text-xs text-gray-700 font-semibold mt-1.5">• Bebas Biaya Pengecekan Lapangan</p>
            <p className="text-xs text-gray-700 font-semibold mt-1">• Prioritas Penugasan Darurat 24/7</p>
          </div>
        </div>

        {/* Right input forms */}
        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-xl font-bold">Ubah Profil Pengguna</h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-black block uppercase tracking-wider">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-gray-800"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-black block uppercase tracking-wider">Email Pengguna</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-gray-800"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 font-black block uppercase tracking-wider">Nomor Handphone Resmi</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-gray-800"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-400 font-black block uppercase tracking-wider">Alamat Lengkap Rumah</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 p-3.5 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-gray-800 resize-none"
                required
              />
            </div>

            {showStatus && (
              <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 font-bold text-xs border border-green-200/50">
                <CheckCircle2 size={16} /> Perubahan biodata profil Anda berhasil disimpan secara aman!
              </motion.div>
            )}

            <button type="submit" className="w-full btn-primary py-4 rounded-xl">
              Perbarui Informasi Akun
            </button>
          </form>
        </div>
      </div>

      {/* Preferences toggles */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-xl font-bold">Opsi Keamanan & Pemberitahuan</h3>
        <div className="space-y-4 divide-y divide-gray-150">
          <div className="flex items-center justify-between py-4 first:pt-0">
            <div>
              <h4 className="font-bold text-gray-905 text-sm">Kirim Laporan via WhatsApp</h4>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Dapatkan laporan pekerjaan teknisi berupa foto sebelum-dan-sesudah perawatan.</p>
            </div>
            <button 
              onClick={() => setWaNotify(!waNotify)}
              className={cn("w-12 h-6 rounded-full p-1 transition-colors shrink-0", waNotify ? "bg-primary" : "bg-gray-205 bg-gray-200")}
            >
              <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", waNotify ? "translate-x-6" : "")} />
            </button>
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <h4 className="font-bold text-gray-905 text-sm">Otentikasi Sidik Jari (Biometrik)</h4>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Amankan persetujuan saldo e-wallet menggunakan sensor bawaan perangkat.</p>
            </div>
            <button 
              onClick={() => setBiometricLogin(!biometricLogin)}
              className={cn("w-12 h-6 rounded-full p-1 transition-colors shrink-0", biometricLogin ? "bg-primary" : "bg-gray-205 bg-gray-200")}
            >
              <div className={cn("w-4 h-4 bg-white rounded-full transition-transform", biometricLogin ? "translate-x-6" : "")} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// SHARED UTILITIES COMPONENTS
function Calendar({ value, onChange }: { value: Date, onChange: (d: Date) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-bold text-gray-900">{format(currentMonth, 'MMMM yyyy')}</h4>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={18} className="rotate-180" /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['M', 'S', 'S', 'R', 'K', 'J', 'S'].map(d => <div key={d} className="text-xs font-black text-gray-400">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <button
            key={i}
            onClick={() => onChange(day)}
            className={cn(
              "aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all relative",
              !isSameMonth(day, currentMonth) ? "text-gray-200 pointer-events-none" : "text-gray-700 hover:bg-gray-50",
              isSameDay(day, value) ? "bg-primary text-white shadow-lg shadow-primary/30" : "",
              isSameDay(day, new Date()) ? "after:content-[''] after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full" : ""
            )}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Dalam Proses': 'bg-blue-50 text-blue-600 border border-blue-200/50',
    'Selesai': 'bg-green-50 text-green-600 border border-green-200/50',
    'Menunggu Pembayaran': 'bg-orange-50 text-orange-600 border border-orange-200/50',
    'Dibatalkan': 'bg-red-50 text-red-600 border border-red-200/50',
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase whitespace-nowrap", styles[status] || "bg-gray-100")}>
      {status}
    </span>
  );
}

function SmartIcon({ service }: { service: string }) {
  const norm = service.toLowerCase();
  if (norm.includes('ac')) return <Wind size={20} />;
  if (norm.includes('listrik')) return <Zap size={20} />;
  if (norm.includes('ledeng') || norm.includes('plumbing')) return <Droplets size={20} />;
  if (norm.includes('kebersihan') || norm.includes('cleaning')) return <Sparkles size={20} />;
  if (norm.includes('renovasi') || norm.includes('renovation')) return <Hammer size={20} />;
  if (norm.includes('cctv')) return <Video size={20} />;
  if (norm.includes('mesin cuci') || norm.includes('washing')) return <WashingMachine size={20} />;
  if (norm.includes('cat') || norm.includes('paint')) return <Paintbrush size={20} />;
  if (norm.includes('lainnya') || norm.includes('others')) return <Wrench size={20} />;
  return <Star size={20} />;
}

function PaymentIcon({ method, size = 16 }: { method: string, size?: number }) {
  const lower = method.toLowerCase();
  if (lower.includes('wallet') || lower.includes('dompet')) return <Wallet size={size} />;
  if (lower.includes('account') || lower.includes('transfer') || lower.includes('va')) return <Building size={size} />;
  if (lower.includes('card') || lower.includes('debit')) return <CreditCard size={size} />;
  if (lower.includes('qr')) return <QrCode size={size} />;
  return <DollarSign size={size} />;
}
