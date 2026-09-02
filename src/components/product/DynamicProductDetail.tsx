'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getStoredProducts } from '@/lib/productStore';
import ProductCard from '@/components/storefront/ProductCard';
import ProductDetailActions from '@/components/product/ProductDetailActions';
import { ShieldCheck, Calendar, Clock, Sprout, Star, Package, MessageCircle, ArrowLeft } from 'lucide-react';
import { Product } from '@/types';

interface DynamicProductDetailProps {
  slug: string;
}

export default function DynamicProductDetail({ slug }: DynamicProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

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

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images.find((img) => img.is_primary)?.image_url || product.images[0].image_url
      : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80';

  const discountPercent =
    product.compare_price && product.compare_price > product.price
      ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
      : 0;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.is_active)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:underline">Hạt giống</Link>
        <span>/</span>
        <span className="text-gray-500 truncate">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-emerald-100 shadow-card" style={{ position: 'relative' }}>
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg shadow-md">
                GIẢM {discountPercent}%
              </span>
            )}
          </div>

          {/* Sub Thumbnails if available */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-500 cursor-pointer shrink-0"
                  style={{ position: 'relative' }}
                >
                  <Image src={img.image_url} alt={img.alt_text || ''} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specs & Buy */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-extrabold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              SKU: {product.sku}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-emerald-950 mt-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-900">5.0</span>
              <span className="text-xs text-gray-400">| Tỷ lệ nảy mầm {product.germination_rate || '≥ 90%'}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-emerald-900">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {product.compare_price.toLocaleString('vi-VN')}đ
              </span>
            )}
            <span className="ml-auto text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
              Tồn kho: {product.stock > 0 ? `${product.stock} gói` : 'Hết hàng'}
            </span>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Tỷ lệ nảy mầm</span>
                <span className="font-bold text-emerald-950">{product.germination_rate || '≥ 90%'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <Clock className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Thời gian mầm</span>
                <span className="font-bold text-emerald-950">{product.germination_days_min || 3} - {product.germination_days_max || 7} ngày</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Thời vụ</span>
                <span className="font-bold text-emerald-950">{product.planting_season || 'Quanh năm'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <Package className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Quy cách</span>
                <span className="font-bold text-emerald-950">{product.package_quantity || 'Gói chuẩn'}</span>
              </div>
            </div>
          </div>

          {/* Add to Cart Actions */}
          <ProductDetailActions product={product} />

          {/* Messenger Consultation */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600 fill-blue-50" />
              <span className="text-xs font-semibold text-blue-950">Bạn cần tư vấn kỹ thuật gieo loại hạt này?</span>
            </div>
            <a
              href="https://www.facebook.com/julymedia1.2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-extrabold text-blue-700 hover:underline"
            >
              Hỏi Messenger →
            </a>
          </div>
        </div>
      </div>

      {/* Description & Planting Guide */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card space-y-6">
        <h3 className="text-xl font-extrabold text-emerald-950 border-b border-emerald-100 pb-3 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-600" />
          <span>Thông Tin Chi Tiết &amp; Hướng Dẫn Gieo Trồng</span>
        </h3>

        <div className="grid md:grid-cols-12 gap-8 text-sm leading-relaxed text-gray-700">
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-bold text-emerald-900 text-base">1. Mô tả sản phẩm</h4>
            <p>{product.description || product.short_description || 'Hạt giống F1 chuẩn thuần chủng, tỷ lệ nảy mầm cao.'}</p>

            <h4 className="font-bold text-emerald-900 text-base pt-2">2. Hướng dẫn gieo hạt hiệu quả nhất</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
              <li><strong>Bước 1 (Ngâm hạt):</strong> Ngâm hạt trong nước ấm 40 - 45°C (2 sôi 3 lạnh) trong 3 - 5 giờ.</li>
              <li><strong>Bước 2 (Ủ hạt):</strong> Vớt ra cho vào khăn ẩm ấm ủ 24 - 48h cho đến khi nứt nanh mầm.</li>
              <li><strong>Bước 3 (Gieo đất):</strong> Gieo vào khay ươm hoặc chậu đất tơi xốp, phủ lớp đất mỏng 0.5cm và tưới phun sương giữ ẩm.</li>
              <li><strong>Bước 4 (Chăm sóc):</strong> Đặt nơi có nắng nhẹ 4h/ngày, giữ đất luôn có độ ẩm vừa phải.</li>
            </ul>
          </div>

          <div className="md:col-span-5 bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <h4 className="font-bold text-emerald-950 text-sm border-b border-emerald-200 pb-2">
              Thông số hạt giống
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Xuất xứ</span>
                <span className="font-semibold text-emerald-950">{product.origin || 'Việt Nam'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Tỷ lệ nảy mầm</span>
                <span className="font-semibold text-emerald-950">{product.germination_rate || '≥ 90%'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Mức độ dễ trồng</span>
                <span className="font-semibold text-emerald-950">{product.difficulty || 'Dễ trồng'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Thời gian nảy mầm</span>
                <span className="font-semibold text-emerald-950">{product.germination_days_min || 3} - {product.germination_days_max || 7} ngày</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Quy cách đóng gói</span>
                <span className="font-semibold text-emerald-950">{product.package_quantity || 'Gói chuẩn'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-xl font-extrabold text-emerald-950">Sản Phẩm Cùng Danh Mục</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
