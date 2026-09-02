import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Combo Hạt Giống Tiết Kiệm 20% - 35% | Hạt Giống Nhà Vườn',
  description: 'Bộ sưu tập combo hạt giống hoa, rau sạch trọn gói. Tiết kiệm chi phí, hướng dẫn kỹ thuật ươm mầm đầy đủ.',
};

export default function ComboPage() {
  const comboProducts = DEMO_PRODUCTS.filter(
    (p) => (p.category_id === 'cat-5' || p.sku.includes('COMBO') || p.name.includes('Combo')) && p.is_active
  );

  return (
    <CategoryCatalog
      title="🎁 Combo Hạt Giống Tiết Kiệm 20% - 35%"
      subtitle="Bộ sưu tập hạt giống hoa và rau sạch tổng hợp được thiết kế đặc biệt cho người mới bắt đầu làm vườn. Tiết kiệm chi phí, miễn phí ship và tặng đầy đủ hướng dẫn gieo trồng!"
      categorySlug="combo"
      products={comboProducts.length > 0 ? comboProducts : DEMO_PRODUCTS.slice(0, 4)}
      bannerGradient="from-amber-950 via-amber-900 to-amber-950"
      subTypeTags={['Tất cả', 'Combo Hoa', 'Combo Rau Sạch', 'Combo Ban Công', 'Bộ Khởi Đầu']}
    />
  );
}
