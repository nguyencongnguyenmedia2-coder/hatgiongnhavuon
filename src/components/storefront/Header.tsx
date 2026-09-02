'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ShoppingBag, MessageCircle, Phone, Sprout, Flame, Gift, Sparkles, BookOpen } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';
import { SiteSettings } from '@/types';

interface HeaderProps {
  settings?: SiteSettings;
}

export default function Header({ settings }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const { getTotalItems, openDrawer } = useCartStore();
  const totalItems = getTotalItems();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/san-pham?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const storeName = settings?.store_name || 'Hạt Giống Nhà Vườn';
  const slogan = settings?.slogan || 'ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI';
  const hotline = settings?.hotline || '0934 811 307';
  const messengerUrl = settings?.messenger_url || 'https://www.facebook.com/julymedia1.2/';

  const navLinks = [
    { label: 'Trang Chủ', href: '/' },
    { label: '🌸 Hạt Giống Hoa', href: '/hat-giong-hoa' },
    { label: '🥬 Hạt Giống Rau', href: '/hat-giong-rau' },
    { label: '🍓 Cây Ăn Trái Chậu Lùn', href: '/hat-giong-cay-an-trai' },
    { label: '🎁 Combo Tiết Kiệm', href: '/combo', highlight: 'amber' },
    { label: '🔥 Khuyến Mãi Hot', href: '/san-pham', highlight: 'rose' },
    { label: '📖 Hướng Dẫn Gieo Trồng', href: '/huong-dan' },
    { label: '📞 Liên Hệ', href: '/lien-he' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100/80">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white text-xs py-2 px-4 hidden md:block border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 font-medium tracking-wide">
            <Sprout className="w-4 h-4 text-amber-400 animate-pulse-gentle" />
            <span>🌱 CHÀO MỪNG ĐẾN VỚI <strong className="text-amber-300">{storeName.toUpperCase()}</strong> – {slogan}</span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={`tel:${hotline.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1.5 hover:text-amber-300 transition-colors font-bold text-amber-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-amber-400/30"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline: {hotline}</span>
            </a>

            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-amber-300 transition-colors text-blue-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
              <span>Tư vấn Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-lg border-2 border-emerald-500 shrink-0 group-hover:scale-105 transition-transform" style={{ position: 'relative' }}>
            <Image src="/logo.png" alt={storeName} fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-emerald-950 leading-tight group-hover:text-emerald-700 transition-colors">
              {storeName}
            </h1>
            <p className="text-[10px] md:text-[11px] font-extrabold text-emerald-700 tracking-wider">
              {slogan}
            </p>
          </div>
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg flex-col gap-1">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Nhập tên hạt giống hoa, rau sạch, cây ăn trái..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-2xl border-2 border-emerald-200 focus:border-emerald-600 focus:outline-none text-xs bg-emerald-50/30 text-emerald-950 placeholder:text-gray-400 font-medium transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors shadow-sm"
              aria-label="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Trending Tags */}
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold px-1">
            <span className="text-emerald-700 font-bold">🔥 Tìm nhiều:</span>
            <button onClick={() => setSearchQuery('Hoa cúc')} className="hover:text-emerald-700 hover:underline">Hoa cúc</button>
            <span>•</span>
            <button onClick={() => setSearchQuery('Rau cải')} className="hover:text-emerald-700 hover:underline">Rau cải</button>
            <span>•</span>
            <button onClick={() => setSearchQuery('Dâu tây')} className="hover:text-emerald-700 hover:underline">Dâu tây</button>
            <span>•</span>
            <button onClick={() => setSearchQuery('Combo')} className="hover:text-emerald-700 hover:underline text-amber-600 font-bold">Combo tiết kiệm</button>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all text-xs font-extrabold shadow-md hover:shadow-blue-600/20"
          >
            <MessageCircle className="w-4 h-4 fill-white text-blue-600" />
            <span>Tư vấn Messenger</span>
          </a>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={openDrawer}
            className="relative p-2.5 md:px-4 md:py-2.5 rounded-2xl bg-emerald-950 text-white hover:bg-emerald-900 active:scale-95 transition-all flex items-center gap-2 shadow-md"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="hidden lg:inline text-xs font-extrabold">Giỏ hàng</span>
            {mounted && totalItems > 0 && (
              <span className="bg-rose-600 text-white text-[11px] font-black px-2 py-0.5 rounded-full shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Primary Category Links Bar (Desktop) */}
      <nav className="hidden md:block bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white border-t border-emerald-950/40 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-between text-xs md:text-sm font-extrabold whitespace-nowrap overflow-x-auto scrollbar-none py-1.5 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-xl transition-all inline-flex items-center gap-1 ${
                      isActive
                        ? 'bg-amber-400 text-emerald-950 font-black shadow-md'
                        : link.highlight === 'amber'
                        ? 'text-amber-300 hover:bg-emerald-800/80 hover:text-white'
                        : link.highlight === 'rose'
                        ? 'text-rose-300 hover:bg-emerald-800/80 hover:text-white'
                        : 'text-emerald-100 hover:bg-emerald-800/80 hover:text-amber-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
