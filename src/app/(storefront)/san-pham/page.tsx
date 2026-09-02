import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tất Cả Hạt Giống Hoa, Rau, Cây Ăn Trái | Hạt Giống Nhà Vườn',
  description: 'Tổng hợp danh mục hạt giống hoa, rau sạch F1, cây ăn trái chậu lùn thuần thục. Tỷ lệ nảy mầm >90%, hướng dẫn gieo trồng chi tiết.',
};

export default function ProductCatalogPage() {
  return (
    <CategoryCatalog
      title="🌿 Tất Cả Hạt Giống Nhà Vườn"
      subtitle="Khám phá toàn bộ hạt giống hoa rực rỡ, hạt giống rau hữu cơ F1 và cây ăn trái chậu lùn cao cấp. Đảm bảo tỷ lệ nảy mầm trên 90% kèm tài liệu hướng dẫn kỹ thuật gieo trồng."
      categorySlug="san-pham"
      products={DEMO_PRODUCTS.filter((p) => p.is_active)}
      bannerGradient="from-emerald-950 via-teal-950 to-emerald-950"
      subTypeTags={['Tất cả', 'Hoa Cúc', 'Hoa Hồng', 'Hướng Dương', 'Rau Cải', 'Rau Muống', 'Cà Chua', 'Dâu Tây']}
    />
  );
}
