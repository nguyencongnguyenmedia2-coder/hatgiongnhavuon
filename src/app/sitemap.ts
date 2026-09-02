import { MetadataRoute } from 'next';
import { DEMO_PRODUCTS, DEMO_BLOGS } from '@/lib/demoData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hatgiongnhavuon.vn';

  const staticRoutes = [
    '',
    '/san-pham',
    '/hat-giong-hoa',
    '/hat-giong-rau',
    '/hat-giong-cay-an-trai',
    '/hat-giong-cay-canh',
    '/combo',
    '/khuyen-mai',
    '/huong-dan',
    '/gioi-thieu',
    '/lien-he',
    '/chinh-sach-giao-hang',
    '/chinh-sach-doi-tra',
    '/chinh-sach-bao-mat',
    '/dieu-khoan-su-dung',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const productRoutes = DEMO_PRODUCTS.map((p) => ({
    url: `${baseUrl}/san-pham/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const blogRoutes = DEMO_BLOGS.map((b) => ({
    url: `${baseUrl}/huong-dan/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
