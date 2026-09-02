import React from 'react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link> / <span>Chính sách đổi trả</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-card space-y-4 text-xs md:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-extrabold text-emerald-950 border-b border-emerald-100 pb-3">
          Chính Sách Đổi Trả &amp; Bồi Thường Hạt
        </h1>
        <p>
          Hạt Giống Nhà Vườn cam kết bảo hành và đổi mới 1:1 hoặc hoàn tiền cho khách hàng nếu gói hạt bị hư hỏng, rách bao bì hoặc không đúng mã chủng loại đặt mua.
        </p>
      </div>
    </div>
  );
}
