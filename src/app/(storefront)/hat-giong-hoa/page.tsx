import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hạt Giống Hoa Dễ Trồng, Rực Rỡ Vườn Nhà | Hạt Giống Nhà Vườn',
  description: 'Mua hạt giống hoa cúc mix, hoa hồng pháp, mười giờ thái, hướng dương lùn, cẩm chướng. Tỷ lệ nảy mầm >90%, hạt giống F1 chuẩn thuần.',
};

export default function FlowerCategoryPage() {
  const flowerProducts = DEMO_PRODUCTS.filter(
    (p) => (p.category_id === 'cat-1' || p.category_name?.includes('Hoa') || p.slug.includes('hoa')) && p.is_active
  );

  return (
    <CategoryCatalog
      title="🌸 Hạt Giống Hoa Rực Rỡ Vườn Nhà"
      subtitle="Bộ sưu tập hạt giống hoa F1 chất lượng cao. Hoa nở to rực rỡ, nhiều màu sắc, thời gian ra hoa kéo dài, cực kỳ dễ chăm sóc cho ban công và sân vườn."
      categorySlug="hat-giong-hoa"
      products={flowerProducts}
      bannerGradient="from-rose-950 via-pink-900 to-rose-950"
      subTypeTags={['Tất cả', 'Hoa Cúc', 'Hoa Hồng', 'Hướng Dương', 'Mười Giờ', 'Cẩm Chướng']}
    />
  );
}
