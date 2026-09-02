'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Zap, Star, ShieldCheck } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/stores/useCartStore';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCartStore();

  const primaryImage =
    product.images && product.images.length > 0
      ? product.images.find((i) => i.is_primary)?.image_url || product.images[0].image_url
      : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80';

  const discountPercent =
    product.compare_price && product.compare_price > product.price
      ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
      : 0;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product, 1);
    }
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addItem(product, 1);
      router.push('/dat-hang');
    }
  };

  return (
    <div className="group bg-white rounded-2xl md:rounded-3xl border border-emerald-100/90 shadow-card hover:shadow-elevated hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between overflow-hidden relative product-card-hover">
      {/* Top Floating Badges */}
      <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none gap-1">
        {/* Left: Germination Rate Chip */}
        {product.germination_rate ? (
          <span className="bg-emerald-950/85 text-emerald-200 border border-emerald-500/40 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-amber-400 shrink-0" />
            <span>≥ {product.germination_rate.replace(/[^\d%]/g, '') || '90%'}</span>
          </span>
        ) : (
          <span />
        )}

        {/* Right: Discount Badge */}
        {discountPercent > 0 && (
          <span className="bg-rose-600 text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full shadow-md tracking-wider uppercase">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div>
        {/* Product Image Link */}
        <Link
          href={`/san-pham/${product.slug}`}
          className="block relative aspect-square overflow-hidden bg-emerald-50/40"
          style={{ position: 'relative' }}
        >
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] flex items-center justify-center z-10">
              <span className="bg-rose-600 text-white font-extrabold text-xs uppercase px-3 py-1.5 rounded-xl shadow-lg tracking-wider">
                HẾT HÀNG
              </span>
            </div>
          )}
        </Link>

        {/* Product Content */}
        <div className="p-3 sm:p-4 flex flex-col gap-1">
          <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md w-fit">
            {product.category_name || product.seed_type || 'Hạt giống chuẩn'}
          </span>

          <Link href={`/san-pham/${product.slug}`}>
            <h3 className="font-extrabold text-emerald-950 text-xs sm:text-sm line-clamp-2 hover:text-emerald-700 transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              ))}
            </div>
            <span className="text-gray-400 font-semibold text-[10px] ml-0.5">(5.0)</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
            <span className="text-sm sm:text-base md:text-lg font-black text-emerald-900">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through font-medium">
                {product.compare_price.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons - Fixed No-Wrap Single Line */}
      <div className="p-3 pt-0 grid grid-cols-2 gap-1.5 sm:gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 active:scale-95 text-[10px] sm:text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Thêm vào giỏ"
        >
          <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">Thêm giỏ</span>
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className="flex items-center justify-center gap-1 py-2 px-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white active:scale-95 text-[10px] sm:text-xs font-extrabold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          title="Mua ngay"
        >
          <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300 shrink-0" />
          <span className="whitespace-nowrap">Mua ngay</span>
        </button>
      </div>
    </div>
  );
}
