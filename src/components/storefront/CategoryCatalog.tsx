'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/storefront/ProductCard';
import { Product } from '@/types';
import { useGlobalProductSync } from '@/lib/useGlobalProductSync';
import { Search, Filter, ShieldCheck, Sparkles, Sprout, ArrowUpDown, X, BookOpen } from 'lucide-react';

interface CategoryCatalogProps {
  title: string;
  subtitle: string;
  categorySlug?: string;
  products?: Product[];
  bannerGradient?: string;
  subTypeTags?: string[];
}

export default function CategoryCatalog({
  title,
  subtitle,
  categorySlug = 'hat-giong-hoa',
  products: initialProducts,
  bannerGradient = 'from-rose-950 via-pink-900 to-rose-950',
  subTypeTags = ['Tất cả', 'Hoa Cúc', 'Hoa Hồng', 'Hướng Dương', 'Mười Giờ', 'Cẩm Chướng'],
}: CategoryCatalogProps) {
  const productList = useGlobalProductSync(categorySlug);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('Tất cả');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'best-selling' | 'discount'>('newest');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productList
      .filter((p) => {
        // Search Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = p.name.toLowerCase().includes(q);
          const matchesSku = p.sku.toLowerCase().includes(q);
          const matchesSeedType = p.seed_type?.toLowerCase().includes(q);
          if (!matchesName && !matchesSku && !matchesSeedType) return false;
        }

        // SubType Tag Filter
        if (selectedTag !== 'Tất cả') {
          if (!p.seed_type?.toLowerCase().includes(selectedTag.toLowerCase()) && !p.name.toLowerCase().includes(selectedTag.toLowerCase())) {
            return false;
          }
        }

        // Difficulty Filter
        if (selectedDifficulty !== 'all') {
          if (p.difficulty !== selectedDifficulty) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'best-selling') return (b.best_seller ? 1 : 0) - (a.best_seller ? 1 : 0);
        if (sortBy === 'discount') {
          const discA = a.compare_price ? a.compare_price - a.price : 0;
          const discB = b.compare_price ? b.compare_price - b.price : 0;
          return discB - discA;
        }
        return (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0);
      });
  }, [productList, searchQuery, selectedTag, selectedDifficulty, sortBy]);

  const hasActiveFilters = searchQuery !== '' || selectedTag !== 'Tất cả' || selectedDifficulty !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTag('Tất cả');
    setSelectedDifficulty('all');
    setSortBy('newest');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Rich Header Banner */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${bannerGradient} text-white p-6 md:p-10 rounded-3xl shadow-xl border border-white/10`}>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          {/* Breadcrumbs */}
          <nav className="text-xs text-emerald-200/90 font-medium flex items-center gap-1.5">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-white font-bold">{title}</span>
          </nav>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-amber-300 tracking-tight leading-tight flex items-center gap-3">
            <span>{title}</span>
          </h1>

          <p className="text-xs md:text-sm text-gray-100 max-w-3xl leading-relaxed font-medium">
            {subtitle}
          </p>

          {/* Value Badges */}
          <div className="pt-3 flex flex-wrap gap-2 text-[11px] font-bold">
            <span className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Tỷ lệ nảy mầm &gt; 90%
            </span>
            <span className="bg-emerald-950/70 border border-emerald-500/40 text-amber-300 px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Hạt giống F1 chọn lọc
            </span>
            <span className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              Tặng hướng dẫn gieo chi tiết
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filter & Sorting Controls */}
      <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Tìm trong ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border border-emerald-200 focus:outline-none focus:border-emerald-600 bg-emerald-50/30 text-emerald-950"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown & Sorting */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 bg-emerald-50/60 px-3 py-1.5 rounded-2xl border border-emerald-200">
              <Filter className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-bold text-emerald-950">Mức độ:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-transparent font-bold text-emerald-900 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả</option>
                <option value="Cực dễ">Cực dễ</option>
                <option value="Dễ trồng">Dễ trồng</option>
                <option value="Trung bình">Trung bình</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-1.5 bg-emerald-50/60 px-3 py-1.5 rounded-2xl border border-emerald-200">
              <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-bold text-emerald-950">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-emerald-900 focus:outline-none cursor-pointer"
              >
                <option value="newest">Sản phẩm mới</option>
                <option value="best-selling">Bán chạy nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="discount">Giảm giá nhiều nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Tag Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-gray-100">
          <span className="text-[11px] font-extrabold text-emerald-950 shrink-0">Loại hạt:</span>
          {subTypeTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all ${
                selectedTag === tag
                  ? 'bg-emerald-800 text-amber-300 shadow-md scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Active Filter Indicators & Counter */}
        <div className="flex items-center justify-between text-xs pt-1 text-emerald-900 border-t border-gray-100">
          <span className="font-bold">
            Hiển thị <span className="text-emerald-700 font-extrabold">{filteredProducts.length}</span> / {productList.length} sản phẩm
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-rose-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
            >
              <X className="w-3.5 h-3.5" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-3xl border border-emerald-100 shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl font-bold">
            🌱
          </div>
          <h3 className="text-lg font-extrabold text-emerald-950">Không tìm thấy hạt giống phù hợp</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Thử tìm kiếm với từ khóa khác hoặc bấm nút bên dưới để chọn lại tất cả danh mục.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md"
          >
            Xem tất cả hạt giống
          </button>
        </div>
      )}

      {/* 4. Planting & Growing Quick Tips Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-6 md:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-emerald-800 pb-3">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-extrabold text-amber-300">
            Kỹ Thuật 🎯 4 Bước Ươm Mầm Hạt Giống Hoa &amp; Rau Đạt Tỷ Lệ 99%
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-1">
            <span className="text-amber-300 font-black text-sm block">Bước 1: Ngâm ủ hạt</span>
            <p className="text-emerald-100">Ngâm hạt trong nước ấm (2 sôi 3 lạnh) từ 4-6 tiếng trước khi gieo để kích hoạt mầm.</p>
          </div>

          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-1">
            <span className="text-amber-300 font-black text-sm block">Bước 2: Đất gieo trồng</span>
            <p className="text-emerald-100">Dùng giá thể xơ dừa tơi xốp trộn mụn dừa &amp; phân trùn hạ thổ để hạt dễ đâm chồi.</p>
          </div>

          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-1">
            <span className="text-amber-300 font-black text-sm block">Bước 3: Tưới phun sương</span>
            <p className="text-emerald-100">Dùng bình xịt phun sương tưới giữ ẩm 2 lần/ngày (sáng sớm và chiều mát).</p>
          </div>

          <div className="bg-emerald-800/60 p-4 rounded-2xl border border-emerald-700/60 space-y-1">
            <span className="text-amber-300 font-black text-sm block">Bước 4: Đón ánh nắng</span>
            <p className="text-emerald-100">Khi cây ra 2-4 lá thật, chuyển dần chậu ra nơi có nhiều ánh nắng ban mai rực rỡ.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
