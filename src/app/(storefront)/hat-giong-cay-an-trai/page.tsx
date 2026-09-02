import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hạt Giống Cây Ăn Trái Chậu Lùn Sai Quả | Hạt Giống Nhà Vườn',
  description: 'Chuyên cung cấp hạt giống dâu tây, cà chua bi, dưa lưới, chanh dây chậu lùn. Thích hợp ban công & sân thượng.',
};

export default function FruitCategoryPage() {
  const fruitProducts = DEMO_PRODUCTS.filter(
    (p) => (p.category_id === 'cat-3' || p.category_name?.includes('Trái') || p.slug.includes('trai')) && p.is_active
  );

  return (
    <CategoryCatalog
      title="🍓 Hạt Giống Cây Ăn Trái Chậu Lùn"
      subtitle="Các dòng cây ăn trái lùn cao cấp chuyên trồng chậu, năng suất vượt trội, quả mọng ngọt lịm. Cực kỳ thích hợp trồng trang trí ban công và sân thượng nhà phố."
      categorySlug="hat-giong-cay-an-trai"
      products={fruitProducts.length > 0 ? fruitProducts : DEMO_PRODUCTS.slice(0, 4)}
      bannerGradient="from-amber-950 via-yellow-950 to-orange-950"
      subTypeTags={['Tất cả', 'Dâu Tây', 'Cà Chua Bi', 'Dưa Lưới', 'Chanh Dây', 'Đu Đủ Lùn']}
    />
  );
}
