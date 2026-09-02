'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    getSubtotal,
  } = useCartStore();

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const freeShippingThreshold = 300000;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckoutClick = () => {
    closeDrawer();
    router.push('/dat-hang');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between h-full">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5 font-extrabold text-base">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span>Giỏ Hàng Của Bạn</span>
                <span className="text-xs text-amber-300 font-bold ml-2">
                  ({items.reduce((a, b) => a + b.quantity, 0)} món)
                </span>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1.5 rounded-xl hover:bg-emerald-800 transition-colors text-emerald-200 hover:text-white"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator Bar */}
          {items.length > 0 && (
            <div className="bg-emerald-50/90 p-3 px-4 border-b border-emerald-100 space-y-1.5 shrink-0">
              <div className="flex justify-between items-center text-[11px] font-bold">
                <span className="text-emerald-950 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>
                    {isFreeShipping
                      ? '🎉 Bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN!'
                      : `Mua thêm ${(freeShippingThreshold - subtotal).toLocaleString('vi-VN')}đ để được FREESHIP!`}
                  </span>
                </span>
                <span className="text-emerald-700">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-2 bg-emerald-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 space-y-3">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-4xl shadow-inner border border-emerald-100">
                  🌱
                </div>
                <h4 className="font-black text-emerald-950 text-lg">Giỏ hàng của bạn đang trống</h4>
                <p className="text-xs text-gray-500 max-w-xs leading-relaxed font-medium">
                  Hãy khám phá bộ sưu tập hạt giống hoa rực rỡ và rau sạch F1 trồng sân vườn ngay nhé!
                </p>
                <button
                  onClick={closeDrawer}
                  className="mt-2 px-7 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-black rounded-2xl transition-all shadow-md hover:scale-105"
                >
                  KHÁM PHÁ HẠT GIỐNG NGAY
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const img =
                  product.images && product.images.length > 0
                    ? product.images[0].image_url
                    : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=300&q=80';

                return (
                  <div key={product.id} className="py-3.5 flex gap-3 items-center">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-emerald-100 shadow-xs" style={{ position: 'relative' }}>
                      <Image src={img} alt={product.name} fill sizes="64px" className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-extrabold text-emerald-950 text-xs sm:text-sm line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="p-1 text-gray-400 hover:text-rose-600 transition-colors shrink-0 -mr-1"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-emerald-200 rounded-xl bg-emerald-50/60 p-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-emerald-800 hover:text-emerald-950 rounded-lg hover:bg-emerald-200/60 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-extrabold text-emerald-950">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-emerald-800 hover:text-emerald-950 rounded-lg hover:bg-emerald-200/60 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-black text-sm text-emerald-950 block">
                            {(product.price * quantity).toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer Summary with Mobile Bottom Bar Clearance */}
          {items.length > 0 && (
            <div className="p-4 pb-20 md:pb-4 bg-emerald-50/95 border-t border-emerald-200/80 space-y-3 shrink-0 shadow-lg">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-extrabold text-emerald-950">Tổng tiền tạm tính:</span>
                <span className="text-xl font-black text-emerald-950">
                  {subtotal.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 text-[11px] text-emerald-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Kiểm tra hàng trước khi thanh toán COD toàn quốc</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={closeDrawer}
                  className="py-3 px-3 rounded-2xl border border-emerald-300 text-emerald-950 hover:bg-emerald-100 text-xs font-extrabold text-center transition-colors"
                >
                  TIẾP TỤC MUA
                </button>

                <button
                  onClick={handleCheckoutClick}
                  className="py-3 px-3 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-900 hover:to-emerald-800 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <span>ĐẶT HÀNG NGAY</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
