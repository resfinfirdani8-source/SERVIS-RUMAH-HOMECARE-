import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Clock, Users, Zap, Wrench, Thermometer, Droplets, Sparkles, Building2, Briefcase, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <div className="pt-20">
      <Hero onStart={onStart} />
      <ServicesSection onSelect={onStart} />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <TestimonialsSection />
      <ClosingCTA onStart={onStart} />
    </div>
  );
}

function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Real Technician Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1599833719482-10343af30171?auto=format&fit=crop&q=80&w=2000" 
          alt="Teknisi Servis Profesional" 
          className="w-full h-full object-cover"
        />
        {/* Overlay yang lebih seimbang agar foto tetap terlihat jelas */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-full text-sm font-bold mb-6 text-white shadow-xl shadow-primary/40 ring-1 ring-white/20">
            <Zap size={16} />
            <span>Layanan Rumah Terpercaya di Indonesia</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Pesan Layanan Rumah <span className="text-primary-light">Mudah, Cepat,</span> dan Terpercaya
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-xl drop-shadow-md">
            Mulai dari servis AC hingga renovasi rumah, kelola pesanan, jadwal, dan pembayaran dalam satu aplikasi yang praktis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onStart} className="btn-primary flex items-center justify-center gap-2 text-lg py-4 shadow-2xl shadow-primary/30">
              Pesan Sekarang <ArrowRight size={20} />
            </button>
            <a href="#services" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-lg border border-white/30 px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg">
              Lihat Layanan
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white/50 bg-gray-600 overflow-hidden shadow-xl">
                  <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-yellow-400 drop-shadow-md">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-sm text-white font-medium drop-shadow-sm">Dipercaya oleh 10.000+ Pemilik Rumah</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Floating cards over the background */}
          <div className="flex flex-col gap-6 items-end">
            <motion.div 
              animate={{ x: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="glass p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 w-72 border-white/40"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Garansi Keamanan</p>
                <p className="text-lg font-black text-gray-900 leading-tight">Teknisi Ahli</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="glass p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 w-72 border-white/40"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Layanan Cepat</p>
                <p className="text-lg font-black text-gray-900 leading-tight">Respon 60 Menit</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  { name: 'Servis AC', icon: Thermometer, color: 'bg-blue-100 text-blue-600' },
  { name: 'Listrik', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Ledeng', icon: Droplets, color: 'bg-cyan-100 text-cyan-600' },
  { name: 'Kebersihan', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { name: 'Renovasi', icon: Building2, color: 'bg-orange-100 text-orange-600' },
  { name: 'Peralatan', icon: Wrench, color: 'bg-red-100 text-red-600' },
];

function ServicesSection({ onSelect }: { onSelect: () => void }) {
  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Layanan Populer Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tenaga ahli terpercaya siap membantu semua kebutuhan perawatan rumah Anda.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, idx) => (
            <motion.div
              whileHover={{ y: -5 }}
              onClick={onSelect}
              key={idx}
              className="group p-6 rounded-3xl border border-gray-100 bg-white hover:border-primary/20 hover:shadow-xl transition-all text-center cursor-pointer"
            >
              <div className={cn("w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform", service.color)}>
                <service.icon size={32} />
              </div>
              <h3 className="font-bold text-gray-900">{service.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { title: 'Manajemen Pesanan', desc: 'Pantau dan kelola semua pesanan layanan Anda di satu tempat.', icon: Briefcase },
    { title: 'Penjadwalan Otomatis', desc: 'Jadwalkan teknisi secara otomatis sesuai kenyamanan Anda.', icon: Clock },
    { title: 'Database Pelanggan', desc: 'Simpan dan kelola informasi pelanggan dengan aman.', icon: Users },
    { title: 'Riwayat Layanan', desc: 'Pantau semua perbaikan dan perawatan yang dilakukan di rumah Anda.', icon: Star },
    { title: 'Laporan Keuangan', desc: 'Visibilitas pengeluaran dan biaya layanan yang jelas.', icon: DollarSign },
    { title: 'Notifikasi Instan', desc: 'Tetap terinformasi dengan peringatan dan pengingat real-time.', icon: Zap },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex items-center gap-16">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h2 className="text-4xl font-bold mb-6 italic-small text-primary">Fitur Unggulan</h2>
            <p className="text-4xl lg:text-5xl font-bold mb-8 text-gray-900 leading-tight">Semua yang Anda butuhkan untuk mengelola rumah</p>
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary border border-gray-100">
                    <f.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="rounded-[40px] bg-gray-900 p-4 aspect-[9/16] max-w-[320px] mx-auto shadow-2xl relative overflow-hidden border-8 border-gray-800">
              <div className="bg-white w-full h-full rounded-[32px] overflow-hideen">
                <img src="https://images.unsplash.com/photo-1551651653-c5186a1fbba2?auto=format&fit=crop&q=80&w=400" alt="App UI" className="w-full h-full object-cover" />
              </div>
              {/* Feature Overlays */}
              <div className="absolute top-1/4 -right-12 glass p-4 rounded-2xl shadow-xl w-48">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white"><Clock size={16} /></div>
                  <span className="text-xs font-bold">Teknisi Tiba</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: 'Pilih Layanan', desc: 'Pilih dari berbagai macam layanan rumah kami.' },
    { title: 'Pilih Jadwal', desc: 'Tentukan tanggal dan waktu yang sesuai untuk Anda.' },
    { title: 'Bayar Aman', desc: 'Pilih metode pembayaran favorit Anda.' },
    { title: 'Pantau Status', desc: 'Lihat progres secara real-time hingga selesai.' },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-gray-600 text-lg">Langkah mudah untuk merawat rumah Anda.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              {i < steps.length - 1 && (
                 <div className="hidden md:block absolute top-12 left-1/2 w-full border-t-2 border-dashed border-gray-200 -z-0" />
              )}
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-black mx-auto mb-6 relative z-10 ring-8 ring-white">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    { name: 'Basic', price: 'Rp 50rb', period: '/bulan', features: ['5 Teknisi', 'Laporan Standar', 'Dukungan Email'] },
    { name: 'Pro', price: 'Rp 100rb', period: '/bulan', popular: true, features: ['20 Teknisi', 'Analitik Lanjutan', 'Alat Manajemen', 'Dukungan Prioritas'] },
    { name: 'Business', price: 'Rp 200rb', period: '/bulan', features: ['Teknisi Tanpa Batas', 'White-label Penuh', 'Akses API', 'Manager Akun 24/7'] },
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold text-lg mb-2">Solusi B2B</h2>
          <h3 className="text-4xl font-bold mb-4">Harga untuk Penyedia Layanan</h3>
          <p className="text-gray-600 text-lg">Tingkatkan bisnis Anda dengan alat manajemen profesional kami.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={cn("p-8 rounded-3xl transition-all relative overflow-hidden", p.popular ? "bg-primary text-white shadow-2xl scale-105 z-10" : "bg-white text-gray-900 border border-gray-100")}>
              {p.popular && <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Paling Populer</div>}
              <h4 className="text-xl font-bold mb-4">{p.name}</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">{p.price}</span>
                <span className={cn("text-sm", p.popular ? "text-white/60" : "text-gray-500")}>{p.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <Shield size={18} className={p.popular ? "text-white/40" : "text-primary/20"} />
                    <span className="font-medium text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={cn("w-full py-4 rounded-xl font-bold transition-all", p.popular ? "bg-white text-primary hover:bg-gray-100" : "bg-primary text-white hover:bg-primary-light")}>
                Mulai Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const reviews = [
    { name: 'Sari J.', role: 'Pemilik Rumah', text: 'Memesan tukang listrik sangat mudah. Teknisi datang tepat waktu dan memperbaiki stop kontak saya dalam 15 menit. Sangat membantu!', avatar: 'https://i.pravatar.cc/150?u=1' },
    { name: 'Budi Santoso', role: 'Teknisi AC', text: 'Sebagai penyedia, HomeCare membantu saya mengorganisir tim dengan lebih baik. Pendapatan saya tumbuh 40% dalam 3 bulan.', avatar: 'https://i.pravatar.cc/150?u=2' },
    { name: 'Linda W.', role: 'Pemilik Bisnis', text: 'Saya suka fitur pelacakan real-time. Saya bisa melihat kapan kru pembersih mulai dan selesai bekerja.', avatar: 'https://i.pravatar.cc/150?u=3' },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Apa Kata Pengguna Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-gray-100 relative">
              <div className="absolute -top-4 right-8">
                <div className="flex text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <p className="text-gray-600 mb-6 italic">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full ring-2 ring-primary/20" />
                <div>
                  <h4 className="font-bold">{r.name}</h4>
                  <p className="text-xs text-gray-500">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCTA({ onStart }: { onStart: () => void }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto bg-primary rounded-[40px] p-12 lg:p-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2),transparent_70%)]" />
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-black mb-8 px-4">Butuh layanan rumah sekarang? <br />Pesan dalam hitungan menit!</h2>
          <button onClick={onStart} className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
            Pesan Layanan Sekarang
          </button>
        </motion.div>
      </div>
    </section>
  );
}
