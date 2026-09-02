'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit, Trash2, X, Save, Eye, CheckCircle2, Upload } from 'lucide-react';
import Image from 'next/image';
import { Category } from '@/types';
import { getStoredCategories, saveCategoryToStore, deleteCategoryFromStore } from '@/lib/categoryStore';

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('1');
  const [isActive, setIsActive] = useState(true);

  const loadCategories = () => {
    setCategories(getStoredCategories());
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=400&q=80');
    setSortOrder((categories.length + 1).toString());
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setSlug(category.slug);
    setDescription(category.description || '');
    setImageUrl(category.image_url || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=400&q=80');
    setSortOrder((category.sort_order || 1).toString());
    setIsActive(category.is_active);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      const generatedSlug = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const categoryData: Category = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: name.trim(),
      slug: slug.trim() || `danh-muc-${Date.now()}`,
      description: description.trim(),
      image_url: imageUrl.trim(),
      sort_order: Number(sortOrder) || 1,
      is_active: isActive,
    };

    saveCategoryToStore(categoryData);
    loadCategories();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}" không?`)) {
      deleteCategoryFromStore(id);
      loadCategories();
    }
  };

  const toggleActive = (category: Category) => {
    const updated = { ...category, is_active: !category.is_active };
    saveCategoryToStore(updated);
    loadCategories();
  };

  // Local File Upload
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

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-emerald-950 flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Danh Mục Hạt Giống ({categories.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Tạo mới, chỉnh sửa và quản lý hiển thị các danh mục trên website.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>+ Thêm Danh Mục Mới</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Ảnh &amp; Tên danh mục</th>
                <th className="py-3.5 px-4">Slug URL</th>
                <th className="py-3.5 px-4">Mô tả</th>
                <th className="py-3.5 px-4">Thứ tự</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-extrabold text-emerald-950 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-emerald-50 shrink-0 border border-emerald-100" style={{ position: 'relative' }}>
                      <Image src={c.image_url || 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=200&q=80'} alt={c.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <span>{c.name}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-500 font-bold">{c.slug}</td>

                  <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate">{c.description || 'Chưa có mô tả'}</td>

                  <td className="py-3.5 px-4 font-black text-emerald-900">{c.sort_order || 1}</td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleActive(c)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        c.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {c.is_active ? '🟢 Đang hiện' : '🔴 Đã ẩn'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(c)}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold transition-colors"
                      title="Chỉnh sửa danh mục"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                      title="Xóa danh mục"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-5 border border-emerald-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                <span>{editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Hạt Giống Mới'}</span>
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
                <label className="block font-bold text-emerald-950 mb-1">Tên danh mục *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hạt Giống Hoa, Hạt Giống Rau..."
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Slug URL *</label>
                <input
                  type="text"
                  required
                  placeholder="hat-giong-hoa"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Ảnh đại diện danh mục</label>
                <div className="flex items-center gap-3">
                  {imageUrl && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-200 shrink-0" style={{ position: 'relative' }}>
                      <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Dán URL hình ảnh..."
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

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Mô tả ngắn</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả danh mục hạt giống..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Thứ tự hiển thị</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Trạng thái</label>
                  <select
                    value={isActive ? 'true' : 'false'}
                    onChange={(e) => setIsActive(e.target.value === 'true')}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                  >
                    <option value="true">Hiển thị (Active)</option>
                    <option value="false">Ẩn (Inactive)</option>
                  </select>
                </div>
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
                  <span>{editingCategory ? 'LƯU THAY ĐỔI' : 'TẠO DANH MỤC'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
