'use client';

import React from 'react';
import { MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/useCartStore';

interface FloatingButtonsProps {
  hotline?: string;
  messengerUrl?: string;
}

export default function FloatingButtons({
  hotline = '0934 811 307',
  messengerUrl = 'https://m.me/hatgiongnhavuon',
}: FloatingButtonsProps) {
  const { getTotalItems, openDrawer } = useCartStore();
  const totalItems = getTotalItems();

  const cleanPhone = hotline.replace(/\s+/g, '');

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex flex-col gap-3 items-end">
      {/* Messenger Floating Button */}
      <a
        href={messengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform group relative"
        title="Tư vấn Facebook Messenger"
      >
        <MessageCircle className="w-6 h-6 fill-white text-blue-600" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
          Chat Messenger
        </span>
      </a>

      {/* Phone Call Floating Button */}
      <a
        href={`tel:${cleanPhone}`}
        className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce group relative"
        title={`Gọi ngay: ${hotline}`}
      >
        <Phone className="w-5 h-5 fill-white text-emerald-600" />
        <span className="absolute right-14 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
          Gọi: {hotline}
        </span>
      </a>

      {/* Cart Quick Floating Button (Desktop) */}
      <button
        onClick={openDrawer}
        className="hidden md:flex w-12 h-12 rounded-full bg-amber-500 text-white items-center justify-center shadow-lg hover:scale-110 transition-transform relative group"
        title="Xem giỏ hàng"
      >
        <ShoppingBag className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
}
