import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import FacebookIcon from '@/components/ui/FacebookIcon';
import { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const storeName = settings?.store_name || 'Hạt Giống Nhà Vườn';
  const slogan = settings?.slogan || 'ƯƠM MẦM HÔM NAY – RỰC RỠ NGÀY MAI';
  const hotline = settings?.hotline || '0934 811 307';
  const email = settings?.email || 'hotro@hatgiongnhavuon.vn';
  const address = settings?.address || '123 Đường Vườn Hoa, Quảng Ngãi';
  const facebookPage = settings?.facebook_page || 'https://www.facebook.com/julymedia1.2/';
  const messengerUrl = settings?.messenger_url || 'https://www.facebook.com/julymedia1.2/';

  return (
    <footer className="bg-emerald-950 text-white border-t-4 border-emerald-600">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0" style={{ position: 'relative' }}>
              <Image src="/logo.png" alt={storeName} fill sizes="48px" className="object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">{storeName}</h3>
              <p className="text-xs text-amber-300 font-semibold">{slogan}</p>
            </div>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed">
            Hạt Giống Nhà Vườn cung cấp hạt giống hoa, hạt giống rau sạch, cây ăn trái chậu lùn thuần thục, tỷ lệ nảy mầm cao và hướng dẫn chăm sóc tận tình.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={facebookPage}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-emerald-800 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
              title="Facebook Fanpage"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-colors"
              title="Facebook Messenger"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-500 flex items-center justify-center text-white transition-colors"
              title="Telegram"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="font-bold text-sm text-amber-300 uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
            Danh Mục Hạt Giống
          </h4>
          <ul className="space-y-2 text-xs text-emerald-100">
            <li>
              <Link href="/hat-giong-hoa" className="hover:text-amber-300 transition-colors">
                🌸 Hạt Giống Hoa Cúc, Hồng, Hướng Dương
              </Link>
            </li>
            <li>
              <Link href="/hat-giong-rau" className="hover:text-amber-300 transition-colors">
                🥬 Hạt Giống Rau Cải, Rau Muống, Xà Lách
              </Link>
            </li>
            <li>
              <Link href="/hat-giong-cay-an-trai" className="hover:text-amber-300 transition-colors">
                🍓 Cây Ăn Trái Chậu Lùn
              </Link>
            </li>
            <li>
              <Link href="/combo" className="hover:text-amber-300 transition-colors">
                🎁 Combo Hạt Giống Tiết Kiệm
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Policy */}
        <div>
          <h4 className="font-bold text-sm text-amber-300 uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
            Hỗ Trợ &amp; Chính Sách
          </h4>
          <ul className="space-y-2 text-xs text-emerald-100">
            <li>
              <Link href="/gioi-thieu" className="hover:text-amber-300 transition-colors">
                Về Chúng Tôi
              </Link>
            </li>
            <li>
              <Link href="/huong-dan" className="hover:text-amber-300 transition-colors">
                Hướng Dẫn Gieo Trồng Kỹ Thuật
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-giao-hang" className="hover:text-amber-300 transition-colors">
                Chính Sách Giao Hàng &amp; Miễn Phí Ship
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-doi-tra" className="hover:text-amber-300 transition-colors">
                Chính Sách Đổi Trả &amp; Bồi Thường Hạt
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-bao-mat" className="hover:text-amber-300 transition-colors">
                Chính Sách Bảo Mật Thông Tin
              </Link>
            </li>
            <li>
              <Link href="/dieu-khoan-su-dung" className="hover:text-amber-300 transition-colors">
                Điều Khoản Sử Dụng
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Store Contact Details */}
        <div>
          <h4 className="font-bold text-sm text-amber-300 uppercase tracking-wider mb-4 border-b border-emerald-800 pb-2">
            Thông Tin Liên Hệ
          </h4>
          <ul className="space-y-3 text-xs text-emerald-100">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              <a href={`tel:${hotline.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-amber-300">
                {hotline}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{email}</span>
            </li>
            <li className="pt-2">
              <div className="p-3 rounded-xl bg-emerald-900 border border-emerald-800 text-[11px] text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Kiểm tra hàng thoải mái trước khi thanh toán COD</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-emerald-950/90 border-t border-emerald-900 py-4 px-4 text-center text-xs text-emerald-300 flex justify-center items-center max-w-7xl mx-auto">
        <p>© 2026 {storeName}. Tất cả quyền được bảo lưu. Slogan: &quot;{slogan}&quot;</p>
      </div>
    </footer>
  );
}
