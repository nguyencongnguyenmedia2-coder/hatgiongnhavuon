import React from 'react';
import Link from 'next/link';
import { DEFAULT_SITE_SETTINGS } from '@/lib/demoData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới Thiệu Thương Hiệu | Hạt Giống Nhà Vườn Chuẩn Thuần',
  description: 'Hạt Giống Nhà Vườn tự hào là đơn vị uy tín cung cấp hạt giống hoa, rau hữu cơ F1 và cây ăn trái chậu lùn chất lượng hàng đầu Việt Nam.',
  openGraph: {
    title: 'Giới Thiệu Thương Hiệu | Hạt Giống Nhà Vườn Chuẩn Thuần',
    description: 'Hạt Giống Nhà Vườn tự hào là đơn vị uy tín cung cấp hạt giống hoa, rau hữu cơ F1 và cây ăn trái chậu lùn.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Về Hạt Giống Nhà Vườn' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giới Thiệu Thương Hiệu Hạt Giống Nhà Vườn',
    description: 'Đơn vị uy tín cung cấp hạt giống hoa, rau sạch F1 và cây ăn trái chậu lùn.',
    images: ['/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link> / <span>Giới thiệu</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-card space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center text-2xl font-bold">
            🌿
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-emerald-950">Về Hạt Giống Nhà Vườn</h1>
            <p className="text-xs text-amber-600 font-bold">ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI</p>
          </div>
        </div>

        <div className="prose prose-emerald max-w-none text-xs md:text-sm text-gray-700 space-y-4 leading-relaxed">
          <p>
            Chào mừng bạn đến với <strong>Hạt Giống Nhà Vườn</strong> - thương hiệu chuyên phân phối các chủng loại hạt giống hoa rực rỡ, hạt giống rau sạch hữu cơ F1 và các giống cây ăn trái chậu lùn sai quả.
          </p>

          <h2 className="text-lg font-bold text-emerald-900 pt-2">Sứ mệnh của chúng tôi</h2>
          <p>
            Chúng tôi tin rằng tự tay gieo trồng một chậu hoa tươi thắm hay thu hoạch một lứa rau sạch cho gia đình là niềm vui thuần khiết nhất. Hạt Giống Nhà Vườn luôn nỗ lực tuyển chọn các dòng hạt giống thuần chủng, tỷ lệ nảy mầm cao vượt trội và cung cấp cẩm nang hướng dẫn kỹ thuật gieo chi tiết nhất.
          </p>

          <h2 className="text-lg font-bold text-emerald-900 pt-2">Cam kết chất lượng</h2>
          <ul className="list-disc pl-5 space-y-1 font-medium">
            <li>Tỷ lệ nảy mầm cam kết đạt trên 90%.</li>
            <li>Hạt giống F1 đóng gói chuẩn bảo quản, không ẩm mốc.</li>
            <li>Hỗ trợ tư vấn kỹ thuật gieo 24/7 qua Zalo &amp; Messenger.</li>
            <li>Giao hàng tận nơi toàn quốc - Kiểm tra hàng trước khi thanh toán COD.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
