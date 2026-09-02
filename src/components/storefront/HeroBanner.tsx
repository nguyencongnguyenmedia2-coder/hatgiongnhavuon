'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sprout, ShoppingCart, ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';
import { Banner, SiteSettings } from '@/types';
import { getStoredBanners } from '@/lib/bannerStore';

interface HeroBannerProps {
  banners?: Banner[];
  settings?: SiteSettings;
}

export default function HeroBanner({ banners: initialBanners, settings }: HeroBannerProps) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners || []);

  useEffect(() => {
    const stored = getStoredBanners();
    if (stored && stored.length > 0) {
      setBanners(stored.filter((b) => b.is_active));
    }
  }, []);

  const activeBanner = banners && banners.length > 0 ? banners[0] : null;

  const title = activeBanner?.title || settings?.store_name || 'HẠT GIỐNG NHÀ VƯỜN';
  const slogan = activeBanner?.subtitle || settings?.slogan || 'ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI';

  return (
    <section className="relative overflow-hidden hero-gradient text-white py-14 md:py-24">
      {/* Background Graphic Patterns & Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:20px_20px]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Column: Heading & CTAs */}
        <div className="md:col-span-7 space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/70 border border-emerald-500/40 text-emerald-200 text-xs font-extrabold shadow-sm backdrop-blur-md">
            <Sprout className="w-4 h-4 text-amber-400 animate-pulse-gentle" />
            <span>🌱 HẠT GIỐNG CHUẨN THUẦN – TỶ LỆ NẢY MẦM &gt; 90%</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            {title}
            <span className="block text-amber-400 text-xl sm:text-2xl md:text-3xl mt-3 font-extrabold font-sans tracking-normal">
              {slogan}
            </span>
          </h1>

          <p className="text-emerald-100/90 text-sm md:text-base max-w-xl mx-auto md:mx-0 font-medium leading-relaxed">
            Chuyên cung cấp hạt giống hoa rực rỡ, hạt giống rau sạch F1, cây ăn trái chậu lùn. Dễ trồng tại nhà, tỷ lệ nảy mầm siêu cao, hướng dẫn kỹ thuật chi tiết từ chuyên gia.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <Link
              href="/san-pham"
              className="px-7 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-black text-sm md:text-base shadow-lg hover:shadow-amber-400/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 glow-amber"
            >
              <span>XEM HẠT GIỐNG</span>
              <Sprout className="w-4 h-4" />
            </Link>

            <Link
              href="/combo"
              className="px-7 py-4 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-white font-extrabold text-sm md:text-base border border-emerald-500/50 backdrop-blur-md transition-all shadow-md flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span>MUA NGAY COMBO</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-emerald-800/70 grid grid-cols-3 gap-3 text-left text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-900/80 border border-emerald-700 text-amber-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-semibold leading-snug">Cam kết tỷ lệ nảy mầm cao</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-900/80 border border-emerald-700 text-amber-400 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-semibold leading-snug">Giao hàng toàn quốc</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-900/80 border border-emerald-700 text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-semibold leading-snug">Tư vấn kỹ thuật 24/7</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Graphic Banner */}
        <div className="md:col-span-5 relative">
          <div
            className="relative aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/30 glow-emerald"
            style={{ position: 'relative' }}
          >
            <Image
              src={activeBanner?.image_url || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=80'}
              alt="Hạt giống nhà vườn"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />

            {/* Floating Glassmorphism Promo Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs text-white shadow-lg">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <p className="font-extrabold text-amber-300 text-sm">Hạt Giống Hoa Cúc Mix &amp; Hoa Hồng Pháp</p>
              </div>
              <p className="text-[11px] text-gray-200 font-medium">Ưu đãi giảm đến 30% khi đặt hàng hôm nay</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
