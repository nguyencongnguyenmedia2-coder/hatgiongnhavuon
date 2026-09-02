'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, Menu, X, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter, usePathname } from 'next/navigation';

export default function MobileHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { getTotalItems, openDrawer } = useCartStore();
  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/san-pham?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const navLinks = [
    { label: '🏡 Trang Chủ', href: '/' },
    { label: '🌸 Hạt Giống Hoa', href: '/hat-giong-hoa' },
    { label: '🥬 Hạt Giống Rau', href: '/hat-giong-rau' },
    { label: '🍓 Cây Ăn Trái Chậu Lùn', href: '/hat-giong-cay-an-trai' },
    { label: '🎁 Combo Tiết Kiệm (-35%)', href: '/combo', color: 'text-amber-600 font-extrabold' },
    { label: '🔥 Hạt Giống Khuyến Mãi', href: '/san-pham', color: 'text-rose-600 font-extrabold' },
    { label: '📖 Hướng Dẫn Kỹ Thuật Gieo', href: '/huong-dan' },
    { label: '📞 Liên Hệ Hỗ Trợ', href: '/lien-he' },
  ];

  return (
    <>
      <div className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-xl text-emerald-950 hover:bg-emerald-50 active:scale-95 transition-all"
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500 shrink-0" style={{ position: 'relative' }}>
            <Image src="/logo.png" alt="Hạt Giống Nhà Vườn" fill sizes="32px" className="object-cover" />
          </div>
          <span className="font-extrabold text-emerald-950 text-base">Hạt Giống Nhà Vườn</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-xl text-emerald-950 hover:bg-emerald-50 active:scale-95 transition-all"
            aria-label="Tìm kiếm"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={openDrawer}
            className="relative p-2 rounded-xl text-emerald-950 hover:bg-emerald-50 active:scale-95 transition-all"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden bg-emerald-50 p-3 border-b border-emerald-200 shadow-inner">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập tên hạt giống hoa, rau sạch..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-emerald-300 focus:outline-none bg-white font-medium"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-sm"
            >
              Tìm
            </button>
          </form>
        </div>
      )}

      {/* Mobile Slide-down Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-50 bg-black/60 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-white w-4/5 max-w-xs h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0" style={{ position: 'relative' }}>
                  <Image src="/logo.png" alt="Hạt Giống Nhà Vườn" fill sizes="44px" className="object-cover" />
                </div>
                <div>
                  <p className="font-extrabold text-emerald-950 text-sm">Hạt Giống Nhà Vườn</p>
                  <p className="text-[10px] font-semibold text-emerald-700">ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI</p>
                </div>
              </div>

              <nav className="mt-4">
                <ul className="space-y-2 font-bold text-gray-800 text-xs">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block py-2 px-3 rounded-xl transition-all ${
                            isActive
                              ? 'bg-emerald-800 text-amber-300 font-extrabold shadow-sm'
                              : link.color || 'hover:bg-emerald-50 hover:text-emerald-900'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="pt-2">
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-300/80 font-extrabold text-xs text-center shadow-xs"
                    >
                      🔐 TRANG QUẢN TRỊ ADMIN
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-3 text-xs">
              <a
                href="https://www.facebook.com/julymedia1.2/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors block text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white text-blue-600" />
                <span>CHAT VỚI TƯ VẤN MESSENGER</span>
              </a>

              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  Hotline: 0934 811 307
                </p>
                <p className="text-[10px] text-gray-500">Kiểm tra hàng trước khi thanh toán COD</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
