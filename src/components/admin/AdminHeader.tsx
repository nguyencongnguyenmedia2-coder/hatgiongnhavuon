'use client';

import React from 'react';
import { Bell, Search, UserCheck } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm nhanh đơn hàng, sản phẩm, khách hàng..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 text-xs font-semibold">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Role: Super Admin</span>
        </div>

        <button className="relative p-2 rounded-full hover:bg-gray-100 text-gray-600">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600" />
        </button>
      </div>
    </header>
  );
}
