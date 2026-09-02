'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoredBlogs } from '@/lib/blogStore';
import { BlogPost } from '@/types';
import { BookOpen, ArrowLeft } from 'lucide-react';

interface DynamicBlogDetailProps {
  slug: string;
}

export default function DynamicBlogDetail({ slug }: DynamicBlogDetailProps) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredBlogs();
    const decoded = decodeURIComponent(slug);
    const found = stored.find((b) => b.slug === slug || b.slug === decoded || b.id === slug);
    if (found) {
      setBlog(found);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs font-bold text-emerald-950">Đang tải bài viết hướng dẫn...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center text-4xl mx-auto border border-rose-100">
          📖
        </div>
        <h1 className="text-2xl font-black text-emerald-950">Bài Viết Không Tồn Tại Hoặc Đã Bị Xóa</h1>
        <Link
          href="/huong-dan"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>QUAY LẠI CẨM NANG HƯỚNG DẪN</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link>
        <span>/</span>
        <Link href="/huong-dan" className="hover:underline">Hướng dẫn</Link>
        <span>/</span>
        <span className="text-gray-500 truncate">{blog.title}</span>
      </nav>

      <div className="space-y-3">
        <h1 className="text-2xl md:text-4xl font-extrabold text-emerald-950 leading-tight">
          {blog.title}
        </h1>
        <div className="text-xs text-emerald-800 font-semibold flex items-center gap-4">
          <span>Tác giả: {blog.author || 'Kỹ sư Vườn Hoa'}</span>
          <span>•</span>
          <span>Chuyên mục: Kỹ thuật gieo trồng</span>
        </div>
      </div>

      {blog.featured_image && (
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-card border border-emerald-100" style={{ position: 'relative' }}>
          <Image src={blog.featured_image} alt={blog.title} fill className="object-cover" />
        </div>
      )}

      <div className="prose prose-emerald max-w-none text-sm md:text-base leading-relaxed text-gray-700 space-y-4 whitespace-pre-line">
        {blog.content}
      </div>
    </article>
  );
}
