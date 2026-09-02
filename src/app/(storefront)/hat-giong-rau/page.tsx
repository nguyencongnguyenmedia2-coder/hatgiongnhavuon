import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hạt Giống Rau Sạch Thu Hoạch Nhanh | Hạt Giống Nhà Vườn',
  description: 'Cung cấp hạt giống rau cải ngọt, rau muống lá tre, cà chua bi, xà lách. Thu hoạch sau 20-30 ngày. Tỷ lệ nảy mầm >90%.',
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
