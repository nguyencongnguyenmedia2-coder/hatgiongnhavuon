import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hạt Giống Nhà Vườn - Hạt Giống Hoa, Rau, Cây Ăn Trái',
  description: 'Chuyên cung cấp hạt giống hoa rực rỡ, hạt giống rau sạch f1, cây ăn trái chậu lùn. Dễ trồng tại nhà, tỷ lệ nảy mầm siêu cao.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
