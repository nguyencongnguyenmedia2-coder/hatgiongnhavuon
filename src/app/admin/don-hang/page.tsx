'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Eye, RefreshCw, Phone, MapPin } from 'lucide-react';
import { getStoredOrders, updateOrderStatusInStore } from '@/lib/orderStore';
import { Order } from '@/types';

export default function AdminOrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadOrders = () => {
    setOrders(getStoredOrders());
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order['order_status']) => {
    updateOrderStatusInStore(orderId, newStatus);
    loadOrders();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.order_status !== statusFilter) return false;
    if (query) {
      return (
        o.order_code.toLowerCase().includes(query.toLowerCase()) ||
        o.customer_name.toLowerCase().includes(query.toLowerCase()) ||
        o.customer_phone.includes(query)
      );
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">Chờ xác nhận</span>;
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">Đã xác nhận</span>;
      case 'packing':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">Đang đóng hàng</span>;
      case 'shipping':
        return <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">Đang giao</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">Hoàn thành</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">Đã hủy</span>;
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Đơn Hàng ({orders.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Danh sách đơn hàng trực tiếp từ khách mua ngoài storefront.</p>
        </div>

        <button
          onClick={loadOrders}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-emerald-900 text-xs font-bold hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tải lại đơn mới</span>
        </button>
      </div>

      {/* Filter and search bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, tên khách, SĐT..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">Trạng thái:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold bg-white border border-gray-200 rounded-xl px-3 py-2 text-emerald-950 focus:outline-none"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="shipping">Đang giao hàng</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Mã đơn hàng</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Số điện thoại</th>
                <th className="py-3 px-4">Thanh toán</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Telegram</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-extrabold text-emerald-900">{order.order_code}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-950">
                    {order.customer_name}
                    <span className="block text-[10px] text-gray-400 font-normal">
                      {order.address}, {order.province}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 font-mono">
                    <a href={`tel:${order.customer_phone}`} className="hover:underline font-bold text-emerald-800">
                      {order.customer_phone}
                    </a>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-600">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      order.payment_method === 'BANK_TRANSFER' ? 'bg-blue-50 text-blue-800' : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      {order.payment_method === 'BANK_TRANSFER' ? 'Chuyển khoản MB' : 'COD'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-emerald-950">
                    {order.total.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={order.order_status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                      className="text-[11px] font-bold bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                    >
                      <option value="pending">Chờ xác nhận</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="packing">Đang đóng hàng</option>
                      <option value="shipping">Đang giao hàng</option>
                      <option value="completed">Hoàn thành</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4">
                    {order.telegram_sent ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        🟢 Đã báo
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                        🔴 Lỗi báo
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/admin/don-hang/${order.id}`}
                      className="px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold hover:bg-emerald-200 inline-block"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
