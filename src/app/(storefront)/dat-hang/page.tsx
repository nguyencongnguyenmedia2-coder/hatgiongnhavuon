'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, Lock, ArrowRight, Tag } from 'lucide-react';
import { saveOrderToStore } from '@/lib/orderStore';
import { getStoredCoupons } from '@/lib/couponStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getSubtotal } = useCartStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('Quảng Ngãi');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'BANK_TRANSFER'>('COD');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; value: number } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = getSubtotal();
  const shippingFee = subtotal >= 300000 ? 0 : 30000;

  const discountAmount = appliedCoupon ? appliedCoupon.value : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const inputCode = couponCode.trim().toUpperCase();
    if (!inputCode) return;

    const availableCoupons = getStoredCoupons();
    const found = availableCoupons.find((c) => c.code.toUpperCase() === inputCode && c.is_active);

    if (found) {
      if (found.min_order_amount && subtotal < found.min_order_amount) {
        setErrorMsg(`Đơn hàng phải từ ${found.min_order_amount.toLocaleString('vi-VN')}đ để áp dụng mã ${found.code}`);
        return;
      }

      let value = 0;
      if (found.discount_type === 'percentage') {
        value = Math.round((subtotal * found.discount_value) / 100);
      } else {
        value = found.discount_value;
      }

      setAppliedCoupon({ code: found.code, value });
      setErrorMsg('');
    } else {
      setErrorMsg('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim() || !province.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng.');
      return;
    }

    if (items.length === 0) {
      setErrorMsg('Giỏ hàng của bạn đang trống.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        customer_name: fullName.trim(),
        customer_phone: phone.trim(),
        customer_email: email.trim() || undefined,
        province: province.trim(),
        district: district.trim() || undefined,
        ward: ward.trim() || undefined,
        address: address.trim(),
        note: note.trim() || undefined,
        payment_method: paymentMethod,
        coupon_code: appliedCoupon ? appliedCoupon.code : undefined,
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Đặt hàng thất bại. Vui lòng thử lại.');
      }

      // Save order to store for Admin viewing
      if (data.order) {
        saveOrderToStore(data.order);
      }

      // Clear cart & Redirect to Success Page
      clearCart();
      router.push(`/dat-hang/thanh-cong/${data.order.order_code}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo đơn hàng.';
      setErrorMsg(msg);
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-emerald-950">Chưa có sản phẩm nào để thanh toán</h1>
        <Link href="/san-pham" className="inline-block px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl">
          Quay lại chọn mua hạt giống
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="border-b border-emerald-100 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950 flex items-center gap-2">
          <Lock className="w-6 h-6 text-emerald-700" />
          <span>Đặt Hàng Nhanh (Không Cần Tài Khoản)</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Điền thông tin nhận hàng bên dưới. Shop sẽ giao hàng COD toàn quốc hoặc gửi chuyển khoản.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Details */}
        <div className="md:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card space-y-4">
            <h2 className="font-extrabold text-emerald-950 text-base border-b border-emerald-100 pb-3">
              1. Thông tin người nhận hàng
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0901234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Email (Nhận thông báo đơn - không bắt buộc)
              </label>
              <input
                type="email"
                placeholder="nguyenvana@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  Tỉnh / Thành phố *
                </label>
                <input
                  type="text"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  Quận / Huyện
                </label>
                <input
                  type="text"
                  placeholder="Thành phố Quảng Ngãi"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 mb-1">
                  Phường / Xã
                </label>
                <input
                  type="text"
                  placeholder="Phường Trần Phú"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Địa chỉ chi tiết (Số nhà, tên đường) *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 123 Đường Nguyễn Trãi"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950 mb-1">
                Ghi chú cho shop
              </label>
              <textarea
                rows={2}
                placeholder="Giao giờ hành chính, gọi trước khi giao..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-200 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card space-y-3">
            <h2 className="font-extrabold text-emerald-950 text-base border-b border-emerald-100 pb-3">
              2. Phương thức thanh toán
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'COD'
                    ? 'border-emerald-700 bg-emerald-50/60'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-emerald-700"
                />
                <div>
                  <div className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Thanh toán COD</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Thanh toán bằng tiền mặt khi shiper giao hàng đến tận tay.
                  </p>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'BANK_TRANSFER'
                    ? 'border-emerald-700 bg-emerald-50/60'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="BANK_TRANSFER"
                  checked={paymentMethod === 'BANK_TRANSFER'}
                  onChange={() => setPaymentMethod('BANK_TRANSFER')}
                  className="mt-1 accent-emerald-700"
                />
                <div>
                  <div className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-700" />
                    <span>Chuyển khoản Ngân hàng</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Quét mã QR ngân hàng tự động VietQR sau khi bấm hoàn tất.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Confirm Button */}
        <div className="md:col-span-5 bg-emerald-50/80 rounded-3xl p-6 border border-emerald-100 space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-emerald-200 pb-3">
            Đơn hàng của bạn ({items.length} mặt hàng)
          </h2>

          <div className="divide-y divide-emerald-100 max-h-60 overflow-y-auto pr-1">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-950 truncate max-w-[180px]">
                    {product.name}
                  </span>
                  <span className="text-gray-500 font-semibold">× {quantity}</span>
                </div>
                <span className="font-bold text-emerald-900">
                  {(product.price * quantity).toLocaleString('vi-VN')}đ
                </span>
              </div>
            ))}
          </div>

          {/* Coupon Code Input */}
          <div className="pt-2 border-t border-emerald-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá (VD: VUONHOA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-emerald-200 bg-white"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-3 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-900"
              >
                Áp dụng
              </button>
            </div>
            {appliedCoupon && (
              <p className="text-[11px] font-bold text-emerald-700 mt-1 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Đã áp dụng mã {appliedCoupon.code} (-{appliedCoupon.value.toLocaleString('vi-VN')}đ)
              </p>
            )}
          </div>

          {/* Calculation breakdown */}
          <div className="space-y-2 text-xs border-t border-emerald-200 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Tạm tính:</span>
              <span className="font-bold text-emerald-950">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Giảm giá mã coupon:</span>
                <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Phí vận chuyển:</span>
              <span className="font-bold text-emerald-950">
                {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-emerald-200 text-base">
              <span className="font-extrabold text-emerald-950">Tổng thanh toán:</span>
              <span className="font-black text-emerald-950 text-xl">
                {grandTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Double Click Idempotency Protection Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-black text-sm md:text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>⏳ ĐANG XỬ LÝ ĐƠN HÀNG...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-950" />
                <span>XÁC NHẬN ĐẶT HÀNG NGAY</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-emerald-800">
            🌱 Bằng việc nhấn đặt hàng, bạn sẽ nhận được mã đơn và thông báo trực tiếp.
          </p>
        </div>
      </form>
    </div>
  );
}
