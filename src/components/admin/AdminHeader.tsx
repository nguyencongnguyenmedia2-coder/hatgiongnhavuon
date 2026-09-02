'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, Search, UserCheck, LogOut, KeyRound, X, Save, CheckCircle2 } from 'lucide-react';
import { logoutAdmin, changeAdminPassword } from '@/lib/authStore';

export default function AdminHeader() {
  const router = useRouter();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/dang-nhap');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg({ success: false, text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ success: false, text: 'Xác nhận mật khẩu mới không trùng khớp!' });
      return;
    }

    changeAdminPassword(newPassword);
    setPasswordMsg({ success: true, text: '🟢 Đã đổi mật khẩu Admin thành công!' });
    setTimeout(() => {
      setIsPasswordModalOpen(false);
      setPasswordMsg(null);
      setNewPassword('');
      setConfirmPassword('');
    }, 1800);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3 w-96">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm nhanh đơn hàng, sản phẩm, khách hàng..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-950 text-xs font-black border border-emerald-200/80">
            <UserCheck className="w-4 h-4 text-emerald-700" />
            <span>Super Admin</span>
          </div>

          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Đổi mật khẩu bảo mật Admin"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-700" />
            <span>Đổi Mật Khẩu</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Đăng xuất khỏi hệ thống admin"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </header>

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 border border-emerald-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-base font-black text-emerald-950 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-600" />
                <span>Đổi Mật Khẩu Quản Trị Admin</span>
              </h2>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {passwordMsg && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-extrabold ${
                  passwordMsg.success
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-rose-100 text-rose-900 border border-rose-200'
                }`}
              >
                {passwordMsg.text}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Xác nhận mật khẩu mới *</label>
                <input
                  type="password"
                  required
                  placeholder="Gõ lại mật khẩu mới..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>LƯU MẬT KHẨU MỚI</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
