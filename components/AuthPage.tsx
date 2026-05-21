import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Phone, MapPin, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthPageProps {
  onAuthSuccess: () => void;
}

export default function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate and call an API
    onAuthSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1599833719482-10343af30171?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              {mode === 'signin' ? 'Masuk ke HomeCare' : 'Daftar HomeCare'}
            </h1>
            <p className="text-gray-500 font-medium">
              {mode === 'signin' 
                ? 'Kelola layanan rumah Anda dengan mudah' 
                : 'Mulai pengalaman layanan rumah terbaik Anda'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="name"
                      placeholder="Nama Lengkap"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Nomor Telepon"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Kata Sandi"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 border border-gray-100 py-3.5 pl-12 pr-12 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Konfirmasi Kata Sandi"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                    <textarea
                      name="address"
                      placeholder="Alamat Lengkap"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-primary-light transition-all shadow-xl shadow-primary/20">
              {mode === 'signin' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-sm font-bold text-gray-500 hover:text-primary transition-colors underline underline-offset-4"
            >
              {mode === 'signin' ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Masuk di sini'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
