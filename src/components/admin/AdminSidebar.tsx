'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Ticket,
  FileText,
  Image as ImageIcon,
  Settings,
  Send,
  ShieldCheck,
} from 'lucide-react';
import FacebookIcon from '@/components/ui/FacebookIcon';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Quản Lý Sản Phẩm', href: '/admin/san-pham', icon: Package },
    { label: 'Danh Mục Sản Phẩm', href: '/admin/danh-muc', icon: Layers },
    { label: 'Quản Lý Đơn Hàng', href: '/admin/don-hang', icon: ShoppingBag },
    { label: 'Quản Lý Khách Hàng', href: '/admin/khach-hang', icon: Users },
    { label: 'Quản Lý Tồn Kho', href: '/admin/ton-kho', icon: Boxes },
    { label: 'Mã Giảm Giá / Promotion', href: '/admin/ma-giam-gia', icon: Ticket },
    { label: 'Bài Viết / Hướng Dẫn', href: '/admin/bai-viet', icon: FileText },
    { label: 'Quản Lý Banner Sliders', href: '/admin/banner', icon: ImageIcon },
    { label: 'Cấu Hình Website', href: '/admin/cau-hinh', icon: Settings },
    { label: 'Cấu Hình Telegram', href: '/admin/cau-hinh/telegram', icon: Send },
    { label: 'Cấu Hình Messenger', href: '/admin/cau-hinh/facebook', icon: FacebookIcon },
    { label: 'Quản Lý Người Dùng', href: '/admin/nguoi-dung', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 bg-emerald-950 text-emerald-100 flex flex-col border-r border-emerald-900 shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-emerald-900 flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-emerald-500 shrink-0" style={{ position: 'relative' }}>
          <Image src="/logo.png" alt="Hạt Giống Nhà Vườn Admin" fill sizes="40px" className="object-cover" />
        </div>
        <div>
          <h2 className="font-extrabold text-white text-sm">Hạt Giống Nhà Vườn</h2>
          <span className="text-[10px] text-amber-300 font-semibold bg-emerald-900 px-2 py-0.5 rounded-md">
            ADMIN SYSTEM
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold transition-colors ${
                isActive
                  ? 'bg-emerald-800 text-amber-300 font-bold shadow-sm'
                  : 'text-emerald-200 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="p-4 border-t border-emerald-900 text-xs flex items-center justify-between text-emerald-300">
        <div>
          <p className="font-bold text-white">Chủ Shop Admin</p>
          <p className="text-[10px]">admin@hatgiongnhavuon.vn</p>
        </div>
        <Link href="/" target="_blank" className="hover:text-amber-300 font-bold">
          Xem Web ↗
        </Link>
      </div>
    </aside>
  );
}
