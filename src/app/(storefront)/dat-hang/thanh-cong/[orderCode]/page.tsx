import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, MessageCircle, Home, ShoppingBag, PhoneCall, Copy } from 'lucide-react';
import { DEFAULT_SITE_SETTINGS } from '@/lib/demoData';
import { getMessengerConfirmationUrl } from '@/lib/messenger';
import { Metadata } from 'next';

interface OrderSuccessProps {
  params: Promise<{ orderCode: string }>;
}

export async function generateMetadata({ params }: OrderSuccessProps): Promise<Metadata> {
  const { orderCode } = await params;
  return {
    title: `Đặt Hàng Thành Công ${orderCode} | Hạt Giống Nhà Vườn`,
  };
}

export default async function OrderSuccessPage({ params }: OrderSuccessProps) {
  const { orderCode } = await params;
  const messengerUrl = getMessengerConfirmationUrl(orderCode, DEFAULT_SITE_SETTINGS.messenger_url);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-center">
      {/* Success Badge */}
      <div className="space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-950">
          ĐẶT HÀNG THÀNH CÔNG!
        </h1>
        <p className="text-xs md:text-sm text-emerald-800 max-w-md mx-auto font-medium">
          Cảm ơn bạn đã tin tưởng <strong>Hạt Giống Nhà Vườn</strong>. Đơn hàng của bạn đã được tiếp nhận và chúng tôi sẽ liên hệ xác nhận đặt hàng qua số điện thoại.
        </p>
      </div>

      {/* Order Code Box */}
      <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-200 shadow-card space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-700">Mã Đơn Hàng Của Bạn</span>
        <div className="text-2xl md:text-3xl font-black text-emerald-950 tracking-wider">
          {orderCode}
        </div>
        <p className="text-xs text-gray-500">
          Vui lòng lưu lại mã đơn để đối chiếu khi nhận hàng hoặc tư vấn qua Messenger.
        </p>

        {/* Messenger Direct Confirmation Button */}
        <div className="pt-2">
          <a
            href="https://www.facebook.com/julymedia1.2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm md:text-base shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-white text-blue-600" />
            <span>💬 XÁC NHẬN ĐƠN QUA MESSENGER</span>
          </a>
        </div>
      </div>

      {/* Bank Transfer QR Code section */}
      <div className="p-6 bg-white rounded-3xl border border-emerald-100 shadow-card space-y-4 text-left">
        <h3 className="font-extrabold text-emerald-950 text-base border-b border-emerald-100 pb-2">
          Thông Tin Chuyển Khoản Ngân Hàng (Nếu Bạn Chọn Chuyển Khoản)
        </h3>

        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-xs text-emerald-950">
            <p><strong>Ngân hàng:</strong> {DEFAULT_SITE_SETTINGS.bank_name}</p>
            <p><strong>Số tài khoản:</strong> <span className="font-bold text-emerald-800 text-sm">{DEFAULT_SITE_SETTINGS.bank_account_no}</span></p>
            <p><strong>Chủ tài khoản:</strong> {DEFAULT_SITE_SETTINGS.bank_account_holder}</p>
            <p><strong>Nội dung chuyển khoản:</strong> <span className="font-bold text-amber-700">{orderCode}</span></p>
          </div>

          <div className="relative aspect-square max-w-[200px] mx-auto rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-sm" style={{ position: 'relative' }}>
            <Image
              src={`https://img.vietqr.io/image/MB-7986868686-compact.png?addInfo=${encodeURIComponent(orderCode)}`}
              alt="VietQR Chuyển khoản"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation Action */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Trở về Trang Chủ</span>
        </Link>

        <Link
          href="/san-pham"
          className="px-6 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Tiếp tục xem sản phẩm</span>
        </Link>
      </div>
    </div>
  );
}
