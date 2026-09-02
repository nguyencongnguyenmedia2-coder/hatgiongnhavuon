'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Send, MessageCircle, Phone, MapPin, CheckCircle2, RefreshCw, ShoppingBag } from 'lucide-react';
import { OrderStatus, Order } from '@/types';
import { getStoredOrders, updateOrderStatusInStore } from '@/lib/orderStore';

export default function AdminOrderDetailPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (orderId) {
      const orders = getStoredOrders();
      const found = orders.find((o) => o.id === orderId || o.order_code === orderId);
      if (found) {
        setOrder(found);
        setStatus(found.order_status);
      }
    }
  }, [orderId]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    if (order) {
      updateOrderStatusInStore(order.id, newStatus);
      setStatus(newStatus);
      setOrder((prev) => (prev ? { ...prev, order_status: newStatus } : null));
    }
  };

  const handleResendTelegram = async () => {
    setResending(true);
    setResendSuccess(false);
    try {
      if (order) {
        await fetch('/api/telegram/test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order }),
        });
      }
    } catch {
      // Ignore
    } finally {
      setResending(false);
      setResendSuccess(true);
    }
  };

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-emerald-950">Đang tải thông tin đơn hàng...</h2>
        <Link href="/admin/don-hang" className="text-xs font-bold text-emerald-700 hover:underline">
          ← Quay lại danh sách đơn hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/don-hang" className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-emerald-950">Chi Tiết Đơn Hàng</h1>
            <p className="text-xs font-mono font-extrabold text-emerald-800">Mã đơn: {order.order_code}</p>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-600 pl-2">Đổi trạng thái:</span>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className="text-xs font-extrabold bg-emerald-50 text-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-200 focus:outline-none cursor-pointer"
          >
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="packing">Đang đóng hàng</option>
            <option value="shipping">Đang giao hàng</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy đơn</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-12 gap-6">
        {/* Left Column: Customer & Items */}
        <div className="md:col-span-8 space-y-6">
          {/* Customer info */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-3 text-xs">
            <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2">
              Thông Tin Khách Hàng
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400 block font-medium">Họ tên khách hàng:</span>
                <span className="font-extrabold text-emerald-950 text-sm">{order.customer_name}</span>
              </div>

              <div>
                <span className="text-gray-400 block font-medium">Số điện thoại:</span>
                <a href={`tel:${order.customer_phone}`} className="font-extrabold text-emerald-800 text-sm hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {order.customer_phone}
                </a>
              </div>
            </div>

            <div>
              <span className="text-gray-400 block font-medium">Địa chỉ nhận hàng:</span>
              <span className="font-bold text-gray-800 flex items-start gap-1 mt-0.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                {order.address}
                {order.ward ? `, ${order.ward}` : ''}
                {order.district ? `, ${order.district}` : ''}
                {`, ${order.province}`}
              </span>
            </div>

            {order.note && (
              <div>
                <span className="text-gray-400 block font-medium">Ghi chú từ khách:</span>
                <span className="italic text-gray-700 bg-gray-50 p-2.5 rounded-xl block mt-1 border border-gray-100">
                  &quot;{order.note}&quot;
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-gray-500 text-[11px]">
              <span>Phương thức thanh toán: <strong className="text-emerald-950">{order.payment_method === 'BANK_TRANSFER' ? 'Chuyển khoản ngân hàng MB' : 'Thanh toán COD khi nhận'}</strong></span>
              <span>Thời gian đặt: <strong>{new Date(order.created_at || Date.now()).toLocaleString('vi-VN')}</strong></span>
            </div>
          </div>

          {/* Items snapshot table */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4 text-xs">
            <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2">
              Sản Phẩm Trong Đơn ({order.items?.length || 0})
            </h2>

            <div className="divide-y divide-gray-100">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-emerald-950 text-xs sm:text-sm">
                        {item.product_name_snapshot}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium">
                        SKU: {item.sku_snapshot || 'N/A'} • {item.price_snapshot.toLocaleString('vi-VN')}đ × {item.quantity}
                      </p>
                    </div>
                    <span className="font-black text-emerald-950 text-sm">
                      {item.subtotal.toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 py-2">Không có dữ liệu sản phẩm trong đơn.</p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 space-y-1.5 text-right font-bold text-xs">
              <p className="text-gray-500">Tạm tính: {order.subtotal?.toLocaleString('vi-VN')}đ</p>
              {order.discount > 0 && <p className="text-rose-600">Giảm giá: -{order.discount.toLocaleString('vi-VN')}đ</p>}
              <p className="text-gray-500">Phí ship: {order.shipping_fee === 0 ? 'MIỄN PHÍ' : `${order.shipping_fee.toLocaleString('vi-VN')}đ`}</p>
              <p className="text-base font-black text-emerald-950 pt-1">
                Tổng thanh toán: {order.total.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Actions & Telegram Manual Resend */}
        <div className="md:col-span-4 space-y-6">
          {/* Telegram Manual Resend Box */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-3 text-xs">
            <h3 className="font-extrabold text-emerald-950 text-sm border-b border-gray-100 pb-2 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-sky-600" />
              <span>Thông Báo Telegram Bot</span>
            </h3>

            <p className="text-gray-500">Trạng thái thông báo tới máy chủ shop:</p>
            <div className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              order.telegram_sent !== false ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{order.telegram_sent !== false ? '🟢 Đã tự động báo Telegram' : '🔴 Chưa báo Telegram'}</span>
            </div>

            <button
              onClick={handleResendTelegram}
              disabled={resending}
              className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
              <span>{resending ? 'Đang gửi...' : 'GỬI LẠI TELEGRAM'}</span>
            </button>

            {resendSuccess && (
              <p className="text-[11px] font-bold text-emerald-700 text-center">
                ✅ Đã gửi tin nhắn thông báo Telegram thành công!
              </p>
            )}
          </div>

          {/* Messenger Direct Advice Link */}
          <div className="bg-blue-50/90 p-6 rounded-3xl border border-blue-100 space-y-3 text-xs">
            <h3 className="font-extrabold text-blue-950 text-sm flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-blue-600 fill-blue-50" />
              <span>Tư Vấn Khách Qua Messenger</span>
            </h3>
            <p className="text-blue-900 leading-snug">
              Mở cuộc trò chuyện Messenger trực tiếp với khách theo đơn <strong>{order.order_code}</strong>:
            </p>
            <a
              href="https://www.facebook.com/julymedia1.2/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-colors block text-center shadow-sm"
            >
              <span>CHAT MESSENGER VỚI KHÁCH</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
