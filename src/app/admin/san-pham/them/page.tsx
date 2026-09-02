'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Upload, Trash2, Star, Plus, Link as LinkIcon, Sparkles } from 'lucide-react';
import { DEMO_CATEGORIES } from '@/lib/demoData';
import { saveProductToStore } from '@/lib/productStore';
import { Product } from '@/types';

const SAMPLE_PRESET_IMAGES = [
  { name: 'Hoa Cúc Mix', url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Rau Cải Ngọt', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cà Chua Bi', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hoa Hướng Dương', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80' },
  { name: 'Hoa Mười Giờ', url: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80' },
];

export default function AdminAddProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [sku, setSku] = useState('HNV-');
  const [price, setPrice] = useState('35000');
  const [comparePrice, setComparePrice] = useState('45000');
  const [stock, setStock] = useState('100');
  const [categoryId, setCategoryId] = useState('cat-1');
  const [germinationRate, setGerminationRate] = useState('≥ 90%');
  const [germinationDaysMin, setGerminationDaysMin] = useState('3');
  const [germinationDaysMax, setGerminationDaysMax] = useState('7');
  const [plantingSeason, setPlantingSeason] = useState('Quanh năm');
  const [difficulty, setDifficulty] = useState('Dễ trồng');
  const [packageQuantity, setPackageQuantity] = useState('0.5g (~100 hạt)');
  const [origin, setOrigin] = useState('Việt Nam');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');

  // Image Upload State
  const [images, setImages] = useState<Array<{ id: string; url: string; isPrimary: boolean }>>([
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80',
      isPrimary: true,
    },
  ]);

  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [saving, setSaving] = useState(false);

  // File Upload Handler (Local Machine)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setImages((prev) => [
              ...prev,
              {
                id: `upload-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                url: reader.result as string,
                isPrimary: prev.length === 0,
              },
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Add Custom URL
  const handleAddCustomUrl = () => {
    if (customUrlInput.trim()) {
      setImages((prev) => [
        ...prev,
        {
          id: `url-${Date.now()}`,
          url: customUrlInput.trim(),
          isPrimary: prev.length === 0,
        },
      ]);
      setCustomUrlInput('');
      setShowUrlInput(false);
    }
  };

  // Select Preset Sample Image
  const handleSelectPreset = (presetUrl: string) => {
    setImages((prev) => [
      ...prev,
      {
        id: `preset-${Date.now()}`,
        url: presetUrl,
        isPrimary: prev.length === 0,
      },
    ]);
  };

  // Set Primary Image
  const setPrimaryImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  // Remove Image
  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const generatedSlug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const selectedCategory = DEMO_CATEGORIES.find((c) => c.id === categoryId);

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      slug: generatedSlug || `san-pham-${Date.now()}`,
      sku: sku.trim() || `HNV-${Date.now()}`,
      price: Number(price) || 0,
      compare_price: comparePrice ? Number(comparePrice) : undefined,
      stock: Number(stock) || 0,
      category_id: categoryId,
      category_name: selectedCategory?.name || 'Hạt Giống Hoa',
      seed_type: selectedCategory?.name || 'Hạt giống',
      germination_rate: germinationRate,
      germination_days_min: Number(germinationDaysMin) || 3,
      germination_days_max: Number(germinationDaysMax) || 7,
      planting_season: plantingSeason,
      difficulty: difficulty,
      package_quantity: packageQuantity,
      origin: origin,
      short_description: shortDescription,
      description: description,
      featured: true,
      best_seller: false,
      is_new: true,
      is_active: true,
      images: images.map((img, idx) => ({
        id: img.id,
        product_id: `prod-${Date.now()}`,
        image_url: img.url,
        sort_order: idx,
        is_primary: img.isPrimary,
      })),
      created_at: new Date().toISOString(),
    };

    saveProductToStore(newProduct);

    setTimeout(() => {
      setSaving(false);
      router.push('/admin/san-pham');
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/san-pham" className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-emerald-950">Thêm Sản Phẩm Hạt Giống Mới</h1>
            <p className="text-xs text-gray-500">Tải ảnh sản phẩm từ máy tính, nhập thông số kỹ thuật &amp; giá cả.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic info */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2">
            1. Thông tin cơ bản
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Tên sản phẩm *</label>
              <input
                type="text"
                required
                placeholder="Hạt Giống Hoa Cúc Mix..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Mã SKU *</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Giá bán (VNĐ) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-xs font-bold text-emerald-900"
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Giá so sánh / Giá cũ</label>
              <input
                type="number"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Số lượng tồn kho *</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-emerald-950 mb-1">Danh mục *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 bg-white text-xs"
            >
              {DEMO_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* IMAGE UPLOAD SECTION */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <div>
              <h2 className="font-extrabold text-emerald-950 text-base">
                2. Tải ảnh sản phẩm lên
              </h2>
              <p className="text-[11px] text-gray-500">Tải từ máy tính hoặc chọn mẫu ảnh hạt giống sẵn có.</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
              {images.length} ảnh đã chọn
            </span>
          </div>

          {/* Drag & Drop File Upload Area */}
          <div className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-6 bg-emerald-50/40 text-center transition-all">
            <input
              type="file"
              accept="image/*"
              multiple
              id="file-upload"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <p className="font-extrabold text-emerald-950 text-sm">
                  Click để chọn ảnh từ máy tính hoặc Kéo thả ảnh vào đây
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Hỗ trợ định dạng PNG, JPG, WEBP, JPEG. Có thể chọn nhiều ảnh cùng lúc.
                </p>
              </div>
              <span className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm">
                <Plus className="w-4 h-4" />
                <span>TẢI ẢNH TỪ MÁY TÍNH</span>
              </span>
            </label>
          </div>

          {/* URL Input Toggle Option */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{showUrlInput} Nhập URL ảnh từ internet</span>
            </button>
          </div>

          {showUrlInput && (
            <div className="flex gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
              <input
                type="text"
                placeholder="Dán link đường dẫn ảnh (https://...)"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none bg-white"
              />
              <button
                type="button"
                onClick={handleAddCustomUrl}
                className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl"
              >
                Thêm ảnh
              </button>
            </div>
          )}

          {/* Preset Sample Seeds Picker */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Hoặc chọn nhanh ảnh mẫu hạt giống có sẵn:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset.url)}
                  className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-emerald-100 hover:text-emerald-900 border border-gray-200 text-xs font-semibold text-gray-700 transition-colors flex items-center gap-1.5"
                >
                  <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0" style={{ position: 'relative' }}>
                    <Image src={preset.url} alt={preset.name} fill sizes="16px" className="object-cover" />
                  </div>
                  <span>+ {preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Previews Gallery */}
          {images.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <span className="font-extrabold text-emerald-950 text-xs">
                Danh sách ảnh sản phẩm ({images.length}):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className={`relative rounded-2xl overflow-hidden border-2 shadow-sm transition-all group ${
                      img.isPrimary ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-gray-200'
                    }`}
                  >
                    <div className="relative aspect-square w-full bg-gray-50" style={{ position: 'relative' }}>
                      <Image src={img.url} alt="Ảnh sản phẩm" fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
                    </div>

                    {/* Image Status Badges */}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-10">
                      {img.isPrimary ? (
                        <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-300 stroke-amber-300" />
                          Ảnh chính
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(img.id)}
                          className="bg-black/60 hover:bg-emerald-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs transition-colors"
                        >
                          Đặt làm ảnh chính
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="p-1 rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow-xs transition-colors"
                        title="Xóa ảnh"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Seed Specs */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2">
            3. Thông số kỹ thuật hạt giống
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Tỷ lệ nảy mầm</label>
              <input
                type="text"
                value={germinationRate}
                onChange={(e) => setGerminationRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Thời gian mầm (Min - Max ngày)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={germinationDaysMin}
                  onChange={(e) => setGerminationDaysMin(e.target.value)}
                  className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <input
                  type="number"
                  value={germinationDaysMax}
                  onChange={(e) => setGerminationDaysMax(e.target.value)}
                  className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Thời vụ gieo trồng</label>
              <input
                type="text"
                value={plantingSeason}
                onChange={(e) => setPlantingSeason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-emerald-950 mb-1">Mức độ dễ trồng</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs"
              >
                <option value="Cực dễ">Cực dễ</option>
                <option value="Dễ trồng">Dễ trồng</option>
                <option value="Trung bình">Trung bình</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Quy cách đóng gói</label>
              <input
                type="text"
                value={packageQuantity}
                onChange={(e) => setPackageQuantity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-emerald-950 mb-1">Xuất xứ</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Content Descriptions */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-card space-y-4">
          <h2 className="font-extrabold text-emerald-950 text-base border-b border-gray-100 pb-2">
            4. Hướng dẫn gieo trồng &amp; Mô tả sản phẩm
          </h2>

          <div>
            <label className="block font-bold text-emerald-950 mb-1">Mô tả ngắn</label>
            <input
              type="text"
              placeholder="Hoa nở rực rỡ, thơm nhẹ, dễ chăm sóc tại nhà..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-950 mb-1">Mô tả chi tiết &amp; Hướng dẫn gieo trồng</label>
            <textarea
              rows={5}
              placeholder="1. Ngâm hạt 4-6 tiếng trong nước ấm... 2. Gieo vào khay ươm... 3. Tưới giữ ẩm hàng ngày..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs leading-relaxed"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
          >
            <Save className="w-5 h-5 text-amber-300" />
            <span>{saving ? 'ĐANG LƯU SẢN PHẨM...' : 'LƯU SẢN PHẨM MỚI'}</span>
          </button>
          <Link
            href="/admin/san-pham"
            className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-2xl transition-colors"
          >
            Hủy bỏ
          </Link>
        </div>
      </form>
    </div>
  );
}
