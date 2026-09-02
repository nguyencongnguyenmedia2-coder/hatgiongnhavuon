import React from 'react';
import Link from 'next/link';
import {
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Ticket,
  FileText,
  Image as ImageIcon,
  Settings,
  Send,
  ShieldCheck,
  TrendingUp,
  PlusCircle,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { DEMO_PRODUCTS, DEFAULT_SITE_SETTINGS } from '@/lib/demoData';

export default function AdminMainPage() {
  const lowStockCount = DEMO_PRODUCTS.filter((p) => p.stock <= (p.low_stock_threshold || 10)).length;

  const adminModules = [
    {
      title: 'Quản Lý Sản Phẩm',
      desc: 'Thêm mới, sửa giá, tải ảnh, mô tả kỹ thuật gieo trồng',
      icon: Package,
      href: '/admin/san-pham',
      badge: `${DEMO_PRODUCTS.length} sản phẩm`,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Danh Mục Hạt Giống',
      desc: 'Phân loại Hạt Giống Hoa, Hạt Giống Rau, Cây Ăn Trái...',
      icon: Layers,
      href: '/admin/danh-muc',
      badge: '3 danh mục',
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      title: 'Quản Lý Đơn Hàng',
      desc: 'Theo dõi đơn hàng mới, cập nhật trạng thái COD / Chuyển khoản',
      icon: ShoppingBag,
      href: '/admin/don-hang',
      badge: '12 đơn mới',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Quản Lý Khách Hàng',
      desc: 'Danh sách khách mua hàng, số điện thoại, địa chỉ nhận hàng',
      icon: Users,
      href: '/admin/khach-hang',
      badge: 'Khách hàng',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      title: 'Quản Lý Tồn Kho',
      desc: 'Cảnh báo sản phẩm sắp hết hàng, kiểm soát kho xuất nhập',
      icon: Boxes,
      href: '/admin/ton-kho',
      badge: lowStockCount > 0 ? `⚠️ ${lowStockCount} sắp hết` : 'Kho ổn định',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      title: 'Mã Giảm Giá & Voucher',
      desc: 'Tạo mã khuyến mãi, giảm giá %, freeship cho khách',
      icon: Ticket,
      href: '/admin/ma-giam-gia',
      badge: 'Chương trình KM',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      title: 'Bài Viết Gieo Trồng',
      desc: 'Soạn bài viết hướng dẫn gieo trồng & mẹo làm vườn ban công',
      icon: FileText,
      href: '/admin/bai-viet',
      badge: '2 bài viết',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      title: 'Banner & Slider',
      desc: 'Quản lý ảnh banner trang chủ, slide quảng cáo chương trình',
      icon: ImageIcon,
      href: '/admin/banner',
      badge: 'Banner trang chủ',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      title: 'Cấu Hình Website',
      desc: 'Tên shop, hotline, địa chỉ, tài khoản MB Bank',
      icon: Settings,
      href: '/admin/cau-hinh',
      badge: 'Thông tin shop',
      color: 'bg-slate-50 text-slate-700 border-slate-200',
    },
    {
      title: 'Cấu Hình Telegram Bot',
      desc: 'Tự động gửi thông báo đơn hàng mới qua Telegram',
      icon: Send,
      href: '/admin/cau-hinh/telegram',
      badge: '🟢 Đã kết nối',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      title: 'Cấu Hình Messenger',
      desc: 'Tích hợp nút xác nhận đơn & tư vấn tự động qua Facebook',
      icon: MessageCircle,
      href: '/admin/cau-hinh/facebook',
      badge: 'Meta Platform',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      title: 'Quản Lý Người Dùng',
      desc: 'Phân quyền tài khoản quản trị nhân viên shop',
      icon: ShieldCheck,
      href: '/admin/nguoi-dung',
      badge: 'Phân quyền',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-emerald-700/50">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/80 border border-emerald-500/50 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HỆ THỐNG QUẢN TRỊ WEBSITE TOÀN DIỆN</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Trang Quản Trị Website - {DEFAULT_SITE_SETTINGS.store_name}
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-2xl font-medium">
            Quản lý toàn bộ thông tin sản phẩm, đơn hàng, kho hàng, bài viết, tài khoản ngân hàng và tích hợp Telegram / Messenger tự động.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/san-pham/them"
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs md:text-sm shadow-md transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ THÊM SẢN PHẨM MỚI</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-3 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm border border-emerald-600 transition-all flex items-center gap-1.5"
          >
            <span>Xem Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-card">
          <span className="text-xs text-gray-500 font-semibold block">Tổng sản phẩm</span>
          <span className="text-2xl font-black text-emerald-950 mt-1 block">{DEMO_PRODUCTS.length} Món</span>
          <Link href="/admin/san-pham" className="text-[11px] text-emerald-700 font-bold hover:underline mt-2 inline-block">
            Quản lý danh sách →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-card">
          <span className="text-xs text-gray-500 font-semibold block">Đơn hàng mới</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">12 Đơn</span>
          <Link href="/admin/don-hang" className="text-[11px] text-blue-700 font-bold hover:underline mt-2 inline-block">
            Xử lý đơn hàng →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-card">
          <span className="text-xs text-gray-500 font-semibold block">Cảnh báo tồn kho</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{lowStockCount} Sản phẩm</span>
          <Link href="/admin/ton-kho" className="text-[11px] text-amber-700 font-bold hover:underline mt-2 inline-block">
            Kiểm tra kho →
          </Link>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-card">
          <span className="text-xs text-gray-500 font-semibold block">Telegram Bot</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">Đã bật</span>
          <Link href="/admin/cau-hinh/telegram" className="text-[11px] text-emerald-700 font-bold hover:underline mt-2 inline-block">
            Kiểm tra kết nối →
          </Link>
        </div>
      </div>

      {/* Grid of Admin Management Modules */}
      <div>
        <h2 className="text-lg font-extrabold text-emerald-950 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-700" />
          <span>Danh Sách Chức Năng Quản Lý Website</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {adminModules.map((mod, idx) => {
            const IconComponent = mod.icon;
            return (
              <Link
                key={idx}
                href={mod.href}
                className="group bg-white p-5 rounded-3xl border border-emerald-100 shadow-card hover:shadow-elevated hover:border-emerald-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${mod.color}`}>
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-emerald-950 text-base group-hover:text-emerald-700 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                  <span>Truy cập quản lý</span>
                  <span>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
