'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/stores/useCartStore';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck, Sparkles, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const freeShippingThreshold = 300000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-5xl mx-auto border-2 border-emerald-100 shadow-inner">
          🌱
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-emerald-950">Giỏ Hàng Của Bạn Đang Trống</h1>
        <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto font-medium">
          Chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá ngay hàng trăm loại hạt giống hoa và rau sạch chuẩn F1 nhé!
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-black text-xs md:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105"
        >
          <span>KHÁM PHÁ HẠT GIỐNG NGAY</span>
          <ArrowRight className="w-4 h-4 text-amber-300" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <nav className="text-xs text-emerald-700 font-medium mb-1">
            <Link href="/" className="hover:underline">Trang chủ</Link> / <span className="font-bold">Giỏ hàng</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-black text-emerald-950 flex items-center gap-2.5">
            <ShoppingBag className="w-8 h-8 text-emerald-700" />
            <span>Giỏ Hàng Của Bạn ({items.reduce((a, b) => a + b.quantity, 0)} món)</span>
          </h1>
        </div>

        <Link
          href="/san-pham"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-950 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tiếp tục mua hàng</span>
        </Link>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-emerald-50/90 p-4 md:p-5 rounded-3xl border border-emerald-200/80 shadow-card space-y-2">
        <div className="flex justify-between items-center text-xs md:text-sm font-extrabold text-emerald-950">
          <span className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-700" />
            <span>
              {isFreeShipping
                ? '🎉 Đơn hàng đủ điều kiện MIỄN PHÍ VẬN CHUYỂN toàn quốc!'
                : `Mua thêm ${(freeShippingThreshold - subtotal).toLocaleString('vi-VN')}đ để nhận ưu đãi FREESHIP!`}
            </span>
          </span>
          <span className="text-emerald-800">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-3 bg-emerald-200/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-400 rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left: Item list */}
        <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-emerald-100 shadow-card space-y-4">
          <div className="divide-y divide-gray-100">
            {items.map(({ product, quantity }) => {
              const img =
                product.images && product.images.length > 0
                  ? product.images[0].image_url
                  : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=300&q=80';

              return (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-emerald-100 shadow-xs" style={{ position: 'relative' }}>
                    <Image src={img} alt={product.name} fill sizes="96px" className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                      {product.category_name || product.seed_type || 'Hạt giống chuẩn'}
                    </span>

                    <Link href={`/san-pham/${product.slug}`} className="font-extrabold text-emerald-950 text-sm md:text-base hover:text-emerald-700 truncate block">
                      {product.name}
                    </Link>

                    <p className="text-xs md:text-sm text-emerald-900 font-black">
                      {product.price.toLocaleString('vi-VN')}đ
                    </p>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-emerald-200 rounded-xl bg-emerald-50/60 p-0.5">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1.5 text-emerald-800 hover:text-emerald-950 rounded-lg hover:bg-emerald-200/60 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-extrabold text-emerald-950">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1.5 text-emerald-800 hover:text-emerald-950 rounded-lg hover:bg-emerald-200/60 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 ml-auto sm:ml-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-black text-emerald-950 text-base md:text-lg block">
                      {(product.price * quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
            <button
              onClick={clearCart}
              className="text-rose-600 hover:underline font-bold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa toàn bộ giỏ hàng</span>
            </button>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="md:col-span-4 bg-white rounded-3xl p-6 border border-emerald-100 shadow-card space-y-4">
          <h3 className="font-black text-emerald-950 text-base md:text-lg border-b border-emerald-100 pb-3">
            Tóm Tắt Đơn Hàng
          </h3>

          <div className="space-y-2.5 text-xs md:text-sm font-semibold">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền hạt giống:</span>
              <span className="font-extrabold text-emerald-950">{subtotal.toLocaleString('vi-VN')}đ</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Phí giao hàng:</span>
              <span className="font-extrabold text-emerald-950">
                {isFreeShipping ? <span className="text-emerald-700 font-black">MIỄN PHÍ</span> : '30.000đ'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Đảm bảo quyền lợi khách hàng</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-snug">
              Kiểm tra hàng trước khi nhận. Đổi trả 1-1 nếu tỉ lệ nảy mầm không đạt.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
            <span className="font-bold text-emerald-950 text-base">Tổng thanh toán:</span>
            <span className="font-black text-emerald-950 text-2xl">
              {(subtotal + (isFreeShipping ? 0 : 30000)).toLocaleString('vi-VN')}đ
            </span>
          </div>

          <Link
            href="/dat-hang"
            className="w-full py-4 px-4 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <span>TIẾN HÀNH ĐẶT HÀNG NGAY</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
