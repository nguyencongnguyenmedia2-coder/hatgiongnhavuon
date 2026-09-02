'use client';

import React, { useState, useEffect } from 'react';
import { Users, Phone, Search, MessageCircle, ShoppingBag, MapPin, RefreshCw } from 'lucide-react';
import { getStoredOrders } from '@/lib/orderStore';
import { Order } from '@/types';

interface CustomerProfile {
  name: string;
  phone: string;
  email?: string;
  province: string;
  address: string;
  total_orders: number;
  total_spent: number;
  last_order_at: string;
}

export default function AdminCustomerPage() {
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [query, setQuery] = useState('');

  const loadCustomers = () => {
    const orders = getStoredOrders();
    const map = new Map<string, CustomerProfile>();

    orders.forEach((o) => {
      const key = o.customer_phone || o.customer_name;
      if (!map.has(key)) {
        map.set(key, {
          name: o.customer_name,
          phone: o.customer_phone,
          email: o.customer_email,
          province: o.province,
          address: `${o.address}${o.province ? `, ${o.province}` : ''}`,
          total_orders: 1,
          total_spent: o.total || 0,
          last_order_at: new Date(o.created_at || Date.now()).toLocaleString('vi-VN'),
        });
      } else {
        const existing = map.get(key)!;
        existing.total_orders += 1;
        existing.total_spent += o.total || 0;
      }
    });

    setCustomers(Array.from(map.values()));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query) ||
      c.province.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Khách Hàng ({customers.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Tự động tổng hợp hồ sơ khách hàng đã từng đặt hàng ngoài storefront.</p>
        </div>

        <button
          onClick={loadCustomers}
          className="px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-emerald-950 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tải lại</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên khách, số điện thoại, tỉnh thành..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>
        <span className="text-xs font-extrabold text-emerald-900">
          Tổng cộng: {filtered.length} khách hàng
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Tên khách hàng</th>
                <th className="py-3.5 px-4">Số điện thoại</th>
                <th className="py-3.5 px-4">Địa chỉ giao</th>
                <th className="py-3.5 px-4">Số đơn đã mua</th>
                <th className="py-3.5 px-4">Tổng chi tiêu</th>
                <th className="py-3.5 px-4">Lần mua gần nhất</th>
                <th className="py-3.5 px-4 text-right">Liên hệ nhanh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((c, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-extrabold text-emerald-950">{c.name}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                    <a href={`tel:${c.phone}`} className="hover:underline flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{c.phone}</span>
                    </a>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">{c.address}</td>
                  <td className="py-3.5 px-4 font-extrabold text-gray-900">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {c.total_orders} đơn
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-950">
                    {c.total_spent.toLocaleString('vi-VN')}đ
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 font-medium">{c.last_order_at}</td>
                  <td className="py-3.5 px-4 text-right space-x-1">
                    <a
                      href={`tel:${c.phone}`}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl inline-block font-bold"
                      title="Gọi điện cho khách"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="https://www.facebook.com/julymedia1.2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl inline-block font-bold"
                      title="Chat Messenger"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
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
