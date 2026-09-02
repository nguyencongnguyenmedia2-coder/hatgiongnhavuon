import React from 'react';
import CategoryCatalog from '@/components/storefront/CategoryCatalog';
import { DEMO_PRODUCTS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hạt Giống Cây Ăn Trái Chậu Lùn Sai Quả | Dâu Tây, Cà Chua, Dưa Lưới',
  description: 'Hạt giống dâu tây ngọc bích, cà chua bi lùn, dưa lưới hoàng kim, chanh dây tím chậu lùn. Sai quả mọng ngọt, thích hợp sân thượng & ban công.',
  openGraph: {
    title: 'Hạt Giống Cây Ăn Trái Chậu Lùn Sai Quả | Dâu Tây, Cà Chua, Dưa Lưới',
    description: 'Hạt giống dâu tây ngọc bích, cà chua bi lùn, dưa lưới hoàng kim, chanh dây tím chậu lùn. Sai quả mọng ngọt.',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Cây Ăn Trái Chậu Lùn' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hạt Giống Cây Ăn Trái Chậu Lùn Sai Quả',
    description: 'Hạt giống dâu tây ngọc bích, cà chua bi lùn, dưa lưới hoàng kim chậu lùn.',
    images: ['/logo.png'],
  },
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
