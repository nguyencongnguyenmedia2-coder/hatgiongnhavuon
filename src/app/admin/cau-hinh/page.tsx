'use client';

import React, { useState, useEffect } from 'react';
import { Save, Store, CreditCard, Truck, RefreshCw } from 'lucide-react';
import { getStoredSettings, saveSettingsToStore } from '@/lib/settingsStore';
import { SiteSettings } from '@/types';

export default function AdminGeneralSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(getStoredSettings());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettingsToStore(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-emerald-950">Cấu Hình Website &amp; Thương Hiệu</h1>
        <p className="text-xs text-gray-500">
          Chỉnh sửa hotline, địa chỉ, tài khoản ngân hàng và phí ship (Lưu trực tiếp vào hệ thống).
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-900 font-extrabold text-xs shadow-sm border border-emerald-200">
          ✅ Đã cập nhật thành công thông tin cấu hình website!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Brand Information */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
            <Store className="w-4 h-4 text-emerald-700" />
            <span>1. Thông tin thương hiệu &amp; Liên hệ</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Tên thương hiệu *</label>
              <input
                type="text"
                required
                value={settings.store_name}
                onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Slogan thương hiệu *</label>
              <input
                type="text"
                required
                value={settings.slogan}
                onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Hotline tư vấn *</label>
              <input
                type="text"
                required
                value={settings.hotline}
                onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-bold text-emerald-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Email hỗ trợ</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Facebook Fanpage URL</label>
              <input
                type="text"
                value={settings.facebook_page}
                onChange={(e) => setSettings({ ...settings, facebook_page: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-emerald-950 mb-1">Địa chỉ cửa hàng *</label>
            <input
              type="text"
              required
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Shipping fees */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>2. Cấu hình vận chuyển &amp; Freeship</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Phí vận chuyển mặc định (VNĐ) *</label>
              <input
                type="number"
                required
                value={settings.shipping_fee}
                onChange={(e) => setSettings({ ...settings, shipping_fee: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Hạn mức Miễn Phí Ship (VNĐ) *</label>
              <input
                type="number"
                required
                value={settings.free_shipping_threshold}
                onChange={(e) => setSettings({ ...settings, free_shipping_threshold: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
              />
            </div>
          </div>
        </div>

        {/* Bank Config */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <span>3. Tài khoản Ngân hàng nhận thanh toán (MB Bank VietQR)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Tên Ngân hàng</label>
              <input
                type="text"
                value={settings.bank_name}
                onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Số Tài Khoản</label>
              <input
                type="text"
                value={settings.bank_account_no}
                onChange={(e) => setSettings({ ...settings, bank_account_no: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Tên Chủ Tài Khoản</label>
              <input
                type="text"
                value={settings.bank_account_holder}
                onChange={(e) => setSettings({ ...settings, bank_account_holder: e.target.value.toUpperCase() })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 uppercase font-bold focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-7 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>LƯU TẤT CẢ CẤU HÌNH WEBSITE</span>
        </button>
      </form>
    </div>
  );
}
