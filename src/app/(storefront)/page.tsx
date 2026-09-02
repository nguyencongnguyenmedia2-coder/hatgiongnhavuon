import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroBanner from '@/components/storefront/HeroBanner';
import ProductCard from '@/components/storefront/ProductCard';
import { DEMO_CATEGORIES, DEMO_PRODUCTS, DEMO_BANNERS, DEMO_BLOGS, DEFAULT_SITE_SETTINGS } from '@/lib/demoData';
import { ShieldCheck, Truck, Clock, Sparkles, Sprout, ArrowRight, MessageCircle, HeartHandshake } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hạt Giống Nhà Vườn | Ươm Mầm Hôm Nay – Rực Rỡ Ngày Mai',
  description: 'Chuyên bán hạt giống hoa, hạt giống rau sạch, cây ăn trái chậu lùn. Tỷ lệ nảy mầm cao >90%, hướng dẫn gieo trồng chi tiết. Giao hàng toàn quốc.',
  openGraph: {
    title: 'Hạt Giống Nhà Vườn | Ươm Mầm Hôm Nay – Rực Rỡ Ngày Mai',
    description: 'Chuyên bán hạt giống hoa, hạt giống rau sạch, cây ăn trái chậu lùn. Tỷ lệ nảy mầm cao >90%.',
    images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function HomePage() {
  const flowerProducts = DEMO_PRODUCTS.filter((p) => p.category_id === 'cat-1');
  const vegProducts = DEMO_PRODUCTS.filter((p) => p.category_id === 'cat-2');
  const comboProducts = DEMO_PRODUCTS.filter((p) => p.category_id === 'cat-5');
  const bestSellers = DEMO_PRODUCTS.filter((p) => p.best_seller);
  const newProducts = DEMO_PRODUCTS.filter((p) => p.is_new);

  return (
    <div className="space-y-12 pb-8">
      {/* 1. Hero Banner */}
      <HeroBanner banners={DEMO_BANNERS} settings={DEFAULT_SITE_SETTINGS} />

      {/* 2. Value Commitments & Benefits Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-emerald-50/80 rounded-3xl border border-emerald-100/80 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-emerald-950">Cam Kết Nảy Mầm</h4>
              <p className="text-[11px] text-emerald-700">Tỷ lệ nảy mầm cao &gt; 90%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-emerald-950">Miễn Phí Ship</h4>
              <p className="text-[11px] text-emerald-700">Cho đơn hàng từ 300k</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-emerald-950">Giao Nhanh COD</h4>
              <p className="text-[11px] text-emerald-700">Kiểm tra rồi mới thanh toán</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="font-bold text-xs md:text-sm text-emerald-950">Tư Vấn Kỹ Thuật</h4>
              <p className="text-[11px] text-emerald-700">Hướng dẫn gieo trồng 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Grid Redesigned */}
      <section className="max-w-7xl mx-auto px-4 space-y-5">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-emerald-600" /> Vườn Xanh Mỗi Ngày
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-emerald-950 mt-1">
              Danh Mục Hạt Giống Nổi Bật
            </h2>
          </div>
          <p className="hidden sm:block text-xs font-semibold text-emerald-700">
            Hạt F1 thuần chủng • Tỷ lệ nảy mầm &gt; 90%
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 md:gap-5">
          {/* Card 1: Hạt Giống Hoa (Large Featured Card) */}
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

          {/* Card 4: Combo Hạt Giống (Wide Banner) */}
          <Link
            href="/combo"
            className="group relative md:col-span-8 h-48 md:h-52 rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border-2 border-purple-200/60 hover:border-purple-400 transition-all duration-500 flex flex-col justify-end p-6"
            style={{ position: 'relative' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
              alt="Combo Hạt Giống"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 via-purple-950/60 to-transparent" />
            <span className="absolute top-4 left-4 z-10 bg-purple-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
              🎁 Ưu Đãi Giảm 35%
            </span>
            <div className="relative z-10 text-white space-y-1 max-w-md">
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                Combo Hạt Giống Khởi Đầu
              </h3>
              <p className="text-xs text-purple-100 font-medium">Trọn bộ hạt giống hoa + rau + phân bón + khay ươm mầm dành cho người mới.</p>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Săn combo giá tốt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* Card 5: Khuyến Mãi Hot */}
          <Link
            href="/san-pham"
            className="group relative md:col-span-4 h-48 md:h-52 rounded-3xl overflow-hidden shadow-card hover:shadow-2xl border-2 border-rose-300/60 hover:border-rose-500 transition-all duration-500 flex flex-col justify-end p-6"
            style={{ position: 'relative' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80"
              alt="Khuyến Mãi Hot"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-950/40 to-transparent" />
            <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider animate-pulse-gentle">
              🔥 Deal Hot Hàng Tuần
            </span>
            <div className="relative z-10 text-white space-y-1">
              <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                Hạt Giống Khuyến Mãi
              </h3>
              <p className="text-xs text-red-100 font-medium">Giảm giá hấp dẫn lên tới 40%</p>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-300 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Xem deal khuyến mãi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Bestseller
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-emerald-950">Sản Phẩm Bán Chạy Nhất</h2>
          </div>
          <Link href="/san-pham" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Hạt Giống Hoa Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">🌸 Sắc Màu Vườn Nhà</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-emerald-950">Hạt Giống Hoa Nổi Bật</h2>
          </div>
          <Link href="/hat-giong-hoa" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            <span>Xem thêm hoa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flowerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Hạt Giống Rau Clean Garden Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">🥬 Rau Sạch Cho Gia Đình</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-emerald-950">Hạt Giống Rau Thu Hoạch Nhanh</h2>
          </div>
          <Link href="/hat-giong-rau" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            <span>Xem tất cả rau</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vegProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Combo Tiết Kiệm Banner */}
      {comboProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-6 md:p-8 text-emerald-950 shadow-xl grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="bg-emerald-950 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                🎁 Siêu Ưu Đãi Combo
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                Bộ Combo 5 Loại Hạt Giống Hoa Dễ Trồng
              </h3>
              <p className="text-xs md:text-sm font-medium text-emerald-900 max-w-lg">
                Bao gồm Cúc Mix + Hướng Dương Lùn + Mười Giờ + Cẩm Chướng + Vạn Thọ. Tiết kiệm ngay 30% chi phí cho người mới bắt đầu!
              </p>
              <div className="pt-2">
                <Link
                  href="/combo"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-950 text-white font-extrabold text-sm shadow-md hover:bg-emerald-900 transition-colors"
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

      {/* 8. Plant Guides & Blog Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex items-end justify-between border-b border-emerald-100 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">📖 Mẹo Làm Vườn</span>
            <h2 className="text-xl md:text-2xl font-extrabold text-emerald-950">Hướng Dẫn Gieo Trồng &amp; Chăm Sóc</h2>
          </div>
          <Link href="/huong-dan" className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            <span>Đọc tất cả bài viết</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {DEMO_BLOGS.map((blog) => (
            <Link
              key={blog.id}
              href={`/huong-dan/${blog.slug}`}
              className="group bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-card hover:shadow-elevated transition-all grid sm:grid-cols-12 gap-0"
            >
              <div className="sm:col-span-5 relative aspect-video sm:aspect-auto min-h-[160px]" style={{ position: 'relative' }}>
                <Image
                  src={blog.featured_image || ''}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="sm:col-span-7 p-4 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                    Kỹ Thuật Gieo Trồng
                  </span>
                  <h3 className="font-bold text-emerald-950 text-sm md:text-base group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{blog.excerpt}</p>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 mt-3">
                  <span>Đọc tiếp hướng dẫn</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Brand Story & Messenger CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-emerald-900 text-white rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden text-center md:text-left grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-2xl md:text-3xl font-extrabold text-amber-300">
              Bạn Cần Tư Vấn Chọn Hạt Giống Phù Hợp Với Ban Công &amp; Khí Hậu?
            </h3>
            <p className="text-xs md:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              Đội ngũ Hạt Giống Nhà Vườn sẵn sàng hỗ trợ bạn 24/7 qua Facebook Messenger. Chỉ cần nhắn tin tên loại hoa/rau bạn muốn trồng, chúng tôi sẽ gợi ý loại hạt chuẩn nhất kèm hướng dẫn chi tiết!
            </p>
            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href={DEFAULT_SITE_SETTINGS.messenger_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-white text-blue-600" />
                <span>CHAT VỚI TƯ VẤN VIÊN MESSENGER</span>
              </a>
              <a
                href={`tel:${DEFAULT_SITE_SETTINGS.hotline.replace(/\s+/g, '')}`}
                className="px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-bold text-sm border border-emerald-600 transition-colors"
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
