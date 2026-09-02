import React from 'react';
import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <nav className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
        <Link href="/" className="hover:underline">Trang chủ</Link> / <span>Chính sách giao hàng</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 md:p-10 border border-emerald-100 shadow-card space-y-4 text-xs md:text-sm text-gray-700 leading-relaxed">
        <h1 className="text-2xl font-extrabold text-emerald-950 border-b border-emerald-100 pb-3">
          Chính Sách Giao Hàng &amp; Vận Chuyển
        </h1>

        <h3 className="font-bold text-emerald-900 text-sm md:text-base">1. Phạm vi giao hàng</h3>
        <p>Hạt Giống Nhà Vườn hỗ trợ giao hàng tận nhà trên 63 tỉnh thành toàn quốc thông qua các đơn vị vận chuyển uy tín.</p>

        <h3 className="font-bold text-emerald-900 text-sm md:text-base">2. Phí vận chuyển</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Miễn phí vận chuyển:</strong> Áp dụng cho tất cả đơn hàng từ 300.000đ trở lên.</li>
          <li><strong>Phí cố định 30.000đ:</strong> Áp dụng cho các đơn hàng dưới 300.000đ toàn quốc.</li>
        </ul>

        <h3 className="font-bold text-emerald-900 text-sm md:text-base">3. Thời gian nhận hàng</h3>
        <p>Khu vực miền Trung &amp; lân cận: 1 - 2 ngày làm việc. Khu vực Hà Nội &amp; TP.HCM: 2 - 3 ngày làm việc.</p>

        <h3 className="font-bold text-emerald-900 text-sm md:text-base">4. Quyền kiểm tra hàng (COD)</h3>
        <p>Khách hàng được quyền mở gói hàng kiểm tra đúng loại hạt giống và quy cách trước khi thanh toán tiền mặt cho shipper.</p>
      </div>
    </div>
  );
}
