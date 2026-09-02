import React from 'react';
import Link from 'next/link';
import { DEFAULT_SITE_SETTINGS } from '@/lib/demoData';

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
            <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950">
              Về Hạt Giống Nhà Vườn
            </h1>
            <p className="text-xs font-bold text-amber-600">
              {DEFAULT_SITE_SETTINGS.slogan}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs md:text-sm text-gray-700 leading-relaxed">
          <p>
            <strong>Hạt Giống Nhà Vườn</strong> ra đời với sứ mệnh mang không gian xanh rực rỡ và những luống rau sạch tự tay trồng tới từng ban công, mái hiên và sân vườn của mỗi gia đình Việt Nam.
          </p>

          <h3 className="font-bold text-emerald-900 text-base">Tầm nhìn &amp; Giá trị cốt lõi</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Chất lượng hạt chuẩn:</strong> 100% hạt giống chọn lọc thuần thục, tỷ lệ nảy mầm cao &gt;90%.</li>
            <li><strong>Dễ trồng &amp; Chăm sóc:</strong> Phù hợp với điều kiện khí hậu nóng ẩm của Việt Nam.</li>
            <li><strong>Đồng hành tận tụy:</strong> Tư vấn kỹ thuật gieo ủ, chọn đất, phân bón miễn phí suốt quá trình cây lớn.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
