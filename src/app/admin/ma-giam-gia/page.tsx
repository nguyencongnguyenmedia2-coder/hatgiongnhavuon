'use client';

import React, { useState, useEffect } from 'react';
import { Ticket, Plus, Edit, Trash2, X, Save, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Coupon } from '@/types';
import { getStoredCoupons, saveCouponToStore, deleteCouponFromStore } from '@/lib/couponStore';

export default function AdminCouponPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // Form State
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed_amount'>('percentage');
  const [discountValue, setDiscountValue] = useState('10');
  const [minOrderAmount, setMinOrderAmount] = useState('100000');
  const [usageLimit, setUsageLimit] = useState('500');
  const [isActive, setIsActive] = useState(true);

  const loadCoupons = () => {
    setCoupons(getStoredCoupons());
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const openAddModal = () => {
    setEditingCoupon(null);
    setCode('');
    setDiscountType('percentage');
    setDiscountValue('10');
    setMinOrderAmount('100000');
    setUsageLimit('500');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setDiscountType(coupon.discount_type);
    setDiscountValue(coupon.discount_value.toString());
    setMinOrderAmount((coupon.min_order_amount || 0).toString());
    setUsageLimit((coupon.usage_limit || 500).toString());
    setIsActive(coupon.is_active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const couponData: Coupon = {
      id: editingCoupon ? editingCoupon.id : `coup-${Date.now()}`,
      code: code.trim().toUpperCase(),
      discount_type: discountType,
      discount_value: Number(discountValue) || 0,
      min_order_amount: Number(minOrderAmount) || 0,
      usage_limit: Number(usageLimit) || 500,
      times_used: editingCoupon ? editingCoupon.times_used || 0 : 0,
      is_active: isActive,
    };

    saveCouponToStore(couponData);
    loadCoupons();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, code: string) => {
    if (confirm(`Bạn có chắc muốn xóa mã giảm giá "${code}" không?`)) {
      deleteCouponFromStore(id);
      loadCoupons();
    }
  };

  const toggleActive = (coupon: Coupon) => {
    const updated = { ...coupon, is_active: !coupon.is_active };
    saveCouponToStore(updated);
    loadCoupons();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Mã Giảm Giá ({coupons.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Tạo mới, quản lý mã voucher khuyến mãi áp dụng khi khách thanh toán.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadCoupons}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-emerald-950 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tải lại</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>+ Tạo Mã Giảm Giá Mới</span>
          </button>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Mã Coupon</th>
                <th className="py-3.5 px-4">Loại giảm</th>
                <th className="py-3.5 px-4">Giá trị giảm</th>
                <th className="py-3.5 px-4">Đơn tối thiểu</th>
                <th className="py-3.5 px-4">Đã sử dụng</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-mono font-black text-emerald-900 text-sm">{c.code}</td>
                  <td className="py-3.5 px-4 text-gray-600 font-semibold">
                    {c.discount_type === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định'}
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-950">
                    {c.discount_type === 'percentage' ? `${c.discount_value}%` : `${c.discount_value.toLocaleString('vi-VN')}đ`}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-bold">
                    {(c.min_order_amount || 0).toLocaleString('vi-VN')}đ
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-gray-800">
                    {c.times_used || 0} / {c.usage_limit || '∞'} lượt
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleActive(c)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        c.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.is_active ? '🟢 Khả dụng' : '🔴 Đã khóa'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(c)}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold transition-colors"
                      title="Chỉnh sửa mã"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.code)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                      title="Xóa mã"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-5 border border-emerald-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-emerald-700" />
                <span>{editingCoupon ? 'Chỉnh Sửa Mã Giảm Giá' : 'Tạo Mã Giảm Giá Mới'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Mã giảm giá (Code) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: KHUYENMAI20, FREESHIP..."
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono font-black uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Loại giảm giá</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed_amount">Số tiền cố định (VNĐ)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">
                    Mức giảm ({discountType === 'percentage' ? '%' : 'VNĐ'}) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={discountType === 'percentage' ? '10' : '20000'}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-extrabold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Đơn tối thiểu (VNĐ)</label>
                  <input
                    type="number"
                    placeholder="100000"
                    value={minOrderAmount}
                    onChange={(e) => setMinOrderAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Giới hạn số lần dùng</label>
                  <input
                    type="number"
                    placeholder="500"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Trạng thái mã</label>
                <select
                  value={isActive ? 'true' : 'false'}
                  onChange={(e) => setIsActive(e.target.value === 'true')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                >
                  <option value="true">Cho phép sử dụng (Active)</option>
                  <option value="false">Khóa mã (Disabled)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingCoupon ? 'LƯU MÃ' : 'TẠO MÃ NGAY'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
