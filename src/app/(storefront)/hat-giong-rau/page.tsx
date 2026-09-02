import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hạt Giống Rau Sạch Hữu Cơ F1 | Thu Hoạch Nhanh Sau 20-30 Ngày',
  description: 'Hạt giống rau cải ngọt, rau muống lá tre, cà chua bi, xà lách nhún. Thu hoạch siêu nhanh, an toàn hữu cơ cho sức khỏe gia đình.',
  openGraph: {
    title: 'Hạt Giống Rau Sạch Hữu Cơ F1 | Thu Hoạch Nhanh Sau 20-30 Ngày',
    description: 'Hạt giống rau cải ngọt, rau muống lá tre, cà chua bi, xà lách nhún. Thu hoạch siêu nhanh, an toàn hữu cơ cho sức khỏe gia đình.',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Hạt Giống Rau Sạch F1' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hạt Giống Rau Sạch Hữu Cơ F1 Thu Hoạch Nhanh',
    description: 'Hạt giống rau cải ngọt, rau muống lá tre, cà chua bi, xà lách nhún F1.',
    images: ['/logo.png'],
  },
};

export default function VegCategoryPage() {
  const vegProducts = DEMO_PRODUCTS.filter(
    (p) => (p.category_id === 'cat-2' || p.category_name?.includes('Rau') || p.slug.includes('rau')) && p.is_active
  );

  return (
    <CategoryCatalog
      title="🥬 Hạt Giống Rau Sạch Thu Hoạch Nhanh"
      subtitle="Tự tay trồng vườn rau hữu cơ xanh mát an toàn tuyệt đối cho cả gia đình. Thời gian thu hoạch cực nhanh chỉ từ 20 đến 30 ngày gieo trồng!"
      categorySlug="hat-giong-rau"
      products={vegProducts}
      bannerGradient="from-emerald-950 via-green-900 to-emerald-950"
      subTypeTags={['Tất cả', 'Rau Cải', 'Rau Muống', 'Cà Chua', 'Xà Lách', 'Rau Gia Vị']}
    />
  );
}
