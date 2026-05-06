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
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays } from 'date-fns';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'booking' | 'history'>('overview');
  const [bookingStep, setBookingStep] = useState(0);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-2 shrink-0">
            <button 
              onClick={() => { setActiveTab('overview'); setBookingStep(0); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all", activeTab === 'overview' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <Smartphone size={20} /> Ikhtisar
            </button>
            <button 
              onClick={() => { setActiveTab('booking'); setBookingStep(0); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all", activeTab === 'booking' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <Plus size={20} /> Pesanan Baru
            </button>
            <button 
              onClick={() => { setActiveTab('history'); setBookingStep(0); }}
              className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all", activeTab === 'history' ? "bg-primary text-white shadow-lg" : "hover:bg-gray-100 text-gray-600")}
            >
              <Clock size={20} /> Riwayat Pesanan
            </button>
          </aside>

          {/* Main Content */}
          <div className="grow">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && <OverviewTab onBook={() => setActiveTab('booking')} key="overview" />}
              {activeTab === 'booking' && <BookingTab step={bookingStep} setStep={setBookingStep} key="booking" onComplete={() => setActiveTab('history')} />}
              {activeTab === 'history' && <HistoryTab key="history" />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ onBook }: { onBook: () => void }) {
  const activeOrders = [
    { id: 'HC-9021', service: 'Servis AC', status: 'Dalam Proses', technician: 'Rendi K.', time: 'Hari Ini, 14:00' },
    { id: 'HC-9022', service: 'Perbaikan Listrik', status: 'Menunggu Pembayaran', technician: '-', time: 'Pending' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-gray-900">Selamat Datang Resfin!</h2>
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Saldo Dompet', value: 'Rp 450.000', icon: Wallet, color: 'bg-indigo-500' },
          { label: 'Pesanan Aktif', value: '2', icon: Clock, color: 'bg-primary' },
          { label: 'Selesai', value: '14', icon: CheckCircle2, color: 'bg-green-500' },
          { label: 'Poin', value: '1.250', icon: Star, color: 'bg-yellow-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className={cn("w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-white", stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Pesanan Aktif</h3>
            <button className="text-sm text-primary font-bold hover:underline">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                       <SmartIcon service={order.service} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{order.service}</p>
                      <p className="text-xs text-gray-500 font-medium">ID Pesanan: {order.id}</p>
                    </div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} />
                    <span>{order.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>Residence Blok A</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold">Aksi Cepat</h3>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <button onClick={onBook} className="w-full bg-primary text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-between hover:bg-primary-light transition-all">
              Pesan Layanan Baru <Plus size={20} />
            </button>
            <button className="w-full bg-indigo-50 text-indigo-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-between hover:bg-indigo-100 transition-all">
              Isi Ulang Saldo <Wallet size={20} />
            </button>
            <button className="w-full bg-orange-50 text-orange-700 py-4 px-6 rounded-2xl font-bold flex items-center justify-between hover:bg-orange-100 transition-all">
              Layanan Pelanggan <Bell size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BookingTab({ step, setStep, onComplete }: { step: number, setStep: (s: number) => void, onComplete: () => void }) {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPayment, setSelectedPayment] = useState('');

  const services = [
    { id: '1', name: 'Servis AC', price: 'Rp 150.000', icon: Smartphone },
    { id: '2', name: 'Ledeng', price: 'Rp 100.000', icon: MapPin },
    { id: '3', name: 'Listrik', price: 'Rp 120.000', icon: Bell },
    { id: '4', name: 'Kebersihan Rumah', price: 'Rp 80.000/jam', icon: CheckCircle2 },
  ];

  const paymentMethods = [
    { id: 'e-wallet', name: 'E-Wallet', icon: Wallet, options: ['GoPay', 'OVO', 'ShopeePay'] },
    { id: 'va', name: 'Virtual Account', icon: Building, options: ['BCA', 'Mandiri', 'BNI'] },
    { id: 'card', name: 'Debit/Kartu Kredit', icon: CreditCard },
    { id: 'qr', name: 'QR Code', icon: QrCode },
    { id: 'paylater', name: 'PayLater', icon: Clock },
    { id: 'cash', name: 'Tunai', icon: DollarSign },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto space-y-8">
      {/* Progress */}
      <div className="flex items-center gap-4 mb-8">
        {[0, 1, 2, 3].map((s) => (
          <div key={s} className="grow h-2 rounded-full overflow-hidden bg-gray-200">
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
            <h3 className="text-2xl font-black">Layanan apa yang Anda butuhkan?</h3>
            <div className="grid grid-cols-2 gap-4">
              {services.map((s) => (
                <button 
                  key={s.id}
                  onClick={() => { setSelectedService(s.name); setStep(1); }}
                  className={cn("p-6 rounded-3xl border text-left transition-all", selectedService === s.name ? "border-primary bg-primary/5 ring-2 ring-primary" : "border-gray-200 bg-white hover:border-primary-light")}
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-primary mb-4">
                    <s.icon size={20} />
                  </div>
                  <p className="font-bold">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.price}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(0)} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft size={20}/></button>
              <h3 className="text-2xl font-black">Kapan kami harus datang?</h3>
            </div>
            <Calendar value={selectedDate} onChange={setSelectedDate} />
            <div className="pt-4 space-y-4">
               <h4 className="font-bold text-gray-900">Pilih Slot Waktu</h4>
               <div className="grid grid-cols-3 gap-2">
                 {['09:00', '11:00', '13:00', '15:00', '17:00'].map(t => (
                   <button key={t} className="py-3 px-4 rounded-xl border border-gray-200 text-sm font-bold hover:border-primary hover:text-primary transition-all">
                     {t}
                   </button>
                 ))}
               </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full btn-primary py-4 mt-8">Lanjut ke Pembayaran</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-gray-100"><ArrowLeft size={20}/></button>
              <h3 className="text-2xl font-black">Metode Pembayaran</h3>
            </div>
            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <button 
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={cn("w-full p-4 rounded-2xl border flex items-center justify-between transition-all", selectedPayment === pm.id ? "border-primary bg-primary/5 shadow-sm" : "border-gray-200 bg-white")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-700">
                      <pm.icon size={20} />
                    </div>
                    <span className="font-bold text-gray-900">{pm.name}</span>
                  </div>
                  <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center", selectedPayment === pm.id ? "border-primary bg-primary" : "border-gray-300")}>
                    {selectedPayment === pm.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(3)} className="w-full btn-primary py-4 mt-8">Konfirmasi Pesanan</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-black">Pemesanan Berhasil!</h3>
            <p className="text-gray-600">Permintaan Anda untuk <span className="font-bold text-primary">{selectedService}</span> telah diterima. Teknisi akan segera ditugaskan.</p>
            <div className="bg-gray-100 p-6 rounded-3xl text-left space-y-2">
              <p className="text-xs text-gray-500 uppercase font-black tracking-widest leading-none">Detail Pesanan</p>
              <div className="flex justify-between font-bold"><span>Layanan</span> <span>{selectedService}</span></div>
              <div className="flex justify-between font-bold"><span>Tanggal</span> <span>{format(selectedDate, 'PPP')}</span></div>
              <div className="flex justify-between font-bold"><span>Pembayaran</span> <span>{selectedPayment.toUpperCase()}</span></div>
            </div>
            <button onClick={onComplete} className="w-full btn-primary py-4">Lihat Status Pesanan</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HistoryTab() {
  const orders = [
    { id: 'HC-9021', service: 'Servis AC', status: 'Dalam Proses', price: 'Rp 150.000', date: '6 Mei 2026', paymentMethod: 'Virtual Account' },
    { id: 'HC-9020', service: 'Kebersihan Rumah', status: 'Selesai', price: 'Rp 240.000', date: '1 Mei 2026', paymentMethod: 'E-Wallet' },
    { id: 'HC-8998', service: 'Layanan Ledeng', status: 'Selesai', price: 'Rp 100.000', date: '12 Apr 2026', paymentMethod: 'QR Code' },
    { id: 'HC-8945', service: 'Deep Cleaning', status: 'Dibatalkan', price: 'Rp 400.000', date: '20 Mar 2026', paymentMethod: 'Cash' },
    { id: 'HC-8912', service: 'Listrik', status: 'Selesai', price: 'Rp 120.000', date: '2 Mar 2026', paymentMethod: 'PayLater' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Riwayat Pesanan</h2>
        <button className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl">
          <Filter size={16} /> Filter
        </button>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-primary">
                <SmartIcon service={order.service} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{order.service}</h4>
                <p className="text-xs text-gray-500 font-medium">ID: {order.id} • {order.date}</p>
                <div className="flex items-center gap-1.5 mt-1">
                   <div className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                     <PaymentIcon method={order.paymentMethod} size={10} />
                   </div>
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{order.paymentMethod}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-8 grow lg:grow-0">
              <div className="text-right">
                <p className="font-black text-gray-900">{order.price}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black">Total Bayar</p>
              </div>
              <div className="flex items-center gap-4">
                 <StatusBadge status={order.status} />
                 <ChevronRight size={20} className="text-gray-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Helper Components
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
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={20} className="rotate-180" /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-xs font-black text-gray-400">{d}</div>)}
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
    'Dalam Proses': 'bg-blue-50 text-blue-600',
    'Selesai': 'bg-green-50 text-green-600',
    'Menunggu Pembayaran': 'bg-orange-50 text-orange-600',
    'Dibatalkan': 'bg-red-50 text-red-600',
  };
  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap", styles[status] || "bg-gray-100")}>
      {status}
    </span>
  );
}

function SmartIcon({ service }: { service: string }) {
  if (service.includes('AC')) return <Smartphone size={24} />;
  if (service.includes('Kebersihan')) return <CheckCircle2 size={24} />;
  if (service.includes('Ledeng')) return <MapPin size={24} />;
  return <Star size={24} />;
}

function PaymentIcon({ method, size = 20 }: { method: string, size?: number }) {
  if (method.includes('Wallet')) return <Wallet size={size} />;
  if (method.includes('Account')) return <Building size={size} />;
  if (method.includes('Card')) return <CreditCard size={size} />;
  if (method.includes('QR')) return <QrCode size={size} />;
  if (method.includes('PayLater')) return <Clock size={size} />;
  return <DollarSign size={size} />;
}
