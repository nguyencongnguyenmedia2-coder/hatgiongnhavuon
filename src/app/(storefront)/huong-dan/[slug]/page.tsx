import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { DEMO_BLOGS } from '@/lib/demoData';
import { Metadata } from 'next';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

import DynamicBlogDetail from '@/components/blog/DynamicBlogDetail';

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = DEMO_BLOGS.find((b) => b.slug === slug);
  if (!blog) return { title: 'Mẹo Làm Vườn | Hạt Giống Nhà Vườn' };
  return {
    title: `${blog.title} | Hạt Giống Nhà Vườn`,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  const { slug } = await params;
  const blog = DEMO_BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return <DynamicBlogDetail slug={slug} />;
  }

  // Article JSON-LD Schema according to requirement 53
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    image: blog.featured_image,
    author: {
      '@type': 'Organization',
      name: blog.author || 'Hạt Giống Nhà Vườn',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hạt Giống Nhà Vườn',
    },
    description: blog.excerpt,
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

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
          <span>Tác giả: {blog.author}</span>
          <span>•</span>
          <span>Chuyên mục: Kỹ thuật gieo trồng</span>
        </div>
      </div>

      {blog.featured_image && (
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-card border border-emerald-100" style={{ position: 'relative' }}>
          <Image src={blog.featured_image} alt={blog.title} fill className="object-cover" />
        </div>
      )}

      <div
        className="prose prose-emerald max-w-none text-sm md:text-base leading-relaxed text-gray-700 space-y-4"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}
