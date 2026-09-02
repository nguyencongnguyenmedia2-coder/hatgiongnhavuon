'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Eye, RefreshCw, Search, X, Save, Upload, Flame, Sparkles, Filter, Wand2 } from 'lucide-react';
import { getStoredProducts, deleteProductFromStore, saveProductToStore } from '@/lib/productStore';
import { generateProductAiContent } from '@/lib/aiContentGenerator';
import { Product } from '@/types';

export default function AdminProductListPage() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'best_seller' | 'is_new' | 'hidden'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState('cat-1');
  const [price, setPrice] = useState('35000');
  const [comparePrice, setComparePrice] = useState('50000');
  const [stock, setStock] = useState('100');
  const [germinationRate, setGerminationRate] = useState('≥ 90%');
  const [imageUrl, setImageUrl] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [bestSeller, setBestSeller] = useState(true);
  const [isNew, setIsNew] = useState(false);
  const [generatingAi, setGeneratingAi] = useState(false);

  const handleGenerateAiContent = () => {
    if (!name.trim()) {
      alert('Vui lòng nhập Tên sản phẩm trước khi cho AI tự viết mô tả!');
      return;
    }

    setGeneratingAi(true);
    let categoryName = 'Hạt Giống Hoa';
    if (categoryId === 'cat-2') categoryName = 'Hạt Giống Rau';
    if (categoryId === 'cat-3') categoryName = 'Hạt Giống Cây Ăn Trái';
    if (categoryId === 'cat-5') categoryName = 'Combo Hạt Giống';

    setTimeout(() => {
      const generated = generateProductAiContent(name, categoryName);
      setShortDesc(generated.shortDescription);
      setDescription(generated.detailedDescription);
      setGeneratingAi(false);
    }, 500);
  };

  const loadProducts = () => {
    setProducts(getStoredProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setSku(`HNV-${Date.now().toString().slice(-6)}`);
    setCategoryId('cat-1');
    setPrice('35000');
    setComparePrice('50000');
    setStock('100');
    setGerminationRate('≥ 90%');
    setImageUrl('https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80');
    setShortDesc('Hạt giống chuẩn F1 nảy mầm cao, dễ trồng tại nhà.');
    setDescription('Hạt giống chất lượng cao, đóng gói chuẩn bảo quản, cho hoa rau phát triển rực rỡ.');
    setIsActive(true);
    setBestSeller(true);
    setIsNew(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setSku(product.sku);
    setCategoryId(product.category_id || 'cat-1');
    setPrice(product.price.toString());
    setComparePrice((product.compare_price || 0).toString());
    setStock(product.stock.toString());
    setGerminationRate(product.germination_rate || '≥ 90%');
    
    const primaryImg = product.images && product.images.length > 0 ? product.images[0].image_url : '';
    setImageUrl(primaryImg);
    setShortDesc(product.short_description || '');
    setDescription(product.description || '');
    setIsActive(product.is_active);
    setBestSeller(Boolean(product.best_seller));
    setIsNew(Boolean(product.is_new));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    let categoryName = 'Hạt Giống Hoa';
    if (categoryId === 'cat-2') categoryName = 'Hạt Giống Rau';
    if (categoryId === 'cat-3') categoryName = 'Hạt Giống Cây Ăn Trái';
    if (categoryId === 'cat-5') categoryName = 'Combo Hạt Giống';

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: name.trim(),
      slug: editingProduct
        ? editingProduct.slug
        : name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[đĐ]/g, 'd')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-'),
      sku: sku.trim() || `HNV-${Date.now().toString().slice(-6)}`,
      category_id: categoryId,
      category_name: categoryName,
      price: Number(price) || 35000,
      compare_price: Number(comparePrice) || 0,
      stock: Number(stock) || 0,
      germination_rate: germinationRate.trim() || '≥ 90%',
      short_description: shortDesc.trim(),
      description: description.trim(),
      is_active: isActive,
      best_seller: bestSeller,
      is_new: isNew,
      images: [
        {
          id: `img-${Date.now()}`,
          product_id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
          image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
          is_primary: true,
          sort_order: 1,
        },
      ],
    };

    saveProductToStore(productData);
    loadProducts();
    setIsModalOpen(false);
  };

  const filtered = products.filter((p) => {
    // Text search
    const matchesSearch =
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase());
    if (!matchesSearch) return false;

    // Filter tab
    if (filterType === 'best_seller') return Boolean(p.best_seller);
    if (filterType === 'is_new') return Boolean(p.is_new);
    if (filterType === 'hidden') return !p.is_active;

    return true;
  });

  const toggleActive = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      const updated = { ...target, is_active: !target.is_active };
      saveProductToStore(updated);
      loadProducts();
    }
  };

  const toggleBestSeller = (id: string) => {
    const target = products.find((p) => p.id === id);
    if (target) {
      const updated = { ...target, best_seller: !target.best_seller };
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

  // Local Image File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const bestSellerCount = products.filter((p) => p.best_seller).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <span>Quản Lý Sản Phẩm Hạt Giống</span>
            <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold">
              🔥 {bestSellerCount} Bán Chạy
            </span>
          </h1>
          <p className="text-xs text-gray-500">
            Quản lý danh sách hạt giống, bật/tắt nhãn 🔥 <strong>Bán Chạy Nhất (Best Seller)</strong> hiển thị nổi bật trên website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadProducts}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 text-emerald-950 font-bold text-xs hover:bg-emerald-50 flex items-center gap-1.5 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tải lại</span>
          </button>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>+ Thêm Sản Phẩm Mới</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm, mã SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-medium"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              filterType === 'all'
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Tất cả ({products.length})
          </button>

          <button
            onClick={() => setFilterType('best_seller')}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
              filterType === 'best_seller'
                ? 'bg-amber-500 text-emerald-950 border-amber-500 font-extrabold shadow-xs'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
            <span>🔥 Bán Chạy Nhất ({bestSellerCount})</span>
          </button>

          <button
            onClick={() => setFilterType('is_new')}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
              filterType === 'is_new'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Sản Phẩm Mới</span>
          </button>

          <button
            onClick={() => setFilterType('hidden')}
            className={`px-3 py-1.5 rounded-xl border transition-all ${
              filterType === 'hidden'
                ? 'bg-gray-700 text-white border-gray-700 shadow-xs'
                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
            }`}
          >
            🔴 Đã Ẩn
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Ảnh &amp; Tên sản phẩm</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Giá bán</th>
                <th className="py-3.5 px-4">Bán Chạy (Best-Seller)</th>
                <th className="py-3.5 px-4">Tồn kho</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
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
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-200" style={{ position: 'relative' }}>
                          <Image src={img} alt={product.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-extrabold text-emerald-950 text-xs flex items-center gap-1.5">
                            <span>{product.name}</span>
                            {product.best_seller && (
                              <span className="bg-amber-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.2 rounded-md shadow-2xs">
                                HOT
                              </span>
                            )}
                          </p>
                          <span className="text-[10px] text-gray-400">{product.germination_rate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-gray-600 font-bold">{product.sku}</td>

                    <td className="py-3.5 px-4 font-semibold text-emerald-800">
                      {product.category_name || product.seed_type || 'Hạt giống'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-950">
                      {product.price.toLocaleString('vi-VN')}đ
                    </td>

                    {/* Best Seller Quick Toggle Button */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleBestSeller(product.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black transition-all flex items-center gap-1 border ${
                          product.best_seller
                            ? 'bg-amber-400 text-emerald-950 border-amber-400 shadow-2xs scale-105'
                            : 'bg-gray-50 text-gray-400 border-gray-200 hover:border-amber-300'
                        }`}
                        title="Bấm để bật/tắt nhãn Sản Phẩm Bán Chạy Nhất"
                      >
                        <Flame className={`w-3 h-3 ${product.best_seller ? 'fill-emerald-950 text-emerald-950' : 'text-gray-400'}`} />
                        <span>{product.best_seller ? '🔥 BÁN CHẠY' : '⚪ Bình Thường'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 font-bold">
                      <span className={product.stock <= 10 ? 'text-amber-600' : 'text-emerald-800'}>
                        {product.stock} gói
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          product.is_active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {product.is_active ? '🟢 Đang hiện' : '🔴 Đã ẩn'}
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1">
                      <Link
                        href={`/san-pham/${product.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl text-gray-500 hover:text-emerald-700 inline-block"
                        title="Xem trên website"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 rounded-xl text-emerald-700 hover:bg-emerald-50 inline-block font-bold transition-colors"
                        title="Chỉnh sửa sản phẩm"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 inline-block font-bold transition-colors"
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

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-4 border border-emerald-100 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <Edit className="w-5 h-5 text-emerald-700" />
                <span>{editingProduct ? 'Chỉnh Sửa Sản Phẩm Hạt Giống' : 'Thêm Sản Phẩm Hạt Giống Mới'}</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-emerald-950 mb-1">Tên sản phẩm hạt giống *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hạt Giống Hoa Cúc Mix Rực Rỡ..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-extrabold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Mã SKU *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Danh mục sản phẩm</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                  >
                    <option value="cat-1">🌸 Hạt Giống Hoa</option>
                    <option value="cat-2">🥬 Hạt Giống Rau</option>
                    <option value="cat-3">🍓 Hạt Giống Cây Ăn Trái</option>
                    <option value="cat-5">🎁 Combo Hạt Giống</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Giá bán (VNĐ) *</label>
                  <input
                    type="number"
                    required
                    placeholder="35000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-black text-emerald-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Giá gốc (Gạch đi)</label>
                  <input
                    type="number"
                    placeholder="50000"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Tồn kho (Gói)</label>
                  <input
                    type="number"
                    required
                    placeholder="100"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>
              </div>

              {/* Best Seller & New Feature Toggles */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                <span className="font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                  <span>Cấu hình nổi bật &amp; Bán chạy trên Website:</span>
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-amber-200">
                    <input
                      type="checkbox"
                      checked={bestSeller}
                      onChange={(e) => setBestSeller(e.target.checked)}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                    <div>
                      <span className="font-extrabold text-amber-950 block text-xs">🔥 Bán Chạy Nhất (Best Seller)</span>
                      <span className="text-[10px] text-gray-500">Hiển thị huy hiệu 🔥 BÁN CHẠY ngoài website</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer bg-white p-2.5 rounded-xl border border-amber-200">
                    <input
                      type="checkbox"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                      className="w-4 h-4 accent-emerald-600 rounded"
                    />
                    <div>
                      <span className="font-extrabold text-emerald-950 block text-xs">✨ Sản Phẩm Mới (New Arrival)</span>
                      <span className="text-[10px] text-gray-500">Ưu tiên xếp đầu trong danh sách mới</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Tỷ lệ nảy mầm</label>
                  <input
                    type="text"
                    placeholder="≥ 90%"
                    value={germinationRate}
                    onChange={(e) => setGerminationRate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Trạng thái hiển thị</label>
                  <select
                    value={isActive ? 'true' : 'false'}
                    onChange={(e) => setIsActive(e.target.value === 'true')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                  >
                    <option value="true">🟢 Hiển thị trên website</option>
                    <option value="false">🔴 Ẩn sản phẩm</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Hình ảnh sản phẩm</label>
                <div className="flex items-center gap-3">
                  {imageUrl && (
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-emerald-200 shrink-0" style={{ position: 'relative' }}>
                      <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Dán đường dẫn ảnh URL..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none text-xs mb-1 font-mono"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg cursor-pointer border border-emerald-200 hover:bg-emerald-100 text-[11px]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Tải ảnh từ máy tính</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* AI Content Generator Assistant */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white flex items-center justify-between gap-3 shadow-md border border-purple-700">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-amber-300 text-xs flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-amber-300" />
                    <span>Trợ Lý AI Tự Động Viết Nội Dung Hạt Giống</span>
                  </span>
                  <p className="text-[10px] text-purple-200">
                    Tự động tạo Mô tả ngắn &amp; Kỹ thuật 4 bước gieo trồng chuẩn chuyên gia theo tên sản phẩm.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateAiContent}
                  disabled={generatingAi}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs rounded-xl shadow-md shrink-0 active:scale-95 transition-all disabled:opacity-50"
                >
                  {generatingAi ? '✨ AI Đang Viết...' : '🤖 AI TỰ VIẾT MÔ TẢ'}
                </button>
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt sản phẩm..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Mô tả chi tiết &amp; Kỹ thuật gieo</label>
                <textarea
                  rows={4}
                  placeholder="Nhập thông tin hướng dẫn gieo chi tiết..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-medium"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingProduct ? 'LƯU THAY ĐỔI' : 'THÊM SẢN PHẨM'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
