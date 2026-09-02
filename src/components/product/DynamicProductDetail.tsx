'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStoredProducts } from '@/lib/productStore';
import ProductCard from '@/components/storefront/ProductCard';
import ProductDetailActions from '@/components/product/ProductDetailActions';
import { ShieldCheck, Calendar, Clock, Sprout, Star, Package, MessageCircle, ArrowLeft, Droplets, Sun, CheckCircle2, Award, HeartHandshake } from 'lucide-react';
import { Product } from '@/types';

interface DynamicProductDetailProps {
  slug: string;
}

export default function DynamicProductDetail({ slug }: DynamicProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  useEffect(() => {
    const stored = getStoredProducts();
    setAllProducts(stored);
    const decodedSlug = decodeURIComponent(slug);
    const found = stored.find((p) => p.slug === slug || p.slug === decodedSlug || p.id === slug);
    if (found) {
      setProduct(found);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-emerald-950">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-4xl mx-auto border border-rose-100">
          🌸
        </div>
        <h1 className="text-2xl font-black text-emerald-950">Sản Phẩm Không Tồn Tại Hoặc Đã Bị Xóa</h1>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được cập nhật lại mã.
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>QUAY LẠI CỬA HÀNG</span>
        </Link>
      </div>
    );
  }

  const imagesList =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.image_url)
      : ['https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80'];

  const currentDisplayImg = imagesList[selectedImgIndex] || imagesList[0];

  const discountPercent =
    product.compare_price && product.compare_price > product.price
      ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
      : 0;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.is_active)
    .slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [currentDisplayImg],
    description: product.short_description || product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://hatgiongnhavuon.vercel.app/san-pham/${product.slug}`,
    },
  };

  // Helper to format raw description text into clean readable paragraphs
  const formatDescriptionText = (text?: string) => {
    if (!text) return <p className="text-gray-600 font-medium">Hạt giống thuần F1 chọn lọc, tỷ lệ nảy mầm cao, phát triển khỏe mạnh.</p>;

    // Split text by lines
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

    return (
      <div className="space-y-4">
        {lines.map((line, idx) => {
          const isHeading = line.startsWith('🌸') || line.startsWith('🥬') || line.startsWith('🍓') || line.startsWith('🌿') || /^\d+\./.test(line) || line.includes('HƯỚNG DẪN') || line.includes('Quy trình');
          const isStep = line.includes('BƯỚC') || line.includes('Bước');

          if (isHeading) {
            return (
              <h4 key={idx} className="font-black text-emerald-950 text-base pt-2 border-b border-emerald-100 pb-1 flex items-center gap-2">
                <span>{line}</span>
              </h4>
            );
          }

          if (isStep) {
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1 my-2">
                <span className="font-extrabold text-emerald-900 block text-xs md:text-sm">{line}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-gray-700 leading-relaxed font-medium text-xs md:text-sm">
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Product JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:underline">Hạt giống</Link>
        <span>/</span>
        <span className="text-emerald-950 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery & Main Image */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-emerald-100 shadow-card" style={{ position: 'relative' }}>
            <Image
              src={currentDisplayImg}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover transition-all duration-500"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-xl shadow-md uppercase tracking-wider">
                GIẢM {discountPercent}%
              </span>
            )}
            {product.best_seller && (
              <span className="absolute top-4 right-4 bg-amber-400 text-emerald-950 font-black text-xs px-3 py-1 rounded-xl shadow-md border border-amber-300">
                🔥 BÁN CHẠY NHẤT
              </span>
            )}
          </div>

          {/* Sub Thumbnails Carousel */}
          {imagesList.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1 scrollbar-none">
              {imagesList.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                    selectedImgIndex === idx ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                  style={{ position: 'relative' }}
                >
                  <Image src={url} alt={`Ảnh ${idx + 1}`} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Value Guarantees Banner */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-[11px] font-bold text-emerald-950">
            <div className="flex items-center gap-1.5 justify-center text-center">
              <Award className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Chuẩn F1 100%</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Nảy mầm &gt; 90%</span>
            </div>
            <div className="flex items-center gap-1.5 justify-center text-center">
              <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Hỗ trợ gieo 24/7</span>
            </div>
          </div>
        </div>

        {/* Right: Specs & Buy Actions */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold text-emerald-800 uppercase bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">
                SKU: {product.sku}
              </span>
              <span className="text-[11px] font-extrabold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                {product.category_name || product.seed_type || 'Hạt giống'}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-emerald-950 mt-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-black text-emerald-900">5.0</span>
              <span className="text-xs text-gray-400 font-medium">| Cam kết tỷ lệ nảy mầm {product.germination_rate || '≥ 90%'}</span>
            </div>
          </div>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200/70">
              {product.short_description}
            </p>
          )}

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-100/60 to-emerald-50 border border-emerald-200 flex items-baseline gap-3">
            <span className="text-3xl md:text-4xl font-black text-emerald-950">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-sm text-gray-400 line-through font-semibold">
                {product.compare_price.toLocaleString('vi-VN')}đ
              </span>
            )}
            <span className="ml-auto text-xs font-extrabold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
              Tồn kho: {product.stock > 0 ? `${product.stock} gói` : 'Hết hàng'}
            </span>
          </div>

          {/* Quick Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px]">Tỷ lệ nảy mầm</span>
                <span className="font-extrabold text-emerald-950">{product.germination_rate || '≥ 90%'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px]">Thời gian mầm</span>
                <span className="font-extrabold text-emerald-950">{product.germination_days_min || 3} - {product.germination_days_max || 7} ngày</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px]">Thời vụ gieo trồng</span>
                <span className="font-extrabold text-emerald-950">{product.planting_season || 'Quanh năm'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-gray-200 shadow-2xs">
              <Package className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-gray-400 block text-[10px]">Quy cách</span>
                <span className="font-extrabold text-emerald-950">{product.package_quantity || 'Gói chuẩn'}</span>
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <ProductDetailActions product={product} />

          {/* Messenger Support Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-5 h-5 text-blue-600 fill-blue-100 shrink-0" />
              <span className="text-xs font-extrabold text-blue-950">Cần hỗ trợ hướng dẫn gieo trồng loại hạt này?</span>
            </div>
            <a
              href="https://www.facebook.com/julymedia1.2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-black text-blue-700 hover:text-blue-900 underline whitespace-nowrap"
            >
              Hỏi Messenger →
            </a>
          </div>
        </div>
      </div>

      {/* 4-STEP VISUAL PLANTING TECHNIQUE CARDS */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
          <h3 className="text-lg md:text-xl font-black text-amber-300 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400 animate-pulse-gentle" />
            <span>Quy Trình 🏆 4 Bước Ươm Mầm Hạt Giống Đạt Tỷ Lệ Nảy Mầm &gt;90%</span>
          </h3>
          <span className="text-xs text-emerald-300 font-bold hidden sm:block">Chuẩn Kỹ Thuật Nhà Vườn</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <span className="text-amber-300 font-extrabold text-sm">Ngâm hạt kích mầm</span>
            </div>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Ngâm hạt trong nước ấm 40 - 45°C (2 phần nước sôi + 3 phần nước lạnh) từ 3 - 5 giờ để làm mềm vỏ.
            </p>
          </div>

          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <span className="text-amber-300 font-extrabold text-sm">Ủ mầm ẩm ấm</span>
            </div>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Vớt hạt đặt vào khăn ẩm ấm ủ 24 - 48 giờ ở nơi mát cho đến khi hạt nứt nanh mầm trắng nhỏ.
            </p>
          </div>

          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <span className="text-amber-300 font-extrabold text-sm">Gieo đất tơi xốp</span>
            </div>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Gieo vào khay ươm hoặc chậu đất trộn mụn dừa &amp; phân trùn. Phủ đất mỏng 0.5cm và tưới phun sương.
            </p>
          </div>

          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-emerald-950 font-black text-xs flex items-center justify-center shrink-0">
                4
              </div>
              <span className="text-amber-300 font-extrabold text-sm">Chăm sóc &amp; Ánh nắng</span>
            </div>
            <p className="text-emerald-100 text-[11px] leading-relaxed">
              Đặt chậu nơi nắng nhẹ 4-6h/ngày. Phun sương giữ ẩm 2 lần/ngày. Khi ra 4 lá thật tiến hành bón phân.
            </p>
          </div>
        </div>
      </div>

      {/* Description & Detailed Specs Layout Redesigned */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-emerald-100 shadow-card space-y-6">
        <h3 className="text-xl font-extrabold text-emerald-950 border-b border-emerald-100 pb-3 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-600" />
          <span>Thông Tin Chi Tiết &amp; Cẩm Nang Gieo Trồng</span>
        </h3>

        <div className="grid md:grid-cols-12 gap-8 text-sm">
          {/* Main Formatted Description Column */}
          <div className="md:col-span-7 space-y-4">
            {formatDescriptionText(product.description || product.short_description)}
          </div>

          {/* Right Specs Card */}
          <div className="md:col-span-5 bg-gradient-to-b from-emerald-50/80 to-emerald-50/40 p-5 rounded-3xl border border-emerald-200/80 space-y-4 h-fit">
            <h4 className="font-extrabold text-emerald-950 text-sm border-b border-emerald-200 pb-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Bảng Thông Số Hạt Giống</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
                <span className="text-gray-500 font-medium">Xuất xứ</span>
                <span className="font-bold text-emerald-950">{product.origin || 'Việt Nam'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
                <span className="text-gray-500 font-medium">Tỷ lệ nảy mầm</span>
                <span className="font-bold text-emerald-950">{product.germination_rate || '≥ 90%'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
                <span className="text-gray-500 font-medium">Mức độ dễ trồng</span>
                <span className="font-bold text-emerald-950">{product.difficulty || 'Dễ trồng'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
                <span className="text-gray-500 font-medium">Thời gian nảy mầm</span>
                <span className="font-bold text-emerald-950">{product.germination_days_min || 3} - {product.germination_days_max || 7} ngày</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-emerald-100">
                <span className="text-gray-500 font-medium">Thời vụ gieo trồng</span>
                <span className="font-bold text-emerald-950">{product.planting_season || 'Quanh năm'}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-500 font-medium">Quy cách đóng gói</span>
                <span className="font-bold text-emerald-950">{product.package_quantity || 'Gói chuẩn'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-black text-emerald-950">Sản Phẩm Cùng Danh Mục</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
