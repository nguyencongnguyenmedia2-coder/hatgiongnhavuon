'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, AlertTriangle, Eye, EyeOff, KeyRound } from 'lucide-react';
import { loginAdmin, isSessionValid, getStoredAdminPassword } from '@/lib/authStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@hatgiongnhavuon.vn');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isSessionValid()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, password);
      setLoading(false);

      if (result.success) {
        router.push('/admin/dashboard');
      } else {
        setErrorMsg(result.errorMsg || 'Mật khẩu hoặc Email không chính xác.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl space-y-6 relative z-10 border border-emerald-100">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center text-3xl font-bold mx-auto border-2 border-emerald-500 shadow-md">
            🌿
          </div>
          <h1 className="text-2xl font-black text-emerald-950">Đăng Nhập Quản Trị Admin</h1>
          <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
            BẢO MẬT HỆ THỐNG HẠT GIỐNG NHÀ VƯỜN
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-emerald-950 mb-1">Email Quản Trị *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="admin@hatgiongnhavuon.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-emerald-950 mb-1">Mật Khẩu Admin *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Nhập mật khẩu admin..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>{loading ? 'ĐANG XÁC THỰC BẢO MẬT...' : 'ĐĂNG NHẬP ADMIN'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
