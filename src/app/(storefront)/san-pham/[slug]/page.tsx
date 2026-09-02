import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import ProductCard from '@/components/storefront/ProductCard';
import ProductDetailActions from '@/components/product/ProductDetailActions';
import { ShieldCheck, Calendar, Clock, Sprout, Star, Package, MapPin, Award, MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

import DynamicProductDetail from '@/components/product/DynamicProductDetail';

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  if (!product) {
    return { title: 'Hạt Giống Chuẩn | Hạt Giống Nhà Vườn' };
  }

  const primaryImage =
    product.images && product.images.length > 0 ? product.images[0].image_url : '';

  return {
    title: `${product.name} | Hạt Giống Nhà Vườn`,
    description: product.short_description || product.description,
    openGraph: {
      title: product.name,
      description: product.short_description || '',
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return <DynamicProductDetail slug={slug} />;
  }

  const relatedProducts = DEMO_PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 4);

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80';

  const discountPercent =
    product.compare_price && product.compare_price > product.price
      ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
      : 0;

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [primaryImage],
    description: product.short_description || product.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'VND',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://hatgiongnhavuon.vn/san-pham/${product.slug}`,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Product JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:underline">Hạt giống</Link>
        <span>/</span>
        <span className="text-gray-500 truncate">{product.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Left Col: Image Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-emerald-100 shadow-card" style={{ position: 'relative' }}>
            <Image
              src={primaryImage}
              alt={product.name}
              fill
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

        {/* Right Col: Product Info & Purchase Actions */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded-md">
              SKU: {product.sku}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950 mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-900">5.0</span>
              <span className="text-xs text-gray-400">| Tỷ lệ nảy mầm {product.germination_rate}</span>
            </div>
          </div>

          {/* Pricing Card */}
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

          {/* Short Specs Quick Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Tỷ lệ nảy mầm</span>
                <span className="font-bold text-emerald-950">{product.germination_rate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <Clock className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Thời gian mầm</span>
                <span className="font-bold text-emerald-950">{product.germination_days_min} - {product.germination_days_max} ngày</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Thời vụ</span>
                <span className="font-bold text-emerald-950">{product.planting_season}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-gray-100">
              <Package className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-gray-400 block text-[10px]">Quy cách</span>
                <span className="font-bold text-emerald-950">{product.package_quantity}</span>
              </div>
            </div>
          </div>

          {/* Interactive Quantity & Buy Buttons Client Component */}
          <ProductDetailActions product={product} />

          {/* Messenger Direct Advice */}
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600 fill-blue-50" />
              <span className="text-xs font-semibold text-blue-950">Bạn cần tư vấn kỹ thuật gieo loại hạt này?</span>
            </div>
            <a
              href="https://m.me/hatgiongnhavuon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              Hỏi Messenger →
            </a>
          </div>
        </div>
      </div>

      {/* Specifications & Sowing Guide Detail Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-card space-y-6">
        <h3 className="text-xl font-extrabold text-emerald-950 border-b border-emerald-100 pb-3 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-600" />
          <span>Thông Tin Chi Tiết &amp; Hướng Dẫn Gieo Trồng</span>
        </h3>

        <div className="grid md:grid-cols-12 gap-8 text-sm leading-relaxed text-gray-700">
          <div className="md:col-span-7 space-y-4">
            <h4 className="font-bold text-emerald-900 text-base">1. Mô tả sản phẩm</h4>
            <p>{product.description}</p>

            <h4 className="font-bold text-emerald-900 text-base pt-2">2. Hướng dẫn gieo hạt hiệu quả nhất</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm">
              <li><strong>Bước 1 (Ngâm hạt):</strong> Ngâm hạt trong nước ấm 40 - 45°C (2 sôi 3 lạnh) trong 3 - 5 giờ.</li>
              <li><strong>Bước 2 (Ủ hạt):</strong> Vớt ra cho vào khăn ẩm ấm ủ 24 - 48h cho đến khi nứt nanh mầm.</li>
              <li><strong>Bước 3 (Gieo đất):</strong> Gieo vào khay ươm hoặc chậu đất tơi xốp, phủ lớp đất mỏng 0.5cm và tưới phun sương giữ ẩm.</li>
              <li><strong>Bước 4 (Chăm sóc):</strong> Đặt nơi có nắng nhẹ 4h/ngày, giữ đất luôn có độ ẩm vừa phải.</li>
            </ul>
          </div>

          {/* Specs Table */}
          <div className="md:col-span-5 bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-3">
            <h4 className="font-bold text-emerald-950 text-sm border-b border-emerald-200 pb-2">
              Thông số hạt giống
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Xuất xứ</span>
                <span className="font-semibold text-emerald-950">{product.origin}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Tỷ lệ nảy mầm</span>
                <span className="font-semibold text-emerald-950">{product.germination_rate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Mức độ dễ trồng</span>
                <span className="font-semibold text-emerald-950">{product.difficulty}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-100">
                <span className="text-gray-500">Thời gian nảy mầm</span>
                <span className="font-semibold text-emerald-950">{product.germination_days_min} - {product.germination_days_max} ngày</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Quy cách đóng gói</span>
                <span className="font-semibold text-emerald-950">{product.package_quantity}</span>
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
