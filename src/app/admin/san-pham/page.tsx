'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, RefreshCw, Search } from 'lucide-react';
import { getStoredProducts, deleteProductFromStore, saveProductToStore } from '@/lib/productStore';
import { Product } from '@/types';

export default function AdminProductListPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    setProducts(getStoredProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  );

  const toggleActive = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      const updated = { ...target, is_active: !target.is_active };
      saveProductToStore(updated);
      loadProducts();
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" không?`)) {
      deleteProductFromStore(id);
      loadProducts();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950">Quản Lý Sản Phẩm Hạt Giống</h1>
          <p className="text-xs text-gray-500">Danh sách sản phẩm hoa, rau, cây ăn trái hiển thị trên trang web.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadProducts}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-emerald-950 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tải lại</span>
          </button>

          <Link
            href="/admin/san-pham/them"
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>Thêm Sản Phẩm Mới</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card flex items-center justify-between">
        <div className="relative w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm, mã SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>
        <span className="text-xs font-extrabold text-emerald-900">
          Tổng cộng: {filtered.length} sản phẩm
        </span>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3 px-4">Ảnh &amp; Tên sản phẩm</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Danh mục</th>
                <th className="py-3 px-4">Giá bán</th>
                <th className="py-3 px-4">Tồn kho</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((product) => {
                const img =
                  product.images && product.images.length > 0
                    ? product.images[0].image_url
                    : 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=200&q=80';

                return (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-200" style={{ position: 'relative' }}>
                          <Image src={img} alt={product.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-extrabold text-emerald-950 text-xs">{product.name}</p>
                          <span className="text-[10px] text-gray-400">{product.germination_rate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-gray-600 font-bold">{product.sku}</td>

                    <td className="py-3 px-4 font-semibold text-emerald-800">
                      {product.category_name || product.seed_type || 'Hạt giống'}
                    </td>

                    <td className="py-3 px-4 font-bold text-emerald-950">
                      {product.price.toLocaleString('vi-VN')}đ
                    </td>

                    <td className="py-3 px-4 font-bold">
                      <span className={product.stock <= 10 ? 'text-amber-600' : 'text-emerald-800'}>
                        {product.stock} gói
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          product.is_active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {product.is_active ? 'Đang hiện' : 'Đã ẩn'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right space-x-1">
                      <Link
                        href={`/san-pham/${product.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-700 inline-block"
                        title="Xem trên website"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 inline-block"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
