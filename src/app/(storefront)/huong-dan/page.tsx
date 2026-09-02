'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoredBlogs } from '@/lib/blogStore';
import { BlogPost } from '@/types';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    setBlogs(getStoredBlogs().filter((b) => b.published));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-emerald-950 text-white p-6 md:p-8 rounded-3xl shadow-md border border-emerald-800">
        <nav className="text-xs text-emerald-300 mb-2">
          <Link href="/" className="hover:underline">Trang chủ</Link> / <span>Hướng dẫn</span>
        </nav>
        <h1 className="text-2xl md:text-4xl font-black text-amber-300 flex items-center gap-3">
          <BookOpen className="w-8 h-8" />
          <span>Cẩm Nang Gieo Trồng &amp; Mẹo Làm Vườn</span>
        </h1>
        <p className="text-xs md:text-sm text-emerald-100 mt-2 max-w-2xl font-medium">
          Chia sẻ chi tiết kỹ thuật ươm mầm, chuẩn bị đất trồng và chăm sóc hoa rau cho người mới bắt đầu.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/huong-dan/${blog.slug}`}
            className="group bg-white rounded-3xl border border-emerald-100/90 overflow-hidden shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video bg-gray-50" style={{ position: 'relative' }}>
              <Image
                src={blog.featured_image || 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Kỹ Thuật Gieo Trồng
              </span>
              <h2 className="font-extrabold text-emerald-950 text-lg group-hover:text-emerald-700 transition-colors">
                {blog.title}
              </h2>
              <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{blog.excerpt}</p>
              <div className="pt-2 flex items-center gap-1 text-xs font-black text-emerald-800">
                <span>Đọc chi tiết bài viết</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
