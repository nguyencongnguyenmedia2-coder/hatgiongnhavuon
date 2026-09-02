'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Sprout, ShoppingBag, MessageCircle, PhoneCall } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';

interface MobileBottomNavProps {
  messengerUrl?: string;
}

export default function MobileBottomNav({
  messengerUrl = 'https://www.facebook.com/julymedia1.2/',
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const { getTotalItems, openDrawer } = useCartStore();
  const totalItems = getTotalItems();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isTabActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-emerald-100/90 shadow-[0_-10px_25px_rgba(6,78,59,0.1)] px-2 py-2">
      <div className="grid grid-cols-5 text-center items-center">
        {/* Tab 1: Trang chủ */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-all rounded-2xl ${
            isTabActive('/')
              ? 'text-amber-400 bg-emerald-950 font-black shadow-md -translate-y-1 py-1.5'
              : 'text-gray-600 hover:text-emerald-900 font-bold'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Trang Chủ</span>
        </Link>

        {/* Tab 2: Hạt Giống Hoa */}
        <Link
          href="/hat-giong-hoa"
          className={`flex flex-col items-center justify-center py-1 transition-all rounded-2xl ${
            isTabActive('/hat-giong-hoa')
              ? 'text-amber-400 bg-emerald-950 font-black shadow-md -translate-y-1 py-1.5'
              : 'text-gray-600 hover:text-emerald-900 font-bold'
          }`}
        >
          <Sprout className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Giống Hoa</span>
        </Link>

        {/* Tab 3: Danh Mục */}
        <Link
          href="/san-pham"
          className={`flex flex-col items-center justify-center py-1 transition-all rounded-2xl ${
            isTabActive('/san-pham')
              ? 'text-amber-400 bg-emerald-950 font-black shadow-md -translate-y-1 py-1.5'
              : 'text-gray-600 hover:text-emerald-900 font-bold'
          }`}
        >
          <LayoutGrid className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Tất Cả</span>
        </Link>

        {/* Tab 4: Giỏ hàng */}
        <button
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center py-1 text-[10px] font-extrabold text-gray-700 hover:text-emerald-900 active:scale-95 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5 text-emerald-900" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <span>Giỏ Hàng</span>
        </button>

        {/* Tab 5: Messenger */}
        <a
          href={messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[10px] font-black text-blue-600 hover:text-blue-700 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-blue-500 text-blue-600" />
          <span>Tư Vấn</span>
        </a>
      </div>
    </nav>
  );
}
