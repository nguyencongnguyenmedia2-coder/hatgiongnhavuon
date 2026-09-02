'use client';

import React, { useState, useEffect } from 'react';
import { Boxes, AlertTriangle, Search, Save, Plus, Minus, RefreshCw } from 'lucide-react';
import { getStoredProducts, saveProductToStore } from '@/lib/productStore';
import { Product } from '@/types';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [editingStock, setEditingStock] = useState<{ [id: string]: number }>({});
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  const loadProducts = () => {
    const list = getStoredProducts();
    setProducts(list);
    const stockMap: { [id: string]: number } = {};
    list.forEach((p) => {
      stockMap[p.id] = p.stock;
    });
    setEditingStock(stockMap);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleStockChange = (id: string, value: number) => {
    setEditingStock((prev) => ({
      ...prev,
      [id]: Math.max(0, value),
    }));
  };

  const handleSaveStock = (product: Product) => {
    const newStock = editingStock[product.id] ?? product.stock;
    const updated = { ...product, stock: newStock };
    saveProductToStore(updated);
    loadProducts();
    setSavedSuccess(product.id);
    setTimeout(() => setSavedSuccess(null), 1500);
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Boxes className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Tồn Kho Hạt Giống ({products.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Theo dõi số lượng hạt giống trong kho, cập nhật nhập/xuất kho trực tiếp.</p>
        </div>

        <button
          onClick={loadProducts}
          className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-emerald-950 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tải lại tồn kho</span>
        </button>
      </div>

      {/* Search Bar */}
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
          Tổng cộng: {filtered.length} hạt giống
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Tên hạt giống</th>
                <th className="py-3.5 px-4">Mã SKU</th>
                <th className="py-3.5 px-4">Tồn kho khả dụng (Gói)</th>
                <th className="py-3.5 px-4">Ngưỡng cảnh báo</th>
                <th className="py-3.5 px-4">Trạng thái kho</th>
                <th className="py-3.5 px-4 text-right">Cập nhật tồn kho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => {
                const currentVal = editingStock[p.id] ?? p.stock;
                const isLow = currentVal <= (p.low_stock_threshold || 10);
                const isSaved = savedSuccess === p.id;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="py-3.5 px-4 font-extrabold text-emerald-950">{p.name}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-600">{p.sku}</td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-emerald-200 rounded-xl bg-emerald-50/60 p-0.5">
                          <button
                            onClick={() => handleStockChange(p.id, currentVal - 10)}
                            className="px-1.5 py-0.5 text-xs font-black text-emerald-800 hover:bg-emerald-200/60 rounded-lg"
                            title="-10 gói"
                          >
                            -10
                          </button>
                          <input
                            type="number"
                            value={currentVal}
                            onChange={(e) => handleStockChange(p.id, Number(e.target.value))}
                            className="w-16 text-center font-black text-xs text-emerald-950 bg-white border border-emerald-300 rounded-lg py-1 focus:outline-none"
                          />
                          <button
                            onClick={() => handleStockChange(p.id, currentVal + 10)}
                            className="px-1.5 py-0.5 text-xs font-black text-emerald-800 hover:bg-emerald-200/60 rounded-lg"
                            title="+10 gói"
                          >
                            +10
                          </button>
                        </div>
                        <span className="font-bold text-gray-500">gói</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500 font-bold">{p.low_stock_threshold || 10} gói</td>

                    <td className="py-3.5 px-4">
                      {currentVal <= 0 ? (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-black text-[10px]">
                          🔴 HẾT KHO
                        </span>
                      ) : isLow ? (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[10px] flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3 text-amber-600" /> SẮP HẾT (≤10)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                          🟢 ĐỦ KHO
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleSaveStock(p)}
                        className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all shadow-xs flex items-center gap-1 ml-auto ${
                          isSaved
                            ? 'bg-green-600 text-white'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                        }`}
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>{isSaved ? 'Đã lưu kho!' : 'LƯU KHO'}</span>
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
