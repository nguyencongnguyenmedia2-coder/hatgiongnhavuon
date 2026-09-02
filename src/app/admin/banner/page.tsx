'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Plus, Edit, Trash2, X, Save, Upload, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { Banner } from '@/types';
import { getStoredBanners, saveBannerToStore, deleteBannerFromStore } from '@/lib/bannerStore';

export default function AdminBannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonText, setButtonText] = useState('XEM SẢN PHẨM');
  const [buttonUrl, setButtonUrl] = useState('/san-pham');
  const [sortOrder, setSortOrder] = useState('1');
  const [isActive, setIsActive] = useState(true);

  const loadBanners = () => {
    setBanners(getStoredBanners());
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const openAddModal = () => {
    setEditingBanner(null);
    setTitle('');
    setSubtitle('');
    setImageUrl('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1200&q=80');
    setButtonText('KHÁM PHÁ NGAY');
    setButtonUrl('/san-pham');
    setSortOrder((banners.length + 1).toString());
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || '');
    setImageUrl(banner.image_url);
    setButtonText(banner.button_text || 'XEM SẢN PHẨM');
    setButtonUrl(banner.button_url || '/san-pham');
    setSortOrder((banner.sort_order || 1).toString());
    setIsActive(banner.is_active);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const bannerData: Banner = {
      id: editingBanner ? editingBanner.id : `ban-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim(),
      image_url: imageUrl.trim(),
      button_text: buttonText.trim(),
      button_url: buttonUrl.trim(),
      sort_order: Number(sortOrder) || 1,
      is_active: isActive,
    };

    saveBannerToStore(bannerData);
    loadBanners();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa banner "${title}" không?`)) {
      deleteBannerFromStore(id);
      loadBanners();
    }
  };

  const toggleActive = (banner: Banner) => {
    const updated = { ...banner, is_active: !banner.is_active };
    saveBannerToStore(updated);
    loadBanners();
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
            <ImageIcon className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Banner Slider Hero ({banners.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Thay đổi hình ảnh, tiêu đề banner khuyến mãi nổi bật ở trang chủ.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadBanners}
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
            <span>+ Thêm Banner Mới</span>
          </button>
        </div>
      </div>

      {/* Banners Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Ảnh &amp; Tiêu đề Banner</th>
                <th className="py-3.5 px-4">Subtitle / Khẩu hiệu</th>
                <th className="py-3.5 px-4">Nút bấm CTA</th>
                <th className="py-3.5 px-4">Thứ tự</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {banners.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-extrabold text-emerald-950 flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-emerald-100" style={{ position: 'relative' }}>
                      <Image src={b.image_url} alt={b.title} fill sizes="64px" className="object-cover" />
                    </div>
                    <span>{b.title}</span>
                  </td>

                  <td className="py-3.5 px-4 text-emerald-800 font-bold">{b.subtitle}</td>

                  <td className="py-3.5 px-4 font-semibold text-gray-600">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 font-bold border border-amber-200">
                      {b.button_text} ({b.button_url})
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-black text-emerald-900">{b.sort_order || 1}</td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleActive(b)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        b.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {b.is_active ? '🟢 Đang hiện' : '🔴 Đã ẩn'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1">
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold transition-colors"
                      title="Chỉnh sửa banner"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.title)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                      title="Xóa banner"
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

      {/* Add / Edit Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 border border-emerald-100">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-700" />
                <span>{editingBanner ? 'Chỉnh Sửa Banner Hero' : 'Thêm Banner Hero Mới'}</span>
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
                <label className="block font-bold text-emerald-950 mb-1">Tiêu đề Banner *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Ươm Mầm Hôm Nay - Rực Rỡ Ngày Mai"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-extrabold"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Subtitle / Khẩu hiệu phụ</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hạt Giống Hoa F1 Chuẩn Thuần Chiết Khấu Đến 35%"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Hình ảnh Banner</label>
                <div className="flex items-center gap-3">
                  {imageUrl && (
                    <div className="relative w-16 h-10 rounded-xl overflow-hidden border border-emerald-200 shrink-0" style={{ position: 'relative' }}>
                      <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Dán URL hình ảnh banner..."
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Chữ trên nút (CTA)</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Đường dẫn nút (Link)</label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 focus:outline-none font-bold font-mono"
                  />
                </div>
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
                  <span>{editingBanner ? 'LƯU BANNER' : 'TẠO BANNER'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
