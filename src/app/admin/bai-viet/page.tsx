'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit, Trash2, X, Save, RefreshCw, Eye, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types';
import { getStoredBlogs, saveBlogToStore, deleteBlogFromStore } from '@/lib/blogStore';

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Kỹ sư Vườn Hoa');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(true);

  const loadBlogs = () => {
    setBlogs(getStoredBlogs());
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setAuthor('Kỹ sư Vườn Hoa');
    setImageUrl('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80');
    setPublished(true);
    setIsModalOpen(true);
  };

  const openEditModal = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content);
    setAuthor(blog.author || 'Kỹ sư Vườn Hoa');
    setImageUrl(blog.featured_image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80');
    setPublished(blog.published);
    setIsModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingBlog) {
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
    if (!title.trim()) return;

    const blogData: BlogPost = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim() || `bai-viet-${Date.now()}`,
      excerpt: excerpt.trim(),
      content: content.trim() || excerpt.trim(),
      author: author.trim(),
      featured_image: imageUrl.trim(),
      published: published,
      published_at: new Date().toISOString(),
    };

    saveBlogToStore(blogData);
    loadBlogs();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Bạn có chắc muốn xóa bài viết "${title}" không?`)) {
      deleteBlogFromStore(id);
      loadBlogs();
    }
  };

  const togglePublished = (blog: BlogPost) => {
    const updated = { ...blog, published: !blog.published };
    saveBlogToStore(updated);
    loadBlogs();
  };

  // Local Image Upload
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
            <FileText className="w-6 h-6 text-emerald-700" />
            <span>Quản Lý Bài Viết &amp; Hướng Dẫn ({blogs.length})</span>
          </h1>
          <p className="text-xs text-gray-500">Soạn thảo kỹ thuật ươm mầm, mẹo trồng cây &amp; hướng dẫn sân vườn.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadBlogs}
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
            <span>+ Viết Bài Hướng Dẫn Mới</span>
          </button>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="py-3.5 px-4">Ảnh &amp; Tiêu đề bài viết</th>
                <th className="py-3.5 px-4">Slug URL</th>
                <th className="py-3.5 px-4">Tác giả</th>
                <th className="py-3.5 px-4">Ngày đăng</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {blogs.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4 font-extrabold text-emerald-950 flex items-center gap-3">
                    <div className="relative w-12 h-10 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-200" style={{ position: 'relative' }}>
                      <Image src={b.featured_image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=200&q=80'} alt={b.title} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="font-extrabold text-emerald-950 line-clamp-1">{b.title}</p>
                      <p className="text-[10px] text-gray-400 font-normal line-clamp-1">{b.excerpt}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-gray-500 font-bold">{b.slug}</td>

                  <td className="py-3.5 px-4 text-gray-600 font-semibold">{b.author || 'Kỹ sư Vườn Hoa'}</td>

                  <td className="py-3.5 px-4 text-gray-500">
                    {new Date(b.published_at || Date.now()).toLocaleDateString('vi-VN')}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => togglePublished(b)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        b.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {b.published ? '🟢 Đã xuất bản' : '🔴 Bản nháp'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-1">
                    <Link
                      href={`/huong-dan/${b.slug}`}
                      target="_blank"
                      className="p-2 text-gray-500 hover:text-emerald-700 rounded-xl inline-block"
                      title="Xem trên trang web"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl font-bold transition-colors"
                      title="Chỉnh sửa bài viết"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.title)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                      title="Xóa bài viết"
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

      {/* Add / Edit Blog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 space-y-4 border border-emerald-100 my-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-lg font-black text-emerald-950 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <span>{editingBlog ? 'Chỉnh Sửa Bài Viết Hướng Dẫn' : 'Soạn Thảo Bài Viết Mới'}</span>
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
                <label className="block font-bold text-emerald-950 mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  placeholder="Kỹ Thuật Gieo Hạt Hoa Cúc Nảy Mầm 100%..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 font-extrabold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Slug URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="ky-thuat-gieo-hat-hoa-cuc"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-emerald-950 mb-1">Tác giả</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Ảnh đại diện bài viết</label>
                <div className="flex items-center gap-3">
                  {imageUrl && (
                    <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-emerald-200 shrink-0" style={{ position: 'relative' }}>
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
                <label className="block font-bold text-emerald-950 mb-1">Tóm tắt ngắn (Excerpt)</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt nội dung bài viết..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Nội dung chi tiết bài viết *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Nhập nội dung kỹ thuật gieo trồng chi tiết..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-medium leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-emerald-950 mb-1">Trạng thái xuất bản</label>
                <select
                  value={published ? 'true' : 'false'}
                  onChange={(e) => setPublished(e.target.value === 'true')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none font-bold bg-white"
                >
                  <option value="true">Xuất bản ngay (Published)</option>
                  <option value="false">Lưu bản nháp (Draft)</option>
                </select>
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
                  <span>{editingBlog ? 'LƯU BÀI VIẾT' : 'ĐĂNG BÀI VIẾT'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
