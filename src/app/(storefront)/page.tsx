'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroBanner from '@/components/storefront/HeroBanner';
import ProductCard from '@/components/storefront/ProductCard';
import { DEMO_BANNERS, DEMO_BLOGS, DEFAULT_SITE_SETTINGS } from '@/lib/demoData';
import { useGlobalProductSync } from '@/lib/useGlobalProductSync';
import { getStoredBlogs } from '@/lib/blogStore';
import { BlogPost } from '@/types';
import { ShieldCheck, Truck, Clock, Sparkles, Sprout, ArrowRight, MessageCircle, HeartHandshake, Flame } from 'lucide-react';

export default function HomePage() {
  const products = useGlobalProductSync();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    setBlogs(getStoredBlogs().filter((b) => b.published));
  }, []);

  // Categorize products dynamically
  const bestSellers = products.filter((p) => p.best_seller);
  const newProducts = [...products].reverse().slice(0, 8); // Latest added products first!
  const flowerProducts = products.filter(
    (p) => p.category_id === 'cat-1' || p.category_name?.includes('Hoa') || p.slug.includes('hoa')
  );
  const vegProducts = products.filter(
    (p) => p.category_id === 'cat-2' || p.category_name?.includes('Rau') || p.slug.includes('rau')
  );
  const fruitProducts = products.filter(
    (p) => p.category_id === 'cat-3' || p.category_name?.includes('Trái') || p.slug.includes('trai')
  );
  const comboProducts = products.filter(
    (p) => p.category_id === 'cat-5' || p.category_name?.includes('Combo') || p.sku.includes('COMBO')
  );

  return (
    <div className="space-y-12 pb-12">
      {/* 1. Hero Banner Slider */}
      <HeroBanner banners={DEMO_BANNERS} settings={DEFAULT_SITE_SETTINGS} />

      {/* 2. Value Commitments & Benefits Bar (Glassmorphic Redesign) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 md:p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl border border-emerald-800/60 shadow-xl text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs md:text-sm text-white">Cam Kết Nảy Mầm</h4>
              <p className="text-[11px] text-emerald-200">Tỷ lệ nảy mầm chuẩn &gt; 90%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700/50 text-emerald-200 flex items-center justify-center shrink-0 border border-emerald-500/40">
              <Truck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs md:text-sm text-white">Miễn Phí Giao Hàng</h4>
              <p className="text-[11px] text-emerald-200">Cho đơn hàng từ 300.000đ</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Clock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs md:text-sm text-white">Giao Hàng COD</h4>
              <p className="text-[11px] text-emerald-200">Kiểm tra hàng trước thanh toán</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700/50 text-emerald-200 flex items-center justify-center shrink-0 border border-emerald-500/40">
              <HeartHandshake className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs md:text-sm text-white">Tư Vấn Kỹ Thuật</h4>
              <p className="text-[11px] text-emerald-200">Hướng dẫn gieo mầm 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 space-y-5">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600 animate-pulse-gentle" /> Vườn Xanh Mỗi Ngày
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-950 mt-1">
              Danh Mục Hạt Giống Nổi Bật
            </h2>
          </div>
          <p className="hidden sm:block text-xs font-extrabold text-emerald-800">
            🌱 Hạt F1 Thuần Chủng • Tỷ Lệ Nảy Mầm &gt; 90%
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
          {/* Card 1: Hạt Giống Hoa */}
          <Link
            href="/hat-giong-hoa"
            className="group relative md:col-span-4 h-64 md:h-72 rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border-2 border-rose-200/60 hover:border-rose-400 transition-all duration-500 flex flex-col justify-end p-6"
            style={{ position: 'relative' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80"
              alt="Hạt Giống Hoa"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/90 via-rose-950/40 to-transparent" />
            <span className="absolute top-4 left-4 z-10 bg-rose-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              🌸 50+ Giống Hoa Nở Rực
            </span>
            <div className="relative z-10 text-white space-y-1">
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                Hạt Giống Hoa
              </h3>
              <p className="text-xs text-rose-100 font-medium">Hoa cúc, hồng pháp, mười giờ, hướng dương lùn...</p>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Khám phá sắc hoa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 2: Hạt Giống Rau Sạch */}
          <Link
            href="/hat-giong-rau"
            className="group relative md:col-span-4 h-64 md:h-72 rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border-2 border-emerald-200/60 hover:border-emerald-400 transition-all duration-500 flex flex-col justify-end p-6"
            style={{ position: 'relative' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
              alt="Hạt Giống Rau"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />
            <span className="absolute top-4 left-4 z-10 bg-emerald-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              🥬 Thu Hoạch 20-30 Ngày
            </span>
            <div className="relative z-10 text-white space-y-1">
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                Hạt Giống Rau Sạch
              </h3>
              <p className="text-xs text-emerald-100 font-medium">Rau cải ngọt, rau muống, xà lách, cà chua bi...</p>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Trồng rau hữu cơ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 3: Cây Ăn Trái Chậu Lùn */}
          <Link
            href="/hat-giong-cay-an-trai"
            className="group relative md:col-span-4 h-64 md:h-72 rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border-2 border-amber-200/60 hover:border-amber-400 transition-all duration-500 flex flex-col justify-end p-6"
            style={{ position: 'relative' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80"
              alt="Cây Ăn Trái Chậu Lùn"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-950/40 to-transparent" />
            <span className="absolute top-4 left-4 z-10 bg-amber-500 text-emerald-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              🍓 Siêu Sai Quả Ban Công
            </span>
            <div className="relative z-10 text-white space-y-1">
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                Cây Ăn Trái Chậu Lùn
              </h3>
              <p className="text-xs text-amber-100 font-medium">Dâu tây, dưa lưới, chanh dây, đu đủ lùn...</p>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Xem giống cây lùn</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. NEWLY ADDED PRODUCTS HIGHLIGHT (✨ Sản Phẩm Mới Thêm) */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" /> Vừa Cập Nhật
            </span>
            <h2 className="text-xl md:text-2xl font-black text-emerald-950 mt-0.5">
              ✨ Hạt Giống Mới Thêm Vườn Nhà ({products.length})
            </h2>
          </div>
          <Link href="/san-pham" className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
            <span>Xem tất cả ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {newProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl text-center text-xs text-gray-500">
            Đang tải hạt giống mới thêm...
          </div>
        )}
      </section>

      {/* 5. Best Sellers Section (🔥 Sản Phẩm Bán Chạy Nhất) */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" /> Bestseller
              </span>
              <h2 className="text-xl md:text-2xl font-black text-emerald-950 mt-0.5">🔥 Sản Phẩm Bán Chạy Nhất</h2>
            </div>
            <Link href="/san-pham" className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Hạt Giống Hoa Section */}
      {flowerProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
            <div>
              <span className="text-xs font-black text-rose-600 uppercase tracking-widest">🌸 Sắc Màu Vườn Nhà</span>
              <h2 className="text-xl md:text-2xl font-black text-emerald-950 mt-0.5">Hạt Giống Hoa Nổi Bật</h2>
            </div>
            <Link href="/hat-giong-hoa" className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
              <span>Xem thêm hoa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {flowerProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Hạt Giống Rau Clean Garden Section */}
      {vegProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
            <div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">🥬 Rau Sạch Cho Gia Đình</span>
              <h2 className="text-xl md:text-2xl font-black text-emerald-950 mt-0.5">Hạt Giống Rau Thu Hoạch Nhanh</h2>
            </div>
            <Link href="/hat-giong-rau" className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
              <span>Xem tất cả rau</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {vegProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 8. Combo Tiết Kiệm Banner */}
      {comboProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-6 md:p-8 text-emerald-950 shadow-xl grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="bg-emerald-950 text-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                🎁 Siêu Ưu Đãi Combo
              </span>
              <h3 className="text-2xl md:text-3xl font-black leading-tight">
                Bộ Combo 5 Loại Hạt Giống Hoa Dễ Trồng
              </h3>
              <p className="text-xs md:text-sm font-semibold text-emerald-950 max-w-lg">
                Bao gồm Cúc Mix + Hướng Dương Lùn + Mười Giờ + Cẩm Chướng + Vạn Thọ. Tiết kiệm ngay 30% chi phí cho người mới bắt đầu!
              </p>
              <div className="pt-2">
                <Link
                  href="/combo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-950 text-white font-black text-xs shadow-md hover:bg-emerald-900 active:scale-95 transition-all"
                >
                  <span>MUA COMBO CHỈ 119.000đ</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-lg border-2 border-white/40" style={{ position: 'relative' }}>
              <Image
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
                alt="Combo Hạt Giống Hoa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* 9. Plant Guides & Blog Section */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
            <div>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">📖 Mẹo Làm Vườn</span>
              <h2 className="text-xl md:text-2xl font-black text-emerald-950 mt-0.5">Hướng Dẫn Gieo Trồng &amp; Chăm Sóc</h2>
            </div>
            <Link href="/huong-dan" className="text-xs font-extrabold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
              <span>Đọc tất cả bài viết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {blogs.slice(0, 4).map((blog) => (
              <Link
                key={blog.id}
                href={`/huong-dan/${blog.slug}`}
                className="group bg-white rounded-3xl border border-emerald-100/90 overflow-hidden shadow-card hover:shadow-elevated transition-all grid sm:grid-cols-12 gap-0"
              >
                <div className="sm:col-span-5 relative aspect-video sm:aspect-auto min-h-[160px]" style={{ position: 'relative' }}>
                  <Image
                    src={blog.featured_image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="sm:col-span-7 p-5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      Kỹ Thuật Gieo Trồng
                    </span>
                    <h3 className="font-extrabold text-emerald-950 text-sm md:text-base group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                  </div>
                  <span className="text-[11px] font-black text-emerald-800 flex items-center gap-1 mt-3">
                    <span>Đọc tiếp hướng dẫn</span>
                    <ArrowRight className="w-3 h-3 text-amber-500" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 10. Brand Story & Messenger CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center md:text-left grid md:grid-cols-12 gap-8 items-center border border-emerald-800/80">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-2xl md:text-3xl font-black text-amber-300 leading-tight">
              Bạn Cần Tư Vấn Chọn Hạt Giống Phù Hợp Với Ban Công &amp; Khí Hậu?
            </h3>
            <p className="text-xs md:text-sm text-emerald-100 max-w-2xl leading-relaxed font-medium">
              Đội ngũ Hạt Giống Nhà Vườn sẵn sàng hỗ trợ bạn 24/7 qua Facebook Messenger. Chỉ cần nhắn tin tên loại hoa/rau bạn muốn trồng, chúng tôi sẽ gợi ý loại hạt chuẩn nhất kèm hướng dẫn chi tiết!
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href={DEFAULT_SITE_SETTINGS.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-white text-blue-600" />
                <span>CHAT VỚI TƯ VẤN VIÊN MESSENGER</span>
              </a>
              <a
                href={`tel:${DEFAULT_SITE_SETTINGS.hotline.replace(/\s+/g, '')}`}
                className="px-6 py-3.5 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-extrabold text-xs border border-emerald-700 transition-colors"
              >
                GỌI HOTLINE: {DEFAULT_SITE_SETTINGS.hotline}
              </a>
            </div>
          </div>
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-amber-300/60 shadow-2xl shrink-0" style={{ position: 'relative' }}>
              <Image src="/logo.png" alt="Hạt Giống Nhà Vườn" fill sizes="176px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
