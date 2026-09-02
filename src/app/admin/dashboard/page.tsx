'use client';

import React, { useState, useEffect } from 'react';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { getStoredOrders } from '@/lib/orderStore';
import { Order } from '@/types';
import { TrendingUp, ShoppingBag, Clock, CheckCircle2, AlertTriangle, ArrowUpRight, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const lowStockItems = DEMO_PRODUCTS.filter((p) => p.stock <= (p.low_stock_threshold || 10));

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.order_status === 'pending').length;
  const completedOrdersCount = orders.filter((o) => o.order_status === 'completed' || o.order_status === 'confirmed').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950">Dashboard Quản Trị Shop</h1>
          <p className="text-xs text-gray-500">Tổng quan doanh thu, đơn hàng &amp; tồn kho hôm nay.</p>
        </div>

        <Link
          href="/admin/san-pham/them"
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>Thêm sản phẩm mới</span>
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Doanh thu */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Tổng Doanh Thu</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-950">
            {totalRevenue.toLocaleString('vi-VN')}đ
          </p>
          <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> Cập nhật thời gian thực
          </span>
        </div>

        {/* Đơn hàng mới */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Tổng Đơn Hàng</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-950">{orders.length} Đơn</p>
          <span className="text-[11px] font-bold text-amber-600">
            {pendingOrdersCount} đơn chờ xác nhận
          </span>
        </div>

        {/* Đơn hoàn thành */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Đã Duyệt / Giao</span>
            <div className="w-8 h-8 rounded-xl bg-green-50 text-green-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-950">{completedOrdersCount} Đơn</p>
          <span className="text-[11px] font-semibold text-gray-400">Đơn hàng hoàn tất</span>
        </div>

        {/* Sản phẩm cảnh báo tồn kho */}
        <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500">
            <span>Cảnh Báo Tồn Kho</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600">{lowStockItems.length} Món</p>
          <Link href="/admin/ton-kho" className="text-[11px] font-bold text-emerald-700 hover:underline">
            Xem danh sách kho →
          </Link>
        </div>
      </div>

      {/* Main Grid: Orders & Top Products */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* Left: Recent Orders Table */}
        <div className="md:col-span-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h2 className="font-extrabold text-emerald-950 text-base">Đơn Hàng Mới Đặt Vừa Tải Về</h2>
            <Link href="/admin/don-hang" className="text-xs font-bold text-emerald-700 hover:underline">
              Xem tất cả đơn ({orders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-2.5 px-3">Mã đơn</th>
                  <th className="py-2.5 px-3">Khách hàng</th>
                  <th className="py-2.5 px-3">SĐT</th>
                  <th className="py-2.5 px-3">Tổng tiền</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-3 font-extrabold text-emerald-900">{order.order_code}</td>
                    <td className="py-3 px-3 font-medium text-emerald-950">{order.customer_name}</td>
                    <td className="py-3 px-3 text-gray-500 font-mono">{order.customer_phone}</td>
                    <td className="py-3 px-3 font-bold text-emerald-950">
                      {order.total.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        {order.order_status === 'pending' ? 'Chờ xác nhận' : order.order_status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link href={`/admin/don-hang/${order.id}`} className="text-xs font-bold text-emerald-700 hover:underline">
                        Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Low Stock Alert List */}
        <div className="md:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Sản Phẩm Sắp Hết Kho</span>
          </h2>

          <div className="divide-y divide-gray-100">
            {DEMO_PRODUCTS.slice(0, 4).map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-emerald-950 truncate max-w-[150px]">{p.name}</p>
                  <p className="text-[10px] text-gray-400">SKU: {p.sku}</p>
                </div>
                <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                  Còn {p.stock} gói
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
